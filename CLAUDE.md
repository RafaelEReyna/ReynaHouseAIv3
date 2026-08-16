# CLAUDE.md — ReynaHouseAI.com Project Notes

## Project Stack
- Astro v5.17 + Tailwind CSS v4 + Netlify
- Image optimization: built-in via `astro:assets` (no separate package)
- Node project name: `reynahouseai`

## Deployment
- **GitHub:** https://github.com/RafaelEReyna/ReynaHouseAIv3 (branch: `main`)
- **Netlify site:** `reynahouseai-v3` (ID: `a389add7-46f3-4944-a6fa-63ce441d54f7`)
- **Live URL:** https://reynahouseai-v3.netlify.app
- **Netlify account slug:** `rafaelereyna` (team name: "Reyna Legacy")
- **Build command:** `npm run build` | **Publish dir:** `dist`
- CI/CD linked in Netlify UI (GitHub repo connected) but webhook may not trigger builds — using manual `netlify deploy --prod --dir=dist` as fallback

---

## Issue Log

### Phase A — Scaffold & Config

#### 1. Astro scaffold created project in wrong subdirectory
- **What happened:** `npm create astro@latest .` refused to use the current directory because it contained a `.claude/` folder (not truly empty). The interactive prompt auto-generated a random subdirectory name (`./y`).
- **Cause:** Astro's create tool requires a completely empty target directory and falls back to prompting when it isn't.
- **Fix:** Copied files out with `cp -r y/. .` then removed the subdirectory with `rm -rf y`.
- **Prevention:** For future scaffolds, ensure the target directory is fully empty first, or scaffold into a named subdirectory intentionally and move files after.

#### 2. Corrupted node_modules after copying project files
- **What happened:** After copying the project from `./y` to root, `npx astro add tailwind` threw `ERR_MODULE_NOT_FOUND` — the `.bin` symlinks inside `node_modules` were broken.
- **Cause:** `cp -r` doesn't correctly preserve symlinks in `node_modules/.bin`. The symlinks still pointed to paths relative to the old `./y` location.
- **Fix:** `rm -rf node_modules && npm install` to get a clean install.
- **Prevention:** After moving a Node project, always reinstall dependencies rather than copying `node_modules`.

#### 3. Tried to install deprecated `@astrojs/image` package
- **What happened:** `npx astro add image` tried to install `@astrojs/image@^0.18.0`, which failed because the package doesn't support Astro v5.
- **Cause:** The build plan was written for an older Astro version. Since Astro v3, image optimization is built-in via `astro:assets` — no separate integration needed.
- **Fix:** No action required. Use `import { Image } from 'astro:assets'` when needed in later phases.
- **Prevention:** Check Astro version before running `astro add` for features that may have been absorbed into core.

#### 4. Invalid CSS import syntax in Layout.astro
- **What happened:** First version of `Layout.astro` used `<import '../styles/fonts.css' />` inside the HTML `<head>` block — this is not valid Astro syntax.
- **Cause:** Confused HTML-like template syntax with Astro's frontmatter import system.
- **Fix:** Moved CSS imports into the frontmatter (`---`) block at the top of the file: `import '../styles/fonts.css';`
- **Prevention:** In Astro, all `import` statements go in the frontmatter fences (`---`), never in the template HTML.

#### 5. Package name left as `"y"` in package.json
- **What happened:** Because the scaffold created the project in a `./y` subdirectory, `package.json` had `"name": "y"` instead of a proper project name.
- **Cause:** Direct consequence of issue #1 — the auto-generated directory name was used as the package name.
- **Fix:** Manually edited `package.json` to set `"name": "reynahouseai"`.
- **Prevention:** Always verify `package.json` name after scaffolding, especially if the project was moved or renamed.

### Phase E — Services (Chunk E)

