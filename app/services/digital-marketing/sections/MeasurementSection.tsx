'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, Check, Search, Sparkles } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { useGsapSection, revealLines, revealFadeUp, prefersReducedMotion, DUR, EASE, STAGGER } from '@/lib/gsap/reveals'

// The section shows the report itself: a page like the PDF a client gets each
// month. The five questions on the left map to marked parts of that page; the
// active one is highlighted (auto-cycles, hover/click to pick). Example figures.

const ANSWERS = [
  { q: 'Did marketing make money?',          a: 'Leads, customers, and revenue, compared with last month.' },
  { q: 'Which channel is worth the spend?',  a: 'What one lead costs on each channel.' },
  { q: 'Which campaigns brought customers?', a: 'Spend traced through to paying customers, not clicks.' },
  { q: 'Are we being found?',                a: 'Google rankings and mentions in AI answers.' },
  { q: 'What changes next month?',           a: 'The actions the numbers point to.' },
]

const KPIS = [
  { label: 'Leads',         value: '642',   change: '34%', good: true,  up: true },
  { label: 'Customers',     value: '76',    change: '29%', good: true,  up: true },
  { label: 'Revenue',       value: '₹8.4L', change: '52%', good: true,  up: true },
  { label: 'Cost per lead', value: '₹310',  change: '12%', good: true,  up: false },
]
const FUNNEL = [['Visitors', 12480], ['Leads', 642], ['Qualified', 312], ['Customers', 76]] as const
const CHANNELS = [['Organic search', 280, '#16A34A'], ['Paid search', 320, '#4285F4'], ['Local', 510, '#F59E0B'], ['Social ads', 620, '#EF4444']] as const
const CAMPAIGNS = [
  ['“Emergency plumber” search ads', 41, 12, '₹2.9L'],
  ['Boiler repair guide (blog)',     28, 9,  '₹2.1L'],
] as const
const NEXT = ['Move ₹15k from social to search', 'Rewrite the 2 slowest landing pages', 'Write for 6 new AI questions']

const GOOD = { fg: '#15803D', bg: '#DCFCE7' }

/** A marked part of the report. Highlights when its answer is active. */
function Part({ n, active, className = '', children }: { n: number; active: number; className?: string; children: ReactNode }) {
  const on = n === active
  return (
    <div
      className={`mr-part relative rounded-xl border p-3.5 transition-[background-color,border-color,box-shadow] duration-500 ${
        on ? 'border-(--color-accent) bg-[#FFFBE6] shadow-[0_0_0_4px_rgba(255,214,0,0.18)]' : 'border-(--color-border) bg-(--color-surface)'
      } ${className}`}
    >
      <span
        className={`absolute -left-3 -top-3 grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold transition-colors duration-500 ${
          on ? 'bg-(--color-accent) text-(--color-text)' : 'bg-(--color-text) text-(--color-surface)'
        }`}
      >
        {String(n + 1).padStart(2, '0')}
      </span>
      {children}
    </div>
  )
}

const label = 'text-[11px] font-semibold uppercase tracking-wider text-(--color-text-faint)'

