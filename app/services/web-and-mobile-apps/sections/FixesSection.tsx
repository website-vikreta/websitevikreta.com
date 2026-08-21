'use client'

import { Database, Smartphone, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RevealText, RevealFade } from '@/components/ui/Reveal'

interface FixCard {
  title:       string
  description: string
  cta:         string
  Icon:        React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>
}

const FIX_CARDS: FixCard[] = [
  {
    title:       'Custom CRM & internal tools',
    description: 'Your pipeline, support tickets, and ops in one system built around your process — not a generic CRM you reshape your workflow to fit.',
    cta:         'See how we scope a CRM build',
    Icon:        Database,
  },
  {
    title:       'Customer-facing web & mobile apps',
    description: 'Portals, booking systems, dashboards — the parts of your business customers touch directly, built to actually get used, not just launched.',
    cta:         'See what we build',
    Icon:        Smartphone,
  },
  {
    title:       'Integrations that stop the re-typing',
    description: 'We connect the tools you already pay for, so a customer’s data lives in one place instead of five inboxes and a spreadsheet.',
    cta:         'See how integrations work',
    Icon:        Link2,
  },
]

export default function FixesSection() {
  return (
    <section className="py-16 md:py-20" aria-label="Three Things We Build Most Often">
      <div className="container">

        <div className="mb-10 md:mb-14 max-w-2xl">
          <RevealText as="h2" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Three Things We Build Most Often
          </RevealText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-(--color-border)">
          {FIX_CARDS.map((card, i) => (
            <RevealFade
              key={card.title}
              delay={i * 0.1}
              className="group flex h-full flex-col border-r border-b border-(--color-border) bg-(--color-surface) p-5 sm:p-6 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-(--color-border-strong)"
            >
              <div className="mb-6 flex size-12 items-center justify-center bg-(--color-bg-muted) text-(--color-text)">
                <card.Icon size={22} strokeWidth={1.75} />
              </div>

              <h3 className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text)">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-(--color-text-muted)">
                {card.description}
              </p>

              <div className="mt-6">
                <Button href="#book-audit" variant="ghost" size="sm" showArrow>
                  {card.cta}
                </Button>
              </div>
            </RevealFade>
          ))}
        </div>

      </div>
    </section>
  )
}
