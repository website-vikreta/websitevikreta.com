'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'

// Load-triggered hero reveal (above the fold — RevealText/RevealFade are
// scroll-triggered via whileInView and won't fire on mount). Mirrors the
// pattern in app/services/web-development/WebDevClient.tsx.
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const lineContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: EASE } },
}

const heroCtaContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
}

const ctaChild = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export default function Hero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-svh text-center overflow-x-clip"
      aria-label="Web & Mobile Apps and CRM Systems"
    >
      <div className="container relative z-10 pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28">
        <motion.h1
          className="text-h1 font-bold md:font-semibold text-(--color-text) mb-6 max-w-4xl mx-auto text-balance"
          variants={lineContainer}
          initial="hidden"
          animate="visible"
        >
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span className="block" variants={lineReveal}>
              Stop Bending Your Business
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
            <motion.span className="block" variants={lineReveal}>
              to Fit <span style={{ color: 'var(--color-accent)' }}>Someone Else&rsquo;s Software</span>
            </motion.span>
          </span>
        </motion.h1>

        <motion.div
          className="flex flex-col items-center gap-8"
          variants={heroCtaContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-body-lg text-(--color-text-muted) max-w-xl mx-auto leading-relaxed"
            variants={ctaChild}
          >
            We build CRMs, portals, and internal tools shaped around how your
            business actually works. One system your team uses, not five
            disconnected ones held together by spreadsheets.
          </motion.p>

          <motion.div variants={ctaChild}>
            <Button href="#book-audit" variant="primary" size="lg" showArrow>
              Book a Free Systems Audit
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
