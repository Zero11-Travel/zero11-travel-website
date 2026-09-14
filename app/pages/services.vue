<script setup lang="ts">
import {
  PaperAirplaneIcon,
  TruckIcon,
  MapPinIcon,
  HomeIcon,
  BuildingOffice2Icon,
  MapIcon,
  WifiIcon,
  BeakerIcon,
  BookOpenIcon,
  CloudIcon,
} from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Our Services | Zero11 Travel & Tours',
  ogTitle: 'Our Services | Zero11 Travel & Tours',
  description: 'Chauffeur drivers, point-to-point and door-to-door transfers, corporate shuttle services and tailor-made tours from Zero11 Travel & Tours.',
  ogDescription: 'Chauffeur drivers, point-to-point and door-to-door transfers, corporate shuttle services and tailor-made tours from Zero11 Travel & Tours.',
  twitterTitle: 'Our Services | Zero11 Travel & Tours',
  twitterDescription: 'Chauffeur drivers, transfers, corporate shuttle services and tailor-made tours.',
})

const services = [
  { icon: PaperAirplaneIcon, title: 'Airport Transfers', description: 'Dependable pickups and drop-offs for OR Tambo, King Shaka and Cape Town International — flight-time monitored so you\'re never left waiting.' },
  { icon: TruckIcon, title: 'Chauffeur Drive', description: 'A dedicated vehicle and professional driver assigned to you for the duration of your trip, giving you the freedom to work or relax while we drive.' },
  { icon: MapPinIcon, title: 'Point-to-Point', description: 'Efficient, direct transfers between any two locations, priced competitively to help you save on travel costs.' },
  { icon: HomeIcon, title: 'Door-to-Door', description: 'Convenient collection and drop-off at your exact address — no need to arrange your own transport to a pickup point.' },
  { icon: BuildingOffice2Icon, title: 'Corporate Shuttle Services', description: 'Scheduled shuttle transport for corporate and industrial clients across Johannesburg, Durban and Cape Town.' },
  { icon: MapIcon, title: 'Tours & Sightseeing', description: 'Tailor-made day tours and multi-day itineraries covering Johannesburg, Soweto, Sun City, Pilanesberg, Kruger and more.' },
]

const extras = [
  { icon: WifiIcon, label: 'Wi-Fi on board' },
  { icon: BeakerIcon, label: 'Bottled water' },
  { icon: BookOpenIcon, label: 'Reading material' },
  { icon: CloudIcon, label: 'Umbrellas for rainy season' },
  { icon: TruckIcon, label: 'Trailers (on request, extra charge)' },
  { icon: HomeIcon, label: 'Baby seats (on request, extra charge)' },
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">What We Offer</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Our Services</h1>
        <p class="mt-5 text-lg text-white/70">
          An upmarket, highly efficient transfer and chauffeur service — tailor-made
          to your requirements, with a strong focus on cost-effective, safe travel.
        </p>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="service in services" :key="service.title" v-bind="service" />
        </div>
      </div>
    </section>

    <section class="bg-zero11-red-50/40 py-20">
      <div class="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow="Value-Added" title="Included With Every Trip" subtitle="Small touches that make a big difference on the road." />
        <div class="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3">
          <div v-for="extra in extras" :key="extra.label" class="flex flex-col items-center gap-3 rounded-xl bg-white p-5 text-center shadow-sm">
            <component :is="extra.icon" class="h-7 w-7 text-zero11-red-600" aria-hidden="true" />
            <p class="text-sm font-medium text-zero11-black/80">{{ extra.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <CTABanner
      title="Need a tailor-made travel solution?"
      subtitle="Tell us your requirements and we'll put together a competitive, tailor-made quote."
      cta-label="Request a Quote"
    />
  </div>
</template>
