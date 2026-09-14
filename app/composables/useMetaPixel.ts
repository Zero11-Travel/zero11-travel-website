// Meta (Facebook/Instagram) Pixel — loaded directly rather than routed
// through GTM, since configuring a Meta tag inside the GTM dashboard is
// unnecessary friction for a small business owner. Only initializes after
// marketing consent is granted.
declare global {
  interface Window {
    fbq?: ((...args: any[]) => void) & { queue?: any[]; loaded?: boolean; callMethod?: (...args: any[]) => void }
    _fbq?: unknown
  }
}

export const useMetaPixel = () => {
  const config = useRuntimeConfig()
  const pixelId = config.public.metaPixelId as string | undefined

  const initializeMetaPixel = () => {
    if (!pixelId || !import.meta.client || window.fbq) return

    const fbq: any = function (...args: any[]) {
      fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args)
    }
    window.fbq = fbq
    fbq.push = fbq
    fbq.loaded = true
    fbq.version = '2.0'
    fbq.queue = []
    window._fbq = fbq

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(script)

    window.fbq('init', pixelId)
    window.fbq('track', 'PageView')

    const noscript = document.createElement('noscript')
    noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`
    document.body.appendChild(noscript)
  }

  const trackMetaEvent = (eventName: string, params?: Record<string, unknown>) => {
    window.fbq?.('track', eventName, params)
  }

  return { initializeMetaPixel, trackMetaEvent }
}
