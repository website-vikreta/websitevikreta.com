'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'motion/react'
import {
  Workflow, MessageSquare, FileText, Target, Plug, BarChart3,
  Minimize2, Zap, Heart, TrendingUp,
  Layers, Puzzle, Clock, LifeBuoy,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { TextLink } from '@/components/ui/TextLink'
import { DotGrid } from '@/components/ui/DotGrid'

// ─── Shared constants ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const CARD = [
  'rounded-[20px] p-7 md:p-8',
  'border border-[var(--color-border)] bg-[var(--color-surface)]',
  'shadow-[0_2px_16px_rgba(0,0,0,0.04)]',
  'transition-shadow duration-300',
  'hover:shadow-[0_4px_28px_rgba(0,0,0,0.09)]',
].join(' ')

// ─── Animation helpers ────────────────────────────────────────────────────────

function heroIn(reduce: boolean | null, delay = 0) {
  return {
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: 0.38, delay, ease: EASE },
  }
}

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

const SERVICES: { num: string; Icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    num: '01', Icon: Workflow, href: '/contact',
    title: 'AI Workflow Automation',
    desc: 'We design end-to-end workflows powered by AI models that handle content, decisions, and routine communication automatically. Built around how your business already runs — not a generic template.',
  },
  {
    num: '02', Icon: MessageSquare, href: '/contact',
    title: 'AI Chatbot Development',
    desc: 'Smart chatbots that handle customer questions, qualify leads, and act as a 24/7 first responder across your website and socials. Trained on your business, not a script.',
  },
  {
    num: '03', Icon: FileText, href: '/contact',
    title: 'Document & Email Automation',
    desc: 'Automate the processing of PDFs, invoices, and emails using AI. Extract key information, summarize data, and trigger the next step instantly — no manual re-typing.',
  },
  {
    num: '04', Icon: Target, href: '/contact',
    title: 'Lead Scoring & Qualification',
    desc: 'AI that qualifies leads by reading behavior, form responses, and CRM activity — so your sales team only spends time on conversations worth having.',
  },
  {
    num: '05', Icon: Plug, href: '/contact',
    title: 'Custom AI Integrations',
    desc: "Connect AI models like GPT or Claude directly into your existing tools — for writing, summarizing, replying, and supporting customers without switching platforms.",
  },
  {
    num: '06', Icon: BarChart3, href: '/contact',
    title: 'AI-Powered Reporting & Insights',
    desc: "Turn raw data into a readable report automatically. We build lightweight dashboards and automated summaries so decisions don't wait on a spreadsheet.",
  },
]

const BENEFITS: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Minimize2,
    title: 'Reduce Manual Workloads',
    desc: 'AI handles the repetitive, rule-based parts of the job — freeing your team to focus on the work that actually needs a human.',
  },
  {
    Icon: Zap,
    title: 'Faster, Smarter Decisions',
    desc: 'AI-powered insights and automated triggers mean your team acts on real-time information, not a stale weekly report.',
  },
  {
    Icon: Heart,
    title: 'A Better Customer Experience',
    desc: 'Automated responses cut wait times and give customers real help — any time, not just business hours.',
  },
  {
    Icon: TrendingUp,
    title: 'Scalable Without the Overhead',
    desc: 'Automation scales with your business without scaling your headcount or your costs alongside it.',
  },
]

const WHY_US: { Icon: LucideIcon; title: string; desc: string }[] = [
  {
    Icon: Layers,
    title: 'Full-Stack AI Expertise',
    desc: 'From prompt engineering to deployment and hosting — we handle every layer under one roof, so nothing falls between two vendors.',
  },
  {
    Icon: Puzzle,
    title: 'Built Around Your Business',
    desc: "No off-the-shelf automation. Every workflow is built around how your team actually operates, not a generic template with your logo on it.",
  },
  {
    Icon: Clock,
    title: 'Fast, Honest Timelines',
    desc: "We scope before we build, so you know exactly what's shipping and when — no surprise delays, no scope creep.",
  },
  {
    Icon: LifeBuoy,
    title: "We Don't Disappear After Launch",
    desc: 'Ongoing support, monitoring, and adjustments as your business changes — we stay involved after the handoff.',
  },
]

// ─── Icon wrapper ─────────────────────────────────────────────────────────────

