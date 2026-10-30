import type { Transporter, SendMailOptions } from 'nodemailer'
import { initGmailTransporter, isGmailConfigured } from './smtp-config'
import { canSendEmail, validateEmailContent, validateRecipients } from './antispam'

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  spamIdentifier?: string
}

/**
 * Every provider here except Gmail sends over an HTTP REST API, so it works on
 * Cloudflare Workers (which cannot open the raw SMTP sockets nodemailer needs).
 * Gmail has no API-key REST endpoint, so it alone still goes over SMTP via
 * nodemailer (Netlify/Node only).
 */
type Provider = 'resend' | 'mailgun' | 'sendgrid' | 'mailtrap' | 'zoho' | 'gmail'

const REST_PROVIDERS: Provider[] = ['resend', 'mailgun', 'sendgrid', 'mailtrap', 'zoho']

const toArray = (to: string | string[]): string[] => (Array.isArray(to) ? to : [to])

/**
 * Split a "Display Name <email@host>" string (or a bare address) into parts, for
 * the providers whose REST APIs want the name and email as separate JSON fields.
 */
const parseAddress = (value: string): { email: string; name?: string } => {
  const match = value.match(/^\s*(.*?)\s*<([^>]+)>\s*$/)
  if (match) {
    const name = match[1].replace(/^"|"$/g, '').trim()
    return { email: match[2].trim(), name: name || undefined }
  }
  return { email: value.trim() }
}

const apiError = async (response: Response): Promise<Error> =>
  new Error(`Email API responded ${response.status}: ${(await response.text()).slice(0, 200)}`)

/**
 * Pick the active email provider. An explicitly configured RESEND_API_KEY always
 * wins (the documented "set this and SMTP is ignored" behaviour, and the only
 * transport that works on Cloudflare out of the box). Otherwise DEFAULT_EMAIL_PROVIDER
 * (or the legacy DEFAULT_SMTP_PROVIDER) selects the provider, defaulting to Gmail.
 */
const resolveProvider = (): Provider => {
  if (process.env.RESEND_API_KEY) return 'resend'

  const configured = (process.env.DEFAULT_EMAIL_PROVIDER || process.env.DEFAULT_SMTP_PROVIDER || 'gmail').toLowerCase()
  if (configured === 'ses') {
    throw new Error('Amazon SES is no longer supported. Use resend, mailgun, sendgrid, mailtrap, zoho, or gmail.')
  }
  const all: Provider[] = [...REST_PROVIDERS, 'gmail']
  if (!all.includes(configured as Provider)) {
    throw new Error(`Unsupported email provider: ${configured}. Supported: ${all.join(', ')}.`)
  }
  return configured as Provider
}

const isConfigured = (provider: Provider): boolean => {
  switch (provider) {
    case 'resend':
      return !!process.env.RESEND_API_KEY
    case 'mailgun':
      return !!(process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN)
    case 'sendgrid':
      return !!process.env.SENDGRID_API_KEY
    case 'mailtrap':
      return !!process.env.MAILTRAP_API_TOKEN
    case 'zoho':
      return !!process.env.ZEPTOMAIL_TOKEN
    case 'gmail':
      return isGmailConfigured()
  }
}

// --- REST transports ---------------------------------------------------------

/** Resend — https://resend.com/docs/api-reference/emails/send-email */
const sendViaResend = async (options: EmailOptions, from: string): Promise<{ messageId?: string }> => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: toArray(options.to),
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  })
  if (!response.ok) throw await apiError(response)
  const data = await response.json() as { id?: string }
  return { messageId: data.id }
}

/** Mailgun — https://documentation.mailgun.com/docs/mailgun/api-reference/openapi-final/tag/Messages/ */
const sendViaMailgun = async (options: EmailOptions, from: string): Promise<{ messageId?: string }> => {
  const domain = process.env.MAILGUN_DOMAIN
  const base = process.env.MAILGUN_REGION?.toLowerCase() === 'eu'
    ? 'https://api.eu.mailgun.net'
    : 'https://api.mailgun.net'

  const form = new URLSearchParams()
  form.set('from', from)
  for (const recipient of toArray(options.to)) form.append('to', recipient)
  form.set('subject', options.subject)
  form.set('html', options.html)
  if (options.text) form.set('text', options.text)

  const auth = Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')
  const response = await fetch(`${base}/v3/${domain}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form.toString(),
  })
  if (!response.ok) throw await apiError(response)
  const data = await response.json() as { id?: string }
  return { messageId: data.id }
}

/** SendGrid — https://www.twilio.com/docs/sendgrid/api-reference/mail-send/mail-send */
const sendViaSendgrid = async (options: EmailOptions, from: string): Promise<{ messageId?: string }> => {
  // SendGrid requires text/plain before text/html when both are present.
  const content: Array<{ type: string; value: string }> = []
  if (options.text) content.push({ type: 'text/plain', value: options.text })
  content.push({ type: 'text/html', value: options.html })

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: toArray(options.to).map(email => ({ email })) }],
      from: parseAddress(from),
      subject: options.subject,
      content,
    }),
  })
  if (!response.ok) throw await apiError(response)
  // SendGrid returns 202 with an empty body; the id is in a response header.
  return { messageId: response.headers.get('x-message-id') || undefined }
}

/** Mailtrap — https://api-docs.mailtrap.io/docs/mailtrap-api-docs/ */
const sendViaMailtrap = async (options: EmailOptions, from: string): Promise<{ messageId?: string }> => {
  // A set inbox id switches to the sandbox (testing) endpoint; otherwise send live.
  const inboxId = process.env.MAILTRAP_INBOX_ID
  const url = inboxId
    ? `https://sandbox.api.mailtrap.io/api/send/${inboxId}`
    : 'https://send.api.mailtrap.io/api/send'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MAILTRAP_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: parseAddress(from),
      to: toArray(options.to).map(email => ({ email })),
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  })
  if (!response.ok) throw await apiError(response)
  const data = await response.json() as { message_ids?: string[] }
  return { messageId: data.message_ids?.[0] }
}

