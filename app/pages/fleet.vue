<script setup lang="ts">
import { TruckIcon, UserGroupIcon, SparklesIcon } from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Our Fleet | Zero11 Travel & Tours',
  ogTitle: 'Our Fleet | Zero11 Travel & Tours',
  description: 'A well-maintained fleet including sedans, executive Mercedes-Benz vehicles and shuttle vans for airport transfers, chauffeur drive and tours.',
  ogDescription: 'A well-maintained fleet including sedans, executive Mercedes-Benz vehicles and shuttle vans for airport transfers, chauffeur drive and tours.',
  twitterTitle: 'Our Fleet | Zero11 Travel & Tours',
  twitterDescription: 'Sedans, executive Mercedes-Benz vehicles and shuttle vans for every trip.',
})

const fleet = [
  {
    icon: TruckIcon,
    name: 'Sedan',
    passengers: 'Individuals & small groups',
    photo: 'fleet-sedans',
    description: 'Comfortable sedans such as the Toyota Corolla Quest — ideal for point-to-point transfers and airport runs.',
    features: ['Bottled water', 'Reading material', 'Umbrellas in the rainy season'],
  },
  {
    icon: SparklesIcon,
    name: 'Executive Sedan',
    passengers: 'Executive travel',
    description: 'A Mercedes-Benz C-Class with a professional chauffeur, for clients who expect an upmarket, premium experience.',
    features: ['Dedicated chauffeur', 'Wi-Fi on board', 'Bottled water & reading material'],
  },
  {
    icon: UserGroupIcon,
    name: 'Shuttle Van',
    passengers: 'Groups & corporate travel',
    photo: 'fleet-shuttle-vans',
    description: 'Hyundai H-1 Wagon and passenger shuttle vans for corporate groups, tours and larger travel parties.',
    features: ['Group-friendly seating', 'Luggage space', 'Trailers on request (extra charge)'],
  },
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Our Vehicles</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">A Fleet You Can Trust</h1>
        <p class="mt-5 text-lg text-white/70">
          From point-to-point sedans to group shuttles, every vehicle in our fleet
          is maintained to the highest standard of safety and comfort.
        </p>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FleetCard v-for="vehicle in fleet" :key="vehicle.name" v-bind="vehicle" />
        </div>
      </div>
    </section>

    <CTABanner
      title="Not sure which vehicle you need?"
      subtitle="Tell us your group size and route and we'll recommend the best fit."
      cta-label="Ask Us"
    />
  </div>
</template>
