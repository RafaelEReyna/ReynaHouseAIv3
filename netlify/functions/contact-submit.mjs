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

const RATE = { max: 3, windowMs: 60 * 60 * 1000 };

// Verbatim fragments from the spam that got through the old honeypot, plus the
// usual form-blast tells. Matched case-insensitively against the whole payload.
const BLOCKLIST = [
  'insaneleads',
  'found, analyzed, and contacted by ai',
  'per 1,000 leads',
  'seo services',
  'guest post',
  'backlink',
  'crypto',
  'telegram',
  'bitcoin',
  'we can rank your',
  'increase your traffic',
  'digital marketing agency',
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
    // Logged, not stored. Rejections are noise; the point is that nothing
    // reaches the inbox. Check function logs if a real person ever complains.
    console.warn(`contact-submit: rejected (${reason}) from ${ip}`);
    // Deliberately a 200 with ok:true. Telling a bot *why* it failed is how it
    // learns to pass. A real visitor never sees this path.
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

  return json({ ok: true });
};
