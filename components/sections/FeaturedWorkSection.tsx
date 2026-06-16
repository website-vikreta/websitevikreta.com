'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ExpandingCards } from '@/components/ui/expanding-cards'
import { Button } from '@/components/ui/Button'
import { FEATURED_WORK } from '@/config/featured-work'

const headingLines = [
  "Every service we offer,",
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

export function FeaturedWorkSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-20">
        {/* Heading — staggered line reveal */}
        <motion.div
          className="mb-10 md:mb-12 max-w-4xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {headingLines.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.h2
                className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--color-text)]"
                variants={lineReveal}
              >
                {line}
              </motion.h2>
            </div>
          ))}

          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--color-text)]"
              variants={lineReveal}
            >
              now <span style={{ color: 'var(--color-accent)' }}>powered by AI.</span>
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-5">
            <motion.p
              className="text-base md:text-lg text-[var(--color-text-muted)] max-w-2xl leading-relaxed"
              variants={fadeUp}
            >
              We didn&apos;t slap &quot;AI&quot; onto our services as a trend. We rebuilt how we work — so every website, every app, every workflow we touch is smarter, faster, and built to compound over time.
            </motion.p>
          </div>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <ExpandingCards items={FEATURED_WORK} defaultActiveIndex={0} />
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Button href="/work" variant="primary" size="lg" showArrow>
            See All Projects
          </Button>
          <Button href="/contact" variant="ghost" size="lg" showArrow>
            Start a Project
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
