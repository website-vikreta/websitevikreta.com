'use client'

import { useEffect, useRef, type ReactNode } from 'react'

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

/**
 * The only heading motion on the homepage. Text is real, visible HTML in SSR;
 * the "from" state exists only inside Web Animations (fill: backwards), created
 * right before playback, and only for elements still below the fold.
 * hero: runs on mount, words nudge up (never masked, never hidden).
 * section: runs once on entering the viewport, words slide up in masks.
 */
export function Kinetic({
  as = 'h2',
  mode = 'section',
  id,
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'h3'
  mode?: 'hero' | 'section'
  id?: string
  className?: string
  children: ReactNode
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const Tag = as

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('.kwi'))
    const marks = Array.from(el.querySelectorAll<HTMLElement>('.hl'))
    const run = () => {
      const from = mode === 'hero' ? '0.3em' : '115%'
      words.forEach((w, i) =>
        w.animate([{ transform: `translateY(${from})` }, { transform: 'none' }], {
          duration: 700,
          delay: i * 35,
          easing: EASE,
          fill: 'backwards',
        }),
      )
      marks.forEach((m, i) =>
        m.animate([{ backgroundSize: '0% 100%' }, { backgroundSize: '100% 100%' }], {
          duration: 800,
          delay: 250 + i * 250,
          easing: EASE,
          fill: 'backwards',
        }),
      )
    }
    if (mode === 'hero') return run()
    if (el.getBoundingClientRect().top < window.innerHeight) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect()
        run()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [mode])

  return (
    <Tag ref={ref} id={id} data-kinetic={mode} className={className}>
      {children}
    </Tag>
  )
}

/** Count-up. SSR renders the final value; JS replays from 0 only when scrolled into view. */
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return
    let raf = 0
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1600, 1)
        el.textContent = Math.round((1 - (1 - p) ** 3) * value).toLocaleString('en-US') + suffix
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, suffix])

  return <span ref={ref}>{value.toLocaleString('en-US') + suffix}</span>
}
