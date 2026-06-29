'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import Image from 'next/image'
import { Globe, BarChart2, Bot, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'

type CardId = 'web-dev' | 'digital-marketing' | 'ai-automation' | 'web-mobile-crm' | 'uiux'

interface ServiceCard {
  id: CardId
  index: string
  title: string
  description: string
  image: string
  href: string
  FallbackIcon: React.ComponentType<{ size?: number; className?: string }>
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'ai-automation',
    index: '01',
    title: 'AI Automation & Workflow Optimization',
    description:
      'Find us the hours your team shouldn\'t be spending. We audit what\'s actually happening in your business, then wire in AI where it makes sense, not where it sounds impressive.',
    image: '/our-services/ai-automation.webp',
    href: '/services/ai-automations',
    FallbackIcon: Bot,
  },
  {
    id: 'web-dev',
    index: '02',
    title: 'Website Development',
    description:
      'Built in Next.js. Fast, SEO-ready, written properly. Not a theme with your logo on it.',
    image: '/our-services/webdevelopment.webp',
    href: '/services/web-development',
    FallbackIcon: Globe,
  },
  {
    id: 'uiux',
    index: '03',
    title: 'UI/UX Design',
    description:
      "We start with how people actually use things. The visual part comes after that's figured out.",
    image: '/our-services/ui-ux-design.webp',
    href: '/services/uiux-design',
    FallbackIcon: Smartphone,
  },
  {
    id: 'web-mobile-crm',
    index: '04',
    title: 'Web & Mobile Apps / CRM Systems',
    description:
      "Portals, CRMs, e-commerce, internal tools. Built for how your business runs, not for how a template assumes it should.",
    image: '/our-services/web-mobile-crm.webp',
    href: '/services/web-and-mobile-apps',
    FallbackIcon: Smartphone,
  },
  {
    id: 'digital-marketing',
    index: '05',
    title: 'Digital Marketing / SEO & GEO',
    description:
      'SEO, GEO, paid: combined into one thing that\'s actually measured. No vanity metrics.',
    image: '/our-services/digital-marketing-seo-geo.webp',
    href: '/services/digital-marketing',
    FallbackIcon: BarChart2,
  },
]

// Vertical offset between stacked cards so previous cards peek above the active one.
const STACK_GAP = 22 // px added per card index
const STACK_TOP = 96 // px from viewport top where cards stick (clears nav)

function StackCard({
  card,
  i,
  total,
  progress,
}: {
  card: ServiceCard
  i: number
  total: number
  progress: MotionValue<number>
}) {
  const { FallbackIcon } = card

  // Earlier cards shrink as later cards stack over them → depth.
  // Range spans the whole track so the shrink animates smoothly across scroll.
  const targetScale = 1 - (total - 1 - i) * 0.06
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  return (
    <div className="sticky" style={{ top: STACK_TOP + i * STACK_GAP }}>
      <motion.article
        style={{ scale, transformOrigin: 'center top' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: REVEAL_EASE }}
        className="relative w-full overflow-hidden border border-(--color-border) bg-(--color-bg)"
      >
        <div className="grid md:grid-cols-2 md:min-h-[500px]">
          {/* LEFT — copy */}
          <div className="order-2 md:order-1 flex flex-col justify-between gap-8 p-7 sm:p-10 md:p-12">
            <div>
              <h3 className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text)">
                {card.title}
              </h3>
              <p
                className="mt-4 text-[15px] leading-relaxed text-(--color-text-muted)"
                style={{ maxWidth: '46ch' }}
              >
                {card.description}
              </p>
            </div>

            <div>
              <Button href={card.href} variant="ghost" size="md" showArrow>
                Explore More
              </Button>
            </div>
          </div>

          {/* RIGHT — 16:9 image */}
          <div className="order-1 md:order-2 relative aspect-video md:aspect-auto md:h-full">
            {card.image ? (
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-(--color-bg-muted)">
                <FallbackIcon size={48} className="text-(--color-text-faint)" />
              </div>
            )}
            {/* subtle left fade so split blends on desktop */}
            <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-(--color-bg) via-transparent to-transparent" />
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export function ServicesBentoGrid() {
  const trackRef = useRef<HTMLDivElement>(null)

  // Drives every card's scale. Spans the whole stacked track.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section className="relative py-16 md:py-20">
      <div className="container relative z-10">
        {/* Section heading */}
        <div className="mb-10 md:mb-14">
          <RevealText as="h2" className="text-h2 font-bold tracking-tight text-(--color-text)">
            We don&apos;t build pages.
          </RevealText>
          <RevealText
            as="h2"
            delay={0.12}
            className="text-h2 font-bold tracking-tight text-(--color-accent)"
          >
            We build systems.
          </RevealText>
        </div>

        {/* Sticky stack track — each card gets a full-height scroll slot */}
        <div ref={trackRef} className="relative flex flex-col gap-8 md:gap-12">
          {SERVICE_CARDS.map((card, i) => (
            <StackCard
              key={card.id}
              card={card}
              i={i}
              total={SERVICE_CARDS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
