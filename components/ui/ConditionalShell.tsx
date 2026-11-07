'use client'

import { usePathname } from 'next/navigation'

/** Hides children on the Sanity Studio, which is a full-screen app of its own. */
export function HideOnStudio({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith('/studio') ? null : <>{children}</>
}

/** Hides children on pages with their own closing CTA: the homepage and every AI automations page. */
export function HideOnHome({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return path === '/' || path.startsWith('/services/ai-automations') ? null : <>{children}</>
}
