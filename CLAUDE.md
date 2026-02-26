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
- CI/CD not yet connected — currently using manual `netlify deploy --prod --dir=dist`

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
- **Status:** NOT FIXED — Currently using generic search URL. Needs direct Google Business profile link.

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
- **Status:** NOT FIXED — `.DS_Store` still not in `.gitignore`.

#### 17. Logo PNG has opaque background on dark surfaces
- **What happened:** The Reyna House logo PNG has a light gray circular background. It was placed directly into the navy header and near-black footer without flagging that the light circle would be visible against dark backgrounds.
- **Cause:** Didn't inspect the image's transparency characteristics before integrating it. Assumed it would look fine.
- **Fix:** Either use a version of the logo with a transparent background, or accept the light circle as intentional branding.
- **Prevention:** When integrating logos or icons, check whether the image has transparency and consider how it will render against the target background color. Flag potential issues to the user before deploying.
- **Status:** NOT FIXED — Needs user decision on whether the light circle background is intentional.

#### 18. Photo crop not verified
- **What happened:** Edward's headshot was set to `400x480` (5:6 ratio) with `object-fit: cover` and `object-position: center top`. The original photo has a different aspect ratio, meaning parts of the image are cropped. Did not preview or mention what would be cut off.
- **Cause:** Assumed `center top` positioning would frame the subject well without verifying.
- **Fix:** User should review the live site and confirm the crop is acceptable. Adjust `object-position` or dimensions if needed.
- **Prevention:** When cropping user photos via CSS, mention what will be cut and offer to adjust positioning.
- **Status:** NOT VERIFIED — Needs user review on live site.
