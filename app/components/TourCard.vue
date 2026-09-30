<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { MapPinIcon } from '@heroicons/vue/24/outline'

withDefaults(defineProps<{
  icon: FunctionalComponent
  title: string
  region: string
  description: string
  variant?: 'red' | 'orange' | 'black'
  photo?: string
}>(), {
  variant: 'red',
  photo: undefined,
})

const gradients: Record<string, string> = {
  red: 'from-zero11-red-600 to-zero11-red-800',
  orange: 'from-zero11-orange-600 to-zero11-red-700',
  black: 'from-zero11-black to-zero11-red-900',
}
</script>

<template>
  <article class="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md">
    <AppPhoto v-if="photo" :slug="photo" class="h-44 w-full object-cover" />
    <div v-else :class="['flex h-44 items-center justify-center bg-gradient-to-br', gradients[variant]]">
      <component :is="icon" class="h-12 w-12 text-white/90" aria-hidden="true" />
    </div>
    <div class="p-6">
      <p class="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zero11-orange-600">
        <MapPinIcon class="h-4 w-4" aria-hidden="true" />
        {{ region }}
      </p>
      <h3 class="mb-2 font-heading text-lg font-semibold text-zero11-black">
        {{ title }}
      </h3>
      <p class="text-sm leading-relaxed text-zero11-black/60">
        {{ description }}
      </p>
    </div>
  </article>
</template>