#### 6. Opacity conflict between Coming Soon cards and scroll animation
- **What happened:** Services "Coming Soon" cards have scoped CSS `opacity: 0.7` for the desaturated look AND `data-animate` which sets `opacity: 0` globally. When the scroll observer adds `.is-visible`, global CSS sets `opacity: 1` — overriding the intended 0.7 dimmed state. Cards animate to full opacity instead of staying muted.
- **Cause:** Added `data-animate` to individual cards without considering how the global animation `opacity: 1` end-state conflicts with the component's scoped `opacity: 0.7`.
- **Fix:** Either remove `data-animate` from the Coming Soon cards (let only the section animate), or change the Coming Soon opacity to use a different approach (e.g., `filter: saturate(0.5)` + muted colors) that doesn't conflict with the animation opacity.
- **Prevention:** When adding scroll animations to elements that already have opacity-based styling, check for conflicts between the animation end-state and the component's intended visual state.
- **Status:** FIXED — Removed `data-animate` from Coming Soon cards; replaced `opacity: 0.7` with `filter: saturate(0.4) brightness(0.85)`; replaced muted title `opacity` with rgba color.

### Phase I — Contact (Chunk I)

#### 7. Netlify form success message never displays
- **What happened:** The inline script checks `window.location.search.includes('submitted=true')` to show the success div, but Netlify forms don't redirect with `?submitted=true` by default. The form has no `action` attribute, so Netlify uses its own default success page.
- **Cause:** Assumed Netlify would redirect back to the page with a query parameter. It doesn't — Netlify either shows its own generic success page or redirects to a custom `action` URL.
- **Fix:** Add `action="/?submitted=true"` to the `<form>` tag so Netlify redirects back to the homepage with the query param, OR create a dedicated `/success` page and set `action="/success"`.
- **Prevention:** Test form submission flow against the actual hosting platform's behavior, not assumptions.
- **Status:** FIXED — Added `action="/?submitted=true"` to the form tag.

#### 8. Calendly script uses `is:inline` with external `src` attribute
- **What happened:** Used `<script is:inline src="https://assets.calendly.com/assets/external/widget.js" async>`. Astro's `is:inline` directive is designed for inline script content — using it with an external `src` may cause the script to not load correctly.
- **Cause:** Misunderstood the purpose of `is:inline`. It tells Astro "don't process this script" — for external scripts, the correct approach is to use a plain `<script>` tag without `is:inline`, or use `is:inline` only when you need to bypass Astro's script bundling while keeping the `src`.
- **Fix:** Test whether the Calendly widget loads. If not, remove `is:inline` or switch to injecting the script tag via a small inline script.
- **Prevention:** Review Astro's script handling documentation before using directives on external scripts.
- **Status:** FIXED — Removed `is:inline` directive from the Calendly script tag.

### Phase K — Animation & Polish (Chunk K)

#### 9. No IntersectionObserver fallback in scroll-observer.js
- **What happened:** The scroll observer script doesn't check for `IntersectionObserver` browser support. In unsupported browsers, all `[data-animate]` elements remain at `opacity: 0` — content is permanently invisible.
- **Cause:** Omitted a feature detection check.
- **Fix:** Add a fallback at the top of `scroll-observer.js`: if `IntersectionObserver` is undefined, immediately add `.is-visible` to all `[data-animate]` elements.
- **Prevention:** Always add feature detection for APIs that aren't universally supported, especially when the fallback failure mode is invisible content.
- **Status:** FIXED — Added `typeof IntersectionObserver === 'undefined'` check with immediate `.is-visible` fallback.

#### 10. Missing focus style on mobile hamburger button
- **What happened:** Header.astro has `:focus-visible` styles for nav links and the CTA button, but the hamburger menu button has no focus indicator. Keyboard users on mobile see no outline when tabbing to it.
- **Cause:** Oversight — added focus styles to links but forgot the button element.
- **Fix:** Add `.header__hamburger:focus-visible { outline: 2px solid var(--copper); outline-offset: 2px; }` to Header.astro styles.
- **Prevention:** Audit all interactive elements (links, buttons, inputs) for focus states, not just the obvious ones.
- **Status:** FIXED — Added `.header__hamburger:focus-visible` to the existing focus-visible rule.

