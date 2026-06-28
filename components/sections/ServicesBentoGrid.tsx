'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import Image from 'next/image'
import { Globe, BarChart2, Bot, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Heading scroll animation — exact mirror of FeaturedWorkSection
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

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
      'We audit your business, find the hours your team wastes, and wire in AI systems that handle it — so your people do what only humans should.',
    image: '/images/services/ai-automation.png',
    href: '/services/ai-automations',
    FallbackIcon: Bot,
  },
  {
    id: 'web-dev',
    index: '02',
    title: 'Website Development',
    description:
      'Fast, responsive, SEO-ready sites built in Next.js. Every line of code is written with ranking, speed, and scale in mind.',
    image: '/images/services/webdevelopment.png',
    href: '/services/web-development',
    FallbackIcon: Globe,
  },
  {
    id: 'uiux',
    index: '03',
    title: 'UIUX Design',
    description:
      "CRMs, portals, e-commerce, custom systems — built for how your business actually works, not a template of how others think it should.",
    image: '/images/services/web-mobile-crm.png',
    href: '/services/uiux-design',
    FallbackIcon: Smartphone,
  },
  {
    id: 'web-mobile-crm',
    index: '04',
    title: 'Web & Mobile Apps / CRM Systems',
    description:
      "CRMs, portals, e-commerce, custom systems — built for how your business actually works, not a template of how others think it should.",
    image: '/images/services/web-mobile-crm.png',
    href: '/services/web-and-mobile-apps',
    FallbackIcon: Smartphone,
  },
  {
    id: 'digital-marketing',
    index: '05',
    title: 'Digital Marketing / SEO & GEO',
    description:
      'Campaigns that rank, reach, and convert — built on real data, not guesswork. We combine SEO, GEO, and paid channels into one growth engine.',
    image: '/images/services/digital-marketing-seo-geo.png',
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
        className="relative w-full overflow-hidden border border-(--color-border) bg-(--color-bg)"
      >
        <div className="grid md:grid-cols-2 md:min-h-[600px]">
          {/* LEFT — copy */}
          <motion.div
            className="order-2 md:order-1 flex flex-col justify-between gap-8 p-7 sm:p-10 md:p-12"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <div>
              <div className="overflow-hidden pb-1 -mb-1">
                <motion.h3
                  className="font-sans font-bold leading-[1.1] text-(--color-text)"
                  style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.5rem)' }}
                  variants={lineReveal}
                >
                  {card.title}
                </motion.h3>
              </div>
              <div className="overflow-hidden pb-1 -mb-1 mt-4">
                <motion.p
                  className="text-[15px] leading-relaxed text-(--color-text-muted)"
                  style={{ maxWidth: '46ch' }}
                  variants={lineReveal}
                >
                  {card.description}
                </motion.p>
              </div>
            </div>

            <motion.div variants={lineReveal}>
              <Button href={card.href} variant="ghost" size="md" showArrow>
                Explore More
              </Button>
            </motion.div>
          </motion.div>

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
        {/* Section heading — exact FeaturedWorkSection font + animation */}
        <motion.div
          className="mb-10 md:mb-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-(--color-text)"
              variants={lineReveal}
            >
              We don&apos;t build pages.
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight"
              style={{ color: 'var(--color-accent)' }}
              variants={lineReveal}
            >
              We build systems.
            </motion.h2>
          </div>
        </motion.div>

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
