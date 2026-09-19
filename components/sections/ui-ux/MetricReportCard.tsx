'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'
import {
  UI_UX_PROOF,
  type MetricReportCardData,
  type MetricReportSeriesPoint,
} from '@/app/services/uiux-design/data'

const CHART_H = 56
const CHART_W = 100

function ChartGrid() {
  return (
    <>
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1="0"
          y1={CHART_H - t * (CHART_H - 8)}
          x2={CHART_W}
          y2={CHART_H - t * (CHART_H - 8)}
          stroke="var(--color-border)"
          strokeWidth="0.5"
        />
      ))}
    </>
  )
}

function BarChart({
  series,
  animate,
}: {
  series: MetricReportSeriesPoint[]
  animate: boolean
}) {
  const n = series.length
  const barW = 100 / (n * 2 + 1)

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="h-28 sm:h-32 2xl:h-36 w-full" aria-hidden>
      <ChartGrid />
      <line x1="0" y1={CHART_H - 4} x2={CHART_W} y2={CHART_H - 4} stroke="var(--color-text)" strokeWidth="0.75" />
      {series.map((point, i) => {
        const h = point.value * (CHART_H - 12)
        const x = barW + i * barW * 2
        const y = CHART_H - 4 - h
        return (
          <g key={point.label}>
            <motion.rect
              x={x}
              y={CHART_H - 4}
              width={barW}
              height={h}
              fill="var(--color-accent)"
              initial={{ height: 0, y: CHART_H - 4 }}
              animate={{
                height: animate ? h : 0,
                y: animate ? y : CHART_H - 4,
              }}
              transition={{ duration: 0.7, ease: REVEAL_EASE, delay: i * 0.1 }}
            />
            <text
              x={x + barW / 2}
              y={CHART_H - 6}
              textAnchor="middle"
              className="fill-(--color-text-muted) text-[3px] font-semibold"
            >
              {point.label}
            </text>
            <motion.text
              x={x + barW / 2}
              y={y - 2}
              textAnchor="middle"
              className="fill-(--color-text) text-[3.5px] font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: animate ? 1 : 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              {Math.round(point.value * 100)}%
            </motion.text>
          </g>
        )
      })}
    </svg>
  )
}

function LineChart({
  series,
  animate,
}: {
  series: MetricReportSeriesPoint[]
  animate: boolean
}) {
  const points = series.map((p, i) => {
    const x = series.length === 1 ? 50 : (i / (series.length - 1)) * 88 + 6
    const y = CHART_H - 4 - p.value * (CHART_H - 12)
    return { x, y, label: p.label, v: p.value }
  })
  const pathD = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`
  const areaD = `${pathD} L ${points[points.length - 1].x},${CHART_H - 4} L ${points[0].x},${CHART_H - 4} Z`

  return (
    <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="h-28 sm:h-32 2xl:h-36 w-full" aria-hidden>
      <ChartGrid />
      <line x1="0" y1={CHART_H - 4} x2={CHART_W} y2={CHART_H - 4} stroke="var(--color-text)" strokeWidth="0.75" />
      <motion.path
        d={areaD}
        fill="var(--color-accent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: animate ? 0.18 : 0 }}
        transition={{ duration: 0.6, ease: REVEAL_EASE }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.8"
        strokeLinecap="square"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: animate ? 1 : 0 }}
        transition={{ duration: 1, ease: REVEAL_EASE }}
      />
      {points.map((p, i) => (
        <g key={p.label}>
          <motion.circle
            cx={p.x}
            cy={p.y}
            r="2.2"
            fill="var(--color-surface)"
            stroke="var(--color-text)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: animate ? 1 : 0, scale: animate ? 1 : 0 }}
            transition={{ delay: 0.45 + i * 0.08, duration: 0.35 }}
          />
          <text x={p.x} y={CHART_H - 1} textAnchor="middle" className="fill-(--color-text-muted) text-[3px]">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function MetricReportCard({ card }: { card: MetricReportCardData }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduceMotion = useReducedMotion()
  const animateChart = inView || Boolean(reduceMotion)

  return (
    <article
      ref={ref}
      className="flex flex-col overflow-hidden rounded-sm border border-(--color-border) bg-(--color-surface)"
    >
      <div className="border-b border-(--color-border) bg-(--color-bg) px-3 py-2 sm:px-4 sm:py-3">
        <p className="text-[11px] text-(--color-text-muted) sm:text-xs">{card.engagement}</p>
        <p className="text-xs sm:text-sm font-semibold text-(--color-text)">{card.client}</p>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4 2xl:p-6">
        <p className="font-mono text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold leading-none tracking-[-0.05em] text-(--color-text)">
          {card.metric}
        </p>
        <p className="mt-1.5 text-xs text-(--color-text-muted) sm:text-sm">{card.metricDescriptor}</p>

        <div className="mt-3.5 sm:mt-4 2xl:mt-6 rounded-sm border border-(--color-border) bg-(--color-bg) p-2 sm:p-3">
          {card.chart.kind === 'bar' ? (
            <BarChart series={card.chart.series} animate={animateChart} />
          ) : (
            <LineChart series={card.chart.series} animate={animateChart} />
          )}
        </div>

        <p className="mt-2.5 sm:mt-3 2xl:mt-4 text-[11px] sm:text-xs 2xl:text-sm leading-relaxed text-(--color-text-muted)">{card.context}</p>
      </div>
    </article>
  )
}

export function MetricReportSection() {
  return (
    <section id="metrics" className="py-8 sm:py-10 md:py-12 2xl:py-20" aria-labelledby="uiux-proof-heading">
      <div className="container">
        <header className="mb-4 max-w-3xl md:mb-5 2xl:mb-8">
          <RevealText as="h2" className="text-xl font-bold text-(--color-text) sm:text-2xl md:text-3xl 2xl:text-h2">
            <span id="uiux-proof-heading">{UI_UX_PROOF.heading}</span>
          </RevealText>
          {UI_UX_PROOF.subhead && (
            <RevealText as="p" className="mt-1.5 sm:mt-2 text-xs text-(--color-text-muted) sm:text-sm md:text-base 2xl:text-body-lg">
              {UI_UX_PROOF.subhead}
            </RevealText>
          )}
        </header>

        <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 2xl:gap-4">
          {UI_UX_PROOF.cards.map((card) => (
            <MetricReportCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}
