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
    if (isBack.current) {
      window.scrollTo(0, scrollPositions.current[pathname] ?? 0)
      isBack.current = false
    } else {
      window.scrollTo(0, 0)
    }

    const handleScroll = () => {
      scrollPositions.current[pathname] = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  return null
}
