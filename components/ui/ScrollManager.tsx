'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/** Jump without inheriting CSS `scroll-behavior: smooth` (same pattern Next uses). */
function jumpScroll(top: number) {
  const html = document.documentElement
  const previous = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  // Chrome ignores the style change until layout is flushed.
  // https://github.com/vercel/next.js/issues/40719#issuecomment-1336248042
  html.getClientRects()
  window.scrollTo(0, top)
  html.style.scrollBehavior = previous
}

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
    if (isBack.current) {
      jumpScroll(scrollPositions.current[pathname] ?? 0)
      isBack.current = false
    } else {
      jumpScroll(0)
    }

    const handleScroll = () => {
      scrollPositions.current[pathname] = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
