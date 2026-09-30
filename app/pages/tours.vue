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
  AcademicCapIcon,
  PencilSquareIcon,
  FireIcon,
} from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Tours & Sightseeing | Zero11 Travel & Tours',
  ogTitle: 'Tours & Sightseeing | Zero11 Travel & Tours',
  description: 'Tailor-made tours to Johannesburg, Soweto, the Apartheid Museum, Gold Reef City, Sun City, Pilanesberg, Cradle of Humankind and Big Five safaris across South Africa.',
  ogDescription: 'Tailor-made tours to Johannesburg, Soweto, the Apartheid Museum, Gold Reef City, Sun City, Pilanesberg, Cradle of Humankind and Big Five safaris across South Africa.',
  twitterTitle: 'Tours & Sightseeing | Zero11 Travel & Tours',
  twitterDescription: 'Tailor-made tours across South Africa — city tours, heritage sites and Big Five safaris.',
})

const tours = [
  { icon: MapIcon, region: 'Johannesburg', title: 'Johannesburg City Tour', description: 'Explore the vibrant African "City of Gold" — a mixture of cultures surrounded by tranquil suburbs.', variant: 'red' as const, photo: 'johannesburg-skyline' },
  { icon: UsersIcon, region: 'Soweto', title: 'Soweto Tour', description: 'Visit Mandela House and discover the township established in 1930, home to four million people and rich in history.', variant: 'orange' as const, photo: 'soweto-towers' },
  { icon: BuildingLibraryIcon, region: 'Johannesburg', title: 'Apartheid Museum', description: 'An illustration of apartheid and 20th-century South African history, part of the Gold Reef City complex.', variant: 'black' as const },
  { icon: BuildingLibraryIcon, region: 'Johannesburg', title: 'Constitutional Hill', description: "A journey through South Africa's constitutional and human rights history at a site of profound significance.", variant: 'red' as const },
  { icon: SparklesIcon, region: 'Johannesburg', title: 'Gold Reef City', description: 'Discover the history of the gold rush and the lifestyle of early mine workers, plus a theme park for the family.', variant: 'orange' as const },
  { icon: SunIcon, region: 'North West', title: 'Sun City', description: 'South Africa\'s premier holiday resort since 1979 — home to the Valley of Waves and bordering Pilanesberg National Park.', variant: 'black' as const },
  { icon: GlobeAltIcon, region: 'North West', title: 'Pilanesberg National Park', description: 'One of South Africa\'s largest parks, covering 55,000 hectares with excellent Big Five game viewing.', variant: 'red' as const, photo: 'rhino-game-viewing' },
  { icon: GlobeEuropeAfricaIcon, region: 'Gauteng', title: 'Cradle of Humankind', description: 'A UNESCO World Heritage Site showcasing millions of years of human origins.', variant: 'orange' as const, photo: 'maropeng-cradle-of-humankind' },
  { icon: BeakerIcon, region: 'Mpumalanga & Beyond', title: 'Safari Getaways', description: 'Kruger National Park, Madikwe, Mabula and Entabeni — unforgettable Big Five safari experiences.', variant: 'black' as const, photo: 'game-drive-vehicle' },
  { icon: FireIcon, region: 'Gauteng', title: 'Lion Park', description: 'See lions and other carnivores like cheetahs, hyenas and wild dogs up close, with a stop at Cub World to meet the lion cubs.', variant: 'red' as const, photo: 'lionesses' },
  { icon: AcademicCapIcon, region: 'Gauteng & Beyond', title: 'Educational Tours', description: 'Learning-focused excursions to heritage sites and museums, arranged for school, university and group travellers.', variant: 'orange' as const },
  { icon: PencilSquareIcon, region: 'Tailor-Made', title: 'Your Own Itinerary', description: "Don't see what you're after? Tell us what you'd like to experience and we'll design a day around it.", variant: 'black' as const },
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Day Excursions &amp; Safaris</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Tours &amp; Sightseeing</h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-white/70">
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

    <section class="bg-zero11-red-50/40 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="text-base text-zero11-black/70">
          Want to see more of what awaits? Browse our
          <NuxtLink to="/gallery" class="font-semibold text-zero11-red-600 underline underline-offset-4 hover:text-zero11-red-700">photo gallery</NuxtLink>.
        </p>
      </div>
    </section>

    <CTABanner
      title="Every tour is tailor-made"
      subtitle="Tell us the experience you're after and we'll build the itinerary around you."
      cta-label="Plan My Tour"
    />
  </div>
</template>
