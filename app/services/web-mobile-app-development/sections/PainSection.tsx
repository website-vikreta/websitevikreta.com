'use client'

/**
 * Desktop: a compact list of the three pain points on the left; on the
 * right, one at a time gets its full illustration + copy, flipped into view
 * on an automatic timer (no hover/click required — same "don't rely on the
 * user to navigate" rule already applied to Solution/Proof on this page).
 * Clicking a left item jumps straight to it and pauses the timer while the
 * pointer stays over the section. Replaces an earlier 2-up flip-card grid
 * that read as two uneven rows.
 *
 * The flip itself is a small custom `motion/react` rotateY transition, not
 * `components/ui/flip-card.tsx` — that primitive only toggles between two
 * fixed faces of the SAME card on hover; this needs one shared display
 * cycling through three different cards on a timer, which isn't something
 * that primitive's API supports without forking it.
 *
 * Images are user-supplied (ChatGPT-generated, converted via
 * scripts/convert-to-webp.mjs) — genuinely 16:9 (1672×941), text/labels
 * near both edges. The right-hand display sizes off viewport height
 * (`50svh`, clamped), not `aspect-video`, at this width (~7/12 columns) —
 * matches the fix already applied to the Proof slideshow for the same
 * "wide box + aspect-ratio height" viewport-clip risk; columns are sized so
 * the clamp range stays close to the natural 16:9 height and only trims a
 * sliver at the extremes, not a hard crop.
 */

import { useEffect, useRef, useState, type ComponentType } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { AlertTriangle, Receipt, Shuffle } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'

interface PainPoint {
  id: string
  icon: ComponentType<{ className?: string; size?: number; strokeWidth?: number }>
  title: string
  hook: string
  detail: string
  image: string
  imageAlt: string
}

const PAIN_POINTS: PainPoint[] = [
  {
    id: 'integration-layer',
    icon: Shuffle,
    title: 'One person is your integration layer',
    hook: 'Leads in a sheet. Orders in another. Customers in WhatsApp.',
    detail:
      'Nothing syncs, so someone on your team retypes the same row three times a day and hopes they caught them all.',
    image: '/services/web-mobile-app-development/pain/integration-layer.webp',
    imageAlt:
      'The same invoice row typed by hand into a finance sheet, an ERP system, and a CRM — one missed entry creates mismatches, delays, and extra work.',
  },
  {
    id: 'saas-tax',
    icon: Receipt,
    title: 'The SaaS tax',
    hook: 'Trade the manual grind for a different bill.',
    detail:
      'Buying off-the-shelf bends your process around fields a stranger designed — billed monthly for the parts you never open.',
    image: '/services/web-mobile-app-development/pain/saas-tax.webp',
    imageAlt:
      'Off-the-shelf software forcing a custom process into rigid fields, with a monthly subscription billing for modules that are never turned on.',
  },
  {
    id: 'scaling-wall',
    icon: AlertTriangle,
    title: 'The scaling wall',
    hook: 'What works at 10 orders a day breaks at 100.',
    detail:
      'More hires just means more people doing the same manual join by hand. The process is the bottleneck, not the headcount.',
    image: '/services/web-mobile-app-development/pain/scaling-wall.webp',
    imageAlt:
      'A row of hires each manually copying, pasting, and matching spreadsheets, PDFs, and database exports into one final report by hand.',
  },
]

const CYCLE_MS = 3800

function PainShowcase() {
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return
      setActive((prev) => (prev + 1) % PAIN_POINTS.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  const current = PAIN_POINTS[active]

  return (
    <div
      className="grid gap-8 md:grid-cols-12 md:items-stretch"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
      }}
    >
      {/* Left — compact list, always fully visible. */}
      <div className="flex flex-col gap-3 md:col-span-5">
        {PAIN_POINTS.map((point, index) => {
          const Icon = point.icon
          const isActive = index === active
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => setActive(index)}
              aria-current={isActive}
              className={`flex items-start gap-3 border-l-2 p-4 text-left transition-colors duration-300 ease-out ${
                isActive
                  ? 'border-(--color-text) bg-(--color-bg-muted)'
                  : 'border-(--color-border) hover:bg-(--color-bg-muted)'
              }`}
            >
              <Icon
                className={isActive ? 'text-(--color-text)' : 'text-(--color-text-muted)'}
                size={30}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-lg font-bold leading-snug text-(--color-text) sm:text-xl">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-(--color-text-muted)">{point.hook}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Right — one pain point at a time, flipped into view on its own timer. */}
      <div
        className="relative overflow-hidden border border-(--color-border) bg-(--color-bg-muted) md:col-span-7 md:h-[50svh] md:max-h-[420px] md:min-h-[320px]"
        style={{ perspective: 1200 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0.2, 0.2, 1] }}
          >
            <Image
              src={current.image}
              alt={current.imageAlt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
              priority={active === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 md:p-8">
              <h3 className="text-2xl font-bold leading-snug text-white sm:text-3xl">{current.title}</h3>
              <p className="max-w-md text-base leading-relaxed text-white/90 sm:text-lg">{current.hook}</p>
              <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">{current.detail}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress rail — reflects the auto-advance, doubles as a manual jump. */}
        <div className="absolute right-6 top-6 flex gap-1.5 md:right-8 md:top-8">
          {PAIN_POINTS.map((point, i) => (
            <button
              key={point.id}
              type="button"
              aria-label={`Show ${point.title}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-1 w-6 transition-colors duration-300 ${i === active ? 'bg-white' : 'bg-white/35'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#pain-heading', { trigger: scope.current })
    revealFadeUp('.pain-showcase', { y: 24, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-muted)">
            The friction
          </p>
          <span className="mt-4 mb-4 block h-px w-8 bg-(--color-accent)" aria-hidden="true" />
          <h2
            id="pain-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Nothing In Your Stack Talks To Each Other
          </h2>
        </div>

        {/* Desktop — list + auto-flipping showcase. */}
        <div className="pain-showcase hidden md:block">
          <PainShowcase />
        </div>

        {/* Mobile — no hover/timer surface, so everything reads at once, stacked. */}
        <div className="flex flex-col gap-6 md:hidden">
          {PAIN_POINTS.map((point) => {
            const Icon = point.icon
            return (
              <div key={point.id} className="pain-card border border-(--color-border) bg-(--color-surface)">
                <div className="relative aspect-video overflow-hidden bg-(--color-bg-muted)">
                  <Image src={point.image} alt={point.imageAlt} fill sizes="100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <Icon className="text-(--color-text-muted)" size={30} strokeWidth={1.5} />
                  <h3 className="mt-4 text-2xl font-bold leading-snug text-(--color-text)">{point.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-(--color-text-muted)">{point.hook}</p>
                  <p className="mt-3 text-base leading-relaxed text-(--color-text-muted)">{point.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
