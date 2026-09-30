<script setup lang="ts">
import { ref } from 'vue'
import { Bars3Icon, XMarkIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'

const isMenuOpen = ref(false)
const route = useRoute()

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Tours', to: '/tours' },
  { label: 'Fleet', to: '/fleet' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

function closeMenu() {
  isMenuOpen.value = false
}

watch(() => route.fullPath, closeMenu)
</script>

<template>
  <header class="sticky top-0 z-50 w-full">
    <!-- Top utility bar -->
    <div class="hidden bg-zero11-black text-white sm:block">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm">
        <div class="flex items-center gap-5">
          <a href="tel:+27768735815" class="flex items-center gap-1.5 transition-colors hover:text-zero11-orange-500">
            <PhoneIcon class="h-4 w-4" aria-hidden="true" />
            <span>+27 76 873 5815</span>
          </a>
          <a href="mailto:kgothatso@zero11travel.co.za" class="hidden items-center gap-1.5 transition-colors hover:text-zero11-orange-500 md:flex">
            <EnvelopeIcon class="h-4 w-4" aria-hidden="true" />
            <span>kgothatso@zero11travel.co.za</span>
          </a>
        </div>
        <p class="text-white/70">Johannesburg · Durban · Cape Town</p>
      </div>
    </div>

    <!-- Main nav -->
    <div class="border-b border-black/5 bg-white/95 backdrop-blur">
      <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-3" aria-label="Primary">
        <NuxtLink to="/" class="flex items-center gap-2" aria-label="Zero11 Travel & Tours home">
          <img src="/images/logo.svg" alt="Zero11 Travel & Tours" width="192" height="101" class="h-12 w-auto object-contain sm:h-14" />
        </NuxtLink>

        <ul class="hidden items-center gap-8 lg:flex">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm font-medium text-zero11-black/80 transition-colors hover:text-zero11-red-600"
              active-class="text-zero11-red-600"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <div class="hidden lg:block">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center rounded-full bg-zero11-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zero11-red-700"
          >
            Book Now
          </NuxtLink>
        </div>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-md text-zero11-black lg:hidden"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <Bars3Icon v-if="!isMenuOpen" class="h-7 w-7" aria-hidden="true" />
          <XMarkIcon v-else class="h-7 w-7" aria-hidden="true" />
        </button>
      </nav>

      <!-- Mobile menu -->
      <div
        v-show="isMenuOpen"
        id="mobile-menu"
        class="border-t border-black/5 bg-white shadow-lg lg:hidden"
      >
        <ul class="flex flex-col px-6 pb-8 pt-4">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block py-3 text-base font-medium text-zero11-black/80 transition-colors hover:text-zero11-red-600"
              active-class="text-zero11-red-600"
              @click="closeMenu"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
          <li class="pt-2">
            <NuxtLink
              to="/contact"
              class="block w-full rounded-full bg-zero11-red-600 px-5 py-3 text-center text-sm font-semibold text-white"
              @click="closeMenu"
            >
              Book Now
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
