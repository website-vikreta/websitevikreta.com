'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, animate, useMotionValue, useAnimationFrame } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RevealText } from '@/components/ui/Reveal'
import { WORK_TESTIMONIALS } from '@/lib/work-data'

const CARD_W = 380
const GAP = 24
const STEP = CARD_W + GAP
const SPEED = 40 // px / s

export function WorkTestimonialsSection() {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isPaused = useRef(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useAnimationFrame((_, delta) => {
    if (isPaused.current) return
    const halfW = trackRef.current ? trackRef.current.offsetWidth / 2 : 0
    if (!halfW) return
    const next = x.get() - (SPEED * delta) / 1000
    x.set(next <= -halfW ? next + halfW : next)
  })

  const nudge = (dir: 1 | -1) => {
    isPaused.current = true
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    const halfW = trackRef.current ? trackRef.current.offsetWidth / 2 : 0
    let target = x.get() - dir * STEP
    if (halfW) {
      if (target <= -halfW) target += halfW
      if (target > 0) target -= halfW
    }
    animate(x, target, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
    resumeTimeout.current = setTimeout(() => { isPaused.current = false }, 4000)
  }

  const cards = [...WORK_TESTIMONIALS, ...WORK_TESTIMONIALS]

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="container flex items-end justify-between gap-6 mb-10 md:mb-14">
        <RevealText as="h2" className="text-h2 font-bold text-(--color-text)">
          What clients say
        </RevealText>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center border border-(--color-border) text-(--color-text) transition-colors hover:bg-(--color-text) hover:text-(--color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center border border-(--color-border) text-(--color-text) transition-colors hover:bg-(--color-text) hover:text-(--color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => { isPaused.current = true }}
        onMouseLeave={() => {
          if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
          isPaused.current = false
        }}
      >
        <motion.div ref={trackRef} className="flex items-stretch w-max" style={{ x, gap: GAP }}>
          {cards.map((t, i) => (
            <TestimonialCard key={t.slug + i} testimonial={t} />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-(--color-bg) to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-(--color-bg) to-transparent z-10" />
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: (typeof WORK_TESTIMONIALS)[number] }) {
  return (
    <div
      className="flex flex-shrink-0 flex-col bg-(--color-surface) border border-(--color-border) transition-colors hover:border-(--color-border-strong) p-6 md:p-8"
      style={{ width: CARD_W }}
    >
      <p className="text-lg font-medium leading-relaxed text-(--color-text) mb-8">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-(--color-bg-muted)">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-(--color-text) leading-tight">{testimonial.name}</p>
          <p className="text-sm text-(--color-text-muted) leading-tight">
            {[testimonial.designation, testimonial.company].filter(Boolean).join(', ')}
          </p>
        </div>
      </div>
    </div>
  )
}
