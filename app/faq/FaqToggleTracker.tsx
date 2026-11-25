'use client'

import { useEffect } from 'react'
import { trackFaqExpand } from '@/lib/analytics'

/** Tiny island: reports `faq_expand` when a native <details> opens. Renders nothing. */
export function FaqToggleTracker({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId)
    if (!root) return
    const onToggle = (e: Event) => {
      const d = e.target as HTMLDetailsElement
      if (d.open) trackFaqExpand(d.querySelector('h3')?.textContent ?? '')
    }
    // `toggle` does not bubble, so listen in the capture phase.
    root.addEventListener('toggle', onToggle, true)
    return () => root.removeEventListener('toggle', onToggle, true)
  }, [rootId])
  return null
}