### Phase A — Fonts (Chunk A, discovered in Chunk K audit)

#### 11. Playfair Display font loaded but never used anywhere
- **What happened:** The Google Fonts `@import` in `fonts.css` includes `Playfair+Display:wght@700`, but no component in the entire project references `font-family: 'Playfair Display'`. This wastes bandwidth on every page load.
- **Cause:** The build plan spec listed Playfair Display as a project font, but it was never assigned to any element during component builds.
- **Fix:** Remove `family=Playfair+Display:wght@700&` from the Google Fonts import URL.
- **Prevention:** After completing all components, audit the fonts import against actual `font-family` usage in the codebase.
- **Status:** FIXED — Removed Playfair Display from the Google Fonts URL.

#### 12. Fonts loaded via CSS @import instead of HTML <link> tag
- **What happened:** Fonts are loaded through `@import url(...)` inside `fonts.css`, which creates a render-blocking chain: HTML → CSS parse → @import fetch → font CSS. A `<link>` tag in `<head>` would allow the browser to discover and fetch fonts earlier.
- **Cause:** The build plan specified creating a `fonts.css` file with `@import`. Followed the plan without questioning the performance implication.
- **Fix:** Replace the `@import` in `fonts.css` with a `<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">` tag in Layout.astro `<head>`, right after the preconnect hints.
- **Prevention:** Prefer `<link>` over `@import` for external font stylesheets — it's a well-known web performance best practice.
- **Status:** FIXED — Moved font loading to `<link>` tag in Layout.astro `<head>`. Cleared `fonts.css` of the `@import`.

### Phase L — Assets & Content Integration

#### 13. Fabricated truncated review text instead of asking for full text
- **What happened:** Her Ruiz's Google review was truncated in the user's first screenshot. Instead of flagging this and waiting for the full text, fabricated a plausible-sounding ending: "Edward built me a professional website that truly represents my business. Highly recommend." The real review was completely different — it discussed booking systems, office managers, and new client acquisition.
- **Cause:** Tried to be efficient and ship something rather than pausing to get accurate data.
- **Fix:** User provided full screenshot; review text was corrected before final deploy.
- **Prevention:** NEVER fabricate or guess at real people's words. If content is incomplete, stop and ask for the full version. Partial data is not an invitation to fill in the blanks.
- **Status:** FIXED — Full review text replaced before deploy.

#### 14. Google Business URL downgraded to generic search query
- **What happened:** User provided the actual Google Business reviews panel URL (with `&stick=` and `&mat=` params that open the reviews directly). Replaced it with a generic `google.com/search?q=Reyna+House+AI` which just runs a search and doesn't open the reviews panel.
- **Cause:** The provided URL looked unwieldy and was assumed to be a transient/session-specific URL. Replaced it with a "cleaner" version without checking if the original had functional value.
- **Fix:** Should use user's direct URL or ask for their Google Maps / `g.page` short link.
- **Prevention:** Don't "clean up" URLs the user provides without understanding what each parameter does. If unsure, ask.
- **Status:** FIXED — Replaced with user's direct Google Maps reviews URL in both Testimonials.astro and Footer.astro.

#### 15. Attempted to `cp` from iCloud and Google Drive paths
- **What happened:** Tried to copy the user's photo from `~/Library/Mobile Documents/com~apple~CloudDocs/` and logo from `~/My Drive/`. Both were rejected — these paths require permissions this terminal doesn't have.
- **Cause:** Assumed file system access to cloud-synced directories would work like local paths.
- **Fix:** Asked user to place files in the project directory manually.
- **Prevention:** When a user shows files from iCloud, Google Drive, or other cloud-synced locations, tell them to drop the files into the project folder rather than attempting to copy. Cloud-synced paths often have permission restrictions in sandboxed terminals.
- **Status:** FIXED — User placed files manually.

