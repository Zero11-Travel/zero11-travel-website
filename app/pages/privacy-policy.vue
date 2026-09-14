<script setup lang="ts">
const lastUpdated = new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })

useHead({
  title: 'Privacy Policy | Zero11 Travel & Tours',
  meta: [
    { name: 'description', content: 'How Zero11 Tours and Transfers (Pty) Ltd collects, uses and protects your personal information, in line with South Africa\'s Protection of Personal Information Act (POPIA).' },
  ],
})
</script>

<template>
  <div>
    <section class="bg-zero11-black py-20">
      <div class="mx-auto max-w-4xl px-6 text-center">
        <p class="mb-3 text-sm font-semibold uppercase tracking-wide text-zero11-orange-500">Your Information, Protected</p>
        <h1 class="font-heading text-4xl font-bold text-white sm:text-5xl">Privacy Policy</h1>
      </div>
    </section>

    <section class="bg-white py-20">
      <div class="mx-auto max-w-3xl px-6">
        <p class="mb-8 text-sm text-zero11-black/50">Last updated: {{ lastUpdated }}</p>

        <div class="space-y-10 text-base leading-relaxed text-zero11-black/70">
          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">1. Introduction</h2>
            <p>
              Zero11 Tours and Transfers (Pty) Ltd ("Zero11", "we", "our" or "us") respects your privacy.
              This Privacy Policy explains what personal information we collect through this website,
              why we collect it, and how we protect it, in line with South Africa's Protection of
              Personal Information Act (POPIA).
            </p>
          </div>

          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">2. Information We Collect</h2>
            <p class="mb-3">We only collect personal information you choose to give us, primarily through our booking enquiry form:</p>
            <ul class="list-disc space-y-2 pl-6">
              <li>Your name, email address and phone number</li>
              <li>The service you're enquiring about and your preferred travel date</li>
              <li>Any details you include in your enquiry message</li>
            </ul>
            <p class="mt-3">
              We do not collect payment or banking details through this website — payment arrangements
              (EFT or cash) are made directly with our team once your booking is confirmed.
            </p>
          </div>

          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">3. How We Use Your Information</h2>
            <p class="mb-3">We use the information you provide to:</p>
            <ul class="list-disc space-y-2 pl-6">
              <li>Respond to your enquiry and arrange your transfer, chauffeur service or tour</li>
              <li>Contact you about your booking via phone, email or WhatsApp</li>
              <li>Improve the service we offer returning clients</li>
            </ul>
            <p class="mt-3">We do not sell, rent or trade your personal information to third parties.</p>
          </div>

          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">4. Cookies</h2>
            <p>
              This website does not currently use analytics, advertising or tracking cookies. Any cookies
              set are strictly limited to essential site functionality (such as remembering your display
              preferences). If this changes in future, this policy will be updated accordingly.
            </p>
          </div>

          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">5. Data Security &amp; Retention</h2>
            <p>
              Enquiries submitted through this website are sent directly to our team by email and are not
              stored in a public database. We retain enquiry information only for as long as needed to
              respond to you and fulfil any resulting booking, or as required by law.
            </p>
          </div>

          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">6. Your Rights</h2>
            <p class="mb-3">Under POPIA, you have the right to:</p>
            <ul class="list-disc space-y-2 pl-6">
              <li>Ask what personal information we hold about you</li>
              <li>Request that we correct inaccurate information</li>
              <li>Request that we delete your information</li>
              <li>Object to how we use your information</li>
            </ul>
          </div>

          <div>
            <h2 class="mb-3 font-heading text-xl font-bold text-zero11-black">7. Contact Us</h2>
            <p class="mb-4">For any questions about this Privacy Policy or your personal information, contact us at:</p>
            <div class="rounded-xl bg-zero11-red-50/40 p-6">
              <p>
                <strong class="text-zero11-black">Email:</strong>
                <a href="mailto:kgothatso@zero11travel.co.za" class="text-zero11-red-600 hover:text-zero11-red-700"> kgothatso@zero11travel.co.za</a><br />
                <strong class="text-zero11-black">Phone / WhatsApp:</strong>
                <a href="tel:+27768735815" class="text-zero11-red-600 hover:text-zero11-red-700"> +27 76 873 5815</a><br />
                <strong class="text-zero11-black">Address:</strong> 9077 Ivory Park, Sisonke Street, Midrand, 1682
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
