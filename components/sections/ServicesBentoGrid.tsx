'use client'

import React, { useState } from 'react'
import { motion, LayoutGroup } from 'motion/react'
import Image from 'next/image'
import { Globe, BarChart2, Bot, Smartphone } from 'lucide-react'
import { DotGrid } from '@/components/ui/DotGrid'
import { Button } from '@/components/ui/Button'

// Scroll animation — exact mirror of FeaturedWorkSection
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

type CardId = 'web-dev' | 'digital-marketing' | 'ai-automation' | 'web-mobile-crm'

interface BentoCard {
  id: CardId
  title: string
  description: string
  image: string
  href: string
  FallbackIcon: React.ComponentType<{ size?: number; className?: string }>
}

const BENTO_CARDS: BentoCard[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    description:
      'Fast, responsive, SEO-ready sites built in Next.js. Every line of code is written with ranking, speed, and scale in mind.',
    image: '/images/services/webdevelopment.png',
    href: '/services/web-development',
    FallbackIcon: Globe,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing / SEO & GEO',
    description:
      'Campaigns that rank, reach, and convert — built on real data, not guesswork. We combine SEO, GEO, and paid channels into one growth engine.',
    image: '/images/services/digital-marketing-seo-geo.png',
    href: '/services/digital-marketing',
    FallbackIcon: BarChart2,
  },
  {
    id: 'ai-automation',
    title: 'AI Automation & Workflow Optimization',
    description:
      'We audit your business, find the hours your team wastes, and wire in AI systems that handle it — so your people do what only humans should.',
    image: '/images/services/ai-automation.png',
    href: '/services/ai-automations',
    FallbackIcon: Bot,
  },
  {
    id: 'web-mobile-crm',
    title: 'Web & Mobile Apps / CRM Systems',
    description:
      "CRMs, portals, e-commerce, custom systems — built for how your business actually works, not a template of how others think it should.",
    image: '/images/services/web-mobile-crm.png',
    href: '/services/web-and-mobile-apps',
    FallbackIcon: Smartphone,
  },
]

const CARD_HEIGHT = 340

function BentoCard({
  card,
  flexGrow,
  isHovered,
  onHover,
  onLeave,
}: {
  card: BentoCard
  flexGrow: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}) {
  const { FallbackIcon } = card

  return (
    <motion.div
      layout
      className="relative overflow-hidden cursor-pointer"
      style={{ flexGrow, flexBasis: 0, minWidth: 0, height: CARD_HEIGHT }}
      transition={{ layout: { type: 'spring', stiffness: 300, damping: 30 } }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
    >
      {/* Background image (grayscale by default, color on hover) */}
      {card.image ? (
        <motion.div
          className="absolute inset-0"
          animate={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#1a1a1a' }}>
          <FallbackIcon size={48} className="text-white/20" />
        </div>
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.08) 100%)',
        }}
      />

      {/* Text content */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
        {/* Accent bar — animates in on hover */}
        <motion.div
          className="w-5 h-0.5 mb-3"
          style={{ backgroundColor: 'var(--color-accent)' }}
          animate={{ scaleX: isHovered ? 1 : 0, originX: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Title + CTA row */}
        <div className="flex items-end justify-between gap-4">
          <h3
            className="font-sans font-bold text-white leading-snug"
            style={{ fontSize: 'clamp(1.15rem, 2vw, 1.75rem)' }}
          >
            {card.title}
          </h3>
          <Button
            href={card.href}
            variant="primary"
            size="sm"
            showArrow
            className="flex-shrink-0"
          >
            Explore More
          </Button>
        </div>

        {/* Description — animates in on hover */}
        <motion.p
          className="text-sm leading-relaxed text-white/70 mt-2"
          style={{ maxWidth: '38ch' }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {card.description}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function ServicesBentoGrid() {
  const [hoveredCard, setHoveredCard] = useState<CardId | null>(null)

  const [webDev, digitalMkt, aiAuto, webMobile] = BENTO_CARDS

  // Row 1: webDev (default 2fr) + digitalMkt (default 1fr)
  const webDevGrow  = hoveredCard === 'web-dev'           ? 3   : hoveredCard === 'digital-marketing' ? 0.55 : 2
  const digitalGrow = hoveredCard === 'digital-marketing' ? 2.5 : hoveredCard === 'web-dev'           ? 0.55 : 1

  // Row 2: aiAuto (default 1fr) + webMobile (default 2fr)
  const aiAutoGrow    = hoveredCard === 'ai-automation'  ? 2.5 : hoveredCard === 'web-mobile-crm' ? 0.55 : 1
  const webMobileGrow = hoveredCard === 'web-mobile-crm' ? 3   : hoveredCard === 'ai-automation'  ? 0.55 : 2

  const setHover = (id: CardId) => () => setHoveredCard(id)
  const clearHover = () => setHoveredCard(null)

  return (
    <section className="relative py-16 md:py-20">
      {/* Dot background — matches ComingSoonPage pattern exactly */}
      <DotGrid />

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

        {/* Bento grid — desktop (md+) */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        >
          <LayoutGroup>
            <div className="flex flex-col gap-1.5">
              {/* Row 1: webDev (2fr) + digitalMkt (1fr) */}
              <div className="flex gap-1.5">
                <BentoCard
                  card={webDev}
                  flexGrow={webDevGrow}
                  isHovered={hoveredCard === 'web-dev'}
                  onHover={setHover('web-dev')}
                  onLeave={clearHover}
                />
                <BentoCard
                  card={digitalMkt}
                  flexGrow={digitalGrow}
                  isHovered={hoveredCard === 'digital-marketing'}
                  onHover={setHover('digital-marketing')}
                  onLeave={clearHover}
                />
              </div>

              {/* Row 2: aiAuto (1fr) + webMobile (2fr) */}
              <div className="flex gap-1.5">
                <BentoCard
                  card={aiAuto}
                  flexGrow={aiAutoGrow}
                  isHovered={hoveredCard === 'ai-automation'}
                  onHover={setHover('ai-automation')}
                  onLeave={clearHover}
                />
                <BentoCard
                  card={webMobile}
                  flexGrow={webMobileGrow}
                  isHovered={hoveredCard === 'web-mobile-crm'}
                  onHover={setHover('web-mobile-crm')}
                  onLeave={clearHover}
                />
              </div>
            </div>
          </LayoutGroup>
        </motion.div>

        {/* Mobile stack — no expand interaction */}
        <div className="md:hidden flex flex-col gap-1.5">
          {BENTO_CARDS.map((card) => {
            const { FallbackIcon } = card
            return (
              <div
                key={card.id}
                className="relative overflow-hidden"
                style={{ height: 260, background: '#131313' }}
              >
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                )}
                {!card.image && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#1a1a1a' }}>
                    <FallbackIcon size={48} className="text-white/20" />
                  </div>
                )}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.08) 100%)',
                  }}
                />
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                  <div className="flex items-end justify-between gap-3">
                    <h3
                      className="font-sans font-bold text-white leading-snug"
                      style={{ fontSize: 'clamp(1.15rem, 5vw, 1.4rem)' }}
                    >
                      {card.title}
                    </h3>
                    <Button
                      href={card.href}
                      variant="primary"
                      size="sm"
                      showArrow
                      className="flex-shrink-0"
                    >
                      Explore More
                    </Button>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60 mt-1.5" style={{ maxWidth: '38ch' }}>
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
