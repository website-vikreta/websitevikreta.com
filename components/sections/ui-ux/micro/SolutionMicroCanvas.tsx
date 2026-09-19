'use client'

import { useState, useEffect, type ReactNode } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'motion/react'
import { LayoutGrid, Ruler, ShoppingBag, Smartphone, Type } from 'lucide-react'
import { REVEAL_EASE } from '@/components/ui/Reveal'
import { UI_UX_SOLUTION, type DesignSystemTabId } from '@/app/services/uiux-design/data'

const pulse = { duration: 2.2, repeat: Infinity, ease: REVEAL_EASE }
const loop = { duration: 3, repeat: Infinity, ease: REVEAL_EASE }

function CanvasChrome({
  icon: Icon,
  title,
  outcome,
  children,
}: {
  icon: typeof Type
  title: string
  outcome: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-[260px] flex-col md:min-h-[290px] 2xl:min-h-[350px]" aria-hidden>
      <div className="border-b border-(--color-border) bg-(--color-bg) px-3 py-2 sm:px-3.5 sm:py-2.5 2xl:px-4 2xl:py-3">
        <div className="flex items-start gap-2 sm:gap-2.5 2xl:gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-sm bg-(--color-surface) sm:size-8 2xl:size-9">
            <Icon className="size-3.5 text-(--color-text) 2xl:size-4" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-xs font-bold text-(--color-text) sm:text-sm 2xl:text-base">{title}</p>
            <p className="mt-0.5 text-[10px] leading-relaxed text-(--color-text-muted) sm:text-[11px] 2xl:text-xs">{outcome}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-(--color-surface) p-2.5 sm:p-3 md:p-4 2xl:p-5">{children}</div>
    </div>
  )
}

function TypographyMicro() {
  const reduce = useReducedMotion()
  const tab = UI_UX_SOLUTION.tabs.find((t) => t.id === 'typography')!

  return (
    <CanvasChrome icon={Type} title="Typography" outcome="Readable hierarchy on every screen — one scale in production.">
      <div className="grid gap-2.5 md:grid-cols-[1fr_130px] 2xl:grid-cols-[1fr_140px] 2xl:gap-3">
        <div className="rounded-sm bg-(--color-bg) p-2.5 2xl:p-3">
          <p className="text-[9px] font-bold uppercase tracking-wide text-(--color-text-muted) 2xl:text-[10px]">Shipped page slice</p>
          <motion.p
            className="mt-1.5 text-lg font-bold leading-tight text-(--color-text) sm:text-xl 2xl:text-2xl"
            animate={reduce ? undefined : { opacity: [1, 0.85, 1] }}
            transition={pulse}
          >
            Display headline
          </motion.p>
          <p className="mt-1 text-xs leading-relaxed text-(--color-text-muted) sm:text-sm 2xl:text-base">
            Body copy uses one scale — not a one-off hero size in production.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5 2xl:gap-2">
            <span className="rounded-sm bg-(--color-text) px-1.5 py-0.5 text-[9px] font-bold text-(--color-surface) 2xl:text-[10px] 2xl:px-2 2xl:py-1">Primary text</span>
            <span className="rounded-sm bg-(--color-bg-muted) px-1.5 py-0.5 text-[9px] font-semibold text-(--color-text-muted) 2xl:text-[10px] 2xl:px-2 2xl:py-1">Muted</span>
            <span className="rounded-sm bg-(--color-accent) px-1.5 py-0.5 text-[9px] font-bold text-(--color-text) 2xl:text-[10px] 2xl:px-2 2xl:py-1">Accent label</span>
          </div>
        </div>

        <ul className="space-y-1.5 2xl:space-y-2">
          {tab.properties.map((row, i) => (
            <motion.li
              key={row.label}
              className="rounded-sm bg-(--color-bg) px-2 py-1.5 2xl:py-2"
              animate={reduce ? undefined : { x: [0, i % 2 ? 2 : -2, 0] }}
              transition={{ ...pulse, delay: i * 0.12 }}
            >
              <p className="text-[9px] font-bold text-(--color-text) 2xl:text-[10px]">{row.label}</p>
              <p className="font-mono text-[8px] text-(--color-text-muted) 2xl:text-[9px]">{row.value}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-2.5 grid grid-cols-4 gap-1.5 2xl:mt-3 2xl:gap-2">
        {[
          { label: 'Aa', sub: 'Display' },
          { label: 'H1', sub: 'Title' },
          { label: 'P', sub: 'Body' },
          { label: 'Lbl', sub: 'UI' },
        ].map((cell, i) => (
          <motion.div
            key={cell.sub}
            className="flex flex-col items-center justify-center rounded-sm bg-(--color-bg) py-1.5 sm:py-2 2xl:py-3"
            animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ ...loop, delay: i * 0.15 }}
          >
            <span className="text-sm font-bold text-(--color-text) sm:text-base 2xl:text-lg">{cell.label}</span>
            <span className="text-[8px] font-semibold text-(--color-text-muted) 2xl:text-[9px]">{cell.sub}</span>
          </motion.div>
        ))}
      </div>
    </CanvasChrome>
  )
}

const SPACING_CARDS = [
  {
    id: 'space-01',
    image: '/services/uiux-design/system/spacing/space-card-01.webp',
    title: 'Studio Pod',
    token: '8px pad',
    price: '$129',
  },
  {
    id: 'space-02',
    image: '/services/uiux-design/system/spacing/space-card-02.webp',
    title: 'Deck Pad',
    token: '16px gap',
    price: '$89',
  },
  {
    id: 'space-03',
    image: '/services/uiux-design/system/spacing/space-card-03.webp',
    title: 'Focus Key',
    token: '24px grid',
    price: '$149',
  },
]

function SpacingCardItem({ item }: { item: (typeof SPACING_CARDS)[number] }) {
  const [imgErr, setImgErr] = useState(false)

  return (
    <div className="flex flex-col overflow-hidden rounded-sm bg-(--color-surface)">
      <div className="relative aspect-square w-full overflow-hidden bg-(--color-bg)">
        {!imgErr ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 15vw, 12vw"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-(--color-bg) p-1 text-center">
            <span className="text-[9px] font-bold text-(--color-text-muted)">{item.title}</span>
          </div>
        )}
        <div className="absolute left-1 top-1 2xl:left-1.5 2xl:top-1.5">
          <span className="rounded-xs bg-(--color-surface)/90 px-1 py-0.5 text-[7px] font-bold text-(--color-text) backdrop-blur-xs 2xl:text-[8px] 2xl:px-1.5">
            {item.token}
          </span>
        </div>
      </div>
      <div className="flex flex-col p-1 sm:p-1.5 2xl:p-2">
        <p className="truncate text-[9px] font-bold text-(--color-text) sm:text-[10px] 2xl:text-xs">{item.title}</p>
        <p className="font-mono text-[8px] font-semibold text-(--color-text-muted) sm:text-[9px] 2xl:text-[10px]">{item.price}</p>
      </div>
    </div>
  )
}

