# Zero11 Travel & Tours Website

Corporate website for Zero11 Tours and Transfers (Pty) Ltd — airport transfers,
chauffeur drive, corporate shuttle services and tailor-made tours across South Africa.

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
pnpm install
```

### Environment Configuration

Create a `.env` file in the root directory based on the `.env.example` file:

```bash
cp .env.example .env
```

Then update the values in `.env` with your actual configuration:

- **SMTP**: Configure your email provider settings so booking enquiries actually
  send (without this, submissions succeed but emails are only logged/simulated)
- **reCAPTCHA** (optional): Sign up at [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create)
  to get your site and secret keys — the form works without it, verification is
  simply skipped if unset

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

See `CLAUDE.md` for brand assets, company details, content sources and a full
list of what still needs client input before go-live.
