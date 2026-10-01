import type { H3Event } from 'h3'
import { sendEmail } from '../utils/email'

interface EnquiryFormData {
  name: string
  email: string
  phone?: string
  service: string
  travelDate?: string
  message: string
  'g-recaptcha-response'?: string
  /** Honeypot field — real users never fill this in */
  website?: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Behind a proxy/CDN the socket address is the proxy's own IP, so prefer the
 * header each platform sets itself: Netlify, then Cloudflare, then X-Forwarded-For.
 * (The socket may not exist at all on edge runtimes.)
 */
function getClientIp(event: H3Event): string {
  const forwarded = getRequestHeader(event, 'x-nf-client-connection-ip')
    || getRequestHeader(event, 'cf-connecting-ip')
    || getRequestHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || event.node?.req?.socket?.remoteAddress || 'unknown'
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const formData = await readBody<EnquiryFormData>(event)

    // Honeypot: silently accept but drop obvious bots
    if (formData.website) {
      return { success: true, message: 'Your enquiry has been sent successfully!' }
    }

    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid email format' })
    }

    // reCAPTCHA is optional until a site/secret key pair is configured — but
    // once a secret IS configured, a missing token means verification failed,
    // not "skip verification" (a blocked script or a bot bypassing the page
    // JS entirely would otherwise sail through unverified).
    // Read the live environment first: runtimeConfig is baked at build time, and on
    // Cloudflare secrets only exist at runtime — a baked-in empty value would
    // silently disable verification.
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || useRuntimeConfig().recaptchaSecretKey
    if (recaptchaSecret) {
      if (!formData['g-recaptcha-response']) {
        throw createError({ statusCode: 400, statusMessage: 'reCAPTCHA verification required — please try again' })
      }
      const recaptchaVerifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(recaptchaSecret)}&response=${encodeURIComponent(formData['g-recaptcha-response'])}`
      const recaptchaResponseData = await $fetch<{ success: boolean; 'error-codes'?: string[] }>(recaptchaVerifyUrl, { method: 'POST' })

      if (!recaptchaResponseData.success) {
        throw createError({
          statusCode: 400,
          statusMessage: 'reCAPTCHA verification failed: ' + (recaptchaResponseData['error-codes']?.join(', ') || 'Unknown error'),
        })
      }
    }

    const htmlEmail = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>New Booking Enquiry</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff;">
            <div style="background: #CC1F25; padding: 28px 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">New Booking Enquiry — Zero11 Travel &amp; Tours</h1>
            </div>
            <div style="padding: 28px 24px;">
              <div style="background: #FDF2EC; border-left: 4px solid #ED6823; padding: 14px 16px; border-radius: 6px; margin-bottom: 20px;">
                <strong style="color: #0A0A0A;">Service Requested:</strong> ${escapeHtml(formData.service)}
              </div>
              <p style="margin: 12px 0;"><strong>Name:</strong> ${escapeHtml(formData.name)}</p>
              <p style="margin: 12px 0;"><strong>Email:</strong> ${escapeHtml(formData.email)}</p>
              <p style="margin: 12px 0;"><strong>Phone:</strong> ${escapeHtml(formData.phone || 'Not provided')}</p>
              <p style="margin: 12px 0;"><strong>Preferred Travel Date:</strong> ${escapeHtml(formData.travelDate || 'Not specified')}</p>
              <p style="margin: 12px 0;"><strong>Message:</strong></p>
              <p style="white-space: pre-line; color: #333;">${escapeHtml(formData.message)}</p>
            </div>
            <div style="background: #0A0A0A; color: #ffffff99; padding: 16px 24px; text-align: center; font-size: 12px;">
              Zero11 Tours and Transfers (Pty) Ltd &middot; Automated notification — please do not reply directly.
            </div>
          </div>
        </body>
      </html>
    `

    const textEmail = `
NEW BOOKING ENQUIRY — ZERO11 TRAVEL & TOURS
--------------------------------------------
Service: ${formData.service}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Preferred Travel Date: ${formData.travelDate || 'Not specified'}

Message:
${formData.message}
    `.trim()

    const recipientEmail = process.env.DEFAULT_EMAIL_TO || process.env.CONTACT_EMAIL || 'kgothatso@zero11travel.co.za'

    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: `Booking Enquiry: ${formData.service} — ${formData.name}`,
      html: htmlEmail,
      text: textEmail,
      from: process.env.DEFAULT_EMAIL_FROM,
      spamIdentifier: getClientIp(event),
    })

    return {
      success: true,
      messageId: emailResult.messageId,
      message: 'Your enquiry has been sent successfully!',
    }
  } catch (error: any) {
    console.error('Error processing booking enquiry:', error)
    const statusCode = error.statusCode || 500
    throw createError({
      statusCode,
      // Client errors (validation, rate limit, reCAPTCHA) are safe to show; for
      // server errors don't leak upstream/provider details to the visitor.
      statusMessage: statusCode < 500
        ? (error.statusMessage || error.message || 'Error processing your enquiry')
        : 'We could not send your enquiry right now. Please call or WhatsApp us on +27 76 873 5815.',
    })
  }
})
