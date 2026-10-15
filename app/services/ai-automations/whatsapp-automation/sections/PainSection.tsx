'use client'

import { useRef, type ReactNode } from 'react'
import { LazyMotion, domAnimation, m } from 'motion/react'
import { ArrowRight, Package, ScanSearch, ShoppingCart, Truck } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import RtoCalculator from '../components/RtoCalculator'

const EASE = [0.16, 1, 0.3, 1] as const

/* 70%: ten carts, seven of them drop away */
function CartsChart() {
  return (
    <div className="grid w-fit grid-cols-5 gap-2">
      {Array.from({ length: 10 }, (_, i) => {
        const lost = i >= 3
        return (
          <m.span
            key={i}
            variants={{
              hide: { opacity: 0, y: 6 },
              show: { opacity: lost ? 0.28 : 1, y: 0, transition: { delay: 0.05 * i + (lost ? 0.5 : 0), duration: 0.4, ease: EASE } },
            }}
            className="relative grid h-9 w-9 place-items-center rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text)"
          >
            <ShoppingCart size={16} strokeWidth={1.75} />
            {lost && <span aria-hidden className="absolute h-px w-6 rotate-45 bg-(--color-text)" />}
          </m.span>
        )
      })}
    </div>
  )
}

/* ~8% vs 98%: what email recovers against how often WhatsApp is opened */
function ChannelBars() {
  const rows = [
    { label: 'Email recovers', value: '~8%', pct: 8, color: '#a1a1aa' },
    { label: 'WhatsApp is opened', value: '98%', pct: 98, color: '#25d366' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {rows.map(({ label, value, pct, color }, i) => (
        <div key={label}>
          <span className="flex justify-between text-[13px] text-(--color-text-muted)">
            {label}<span className="font-semibold tabular-nums text-(--color-text)">{value}</span>
          </span>
          <span className="mt-1.5 block h-2.5 overflow-hidden rounded-full bg-(--color-bg-muted)">
            <m.span
              className="block h-full rounded-full"
              style={{ background: color }}
              variants={{ hide: { width: '0%' }, show: { width: `${pct}%`, transition: { delay: 0.3 + i * 0.25, duration: 1, ease: EASE } } }}
            />
          </span>
        </div>
      ))}
    </div>
  )
}

/* ₹250+: the round trip a refused COD parcel makes */
function ReturnRoute() {
  const stops: { icon: ReactNode; label: string }[] = [
    { icon: <Package size={16} strokeWidth={1.75} />, label: 'Packed' },
    { icon: <Truck size={16} strokeWidth={1.75} />, label: 'Out' },
    { icon: <Truck size={16} strokeWidth={1.75} className="-scale-x-100" />, label: 'Back' },
    { icon: <ScanSearch size={16} strokeWidth={1.75} />, label: 'QC' },
  ]
  return (
    <div className="flex items-center gap-1.5">
      {stops.map(({ icon, label }, i) => (
        <m.span
          key={label}
          className="flex items-center gap-1.5"
          variants={{ hide: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.22, duration: 0.4, ease: EASE } } }}
        >
          {i > 0 && <ArrowRight size={12} aria-hidden className="text-(--color-text-faint)" />}
          <span className="flex flex-col items-center gap-1">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-(--color-border) bg-(--color-surface) text-(--color-text)">{icon}</span>
            <span className="text-[11px] text-(--color-text-muted)">{label}</span>
          </span>
        </m.span>
      ))}
    </div>
  )
}

const PAINS: { stat: string; title: string; line: string; chart: ReactNode }[] = [
  {
    stat: '70%',
    title: 'Carts abandoned before purchase',
    line: 'Seven in ten checkouts never complete. That revenue is recoverable if you reach buyers where they actually read messages.',
    chart: <CartsChart />,
  },
  {
    stat: '~8%',
    title: 'Email recovery rate',
    line: 'Cart recovery emails land in Promotions. WhatsApp open rates run at 98%. The channel difference is the strategy.',
    chart: <ChannelBars />,
  },
  {
    stat: '₹250+',
    title: 'Per COD return, minimum',
    line: 'Shipping out, shipping back, QC. One message before dispatch catches the order nobody wanted to begin with.',
    chart: <ReturnRoute />,
  },
]

export default function PainSection() {
  const painScope = useRef<HTMLElement>(null)

  useGsapSection(painScope, () => {
    revealLines('#pain-heading', { trigger: painScope.current })
    revealFadeUp('.pain-card', { y: 20, stagger: STAGGER.base, trigger: painScope.current })
  })


  return (
      <section ref={painScope} id="pain" className="py-16 md:py-20" aria-labelledby="pain-heading">
        <div className="container">
          <div className="mb-10 max-w-2xl md:mb-14">
            <h2
              id="pain-heading"
              className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              You are losing buyers you already paid to acquire
            </h2>
          </div>

          <LazyMotion features={domAnimation}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
              {PAINS.map(({ stat, title, line, chart }) => (
                <m.article
                  key={title}
                  initial="hide"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  className="pain-card flex flex-col overflow-hidden border border-(--color-border) bg-(--color-surface) shadow-[0_24px_48px_-30px_rgba(20,18,15,0.3)] transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Chart panel: a fixed height so the three cards' text lines up */}
                  <div aria-hidden className="flex h-36 items-center border-b border-(--color-border) bg-[#fafaf8] px-7 md:px-9">
                    <div className="w-full">{chart}</div>
                  </div>
                  <div className="p-7 md:p-9">
                    <p className="text-h2 font-bold leading-none tracking-tight text-(--color-text)">{stat}</p>
                    <h3 className="mt-4 text-base font-bold leading-snug text-(--color-text)">{title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">{line}</p>
                  </div>
                </m.article>
              ))}
            </div>
          </LazyMotion>
        </div>
      </section>
  )
}

/* The RTO cost calculator. Sits right before Packages so the owner sees what returns cost them,
   in their own numbers, immediately before the price. */
export function RtoSection() {
  const mathScope = useRef<HTMLElement>(null)

  useGsapSection(mathScope, () => {
    revealLines('#math-heading', { trigger: mathScope.current })
    revealFadeUp('.math-copy',  { y: 20, trigger: mathScope.current })
    revealFadeUp('.math-calc',  { y: 30, delay: STAGGER.base, trigger: mathScope.current })
  })

  return (
      <section ref={mathScope} id="rto-math" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="math-heading">
        <div className="container">
          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <h2 id="math-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
              Nobody puts this number on a slide.
            </h2>
            <div>
              <p className="math-copy text-body-lg leading-relaxed text-(--color-text-muted)">
                A returned COD order costs more than the sale ever made. Shipping out, shipping back,
                packing materials, QC. That number compounds daily across every store shipping blind.
              </p>
              <p className="math-copy mt-4 text-body-lg font-medium leading-relaxed text-(--color-text)">
                One WhatsApp before the parcel moves catches the orders nobody wanted to begin with.
              </p>
            </div>
          </div>
          <div className="math-calc">
            <RtoCalculator />
          </div>
        </div>
      </section>
  )
}
