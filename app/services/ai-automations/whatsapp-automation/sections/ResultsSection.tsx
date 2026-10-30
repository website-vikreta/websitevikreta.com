'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

/* Figures are self-reported by the brands and their WhatsApp platforms. No platform names or source links are shown. */
const CASES = [
  {
    brand: 'Keeros SuperFoods',
    value: '40', unit: '%',
    metric: 'Of abandoned carts recovered, at best',
    highlight:
      'Automatic WhatsApp reminders go out 15 to 20 minutes after a product is added to the cart without checkout. Keeros reports recovering up to 40% of abandoned carts.',
  },
  {
    brand: 'The Hatke',
    value: '21', unit: '×',
    metric: 'Return reported on WhatsApp',
    highlight:
      'The Hatke’s earlier email and SMS campaigns saw about 20% opens and 2 to 5% clicks. After moving to WhatsApp, the brand reports a 21× return.',
  },
  {
    brand: 'The Indian Ethnic Co.',
    value: '15-20', unit: '%',
    metric: 'Cart recovery rate, up from 7%',
    highlight:
      'After adding WhatsApp, Indian Ethnic Co. reports recovering abandoned carts at about double its earlier rate, from roughly 7% to 15 to 20%.',
  },
]

export default function ResultsSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#results-heading', { trigger: scope.current })
    revealFadeUp('.results-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.result-col', { y: 20, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} id="results" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="results-heading">
      <div className="container">
        {/* Case study results: intro row, then three cards side by side */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="results-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              What D2C brands report from WhatsApp cart recovery
            </h2>
            <p className="results-intro mt-5 text-body-lg text-(--color-text-muted) leading-relaxed">
              Three Indian D2C brands published what they saw after moving cart recovery to WhatsApp. These are the results they report.
            </p>
          </div>
          <Button href="#whatsapp-demo" variant="ghost" size="md" showArrow>
            Book a platform demo
          </Button>
        </div>

        {/* Plain columns: just text, no card and no rules */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12">
          {CASES.map(({ brand, value, unit, metric, highlight }) => (
            <article key={brand} className="result-col flex flex-col">
              <p className="whitespace-nowrap text-6xl font-bold leading-none tracking-tight text-(--color-accent) md:text-7xl lg:text-6xl xl:text-8xl">
                {value}
                {unit}
              </p>
              <h3 className="mt-4 text-xl font-bold text-(--color-text)">{metric}</h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-(--color-text-muted)">{highlight}</p>
              <p className="mt-5 text-sm font-semibold text-(--color-text)">{brand}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-(--color-text-faint)">
          Figures are self-reported by each brand. Actual recovery depends on catalog price, checkout friction, and opt-in rates.
        </p>
      </div>
    </section>
  )
}
