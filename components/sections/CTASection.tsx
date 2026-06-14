'use client'

import React from 'react'
import { motion } from 'motion/react'
import { DotGrid } from '@/components/ui/DotGrid'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function CTASection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white py-20 md:py-32">
      {/* DotGrid background */}
      <div className="absolute inset-0">
        <DotGrid />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <Badge text="Ready when you are" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold mt-6 mb-4 text-neutral-900"
          variants={itemVariants}
        >
          Let's build something intelligent together
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-lg text-neutral-600 mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Tell us what you're working on — we'll show you how AI-first development can get you there faster.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Button
            href="/contact"
            variant="accent"
            size="lg"
          >
            Book a Call
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
