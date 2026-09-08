'use client'

import { useRef } from 'react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import { WEB_DEV_HOW_WE_WORK } from '../data'

export default function HowWeWork() {
  const scope = useRef<HTMLElement>(null)
  const steps = WEB_DEV_HOW_WE_WORK.steps

  useGsapSection(scope, () => {
    revealLines('#how-we-work-heading', { trigger: scope.current, start: 'top 75%' })
    revealFadeUp('.step-item', { y: 24, stagger: STAGGER.base, trigger: scope.current, start: 'top 75%' })
  })

  return (
    <section
      ref={scope}
      className="border-t border-(--color-border) py-16 md:py-20"
      aria-labelledby="how-we-work-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="how-we-work-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            {WEB_DEV_HOW_WE_WORK.heading}
          </h2>
        </div>

        <ol
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:items-start lg:gap-10 lg:pb-16"
          aria-label="Build process"
        >
          {steps.map((item, index) => (
            <li
              key={item.step}
              className={`step-item max-w-xs ${index % 2 === 1 ? 'lg:mt-20' : ''}`}
            >
              <span
                aria-hidden="true"
                className="block text-5xl font-bold leading-none tracking-tight text-(--color-accent) md:text-6xl"
              >
                {item.step}
              </span>
              <span
                aria-hidden="true"
                className="mt-3 mb-5 block h-px w-full bg-(--color-accent)"
              />
              <h3 className="text-xl font-bold leading-snug text-(--color-text)">
                <span className="sr-only">{`Step ${item.step}: `}</span>
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-(--color-text-muted)">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
