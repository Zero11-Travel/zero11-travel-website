# Zero11 Travel & Tours Website

## Project Overview
Corporate website for Zero11 Tours and Transfers (Pty) Ltd — a Johannesburg-based
inbound tour operator and chauffeur/transfer service.

**Tagline:** "Your global travel companion...Africa awaits!"
**Tech Stack:** Vue 3 + Nuxt 4 (SSR), Tailwind CSS, TypeScript, pnpm
**Working Directory:** `C:\workspace_2026\web_development\zero11`

## Company Details
- **Legal name:** Zero11 Tours and Transfers (Pty) Ltd
- **Registration:** 2018/341872/07
- **Director:** Kgothatso Shogole (100% owner)
- **B-BBEE:** Level 1 — Exempt Micro Enterprise (EME)
- **Address:** 9077 Ivory Park, Sisonke Street, Midrand, 1682
- **Phone / WhatsApp:** +27 76 873 5815
- **Alt cell:** +27 64 519 2740
- **Fax:** 086 476 7438
- **Email:** kgothatso@zero11travel.co.za
- **Existing domain:** www.zero11travel.co.za
- **Operating cities:** Johannesburg, Durban, Cape Town

## Values (Batho Pele — People First)
Passion · Safety · Reliability · Professionalism

## Services
- Airport transfers
- Chauffeur drive (dedicated vehicle + professional driver)
- Point-to-point / door-to-door transfers
- Corporate shuttle services
- Tours & sightseeing (tailor-made)
- Hotel/lodge bookings, tourist attraction bookings

## Featured Tours / Destinations
- Johannesburg city tour / orientation tour
- Soweto tour (incl. Mandela House)
- Apartheid Museum
- Constitutional Hill
- Gold Reef City
- Cradle of Humankind
- Sun City & Pilanesberg National Park (Big Five game viewing)
- Safari: Kruger, Madikwe, Mabula, Entabeni
- Lion Park

## Value-Added Extras
Bottled water · reading material · umbrellas (rainy season) · trailers on request
(extra charge) · baby seats on request (extra charge)

## Fleet
Sedans (Toyota Corolla Quest, Mercedes C-Class), Hyundai H-1 Wagon, VW Kombi/shuttle van

## Brand Assets
### Colors (sampled from the official logo — `public/images/logo.jpeg`)
- **Primary Red:** `#CC1F25` (`zero11-red-600`)
- **Accent Orange:** `#ED6823` (`zero11-orange-600`)
- **Black:** `#0A0A0A` (`zero11-black`)
- Full 50–950 tint/shade scales defined in `tailwind.config.ts`

### Typography
- **Headings:** Poppins
- **Body:** Inter

### Logo
- `public/images/logo.jpeg` — extracted from official brand PDFs (wing-swoosh mark,
  "ZERO" in red, "11" in red, wing icon in black/orange/red circle, "travel & tours"
  wordmark in black). Ask the client for a vector (SVG/AI) source file if higher
  fidelity is needed for print or large hero use.

## Source Documents (not committed — see `.gitignore`)
- `ZERO11 BROCHURE.pdf` — services, tour destinations, fleet, booking contact
- `KGOTHATSOS PORTFOLIO FILE.pdf` — company profile, registration/BEE details,
  management structure

## Site Structure (built)
| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services overview, tours preview, CTA |
| `/about` | Company background, values, director profile |
| `/services` | Chauffeur/transfer/shuttle service details |
| `/tours` | Tour packages & destinations |
| `/fleet` | Vehicle fleet showcase |
| `/contact` | Contact form, booking enquiry, WhatsApp/phone links |
| `/faq` | Common questions (accordion), sourced from brochure/portfolio facts only |
| `/privacy-policy` | POPIA-aligned privacy notice (linked in footer) |

