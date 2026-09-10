'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { REVEAL_EASE } from '@/components/ui/Reveal'
import { revealLines, useGsapSection } from '@/lib/gsap/reveals'
import { WEB_DEV_PAIN, type WebDevPainItem } from '../data'

function PainCopy({
  item,
  index,
  active,
}: {
  item: WebDevPainItem
  index: number
  active: boolean
}) {
  const step = String(index + 1).padStart(2, '0')

  return (
    <>
      <span
        aria-hidden="true"
        className={`block font-mono text-2xl font-bold leading-none tracking-[-0.05em] md:text-3xl ${
          active ? 'text-(--color-accent)' : 'text-(--color-border-strong)'
        }`}
      >
        {step}
      </span>
      <span
        aria-hidden="true"
        className={`mt-3 mb-6 block h-px w-8 ${active ? 'bg-(--color-accent)' : 'bg-(--color-border)'}`}
      />
      <h3 className="text-2xl font-bold leading-snug text-(--color-text) sm:text-3xl">
        <span className="sr-only">{`Friction ${step}: `}</span>
        {item.title}
      </h3>
      <p className="mt-3 max-w-sm text-body-lg leading-relaxed text-(--color-text-muted)">{item.hook}</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-(--color-text-faint)">{item.detail}</p>
    </>
  )
}

function PainFrame({ item }: { item: WebDevPainItem }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
      <Image
        src={item.image}
        alt={item.imageAlt}
        fill
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}

function PainHeading({ id }: { id?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
        {WEB_DEV_PAIN.eyebrow}
      </p>
      <span className="mt-4 mb-4 block h-px w-8 bg-(--color-accent)" aria-hidden="true" />
      <h2
        id={id}
        className="max-w-xl text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
      >
        {WEB_DEV_PAIN.heading}
      </h2>
    </div>
  )
}

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const items = WEB_DEV_PAIN.items
  const [active, setActive] = useState(0)

  useGsapSection(scope, () => {
    revealLines('#pain-heading', { trigger: scope.current })
  })

  useEffect(() => {
    const track = trackRef.current
    const pin = pinRef.current
    if (!track || !pin) return

    const sync = () => {
      const trackRect = track.getBoundingClientRect()
      const pinH = pin.offsetHeight
      const pinOffset = pin.getBoundingClientRect().top > 0 ? pin.getBoundingClientRect().top : 112
      const travel = trackRect.height - pinH
      if (travel <= 0) {
        setActive(0)
        return
      }
      const progress = Math.min(1, Math.max(0, (pinOffset - trackRect.top) / travel))
      const next = Math.min(items.length - 1, Math.floor(progress * items.length))
      setActive((prev) => (prev === next ? prev : next))
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [items.length])

  const current = items[active] ?? items[0]

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="mb-10 md:mb-14 lg:hidden">
          <PainHeading id="pain-heading-mobile" />
        </div>

        <div className="flex flex-col gap-16 lg:hidden">
          {items.map((item, index) => (
            <article key={item.id}>
              <PainCopy item={item} index={index} active />
              <div className="mt-6">
                <PainFrame item={item} />
              </div>
            </article>
          ))}
        </div>

        <div ref={trackRef} className="relative hidden lg:block lg:h-[300vh]">
          <div ref={pinRef} className="sticky top-28 xl:top-32">
            <PainHeading id="pain-heading" />

            <div className="mt-10 grid grid-cols-12 gap-x-12 md:mt-14">
              <div className="col-span-5 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={reduceMotion ? false : { y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: -28, opacity: 0 }}
                    transition={{ duration: 0.45, ease: REVEAL_EASE }}
                    className="max-w-md"
                  >
                    <PainCopy item={current} index={active} active />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="col-span-7">
                <div className="relative aspect-video w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={current.id}
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image}
                        alt={current.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-(--color-text-muted)">{current.hook}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
