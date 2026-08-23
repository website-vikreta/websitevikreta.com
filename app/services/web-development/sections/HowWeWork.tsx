'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import { cn } from '@/lib/utils'

interface Step {
  step:        string
  title:       string
  description: string
}

const STEPS: Step[] = [
  {
    step:        '01',
    title:       'We plan',
    description: 'Goals, audience, and content, sorted before a single pixel gets designed, so nothing gets rebuilt halfway through.',
  },
  {
    step:        '02',
    title:       'We design',
    description: 'Wireframes and UI built around your brand, mobile-first from the first screen, not scaled up from desktop after.',
  },
  {
    step:        '03',
    title:       'We build',
    description: 'Custom-coded in Next.js and Tailwind. SEO, semantic HTML, and fast load times built in, not bolted on later.',
  },
  {
    step:        '04',
    title:       'We launch and support',
    description: 'Live in 3 to 6 weeks, then bug fixes, content updates, and maintenance so it keeps running as you grow.',
  },
]

export default function HowWeWork() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#how-we-work-heading', { trigger: scope.current, start: 'top 75%' })
    revealFadeUp('.step-item', { y: 24, stagger: STAGGER.base, trigger: scope.current, start: 'top 75%' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="how-we-work-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="how-we-work-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            How we work
          </h2>
        </div>

        {/* Zigzag rail: odd steps (02, 04) sit lower than even steps (01, 03)
            so the flow reads left to right AND up/down, instead of one flat line. */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {STEPS.map((item, i) => {
            const isDown = i % 2 === 1

            return (
              <div
                key={item.step}
                className={cn('step-item w-full md:w-[220px] md:shrink-0', isDown && 'md:mt-20')}
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-4xl font-bold leading-none tracking-[-0.05em] text-(--color-accent) md:text-5xl"
                >
                  {item.step}
                </span>
                <h3 className="mt-5 font-sans text-xl font-bold leading-[1.15] text-(--color-text) sm:text-2xl">
                  <span className="sr-only">{`Step ${item.step}: `}</span>
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
