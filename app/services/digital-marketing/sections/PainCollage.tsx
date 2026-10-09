'use client'

import { useRef } from 'react'
import { ArrowDown, ArrowUp, CalendarDays, Hourglass } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGsapSection, DUR, EASE, STAGGER } from '@/lib/gsap/reveals'
import { StickyNote, CurvedArrow } from './StickyNote'

// Illustration of a "busy but useless" marketing setup. Every figure here is an
// example for the picture, not client data. Smooth illustration style: rounded
// cards, soft shadows, real-world colours (green = up, red = loss).
const KEYWORDS = [
  { term: 'plumber near me',   pos: 3, imp: '12,480' },
  { term: 'emergency plumber', pos: 5, imp: '8,210' },
  { term: 'drain cleaning',    pos: 7, imp: '5,930' },
  { term: 'boiler repair',     pos: 9, imp: '4,120' },
]
const IMPRESSION_BARS = [18, 26, 22, 30, 28, 38, 34, 46, 42, 55, 50, 64, 60, 74, 70, 88]
const LEAD_WEEKS = [{ w: 'Week 1', h: 100 }, { w: 'Week 2', h: 78 }, { w: 'Week 3', h: 38 }, { w: 'Week 4', h: 18 }]
const POSTS = [
  { title: 'How to fix a leaking tap',          status: 'Draft',       dot: '#9CA3AF' },
  { title: 'Signs your boiler needs a service', status: 'Not started', dot: '#5EC4C4' },
  { title: 'What a bathroom refit costs',       status: 'Not started', dot: '#34A853' },
  { title: 'Meet the team',                     status: 'Not started', dot: '#121212' },
]

const GOOD = { fg: '#15803D', bg: '#DCFCE7' }
const LOSS = { fg: '#DC2626', bg: '#FEE2E2' }

const card = 'pc-card rounded-2xl border border-(--color-border) bg-(--color-surface) p-4 shadow-[0_10px_34px_-14px_rgba(18,18,18,0.2)] md:p-5'

/** Ads-style mark: two slanted bars and a dot. */
function AdsMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 shrink-0">
      <rect x="10.2" y="1.5" width="6" height="19" rx="3" fill="#4285F4" transform="rotate(-28 13.2 11)" />
      <rect x="4.6" y="5" width="6" height="15" rx="3" fill="#FBBC04" transform="rotate(28 7.6 12.5)" />
      <circle cx="5.2" cy="18.6" r="3" fill="#34A853" />
    </svg>
  )
}

/**
 * Desktop: an absolutely-positioned collage on a fixed-height stage. Below lg
 * the same nodes fall back into a plain stacked column (notes between cards),
 * so mobile gets the story without overlap maths. Markup is the end state.
 */
