<script setup lang="ts">
import {
  PaperAirplaneIcon,
  TruckIcon,
  MapPinIcon,
  BuildingOffice2Icon,
  MapIcon,
  BuildingLibraryIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckBadgeIcon,
  UsersIcon,
  SunIcon,
  PhoneIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

useHead({
  title: 'Zero11 Travel & Tours | Airport Transfers, Chauffeur Drive & Tours in South Africa',
})

const services = [
  { icon: PaperAirplaneIcon, title: 'Airport Transfers', description: 'Reliable, on-time transfers to and from OR Tambo, King Shaka and Cape Town International.' },
  { icon: TruckIcon, title: 'Chauffeur Drive', description: 'A dedicated vehicle and professional driver, tailored to your schedule and requirements.' },
  { icon: MapPinIcon, title: 'Point-to-Point', description: 'Door-to-door transfers across Johannesburg, Durban and Cape Town at competitive rates.' },
  { icon: BuildingOffice2Icon, title: 'Corporate Shuttle', description: 'Dependable shuttle services for corporate and industrial clients, built around your business.' },
  { icon: MapIcon, title: 'Tours & Sightseeing', description: 'Tailor-made day tours to Soweto, Sun City, Pilanesberg, Kruger and more.' },
  { icon: BuildingLibraryIcon, title: 'Hotel & Lodge Booking', description: 'End-to-end booking support for accommodation and tourist attractions.' },
]

const tours = [
  { icon: MapIcon, region: 'Johannesburg', title: 'Johannesburg City Tour', description: 'Explore the City of Gold — a vibrant mix of cultures and tranquil suburbs.', variant: 'red' as const },
  { icon: UsersIcon, region: 'Soweto', title: 'Soweto Heritage Tour', description: "Visit Mandela House and experience Soweto's rich history and culture.", variant: 'orange' as const },
  { icon: SunIcon, region: 'North West', title: 'Sun City & Pilanesberg', description: 'Valley of Waves and Big Five game viewing, two hours from Johannesburg.', variant: 'black' as const },
]

const values = [
  { icon: HeartIcon, title: 'Passion', description: 'We love what we do, and it shows in every trip.' },
  { icon: ShieldCheckIcon, title: 'Safety', description: 'Your safety is the foundation of every journey we plan.' },
  { icon: ClockIcon, title: 'Reliability', description: 'On time, every time — you can count on us.' },
  { icon: CheckBadgeIcon, title: 'Professionalism', description: 'Dedicated, experienced drivers who represent our brand with pride.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-zero11-black">
      <div class="absolute inset-0 bg-gradient-to-br from-zero11-red-900/90 via-zero11-black to-zero11-black" />
      <div class="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-zero11-orange-600/20 blur-3xl" />
      <div class="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-24 text-center sm:py-32">
        <p class="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-zero11-orange-400">
          Johannesburg &middot; Durban &middot; Cape Town
        </p>
        <h1 class="max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          Your Global Travel Companion.
          <span class="text-zero11-orange-500">Africa Awaits.</span>
        </h1>
        <p class="max-w-2xl text-lg text-white/70">
          Safe, reliable and professional airport transfers, chauffeur drive and
          tailor-made tours — try us, take the back seat while we drive you.
        </p>
        <div class="flex flex-col gap-4 sm:flex-row">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-zero11-red-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-zero11-red-700"
          >
            Book a Transfer
            <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
          <a
            href="tel:+27768735815"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <PhoneIcon class="h-4 w-4" aria-hidden="true" />
            +27 76 873 5815
          </a>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="bg-zero11-red-700">
      <div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-10 sm:grid-cols-4">
        <StatBadge value="2018" label="Established" />
        <StatBadge value="3" label="Cities Served" />
        <StatBadge value="Level 1" label="B-BBEE Rating" />
        <StatBadge value="10+" label="Tour Destinations" />
      </div>
    </section>

    <!-- Services -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Travel Services Built Around You"
          subtitle="Our traditional business model is based on the transportation of people within corporate and other industrial markets in South Africa — tailor-made to your requirements."
        />
        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard v-for="service in services" :key="service.title" v-bind="service" />
        </div>
        <div class="mt-10 text-center">
          <NuxtLink to="/services" class="inline-flex items-center gap-1 text-sm font-semibold text-zero11-red-600 hover:text-zero11-red-700">
            View all services
            <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Tours preview -->
    <section class="bg-zero11-red-50/40 py-20">
      <div class="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Popular Tours"
          title="See South Africa With Us"
          subtitle="From city orientation tours to Big Five safaris, we bring Africa's stories to life."
        />
        <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <TourCard v-for="tour in tours" :key="tour.title" v-bind="tour" />
        </div>
        <div class="mt-10 text-center">
          <NuxtLink to="/tours" class="inline-flex items-center gap-1 text-sm font-semibold text-zero11-red-600 hover:text-zero11-red-700">
            Explore all tours
            <ChevronRightIcon class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Batho Pele — People First" title="Why Clients Choose Zero11" />
        <div class="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <ValueCard v-for="value in values" :key="value.title" v-bind="value" />
        </div>
      </div>
    </section>

    <CTABanner
      title="Ready to travel with peace of mind?"
      subtitle="Get an affordable, tailor-made quote for your next transfer or tour today."
      cta-label="Get a Quote"
    />
  </div>
</template>