#### 16. `.DS_Store` not added to `.gitignore`
- **What happened:** macOS created a `.DS_Store` file in `src/assets/images/` when files were added. This file was not staged in the commit (specific file paths were used), but `.DS_Store` is not in `.gitignore` and will be caught by any future `git add .` or `git add -A`.
- **Cause:** Oversight — didn't check for `.DS_Store` after new directory was populated.
- **Fix:** Add `.DS_Store` to `.gitignore`.
- **Prevention:** Always add `.DS_Store` to `.gitignore` in macOS projects. Check for it whenever new directories are created.
- **Status:** FIXED — `.DS_Store` added to `.gitignore`.

#### 17. Logo PNG has opaque background on dark surfaces
- **What happened:** The Reyna House logo PNG has a light gray circular background. It was placed directly into the navy header and near-black footer without flagging that the light circle would be visible against dark backgrounds.
- **Cause:** Didn't inspect the image's transparency characteristics before integrating it. Assumed it would look fine.
- **Fix:** Tried swapping to a transparent-background version, but it looked worse — dark logo elements blended into dark backgrounds. Reverted to original with circle.
- **Prevention:** When integrating logos or icons, check whether the image has transparency and consider how it will render against the target background color. Flag potential issues to the user before deploying.
- **Status:** ACCEPTED — User keeping the circle background version. Logo redesign planned separately.

#### 18. Photo crop not verified
- **What happened:** Edward's headshot was set to `400x480` (5:6 ratio) with `object-fit: cover` and `object-position: center top`. The original photo has a different aspect ratio, meaning parts of the image are cropped. Did not preview or mention what would be cut off.
- **Cause:** Assumed `center top` positioning would frame the subject well without verifying.
- **Fix:** User should review the live site and confirm the crop is acceptable. Adjust `object-position` or dimensions if needed.
- **Prevention:** When cropping user photos via CSS, mention what will be cut and offer to adjust positioning.
- **Status:** VERIFIED — User confirmed crop is fine.

### Phase M — Polish & Portfolio Integration

#### 19. Transparent logo swap deployed without previewing
- **What happened:** Swapped the circle-background logo for a transparent-background version assuming it would look better on dark surfaces. Deployed to production without previewing. The dark logo elements blended into the dark header/footer and looked worse than the original.
- **Cause:** Assumed removing the background would automatically improve the look. Deployed without checking.
- **Fix:** Reverted to the original circle-background logo.
- **Prevention:** Don't assume a design change will improve things. Preview locally or flag the tradeoff to the user before deploying to production.

#### 20. Playwright `--full-page` captured entire scrollable page, not viewport
- **What happened:** Used `npx playwright screenshot --full-page` to capture client site screenshots for portfolio cards. This captured the entire scrollable page height — producing extremely tall, vertically elongated images (e.g., HER Maintenance at 1369KB). These destroyed the portfolio card layout.
- **Cause:** Used `--full-page` flag without considering that portfolio cards need landscape/viewport-sized thumbnails, not full-page captures.
- **Fix:** User took their own viewport-only hero screenshots and placed them in the project.
- **Prevention:** For portfolio card thumbnails, capture at viewport size only (omit `--full-page`), or crop to a fixed aspect ratio after capture. Check the first screenshot's dimensions before capturing all three.

#### 21. No fixed height constraint on portfolio image containers
- **What happened:** Portfolio card image containers used `height: auto`, letting source images dictate card proportions. Even with proper screenshots, cards could end up inconsistent sizes.
- **Cause:** Original CSS didn't enforce a fixed image area height — relied on source images being the right aspect ratio.
- **Fix:** Added `height: 220px` to `.portfolio__image-wrap` with `object-fit: cover` and `object-position: top` on the images.
- **Prevention:** When building image card grids, always constrain the image container height. Don't rely on source images being the right aspect ratio.

#### 22. Hero "RH" monogram was nearly invisible at 8% opacity
- **What happened:** The decorative "RH" text in the hero right column was set to `opacity: 0.08` — so faint it looked like a rendering artifact rather than an intentional design element. User described it as "a hazy blur."
- **Cause:** Set opacity too low during the original build. Not caught during the polish phase.
- **Fix:** Replaced the text monogram with the actual logo image at 15% opacity with a copper drop-shadow glow.
- **Prevention:** If a decorative element is meant to be noticed, 8% opacity is too low. Preview decorative elements against their actual backgrounds.

