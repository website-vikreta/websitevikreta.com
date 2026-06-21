'use client'

import { motion, useReducedMotion } from 'motion/react'
import IntroAnimation from '@/components/ui/scroll-morph-hero'
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

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden:   { y: '110%', opacity: 0 },
  visible:  { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const rowReveal = {
  hidden:   { y: '100%' },
  visible:  { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPARISON_ROWS: { problem: string; solution: string }[] = [
  {
    problem:  'Multiple vendors, you\'re the project manager',
    solution: 'One team, start to finish',
  },
  {
    problem:  'Generic templates, your logo on top',
    solution: 'Built around how you actually work',
  },
  {
    problem:  'Vague timelines',
    solution: 'Clear scope before we build',
  },
  {
    problem:  'Goes quiet after launch',
    solution: 'We stay on',
  },
  {
    problem:  'Locked into their platform',
    solution: 'Open, leave anytime',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIAutomationsPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <main id="main-content" className="relative z-10">

        {/* ── 1 · Hero ──────────────────────────────────────────────────────── */}
        {/* NOTE: this component captures wheel/touch events independently of Lenis. May cause scroll conflicts below the fold — needs review. */}
        <section className="h-screen w-full" aria-label="AI Automation Services">
          <IntroAnimation />
        </section>

        {/* ── 3 · Comparison table ─────────────────────────────────────────── */}
        <section className="py-16 md:py-20" aria-labelledby="why-us-heading">
          <div className="container">

            {/* Heading — 2-line clip reveal */}
            <motion.div
              className="mb-10 md:mb-12 max-w-[768px] mx-auto text-center"
              variants={lineContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2 id="why-us-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-[var(--color-text)]">
                <span className="overflow-hidden block">
                  <motion.span className="block" variants={lineReveal}>
                    Why Choose Website Vikreta for
                  </motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span className="block" variants={lineReveal}>
                    AI Automation?
                  </motion.span>
                </span>
              </h2>
            </motion.div>

            {/* Table — rows clip-reveal */}
            <motion.div
              className="max-w-[768px] mx-auto border border-[var(--color-border)]"
              variants={rowContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >

              {/* Column headers */}
              <div className="grid grid-cols-2 border-b border-[var(--color-border)]">
                <div className="px-5 py-3 border-r border-[var(--color-border)]">
                  <span className="text-lg font-bold text-[var(--color-text-muted)]">
                    The usual way
                  </span>
                </div>
                <div className="px-5 py-3 bg-[var(--color-accent)]">
                  <span className="text-lg font-bold text-[var(--color-text)]">
                    With Website Vikreta
                  </span>
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={i}
                  className={`overflow-hidden${i < COMPARISON_ROWS.length - 1 ? ' border-b border-[var(--color-border)]' : ''}`}
                >
                  <motion.div className="grid grid-cols-2" variants={rowReveal}>

                    {/* Problem */}
                    <div className="px-5 py-4 border-r border-[var(--color-border)]">
                      <p className="leading-relaxed text-[var(--color-text-muted)]">
                        {row.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="px-5 py-4 bg-[var(--color-text)]">
                      <p className="leading-relaxed font-medium text-[var(--color-bg)]">
                        {row.solution}
                      </p>
                    </div>

                  </motion.div>
                </div>
              ))}

            </motion.div>
          </div>
        </section>

        {/* ── 4 · Services canvas ───────────────────────────────────────────── */}
        <section id="services" className="py-16 md:py-20" aria-labelledby="services-heading">
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <h2 id="services-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-[var(--color-text)]">
                Our AI Automation Services
              </h2>
            </motion.div>

            <motion.div {...scrollIn(reduce, 0.1)}>
              <AutomationWorkflowCanvas />
            </motion.div>

          </div>
        </section>

        {/* ── 5 · Why automation matters ────────────────────────────────────── */}
        <ParallaxFeatureScroll />

        {/* ── 6 · CTA ───────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-28" aria-labelledby="cta-heading">
          <div className="container">
            <motion.div className="max-w-2xl" {...scrollIn(reduce)}>
              <h2 id="cta-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-[var(--color-text)] mb-6">
                Ready to automate the work that&rsquo;s slowing you down?
              </h2>
              <p className="text-[var(--color-text-muted)] mb-10" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
                Tell us what&rsquo;s eating your team&rsquo;s time. We&rsquo;ll map an automation that fits your business — no templates, no lock-in.
              </p>
              <a
                href="/contact"
                className="inline-block font-mono uppercase font-bold px-8 py-4 rounded-full transition-colors"
                style={{
                  fontSize: 'var(--text-meta)',
                  letterSpacing: 'var(--tracking-meta)',
                  background: 'var(--color-accent)',
                  color: '#000',
                }}
              >
                Book a free strategy call
              </a>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  )
}
