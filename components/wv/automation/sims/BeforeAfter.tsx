'use client'
import { useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { useRef } from 'react'
import Image from 'next/image'
import type { Demo } from '@/content/ai-automations/types'

type D = Extract<Demo, { kind: 'beforeAfter' }>

export function BeforeAfter({ demo }: { demo: D }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = !!useReducedMotion()
  const [pos, setPos] = useState(50)
  const vid = useRef<HTMLVideoElement>(null)
  const swept = useRef(false)
  useEffect(() => {
    if (!inView || reduce) return
    vid.current?.play().catch(() => {})
    if (swept.current) return
    swept.current = true
    setPos(96)
    // not cleared on cleanup: deps changing must not cancel the reset
    setTimeout(() => setPos(50), 500)
  }, [inView, reduce])
  const { before, after } = demo
  return (
    <figure ref={ref} className="wv-sim wv-sim-ba">
      <div className="wv-sim-bar"><span className="wv-sim-title">{demo.title}</span></div>
      <div className="wv-sim-ba-stage" style={{ ['--p' as string]: `${pos}%` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(max-width: 560px) 100vw, 520px" />
        <div className="wv-sim-ba-after">
          {after.video ? (
            <video ref={vid} src={after.video} poster={after.src} muted loop playsInline preload="none" aria-label={after.alt} />
          ) : (
            <Image src={after.src} alt={after.alt} fill sizes="(max-width: 560px) 100vw, 520px" />
          )}
        </div>
        <span className="wv-sim-ba-l is-b" aria-hidden>Before</span>
        <span className="wv-sim-ba-l is-a" aria-hidden>After</span>
        <span className="wv-sim-ba-h" aria-hidden />
        <input type="range" min={0} max={100} value={pos} onChange={e => setPos(+e.target.value)} aria-label="Compare before and after" />
      </div>
      <figcaption>{demo.caption}</figcaption>
    </figure>
  )
}
