import { getStore } from '@netlify/blobs';

const STORE = 'alyssa-conversations';
const TZ = 'America/Los_Angeles';

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    timeZone: TZ, dateStyle: 'medium', timeStyle: 'short',
  });
}

function fmtDuration(ms) {
  const s = Math.round(ms / 1000);
  if (s < 60) return s + 's';
  const m = Math.floor(s / 60);
  return m + 'm ' + (s % 60) + 's';
}

function renderHTML(records) {
  const rows = records.map((r) => {
    const turns = (r.messages || []).map((m) =>
      '<div class="t t--' + (m.role === 'user' ? 'u' : 'a') + '"><b>' +
      (m.role === 'user' ? 'Visitor' : 'Alyssa') + ':</b> ' + esc(m.content) + '</div>'
    ).join('');
    return (
      '<tr><td>' + esc(fmtDate(r.startedAt)) + '</td>' +
      '<td>' + esc(fmtDuration(r.durationMs || 0)) + '</td>' +
      '<td>' + (r.messageCount || 0) + '</td>' +
      '<td><details><summary>view</summary><div class="convo">' + turns + '</div></details></td></tr>'
    );
  }).join('');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Alyssa — Conversations</title>
<style>
  body { font-family: system-ui, sans-serif; background:#1A1A1A; color:#EDEAE0; margin:0; padding:24px; }
  h1 { color:#C9944D; font-size:1.3rem; }
  .meta { color:#BFA984; font-size:.85rem; margin-bottom:18px; }
  table { width:100%; border-collapse:collapse; font-size:.9rem; }
  th, td { text-align:left; padding:10px 12px; border-bottom:1px solid #3a3a3a; vertical-align:top; }
  th { color:#C9944D; font-size:.78rem; text-transform:uppercase; letter-spacing:.5px; }
  summary { cursor:pointer; color:#E8C68A; }
  .convo { margin-top:8px; max-width:760px; }
  .t { padding:6px 10px; border-radius:8px; margin:5px 0; line-height:1.5; white-space:pre-wrap; }
  .t--u { background:#334668; }
  .t--a { background:#2a2a2a; border:1px solid #3a3a3a; }
  .empty { color:#BFA984; }
</style></head><body>
  <h1>Alyssa — Conversations</h1>
  <p class="meta">${records.length} conversation${records.length === 1 ? '' : 's'} · newest first · times in Pacific</p>
  ${records.length
    ? '<table><thead><tr><th>Started</th><th>Length</th><th>Messages</th><th>Transcript</th></tr></thead><tbody>' + rows + '</tbody></table>'
    : '<p class="empty">No conversations logged yet.</p>'}
</body></html>`;
}

export default async (req) => {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');
  if (!process.env.ADMIN_KEY || key !== process.env.ADMIN_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  const store = getStore({ name: STORE, consistency: 'strong' });
  const records = [];
  try {
    const { blobs } = await store.list();
    for (const b of blobs) {
      try {
        const r = await store.get(b.key, { type: 'json' });
        if (r) records.push(r);
      } catch {}
    }
  } catch (e) {
    console.error('admin list error:', e);
  }
  records.sort((a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime());

  if (url.searchParams.get('format') === 'json') {
    return new Response(JSON.stringify(records, null, 2), {
      headers: { 'content-type': 'application/json' },
    });
  }
  return new Response(renderHTML(records), {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
};
