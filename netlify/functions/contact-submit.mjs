import { getStore } from '@netlify/blobs';
import { checkRateLimit, clientIp } from './_ratelimit.mjs';

// The real Netlify form name. Deliberately opaque and declared ONLY on the
// noindexed /forms/registry/ page, never in the public homepage markup.
// The homepage form carries no data-netlify attribute and no form-name field,
// so a bot scraping reynahouse.ai has nothing to POST directly to Netlify's
// form endpoint with. Everything must come through this function.
const FORM_NAME = 'rh-inbound-9f4c';

// A submission faster than this was not typed by a person.
const MIN_FILL_MS = 3000;
// Stale tab guard. A token older than this is refused; the visitor reloads.
const MAX_FILL_MS = 12 * 60 * 60 * 1000;

// Counted BEFORE the spam checks, so a bot blasting the endpoint burns its own
// budget on rejections. 5/hour leaves a real person room to resubmit after a
// mistake while still stopping a flood cold.
const RATE = { max: 5, windowMs: 60 * 60 * 1000 };

// Verbatim fragments from the spam that got through the old honeypot, plus the
// usual form-blast tells. Matched case-insensitively against the whole payload.
//
// ⚠️ Every entry here must be a phrase a SELLER uses and a BUYER does not.
// 'seo services' and 'digital marketing agency' were removed 2026-08-15: they
// describe what Reyna House sells, so a real prospect writing "I need help with
// SEO services" was silently discarded. Never blocklist your own service
// vocabulary — spam that happens to use those words is caught by the seller-
// side tells below ('guest post', 'backlink', 'we can rank your') and by the
// link-stuffing rule.
const BLOCKLIST = [
  'insaneleads',
  'found, analyzed, and contacted by ai',
  'per 1,000 leads',
  'guest post',
  'backlink',
  'crypto',
  'telegram',
  'bitcoin',
  'we can rank your',
  'increase your traffic',
];

function json(obj, status = 200, extra = {}) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...extra },
  });
}

/**
 * Proof that JavaScript actually ran on the page. Mirrored byte-for-byte by the
 * inline script in Contact.astro.
 *
 * This is obfuscation, not cryptography — the algorithm is readable in the page
 * source, so a bot written specifically for this site could reproduce it. That
 * is fine. It is not the only gate, and it eliminates the entire class of
 * commodity spam that blind-POSTs scraped forms without running any JS.
 */
function tokenFor(t) {
  let h = 2166136261;
  const s = `${t}rh`;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

function countLinks(text) {
  const m = String(text || '').match(/(https?:\/\/|www\.)/gi);
  return m ? m.length : 0;
}

/** Returns a reason string when the payload looks like spam, otherwise null. */
function spamReason(fields) {
  if ((fields['bot-field'] || '').trim() !== '') return 'honeypot';

  const t = Number(fields._t);
  const k = String(fields._k || '');
  if (!Number.isFinite(t) || !k) return 'no_token';
  if (k !== tokenFor(t)) return 'bad_token';

  const elapsed = Date.now() - t;
  if (elapsed < MIN_FILL_MS) return 'too_fast';
  if (elapsed > MAX_FILL_MS) return 'stale_token';

  const name = (fields.name || '').trim();
  const email = (fields.email || '').trim();
  const phone = (fields.phone || '').trim();
  if (!name) return 'no_name';
  if (!email && !phone) return 'no_contact';

  const blob = Object.values(fields).join(' ').toLowerCase();
  const hit = BLOCKLIST.find((term) => blob.includes(term));
  if (hit) return `blocklist:${hit}`;

  if (countLinks(fields.message) >= 2) return 'link_stuffing';
  if (/<a\s|\[url=/i.test(fields.message || '')) return 'markup_in_message';

  return null;
}

/**
 * Hand the cleaned submission to Netlify Forms so it still lands in the
 * dashboard and still triggers the submission_created email notification.
 */
async function forwardToNetlifyForms(fields, ip, userAgent) {
  const base = process.env.URL || 'https://reynahouse.ai';
  const body = new URLSearchParams({
    'form-name': FORM_NAME,
    name: fields.name || '',
    business: fields.business || '',
    email: fields.email || '',
    phone: fields.phone || '',
    'best-time': fields['best-time'] || '',
    need: fields.need || '',
    message: fields.message || '',
    'source-ip': ip,
    'user-agent': (userAgent || '').slice(0, 200),
  });

  const res = await fetch(`${base}/forms/registry/`, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`netlify forms responded ${res.status}`);
}

/**
 * Park a rejected submission where a human can still find it. A false positive
 * costs a customer; a quarantined bot costs a few bytes. Never throws — a
 * storage failure must not turn into a 502 on the visitor's screen.
 */
async function quarantine(fields, ip, reason) {
  try {
    const store = getStore({ name: 'contact-quarantine', consistency: 'strong' });
    const stamp = new Date().toISOString();
    await store.setJSON(`${stamp}-${ip.replace(/[^a-z0-9]/gi, '')}`, {
      rejected_at: stamp,
      reason,
      ip,
      fields,
    });
  } catch (err) {
    console.error('contact-submit: quarantine write failed', err);
  }
}

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  let fields;
  try {
    const raw = await req.text();
    fields = Object.fromEntries(new URLSearchParams(raw));
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const ip = clientIp(req);

  const limit = await checkRateLimit('contact', ip, RATE);
  if (!limit.ok) {
    console.warn(`contact-submit: rate limited ${ip}`);
    return json(
      { error: 'rate_limited', message: 'Too many submissions. Try again later, or just call 909-341-0243.' },
      429,
      { 'retry-after': String(limit.retryAfter) },
    );
  }

  const reason = spamReason(fields);
  if (reason) {
    console.warn(`contact-submit: rejected (${reason}) from ${ip}`);
    // Quarantined, not discarded. The previous version logged and dropped the
    // payload, on the reasoning that "a real visitor never sees this path" —
    // which is false. A real person hits stale_token by leaving a tab open, or
    // too_fast by autofilling, and used to be deleted in silence with a success
    // message on screen. Function logs age out, so those were unrecoverable.
    // Review with: netlify blobs:list contact-quarantine
    await quarantine(fields, ip, reason);
    // Still a 200 with no reason attached. Withholding *why* is what stops a
    // bot tuning its payload; the absence of a receipt only tells it that
    // something failed, which it could infer anyway from nobody replying.
    return json({ ok: true });
  }

  try {
    await forwardToNetlifyForms(fields, ip, req.headers.get('user-agent'));
  } catch (err) {
    console.error('contact-submit: forward failed', err);
    return json(
      { error: 'upstream', message: 'Something went wrong. Please email edward@reynahouse.ai directly.' },
      502,
    );
  }

  // The receipt is the ONLY signal that a submission genuinely landed. The
  // client fires the generate_lead conversion on this and nothing else, so a
  // quarantined payload can no longer be counted as a lead.
  return json({ ok: true, ref: crypto.randomUUID().slice(0, 8) });
};
