<script setup lang="ts">
import {
  MapIcon,
  UsersIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  SunIcon,
  GlobeAltIcon,
  GlobeEuropeAfricaIcon,
  BeakerIcon,
} from '@heroicons/vue/24/outline'

useHead({
  title: 'Tours & Sightseeing | Zero11 Travel & Tours',
  meta: [
    { name: 'description', content: 'Tailor-made tours to Johannesburg, Soweto, the Apartheid Museum, Gold Reef City, Sun City, Pilanesberg, Cradle of Humankind and Big Five safaris across South Africa.' },
  ],
})

const tours = [
  { icon: MapIcon, region: 'Johannesburg', title: 'Johannesburg City Tour', description: 'Explore the vibrant African "City of Gold" — a mixture of cultures surrounded by tranquil suburbs.', variant: 'red' as const },
  { icon: UsersIcon, region: 'Soweto', title: 'Soweto Tour', description: 'Visit Mandela House and discover the township established in 1930, home to four million people and rich in history.', variant: 'orange' as const },
  { icon: BuildingLibraryIcon, region: 'Johannesburg', title: 'Apartheid Museum', description: 'An illustration of apartheid and 20th-century South African history, part of the Gold Reef City complex.', variant: 'black' as const },
  { icon: BuildingLibraryIcon, region: 'Johannesburg', title: 'Constitutional Hill', description: "A journey through South Africa's constitutional and human rights history at a site of profound significance.", variant: 'red' as const },
  { icon: SparklesIcon, region: 'Johannesburg', title: 'Gold Reef City', description: 'Discover the history of the gold rush and the lifestyle of early mine workers, plus a theme park for the family.', variant: 'orange' as const },
  { icon: SunIcon, region: 'North West', title: 'Sun City', description: 'South Africa\'s premier holiday resort since 1979 — home to the Valley of Waves and bordering Pilanesberg National Park.', variant: 'black' as const },
  { icon: GlobeAltIcon, region: 'North West', title: 'Pilanesberg National Park', description: 'One of South Africa\'s largest parks, covering 55,000 hectares with excellent Big Five game viewing.', variant: 'red' as const },
  { icon: GlobeEuropeAfricaIcon, region: 'Gauteng', title: 'Cradle of Humankind', description: 'A UNESCO World Heritage Site showcasing millions of years of human origins.', variant: 'orange' as const },
  { icon: BeakerIcon, region: 'Mpumalanga & Beyond', title: 'Safari Getaways', description: 'Kruger National Park, Madikwe, Mabula and Entabeni — unforgettable Big Five safari experiences.', variant: 'black' as const },
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Day Excursions &amp; Safaris</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Tours &amp; Sightseeing</h1>
        <p class="mt-5 text-lg text-white/70">
          We cater for any travel request within Southern Africa and neighbouring
          countries — educational tours, heritage sites, theme parks and Big Five safaris.
        </p>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TourCard v-for="tour in tours" :key="tour.title" v-bind="tour" />
        </div>
      </div>
    </section>

    <CTABanner
      title="Every tour is tailor-made"
      subtitle="Tell us the experience you're after and we'll build the itinerary around you."
      cta-label="Plan My Tour"
    />
  </div>
</template>
