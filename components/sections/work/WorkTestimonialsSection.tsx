'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, animate, useMotionValue, useAnimationFrame, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'
import { WORK_TESTIMONIALS, type WorkTestimonial } from '@/lib/work-data'

const GAP = 24
const SPEED = 40 // px / s
const RESUME_DELAY = 4000

export function WorkTestimonialsSection() {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isPaused = useRef(false)
  const isTweening = useRef(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [step, setStep] = useState(0)
  const reduced = useReducedMotion()

  // Cards are viewport-relative on phones, so the arrow step has to be measured
  // off the rendered card rather than assumed from a constant.
  useEffect(() => {
    const measure = () => setStep((cardRef.current?.offsetWidth ?? 0) + GAP)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(
    () => () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    },
    [],
  )

  /** The track holds two identical copies, so shifting by exactly one copy is invisible. */
  const wrap = (v: number) => {
    const half = (trackRef.current?.offsetWidth ?? 0) / 2
    if (!half) return v
    if (v <= -half) return v + half
    if (v > 0) return v - half
    return v
  }

  useAnimationFrame((_, delta) => {
    // A running arrow tween owns `x` outright — wrapping mid-tween would yank it
    // back toward a stale target. It re-wraps itself on completion instead.
    if (isTweening.current) return
    const travelled = reduced || isPaused.current ? 0 : (SPEED * delta) / 1000
    x.set(wrap(x.get() - travelled))
  })

  const pause = () => {
    isPaused.current = true
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
  }

  const resume = (delay = 0) => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    if (!delay) {
      isPaused.current = false
      return
    }
    resumeTimeout.current = setTimeout(() => {
      isPaused.current = false
    }, delay)
  }

  const nudge = (dir: 1 | -1) => {
    if (!step) return
    pause()
    isTweening.current = true
    animate(x, x.get() - dir * step, {
      duration: reduced ? 0 : 0.6,
      ease: REVEAL_EASE,
      onComplete: () => {
        isTweening.current = false
        x.set(wrap(x.get()))
      },
    })
    resume(RESUME_DELAY)
  }

  const cards = [...WORK_TESTIMONIALS, ...WORK_TESTIMONIALS]

  return (
    <section className="py-16 md:py-20 overflow-hidden" aria-label="Client testimonials">
      <div className="container flex items-end justify-between gap-6 mb-10 md:mb-14">
        <RevealText as="h2" className="text-h2 font-bold text-(--color-text)">
          What clients say
        </RevealText>

        <div className="flex items-center gap-2 flex-shrink-0">
          <CarouselButton label="Previous testimonial" onClick={() => nudge(-1)}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </CarouselButton>
          <CarouselButton label="Next testimonial" onClick={() => nudge(1)}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </CarouselButton>
        </div>
      </div>

      <div
        className="relative"
        role="group"
        aria-roledescription="carousel"
        onMouseEnter={pause}
        onMouseLeave={() => resume()}
      >
        {/* drag makes this work by thumb — a touch visitor never gets the hover pause. */}
        <motion.div
          ref={trackRef}
          className="flex items-stretch w-max cursor-grab active:cursor-grabbing"
          style={{ x, gap: GAP }}
          drag="x"
          dragMomentum={false}
          dragElastic={0}
          onDragStart={pause}
          onDragEnd={() => {
            x.set(wrap(x.get()))
            resume(RESUME_DELAY)
          }}
        >
          {cards.map((testimonial, i) => {
            // Second copy exists only so the marquee can loop seamlessly.
            // aria-hidden keeps it out of the a11y tree; data-nosnippet keeps
            // Google from reading every quote twice.
            const isLoopCopy = i >= WORK_TESTIMONIALS.length
            return (
              <TestimonialCard
                key={testimonial.slug + i}
                ref={i === 0 ? cardRef : undefined}
                testimonial={testimonial}
                aria-hidden={isLoopCopy}
                data-nosnippet={isLoopCopy ? '' : undefined}
              />
            )
          })}
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-(--color-bg) to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-(--color-bg) to-transparent z-10" />
      </div>
    </section>
  )
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center border border-(--color-border) text-(--color-text) transition-colors hover:bg-(--color-text) hover:text-(--color-surface) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
    >
      {children}
    </button>
  )
}

function TestimonialCard({
  testimonial,
  ref,
  ...rest
}: {
  testimonial: WorkTestimonial
  ref?: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      ref={ref}
      // Was a fixed 380px, which overflowed the viewport on a 375px-wide phone.
      className="flex w-[80vw] max-w-[380px] flex-shrink-0 flex-col bg-(--color-surface) border border-(--color-border) transition-colors hover:border-(--color-border-strong) p-6 sm:w-[380px] md:p-8"
      {...rest}
    >
      <p className="text-base md:text-lg font-medium leading-relaxed text-(--color-text) mb-8">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-auto flex items-center gap-3">
        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-(--color-bg-muted)">
          <Image
            src={testimonial.image}
            alt=""
            fill
            sizes="48px"
            draggable={false}
            className="object-cover select-none"
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