function IconWrap({ Icon }: { Icon: LucideIcon }) {
  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
      style={{ background: 'var(--color-bg-muted)' }}
    >
      <Icon size={18} strokeWidth={1.5} style={{ color: 'var(--color-accent)' }} aria-hidden />
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIAutomationsPage() {
  const reduce = useReducedMotion()

  return (
    <>
      <DotGrid global />

      <main id="main-content" className="relative z-10">

        {/* ── 1 · Hero ──────────────────────────────────────────────────────── */}
        <section className="pt-28 pb-16 md:pt-36 md:pb-24" aria-label="AI Automation Services">
          <div className="container">
            <motion.p
              className="font-mono uppercase mb-4"
              style={{ fontSize: 'var(--text-meta)', letterSpacing: 'var(--tracking-meta)', color: 'var(--color-accent)' }}
              {...heroIn(reduce, 0)}
            >
              Services / AI Automation
            </motion.p>

            <motion.h1
              className="text-h1 font-semibold text-[var(--color-text)] mb-6 max-w-3xl tracking-tight"
              {...heroIn(reduce, 0.1)}
            >
              AI Automation Services &amp; Consulting
            </motion.h1>

            <motion.p
              className="text-body-lg text-[var(--color-text-muted)] mb-10 max-w-xl"
              style={{ lineHeight: 'var(--leading-body)' }}
              {...heroIn(reduce, 0.18)}
            >
              Automate the work that&apos;s quietly costing your team hours every week — without adding headcount.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" {...heroIn(reduce, 0.25)}>
              <Button href="/contact" variant="primary" size="lg" showArrow>
                Talk to Us
              </Button>
              <a
                href="#services"
                className="text-base font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
              >
                See how it works ↓
              </a>
            </motion.div>
          </div>
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

        {/* ── 3 · Services grid ─────────────────────────────────────────────── */}
        <section id="services" className="py-16 md:py-20" aria-labelledby="services-heading">
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <Eyebrow label="What We Build" />
              <h2 id="services-heading" className="text-h2 font-semibold text-[var(--color-text)]">
                Our AI Automation Services
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {SERVICES.map(({ num, Icon, title, desc, href }, i) => (
                <motion.div
                  key={title}
                  {...cardIn(reduce, i)}
                  className={`${CARD} flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="font-mono font-bold"
                      style={{ fontSize: 'var(--text-meta)', letterSpacing: '0.06em', color: 'var(--color-accent)' }}
                    >
                      {num}
                    </span>
                    <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--color-text-faint)' }} aria-hidden />
                  </div>
                  <h3
                    className="font-semibold text-[var(--color-text)] mb-3"
                    style={{ fontSize: 'var(--text-h3)', lineHeight: 1.25 }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-[var(--color-text-muted)] flex-1 mb-6"
                    style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}
                  >
                    {desc}
                  </p>
                  <TextLink href={href}>Learn More</TextLink>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4 · Benefits ─────────────────────────────────────────────────── */}
        <section
          className="py-16 md:py-20 bg-[var(--color-bg-muted)]"
          aria-labelledby="benefits-heading"
        >
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <Eyebrow label="Why It Matters" />
              <h2 id="benefits-heading" className="text-h2 font-semibold text-[var(--color-text)]">
                Why Choose AI Automation for Your Business?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {BENEFITS.map(({ Icon, title, desc }, i) => (
                <motion.div key={title} {...cardIn(reduce, i)} className={CARD}>
                  <IconWrap Icon={Icon} />
                  <h3
                    className="font-semibold text-[var(--color-text)] mb-2"
                    style={{ fontSize: '1.0625rem', lineHeight: 1.3 }}
                  >
                    {title}
                  </h3>
                  <p className="text-[var(--color-text-muted)]" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5 · Why Us ───────────────────────────────────────────────────── */}
        <section className="py-16 md:py-20" aria-labelledby="why-us-heading">
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <Eyebrow label="Why Us" />
              <h2 id="why-us-heading" className="text-h2 font-semibold text-[var(--color-text)]">
                Why Choose Website Vikreta for AI Automation?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {WHY_US.map(({ Icon, title, desc }, i) => (
                <motion.div key={title} {...cardIn(reduce, i)} className={CARD}>
                  <IconWrap Icon={Icon} />
                  <h3
                    className="font-semibold text-[var(--color-text)] mb-2"
                    style={{ fontSize: '1.0625rem', lineHeight: 1.3 }}
                  >
                    {title}
                  </h3>
                  <p className="text-[var(--color-text-muted)]" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