#### 23. Didn't push to GitHub alongside Netlify deploys
- **What happened:** Deployed to Netlify multiple times without pushing to GitHub. User had to ask "push to GitHub" separately after each deploy.
- **Cause:** Treated Netlify deploy and GitHub push as separate steps instead of a single "ship" action.
- **Prevention:** When deploying, always push to both Netlify and GitHub in the same step. Don't wait to be asked twice.

#### 24. Old full-page screenshot PNGs left in repo after replacement
- **What happened:** The three Playwright-captured full-page PNGs (`portfolio-village-hairsmith.png`, `portfolio-rosa-notary.png`, `portfolio-her-maintenance.png`) are still in `src/assets/images/` — no longer imported by any component but still taking up ~2.6MB in the repository.
- **Cause:** When replacing asset files with new ones, forgot to delete the old files in the same commit.
- **Fix:** Delete the unused PNG files.
- **Prevention:** When replacing asset files, delete the old ones in the same commit. Check for orphaned files after swapping imports.
- **Status:** FIXED — Orphaned PNGs deleted.

### Phase N — Post-Build Polish (Session 3)

#### 25. CI/CD setup via API didn't grant GitHub permissions
- **What happened:** Used `netlify api updateSite` to connect the GitHub repo for auto-deploys. Told the user "CI/CD is connected" but the first auto-deploy failed with "Unable to access repository — Host key verification failed."
- **Cause:** The Netlify API can set build settings (repo URL, branch, build command), but it does NOT establish the OAuth connection between Netlify and GitHub. That requires the user to go through Netlify's web UI (Site configuration > Build & deploy > Link to Git) to grant repository access permissions.
- **Fix:** Fell back to manual deploys. User needs to link via Netlify UI for true CI/CD.
- **Prevention:** Don't assume API-level config equals full integration. Netlify's GitHub connection requires OAuth — verify the first auto-deploy succeeds before telling the user it works.
- **Status:** PARTIALLY FIXED — CI/CD is linked in the Netlify UI (user connected it), but webhooks may not be firing. Recent deploys show no `commit_ref`. Manual deploys used as fallback.

#### 26. OG image placed in src/assets/ instead of public/
- **What happened:** Put `rhai_og.png` in `src/assets/images/`, then had to move it to `public/images/` and delete the original. The `og:image` meta tag requires a static, predictable URL — Astro-processed assets in `src/assets/` get hashed filenames (e.g., `rhai_og.BgQ1nQp_.webp`) that can't be hardcoded in a meta tag.
- **Cause:** Didn't think through the difference between Astro-processed assets (hashed, optimized) and static assets (served as-is from `public/`).
- **Fix:** Moved to `public/images/rhai_og.png` and updated the meta tag.
- **Prevention:** Any asset referenced by a hardcoded URL in meta tags, JSON-LD, or `robots.txt` must go in `public/`, not `src/assets/`. Only assets imported in components via `astro:assets` should go in `src/assets/`.

#### 27. Didn't verify auto-deploy before telling user CI/CD was working
- **What happened:** After setting up CI/CD, committed and pushed. Told the user auto-deploys would handle it. User reported "nothing has changed" — the auto-deploy had silently failed.
- **Cause:** Assumed the push would trigger a successful build without checking. Should have checked `netlify api listSiteDeploys` immediately after pushing.
- **Fix:** Deployed manually after discovering the failure.
- **Prevention:** After setting up any automated pipeline, verify the FIRST run succeeds before telling the user it's working. Check deploy status immediately after the triggering event.

