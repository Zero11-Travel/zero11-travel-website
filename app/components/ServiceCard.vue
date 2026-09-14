<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

defineProps<{
  icon: FunctionalComponent
  title: string
  description: string
}>()
</script>

<template>
  <div class="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zero11-red-50 text-zero11-red-600 transition-colors group-hover:bg-zero11-red-600 group-hover:text-white">
      <component :is="icon" class="h-6 w-6" aria-hidden="true" />
    </div>
    <h3 class="mb-2 font-heading text-lg font-semibold text-zero11-black">
      {{ title }}
    </h3>
    <p class="text-sm leading-relaxed text-zero11-black/60">
      {{ description }}
    </p>
  </div>
</template>
