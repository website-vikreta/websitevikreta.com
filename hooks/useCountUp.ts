'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function useCountUp(
  target: number,
  duration: number = 1.5,
  trigger?: HTMLElement,
) {
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const counter = counterRef.current
    if (!counter || !trigger) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      counter.textContent = target.toString()
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        innerText: target,
        duration,
        ease: 'power2.out',
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger,
          start: 'top 80%',
          once: true,
        },
      })
    })

    return () => ctx.revert()
  }, [target, duration, trigger])

  return counterRef
}
