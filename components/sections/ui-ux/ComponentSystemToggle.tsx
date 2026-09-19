'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'
import {
  UI_UX_SOLUTION,
  UI_UX_SOLUTION_AUTO_MS,
  type DesignSystemTab,
  type DesignSystemTabId,
} from '@/app/services/uiux-design/data'
import { SolutionMicroCanvas } from '@/components/sections/ui-ux/micro/SolutionMicroCanvas'

function SystemCanvas({ tabId, tabTitle }: { tabId: DesignSystemTabId; tabTitle: string }) {
  return (
    <div className="relative min-h-[270px] flex-1 overflow-hidden rounded-sm border border-(--color-border) bg-(--color-surface) md:min-h-[300px] 2xl:min-h-[340px]">
      <div className="flex items-center justify-between gap-2 border-b border-(--color-border) px-3.5 py-2 sm:px-4 sm:py-2.5 2xl:py-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="size-1.5 rounded-sm bg-(--color-accent)" />
          <span className="text-[11px] font-semibold text-(--color-text-muted) sm:text-xs">Live preview · {tabTitle}</span>
        </div>
        <motion.span
          className="text-[9px] font-semibold text-(--color-text-faint) sm:text-[10px]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: REVEAL_EASE }}
        >
          Auto
        </motion.span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tabId}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.35, ease: REVEAL_EASE }}
        >
          <SolutionMicroCanvas tabId={tabId} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function PropertiesPanel({
  tabs,
  activeId,
  progressKey,
}: {
  tabs: DesignSystemTab[]
  activeId: DesignSystemTabId
  progressKey: number
}) {
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]
  const activeIndex = tabs.findIndex((t) => t.id === activeId)

  return (
    <div className="flex flex-col rounded-sm border border-(--color-border) bg-(--color-surface) md:max-w-md md:w-[40%] 2xl:w-[42%] md:flex-none">
      <div className="border-b border-(--color-border) px-3.5 py-2 sm:px-4 sm:py-2.5 2xl:py-3">
        <p className="text-[11px] font-semibold text-(--color-text-muted) sm:text-xs">Properties</p>
        <div className="mt-1.5 flex gap-1">
          {tabs.map((tab, i) => (
            <div
              key={tab.id}
              className={`h-1 flex-1 rounded-sm ${
                i === activeIndex ? 'bg-(--color-text)' : 'bg-(--color-border)'
              }`}
              aria-hidden
            />
          ))}
        </div>
        <motion.div
          key={progressKey}
          className="mt-1 h-0.5 origin-left bg-(--color-accent)"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: UI_UX_SOLUTION_AUTO_MS / 1000, ease: 'linear' }}
        />
      </div>

      <div className="flex flex-wrap gap-1.5 border-b border-(--color-border) p-2 sm:p-2.5 2xl:p-3" aria-live="polite">
        {tabs.map((tab) => {
          const selected = tab.id === activeId
          return (
            <span
              key={tab.id}
              className={`rounded-sm px-2 py-0.5 text-[11px] font-semibold 2xl:text-xs 2xl:px-2.5 2xl:py-1 ${
                selected
                  ? 'bg-(--color-text) text-(--color-surface)'
                  : 'border border-(--color-border) text-(--color-text-muted)'
              }`}
            >
              {tab.panelTitle}
            </span>
          )
        })}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4 2xl:p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: REVEAL_EASE }}
          >
            <p className="text-xs sm:text-sm leading-relaxed text-(--color-text-muted) 2xl:text-body-lg">{active.description}</p>
            <ul className="mt-3.5 space-y-2 border-t border-(--color-border) pt-3.5 sm:mt-4 sm:space-y-2.5 sm:pt-4 2xl:space-y-3 2xl:pt-5">
              {active.properties.map((row) => (
                <li key={row.label} className="flex items-baseline justify-between gap-3 text-xs sm:text-sm 2xl:text-base">
                  <span className="font-semibold text-(--color-text)">{row.label}</span>
                  <span className="text-right text-[11px] text-(--color-text-muted) sm:text-xs 2xl:text-sm">{row.value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function ComponentSystemToggle() {
  const tabs = UI_UX_SOLUTION.tabs
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<DesignSystemTabId>(UI_UX_SOLUTION.defaultTabId)
  const [progressKey, setProgressKey] = useState(0)

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeId) ?? tabs[0],
    [tabs, activeId],
  )

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => {
      setActiveId((prev) => {
        const idx = tabs.findIndex((t) => t.id === prev)
        const next = tabs[(idx + 1) % tabs.length]
        return next.id
      })
      setProgressKey((k) => k + 1)
    }, UI_UX_SOLUTION_AUTO_MS)
    return () => window.clearInterval(timer)
  }, [reduceMotion, tabs])

  return (
    <section className="py-8 sm:py-10 md:py-12 2xl:py-20" aria-labelledby="uiux-solution-heading">
      <div className="container">
        <header className="mb-4 max-w-3xl md:mb-5 2xl:mb-8">
          <RevealText as="h2" className="text-xl font-bold text-(--color-text) sm:text-2xl md:text-3xl 2xl:text-h2">
            <span id="uiux-solution-heading">{UI_UX_SOLUTION.heading}</span>
          </RevealText>
          <RevealText as="p" className="mt-1.5 text-xs text-(--color-text-muted) sm:text-sm md:text-base 2xl:text-body-lg" delay={0.1}>
            {UI_UX_SOLUTION.subhead}
          </RevealText>
        </header>

        <div className="flex flex-col gap-3.5 lg:flex-row lg:items-stretch 2xl:gap-6">
          <SystemCanvas tabId={activeTab.id} tabTitle={activeTab.panelTitle} />
          <PropertiesPanel tabs={tabs} activeId={activeId} progressKey={progressKey} />
        </div>

        <div className="mt-5 sm:mt-6 2xl:mt-10">
          <Button href={UI_UX_SOLUTION.cta.hash} variant="ghost" size="sm" showArrow>
            {UI_UX_SOLUTION.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
