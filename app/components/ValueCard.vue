<script setup lang="ts">
import type { FunctionalComponent } from 'vue'

defineProps<{
  icon: FunctionalComponent
  title: string
  description: string
}>()
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zero11-red-50 text-zero11-red-600">
      <component :is="icon" class="h-8 w-8" aria-hidden="true" />
    </div>
    <h3 class="mb-1.5 font-heading text-base font-semibold text-zero11-black">{{ title }}</h3>
    <p class="text-sm leading-relaxed text-zero11-black/60">{{ description }}</p>
  </div>
</template>
