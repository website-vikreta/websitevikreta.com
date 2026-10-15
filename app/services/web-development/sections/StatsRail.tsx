'use client'

import { useRef } from 'react'
import { Counter } from '@/components/ui/Reveal'
import { useGsapSection, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import { WEB_DEV_STATS } from '../data'

export default function StatsRail() {
  const scope = useRef<HTMLElement>(null)
  const lastStat = WEB_DEV_STATS.items.length - 1

  useGsapSection(scope, () => {
    revealFadeUp('.stat-cell', { y: 16, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      className="py-16 md:py-20"
      aria-labelledby="stats-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          <div className="stat-cell lg:border-r lg:border-(--color-border) lg:pr-8">
            <h2
              id="stats-heading"
              className="text-xl font-bold text-(--color-text) sm:text-2xl"
            >
              {WEB_DEV_STATS.heading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
              {WEB_DEV_STATS.subhead}
            </p>
          </div>

          {WEB_DEV_STATS.items.map((stat, index) => (
            <div
              key={stat.label}
              className={`stat-cell lg:px-8 ${
                index < lastStat ? 'lg:border-r lg:border-(--color-border)' : ''
              }`}
            >
              <p
                className="font-mono text-5xl font-bold leading-none tracking-[-0.05em] text-(--color-text) md:text-6xl"
                aria-label={`${stat.value}${stat.suffix} ${stat.label}`}
              >
                <Counter value={stat.value} />
                <span className="text-3xl md:text-4xl">{stat.suffix}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted) md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
