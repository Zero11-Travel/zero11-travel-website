import type { Transporter } from 'nodemailer'

export type SmtpProvider = 'gmail' | 'mailtrap' | 'mailgun' | 'sendgrid' | 'zoho' | 'ses'

export interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
  fromName?: string
}

export const getSmtpConfig = (provider: SmtpProvider): SmtpConfig => {
  const prefix = `SMTP_${provider.toUpperCase()}`

  const config: SmtpConfig = {
    host: process.env[`${prefix}_HOST`] || '',
    port: parseInt(process.env[`${prefix}_PORT`] || '587', 10),
    secure: process.env[`${prefix}_SECURE`] === 'true',
    auth: {
      user: process.env[`${prefix}_USER`] || '',
      pass: process.env[`${prefix}_PASS`] || '',
    },
    fromName: process.env[`${prefix}_FROM_NAME`],
  }

  if (!config.host || !config.auth.user || !config.auth.pass) {
    throw new Error(
      `Missing required SMTP configuration for ${provider}. Please set ${prefix}_HOST, ${prefix}_USER, and ${prefix}_PASS in your environment variables.`,
    )
  }

  return config
}

export const initSmtpTransporter = async (): Promise<Transporter> => {
  const defaultProvider = (process.env.DEFAULT_SMTP_PROVIDER || 'gmail').toLowerCase() as SmtpProvider

  const supportedProviders: SmtpProvider[] = ['gmail', 'mailtrap', 'mailgun', 'sendgrid', 'zoho', 'ses']
  if (!supportedProviders.includes(defaultProvider)) {
    throw new Error(
      `Unsupported SMTP provider: ${defaultProvider}. Supported providers are: ${supportedProviders.join(', ')}`,
    )
  }

  const config = getSmtpConfig(defaultProvider)
  // Lazy import: keeps nodemailer (and its node:net/tls usage) out of the
  // request path on platforms where the HTTP email transport is used instead.
  const { createTransport } = await import('nodemailer')
  return createTransport(config)
}

export const validateSmtpConfig = (): boolean => {
  const defaultProvider = (process.env.DEFAULT_SMTP_PROVIDER || 'gmail').toLowerCase() as SmtpProvider

  try {
    getSmtpConfig(defaultProvider)
    return true
  } catch {
    return false
  }
}
