'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import type { Step } from '@/content/ai-automations/types'

/** Scroll-linked track: the yellow line fills as the section scrolls and each step lights up when the line reaches it. Reduced motion: all lit, line full. */
export function Steps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const [lit, setLit] = useState(reduce ? steps.length : 0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setLit(Math.ceil(v * steps.length + 0.001)))
  const n = reduce ? steps.length : lit

  return (
    <ol ref={ref} className="axs" style={{ ['--n' as string]: steps.length }}>
      <span className="axs-track" aria-hidden>
        <motion.span className="axs-fill" style={{ scaleX: reduce ? 1 : fill }} />
      </span>
      {steps.map((s, i) => (
        <li key={s.title} className={i < n ? 'is-on' : undefined}>
          <span className="axs-dot" aria-hidden />
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  )
}