## Components (`app/components/`)
| Component | Purpose |
|-----------|---------|
| `AppHeader.vue` | Sticky top utility bar (phone/email) + main nav + mobile menu |
| `AppFooter.vue` | 4-column footer (about, quick links, services, contact) |
| `WhatsAppButton.vue` | Fixed WhatsApp floating action button, prefilled message |
| `SectionHeading.vue` | Reusable eyebrow + title + subtitle block (`align` prop) |
| `ServiceCard.vue` | Icon + title + description card, used on Home/Services |
| `TourCard.vue` | Gradient-header tour card (icon, region tag, description) |
| `FleetCard.vue` | Vehicle card with icon, passenger count, feature checklist |
| `ValueCard.vue` | Circular icon + title + description, used for Batho Pele values |
| `StatBadge.vue` | Big number + label, used in the homepage stats bar |
| `CTABanner.vue` | Full-width gradient call-to-action band with a button |
| `ContactForm.vue` | Booking enquiry form — client validation, honeypot, posts to `/api/contact` |

## Development Commands
```bash
pnpm install         # Install dependencies (runs nuxt prepare postinstall)
pnpm dev             # Start development server
pnpm build           # Build for production
pnpm generate        # Generate static site
pnpm preview         # Preview production build
```

## Configuration
- **Nuxt 4:** SSR enabled
- **Tailwind CSS v3** via `@nuxtjs/tailwindcss`, config at `tailwind.config.ts`
- **SEO:** `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org` (Organization schema)
- **Icons:** `@nuxt/icon`, `@heroicons/vue`, Font Awesome
- **Contact form:** SMTP via `nodemailer`, rate limiting via `rate-limiter-flexible`,
  honeypot field, and a fully-wired reCAPTCHA v3 flow (env-driven, following the
  pattern used on `solid-rock.co.za`): the script only loads when `RECAPTCHA_SITE_KEY`
  is set (`nuxt.config.ts`), `ContactForm.vue` calls `grecaptcha.execute()` on submit
  to get a token, and the server verifies it only if `RECAPTCHA_SECRET_KEY` is also
  set — add both env vars and it activates with no code changes needed
- **Known limitation:** `rate-limiter-flexible`'s `RateLimiterMemory` (in
  `server/utils/antispam.ts`) is in-process state — on Netlify Functions (or any
  serverless platform) a fresh container resets the counter, so the rate limit
  isn't strictly enforced across invocations in production. This matches the
  same pattern used on `solid-rock.co.za`; a real fix needs a shared store
  (Netlify Blobs, Upstash Redis, etc.), which is out of scope unless enquiry
  volume/spam actually becomes a problem. The honeypot field, content
  validation, and optional reCAPTCHA are the primary defenses in the meantime.
- **Favicons:** generated from the logo's emblem (`public/favicon.ico`,
  `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`)
- **Social sharing:** `public/og-image.jpg` (branded gradient card) wired as
  `og:image`/`twitter:image`
- **Error page:** `app/error.vue` — branded 404/500 handling

## Project Status
✅ Standards/stack researched from sibling projects in `web_development/`
✅ Brand colors extracted programmatically from official logo
✅ Nuxt 4 + Tailwind + SEO scaffold initialized
✅ Brand tokens wired into `tailwind.config.ts`
✅ AppHeader (sticky top bar + nav + mobile menu), AppFooter, WhatsApp floating button
✅ All 6 pages built and smoke-tested (200 OK, no console errors): Home, About,
   Services, Tours, Fleet, Contact
✅ Contact form wired to `server/api/contact.post.ts` (SMTP via nodemailer,
   rate-limiting + content/recipient anti-spam checks, optional reCAPTCHA,
   honeypot field) — verified end-to-end with simulated email (no SMTP creds yet)
✅ WCAG AA contrast verified on all brand color pairs (4.5:1+ everywhere used)
✅ Favicon set, OG/social share image, and branded 404/500 error page
✅ Verified live in-browser: full desktop walkthrough of every page, contact form
   submitted end-to-end (success state confirmed), zero console errors
✅ Production build (`pnpm build`) verified passing
✅ `netlify.toml` added — SSR build (`nuxt build`, not `generate`) so the
   contact form's API route keeps working; Netlify auto-detects Nitro and
   deploys it as a Function
✅ reCAPTCHA v3 fully wired client-to-server — previously only the server
   checked for a token with no client-side code ever generating one, so it
   would have silently never activated even after adding real keys
