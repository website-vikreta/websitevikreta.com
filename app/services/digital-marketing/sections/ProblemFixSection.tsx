'use client'

import { useRef, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, MousePointer2, Search, Sparkles, Star } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGsapSection, revealLines, revealFadeUp, DUR, EASE } from '@/lib/gsap/reveals'

// Mini visuals are illustrations; their figures are examples, not client data.

/** Three short yellow strokes in a card's corner, the "something happened here" mark. */
// Each mini card has its own colour, matching what it depicts (growth green,
// Google blue, AI purple...). This section deliberately goes beyond the
// yellow-only accent so the five cards read as five different tools.
const C = {
  green: '#16A34A', greenSoft: '#DCFCE7',
  blue: '#1A73E8', blueSoft: '#E8F0FE',
  purple: '#7C3AED', purpleSoft: '#F3E8FF',
  teal: '#0D9488',
}

function Burst({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="pf-burst absolute right-2 top-2 h-4 w-4" style={{ color }}>
      <path d="M5 13 L2 9 M10 10 V4 M15 13 L18 9" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
    </svg>
  )
}

function MiniCard({ children, color }: { children: ReactNode; color: string }) {
  return <div className="pf-mini relative h-[116px] border border-(--color-border-strong) bg-(--color-surface) p-3.5">{children}<Burst color={color} /></div>
}

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  )
}

function Trend({ label, value, change, up, color }: { label: string; value: string; change: string; up: boolean; color: string }) {
  // Rising or falling line with a fade under it, in the card's colour.
  const line = up ? 'M0 44 L14 36 L26 40 L40 26 L52 30 L66 14 L80 4' : 'M0 6 L14 12 L26 10 L40 24 L52 22 L66 36 L80 42'
  return (
    <MiniCard color={color}>
      <div className="flex h-full items-end justify-between gap-3">
        <div className="self-start">
          <p className="text-[11px] text-(--color-text-muted)">{label}</p>
          <p className="mt-1 font-mono text-xl font-bold leading-none text-(--color-text)">{value}</p>
          <p className="mt-2 inline-flex items-center gap-0.5 text-xs font-bold" style={{ color }}>
            {up ? <ArrowUp className="h-3 w-3" strokeWidth={3} /> : <ArrowDown className="h-3 w-3" strokeWidth={3} />}{change}
          </p>
        </div>
        <svg viewBox="0 0 80 48" className="h-12 w-24 overflow-visible">
          <defs>
            <linearGradient id={`pf-fade-${label.replace(/\s/g, '')}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.35" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${line} L80 48 L0 48 Z`} fill={`url(#pf-fade-${label.replace(/\s/g, '')})`} className="pf-area" />
          <path d={line} fill="none" stroke={color} strokeWidth="2" pathLength={1} strokeDasharray="1" className="pf-line" />
        </svg>
      </div>
    </MiniCard>
  )
}

const VISUALS: Record<string, ReactNode> = {
  visitors: <Trend label="Monthly visitors" value="12,480" change="220%" up color={C.green} />,
  rank: (
    <MiniCard color={C.blue}>
      <p className="flex items-center gap-2 border-b border-(--color-border) pb-1.5 text-[11px] text-(--color-text)">
        <GoogleG /> <span className="flex-1">plumber near me</span>
        <Search className="mr-5 h-3 w-3 text-(--color-text-faint)" strokeWidth={2.5} />
      </p>
      <ol className="mt-2 flex flex-col gap-1.5 text-[11px]">
        <li className="pf-rank-1 flex items-center gap-2 px-1.5 py-0.5 font-bold" style={{ backgroundColor: C.blueSoft, color: C.blue }}><span>1</span> Your Business</li>
        <li className="flex items-center gap-2 px-1.5 text-(--color-text-faint)"><span>2</span> Competitor</li>
        <li className="flex items-center gap-2 px-1.5 text-(--color-text-faint)"><span>3</span> Competitor</li>
      </ol>
    </MiniCard>
  ),
  ai: (
    <MiniCard color={C.purple}>
      <div className="flex gap-3">
        <Sparkles className="h-6 w-6 shrink-0" style={{ color: C.purple }} strokeWidth={1.75} />
        <div className="flex-1">
          <p className="text-[11px] text-(--color-text-muted)">AI answer</p>
          <p className="pf-ai-pick mt-1.5 inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-bold" style={{ backgroundColor: C.purpleSoft, color: C.purple }}>
            <Star className="h-3 w-3 fill-(--color-accent) text-(--color-accent)" strokeWidth={0} /> Your Business
          </p>
          <span className="mt-2 block h-1.5 w-full bg-(--color-bg-muted)" />
          <span className="mt-1.5 block h-1.5 w-3/4 bg-(--color-bg-muted)" />
        </div>
      </div>
    </MiniCard>
  ),
  calls: (
    <MiniCard color={C.green}>
      <div className="flex h-full flex-col border border-(--color-border)">
        <div className="flex gap-1 border-b border-(--color-border) bg-(--color-bg-muted) px-2 py-1">
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />)}
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center gap-1.5">
          <span className="block h-1.5 w-2/3 bg-(--color-bg-muted)" />
          <span className="pf-cta px-4 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: C.green }}>Call now</span>
          <MousePointer2 className="pf-cursor absolute bottom-0.5 right-[22%] h-4 w-4 fill-(--color-text) text-(--color-text)" strokeWidth={1} />
        </div>
      </div>
    </MiniCard>
  ),
  cpl: <Trend label="Cost per lead" value="₹320" change="75%" up={false} color={C.teal} />,
}

