<script setup lang="ts">
const props = withDefaults(defineProps<{
  slug: string
  sizes?: string
  eager?: boolean
  alt?: string
}>(), {
  sizes: '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw',
  eager: false,
  alt: undefined,
})

const photo = computed(() => getPhoto(props.slug))
</script>

<template>
  <img
    :src="`/images/photos/${photo.slug}.webp`"
    :srcset="`/images/photos/${photo.slug}-sm.webp 640w, /images/photos/${photo.slug}.webp ${Math.min(photo.width, 1280)}w`"
    :sizes="sizes"
    :alt="alt ?? photo.alt"
    :width="photo.width"
    :height="photo.height"
    :loading="eager ? 'eager' : 'lazy'"
    :fetchpriority="eager ? 'high' : undefined"
    decoding="async"
  >
</template>
