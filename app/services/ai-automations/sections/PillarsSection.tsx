'use client'

import { useRef } from 'react'
import { Clock, IndianRupee, TrendingUp, Users } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface Pillar {
  icon: typeof Clock
  title: string
  line: string
  /** Only real, already-published figures go here. No placeholders ship. */
  metric?: string
}

const PILLARS: Pillar[] = [
  {
    icon:   Clock,
    title:  'Save time',
    line:   'Hours back every week, not buried in a report nobody reads.',
    metric: '20 hours → 1 hour on one client’s image pipeline',
  },
  {
    icon:  IndianRupee,
    title: 'Save money',
    line:  'Fewer tools, and fewer hires made just to keep up with volume.',
  },
  {
    icon:  TrendingUp,
    title: 'Better output',
    line:  'More content, more replies, more coverage — without more headcount.',
  },
  {
    icon:  Users,
    title: 'Team performance',
    line:  'Your people stop doing the job a system can do, and start doing the job only they can.',
  },
]

export default function PillarsSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#pillars-heading', { trigger: scope.current })
    revealFadeUp('.pillar', { y: 24, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pillars-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="pillars-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            What Changes When You Automate With Us
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
          {PILLARS.map(({ icon: Icon, title, line, metric }) => (
            <div key={title} className="pillar group">
              <Icon
                size={40}
                strokeWidth={1.5}
                aria-hidden="true"
                className="text-(--color-accent)"
              />
              <h3 className="mt-5 font-sans text-2xl font-bold leading-[1.15] text-(--color-text)">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
                {line}
              </p>
              {metric && (
                <p className="mt-3 text-sm text-(--color-text-faint)">{metric}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