/** Zoho ZeptoMail (Zoho's transactional email API) — https://www.zoho.com/zeptomail/help/api/email-sending.html */
const sendViaZoho = async (options: EmailOptions, from: string): Promise<{ messageId?: string }> => {
  const base = process.env.ZEPTOMAIL_REGION?.toLowerCase() === 'eu'
    ? 'https://api.zeptomail.eu'
    : 'https://api.zeptomail.com'
  const token = process.env.ZEPTOMAIL_TOKEN || ''
  // ZeptoMail keys are sometimes copied with the scheme prefix already attached.
  const authValue = token.startsWith('Zoho-enczapikey') ? token : `Zoho-enczapikey ${token}`
  const fromAddr = parseAddress(from)

  const response = await fetch(`${base}/v1.1/email`, {
    method: 'POST',
    headers: {
      'Authorization': authValue,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      from: { address: fromAddr.email, name: fromAddr.name },
      to: toArray(options.to).map(email => ({ email_address: { address: email } })),
      subject: options.subject,
      htmlbody: options.html,
      textbody: options.text,
    }),
  })
  if (!response.ok) throw await apiError(response)
  const data = await response.json() as { request_id?: string }
  return { messageId: data.request_id }
}

const REST_SENDERS: Record<Exclude<Provider, 'gmail'>, (o: EmailOptions, from: string) => Promise<{ messageId?: string }>> = {
  resend: sendViaResend,
  mailgun: sendViaMailgun,
  sendgrid: sendViaSendgrid,
  mailtrap: sendViaMailtrap,
  zoho: sendViaZoho,
}

// --- Gmail (SMTP via nodemailer) ---------------------------------------------

let gmailTransporter: Transporter | null = null

const sendViaGmail = async (options: EmailOptions, from: string): Promise<{ messageId?: string }> => {
  if (!gmailTransporter) gmailTransporter = await initGmailTransporter()
  const mailOptions: SendMailOptions = {
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  }
  const info = await gmailTransporter.sendMail(mailOptions)
  return { messageId: info.messageId }
}

// --- Public API --------------------------------------------------------------

export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; messageId?: string; message: string }> => {
  const spamIdentifier = options.spamIdentifier || 'default'

  const canSend = await canSendEmail(spamIdentifier)
  if (!canSend) {
    throw new Error(`Rate limit exceeded for identifier: ${spamIdentifier}. Please try again later.`)
  }

  const contentValidation = validateEmailContent(options.subject, options.html, options.text)
  if (!contentValidation.isValid) {
    throw new Error(`Email content validation failed: ${contentValidation.reason}`)
  }

  const recipientValidation = validateRecipients(options.to)
  if (!recipientValidation.isValid) {
    throw new Error(`Recipient validation failed: ${recipientValidation.reason}`)
  }

  const provider = resolveProvider()
  const from = options.from || process.env.DEFAULT_EMAIL_FROM

  if (!isConfigured(provider)) {
    // Simulating a send is only acceptable in development. In production it would
    // tell the visitor "sent successfully" while silently losing the enquiry.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Email is not configured: set RESEND_API_KEY (or another provider\'s credentials) — see DEPLOYMENT.md')
    }
    console.warn(`Email provider "${provider}" is not configured. Email sending will be simulated.`)
    return { success: true, messageId: 'simulated-message-id', message: 'Email simulated (development, no transport configured)' }
  }

  if (!from) {
    throw new Error('DEFAULT_EMAIL_FROM must be set (a sender on a domain verified with the email provider)')
  }

  try {
    const info = provider === 'gmail'
      ? await sendViaGmail(options, from)
      : await REST_SENDERS[provider](options, from)
    return { success: true, messageId: info.messageId, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error(`Failed to send email: ${(error as Error).message}`)
  }
}
