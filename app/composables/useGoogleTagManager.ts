// Google Tag Manager, loaded via Consent Mode v2 — GA4 and Google Ads
// remarketing are both configured as tags inside the GTM container itself
// (in the Google Tag Manager dashboard), not hardcoded here. This composable
// only handles loading GTM and forwarding consent/events to it.
declare global {
  interface Window {
    dataLayer?: any[]
  }
}

export interface ConsentPreferences {
  analytics: boolean
  marketing: boolean
}

export const useGoogleTagManager = () => {
  const config = useRuntimeConfig()
  const gtmContainerId = config.public.gtmContainerId as string | undefined

  const initializeGTM = () => {
    if (!gtmContainerId || !import.meta.client) return

    if (window.dataLayer?.some(item => item && (item as any).gtmLoaded)) {
      return
    }

    const dataLayer = window.dataLayer || (window.dataLayer = [])

    dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
      gtmLoaded: true,
    })

    // Consent Mode v2 defaults — everything denied until the visitor accepts
    dataLayer.push({
      event: 'consent',
      consent: {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      },
    })

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmContainerId}`
    const firstScript = document.getElementsByTagName('script')[0]
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript)
    } else {
      document.head.appendChild(script)
    }

    const noscript = document.createElement('noscript')
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmContainerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    document.body.insertBefore(noscript, document.body.firstChild)
  }

  const updateConsent = (preferences: ConsentPreferences) => {
    const dataLayer = window.dataLayer
    if (!dataLayer) return

    dataLayer.push({
      event: 'consent',
      consent: {
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        ad_user_data: preferences.marketing ? 'granted' : 'denied',
        ad_personalization: preferences.marketing ? 'granted' : 'denied',
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
      },
    })
  }

  const trackEvent = (eventName: string, eventParams?: Record<string, unknown>) => {
    window.dataLayer?.push({ event: eventName, ...eventParams })
  }

  return { initializeGTM, updateConsent, trackEvent }
}
