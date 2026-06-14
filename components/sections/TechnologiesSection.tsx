'use client'

import React from 'react'
import { motion } from 'motion/react'
import { DotGrid } from '@/components/ui/DotGrid'
import { LogoCloud } from '@/components/ui/logo-cloud-3'
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials'

const TECH_LOGOS = [
  {
    src: 'https://svgl.app/library/nvidia.svg',
    alt: 'NVIDIA',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/supabase.svg',
    alt: 'Supabase',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/openai.svg',
    alt: 'OpenAI',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/turso.svg',
    alt: 'Turso',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/vercel.svg',
    alt: 'Vercel',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/github.svg',
    alt: 'GitHub',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/claude-ai.svg',
    alt: 'Claude AI',
    width: 100,
    height: 32,
  },
  {
    src: 'https://svgl.app/library/clerk.svg',
    alt: 'Clerk',
    width: 100,
    height: 32,
  },
]

export function TechnologiesSection() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-white py-20 md:py-32">
      {/* DotGrid background */}
      <div className="absolute inset-0">
        <DotGrid />
      </div>

      {/* Content — constrained to max-width */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* Label */}
        <motion.p
          className="text-sm font-bold uppercase tracking-widest text-neutral-500 font-[family-name:var(--font-geist-mono)] text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Technologies
        </motion.p>

        {/* Main heading */}
        <motion.h2
          className="font-[family-name:var(--font-geist-sans)] font-semibold text-4xl md:text-6xl text-center text-neutral-900 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
        >
          Powered by AI. Future Tech.
        </motion.h2>
      </div>

      {/* Slider with dividers — full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="relative z-10 w-full"
      >
        {/* Top divider */}
        <div
          className="h-px w-full bg-neutral-200"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        />

        {/* Logo cloud */}
        <LogoCloud
          logos={TECH_LOGOS}
          gap={64}
          duration={20}
          durationOnHover={60}
          reverse={true}
          className="py-8"
        />

        {/* Bottom divider */}
        <div
          className="h-px w-full bg-neutral-200"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          }}
        />
      </motion.div>

      {/* Testimonials heading — constrained to max-width */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* Testimonials subheading */}
        <motion.div
          className="mt-20 md:mt-32 flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-neutral-500 font-[family-name:var(--font-geist-mono)] mb-4">
            Testimonials
          </p>
        </motion.div>
        <motion.h3
          className="font-[family-name:var(--font-geist-sans)] font-semibold text-3xl md:text-5xl text-center text-neutral-900 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          Hear it from our happy clients
        </motion.h3>
      </div>

      {/* Testimonials carousel — full width */}
      <motion.div
        className="relative z-10 w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
      >
        <StaggerTestimonials />
      </motion.div>

      {/* Bottom padding after testimonials */}
      <div className="py-12 md:py-16" />
    </section>
  )
}
