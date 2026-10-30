'use client'

import { useRef } from 'react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const CHANNEL_STATS = [
  {
    n: '98%',
    label: 'Messages get opened',
    context: 'About 1 in 5 cart emails gets opened, and many end up in Promotions or spam. Almost every WhatsApp message gets read.',
    comparison: {
      primaryLabel: 'WhatsApp',
      primaryVal: '98%',
      pct: 98,
      secondaryLabel: 'Cart emails',
      secondaryVal: '~20%',
    },
  },
  {
    n: '45%',
    label: 'Buttons get tapped',
    context: 'Buyers tap a button inside the chat and finish their order in one step. SMS links rarely get that far.',
    comparison: {
      primaryLabel: 'WhatsApp',
      primaryVal: '45%',
      pct: 45,
      secondaryLabel: 'SMS links',
      secondaryVal: '~9%',
    },
  },
  {
    n: '~₹0.11',
    label: 'Per order update',
    context: 'Order confirmations, shipping updates and cart reminders are the cheapest kind of WhatsApp message Meta charges for.',
    comparison: {
      primaryLabel: 'Order update',
      primaryVal: '~₹0.11',
      pct: 10,
      secondaryLabel: 'Marketing message',
      secondaryVal: '₹1.09',
    },
  },
]

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading',  { trigger: scope.current })
    revealFadeUp('.proof-intro',   { y: 20, trigger: scope.current })
    revealFadeUp('.stat-card',     { y: 20, stagger: STAGGER.base, trigger: scope.current })
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
          <p className="proof-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Your customers already spend their day on WhatsApp. Here is how it compares with email and SMS.
          </p>
        </div>

        {/* Channel benchmarks: clean, sharp cards with sleek comparison rail */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CHANNEL_STATS.map(({ n, label, context, comparison }, i) => (
            <article key={n} className={`stat-card ${i === CHANNEL_STATS.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''} flex border border-(--color-border) bg-(--color-surface) shadow-xs transition-colors duration-300 hover:border-(--color-border-strong)`}>
              <div className="flex w-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="font-sans text-5xl sm:text-6xl lg:text-4xl xl:text-6xl font-bold tracking-tight text-(--color-accent) leading-none">{n}</p>
                  <h3 className="mt-4 text-lg font-bold text-(--color-text)">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{context}</p>
                </div>

                <div className="mt-6 border-t border-(--color-border) pt-5">
                  <div className="mb-2 flex justify-between gap-3 text-xs font-medium text-(--color-text)">
                    <span>{comparison.primaryLabel}</span>
                    <span className="font-bold tabular-nums">{comparison.primaryVal}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-bg-muted)">
                    <div className="h-full rounded-full bg-[#25d366] transition-all duration-700" style={{ width: `${comparison.pct}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between gap-3 text-xs text-(--color-text-muted)">
                    <span>{comparison.secondaryLabel}</span>
                    <span className="tabular-nums">{comparison.secondaryVal}</span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
