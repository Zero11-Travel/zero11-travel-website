import { type Transporter, type SendMailOptions } from 'nodemailer'
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

export const initEmailTransporter = (): Transporter => {
  if (transporter) return transporter

  if (!validateSmtpConfig()) {
    console.warn('SMTP configuration not valid. Email sending will be simulated.')
    return simulatedTransporter
  }

  try {
    transporter = initSmtpTransporter()
    return transporter
  } catch (error) {
    console.error('Failed to initialize SMTP transporter:', error)
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

  const emailTransporter = initEmailTransporter()

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
