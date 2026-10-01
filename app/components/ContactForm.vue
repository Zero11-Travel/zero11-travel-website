<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const todayIso = new Date().toISOString().split('T')[0]

const services = [
  'Airport Transfer',
  'Chauffeur Drive',
  'Point-to-Point / Door-to-Door',
  'Corporate Shuttle',
  'Tours & Sightseeing',
  'Hotel / Lodge Booking',
  'Other',
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  travelDate: '',
  message: '',
  website: '', // honeypot — must stay empty
})

// Until the page is hydrated the form has no JS submit handler, so a native
// submit would put the visitor's name/email/phone in the URL (GET). Keep the
// submit button disabled until then (this also blocks Enter-key submission).
const ready = ref(false)
onMounted(() => { ready.value = true })

const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const { public: { recaptchaSiteKey, staticSite } } = useRuntimeConfig()

// Static (drag-and-drop) builds have no server to email from, so the enquiry is
// handed to WhatsApp as a prefilled message instead (see `pnpm build:static`).
const WHATSAPP_NUMBER = '27768735815'
const CONTACT_EMAIL = 'kgothatso@zero11travel.co.za'

function buildEnquiryText(): string {
  const details = [
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    form.phone.trim() && `Phone: ${form.phone.trim()}`,
    `Service: ${form.service}`,
    form.travelDate && `Preferred travel date: ${form.travelDate}`,
  ].filter(Boolean)
  return ['Hello Zero11, I would like to make an enquiry.', '', ...details, '', form.message.trim()].join('\n')
}

const whatsappLink = ref('')
const mailtoLink = ref('')

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

function getRecaptchaToken(): Promise<string | undefined> {
  if (!recaptchaSiteKey || typeof window === 'undefined' || !window.grecaptcha) {
    return Promise.resolve(undefined)
  }
  const tokenPromise = new Promise<string | undefined>((resolve) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(recaptchaSiteKey, { action: 'contact_form' }).then(resolve).catch(() => resolve(undefined))
    })
  })
  // A blocked script/extension can prevent ready()'s callback from ever
  // firing — never let submission hang indefinitely waiting on it.
  const timeout = new Promise<string | undefined>(resolve => setTimeout(() => resolve(undefined), 6000))
  return Promise.race([tokenPromise, timeout])
}

function validate(): boolean {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!form.service) errors.service = 'Please select a service.'
  if (!form.message.trim()) errors.message = 'Please tell us a little about your trip.'

  return Object.keys(errors).length === 0
}

function handleStaticSubmit() {
  const text = buildEnquiryText()
  whatsappLink.value = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
  mailtoLink.value = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Booking enquiry: ${form.service} — ${form.name.trim()}`)}&body=${encodeURIComponent(text)}`
  // Must run synchronously inside the click so popup blockers allow it.
  window.open(whatsappLink.value, '_blank', 'noopener')
  status.value = 'success'
  statusMessage.value = 'Opening WhatsApp with your enquiry ready to send. Just press send there.'
}

async function handleSubmit() {
  if (!validate()) return

  if (staticSite) {
    handleStaticSubmit()
    return
  }

  status.value = 'submitting'
  statusMessage.value = ''

  try {
    const token = await getRecaptchaToken()
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, 'g-recaptcha-response': token },
    })
    status.value = 'success'
    statusMessage.value = "Thank you! Your enquiry has been sent — we'll be in touch shortly."
    Object.assign(form, { name: '', email: '', phone: '', service: '', travelDate: '', message: '', website: '' })
  } catch (error: any) {
    status.value = 'error'
    statusMessage.value = error?.data?.statusMessage || 'Something went wrong. Please try again or contact us directly.'
  }
}
</script>

<template>
  <form novalidate class="space-y-5" @submit.prevent="handleSubmit">
    <!-- Honeypot field, hidden from real users -->
    <div class="hidden" aria-hidden="true">
      <label for="website">Website</label>
      <input id="website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" />
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label for="name" class="mb-1.5 block text-sm font-medium text-zero11-black">Full Name *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          aria-required="true"
          class="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
          :aria-invalid="!!errors.name"
          :aria-describedby="errors.name ? 'name-error' : undefined"
        />
        <p v-if="errors.name" id="name-error" class="mt-1.5 text-sm text-red-600">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email" class="mb-1.5 block text-sm font-medium text-zero11-black">Email Address *</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          aria-required="true"
          class="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'email-error' : undefined"
        />
        <p v-if="errors.email" id="email-error" class="mt-1.5 text-sm text-red-600">{{ errors.email }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div>
        <label for="phone" class="mb-1.5 block text-sm font-medium text-zero11-black">Phone Number</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
          class="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
        />
      </div>

      <div>
        <label for="travelDate" class="mb-1.5 block text-sm font-medium text-zero11-black">Preferred Travel Date</label>
        <input
          id="travelDate"
          v-model="form.travelDate"
          type="date"
          name="travelDate"
          :min="todayIso"
          class="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
        />
      </div>
    </div>

    <div>
      <label for="service" class="mb-1.5 block text-sm font-medium text-zero11-black">Service Required *</label>
      <select
        id="service"
        v-model="form.service"
        name="service"
        aria-required="true"
        class="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
        :aria-invalid="!!errors.service"
        :aria-describedby="errors.service ? 'service-error' : undefined"
      >
        <option value="" disabled>Select a service</option>
        <option v-for="service in services" :key="service" :value="service">{{ service }}</option>
      </select>
      <p v-if="errors.service" id="service-error" class="mt-1.5 text-sm text-red-600">{{ errors.service }}</p>
    </div>

    <div>
      <label for="message" class="mb-1.5 block text-sm font-medium text-zero11-black">Tell Us About Your Trip *</label>
      <textarea
        id="message"
        v-model="form.message"
        name="message"
        rows="5"
        aria-required="true"
        class="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'message-error' : undefined"
      />
      <p v-if="errors.message" id="message-error" class="mt-1.5 text-sm text-red-600">{{ errors.message }}</p>
    </div>

    <div role="status" aria-live="polite">
      <p v-if="status === 'success'" class="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
        <CheckCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>
          {{ statusMessage }}
          <template v-if="whatsappLink">
            Didn't open?
            <a :href="whatsappLink" target="_blank" rel="noopener" class="font-semibold underline">Open WhatsApp</a>
            or
            <a :href="mailtoLink" class="font-semibold underline">send it by email</a>.
          </template>
        </span>
      </p>
      <p v-else-if="status === 'error'" class="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        {{ statusMessage }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="!ready || status === 'submitting'"
      class="inline-flex w-full items-center justify-center rounded-full bg-zero11-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zero11-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {{ staticSite ? 'Send via WhatsApp' : status === 'submitting' ? 'Sending...' : 'Send Enquiry' }}
    </button>

    <p class="text-xs text-zero11-black/50">
      <template v-if="staticSite">
        This opens WhatsApp with your enquiry pre-filled; nothing is stored by this website.
        By sending it you agree to our
      </template>
      <template v-else>By submitting this form, you agree to our</template>
      <NuxtLink to="/privacy-policy" class="underline hover:text-zero11-red-600">Privacy Policy</NuxtLink>.
      We'll only use your details to respond to your enquiry.
    </p>
  </form>
</template>
