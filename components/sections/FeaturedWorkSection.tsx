'use client'

import React from 'react'
import { motion } from 'motion/react'
import { DotGrid } from '@/components/ui/DotGrid'
import { ExpandingCards } from '@/components/ui/expanding-cards'
import { Button } from '@/components/ui/Button'
import { FEATURED_WORK } from '@/config/featured-work'

const headingVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

const buttonVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
}

export function FeaturedWorkSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Repulsing dots background */}
      <div className="absolute inset-0">
        <DotGrid />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <motion.div
          className="py-20 md:py-32 flex flex-col items-center justify-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.4 }}
          variants={headingVariants}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 font-[family-name:var(--font-geist-mono)] mb-4">
            Featured Work
          </p>
          <h2 className="font-[family-name:var(--font-geist-sans)] font-semibold text-4xl md:text-6xl text-center text-neutral-900">
            Projects we're proud of
          </h2>
        </motion.div>

        {/* Expanding Cards Grid */}
        <div className="flex w-full flex-col items-center justify-center px-4 md:px-8">
          <ExpandingCards items={FEATURED_WORK} defaultActiveIndex={0} />
        </div>

        {/* CTA Button */}
        <motion.div
          className="py-20 md:py-24 flex flex-col items-center justify-center gap-8 bg-white"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.4 }}
          variants={buttonVariants}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <Button href="/work" variant="primary" size="lg" showArrow>
            Explore More
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
