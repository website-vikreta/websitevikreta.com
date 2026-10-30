'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { Globe, BarChart2, Bot, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RevealText, RevealFade, REVEAL_EASE } from '@/components/ui/Reveal'
import { ServiceMotion } from './ServiceMotion'

type CardId = 'web-dev' | 'digital-marketing' | 'ai-automation' | 'web-mobile-crm' | 'uiux'

interface ServiceCard {
  id: CardId
  title: string
  description: string
  tagline: string // short line under the title on the small bento cards
  image: string
  href: string
  FallbackIcon: React.ComponentType<{ size?: number; className?: string }>
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation & Workflow Optimization',
    description:
      'We audit the hours your team spends on CRM, reporting, and support, then build custom AI agents and workflow automation that take that work off their plate.',
    image: '/services/landing/ai-automation.webp',
    tagline: 'AI agents for CRM, reporting, and support work.',
    href: '/services/ai-automations',
    FallbackIcon: Bot,
  },
  {
    id: 'web-dev',
    title: 'Website Development',
    description:
      'Custom, SEO-ready websites for growing businesses. Fast to load, written to rank, and built around how you sell.',
    image: '/services/landing/web-development.webp',
    tagline: 'Fast, SEO-ready sites built around how you sell.',
    href: '/services/web-development',
    FallbackIcon: Globe,
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description:
      'User research, wireframes, and product design for web and mobile. Design systems and prototypes your developers can actually ship.',
    image: '/services/landing/ui-ux.webp',
    tagline: 'Research, product design, and design systems.',
    href: '/services/uiux-design',
    FallbackIcon: Smartphone,
  },
  {
    id: 'web-mobile-crm',
    title: 'Web & Mobile Apps / CRM Systems',
    description:
      'Custom CRMs, customer portals, internal tools, and e-commerce. Web and mobile apps built around how your business runs.',
    image: '/services/landing/web-mobile-apps.webp',
    tagline: 'CRMs, portals, internal tools, and e-commerce.',
    href: '/services/web-mobile-app-development',
    FallbackIcon: Smartphone,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing / SEO & GEO',
    description:
      'SEO, GEO, content, and paid campaigns built to bring in leads. Local SEO and growth marketing you can measure in enquiries.',
    image: '/services/landing/digital-marketing-seo-geo.webp',
    tagline: 'SEO, GEO, content, and paid campaigns.',
    href: '/services/digital-marketing',
    FallbackIcon: BarChart2,
  },
]

// Vertical offset between stacked cards so previous cards peek above the active one.
const STACK_GAP = 22 // px added per card index
const STACK_TOP = 96 // px from viewport top where cards stick (clears nav)

// Card content for the < lg scroll stack: image on top at its native 16:9, copy below. On tablets
// the copy and CTA sit side by side so the card stays short enough to stack in one screen.
function CardBody({ card }: { card: ServiceCard }) {
  const { FallbackIcon } = card
  return (
    <div className="flex flex-col">
      <div className="relative aspect-video">
        {card.image ? (
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-(--color-bg-muted)">
            <FallbackIcon size={48} className="text-(--color-text-faint)" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-end md:justify-between md:gap-10">
        <div>
          <h3 className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text)">
            {card.title}
          </h3>
          <p
            className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)"
            style={{ maxWidth: '46ch' }}
          >
            {card.description}
          </p>
        </div>

        <div className="shrink-0">
          <Button href={card.href} variant="ghost" size="md" showArrow>
            Explore More
          </Button>
        </div>
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
    // Short screens (landscape phones) can't fit a pinned card, so its CTA would hide under the next one.
    // There the stack (and its shrink) is switched off and the cards just scroll.
    <div className="sticky [@media(max-height:600px)]:static" style={{ top: STACK_TOP + i * STACK_GAP }}>
      <motion.article
        style={{ scale, transformOrigin: 'center top' }}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: REVEAL_EASE }}
        className="relative w-full overflow-hidden border border-(--color-border) bg-(--color-bg) [@media(max-height:600px)]:transform-none!"
      >
        <CardBody card={card} />
      </motion.article>
    </div>
  )
}

// lg+: bento grid, three cards over two. Hovering (or focusing) a card grows it and its row while
// the rest shrink. Only flex-grow animates, so cards never swap places under the cursor.
const BENTO_ROWS = [[0, 1, 2], [3, 4]]
const BENTO_H = 720
const BENTO_EASE = 'duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none'
const HOVER_INTENT = 90 // ms the pointer must rest on a card, so sweeping across the grid doesn't fire every card