const ROWS = [
  { visual: 'visitors', problem: ['Hardly anyone', 'visits the site.'], why: 'Low visibility on Google and in AI answers.',
    fix: 'Increase your visibility.', how: 'Technical fixes and content around what people search for.' },
  { visual: 'rank', problem: ['Not ranking for', 'your main service.'], why: 'Competitors get the clicks instead.',
    fix: 'Rank for the right searches.', how: 'A focused page for each service you offer.' },
  { visual: 'ai', problem: ['Competitors show up', 'in AI answers.'], why: 'People ask ChatGPT, Perplexity, and Gemini for a recommendation, and you aren’t in it.',
    fix: 'Get mentioned by AI tools.', how: 'Schema markup and clear, answer-first content.' },
  { visual: 'calls', problem: ['People visit but', 'never call.'], why: 'Slow pages, unclear offers, and no easy way to get in touch.',
    fix: 'Turn more visitors into calls.', how: 'Faster pages, clearer offers, and a call or form on every page.' },
  { visual: 'cpl', problem: ['Ad spend keeps rising,', 'leads don’t.'], why: 'More money going out, the same number of enquiries coming in.',
    fix: 'Get more from your ad budget.', how: 'Every campaign judged by cost per lead. The weak ones get paused.' },
]

export default function ProblemFixSection() {
  const scope = useRef<HTMLElement>(null)

  // Per row, as it scrolls in: problem → arrow draws → fix → the mini card
  // lands and plays its own beat (chart draws, #1 highlights, AI picks you,
  // cursor clicks). Markup is the end state.
  useGsapSection(scope, (reduce) => {
    revealLines('#problem-fix-heading', { trigger: scope.current })
    revealFadeUp('.pf-intro', { y: 16, trigger: scope.current })
    if (reduce) return
    gsap.utils.toArray<HTMLElement>('.pf-row').forEach((row) => {
      const q = (sel: string) => row.querySelectorAll(sel)
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } })
      tl.from(q('.pf-problem'), { opacity: 0, x: -16, duration: DUR.fast, ease: EASE.out })
        .from(q('.pf-arrow'), { scaleX: 0, transformOrigin: 'left', duration: DUR.fast, ease: EASE.draw })
        .from(q('.pf-fix'), { opacity: 0, x: 16, duration: DUR.fast, ease: EASE.out }, '-=0.1')
        .from(q('.pf-mini'), { opacity: 0, y: 12, duration: DUR.fast, ease: EASE.out }, '-=0.15')
      if (q('.pf-line').length) {
        tl.fromTo(q('.pf-line'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: DUR.base, ease: EASE.out })
          .from(q('.pf-area'), { opacity: 0, duration: DUR.fast }, '-=0.3')
      }
      if (q('.pf-rank-1').length) tl.from(q('.pf-rank-1'), { backgroundColor: 'rgba(0,0,0,0)', x: -6, duration: DUR.fast })
      if (q('.pf-ai-pick').length) tl.from(q('.pf-ai-pick'), { opacity: 0, scale: 0.8, duration: DUR.fast, ease: EASE.out })
      if (q('.pf-cursor').length) {
        tl.from(q('.pf-cursor'), { x: 24, y: 14, opacity: 0, duration: DUR.base, ease: EASE.out })
          .to(q('.pf-cta'), { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 })
      }
      tl.from(q('.pf-burst'), { opacity: 0, scale: 0.4, duration: DUR.fast, ease: EASE.out }, '-=0.1')
    })
  })

  return (
    <section ref={scope} id="problems" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="problem-fix-heading">
      <div className="container">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="problem-fix-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
            Sound Familiar?
            <span className="block">Here&rsquo;s What We Do About It.</span>
          </h2>
          <p className="pf-intro max-w-sm text-body-lg leading-relaxed text-(--color-text-muted)">
            The five problems we hear most from businesses that come to us,
            and what we change for each one.
          </p>
        </div>

        <div className="hidden grid-cols-[1fr_5rem_1fr_15rem] gap-x-6 border-b-2 border-(--color-text) pb-3 lg:grid">
          <p className="text-xs font-bold uppercase tracking-widest text-(--color-text)">The problem</p>
          <span />
          <p className="text-xs font-bold uppercase tracking-widest text-(--color-text)">What we do</p>
          <span />
        </div>

        <ul>
          {ROWS.map((row) => (
            <li
              key={row.fix}
              className="pf-row grid grid-cols-1 gap-4 border-b border-(--color-border) py-7 lg:grid-cols-[1fr_5rem_1fr_15rem] lg:items-center lg:gap-x-6"
            >
              <div className="pf-problem">
                <p className="text-xl font-bold leading-tight text-(--color-text) md:text-2xl">
                  {row.problem[0]} <span className="lg:block">{row.problem[1]}</span>
                </p>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-(--color-text-muted)">{row.why}</p>
              </div>
              <span aria-hidden="true" className="pf-arrow flex w-12 items-center lg:w-auto">
                <span className="h-0.5 flex-1 bg-(--color-text)" />
                <span className="h-0 w-0 border-y-[6px] border-l-[9px] border-y-transparent border-l-(--color-text)" />
              </span>
              <div className="pf-fix">
                <p className="text-xl font-bold leading-tight text-(--color-text) md:text-2xl">{row.fix}</p>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-(--color-text-muted)">{row.how}</p>
              </div>
              <div aria-hidden="true" className="max-w-xs lg:max-w-none">{VISUALS[row.visual]}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
