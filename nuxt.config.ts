// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineOrganization } from 'nuxt-schema-org/schema'

const siteUrl = process.env.SITE_URL || 'https://www.zero11travel.co.za'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
  ],
  runtimeConfig: {
    defaultSmtpProvider: process.env.DEFAULT_SMTP_PROVIDER,
    smtpGmailHost: process.env.SMTP_GMAIL_HOST,
    smtpGmailPort: process.env.SMTP_GMAIL_PORT,
    smtpGmailSecure: process.env.SMTP_GMAIL_SECURE,
    smtpGmailUser: process.env.SMTP_GMAIL_USER,
    smtpGmailPass: process.env.SMTP_GMAIL_PASS,
    smtpGmailFromName: process.env.SMTP_GMAIL_FROM_NAME,
    defaultEmailFrom: process.env.DEFAULT_EMAIL_FROM,
    contactEmail: process.env.CONTACT_EMAIL,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      siteUrl,
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
  ],
  googleFonts: {
    families: {
      Poppins: [400, 500, 600, 700, 800],
      Inter: [400, 500, 600],
    },
    display: 'swap',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Zero11 Travel & Tours – safe, reliable and professional chauffeur drive, airport transfers, shuttle services and tours across Johannesburg, Durban and Cape Town. Your global travel companion, Africa awaits!' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Zero11 Travel & Tours' },
        { property: 'og:locale', content: 'en_ZA' },
        { property: 'og:image', content: `${siteUrl}/og-image.jpg` },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: `${siteUrl}/og-image.jpg` },
        { name: 'geo.region', content: 'ZA-GP' },
        { name: 'geo.placename', content: 'Midrand' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
  site: {
    url: siteUrl,
    name: 'Zero11 Travel & Tours',
    description: 'Safe, reliable and professional chauffeur drive, airport transfers, shuttle services and tours across South Africa.',
  },
  sitemap: {
    autoLastmod: true,
  },
  robots: {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
  },
  schemaOrg: {
    identity: defineOrganization({
      name: 'Zero11 Travel & Tours',
      alternateName: 'Zero11 Tours and Transfers (Pty) Ltd',
      description: 'Safe, reliable and professional travel & tours service provider offering airport transfers, chauffeur drive, point-to-point, shuttle services and tours across South Africa.',
      url: siteUrl,
      logo: '/images/logo.jpeg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '9077 Ivory Park, Sisonke Street',
        addressLocality: 'Midrand',
        postalCode: '1682',
        addressCountry: 'ZA',
      },
      email: 'kgothatso@zero11travel.co.za',
      telephone: '+27768735815',
      sameAs: [],
    }),
  },
})
