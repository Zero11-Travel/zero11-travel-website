# Zero11 Travel & Tours Website

Corporate website for **Zero11 Tours and Transfers (Pty) Ltd** — a Johannesburg-based
inbound tour operator and chauffeur/transfer service.

> _"Your global travel companion…Africa awaits!"_

Airport transfers, chauffeur drive, point-to-point and corporate shuttle services, and
tailor-made tours & safaris across Johannesburg, Durban and Cape Town.

**Live domain:** [www.zero11travel.co.za](https://www.zero11travel.co.za)

## Tech Stack

- **Framework:** [Nuxt 4](https://nuxt.com) (Vue 3, SSR) + TypeScript
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com) via `@nuxtjs/tailwindcss`
- **Package manager:** [pnpm](https://pnpm.io) (`pnpm@10`)
- **SEO:** `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org`
- **Contact form:** server API route with pluggable email providers — Resend,
  Mailgun, SendGrid, Mailtrap and Zoho over HTTP REST (work everywhere), plus
  Gmail over SMTP (nodemailer, Netlify only) — rate limiting, honeypot + content
  checks, and optional reCAPTCHA v3

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services, tours preview, stats, CTA |
| `/about` | Company background, Batho Pele values, director profile |
| `/services` | Chauffeur / transfer / shuttle service details |
| `/tours` | Tour packages & destinations |
| `/fleet` | Vehicle fleet showcase |
| `/gallery` | Filterable photo gallery with accessible lightbox |
| `/contact` | Contact form, booking enquiry, WhatsApp/phone links |
| `/faq` | Common questions (accordion) |
| `/privacy-policy` | POPIA-aligned privacy notice |

## Setup

Install dependencies:

```bash
pnpm install
```

### Environment Configuration

Create a `.env` from the template and fill in real values:

```bash
cp .env.example .env
```

- **Email transport (pick one):** set `RESEND_API_KEY` (recommended — HTTP REST,
  works on Netlify *and* Cloudflare, always wins when set), or choose another via
  `DEFAULT_EMAIL_PROVIDER` — `mailgun` / `sendgrid` / `mailtrap` / `zoho` (all HTTP
  REST, work everywhere) or `gmail` (SMTP via nodemailer, Netlify only). Without a
  transport, enquiries are simulated in dev and error out in production rather than
  being silently lost.
- **reCAPTCHA** (optional): set `RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY` to
  enable v3 verification — the form works without them (verification is skipped).
- **Analytics/remarketing** (optional): `GTM_CONTAINER_ID`, `META_PIXEL_ID` — gated
  behind the cookie consent banner; no script loads until set *and* consented.

## Development

```bash
pnpm dev        # dev server at http://localhost:3000
pnpm build      # production SSR build
pnpm preview    # preview the production build locally
```

## Deployment

The same codebase deploys three ways — see [`DEPLOYMENT.md`](./DEPLOYMENT.md) for full steps.

```bash
pnpm build:netlify      # Netlify (SSR Function — keeps the contact-form API)
pnpm build:cloudflare   # Cloudflare Pages → dist/
pnpm deploy:cloudflare   # build + wrangler pages deploy (needs `wrangler login`)
pnpm build:static       # Pure static → .output/public (contact form falls back to WhatsApp)
```

## Project Reference

See [`CLAUDE.md`](./CLAUDE.md) for company details, brand assets (colors, typography,
logo), content sources, component/composable inventory, and the list of items still
needing client input before go-live.