export default function MeasurementSection() {
  const scope = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (hold || prefersReducedMotion()) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % ANSWERS.length), 3800)
    return () => window.clearInterval(id)
  }, [hold])

  useGsapSection(scope, (reduce) => {
    revealLines('#measurement-heading', { trigger: scope.current })
    revealFadeUp('.mr-copy', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    if (reduce) return
    gsap.timeline({ scrollTrigger: { trigger: '.mr-doc', start: 'top 70%' } })
      .from('.mr-doc', { opacity: 0, y: 30, duration: DUR.base, ease: EASE.out })
      .from('.mr-part', { opacity: 0, y: 12, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base }, '-=0.3')
      .from('.mr-bar', { scaleX: 0, transformOrigin: 'left', duration: DUR.base, ease: EASE.out, stagger: 0.05 }, '-=0.4')
  })

  return (
    <section ref={scope} id="measurement" className="scroll-mt-32 overflow-x-clip py-16 md:py-20" aria-labelledby="measurement-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-12 xl:items-center xl:gap-12">

          {/* The five answers */}
          <div className="xl:col-span-5">
            <h2 id="measurement-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
              What Your Monthly Marketing Report{' '}
              <span className="text-(--color-accent)">Actually Tells You</span>
            </h2>
            <p className="mr-copy mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
              One report a month, built around five questions. If a number
              doesn&rsquo;t help answer one of them, it isn&rsquo;t in there.
            </p>

            <ol className="mr-copy mt-6" onMouseLeave={() => setHold(false)}>
              {ANSWERS.map((item, i) => {
                const on = i === active
                return (
                  <li key={item.q}>
                    <button
                      type="button"
                      onMouseEnter={() => { setHold(true); setActive(i) }}
                      onFocus={() => { setHold(true); setActive(i) }}
                      onClick={() => setActive(i)}
                      className="group flex w-full items-start gap-4 border-t border-(--color-border) py-2.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                    >
                      <span className={`font-mono text-sm font-bold transition-colors duration-300 ${on ? 'text-(--color-text)' : 'text-(--color-text-faint)'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className={`block text-base font-bold transition-colors duration-300 ${on ? 'text-(--color-text)' : 'text-(--color-text-muted)'}`}>
                          {item.q}
                        </span>
                        <span className={`grid transition-[grid-template-rows] duration-500 ${on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                          <span className="overflow-hidden text-sm leading-relaxed text-(--color-text-muted)">{item.a}</span>
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* The report itself (example figures) */}
          <div aria-hidden="true" className="xl:col-span-7">
            <div className="mr-doc rounded-2xl border border-(--color-border) bg-(--color-surface) p-5 shadow-[0_24px_60px_-28px_rgba(18,18,18,0.35)] md:p-6">
              {/* Report header */}
              <div className="flex items-start justify-between gap-4 border-b border-(--color-border) pb-3">
                <div>
                  <p className="text-lg font-bold text-(--color-text) md:text-xl">Monthly Marketing Report</p>
                  <p className="mt-0.5 text-xs text-(--color-text-muted)">Your Business · September 2026</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-(--color-bg-muted) px-2.5 py-1 text-[11px] text-(--color-text-muted)">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A]" /> Updated today
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* 01 */}
                <Part n={0} active={active} className="order-1 md:col-span-2">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {KPIS.map((k) => (
                      <div key={k.label}>
                        <p className={label}>{k.label}</p>
                        <p className="mt-0.5 font-mono text-xl font-bold text-(--color-text)">{k.value}</p>
                        <span className="mt-1 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold" style={{ color: GOOD.fg, backgroundColor: GOOD.bg }}>
                          {k.up ? <ArrowUp className="h-2.5 w-2.5" strokeWidth={3} /> : <ArrowDown className="h-2.5 w-2.5" strokeWidth={3} />}{k.change}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 border-t border-(--color-border) pt-2.5 text-[11px] text-(--color-text-muted)">
                    {FUNNEL.map(([name, n], i) => (
                      <span key={name} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-(--color-text-faint)">→</span>}
                        <span><b className="font-mono text-(--color-text)">{n.toLocaleString('en-IN')}</b> {name.toLowerCase()}</span>
                      </span>
                    ))}
                  </p>
                </Part>

                {/* 02 */}
                <Part n={1} active={active} className="order-2">
                  <p className={label}>Cost per lead</p>
                  <div className="mt-2.5 space-y-1.5">
                    {CHANNELS.map(([name, cost, color]) => (
                      <div key={name} className="flex items-center gap-2 text-[11px]">
                        <span className="w-24 shrink-0 text-(--color-text)">{name}</span>
                        <span className="h-2 flex-1 rounded-full bg-(--color-bg-muted)">
                          <span className="mr-bar block h-full rounded-full" style={{ width: `${(cost / 620) * 100}%`, backgroundColor: color }} />
                        </span>
                        <span className="w-10 text-right font-mono font-semibold text-(--color-text)">₹{cost}</span>
                      </div>
                    ))}
                  </div>
                </Part>

                {/* 03 */}
                <Part n={2} active={active} className="order-3 md:order-4">
                  <p className={label}>Top campaigns by revenue</p>
                  <table className="mt-2 w-full text-left text-[11px] md:text-xs">
                    <thead>
                      <tr className="text-(--color-text-faint)">
                        <th className="py-1.5 font-medium">Campaign</th>
                        <th className="hidden py-1.5 pl-3 text-right font-medium sm:table-cell xl:hidden 2xl:table-cell">Leads</th>
                        <th className="py-1.5 pl-3 text-right font-medium">Customers</th>
                        <th className="py-1.5 pl-3 text-right font-medium">Revenue</th>
                      </tr>
                    </thead>
                    <tbody className="text-(--color-text)">
                      {CAMPAIGNS.map(([name, leads, cust, rev]) => (
                        <tr key={name} className="border-t border-(--color-border)">
                          <td className="py-1.5 pr-2">{name}</td>
                          <td className="hidden py-1.5 text-right font-mono sm:table-cell xl:hidden 2xl:table-cell">{leads}</td>
                          <td className="py-1.5 text-right font-mono">{cust}</td>
                          <td className="py-1.5 text-right font-mono font-bold">{rev}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Part>

                {/* 04 */}
                <Part n={3} active={active} className="order-4 md:order-3">
                  <p className={label}>Visibility</p>
                  <div className="mt-2.5 grid grid-cols-2 gap-3">
                    <div>
                      <Search className="h-4 w-4 text-[#4285F4]" strokeWidth={2.25} />
                      <p className="mt-1 font-mono text-xl font-bold text-(--color-text)">14</p>
                      <p className="text-[11px] text-(--color-text-muted)">keywords in Google top 3</p>
                    </div>
                    <div>
                      <Sparkles className="h-4 w-4 text-[#7C3AED]" strokeWidth={2.25} />
                      <p className="mt-1 font-mono text-xl font-bold text-(--color-text)">12</p>
                      <p className="text-[11px] text-(--color-text-muted)">mentions in AI answers</p>
                    </div>
                  </div>
                </Part>

                {/* 05 */}
                <Part n={4} active={active} className="order-5">
                  <p className={label}>Next month</p>
                  <ul className="mt-2 space-y-1.5">
                    {NEXT.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-[11px] leading-snug text-(--color-text) md:text-xs">
                        <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded bg-(--color-accent)"><Check className="h-3 w-3" strokeWidth={3} /></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </Part>
              </div>
            </div>
            <p className="mt-3 text-xs text-(--color-text-faint)">Example report. Figures are illustrative.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
