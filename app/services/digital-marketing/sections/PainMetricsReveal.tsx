'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import Image from 'next/image'
import { GripHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

// Illustrated (not screenshotted) per brand.md — same watercolor/hand-drawn
// language as manual-work-vs-automated.webp on the AI-Automations page: warm
// cream ground, muted grayscale "before", the single --color-accent yellow
// reserved for the "after" side. Both images share one composition/camera
// angle so the drag genuinely reads as noise resolving into signal.
const BEFORE_IMAGE = {
  src: '/services/digital-marketing/vanity-metrics-chaos.png',
  alt: 'A tangle of disconnected vanity-metric shapes — keyword positions, impressions, follower counts — with no single clear focal point.',
}
const AFTER_IMAGE = {
  src: '/services/digital-marketing/real-metrics-clarity.png',
  alt: 'The same scene resolved into one clear highlighted line: leads booked and revenue.',
}

const AUTO_PLAY_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const AUTO_PLAY_START_MS = 400
const AUTO_PLAY_DURATION_MS = 2200

// Before layer's visible width == `position`% (measured from the left), so
// 100 = fully vanity-chaos, 0 = fully real-metrics. Starts at 100 (the full
// problem) and auto-drags down to 0 once scrolled into view — resets and
// replays on every fresh page load, nothing persisted. A manual drag/key
// press interrupts the auto-play and hands control to the visitor.
export default function PainMetricsReveal() {
  const [position, setPosition] = useState(100)
  const [autoPlaying, setAutoPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayedRef = useRef(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const inView = useInView(containerRef, { once: true, amount: 0.4 })

  const stopAutoPlay = () => {
    autoPlayedRef.current = true
    setAutoPlaying(false)
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  useEffect(() => {
    if (!inView || autoPlayedRef.current) return
    autoPlayedRef.current = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timeoutsRef.current.push(setTimeout(() => setPosition(0), 0))
      return
    }

    timeoutsRef.current.push(
      setTimeout(() => {
        setAutoPlaying(true)
        setPosition(0)
        timeoutsRef.current.push(setTimeout(() => setAutoPlaying(false), AUTO_PLAY_DURATION_MS))
      }, AUTO_PLAY_START_MS)
    )
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [inView])

  const moveTo = (clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)))
  }

  const nudge = (dir: 1 | -1) => setPosition((p) => Math.min(100, Math.max(0, p + dir * 5)))

  const transitionStyle = autoPlaying
    ? { transition: `left ${AUTO_PLAY_DURATION_MS}ms ${AUTO_PLAY_EASE}, clip-path ${AUTO_PLAY_DURATION_MS}ms ${AUTO_PLAY_EASE}` }
    : undefined

  return (
    <div
      ref={containerRef}
      className={cn(
        'pain-panel order-first md:order-last relative aspect-video w-full overflow-hidden',
        'border border-(--color-border) select-none touch-none cursor-ew-resize'
      )}
      role="slider"
      aria-label="Drag to compare vanity metrics against the metrics we actually report on"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onPointerDown={(e) => {
        stopAutoPlay()
        e.currentTarget.setPointerCapture(e.pointerId)
        moveTo(e.clientX)
      }}
      onPointerMove={(e) => {
        stopAutoPlay()
        moveTo(e.clientX)
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          stopAutoPlay()
          nudge(1)
        }
        if (e.key === 'ArrowLeft') {
          stopAutoPlay()
          nudge(-1)
        }
      }}
    >
      <Image
        src={AFTER_IMAGE.src}
        alt={AFTER_IMAGE.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, ...transitionStyle }}>
        <Image
          src={BEFORE_IMAGE.src}
          alt={BEFORE_IMAGE.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-px bg-(--color-text)"
        style={{ left: `${position}%`, ...transitionStyle }}
      />
      <div
        className="absolute top-1/2 flex size-9 items-center justify-center rounded-full bg-(--color-text) text-(--color-bg) pointer-events-none"
        style={{ left: `${position}%`, transform: 'translate(-50%, -50%)', ...transitionStyle }}
      >
        <GripHorizontal className="size-4 rotate-90" />
      </div>

      <div
        className="absolute left-3 top-3 rounded-full bg-(--color-text)/80 px-3 py-1 text-xs font-medium text-(--color-bg) transition-opacity duration-300"
        style={{ opacity: position > 0 ? 1 : 0 }}
      >
        What most reports show
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-(--color-text)/80 px-3 py-1 text-xs font-medium text-(--color-bg)">
        What we report on
      </div>
    </div>
  )
}
