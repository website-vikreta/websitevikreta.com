import type { MouseEvent } from 'react'
import { prefersReducedMotion } from '@/lib/gsap/reveals'

/**
 * Click handler for same-page `#hash` links. Takes over from next/link's
 * built-in hash handling (instant jump, and — per user report — occasional
 * duplicated `#hash#hash` history entries on rapid clicks) with an explicit,
 * idempotent smooth scroll. No-ops for non-hash hrefs so normal page
 * navigation is untouched.
 */
export function scrollToHash(event: MouseEvent, href: string) {
  if (!href.startsWith('#')) return
  event.preventDefault()

  const el = document.getElementById(href.slice(1))
  if (!el) return

  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  if (window.location.hash !== href) window.history.pushState(null, '', href)
}
