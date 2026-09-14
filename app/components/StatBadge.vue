<script setup lang="ts">
defineProps<{
  value: string
  label: string
}>()
</script>

<template>
  <div class="text-center">
    <p class="font-heading text-3xl font-bold text-white sm:text-4xl">{{ value }}</p>
    <p class="mt-1 text-sm text-white/70">{{ label }}</p>
  </div>
</template>
