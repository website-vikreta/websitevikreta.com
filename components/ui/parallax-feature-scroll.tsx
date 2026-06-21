'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ─── Icons ────────────────────────────────────────────────────────────────────

const Ico = {
  Nodes: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="2.5" cy="7" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="3" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="11" r="1.5" fill="currentColor" />
      <path d="M4 7L10 3M4 7L10 11" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  Code: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M4.5 3.5L1.5 7l3 3.5M9.5 3.5L12.5 7l-3 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Terminal: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="2.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4 7l2-1.5L4 5M7.5 9h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  Stream: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 4h12M1 7h9M1 10h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  ),
  Bolt: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M8.5 1.5L3 7.5h4L5.5 12.5l6-6.5H8L8.5 1.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  ),
  Chart: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1.5 12.5V4.5M5 12.5V7M8.5 12.5V2.5M12 12.5V5.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M1 12.5h12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
  AI: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2" fill="currentColor" />
      <circle cx="2" cy="3.5" r="1" fill="currentColor" />
      <circle cx="12" cy="3.5" r="1" fill="currentColor" />
      <circle cx="2" cy="10.5" r="1" fill="currentColor" />
      <circle cx="12" cy="10.5" r="1" fill="currentColor" />
      <path d="M3 4L5.5 5.5M11 4L8.5 5.5M3 10L5.5 8.5M11 10L8.5 8.5" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  ),
  Branch: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="3" cy="2.5" r="1.5" fill="currentColor" />
      <circle cx="11" cy="6.5" r="1.5" fill="currentColor" />
      <circle cx="11" cy="11.5" r="1.5" fill="currentColor" />
      <path d="M3 4v7M4.5 3.5Q8 3.5 9.5 6.5M4.5 10.5Q8 10.5 9.5 10" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Person: () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="4" r="2.5" stroke="currentColor" strokeWidth="1" />
      <path d="M1.5 13c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  ),
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const sections = [
  {
    id: 1,
    title: "Your team is the bottleneck, and it's not their fault",
    description:
      "Someone on your team is manually moving data between tools, chasing approvals, copy-pasting the same report every Monday. We remove that with workflows that connect your existing tools directly — no rip-and-replace.",
    stack: [
      { label: 'Zapier / n8n', Icon: Ico.Nodes },
      { label: 'API integrations', Icon: Ico.Code },
      { label: 'Custom scripts', Icon: Ico.Terminal },
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80&auto=format',
    imageAlt: 'Abstract circuit board with complex interconnected pathways',
  },
  {
    id: 2,
    title: "You're always one report behind reality",
    description:
      "By the time your weekly numbers are compiled, they're already stale. We pull live data from your CRM, sheets, or database and surface it the moment it changes — not five days later.",
    stack: [
      { label: 'Real-time pipelines', Icon: Ico.Stream },
      { label: 'Webhook triggers', Icon: Ico.Bolt },
      { label: 'Auto-updating dashboards', Icon: Ico.Chart },
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80&auto=format',
    imageAlt: 'Live analytics data visualized across multiple screens',
  },
  {
    id: 3,
    title: "Hiring isn't the only way to handle more volume",
    description:
      "More customers usually means more headcount. We build AI agents and automated workflows that handle the repeatable parts of that volume — lead routing, ticket triage, follow-up sequences — without adding people.",
    stack: [
      { label: 'LLM-powered agents', Icon: Ico.AI },
      { label: 'Conditional logic flows', Icon: Ico.Branch },
      { label: 'Human-in-the-loop handoffs', Icon: Ico.Person },
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&q=80&auto=format',
    imageAlt: 'Dense city skyline representing scale and compounding growth',
  },
]

type Section = (typeof sections)[0]

// ─── Stack row ────────────────────────────────────────────────────────────────

function StackRow({ items }: { items: Section['stack'] }) {
  return (
    <div className="mt-8">
      <p className="mb-4">
        <span
          className="font-mono"
          style={{
            fontSize: '0.625rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            background: 'var(--color-accent)',
            color: '#000',
            padding: '2px 8px',
          }}
        >
          Stack
        </span>
      </p>
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        {items.map(({ label, Icon }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[var(--color-text-faint)]">
              <Icon />
            </span>
            <span
              className="font-mono text-[var(--color-text-muted)]"
              style={{ fontSize: '0.875rem', letterSpacing: '0.02em' }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Reveal variants ──────────────────────────────────────────────────────────

const titleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const titleLine = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Feature row ──────────────────────────────────────────────────────────────

function FeatureRow({ section, reduce }: { section: Section; reduce: boolean | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['18%', '-18%'])

  const titleLines = section.title.split(',').flatMap((part, i, arr) =>
    i < arr.length - 1 ? [part + ','] : [part]
  )

  return (
    <div ref={containerRef} className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
      {/* Image — always left, 60% */}
      <div className="relative overflow-hidden w-full md:w-1/2 md:shrink-0 h-64 md:h-[380px]">
        <motion.div
          className="absolute inset-0"
          style={{ y: reduce ? 0 : imageY, scale: 1.35 }}
        >
          <img
            src={section.imageUrl}
            alt={section.imageAlt}
            className="w-full h-full object-cover"
            style={{ filter: 'grayscale(1)' }}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </div>

      {/* Text — 40% */}
      <div className="md:flex-1">
        <motion.h3
          className="font-bold text-[var(--color-text)] mb-4"
          style={{
            fontSize: 'clamp(1.15rem, 2vw, 1.75rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
          }}
          variants={titleContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span className="block" variants={reduce ? {} : titleLine}>
                {line.trim()}
              </motion.span>
            </span>
          ))}
        </motion.h3>

        <motion.p
          className="text-[var(--color-text-muted)]"
          style={{ fontSize: '1.0625rem', lineHeight: 1.8, maxWidth: '52ch' }}
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.25, ease: EASE }}
        >
          {section.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
        >
          <StackRow items={section.stack} />
        </motion.div>
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function ParallaxFeatureScroll() {
  const reduce = useReducedMotion()

  return (
    <section aria-labelledby="benefits-heading">
      <div className="container py-16 md:py-20">
        <motion.div
          className="text-center mb-10 md:mb-14"
          variants={titleContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <h2 id="benefits-heading" className="text-h2 font-bold leading-[1.1] tracking-tight overflow-hidden">
            <motion.span className="block text-[var(--color-text)]" variants={reduce ? {} : titleLine}>
              <span style={{ color: 'var(--color-accent)' }}>Why</span> AI Automation?
            </motion.span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-10 md:gap-14">
          {sections.map((section) => (
            <FeatureRow key={section.id} section={section} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}
