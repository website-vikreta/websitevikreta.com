'use client'

import { useEffect, useRef, useState } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

interface Step {
  step:        string
  title:       string
  description: string
}

const STEPS: Step[] = [
  {
    step:        '01',
    title:       'We watch',
    description: 'How the work actually gets done today, not how it’s supposed to work on paper.',
  },
  {
    step:        '02',
    title:       'We find the time sink',
    description: 'The exact step eating the hours, and whether automation is even the right fix.',
  },
  {
    step:        '03',
    title:       'We build, quietly',
    description: 'No disruption to the work still running while we build.',
  },
  {
    step:        '04',
    title:       'We hand it over',
    description: 'Documentation, a walkthrough, and a system your team owns. No dependency on us to keep it alive.',
  },
]

export default function HowWeWork() {
  const scope = useRef<HTMLElement>(null)
  // Highest step reached so far. Monotonic on purpose: a completed step stays
  // completed on scroll-back — this is a process running to completion, not a
  // highlight that follows the cursor around.
  // Starts at 0, not -1, so step 01 is already inked on first paint: if JS or
  // the observer never runs, the section still reads as finished design rather
  // than a column of washed-out grey numerals.
  const [reached, setReached] = useState(0)

  useGsapSection(scope, () => {
    revealLines('#services-heading', { trigger: scope.current, start: 'top 75%' })
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
      // Fires once a step has genuinely arrived (lower-middle of the viewport)
      // rather than the instant its top edge clips the bottom of the screen.
      { rootMargin: '0px 0px -45% 0px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={scope} id="services" className="py-16 md:py-20" aria-labelledby="services-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="services-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            How We Work
          </h2>
        </div>

        {/* The numerals ARE the rail — no separate track, no node dots. Each
            step inks in as you reach it and the connector fills behind it, so
            the process visibly runs top to bottom. Nothing to click: the old
            canvas offered "Add Node" and drag-to-rearrange on a process whose
            own copy says it never changes. */}
        <ol className="max-w-4xl">
          {STEPS.map((item, i) => {
            const isReached  = i <= reached
            const isLast     = i === STEPS.length - 1
            const lineFilled = i < reached

            return (
              <li
                key={item.step}
                data-index={i}
                className="step-item grid grid-cols-[auto_1fr] items-stretch gap-x-6 md:gap-x-10"
              >
                {/* Rail column. The connector is `flex-1` inside a stretched
                    column, so it fills whatever height the row happens to be —
                    no hardcoded offsets to drift when copy length changes. */}
                <div className="flex flex-col items-center">
                  <span
                    aria-hidden="true"
                    className={`font-mono text-4xl font-bold leading-none tracking-[-0.05em] transition-colors duration-500 ease-out md:text-6xl ${
                      isReached ? 'text-(--color-text)' : 'text-(--color-text-faint)'
                    }`}
                  >
                    {item.step}
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`mt-4 w-px flex-1 transition-colors duration-500 ease-out ${
                        lineFilled ? 'bg-(--color-text)' : 'bg-(--color-border)'
                      }`}
                    />
                  )}
                </div>

                {/* The inter-step gap lives here, not as padding on the row:
                    the rail's `flex-1` fills the row's CONTENT box only, so
                    padding on the row would leave the connector stopping short
                    of the next numeral instead of reaching it. */}
                <div className={isLast ? 'pb-1' : 'pb-14 md:pb-20'}>
                  <h3 className="font-sans text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl">
                    <span className="sr-only">{`Step ${item.step}: `}</span>
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)">
                    {item.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