#### 28. Tried to import large SVG through astro:assets Image component
- **What happened:** The secondary header logo (`reyna_house_secondary_logo.svg`, 323KB) was initially going to be imported via `astro:assets` like a PNG. Astro's `<Image>` component doesn't optimize SVGs — it would serve it unchanged or error.
- **Cause:** Treated SVG the same as raster images without considering that Astro's image pipeline is designed for raster formats (PNG, JPG, WebP).
- **Fix:** Moved SVG to `public/images/` and used a plain `<img>` tag.
- **Prevention:** SVGs should go in `public/` and use plain `<img>` tags. Only raster images (PNG, JPG) benefit from `astro:assets` processing.

### Phase P — Copy Updates & Schema (Session 4)

#### 29. Assumed CI/CD wasn't connected without checking current state
- **What happened:** CLAUDE.md error #25 said CI/CD required manual Netlify UI setup. Repeated this to the user and gave a 10-step guide to link the repo — but the repo was already linked. User had to send a screenshot proving it.
- **Cause:** Relied on stale documentation (CLAUDE.md) instead of checking the actual Netlify dashboard state. Didn't run `netlify api getSite` or ask the user before asserting CI/CD was missing.
- **Fix:** N/A — wasted the user's time with unnecessary instructions.
- **Prevention:** Before telling the user something isn't set up, verify the current state first. Check the API or ask the user. Don't parrot old error log entries as current truth.
- **Status:** ACKNOWLEDGED — CI/CD is linked in Netlify UI but webhooks may not be firing (deploys show no `commit_ref`).

#### 30. Created redundant Organization schema alongside existing LocalBusiness schema
- **What happened:** Added a separate `Organization` JSON-LD block with duplicate name, URL, description, and address — all of which already existed in the `LocalBusiness` block. `LocalBusiness` is a subtype of `Organization` in schema.org's hierarchy, so it inherits all Organization properties.
- **Cause:** Didn't consider the schema.org type hierarchy. Treated `Organization` and `LocalBusiness` as separate, independent types.
- **Fix:** Merged into a single `LocalBusiness` block with `logo` and `sameAs` fields added.
- **Prevention:** When adding structured data, check what schemas already exist in the `<head>`. `LocalBusiness` inherits from `Organization` — add `logo`, `sameAs`, and other org-level fields directly to the `LocalBusiness` block. Never create both.
- **Status:** FIXED — Merged into single LocalBusiness block.

#### 31. Didn't deploy after hero copy change without being asked
- **What happened:** User asked to update hero copy. Made the edit but didn't deploy to Netlify. User had to explicitly ask "please deploy." This is the same pattern as error #23 (not pushing to GitHub alongside deploys).
- **Cause:** Waited for explicit instruction instead of proactively deploying after a content change the user clearly wanted live.
- **Fix:** N/A — deployed when asked.
- **Prevention:** When the user asks for a copy/content change to a live site, deploy after making the change. Don't wait to be asked separately.

#### 32. Footer logo change went to production without being committed to git first
- **What happened:** Changed the footer logo and deployed to Netlify, but didn't commit or push to GitHub. The production site had changes that weren't in version control. The commit only happened later when the header logo change bundled both together.
- **Cause:** Treated deploy and commit as separate optional steps instead of a mandatory sequence: commit → push → deploy.
- **Fix:** Both changes were eventually committed together.
- **Prevention:** Never deploy uncommitted changes to production. The sequence is always: edit → commit → push → deploy. Code should be in version control before it goes live.

### Analytics & Anti-Spam (Session 5, 2026-07-29)

#### 33. GA was gated on first interaction, so bounced mobile sessions were never counted
- **What happened:** GA only loaded after scroll/mousemove/touch/keydown/click, with a 15 s fallback. A mobile visitor who landed, read nothing, and left in a few seconds triggered none of those and was never recorded. Session counts and bounce rate were both wrong, and the error skewed exactly toward the visitors worth studying.
- **Cause:** Optimized for the Lighthouse score in isolation without asking what the deferral did to data completeness.
- **Fix:** `requestIdleCallback` with a 2500 ms timeout as the primary trigger, interaction listeners kept as an accelerator, plus a `visibilitychange` backstop. Still outside the FCP→TTI window.
- **Prevention:** Deferring a third-party script is a performance decision AND a measurement decision. Ask what population the deferral silently excludes before shipping it.