export default function PainCollage() {
  const scope = useRef<HTMLDivElement>(null)

  useGsapSection(scope, (reduce) => {
    if (reduce) return
    const impressions = scope.current?.querySelector<HTMLElement>('.pc-imp-value')
    if (impressions) impressions.textContent = '0'
    const counter = { n: 0 }

    const tl = gsap.timeline({ scrollTrigger: { trigger: scope.current, start: 'top 70%' } })
    tl.from('.pc-card', { opacity: 0, y: 28, duration: DUR.base, ease: EASE.out, stagger: STAGGER.loose })
      .from('.pc-row', { opacity: 0, x: -8, duration: DUR.fast, ease: EASE.out, stagger: 0.06 }, '-=0.5')
      .from('.pc-imp-bar', { scaleY: 0, transformOrigin: 'bottom', duration: DUR.base, ease: EASE.out, stagger: 0.03 }, '<')
      .to(counter, {
        n: 48320, duration: DUR.slow, ease: EASE.out,
        onUpdate: () => { if (impressions) impressions.textContent = Math.round(counter.n).toLocaleString('en-US') },
      }, '<')
      .from('.pc-lead-bar', { scaleY: 0, transformOrigin: 'bottom', duration: DUR.base, ease: EASE.out, stagger: STAGGER.base }, '-=0.6')
      .from('.pc-loss', { opacity: 0, scale: 0.6, duration: DUR.fast, ease: EASE.out })
      .from('.pc-status', { opacity: 0, scale: 0.8, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base }, '-=0.2')
      .from('.pc-link', { opacity: 0, duration: DUR.fast, stagger: STAGGER.base })
      // The notes land last: the verdict on each card
      .from('.sticky-note', { opacity: 0, scale: 1.25, duration: DUR.fast, ease: EASE.out, stagger: 0.25 })
      .from('.sticky-arrow', { opacity: 0, duration: DUR.fast, stagger: 0.25 }, '<0.1')
      .from('.pc-hourglass', { opacity: 0, y: 12, duration: DUR.fast, ease: EASE.out })

    // Ambient: the hourglass keeps turning over. Time passing, nothing changing.
    gsap.to('.pc-hourglass-icon', { rotation: 180, duration: DUR.base, ease: EASE.inOut, repeat: -1, repeatDelay: 1.6 })
  })

  return (
    <div ref={scope} aria-hidden="true" className="relative flex flex-col gap-5 lg:block lg:h-[640px]">

      {/* Dashed links between cards (desktop only). Percent viewBox stretched to the stage. */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
        <path className="pc-link dash-march" d="M 14 37 C 13 24, 17 19, 23 18" fill="none" stroke="var(--color-text)" strokeWidth="1.25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        <path className="pc-link dash-march" d="M 70 30 C 72 31, 72 33, 73 34" fill="none" stroke="var(--color-text)" strokeWidth="1.25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        <path className="pc-link dash-march" d="M 80 44 C 79 50, 73 54, 69 59" fill="none" stroke="var(--color-text)" strokeWidth="1.25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        <path className="pc-link dash-march" d="M 52 82 C 50 80, 50 78, 48.5 77" fill="none" stroke="var(--color-text)" strokeWidth="1.25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
      </svg>

      <StickyNote soft className="-rotate-6 lg:absolute lg:left-[46%] lg:top-0">Good rankings.<br />No calls.</StickyNote>
      <CurvedArrow className="left-[40%] top-2 -scale-x-100" />

      {/* SEO report */}
      <div className={`${card} lg:absolute lg:left-[24%] lg:top-[11%] lg:w-[46%]`}>
        <p className="text-base font-bold text-(--color-text)">SEO Report</p>
        <table className="mt-3 w-full text-left text-xs md:text-sm">
          <thead>
            <tr className="text-(--color-text-faint)">
              <th className="pb-2 font-normal">Keyword</th>
              <th className="pb-2 text-right font-normal">Position</th>
              <th className="pb-2 text-right font-normal">Impressions</th>
            </tr>
          </thead>
          <tbody className="text-(--color-text)">
            {KEYWORDS.map((k) => (
              <tr key={k.term} className="pc-row border-t border-(--color-border)">
                <td className="py-2">{k.term}</td>
                <td className="py-2 text-right font-mono">{k.pos}</td>
                <td className="py-2 text-right font-mono">{k.imp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Impressions */}
      <div className={`${card} lg:absolute lg:right-0 lg:top-[17%] lg:w-[27%]`}>
        <p className="text-xs text-(--color-text-muted)">Impressions</p>
        <p className="mt-1 flex items-center gap-2">
          <span className="pc-imp-value font-mono text-2xl font-bold text-(--color-text)">48,320</span>
          <span className="inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold" style={{ color: GOOD.fg, backgroundColor: GOOD.bg }}>
            <ArrowUp className="h-3 w-3" strokeWidth={3} />32%
          </span>
        </p>
        <div className="mt-4 flex h-16 items-end gap-1">
          {IMPRESSION_BARS.map((h, i) => (
            <span key={i} className="pc-imp-bar block flex-1 rounded-t-sm bg-gradient-to-t from-[#C9CCD1] to-[#9AA0A8]" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <StickyNote soft className="rotate-[-5deg] self-end lg:absolute lg:left-0 lg:top-[38%]">Works while<br />you pay.</StickyNote>
      <CurvedArrow className="left-[3%] top-[49%] rotate-12" />

      {/* Paid ads */}
      <div className={`${card} lg:absolute lg:left-[4%] lg:top-[52%] lg:w-[44%]`}>
        <p className="flex items-center gap-2 text-base font-bold text-(--color-text)">
          <AdsMark /> Paid Ads
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-2xl font-bold text-(--color-text)">₹42,500</p>
            <p className="text-xs text-(--color-text-muted)">Spent this month</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-(--color-text-muted)">Leads <span className="font-mono font-bold text-(--color-text)">2</span></p>
            <p className="pc-loss mt-1 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold" style={{ color: LOSS.fg, backgroundColor: LOSS.bg }}>
              <ArrowDown className="h-3 w-3" strokeWidth={3} />60%
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3 border-t border-(--color-border) pt-4">
          {LEAD_WEEKS.map((wk) => (
            <div key={wk.w} className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-full items-end">
                <span className="pc-lead-bar block w-full rounded-t-md bg-(--color-bg-muted)" style={{ height: `${wk.h}%` }} />
              </div>
              <span className="text-[10px] text-(--color-text-muted) md:text-xs">{wk.w}</span>
            </div>
          ))}
        </div>
      </div>

      <StickyNote soft className="-rotate-6 lg:absolute lg:right-[2%] lg:top-[46%]">Content sits<br />unpublished.</StickyNote>
      <CurvedArrow className="right-[1%] top-[55%] -rotate-6" />

      {/* Content calendar */}
      <div className={`${card} lg:absolute lg:right-0 lg:top-[60%] lg:w-[48%]`}>
        <p className="flex items-center gap-2 text-base font-bold text-(--color-text)">
          <CalendarDays className="h-5 w-5" strokeWidth={1.75} /> Content Calendar
        </p>
        <ul className="mt-2">
          {POSTS.map((p) => (
            <li key={p.title} className="pc-row flex items-center justify-between gap-3 border-t border-(--color-border) py-2 first:border-t-0">
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: p.dot }} />
                <span className="truncate text-xs text-(--color-text) md:text-sm">{p.title}</span>
              </span>
              <span
                className="pc-status shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                style={p.status === 'Draft' ? { color: '#4B5563', backgroundColor: '#F3F4F6' } : { color: LOSS.fg, backgroundColor: LOSS.bg }}
              >
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pc-hourglass flex items-center gap-3 lg:absolute lg:bottom-0 lg:left-[30%]">
        <span className="pc-hourglass-icon inline-block"><Hourglass className="h-9 w-9 text-(--color-text)" strokeWidth={1.75} /></span>
        <p className="text-sm font-bold leading-tight text-(--color-text)">No system.<br />No results.</p>
      </div>
    </div>
  )
}
