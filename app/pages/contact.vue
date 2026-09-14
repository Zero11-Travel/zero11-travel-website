<script setup lang="ts">
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/vue/24/outline'

useHead({
  title: 'Contact Us | Zero11 Travel & Tours',
  meta: [
    { name: 'description', content: 'Get in touch with Zero11 Travel & Tours for airport transfers, chauffeur drive and tour bookings. Call, WhatsApp or send us an enquiry.' },
  ],
})

const contactDetails = [
  { icon: PhoneIcon, label: 'Phone / WhatsApp', value: '+27 76 873 5815', href: 'tel:+27768735815' },
  { icon: EnvelopeIcon, label: 'Email', value: 'kgothatso@zero11travel.co.za', href: 'mailto:kgothatso@zero11travel.co.za' },
  { icon: MapPinIcon, label: 'Address', value: '9077 Ivory Park, Sisonke Street, Midrand, 1682', href: undefined },
  { icon: ClockIcon, label: 'Operating Cities', value: 'Johannesburg, Durban, Cape Town', href: undefined },
]
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Get In Touch</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Book Your Next Trip</h1>
        <p class="mt-5 text-lg text-white/70">
          We give unbeatable rates! Send us your requirements and we'll come back
          to you with a tailor-made, competitive quote.
        </p>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5">
        <div class="lg:col-span-3">
          <h2 class="mb-6 font-heading text-2xl font-bold text-zero11-black">Send an Enquiry</h2>
          <ContactForm />
        </div>

        <div class="lg:col-span-2">
          <div class="rounded-2xl border border-black/5 bg-zero11-red-50/40 p-8">
            <h2 class="mb-6 font-heading text-xl font-bold text-zero11-black">Contact Details</h2>
            <ul class="space-y-6">
              <li v-for="detail in contactDetails" :key="detail.label" class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zero11-red-600 text-white">
                  <component :is="detail.icon" class="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p class="text-xs font-semibold uppercase tracking-wide text-zero11-black/50">{{ detail.label }}</p>
                  <a v-if="detail.href" :href="detail.href" class="text-sm font-medium text-zero11-black hover:text-zero11-red-600">
                    {{ detail.value }}
                  </a>
                  <p v-else class="text-sm font-medium text-zero11-black">{{ detail.value }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="mt-6 overflow-hidden rounded-2xl border border-black/5">
            <iframe
              title="Zero11 Travel & Tours location map"
              src="https://www.google.com/maps?q=9077+Ivory+Park,+Sisonke+Street,+Midrand,+1682&output=embed"
              class="h-64 w-full border-0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
