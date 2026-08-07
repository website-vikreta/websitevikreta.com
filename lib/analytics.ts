import { sendGAEvent } from '@next/third-parties/google'

type ClickEventName = 'whatsapp_click' | 'call_click' | 'email_click'

/** Classifies a WhatsApp/tel/mailto href into its GA4 click-event name, or null for anything else (e.g. LinkedIn, Instagram). */
function getClickEventName(href: string): ClickEventName | null {
  if (href.startsWith('https://wa.me/')) return 'whatsapp_click'
  if (href.startsWith('tel:')) return 'call_click'
  if (href.startsWith('mailto:')) return 'email_click'
  return null
}

/** Fires the matching GA4 click event for a WhatsApp/tel/mailto link. No-ops for any other href. */
export function trackLinkClick(href: string, buttonLocation: string) {
  if (typeof window === 'undefined') return
  const event = getClickEventName(href)
  if (!event) return
  sendGAEvent('event', event, {
    button_location: buttonLocation,
    page_location: window.location.href,
  })
}

/** Fires contact_form_submit after a lead-gen form's API call succeeds. */
export function trackFormSubmit(formName: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'contact_form_submit', {
    form_name: formName,
    page_location: window.location.href,
  })
}

/** Fires `share_click` when a visitor uses one of the UTM-tagged social share buttons (see components/ui/SocialShare.tsx). */
export function trackShareClick(platform: string, campaign: string) {
  if (typeof window === 'undefined') return
  sendGAEvent('event', 'share_click', {
    platform,
    campaign,
    page_location: window.location.href,
  })
}
