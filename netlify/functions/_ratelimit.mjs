import { getStore } from '@netlify/blobs';

const STORE = 'rh-ratelimit';

/**
 * The caller's IP as Netlify sees it. x-nf-client-connection-ip is set by the
 * edge and cannot be spoofed by the client; x-forwarded-for can be, so it is
 * only a fallback for local dev.
 */
export function clientIp(req) {
  return (
    req.headers.get('x-nf-client-connection-ip') ||
    (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
    'unknown'
  );
}

/**
 * Fixed-window per-IP limiter backed by Netlify Blobs.
 *
 * Returns { ok, remaining, retryAfter }. A storage failure returns ok:true —
 * the limiter is abuse protection, not correctness, and must never take a
 * working endpoint offline. Fixed windows allow a burst at a boundary; that's
 * an accepted tradeoff for something this cheap.
 */
export async function checkRateLimit(bucket, ip, { max, windowMs }) {
  const key = `${bucket}:${ip}`.replace(/[^a-zA-Z0-9_.:-]/g, '_');
  const now = Date.now();

  let store;
  try {
    store = getStore({ name: STORE, consistency: 'strong' });
  } catch {
    return { ok: true, remaining: max, retryAfter: 0 };
  }

  let rec = null;
  try {
    rec = await store.get(key, { type: 'json' });
  } catch {
    /* treat a read failure as a fresh window */
  }

  if (!rec || typeof rec.start !== 'number' || now - rec.start >= windowMs) {
    rec = { start: now, count: 0 };
  }

  rec.count += 1;

  try {
    await store.setJSON(key, rec);
  } catch {
    return { ok: true, remaining: max, retryAfter: 0 };
  }

  const retryAfter = Math.max(1, Math.ceil((rec.start + windowMs - now) / 1000));
  return {
    ok: rec.count <= max,
    remaining: Math.max(0, max - rec.count),
    retryAfter,
  };
}
