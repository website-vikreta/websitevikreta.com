'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { ConvergeDiagram } from './SystemDiagram'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

interface SolutionCard {
  title:       string
  description: string
  inputs:      string[]
  output:      string
}

const SOLUTION_CARDS: SolutionCard[] = [
  {
    title:       'Custom CRMs & internal tools',
    description: 'Leads, orders, and ops dashboards in one place your team already understands.',
    inputs:      ['Leads sheet', 'Order log', 'Follow-ups'],
    output:      'One pipeline',
  },
  {
    title:       'Customer & partner portals',
    description: 'Your customers log in, check their own status, and stop emailing you for it.',
    inputs:      ['Status emails', 'Shared files', 'Phone calls'],
    output:      'One login',
  },
  {
    title:       'E-commerce & mobile apps',
    description: 'Storefront, stock, and checkout wired as one system. The app follows when you need it.',
    inputs:      ['Storefront', 'Stock sheet', 'Payments'],
    output:      'One checkout',
  },
]

// Per-card scroll budget for the sticky stack. Reduced from an initial 100vh
// per card — "the big scroll is required for it" — and each card now scales
// within its OWN fixed [i/total, (i+1)/total] window instead of a continuous
// range spanning the rest of the scroll. Equal, self-contained windows are
// what make the pacing feel the same whether the visitor scrolls down through
// the section or back up through it — nothing about a card's transition
// depends on how far into the section the visitor already is.
//
// This is also the ONLY place that height is set — `StackCard`'s sticky
// wrapper below reads it too. They used to disagree (the wrapper was a
// hardcoded `h-screen` = 100vh while the outer track used this constant at
// 85), so 3 cards needed 300vh of document height but the track only
// reserved 255vh — the last card's sticky/scale window got cut short before
// it finished covering the second, and the next section started overlapping
// into the missing 45vh instead of after it. Never let these two drift apart.
const VH_PER_CARD = 85

interface StackCardProps {
  card:     SolutionCard
  index:    number
  total:    number
  progress: MotionValue<number>
}

// Each card pins at the same spot as the next one arrives, shrinking slightly
// so the ones underneath keep peeking out — a deck of cards being dealt, not
// a plain grid. Mechanic adapted from the unused components/ui/stacking-card.tsx
// scaffold; recolored onto this site's tokens (that file's black/white
// alternating cards would have reintroduced the dark-inverted-slab look
// already rejected on this codebase — see learning.md [Section] surface
// rhythm entry).
function StackCardBody({ card }: { card: SolutionCard }) {
  return (
    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">
      <div>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05] text-(--color-text)">
          {card.title}
        </h3>
        <p className="mt-4 text-base md:text-lg leading-relaxed text-(--color-text-muted)">
          {card.description}
        </p>
      </div>

      <div className="bg-(--color-bg-muted) p-6 md:p-8">
        <ConvergeDiagram inputs={card.inputs} output={card.output} />
      </div>
    </div>
  )
}

function StackCard({ card, index, total, progress }: StackCardProps) {
  const targetScale = 1 - (total - index) * 0.06
  const scale = useTransform(progress, [index / total, (index + 1) / total], [1, targetScale])

  return (
    <div
      className="sticky top-20 flex items-center justify-center md:top-24"
      style={{ height: `${VH_PER_CARD}vh`, zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale, top: index * 16 }}
        className="relative w-full origin-top min-h-[70vh] sm:min-h-[75vh] flex items-center border border-(--color-border) bg-(--color-surface) p-8 sm:p-10 md:p-16"
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-(--color-accent)" aria-hidden="true" />
        <StackCardBody card={card} />
      </motion.div>
    </div>
  )
}

export default function SolutionSection() {
  const scope    = useRef<HTMLElement>(null)
  const stackRef = useRef<HTMLDivElement>(null)
  const reduced  = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  })

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    revealFadeUp('.solution-cta', { y: 16, trigger: '.solution-cta' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="solution-heading">
      <div className="container">

        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="solution-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Three Systems We Build Most Often
          </h2>
        </div>

        {reduced ? (
          // No pin/scale — a plain stacked list, one card after another in normal flow.
          <div className="flex flex-col gap-6">
            {SOLUTION_CARDS.map((card) => (
              <div key={card.title} className="relative border border-(--color-border) bg-(--color-surface) p-8 sm:p-10 md:p-16">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-(--color-accent)" aria-hidden="true" />
                <StackCardBody card={card} />
              </div>
            ))}
          </div>
        ) : (
          <div ref={stackRef} style={{ height: `${SOLUTION_CARDS.length * VH_PER_CARD}vh` }}>
            {SOLUTION_CARDS.map((card, i) => (
              <StackCard key={card.title} card={card} index={i} total={SOLUTION_CARDS.length} progress={scrollYProgress} />
            ))}
          </div>
        )}

        <div className="solution-cta mt-10 md:mt-14 flex justify-center">
          <Button href="#start-project" variant="ghost" size="md" showArrow>
            Tell us what you need built
          </Button>
        </div>

      </div>
    </section>
  )
}
