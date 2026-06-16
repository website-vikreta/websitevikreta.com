'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import { ArrowDotsButton } from '@/components/ui/arrow-dots-button'
import { ContactForm } from '@/components/ContactForm'
import { Mail, ChevronDown } from 'lucide-react'
import { motion } from 'motion/react'

function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37" />
      <circle cx="17.5" cy="6.5" r="1.5" />
    </svg>
  )
}

function LinkedinIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export function ComingSoonPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <>
      {/* Hero — vertically centered, full viewport */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        aria-label="Coming Soon"
      >
        {/* Yellow dome glow */}
        <div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            zIndex: 1,
            background: 'radial-gradient(ellipse at center, rgba(253, 224, 71, 0.45) 0%, rgba(253, 224, 71, 0.12) 45%, transparent 70%)',
            filter: 'blur(40px) drop-shadow(0 20px 30px rgba(253, 224, 71, 0.15))',
          }}
        />

        <DotGrid />

        <motion.div
          className="relative z-20 flex flex-col items-center justify-center px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-7xl font-semibold text-(--color-text) font-sans leading-tight text-center mb-6"
          >
            Coming Soon
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-body-lg text-(--color-text-muted) max-w-sm text-center leading-relaxed mb-12"
          >
            This page is under construction.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <ArrowDotsButton label="Back to Home" href="/#hero" variant="secondary" />
            <ArrowDotsButton label="Contact Us" href="/#footer" variant="primary" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-8"
          >
            <a
              href="https://instagram.com/websitevikreta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
              aria-label="Instagram"
            >
              <InstagramIcon size={24} />
            </a>
            <a
              href="https://linkedin.com/company/website-vikreta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={24} />
            </a>
            <a
              href="mailto:contact@websitevikreta.com"
              className="text-neutral-400 hover:text-neutral-900 transition-colors duration-200"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={22} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* Form — below the fold, scroll-triggered */}
      <section className="relative flex flex-col items-center py-24 px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 text-center mb-8">
            Or send us a message
          </p>
          <ContactForm />
        </motion.div>
      </section>
    </>
  )
}
