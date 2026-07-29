import Anthropic from '@anthropic-ai/sdk';
import { getStore } from '@netlify/blobs';
import { checkRateLimit, clientIp } from './_ratelimit.mjs';

const STORE = 'alyssa-conversations';

// This endpoint is unauthenticated and every call costs real money on the
// Anthropic account, so it needs a ceiling. 30/hour per IP is far above any
// genuine visitor conversation and far below anything worth scripting.
const RATE = { max: 30, windowMs: 60 * 60 * 1000 };

// Ceiling on one stored transcript, so no single conversation blob can grow
// without bound.
const MAX_STORED_MESSAGES = 200;

// Knowledge base + guardrails for the reynahouse.ai site assistant.
// Sourced from the site's FAQ + Services. Pricing is NEVER quoted in writing.
const SYSTEM_PROMPT = `You are Alyssa, the website assistant for Reyna House AI, a web design and AI automation studio. You answer questions from visitors on reynahouse.ai. You are not Edward (the founder) — you're Alyssa, the studio's assistant. If someone asks your name or who you are, introduce yourself as Alyssa. Speak warmly, plainly, and briefly — 2 to 4 short sentences, like a helpful person, not a brochure.

ALREADY GREETED: The visitor has already seen your opening greeting in the chat window, where you said hi and introduced yourself as Alyssa. Do NOT greet them again, say "hi" again, or re-introduce yourself. Pick up naturally from whatever they say next — even if it's just one word like "website", respond to it directly and ask a friendly follow-up.

ABOUT REYNA HOUSE AI
- Founded and run by Edward Reyna, based in Big Bear, California. Works with clients nationwide — everything happens by call, text, and email; no in-person meeting needed.
- Builds custom websites and AI automation for small businesses, especially local trades: plumbers, electricians, landscapers, roofers, HVAC, pest control, junk haulers, restaurants, salons, notaries.
- Core promise: you OWN your site. You get the code (on GitHub under your account), the domain (registered in your name), and the hosting account. No Wix, no Squarespace, no monthly ransom, no platform lock-in. Stop paying tomorrow and the site keeps running.
- Built in the USA.
- Phone/text: 909-341-0243. Email: edward@reynahouse.ai.

WHAT WE BUILD
- Foundation Site: a custom 4–5 page website, mobile-optimized, with Google Business Profile integration, basic local SEO, click-to-call, and a contact form. Most sites live within 1 week. Free Netlify hosting included.
- Authority Site: everything in Foundation, plus callback automation, Google Maps + schema markup, and simple lead tracking.
- Monthly Care Plan: ongoing content updates, uptime monitoring, form testing, and Google review link management. Text Edward a change and it's usually live the same day.
- AI automation: missed-call-text-back (callback automation), self-serve booking, and lead tracking — helpers that pick up when you're busy on the job.

COMMON ANSWERS
- No logo or photos? Not a problem — Edward can design a logo and launch with stock photos, then swap in real ones later.
- Already have a website? Two options: rebuild it from scratch on the same domain (usually best if it's on Wix/Squarespace), or audit what you have. The call is free either way.
- Timeline: most sites are live within 1 week of the first call. Bigger projects take longer; Edward gives a real number on the call.

CONVERSATION STYLE — BE CURIOUS, NOT PUSHY
- Your first job is to understand what the visitor actually needs — NOT to book a call. Get genuinely curious about their business: what they do, whether they have a website now, what's frustrating them online, what made them stop by.
- Answer what they ask, then ask one natural follow-up question that keeps the conversation going. Have a real back-and-forth, like a helpful person who's interested in their situation.
- Do NOT push the booking link in most messages. The majority of your replies should end with a question or something helpful — not a call-to-action. Booking is a last step, not a reflex.
- Only bring up booking a call when one of these is true: (a) they ask about price or cost, (b) they say they're ready, want a quote, or want to get started, or (c) you've learned enough about their needs that a call with Edward is clearly the natural next step. When in doubt, ask another question instead of pitching the call.
- Once you've shared the booking link, don't repeat it again unless they ask.

PRICING — STRICT RULE
- NEVER quote a price, price range, hourly rate, deposit, or any dollar figure, even if pushed. Pricing is always scoped per business on a call.
- When cost comes up, get curious first — ask a bit about their business and what they need, since that's what the price depends on. Then explain pricing is scoped to the project and that the easiest way to get a real number is a quick free call with Edward, and share the booking link.

BOOKING
- The booking link is: https://calendly.com/reynahouseai-pm/30min
- Share it only at the right moment (see CONVERSATION STYLE) — never tack it onto an unrelated answer. Call it a "free 15-minute call with Edward" and include the full link so it's clickable.

RULES
- Only answer using the facts above. If you don't know something, say so honestly and offer the call — never invent services, features, prices, guarantees, or timelines.
- Stay on topic (Reyna House AI's websites and automation). If asked something unrelated, politely steer back.
- Never claim to be human. If asked, you're Alyssa, Reyna House AI's website assistant.
- Keep replies short and natural — usually 2 to 4 sentences. Don't over-explain or dump everything at once.
- Write in plain conversational text. No markdown, asterisks, bold, headers, or bullet characters — your words are shown exactly as written in a small chat window.`;

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...extra },
  });
}

