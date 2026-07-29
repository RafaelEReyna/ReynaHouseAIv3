# ReynaHouseAI.com — Build Blueprint & LLM Prompt Plan
### Version 1.6 (Revised) | Astro + Tailwind CSS + Netlify

> **Revision note (v1.1):** Added Issues #6–#12 discovered during the build. Affected micro-steps and prompts now carry ⚠️ inline warnings linking back to the Issue Log. A "Non-Issues" section and "Bug Impact Summary" have been added at the end of Part 5.
>
> **Revision note (v1.2):** Added Issues #13–#17 covering deployment & infrastructure errors (GitHub auth, Netlify CLI). Step 2 now has a dedicated set of micro-steps and a new Prompt 1b with inline warnings. These 5 errors doubled the command count for deployment setup — 3 of them (auth check, interactive CLI, slug guess) were fully avoidable.
>
> **Revision note (v1.3):** Added Issues #18–#23 covering assets & content integration errors. Issue #18 (fabricated review text) was the worst error in the entire project — real words were put in a real person's mouth. A new Phase 15 and Chunk L have been added for the asset integration workflow, along with a new Prompt 16. All affected micro-steps and prompts now carry ⚠️ inline warnings. The key theme: never fabricate content, never "clean up" URLs you don't understand, never assume cloud-synced file paths are accessible, and always verify visual integration of user-provided assets.
>
> **Revision note (v1.4):** Added Issues #24–#29 covering polish & portfolio integration errors. Issue #24 (transparent logo swap without previewing) and Issue #27 (hero monogram at 8% opacity) are both "deploy first, check later" mistakes. Issue #25 (Playwright `--full-page` screenshots) and Issue #26 (no fixed height on portfolio image containers) broke the portfolio card layout. Issue #28 (not pushing to GitHub alongside Netlify deploys) is a workflow gap — deploy to both in one step. Issue #29 (orphaned full-page PNGs still in repo) is a cleanup oversight — always delete old assets when replacing them. A new Phase 16, Chunk M, and Prompt 17 have been added for the polish & portfolio integration workflow.
>
> **Revision note (v1.5):** Added Issues #30–#33 covering post-build infrastructure and deployment errors. Issue #30 (CI/CD setup via API didn't grant GitHub permissions) — Netlify's `updateSite` API can set build settings but does NOT establish the OAuth connection to GitHub; that requires the web UI. Issue #31 (OG image placed in `src/assets/` instead of `public/`) — assets referenced by hardcoded URLs in meta tags must go in `public/`, not `src/assets/`, because Astro hashes processed filenames. Issue #32 (didn't verify auto-deploy before assuming CI/CD was working) — after setting up any automated pipeline, verify the first run succeeds before declaring it done. Issue #33 (SVG imported through `astro:assets` Image component) — Astro's `<Image>` component is for raster formats; SVGs should go in `public/` with a plain `<img>` tag. A new Phase 17, Chunk N, and Prompt 18 have been added for the post-build infrastructure workflow. Warnings added to Prompt 1b (deployment), Prompt 13 (SEO), and Prompt 16 (assets).
>
> **Revision note (v1.6):** Added Issues #34–#37 covering go-live, domain migration, and Netlify form detection. Issue #34 (Netlify `ignore_html_forms` silently disabled form detection) was the root cause of form 404s — a site-level setting that prevented Netlify from ever registering forms, regardless of correct HTML markup. Issue #35 (form `action` redirect replaced with JS fetch submission) — using JavaScript `fetch` to POST form data is more reliable than relying on Netlify's HTML form rewriting plus page redirect. Issue #36 (OG image URL still referenced old Netlify staging domain after going live) — when migrating to a production domain, search the entire codebase for the old URL. Issue #37 (no sitemap integration or `site` property until go-live) — `@astrojs/sitemap` and the `site` config should be added when the production domain is set. A new Phase 18, Chunk O, and Prompt 19 have been added for the go-live & domain migration workflow.

---

## PART 1: DETAILED STEP-BY-STEP BLUEPRINT

### Phase 1 — Project Foundation

1. Scaffold a new Astro project with Tailwind CSS (image optimization is built-in via `astro:assets` — no separate integration needed) — ⚠️ **ISSUE #21:** Add `.DS_Store` to `.gitignore` immediately after scaffold. macOS creates these in any directory that gets new files; they will be caught by `git add .` or `git add -A` if not excluded.
2. Set up the GitHub repo and connect to Netlify for CI/CD deploys — ⚠️ **ISSUES #13–#17:** Check auth before pushing, use non-interactive CLI commands, look up account slugs via API. See Prompt 1b. — ⚠️ **ISSUES #30, #32:** Do NOT use `netlify api updateSite` for CI/CD — it doesn't grant GitHub OAuth permissions. If CI/CD is set up, verify the first auto-deploy succeeds before telling the user it works.
3. Define all brand CSS variables in `global.css`
4. Import Google Fonts (Bebas Neue, ~~Playfair Display,~~ Inter, IBM Plex Mono) — ⚠️ **ISSUE #11:** Playfair Display was never used; remove it
5. Create the base `Layout.astro` with full `<head>` (SEO meta tags, favicon, theme-color, JSON-LD schema)
6. Create `404.astro` as an on-brand custom error page
7. Scaffold all empty component files in `/src/components/`
8. Scaffold `index.astro` that imports all components in section order

### Phase 2 — Global UI Primitives

9. Build the sticky `Header.astro` with logo, anchor nav links, and Copper CTA "Contact" button
10. Build the `Footer.astro` with 3-column layout, social icons, tagline, and copyright

### Phase 3 — Hero Section

11. Build `Hero.astro` with Navy-to-dark gradient + SVG noise texture overlay
12. Add overline label, H1 headline, and subheadline with correct typography
13. Add Primary CTA button (Copper) linking to `#contact`
14. Add Secondary text-link CTA linking to `#portfolio`
15. Add the Trust Bar with 3 icon badges — ⚠️ **ISSUE #27:** The right-column decorative "RH" monogram must be visible. Do NOT set opacity below 12–15%. At 8% opacity it looks like a rendering artifact, not a design element.

### Phase 4 — Pain Point Section

16. Build `PainPoint.astro` on Cream background
17. Add overline, headline, and body copy blocks
18. Build the 3-column icon grid for missed calls / invoices / scheduling

### Phase 5 — Difference Section

19. Build `Difference.astro` on Navy background
20. Add overline, headline, and body copy
21. Build the two side-by-side comparison cards (Wix vs. Reyna House)

### Phase 6 — Services Section

22. Build `Services.astro` on Cream background
23. Add overline, headline, and intro copy
24. Build the 3 service cards with icons, titles, body, and "Coming Soon" badges
25. Style desaturated state for Coming Soon cards — ⚠️ **ISSUE #6:** Do NOT use `opacity` for the desaturated look if you also use `data-animate`. Use `filter` or muted colors instead.

### Phase 7 — Portfolio Section

26. Build `Portfolio.astro` on dark Navy background
27. Add overline, headline
28. Build the 2×2 responsive portfolio card grid — ⚠️ **ISSUE #26:** Set a fixed height (e.g., `height: 220px`) on image containers with `object-fit: cover` and `object-position: top`. Do NOT use `height: auto` — source images will dictate card proportions and produce inconsistent card sizes.
29. Style the special "Demo" card (Copper border, glow, star badge)
30. Add the below-grid CTA

### Phase 8 — Pricing Section

31. Build `Pricing.astro` on Cream background
32. Add overline, headline, philosophy note
33. Build 3 pricing tier cards (no dollar amounts) with badges and CTAs
34. Add the Add-Ons callout below the cards

### Phase 9 — About Section

35. Build `About.astro` on dark Navy background
36. Add overline, headline, body copy
37. Add photo placeholder with authentic description comment — ⚠️ **ISSUE #23:** When the real photo is integrated, verify the crop. If using `object-fit: cover` with a different aspect ratio than the original, mention what will be cut off and offer to adjust `object-position`. Do not assume `center top` will frame the subject correctly.
38. Add the stats/badges row and social icon links

### Phase 10 — Testimonials Section

39. Build `Testimonials.astro` on Cream background
40. Add overline, headline
41. Build 2 testimonial cards (name, stars, review text) — ⚠️ **ISSUE #18:** Use ONLY exact review text provided by the user. If a review is truncated or incomplete, STOP and ask for the full text. NEVER fabricate, paraphrase, or guess at what a real person said.
42. Add "View on Google" link and star rating summary — ⚠️ **ISSUE #19:** Use the exact Google Business URL the user provides. Do NOT "clean up" or simplify URLs — parameters like `&stick=` and `&mat=` have functional meaning. If the URL looks unwieldy, ask the user for their Google Maps / `g.page` short link instead of replacing it with a generic search query.

### Phase 11 — Contact Section

43. Build `Contact.astro` on dark gradient background
44. Add overline, headline, subheadline
45. Build the two-column layout (left: contact info + "What happens next" steps; right: Calendly embed) — ⚠️ **ISSUE #8:** Do NOT use `is:inline` with external Calendly `src`
46. Build the Netlify Forms backup contact form with all required fields
47. Add form success state message — ⚠️ **ISSUE #7:** Must add `action="/?submitted=true"` to the `<form>` tag or Netlify won't redirect with the query param

### Phase 12 — SEO & Schema

48. Add `LocalBusiness` JSON-LD structured data to `Layout.astro` — ⚠️ **ISSUE #38:** Include `logo`, `sameAs` (social profiles), and all Organization-level fields directly in the `LocalBusiness` block. Do NOT create a separate `Organization` schema — `LocalBusiness` is a subtype of `Organization` in schema.org, so it inherits all Organization properties. Creating both produces redundant duplicate data (name, URL, address, description all repeated). Ask the user for their social media URLs upfront and include them in this single block.
49. Add FAQ `ItemList` JSON-LD schema with all 4 FAQ entries
50. Add hidden FAQ section in the DOM (visually minimal, rich for crawlers)
51. Verify all Open Graph and Twitter Card meta tags — ⚠️ **ISSUE #31:** The `og:image` URL must point to a static file in `public/`, NOT an Astro-processed asset from `src/assets/`. Astro hashes processed filenames, making them unpredictable for hardcoded meta tag URLs. Place the OG image in `public/images/` and reference it as `/images/og-image.png`.

### Phase 13 — Scroll Animations

52. Write a lightweight `scroll-observer.js` using Intersection Observer API — ⚠️ **ISSUE #9:** Must include a feature-detection fallback
53. Apply `data-animate` attributes to each section for fade-in-on-scroll — ⚠️ **ISSUE #6:** Do NOT apply `data-animate` to elements that have their own scoped `opacity` values

### Phase 14 — Performance & Polish

54. Replace all `<img>` tags with Astro `<Image>` component — ⚠️ **ISSUE #33:** Do NOT use the Astro `<Image>` component for SVG files. Astro's image pipeline is for raster formats (PNG, JPG, WebP). SVGs should stay in `public/` and use plain `<img>` tags. Only convert raster `<img>` tags to `<Image>`.
55. Add `font-display: swap` to font CSS
56. Audit and remove unused Tailwind classes
57. Add `<meta name="theme-color" content="#334668">`
58. Test all anchor links, form submission, and Calendly embed
59. Run Lighthouse audit — target 95+ performance

### Phase 15 — Assets & Content Integration *(new in v1.3)*

60. Collect all assets from the user — ⚠️ **ISSUE #20:** If the user's files are in iCloud, Google Drive, or other cloud-synced locations, tell them to drop the files into the project directory manually. Do NOT attempt to `cp` from `~/Library/Mobile Documents/`, `~/My Drive/`, or similar cloud-synced paths — they require permissions this terminal doesn't have.
61. Integrate logo into Header and Footer — ⚠️ **ISSUE #22:** Inspect the logo for transparency. If the logo has an opaque background (e.g., a light gray circle), flag how it will render against dark surfaces (navy header, near-black footer) and ask the user whether this is intentional or if a transparent-background version should be used.
62. Integrate headshot photo into About section — ⚠️ **ISSUE #23:** When setting `object-fit: cover` with a target aspect ratio different from the original photo, explicitly mention what will be cropped and offer to adjust `object-position`. Do not assume any positioning will frame the subject well.
63. Replace placeholder testimonial text with real reviews — ⚠️ **ISSUE #18:** Use ONLY the exact text the user provides, word for word. If a review is truncated, cut off, or partially visible in a screenshot, STOP and ask for the full text. NEVER invent, paraphrase, or "complete" a real person's words. This was the worst error in the entire project.
64. Replace placeholder URLs with real links (social media profiles, Google Business URL) — ⚠️ **ISSUE #19:** Use the exact URL the user provides. Do NOT simplify, shorten, or "clean up" URLs whose parameters you don't understand. If unsure whether a URL is permanent, ask the user — don't replace it with a generic alternative.
65. Add `.DS_Store` to `.gitignore` — ⚠️ **ISSUE #21:** Should have been done in Phase 1. macOS creates `.DS_Store` files in any directory that receives new files. Without this entry, any future `git add .` or `git add -A` will stage them.
66. Commit and deploy with all real assets — use specific file paths in `git add`, not `git add -A`, to avoid staging unwanted files — ⚠️ **ISSUE #28:** Push to BOTH Netlify AND GitHub in the same step. Do not deploy to Netlify without also pushing to GitHub. The user should not have to ask twice.

### Phase 16 — Polish & Portfolio Integration *(new in v1.4)*

67. Capture portfolio screenshots at viewport size only — ⚠️ **ISSUE #25:** Do NOT use `--full-page` flag with Playwright or any screenshot tool. Full-page captures produce extremely tall vertical images that destroy card layouts. Capture at a fixed viewport (e.g., 1280×800) or crop to a landscape aspect ratio. Check the first screenshot's dimensions before capturing all remaining sites.
68. Enforce fixed height on portfolio image containers — ⚠️ **ISSUE #26:** Set `height: 220px` (or similar fixed value) on `.portfolio__image-wrap` with `object-fit: cover` and `object-position: top` on the `<img>`. Do NOT use `height: auto` — source images will dictate card proportions and produce inconsistent sizes across the grid.
69. Verify decorative elements are actually visible — ⚠️ **ISSUE #27:** The hero right-column "RH" monogram was set to 8% opacity — so faint it looked like a rendering artifact. If a decorative element is meant to be noticed, use at least 12–15% opacity. Preview decorative elements against their actual backgrounds before deploying.
70. Do NOT swap logo variants without previewing first — ⚠️ **ISSUE #24:** Before deploying any logo change (e.g., transparent background version), preview how the new version renders against ALL target backgrounds (navy header, dark footer, hero section). Do not assume removing a background will look better. Flag the tradeoff to the user before deploying.
71. Delete orphaned asset files when replacing them — ⚠️ **ISSUE #29:** When replacing asset files with new versions, delete the old files in the same commit. Do NOT leave unused PNGs or images in the repo. Check for orphaned files after swapping imports by searching for the old filenames in the codebase.
72. Push to both Netlify and GitHub on every deploy — ⚠️ **ISSUE #28:** When the user says "deploy" or "push everywhere," push to both Netlify (`netlify deploy --prod --dir=dist`) and GitHub (`git push`) in the same step. Do not wait to be asked separately for each.

### Phase 17 — Post-Build Infrastructure & Deployment *(new in v1.5)*

73. Do NOT rely on `netlify api updateSite` for CI/CD — ⚠️ **ISSUE #30:** Using the Netlify API to set `repo.provider`, `repo.repo_path`, `repo.branch`, and build settings does NOT establish the GitHub OAuth connection. The API call will succeed, but the first auto-deploy will fail with "Unable to access repository — Host key verification failed." Netlify needs GitHub OAuth permissions granted through their web UI (Site configuration > Build & deploy > Link to Git). If the user needs true CI/CD, direct them to the Netlify web UI. Otherwise, stick to manual deploys (`netlify deploy --prod --dir=dist`).
74. Place OG images and meta-tag assets in `public/`, not `src/assets/` — ⚠️ **ISSUE #31:** Any asset referenced by a hardcoded URL in `<meta>` tags (`og:image`, `twitter:image`), `robots.txt`, `sitemap.xml`, or JSON-LD `schema.org` must go in `public/`. Astro-processed assets in `src/assets/` get hashed filenames (e.g., `rhai_og.BgQ1nQp_.webp`) that can't be predicted or hardcoded in meta tags. Only assets imported in components via `import { Image } from 'astro:assets'` should go in `src/assets/`.
75. Verify auto-deploys actually work before telling the user CI/CD is connected — ⚠️ **ISSUE #32:** After setting up any automated deployment pipeline, verify the FIRST run succeeds before declaring it done. Push a commit, then immediately check `netlify api listSiteDeploys` (or the equivalent status check). If the deploy fails, tell the user and fall back to manual deploys. Do not assume the push triggered a successful build.
76. Serve SVGs from `public/` with plain `<img>` tags — ⚠️ **ISSUE #33:** Astro's `<Image>` component (from `astro:assets`) is designed for raster formats (PNG, JPG, WebP). It does not optimize SVGs the same way — it may serve them unchanged or error. Large SVGs (e.g., 323KB logo) should go in `public/images/` and be referenced with a plain `<img src="/images/logo.svg">` tag. Only raster images benefit from `astro:assets` processing (format conversion, resizing, quality optimization).

### Phase 18 — Go-Live & Domain Migration *(new in v1.6)*

77. Verify Netlify form detection is enabled — ⚠️ **ISSUE #34:** Check `processing_settings.ignore_html_forms` via `netlify api getSite`. If `true`, forms will NEVER be detected regardless of correct HTML markup. Set to `false` via `netlify api updateSite`, then redeploy.
78. Add `public/form-placeholder.html` — a bare-bones hidden HTML form for reliable Netlify form detection — ⚠️ **ISSUE #34:** Netlify's form detection can fail on complex Astro-generated HTML. A plain HTML file with a simple `<form name="contact" netlify hidden>` gives Netlify an easy target to parse. This file is not user-facing.
79. Switch contact form to JavaScript `fetch` submission — ⚠️ **ISSUE #35:** Instead of relying on the HTML `action` redirect (which requires Netlify to rewrite the form and redirect after submission), intercept the submit event with JavaScript and POST via `fetch`. This provides a smoother UX (inline success message, no page reload) and is more reliable across deploy methods.
80. Update all hardcoded URLs from staging domain to production domain — ⚠️ **ISSUE #36:** Search the entire codebase for the old Netlify staging URL (e.g., `yoursite.netlify.app`) and replace with the production domain. Key locations: `og:image` meta tag, `og:url` meta tag, JSON-LD `url` field, `robots.txt` sitemap reference, `astro.config.mjs` `site` property.
81. Add `site` property to `astro.config.mjs` with the production domain URL — ⚠️ **ISSUE #37:** This property is required for `@astrojs/sitemap` to generate correct URLs and for Astro to produce canonical URL references.
82. Install `@astrojs/sitemap` integration — run `npx astro add sitemap` — ⚠️ **ISSUE #37:** The sitemap should be added when the production domain is set, not before. Adding it with a staging URL produces a sitemap full of `yoursite.netlify.app` URLs.
83. Update `robots.txt` with sitemap reference pointing to the production domain
84. Update favicon to final brand icon — place the favicon PNG in `public/` and update the `<link rel="icon">` tag in Layout.astro
85. Submit sitemap to Google Search Console — go to Search Console, submit `https://yourdomain.com/sitemap-index.xml`, and request indexing of the homepage
86. Build, deploy, and push to both Netlify and GitHub — ⚠️ **ISSUE #28:** Always push to both in the same step

---

## PART 2: ITERATIVE CHUNKS

