<script setup lang="ts">
import type { FunctionalComponent } from 'vue'
import { CheckIcon } from '@heroicons/vue/24/solid'

defineProps<{
  icon: FunctionalComponent
  name: string
  passengers: string
  description: string
  features: string[]
}>()
</script>

<template>
  <article class="flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <div class="mb-4 flex items-center gap-4">
      <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-zero11-black text-zero11-orange-500">
        <component :is="icon" class="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <h3 class="font-heading text-lg font-semibold text-zero11-black">{{ name }}</h3>
        <p class="text-sm text-zero11-black/50">{{ passengers }}</p>
      </div>
    </div>
    <p class="mb-4 text-sm leading-relaxed text-zero11-black/60">
      {{ description }}
    </p>
    <ul class="mt-auto space-y-2">
      <li v-for="feature in features" :key="feature" class="flex items-center gap-2 text-sm text-zero11-black/70">
        <CheckIcon class="h-4 w-4 shrink-0 text-zero11-red-600" aria-hidden="true" />
        {{ feature }}
      </li>
    </ul>
  </article>
</template>
