'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'
import { UI_UX_PROCESS, type UiUxProcessNode } from '@/app/services/uiux-design/data'
const NODE_COUNT = UI_UX_PROCESS.nodes.length

function ProcessNodeCard({
  node,
  index,
  active,
}: {
  node: UiUxProcessNode
  index: number
  active: boolean
}) {
  return (
    <article
      className="relative grid grid-cols-[3.5rem_1fr] gap-3 sm:grid-cols-[4rem_1fr] sm:gap-4 md:grid-cols-[4.5rem_1fr] md:gap-6"
      aria-current={active ? 'step' : undefined}
    >
      <div className="relative z-10 flex items-start justify-center pt-2 md:pt-3">
        <motion.div
          className="flex size-11 items-center justify-center rounded-sm border bg-(--color-surface) sm:size-12 md:size-12 2xl:size-14"
          animate={{
            borderColor: active ? 'var(--color-accent)' : 'var(--color-border)',
            scale: active ? 1 : 0.94,
          }}
          transition={{ duration: 0.45, ease: REVEAL_EASE }}
        >
          <span className="text-xs font-bold text-(--color-text) md:text-sm">{String(index + 1).padStart(2, '0')}</span>
        </motion.div>
      </div>

      <motion.div
        className="overflow-hidden rounded-sm border border-(--color-border) bg-(--color-surface)"
        animate={{
          borderColor: active ? 'var(--color-border-strong)' : 'var(--color-border)',
        }}
        transition={{ duration: 0.4, ease: REVEAL_EASE }}
      >
        <div className="border-b border-(--color-border) px-4 py-3 sm:px-5 sm:py-4 md:px-6">
          <h3 className="text-base font-bold text-(--color-text) sm:text-lg md:text-xl 2xl:text-2xl">{node.title}</h3>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: active ? 'auto' : 0,
            opacity: active ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: REVEAL_EASE }}
          className="overflow-hidden"
        >
          <div className="space-y-3 p-4 sm:space-y-4 sm:p-5 md:p-6">
            <p className="text-xs leading-relaxed text-(--color-text-muted) sm:text-sm md:text-base 2xl:text-body-lg">
              {node.summary}
            </p>
            <ul className="space-y-1.5 border-t border-(--color-border) pt-3 sm:space-y-2 sm:pt-4">
              {node.deliverables.map((item) => (
                <li key={item} className="flex gap-2 text-xs text-(--color-text) sm:text-sm">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-sm bg-(--color-accent)" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </article>
  )
}

export function NodeTreeScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'end 0.35'],
  })

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduceMotion) return
    const idx = Math.min(NODE_COUNT - 1, Math.max(0, Math.floor(v * NODE_COUNT + 0.12)))
    setActiveIndex(idx)
  })

  const displayIndex = reduceMotion ? NODE_COUNT - 1 : activeIndex

  return (
    <section ref={sectionRef} className="py-8 sm:py-10 md:py-12 2xl:py-20" aria-labelledby="uiux-process-heading">
      <div className="container">
        <header className="mb-4 max-w-3xl md:mb-5 2xl:mb-8">
          <RevealText as="h2" className="text-xl font-bold text-(--color-text) sm:text-2xl md:text-3xl 2xl:text-h2">
            <span id="uiux-process-heading">{UI_UX_PROCESS.heading}</span>
          </RevealText>
          <RevealText as="p" className="mt-1.5 text-xs text-(--color-text-muted) sm:text-sm md:text-base 2xl:text-body-lg" delay={0.1}>
            {UI_UX_PROCESS.subhead}
          </RevealText>
        </header>

        <div className="relative">
          {/* Continuous flow line container centered exactly on badge column */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex w-[3.5rem] justify-center sm:w-[4rem] md:w-[4.5rem]" aria-hidden>
            <div className="my-6 w-0.5 h-[calc(100%-3rem)] bg-(--color-border)" />
            <motion.div
              className="absolute top-6 bottom-6 w-0.5 origin-top bg-(--color-accent)"
              style={{ scaleY: pathLength }}
            />
          </div>

          <div className="relative space-y-3.5 sm:space-y-4">
            {UI_UX_PROCESS.nodes.map((node, index) => (
              <ProcessNodeCard
                key={node.id}
                node={node}
                index={index}
                active={reduceMotion ? true : index <= displayIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
