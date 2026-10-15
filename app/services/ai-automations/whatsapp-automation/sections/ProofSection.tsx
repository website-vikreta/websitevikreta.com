'use client'

import { useRef } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const EASE = [0.16, 1, 0.3, 1] as const

/* Each chart compares only figures already on its card (marketing rate: Meta India, research brief) */
const CHANNEL_STATS = [
  {
    n: '98%', label: 'average open rate', context: 'vs ~20% for cart recovery email',
    bars: [{ label: 'WhatsApp', value: '98%', pct: 98, win: true }, { label: 'Email', value: '~20%', pct: 20 }],
  },
  {
    n: '45%', label: 'avg. click-through', context: '5× higher than SMS campaigns',
    bars: [{ label: 'WhatsApp', value: '45%', pct: 45, win: true }, { label: 'SMS', value: '~9%', pct: 9 }],
  },
  {
    n: '~11p', label: 'per utility message', context: 'WhatsApp Business API, billed at cost',
    bars: [{ label: 'Utility (order updates)', value: '~11p', pct: 10, win: true }, { label: 'Marketing', value: '₹1.09', pct: 100 }],
  },
]

function StatBars({ bars }: { bars: { label: string; value: string; pct: number; win?: boolean }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {bars.map(({ label, value, pct, win }, i) => (
        <div key={label}>
          <span className="flex justify-between text-[13px] text-(--color-text-muted)">
            {label}<span className="font-semibold tabular-nums text-(--color-text)">{value}</span>
          </span>
          <span className="mt-1.5 block h-2.5 overflow-hidden bg-(--color-bg-muted)">
            <m.span
              className="block h-full"
              style={{ background: win ? '#25d366' : '#a1a1aa' }}
              variants={{ hide: { width: '0%' }, show: { width: `${pct}%`, transition: { delay: 0.3 + i * 0.25, duration: 1, ease: EASE } } }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

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
    revealFadeUp('.proof-intro',   { y: 20, trigger: scope.current })
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
          <p className="proof-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            The channel difference is real. These are the numbers that make it worth switching.
          </p>
        </div>

        {/* Channel benchmarks: same card + chart pattern as the pain stats up top */}
        <LazyMotion features={domAnimation}>
          <div className="mb-10 grid grid-cols-1 gap-5 md:mb-14 md:grid-cols-3 lg:gap-6">
            {CHANNEL_STATS.map(({ n, label, context, bars }) => (
              <m.article
                key={n}
                initial="hide"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-[0_24px_48px_-30px_rgba(20,18,15,0.3)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div aria-hidden className="flex h-36 items-center border-b border-(--color-border) bg-[#fafaf8] px-7 md:px-9">
                  <div className="w-full"><StatBars bars={bars} /></div>
                </div>
                <div className="p-7 md:p-9">
                  <p className="text-h2 font-bold leading-none tracking-tight text-(--color-text)">{n}</p>
                  <h3 className="mt-4 text-base font-bold leading-snug text-(--color-text)">{label}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-(--color-text-muted)">{context}</p>
                </div>
              </m.article>
            ))}
          </div>
        </LazyMotion>

        {/* Case study results: one black panel so it reads as the payoff, not a fourth row of cards */}
        <div className="bg-(--color-text) text-white">
          <div className="flex flex-col gap-2 border-b border-white/10 px-7 py-6 sm:flex-row sm:items-end sm:justify-between md:px-9 md:py-7">
            <h3 className="text-2xl font-bold tracking-tight">What stores have seen after switching</h3>
            <p className="text-sm text-white/50">Results vary by store</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {CASES.map(({ brand, result, metric, highlight, src }) => (
              <article
                key={brand}
                className="proof-card flex flex-col border-b border-white/10 p-7 last:border-b-0 md:border-b-0 md:border-r md:p-9 md:last:border-r-0"
              >
                <h4 className="text-[15px] font-semibold text-white/70">{brand}</h4>
                <p className="mt-6 text-[clamp(2.2rem,4vw,3rem)] font-bold leading-none tracking-tight">{result}</p>
                <p className="mt-3 text-base font-semibold">{metric}</p>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-white/60">{highlight}</p>
                <p className="mt-6 flex items-center gap-2 text-[12px] text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25d366]" aria-hidden />
                  {src}
                </p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-(--color-text-muted)">
          Figures from published brand case studies. Results vary by store volume, checkout
          health, and opt-in rates. WhatsApp channel stats are Meta and industry benchmarks.
        </p>
      </div>
    </section>
  )
}
