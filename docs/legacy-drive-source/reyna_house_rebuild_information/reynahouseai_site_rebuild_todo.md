# ReynaHouseAI.com — Build Todo Checklist
### Version 1.0 | Astro + Tailwind + Netlify

---

## PHASE 1 — Project Scaffold & Config

### Project Setup
- [ ] Run `npm create astro@latest` with minimal starter template
- [ ] Run `npx astro add tailwind` — accept all defaults
- [ ] Run `npx astro add image` — accept all defaults
- [ ] Initialize Git repo and push to GitHub
- [ ] Connect GitHub repo to Netlify for automatic deploys
- [ ] Confirm Netlify deploy runs successfully on first push

### Brand Styles
- [ ] Create `/src/styles/global.css` with all 8 CSS custom properties (`--navy`, `--copper`, `--forest`, `--cream`, `--tan`, `--gold`, `--white`, `--dark`)
- [ ] Add base body reset to `global.css` (no pure black or white — use palette vars)
- [ ] Create `/src/styles/fonts.css` with Google Fonts `@import` for Bebas Neue (400)
- [ ] Add Inter (400, 600) to `fonts.css`
- [ ] Add IBM Plex Mono (400) to `fonts.css`
- [ ] Add Playfair Display (700) to `fonts.css`
- [ ] Set `font-display: swap` on every `@import` or `@font-face` rule in `fonts.css`

### Base Layout
- [ ] Create `/src/layouts/Layout.astro` with `<html>`, `<head>`, `<body>`, and `<slot />`
- [ ] Add `title` and `description` as Astro props with sensible defaults
- [ ] Add `<meta charset="UTF-8">` and `<meta name="viewport">` to `Layout.astro`
- [ ] Add `<meta name="theme-color" content="#334668">` to `Layout.astro`
- [ ] Add `<link rel="icon" href="/favicon.ico">` to `Layout.astro`
- [ ] Import `global.css` in `Layout.astro`
- [ ] Import `fonts.css` in `Layout.astro`
- [ ] Add Google Fonts `<link rel="preconnect">` tags above font CSS in `Layout.astro`

### Pages
- [ ] Create `/src/pages/index.astro` using `Layout` with correct title and description from spec
- [ ] Add placeholder `<!-- TODO -->` comments in `index.astro` for all 10 sections in correct order
- [ ] Create `/src/pages/404.astro` with on-brand design (Navy bg, Copper Bebas Neue headline, link home)

### Component Stubs
- [ ] Create empty stub: `Header.astro`
- [ ] Create empty stub: `Hero.astro`
- [ ] Create empty stub: `PainPoint.astro`
- [ ] Create empty stub: `Difference.astro`
- [ ] Create empty stub: `Services.astro`
- [ ] Create empty stub: `Portfolio.astro`
- [ ] Create empty stub: `Pricing.astro`
- [ ] Create empty stub: `About.astro`
- [ ] Create empty stub: `Testimonials.astro`
- [ ] Create empty stub: `Contact.astro`
- [ ] Create empty stub: `Footer.astro`

---

## PHASE 2 — Header Component

- [ ] Build `Header.astro` with `position: sticky; top: 0; z-index: 50`
- [ ] Set header background to `--navy` with subtle `box-shadow`
- [ ] Add logo (text "REYNA HOUSE AI" in IBM Plex Mono, Copper) as link to `/`
- [ ] Add `<!-- TODO: Replace with actual crown logo SVG -->` comment in header
- [ ] Add nav links: Home, Work, Services, Pricing, About — as `<a href="#section">` anchors
- [ ] Style nav links: white text, hover Copper with CSS transition
- [ ] Add Contact nav item styled as a Copper button linking to `#contact`
- [ ] Add mobile hamburger icon (inline SVG, 3 lines)
- [ ] Write inline `<script>` to toggle mobile nav open/closed on hamburger click
- [ ] Ensure all nav links close the mobile menu on click
- [ ] Add `aria-label="Toggle navigation"` to hamburger button
- [ ] Add visible focus states (`outline: 2px solid --copper`) to all nav links
- [ ] Import and render `Header.astro` in `index.astro` above `<main>`

---

## PHASE 3 — Footer Component

