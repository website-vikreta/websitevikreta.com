declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

/**
 * Pushes a GA4 event onto the dataLayer the `ga-init` script in app/layout.tsx
 * created.
 *
 * NOT `sendGAEvent` from @next/third-parties: that helper only works when its
 * `<GoogleAnalytics>` component rendered (the component is what sets the
 * module-level dataLayer name it checks), and layout.tsx deliberately hand-rolls
 * the gtag snippet instead so it can load on strategy="lazyOnload". Every
 * sendGAEvent call therefore bailed at `GA has not been initialized` and no
 * click/form event ever reached GA4.
 *
 * The missing-dataLayer no-op doubles as the hostname gate: ga-init only creates
 * it on www.websitevikreta.com, so localhost and stage stay silent. It also means
 * clicks landing before that lazyOnload script runs are dropped rather than
 * buffered into a dataLayer nothing would consume.
 */
function gtagEvent(name: string, params: Record<string, unknown>) {
  if (typeof window === 'undefined' || !window.dataLayer) return
  // Must be a real `arguments` object, not an array. gtag.js dispatches a
  // dataLayer entry to its command table only after `Object.prototype.toString
  // .call(entry) === '[object Arguments]'`; it tests `Array.isArray` first and
  // sends arrays down a legacy method-call path that drops them silently. So
  // build the entry exactly the way Google's own snippet does.
  const gtag = function (this: void) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  } as (...args: unknown[]) => void
  gtag('event', name, params)
}

type ClickEventName =
  | 'whatsapp_click'
  | 'call_click'
  | 'email_click'
  | 'linkedin_click'
  | 'instagram_click'
  | 'external_link_click'

/**
 * Classifies an outbound href into its GA4 click-event name. Known platforms
 * (WhatsApp/tel/mailto/LinkedIn/Instagram) get a specific event; any other
 * off-site http(s) link (Upwork, client project sites, author socials, ...)
 * falls back to `external_link_click` so it still counts instead of
 * silently no-oping. Same-origin links return null — internal nav isn't a
 * click-to-leave event.
 */
function getClickEventName(href: string): ClickEventName | null {
  if (href.startsWith('https://wa.me/')) return 'whatsapp_click'
  if (href.startsWith('tel:')) return 'call_click'
  if (href.startsWith('mailto:')) return 'email_click'
  if (href.includes('linkedin.com/')) return 'linkedin_click'
  if (href.includes('instagram.com/')) return 'instagram_click'
  if (/^https?:\/\//.test(href) && !href.includes(window.location.hostname)) return 'external_link_click'
  return null
}

/** Fires the matching GA4 click event for an outbound link. No-ops for internal/unrecognized hrefs. */
export function trackLinkClick(href: string, buttonLocation: string) {
  if (typeof window === 'undefined') return
  const event = getClickEventName(href)
  if (!event) return
  gtagEvent(event, {
    button_location: buttonLocation,
    link_domain: event === 'external_link_click' ? new URL(href, window.location.href).hostname : undefined,
    page_location: window.location.href,
  })
}

/** Fires contact_form_submit after a lead-gen form's API call succeeds. */
export function trackFormSubmit(formName: string) {
  if (typeof window === 'undefined') return
  gtagEvent('contact_form_submit', {
    form_name: formName,
    page_location: window.location.href,
  })
}

/** Fires `share_click` when a visitor uses one of the UTM-tagged social share buttons (see components/ui/SocialShare.tsx). */
export function trackShareClick(platform: string, campaign: string) {
  if (typeof window === 'undefined') return
  gtagEvent('share_click', {
    platform,
    campaign,
    page_location: window.location.href,
  })
}
