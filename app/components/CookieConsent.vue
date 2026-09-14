<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ShieldCheckIcon, XMarkIcon, CheckIcon } from '@heroicons/vue/24/outline'
import type { ConsentPreferences } from '../composables/useGoogleTagManager'

interface StoredPreferences extends ConsentPreferences {
  accepted: boolean
  timestamp: string | null
}

const { initializeGTM, updateConsent } = useGoogleTagManager()
const { initializeMetaPixel } = useMetaPixel()

const showBanner = ref(false)
const showModal = ref(false)

const defaults: StoredPreferences = { analytics: false, marketing: false, accepted: false, timestamp: null }
const preferences = ref<StoredPreferences>({ ...defaults })

function applyConsent() {
  if (preferences.value.analytics || preferences.value.marketing) {
    initializeGTM()
  }
  updateConsent(preferences.value)
  if (preferences.value.marketing) {
    initializeMetaPixel()
  }
}

function persist() {
  preferences.value.accepted = true
  preferences.value.timestamp = new Date().toISOString()
  localStorage.setItem('zero11-cookie-preferences', JSON.stringify(preferences.value))
  showBanner.value = false
  showModal.value = false
  applyConsent()
}

function acceptAll() {
  preferences.value = { analytics: true, marketing: true, accepted: false, timestamp: null }
  persist()
}

function rejectAll() {
  preferences.value = { analytics: false, marketing: false, accepted: false, timestamp: null }
  persist()
}

function savePreferences() {
  persist()
}

function openPreferences() {
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

onMounted(() => {
  try {
    const stored = localStorage.getItem('zero11-cookie-preferences')
    if (stored) {
      preferences.value = JSON.parse(stored)
      if (preferences.value.accepted) {
        applyConsent()
        return
      }
    }
  } catch {
    preferences.value = { ...defaults }
  }
  setTimeout(() => { showBanner.value = true }, 800)

  window.addEventListener('open-cookie-preferences', openPreferences)
})
</script>

<template>
  <div v-if="showBanner" class="fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white shadow-2xl">
    <div class="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center">
      <ShieldCheckIcon class="h-8 w-8 shrink-0 text-zero11-red-600" aria-hidden="true" />
      <p class="flex-1 text-sm text-zero11-black/70">
        We use cookies to understand how visitors use our site and to show relevant ads. Read our
        <NuxtLink to="/privacy-policy" class="text-zero11-red-600 underline hover:text-zero11-red-700">Privacy Policy</NuxtLink>
        or manage your preferences below.
      </p>
      <div class="flex w-full shrink-0 gap-3 sm:w-auto">
        <button
          type="button"
          class="flex-1 rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-zero11-black transition-colors hover:bg-black/5 sm:flex-none"
          @click="openPreferences"
        >
          Manage Preferences
        </button>
        <button
          type="button"
          class="flex-1 rounded-full bg-zero11-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zero11-red-700 sm:flex-none"
          @click="acceptAll"
        >
          Accept All
        </button>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="fixed inset-0 z-[60] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="cookie-prefs-title">
    <div class="fixed inset-0 bg-black/60" @click="closeModal" />
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div class="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <h2 id="cookie-prefs-title" class="font-heading text-lg font-bold text-zero11-black">Cookie Preferences</h2>
          <button type="button" aria-label="Close" class="text-zero11-black/50 hover:text-zero11-black" @click="closeModal">
            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div class="max-h-[60vh] space-y-4 overflow-y-auto px-6 py-5">
          <p class="text-sm text-zero11-black/60">
            Choose which cookies we can use. You can change this at any time from the "Cookie Settings" link in the footer.
          </p>

          <div class="rounded-xl border border-black/10 p-4">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="font-semibold text-zero11-black">Essential</h3>
                <p class="text-sm text-zero11-black/60">Required for the site to function. Always on.</p>
              </div>
              <div class="flex h-6 w-11 shrink-0 items-center rounded-full bg-zero11-red-600 px-0.5 opacity-60">
                <CheckIcon class="ml-auto h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-black/10 p-4">
            <label class="flex items-start justify-between gap-4">
              <span>
                <span class="block font-semibold text-zero11-black">Analytics</span>
                <span class="block text-sm text-zero11-black/60">Helps us understand how visitors use our site (Google Analytics).</span>
              </span>
              <input v-model="preferences.analytics" type="checkbox" class="mt-1 h-5 w-5 shrink-0 accent-zero11-red-600" />
            </label>
          </div>

          <div class="rounded-xl border border-black/10 p-4">
            <label class="flex items-start justify-between gap-4">
              <span>
                <span class="block font-semibold text-zero11-black">Marketing &amp; Advertising</span>
                <span class="block text-sm text-zero11-black/60">Lets us show you relevant ads on Google and Meta (Facebook/Instagram) based on your visit.</span>
              </span>
              <input v-model="preferences.marketing" type="checkbox" class="mt-1 h-5 w-5 shrink-0 accent-zero11-red-600" />
            </label>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 px-6 py-4">
          <button type="button" class="text-sm font-medium text-zero11-black/60 hover:text-zero11-black" @click="rejectAll">
            Reject Non-Essential
          </button>
          <div class="flex gap-3">
            <button type="button" class="rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-zero11-black hover:bg-black/5" @click="savePreferences">
              Save Preferences
            </button>
            <button type="button" class="rounded-full bg-zero11-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zero11-red-700" @click="acceptAll">
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
