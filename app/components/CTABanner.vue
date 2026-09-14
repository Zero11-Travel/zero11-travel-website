<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
}>(), {
  ctaLabel: 'Book Now',
  ctaTo: '/contact',
})
</script>

<template>
  <section class="bg-gradient-to-r from-zero11-red-700 via-zero11-red-600 to-zero11-orange-600 py-16">
    <div class="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
      <h2 class="font-heading text-2xl font-bold text-white sm:text-3xl">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="max-w-xl text-white/85">
        {{ subtitle }}
      </p>
      <NuxtLink
        :to="ctaTo"
        class="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-zero11-red-700 shadow-sm transition-transform hover:scale-105 motion-reduce:transition-none"
      >
        {{ ctaLabel }}
      </NuxtLink>
    </div>
  </section>
</template>