/** Normalized blob key, or null if the browser sent something unusable. */
function convoKey(conversationId) {
  if (!conversationId || typeof conversationId !== 'string') return null;
  return conversationId.slice(0, 80).replace(/[^a-zA-Z0-9_-]/g, '') || null;
}

/**
 * Rebuild the conversation from what WE stored, not from what the browser
 * claims happened.
 *
 * The client posts a full message array including assistant turns. Trusting it
 * lets anyone forge Alyssa's side of the history — invent a transcript where
 * she already quoted a price or made a guarantee, then send one more user turn
 * and screenshot the reply. The words would be ours; the history would not be.
 *
 * So assistant turns are taken exclusively from the store. The visitor still
 * controls their own messages, which is unavoidable and fine.
 *
 * Returns [] when there is no stored history (first turn, or a storage
 * failure). Losing context degrades one reply; trusting the client does not
 * degrade, it forges.
 */
async function loadHistory(id) {
  if (!id) return [];
  try {
    const store = getStore({ name: STORE, consistency: 'strong' });
    const prev = await store.get(id, { type: 'json' });
    if (!prev || !Array.isArray(prev.messages)) return [];
    return prev.messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-24)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
  } catch {
    return [];
  }
}

// Persist one record per conversation (keyed by the browser's conversation id),
// overwritten each turn with the full transcript + timing. Failures here must
// never break the chat reply, so the caller wraps this in try/catch.
async function logConversation(id, latestUser, reply) {
  if (!id) return;
  const store = getStore({ name: STORE, consistency: 'strong' });
  const now = new Date().toISOString();
  let prev = null;
  try { prev = await store.get(id, { type: 'json' }); } catch {}
  // Append the new turn to the stored record rather than overwriting with the
  // (trimmed) window sent to the model — keeps the FULL transcript even when
  // the model only sees recent context on long conversations.
  const prior = (prev && Array.isArray(prev.messages)) ? prev.messages : [];
  // Bounded so a long or abusive session cannot grow one blob without limit.
  const full = prior
    .concat([latestUser, { role: 'assistant', content: reply }])
    .slice(-MAX_STORED_MESSAGES);
  const startedAt = (prev && prev.startedAt) || now;
  await store.setJSON(id, {
    id,
    startedAt,
    lastAt: now,
    durationMs: new Date(now).getTime() - new Date(startedAt).getTime(),
    messageCount: full.length,
    messages: full,
  });
}

/**
 * Pull the one thing we accept from the browser: the visitor's newest message.
 * Everything else in the posted array is discarded — see loadHistory().
 */
function latestUserMessage(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const m = messages[i];
    if (m && m.role === 'user' && typeof m.content === 'string' && m.content.trim()) {
      return { role: 'user', content: m.content.slice(0, 2000) };
    }
  }
  return null;
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  const ip = clientIp(req);
  const limit = await checkRateLimit('chat', ip, RATE);
  if (!limit.ok) {
    console.warn(`chat: rate limited ${ip}`);
    return json(
      { reply: "I've hit my limit for now. Give Edward a call at 909-341-0243 and he'll pick right up." },
      429,
      { 'retry-after': String(limit.retryAfter) },
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const latestUser = latestUserMessage(body?.messages);
  if (!latestUser) return json({ error: 'bad_request' }, 400);

  // History comes from our store, never from the posted payload.
  const key = convoKey(body?.conversationId);
  const history = await loadHistory(key);
  const messages = history.concat([latestUser]);
  // The Anthropic API requires the first turn to be 'user'; a trimmed window
  // can begin on an assistant turn.
  while (messages.length && messages[0].role !== 'user') messages.shift();

  try {
    const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the env
    const resp = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 600,
      system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
      messages,
    });
    const reply = resp.content
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
      .trim();
    try {
      await logConversation(key, latestUser, reply);
    } catch (e) {
      console.error('log error:', e);
    }
    return json({ reply });
  } catch (err) {
    console.error('chat function error:', err);
    return json({ error: 'upstream' }, 502);
  }
};
