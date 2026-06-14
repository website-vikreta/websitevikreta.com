'use client'

import React, { useRef, useEffect, useState } from 'react'
import { NetworkGeometry } from '@/components/ui/NetworkGeometry'
import { formatLargeNumber } from '@/lib/utils/formatNumber'
import { gsap } from '@/lib/gsap'

interface StatItem {
  id: number
  value: number
  suffix: string
  label: string
}

const STATS: StatItem[] = [
  { id: 1, value: 12000, suffix: '+', label: 'Agents Deployed' },
  { id: 2, value: 4800000, suffix: '+', label: 'Tasks Automated' },
  { id: 3, value: 250000, suffix: '+', label: 'Hours Saved' },
  { id: 4, value: 300, suffix: '+', label: 'Enterprise Customers' },
]

interface CounterState {
  [key: number]: number
}

export function StatsCounters() {
  const sectionRef = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [counters, setCounters] = useState<CounterState>(
    STATS.reduce((acc, stat) => ({ ...acc, [stat.id]: 0 }), {}),
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const ctx = gsap.context(() => {
      // Initialize states
      labelRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 12 })
      })

      if (prefersReducedMotion) {
        labelRefs.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 1, y: 0 })
        })
        STATS.forEach((stat, idx) => {
          setCounters((prev) => ({ ...prev, [stat.id]: stat.value }))
        })
        return
      }

      // Create timeline for counter animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      })

      // Animate each counter
      STATS.forEach((stat, idx) => {
        tl.to(
          counterRefs.current[idx],
          {
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              const progress = this.progress()
              const current = Math.floor(stat.value * progress)
              setCounters((prev) => ({
                ...prev,
                [stat.id]: current,
              }))
            },
          },
          idx === 0 ? 0 : '-=1.2',
        )

        tl.to(
          labelRefs.current[idx],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.5',
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-[var(--section-y)] bg-(--color-bg) overflow-hidden"
      aria-label="Impact Statistics"
    >
      {/* Decorative background geometry */}
      <NetworkGeometry />

      {/* Content */}
      <div className="container relative z-10">
        {/* Section header – optional, can be removed or styled */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-h2 font-bold text-[var(--color-text)]">
            The Impact We&rsquo;ve Delivered
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, idx) => (
            <div
              key={stat.id}
              className="flex flex-col items-start"
              role="region"
              aria-label={`${stat.label}: ${counters[stat.id] || 0}${stat.suffix}`}
            >
              {/* Counter value */}
              <div
                ref={(el) => {
                  counterRefs.current[idx] = el
                }}
                className="text-5xl md:text-6xl font-bold text-[var(--color-text)] font-mono leading-none mb-1"
              >
                {formatLargeNumber(counters[stat.id])}
                <span className="text-3xl md:text-4xl ml-1 inline-block">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p
                ref={(el) => {
                  labelRefs.current[idx] = el
                }}
                className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed max-w-xs"
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
