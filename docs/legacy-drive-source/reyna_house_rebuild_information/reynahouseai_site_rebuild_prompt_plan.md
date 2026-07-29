# ReynaHouseAI.com — Build Blueprint & LLM Prompt Plan
### Version 1.0 | Astro + Tailwind CSS + Netlify

---

## PART 1: DETAILED STEP-BY-STEP BLUEPRINT

### Phase 1 — Project Foundation

1. Scaffold a new Astro project with Tailwind CSS (image optimization is built-in via `astro:assets` — no separate integration needed)
2. Set up the GitHub repo and connect to Netlify for CI/CD deploys
3. Define all brand CSS variables in `global.css`
4. Import Google Fonts (Bebas Neue, Playfair Display, Inter, IBM Plex Mono)
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
15. Add the Trust Bar with 3 icon badges

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
25. Style desaturated state for Coming Soon cards

### Phase 7 — Portfolio Section

26. Build `Portfolio.astro` on dark Navy background
27. Add overline, headline
28. Build the 2×2 responsive portfolio card grid
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
37. Add photo placeholder with authentic description comment
38. Add the stats/badges row and social icon links

### Phase 10 — Testimonials Section

39. Build `Testimonials.astro` on Cream background
40. Add overline, headline
41. Build 2 testimonial cards (name, stars, review text)
42. Add "View on Google" link and star rating summary

### Phase 11 — Contact Section

43. Build `Contact.astro` on dark gradient background
44. Add overline, headline, subheadline
45. Build the two-column layout (left: contact info + "What happens next" steps; right: Calendly embed)
46. Build the Netlify Forms backup contact form with all required fields
47. Add form success state message

### Phase 12 — SEO & Schema

48. Add `LocalBusiness` JSON-LD structured data to `Layout.astro`
49. Add FAQ `ItemList` JSON-LD schema with all 4 FAQ entries
50. Add hidden FAQ section in the DOM (visually minimal, rich for crawlers)
51. Verify all Open Graph and Twitter Card meta tags

### Phase 13 — Scroll Animations

52. Write a lightweight `scroll-observer.js` using Intersection Observer API
53. Apply `data-animate` attributes to each section for fade-in-on-scroll

### Phase 14 — Performance & Polish

54. Replace all `<img>` tags with Astro `<Image>` component
55. Add `font-display: swap` to font CSS
56. Audit and remove unused Tailwind classes
57. Add `<meta name="theme-color" content="#334668">`
58. Test all anchor links, form submission, and Calendly embed
59. Run Lighthouse audit — target 95+ performance

---

## PART 2: ITERATIVE CHUNKS

### Chunk A — Scaffold & Config *(completed with issues — see Part 5)*
- Steps 1–8: Get a working, deployable project shell with no content but all structure in place
- **Note:** Step A3 (`astro add image`) was removed — `astro:assets` is built-in since Astro v3

### Chunk B — Shell Components
- Steps 9–10: Header and Footer completed; nav works, footer renders

### Chunk C — Hero
- Steps 11–15: Full Hero section renders with correct brand styling, CTAs, and trust bar

### Chunk D — Pain + Difference
- Steps 16–21: Two content sections that establish the problem and the brand differentiator

### Chunk E — Services
- Steps 22–25: Three service cards render correctly with Coming Soon state

### Chunk F — Portfolio
- Steps 26–30: Portfolio grid works on desktop and mobile with demo card styled distinctly

### Chunk G — Pricing
- Steps 31–34: Three pricing cards with no prices, correct badges, all CTAs link to #contact

### Chunk H — About + Social Proof
- Steps 35–42: About section and Testimonials section both complete

### Chunk I — Contact & Integrations
- Steps 43–47: Calendly embed, Netlify form, success state all wired up

### Chunk J — SEO & Schema
- Steps 48–51: Structured data and all meta tags complete

### Chunk K — Animation & Final Polish
- Steps 52–59: Scroll animations, performance optimizations, final QA

---

## PART 3: MICRO-STEPS PER CHUNK

