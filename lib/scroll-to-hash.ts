import type { MouseEvent } from 'react'
import { prefersReducedMotion } from '@/lib/gsap/reveals'

/**
 * Click handler for same-page `#hash` links. Takes over from next/link's
 * built-in hash handling (instant jump, and — per user report — occasional
 * duplicated `#hash#hash` history entries on rapid clicks) with an explicit,
 * idempotent smooth scroll. No-ops for non-hash hrefs so normal page
 * navigation is untouched.
 *
 * If the target isn't in the DOM yet (e.g. a dynamic section still loading),
 * watches the DOM until the element appears.
 */
export function scrollToHash(event: MouseEvent, href: string) {
  if (!href.startsWith('#')) return
  event.preventDefault()

  const id = href.slice(1)

  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth'

  const scrollTo = (scrollBehavior: ScrollBehavior = behavior) => {
    const el = document.getElementById(id)
    if (!el) return false
    el.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
    if (window.location.hash !== href) window.history.pushState(null, '', href)
    return true
  }

  const scrollWhenReady = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollTo('auto'))
    })
  }

  if (scrollTo()) return

  const observer = new MutationObserver(() => {
    if (document.getElementById(id)) {
      observer.disconnect()
      scrollWhenReady()
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })

  window.setTimeout(() => observer.disconnect(), 5000)
}