- [ ] Build `Footer.astro` with near-black background (`#111111`)
- [ ] Build 3-column CSS grid layout (3 cols desktop / 1 col mobile)
- [ ] Column 1: Add "REYNA HOUSE AI" logo text and `<!-- TODO: Replace with real logo -->` comment
- [ ] Column 1: Add brand mission tagline in italic `--tan`
- [ ] Column 1: Add copyright line with no "Edward Web Builder" references
- [ ] Column 2: Add "NAVIGATE" heading in IBM Plex Mono, Copper, letter-spaced
- [ ] Column 2: Add all 6 anchor nav links (Home, Work, Services, Pricing, About, Contact)
- [ ] Column 3: Add "GET IN TOUCH" heading
- [ ] Column 3: Add `edward@reynahouse.ai` as a `mailto:` link
- [ ] Column 3: Add inline SVG social icons (TikTok, Facebook, YouTube, X, Rumble) — white, hover Copper
- [ ] Column 3: Add `<!-- TODO: Add real social profile URLs -->` comment on each social link
- [ ] Column 3: Add "⭐ See Our Google Reviews" link with `<!-- TODO: Add Google Business URL -->`
- [ ] Add full-width footer bottom bar with border-top and location text
- [ ] Add `aria-hidden="true"` to all decorative SVG icons in footer
- [ ] Import and render `Footer.astro` in `index.astro` below `<main>`

---

## PHASE 4 — Hero Section

- [ ] Add `id="hero"` to `Hero.astro` section element
- [ ] Set background: `linear-gradient(135deg, #334668 0%, #1a1a2e 100%)`
- [ ] Add `::after` pseudo-element with base64 SVG noise texture at `opacity: 0.04`
- [ ] Set `min-height: 100vh` on hero section
- [ ] Build 2-column flex layout (text left, decorative right) — single column on mobile
- [ ] Add overline: "REYNA HOUSE AI — BIG BEAR LAKE, CA" in IBM Plex Mono, Copper, letter-spaced
- [ ] Add H1: "Your Contractors Are Calling. Are You Answering?" in Bebas Neue, Copper, `clamp(3rem, 7vw, 6rem)`
- [ ] Add subheadline paragraph in Inter, `--white`, `max-width: 520px`
- [ ] Add primary CTA button: "Book a Free 15-Minute Call →" — Copper bg, white text, `border-radius: 6px`, links to `#contact`
- [ ] Add secondary text-link: "See Our Work ↓" — `--tan` color, hover Copper, links to `#portfolio`
- [ ] Add Trust Bar with 3 flex items (icon + label each)
- [ ] Trust Bar item 1: "You Own It. Always." with inline SVG icon
- [ ] Trust Bar item 2: "Built in the USA" with inline SVG icon
- [ ] Trust Bar item 3: "Live in 2 Weeks" with inline SVG icon
- [ ] Style Trust Bar labels: IBM Plex Mono, small, `--tan`
- [ ] Add right-panel decorative element (CSS radial-gradient + "RH" monogram)
- [ ] Add `<!-- TODO: Replace right panel with real photography when available -->` comment
- [ ] Import `Hero.astro` into `index.astro` as first component inside `<main>`

---

## PHASE 5 — Pain Point Section

- [ ] Add `id="pain-point"` to `PainPoint.astro` section element
- [ ] Set background: `--cream (#EDEAE0)`
- [ ] Add `max-width: 900px` centered content container with `100px` vertical padding
- [ ] Add overline: "SOUND FAMILIAR?" in IBM Plex Mono, Copper, uppercase, letter-spaced
- [ ] Add H2 headline (3-line version) in Bebas Neue, `--navy`, `clamp(2rem, 4rem)`, line-height 1.1
- [ ] Add body paragraph 1: "General contractors don't lose jobs because of bad work…"
- [ ] Add body paragraph 2: "No website. No follow-up…"
- [ ] Add bold standalone line: "We fix that."
- [ ] Set body text: Inter, `--navy`, `max-width: 600px`
- [ ] Build 3-column icon grid (3 cols desktop / 1 col mobile, `gap: 2rem`)
- [ ] Grid Card 1: Phone-with-X SVG icon, "Missed Calls" title, subtext
- [ ] Grid Card 2: Receipt/stack SVG icon, "Invoice Chaos" title, subtext
- [ ] Grid Card 3: Calendar-with-X SVG icon, "No-Shows & Scheduling" title, subtext
- [ ] Style grid cards: white bg, `1px --tan border`, `border-radius: 8px`, `padding: 24px`, centered content
- [ ] Set grid card icons: `--copper` color, 48px
- [ ] Import `PainPoint.astro` into `index.astro` after `Hero`

