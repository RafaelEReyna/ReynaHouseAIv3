# ReynaHouseAI.com — Full Site Specification
### Version 1.0 | For Use with Claude Code + Astro

---

## TABLE OF CONTENTS
1. Project Overview
2. Brand Identity
3. Technology Stack
4. Site Architecture
5. Section-by-Section Spec (Copy + Design)
6. Fictional Demo Project — Big Bear GC Brand
7. Pricing Strategy
8. Integrations
9. SEO & GEO Foundations
10. Pre-Launch Checklist
11. V1 vs. Future Roadmap
12. Developer Notes for Claude Code

---

## 1. PROJECT OVERVIEW

**Site URL:** reynahouse.ai  
**Domain:** Already owned  
**Current Stack:** Astro, hosted on Netlify, code on GitHub  
**Business:** Reyna House AI — web design and AI automation services for general contractors and small businesses  
**Founder:** Edward Reyna — solo founder, Big Bear Lake, CA  
**Primary Goal of V1:** Get qualified leads (general contractors) to book a discovery call or fill out a contact form fast. Every design and copy decision serves that one goal.

**What We Are Replacing:** The current live site is branded as "Edward Web Builder" — a template that was never fully customized. We are rebuilding it as a fully branded Reyna House AI experience. We are keeping the Astro + Netlify + GitHub stack.

---

## 2. BRAND IDENTITY

### 2.1 Brand Name
**Reyna House AI**  
- "Reyna" is the founder's family name — this matters. It signals skin in the game, pride, and legacy.
- Reyna House is the umbrella company (Reyna House Music, Reyna House Heritage Vault also exist — do NOT mention these on this site)
- This site is laser-focused on the AI and web services division only

### 2.2 Logo
- Existing logo: Crown above "RH" monogram, "REYNA HOUSE" in arched text below
- Use the logo as-is in the header (light version on dark backgrounds, dark version on light backgrounds)
- Do not redesign the logo for V1

### 2.3 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Navy | #334668 | Primary dark background, hero section |
| Copper/Gold | #C9944D | Primary accent — CTAs, highlights, hover states |
| Forest Green | #243B28 | Secondary accent — trust signals, badges |
| Cream | #EDEAE0 | Light section backgrounds, card backgrounds |
| Tan | #BFA984 | Supporting text, dividers, secondary elements |
| Gold | #E1B444 | Highlights, icon accents, emphasis |

