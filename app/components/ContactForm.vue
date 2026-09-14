<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

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

const errors = reactive<Record<string, string>>({})
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const statusMessage = ref('')

const { public: { recaptchaSiteKey } } = useRuntimeConfig()

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
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window.grecaptcha!.execute(recaptchaSiteKey, { action: 'contact_form' }).then(resolve).catch(() => resolve(undefined))
    })
  })
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

async function handleSubmit() {
  if (!validate()) return

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
        class="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-zero11-red-600 focus:outline-none focus:ring-2 focus:ring-zero11-red-600/20"
        :aria-invalid="!!errors.message"
        :aria-describedby="errors.message ? 'message-error' : undefined"
      />
      <p v-if="errors.message" id="message-error" class="mt-1.5 text-sm text-red-600">{{ errors.message }}</p>
    </div>

    <div role="status" aria-live="polite">
      <p v-if="status === 'success'" class="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
        <CheckCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        {{ statusMessage }}
      </p>
      <p v-else-if="status === 'error'" class="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
        <ExclamationCircleIcon class="h-5 w-5 shrink-0" aria-hidden="true" />
        {{ statusMessage }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="status === 'submitting'"
      class="inline-flex w-full items-center justify-center rounded-full bg-zero11-red-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zero11-red-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {{ status === 'submitting' ? 'Sending...' : 'Send Enquiry' }}
    </button>
  </form>
</template>
