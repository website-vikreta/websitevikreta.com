'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, animate, useMotionValue, useAnimationFrame, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { RevealText, REVEAL_EASE } from '@/components/ui/Reveal'
import { WORK_TESTIMONIALS, type WorkTestimonial } from '@/lib/work-data'

const GAP = 24
const SPEED = 40 // px / s on desktop
const RESUME_DELAY = 4000
const MOBILE_EASE = [0.16, 1, 0.3, 1] as const

export function WorkTestimonialsSection({
  testimonials = WORK_TESTIMONIALS,
  heading = 'What clients say',
  ariaLabel = 'Client testimonials',
}: {
  testimonials?: WorkTestimonial[]
  heading?: string
  ariaLabel?: string
} = {}) {
  const x = useMotionValue(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isPaused = useRef(false)
  const isTweening = useRef(false)
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastInteraction = useRef(0) // set on mount below, Date.now() isn't render-safe
  const [step, setStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    lastInteraction.current = Date.now()
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => {
      const mobile = mq.matches
      setIsMobile(mobile)
      if (mobile && cardRef.current) {
        const currentStep = cardRef.current.offsetWidth + GAP
        if (currentStep > 0) {
          const currentIdx = Math.round(-x.get() / currentStep)
          const loop = testimonials.length * currentStep
          let target = -currentIdx * currentStep
          if (loop > 0) {
            while (target <= -loop) target += loop
            while (target > 0) target -= loop
          }
          x.set(target)
        }
      }
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [testimonials.length])

  // Cards are viewport-relative on phones, so the arrow/snap step has to be measured
  // off the rendered card rather than assumed from a constant.
  useEffect(() => {
    const measure = () => {
      if (!cardRef.current) return
      const newStep = cardRef.current.offsetWidth + GAP
      setStep(newStep)

      // When on mobile, snap to the nearest full card so resizing never leaves a half-card
      if (window.innerWidth < 768 && newStep > 0) {
        const currentIdx = Math.round(-x.get() / (step || newStep))
        const loop = testimonials.length * newStep
        let target = -currentIdx * newStep
        if (loop > 0) {
          while (target <= -loop) target += loop
          while (target > 0) target -= loop
        }
        x.set(target)
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [step, testimonials.length])

  useEffect(
    () => () => {
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current)
    },
    [],
  )

  const loopWidth = testimonials.length * step

  /** The track holds two identical copies, so shifting by exactly one loop is invisible. */
  const wrap = (v: number) => {
    if (!loopWidth) return v
    if (v <= -loopWidth) return v + loopWidth
    if (v > 0) return v - loopWidth
    return v
  }

  useAnimationFrame((_, delta) => {
    // On mobile: keep cards stationary until auto-step or swipe (no continuous drift).
    if (isMobile || isTweening.current) return
    const travelled = reduced || isPaused.current ? 0 : (SPEED * delta) / 1000
    x.set(wrap(x.get() - travelled))
  })

  const pause = () => {
    isPaused.current = true
    lastInteraction.current = Date.now()
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
      lastInteraction.current = Date.now()
    }, delay)
  }

  const nudge = (dir: 1 | -1) => {
    if (!step) return
    pause()
    isTweening.current = true

    let startX = x.get()
    // If moving backwards and close to start, shift seamlessly to the second copy
    if (dir === -1 && startX > -step / 2 && loopWidth > 0) {
      startX -= loopWidth
      x.set(startX)
    } else if (dir === 1 && startX < -loopWidth + step / 2 && loopWidth > 0) {
      startX += loopWidth
      x.set(startX)
    }

    const duration = isMobile ? 0.35 : (reduced ? 0 : 0.6)
    const ease = isMobile ? MOBILE_EASE : REVEAL_EASE

    animate(x, startX - dir * step, {
      duration: reduced ? 0 : duration,
      ease,
      onComplete: () => {
        isTweening.current = false
        x.set(wrap(x.get()))
      },
    })
    resume(isMobile ? 0 : RESUME_DELAY)
  }

  const holdTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHolding = useRef(false)

  const handlePointerDown = () => {
    if (!isMobile) return
    if (holdTimeout.current) clearTimeout(holdTimeout.current)
    // Only pause if user actually presses and holds down for >200ms ("dabake rok ke rakha")
    holdTimeout.current = setTimeout(() => {
      isHolding.current = true
      pause()
    }, 200)
  }

  const handlePointerUpOrCancel = () => {
    if (!isMobile) return
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current)
      holdTimeout.current = null
    }
    if (isHolding.current) {
      isHolding.current = false
      resume(0)
    }
  }

  // If page scrolls ("screen hili"), immediately cancel any hold so scrolling never pauses sliding
  useEffect(() => {
    const handleScroll = () => {
      if (holdTimeout.current) {
        clearTimeout(holdTimeout.current)
        holdTimeout.current = null
      }
      if (isHolding.current) {
        isHolding.current = false
        resume(0)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-flip every 3s on mobile when stationary and not held down
  useEffect(() => {
    if (!isMobile || !step) return
    const interval = setInterval(() => {
      if (
        !isHolding.current &&
        !isPaused.current &&
        !isTweening.current &&
        !reduced &&
        Date.now() - lastInteraction.current >= 3000
      ) {
        lastInteraction.current = Date.now()
        nudge(1)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isMobile, step, reduced, loopWidth])

  const cards = [...testimonials, ...testimonials]

  return (
    <section className="overflow-x-clip py-16 md:py-20" aria-label={ariaLabel}>
      <div className="container flex items-end justify-between gap-6 mb-10 md:mb-14">
        <RevealText as="h2" className="text-h2 font-bold text-(--color-text)">
          {heading}
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
        className="relative overflow-x-clip"
        role="group"
        aria-roledescription="carousel"
        onMouseEnter={() => { if (!isMobile) pause() }}
        onMouseLeave={() => { if (!isMobile) resume() }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
      >
        {/* drag makes this work by thumb — on mobile releases snap cleanly ("taqq se") to the card */}
        <motion.div
          ref={trackRef}
          className="flex items-stretch w-max cursor-grab active:cursor-grabbing pl-6 md:pl-0"
          style={{ x, gap: GAP, touchAction: 'pan-y' }}
          drag="x"
          dragMomentum={false}
          dragElastic={0}
          onDragStart={pause}
          onDragEnd={(_, info) => {
            if (isMobile && step > 0) {
              const currentX = x.get()
              const offset = info.offset.x
              const velocity = info.velocity.x

              // Compute which card index we started from
              const startX = currentX - offset
              const startIndex = Math.round(-startX / step)

              let targetIndex = startIndex
              if (offset < -40 || velocity < -300) {
                targetIndex = startIndex + 1
              } else if (offset > 40 || velocity > 300) {
                targetIndex = startIndex - 1
              }

              let targetX = -targetIndex * step
              if (targetX > 0 && loopWidth > 0) {
                x.set(currentX - loopWidth)
                targetX -= loopWidth
              } else if (targetX < -loopWidth && loopWidth > 0) {
                x.set(currentX + loopWidth)
                targetX += loopWidth
              }

              isTweening.current = true
              animate(x, targetX, {
                duration: reduced ? 0 : 0.35,
                ease: MOBILE_EASE,
                onComplete: () => {
                  isTweening.current = false
                  x.set(wrap(x.get()))
                },
              })
              lastInteraction.current = Date.now()
              resume(0)
            } else {
              x.set(wrap(x.get()))
              resume(RESUME_DELAY)
            }
          }}
        >
          {cards.map((testimonial, i) => {
            // Second copy exists only so the marquee can loop seamlessly.
            // aria-hidden keeps it out of the a11y tree; data-nosnippet keeps
            // Google from reading every quote twice.
            const isLoopCopy = i >= testimonials.length
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

        {/* Gradient masks on desktop; hidden on mobile so the full card is crisp without faded edges */}
        <div className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-(--color-bg) to-transparent z-10" />
        <div className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-(--color-bg) to-transparent z-10" />
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
      // On mobile: exact full card width with zero side-peek (calc(100vw - 3rem) + pl-6 aligns with container).
      // On desktop: fixed 380px card.
      className="flex w-[calc(100vw-3rem)] max-w-[calc(100vw-3rem)] md:w-[380px] md:max-w-[380px] flex-shrink-0 flex-col bg-(--color-surface) border border-(--color-border) transition-colors hover:border-(--color-border-strong) p-6 md:p-8"
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