### Chunk A — Scaffold & Config *(completed with issues — see Part 5)*
- Steps 1–8: Get a working, deployable project shell with no content but all structure in place
- **Note:** Step A3 (`astro add image`) was removed — `astro:assets` is built-in since Astro v3
- **Note:** ⚠️ Playfair Display font should be removed from import (Issue #11). Font loading should use `<link>` not `@import` (Issue #12).
- **Note:** ⚠️ Deployment setup (GitHub + Netlify) has 5 documented pitfalls (Issues #13–#17). Ask user about existing repos first, verify auth before pushing, use non-interactive CLI flags, and look up account slugs via API instead of guessing from display names.
- **Note:** ⚠️ CI/CD via Netlify API does NOT work (Issues #30, #32). `netlify api updateSite` can set build settings but does NOT grant GitHub OAuth permissions. If CI/CD is needed, the user must link via Netlify web UI. Always verify the first auto-deploy succeeds before declaring CI/CD is working.
- **Note:** ⚠️ Add `.DS_Store` to `.gitignore` immediately during scaffold (Issue #21). This prevents macOS metadata files from being staged in future commits.

### Chunk B — Shell Components
- Steps 9–10: Header and Footer completed; nav works, footer renders

### Chunk C — Hero
- Steps 11–15: Full Hero section renders with correct brand styling, CTAs, and trust bar

### Chunk D — Pain + Difference
- Steps 16–21: Two content sections that establish the problem and the brand differentiator

### Chunk E — Services
- Steps 22–25: Three service cards render correctly with Coming Soon state
- **Note:** ⚠️ Coming Soon cards must NOT use `opacity` for desaturation if `data-animate` is also applied (Issue #6)

### Chunk F — Portfolio
- Steps 26–30: Portfolio grid works on desktop and mobile with demo card styled distinctly
- **Note:** ⚠️ Portfolio image containers MUST have a fixed height (e.g., `height: 220px`) with `object-fit: cover` (Issue #26). Do NOT use `height: auto` — source images will dictate card proportions, producing inconsistent card sizes across the grid.

### Chunk G — Pricing
- Steps 31–34: Three pricing cards with no prices, correct badges, all CTAs link to #contact

### Chunk H — About + Social Proof
- Steps 35–42: About section and Testimonials section both complete
- **Note:** ⚠️ Testimonial cards use placeholder text (Issue #18). When replacing with real reviews, use ONLY exact text provided by the user — NEVER fabricate or complete truncated reviews. The Google Business "View on Google" link must use the user's actual URL, not a generic search query (Issue #19).

### Chunk I — Contact & Integrations
- Steps 43–47: Calendly embed, Netlify form, success state all wired up
- **Note:** ⚠️ Three issues here — Calendly `is:inline` (Issue #8), form success redirect (Issue #7), and the Calendly script approach needs testing

### Chunk J — SEO & Schema
- Steps 48–51: Structured data and all meta tags complete
- **Note:** ⚠️ The `og:image` asset MUST be in `public/images/`, NOT `src/assets/images/` (Issue #31). Astro hashes processed filenames, making them unpredictable for hardcoded meta tag URLs.
- **Note:** ⚠️ Use ONE `LocalBusiness` schema block — do NOT create a separate `Organization` block (Issue #38). `LocalBusiness` inherits from `Organization`, so add `logo`, `sameAs` (social profiles), and all org-level fields directly to it. Ask the user for social media URLs and city/state before writing the schema.

### Chunk K — Animation & Final Polish
- Steps 52–59: Scroll animations, performance optimizations, final QA
- **Note:** ⚠️ scroll-observer.js needs IntersectionObserver fallback (Issue #9). Hamburger button needs `:focus-visible` style (Issue #10). `data-animate` must not be placed on Coming Soon cards that use `opacity` (Issue #6).
- **Note:** ⚠️ When replacing `<img>` with `<Image>`, do NOT convert SVG files — Astro's image pipeline is for raster formats only (Issue #33). SVGs stay in `public/` with plain `<img>` tags.

### Chunk L — Assets & Content Integration *(new in v1.3)*
- Steps 60–66: Replace all placeholders with real assets and content
- **Note:** ⚠️ This chunk has 6 documented issues (Issues #18–#23). The worst error in the entire project (#18, fabricated review text) occurred during this phase. Key rules: (1) NEVER fabricate content — if incomplete, ask for the full version. (2) NEVER "clean up" URLs you don't understand. (3) Tell the user to drop files into the project directory — don't attempt to copy from cloud-synced paths. (4) Inspect all visual assets against their target backgrounds before deploying. (5) Verify photo crops and mention what gets cut off.
- **Note:** ⚠️ When deploying after this chunk, push to BOTH Netlify and GitHub in the same step (Issue #28). Do not wait to be asked twice.

### Chunk M — Polish & Portfolio Integration *(new in v1.4)*
- Steps 67–72: Capture portfolio screenshots, enforce image container heights, verify decorative elements, preview logo changes, delete orphaned assets, push to both remotes
- **Note:** ⚠️ This chunk has 6 documented issues (Issues #24–#29). Key themes: (1) NEVER deploy design changes (logo swaps, opacity tweaks) without previewing first (Issue #24). (2) Capture portfolio screenshots at viewport size, NOT full-page height (Issue #25). (3) Always constrain image container heights — don't rely on source images being the right ratio (Issue #26). (4) If a decorative element is meant to be seen, 8% opacity is too low — use at least 12–15% (Issue #27). (5) Push to both Netlify and GitHub on every deploy (Issue #28). (6) Delete old asset files when replacing them — don't leave orphaned files in the repo (Issue #29).

### Chunk N — Post-Build Infrastructure & Deployment *(new in v1.5)*
- Steps 73–76: Verify CI/CD actually works (or use manual deploys), place meta-tag assets in `public/`, verify auto-deploys before declaring success, serve SVGs from `public/` with plain `<img>` tags
- **Note:** ⚠️ This chunk has 4 documented issues (Issues #30–#33). Key themes: (1) The Netlify API can set build settings but does NOT establish the GitHub OAuth connection — CI/CD setup requires the Netlify web UI (Issue #30). (2) Any asset referenced by a hardcoded URL in meta tags (`og:image`) must go in `public/`, not `src/assets/` — Astro hashes processed filenames (Issue #31). (3) After setting up any automated pipeline, verify the first run succeeds before telling the user it works — don't assume a push triggered a successful build (Issue #32). (4) Astro's `<Image>` component is for raster formats; SVGs should go in `public/` with plain `<img>` tags (Issue #33).

### Chunk O — Go-Live & Domain Migration *(new in v1.6)*
- Steps 77–86: Fix Netlify form detection, switch to JS fetch form submission, update all URLs to production domain, add sitemap integration, update favicon, submit to Google Search Console
- **Note:** ⚠️ This chunk has 4 documented issues (Issues #34–#37). Key themes: (1) Netlify's `ignore_html_forms` site setting silently disables ALL form detection — check it via the API before debugging form markup (Issue #34). (2) JavaScript `fetch` form submission is more reliable than HTML `action` redirects for Netlify forms (Issue #35). (3) When migrating to a production domain, search the entire codebase for the old staging URL — hardcoded URLs in meta tags, JSON-LD, and config files won't update themselves (Issue #36). (4) The sitemap integration and `site` config should only be added once the production domain is set — adding them earlier produces sitemaps with staging URLs (Issue #37).

---

## PART 3: MICRO-STEPS PER CHUNK

### Chunk A Micro-Steps
- A1. Run `npm create astro@latest` with minimal starter template — ⚠️ **ISSUE #1:** Target dir must be completely empty (`.claude/` folder caused rejection). Scaffold went to `./y` subdirectory; required `cp -r y/. .` and `rm -rf y` to fix.
- A2. Run `npx astro add tailwind` — accept all defaults — ⚠️ **ISSUE #2:** After copying from `./y`, symlinks in `node_modules/.bin` were broken. Fix: `rm -rf node_modules && npm install` before running this step.
- ~~A3. Run `npx astro add image` — accept all defaults~~ — ❌ **ISSUE #3:** REMOVED. `@astrojs/image` is deprecated and does not exist for Astro v5. Image optimization is built-in via `astro:assets` since Astro v3. Use `import { Image } from 'astro:assets'` directly in components — no integration needed.
- A4. Create `/src/styles/global.css` with CSS custom properties for all brand colors
- A5. Create `/src/styles/fonts.css` with Google Fonts `@import` for Bebas Neue, Inter, IBM Plex Mono — ⚠️ **ISSUE #11:** Do NOT include Playfair Display — it is never used by any component in this project. Loading it wastes bandwidth. — ⚠️ **ISSUE #12:** Prefer a `<link>` tag in Layout.astro `<head>` instead of CSS `@import`. The `@import` method creates a render-blocking chain (HTML → CSS → @import → font CSS). A `<link>` tag lets the browser discover the font URL earlier.
- A6. Create `/src/layouts/Layout.astro` with `<html>`, `<head>`, and `<slot />` — ⚠️ **ISSUE #4:** CSS imports must go in the frontmatter (`---`) block, NOT in the HTML `<head>`. `<import '...' />` is not valid Astro syntax. Use `import '../styles/fonts.css';` inside the `---` fences.
- A7. Add all SEO meta tags to `Layout.astro` head (title, description, OG, Twitter, theme-color, favicon)
- A8. Create empty stubs for all 11 component files
- A9. Create `index.astro` that imports Layout and all components in correct order
- A10. Create on-brand `404.astro`
- A11. Verify `package.json` name is correct — ⚠️ **ISSUE #5:** Scaffold set `"name": "y"` from the subdirectory name. Must manually fix to `"reynahouseai"`.
- A11b. Add `.DS_Store` to `.gitignore` — ⚠️ **ISSUE #21:** macOS creates `.DS_Store` files in any directory that receives new files. Without this entry in `.gitignore`, these files will be caught by any future `git add .` or `git add -A`. Add the entry now, during scaffold, before any commits — not later when it's easy to forget.
- A12. Ask user if they already have a GitHub repo or if one should be created — ⚠️ **ISSUE #13:** Do NOT assume you need to create a repo. Do NOT ask about repo name/visibility unprompted. Simply ask: "Do you have a repo or should I create one?" If the user says they have one, use what they provide.
- A13. Check GitHub auth before any push — ⚠️ **ISSUE #14:** Run `gh auth status` BEFORE attempting `git push`. GitHub hasn't supported HTTPS password auth since 2021. If not authenticated, run `gh auth login -p https -w` and then `gh auth setup-git`.
- A14. Configure git credential helper — ⚠️ **ISSUE #15:** After `gh auth login`, you MUST also run `gh auth setup-git` to configure git's credential helper. Without this step, `git push` will still fail even though `gh` shows as authenticated. These are two separate steps — auth login handles the `gh` CLI, but git itself needs the credential helper configured separately.
- A15. Initialize git, commit, add remote, push to GitHub
- A16. Create Netlify site using non-interactive CLI — ⚠️ **ISSUE #16:** Do NOT run `netlify init` — it requires arrow-key input for interactive prompts which doesn't work in this terminal. Use `netlify sites:create --name <site-name> --account-slug <slug>` with explicit flags instead.
- A17. Look up Netlify account slug via API before creating site — ⚠️ **ISSUE #17:** Do NOT guess the account slug from the team display name. Run `netlify api listAccountsForUser` first to get the correct slug. The team name "Reyna Legacy" maps to slug `rafaelereyna`, NOT `reyna-legacy`. Display names and slugs often differ.
- A18. Deploy to Netlify with `netlify deploy --prod --dir=dist` and verify live URL — ⚠️ **ISSUE #28:** When deploying, also push to GitHub in the same step. Run `git push` immediately after the Netlify deploy. Do not treat these as separate tasks — if you deploy to Netlify, push to GitHub at the same time.

### Chunk B Micro-Steps
- B1. Build Header with logo placeholder (text fallback), flex layout, nav links as `<a href="#section">` anchors
- B2. Add `Contact` nav item as a Copper-styled button
- B3. Make Header sticky with `position: sticky; top: 0` and appropriate z-index
- B4. Build Footer with 3-column CSS grid layout
- B5. Add social icon SVGs (TikTok, Facebook, YouTube, X, Rumble) to Footer Column 3
- B6. Add copyright line with no "Edward Web Builder" references

### Chunk C Micro-Steps
- C1. Set Hero background: Navy-to-dark linear-gradient
- C2. Add CSS `::after` pseudo-element for SVG noise texture at 4% opacity
- C3. Lay out Hero as 2-column flex on desktop, single column on mobile
- C4. Add overline label with Copper color, uppercase, letter-spacing
- C5. Add H1 with Bebas Neue, large size, Copper color
- C6. Add subheadline with Inter, white, max-width for readability
- C7. Add primary CTA button (Copper bg, white text, slightly rounded)
- C8. Add secondary text-link "See Our Work ↓"
- C9. Add Trust Bar with 3 flex items, icon + label each

### Chunk D Micro-Steps
- D1. Build PainPoint section with Cream background, centered text block
- D2. Add overline, H2, body paragraphs — match approved copy verbatim
- D3. Build 3-column icon grid (flex/grid) for the 3 pain points
- D4. Build Difference section with Navy background
- D5. Add overline, H2, body copy
- D6. Build comparison card UI: left card (muted/crossed-out) vs. right card (Copper/Gold lit)
- D7. Populate comparison table rows from spec

### Chunk E Micro-Steps
- E1. Build Services section with Cream background
- E2. Add overline, H2, intro copy
- E3. Build service card component (icon slot, title, body, optional badge)
- E4. Render Card 1 (Your Landing Page) — no badge
- E5. Render Card 2 (Missed Call Automation) — "Coming Soon" Forest Green badge
- E6. Render Card 3 (Full AI Automation) — "Coming Soon" badge
- E7. Apply desaturated / reduced opacity style to Coming Soon cards — ⚠️ **ISSUE #6:** Do NOT use `opacity: 0.7` here. The global `[data-animate]` system sets `opacity: 0` initially and `.is-visible` sets `opacity: 1`. If the card also has `data-animate`, the animation end-state (`opacity: 1`) will override the scoped `opacity: 0.7`, making Coming Soon cards look fully opaque instead of dimmed. **Fix:** Either (a) remove `data-animate` from Coming Soon cards and only animate the parent section, or (b) use `filter: saturate(0.4) brightness(0.85)` with muted colors instead of `opacity` for the desaturated look.

### Chunk F Micro-Steps
- F1. Build Portfolio section with dark Navy background
- F2. Add overline, H2
- F3. Build portfolio card component: image placeholder, title, tag pill, short description — ⚠️ **ISSUE #26:** The image container MUST have a fixed height (e.g., `height: 220px`) with `object-fit: cover` and `object-position: top`. Do NOT use `height: auto`. Without a fixed height, source images dictate card proportions and the grid becomes inconsistent. This applies to both placeholder and real images.
- F4. Render Cards 1–3 with placeholder images (Unsplash URLs as temp)
- F5. Render Card 4 (Demo GC site) with Copper border, box-shadow glow, star badge
- F6. Add `⭐ Demo — This Could Be You` badge to Card 4
- F7. Add below-grid CTA: "Your business could be next. Let's Build Yours →"

### Chunk G Micro-Steps
- G1. Build Pricing section with Cream background
- G2. Add overline, H2, intro copy, italic philosophy note
- G3. Build pricing tier card component with: title, "Best for" line, includes list, CTA button slot, optional badge
- G4. Render Tier 1 (Foundation) — no badge
- G5. Render Tier 2 (Full Site) — "Most Popular" badge in Copper
- G6. Render Tier 3 (Business System) — "Best ROI" badge in Forest Green
- G7. Add Add-Ons callout block below cards with CTA

### Chunk H Micro-Steps
- H1. Build About section with dark Navy background
- H2. Add overline, H2, all body copy verbatim from spec
- H3. Add photo placeholder `<div>` with a meaningful `aria-label` and comment
- H4. Add stats/badges row (3 text badges in flex)
- H5. Add social icons row with TikTok, Facebook, YouTube, X, Rumble
- H6. Build Testimonials section with Cream background
- H7. Add overline, H2
- H8. Build testimonial card component (reviewer name, stars, quote text) — ⚠️ **ISSUE #18:** The card component will initially render placeholder text. When real reviews are integrated (Chunk L), use ONLY exact text provided by the user. If a review screenshot is truncated or cut off, STOP and ask for the full text. NEVER fabricate, paraphrase, or "complete" what a real person said.
- H9. Render 2 placeholder testimonial cards (with TODO comment for real reviews) — ⚠️ **ISSUE #18:** TODO comments must explicitly say: "Replace with exact review text from user. Do NOT paraphrase or fabricate."
- H10. Add "View on Google" link and ⭐⭐⭐⭐⭐ summary line — ⚠️ **ISSUE #19:** The Google Business URL placeholder must say: "Replace with exact URL from user. Do NOT simplify or 'clean up' the URL — parameters like &stick= and &mat= have functional meaning. If unsure whether the URL is permanent, ask the user for their Google Maps / g.page short link."

### Chunk I Micro-Steps
- I1. Build Contact section with dark gradient background (matching Hero)
- I2. Add overline, H2, subheadline
- I3. Build left column: email, location, response time, numbered "What happens next" steps
- I4. Build right column: Calendly inline embed with correct CSS (min-width 320px, height 630px)
- I5. Add Calendly CSS link in Layout `<head>`
- I6. Add Calendly script tag with `async` attribute — ⚠️ **ISSUE #8:** Do NOT use `<script is:inline src="...">`. Astro's `is:inline` directive is meant for inline script content, not external sources. Using it with an external `src` may prevent the Calendly widget from loading. **Fix:** Use a plain `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>` without `is:inline`, or inject the script tag dynamically via a small inline script block.
- I7. Below Calendly, add "Prefer to write it out?" text
- I8. Build Netlify Form: hidden `form-name` input, all 6 fields, dropdown options from spec
- I9. Style Submit button (Copper bg, "Send It →")
- I10. Add form success message state using conditional rendering or simple JS class toggle — ⚠️ **ISSUE #7:** Checking `window.location.search.includes('submitted=true')` will never match unless the form has `action="/?submitted=true"`. Netlify forms do NOT redirect back with query parameters by default — they show Netlify's own generic success page. **Fix:** Add `action="/?submitted=true"` to the `<form>` tag so Netlify redirects back to the homepage with the query param after submission. Alternatively, create a dedicated `/success` page and set `action="/success"`.

### Chunk J Micro-Steps
- J1. Write `LocalBusiness` JSON-LD object and inject into `Layout.astro` `<head>` via `<script type="application/ld+json">` — ⚠️ **ISSUE #38:** This MUST be the only business schema block. Include `logo`, `sameAs` (social profile URLs), `serviceType`, `areaServed`, and `address` all in this single block. Do NOT create a separate `Organization` schema — `LocalBusiness` IS an `Organization` subtype in schema.org and inherits all its properties. Creating both produces redundant data. Ask the user for: (1) business name, (2) city and state (street address optional for service-area businesses), (3) phone number (optional), (4) social media profile URLs. For a service-area business with no street address, use only `addressLocality` and `addressRegion` in the `PostalAddress`.
- J2. Write FAQ `ItemList` JSON-LD with all 4 Q&A pairs
- J3. Add a visually minimal (small font, muted color) FAQ accordion or flat list in the DOM before the Footer
- J4. Verify title tag matches spec exactly
- J5. Verify meta description matches spec exactly
- J6. Verify all OG tags (og:title, og:description, og:image placeholder) — ⚠️ **ISSUE #31:** The `og:image` asset MUST be in `public/images/`, NOT `src/assets/images/`. Astro processes assets in `src/assets/` with hashed filenames (e.g., `rhai_og.BgQ1nQp_.webp`) that can't be hardcoded in meta tags. Place OG images in `public/` so the URL is stable and predictable.

### Chunk L Micro-Steps — Assets & Content Integration *(new in v1.3)*
- L1. Ask the user for all remaining assets: logo file, headshot photo, real testimonial text, social media profile URLs, Google Business URL, Calendly username — ⚠️ **ISSUE #20:** If the user's files are in iCloud (`~/Library/Mobile Documents/`), Google Drive (`~/My Drive/`), or other cloud-synced locations, do NOT attempt to `cp` them. Cloud-synced paths require permissions this terminal doesn't have. Tell the user: "Please drop the files directly into the project directory (e.g., `/src/assets/images/`)." Don't waste commands on paths that will be rejected.
- L2. Integrate logo into Header.astro and Footer.astro — ⚠️ **ISSUE #22:** Before deploying, inspect the logo file for transparency. If the PNG has an opaque background (e.g., a light gray circle), it will be visible against dark surfaces (navy header at `#334668`, near-black footer at `#111111`). Flag this to the user explicitly: "Your logo has a [light gray] background that will show as a visible circle against the dark header/footer. Is this intentional, or do you have a version with a transparent background?" Do not silently deploy a logo that may look wrong. — ⚠️ **ISSUE #33:** If the logo is an SVG, do NOT import it through `astro:assets` or use the `<Image>` component. Place SVGs in `public/images/` and use a plain `<img>` tag. Astro's image pipeline is for raster formats only.
- L3. Integrate headshot photo into About.astro — ⚠️ **ISSUE #23:** When using `object-fit: cover` with a target size (e.g., 400×480 at 5:6 ratio) and the original photo has a different aspect ratio, parts of the image WILL be cropped. Explicitly tell the user: "Your photo is [X:Y ratio]. The display area is [A:B]. This means [top/bottom/sides] will be cropped. Here's the current `object-position` setting. Would you like to adjust it?" Do not assume `center top` or any other position will frame the subject correctly.
- L4. Replace placeholder testimonial text with real reviews — ⚠️ **ISSUE #18 — THE WORST ERROR IN THIS PROJECT:** Use ONLY the exact text the user provides, word for word, character for character. If a review is truncated in a screenshot, if text is cut off at the edge, if you can only see part of a sentence — STOP. Ask: "This review appears to be cut off. Can you send the full text?" NEVER: (a) invent an ending for a truncated review, (b) paraphrase what you think someone meant, (c) "fill in the blanks" based on context, (d) assume what a real person would say. Real people's words are not yours to write. This error put fabricated words in a real person's mouth and would have shipped to production.
- L5. Replace placeholder Google Business URL — ⚠️ **ISSUE #19:** Use the exact URL the user provides. Google Business review panel URLs contain parameters (`&stick=`, `&mat=`, `&opi=`) that control which view opens. A generic `google.com/search?q=...` query does NOT open the reviews panel — it just runs a search. If the user's URL looks long or unwieldy, do NOT "clean it up" by replacing it with a shorter one. Ask: "Would you like me to use this exact URL, or do you have a Google Maps / g.page short link?" Never silently downgrade a functional URL to a generic alternative.
- L6. Replace placeholder social media URLs with real profile links — use exact URLs provided by the user
- L7. Replace Calendly placeholder username with real username
- L8. Verify `.DS_Store` is in `.gitignore` — ⚠️ **ISSUE #21:** If it wasn't added during scaffold (Chunk A), add it now before committing asset files. macOS will have created `.DS_Store` in any directory that received new files.
- L9. Stage files using specific paths (`git add src/assets/images/logo.png src/components/Header.astro ...`) — do NOT use `git add .` or `git add -A` to avoid staging `.DS_Store` or other unwanted files
- L10. Commit and deploy — verify all real assets render correctly on the live site, especially: logo against dark backgrounds, photo crop, review text accuracy, Google Business link opens the reviews panel — ⚠️ **ISSUE #28:** Push to BOTH Netlify and GitHub in the same step. Run `npm run build && netlify deploy --prod --dir=dist` AND `git push` together. Do not deploy to Netlify without also pushing to GitHub. The user should not have to ask twice.

### Chunk M Micro-Steps — Polish & Portfolio Integration *(new in v1.4)*
- M1. Capture portfolio screenshots at viewport size — ⚠️ **ISSUE #25:** Do NOT use `--full-page` flag with Playwright (`npx playwright screenshot`), Puppeteer, or any screenshot tool. The `--full-page` flag captures the entire scrollable page height, producing extremely tall vertical images (e.g., 1369KB for a single site). These destroy portfolio card layouts because the images are the wrong aspect ratio for landscape card thumbnails. **Fix:** Capture at a fixed viewport size (e.g., `--viewport-size=1280,800`) without `--full-page`, OR crop the screenshot to a fixed landscape aspect ratio after capture. **Checklist:** After capturing the FIRST screenshot, check its dimensions before capturing the rest. If the height exceeds the width, something is wrong.
- M2. Enforce fixed height on portfolio image containers — ⚠️ **ISSUE #26:** Set a fixed `height` (e.g., `220px`) on the portfolio image wrapper (`.portfolio__image-wrap`) with `object-fit: cover` and `object-position: top` on the `<img>` element. Do NOT use `height: auto` — even with properly-sized viewport screenshots, source images may have slightly different aspect ratios. A fixed container height ensures all cards in the grid are the same size regardless of source image dimensions.
- M3. Verify decorative elements are visible against their backgrounds — ⚠️ **ISSUE #27:** Check all decorative/background elements to confirm they're actually perceptible. The hero right-column "RH" monogram was set to `opacity: 0.08` — so faint it looked like a rendering artifact ("a hazy blur"). **Fix:** If a decorative element is meant to be noticed, use at least 12–15% opacity, or replace with a more visible alternative (e.g., the actual logo image at 15% opacity with a copper drop-shadow glow). Preview decorative elements against their actual backgrounds before deploying.
- M4. Preview logo changes before deploying — ⚠️ **ISSUE #24:** Before deploying ANY logo swap (e.g., switching from circle-background to transparent-background version), preview how the new version renders against ALL target surfaces: (1) navy header (`#334668`), (2) near-black footer (`#111111`), (3) hero section if applicable. If the logo has dark elements, they may blend into dark backgrounds when the opaque background is removed. **Rule:** Do not assume removing a background will improve the look. Flag the tradeoff to the user: "The transparent version removes the gray circle, but the dark logo elements may blend into the dark header/footer. Want to preview both before deploying?" If there's any doubt, ask the user — don't deploy and hope it works.
- M5. Delete orphaned asset files — ⚠️ **ISSUE #29:** After replacing any asset file (e.g., swapping full-page screenshots for viewport-only hero images), delete the old files in the SAME commit. Do NOT leave unused files in the repo. **Checklist:** (1) Search the codebase (`grep`) for the old filename to confirm it's no longer imported anywhere. (2) Delete the file. (3) Stage both the deletion and the new file in the same commit. The three Playwright full-page PNGs (`portfolio-village-hairsmith.png`, `portfolio-rosa-notary.png`, `portfolio-her-maintenance.png`) are still in `src/assets/images/` taking up ~2.6MB despite being replaced.
- M6. Push to both Netlify and GitHub on every deploy — ⚠️ **ISSUE #28:** Every time you deploy, push to BOTH remotes in the same step: `npm run build && netlify deploy --prod --dir=dist && git push`. Do not deploy to Netlify without also pushing to GitHub. Do not wait for the user to ask "push to GitHub" separately. If the user says "deploy," "ship it," or "push everywhere," both actions should happen together.

### Chunk N Micro-Steps — Post-Build Infrastructure & Deployment *(new in v1.5)*
- N1. Verify CI/CD status or fall back to manual deploys — ⚠️ **ISSUE #30:** If CI/CD was set up using `netlify api updateSite` to connect a GitHub repo, it likely does NOT work. The Netlify API can set build settings (`repo.provider`, `repo.repo_path`, `repo.branch`, `build_settings.cmd`, `build_settings.dir`) but it does NOT establish the OAuth connection between Netlify and GitHub. The first auto-deploy will fail with "Unable to access repository — Host key verification failed." **Fix:** Check auto-deploy status with `netlify api listSiteDeploys --data '{}'`. If the latest deploy failed with a repository access error, CI/CD is not actually connected. Tell the user: "CI/CD requires linking your GitHub repo through the Netlify web UI (Site configuration > Build & deploy > Link to Git). For now, I'll continue using manual deploys (`netlify deploy --prod --dir=dist`)." Do NOT tell the user CI/CD is working until you've verified a successful auto-deploy.
- N2. Move any meta-tag-referenced assets from `src/assets/` to `public/` — ⚠️ **ISSUE #31:** Check all `<meta>` tags in Layout.astro for asset references (`og:image`, `twitter:image`, etc.). If any reference an asset that's currently in `src/assets/`, move it to `public/images/` and update the meta tag URL. Astro-processed assets get hashed filenames (e.g., `rhai_og.BgQ1nQp_.webp`) — these URLs are unpredictable and will break if hardcoded in meta tags. **Rule:** `src/assets/` is for assets imported in components via `astro:assets`. `public/` is for assets referenced by hardcoded URLs in meta tags, JSON-LD, `robots.txt`, or `sitemap.xml`. If an asset needs to be in both places, put it in `public/`.
- N3. Verify auto-deploy success after any CI/CD change — ⚠️ **ISSUE #32:** After setting up or modifying any automated deployment pipeline (CI/CD, webhooks, GitHub Actions), push a test commit and immediately verify the deploy succeeded. Run `netlify api listSiteDeploys --data '{}'` and check the latest deploy's `state` field. If it shows `error` or `build_failed`, the pipeline is broken — diagnose and fix before telling the user it works. **Rule:** Never tell the user "CI/CD is connected" or "auto-deploys are working" until you've seen at least one successful auto-deploy with your own eyes. "I set it up" ≠ "it works."
- N4. Serve SVGs from `public/` with plain `<img>` tags — ⚠️ **ISSUE #33:** If integrating an SVG file (e.g., a logo), do NOT import it through `astro:assets` or use the `<Image>` component. Astro's image pipeline is designed for raster formats (PNG, JPG, WebP) — it performs format conversion, resizing, and quality optimization that don't apply to SVGs. For SVGs: (1) Place the file in `public/images/`. (2) Use a plain `<img src="/images/file.svg" alt="..." width="X" height="Y">` tag. (3) If the SVG is large (>100KB), consider optimizing it with SVGO or a similar tool. The 323KB secondary logo SVG was initially going to be imported through `astro:assets`, which would have served it unchanged or errored. Moving it to `public/` and using a plain `<img>` tag resolved the issue immediately.

### Chunk O Micro-Steps — Go-Live & Domain Migration *(new in v1.6)*
- O1. Check Netlify form detection status — ⚠️ **ISSUE #34:** Run `netlify api getSite --data '{"site_id": "<id>"}'` and check `processing_settings.ignore_html_forms`. If `true`, Netlify will NEVER detect forms in your HTML — regardless of `data-netlify="true"`, regardless of correct markup, regardless of how many times you redeploy. This setting silently disables ALL form detection. **Fix:** Run `netlify api updateSite --data '{"site_id": "<id>", "body": {"processing_settings": {"html": {"pretty_urls": true}, "ignore_html_forms": false}}}'` to enable form detection, then redeploy. **Checklist:** After enabling and redeploying, run `netlify api listSiteForms --data '{"site_id": "<id>"}'` — the response should contain your form with its fields listed. If the array is still empty, the setting didn't take effect or the HTML markup is wrong.
- O2. Create `public/form-placeholder.html` — ⚠️ **ISSUE #34:** Create a bare-bones HTML file containing a hidden form with the same `name` attribute and field names as the real form. This gives Netlify a simple, clean HTML file to parse for form detection — a reliable fallback if Netlify's parser struggles with Astro's complex generated HTML (scoped class attributes like `data-astro-cid-xxxxx` can sometimes interfere). The file is NOT user-facing.
  ```html
  <html><head><title>Form Placeholder</title></head><body>
  <form name="contact" netlify hidden>
    <input type="hidden" name="form-name" value="contact" />
    <input name="name" /><input name="business" />
    <input name="phone" /><input name="best-time" />
    <select name="need"><option value=""></option></select>
    <textarea name="message"></textarea>
  </form>
  </body></html>
  ```
- O3. Switch form submission from HTML `action` redirect to JavaScript `fetch` — ⚠️ **ISSUE #35:** Remove the `action="/?submitted=true"` attribute from the form. Instead, add a `submit` event listener that: (1) calls `e.preventDefault()`, (2) serializes form data with `new URLSearchParams(new FormData(form))`, (3) POSTs to `/` with `Content-Type: application/x-www-form-urlencoded`, (4) on success: hides the form and shows the success message inline, (5) on error: shows an alert with a fallback email address. Keep the `?submitted=true` query param check as a fallback in case JavaScript fails. This approach is more reliable than the HTML redirect because it doesn't depend on Netlify rewriting the form's `action` attribute during post-processing.
- O4. Redeploy and verify form detection — run `npm run build && netlify deploy --prod --dir=dist`, then check `netlify api listSiteForms` to confirm the form is registered. Test the form on the live site to verify the success message appears.
- O5. Search codebase for old staging URL — ⚠️ **ISSUE #36:** Run a project-wide search (grep) for the old Netlify staging URL (e.g., `yoursite.netlify.app`). Common locations where it hides: (1) `og:image` meta tag in Layout.astro, (2) `og:url` meta tag, (3) JSON-LD `url` field, (4) `robots.txt`, (5) `CLAUDE.md` or other documentation files. Replace ALL occurrences with the production domain.
- O6. Set `site` property in `astro.config.mjs` — ⚠️ **ISSUE #37:** Add `site: 'https://yourdomain.com'` to the Astro config. This is required for `@astrojs/sitemap` to generate correct URLs. Without it, the sitemap integration will error or produce invalid URLs.
- O7. Install `@astrojs/sitemap` — run `npx astro add sitemap -y`. This auto-updates `astro.config.mjs` with the integration import. **Timing:** Only install this AFTER the `site` property is set to the production domain (O6). Installing it earlier produces sitemaps with staging URLs.
- O8. Update `robots.txt` with sitemap reference — add `Sitemap: https://yourdomain.com/sitemap-index.xml` to `robots.txt`. Note: Astro's sitemap integration generates `sitemap-index.xml` (an index file) that references `sitemap-0.xml` (the actual sitemap). Point `robots.txt` to the index file.
- O9. Update favicon — place the final brand favicon image (PNG or SVG) in `public/` as `favicon.png` (or `.svg`). Update the `<link rel="icon">` tag in Layout.astro to reference the new file with the correct `type` attribute (e.g., `type="image/png"` for PNG).
- O10. Build, deploy to Netlify, and push to GitHub — verify the sitemap generates correctly during build (look for `sitemap-index.xml created at dist` in build output). Deploy and push in the same step. — ⚠️ **ISSUE #28:** Push to BOTH Netlify and GitHub together.
- O11. Submit sitemap to Google Search Console — if the site already has a Search Console property from a previous build (e.g., a SPA), the existing property still works — no need to re-verify ownership. Just: (1) go to Sitemaps in the left sidebar, (2) delete any old sitemaps, (3) submit `https://yourdomain.com/sitemap-index.xml`, (4) use URL Inspection > Request Indexing on the homepage to trigger a fresh crawl. Google doesn't care about framework changes — it only sees the HTML at the URL. Static HTML (Astro) indexes better than SPAs because content is visible without JavaScript execution.

### Chunk K Micro-Steps
- K1. Write `/public/js/scroll-observer.js` using `IntersectionObserver` — adds `.is-visible` class when element enters viewport — ⚠️ **ISSUE #9:** Must add a feature-detection fallback at the top of the script. If `IntersectionObserver` is undefined, immediately add `.is-visible` to ALL `[data-animate]` elements and return. Without this, unsupported browsers will leave all animated content permanently invisible at `opacity: 0`.
- K2. Add `data-animate` attribute to each section's root element — ⚠️ **ISSUE #6:** Do NOT add `data-animate` to individual Coming Soon service cards that use `opacity: 0.7`. The animation's `.is-visible { opacity: 1 }` will override the card's intended 0.7 opacity. Only animate the parent section, or switch the card's desaturation to use `filter` instead of `opacity`.
- K3. Write CSS: `[data-animate] { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }` and `.is-visible { opacity: 1; transform: none; }`
- K4. Load script in Layout with `defer`
- K5. Replace all raw `<img>` with Astro `<Image>` component
- K6. Add `font-display: swap` to font CSS
- K7. Verify no `client:load` directives are used unnecessarily (all components are static)
- K8. Do a final anchor link audit — all nav links resolve to correct section IDs
- K9. Test Netlify form on staging URL — ⚠️ **ISSUE #7:** Verify the form redirects correctly and the success message appears
- K10. Run Lighthouse; fix any issues below 90

---

## PART 4: LLM CODE-GENERATION PROMPT SEQUENCE

---

### Prompt 1 — Project Scaffold

```text
Create a new Astro project for a website called ReynaHouseAI.com. The stack is Astro with Tailwind CSS. Image optimization uses the built-in `astro:assets` module (no separate integration needed — do NOT run `npx astro add image`).

Set up the following file structure:
- /src/styles/global.css — Define CSS custom properties for the brand color palette:
  --navy: #334668
  --copper: #C9944D
  --forest: #243B28
  --cream: #EDEAE0
  --tan: #BFA984
  --gold: #E1B444
  --white: #F8F6F0
  --dark: #1A1A1A
  Also add a base body reset: no pure black or white, use --dark and --white from palette.

- /src/styles/fonts.css — Google Fonts @import for: Bebas Neue (400), Inter (400, 600), IBM Plex Mono (400). Apply font-display: swap to each.
  ⚠️ IMPORTANT: Do NOT include Playfair Display — it is not used anywhere in this project (Issue #11).
  ⚠️ PERFORMANCE NOTE: Ideally, use a <link> tag in Layout.astro <head> instead of CSS @import to avoid a render-blocking chain (Issue #12). If using @import for now, plan to migrate to <link> in the polish phase.

- /src/layouts/Layout.astro — Base layout with:
  - Props: title (string), description (string)
  - <head> includes: charset, viewport, theme-color #334668, title, meta description, favicon link (public/favicon.ico), both CSS files imported, Tailwind
  - <body> with <slot />

- /src/pages/index.astro — Imports Layout with title and description from the spec. Renders a single <main> with placeholder "TODO" comments for each of these sections in order: Hero, PainPoint, Difference, Services, Portfolio, Pricing, About, Testimonials, Contact.

- /src/pages/404.astro — On-brand 404 page using Layout. Navy background. Text "Page Not Found." in Copper Bebas Neue. A link back to / styled as a Copper button.

- Stub (empty) Astro component files for: Header.astro, Hero.astro, PainPoint.astro, Difference.astro, Services.astro, Portfolio.astro, Pricing.astro, About.astro, Testimonials.astro, Contact.astro, Footer.astro — each file should just export an empty component returning a <section> or <div> with a TODO comment.

⚠️ IMPORTANT (Issue #21): Add `.DS_Store` to `.gitignore` during this scaffold step. macOS creates `.DS_Store` files in any directory that receives new files. If not excluded now, they will be caught by future `git add .` or `git add -A` commands.

Do not generate any content copy yet. This prompt is purely structure and config.
```

---

### Prompt 1b — Deployment Setup (GitHub + Netlify)

```text
Set up deployment for the ReynaHouseAI.com Astro project. Connect to GitHub and Netlify.

⚠️ CRITICAL — Follow this exact order to avoid auth and CLI failures (Issues #13–#17):

Step 1 — GitHub repo:
- ASK the user: "Do you already have a GitHub repo for this project, or should I create one?" Do NOT assume you need to create one, and do NOT ask about repo name or visibility unless creating.
- If the user provides an existing repo URL, use that directly.
- If creating: use `gh repo create <name> --public` (or --private per user preference).

Step 2 — Verify GitHub auth BEFORE pushing:
- Run `gh auth status` first. If not authenticated, stop and authenticate:
  1. `gh auth login -p https -w` (follow the device flow)
  2. `gh auth setup-git` — THIS STEP IS MANDATORY. It configures git's credential helper. Without it, `git push` will fail even though `gh` is authenticated. These are two separate systems.

Step 3 — Initial commit and push:
- `git init && git add -A && git commit -m "Initial commit"`
- `git remote add origin <repo-url>`
- `git push -u origin main`
- If push fails with an auth error, check that Step 2 was completed fully (both commands).

Step 4 — Netlify site creation:
- Do NOT run `netlify init` — it uses interactive prompts with arrow keys that don't work in non-interactive terminals. Use CLI flags instead.
- First, look up the account slug: `netlify api listAccountsForUser` — extract the `slug` field. Do NOT guess from the team display name (e.g., "Reyna Legacy" ≠ "reyna-legacy" — the actual slug is "rafaelereyna").
- Create the site: `netlify sites:create --name <site-name> --account-slug <slug-from-api>`

Step 5 — Build and deploy:
- `npm run build`
- `netlify deploy --prod --dir=dist`
- Verify the live URL loads correctly.

Step 6 — Record deployment info:
- Note the Netlify site name, site ID, and live URL for future reference.
- Note the GitHub repo URL.

⚠️ CI/CD WARNING (Issues #30, #32):
- Do NOT use `netlify api updateSite` to connect GitHub for auto-deploys. The API can set build settings (repo URL, branch, build command) but does NOT establish the GitHub OAuth connection. The first auto-deploy will fail with "Unable to access repository."
- If the user wants CI/CD auto-deploys, they must link the repo through the Netlify web UI (Site configuration > Build & deploy > Link to Git).
- If CI/CD is set up by any method, verify the FIRST auto-deploy succeeds before telling the user it works. Check with `netlify api listSiteDeploys`. "I set it up" ≠ "it works."
- If auto-deploys aren't working, fall back to manual deploys: `npm run build && netlify deploy --prod --dir=dist`.
```

---

### Prompt 2 — Header Component

```text
Using the existing Astro + Tailwind project, build /src/components/Header.astro.

Requirements:
- Sticky header (position: sticky; top: 0; z-index: 50)
- Background: --navy (#334668) with slight box-shadow for depth
- Left side: Logo — for now use text "REYNA HOUSE AI" in IBM Plex Mono, Copper color, as a link to / (home). Leave a TODO comment: "<!-- TODO: Replace with actual logo. When integrating: check if the image has an opaque background (e.g., light gray circle) — it will be visible against this navy header. Flag to the user and ask if they have a transparent-background version. See Issue #22. -->"
- Right side: Navigation links — Home, Work, Services, Pricing, About, and Contact
  - Home, Work, Services, Pricing, About → plain anchor links to #hero, #portfolio, #services, #pricing, #about respectively. White text, hover: Copper color transition.
  - Contact → styled as a button: Copper background, white text, bold, slightly rounded (border-radius: 6px), padding 10px 20px. Links to #contact.
- Mobile: At breakpoint <768px, collapse nav. Show a hamburger icon (3 lines SVG). Clicking it toggles the nav open/closed. Use a small inline <script> for the toggle — no frameworks.
- All nav links close the mobile menu on click.
- ⚠️ IMPORTANT (Issue #10): Add :focus-visible styles to the hamburger button, not just to nav links and the CTA. Keyboard users need a visible focus indicator on ALL interactive elements. Add `.header__hamburger:focus-visible { outline: 2px solid var(--copper); outline-offset: 2px; }` or equivalent.
- Import and render Header.astro in /src/pages/index.astro above the <main> section.
```

---

### Prompt 3 — Footer Component

```text
Build /src/components/Footer.astro for the ReynaHouseAI.com project.

Requirements:
- Background: near-black (use #111111 — close to --dark)
- 3-column CSS grid layout on desktop, single column stacked on mobile

Column 1 — Brand:
- Logo text "REYNA HOUSE AI" in IBM Plex Mono, Copper color (same TODO comment for real logo — ⚠️ Issue #22: when integrating, check logo transparency against the near-black footer background)
- Tagline: "Making AI work for us so we have time for what matters most." (italic, --tan color)
- Copyright: "© 2025 Reyna House AI. Built with code we own." (small, --tan)

Column 2 — Quick Links:
- Heading: "NAVIGATE" in IBM Plex Mono, Copper, small, letter-spaced
- Links: Home (#hero), Work (#portfolio), Services (#services), Pricing (#pricing), About (#about), Contact (#contact). White text, hover Copper.

Column 3 — Get In Touch:
- Heading: "GET IN TOUCH" in IBM Plex Mono, Copper, small, letter-spaced
- Email link: edward@reynahouse.ai (white text)
- Social icons (SVG inline icons, 24px, white fill, hover Copper): TikTok, Facebook, YouTube, X (Twitter), Rumble. Each links to "#" as placeholder with a TODO comment.
- Google reviews link: "⭐ See Our Google Reviews" linking to "#" with TODO comment.

Footer bottom bar (full width, border-top in --tan at 10% opacity):
- Text: "Built in Big Bear Lake, CA. Serving contractors nationwide."

Import and render Footer.astro in index.astro below the <main> element.
```

---

### Prompt 4 — Hero Section

```text
Build /src/components/Hero.astro for ReynaHouseAI.com.

Requirements:

Background:
- CSS linear-gradient(135deg, #334668 0%, #1a1a2e 100%) on the section
- An ::after pseudo-element with an SVG noise texture at 4% opacity (use a base64 inline SVG data URI for a simple grain/noise pattern — generate a simple one)
- Full viewport height: min-height: 100vh

Layout: 2-column flex on desktop (text left, decorative right). On mobile: single column, text centered.

Left side content (in order):
1. Overline label: "REYNA HOUSE AI — BIG BEAR LAKE, CA" — font: IBM Plex Mono, color: --copper, uppercase, letter-spacing: 0.12em, font-size: 0.75rem
2. H1 headline: "Your Contractors Are Calling.\nAre You Answering?" — font: Bebas Neue, color: --copper, font-size clamp(3rem, 7vw, 6rem), line-height 1.05
3. Subheadline paragraph: "We build websites that work while you're on the job site. And automations that make sure no lead slips through the cracks." — font: Inter, color: --white, max-width: 520px
4. CTA row:
   - Primary button: "Book a Free 15-Minute Call →" — background: --copper, color: --white, font: Inter bold, border-radius: 6px, padding: 14px 28px. Links to #contact.
   - Secondary text link below: "See Our Work ↓" — color: --tan, hover: --copper. Links to #portfolio.
5. Trust Bar: A flex row with 3 items, each with a small SVG icon and label:
   - "You Own It. Always."
   - "Built in the USA"
   - "Live in 2 Weeks"
   Labels in IBM Plex Mono, small, --tan color. Icons: simple SVG checkmark/shield/clock inline, --copper color.

Right side: A solid rectangular block using a CSS radial-gradient from --copper at 10% opacity to transparent, with a large "RH" monogram text in Bebas Neue as a decorative element. ⚠️ IMPORTANT (Issue #27): Set the monogram at 12–15% opacity — NOT lower. At 8% opacity it is nearly invisible and looks like a rendering artifact, not an intentional design element. The user described 8% opacity as "a hazy blur." If the element is meant to be decorative, it still needs to be perceptible. Preview against the actual gradient background before deploying. Leave a TODO comment: "<!-- TODO: Replace right panel with real photography when available -->"

Add `id="hero"` to the section element.
Import Hero.astro into index.astro as the first component inside <main>.
```

---

### Prompt 5 — Pain Point Section

```text
Build /src/components/PainPoint.astro for ReynaHouseAI.com.

Requirements:

- id="pain-point" on the section
- Background: --cream (#EDEAE0)
- Max-width content container: 900px centered with auto horizontal margin
- Padding: 100px vertical

Content (in order):

1. Overline: "SOUND FAMILIAR?" — IBM Plex Mono, --copper, uppercase, letter-spaced, small
2. H2 headline:
   "You're On the Job.
   Your Phone Rings. You Can't Answer.
   That Was a $10,000 Job Walking Out the Door."
   — Bebas Neue, --navy, large (clamp 2rem to 4rem), line-height 1.1

3. Body copy (two paragraphs):
   Para 1: "General contractors don't lose jobs because of bad work. They lose jobs because they were too busy doing the work to answer the phone."
   Para 2: "No website. No follow-up. No second chance. The guy who answered his phone got the job."
   Then a standalone bold line: "We fix that."
   — Font: Inter, color: --navy, max-width 600px

4. 3-column icon grid (CSS grid, 3 cols desktop / 1 col mobile, gap 2rem):
   Card 1: Icon (phone with X — inline SVG), Title: "Missed Calls", Subtext: "Lost jobs before you even knew they called."
   Card 2: Icon (receipt/paper stack SVG), Title: "Invoice Chaos", Subtext: "Buried in paperwork instead of on the job."
   Card 3: Icon (calendar with X SVG), Title: "No-Shows & Scheduling", Subtext: "Appointments that ghost. Time you'll never get back."
   Each card: white background, 1px --tan border, border-radius 8px, padding 24px, centered content. Icon: --copper color, 48px.

Import PainPoint.astro into index.astro after Hero.
```

---

### Prompt 6 — Difference Section

```text
Build /src/components/Difference.astro for ReynaHouseAI.com.

Requirements:

- id="difference" on the section
- Background: --navy (#334668)
- Padding: 100px vertical
- Max-width 1000px container, centered

Content:

1. Overline: "WHY REYNA HOUSE" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "Your Website Should Be Yours.\nNot Rented. Not Held Hostage. Yours." — Bebas Neue, --white, large
3. Body copy (2 paragraphs + final line):
   "When you sign up with Wix or Squarespace, you don't own your website. You're renting it. The day you stop paying, it disappears."
   "We build your site in clean code. You get the files. You get the domain. You get the hosting. It's yours. Like your truck. Like your tools."
   "If you never want to talk to us again after we hand it over — that's your right. But most of our clients come back. Because once you see what a real website does for your business, you want more."
   — Inter, --white, max-width 640px

4. Two-column comparison cards (side-by-side, flex, gap 2rem, stacked on mobile):

Left card — "Wix / Squarespace":
- Header bg: muted gray (#555), text: white
- Background: #2a2a2a
- Opacity: 0.6 (visually de-emphasized)
- Rows: "You rent it" | "Stop paying, it disappears" | "Cookie-cutter templates" | "No code access" | "Hidden fees"
- Each row: --tan text, with a small ✕ icon in red before each item

Right card — "Reyna House AI":
- Header bg: --copper, text: --white
- Background: #1a2a1a (very dark green tint)
- Border: 2px solid --gold
- Rows: "You own it" | "Yours forever" | "Built for your business" | "Full code on GitHub" | "Flat rate, no surprises"
- Each row: --white text, with a ✓ checkmark in --gold before each item

NOTE: The Wix card's `opacity: 0.6` is fine here because `data-animate` will be on the parent <section>, not on the card itself. The section animates to opacity: 1, and the card's own 0.6 opacity is applied as a child — it survives correctly. (See Part 5, Non-Issues section.)

Import Difference.astro into index.astro after PainPoint.
```

---

### Prompt 7 — Services Section

```text
Build /src/components/Services.astro for ReynaHouseAI.com.

Requirements:

- id="services" on the section
- Background: --cream (#EDEAE0)
- Padding: 100px vertical
- Max-width 1100px container, centered

Content:

1. Overline: "WHAT WE BUILD" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "Start Simple. Grow When You're Ready." — Bebas Neue, --navy
3. Intro copy: "We start where you need us. A clean landing page that gets you found and gets you called. Then when you're ready — automation that handles the stuff you hate doing." — Inter, --navy, max-width 560px

4. 3-column card grid (CSS grid, 3 cols desktop / 1 col mobile):

Card 1 — "Your Landing Page":
- Icon: house/blueprint SVG, --copper, 48px
- Title: "Your Landing Page" — Bebas Neue, --navy, 1.6rem
- Body: "A fast, mobile-ready page with your services, photos, contact form, and Google Maps. Clean. Professional. Yours."
- Tag: "Most Popular for New Clients" — --forest bg, --white text, small pill badge
- Card: white bg, border-radius 10px, box-shadow subtle, padding 32px
- Hover: translateY(-4px), stronger box-shadow

Card 2 — "Missed Call Automation":
- Icon: gear/cog SVG, --tan, 48px (slightly muted)
- Title: "Missed Call Automation" — Bebas Neue, --navy at 70% opacity
- Body: "Every missed call gets an instant text: 'Hey, we got your message — we'll call you right back.' No more leads going cold."
- Tag: "Coming Soon" — --forest bg at 80%, --white text
- Card: white bg, border-radius 10px, padding 32px (desaturated look)
  ⚠️ IMPORTANT (Issue #6): Do NOT set `opacity: 0.7` on this card. If `data-animate` is applied to individual cards (for staggered animation), the animation end-state `opacity: 1` will override the intended 0.7 dimmed look. Instead, use `filter: saturate(0.4) brightness(0.85)` for the desaturated appearance, OR do not apply `data-animate` to Coming Soon cards (let only the parent section animate).

Card 3 — "Full AI Automation":
- Icon: rocket SVG, --tan, 48px (muted)
- Title: "Full AI Automation" — Bebas Neue, --navy at 70% opacity
- Body: "AI that books appointments, follows up on estimates, and keeps your calendar full — while you're on the job."
- Tag: "Coming Soon" badge same as Card 2
- Same desaturated card styles as Card 2 (same ⚠️ Issue #6 warning applies)

Import Services.astro into index.astro after Difference.
```

---

### Prompt 8 — Portfolio Section

```text
Build /src/components/Portfolio.astro for ReynaHouseAI.com.

Requirements:

- id="portfolio" on the section
- Background: #1a1f2e (near-black, deep navy)
- Padding: 100px vertical
- Max-width 1100px container, centered

Content:

1. Overline: "OUR WORK" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "Real Sites. Real Businesses. Real Results." — Bebas Neue, --white

3. 2×2 responsive CSS grid (2 cols desktop / 1 col mobile, gap 1.5rem):

⚠️ IMPORTANT (Issue #26): The image container on each card MUST have a fixed height — e.g., `height: 220px` — with `object-fit: cover` and `object-position: top` on the `<img>`. Do NOT use `height: auto`. Without a fixed height, source images dictate card proportions and the grid becomes visually inconsistent. This applies to placeholder images now and real screenshots later.

Cards 1–3 (regular portfolio cards):
- Image: use <img> with src pointing to placeholder (use https://placehold.co/600x400/334668/EDEAE0?text=Site+Screenshot as temp). Add a TODO comment for real screenshot.
- Tag pill: IBM Plex Mono, small, --copper color, --navy bg, border-radius 4px, padding 4px 10px
- Business title in Bebas Neue, --white, 1.4rem
- Short description line in Inter, --tan, small

Card 1: Tag "Landing Page", Title: "Big Bear Hair Salon", Desc: "Booking form, services, gallery"
Card 2: Tag "Professional Services", Title: "LA Notary Public", Desc: "Clean, credible, converts"
Card 3: Tag "Service Business", Title: "Van Nuys Maintenance Co.", Desc: "Services, contact, local SEO"

Card 4 (DEMO card — special treatment):
- Border: 2px solid --copper
- Box-shadow: 0 0 24px rgba(201,148,77,0.3) (Copper glow)
- Image: same placeholder style but text "Your Site Here"
- Tag pill: "⭐ Demo — This Could Be You" — --copper bg, --white text
- Title: "Bear Valley Builders — Big Bear, CA" in Bebas Neue, --copper
- Desc: "Built to show what's possible for local GCs" in --tan

Below the grid (centered):
- Line: "Your business could be next." — Inter, --white, italic
- CTA button: "Let's Build Yours →" — --copper bg, --white text, border-radius 6px, links to #contact

Import Portfolio.astro into index.astro after Services.
```

---

### Prompt 9 — Pricing Section

```text
Build /src/components/Pricing.astro for ReynaHouseAI.com.

Requirements:

- id="pricing" on the section
- Background: --cream (#EDEAE0)
- Padding: 100px vertical
- Max-width 1100px container, centered
- DO NOT include any dollar amounts anywhere in this component.

Content:

1. Overline: "INVESTMENT" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "Good Work Costs Money.\nBad Work Costs More." — Bebas Neue, --navy
3. Intro copy: "Reyna House is not Walmart. We build things right, the first time, and you own what we build. Here's what that looks like." — Inter, --navy
4. Philosophy note (italic, small, --tan): "Pricing is based on scope. Book a call and we'll tell you exactly what your project costs. No surprises. No hidden fees."

5. 3-column pricing card grid (3 cols desktop / 1 col mobile):

All cards: white bg, border-radius 12px, padding 36px, box-shadow subtle

Card 1 — "The Foundation":
- "Best for: GCs with no online presence" — small italic --tan
- Includes list (checkmark before each, --forest color): Single landing page | Mobile-ready | Contact form | Google Maps embed | Social links | Netlify hosting setup | Domain transfer assistance | Full code ownership
- CTA button: "Let's Talk →" — --copper bg, --white, full width, border-radius 6px, links to #contact

Card 2 — "The Full Site":
- Badge: "Most Popular" — --copper bg, --white text, positioned top-right of card
- "Best for: GCs ready to look serious" — small italic --tan
- Includes: Everything in Foundation, plus: Up to 5 pages | Google Analytics | On-page SEO | Calendly booking | 30-day support
- CTA: same as above

Card 3 — "The Business System":
- Badge: "Best ROI" — --forest bg, --white text, positioned top-right
- "Best for: GCs who want leads on autopilot"
- Includes: Everything in Full Site, plus: Missed call text automation | Appointment booking flow | Basic CRM setup | Monthly maintenance retainer option
- CTA: same as above

Below pricing cards (centered):
- Italic copy: "Already have a site? Want to add one piece at a time? Ask about add-ons: automation, SEO, Google Business setup, and more."
- CTA button: "Book a Call to Discuss →" — --copper bg, --white, links to #contact

Import Pricing.astro into index.astro after Portfolio.
```

---

### Prompt 10 — About Section

```text
Build /src/components/About.astro for ReynaHouseAI.com.

Requirements:

- id="about" on the section
- Background: --navy (#334668)
- Padding: 100px vertical
- 2-column layout on desktop (text left, photo right), stacked on mobile

Left column content:

1. Overline: "WHO'S BEHIND THIS" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "I'm Edward Reyna.\nI'm Learning This Right Alongside You." — Bebas Neue, --white, large
3. Body copy (paragraphs, Inter, --white, max-width 560px):
   "I'm not a Silicon Valley engineer. I'm an American entrepreneur from Big Bear Lake, California."
   "I started Reyna House AI because I watched small business owners — good, hardworking people — get left behind by technology they didn't understand."
   "I'm learning AI the same way you learned your trade. By doing it. By building things. By figuring it out."
   "And I'm taking my clients with me."
   "When AI evolves — and it will — you'll have someone in your corner who's been paying attention from the beginning."
   "That's the relationship I'm offering. Not just a website. A partnership."

4. Stats/badges row (flex, gap 1rem, flex-wrap):
   Each badge: --forest bg, --white text, IBM Plex Mono, small, padding 6px 14px, border-radius 4px
   Badges: "Big Bear Lake, CA" | "Serving clients nationwide" | "Family name on the door since day one"

5. Social icons row (same SVGs as Footer): TikTok, Facebook, YouTube, X, Rumble — white, hover --copper

Right column:
- A placeholder div: 400px x 480px, background: linear-gradient from --forest to --navy, border-radius 8px
- Centered text "EDWARD REYNA" in Bebas Neue, --copper, 2rem
- Subtext "Big Bear Lake, CA" in IBM Plex Mono, --tan, small
- TODO comment: "<!-- TODO: Replace with authentic photo of Edward when available. When integrating: (1) verify the photo's original aspect ratio against the 5:6 display area, (2) mention what will be cropped by object-fit: cover, (3) offer to adjust object-position. See Issue #23. -->"

Import About.astro into index.astro after Pricing.
```

---

### Prompt 11 — Testimonials Section

```text
Build /src/components/Testimonials.astro for ReynaHouseAI.com.

Requirements:

- id="testimonials" on the section
- Background: --cream (#EDEAE0)
- Padding: 100px vertical
- Max-width 900px container, centered

Content:

1. Overline: "WHAT CLIENTS SAY" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "Don't Take Our Word for It." — Bebas Neue, --navy

3. Two testimonial cards side-by-side on desktop, stacked on mobile (CSS grid or flex):

Each card:
- White background, border-radius 10px, padding 32px, box-shadow subtle
- Star row: 5 gold stars (★★★★★ in --gold)
- Review text in Inter, --navy, italic, font-size 1.05rem
- Reviewer name: Bebas Neue, --copper, 1.2rem
- "Verified Google Review" label: IBM Plex Mono, --tan, very small

Card 1 placeholder (add TODO comment for real review):
- Stars: 5
- Text: "TODO: Replace with exact review text from user. Do NOT paraphrase or fabricate."
- Name: "TODO: Reviewer Name"
- ⚠️ CRITICAL (Issue #18): When real reviews are added (Chunk L / Prompt 16), use ONLY the exact text the user provides. If a review screenshot is truncated, STOP and ask for the full text. NEVER invent, complete, or paraphrase a real person's words.

Card 2 placeholder:
- Same structure, same TODO warning

4. Below the cards (centered):
- "⭐⭐⭐⭐⭐ 5.0 on Google" — Bebas Neue, --navy, 1.4rem
- Subtext: "We earn every review." — Inter, --tan, italic, small
- Link button: "View on Google →" — outline style, --copper border and text, hover fill --copper, links to "#" with TODO comment: "TODO: Replace with exact Google Business URL from user. Do NOT replace with a generic google.com/search query — use the direct reviews panel URL."
- ⚠️ IMPORTANT (Issue #19): The Google Business URL must be the user's actual reviews panel link, not a generic search. URLs with &stick= and &mat= parameters open the reviews directly. A search query does not.

Import Testimonials.astro into index.astro after About.
```

---

### Prompt 12 — Contact Section

```text
Build /src/components/Contact.astro for ReynaHouseAI.com.

Requirements:

- id="contact" on the section
- Background: same dark gradient as Hero — linear-gradient(135deg, #334668 0%, #1a1a2e 100%)
- Padding: 100px vertical
- Max-width 1100px container, centered

Content:

1. Overline: "LET'S GET TO WORK" — IBM Plex Mono, --copper, uppercase, letter-spaced
2. H2: "Ready to Stop Losing Leads?\nLet's Talk." — Bebas Neue, --white
3. Subheadline: "Book a free 15-minute call. No pitch. No pressure. Just a real conversation about what you need." — Inter, --white, max-width 520px

4. 2-column layout on desktop (stacked on mobile):

LEFT COLUMN — Contact Info:
- Email: "edward@reynahouse.ai" as a mailto link, --copper color
- Location: "Big Bear Lake, CA — Serving clients nationwide" — --tan, Inter
- Response time: "Reply within 6 hours (usually faster)" — --tan, Inter, small italic
- "What happens next?" heading — IBM Plex Mono, --copper, small
- Numbered steps list (Inter, --white):
  1. "You book a 15-minute call"
  2. "We talk about what you need"
  3. "I send you a proposal with exact pricing"
  4. "We build it"

RIGHT COLUMN — Booking:
- Add a <link> tag for Calendly CSS to the component's <head> slot (use Astro's <slot name="head" /> pattern OR add directly to Layout)
- Calendly inline embed:
  <div class="calendly-inline-widget" data-url="https://calendly.com/YOUR-USERNAME/15min" style="min-width:320px;height:630px;"></div>
  Add TODO comment: "<!-- TODO: Replace YOUR-USERNAME with real Calendly username -->"
- ⚠️ IMPORTANT (Issue #8): Do NOT use `<script is:inline src="https://assets.calendly.com/assets/external/widget.js" async>`. Astro's `is:inline` directive is meant for inline script content. Using it with an external `src` may cause the Calendly widget to fail to load entirely. Instead, use one of these approaches:
  (a) Plain script tag: `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>` (without is:inline)
  (b) Dynamic injection: a small `<script is:inline>` that creates and appends the script element

5. Below the Calendly embed (full width):
- Text: "Prefer to write it out? Use the form below." — Inter, --tan, italic, centered

6. Netlify Contact Form (below Calendly, full width, max-width 640px, centered):
- ⚠️ IMPORTANT (Issue #7): The form MUST include `action="/?submitted=true"` so that Netlify redirects back to the homepage with the query parameter after submission. Without this, Netlify uses its own generic success page and the inline success message will never display.
- <form name="contact" method="POST" data-netlify="true" action="/?submitted=true">
- Hidden input: <input type="hidden" name="form-name" value="contact" />
- Fields (each with a label above, Inter --tan label, Inter --white input text):
  - Your Name* (required, text input)
  - Business Name (text input)
  - Phone Number* (required, tel input)
  - Best Time to Call (text input, placeholder "e.g. Weekday mornings")
  - What do you need? (select dropdown options: "New Website", "Automation", "Both", "Not Sure Yet")
  - Tell me more (textarea, optional, 4 rows)
- Input styles: bg --navy at 40% opacity, border 1px solid --tan, --white text, border-radius 6px, padding 12px
- Submit button: "Send It →" — --copper bg, --white text, bold, full width, border-radius 6px, padding 14px, font-size 1rem

7. Form success message:
- Add a hidden <div id="form-success"> with text:
  'Got it. I'll reach out within 6 hours. — Edward'
  Style: --gold color, Bebas Neue, 1.4rem, centered, hidden by default (display: none)
- Add a small inline <script> that checks `window.location.search.includes('submitted=true')` to show the success div and optionally hide the form

Import Contact.astro into index.astro after Testimonials.
```

---

### Prompt 13 — SEO, Schema & FAQ

```text
Update /src/layouts/Layout.astro to add all SEO and structured data. Also add a minimal FAQ section to index.astro.

Step 1 — Update Layout.astro head:

Add these exact meta tags (use Astro props to make them dynamic with defaults):
- <title>{title} | Reyna House AI</title>
- <meta name="description" content="{description}" />
- <meta property="og:title" content="{title}" />
- <meta property="og:description" content="{description}" />
- <meta property="og:type" content="website" />
- <meta property="og:url" content="https://reynahouse.ai" />
- <meta property="og:image" content="https://reynahouse.ai/images/og-image.png" /> — ⚠️ **ISSUE #31:** This image MUST be in `public/images/`, NOT `src/assets/images/`. Astro hashes processed asset filenames, making them unpredictable for hardcoded meta tag URLs. Place the OG image in `public/images/og-image.png` so the URL is stable.
- <meta name="twitter:card" content="summary_large_image" />
- <meta name="twitter:title" content="{title}" />
- <meta name="twitter:description" content="{description}" />

Add this LocalBusiness JSON-LD script block — ⚠️ **ISSUE #38:** This is the ONLY business schema block needed. Do NOT create a separate Organization schema. `LocalBusiness` is a subtype of `Organization` and inherits all its properties (`logo`, `sameAs`, etc.). Creating both produces redundant duplicate data.
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Reyna House AI",
  "url": "https://reynahouse.ai",
  "logo": "https://reynahouse.ai/favicon.png",
  "description": "Reyna House AI builds custom websites and automation for general contractors. You own your site — no Wix, no monthly ransom.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Big Bear Lake",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "areaServed": ["California", "Nationwide"],
  "serviceType": ["Web Design", "AI Automation", "Landing Pages"],
  "sameAs": [
    "https://www.facebook.com/reynahouseai",
    "https://x.com/ReynaHouse84828",
    "https://www.instagram.com/reynahouseai/",
    "https://rumble.com/user/ReynaHouse",
    "https://www.youtube.com/@ReynaHouseAi"
  ]
}

Add this FAQ JSON-LD script block:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Do I own my website if Reyna House builds it?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. You get the code, the domain, and the hosting. It's yours completely." } },
    { "@type": "Question", "name": "How long does it take to build a website?", "acceptedAnswer": { "@type": "Answer", "text": "Most landing pages are live within 2 weeks of our first call." } },
    { "@type": "Question", "name": "Do you work with general contractors?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. General contractors are our specialty. We understand you're on job sites, not behind a desk." } },
    { "@type": "Question", "name": "What is the cost of a website from Reyna House AI?", "acceptedAnswer": { "@type": "Answer", "text": "Every project is scoped individually. Book a free 15-minute call and we'll give you an exact number." } }
  ]
}

Step 2 — Add visible FAQ section to index.astro:

After the Contact component and before the Footer, add an inline section with:
- id="faq"
- Background: --cream
- Padding: 60px vertical
- Max-width 800px centered
- Heading: "Frequently Asked Questions" in Bebas Neue, --navy
- All 4 Q&A pairs rendered as simple <details>/<summary> accordion elements
  - <summary>: IBM Plex Mono, --copper
  - Answer text: Inter, --navy
  - Border-bottom: 1px solid --tan between items
```

---

### Prompt 14 — Scroll Animations

```text
Add lightweight scroll-triggered fade-in animations to the ReynaHouseAI.com Astro project. No animation libraries. Pure CSS + Intersection Observer.

Step 1 — Add to /src/styles/global.css:

[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}

[data-animate].is-visible {
  opacity: 1;
  transform: translateY(0);
}

Step 2 — Create /public/js/scroll-observer.js:

A script that:
1. ⚠️ IMPORTANT (Issue #9): FIRST, check if `IntersectionObserver` is supported. If `typeof IntersectionObserver === 'undefined'`, immediately add `.is-visible` to ALL `[data-animate]` elements and return early. Without this fallback, unsupported browsers will leave all animated content permanently invisible at `opacity: 0`.
2. Selects all elements with [data-animate] attribute
3. Creates an IntersectionObserver with threshold: 0.12
4. When an element intersects, adds the class "is-visible" to it
5. Unobserves the element after it becomes visible (fire once)
6. Runs the observer after DOMContentLoaded

Step 3 — Add to Layout.astro <head>:
<script src="/js/scroll-observer.js" defer></script>

Step 4 — Add data-animate attribute to the root element of each of these components:
- PainPoint.astro section
- Difference.astro section
- Services.astro section
- Portfolio.astro section
- Pricing.astro section
- About.astro section
- Testimonials.astro section
- Contact.astro section

Also add data-animate to:
- Each individual service card in Services.astro — ⚠️ EXCEPT Coming Soon cards (Issue #6). The Coming Soon cards use reduced opacity / desaturation as a design choice. If `data-animate` is applied to them, the `.is-visible { opacity: 1 }` end-state will override the intended muted appearance, making them look fully opaque. Either: (a) skip `data-animate` on Coming Soon cards entirely, or (b) ensure the muted look uses `filter` instead of `opacity` so there's no conflict.
- Each portfolio card in Portfolio.astro
- Each pricing card in Pricing.astro
- Each testimonial card in Testimonials.astro

For cards inside grids, add a staggered delay by setting inline style:
style="transition-delay: Xs" where X is 0, 0.1, 0.2, 0.3 for each card in sequence.

Do NOT animate the Header or Footer.
```

---

### Prompt 15 — Performance, Image Optimization & Final Polish

```text
Perform final performance and polish pass on the ReynaHouseAI.com Astro project.

Step 1 — Image optimization:
- In Portfolio.astro, replace all <img> placeholder elements with Astro's <Image> component from "astro:assets". For now, use local placeholder images from /public/images/. Add a TODO for each card noting the real screenshot to be added.
- Add width and height props to all Image components.
- Ensure loading="lazy" is set on all portfolio and testimonial images.
- The Hero decorative element does not use an <img> tag — leave as CSS.

Step 2 — Font performance:
- ⚠️ IMPORTANT (Issue #12): If fonts are still loaded via `@import` in `fonts.css`, migrate to a `<link>` tag in Layout.astro `<head>`. The `@import` method creates a render-blocking chain (HTML → CSS parse → @import fetch → font CSS). A `<link>` tag lets the browser discover and fetch fonts in parallel.
- ⚠️ IMPORTANT (Issue #11): Verify that Playfair Display is NOT in the font import URL. No component uses `font-family: 'Playfair Display'` — loading it wastes bandwidth.
- In /src/styles/fonts.css, ensure all @font-face or @import rules have font-display: swap.
- Add <link rel="preconnect" href="https://fonts.googleapis.com"> and <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> to Layout.astro head, above the font CSS link.

Step 3 — Accessibility:
- Audit all interactive elements in Header.astro: ensure nav links have visible focus states (outline: 2px solid --copper).
- ⚠️ IMPORTANT (Issue #10): Ensure the mobile hamburger button has BOTH `aria-label="Toggle navigation"` AND a `:focus-visible` style. Add `.header__hamburger:focus-visible { outline: 2px solid var(--copper); outline-offset: 2px; }` — keyboard users must see a focus indicator on this button.
- Ensure Calendly embed wrapper has an aria-label="Schedule a call with Reyna House AI".
- Ensure all form fields in Contact.astro have matching <label for=""> and id="" attributes.
- Ensure all SVG icons used decoratively have aria-hidden="true".

Step 4 — Meta and config:
- Confirm <meta name="theme-color" content="#334668"> is in Layout.astro head.
- Add a /public/robots.txt file with:
  User-agent: *
  Allow: /
  Sitemap: https://reynahouse.ai/sitemap.xml
- Add a TODO comment in Layout.astro near the <head> close tag: "<!-- TODO: Add GA4 tracking ID once property is created -->"
- Add Plausible analytics script as a commented-out block with TODO in Layout.astro as an alternative: "<!-- TODO: Uncomment for Plausible: <script defer data-domain='reynahouse.ai' src='https://plausible.io/js/plausible.js'></script> -->"

Step 5 — Final anchor audit:
- In Header.astro, verify all href values match the id attributes on each section:
  #hero → Hero section
  #portfolio → Portfolio section
  #services → Services section
  #pricing → Pricing section
  #about → About section
  #contact → Contact section
- In the Footer, verify all Quick Links match the same IDs.

Step 6 — Remove all legacy branding:
- Do a project-wide search for "Edward Web Builder" and remove or replace with "Reyna House AI".
- Ensure no component, comment, or meta tag contains the old brand name.

After completing all steps, list any remaining TODO comments found in the project so the developer knows what manual tasks remain before launch (real photos, Calendly username, Google Business URL, social media profile links, GA4 tracking ID, real testimonial text).
```

---

### Prompt 16 — Assets & Content Integration *(new in v1.3)*

```text
Replace all placeholder content with real assets and content for ReynaHouseAI.com. This prompt handles the final integration of user-provided files and text.

⚠️ CRITICAL — This phase produced the worst error in the entire project (Issue #18). Follow these rules absolutely:

RULE 1 — NEVER FABRICATE CONTENT (Issue #18):
- Use ONLY the exact text the user provides for testimonials, reviews, or any quoted content.
- If a review is truncated, cut off in a screenshot, or partially visible — STOP and ask for the full text.
- NEVER invent, paraphrase, "complete," or guess at what a real person said.
- Partial data is NOT an invitation to fill in the blanks. Ask for the complete version.

RULE 2 — NEVER "CLEAN UP" URLS (Issue #19):
- Use the exact URL the user provides for Google Business, social profiles, or any external link.
- Do NOT replace a long URL with a shorter "clean" version unless you understand every parameter.
- Google Business review URLs contain parameters like &stick= and &mat= that open the reviews panel directly. A generic google.com/search?q=... query does NOT do the same thing.
- If unsure whether a URL is permanent, ask: "Should I use this exact URL, or do you have a shorter g.page link?"

RULE 3 — FILE COLLECTION (Issue #20):
- If the user's files are in iCloud (~/Library/Mobile Documents/), Google Drive (~/My Drive/), or other cloud-synced locations, do NOT attempt to `cp` them. These paths require permissions this terminal doesn't have.
- Immediately tell the user: "Please drop the files into /src/assets/images/ (or the project root) — I can't access cloud-synced directories."
- Do NOT waste commands trying paths that will be rejected.

RULE 4 — LOGO TRANSPARENCY CHECK (Issue #22):
- After the user provides the logo file, inspect it for transparency before deploying.
- If the logo has an opaque background (e.g., a light gray or white circle), flag it:
  "Your logo has a [color] background. On the navy header (#334668) and dark footer (#111111), this will appear as a visible [color] circle. Is this intentional, or do you have a version with a transparent background?"
- Do NOT silently deploy a logo that may look wrong against its target background.

RULE 5 — PHOTO CROP VERIFICATION (Issue #23):
- When integrating a headshot with `object-fit: cover` at a different aspect ratio than the original, explicitly state what will be cropped.
- Example: "Your photo is 4:3. The display area is 5:6. With `object-position: center top`, the bottom ~20% will be cropped. Would you like to adjust the positioning?"
- Do NOT assume any `object-position` value will frame the subject correctly.

RULE 6 — .DS_Store (Issue #21):
- Verify `.DS_Store` is in `.gitignore` before staging any files. If it's missing, add it now.
- When staging files for commit, use specific file paths — NOT `git add .` or `git add -A`.

Step-by-step:

1. Ask the user for all remaining assets:
   - Logo file (PNG/SVG)
   - Headshot photo
   - Real testimonial/review text (full, untruncated)
   - Social media profile URLs
   - Google Business profile URL (exact, not simplified)
   - Calendly username

2. Have the user place files in /src/assets/images/ (remind them to drop files directly — don't copy from cloud paths)

3. Integrate logo:
   - For PNG logos: Import into Header.astro and Footer.astro using Astro <Image> component
   - For SVG logos: Place in `public/images/` and use a plain `<img>` tag — do NOT use astro:assets <Image> component for SVGs (Issue #33). Astro's image pipeline is for raster formats only.
   - Check transparency against navy and dark backgrounds (Rule 4)
   - Set appropriate width/height, alt text

4. Integrate headshot photo:
   - Import into About.astro using Astro <Image> component
   - Set object-fit: cover with appropriate dimensions
   - Verify crop and report to user what gets cut off (Rule 5)
   - Offer object-position adjustment options

5. Replace testimonial placeholder text:
   - Use ONLY exact text from user (Rule 1)
   - Replace reviewer names
   - If any review is incomplete, STOP and ask for the full text

6. Replace Google Business URL:
   - Use the exact URL from the user (Rule 2)
   - Do NOT simplify or shorten

7. Replace all social media placeholder URLs with real profile links

8. Replace Calendly placeholder username

9. Verify .DS_Store is in .gitignore (Rule 6)

10. Stage specific files and commit:
    - Use `git add <specific-file-paths>` — NOT `git add .`
    - ⚠️ IMPORTANT (Issue #28): Push to BOTH Netlify and GitHub in the same step. Do not deploy to Netlify without also pushing to GitHub. The user should not have to ask twice.
    - Verify the live deploy shows: logo renders correctly on dark backgrounds, photo crop is acceptable, review text is accurate, Google Business link opens the reviews panel
```

---

### Prompt 17 — Polish & Portfolio Integration *(new in v1.4)*

```text
Perform the polish and portfolio integration pass on the ReynaHouseAI.com Astro project. This prompt covers screenshot capture, image container constraints, decorative element visibility, logo variant previewing, asset cleanup, and deployment workflow.

⚠️ CRITICAL — This phase produced 6 documented errors (Issues #24–#29). Follow these rules absolutely:

RULE 1 — PREVIEW BEFORE DEPLOYING (Issue #24):
- Before deploying ANY visual change (logo swap, opacity adjustment, color change), preview how it renders against ALL target backgrounds.
- Do NOT assume a design change will look better. A transparent-background logo may look worse than one with an opaque background if the logo has dark elements that blend into dark surfaces.
- Flag tradeoffs to the user: "The transparent version removes the gray circle, but the dark logo elements may blend into the header/footer. Want me to preview both?"
- If there's any doubt, ask the user before deploying.

RULE 2 — VIEWPORT SCREENSHOTS ONLY (Issue #25):
- When capturing portfolio screenshots with Playwright or any tool, do NOT use `--full-page`.
- `--full-page` captures the entire scrollable page height, producing extremely tall vertical images that destroy card layouts.
- Capture at a fixed viewport size (e.g., `--viewport-size=1280,800`) or crop to a landscape aspect ratio.
- After capturing the FIRST screenshot, check its dimensions before capturing the rest. If height > width, something is wrong.

RULE 3 — FIXED IMAGE CONTAINER HEIGHTS (Issue #26):
- Portfolio card image containers MUST have a fixed `height` (e.g., `220px`) with `object-fit: cover` and `object-position: top`.
- Do NOT use `height: auto` — source images will dictate card proportions and produce inconsistent card sizes across the grid.
- This applies even with properly-sized screenshots — slight aspect ratio variations between source images will still cause misalignment.

RULE 4 — DECORATIVE ELEMENTS MUST BE VISIBLE (Issue #27):
- If a decorative element is meant to be noticed (like the hero "RH" monogram), do NOT set opacity below 12%.
- At 8% opacity, elements look like rendering artifacts, not intentional design.
- Preview decorative elements against their actual backgrounds before deploying.
- The user described the 8% monogram as "a hazy blur."

RULE 5 — PUSH TO BOTH REMOTES (Issue #28):
- Every deploy must push to BOTH Netlify and GitHub in the same step.
- Run: `npm run build && netlify deploy --prod --dir=dist && git push`
- Do NOT deploy to Netlify without also pushing to GitHub.
- Do NOT wait for the user to ask "push to GitHub" separately.

RULE 6 — DELETE OLD ASSETS (Issue #29):
- When replacing asset files (e.g., swapping screenshots), delete the old files in the SAME commit.
- Before deleting, search the codebase (grep) for the old filename to confirm it's no longer imported.
- Do NOT leave orphaned files in the repo. They waste space and cause confusion.

Step-by-step:

1. Capture portfolio screenshots:
   - Use Playwright without `--full-page`: `npx playwright screenshot --viewport-size=1280,800 <url> <output.png>`
   - Check the first screenshot's dimensions immediately. If height > width, stop and fix.
   - Save to /src/assets/images/ with descriptive names.

2. Enforce fixed image heights:
   - In Portfolio.astro, set `.portfolio__image-wrap { height: 220px; overflow: hidden; }`
   - On `<img>`: `object-fit: cover; object-position: top; width: 100%; height: 100%;`
   - Verify all cards appear the same height in the grid.

3. Check decorative element visibility:
   - Review the hero right-column monogram/decorative element.
   - If opacity is below 12%, increase it to 12–15%, or replace with a more visible alternative.
   - Preview against the actual gradient background.

4. Preview any logo changes:
   - If swapping logo variants, render against: navy header (#334668), dark footer (#111111).
   - Show the user both options before deploying.
   - If the transparent version makes dark elements invisible on dark backgrounds, keep the original.

5. Clean up orphaned assets:
   - Search for any image files in /src/assets/images/ that are not imported by any component.
   - Delete orphaned files.
   - Specifically check for old Playwright full-page captures that were replaced by viewport screenshots.

6. Deploy to BOTH remotes:
   - `npm run build && netlify deploy --prod --dir=dist`
   - `git add <specific-files> && git commit -m "<message>" && git push`
   - Both in the same step. Do not separate these actions.
```

---

### Prompt 18 — Post-Build Infrastructure & Deployment *(new in v1.5)*

```text
Verify and fix the deployment infrastructure for the ReynaHouseAI.com Astro project. This prompt covers CI/CD validation, meta-tag asset placement, auto-deploy verification, and SVG handling.

⚠️ CRITICAL — This phase produced 4 documented errors (Issues #30–#33). Follow these rules absolutely:

RULE 1 — CI/CD VIA API DOES NOT WORK (Issue #30):
- If CI/CD was set up using `netlify api updateSite` to connect a GitHub repo, it is almost certainly broken.
- The Netlify API can set build settings (repo URL, branch, build command, publish directory) but it does NOT establish the GitHub OAuth connection.
- The first auto-deploy will fail with "Unable to access repository — Host key verification failed."
- The ONLY way to establish true CI/CD is through the Netlify web UI: Site configuration > Build & deploy > Link to Git. This grants the OAuth permissions Netlify needs to clone the repo.
- If the user needs CI/CD, direct them to the Netlify web UI. Otherwise, continue using manual deploys: `npm run build && netlify deploy --prod --dir=dist`.
- Do NOT tell the user "CI/CD is connected" based on a successful API call alone.

RULE 2 — META-TAG ASSETS GO IN public/, NOT src/assets/ (Issue #31):
- Any asset referenced by a hardcoded URL in meta tags must live in `public/`, NOT `src/assets/`.
- This includes: `og:image`, `twitter:image`, favicon, JSON-LD images, `robots.txt` references, sitemap images.
- Assets in `src/assets/` are processed by Astro's build pipeline, which hashes filenames (e.g., `rhai_og.BgQ1nQp_.webp`). These hashed names are unpredictable and cannot be hardcoded in meta tags.
- Assets in `public/` are served as-is with their original filenames. A file at `public/images/og-image.png` will always be available at `/images/og-image.png`.
- If you discover a meta-tag asset in `src/assets/`, move it to `public/` and update the meta tag URL. Delete the copy from `src/assets/`.

RULE 3 — VERIFY AUTO-DEPLOYS BEFORE DECLARING SUCCESS (Issue #32):
- After setting up any automated deployment (CI/CD, webhooks, GitHub Actions), you must verify the FIRST deploy succeeds.
- Push a commit, then immediately check: `netlify api listSiteDeploys --data '{}'`
- Look at the latest deploy's `state` field. If it shows `error`, `build_failed`, or anything other than `ready`, the pipeline is broken.
- If the deploy failed, diagnose the error, tell the user, and fall back to manual deploys.
- "I set it up" ≠ "it works." The user trusts you when you say something is working. Don't betray that trust by assuming success.

RULE 4 — SVGs GO IN public/ WITH PLAIN <img> TAGS (Issue #33):
- Astro's `<Image>` component (from `astro:assets`) is designed for raster formats: PNG, JPG, WebP.
- It performs format conversion, resizing, and quality optimization that do not apply to SVGs.
- Importing a large SVG through `astro:assets` will either serve it unchanged (wasting build time) or error.
- For SVG files:
  1. Place them in `public/images/`
  2. Use a plain `<img src="/images/file.svg" alt="..." width="X" height="Y">` tag
  3. If the SVG is large (>100KB), consider running it through SVGO to optimize
- Only raster images (PNG, JPG) should be imported through `astro:assets` and use the `<Image>` component.

Step-by-step:

1. Check CI/CD status:
   - Run `netlify api listSiteDeploys --data '{}'` and check the latest deploy.
   - If it failed with a repository access error, CI/CD is not connected via OAuth.
   - Tell the user: "CI/CD was configured via API but the GitHub OAuth connection was not established. Auto-deploys won't work until you link the repo through the Netlify web UI (Site configuration > Build & deploy > Link to Git). For now, I'll use manual deploys."
   - If CI/CD was never set up, skip this step.

2. Audit meta-tag asset placement:
   - Search Layout.astro for all `og:image`, `twitter:image`, and other meta tags referencing image URLs.
   - If any reference an asset in `src/assets/`, move it to `public/images/` and update the meta tag URL.
   - Verify the URL resolves correctly by checking that the file exists at the expected `public/` path.

3. Audit SVG handling:
   - Search the project for any SVG imports through `astro:assets` (e.g., `import logo from '../assets/images/logo.svg'` used with `<Image>`).
   - Move these SVGs to `public/images/` and replace the `<Image>` component with a plain `<img>` tag.
   - Update all references to the SVG's new path.

4. Deploy and verify:
   - `npm run build && netlify deploy --prod --dir=dist`
   - `git add <specific-files> && git commit -m "<message>" && git push`
   - Verify the OG image URL resolves on the live site (check with a social media debugger or curl).
   - ⚠️ Push to BOTH Netlify and GitHub in the same step (Issue #28).
```

---

### Prompt 19 — Go-Live & Domain Migration *(new in v1.6)*

```text
Perform the go-live and domain migration for the Astro project. The site has been deployed on a staging URL (e.g., yoursite.netlify.app) and is now being moved to a production domain.

⚠️ CRITICAL — This phase produced 4 documented errors (Issues #34–#37). Follow these rules absolutely:

RULE 1 — CHECK NETLIFY FORM DETECTION SETTINGS (Issue #34):
- Before debugging form markup, check `processing_settings.ignore_html_forms` via `netlify api getSite`.
- If `ignore_html_forms` is `true`, Netlify will NEVER detect forms — regardless of correct HTML markup, regardless of `data-netlify="true"`, regardless of how many times you redeploy.
- Fix: Set to `false` via `netlify api updateSite`, redeploy, then verify with `netlify api listSiteForms`.
- Also create `public/form-placeholder.html` — a bare-bones hidden HTML form as a reliable detection target for Netlify's HTML parser. Astro's complex generated HTML (with scoped `data-astro-cid-xxxxx` attributes) can sometimes interfere with form detection.

RULE 2 — USE JS FETCH FOR FORM SUBMISSION (Issue #35):
- Do NOT rely solely on the HTML `action="/?submitted=true"` redirect for form success handling.
- Instead, intercept the form submit event with JavaScript, POST via `fetch` to `/`, and show the success message inline.
- This is more reliable because: (a) it doesn't depend on Netlify rewriting the form during post-processing, (b) it provides a smoother UX with no page reload, (c) it gives you error handling with a fallback email.
- Keep the `?submitted=true` query param check as a fallback for no-JS scenarios.

RULE 3 — SEARCH AND REPLACE ALL STAGING URLs (Issue #36):
- When migrating to a production domain, search the entire codebase for the old staging URL.
- Common locations: `og:image` meta tag, `og:url`, JSON-LD `url` field, `robots.txt`, documentation files.
- A single missed reference means broken social sharing, incorrect structured data, or search engines indexing the wrong domain.

RULE 4 — SITEMAP TIMING (Issue #37):
- Add the `site` property to `astro.config.mjs` FIRST, then install `@astrojs/sitemap`.
- Installing the sitemap integration without a `site` property will error or produce invalid URLs.
- Installing it with a staging URL produces a sitemap full of staging URLs that will be submitted to Google.

Step-by-step:

1. Fix Netlify form detection:
   - Check: `netlify api getSite --data '{"site_id": "<id>"}'` → look at `processing_settings.ignore_html_forms`
   - If `true`: set to `false` via `netlify api updateSite`
   - Create `public/form-placeholder.html` with hidden form matching the real form's field names
   - Switch the real form to JS `fetch` submission (remove `action` attribute, add submit event listener)
   - Redeploy and verify: `netlify api listSiteForms` should return the form with fields

2. Update all URLs to production domain:
   - Search project-wide for the old staging URL (e.g., `grep -r "yoursite.netlify.app"`)
   - Update `og:image`, `og:url`, and any other hardcoded URLs in Layout.astro
   - Update JSON-LD `url` field if it references the staging URL

3. Add sitemap:
   - Set `site: 'https://yourdomain.com'` in `astro.config.mjs`
   - Run `npx astro add sitemap -y`
   - Add `Sitemap: https://yourdomain.com/sitemap-index.xml` to `robots.txt`

4. Update favicon:
   - Place final brand favicon in `public/favicon.png` (or `.svg`)
   - Update `<link rel="icon">` in Layout.astro with correct path and `type` attribute

5. Build, deploy, push:
   - `npm run build` — verify `sitemap-index.xml created at dist` in output
   - `netlify deploy --prod --dir=dist`
   - `git add <files> && git commit && git push`
   - ⚠️ Push to BOTH Netlify and GitHub in the same step (Issue #28)

6. Google Search Console:
   - If the domain already has a Search Console property (from a previous build), no re-verification needed
   - Delete old sitemaps, submit new: `https://yourdomain.com/sitemap-index.xml`
   - Request indexing on the homepage via URL Inspection
```

---

---

## PART 5: ISSUE LOG

*Errors encountered during build, documented for reference and prevention.*

### Phase A — Scaffold & Config

#### Issue #1: Astro scaffold created project in wrong subdirectory
- **What happened:** `npm create astro@latest .` rejected the current directory because it contained a `.claude/` folder (not truly empty). The interactive prompt auto-generated a random subdirectory name (`./y`).
- **Cause:** Astro's create tool requires a completely empty target directory and falls back to prompting when it isn't.
- **Fix:** Copied files out with `cp -r y/. .` then removed the subdirectory with `rm -rf y`.
- **Prevention:** For future scaffolds, ensure the target directory is fully empty first, or scaffold into a named subdirectory intentionally and move files after.

#### Issue #2: Corrupted node_modules after copying project files
- **What happened:** After copying the project from `./y` to root, `npx astro add tailwind` threw `ERR_MODULE_NOT_FOUND` — the `.bin` symlinks inside `node_modules` were broken.
- **Cause:** `cp -r` doesn't correctly preserve symlinks in `node_modules/.bin`. The symlinks still pointed to paths relative to the old `./y` location.
- **Fix:** `rm -rf node_modules && npm install` to get a clean install.
- **Prevention:** After moving a Node project, always reinstall dependencies rather than copying `node_modules`.

#### Issue #3: Tried to install deprecated `@astrojs/image` package
- **What happened:** `npx astro add image` tried to install `@astrojs/image@^0.18.0`, which failed because the package doesn't support Astro v5.
- **Cause:** The build plan was written for an older Astro version. Since Astro v3, image optimization is built-in via `astro:assets` — no separate integration needed.
- **Fix:** No action required. Use `import { Image } from 'astro:assets'` when needed in later phases.
- **Prevention:** Check Astro version before running `astro add` for features that may have been absorbed into core.

#### Issue #4: Invalid CSS import syntax in Layout.astro
- **What happened:** First version of `Layout.astro` used `<import '../styles/fonts.css' />` inside the HTML `<head>` block — this is not valid Astro syntax.
- **Cause:** Confused HTML-like template syntax with Astro's frontmatter import system.
- **Fix:** Moved CSS imports into the frontmatter (`---`) block at the top of the file: `import '../styles/fonts.css';`
- **Prevention:** In Astro, all `import` statements go in the frontmatter fences (`---`), never in the template HTML.

#### Issue #5: Package name left as `"y"` in package.json
- **What happened:** Because the scaffold created the project in a `./y` subdirectory, `package.json` had `"name": "y"` instead of a proper project name.
- **Cause:** Direct consequence of Issue #1 — the auto-generated directory name was used as the package name.
- **Fix:** Manually edited `package.json` to set `"name": "reynahouseai"`.
- **Prevention:** Always verify `package.json` name after scaffolding, especially if the project was moved or renamed.

### Phase A — Deployment Setup (GitHub + Netlify)

#### Issue #13: Asked unnecessary questions about repo name/visibility
- **What happened:** Prompted the user about repo name and visibility (public/private) when they already had a GitHub repo created and ready to use. Wasted time on unnecessary back-and-forth.
- **Cause:** Assumed a new repo needed to be created without first asking whether one already existed.
- **Fix:** Ask one simple question first: "Do you have a GitHub repo for this project, or should I create one?" If the user says they have one, use what they provide — no follow-up questions about name or visibility.
- **Prevention:** Never assume you need to create infrastructure. Ask if it exists first, then act on the answer.
- **Impact:** Low — wasted time, no functional harm.
- **Status:** FIXED in v1.2 — Prompt 1b now starts with a single question about existing repo.

#### Issue #14: git push failed — no GitHub auth check
- **What happened:** Attempted `git push` via HTTPS without first verifying that GitHub authentication was configured. The push failed because GitHub hasn't supported HTTPS password authentication since August 2021.
- **Cause:** Skipped the auth verification step. Assumed that if `git` was installed, pushing would work.
- **Fix:** Run `gh auth status` BEFORE attempting any `git push`. If not authenticated, run `gh auth login -p https -w` to authenticate via device flow.
- **Prevention:** Before running any command that depends on external authentication, verify auth status first. This is a general principle — not just for GitHub.
- **Impact:** Medium — caused a failed command and required debugging to resolve.
- **Status:** FIXED in v1.2 — Prompt 1b Step 2 requires auth check before push.

#### Issue #15: `gh auth setup-git` missed after `gh auth login`
- **What happened:** After successfully running `gh auth login`, the first `git push` still failed. The `gh` CLI was authenticated, but git itself wasn't configured to use the `gh` credential helper. Had to run `gh auth setup-git` as an additional step.
- **Cause:** `gh auth login` and `gh auth setup-git` are two separate operations. The login authenticates the `gh` CLI tool. The setup-git command configures git's credential helper to route through `gh`. Without both, git doesn't know to use the gh token for HTTPS pushes.
- **Fix:** Always run `gh auth setup-git` immediately after `gh auth login`. Treat them as a pair.
- **Prevention:** When setting up authentication for a CLI tool that integrates with another tool (gh ↔ git), check whether both tools need separate configuration steps.
- **Impact:** Medium — caused a second failed push attempt and additional debugging.
- **Status:** FIXED in v1.2 — Prompt 1b Step 2 explicitly requires both commands.

#### Issue #16: `netlify init` failed — interactive prompt in non-interactive terminal
- **What happened:** Ran `netlify init`, which launched an interactive menu requiring arrow-key input to select options. Arrow keys don't work in this terminal environment (Claude Code), so the command was unusable.
- **Cause:** Used an interactive CLI command in a non-interactive terminal. `netlify init` is designed for human use in a full terminal emulator.
- **Fix:** Use `netlify sites:create --name <name> --account-slug <slug>` with explicit flags. All Netlify CLI operations should use flag-based (non-interactive) invocations.
- **Prevention:** In non-interactive terminals, always prefer CLI commands with explicit flags over interactive prompts. Check `--help` for flag alternatives before running any command that might prompt for input.
- **Impact:** Low — wasted one command, easy to recover from.
- **Status:** FIXED in v1.2 — Prompt 1b Step 4 explicitly warns against `netlify init`.

#### Issue #17: Wrong Netlify account slug — guessed from display name
- **What happened:** The first `netlify sites:create` call failed with a 404 because the account slug was guessed as `reyna-legacy` (derived from the team display name "Reyna Legacy"). The actual slug was `rafaelereyna`. Had to query the Netlify API to discover the correct value.
- **Cause:** Assumed the account slug would be a kebab-case version of the team display name. Netlify slugs are set independently and often don't match the display name format.
- **Fix:** Run `netlify api listAccountsForUser` first to look up the correct slug from the API response. Never guess slugs from display names.
- **Prevention:** For any CLI command that requires an identifier (slug, ID, key), look it up via the API or a list command first. Don't derive it from display names — they are decorative, not functional.
- **Impact:** Low — caused one failed API call, easy to recover from with the lookup.
- **Status:** FIXED in v1.2 — Prompt 1b Step 4 requires API lookup before site creation.

### Phase A — Fonts (discovered in Phase K audit)

#### Issue #11: Playfair Display font loaded but never used
- **What happened:** The Google Fonts `@import` in `fonts.css` includes `Playfair+Display:wght@700`, but no component in the entire project references `font-family: 'Playfair Display'`. This wastes bandwidth on every page load.
- **Cause:** The build plan spec listed Playfair Display as a project font, but it was never assigned to any element during component builds.
- **Fix:** Remove `family=Playfair+Display:wght@700&` from the Google Fonts import URL.
- **Prevention:** After completing all components, audit the fonts import against actual `font-family` usage in the codebase.
- **Impact:** Low — performance waste, not a visual or functional bug.
- **Status:** NOT FIXED

#### Issue #12: Fonts loaded via CSS @import instead of HTML `<link>` tag
- **What happened:** Fonts are loaded through `@import url(...)` inside `fonts.css`, which creates a render-blocking chain: HTML → CSS parse → @import fetch → font CSS. A `<link>` tag in `<head>` would allow the browser to discover and fetch fonts earlier.
- **Cause:** The build plan specified creating a `fonts.css` file with `@import`. Followed the plan without questioning the performance implication.
- **Fix:** Replace the `@import` in `fonts.css` with a `<link href="https://fonts.googleapis.com/css2?..." rel="stylesheet">` tag in Layout.astro `<head>`, right after the preconnect hints.
- **Prevention:** Prefer `<link>` over `@import` for external font stylesheets — it's a well-known web performance best practice.
- **Impact:** Low-Medium — slower font loading, mitigated by preconnect hints.
- **Status:** NOT FIXED

### Phase E — Services (Chunk E) / Phase K — Animations (Chunk K)

#### Issue #6: Opacity conflict between Coming Soon cards and scroll animation ⭐ HIGH IMPACT
- **What happened:** Services "Coming Soon" cards have scoped CSS `opacity: 0.7` for the desaturated look AND `data-animate` applied to those same cards. The global `[data-animate]` starts at `opacity: 0`, then `.is-visible` sets `opacity: 1`. The cards animate to full opacity instead of staying at 0.7 dimmed. The Coming Soon cards end up looking fully opaque — identical to the active card — destroying the visual hierarchy.
- **Cause:** Added `data-animate` to individual service cards (for staggered animation) without considering how the global animation `opacity: 1` end-state conflicts with the component's scoped `opacity: 0.7`.
- **Fix options:**
  - **(a) Remove `data-animate` from Coming Soon cards.** Let only the parent `<section data-animate>` handle the fade-in. The stagger effect is lost for those cards, but the muted look is preserved.
  - **(b) Replace `opacity: 0.7` with `filter: saturate(0.4) brightness(0.85)`.** This produces a similar muted/desaturated look without using the `opacity` property, so there's no conflict with `[data-animate].is-visible { opacity: 1 }`.
  - **(c) Use a custom CSS class instead of `data-animate` for Coming Soon cards** with a different end-state: `.is-visible.services__card--soon { opacity: 0.7; }` to explicitly override the global rule.
- **Prevention:** When adding scroll animations to elements that already have opacity-based styling, check for conflicts between the animation end-state and the component's intended visual state.
- **Status:** NOT FIXED

### Phase I — Contact (Chunk I)

#### Issue #7: Netlify form success message never displays ⭐ HIGH IMPACT
- **What happened:** The inline script checks `window.location.search.includes('submitted=true')` to show the success div, but Netlify forms don't redirect with `?submitted=true` by default. Without an `action` attribute pointing back to the page with a query parameter, Netlify uses its own default success page. Users submit the form and see Netlify's generic page — never the custom "Got it. I'll reach out within 6 hours." message.
- **Cause:** Assumed Netlify would redirect back to the page with a query parameter. It doesn't — Netlify either shows its own generic success page or redirects to a custom `action` URL.
- **Fix:** Add `action="/?submitted=true"` to the `<form>` tag so Netlify redirects back to the homepage with the query param. Alternatively, create a dedicated `/success` page and set `action="/success"`.
- **Prevention:** Test form submission flow against the actual hosting platform's behavior, not assumptions.
- **Status:** SUPERSEDED by Issue #35 — Form now uses JavaScript `fetch` submission instead of `action` redirect. The `?submitted=true` query param check is kept as a no-JS fallback.

#### Issue #8: Calendly script uses `is:inline` with external `src` attribute ⭐ HIGH IMPACT
- **What happened:** Used `<script is:inline src="https://assets.calendly.com/assets/external/widget.js" async>`. Astro's `is:inline` directive is designed for inline script content — using it with an external `src` may cause the script to not load correctly, which would mean the Calendly booking widget doesn't render at all.
- **Cause:** Misunderstood the purpose of `is:inline`. It tells Astro "don't process this script" — for external scripts, the correct approach is to use a plain `<script>` tag without `is:inline`, or use `is:inline` only when you need to bypass Astro's script bundling while keeping the `src`.
- **Fix:** Remove `is:inline` from the Calendly script tag. Use `<script src="https://assets.calendly.com/assets/external/widget.js" async></script>` directly. If Astro's build process interferes, inject the script dynamically via a small inline script.
- **Prevention:** Review Astro's script handling documentation before using directives on external scripts. `is:inline` = "don't bundle this inline code", not "bypass processing for external URLs."
- **Status:** NOT FIXED — needs runtime testing

### Phase K — Animation & Polish (Chunk K)

#### Issue #9: No IntersectionObserver fallback in scroll-observer.js
- **What happened:** The scroll observer script doesn't check for `IntersectionObserver` browser support. In unsupported browsers, all `[data-animate]` elements remain at `opacity: 0` — content is permanently invisible.
- **Cause:** Omitted a feature detection check.
- **Fix:** Add a fallback at the top of `scroll-observer.js`:
  ```js
  if (typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('[data-animate]').forEach(el => el.classList.add('is-visible'));
    return;
  }
  ```
- **Prevention:** Always add feature detection for APIs that aren't universally supported, especially when the fallback failure mode is invisible content.
- **Impact:** Medium — only affects older browsers, but the failure mode (invisible content) is severe.
- **Status:** NOT FIXED

### Phase L — Assets & Content Integration *(new in v1.3)*

#### Issue #18: Fabricated review text — put made-up words in a real person's mouth ⭐⭐ CRITICAL — WORST ERROR IN PROJECT
- **What happened:** Her Ruiz's Google review was truncated in the user's first screenshot. Instead of stopping and asking for the full text, fabricated a plausible-sounding ending: "Edward built me a professional website that truly represents my business. Highly recommend." The real review was completely different — it talked about booking systems, office managers scheduling cleanings, and new clients finding them online. Made-up words were attributed to a real person and would have shipped to production if the user hadn't sent a second screenshot with the full text.
- **Cause:** Tried to be efficient and ship something rather than pausing to get accurate data. Treated a gap in information as something to fill rather than something to flag.
- **Fix:** User provided full screenshot; review text was corrected before final deploy.
- **Prevention:** NEVER fabricate or guess at real people's words. If content is incomplete — truncated screenshot, cut-off text, partial quote — STOP and ask for the full version. Partial data is not an invitation to fill in the blanks. This applies to reviews, testimonials, quotes, bios, or any text attributed to a real person.
- **Impact:** **Critical** — put fabricated words in a real person's mouth. Would have published false attribution. This is both an integrity and a trust issue.
- **Status:** FIXED — Full review text replaced before deploy.

#### Issue #19: Google Business URL downgraded to generic search query
- **What happened:** The user provided the actual Google Business reviews panel URL — a long URL with `&stick=` and `&mat=` parameters that opens the reviews panel directly. Replaced it with a generic `google.com/search?q=Reyna+House+AI` which just runs a Google search and does NOT open the reviews panel.
- **Cause:** The provided URL looked unwieldy and was assumed to be a transient/session-specific URL. Replaced it with a "cleaner" version without understanding what the parameters did.
- **Fix:** Should use the user's direct URL or ask them for their Google Maps / `g.page` short link. Do NOT replace with a generic search query.
- **Prevention:** Don't "clean up" URLs the user provides without understanding what each parameter does. If a URL looks long or unusual, ask: "Should I use this exact URL, or do you have a shorter link?" Never silently downgrade a functional URL to a generic alternative.
- **Impact:** **Medium** — the "View on Google" button runs a search instead of opening the reviews panel. Users have to find and click through to reviews manually.
- **Status:** NOT FIXED — Currently using generic search URL. Needs direct Google Business profile link.

#### Issue #20: Attempted to `cp` from iCloud and Google Drive paths
- **What happened:** Tried to copy the user's photo from `~/Library/Mobile Documents/com~apple~CloudDocs/` and logo from `~/My Drive/`. Both commands were rejected — these paths require permissions this terminal doesn't have.
- **Cause:** Assumed file system access to cloud-synced directories would work like local paths. Didn't consider that sandboxed terminals may not have access to iCloud or Google Drive mount points.
- **Fix:** Asked user to place files in the project directory manually.
- **Prevention:** When a user shows files from iCloud, Google Drive, Dropbox, or other cloud-synced locations, immediately tell them to drop the files into the project folder. Don't attempt to copy from cloud-synced paths — they often have permission restrictions in sandboxed terminals. This wastes commands and time.
- **Impact:** **Low** — two wasted commands, quick recovery. But it signaled unfamiliarity with the environment.
- **Status:** FIXED — User placed files manually.

#### Issue #21: `.DS_Store` not added to `.gitignore`
- **What happened:** macOS created a `.DS_Store` file in `src/assets/images/` when asset files were added. This file was not staged in the commit (specific file paths were used in `git add`), but `.DS_Store` is not in `.gitignore` and will be caught by any future `git add .` or `git add -A`.
- **Cause:** Oversight during project scaffold — `.DS_Store` should be in every macOS project's `.gitignore` from the start.
- **Fix:** Add `.DS_Store` to `.gitignore`.
- **Prevention:** Always add `.DS_Store` to `.gitignore` in macOS projects during the initial scaffold, before any commits. Don't wait until a `.DS_Store` appears.
- **Impact:** **Low** — no functional harm yet, but a ticking time bomb for repository hygiene.
- **Status:** NOT FIXED — `.DS_Store` still not in `.gitignore`.

#### Issue #22: Logo PNG has opaque background on dark surfaces
- **What happened:** The Reyna House logo PNG has a light gray circular background. It was placed directly into the navy header (`#334668`) and near-black footer (`#111111`) without flagging that the light circle would be visible against dark backgrounds.
- **Cause:** Didn't inspect the image's transparency characteristics before integrating it. Assumed it would look fine without checking.
- **Fix:** Either use a version of the logo with a transparent background, or accept the light circle as intentional branding. The user needs to make this decision.
- **Prevention:** When integrating logos or icons, check whether the image has transparency and consider how it will render against the target background color. Flag potential issues to the user before deploying — don't assume a logo will look correct in all contexts.
- **Impact:** **Medium** — visible light circle on dark backgrounds may look unintentional. Depends on whether the user considers it part of the brand identity.
- **Status:** NOT FIXED — Needs user decision on whether the light circle background is intentional.

#### Issue #23: Photo crop not verified before deploy
- **What happened:** Edward's headshot was set to `400×480` (5:6 ratio) with `object-fit: cover` and `object-position: center top`. The original photo has a different aspect ratio, meaning parts of the image are cropped. Did not preview, mention what would be cut off, or offer to adjust positioning.
- **Cause:** Assumed `center top` positioning would frame the subject well without verifying. Didn't consider that the user might want to see the crop before it went live.
- **Fix:** User should review the live site and confirm the crop is acceptable. Adjust `object-position` or display dimensions if needed.
- **Prevention:** When cropping user photos via CSS (`object-fit: cover` with a different aspect ratio), always: (1) state the original aspect ratio vs. the display aspect ratio, (2) mention what will be cropped, (3) offer to adjust `object-position`. Don't assume any positioning will be correct.
- **Impact:** **Low-Medium** — the photo may be cropped unfavorably, cutting off important parts of the image. No functional harm, but the user should approve the crop.
- **Status:** NOT VERIFIED — Needs user review on live site.

#### Issue #10: Missing focus style on mobile hamburger button
- **What happened:** Header.astro has `:focus-visible` styles for nav links and the CTA button, but the hamburger menu button has no focus indicator. Keyboard users on mobile see no outline when tabbing to it.
- **Cause:** Oversight — added focus styles to links but forgot the button element.
- **Fix:** Add `.header__hamburger:focus-visible { outline: 2px solid var(--copper); outline-offset: 2px; }` to Header.astro styles.
- **Prevention:** Audit all interactive elements (links, buttons, inputs) for focus states, not just the obvious ones.
- **Impact:** Low — accessibility issue for keyboard users on mobile viewports.
- **Status:** NOT FIXED

### Phase M — Polish & Portfolio Integration *(new in v1.4)*

#### Issue #24: Transparent logo swap deployed without previewing ⭐ HIGH IMPACT
- **What happened:** Swapped the circle-background logo PNG for a transparent-background version, assuming it would look better on dark surfaces. Deployed to production without previewing. The dark logo elements blended into the dark header (#334668) and near-black footer (#111111) and looked worse than the original. Had to revert.
- **Cause:** Assumed removing the opaque background would automatically improve the appearance. Deployed the change without previewing how the logo would render against its target backgrounds.
- **Fix:** Reverted to the original circle-background logo. The transparent version made dark elements invisible on dark surfaces.
- **Prevention:** Before deploying ANY logo change or visual swap: (1) Preview the new version against ALL target backgrounds (header, footer, hero). (2) Flag the tradeoff to the user: "The transparent version removes the gray circle, but the dark logo elements may blend into the dark header/footer. Want to preview both?" (3) If there's any doubt, ask the user before deploying. Never assume a design change will improve things.
- **Impact:** **High** — visually broken logo on the live site until reverted. Required a rollback deploy. Wasted time on a change that made things worse.
- **Status:** FIXED — Reverted to circle-background logo.

#### Issue #25: Playwright `--full-page` captured entire scrollable page, not viewport ⭐ HIGH IMPACT
- **What happened:** Used `npx playwright screenshot --full-page` to capture client site screenshots for portfolio cards. The `--full-page` flag captures the entire scrollable page height — producing extremely tall, vertically elongated images (e.g., HER Maintenance at 1369KB). These destroyed the portfolio card layout because the images were the wrong aspect ratio for landscape card thumbnails.
- **Cause:** Used the `--full-page` flag without considering that portfolio cards need landscape/viewport-sized thumbnails, not full-page captures. Did not check the first screenshot's dimensions before capturing all three sites.
- **Fix:** User took their own viewport-only hero screenshots and placed them in the project.
- **Prevention:** For portfolio card thumbnails: (1) Capture at viewport size only — omit `--full-page` and use `--viewport-size=1280,800`. (2) After capturing the FIRST screenshot, immediately check its dimensions (width × height). If the height exceeds the width, something is wrong — stop and fix before capturing the rest. (3) If source images are already too tall, crop to a fixed landscape aspect ratio after capture.
- **Impact:** **High** — three unusable screenshots, broken card layout, required the user to manually capture replacements. Wasted the user's time on something that should have been caught immediately.
- **Status:** FIXED — User provided viewport-only hero screenshots.

#### Issue #26: No fixed height constraint on portfolio image containers ⭐ HIGH IMPACT
- **What happened:** Portfolio card image containers used `height: auto`, letting source images dictate card proportions. Even with proper viewport screenshots, cards could end up inconsistent sizes because source images had slightly different aspect ratios.
- **Cause:** Original CSS didn't enforce a fixed image area height — relied on source images being the exact right aspect ratio, which is unreliable.
- **Fix:** Added `height: 220px` to `.portfolio__image-wrap` with `object-fit: cover` and `object-position: top` on the images. This forces all cards to have the same image area height regardless of source image dimensions.
- **Prevention:** When building image card grids, ALWAYS constrain the image container height with a fixed value. Don't use `height: auto` and don't rely on source images being the right aspect ratio. Use `object-fit: cover` to handle aspect ratio differences gracefully.
- **Impact:** **High** — inconsistent card sizes across the portfolio grid. The visual inconsistency was obvious and required a CSS fix after the fact.
- **Status:** FIXED — `height: 220px` added to image containers.

#### Issue #27: Hero "RH" monogram was nearly invisible at 8% opacity
- **What happened:** The decorative "RH" text in the hero right column was set to `opacity: 0.08` — so faint it looked like a rendering artifact rather than an intentional design element. The user described it as "a hazy blur."
- **Cause:** Set opacity too low during the original build. Not caught during the polish phase because no one previewed the decorative element against the actual gradient background to confirm it was perceptible.
- **Fix:** Replaced the text monogram with the actual logo image at 15% opacity with a copper drop-shadow glow. The increased opacity and glow effect make it clearly visible as an intentional design element.
- **Prevention:** If a decorative element is meant to be noticed, 8% opacity is too low. Use at least 12–15% opacity. Preview decorative elements against their actual backgrounds — what looks visible in isolation may disappear against a gradient or dark surface. Catch this during the original build or the polish phase, not after the user reports it.
- **Impact:** **Medium** — the decorative element was effectively invisible, making the hero right column look empty. Not a functional issue, but a wasted design opportunity and a sign that the element wasn't previewed.
- **Status:** FIXED — Replaced with logo image at 15% opacity + copper drop-shadow.

#### Issue #28: Didn't push to GitHub alongside Netlify deploys
- **What happened:** Deployed to Netlify multiple times throughout the project without pushing to GitHub. The user had to separately ask "push to GitHub" after each deploy. This happened repeatedly — not a one-time oversight.
- **Cause:** Treated Netlify deploy and GitHub push as separate, independent tasks rather than a single "ship" action. Waited for the user to explicitly request each one.
- **Fix:** Always push to both remotes in the same step: `npm run build && netlify deploy --prod --dir=dist && git push`.
- **Prevention:** When deploying, push to BOTH Netlify and GitHub in the same step. If the user says "deploy," "ship it," or "push everywhere," both actions should happen together. Do not treat these as separate tasks. Do not wait for the user to ask "push to GitHub" after you've already deployed to Netlify.
- **Impact:** **Medium** — GitHub repo was consistently behind the live site. The user had to micromanage the deployment process by asking for the GitHub push separately every time. This is a workflow annoyance that should not exist.
- **Status:** FIXED — Both pushes now happen together.

#### Issue #29: Old full-page screenshot PNGs left in repo after replacement
- **What happened:** The three Playwright-captured full-page PNGs (`portfolio-village-hairsmith.png`, `portfolio-rosa-notary.png`, `portfolio-her-maintenance.png`) are still in `src/assets/images/` — no longer imported by any component but still taking up ~2.6MB in the repository. When the screenshots were replaced with the user's viewport-only hero images, the old files were not deleted in the same commit.
- **Cause:** When replacing asset files with new versions, forgot to delete the old files. The import statements were updated to point to the new files, but the old PNGs were left behind.
- **Fix:** Delete the three orphaned PNG files: `portfolio-village-hairsmith.png`, `portfolio-rosa-notary.png`, `portfolio-her-maintenance.png` from `src/assets/images/`.
- **Prevention:** When replacing asset files: (1) Search the codebase (`grep`) for the old filename to confirm it's no longer imported anywhere. (2) Delete the old file. (3) Stage both the deletion and the new file in the same commit. Never leave orphaned files in the repo.
- **Impact:** **Low** — ~2.6MB of dead weight in the repository. No functional harm, but bloats the repo and causes confusion about which files are actually in use.
- **Status:** NOT FIXED — Old PNGs still in repo. Need to be deleted.

### Phase N — Post-Build Infrastructure & Deployment *(new in v1.5)*

#### Issue #30: CI/CD setup via API didn't grant GitHub permissions ⭐ HIGH IMPACT
- **What happened:** Used `netlify api updateSite` to set `repo.provider: "github"`, `repo.repo_path`, `repo.branch: "main"`, and build settings (command, publish directory). The API call succeeded. Told the user "CI/CD is connected — auto-deploys will handle it." The first auto-deploy failed with "Unable to access repository — Host key verification failed." CI/CD was never actually working.
- **Cause:** The Netlify API can configure build settings but does NOT establish the OAuth connection between Netlify and GitHub. That requires the user to go through Netlify's web UI (Site configuration > Build & deploy > Link to Git) to grant repository access permissions. The API gives you the *settings* without the *authorization*. This distinction isn't obvious from the API documentation.
- **Fix:** Fell back to manual deploys (`netlify deploy --prod --dir=dist`). For true CI/CD, the user needs to link the repo through the Netlify web UI.
- **Prevention:** Don't assume API-level configuration equals full integration. Netlify's GitHub connection requires OAuth — it's a handshake between two platforms that can't be scripted from a terminal. After any CI/CD setup attempt, verify the first auto-deploy succeeds (Issue #32) before telling the user it works. If auto-deploys fail, be honest about it and fall back to manual deploys.
- **Impact:** **High** — gave the user false confidence that auto-deploys were working. Led directly to Issue #32 (changes not deploying because the broken CI/CD was assumed to handle it). Two issues for the price of one mistake.
- **Status:** NOT FIXED — CI/CD still requires manual Netlify UI setup. Currently using manual deploys.

#### Issue #31: OG image placed in `src/assets/` instead of `public/` ⭐ HIGH IMPACT
- **What happened:** Put `rhai_og.png` in `src/assets/images/`, then referenced it in the `og:image` meta tag with a hardcoded URL. Astro's build pipeline processes assets in `src/assets/` — hashing filenames for cache-busting (e.g., `rhai_og.BgQ1nQp_.webp`). The hardcoded meta tag URL didn't match the hashed filename, so the OG image was broken. Had to move it to `public/images/` and delete the original from `src/assets/`.
- **Cause:** Didn't think through the difference between Astro-processed assets (hashed, optimized, unpredictable filenames) and static assets (served as-is from `public/` with original filenames). Treated all images the same without considering how they'd be referenced.
- **Fix:** Moved `rhai_og.png` to `public/images/rhai_og.png` and updated the `og:image` meta tag to point to `/images/rhai_og.png`.
- **Prevention:** Any asset referenced by a hardcoded URL — in meta tags (`og:image`, `twitter:image`), `robots.txt`, `sitemap.xml`, JSON-LD, or anywhere else that doesn't use an Astro `import` — MUST go in `public/`. Only assets imported in components via `import { Image } from 'astro:assets'` should go in `src/assets/`. The rule is simple: if it's imported → `src/assets/`. If it's hardcoded → `public/`.
- **Impact:** **High** — broken OG image means social media previews (Facebook, Twitter, LinkedIn, Slack) show no image or a broken image when the site URL is shared. This is the first thing people see when the site is linked somewhere.
- **Status:** FIXED — Moved to `public/images/` and meta tag updated.

#### Issue #32: Didn't verify auto-deploy before telling user CI/CD was working
- **What happened:** After setting up CI/CD via the API (Issue #30), committed and pushed to GitHub. Told the user "auto-deploys will handle it." The user later reported "I can't see the changes on Netlify yet" — the auto-deploy had silently failed because the GitHub OAuth connection was never established.
- **Cause:** Assumed the push would trigger a successful build without checking. Should have immediately checked `netlify api listSiteDeploys` after pushing to verify the deploy ran and succeeded. Relied on "I set it up, so it must work" instead of verifying.
- **Fix:** Deployed manually after discovering the failure. From this point forward, always verify deploy status after any automated pipeline change.
- **Prevention:** After setting up or modifying any automated deployment pipeline, verify the FIRST run succeeds: (1) Push a commit. (2) Immediately run `netlify api listSiteDeploys --data '{}'`. (3) Check the latest deploy's `state` field — it should be `ready`, not `error` or `build_failed`. (4) Only then tell the user it works. "I set it up" ≠ "it works." The user trusted the statement "CI/CD is connected" and stopped manually deploying. That trust caused changes to sit undeployed until the user noticed.
- **Impact:** **High** — changes sat undeployed on the live site while the user assumed auto-deploys were handling it. The user had to notice the problem themselves and report it. Compounded the damage from Issue #30.
- **Status:** FIXED — Fell back to manual deploys. Lesson learned: verify before declaring success.

#### Issue #33: Tried to import large SVG through `astro:assets` Image component
- **What happened:** The secondary header logo (`reyna_house_secondary_logo.svg`, 323KB) was initially going to be imported via `astro:assets` like a PNG — using `import logo from '../assets/images/logo.svg'` and rendering with the `<Image>` component. Astro's `<Image>` component doesn't optimize SVGs — it's designed for raster formats (PNG, JPG, WebP) where it can perform format conversion, resizing, and quality optimization. For SVGs, it would either serve the file unchanged (wasting build pipeline time) or error.
- **Cause:** Treated SVG the same as raster images without considering that Astro's image pipeline operates on pixel-based formats. SVGs are vector-based XML — they don't benefit from the same optimizations.
- **Fix:** Moved the SVG to `public/images/` and used a plain `<img src="/images/reyna_house_secondary_logo.svg">` tag.
- **Prevention:** SVGs should always go in `public/` and use plain `<img>` tags. Only raster images (PNG, JPG, WebP) benefit from `astro:assets` processing. If an SVG is large (>100KB), consider optimizing it with SVGO rather than relying on Astro's image pipeline. The rule: raster → `src/assets/` + `<Image>`. Vector → `public/` + `<img>`.
- **Impact:** **Medium** — required a mid-course correction during asset integration. No production breakage because it was caught before deploying, but it wasted time on an approach that was never going to work.
- **Status:** FIXED — SVG moved to `public/images/`, plain `<img>` tag used.

### Phase O — Go-Live & Domain Migration *(new in v1.6)*

#### Issue #34: Netlify `ignore_html_forms` silently disabled all form detection ⭐⭐ CRITICAL
- **What happened:** The Netlify contact form returned a 404 on submission. The form HTML was correct — `data-netlify="true"`, hidden `form-name` input, proper field names. Rebuilt and redeployed multiple times. Added a `public/form-placeholder.html` with a bare-bones hidden form. Nothing worked — `netlify api listSiteForms` returned an empty array `[]` every time. Eventually discovered the site had `processing_settings.ignore_html_forms: true`, which told Netlify to skip ALL form detection during deploys. No forms were ever registered, so submissions were treated as raw POST requests to a static URL — resulting in 404.
- **Cause:** The `ignore_html_forms` setting was enabled on the Netlify site (possibly set during initial site creation or as a default). This is a site-level processing setting, not an HTML issue. No amount of correct markup will fix it — the setting must be changed via the Netlify API or the Netlify web UI (Site configuration > Post processing > Form detection).
- **Fix:** Run `netlify api updateSite --data '{"site_id": "<id>", "body": {"processing_settings": {"html": {"pretty_urls": true}, "ignore_html_forms": false}}}'` to enable form detection. Redeploy. Verify with `netlify api listSiteForms`.
- **Prevention:** After setting up a Netlify site, ALWAYS check `processing_settings` via `netlify api getSite` before implementing forms. If `ignore_html_forms` is `true`, no forms will ever be detected. This should be the FIRST thing you check when debugging Netlify form issues — before inspecting markup, before adding hidden inputs, before redeploying. The diagnostic flow should be: (1) Is form detection enabled at the site level? (2) Is the form detected? (`listSiteForms`) (3) Is the markup correct?
- **Impact:** **Critical** — the contact form was completely non-functional. Submissions showed a 404 error page. This is the primary conversion mechanism for the business. Every form submission attempt by a potential client was lost.
- **Status:** FIXED — `ignore_html_forms` set to `false`, form detected and working.

#### Issue #35: HTML `action` redirect replaced with JS `fetch` form submission
- **What happened:** The original form used `action="/?submitted=true"` to redirect back to the homepage with a query parameter after Netlify processed the submission. This approach depends on Netlify's post-processing rewriting the form to submit to Netlify's endpoint, then redirecting to the `action` URL. When form detection was broken (Issue #34), the browser POSTed directly to `/?submitted=true` — a static file that doesn't accept POST requests — causing a 404. Even after fixing form detection, the `action` redirect approach is fragile: it causes a full page reload, loses scroll position, and depends on Netlify's form rewriting working correctly.
- **Cause:** The `action` redirect approach is the "simple" method documented in Netlify's form docs, but it has several reliability issues: (a) it depends on Netlify's post-processing rewriting the form, (b) it causes a full page reload, (c) the success message depends on a query parameter that can be lost, (d) if anything goes wrong, the user sees a 404 or Netlify's generic page instead of a helpful error.
- **Fix:** Replaced with JavaScript `fetch` submission: intercept the `submit` event, POST form data to `/` via `fetch` with `Content-Type: application/x-www-form-urlencoded`, show success message inline on 200 response, show an alert with fallback email on error. Kept the `?submitted=true` query param check as a no-JS fallback.
- **Prevention:** For Netlify forms in Astro (or any static site generator), prefer JavaScript `fetch` submission over the HTML `action` redirect. The JS approach: (a) doesn't depend on Netlify rewriting the form HTML, (b) provides inline success/error handling without page reload, (c) gives you error handling with a fallback contact method, (d) works regardless of how the deploy was done (manual or CI/CD). The `action` redirect is fine for simple sites but becomes fragile at scale.
- **Impact:** **High** — the previous approach (Issue #7's fix of adding `action="/?submitted=true"`) was itself fragile and broke when form detection was disabled. The JS approach is a more robust solution.
- **Status:** FIXED — Form now uses JS `fetch` submission with inline success message.

#### Issue #36: OG image URL still referenced old Netlify staging domain after go-live
- **What happened:** After the site went live at the production domain (`reynahouse.ai`), the `og:image` meta tag still pointed to `https://reynahouseai-v3.netlify.app/images/rhai_og.png` — the old Netlify staging URL. This means social media previews (Facebook, Twitter, LinkedIn, Slack) would either show no image or fetch from the old URL. The `og:url` was already correct (set to `reynahouse.ai` during an earlier phase), but the `og:image` was missed.
- **Cause:** When the domain was migrated, no one searched the codebase for the old staging URL. The `og:url` had been hardcoded to the production domain early on, but the `og:image` was added later (Issue #31) and referenced the staging URL at the time it was created. There was no migration checklist to catch all hardcoded URLs.
- **Fix:** Searched the codebase for `reynahouseai-v3.netlify.app`, found it in `Layout.astro` (`og:image`) and `CLAUDE.md`. Updated the `og:image` URL to `https://reynahouse.ai/images/rhai_og.png`.
- **Prevention:** When migrating to a production domain, run a project-wide search for the old staging URL: `grep -r "yoursite.netlify.app" --include="*.astro" --include="*.mjs" --include="*.json" --include="*.txt" --include="*.md"`. Replace ALL occurrences. Key locations to check: (1) `og:image` and `og:url` meta tags, (2) `twitter:image` meta tag, (3) JSON-LD `url` fields, (4) `robots.txt` sitemap reference, (5) `astro.config.mjs` `site` property, (6) documentation files. Do NOT rely on remembering where URLs are hardcoded — search for them.
- **Impact:** **Medium** — broken social media preview images. The site itself works fine, but anyone sharing the URL on social media would see a missing or broken preview image.
- **Status:** FIXED — All staging URL references updated to production domain.

#### Issue #37: No sitemap integration or `site` config property until go-live
- **What happened:** The `astro.config.mjs` had no `site` property, and `@astrojs/sitemap` was not installed. The `robots.txt` referenced a sitemap (`Sitemap: https://reynahouse.ai/sitemap.xml`) that didn't exist. No sitemap was being generated during builds. This was intentionally deferred because the site was on a staging URL, but when the production domain went live, it should have been added immediately.
- **Cause:** The sitemap was deferred during the build plan because generating one with a staging URL would produce incorrect URLs. However, there was no trigger or checklist item for "when the production domain is set, add the sitemap." It was only added when the user asked about SEO.
- **Fix:** Added `site: 'https://reynahouse.ai'` to `astro.config.mjs`. Installed `@astrojs/sitemap` via `npx astro add sitemap`. Updated `robots.txt` to reference `sitemap-index.xml` (Astro's sitemap integration generates an index file, not a flat `sitemap.xml`). Note: the `robots.txt` previously referenced `sitemap.xml` but Astro generates `sitemap-index.xml`.
- **Prevention:** Add a go-live checklist to the build plan: when the production domain is set, immediately (1) add the `site` property to `astro.config.mjs`, (2) install `@astrojs/sitemap`, (3) update `robots.txt` with the correct sitemap filename (`sitemap-index.xml` for Astro), (4) build and verify the sitemap generates correctly, (5) submit to Google Search Console. Don't wait for the user to ask about SEO — this should be part of the go-live process.
- **Impact:** **Medium** — no sitemap means Google has to discover pages by crawling links instead of being told about them directly. For a single-page site this is less critical, but for multi-page sites it delays indexing significantly. The incorrect `robots.txt` sitemap reference (`sitemap.xml` vs `sitemap-index.xml`) would also confuse crawlers.
- **Status:** FIXED — Sitemap generating correctly, `robots.txt` updated, submitted to Google Search Console.

---

### Non-Issues (Investigated and Confirmed OK)

#### Wix card opacity in Difference.astro — NOT A BUG
- **What it looked like:** The Wix comparison card has `opacity: 0.6` and the parent `<section>` has `data-animate`. Looked like it might have the same conflict as Issue #6.
- **Why it's fine:** `data-animate` is on the `<section>`, not on the card itself. When the section animates to `opacity: 1`, child elements are fully visible within that context. The card's own `opacity: 0.6` is applied as a separate style on the child element — it stacks correctly. `section.opacity(1)` × `card.opacity(0.6)` = card renders at 60% opacity as intended.
- **Key distinction from Issue #6:** Issue #6 happens because `data-animate` is on the *same element* as the scoped `opacity` rule. Here, they're on different elements (parent vs. child), so there's no conflict.

#### All TODO placeholders (logo, photos, Calendly username, social URLs, reviews)
- **Not bugs.** These are intentional per the build spec — content the client needs to provide before launch. They are documented in Prompt 15's final audit step.

---

### Bug Impact Summary

Ranked by user-visible impact if the site were tested as-is:

| Priority | Issue | What users/developers see | Severity |
|----------|-------|--------------------------|----------|
| **1** | **#18** — Fabricated review text | Made-up words attributed to a real person — false content on production site | **Critical** — integrity violation, worst error in project |
| **2** | **#6** — Coming Soon opacity conflict | Coming Soon cards look identical to active card — no visual distinction | **High** — breaks design intent |
| **3** | **#7** — Netlify form success broken | Form submits but user sees Netlify's generic page, never the custom success message | **High** — broken UX |
| **4** | **#8** — Calendly `is:inline` | Calendly booking widget may not load at all — primary CTA is non-functional | **High** — potentially broken core feature |
| **5** | **#19** — Google Business URL downgraded | "View on Google" runs a search instead of opening the reviews panel | **Medium** — broken user intent, functional link but wrong destination |
| **6** | **#22** — Logo opaque background on dark surfaces | Visible light gray circle around logo on navy header and dark footer | **Medium** — may look unintentional, needs user decision |
| **7** | **#9** — No IntersectionObserver fallback | Content invisible in unsupported browsers | **Medium** — edge case but severe when hit |
| **8** | **#23** — Photo crop not verified | Headshot may be cropped unfavorably — user hasn't approved the crop | **Low-Medium** — visual issue, needs user review |
| **9** | **#14** — git push with no auth check | Push fails, wastes a command, requires debugging auth setup | **Medium** — avoidable failed command |
| **10** | **#15** — `gh auth setup-git` missed | Push fails again even after login — two separate failed attempts | **Medium** — avoidable, compounds #14 |
| **11** | **#11** — Unused Playfair Display font | ~15KB wasted download on every page load | **Low** — performance only |
| **12** | **#12** — @import vs `<link>` for fonts | Slightly slower font loading | **Low** — performance only |
| **13** | **#21** — `.DS_Store` not in `.gitignore` | macOS metadata files will be staged in future `git add .` commands | **Low** — repository hygiene, ticking time bomb |
| **14** | **#10** — Missing hamburger focus style | No visible focus indicator on hamburger for keyboard users | **Low** — accessibility gap |
| **15** | **#20** — Tried to `cp` from cloud paths | Two rejected commands, wasted time | **Low** — avoidable failed commands |
| **16** | **#16** — `netlify init` interactive prompt | Command unusable in non-interactive terminal, wasted attempt | **Low** — avoidable failed command |
| **17** | **#17** — Wrong Netlify account slug | 404 on first `sites:create` call, required API lookup to fix | **Low** — avoidable failed command |
| **18** | **#13** — Unnecessary repo questions | Wasted time asking about repo name/visibility the user didn't need | **Low** — workflow friction only |
| **19** | **#24** — Transparent logo swap without previewing | Logo elements invisible on dark surfaces after deploying untested swap | **High** — visually broken, required rollback |
| **20** | **#25** — Playwright `--full-page` screenshots | Extremely tall vertical images that destroyed portfolio card layout | **High** — broken layout, user had to take own screenshots |
| **21** | **#26** — No fixed height on portfolio image containers | Inconsistent card sizes across portfolio grid | **High** — visually broken grid layout |
| **22** | **#27** — Hero monogram at 8% opacity | Decorative element effectively invisible — looked like a rendering artifact | **Medium** — wasted design element |
| **23** | **#28** — Didn't push to GitHub alongside Netlify | GitHub repo consistently behind live site; user asked separately each time | **Medium** — workflow annoyance |
| **24** | **#29** — Orphaned full-page PNGs in repo | ~2.6MB of dead weight from replaced screenshots still in repo | **Low** — repo bloat |
| **25** | **#30** — CI/CD via API didn't grant GitHub OAuth | Auto-deploys fail silently; user told CI/CD works when it doesn't | **High** — false confidence, led to Issue #32 |
| **26** | **#31** — OG image in `src/assets/` instead of `public/` | Social media previews show broken/missing image when URL is shared | **High** — broken social sharing |
| **27** | **#32** — Didn't verify auto-deploy before declaring success | Changes sit undeployed; user discovers the problem themselves | **High** — user trust violation, compounds #30 |
| **28** | **#33** — SVG imported through `astro:assets` Image component | Build error or unchanged SVG served through unnecessary pipeline | **Medium** — required mid-course correction |
| **29** | **#34** — Netlify `ignore_html_forms` silently disabled form detection | Contact form returns 404 on every submission — primary conversion mechanism broken | **Critical** — completely non-functional form |
| **30** | **#35** — HTML `action` redirect fragile for Netlify form submission | Page reload on submit, lost scroll position, 404 if form detection fails | **High** — fragile UX, replaced with JS fetch |
| **31** | **#36** — OG image URL still referenced staging domain after go-live | Social media previews show broken/missing image when production URL is shared | **Medium** — broken social sharing |
| **32** | **#37** — No sitemap or `site` config until user asked about SEO | Google has no sitemap to crawl; `robots.txt` references nonexistent file | **Medium** — delayed indexing, incorrect robots.txt |

---

*Blueprint compiled from ReynaHouseAI_Site_Spec.md Version 1.0*
*Revised with Issues #6–#12 from build QA — Version 1.1*
*Revised with Issues #13–#17 from deployment session errors — Version 1.2*
*Revised with Issues #18–#23 from assets & content integration errors — Version 1.3*
*Revised with Issues #24–#29 from polish & portfolio integration errors — Version 1.4*
*Revised with Issues #30–#33 from post-build infrastructure & deployment errors — Version 1.5*
*Revised with Issues #34–#37 from go-live & domain migration errors — Version 1.6*
*Reyna House AI — Big Bear Lake, CA — reynahouse.ai*