**Color Rules:**
- Dark sections: Navy background (#334668), white body text, Copper (#C9944D) for headlines and CTAs
- Light sections: Cream background (#EDEAE0), Navy text (#334668), Copper for CTAs
- Never use pure black (#000000) or pure white (#FFFFFF) — always use palette colors
- The dark-to-light gradient that exists on the current site should be preserved and refined

### 2.4 Typography

**Philosophy:** Rugged, craftsman, hand-made feel. We are fighting cookie-cutter minimalism. Type should feel earned, not generic.

**Recommended Font Stack:**
- Headlines: `Bebas Neue` or `Playfair Display` (bold, high contrast, commanding)  
  — If neither feels right, use `Oswald Bold` as fallback  
- Body: `Inter` or `DM Sans` — clean and readable at 8th grade reading level  
- Accent/Labels: `IBM Plex Mono` — adds a techy-but-craftsman feel for labels, tags, section titles

**Type Rules:**
- Headlines: Large, bold, uppercase or mixed case — never timid
- Body text: Max 65 characters per line on desktop for readability
- Section labels (the small overline text above headlines): All caps, letter-spaced, Copper color
- Reading level target: 8th grade — short sentences, plain words, no jargon

### 2.5 Tone of Voice

- Rugged and blunt. No corporate speak.
- Short punchy sentences. Then a short explanation.
- Not salesy. Not desperate. Confident.
- Authentic — the founder is learning alongside the client. AI evolves constantly. That's a feature, not a bug.
- Proud to be American. Proud to be building something.
- Talk to contractors like a contractor talks — direct, no BS, get to the point
- 8th grade reading level — always
- Never say "synergy," "leverage," "cutting-edge," or "innovative"
- Say "you own it" not "client ownership model"
- Say "missed calls cost you money" not "lead leakage impacts revenue"

### 2.6 Brand Mission (use verbatim in About section)
*"Making AI work for us so we have time for what matters most."*

### 2.7 Core Values
Integrity. Honesty. Boldness. Community. Family. American pride. Non-corporate.

---

## 3. TECHNOLOGY STACK

| Layer | Tool |
|-------|------|
| Framework | Astro |
| Hosting | Netlify (free tier — sufficient for client traffic levels) |
| Code Repository | GitHub |
| Forms / Booking | Calendly (embedded) |
| Contact Form | Netlify Forms (built into Astro/Netlify — no backend needed) |
| Domain | Already pointed to Netlify |
| Analytics | Plausible or Netlify Analytics (privacy-first, no cookie banner needed) — add in V1 |
| Images | Astro Image component with WebP optimization |
| CSS | Tailwind CSS (already familiar, works perfectly with Astro) |

**Important:** Do NOT use Wix, Squarespace, or any hosted website builder. The entire value proposition of Reyna House AI is that clients OWN their code. We eat our own cooking — our site is custom-built code that we own.

---

## 4. SITE ARCHITECTURE

### V1 Structure: Single Long-Scroll Page with Anchor Navigation

**Why single page:** Higher dwell time, lower bounce rate, easier for mobile. The user scrolls through the story. Each section is an anchor link.

**Nav Links (sticky header):**
- Home (logo = home link)
- Work (portfolio)
- Services
- Pricing
- About
- Contact (CTA button style — Copper background)

### Page Sections in Order:
1. Hero
2. Pain Point / Problem Statement
3. The Reyna House Difference (Ownership pitch)
4. Services
5. Portfolio / Work
6. Pricing
7. About Edward
8. Testimonials / Social Proof
9. Contact / Book a Call
10. Footer

---

## 5. SECTION-BY-SECTION SPECIFICATION

---

### SECTION 1: HERO

**Background:** Dark gradient — Navy (#334668) fading to near-black. Subtle texture overlay (noise, grain, or rough canvas texture — avoid smooth/flat corporate look).

**Layout:** Full viewport height on desktop. Text left, visual element right (or full-bleed with text overlay on mobile).

**Visual Element (right side):** NOT a stock photo of a laptop with code on it (remove what's currently there). Options:
- A dramatic photo of a Big Bear mountain landscape with a construction site or truck
- A rugged texture/pattern built from the brand colors
- A bold typographic lockup
- For V1: a strong textured background is fine — swap photo later

**Overline Label (small text above headline):**
`REYNA HOUSE AI — BIG BEAR LAKE, CA`  
Style: All caps, letter-spaced, Copper color, small size

**Headline (H1):**
```
Your Contractors Are Calling.
Are You Answering?
```
Alternative options to test:
- `You Built Your Business. Let's Build Your Reputation.`
- `Stop Losing Jobs to Voicemail.`

**Subheadline:**
```
We build websites that work while you're on the job site.
And automations that make sure no lead slips through the cracks.
```

**Primary CTA Button:**  
`Book a Free 15-Minute Call →`  
Style: Copper background (#C9944D), white text, bold, slightly rounded corners — NOT pill-shaped, NOT sharp square. Think crafted, not corporate.  
Links to: Calendly embed (anchor #contact) OR opens Calendly modal

**Secondary CTA (text link below button):**  
`See Our Work ↓`  
Links to: #portfolio anchor

**Trust Bar (3 icons below CTA — keep from current site, update copy):**
- `You Own It. Always.`
- `Built in the USA`
- `Live in 2 Weeks`

---

### SECTION 2: PAIN POINT / PROBLEM STATEMENT

**Background:** Cream (#EDEAE0)

**Purpose:** Make the GC feel seen before we pitch anything. This is the "they're reading my mind" moment.

**Overline:** `SOUND FAMILIAR?`

**Headline:**
```
You're On the Job.
Your Phone Rings. You Can't Answer.
That Was a $10,000 Job Walking Out the Door.
```

**Body Copy:**
```
General contractors don't lose jobs because of bad work.
They lose jobs because they were too busy doing the work to answer the phone.

No website. No follow-up. No second chance.
The guy who answered his phone got the job.

We fix that.
```

**Visual:** 3-column icon grid showing the pain points:
1. 📵 Missed Calls → Lost Jobs
2. 🧾 Drowning in Receipts & Invoices
3. 📅 No-Shows and Scheduling Chaos

Keep copy short under each icon — one punchy line max.

---

### SECTION 3: THE REYNA HOUSE DIFFERENCE

**Background:** Dark — Navy (#334668) or Forest Green (#243B28)

**Purpose:** Deliver the ownership pitch. This is the killer differentiator against Wix/Squarespace/GoDaddy.

**Overline:** `WHY REYNA HOUSE`

**Headline:**
```
Your Website Should Be Yours.
Not Rented. Not Held Hostage. Yours.
```

**Body Copy:**
```
When you sign up with Wix or Squarespace, you don't own your website.
You're renting it. The day you stop paying, it disappears.

We build your site in clean code.
You get the files. You get the domain. You get the hosting.
It's yours. Like your truck. Like your tools.

If you never want to talk to us again after we hand it over — that's your right.
But most of our clients come back.
Because once you see what a real website does for your business,
you want more.
```

**3-column comparison cards:**

| Wix / Squarespace | Reyna House AI |
|---|---|
| You rent it | You own it |
| Stop paying, it's gone | Yours forever |
| Cookie-cutter templates | Built for your business |
| No code access | Full code on GitHub |
| Hidden fees | Flat rate, no surprises |

Style the comparison as two side-by-side cards — left card muted/slightly crossed out, right card lit up in Copper/Gold.

---

### SECTION 4: SERVICES

**Background:** Cream (#EDEAE0)

**Overline:** `WHAT WE BUILD`

**Headline:**
```
Start Simple. Grow When You're Ready.
```

**Intro Copy:**
```
We start where you need us.
A clean landing page that gets you found and gets you called.
Then when you're ready — automation that handles the stuff you hate doing.
```

**Service Cards (3 cards):**

**Card 1: The Foundation**
- Icon: House/blueprint icon
- Title: `Your Landing Page`
- Body: `A fast, mobile-ready page with your services, photos, contact form, and Google Maps. Clean. Professional. Yours.`
- Tag: `Most Popular for New Clients`

**Card 2: The System**
- Icon: Gear/automation icon
- Title: `Missed Call Automation`
- Body: `Every missed call gets an instant text: "Hey, we got your message — we'll call you right back." No more leads going cold.`
- Tag: `Coming Soon` (styled as a badge — Forest Green)

**Card 3: The Full Stack**
- Icon: Rocket icon
- Title: `Full AI Automation`
- Body: `AI that books appointments, follows up on estimates, and keeps your calendar full — while you're on the job.`
- Tag: `Coming Soon` (badge)

**Note for developer:** "Coming Soon" cards are intentional. They show the roadmap without overpromising. Style them slightly desaturated with the badge clearly visible.

---

### SECTION 5: PORTFOLIO / WORK

**Background:** Dark — near-black or deep Navy

**Overline:** `OUR WORK`

**Headline:**
```
Real Sites. Real Businesses. Real Results.
```

**Portfolio Grid:** 2x2 grid on desktop, single column on mobile

**Card 1: Hair Salon — Big Bear Lake, CA**
- Screenshot of live site
- Title: Salon name
- Tag: `Landing Page`
- Short line: `Booking form, services, gallery`

**Card 2: Notary Public — Los Angeles, CA**
- Screenshot of live site
- Title: Notary name/business
- Tag: `Professional Services`
- Short line: `Clean, credible, converts`

**Card 3: Maintenance Company — Van Nuys, CA**
- Screenshot of live site
- Title: Business name
- Tag: `Service Business`
- Short line: `Services, contact, local SEO`

**Card 4: [DEMO] General Contractor — Big Bear, CA** ← THE FICTIONAL BRAND
- Mockup/screenshot of the demo site
- Title: Fictional GC brand name (TBD — see Section 6)
- Tag: `⭐ Demo — This Could Be You`
- Short line: `Built to show what's possible for local GCs`
- Style this card differently — slight glow, Copper border, star badge

**Below grid:**
```
Your business could be next.
```
CTA: `Let's Build Yours →` (links to #contact)

---

### SECTION 6: PRICING

**Background:** Cream (#EDEAE0)

**Overline:** `INVESTMENT`

**Headline:**
```
Good Work Costs Money.
Bad Work Costs More.
```

**Intro Copy:**
```
Reyna House is not Walmart.
We build things right, the first time, and you own what we build.
Here's what that looks like.
```

**Pricing Philosophy Note (small text, italic):**
```
Pricing is based on scope. Book a call and we'll tell you exactly what your project costs.
No surprises. No hidden fees.
```

**Pricing Tiers (3 cards — DO NOT show dollar amounts publicly):**

**Tier 1: The Foundation**
- Best for: GCs with no online presence
- Includes: Single landing page, mobile-ready, contact form, Google Maps embed, social links, Netlify hosting setup, domain transfer assistance, full code ownership handed to client
- CTA: `Let's Talk →`

**Tier 2: The Full Site**
- Best for: GCs ready to look serious
- Includes: Everything in Foundation, plus up to 5 pages (Home, Services, Gallery, About, Contact), Google Analytics, on-page SEO, booking integration (Calendly), 30-day support
- CTA: `Let's Talk →`
- Badge: `Most Popular`

**Tier 3: The Business System**
- Best for: GCs who want leads on autopilot
- Includes: Everything in Full Site, plus missed call text automation, appointment booking flow, basic CRM setup, monthly maintenance retainer option
- CTA: `Let's Talk →`
- Badge: `Best ROI` — color: Forest Green

**Important:** Per Hormozi pricing philosophy — NO prices displayed on the page. The goal is to get them on a call. The price reveal happens in the conversation when the value is already established.

**Below pricing cards — Add-Ons section:**
```
Already have a site? Want to add one piece at a time?
Ask about add-ons: automation, SEO, Google Business setup, and more.
```
CTA: `Book a Call to Discuss →`

---

### SECTION 7: ABOUT EDWARD

**Background:** Dark — Navy or textured dark

**Overline:** `WHO'S BEHIND THIS`

**Headline:**
```
I'm Edward Reyna.
I'm Learning This Right Alongside You.
```

**Body Copy:**
```
I'm not a Silicon Valley engineer.
I'm an American entrepreneur from Big Bear Lake, California.

I started Reyna House AI because I watched small business owners — 
good, hardworking people — get left behind by technology they didn't understand.

I'm learning AI the same way you learned your trade.
By doing it. By building things. By figuring it out.

And I'm taking my clients with me.

When AI evolves — and it will — you'll have someone in your corner
who's been paying attention from the beginning.

That's the relationship I'm offering.
Not just a website. A partnership.
```

**Photo placeholder:** Add a current, confident photo of Edward when available. Not a stiff headshot — a real photo. On a job site, in front of a mountain, working at a desk. Something authentic.

**Stats/Badges row (below copy):**
- `Big Bear Lake, CA`
- `Serving clients nationwide`
- `Family name on the door since day one`
- Social links: TikTok, Facebook, YouTube, X, Rumble (icons only, link to profiles)

---

### SECTION 8: TESTIMONIALS / SOCIAL PROOF

**Background:** Cream (#EDEAE0)

**Overline:** `WHAT CLIENTS SAY`

**Headline:**
```
Don't Take Our Word for It.
```

**Content:**
- Display both Google reviews as testimonial cards
- Include reviewer name, star rating (5 stars), review text
- Add a "View on Google" link/button below both reviews
- Link to Google Business profile

**Below reviews:**
```
⭐⭐⭐⭐⭐ 5.0 on Google
```
Small text: `We earn every review.`

**Note:** As new reviews come in, add them here. This section will grow.

---

### SECTION 9: CONTACT / BOOK A CALL

**Background:** Dark gradient — same as hero for visual bookending

**Overline:** `LET'S GET TO WORK`

**Headline:**
```
Ready to Stop Losing Leads?
Let's Talk.
```

**Subheadline:**
```
Book a free 15-minute call.
No pitch. No pressure. Just a real conversation about what you need.
```

**Layout:** Two columns on desktop, stacked on mobile

**Left Column — Contact Info:**
- Email: edward@reynahouse.ai
- Location: Big Bear Lake, CA — Serving clients nationwide
- Response time: Within 6 hours (usually faster)
- "What happens next?" steps (keep from current site — it's good UX):
  1. You book a 15-minute call
  2. We talk about what you need
  3. I send you a proposal with exact pricing
  4. We build it

**Right Column — Calendly Embed:**
- Embed Calendly scheduling widget directly (inline embed, not popup)
- Calendly account: Create before launch (15-minute discovery call format)
- Below Calendly: `Prefer to write it out? Use the form below.`

**Below Calendly — Backup Contact Form (Netlify Forms):**
Fields:
- Your Name (required)
- Business Name
- Phone Number (required — this is key for fast follow-up)
- Best time to call
- What do you need? (dropdown: New Website, Automation, Both, Not Sure)
- Tell me more (optional textarea)

Submit button: `Send It →` (Copper background)

**Form success message:**
```
Got it. I'll reach out within 6 hours.
— Edward
```

---

### SECTION 10: FOOTER

**Background:** Near-black

**Layout:** 3 columns

**Column 1:** Logo + tagline
- Reyna House AI logo
- Tagline: `Making AI work for us so we have time for what matters most.`
- Copyright: `© 2025 Reyna House AI. Built with code we own.`

**Column 2:** Quick Links
- Home, Work, Services, Pricing, About, Contact

**Column 3:** Get In Touch
- Email: edward@reynahouse.ai
- Social icons: TikTok, Facebook, YouTube, X, Rumble
- Google Business profile link: `⭐ See Our Google Reviews`

**Footer bottom bar:**
- `Built in Big Bear Lake, CA. Serving contractors nationwide.`
- Remove all references to "Edward Web Builder" — that template brand is gone

---

## 6. FICTIONAL DEMO PROJECT — BIG BEAR GENERAL CONTRACTOR

### Purpose
A demo site built to show GC prospects exactly what their site could look like. Presented in the portfolio as real work. Will be built as a separate Astro project and hosted on Netlify with its own URL, then screenshotted/linked from the portfolio.

### Brand Direction
- Rugged mountain/California contractor
- Custom builds, remodels, decks, foundations — Big Bear area
- Feels like a real, established business

### Suggested Fictional Brand Names (pick one, or invent your own):
- **Ridgeline Build Co.** — rugged, geographic, memorable
- **Summit General Contractors** — Big Bear mountain feel
- **High Country Build** — evokes altitude, toughness
- **Backbone Construction** — personality, pride
- **Bear Valley Builders** — hyper-local, authentic

### Demo Site Pages (V1 — single page):
1. Hero — dramatic mountain construction photo, headline: "Built Right. Built to Last."
2. Services — Remodels, Custom Decks, New Construction, Foundations
3. Gallery — placeholder construction photos (use royalty-free from Unsplash/Pexels)
4. About — fictional owner bio, Big Bear roots
5. Contact — booking form + fake phone number

### Visual Style for Demo:
- Dark, rugged, masculine
- Heavy use of Forest Green (#243B28) and Copper (#C9944D)
- Worn texture backgrounds
- Bold sans-serif headlines
- Make it look like it cost $5,000. That's the point.

### Credit Line (subtle, in demo site footer):
`Website designed by Reyna House AI — reynahouse.ai`

---

## 7. PRICING STRATEGY

**Philosophy:** Alex Hormozi — price for the outcome, not the deliverable. The client isn't buying a website. They're buying more jobs, more leads, and getting their time back.

**Rules:**
- No prices on the homepage — ever. Book the call first, reveal price in conversation.
- Price anchoring: Always present 3 tiers so the middle feels like the smart choice
- Frame price around ROI: "One extra job pays for this twice over"
- Never discount. Instead, add value.
- Retainer model is the long-term goal — monthly recurring revenue from maintenance, automation management, and future add-ons

**Current V1 Pricing (internal reference only — NOT on site):**
- Foundation (landing page): $1,500 – $2,500
- Full Site (multi-page): $3,000 – $5,000
- Business System (site + automation): $5,000 – $10,000+

These are starting points. Adjust based on scope per client.

---

## 8. INTEGRATIONS

| Integration | Purpose | Priority |
|-------------|---------|----------|
| Calendly | Discovery call booking embedded on contact page | V1 — Required |
| Netlify Forms | Backup contact form | V1 — Required |
| Google Analytics (GA4) | Traffic and conversion tracking | V1 — Required |
| Plausible Analytics | Privacy-first alternative to GA4 | Optional (pick one) |
| Google Business Profile | Reviews, local SEO | Link from site — V1 |
| TikTok / YouTube / Social links | Content distribution | Link from site — V1 |
| N8N (future) | Automation workflows for clients | V2 |
| Voiceflow / Bland AI (future) | Voice automation for missed calls | V2 |

---

## 9. SEO & GEO FOUNDATIONS

### Meta Tags (set in Astro's `<head>`):
```
Title: Reyna House AI | Websites & Automation for General Contractors
Description: Reyna House AI builds custom websites and automation for general contractors. You own your site — no Wix, no monthly ransom. Serving Big Bear Lake, CA and nationwide.
```

### Target Keywords (V1):
- "website for general contractors"
- "general contractor website Big Bear CA"
- "AI automation for contractors"
- "custom website small business California"
- "contractor landing page"

### Local SEO:
- Add `LocalBusiness` schema markup in JSON-LD
- Business name: Reyna House AI
- Address: Big Bear Lake, CA (use city, not personal address)
- Service area: California + Nationwide
- Phone: Add when available

### GEO (Generative Engine Optimization) — for AI search:
- Write content in clear, direct Q&A-friendly language (AI systems pull this into answers)
- Include FAQ section on page (can be visually minimal but text-rich for crawlers)
- Use structured headings (H1, H2, H3) logically
- Add FAQ schema markup

### Suggested FAQ Section (hidden or minimal UI, rich for SEO):
- Q: Do I own my website if Reyna House builds it?  
  A: Yes. You get the code, the domain, and the hosting. It's yours completely.
- Q: How long does it take to build a website?  
  A: Most landing pages are live within 2 weeks of our first call.
- Q: Do you work with general contractors?  
  A: Yes. General contractors are our specialty. We understand you're on job sites, not behind a desk.
- Q: What is the cost of a website from Reyna House AI?  
  A: Every project is scoped individually. Book a free 15-minute call and we'll give you an exact number.

---

## 10. PRE-LAUNCH CHECKLIST

Before going live with the new site, complete these tasks:

- [ ] Create Calendly account for Reyna House AI (15-min discovery call)
- [ ] Get a current photo of Edward (not actor headshot — something authentic and recent)
- [ ] Pull screenshots of all 3 live client sites for portfolio
- [ ] Build fictional Big Bear GC demo site (separate project)
- [ ] Screenshot demo site for portfolio card
- [ ] Set up Google Analytics (GA4) property and get tracking ID
- [ ] Verify Google Business Profile is live and linked
- [ ] Update all social profiles (TikTok, FB, YouTube, X, Rumble) with reynahouse.ai link
- [ ] Test contact form submission through Netlify Forms
- [ ] Test Calendly embed on mobile
- [ ] Check all anchor links in nav work correctly
- [ ] Set custom 404 page (on-brand, with link back to home)
- [ ] Verify favicon is the Reyna House crown logo
- [ ] Set `<meta name="theme-color" content="#334668">` for mobile browser bar
- [ ] Run Lighthouse audit — aim for 90+ performance score
- [ ] Test on iPhone Safari, Android Chrome, desktop Chrome, desktop Safari
- [ ] Remove all "Edward Web Builder" references from old code
- [ ] Confirm domain DNS is correctly pointed to Netlify

---

## 11. V1 vs. FUTURE ROADMAP

### V1 (Launch — This Spec)
- Single-scroll page, fully on-brand
- Hero, Pain Point, Difference, Services, Portfolio (4 cards), Pricing (no prices), About, Testimonials, Contact, Footer
- Calendly embedded
- Netlify Forms
- Google Analytics
- Portfolio: 3 real sites + 1 demo GC site
- All Reyna House branding — no "Edward Web Builder"

### V2 (Next 60–90 days)
- Add blog/content section for SEO (Astro handles this natively)
- Embed or link to TikTok/YouTube video content
- Add automation services page (once N8N workflows are built)
- Add case study page (deeper dives into client results)
- Add chat widget (can start with simple Calendly popup trigger)
- Add "Book a Demo" flow for automation tier

### V3 (Future — When Ready)
- Full automation service pages
- AI chatbot for lead qualification on site
- Missed call SMS automation product page
- Client portal / project tracker (optional)
- Nationwide contractor niche pages (e.g., "Website for HVAC contractors in Texas")

---

## 12. DEVELOPER NOTES FOR CLAUDE CODE

These are specific instructions for building this in Astro with Claude Code:

### Project Setup
```bash
npm create astro@latest reynahouse-ai
cd reynahouse-ai
npx astro add tailwind
npx astro add image
```

### File Structure
```
/src
  /components
    Header.astro
    Hero.astro
    PainPoint.astro
    Difference.astro
    Services.astro
    Portfolio.astro
    Pricing.astro
    About.astro
    Testimonials.astro
    Contact.astro
    Footer.astro
  /layouts
    Layout.astro (base layout with SEO head)
  /pages
    index.astro (imports all components)
    404.astro
  /styles
    global.css (CSS variables for brand colors)
    fonts.css (Google Fonts import)
/public
  /images (all site images, optimized)
  favicon.ico (crown logo)
```

### CSS Variables (set in global.css)
```css
:root {
  --navy: #334668;
  --copper: #C9944D;
  --forest: #243B28;
  --cream: #EDEAE0;
  --tan: #BFA984;
  --gold: #E1B444;
  --white: #F8F6F0;
  --dark: #1A1A1A;
}
```

### Netlify Forms Setup
```html
<!-- Add to contact form -->
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- form fields -->
</form>
```

### Calendly Embed
```html
<!-- Add to contact section -->
<link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet">
<div class="calendly-inline-widget" data-url="https://calendly.com/[YOUR-USERNAME]/15min" style="min-width:320px;height:630px;"></div>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Performance Notes
- Use Astro's `<Image>` component for all images (auto WebP + lazy loading)
- Use `client:load` sparingly — most components are static
- Font loading: use `font-display: swap` in CSS
- Avoid heavy JavaScript — this site should score 95+ on Lighthouse

### Texture / Grain Effect (for headers)
```css
.hero {
  background: linear-gradient(135deg, #334668 0%, #1a1a2e 100%);
  position: relative;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise texture */
  opacity: 0.04;
  pointer-events: none;
}
```

### Animation Philosophy
- Subtle fade-in on scroll for section entries (use Intersection Observer — no heavy libraries)
- No autoplay videos
- No flashy transitions — rugged means confident, not flashy
- Hover states on cards: slight lift (translateY -4px) + box-shadow

---

*Spec Version 1.0 — Compiled from 30-question discovery session*  
*Reyna House AI — Big Bear Lake, CA — reynahouse.ai*
