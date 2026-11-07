'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { TOOL_LOGOS } from '@/content/ai-automations/logos'
import './sig-b.css'

export function Logo({ k, s = 22 }: { k: string; s?: number }) {
  const l = TOOL_LOGOS[k]
  // eslint-disable-next-line @next/next/no-img-element -- small svg marks
  return l ? <img src={l.src} alt="" width={s} height={s} className="sb-lg" style={{ width: s, height: s }} /> : null
}

/**
 * Timeline clock for the signatures. SSR / reduced motion = `end` (richest frame).
 * Starts once when scrolled into view; `play()` restarts it.
 */
export function useClock(end: number) {
  const ref = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()
  const [t, setT] = useState(end)
  const [running, setRunning] = useState(false)
  const started = useRef(false)
  const play = useCallback(() => { setT(0); setRunning(true) }, [])
  useEffect(() => {
    if (reduce || !ref.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; play() }
    }, { threshold: 0.35 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [reduce, play])
  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setT((p) => Math.min(end, p + 80)), 80)
    return () => clearInterval(id)
  }, [running, end])
  useEffect(() => { if (t >= end) setRunning(false) }, [t, end])
  return { ref, t, running, play, reduce }
}
