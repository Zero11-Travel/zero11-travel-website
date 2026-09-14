<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>(), {
  align: 'center',
})
</script>

<template>
  <div :class="['mx-auto max-w-2xl', align === 'center' ? 'text-center' : 'text-left']">
    <p v-if="eyebrow" class="mb-2 text-sm font-semibold uppercase tracking-wide text-zero11-red-600">
      {{ eyebrow }}
    </p>
    <h2 class="font-heading text-3xl font-bold text-zero11-black sm:text-4xl">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base leading-relaxed text-zero11-black/60">
      {{ subtitle }}
    </p>
  </div>
</template>