### Chunk A Micro-Steps
- A1. Run `npm create astro@latest` with minimal starter template — ⚠️ **ISSUE #1:** Target dir must be completely empty (`.claude/` folder caused rejection). Scaffold went to `./y` subdirectory; required `cp -r y/. .` and `rm -rf y` to fix.
- A2. Run `npx astro add tailwind` — accept all defaults — ⚠️ **ISSUE #2:** After copying from `./y`, symlinks in `node_modules/.bin` were broken. Fix: `rm -rf node_modules && npm install` before running this step.
- ~~A3. Run `npx astro add image` — accept all defaults~~ — ❌ **ISSUE #3:** REMOVED. `@astrojs/image` is deprecated and does not exist for Astro v5. Image optimization is built-in via `astro:assets` since Astro v3. Use `import { Image } from 'astro:assets'` directly in components — no integration needed.
- A4. Create `/src/styles/global.css` with CSS custom properties for all brand colors
- A5. Create `/src/styles/fonts.css` with Google Fonts `@import` for Bebas Neue, Inter, IBM Plex Mono
- A6. Create `/src/layouts/Layout.astro` with `<html>`, `<head>`, and `<slot />` — ⚠️ **ISSUE #4:** CSS imports must go in the frontmatter (`---`) block, NOT in the HTML `<head>`. `<import '...' />` is not valid Astro syntax. Use `import '../styles/fonts.css';` inside the `---` fences.
- A7. Add all SEO meta tags to `Layout.astro` head (title, description, OG, Twitter, theme-color, favicon)
- A8. Create empty stubs for all 11 component files
- A9. Create `index.astro` that imports Layout and all components in correct order
- A10. Create on-brand `404.astro`
- A11. Verify `package.json` name is correct — ⚠️ **ISSUE #5:** Scaffold set `"name": "y"` from the subdirectory name. Must manually fix to `"reynahouseai"`.

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
- E7. Apply desaturated / reduced opacity style to Coming Soon cards

### Chunk F Micro-Steps
- F1. Build Portfolio section with dark Navy background
- F2. Add overline, H2
- F3. Build portfolio card component: image placeholder, title, tag pill, short description
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
- H8. Build testimonial card component (reviewer name, stars, quote text)
- H9. Render 2 placeholder testimonial cards (with TODO comment for real reviews)
- H10. Add "View on Google" link and ⭐⭐⭐⭐⭐ summary line

### Chunk I Micro-Steps
- I1. Build Contact section with dark gradient background (matching Hero)
- I2. Add overline, H2, subheadline
- I3. Build left column: email, location, response time, numbered "What happens next" steps
- I4. Build right column: Calendly inline embed with correct CSS (min-width 320px, height 630px)
- I5. Add Calendly CSS link in Layout `<head>`
- I6. Add Calendly script tag with `async` attribute
- I7. Below Calendly, add "Prefer to write it out?" text
- I8. Build Netlify Form: hidden `form-name` input, all 6 fields, dropdown options from spec
- I9. Style Submit button (Copper bg, "Send It →")
- I10. Add form success message state using conditional rendering or simple JS class toggle

### Chunk J Micro-Steps
- J1. Write `LocalBusiness` JSON-LD object and inject into `Layout.astro` `<head>` via `<script type="application/ld+json">`
- J2. Write FAQ `ItemList` JSON-LD with all 4 Q&A pairs
- J3. Add a visually minimal (small font, muted color) FAQ accordion or flat list in the DOM before the Footer
- J4. Verify title tag matches spec exactly
- J5. Verify meta description matches spec exactly
- J6. Verify all OG tags (og:title, og:description, og:image placeholder)

### Chunk K Micro-Steps
- K1. Write `/public/js/scroll-observer.js` using `IntersectionObserver` — adds `.is-visible` class when element enters viewport
- K2. Add `data-animate` attribute to each section's root element
- K3. Write CSS: `[data-animate] { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; }` and `.is-visible { opacity: 1; transform: none; }`
- K4. Load script in Layout with `defer`
- K5. Replace all raw `<img>` with Astro `<Image>` component
- K6. Add `font-display: swap` to font CSS
- K7. Verify no `client:load` directives are used unnecessarily (all components are static)
- K8. Do a final anchor link audit — all nav links resolve to correct section IDs
- K9. Test Netlify form on staging URL
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

- /src/styles/fonts.css — Google Fonts @import for: Bebas Neue (400), Playfair Display (700), Inter (400, 600), IBM Plex Mono (400). Apply font-display: swap to each.

- /src/layouts/Layout.astro — Base layout with:
  - Props: title (string), description (string)
  - <head> includes: charset, viewport, theme-color #334668, title, meta description, favicon link (public/favicon.ico), both CSS files imported, Tailwind
  - <body> with <slot />

- /src/pages/index.astro — Imports Layout with title and description from the spec. Renders a single <main> with placeholder "TODO" comments for each of these sections in order: Hero, PainPoint, Difference, Services, Portfolio, Pricing, About, Testimonials, Contact.

- /src/pages/404.astro — On-brand 404 page using Layout. Navy background. Text "Page Not Found." in Copper Bebas Neue. A link back to / styled as a Copper button.

- Stub (empty) Astro component files for: Header.astro, Hero.astro, PainPoint.astro, Difference.astro, Services.astro, Portfolio.astro, Pricing.astro, About.astro, Testimonials.astro, Contact.astro, Footer.astro — each file should just export an empty component returning a <section> or <div> with a TODO comment.

