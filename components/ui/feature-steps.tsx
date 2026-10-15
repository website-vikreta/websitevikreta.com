'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

export interface FeatureStepItem {
  step: string
  title: string
  content: string
  image: string
  imageAlt: string
}

interface FeatureStepsProps {
  features: FeatureStepItem[]
  title?: string
  subhead?: string
  headingId?: string
  autoPlayInterval?: number
  imageTransition?: number
  className?: string
}

export function FeatureSteps({
  features,
  title,
  subhead,
  headingId,
  autoPlayInterval = 2200,
  imageTransition = 0.35,
  className,
}: FeatureStepsProps) {
  const reduceMotion = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const [hoverPaused, setHoverPaused] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const canHoverPause = useRef(false)
  const active = features[current]
  const paused = hoverPaused || hidden

  const goTo = useCallback((index: number) => {
    setCurrent(index)
    setEpoch((value) => value + 1)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => {
      canHoverPause.current = mq.matches
      if (!mq.matches) setHoverPaused(false)
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    if (reduceMotion || paused || features.length < 2) return

    const id = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % features.length)
    }, autoPlayInterval)

    return () => window.clearInterval(id)
  }, [autoPlayInterval, epoch, features.length, paused, reduceMotion])

  const durationSec = autoPlayInterval / 1000

  return (
    <div
      className={cn('w-full', className)}
      onPointerEnter={() => {
        if (canHoverPause.current) setHoverPaused(true)
      }}
      onPointerLeave={() => {
        if (canHoverPause.current) setHoverPaused(false)
      }}
    >
      {(title || subhead) && (
        <div className="mb-10 max-w-2xl md:mb-14">
          {title && (
            <h2
              id={headingId}
              className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              {title}
            </h2>
          )}
          {subhead && (
            <p
              id="how-we-work-subhead"
              className="mt-4 max-w-xl text-body-lg leading-relaxed text-(--color-text-muted)"
            >
              {subhead}
            </p>
          )}
        </div>
      )}

      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
        <ol className="order-2 flex flex-col gap-8 lg:order-1 lg:col-span-5" aria-label={title ?? 'Steps'}>
          {features.map((feature, index) => {
            const isActive = index === current
            const isDone = index < current

            return (
              <li key={feature.step}>
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={isActive ? 'step' : undefined}
                  className="group flex w-full items-start gap-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-text)"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors duration-500 ease-out',
                      isActive &&
                        'border-(--color-text) bg-(--color-text) text-(--color-bg)',
                      isDone &&
                        'border-(--color-border-strong) bg-(--color-bg-muted) text-(--color-text-muted)',
                      !isActive &&
                        !isDone &&
                        'border-(--color-border-strong) bg-(--color-bg) text-(--color-text-faint)',
                    )}
                  >
                    {isActive || isDone ? (
                      <Check className="size-3.5" strokeWidth={2.5} />
                    ) : (
                      index + 1
                    )}
                  </span>

                  <span className="relative min-w-0 flex-1 pb-3">
                    <span
                      className={cn(
                        'block text-xl font-bold leading-snug transition-colors duration-500 ease-out sm:text-2xl',
                        isActive ? 'text-(--color-text)' : 'text-(--color-text-faint)',
                      )}
                    >
                      <span className="sr-only">{`${feature.step}: `}</span>
                      {feature.title}
                    </span>
                    <span
                      className={cn(
                        'mt-2 block text-[15px] leading-relaxed transition-colors duration-500 ease-out',
                        isActive ? 'text-(--color-text-muted)' : 'text-(--color-text-faint)',
                      )}
                    >
                      {feature.content}
                    </span>

                    {isActive && !reduceMotion && (
                      <motion.span
                        key={`${current}-${epoch}`}
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 h-px origin-left bg-(--color-accent)"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: durationSec, ease: 'linear' }}
                        style={{ width: '100%' }}
                      />
                    )}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <div className="relative aspect-video w-full overflow-hidden border border-(--color-border) bg-(--color-surface)">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={current}
                className="absolute inset-0"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduceMotion ? undefined : { opacity: 0 }}
                transition={{ duration: imageTransition, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-contain"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
