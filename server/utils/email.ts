import type { Transporter, SendMailOptions } from 'nodemailer'
import { initSmtpTransporter, validateSmtpConfig } from './smtp-config'
import { canSendEmail, validateEmailContent, validateRecipients } from './antispam'

let transporter: Transporter | null = null

const simulatedTransporter = {
  sendMail: async (options: any) => {
    console.log('Email simulation (SMTP not configured):', {
      from: options.from,
      to: options.to,
      subject: options.subject,
    })
    return { messageId: 'simulated-message-id', response: '250 Email simulated successfully' }
  },
} as unknown as Transporter

export const initEmailTransporter = async (): Promise<Transporter> => {
  if (transporter) return transporter

  if (!validateSmtpConfig()) {
    // Simulating a send is only acceptable in development. In production it would
    // tell the visitor "sent successfully" while silently losing the enquiry.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Email is not configured: set RESEND_API_KEY, or the SMTP_* variables (see DEPLOYMENT.md)')
    }
    console.warn('SMTP configuration not valid. Email sending will be simulated.')
    return simulatedTransporter
  }

  try {
    transporter = await initSmtpTransporter()
    return transporter
  } catch (error) {
    console.error('Failed to initialize SMTP transporter:', error)
    if (process.env.NODE_ENV === 'production') throw error
    return simulatedTransporter
  }
}

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  spamIdentifier?: string
}

/**
 * HTTP email transport (Resend). Needed on Cloudflare Workers, which cannot
 * open the raw SMTP connections nodemailer relies on; also works on Netlify.
 * Activated by setting RESEND_API_KEY.
 */
const sendViaResend = async (options: EmailOptions, from: string | undefined): Promise<{ messageId?: string }> => {
  if (!from) throw new Error('DEFAULT_EMAIL_FROM must be set (a sender on a domain verified with the email provider)')
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    }),
  })
  if (!response.ok) {
    throw new Error(`Email API responded ${response.status}: ${(await response.text()).slice(0, 200)}`)
  }
  const data = await response.json() as { id?: string }
  return { messageId: data.id }
}

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

  if (process.env.RESEND_API_KEY) {
    try {
      const info = await sendViaResend(options, options.from || process.env.DEFAULT_EMAIL_FROM)
      return { success: true, messageId: info.messageId, message: 'Email sent successfully' }
    } catch (error) {
      console.error('Error sending email:', error)
      throw new Error(`Failed to send email: ${(error as Error).message}`)
    }
  }

  const emailTransporter = await initEmailTransporter()

  const mailOptions: SendMailOptions = {
    from: options.from || process.env.DEFAULT_EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  }

  try {
    const info = await emailTransporter.sendMail(mailOptions)
    return { success: true, messageId: info.messageId, message: 'Email sent successfully' }
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error(`Failed to send email: ${(error as Error).message}`)
  }
}