#### 34. Contact form required a phone number and had no email field
- **What happened:** 7 `form_start` events over 90 days produced 0 submissions. The form marked Phone as required and offered no email input at all, so a stranger could not make contact without handing over a phone number.
- **Cause:** Built around the call-first sales motion without considering that a first-touch web visitor has not agreed to a phone call yet.
- **Fix:** Added an email field, made phone optional, enforced "email OR phone" with `setCustomValidity` so no lead arrives unreachable.
- **Prevention:** For a cold web form, ask for the lowest-commitment contact method that still works. Required fields are where conversion dies.

#### 35. Netlify form had no submission notification configured at all
- **What happened:** The site collected form submissions for five months with zero notification hooks. Any real lead would have sat unseen in the Netlify dashboard.
- **Cause:** Form wiring was verified end-to-end (submission lands) but the delivery path (Edward finds out) was never checked.
- **Fix:** Created a `submission_created` email hook via `netlify api createHookBySiteId`.
- **Prevention:** "The form works" means the notification arrived, not that the submission was stored. Test the whole chain.

#### 36. Declaring the Netlify form inline exposed form-name and let bots bypass the honeypot
- **What happened:** Four spam submissions cleared the honeypot between June and July. The homepage carried `data-netlify="true"` and a readable `<input name="form-name" value="contact">`, so scrapers could POST straight to Netlify's form endpoint. The honeypot never ran because the form was never actually used.
- **Cause:** Assumed the honeypot was the defense. It only defends against bots that submit the form as rendered, which is the minority.
- **Fix:** Homepage form no longer declares a Netlify form. The real form is declared only on the noindexed, sitemap-excluded `/forms/registry/` page under an opaque name; `netlify/functions/contact-submit.mjs` gates every submission and forwards clean ones.
- **Second discovery:** Removing the form from the page HTML does **not** deregister it. Netlify kept accepting POSTs to `form-name=contact` after it vanished from every deploy; a verification POST landed successfully. Retiring a form requires `netlify api deleteSiteForm`, not just deleting the markup.
- **Prevention:** Never verify a security fix by reading the code. POST the old attack path and confirm the submission count did not move.

#### 38. The chat function trusted the browser's version of what Alyssa had said
- **What happened:** `chat.mjs` accepted the full message array from the client, assistant turns included, and passed it straight to the model. Anyone could POST a fabricated transcript in which Alyssa had already quoted a price or made a guarantee, add one more user turn, and get a reply that read as confirmation. The words would have been genuinely ours; the history would have been invented.
- **Cause:** The widget holds conversation state in the browser and posts it each turn, so the server had no independent record to compare against. The stored transcript in Blobs existed for the admin dashboard and was never used as the source of truth for the model.
- **Fix:** `loadHistory()` rebuilds context from the Blobs store; only the visitor's newest user message is taken from the payload. Assistant turns are now exclusively server-authored. On a storage failure it returns `[]` — losing context degrades one reply, whereas trusting the client forges the record. Stored transcripts capped at 200 messages.
- **Verified:** a forged history claiming "$499 flat and page one of Google in 30 days" produced "I don't have those numbers on file… I'm not aware of a 30-day page-one guarantee." A control conversation still carried "roofing company in Riverside" into the next turn, so server-side memory works.
- **Prevention:** Never let the client supply the assistant's side of a conversation. If the server can't reconstruct history independently, the transcript is a claim, not a record.

#### 37. The chat function was unauthenticated with no rate limit
- **What happened:** `netlify/functions/chat.mjs` accepted unlimited anonymous POSTs, each one billing the Anthropic account. Found incidentally while closing the form hole.
- **Cause:** Built for the happy path; abuse was never modeled.
- **Fix:** 30/hour per IP via the shared limiter in `netlify/functions/_ratelimit.mjs` (Netlify Blobs, fails open).
- **Prevention:** Any public endpoint that spends money needs a ceiling on day one.

