'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { Arrow } from '@/components/wv/ui'
import type { Problem } from '@/content/ai-automations/types'

const FROM = 20
const TO = 1

/** Scroll-linked: Simpli Home's 20 manual hours count down to 1 while the week's chores get struck off. */
export function Week({ problems, base }: { problems: Problem[]; base: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const hrs = useTransform(scrollYProgress, [0.05, 0.85], [FROM, TO], { clamp: true })
  const [n, setN] = useState(FROM)
  useMotionValueEvent(hrs, 'change', (v) => setN(Math.round(v)))
  const step = (FROM - TO) / problems.length

  return (
    <section ref={ref} className="axh-week" aria-labelledby="week-h">
      <div className="axh-week-pin">
        <div className="wv-wrap axh-week-in">
          <div className="axh-week-l">
            <p className="wv-eyebrow">( Real result · Simpli Home )</p>
            <h2 id="week-h" className="axh-week-n">
              <span className="wv-sr">Manual work at Simpli Home went from 20 hours a week to 1.</span>
              <span aria-hidden>{n}</span>
              <small aria-hidden>{n === 1 ? 'hour' : 'hours'} a week</small>
            </h2>
            <p className="axh-week-p">
              That is how much manual work Simpli Home had left after we automated it. Here is what usually fills those hours.
            </p>
          </div>
          <ol className="axh-week-list">
            {problems.map((p, i) => (
              <li key={p.id} className={n <= FROM - step * (i + 1) ? 'is-done' : undefined}>
                <Link href={`${base}/${p.branch}`}>
                  <span className="axh-week-t">{p.label}</span>
                  <span className="axh-week-fix">{p.fix}</span>
                  <Arrow size={16} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