---

## PHASE 6 — Difference Section

- [ ] Add `id="difference"` to `Difference.astro` section element
- [ ] Set background: `--navy (#334668)`
- [ ] Add `100px` vertical padding and `max-width: 1000px` centered container
- [ ] Add overline: "WHY REYNA HOUSE" in IBM Plex Mono, Copper, uppercase, letter-spaced
- [ ] Add H2: "Your Website Should Be Yours. Not Rented. Not Held Hostage. Yours." in Bebas Neue, `--white`
- [ ] Add 3 body copy paragraphs (verbatim from spec) in Inter, `--white`, `max-width: 640px`
- [ ] Build two-column comparison card layout (flex, stacked on mobile)
- [ ] Left card: muted header bg (`#555`), `opacity: 0.6`, dark background, `--tan` text rows
- [ ] Left card: Add ✕ icon (red) before each of the 5 "Wix/Squarespace" items
- [ ] Right card: Copper header bg, `--gold` border (`2px solid`), dark green tint background
- [ ] Right card: Add ✓ checkmark (gold) before each of the 5 "Reyna House" items
- [ ] Import `Difference.astro` into `index.astro` after `PainPoint`

---

## PHASE 7 — Services Section

- [ ] Add `id="services"` to `Services.astro` section element
- [ ] Set background: `--cream`
- [ ] Add `100px` vertical padding and `max-width: 1100px` centered container
- [ ] Add overline: "WHAT WE BUILD"
- [ ] Add H2: "Start Simple. Grow When You're Ready." in Bebas Neue, `--navy`
- [ ] Add intro copy paragraph in Inter, `--navy`, `max-width: 560px`
- [ ] Build 3-column CSS grid (3 cols desktop / 1 col mobile)
- [ ] Card 1: Add house/blueprint SVG icon in `--copper`, 48px
- [ ] Card 1: Add title "Your Landing Page" in Bebas Neue, `--navy`
- [ ] Card 1: Add body copy (verbatim from spec)
- [ ] Card 1: Add "Most Popular for New Clients" badge — `--forest` bg, `--white` text, pill
- [ ] Card 1: Add hover lift effect: `translateY(-4px)` + stronger `box-shadow`
- [ ] Card 2: Add gear/cog SVG icon in `--tan` (muted), 48px
- [ ] Card 2: Add title "Missed Call Automation" at 70% opacity
- [ ] Card 2: Add body copy (verbatim from spec)
- [ ] Card 2: Add "Coming Soon" badge — `--forest` bg, `--white` text
- [ ] Card 2: Apply desaturated / `opacity: 0.7` card style
- [ ] Card 3: Add rocket SVG icon in `--tan` (muted), 48px
- [ ] Card 3: Add title "Full AI Automation" at 70% opacity
- [ ] Card 3: Add body copy (verbatim from spec)
- [ ] Card 3: Add "Coming Soon" badge — same style as Card 2
- [ ] Card 3: Apply same desaturated card style as Card 2
- [ ] Import `Services.astro` into `index.astro` after `Difference`

---

## PHASE 8 — Portfolio Section

- [ ] Add `id="portfolio"` to `Portfolio.astro` section element
- [ ] Set background: `#1a1f2e` (near-black deep navy)
- [ ] Add `100px` vertical padding and `max-width: 1100px` centered container
- [ ] Add overline: "OUR WORK" in IBM Plex Mono, Copper
- [ ] Add H2: "Real Sites. Real Businesses. Real Results." in Bebas Neue, `--white`
- [ ] Build 2×2 CSS grid (2 cols desktop / 1 col mobile, `gap: 1.5rem`)
- [ ] Build reusable portfolio card structure (image, tag pill, title, description)
- [ ] Card 1: Placeholder image (placehold.co), tag "Landing Page", title "Big Bear Hair Salon"
- [ ] Card 1: Add `<!-- TODO: Replace with real site screenshot -->`
- [ ] Card 2: Placeholder image, tag "Professional Services", title "LA Notary Public"
- [ ] Card 2: Add `<!-- TODO: Replace with real site screenshot -->`
- [ ] Card 3: Placeholder image, tag "Service Business", title "Van Nuys Maintenance Co."
- [ ] Card 3: Add `<!-- TODO: Replace with real site screenshot -->`
- [ ] Card 4: Add `2px solid --copper` border
- [ ] Card 4: Add Copper glow `box-shadow: 0 0 24px rgba(201,148,77,0.3)`
- [ ] Card 4: Add "⭐ Demo — This Could Be You" tag in Copper bg, white text
- [ ] Card 4: Title "Bear Valley Builders — Big Bear, CA" in Bebas Neue, `--copper`
- [ ] Card 4: Add `<!-- TODO: Replace with real demo site screenshot -->`
- [ ] Style all tag pills: IBM Plex Mono, small, `border-radius: 4px`
- [ ] Add below-grid "Your business could be next." italic line in `--white`
- [ ] Add "Let's Build Yours →" CTA button linking to `#contact`
- [ ] Import `Portfolio.astro` into `index.astro` after `Services`