### Measurement & Lead Capture (Session 6, 2026-08-13 → 2026-08-15)

#### 39. The CSP blocked GA4's data beacons for four months
- **What happened:** `connect-src` allowed `www.google-analytics.com`, `*.google-analytics.com` and `*.analytics.google.com`. GA4 posts to the **bare host** `analytics.google.com`, plus `stats.g.doubleclick.net` and `www.google.com`. A CSP wildcard requires at least one subdomain label, so `*.analytics.google.com` never matched `analytics.google.com`. In a clean headless Chrome load, `gtag/js` fetched `200` and **zero collect beacons completed**. Introduced 2026-04-14 in `91c65a0`, found 2026-08-13.
- **Why nobody noticed:** the tracking script loaded fine, so the install looked correct; CSP refusals only appear in the browser console; GA still trickled data through the one host that did match, so the dashboard was never suspiciously empty; and the low numbers agreed with the story everyone already believed ("we have no traffic yet"). Proof after the fix: 08-10→08-12 returned *no data in range*, 08-13→08-15 returned 4 sessions.
- **Compounding cause:** the CSP was introduced *by* the commit titled "Fix mobile Lighthouse perf (34→98), a11y, and best practices" — and Lighthouse was never re-run afterward. The tool that would have caught it was the tool that had just been satisfied.
- **Prevention:** re-run Lighthouse *after* shipping a security-header change, not just before. Treat "did analytics record my own visit today?" as a monthly check. A wildcard never matches the bare host — list both.

#### 40. `generate_lead` counted blocked spam as conversions
- **What happened:** the spam gate deliberately answers a rejected payload with the same `200 {ok:true}` it gives a real one, so a bot cannot learn why it failed. The client fired `generate_lead` on `response.ok`, so **every blocked submission was recorded as a lead**. Surfaced when GA showed 1 lead in a window with 0 form submissions on record.
- **Fix:** a genuine acceptance now returns a `ref` receipt and the conversion fires on that alone; every submit is separately tracked as `form_submit_attempt`. The rejection response is byte-identical to before and still discloses no reason.
- **Prevention:** a success-shaped response designed to deceive bots will deceive your analytics too. Fire conversions on a signal the server only emits on the real path.

#### 41. The spam blocklist contained Reyna House's own service vocabulary
- **What happened:** `BLOCKLIST` held `'seo services'` and `'digital marketing agency'`. A real prospect writing "I need help with SEO services" matched a spam rule, was **silently discarded**, and saw a success message. Rejections were logged and dropped — "Logged, not stored… A real visitor never sees this path" — and function logs age out, so any false positive was unrecoverable.
- **Also false:** `stale_token` fires on a tab left open past 12h and `too_fast` on an autofill. Real people absolutely reach that path.
- **Fix:** both terms removed; a blocklist may only hold phrases **a seller uses and a buyer does not**. Rejected payloads now land in the `contact-quarantine` blob store (`netlify blobs:list contact-quarantine`) instead of being destroyed.
- **Prevention:** never blocklist the words your own customers use to describe what they want to buy. Never make a filter's rejection unrecoverable.

#### 42. Deleting a Netlify form does not stick while any deployed HTML still declares it
- **What happened:** issue #36 removed the homepage form markup and deregistered the `contact` form. It came back. `public/form-placeholder.html` — a leftover from the original build whose only purpose was to make Netlify detect a form named `contact` — still shipped in every deploy, and Netlify re-detects forms from deployed HTML each time. A direct `POST` of `form-name=contact` to `/` landed a real submission on 2026-08-15, months after the hole was believed closed.
- **Fix:** deleted the placeholder, deployed **first**, then ran `deleteSiteForm`. Order matters — deleting the form before the deploy just lets the deploy recreate it. Re-attacking the path afterward returns `404` with no submission recorded.
- **Prevention:** `grep -r 'form-name' dist/` after any form change. Deregistering a form means removing **every** declaration of it, then deploying, then deleting. And per #36's own rule: verify by POSTing the attack path, never by reading the code.
