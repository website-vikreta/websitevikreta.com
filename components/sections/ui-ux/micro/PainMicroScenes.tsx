'use client'

import { motion, useReducedMotion } from 'motion/react'
import { REVEAL_EASE } from '@/components/ui/Reveal'

const loop = { duration: 2.4, repeat: Infinity, ease: REVEAL_EASE }

/** Compact animated overlay — sits on top of photography, theme tokens only. */
export function MicroScrollDepth() {
  const reduce = useReducedMotion()
  return (
    <div className="flex w-full flex-col justify-end p-2 sm:p-2.5" aria-hidden>
      <div className="rounded-sm border border-(--color-accent) bg-(--color-surface)/95 px-2 py-1.5 backdrop-blur-[2px]">
        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold">
          <span className="text-(--color-text-muted)">Scroll depth</span>
          <motion.span
            className="rounded-sm bg-(--color-accent) px-1.5 py-0.5 text-[9px] font-bold text-(--color-text)"
            animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
            transition={loop}
          >
            Stuck at hero
          </motion.span>
        </div>
        <div className="mt-1.5 h-1 overflow-hidden rounded-sm bg-(--color-border)">
          <motion.div
            className="h-full bg-(--color-text)"
            animate={reduce ? { width: '14%' } : { width: ['8%', '14%', '10%', '14%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: REVEAL_EASE }}
          />
        </div>
      </div>
    </div>
  )
}

export function MicroFunnelLeak() {
  const reduce = useReducedMotion()
  return (
    <div className="flex w-full items-end p-2 sm:p-2.5" aria-hidden>
      <div className="w-full rounded-sm border border-(--color-border) bg-(--color-surface)/95 px-2 py-1.5 backdrop-blur-[2px]">
        <p className="text-[10px] font-semibold text-(--color-text-muted)">Live session</p>
        <div className="mt-1 flex gap-1">
          {[1, 2, 3, 4].map((n) => (
            <motion.div
              key={n}
              className={`h-1 flex-1 rounded-sm ${n === 3 ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`}
              animate={
                reduce || n !== 3
                  ? undefined
                  : { scaleY: [1, 1.35, 1], opacity: [0.6, 1, 0.6] }
              }
              transition={{ ...loop, delay: n * 0.1 }}
              style={{ originY: 1 }}
            />
          ))}
        </div>
        <motion.p
          className="mt-1 text-[10px] font-semibold text-(--color-text)"
          animate={reduce ? undefined : { x: [0, 2, 0] }}
          transition={loop}
        >
          Drop-off at shipping
        </motion.p>
      </div>
    </div>
  )
}

export function MicroSpecDrift() {
  const reduce = useReducedMotion()
  return (
    <div className="flex w-full items-end p-2 sm:p-2.5" aria-hidden>
      <motion.div
        className="flex w-full items-center gap-1.5 rounded-sm border border-(--color-text) bg-(--color-surface)/95 px-2 py-1.5 backdrop-blur-[2px]"
        animate={reduce ? undefined : { borderColor: ['var(--color-border)', 'var(--color-accent)', 'var(--color-border)'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: REVEAL_EASE }}
      >
        <span className="size-1.5 shrink-0 rounded-sm bg-(--color-accent)" />
        <p className="text-[10px] font-semibold leading-tight text-(--color-text)">
          Spec drift: spacing + button states
        </p>
      </motion.div>
    </div>
  )
}

/** Full-card micro when no image is available */
export function PainMicroSceneFull({ scene }: { scene: 'scroll-depth' | 'funnel-leak' | 'spec-drift' }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative h-full min-h-[200px] overflow-hidden bg-(--color-bg) p-4" aria-hidden>
      <motion.div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full border border-(--color-accent)"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <div className="relative z-10 h-full rounded-sm border border-(--color-border) bg-(--color-surface)">
        {scene === 'scroll-depth' && <MicroScrollDepthFull reduce={!!reduce} />}
        {scene === 'funnel-leak' && <MicroFunnelLeakFull reduce={!!reduce} />}
        {scene === 'spec-drift' && <MicroSpecDriftFull reduce={!!reduce} />}
      </div>
    </div>
  )
}

function MicroScrollDepthFull({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="flex justify-between text-xs font-semibold text-(--color-text-muted)">
        <span>Heatmap</span>
        <span className="text-(--color-text)">No scroll</span>
      </div>
      <div className="relative mt-3 flex-1 rounded-sm border border-(--color-border) bg-(--color-bg) p-3">
        <motion.div
          className="absolute left-1/2 top-4 size-16 -translate-x-1/2 rounded-full border-2 border-(--color-accent) bg-(--color-accent)/25"
          animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
          transition={loop}
        />
        <motion.div
          className="absolute inset-x-3 bottom-3 h-1 rounded-sm bg-(--color-border)"
          animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={loop}
        />
      </div>
    </div>
  )
}

function MicroFunnelLeakFull({ reduce }: { reduce: boolean }) {
  const steps = ['Cart', 'Info', 'Ship', 'Pay']
  return (
    <div className="flex h-full flex-col justify-center gap-2 p-4">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <motion.div
            className={`size-7 rounded-sm border text-center text-[10px] font-bold leading-7 ${
              i === 2
                ? 'border-(--color-accent) bg-(--color-accent) text-(--color-text)'
                : 'border-(--color-border) bg-(--color-surface) text-(--color-text-muted)'
            }`}
            animate={reduce || i !== 2 ? undefined : { y: [0, -2, 0] }}
            transition={loop}
          >
            {i + 1}
          </motion.div>
          <div className="h-2 flex-1 rounded-sm bg-(--color-border)" />
          <span className="w-10 text-[10px] text-(--color-text-muted)">{label}</span>
        </div>
      ))}
    </div>
  )
}

function MicroSpecDriftFull({ reduce }: { reduce: boolean }) {
  return (
    <div className="grid h-full grid-cols-2 gap-2 p-3">
      <div className="rounded-sm border border-(--color-border) bg-(--color-bg) p-2">
        <p className="text-[9px] font-bold text-(--color-text-muted)">Figma</p>
        <div className="mt-2 h-8 rounded-sm border border-(--color-border-strong) bg-(--color-surface)" />
      </div>
      <motion.div
        className="rounded-sm border border-(--color-accent) bg-(--color-surface) p-2"
        animate={reduce ? undefined : { x: [0, 4, 0] }}
        transition={loop}
      >
        <p className="text-[9px] font-bold text-(--color-text-muted)">Build</p>
        <div className="mt-2 h-8 rounded-sm border border-dashed border-(--color-text) bg-(--color-bg)" />
      </motion.div>
    </div>
  )
}
