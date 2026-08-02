'use client'

import { motion, useInView } from 'motion/react'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

// Shared motion language for the whole site.
// Mirrors the hero reveal: text slides up from behind an overflow-hidden clip,
// supporting content + cards fade up. One easing curve everywhere (~expo.out).
export const REVEAL_EASE = [0.16, 1, 0.3, 1] as const
const REVEAL_EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)'

const REVEAL_MARGIN = '0px'
const VIEWPORT = { once: true, amount: 0.1, margin: REVEAL_MARGIN } as const

/**
 * Masked line reveal — for headings + titles.
 * Outer semantic tag holds styles; an inner clip + translateY gives the
 * "slide up from behind the line" effect (same technique as the hero).
 */
export function RevealText({
  as: Tag = 'div',
  className,
  children,
  delay = 0,
  duration = 0.9,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
  delay?: number
  duration?: number
}) {
  // Trigger off the STATIC clip wrapper — IntersectionObserver measures the
  // transformed box, so observing the moving inner line would never fire reliably.
  return (
    <Tag className={className}>
      <motion.span
        className="block overflow-hidden pb-[0.14em] -mb-[0.14em]"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: '110%' }, visible: { y: '0%' } }}
          transition={{ duration, ease: REVEAL_EASE, delay }}
        >
          {children}
        </motion.span>
      </motion.span>
    </Tag>
  )
}

/**
 * Fade-up reveal — for cards + supporting blocks.
 * Pass `delay` (e.g. index * 0.1) to stagger a group.
 */
export function RevealFade({
  as: Tag = motion.div,
  className,
  children,
  delay = 0,
  y = 24,
  duration = 0.7,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
  delay?: number
  y?: number
  duration?: number
}) {
  const MotionTag = Tag as typeof motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: REVEAL_MARGIN }}
      transition={{ duration, ease: REVEAL_EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Editorial image reveal — clip-path wipes up from the bottom, inner content settles from 1.08 scale.
 * Mirrors the AI-Automations page's GSAP `revealClipImage` in motion/react. Pass the image's own
 * overflow-hidden/border/radius classes as `className`; children is the `<Image fill />`.
 */
export function RevealImage({
  className,
  children,
  delay = 0,
}: {
  className?: string
  children: ReactNode
  delay?: number
}) {
  // A `clip-path` applied directly to the element that whileInView/onViewportEnter
  // observes breaks that element's OWN intersection detection in this motion
  // version — verified by isolating each property (opacity/scale detect and
  // animate fine; clip-path never fires, even just as a plain style with no
  // framer-motion animation involved, whenever it's on the observed node
  // itself). Fix: observe a plain, unclipped wrapper; apply the clip-path to
  // an inner, unobserved div driven by that wrapper's detected state.
  const [revealed, setRevealed] = useState(false)

  return (
    <motion.div className={className} onViewportEnter={() => setRevealed(true)} viewport={VIEWPORT}>
      <div
        className="h-full w-full"
        style={{
          clipPath: revealed ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          transition: `clip-path 1000ms ${REVEAL_EASE_CSS} ${delay}s`,
        }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.4, ease: REVEAL_EASE, delay }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}

/**
 * Count-up number — animates 0 → value once scrolled into view.
 * power2.out easing to match the rest of the motion system.
 */
export function Counter({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1, margin: REVEAL_MARGIN })
  // Starts at the real value (not 0) so SSR/first-paint text is crawlable —
  // the count-up below is a progressive-enhancement replay for JS visitors.
  const [n, setN] = useState(value)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      raf = requestAnimationFrame(() => setN(value))
      return () => cancelAnimationFrame(raf)
    }
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 2) // power2.out
      setN(Math.floor(eased * value)) // p=0 on the first frame, so this starts the visible count at 0
      if (p < 1) raf = requestAnimationFrame(tick)
      else setN(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return <span ref={ref}>{n}</span>
}
