'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { REVEAL_EASE } from '@/components/ui/Reveal'
import { revealLines, useGsapSection } from '@/lib/gsap/reveals'

interface PainItem {
  id:       string
  title:    string
  hook:     string
  detail:   string
  image:    string
  imageAlt: string
}

// Same "Friction" sticky-pin scroll reveal as web-development's PainSection
// (app/services/web-development/sections/PainSection.tsx) — reused per the
// user's request, not a page-local fork. No eyebrow: this page never uses
// one anywhere else, and web-dev's is its own logged exception.
const ITEMS: PainItem[] = [
  {
    id:    'content',
    title: 'Content, every season.',
    hook:  'Editing the same product photo twenty times for every new collection.',
    detail:
      'Booking a photo shoot that eats two weeks and a lot of money, every season. It’s just how it’s always been done, so nobody counts the hours it takes away from the work only your team can do.',
    image:    '/services/manual-work-vs-automated.webp',
    imageAlt:
      'Left: a team buried in manual work, rebuilding the same product images by hand, answering repeat customer messages, running a studio photo shoot and packing boxes. Right: the same business running on automation, with one person watching a dashboard while an AI assistant, analytics, email and order fulfilment run themselves.',
  },
  {
    id:    'support',
    title: 'A message like this, fifty times a day.',
    hook:  'Someone has to read it, decide what it actually means, check the real transaction.',
    detail:
      'And remember every rule for what happens next. Do that fifty times a day and the rules start slipping — that’s the part that’s quietly costing you.',
    image:    '/services/support-messages-fifty-times-a-day.png',
    imageAlt:
      'A support inbox flooded with invoice and payment messages across email, Slack, Teams and WhatsApp, with a person overwhelmed at their laptop trying to read, figure out, check and act on each one by hand.',
  },
]

function PainCopy({
  item,
  index,
  showHook = true,
  showDetail = true,
}: {
  item: PainItem
  index: number
  showHook?: boolean
  showDetail?: boolean
}) {
  const step = String(index + 1).padStart(2, '0')

  return (
    <>
      <span
        aria-hidden="true"
        className="block font-mono text-2xl font-bold leading-none tracking-[-0.05em] text-(--color-accent) md:text-3xl"
      >
        {step}
      </span>
      <span aria-hidden="true" className="mt-3 mb-6 block h-px w-8 bg-(--color-accent)" />
      <h3 className="text-2xl font-bold leading-snug text-(--color-text) sm:text-3xl">
        <span className="sr-only">{`Pain point ${step}: `}</span>
        {item.title}
      </h3>
      {showHook ? (
        <p className="mt-3 max-w-sm text-body-lg leading-relaxed text-(--color-text-muted)">{item.hook}</p>
      ) : null}
      {showDetail ? (
        <p className="mt-4 max-w-sm text-body leading-relaxed text-(--color-text-muted)">{item.detail}</p>
      ) : null}
    </>
  )
}

function PainFrame({ item }: { item: PainItem }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
      <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
    </div>
  )
}

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
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
      const next = Math.min(ITEMS.length - 1, Math.floor(progress * ITEMS.length))
      setActive((prev) => (prev === next ? prev : next))
    }

    sync()
    window.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      window.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
    }
  }, [])

  const current = ITEMS[active] ?? ITEMS[0]

  return (
    <section ref={scope} className="py-16 md:py-20 xl:pt-12 xl:pb-16" aria-labelledby="pain-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14 xl:hidden">
          <h2 id="pain-heading-mobile" className="text-h3 font-bold tracking-tight text-(--color-text)">
            The part of the job nobody talks about
          </h2>
        </div>

        {/* Below xl: both examples simply stack, always visible. */}
        <div className="flex flex-col gap-16 xl:hidden">
          {ITEMS.map((item, index) => (
            <article key={item.id}>
              <PainCopy item={item} index={index} />
              <div className="mt-6">
                <PainFrame item={item} />
              </div>
            </article>
          ))}
        </div>

        {/* xl+: sticky-pin scroll reveal, same mechanic as web-development's
            Friction section — scroll-driven, not click-gated. */}
        <div ref={trackRef} className="relative hidden xl:block xl:h-[220vh]">
          <div
            ref={pinRef}
            className="sticky top-28 flex h-[calc(100svh-7rem)] max-h-[calc(100svh-7rem)] flex-col justify-start overflow-visible"
          >
            <div className="shrink-0 max-w-2xl">
              <h2 id="pain-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
                The part of the job nobody talks about
              </h2>
            </div>

            <div className="mt-10 grid min-h-0 flex-1 grid-cols-12 grid-rows-[auto_auto] content-start gap-x-10 gap-y-1.5">
              <div className="col-span-5 row-start-1 flex min-h-0 items-center self-stretch">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    initial={reduceMotion ? false : { y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: -28, opacity: 0 }}
                    transition={{ duration: 0.45, ease: REVEAL_EASE }}
                    className="max-w-md overflow-hidden"
                  >
                    <PainCopy item={current} index={active} showHook={false} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="col-span-7 row-start-1 flex items-center justify-center self-stretch">
                <div className="relative aspect-video w-full max-w-full overflow-hidden border border-(--color-border) bg-(--color-bg-muted)">
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
                        sizes="(min-width: 1280px) 58vw, 100vw"
                        className="object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="col-span-7 col-start-6 row-start-2 shrink-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={current.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3, ease: REVEAL_EASE }}
                    className="w-full pb-1 text-body-lg leading-snug text-(--color-text)"
                  >
                    {current.hook}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
