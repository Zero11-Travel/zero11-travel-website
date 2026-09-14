import { RateLimiterMemory } from 'rate-limiter-flexible'

const emailRateLimiter = new RateLimiterMemory({
  points: parseInt(process.env.ANTISPAM_EMAIL_LIMIT || '10'),
  duration: parseInt(process.env.ANTISPAM_EMAIL_DURATION || '3600'),
})

export const canSendEmail = async (identifier: string): Promise<boolean> => {
  try {
    await emailRateLimiter.consume(identifier)
    return true
  } catch {
    return false
  }
}

export const validateEmailContent = (subject: string, html: string, text?: string): { isValid: boolean; reason?: string } => {
  const spamIndicators = [
    /free money/i,
    /click here now/i,
    /urgent action required/i,
    /congratulations you won/i,
    /viagra/i,
    /casino/i,
    /lottery/i,
    /nigerian prince/i,
    /make money fast/i,
  ]

  const content = `${subject} ${html} ${text || ''}`.toLowerCase()

  for (const indicator of spamIndicators) {
    if (indicator.test(content)) {
      return { isValid: false, reason: `Spam indicator detected: ${indicator.toString()}` }
    }
  }

  const linkCount = (content.match(/http/gi) || []).length
  if (linkCount > parseInt(process.env.ANTISPAM_MAX_LINKS || '5')) {
    return { isValid: false, reason: `Too many links in email (${linkCount})` }
  }

  const capitalizationRatio = calculateCapitalizationRatio(content)
  if (capitalizationRatio > parseFloat(process.env.ANTISPAM_MAX_CAPS_RATIO || '0.7')) {
    return { isValid: false, reason: 'Too much capitalization' }
  }

  return { isValid: true }
}

const calculateCapitalizationRatio = (text: string): number => {
  const letters = text.match(/[a-zA-Z]/g)
  if (!letters || letters.length === 0) return 0
  const capitalized = letters.filter(char => char === char.toUpperCase())
  return capitalized.length / letters.length
}

export const validateRecipients = (recipients: string | string[]): { isValid: boolean; reason?: string } => {
  const recipientList = Array.isArray(recipients) ? recipients : [recipients]

  if (recipientList.length > parseInt(process.env.ANTISPAM_MAX_RECIPIENTS || '10')) {
    return { isValid: false, reason: `Too many recipients (${recipientList.length})` }
  }

  for (const recipient of recipientList) {
    if (!isValidEmail(recipient)) {
      return { isValid: false, reason: `Invalid email address format: ${recipient}` }
    }
  }

  return { isValid: true }
}

const isValidEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
