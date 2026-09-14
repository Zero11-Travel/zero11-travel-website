<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  error: { statusCode: number; statusMessage?: string }
}>()

const isNotFound = props.error.statusCode === 404

function handleClear() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col font-body text-zero11-black">
    <div class="flex flex-1 items-center justify-center bg-zero11-black px-6 py-24 text-center">
      <div>
        <img src="/images/logo.jpeg" alt="Zero11 Travel & Tours" class="mx-auto mb-8 h-16 w-auto rounded bg-white p-1" />
        <p class="mb-3 font-heading text-6xl font-bold text-zero11-red-600">{{ error.statusCode }}</p>
        <h1 class="mb-4 font-heading text-2xl font-bold text-white">
          {{ isNotFound ? "This route doesn't exist" : 'Something went wrong' }}
        </h1>
        <p class="mx-auto mb-8 max-w-md text-white/60">
          {{ isNotFound
            ? "The page you're looking for may have moved. Let's get you back on the road."
            : "We hit a snag on our end. Please try again, or contact us directly if it persists." }}
        </p>
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-full bg-zero11-red-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zero11-red-700"
          @click="handleClear"
        >
          <HomeIcon class="h-4 w-4" aria-hidden="true" />
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template>