function SpacingMicro() {
  const reduce = useReducedMotion()

  return (
    <CanvasChrome
      icon={Ruler}
      title="Spacing"
      outcome="Sections breathe, cards align, CTAs sit where the eye expects."
    >
      <div className="grid gap-2.5 sm:grid-cols-2 2xl:gap-3">
        <div className="rounded-sm bg-(--color-bg) p-2 2xl:p-3 opacity-75">
          <p className="text-[8px] font-bold uppercase tracking-wider text-(--color-text-faint) 2xl:text-[9px]">Before (No Tokens)</p>
          <div className="mt-1.5 space-y-1 p-0.5 2xl:space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-sm bg-(--color-border)" />
            <div className="h-8 2xl:h-10 rounded-sm bg-(--color-surface) p-1 2xl:p-1.5">
              <div className="h-1.5 w-1/2 bg-(--color-border)" />
            </div>
            <div className="h-3 2xl:h-4 w-full rounded-sm bg-(--color-border)" />
            <div className="h-2 2xl:h-3 w-1/3 rounded-sm bg-(--color-border)" />
          </div>
        </div>

        <motion.div
          className="rounded-sm bg-(--color-bg) p-2.5 2xl:p-3"
          animate={reduce ? undefined : { y: [0, -2, 0] }}
          transition={pulse}
        >
          <p className="flex items-center justify-between text-[8px] font-bold uppercase text-(--color-text-muted) 2xl:text-[9px]">
            <span>After — what ships</span>
            <span className="rounded-sm bg-(--color-accent) px-1 py-0.5 text-[7px] font-bold text-(--color-text) 2xl:text-[8px] 2xl:px-1.5">4px System</span>
          </p>
          <div className="mt-1.5 space-y-2 2xl:mt-2 2xl:space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold text-(--color-text) 2xl:text-xs">Product catalog grid</p>
              <span className="text-[8px] font-mono text-(--color-text-muted) 2xl:text-[9px]">var(--space-4)</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 2xl:gap-2.5">
              {SPACING_CARDS.map((card) => (
                <SpacingCardItem key={card.id} item={card} />
              ))}
            </div>
            <motion.button
              type="button"
              className="w-full rounded-sm bg-(--color-text) py-1.5 text-[9px] font-bold text-(--color-surface) sm:text-[10px] 2xl:py-2.5 2xl:text-[11px]"
              animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
              transition={pulse}
            >
              Primary action
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 rounded-sm bg-(--color-bg) px-2.5 py-1.5 2xl:mt-3 2xl:px-3 2xl:py-2">
        <span className="size-1.5 2xl:size-2 shrink-0 rounded-full bg-(--color-accent)" />
        <p className="text-[10px] leading-snug text-(--color-text-muted) 2xl:text-[11px]">
          Same margins on mobile and desktop — 4px/8px/16px tokens, no one-off padding in the build.
        </p>
      </div>
    </CanvasChrome>
  )
}

