'use client'

import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const sections = [
  {
    id: 1,
    title: 'Reduce Manual Workloads',
    description:
      'Most teams spend a significant chunk of their day on work that follows a predictable pattern — data entry, routing emails, updating records, chasing approvals. AI handles all of it. Not by cutting corners, but by doing it faster and without errors. Your team stops being the pipeline and starts being the decision-makers.',
    imageUrl:
      'https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=640&h=640&fit=crop&q=80&auto=format',
    imageAlt: 'Factory floor with orange industrial automation machines',
    reverse: false,
  },
  {
    id: 2,
    title: 'Faster, Smarter Decisions',
    description:
      'When your data lives across five tools and gets summarised once a week, decisions lag behind reality. AI-powered automation closes that gap — pulling live data, surfacing what matters, and triggering the right actions before your team even opens a report. You stop reacting and start leading.',
    imageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=640&fit=crop&q=80&auto=format',
    imageAlt: 'Colourful performance analytics graphs on a laptop screen',
    reverse: true,
  },
  {
    id: 3,
    title: 'A Better Customer Experience',
    description:
      "Customers don't care that it's 2am or that your team is at capacity. They want answers now. AI-powered chatbots and automated workflows give them exactly that — accurate, helpful responses around the clock. And when a human genuinely needs to step in, the handoff is seamless, with full context already there.",
    imageUrl:
      'https://images.unsplash.com/photo-1766066014237-00645c74e9c6?w=640&h=640&fit=crop&q=80&auto=format',
    imageAlt: 'Smiling customer support agent wearing a headset at her desk',
    reverse: false,
  },
  {
    id: 4,
    title: 'Scalable Without the Overhead',
    description:
      'Growth usually means hiring. More customers means more staff, more coordination, more management overhead. Automation breaks that equation. The workflows we build handle higher volume without breaking a sweat — and without a proportional increase in cost. You scale the output, not the headcount.',
    imageUrl:
      'https://images.unsplash.com/photo-1758691736903-c60a33e5b83f?w=640&h=640&fit=crop&q=80&auto=format',
    imageAlt: 'Diverse team brainstorming with colourful sticky notes on a glass board',
    reverse: true,
  },
]

type Section = (typeof sections)[0]

function FeatureRow({ section, reduce }: { section: Section; reduce: boolean | null }) {
  return (
    <motion.div
      className={`flex flex-col gap-6 md:gap-10 py-10 md:py-12 border-t border-[var(--color-border)] items-center ${
        section.reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
      initial={{ opacity: 0, y: reduce ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* Text */}
      <div className={`flex-1 ${section.reverse ? 'md:text-right' : ''}`}>
        <h3
          className="font-semibold text-[var(--color-text)] mb-3"
          style={{
            fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {section.title}
        </h3>
        <p
          className={`text-[var(--color-text-muted)] ${section.reverse ? 'md:ml-auto' : ''}`}
          style={{ fontSize: '1.0625rem', lineHeight: 1.75, maxWidth: '52ch' }}
        >
          {section.description}
        </p>
      </div>

      {/* Image */}
      <motion.div
        className="shrink-0"
        initial={{
          clipPath: reduce ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          opacity: reduce ? 1 : 0,
        }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <img
          src={section.imageUrl}
          alt={section.imageAlt}
          className="w-full h-48 md:w-[480px] md:h-60 rounded-2xl object-cover"
          loading="lazy"
          decoding="async"
        />
      </motion.div>
    </motion.div>
  )
}

export function ParallaxFeatureScroll() {
  const reduce = useReducedMotion()

  return (
    <section aria-labelledby="benefits-heading">
      <div className="container py-16 md:py-20">
        <motion.div
          className="max-w-2xl mb-2"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <h2 id="benefits-heading" className="text-h2 font-semibold text-[var(--color-text)]">
            Why Choose AI Automation for Your Business?
          </h2>
        </motion.div>

        {sections.map((section) => (
          <FeatureRow key={section.id} section={section} reduce={reduce} />
        ))}
      </div>
    </section>
  )
}
