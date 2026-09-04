'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollManager() {
  const pathname = usePathname()
  const scrollPositions = useRef<Record<string, number>>({})
  const isBack = useRef(false)

  useEffect(() => {
    const handlePopState = () => {
      isBack.current = true
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    // `instant` overrides global `scroll-behavior: smooth` — route changes
    // should jump to top, not animate like same-page scrolling.
    const scrollOpts: ScrollToOptions = { left: 0, behavior: 'instant' }

    if (isBack.current) {
      window.scrollTo({ top: scrollPositions.current[pathname] ?? 0, ...scrollOpts })
      isBack.current = false
    } else {
      window.scrollTo({ top: 0, ...scrollOpts })
    }

    const handleScroll = () => {
      scrollPositions.current[pathname] = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