function AutoLayoutMicro() {
  const reduce = useReducedMotion()
  const [wide, setWide] = useState(false)
  const [prodImgErr, setProdImgErr] = useState(false)

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setWide((w) => !w), 3200)
    return () => window.clearInterval(t)
  }, [reduce])

  return (
    <CanvasChrome
      icon={LayoutGrid}
      title="Auto-layout"
      outcome="One component reflows — stack on phone, row on desktop, no duplicate frames."
    >
      <div className="flex items-center justify-center gap-1.5 text-[9px] font-semibold text-(--color-text-muted) 2xl:text-[10px]">
        <Smartphone className="size-3 2xl:size-3.5" />
        <motion.span animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }} transition={pulse}>
          {wide ? 'Desktop layout (row · gap-4)' : 'Mobile layout (column · gap-3)'}
        </motion.span>
      </div>

      <motion.div
        className="mx-auto mt-2 max-w-full rounded-sm bg-(--color-bg) p-2.5 2xl:p-3"
        animate={{ maxWidth: wide ? '100%' : '260px' }}
        transition={{ duration: 0.55, ease: REVEAL_EASE }}
      >
        <motion.div
          className="flex gap-2.5 2xl:gap-3"
          animate={{ flexDirection: wide ? 'row' : 'column' }}
          transition={{ duration: 0.55, ease: REVEAL_EASE }}
        >
          <div className="relative aspect-[16/10] min-h-[75px] flex-1 overflow-hidden rounded-sm bg-(--color-surface) sm:min-h-[90px] 2xl:min-h-[110px]">
            {!prodImgErr ? (
              <Image
                src="/services/uiux-design/system/auto-layout/product-card.webp"
                alt="Product preview card"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                onError={() => setProdImgErr(true)}
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <ShoppingBag className="size-5 text-(--color-text-muted) 2xl:size-6" strokeWidth={1.5} />
              </div>
            )}
            <div className="absolute left-1 top-1 2xl:left-1.5 2xl:top-1.5">
              <span className="rounded-xs bg-(--color-accent) px-1 py-0.5 text-[7px] font-bold text-(--color-text) shadow-xs 2xl:text-[8px] 2xl:px-1.5">
                PRODUCER
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-center gap-1 2xl:gap-1.5">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[8px] font-bold uppercase tracking-wider text-(--color-text-muted) 2xl:text-[9px]">Hardware series</span>
              <span className="text-[8px] font-mono font-semibold text-(--color-accent) 2xl:text-[9px]">4.9 ★</span>
            </div>
            <p className="text-[11px] font-bold leading-tight text-(--color-text) sm:text-xs 2xl:text-sm">Acoustic Studio Hub</p>
            <div className="flex items-baseline gap-1.5 2xl:gap-2">
              <span className="font-mono text-[11px] font-bold text-(--color-text) sm:text-xs 2xl:text-sm">$199.00</span>
              <span className="text-[8px] text-(--color-text-muted) 2xl:text-[9px]">· Auto-gap 16px</span>
            </div>
            <motion.button
              type="button"
              className="mt-0.5 flex h-7 items-center justify-center gap-1.5 rounded-sm bg-(--color-accent) px-2.5 text-[9px] font-bold text-(--color-text) transition-transform active:scale-95 sm:h-8 2xl:h-9 2xl:text-[10px] 2xl:px-3"
              animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
              transition={pulse}
            >
              <ShoppingBag className="size-3 2xl:size-3.5" />
              Add to cart
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      <p className="mt-2.5 text-center text-[10px] leading-relaxed text-(--color-text-muted) 2xl:mt-3 2xl:text-[11px]">
        What your team builds matches the prototype — direction, tokens, and auto-layout already decided.
      </p>
    </CanvasChrome>
  )
}

export function SolutionMicroCanvas({ tabId }: { tabId: DesignSystemTabId }) {
  switch (tabId) {
    case 'typography':
      return <TypographyMicro />
    case 'spacing':
      return <SpacingMicro />
    case 'auto-layout':
      return <AutoLayoutMicro />
  }
}