---

## PHASE 9 — Pricing Section

- [ ] Add `id="pricing"` to `Pricing.astro` section element
- [ ] Set background: `--cream`
- [ ] Add `100px` vertical padding and `max-width: 1100px` centered container
- [ ] **Confirm: zero dollar amounts appear anywhere in this component**
- [ ] Add overline: "INVESTMENT" in IBM Plex Mono, Copper
- [ ] Add H2: "Good Work Costs Money. Bad Work Costs More." in Bebas Neue, `--navy`
- [ ] Add intro copy paragraph (verbatim from spec)
- [ ] Add italic philosophy note in `--tan`, small font
- [ ] Build 3-column pricing card grid (3 cols desktop / 1 col mobile)
- [ ] All cards: white bg, `border-radius: 12px`, `padding: 36px`, subtle `box-shadow`
- [ ] Card 1 (Foundation): Add "Best for" line in italic `--tan`
- [ ] Card 1: Add full includes list with checkmark icons in `--forest`
- [ ] Card 1: Add "Let's Talk →" CTA button (Copper bg, links to `#contact`, full width)
- [ ] Card 2 (Full Site): Add "Most Popular" badge — Copper bg, white text, top-right positioned
- [ ] Card 2: Add "Best for" line
- [ ] Card 2: Add includes list with "Everything in Foundation, plus:" items
- [ ] Card 2: Add CTA button
- [ ] Card 3 (Business System): Add "Best ROI" badge — `--forest` bg, white text, top-right positioned
- [ ] Card 3: Add "Best for" line
- [ ] Card 3: Add includes list with "Everything in Full Site, plus:" items
- [ ] Card 3: Add CTA button
- [ ] Add Add-Ons callout block below cards with "Book a Call to Discuss →" CTA
- [ ] Import `Pricing.astro` into `index.astro` after `Portfolio`

---

## PHASE 10 — About Section

- [ ] Add `id="about"` to `About.astro` section element
- [ ] Set background: `--navy`
- [ ] Add `100px` vertical padding
- [ ] Build 2-column layout (text left, photo right) — stacked on mobile
- [ ] Add overline: "WHO'S BEHIND THIS" in IBM Plex Mono, Copper
- [ ] Add H2: "I'm Edward Reyna. I'm Learning This Right Alongside You." in Bebas Neue, `--white`
- [ ] Add all 6 body copy paragraphs (verbatim from spec) in Inter, `--white`, `max-width: 560px`
- [ ] Add stats/badges row: 3 badges in flex — "Big Bear Lake, CA" | "Serving clients nationwide" | "Family name on the door since day one"
- [ ] Style badges: `--forest` bg, `--white` text, IBM Plex Mono, `padding: 6px 14px`, `border-radius: 4px`
- [ ] Add social icons row: TikTok, Facebook, YouTube, X, Rumble — white fill, hover Copper
- [ ] Add `<!-- TODO: Add real social profile URLs -->` comment on each icon link
- [ ] Add right column photo placeholder div (400×480px, dark gradient, "EDWARD REYNA" text)
- [ ] Add `<!-- TODO: Replace with authentic photo of Edward when available -->` comment
- [ ] Import `About.astro` into `index.astro` after `Pricing`

---

## PHASE 11 — Testimonials Section

