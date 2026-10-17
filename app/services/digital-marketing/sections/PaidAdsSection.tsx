'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowUp, Trophy } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, DUR, EASE, STAGGER } from '@/lib/gsap/reveals'
import { StickyNote, CurvedArrow } from './StickyNote'

// A worked example (not client results). Multipliers are derived from these
// numbers, so changing a figure keeps the badges honest.
const BUDGET = '₹10,000'
const METRICS = [
  { key: 'clicks', label: 'Clicks',     a: 1280, b: 320, aBars: [60, 72, 64, 88, 80], bBars: [40, 22, 14, 12, 10] },
  { key: 'calls',  label: 'Calls',      a: 6,    b: 28,  aBars: [22, 30, 46, 24, 18], bBars: [24, 40, 34, 62, 92] },
  { key: 'forms',  label: 'Form fills', a: 4,    b: 19,  aBars: [52, 30, 20, 26, 18], bBars: [22, 34, 28, 58, 86] },
]
const ratio = (hi: number, lo: number) => `${(Math.round((hi / lo) * 10) / 10).toString().replace(/\.0$/, '')}x`

type Side = 'a' | 'b'

function AdCard({ side }: { side: Side }) {
  const isB = side === 'b'
  return (
    <div
      className={`paid-card paid-card-${side} border-2 p-5 md:p-6 ${
        isB ? 'border-(--color-accent) bg-(--color-surface)' : 'border-(--color-border) bg-(--color-surface)'
      }`}
    >
      <div className="flex items-center gap-3 border-b border-(--color-border) pb-4">
        <span className={`grid h-9 w-9 place-items-center text-sm font-bold ${isB ? 'bg-(--color-accent) text-(--color-text)' : 'bg-(--color-text) text-(--color-surface)'}`}>
          {isB ? 'B' : 'A'}
        </span>
        <div>
          <p className="text-lg font-bold leading-none text-(--color-text)">Ad {isB ? 'B' : 'A'}</p>
          <p className="mt-1 text-xs text-(--color-text-faint)">{isB ? 'Fewer clicks, more customers' : 'More clicks, no customers'}</p>
        </div>
      </div>

      <dl>
        <div className="border-b border-(--color-border) py-3">
          <dt className="text-xs text-(--color-text-faint)">Budget</dt>
          <dd className="mt-1 font-mono text-lg font-bold text-(--color-text)">{BUDGET}</dd>
        </div>
        {METRICS.map((m) => {
          const mine = m[side]
          const other = m[isB ? 'a' : 'b']
          const wins = mine > other
          const bars = isB ? m.bBars : m.aBars
          // Highlight bars only where this ad wins on something that brings customers
          const strong = isB && m.key !== 'clicks'
          return (
            <div key={m.key} className="flex items-end justify-between gap-3 border-b border-(--color-border) py-3 last:border-b-0">
              <div>
                <dt className="text-xs text-(--color-text-faint)">{m.label}</dt>
                <dd className="mt-1 flex items-center gap-2">
                  <span className="paid-num font-mono text-xl font-bold text-(--color-text)" data-value={mine}>
                    {mine.toLocaleString('en-US')}
                  </span>
                  {wins && (
                    <span className="paid-badge inline-flex items-center border border-(--color-text) px-1.5 py-0.5 text-[11px] font-bold text-(--color-text)">
                      <ArrowUp className="h-3 w-3" strokeWidth={3} />{ratio(mine, other)}
                    </span>
                  )}
                </dd>
              </div>
              <div aria-hidden="true" className="flex h-8 items-end gap-1">
                {bars.map((h, i) => (
                  <span key={i} className={`paid-bar block w-2 ${strong ? 'bg-(--color-accent)' : 'bg-(--color-border-strong)'}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          )
        })}
      </dl>
    </div>
  )
}

export default function PaidAdsSection() {
  const scope = useRef<HTMLElement>(null)

  // Story: both cards land → numbers count, bars grow → "VS" → the sticky
  // notes give the verdict on each → Ad A dims → the budget move lands.
  // Markup is the end state.
  useGsapSection(scope, (reduce) => {
    revealLines('#paid-heading', { trigger: scope.current })
    revealFadeUp('.paid-copy', { y: 20, stagger: STAGGER.loose, trigger: scope.current })
    if (reduce) return

    const nums = gsap.utils.toArray<HTMLElement>('.paid-num')
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.paid-stage', start: 'top 70%' } })
    tl.from('.paid-card', { opacity: 0, y: 28, duration: DUR.base, ease: EASE.out, stagger: STAGGER.loose })
    nums.forEach((el) => {
      const target = Number(el.dataset.value)
      const c = { n: 0 }
      el.textContent = '0'
      tl.to(c, { n: target, duration: DUR.slow, ease: EASE.out, onUpdate: () => { el.textContent = Math.round(c.n).toLocaleString('en-US') } }, '-=0.95')
    })
    tl.from('.paid-bar', { scaleY: 0, transformOrigin: 'bottom', duration: DUR.base, ease: EASE.out, stagger: 0.02 }, '<')
      .from('.paid-vs', { opacity: 0, scale: 0.4, duration: DUR.fast, ease: EASE.out })
      .from('.paid-badge', { opacity: 0, scale: 0.6, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base })
      .from('.sticky-note', { opacity: 0, scale: 1.25, duration: DUR.fast, ease: EASE.out, stagger: 0.3 })
      .from('.sticky-arrow', { opacity: 0, duration: DUR.fast, stagger: 0.3 }, '<0.1')
      // fromTo: '.paid-card' already tweened opacity from 0, so from() would end at 0
      .fromTo('.paid-card-a', { opacity: 1 }, { opacity: 0.55, duration: DUR.fast })
      .from('.paid-verdict', { opacity: 0, y: 20, duration: DUR.base, ease: EASE.out }, '<')
      .from('.paid-trophy', { rotation: -20, scale: 0.6, duration: DUR.fast, ease: EASE.out }, '-=0.2')
  })

  return (
    <section ref={scope} id="paid" className="scroll-mt-32 overflow-x-clip py-16 md:py-20" aria-labelledby="paid-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-12 xl:items-center xl:gap-10">
          <div className="xl:col-span-5">
            <h2 id="paid-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
              Two Ads, <span className="xl:block">Same Budget.</span>{' '}
              <span className="block text-(--color-accent)">Very Different Results.</span>
            </h2>
            <p className="paid-copy mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
              Ad A gets four times the clicks. Ad B gets almost five times the
              calls. Most reports crown Ad A. We move the money to Ad B, and judge
              every paid campaign the same way.
            </p>
            <div className="paid-copy mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href="#marketing-audit" variant="primary" size="lg" showArrow>
                Book a Free Marketing Audit
              </Button>
              <Link href="/work" className="group inline-flex items-center gap-2 border-b-2 border-(--color-accent) pb-1 text-base font-medium text-(--color-text)">
                See more case studies
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Illustration: example figures, same budget */}
          <div aria-hidden="true" className="paid-stage relative xl:col-span-7">
            <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
              <div className="relative flex flex-col gap-4">
                <StickyNote className="-rotate-3 self-center sm:ml-10 sm:self-start">Looks like a winner<br />on paper.</StickyNote>
                <CurvedArrow className="-left-1 top-2 -scale-x-100" />
                <AdCard side="a" />
              </div>

              <span className="paid-vs self-center justify-self-center text-3xl font-bold italic tracking-tight text-(--color-text) sm:mt-24">VS</span>

              <div className="relative flex flex-col gap-4">
                <StickyNote className="rotate-2 self-center sm:mr-6 sm:self-end">This ad brings<br />customers.</StickyNote>
                <CurvedArrow className="-right-2 top-6 rotate-12" />
                <AdCard side="b" />
              </div>
            </div>

            <div className="paid-verdict mx-auto mt-8 flex w-fit items-center gap-4 bg-(--color-accent) px-6 py-4">
              <Trophy className="paid-trophy h-8 w-8 shrink-0 text-(--color-text)" strokeWidth={1.75} />
              <p className="text-(--color-text)">
                <span className="block text-[11px] font-bold uppercase tracking-widest">We pause Ad A and</span>
                <span className="block text-lg font-bold md:text-xl">Move the budget to Ad B.</span>
              </p>
            </div>
            <p className="mt-4 text-center text-xs text-(--color-text-faint)">Example figures. Both ads ran on the same budget.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
