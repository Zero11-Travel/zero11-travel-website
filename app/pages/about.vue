<script setup lang="ts">
import { HeartIcon, ShieldCheckIcon, ClockIcon, CheckBadgeIcon, CheckIcon } from '@heroicons/vue/24/outline'

useHead({
  title: 'About Us | Zero11 Travel & Tours',
  meta: [
    { name: 'description', content: 'Zero11 Tours and Transfers (Pty) Ltd — a 100% black-owned, B-BBEE Level 1 travel company based in Midrand, Johannesburg, led by Director Kgothatso Shogole.' },
  ],
})

const values = [
  { icon: HeartIcon, title: 'Passion', description: 'We love what we do, and it shows in every trip.' },
  { icon: ShieldCheckIcon, title: 'Safety', description: 'Your safety is the foundation of every journey we plan.' },
  { icon: ClockIcon, title: 'Reliability', description: 'On time, every time — you can count on us.' },
  { icon: CheckBadgeIcon, title: 'Professionalism', description: 'Dedicated, experienced drivers who represent our brand with pride.' },
]

const companyFacts = [
  ['Legal Name', 'Zero11 Tours and Transfers (Pty) Ltd'],
  ['Registration Number', '2018/341872/07'],
  ['Discipline', 'Tour Operator'],
  ['Director', 'Kgothatso Shogole'],
  ['Ownership', '100% owned by Kgothatso Shogole'],
  ['B-BBEE Rating', 'Level 1 — Exempt Micro Enterprise (EME)'],
  ['Operating Cities', 'Johannesburg, Durban, Cape Town'],
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">About Zero11</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">
          Your Global Travel Companion
        </h1>
        <p class="mt-5 text-lg text-white/70">
          An inbound tour operating company based in Johannesburg, South Africa —
          proudly serving corporate and leisure travellers since 2018.
        </p>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <h2 class="mb-4 font-heading text-2xl font-bold text-zero11-black">Our Story</h2>
          <p class="mb-4 text-base leading-relaxed text-zero11-black/70">
            Zero11 Tours &amp; Transfers is an inbound tour operating company based in
            Johannesburg, South Africa. We specialise in day excursions and
            transport solutions for corporate and industrial clients, with a
            presence in Johannesburg, Durban and Cape Town.
          </p>
          <p class="mb-4 text-base leading-relaxed text-zero11-black/70">
            We offer chauffeur, shuttle, transfer and tour services on a
            tailor-made basis, in line with each client's requirements — an
            upmarket, highly efficient service with a dedicated vehicle and
            professional driver, always focused on competitive pricing and
            cost-saving for our clients.
          </p>
          <p class="text-base leading-relaxed text-zero11-black/70">
            We strive to be a company of good service excellence in the travel
            industry, providing peace of mind to our reputable customers through
            innovation, service, quality and self-improvement.
          </p>
        </div>

        <div class="rounded-2xl border border-black/5 bg-zero11-red-50/40 p-8">
          <h2 class="mb-6 font-heading text-xl font-bold text-zero11-black">Company Profile</h2>
          <dl class="space-y-4">
            <div v-for="[term, value] in companyFacts" :key="term" class="flex flex-col gap-0.5 border-b border-black/5 pb-3 last:border-0 sm:flex-row sm:justify-between">
              <dt class="text-sm text-zero11-black/50">{{ term }}</dt>
              <dd class="text-sm font-medium text-zero11-black sm:text-right">{{ value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="bg-zero11-red-50/40 py-20">
      <div class="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Batho Pele — People First" title="Our Values" />
        <div class="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          <ValueCard v-for="value in values" :key="value.title" v-bind="value" />
        </div>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Transformation" title="Economic Empowerment" align="left" />
        <p class="mt-6 text-base leading-relaxed text-zero11-black/70">
          Zero11 Tours &amp; Transfers fully complies with the National
          Government's policies of Transformation, Black Economic Empowerment,
          Gender Equality and Community Development. As a responsible corporate
          entity, we ensure to meet and exceed these requirements without
          compromising on quality and deliverables.
        </p>
        <ul class="mt-6 space-y-3">
          <li class="flex items-start gap-2.5 text-base text-zero11-black/70">
            <CheckIcon class="mt-0.5 h-5 w-5 shrink-0 text-zero11-red-600" aria-hidden="true" />
            100% B-BBEE Ownership — held by a Historically Disadvantaged Individual
          </li>
          <li class="flex items-start gap-2.5 text-base text-zero11-black/70">
            <CheckIcon class="mt-0.5 h-5 w-5 shrink-0 text-zero11-red-600" aria-hidden="true" />
            The Director is closely involved in day-to-day activities and decision-making
          </li>
          <li class="flex items-start gap-2.5 text-base text-zero11-black/70">
            <CheckIcon class="mt-0.5 h-5 w-5 shrink-0 text-zero11-red-600" aria-hidden="true" />
            A representative committee monitors and adapts our transformation programme
          </li>
        </ul>
      </div>
    </section>

    <CTABanner
      title="Let's plan your next journey together"
      subtitle="Reach out to our team for a tailor-made quote."
      cta-label="Contact Us"
    />
  </div>
</template>