- [ ] Add `id="testimonials"` to `Testimonials.astro` section element
- [ ] Set background: `--cream`
- [ ] Add `100px` vertical padding and `max-width: 900px` centered container
- [ ] Add overline: "WHAT CLIENTS SAY" in IBM Plex Mono, Copper
- [ ] Add H2: "Don't Take Our Word for It." in Bebas Neue, `--navy`
- [ ] Build 2-card side-by-side layout (flex/grid, stacked on mobile)
- [ ] Build testimonial card component: white bg, `border-radius: 10px`, `padding: 32px`, `box-shadow`
- [ ] Add 5-star row (★★★★★) in `--gold` to each card
- [ ] Add review text in Inter, `--navy`, italic
- [ ] Add reviewer name in Bebas Neue, `--copper`
- [ ] Add "Verified Google Review" label in IBM Plex Mono, `--tan`, very small
- [ ] Card 1: Add `<!-- TODO: Add first Google review text and reviewer name -->`
- [ ] Card 2: Add `<!-- TODO: Add second Google review text and reviewer name -->`
- [ ] Add "⭐⭐⭐⭐⭐ 5.0 on Google" summary line in Bebas Neue, `--navy`
- [ ] Add "We earn every review." italic subtext in `--tan`
- [ ] Add "View on Google →" outline button (Copper border/text, hover fill) with `<!-- TODO: Add Google Business URL -->`
- [ ] Import `Testimonials.astro` into `index.astro` after `About`

---

## PHASE 12 — Contact Section

- [ ] Add `id="contact"` to `Contact.astro` section element
- [ ] Set background: same dark gradient as Hero (`linear-gradient(135deg, #334668 0%, #1a1a2e 100%)`)
- [ ] Add `100px` vertical padding and `max-width: 1100px` centered container
- [ ] Add overline: "LET'S GET TO WORK" in IBM Plex Mono, Copper
- [ ] Add H2: "Ready to Stop Losing Leads? Let's Talk." in Bebas Neue, `--white`
- [ ] Add subheadline paragraph in Inter, `--white`, `max-width: 520px`
- [ ] Build 2-column layout (stacked on mobile)
- [ ] Left column: Add `edward@reynahouse.ai` as `mailto:` link in `--copper`
- [ ] Left column: Add location line "Big Bear Lake, CA — Serving clients nationwide" in `--tan`
- [ ] Left column: Add response time note in `--tan`, italic, small
- [ ] Left column: Add "What happens next?" heading in IBM Plex Mono, Copper, small
- [ ] Left column: Add numbered 4-step list in Inter, `--white`
- [ ] Add Calendly CSS `<link>` to `Layout.astro` head
- [ ] Right column: Add Calendly inline embed div with `data-url` placeholder
- [ ] Add `<!-- TODO: Replace YOUR-USERNAME with real Calendly username -->` comment
- [ ] Add Calendly `<script>` tag with `async` attribute
- [ ] Add `aria-label="Schedule a call with Reyna House AI"` to Calendly wrapper div
- [ ] Add "Prefer to write it out? Use the form below." text in `--tan`, italic, centered
- [ ] Build Netlify form: `<form name="contact" method="POST" data-netlify="true">`
- [ ] Add hidden input: `<input type="hidden" name="form-name" value="contact" />`
- [ ] Add "Your Name" field (required, `text`, with matching `<label>` and `id`)
- [ ] Add "Business Name" field (text)
- [ ] Add "Phone Number" field (required, `tel`)
- [ ] Add "Best Time to Call" field (text, with placeholder)
- [ ] Add "What do you need?" dropdown with options: New Website | Automation | Both | Not Sure Yet
- [ ] Add "Tell me more" textarea (optional, 4 rows)
- [ ] Style all inputs: `--navy` bg at 40% opacity, `1px --tan border`, `--white` text, `border-radius: 6px`
- [ ] Ensure every field has a matching `<label for="">` and `id=""` attribute
- [ ] Add "Send It →" submit button: Copper bg, white text, full width, `border-radius: 6px`
- [ ] Add hidden `#form-success` div with "Got it. I'll reach out within 6 hours. — Edward"
- [ ] Add inline `<script>` to show success div on form submission or `?submitted=true` URL param
- [ ] Import `Contact.astro` into `index.astro` after `Testimonials`

---

## PHASE 13 — SEO & Structured Data

