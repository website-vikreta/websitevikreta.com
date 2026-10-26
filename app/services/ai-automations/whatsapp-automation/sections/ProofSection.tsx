'use client'

import { useRef } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const EASE = [0.16, 1, 0.3, 1] as const

const CHANNEL_STATS = [
  {
    n: '98%',
    label: 'Average open rate',
    context: 'Cart recovery emails sit around 20% and frequently get buried in promotional filters or spam.',
    comparison: {
      primaryLabel: 'WhatsApp opened',
      primaryVal: '98%',
      pct: 98,
      secondaryLabel: 'Cart recovery email',
      secondaryVal: '~20%',
    },
  },
  {
    n: '45%',
    label: 'Average click-through',
    context: 'Interactive CTA buttons inside WhatsApp make completing dropped checkouts frictionless.',
    comparison: {
      primaryLabel: 'WhatsApp clicked',
      primaryVal: '45%',
      pct: 45,
      secondaryLabel: 'Standard SMS',
      secondaryVal: '~9%',
    },
  },
  {
    n: '~11p',
    label: 'Per utility alert',
    context: 'Automated order confirmations, updates, and cart alerts are billed at Meta’s base utility rate.',
    comparison: {
      primaryLabel: 'WhatsApp Utility',
      primaryVal: '~11p',
      pct: 10,
      secondaryLabel: 'Marketing Broadcast',
      secondaryVal: '₹1.09',
    },
  },
]

const CASES = [
  {
    brand: 'Keeros SuperFoods',
    result: '20% to 40%',
    metric: 'Recovered cart rate',
    highlight:
      'Reminders go out within 15 minutes of cart drop-off. Customers see the alert on their phone and finish the purchase before buying elsewhere.',
  },
  {
    brand: 'The Hatke',
    result: '21×',
    metric: 'Return on messaging spend',
    highlight:
      'At roughly 11 paise per utility message, recovered checkouts returned 21 rupees for every rupee spent on WhatsApp alerts.',
  },
  {
    brand: 'The Indian Ethnic Co.',
    result: '3×',
    metric: 'Recovery compared to email',
    highlight:
      'Checkout recovery rose from 7% on reminder emails to over 20% on WhatsApp within the first month.',
  },
]

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading',  { trigger: scope.current })
    revealFadeUp('.proof-intro',   { y: 20, trigger: scope.current })
  })

  return (
    <section ref={scope} id="proof" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="proof-heading">
      <div className="container">

        {/* Heading */}
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="proof-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Why WhatsApp outperforms email and SMS.
          </h2>
          <p className="proof-intro mt-4 text-body-lg leading-relaxed text-(--color-text-muted)">
            Customer attention moved to WhatsApp years ago. Here is how direct messaging compares to traditional channels.
          </p>
        </div>

        {/* Channel benchmarks: clean, sharp cards with sleek comparison rail */}
        <div className="mb-14 grid grid-cols-1 gap-6 md:mb-18 md:grid-cols-3 lg:gap-8">
          {CHANNEL_STATS.map(({ n, label, context, comparison }) => (
            <article
              key={n}
              className="flex flex-col justify-between border border-(--color-border) bg-(--color-surface) p-7 sm:p-8 md:p-9 shadow-xs transition-all duration-300 hover:border-(--color-border-strong) hover:-translate-y-0.5"
            >
              <div>
                <p className="font-sans text-5xl sm:text-6xl font-bold tracking-tight text-(--color-text) leading-none">
                  {n}
                </p>
                <h3 className="mt-4 text-lg font-bold text-(--color-text)">
                  {label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">
                  {context}
                </p>
              </div>

              {/* Minimalist monochrome comparison bar */}
              <div className="mt-8 pt-6 border-t border-(--color-border)">
                <div className="flex justify-between text-xs text-(--color-text) font-medium mb-2">
                  <span>{comparison.primaryLabel}</span>
                  <span className="font-bold tabular-nums">{comparison.primaryVal}</span>
                </div>
                <div className="h-1.5 w-full bg-(--color-bg-muted) overflow-hidden">
                  <div
                    className="h-full bg-(--color-text) transition-all duration-700"
                    style={{ width: `${comparison.pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-(--color-text-faint) mt-2">
                  <span>{comparison.secondaryLabel}</span>
                  <span className="tabular-nums">{comparison.secondaryVal}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Case study results: 2-column layout with left headline + CTA and right stacked cards (no eyebrow, sharp edges) */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left Column: Heading, Context, and CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-(--color-text) leading-[1.08]">
              What stores see after switching
            </h3>
            <p className="mt-4 text-base sm:text-lg text-(--color-text-muted) leading-relaxed max-w-md">
              Most stores send recovery emails that sit unopened in promotions. When reminders go to WhatsApp, customers read them in minutes and finish their order.
            </p>
            <div className="mt-6 sm:mt-8">
              <Button href="#contact" variant="ghost" size="md" showArrow>
                Book a platform demo
              </Button>
            </div>
          </div>

          {/* Right Column: 3 stacked horizontal stat cards */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {CASES.map(({ brand, result, metric, highlight }) => (
              <article
                key={brand}
                className="proof-card border border-(--color-border) bg-(--color-surface) p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-(--color-border-strong) hover:-translate-y-0.5 shadow-xs"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-4xl sm:text-5xl font-bold tracking-tight text-(--color-accent)">
                    {result}
                  </p>
                  <span className="text-xs sm:text-sm font-medium text-(--color-text-muted)">
                    {brand}
                  </span>
                </div>
                <h4 className="mt-2.5 text-base sm:text-lg font-bold text-(--color-text)">
                  {metric}
                </h4>
                <p className="mt-1.5 text-sm sm:text-[15px] leading-relaxed text-(--color-text-muted)">
                  {highlight}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-(--color-text-faint)">
          Figures from published Indian D2C brand case studies. Actual recovery depends on catalog price, checkout friction, and opt-in rates.
        </p>
      </div>
    </section>
  )
}
