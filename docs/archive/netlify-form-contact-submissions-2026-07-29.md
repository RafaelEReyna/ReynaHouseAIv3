# Archive — Netlify form `contact` submissions (2026-03-02 → 2026-07-29)

Captured 2026-07-29 before retiring the `contact` form (id `69a5369d6d8d1200080ed2ac`)
in favor of `rh-inbound-9f4c` behind `netlify/functions/contact-submit.mjs`.

**Status: the `contact` form was deleted via `netlify api deleteSiteForm` on
2026-07-29 with Edward's go-ahead.** Deleting the markup alone was not enough —
the endpoint kept accepting POSTs. Re-tested immediately after deletion: the
same POST that had succeeded now returns 404 and creates nothing. This file is
the only remaining record of those submissions.

**Nothing here is a real lead.** Five are cold-outreach spam, two are Edward's own
launch tests, one is the verification POST that proved the old endpoint was still
accepting submissions after the form was removed from the page HTML.

| # | Date | Name | Business | Phone | What it was |
|---|---|---|---|---|---|
| 19 | 2026-07-29 | Frank Vacca | — | 5550001 | verification POST proving the deregistered endpoint still accepted submissions |
| 16 | 2026-07-09 | Vaani Arora | SEO Services | 707-706-0205 | cold SEO pitch, "your site is not coming up for the searches your customers are doing" |
| 10 | 2026-06-11 | Frank Vacca | Frank Vacca | 353656594 | InsaneLeads.io form-blast pitch |
| 8 | 2026-06-05 | Frank Vacca | Insane Leads | 97550265 | InsaneLeads.io form-blast pitch |
| 7 | 2026-06-01 | Frank Vacca | Frank Vacca | 620503348 | InsaneLeads.io form-blast pitch |
| 2 | 2026-03-02 | Edward | reynahouse ai | 818-482-3464 | "testing number 4" |
| 1 | 2026-03-02 | Rafael | Reyna House AI | 818-482-3464 | "Testing number 2 or 3 I think" |

## Source IPs of the spam

`106.219.155.0` (Vaani), `108.210.89.181`, `147.81.45.207`, `70.111.119.149`
(InsaneLeads, all different — rotating residential proxies, which is why an IP
blocklist alone would not have helped).

## Why these got through

The homepage declared the form inline with `data-netlify="true"` and a visible
`<input name="form-name" value="contact">`. Any scraper could read the form name
and POST straight to Netlify's endpoint, bypassing the honeypot entirely — the
honeypot only works on bots that submit the form as rendered.

Full writeup lives in the commit that introduced `contact-submit.mjs`.