- [ ] Add `<title>{title} | Reyna House AI</title>` to `Layout.astro` (dynamic via props)
- [ ] Add `<meta name="description">` (dynamic via props) to `Layout.astro`
- [ ] Add `og:title`, `og:description`, `og:type`, `og:url`, `og:image` meta tags to `Layout.astro`
- [ ] Add `twitter:card`, `twitter:title`, `twitter:description` meta tags to `Layout.astro`
- [ ] Add `og:image` placeholder path with `<!-- TODO: Add real OG image at /public/images/og-image.png -->`
- [ ] Add `LocalBusiness` JSON-LD script block to `Layout.astro` head
- [ ] JSON-LD: Confirm `name`, `url`, `description`, `address`, `areaServed`, `serviceType` are all correct
- [ ] Add `FAQPage` JSON-LD script block with all 4 Q&A pairs to `Layout.astro` head
- [ ] Add visible FAQ `<section id="faq">` to `index.astro` between Contact and Footer
- [ ] FAQ section: Cream background, `60px` vertical padding, `max-width: 800px` centered
- [ ] FAQ section: Add "Frequently Asked Questions" heading in Bebas Neue, `--navy`
- [ ] FAQ section: Render all 4 Q&A pairs as `<details>`/`<summary>` accordion elements
- [ ] FAQ `<summary>` style: IBM Plex Mono, `--copper`
- [ ] FAQ answer text style: Inter, `--navy`
- [ ] FAQ items: Add `border-bottom: 1px solid --tan` between each item
- [ ] Set `index.astro` page title to: "Reyna House AI | Websites & Automation for General Contractors"
- [ ] Set `index.astro` description to match spec exactly

---

## PHASE 14 — Scroll Animations

- [ ] Add `[data-animate]` base CSS to `global.css` (`opacity: 0; transform: translateY(24px); transition: ...`)
- [ ] Add `.is-visible` CSS class to `global.css` (`opacity: 1; transform: none`)
- [ ] Create `/public/js/scroll-observer.js` using `IntersectionObserver` API
- [ ] Script: Select all `[data-animate]` elements on `DOMContentLoaded`
- [ ] Script: Create observer with `threshold: 0.12`
- [ ] Script: Add `is-visible` class when element intersects
- [ ] Script: Call `unobserve()` after element becomes visible (fire once)
- [ ] Add `<script src="/js/scroll-observer.js" defer>` to `Layout.astro`
- [ ] Add `data-animate` to `PainPoint.astro` root element
- [ ] Add `data-animate` to `Difference.astro` root element
- [ ] Add `data-animate` to `Services.astro` root element
- [ ] Add `data-animate` to `Portfolio.astro` root element
- [ ] Add `data-animate` to `Pricing.astro` root element
- [ ] Add `data-animate` to `About.astro` root element
- [ ] Add `data-animate` to `Testimonials.astro` root element
- [ ] Add `data-animate` to `Contact.astro` root element
- [ ] Add `data-animate` to each individual service card in `Services.astro`
- [ ] Add `data-animate` to each portfolio card in `Portfolio.astro`
- [ ] Add `data-animate` to each pricing card in `Pricing.astro`
- [ ] Add `data-animate` to each testimonial card in `Testimonials.astro`
- [ ] Add staggered `style="transition-delay: Xs"` (0, 0.1, 0.2, 0.3) to cards within each grid

---

## PHASE 15 — Performance & Final Polish

### Image Optimization
- [ ] Replace placeholder `<img>` tags in `Portfolio.astro` with Astro `<Image>` component
- [ ] Add `width` and `height` props to all `<Image>` components
- [ ] Confirm `loading="lazy"` on all portfolio and testimonial images
- [ ] Create `/public/images/` directory and add at least a placeholder OG image

### Accessibility
- [ ] Audit all interactive elements in `Header.astro` for visible focus states
- [ ] Confirm hamburger button has `aria-label="Toggle navigation"`
- [ ] Confirm Calendly wrapper has `aria-label="Schedule a call with Reyna House AI"`
- [ ] Audit all form fields in `Contact.astro` for matching `<label for="">` and `id=""` pairs
- [ ] Add `aria-hidden="true"` to all purely decorative SVG icons across all components

### Analytics & Tracking
- [ ] Add `<!-- TODO: Add GA4 tracking ID -->` comment in `Layout.astro` head
- [ ] Add Plausible analytics script as a commented-out block with TODO in `Layout.astro`

### Config Files
- [ ] Create `/public/robots.txt` with `Allow: /` and Sitemap reference
- [ ] Confirm favicon is placed at `/public/favicon.ico` (Reyna House crown logo)

