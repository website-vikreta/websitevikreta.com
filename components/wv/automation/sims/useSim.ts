'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/** Steps 0..n. SSR = n (final state). Plays once at 40% in view, replay() reruns. */
export function useSim(n: number, ms = 1100) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = !!useReducedMotion()
  const [step, setStep] = useState(n)
  const [run, setRun] = useState(0)
  // In view at mount: reset to step 0 before first paint (SSR final state stays for SEO/no-JS), no flash.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const seen = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)
    if (r.height > 0 && seen >= r.height * 0.4) setStep(0)
  }, [])
  useEffect(() => {
    if (!inView || reduce) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restart when replay is clicked
    setStep(s => (s >= n ? 0 : s))
    const t = setInterval(() => {
      if (document.hidden) return
      setStep(s => { if (s >= n) { clearInterval(t); return s } return s + 1 })
    }, ms)
    return () => clearInterval(t)
  }, [inView, reduce, n, ms, run])
  return { ref, step, done: step >= n, reduce, replay: () => setRun(r => r + 1) }
}

export const initials = (s: string) => s.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
