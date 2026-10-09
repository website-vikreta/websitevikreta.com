'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'motion/react'
import Image from 'next/image'
import { Globe, BarChart2, Bot, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RevealText, RevealFade, REVEAL_EASE } from '@/components/ui/Reveal'

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
      'We audit the hours your team spends on CRM, reporting, and support, then build custom AI agents and workflow automation that take that work off their plate.',
    image: '/services/landing/ai-automation.webp',
    href: '/services/ai-automations',
    FallbackIcon: Bot,
  },
  {
    id: 'web-dev',
    index: '02',
    title: 'Website Development',
    description:
      'Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, and built around how you sell.',
    image: '/services/landing/web-development.webp',
    href: '/services/web-development',
    FallbackIcon: Globe,
  },
  {
    id: 'uiux',
    index: '03',
    title: 'UI/UX Design',
    description:
      'User research, wireframes, and product design for web and mobile. Design systems and prototypes your developers can actually ship.',
    image: '/services/landing/ui-ux.webp',
    href: '/services/uiux-design',
    FallbackIcon: Smartphone,
  },
  {
    id: 'web-mobile-crm',
    index: '04',
    title: 'Web & Mobile Apps / CRM Systems',
    description:
      'Custom CRMs, customer portals, internal tools, and e-commerce. Web and mobile apps built around how your business runs.',
    image: '/services/landing/web-mobile-apps.webp',
    href: '/services/web-mobile-app-development',
    FallbackIcon: Smartphone,
  },
  {
    id: 'digital-marketing',
    index: '05',
    title: 'Digital Marketing / SEO & GEO',
    description:
      'SEO, GEO, content, and paid campaigns built to bring in leads. Local SEO and growth marketing you can measure in enquiries.',
    image: '/services/landing/digital-marketing-seo-geo.webp',
    href: '/services/digital-marketing',
    FallbackIcon: BarChart2,
  },
]

// Vertical offset between stacked cards so previous cards peek above the active one.
const STACK_GAP = 22 // px added per card index
const STACK_TOP = 96 // px from viewport top where cards stick (clears nav)

// Card content shared by the mobile scroll stack and the desktop hover stack.
function CardBody({ card, className = '' }: { card: ServiceCard; className?: string }) {
  const { FallbackIcon } = card
  return (
    <div className={`grid md:grid-cols-2 ${className}`}>
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
  )
}

// < lg: scroll-driven sticky stack (touch has no hover)
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
        <CardBody card={card} className="md:min-h-[500px]" />
      </motion.article>
    </div>
  )
}

// lg+: Stage Manager. Inactive cards sit as small thumbnails in a left rail; hovering (or
// focusing) one grows it onto the stage on the right while the previous card shrinks back into
// its own rail slot. Slots are fixed per card, so the rail never reshuffles under the cursor.
const STAGE_H = 520
const STAGE_LEFT = 20 // % of the row taken by the rail; the stage card fills the rest
const THUMB = 0.18 // thumbnail scale: 5 slots × (520 × 0.18 + gap) fit the stage height
const SLOT = STAGE_H / 5
const STAGE_SPRING = {
  type: 'spring',
  visualDuration: 0.55,
  bounce: 0,
} as const // long glide, no overshoot
const HOVER_INTENT = 90 // ms the pointer must rest on a slot — sweeping across the rail doesn't fire every card

function StageStack({ cards }: { cards: ServiceCard[] }) {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const intent = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hoverSlot = (i: number) => {
    clearTimeout(intent.current)
    intent.current = setTimeout(() => setActive(i), HOVER_INTENT)
  }
  useEffect(() => () => clearTimeout(intent.current), [])
  // Thumbnail x, in % of the card's own width, that puts its left edge at the row's left edge
  const railX = `${(-STAGE_LEFT / (100 - STAGE_LEFT)) * 100}%`
  const railPose = (i: number) => ({
    x: railX,
    y: i * SLOT,
    scale: THUMB,
    rotateY: 0,
  })
  // Shared box + 3D origin, so thumbnails and their slot outlines line up exactly
  const box = {
    left: `${STAGE_LEFT}%`,
    width: `${100 - STAGE_LEFT}%`,
    height: STAGE_H,
    transformOrigin: 'left top',
    transformPerspective: 1200,
  }

  return (
    <div className="relative hidden lg:block" style={{ height: STAGE_H }}>
      {/* Rail hit areas — stationary, so a card flying out never steals hover from the cursor */}
      {cards.map((card, i) => (
        <button
          key={card.id}
          type="button"
          aria-label={`Show ${card.title}`}
          aria-pressed={active === i}
          onPointerEnter={() => hoverSlot(i)}
          onPointerLeave={() => clearTimeout(intent.current)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          className="absolute left-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
          style={{
            top: i * SLOT,
            width: `${(100 - STAGE_LEFT) * THUMB}%`,
            height: STAGE_H * THUMB,
          }}
        />
      ))}

      {/* Empty-slot outline for the card on stage — same tilt/scale as a thumbnail, so it sits parallel */}
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 border-dashed border-(--color-border-strong) transition-opacity duration-300"
          style={{
            ...box,
            ...railPose(i),
            borderWidth: 1 / THUMB, // scaled down to ~1px
            opacity: active === i ? 1 : 0,
          }}
        />
      ))}

      {cards.map((card, i) => {
        const isActive = active === i
        return (
          <motion.article
            key={card.id}
            inert={!isActive}
            initial={false}
            animate={isActive ? { x: '0%', y: 0, scale: 1, rotateY: 0 } : railPose(i)}
            transition={reduced ? { duration: 0 } : STAGE_SPRING}
            className="absolute top-0 overflow-hidden border border-(--color-border) bg-(--color-bg) shadow-[0_12px_40px_-16px_rgb(0_0_0/0.25)]"
            style={{
              ...box,
              zIndex: isActive ? 2 : 1,
              willChange: 'transform',
              pointerEvents: isActive ? 'auto' : 'none',
            }}
          >
            <CardBody card={card} className="h-full" />
          </motion.article>
        )
      })}
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
        <div className="mb-10 md:mb-14 max-w-3xl">
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
          <RevealFade className="mt-5" delay={0.22}>
            <p className="text-body-lg leading-relaxed text-(--color-text-muted) max-w-xl">
              The automation, the website, and the marketing that runs on it come from one team.
              Split it across three vendors who have never spoken to each other, and the work falls apart.
            </p>
          </RevealFade>
        </div>

        <StageStack cards={SERVICE_CARDS} />

        {/* < lg: sticky stack track — each card gets a full-height scroll slot */}
        <div ref={trackRef} className="relative flex flex-col gap-8 md:gap-12 lg:hidden">
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
