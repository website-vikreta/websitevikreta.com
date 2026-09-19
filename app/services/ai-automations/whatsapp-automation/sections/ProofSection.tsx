'use client'

import { useRef } from 'react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const CHANNEL_STATS = [
  { n: '98%',  label: 'average open rate',  context: 'vs ~20% for cart recovery email' },
  { n: '45%',  label: 'avg. click-through', context: '5× higher than SMS campaigns' },
  { n: '~11p', label: 'per utility message', context: 'WhatsApp Business API, billed at cost' },
]

const CASES = [
  {
    brand: 'Keeros SuperFoods',
    result: '20 to 40%',
    metric: 'cart recovery rate',
    highlight: '98% message read rate. Notifications sent within 15 to 20 min of cart drop-off.',
    src: 'Published case study',
  },
  {
    brand: 'The Hatke',
    result: '21×',
    metric: 'ROI on the WhatsApp channel',
    highlight: 'Up to 40% abandoned cart recovery. Open and click rates far above email and SMS.',
    src: 'Published case study',
  },
  {
    brand: 'Indian Ethnic Co.',
    result: '3× increase',
    metric: 'cart recovery vs. email baseline',
    highlight: 'Recovery jumped from 7% to 20%+ after switching from email-first to WhatsApp.',
    src: 'Published case study',
  },
]

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading',  { trigger: scope.current })
    revealFadeUp('.proof-stat',    { y: 16, stagger: STAGGER.tight, trigger: scope.current })
    revealFadeUp('.proof-card',    { y: 20, stagger: STAGGER.base,  trigger: scope.current })
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
            Why WhatsApp works. What stores have done with it.
          </h2>
          <p className="mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            The channel difference is real. These are the numbers that make it worth switching.
          </p>
        </div>

        {/* Channel benchmarks */}
        <div className="mb-10 grid grid-cols-1 border-y border-(--color-border) sm:grid-cols-3 md:mb-14">
          {CHANNEL_STATS.map(({ n, label, context }) => (
            <div key={n} className="proof-stat border-b border-(--color-border) py-6 sm:border-b-0 sm:border-r sm:px-7 sm:py-7 sm:last:border-r-0 md:px-8">
              <p
                className="font-bold tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--color-accent)', lineHeight: 1 }}
              >
                {n}
              </p>
              <p className="mt-2 text-base font-semibold text-(--color-text)">{label}</p>
              <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">{context}</p>
            </div>
          ))}
        </div>

        {/* Case study results */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-sm text-(--color-text-muted)">
              Published results
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-(--color-text)">
              What stores have seen after switching
            </h3>
          </div>
          <p className="text-sm text-(--color-text-muted)">Results vary by store</p>
        </div>

        <div className="border-y border-(--color-border)">
          {CASES.map(({ brand, result, metric, highlight, src }, index) => (
            <article
              key={brand}
              className="proof-card grid grid-cols-1 gap-4 border-b border-(--color-border) py-6 last:border-b-0 md:grid-cols-[3rem_minmax(10rem,0.8fr)_minmax(0,1.5fr)_auto] md:items-center md:gap-6 md:py-7"
            >
              <span className="font-mono text-sm font-semibold text-(--color-text-muted)">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="font-bold tracking-tight" style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', color: 'var(--color-accent)', lineHeight: 1.1 }}>
                  {result}
                </p>
                <p className="mt-1 text-base text-(--color-text-muted)">{metric}</p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-(--color-text)">{brand}</h4>
                <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">{highlight}</p>
              </div>
              <p className="text-sm text-(--color-text-muted) md:text-right">{src}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-(--color-text-muted) md:mt-10">
          Figures from published brand case studies. Results vary by store volume, checkout
          health, and opt-in rates. WhatsApp channel stats are Meta and industry benchmarks.
        </p>
      </div>
    </section>
  )
}
