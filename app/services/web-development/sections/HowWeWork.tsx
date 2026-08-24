'use client'

import { useEffect, useRef, useState } from 'react'
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
  // Highest step reached so far. Monotonic on purpose: a completed step stays
  // completed on scroll-back — this is a process running to completion, not a
  // highlight that follows the cursor. Starts at 0 so step 01 is already inked
  // on first paint, and the section still reads as finished if JS never runs.
  const [reached, setReached] = useState(0)

  useGsapSection(scope, () => {
    revealLines('#how-we-work-heading', { trigger: scope.current, start: 'top 75%' })
    revealFadeUp('.step-item', { y: 24, stagger: STAGGER.base, trigger: scope.current, start: 'top 75%' })
  })

  useEffect(() => {
    const items = scope.current?.querySelectorAll<HTMLElement>('.step-item')
    if (!items?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number((entry.target as HTMLElement).dataset.index)
          setReached((prev) => (index > prev ? index : prev))
        })
      },
      // Fires once a step has genuinely arrived rather than the instant its top
      // edge clips the bottom of the screen.
      { rootMargin: '0px 0px -35% 0px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

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
            const isReached = i <= reached

            return (
              <div
                key={item.step}
                data-index={i}
                className={cn('step-item w-full md:w-[220px] md:shrink-0', isDown && 'md:mt-20')}
              >
                {/* The numeral inks in as you reach it, so the zigzag visibly
                    runs step to step instead of sitting fully lit on arrival. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'block font-mono text-4xl font-bold leading-none tracking-[-0.05em] transition-colors duration-500 ease-out md:text-5xl',
                    isReached ? 'text-(--color-accent)' : 'text-(--color-text-faint)',
                  )}
                >
                  {item.step}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-4 block h-px origin-left bg-(--color-accent) transition-transform duration-700 ease-out',
                    isReached ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
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
