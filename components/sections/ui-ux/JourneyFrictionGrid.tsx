'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'
import { UI_UX_PAIN, type JourneyFrictionCard, type PainMicroScene } from '@/app/services/uiux-design/data'
import {
  MicroFunnelLeak,
  MicroScrollDepth,
  MicroSpecDrift,
  PainMicroSceneFull,
} from '@/components/sections/ui-ux/micro/PainMicroScenes'

function MicroOverlay({ scene }: { scene: PainMicroScene }) {
  switch (scene) {
    case 'scroll-depth':
      return <MicroScrollDepth />
    case 'funnel-leak':
      return <MicroFunnelLeak />
    case 'spec-drift':
      return <MicroSpecDrift />
  }
}

function NoteVisual({ card }: { card: JourneyFrictionCard }) {
  const [imageOk, setImageOk] = useState(Boolean(card.image?.src))
  const showImage = card.image && imageOk

  return (
    <div className="relative aspect-[16/9] 2xl:aspect-[16/10] max-h-[105px] sm:max-h-[115px] md:max-h-[110px] lg:max-h-[120px] xl:max-h-[135px] 2xl:max-h-[160px] w-full overflow-hidden bg-(--color-bg)">
      {showImage ? (
        <>
          <Image
            src={card.image!.src}
            alt={card.image!.alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 30vw, 28vw"
            onError={() => setImageOk(false)}
          />
          <motion.div
            className="pointer-events-none absolute inset-0 bg-(--color-text)/8"
            animate={{ opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 3, repeat: Infinity, ease: REVEAL_EASE }}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0">
            <MicroOverlay scene={card.microScene} />
          </div>
        </>
      ) : (
        <PainMicroSceneFull scene={card.microScene} />
      )}
    </div>
  )
}

function BoardPin() {
  return (
    <div className="relative z-20 mx-auto -mb-1.5 2xl:-mb-2 flex w-fit flex-col items-center" aria-hidden>
      <span className="size-2 2xl:size-2.5 rounded-full border border-(--color-text)/20 bg-(--color-accent) shadow-[0_1.5px_0_0_var(--color-text)] 2xl:shadow-[0_2px_0_0_var(--color-text)]" />
      <span className="mt-0.5 h-1 2xl:h-1.5 w-px bg-(--color-text)/30" />
    </div>
  )
}

function PinnedNote({ card, index }: { card: JourneyFrictionCard; index: number }) {
  return (
    <motion.article
      className="relative flex w-full min-w-0 flex-1 flex-col"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: REVEAL_EASE, delay: index * 0.08 }}
    >
      <BoardPin />
      <div className="flex flex-1 flex-col overflow-hidden rounded-sm bg-(--color-surface)">
        <div className="overflow-hidden">
          <NoteVisual card={card} />
        </div>
        <div className="flex flex-1 flex-col p-2.5 sm:p-3 lg:p-3.5 2xl:p-4">
          <p className="text-[11px] font-semibold text-(--color-text) md:text-xs 2xl:text-sm">{card.symptom}</p>
          <h3 className="mt-0.5 text-sm font-bold leading-snug text-(--color-text) sm:text-base lg:text-base xl:text-lg 2xl:text-xl">
            {card.title}
          </h3>
          <p className="mt-1 2xl:mt-2 text-[11px] leading-relaxed text-(--color-text-muted) sm:text-xs 2xl:text-sm">
            {card.problem}
          </p>
        </div>
      </div>
    </motion.article>
  )
}

export function JourneyFrictionGrid() {
  const cards = UI_UX_PAIN.cards

  return (
    <section className="overflow-visible py-8 sm:py-10 md:py-12 2xl:py-20" aria-labelledby="uiux-pain-heading">
      <div className="container overflow-visible">
        <header className="mb-4 max-w-3xl md:mb-5 2xl:mb-8">
          <RevealText as="h2" className="text-xl font-bold text-balance text-(--color-text) sm:text-2xl md:text-3xl lg:text-3xl 2xl:text-h2">
            <span id="uiux-pain-heading">{UI_UX_PAIN.heading}</span>
          </RevealText>
          <p className="mt-1.5 2xl:mt-3 max-w-2xl text-pretty text-xs leading-relaxed text-(--color-text-muted) sm:text-sm md:text-base 2xl:text-body-lg">
            {UI_UX_PAIN.subhead}
          </p>
        </header>

        <div
          className="relative overflow-visible rounded-sm bg-(--color-bg) px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 2xl:px-8 2xl:py-8"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="relative mb-3.5 flex justify-center md:mb-4 2xl:mb-6">
            <motion.div
              className="relative max-w-xs 2xl:max-w-sm rounded-sm bg-(--color-surface) px-3 pb-1.5 pt-4 sm:px-3.5 sm:pb-2 sm:pt-5 2xl:px-4 2xl:pb-2.5 2xl:pt-6"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: REVEAL_EASE }}
            >
              <div className="absolute left-1/2 top-1 -translate-x-1/2">
                <BoardPin />
              </div>
              <p className="text-center text-[11px] font-bold uppercase tracking-wide text-(--color-text) sm:text-xs 2xl:text-sm">
                Why clients leave
              </p>
              <p className="mt-0.5 text-center text-[10px] 2xl:text-[11px] text-(--color-text-muted)">Pinned from analytics + session replay</p>
            </motion.div>
          </div>

          <div className="relative grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-3 lg:gap-4 2xl:gap-6">
            {cards.map((card, index) => (
              <PinnedNote key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
