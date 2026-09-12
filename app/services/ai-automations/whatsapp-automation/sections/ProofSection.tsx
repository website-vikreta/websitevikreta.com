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
    result: '20–40%',
    metric: 'cart recovery rate',
    highlight: '98% message read rate. Notifications sent within 15–20 min of cart drop-off.',
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

        {/* Channel stats — 3-up grid */}
        <div className="mb-10 grid grid-cols-1 gap-px overflow-hidden border border-(--color-border) bg-(--color-border) sm:grid-cols-3 md:mb-14">
          {CHANNEL_STATS.map(({ n, label, context }) => (
            <div key={n} className="proof-stat bg-(--color-surface) p-7 md:p-9">
              <p
                className="font-bold tracking-tight"
                style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--color-accent)', lineHeight: 1 }}
              >
                {n}
              </p>
              <p className="mt-2 text-sm font-semibold text-(--color-text)">{label}</p>
              <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)">{context}</p>
            </div>
          ))}
        </div>

        {/* Case study cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {CASES.map(({ brand, result, metric, highlight, src }) => (
            <article
              key={brand}
              className="proof-card flex h-full flex-col border border-(--color-border) bg-(--color-surface) p-6 md:p-8"
            >
              {/* Result */}
              <p
                className="font-bold tracking-tight text-(--color-text)"
                style={{ fontSize: 'clamp(1.6rem,3vw,2.1rem)', lineHeight: 1.1 }}
              >
                {result}
              </p>
              <p className="mt-1 text-sm font-medium text-(--color-text-muted)">{metric}</p>

              {/* Brand */}
              <h3 className="mt-4 text-base font-bold text-(--color-text)">{brand}</h3>

              {/* Detail */}
              <p className="mt-2 flex-1 text-sm leading-relaxed text-(--color-text-muted)">{highlight}</p>

              {/* Source */}
              <p className="mt-4 text-xs text-(--color-text-faint)">{src}</p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-(--color-text-faint) md:mt-10">
          Figures from published brand case studies. Results vary by store volume, checkout
          health, and opt-in rates. WhatsApp channel stats are Meta and industry benchmarks.
        </p>
      </div>
    </section>
  )
}
