# Deployment — Netlify and Cloudflare

One codebase deploys to either platform. The only difference is the Nitro
preset chosen at build time.

| | Netlify | Cloudflare (Workers + static assets) |
|---|---|---|
| Build command | `pnpm build:netlify` | `pnpm build:cloudflare` |
| Deploy | Git push (config in `netlify.toml`) | `wrangler deploy` (config in `wrangler.jsonc`) |
| Server runs as | Netlify Function (Node) | Cloudflare Worker (`nodejs_compat`) |
| Email transport | SMTP **or** Resend | **Resend only** (no raw SMTP sockets on Workers) |
| Static headers | `public/_headers` + Nitro | `public/_headers` + Nitro |

Both were built and smoke-tested from this repo. The Cloudflare build was also
run on Cloudflare's own runtime (`workerd`) — all 9 pages, sitemap, robots, static assets,
security headers, and the contact API (runtime secrets reach the code and the
outbound email call is made).

## 1. Email — decide this first

The contact form emails each enquiry to the business. **If no email transport is
configured, the form returns an error in production** (it only simulates a send
in local development), so a misconfigured deploy is visible rather than silently
losing enquiries.

* **Recommended for both platforms: Resend (HTTP API).** Create an account at
  resend.com, verify `zero11travel.co.za` (adds SPF/DKIM DNS records — this is
  what keeps enquiry emails out of spam), create an API key, and set
  `RESEND_API_KEY` and `DEFAULT_EMAIL_FROM` (e.g. `noreply@zero11travel.co.za`).
* **Netlify only: SMTP** (Gmail app password etc.) via the `SMTP_*` variables in
  `.env.example`. Do not use SMTP on Cloudflare.

## 2. Environment variables

See `.env.example` for the full list. The important distinction on Cloudflare:

* **Build-time** (baked into the pages when they are built — set them as *build*
  variables): `SITE_URL`, `RECAPTCHA_SITE_KEY`, `GTM_CONTAINER_ID`, `META_PIXEL_ID`.
* **Runtime secrets** (read when a request arrives — set as *secrets/variables*
  on the Worker): `RESEND_API_KEY`, `DEFAULT_EMAIL_FROM`, `DEFAULT_EMAIL_TO`,
  `RECAPTCHA_SECRET_KEY`, any `SMTP_*`, `ANTISPAM_*`.

On Netlify, one set of environment variables covers both.

## 3. Deploy to Netlify

1. Netlify → *Add new site → Import from Git* → pick the repo.
2. Build settings are read from `netlify.toml` (nothing to enter).
3. *Site configuration → Environment variables*: add the variables from §2.
4. Deploy. Then add the custom domain under *Domain management*.

## 4. Deploy to Cloudflare

**Git-connected (recommended):** Cloudflare dashboard → *Workers & Pages →
Create → Import a repository*.

* Build command: `pnpm build:cloudflare`
* Deploy command: `npx wrangler deploy`
* Add build variables and runtime secrets as described in §2.

**From your own machine:**

```bash
pnpm wrangler login                  # one-time, opens a browser
pnpm wrangler secret put RESEND_API_KEY
pnpm wrangler secret put DEFAULT_EMAIL_FROM
pnpm wrangler secret put DEFAULT_EMAIL_TO
pnpm deploy:cloudflare               # builds, then deploys
```

The Worker name is `zero11-travel-tours` (`wrangler.jsonc`); it is served at
`zero11-travel-tours.<your-subdomain>.workers.dev` until a custom domain is attached
(*Worker → Settings → Domains & Routes*; the domain's DNS must be on Cloudflare).

### Testing the Cloudflare build locally

```bash
pnpm build:cloudflare
# put test values in .dev.vars at the project root (gitignored), e.g.
#   RESEND_API_KEY=...   DEFAULT_EMAIL_FROM=...   DEFAULT_EMAIL_TO=...
pnpm preview:cloudflare              # wrangler dev, http://127.0.0.1:8787
```

## 5. Run only one platform on the production domain

Point `zero11travel.co.za` / `www` at one platform. Use the other (`*.netlify.app`
or `*.workers.dev`) as a staging copy. Set `SITE_URL` to the real domain on the
live one so canonical URLs, the sitemap and social tags are correct.

## 6. Known limitations

* **Rate limiting is per instance.** The contact form's limiter
  (`server/utils/antispam.ts`) is in-memory, so on both platforms each server
  instance counts separately. The honeypot, content checks and optional reCAPTCHA
  are the main defences. On Cloudflare, a free *WAF rate-limiting rule* on
  `POST /api/contact` is a real fix; on Netlify a shared store would be needed.
* **SMTP on Cloudflare is unsupported** — use Resend (§1).
* `@nuxt/image` was removed (it was unused and bundles native `sharp` binaries,
  which Workers cannot run). Photos are pre-optimised WebP in `public/images/photos/`.
