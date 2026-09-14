<template>
  <div class="flex min-h-screen flex-col font-body text-zero11-black">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <WhatsAppButton />
    <CookieConsent />
  </div>
</template>
