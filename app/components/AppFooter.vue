<script setup lang="ts">
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/vue/24/outline'

const year = new Date().getFullYear()

const quickLinks = [
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Tours', to: '/tours' },
  { label: 'Our Fleet', to: '/fleet' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const services = [
  'Airport Transfers',
  'Chauffeur Drive',
  'Point-to-Point',
  'Corporate Shuttle',
  'Tours & Sightseeing',
]
</script>

<template>
  <footer class="bg-zero11-black text-white/80">
    <div class="mx-auto max-w-7xl px-6 py-14">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/images/logo.jpeg" alt="Zero11 Travel & Tours" class="mb-4 h-14 w-auto rounded bg-white object-contain p-1" />
          <p class="text-sm leading-relaxed text-white/60">
            Your global travel companion... Africa awaits! Safe, reliable and
            professional chauffeur drive, airport transfers, shuttle services and
            tours across South Africa.
          </p>
        </div>

        <div>
          <h3 class="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white">Quick Links</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink :to="link.to" class="transition-colors hover:text-zero11-orange-500">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white">Services</h3>
          <ul class="space-y-2.5 text-sm text-white/60">
            <li v-for="service in services" :key="service">{{ service }}</li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 font-heading text-sm font-semibold uppercase tracking-wide text-white">Get In Touch</h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-start gap-2.5">
              <MapPinIcon class="mt-0.5 h-5 w-5 shrink-0 text-zero11-orange-500" aria-hidden="true" />
              <span class="text-white/60">9077 Ivory Park, Sisonke Street, Midrand, 1682</span>
            </li>
            <li class="flex items-center gap-2.5">
              <PhoneIcon class="h-5 w-5 shrink-0 text-zero11-orange-500" aria-hidden="true" />
              <a href="tel:+27768735815" class="transition-colors hover:text-zero11-orange-500">+27 76 873 5815</a>
            </li>
            <li class="flex items-center gap-2.5">
              <EnvelopeIcon class="h-5 w-5 shrink-0 text-zero11-orange-500" aria-hidden="true" />
              <a href="mailto:kgothatso@zero11travel.co.za" class="break-all transition-colors hover:text-zero11-orange-500">kgothatso@zero11travel.co.za</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-white/50 sm:flex-row">
        <p>&copy; {{ year }} Zero11 Tours and Transfers (Pty) Ltd. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <NuxtLink to="/privacy-policy" class="transition-colors hover:text-zero11-orange-500">Privacy Policy</NuxtLink>
          <span>Reg. 2018/341872/07 &middot; B-BBEE Level 1</span>
        </div>
      </div>
    </div>
  </footer>
</template>
