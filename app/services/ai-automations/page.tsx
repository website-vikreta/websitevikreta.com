'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import IntroAnimation from '@/components/ui/scroll-morph-hero'
import {
  Minus, CheckCircle2,
} from 'lucide-react'
import { DotGrid } from '@/components/ui/DotGrid'
import AutomationWorkflowCanvas from '@/components/ui/automation-workflow-canvas'
import { ParallaxFeatureScroll } from '@/components/ui/parallax-feature-scroll'

// ─── Shared constants ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ─── Animation helpers ────────────────────────────────────────────────────────

function scrollIn(reduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-80px' } as { once: boolean; margin: string },
    transition:  { duration: 0.35, delay, ease: EASE },
  }
}

function cardIn(reduce: boolean | null, i: number) {
  return {
    initial:     { opacity: 0, y: reduce ? 0 : 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-60px' } as { once: boolean; margin: string },
    transition:  { duration: 0.3, delay: i * 0.07, ease: 'easeOut' as const },
  }
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────

function Eyebrow({ label }: { label: string }) {
  return (
    <p
      className="font-mono uppercase mb-3"
      style={{ fontSize: 'var(--text-meta)', letterSpacing: 'var(--tracking-meta)', color: 'var(--color-accent)' }}
    >
      {label}
    </p>
  )
}

// ─── Stat counter ─────────────────────────────────────────────────────────────

function Stat({
  value,
  suffix,
  label,
  display,
  reduce,
}: {
  value: number | null
  suffix: string
  label: string
  display?: string
  reduce: boolean | null
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || value === null) return
    if (reduce) { setCount(value); return }
    const start = performance.now()
    const dur = 800
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1)
      setCount(Math.floor((1 - Math.pow(1 - t, 3)) * value))
      if (t < 1) requestAnimationFrame(tick)
      else setCount(value)
    }
    requestAnimationFrame(tick)
  }, [inView, value, reduce])

  return (
    <div ref={ref} className="border-l border-[var(--color-border)] pl-5 pr-6 py-2">
      <div className="font-bold font-mono leading-none mb-2 text-[var(--color-text)]">
        {display ? (
          <span className="text-5xl md:text-6xl">{display}</span>
        ) : (
          <span className="text-5xl md:text-6xl tabular-nums">
            {count}
            <span className="text-3xl md:text-4xl ml-1">{suffix}</span>
          </span>
        )}
      </div>
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">{label}</p>
    </div>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STAT_ITEMS: { value: number | null; suffix: string; label: string; display?: string }[] = [
  { value: 20,   suffix: '+', label: 'Workflows automated'  },
  { value: 10,   suffix: '+', label: 'Industries served'    },
  { value: 100,  suffix: '%', label: 'AI-first delivery'    },
  { value: null, suffix: '',  label: 'Average response time', display: '24–48hr' },
]

const COMPARISON_ROWS: { problem: string; solution: string }[] = [
  {
    problem:  'One vendor for strategy, another for build, another for hosting',
    solution: 'Full-stack AI expertise — prompt engineering to deployment, under one roof',
  },
  {
    problem:  'Off-the-shelf automation templates with your logo on them',
    solution: 'Built around your business — every workflow shaped to how you actually operate',
  },
  {
    problem:  'Vague timelines, scope creep, surprise delays',
    solution: "Fast, honest timelines — we scope before we build, so you know what's shipping and when",
  },
  {
    problem:  'Agency disappears the day after launch',
    solution: 'We stay involved — ongoing support and adjustments as your business changes',
  },
  {
    problem:  'Vendor lock-in — switching platforms means a full rebuild',
    solution: 'Open, portable infrastructure — no lock-in, swap or extend any component without starting over',
  },
  {
    problem:  'No visibility into what the automation is doing day-to-day',
    solution: 'Clear reporting — dashboards and logs so you always know what\'s running and what it\'s saving you',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIAutomationsPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <DotGrid global />

      <main id="main-content" className="relative z-10">

        {/* ── 1 · Hero ──────────────────────────────────────────────────────── */}
        {/* NOTE: this component captures wheel/touch events independently of Lenis. May cause scroll conflicts below the fold — needs review. */}
        <section className="h-screen w-full" aria-label="AI Automation Services">
          <IntroAnimation />
        </section>

        {/* ── 2 · Stats strip ──────────────────────────────────────────────── */}
        <section
          className="py-12 md:py-16 border-t border-b border-[var(--color-border)]"
          aria-label="Key statistics"
        >
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
              {STAT_ITEMS.map((s, i) => (
                <motion.div key={s.label} {...cardIn(reduce, i)}>
                  <Stat {...s} reduce={reduce} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3 · Services canvas ───────────────────────────────────────────── */}
        <section id="services" className="py-16 md:py-20" aria-labelledby="services-heading">
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <h2 id="services-heading" className="text-h2 font-semibold text-[var(--color-text)]">
                Our AI Automation Services
              </h2>
            </motion.div>

            <motion.div {...scrollIn(reduce, 0.1)}>
              <AutomationWorkflowCanvas />
            </motion.div>

          </div>
        </section>

        {/* ── 4 · Benefits ─────────────────────────────────────────────────── */}
        <ParallaxFeatureScroll />

        {/* ── 5 · Why Us ───────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" aria-labelledby="why-us-heading">
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <h2 id="why-us-heading" className="text-h2 font-semibold text-[var(--color-text)]">
                Why Choose Website Vikreta for AI Automation?
              </h2>
            </motion.div>

            <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden">

              {/* Column headers — desktop only */}
              <div className="hidden md:grid md:grid-cols-2 border-b border-[var(--color-border)]">
                <div className="px-7 py-5 border-r border-[var(--color-border)] flex justify-center">
                  <span
                    className="font-mono uppercase font-bold"
                    style={{ fontSize: '1rem', letterSpacing: 'var(--tracking-meta)', color: 'var(--color-text-muted)' }}
                  >
                    The Usual Way
                  </span>
                </div>
                <div className="px-7 py-5 flex justify-center">
                  <span
                    className="font-mono uppercase font-bold"
                    style={{ fontSize: '1rem', letterSpacing: 'var(--tracking-meta)', color: 'var(--color-text)' }}
                  >
                    With Website Vikreta
                  </span>
                </div>
              </div>

              {/* Comparison rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <motion.div
                  key={i}
                  {...cardIn(reduce, i)}
                  className={i < COMPARISON_ROWS.length - 1 ? 'border-b border-[var(--color-border)]' : ''}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">

                    {/* Problem — left / top on mobile */}
                    <div className="px-6 md:px-7 py-6 md:border-r md:border-[var(--color-border)] flex items-start gap-4">
                      <Minus
                        size={15}
                        strokeWidth={2}
                        className="mt-1 shrink-0"
                        style={{ color: 'var(--color-text-muted)' }}
                        aria-hidden
                      />
                      <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>
                        {row.problem}
                      </p>
                    </div>

                    {/* Solution — right / bottom on mobile */}
                    <div
                      className="px-6 md:px-7 py-6 flex items-start gap-4"
                      style={{ background: 'rgba(255,214,0,0.04)' }}
                    >
                      <CheckCircle2
                        size={15}
                        strokeWidth={2}
                        className="mt-1 shrink-0"
                        style={{ color: 'var(--color-accent)' }}
                        aria-hidden
                      />
                      <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--color-text)', fontWeight: 500 }}>
                        {row.solution}
                      </p>
                    </div>

                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </section>

      </main>
    </>
  )
}
