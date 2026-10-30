import type { Transporter } from 'nodemailer'

/**
 * Gmail is the one email provider still sent over SMTP (via nodemailer), because
 * it has no API-key REST transactional endpoint — the Gmail API needs full OAuth2,
 * which is overkill for a single-recipient enquiry form. Every other provider in
 * this codebase (Resend, Mailgun, SendGrid, Mailtrap, Zoho/ZeptoMail) sends over
 * an HTTP REST API, so it also works on Cloudflare Workers. Gmail/SMTP does NOT
 * work on Workers (no raw SMTP sockets) — use a REST provider there.
 */
export interface GmailSmtpConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

const getGmailConfig = (): GmailSmtpConfig => {
  const user = process.env.SMTP_GMAIL_USER || ''
  const pass = process.env.SMTP_GMAIL_PASS || ''

  if (!user || !pass) {
    throw new Error(
      'Missing Gmail SMTP configuration. Set SMTP_GMAIL_USER and SMTP_GMAIL_PASS (a Gmail App Password) in your environment variables.',
    )
  }

  return {
    host: process.env.SMTP_GMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_GMAIL_PORT || '587', 10),
    secure: process.env.SMTP_GMAIL_SECURE === 'true',
    auth: { user, pass },
  }
}

export const isGmailConfigured = (): boolean => {
  try {
    getGmailConfig()
    return true
  } catch {
    return false
  }
}

export const initGmailTransporter = async (): Promise<Transporter> => {
  const config = getGmailConfig()
  // Lazy import: keeps nodemailer (and its node:net/tls usage) out of the request
  // path on platforms/providers where an HTTP REST transport is used instead.
  const { createTransport } = await import('nodemailer')
  return createTransport(config)
}
