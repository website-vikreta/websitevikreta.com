'use client'

import { useEffect, useRef, useState } from 'react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

const STAGES = [
  { step: '01', title: 'Pre-purchase & enquiries', feature: 'AI chatbot + live chat widget' },
  { step: '02', title: 'Product recommendations', feature: 'Catalog in WhatsApp + AI agent' },
  { step: '03', title: 'Cart & checkout', feature: 'Abandoned cart recovery sequence' },
  { step: '04', title: 'Order management & tracking', feature: 'Automated order + shipping updates' },
  { step: '05', title: 'Returns & refunds', feature: 'AI support agent + human handoff' },
  { step: '06', title: 'Warranty & post-purchase', feature: 'Automated follow-up workflows' },
  { step: '07', title: 'Reviews & feedback', feature: 'Re-engagement campaigns (opt-in)' },
  { step: '08', title: 'Retention & re-engagement', feature: 'Win-back flows + bulk messaging' },
]

export default function JourneySection() {
  const scope = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(STAGES[0].step)

  useGsapSection(scope, () => {
    revealLines('#journey-heading', { trigger: scope.current })
    revealFadeUp('.journey-step', {
      y: 20,
      stagger: STAGGER.tight,
      trigger: scope.current,
    })
  })

  useEffect(() => {
    const steps = scope.current?.querySelectorAll<HTMLElement>('.journey-step')
    if (!steps?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        const step = hit?.target.getAttribute('data-step')
        if (step) setActiveStep(step)
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )

    steps.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={scope}
      id="journey"
      className="py-16 md:py-20"
      aria-labelledby="journey-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="journey-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            From first enquiry to repeat purchase
          </h2>
          <p className="mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Eight stages. One platform. Not just cart recovery — the full
            customer lifecycle on WhatsApp.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <nav
            aria-label="Customer journey steps"
            className="mb-8 hidden lg:col-span-4 lg:mb-0 lg:block lg:sticky lg:top-32 lg:self-start"
          >
            <ul className="flex flex-col">
              {STAGES.map(({ step, title }) => {
                const isActive = step === activeStep
                return (
                  <li key={step}>
                    <a
                      href={`#journey-${step}`}
                      aria-current={isActive ? 'step' : undefined}
                      className={`block border-l-2 py-2 pl-4 text-sm transition-colors duration-300 ${
                        isActive
                          ? 'border-(--color-text) text-(--color-text) [text-shadow:0_0_0.5px_currentColor]'
                          : 'border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)'
                      }`}
                    >
                      {title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <ol className="flex flex-col gap-6 lg:col-span-8">
            {STAGES.map(({ step, title, feature }) => (
              <li
                key={step}
                id={`journey-${step}`}
                data-step={step}
                className="journey-step scroll-mt-32 border border-(--color-border) bg-(--color-surface) p-6 md:p-8"
              >
                <span className="font-mono text-xs text-(--color-text-faint)">
                  {step}
                </span>
                <h3 className="mt-2 font-sans text-xl font-bold text-(--color-text) md:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] text-(--color-accent)">{feature}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
