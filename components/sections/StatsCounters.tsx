'use client'

import { useRef, useEffect, useState } from 'react'
import { Infinity as InfinityIcon } from 'lucide-react'
import { DotGrid } from '@/components/ui/DotGrid'
import { gsap } from '@/lib/gsap'

interface StatItem {
  id: number
  value: number | null
  suffix: string
  label: string
  isInfinity?: boolean
}

const STATS: StatItem[] = [
  { id: 1, value: 5,    suffix: '+',  label: 'Years building for businesses across the globe' },
  { id: 2, value: 68,   suffix: '+',  label: 'Projects delivered — Web, apps, automation' },
  { id: 3, value: 6360,    suffix: 'hrs', label: 'Since we went AI-first and haven\'t looked back' },
  { id: 4, value: null, suffix: '',   label: 'Tools we can use — no limitation, only solutions', isInfinity: true },
]

export function StatsCounters() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([])

  const [counters, setCounters] = useState<Record<number, number>>(
    STATS.reduce((acc, s) => ({ ...acc, [s.id]: 0 }), {}),
  )

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        STATS.forEach((s) => {
          if (!s.isInfinity) setCounters((p) => ({ ...p, [s.id]: s.value ?? 0 }))
        })
        return
      }

      // Initial hidden state
      gsap.set(headingRef.current, { opacity: 0, y: 20 })
      gsap.set(cardRefs.current, { opacity: 0, y: 24 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      })

      // 1. Heading reveals
      tl.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

      // 2. Cards reveal with stagger — all overlap, don't wait for prev to finish
      const CARDS_START = 0.45  // offset from timeline start (heading takes 0.6s)
      const STAGGER     = 0.15  // gap between each card start

      STATS.forEach((stat, idx) => {
        const cardEl  = cardRefs.current[idx]
        const startAt = CARDS_START + idx * STAGGER

        tl.to(
          cardEl,
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          startAt,
        )

        if (!stat.isInfinity && stat.value !== null) {
          const proxy = { val: 0 }
          tl.to(
            proxy,
            {
              val: stat.value,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate() {
                setCounters((p) => ({ ...p, [stat.id]: Math.floor(proxy.val) }))
              },
              onComplete() {
                setCounters((p) => ({ ...p, [stat.id]: stat.value! }))
              },
            },
            startAt, // counter starts exactly when its card reveals
          )
        }
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative pt-8 pb-16 md:pt-12 md:pb-20 bg-(--color-bg) overflow-hidden"
      aria-label="Impact Statistics"
    >
      <DotGrid />

      <div className="container relative z-10">
        <div ref={headingRef} className="mb-10 md:mb-12">
          <h2 className="text-h2 font-bold text-[var(--color-text)]">
            The Impact We&rsquo;ve Delivered
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STATS.map((stat, idx) => (
            <div
              key={stat.id}
              ref={(el) => { cardRefs.current[idx] = el }}
              className="flex flex-col border-l border-[var(--color-border)] pl-5 pr-8 py-2"
              role="region"
              aria-label={stat.isInfinity ? `${stat.label}: unlimited` : `${stat.label}: ${stat.value}${stat.suffix}`}
            >
              {/* Value */}
              <div className="font-bold text-[var(--color-text)] font-mono leading-none mb-2 flex items-center h-12 md:h-[3.75rem]">
                {stat.isInfinity ? (
                  <InfinityIcon
                    className="w-12 h-12 md:w-[3.75rem] md:h-[3.75rem] text-[var(--color-text)]"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="text-5xl md:text-6xl">
                    {counters[stat.id]}
                    <span className="text-3xl md:text-4xl ml-1">{stat.suffix}</span>
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-[var(--color-text-muted)] text-sm md:text-base leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
