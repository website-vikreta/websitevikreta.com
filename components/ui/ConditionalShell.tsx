'use client'

import { usePathname } from 'next/navigation'

/** Hides children on the Sanity Studio, which is a full-screen app of its own. */
export function HideOnStudio({ children }: { children: React.ReactNode }) {
  return usePathname().startsWith('/studio') ? null : <>{children}</>
}

/** Hides children on the homepage only (it has its own book-a-call + contact sections). */
export function HideOnHome({ children }: { children: React.ReactNode }) {
  return usePathname() === '/' ? null : <>{children}</>
}
