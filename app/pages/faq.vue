<script setup lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline'

useSeoMeta({
  title: 'Frequently Asked Questions | Zero11 Travel & Tours',
  ogTitle: 'Frequently Asked Questions | Zero11 Travel & Tours',
  description: 'Answers to common questions about booking, payment, fleet, and services with Zero11 Travel & Tours.',
  ogDescription: 'Answers to common questions about booking, payment, fleet, and services with Zero11 Travel & Tours.',
  twitterTitle: 'Frequently Asked Questions | Zero11 Travel & Tours',
  twitterDescription: 'Answers to common questions about booking, payment and services.',
})

const faqs = [
  {
    question: 'What areas do you operate in?',
    answer: 'We\'re based in Midrand and operate across Johannesburg, Durban and Cape Town, with day tours further afield to destinations like Soweto, Sun City, Pilanesberg, the Cradle of Humankind and Kruger National Park.',
  },
  {
    question: 'What services do you offer?',
    answer: 'Airport transfers, chauffeur drive, point-to-point and door-to-door transfers, corporate shuttle services, tailor-made tours and sightseeing, and hotel/lodge booking assistance. See our Services page for full details.',
  },
  {
    question: 'What types of vehicles do you use?',
    answer: 'Our fleet includes comfortable sedans (such as the Toyota Corolla Quest), an executive Mercedes-Benz C-Class with a dedicated chauffeur, and shuttle vans (Hyundai H-1 Wagon, VW Kombi) for groups of up to 14 passengers.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept EFT and cash payments, and always aim to offer competitive, affordable rates.',
  },
  {
    question: 'What\'s included with my booking?',
    answer: 'Bottled water and reading material as standard, plus umbrellas during the rainy season. Trailers and baby seats are available on request for an additional charge.',
  },
  {
    question: 'How do I get a quote or make a booking?',
    answer: 'Reach out via phone, WhatsApp or our contact form with your travel details, and we\'ll come back to you with a tailor-made, competitive quote. We recommend booking as early as you can to help us guarantee your preferred vehicle and time.',
  },
  {
    question: 'Can you arrange transport for corporate groups?',
    answer: 'Yes — we provide corporate and industrial shuttle services across Johannesburg, Durban and Cape Town, tailored to your business\'s schedule and requirements.',
  },
  {
    question: 'Do you offer tours in addition to transfers?',
    answer: 'Yes. Popular options include the Johannesburg city tour, Soweto heritage tour, Apartheid Museum, Gold Reef City, Sun City & Pilanesberg, the Cradle of Humankind, and Big Five safaris to Kruger, Madikwe, Mabula and Entabeni. See our Tours page for the full list.',
  },
  {
    question: 'Is Zero11 a registered, BEE-compliant company?',
    answer: 'Yes. Zero11 Tours and Transfers (Pty) Ltd (registration 2018/341872/07) is a Level 1 B-BBEE Exempt Micro Enterprise, 100% owned by Director Kgothatso Shogole.',
  },
  {
    question: 'What if I need to change my booking?',
    answer: 'Get in touch with our team directly as soon as you can — we\'ll always do our best to accommodate changes to your booking.',
  },
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Common Questions</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Frequently Asked Questions</h1>
        <p class="mt-5 text-lg text-white/70">
          Can't find what you're looking for? Reach out on WhatsApp or via our contact form and we'll be happy to help.
        </p>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-3xl px-6">
        <div class="divide-y divide-black/10 rounded-2xl border border-black/10">
          <details v-for="faq in faqs" :key="faq.question" class="group px-6 py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-zero11-black marker:content-none">
              {{ faq.question }}
              <ChevronDownIcon class="h-5 w-5 shrink-0 text-zero11-red-600 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-zero11-black/70">
              {{ faq.answer }}
            </p>
          </details>
        </div>
      </div>
    </section>

    <CTABanner
      title="Still have questions?"
      subtitle="Send us your travel requirements and we'll get back to you with a tailor-made quote."
      cta-label="Contact Us"
    />
  </div>
</template>