✅ Fixed a real mobile bug: the header's mobile dropdown menu (`AppHeader.vue`)
   butted directly against the hero section with no visual separation, reading
   as an overlap — added `shadow-lg` + more bottom padding so it reads as a
   floating panel instead
✅ Mobile viewport verified on a real device/browser (the Chrome automation
   tool in this session can't resize below 1440×900 — worked around by
   running `pnpm dev --host 0.0.0.0` and having the client test on their own
   phone/network over LAN; caught the mobile menu bug above this way)
✅ Three `code-review` skill passes (targeting actual commit hashes, not
   paths — a path target under-scoped to recent diffs only) plus a manual
   accessibility sweep — found and fixed: HTML injection into notification
   emails, IP-spoofable rate limiting behind Netlify's proxy, a spam filter
   that would reject genuine "urgent!!!" bookings, unencoded reCAPTCHA
   values, reCAPTCHA silently skipping instead of failing closed, and a
   capitalization spam-check that was dead code since day one
✅ `pnpm audit` found nodemailer had 10 known CVEs (2 high) at the version
   inherited from the `solid-rock.co.za` pattern — upgraded to `^10.0.10`,
   zero vulnerabilities now
✅ `/privacy-policy` added after comparing against sibling sites — a genuine
   gap, not a copied feature: this site's contact form collects personal
   information with no privacy notice anywhere, a real POPIA-relevant issue.
   Content is honest about what this site actually does (no analytics/
   tracking cookies currently exist, so no cookie-consent banner was added —
   `amphagroup`'s heavier GTM-linked consent system would describe tracking
   that doesn't exist here)
✅ `/faq` added (native `<details>`/`<summary>` accordion, no JS framework
   needed, inherently keyboard/screen-reader accessible) — every answer is
   sourced directly from the brochure/portfolio facts already in this file;
   questions needing unverified specifics (cancellation policy, exact
   pricing, booking lead time) were deliberately phrased generically
   ("contact us to arrange...") rather than inventing answers
⏳ **Needs client input before go-live:**
   - Real SMTP credentials in `.env` (see `.env.example`) so enquiries actually send
   - Vector/high-res logo source if available (current logo was extracted from a PDF)
   - Real photography — Gemini image generation was attempted for original hero/tour
     imagery but `GEMINI_API_KEY` on this machine returns HTTP 401. Root cause found:
     the value isn't a Gemini API key at all — it's a 53-char Google OAuth-style token
     (`AQ.Ab8...`), not the `AIzaSy...`-style key (~39 chars) issued at
     https://aistudio.google.com/apikey. A fix attempt via `setx` on 2026-09-14 did not
     take (verified by reading the registry directly — value unchanged). Needs a
     genuinely new key generated and persisted, then a fresh session, before
     regenerating imagery. Current design intentionally uses icon+gradient treatments
     instead of the Alamy-watermarked stock photos found in the source PDFs (not
     licensed for production use).
   - reCAPTCHA site/secret keys (optional — form works without them)
   - Testimonials/reviews content (none existed in source material)

## Feature Ideas Considered But Not Built
Found by comparing against sibling sites in `../` (2026-09-14) — deliberately
not built without the user's say-so, since each needs either real content
that doesn't exist yet or would add complexity the site doesn't currently need:
- **Testimonials section** (pattern exists on `solid-rock.co.za`) — no real
  client reviews exist in the source material; fabricating them would be dishonest
- **Scroll-to-top button** (`amphagroup` has one) — minor UX nicety, low
  priority, easy to add if requested
- **Cookie consent banner + GTM integration** (`amphagroup` has a full one) —
  not added: this site has no analytics/tracking cookies to consent to, so a
  consent banner would describe tracking that doesn't exist. Add this only if
  the client later wants Google Analytics/GTM, alongside the banner
- **Multi-language support** (`gombianboutique.co.za`, `tcbh.co.za` use
  `@nuxtjs/i18n`) — no indication Zero11's clients need a second language

## See Also
- Sibling project conventions: `../solid-rock.co.za/CLAUDE.md` (most current reference
  stack — contact form, SEO, testing patterns)
