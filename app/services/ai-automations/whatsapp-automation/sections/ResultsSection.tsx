'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'

const CASES = [
  {
    brand: 'Keeros SuperFoods',
    value: '20-40', unit: '%',
    metric: 'Recovered cart rate',
    highlight:
      'Reminders go out within 15 minutes of cart drop-off. Customers see the alert on their phone and finish the purchase before buying elsewhere.',
  },
  {
    brand: 'The Hatke',
    value: '21', unit: '×',
    metric: 'Return on messaging spend',
    highlight:
      'At roughly 11 paise per utility message, recovered checkouts returned 21 rupees for every rupee spent on WhatsApp alerts.',
  },
  {
    brand: 'The Indian Ethnic Co.',
    value: '3', unit: '×',
    metric: 'Recovery compared to email',
    highlight:
      'Checkout recovery rose from 7% on reminder emails to over 20% on WhatsApp within the first month.',
  },
]

export default function ResultsSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#results-heading', { trigger: scope.current })
    revealFadeUp('.results-intro', { y: 20, trigger: scope.current })
  })

  return (
    <section ref={scope} id="results" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="results-heading">
      <div className="container">
        {/* Case study results: intro row, then three cards side by side */}
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 id="results-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              What stores see after switching to WhatsApp
            </h2>
            <p className="results-intro mt-4 text-base sm:text-lg text-(--color-text-muted) leading-relaxed">
              Most stores send recovery emails that sit unopened in promotions. When reminders go to WhatsApp, customers read them in minutes and finish their order.
            </p>
          </div>
          <Button href="#whatsapp-demo" variant="ghost" size="md" showArrow>
            Book a platform demo
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {CASES.map(({ brand, value, unit, metric, highlight }, i) => {
            const hot = i === CASES.length - 1
            return (
              <article
                key={brand}
                className={`proof-card flex flex-col p-7 ${i === CASES.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''} [clip-path:polygon(0_0,calc(100%-40px)_0,100%_40px,100%_100%,40px_100%,0_calc(100%-40px))] sm:p-8 ${
                  hot
                    ? 'bg-(--color-accent) text-(--color-text)'
                    : 'bg-(--color-bg-muted) text-(--color-text)'
                }`}
              >
                <p className="flex items-start font-bold leading-none tracking-tight">
                  <span className="whitespace-nowrap text-6xl sm:text-7xl xl:text-8xl">{value}</span>
                  <span className="ml-1 mt-1 text-3xl sm:text-4xl xl:text-5xl">{unit}</span>
                </p>
                <h4 className="mt-3 text-xl font-bold">{metric}</h4>
                <p className={`mt-auto pt-6 text-sm leading-relaxed ${hot ? 'text-(--color-text)/80' : 'text-(--color-text-muted)'}`}>{highlight}</p>
                <p className="mt-4 text-sm font-semibold">{brand}</p>
              </article>
            )
          })}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-(--color-text-faint)">
          Figures from published Indian D2C brand case studies. Actual recovery depends on catalog price, checkout friction, and opt-in rates.
        </p>
      </div>
    </section>
  )
}
