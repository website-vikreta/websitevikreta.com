'use client'

import { useRef } from 'react'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import RtoCalculator from '../components/RtoCalculator'

const PAINS = [
  {
    stat: '70%',
    title: 'Carts abandoned before purchase',
    line: 'Seven in ten checkouts never complete. That revenue is recoverable if you reach buyers where they actually read messages.',
  },
  {
    stat: '~8%',
    title: 'Email recovery rate',
    line: 'Cart recovery emails land in Promotions. WhatsApp open rates run at 98%. The channel difference is the strategy.',
  },
  {
    stat: '₹250+',
    title: 'Per COD return, minimum',
    line: 'Shipping out, shipping back, QC. One message before dispatch catches the order nobody wanted to begin with.',
  },
]

export default function PainSection() {
  const painScope = useRef<HTMLElement>(null)
  const mathScope = useRef<HTMLElement>(null)

  useGsapSection(painScope, () => {
    revealLines('#pain-heading', { trigger: painScope.current })
    revealFadeUp('.pain-card', { y: 24, stagger: STAGGER.base, trigger: painScope.current })
  })

  useGsapSection(mathScope, () => {
    revealLines('#math-heading', { trigger: mathScope.current })
    revealFadeUp('.math-copy',  { y: 20, trigger: mathScope.current })
    revealFadeUp('.math-calc',  { y: 28, delay: 0.1, trigger: mathScope.current })
  })

  return (
    <>
      {/* ── 3 pain stats ── */}
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

          <div className="grid grid-cols-1 gap-px overflow-hidden border border-(--color-border) bg-(--color-border) md:grid-cols-3">
            {PAINS.map(({ stat, title, line }) => (
              <article
                key={title}
                className="pain-card bg-(--color-surface) p-7 md:p-9"
              >
                <p
                  className="text-h2 font-bold tracking-tight"
                  style={{ color: 'var(--color-accent)', lineHeight: 1 }}
                >
                  {stat}
                </p>
                <h3 className="mt-4 text-base font-bold leading-snug text-(--color-text)">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
                  {line}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── RTO calculator — dark panel ── */}
      <section ref={mathScope} id="rto-math" className="pb-16 md:pb-20" aria-labelledby="math-heading">
        <div className="container">
          <div
            style={{ background: 'var(--color-text)', padding: 'clamp(2rem,5vw,4rem)' }}
          >
            <div
              className="grid grid-cols-1 gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-2"
              style={{ maxWidth: '980px', margin: '0 auto' }}
            >
              {/* Copy */}
              <div>
                <p className="text-meta-label mb-5 font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  The math
                </p>
                <h2
                  id="math-heading"
                  className="text-h2 font-bold tracking-tight"
                  style={{ color: '#fff', maxWidth: '14ch', lineHeight: 1.05 }}
                >
                  Nobody puts this number on a slide.
                </h2>
                <p
                  className="math-copy mt-6 text-body-lg leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '44ch' }}
                >
                  A returned COD order costs more than the sale ever made. Shipping
                  out, shipping back, packing materials, QC. That number compounds
                  daily across every store shipping blind.
                </p>
                <p
                  className="math-copy mt-5 text-body-lg leading-relaxed"
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    maxWidth: '44ch',
                    paddingLeft: '16px',
                    borderLeft: '2px solid #25d366',
                  }}
                >
                  One WhatsApp before the parcel moves catches the orders nobody
                  wanted to begin with.
                </p>
              </div>

              {/* Calculator */}
              <div className="math-calc">
                <RtoCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
