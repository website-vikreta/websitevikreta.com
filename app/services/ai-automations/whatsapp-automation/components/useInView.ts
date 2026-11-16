'use client'

import { useEffect, useRef, useState } from 'react'

/* True while the element is within ~200px of the viewport. The phone demos use it to stop their
   timers, and the re-renders those cause, whenever they are scrolled out of view. */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '200px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}