function BentoCard({
  card,
  active,
  onHover,
  onFocus,
}: {
  card: ServiceCard
  active: boolean
  onHover: () => void
  onFocus: () => void
}) {
  return (
    <article
      onPointerEnter={onHover}
      onFocus={onFocus}
      className={`group relative flex min-w-0 flex-col overflow-hidden border bg-(--color-bg) transition-[flex-grow,border-color] ${BENTO_EASE} ${
        active ? 'border-(--color-border-strong)' : 'border-(--color-border) hover:border-(--color-border-strong)'
      }`}
      style={{ flexGrow: active ? 2.4 : 1, flexBasis: 0 }}
    >
      {/* Whole card is the link; the visible CTA below is the keyboard/screen-reader path */}
      <Link href={card.href} tabIndex={-1} aria-hidden="true" className="absolute inset-0 z-10" />

      {/* Image above the copy, never under it. The whole 16:9 illustration stays in view at any card
          shape, and the panel around it is the illustration's own paper colour so it reads as one fill.
          The motion layer shares the 16:9 box, so its coordinates stay pinned to the picture. */}
      <div
        className={`relative min-h-0 flex-1 bg-[#FAF5EA] [container-type:size] transition-[filter] ${BENTO_EASE} ${
          active ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
        }`}
      >
        <div className="absolute left-1/2 top-1/2 aspect-video w-[min(100cqw,calc(100cqh*16/9))] -translate-x-1/2 -translate-y-1/2">
          <Image src={card.image} alt="" fill className="object-cover" sizes="(max-width: 1280px) 60vw, 800px" />
          <ServiceMotion id={card.id} active={active} />
        </div>
      </div>

      {/* Kept short (CTA beside the title, copy clamped to two lines) so the active card's image stays the biggest */}
      {/* Fixed height, so the image above (flex-1) is sized by the card alone: a title that wraps to two lines no
          longer makes its image shorter than its neighbours' */}
      <div className="h-40 shrink-0 overflow-hidden px-6 pb-6 pt-2 xl:px-8">
        {/* min-h matches the CTA button, so a one-line title no longer lets the button poke up into the image */}
        <div className="relative flex min-h-11 items-center">
          {/* The hidden CTA is absolutely placed so it never steals width from a small card's title */}
          <h3
            className={`font-sans text-xl font-bold leading-[1.15] text-(--color-text) xl:text-2xl ${active ? 'pr-44' : ''}`}
          >
            {card.title}
          </h3>
          <div
            className={`absolute right-0 top-1/2 z-20 -translate-y-1/2 transition-opacity ${BENTO_EASE} ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            {/* Stays focusable while hidden: tabbing onto it is what activates the card */}
            <Button href={card.href} variant="ghost" size="sm" showArrow>
              Explore More
            </Button>
          </div>
        </div>
        {/* Small cards carry a short tagline; the active card swaps it for the full copy */}
        <div
          className={`grid transition-[grid-template-rows,opacity] ${BENTO_EASE} ${
            active ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <p className="line-clamp-2 pt-2 text-sm text-(--color-text-muted)">{card.tagline}</p>
          </div>
        </div>
        {/* Fixed text width so the copy doesn't reflow while the card grows */}
        <div
          className={`grid transition-[grid-template-rows,opacity] ${BENTO_EASE} ${
            active ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <p className="line-clamp-2 w-[62ch] max-w-full pt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

function BentoStack({ cards }: { cards: ServiceCard[] }) {
  const [active, setActive] = useState(0)
  const intent = useRef<ReturnType<typeof setTimeout>>(undefined)
  const hover = (i: number) => {
    clearTimeout(intent.current)
    intent.current = setTimeout(() => setActive(i), HOVER_INTENT)
  }
  useEffect(() => () => clearTimeout(intent.current), [])

  return (
    <div
      data-testid="bento-desktop"
      className="hidden flex-col gap-4 lg:flex"
      style={{ height: BENTO_H }}
      onPointerLeave={() => clearTimeout(intent.current)}
    >
      {BENTO_ROWS.map((row) => (
        <div
          key={row[0]}
          className={`flex min-h-0 gap-4 transition-[flex-grow] ${BENTO_EASE}`}
          style={{ flexGrow: row.includes(active) ? 1.8 : 1, flexBasis: 0 }}
        >
          {row.map((i) => (
            <BentoCard
              key={cards[i].id}
              card={cards[i]}
              active={active === i}
              onHover={() => hover(i)}
              onFocus={() => setActive(i)}
            />
          ))}
        </div>
      ))}
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

        <BentoStack cards={SERVICE_CARDS} />

        {/* < lg: sticky stack track — each card gets a full-height scroll slot */}
        <div ref={trackRef} data-testid="bento-stack" className="relative flex flex-col gap-8 md:gap-12 lg:hidden">
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