### Brand Audit
- [ ] Search entire project for "Edward Web Builder" — remove or replace every instance
- [ ] Search for any other legacy template brand names — remove all
- [ ] Confirm no component, meta tag, or comment references the old brand

### Anchor Link Audit
- [ ] `Header.astro` → `#hero` resolves to `Hero.astro` section
- [ ] `Header.astro` → `#portfolio` resolves to `Portfolio.astro` section
- [ ] `Header.astro` → `#services` resolves to `Services.astro` section
- [ ] `Header.astro` → `#pricing` resolves to `Pricing.astro` section
- [ ] `Header.astro` → `#about` resolves to `About.astro` section
- [ ] `Header.astro` → `#contact` resolves to `Contact.astro` section
- [ ] `Footer.astro` Quick Links match all 6 section IDs above
- [ ] Hero primary CTA → `#contact` works
- [ ] Hero secondary CTA → `#portfolio` works
- [ ] All "Let's Talk →" pricing buttons → `#contact` works
- [ ] Portfolio "Let's Build Yours →" → `#contact` works

---

## PHASE 16 — Pre-Launch Manual Tasks

*These cannot be automated — must be completed by Edward before go-live.*

### Accounts & Credentials
- [ ] Create Calendly account for Reyna House AI
- [ ] Set up 15-minute discovery call format in Calendly
- [ ] Replace `YOUR-USERNAME` in `Contact.astro` Calendly embed with real username
- [ ] Set up Google Analytics (GA4) property and get tracking ID
- [ ] Add GA4 tracking snippet to `Layout.astro`
- [ ] Verify Google Business Profile is live and claimed

### Content & Assets
- [ ] Get a current, authentic photo of Edward (not a stiff headshot)
- [ ] Replace photo placeholder in `About.astro` with real image using `<Image>` component
- [ ] Pull screenshots of the Hair Salon client site — add to `/public/images/`
- [ ] Pull screenshots of the Notary Public client site — add to `/public/images/`
- [ ] Pull screenshots of the Van Nuys Maintenance Company client site — add to `/public/images/`
- [ ] Build the fictional "Bear Valley Builders" GC demo site (separate Astro project)
- [ ] Take screenshot of the GC demo site — add to `/public/images/`
- [ ] Update all 4 portfolio cards in `Portfolio.astro` with real screenshots
- [ ] Add real first Google review text and reviewer name to `Testimonials.astro` Card 1
- [ ] Add real second Google review text and reviewer name to `Testimonials.astro` Card 2
- [ ] Add Google Business Profile URL to "View on Google" link in `Testimonials.astro`
- [ ] Add Google Business Profile URL to Footer Column 3 "See Our Google Reviews" link
- [ ] Create OG image (1200×630px) and place at `/public/images/og-image.png`
- [ ] Place crown logo as `/public/favicon.ico`

### Social & Links
- [ ] Add TikTok profile URL to all social icon links (Header, Footer, About)
- [ ] Add Facebook profile URL to all social icon links
- [ ] Add YouTube channel URL to all social icon links
- [ ] Add X (Twitter) profile URL to all social icon links
- [ ] Add Rumble profile URL to all social icon links
- [ ] Update all social profiles externally with `reynahouse.ai` link in bio

### DNS & Deployment
- [ ] Confirm domain DNS is correctly pointed to Netlify
- [ ] Confirm `reynahouse.ai` resolves and SSL certificate is active
- [ ] Test Netlify form submission on the live/staging URL
- [ ] Test Calendly embed on mobile (iPhone Safari)
- [ ] Test full site on Android Chrome
- [ ] Test full site on desktop Chrome
- [ ] Test full site on desktop Safari
- [ ] Check all anchor nav links work on mobile after hamburger menu opens
- [ ] Run Lighthouse audit — confirm Performance ≥ 90
- [ ] Run Lighthouse audit — confirm Accessibility ≥ 90
- [ ] Run Lighthouse audit — confirm SEO ≥ 90
- [ ] Run Lighthouse audit — confirm Best Practices ≥ 90
- [ ] Validate JSON-LD schemas using Google's Rich Results Test
- [ ] Submit site to Google Search Console after launch

---

*Checklist generated from prompt_plan.md Version 1.0*  
*Reyna House AI — Big Bear Lake, CA — reynahouse.ai*
