# Deployment — Netlify and Cloudflare

One codebase deploys to either platform. The only difference is the Nitro
preset chosen at build time.

| | Netlify | Cloudflare Pages |
|---|---|---|
| Build command | `pnpm build:netlify` | `pnpm build:cloudflare` |
| Deploy | Git push (config in `netlify.toml`) | `pnpm deploy:cloudflare` (config in `wrangler.jsonc`) |
| Server runs as | Netlify Function (Node) | Cloudflare Pages Function (`nodejs_compat`) |
| Email transport | SMTP **or** Resend | **Resend only** (no raw SMTP sockets on Workers) |
| Static headers | `public/_headers` + Nitro | `public/_headers` + Nitro |

Both were built and smoke-tested from this repo. The Cloudflare build was also
run on Cloudflare's own runtime (`workerd`, via `wrangler pages dev`) — all 9 pages, sitemap, robots, static assets,
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

## 3b. Pure static build — dashboard drag-and-drop (no server)

Cloudflare's dashboard drag-and-drop box only takes plain static files. It rejects the
server files (`_routes.json`, `_worker.js`) with "Pages _routes.json is not supported",
so the server-rendered build (§4) cannot be uploaded that way. For drag-and-drop, use the
static build instead:

```bash
pnpm build:static          # pre-renders every page to plain HTML
```

Drag the **`.output/public`** folder (165 files) into the upload box. Works on any
static host (Netlify drop, Cloudflare dashboard upload, etc.).

**Trade-off: no server means no emailed enquiries.** The contact form detects the static
build (`STATIC_SITE=true`, set by the script) and, instead of calling `/api/contact`,
opens a **WhatsApp message to +27 76 873 5815 with the enquiry pre-filled**, with a
"send it by email" link as a fallback. Nothing is stored by the website, and the privacy
note on the form says so. If you later want real emailed enquiries on a static site, use an
external form service, or switch to the CLI/Git deployment in §4.

The static build also writes the security headers into `_headers`
(`scripts/finalize-static.mjs`) and keeps the same 9 pages, sitemap and robots.txt.

## 4. Deploy to Cloudflare (Pages, via the Wrangler CLI)

Same workflow as the `sylvester_solutions` project: build with the Nitro
`cloudflare_pages` preset into `dist/`, then `wrangler pages deploy`.
`wrangler.jsonc` carries the project name, `pages_build_output_dir` and the
`nodejs_compat` flag, so there are no dashboard runtime settings to configure.

```bash
pnpm wrangler login                    # one-time, opens a browser
pnpm deploy:cloudflare                 # builds, then `wrangler pages deploy dist`
```

The first deploy creates the Pages project `zero11-travel-tours` (answer the
prompts: production branch `main`). It is served at
`zero11-travel-tours.pages.dev`. Then set the runtime secrets (§2) — you paste
each value at the prompt, so it never appears in a terminal history or chat:

```bash
pnpm wrangler pages secret put RESEND_API_KEY      --project-name=zero11-travel-tours
pnpm wrangler pages secret put DEFAULT_EMAIL_FROM  --project-name=zero11-travel-tours
pnpm wrangler pages secret put DEFAULT_EMAIL_TO    --project-name=zero11-travel-tours
```

Attach `zero11travel.co.za` / `www` under *Pages project → Custom domains*.

**The dashboard drag-and-drop box does not work for this build.** It rejects `_routes.json` /
`_worker.js` ("Pages _routes.json is not supported") and cannot run the server code
this site needs (server-rendered pages and `/api/contact`). Use the CLI above, or
connect the GitHub repo to a Pages project with build command
`pnpm build:cloudflare` and output directory `dist`.

Build-time values (`SITE_URL`, `RECAPTCHA_SITE_KEY`, `GTM_CONTAINER_ID`,
`META_PIXEL_ID`) are baked in when the build runs, so keep them in your local
`.env` (or the Git-integration build variables) before `pnpm deploy:cloudflare`.

### Testing the Cloudflare build locally

```bash
pnpm build:cloudflare
# put test values in .dev.vars at the project root (gitignored), e.g.
#   RESEND_API_KEY=...   DEFAULT_EMAIL_FROM=...   DEFAULT_EMAIL_TO=...
pnpm preview:cloudflare                # wrangler pages dev, http://127.0.0.1:8788
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
