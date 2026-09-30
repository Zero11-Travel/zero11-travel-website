<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}>(), {
  align: 'center',
  dark: false,
})
</script>

<template>
  <div :class="['mx-auto max-w-2xl', align === 'center' ? 'text-center' : 'text-left']">
    <p v-if="eyebrow" class="mb-2 text-sm font-semibold uppercase tracking-wide" :class="dark ? 'text-zero11-orange-500' : 'text-zero11-red-600'">
      {{ eyebrow }}
    </p>
    <h2 class="font-heading text-3xl font-bold sm:text-4xl" :class="dark ? 'text-white' : 'text-zero11-black'">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="mt-4 text-base leading-relaxed" :class="dark ? 'text-white/70' : 'text-zero11-black/60'">
      {{ subtitle }}
    </p>
  </div>
</template>
