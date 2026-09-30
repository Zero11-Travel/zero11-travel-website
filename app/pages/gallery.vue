<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Photo Gallery | Zero11 Travel & Tours',
  ogTitle: 'Photo Gallery | Zero11 Travel & Tours',
  description: 'Photos from Zero11 tours across South Africa — Johannesburg and Soweto, the Cradle of Humankind, Mpumalanga scenery, safari wildlife and our fleet.',
  ogDescription: 'Photos from Zero11 tours across South Africa — Johannesburg and Soweto, the Cradle of Humankind, Mpumalanga scenery, safari wildlife and our fleet.',
  twitterTitle: 'Photo Gallery | Zero11 Travel & Tours',
  twitterDescription: 'Photos from our tours across South Africa.',
})

const categories = ['All', ...new Set(photos.map(p => p.category))]
const active = ref('All')
const visible = computed(() => active.value === 'All' ? photos : photos.filter(p => p.category === active.value))

const dialog = ref<HTMLDialogElement | null>(null)
const current = ref(0)
const currentPhoto = computed(() => visible.value[current.value])
let opener: HTMLElement | null = null

function open(index: number, event: Event) {
  opener = event.currentTarget as HTMLElement
  current.value = index
  dialog.value?.showModal()
}
function close() {
  dialog.value?.close()
}
function step(delta: number) {
  const n = visible.value.length
  current.value = (current.value + delta + n) % n
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}
function onClose() {
  opener?.focus()
}
function onBackdrop(e: MouseEvent) {
  if (e.target === dialog.value) close()
}
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Gallery</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Africa Awaits</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-white/70">
          A look at the places, wildlife and vehicles that make up a journey with Zero11.
        </p>
      </div>
    </section>

    <section class="bg-white py-16">
      <div class="mx-auto max-w-7xl px-6">
        <div class="mb-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter photos by category">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :aria-pressed="active === category"
            class="rounded-full border px-4 py-2 text-sm font-medium transition-colors"
            :class="active === category
              ? 'border-zero11-red-600 bg-zero11-red-600 text-white'
              : 'border-black/10 bg-white text-zero11-black/70 hover:border-zero11-red-600 hover:text-zero11-red-600'"
            @click="active = category"
          >
            {{ category }}
          </button>
        </div>

        <ul class="columns-2 gap-4 sm:columns-3 lg:columns-4">
          <li v-for="(photo, index) in visible" :key="photo.slug" class="mb-4 break-inside-avoid">
            <button
              type="button"
              class="group relative block w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zero11-red-600"
              :aria-label="`View larger: ${photo.caption}`"
              @click="open(index, $event)"
            >
              <AppPhoto :slug="photo.slug" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" class="h-auto w-full transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-left text-xs font-medium text-white">
                {{ photo.caption }}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </section>

    <dialog
      ref="dialog"
      class="m-auto max-h-[95vh] w-[95vw] max-w-5xl overflow-visible rounded-2xl bg-zero11-black p-0 text-white backdrop:bg-black/85"
      aria-label="Photo viewer"
      @keydown="onKey"
      @close="onClose"
      @click="onBackdrop"
    >
      <div v-if="currentPhoto" class="relative flex flex-col items-center p-4">
        <img
          :key="currentPhoto.slug"
          :src="`/images/photos/${currentPhoto.slug}.webp`"
          :alt="currentPhoto.alt"
          class="max-h-[80vh] w-auto max-w-full rounded-lg object-contain"
        >
        <p class="mt-3 text-sm text-white/80" aria-live="polite">
          {{ currentPhoto.caption }} <span class="text-white/50">· {{ current + 1 }} / {{ visible.length }}</span>
        </p>
        <button type="button" class="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 hover:bg-black/80" aria-label="Close viewer" @click="close">
          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <button type="button" class="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 hover:bg-black/80" aria-label="Previous photo" @click="step(-1)">
          <ChevronLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <button type="button" class="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 hover:bg-black/80" aria-label="Next photo" @click="step(1)">
          <ChevronRightIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </dialog>

    <CTABanner
      title="Ready to make your own memories?"
      subtitle="Tell us where you want to go and we'll take care of the rest."
      cta-label="Plan My Trip"
    />
  </div>
</template>