Do not generate any content copy yet. This prompt is purely structure and config.
```

---

### Prompt 2 — Header Component

```text
Using the existing Astro + Tailwind project, build /src/components/Header.astro.

Requirements:
- Sticky header (position: sticky; top: 0; z-index: 50)
- Background: --navy (#334668) with slight box-shadow for depth
- Left side: Logo — for now use text "REYNA HOUSE AI" in IBM Plex Mono, Copper color, as a link to / (home). Leave a TODO comment: "<!-- TODO: Replace with actual crown logo SVG -->"
- Right side: Navigation links — Home, Work, Services, Pricing, About, and Contact
  - Home, Work, Services, Pricing, About → plain anchor links to #hero, #portfolio, #services, #pricing, #about respectively. White text, hover: Copper color transition.
  - Contact → styled as a button: Copper background, white text, bold, slightly rounded (border-radius: 6px), padding 10px 20px. Links to #contact.
- Mobile: At breakpoint <768px, collapse nav. Show a hamburger icon (3 lines SVG). Clicking it toggles the nav open/closed. Use a small inline <script> for the toggle — no frameworks.
- All nav links close the mobile menu on click.
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
- Logo text "REYNA HOUSE AI" in IBM Plex Mono, Copper color (same TODO comment for real logo)
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

Right side: A solid rectangular block using a CSS radial-gradient from --copper at 10% opacity to transparent, with a large "RH" monogram text in Bebas Neue at low opacity as a decorative element. Leave a TODO comment: "<!-- TODO: Replace right panel with real photography when available -->"

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
- Card: white bg, opacity: 0.7, border-radius 10px, padding 32px (desaturated look)

Card 3 — "Full AI Automation":
- Icon: rocket SVG, --tan, 48px (muted)
- Title: "Full AI Automation" — Bebas Neue, --navy at 70% opacity
- Body: "AI that books appointments, follows up on estimates, and keeps your calendar full — while you're on the job."
- Tag: "Coming Soon" badge same as Card 2
- Same desaturated card styles as Card 2

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
- TODO comment: "<!-- TODO: Replace with authentic photo of Edward when available -->"

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
- Text: "TODO: Add first Google review text here."
- Name: "TODO: Reviewer Name"

Card 2 placeholder:
- Same structure, different TODO comment

4. Below the cards (centered):
- "⭐⭐⭐⭐⭐ 5.0 on Google" — Bebas Neue, --navy, 1.4rem
- Subtext: "We earn every review." — Inter, --tan, italic, small
- Link button: "View on Google →" — outline style, --copper border and text, hover fill --copper, links to "#" with TODO comment for Google Business URL

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
- Calendly script tag with async attribute below the embed div

5. Below the Calendly embed (full width):
- Text: "Prefer to write it out? Use the form below." — Inter, --tan, italic, centered

6. Netlify Contact Form (below Calendly, full width, max-width 640px, centered):
- <form name="contact" method="POST" data-netlify="true">
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
- Add a small inline <script> that listens for the form's netlify submission or checks URL param ?submitted=true to show the success div

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
- <meta property="og:image" content="https://reynahouse.ai/images/og-image.png" />
- <meta name="twitter:card" content="summary_large_image" />
- <meta name="twitter:title" content="{title}" />
- <meta name="twitter:description" content="{description}" />

Add this LocalBusiness JSON-LD script block:
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Reyna House AI",
  "url": "https://reynahouse.ai",
  "description": "Reyna House AI builds custom websites and automation for general contractors. You own your site — no Wix, no monthly ransom.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Big Bear Lake",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "areaServed": ["California", "Nationwide"],
  "serviceType": ["Web Design", "AI Automation", "Landing Pages"]
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
1. Selects all elements with [data-animate] attribute
2. Creates an IntersectionObserver with threshold: 0.12
3. When an element intersects, adds the class "is-visible" to it
4. Unobserves the element after it becomes visible (fire once)
5. Runs the observer after DOMContentLoaded

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
- Each individual service card in Services.astro
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
- In /src/styles/fonts.css, ensure all @font-face or @import rules have font-display: swap.
- Add <link rel="preconnect" href="https://fonts.googleapis.com"> and <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> to Layout.astro head, above the font CSS link.

Step 3 — Accessibility:
- Audit all interactive elements in Header.astro: ensure nav links have visible focus states (outline: 2px solid --copper).
- Ensure mobile hamburger button has aria-label="Toggle navigation".
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

---

*Blueprint compiled from ReynaHouseAI_Site_Spec.md Version 1.0*
*Reyna House AI — Big Bear Lake, CA — reynahouse.ai*
