'use client'

import { usePathname } from 'next/navigation'

/** Hides children on the Sanity Studio, which is a full-screen app of its own. */
export function HideOnStudio({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith('/studio') ? null : <>{children}</>
}

/** Hides children on pages with their own closing CTA: the homepage, every AI
 * automations page and the rebuilt SEO & GEO section. */
export function HideOnHome({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  return path === '/' || path.startsWith('/services/ai') || path.startsWith('/services/digital-marketing') ? null : <>{children}</>
}
