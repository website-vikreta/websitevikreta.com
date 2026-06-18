'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

interface Section {
  heading: string
  content: string | string[]
}

export interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  sections: Section[]
}

const EASE = [0.22, 1, 0.36, 1] as const

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, ease: EASE },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: EASE },
  },
}

export function LegalPageLayout({ title, lastUpdated, sections }: LegalPageLayoutProps) {
  const prefersReduced = useReducedMotion()
  const animate = !prefersReduced

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      <div className="relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container">
          <div className="max-w-3xl mx-auto">

            {/* Header block */}
            <motion.div
              className="mb-16 text-center"
              initial={animate ? 'hidden' : false}
              animate={animate ? 'visible' : undefined}
              variants={animate ? headerVariants : undefined}
            >
              <p
                className="font-mono text-xs uppercase mb-4"
                style={{ color: '#FFBF00', letterSpacing: '0.15em' }}
              >
                Legal
              </p>
              <h1
                className="font-bold tracking-tight mb-4"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  lineHeight: 1.05,
                  color: '#000000',
                }}
              >
                {title}
              </h1>
              <p className="font-mono text-xs" style={{ color: 'rgba(0,0,0,0.45)' }}>
                Last updated: {lastUpdated}
              </p>
            </motion.div>

            {/* Content sections */}
            <motion.div
              initial={animate ? 'hidden' : false}
              animate={animate ? 'visible' : undefined}
              variants={animate ? containerVariants : undefined}
              className="flex flex-col gap-12"
            >
              {sections.map((section, i) => (
                <motion.section key={i} variants={animate ? itemVariants : undefined}>
                  <h2
                    className="font-semibold mb-4"
                    style={{
                      fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                      color: '#000000',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {section.heading}
                  </h2>
                  {Array.isArray(section.content) ? (
                    <ul className="flex flex-col gap-2" style={{ paddingLeft: '1.25rem' }}>
                      {section.content.map((item, j) => (
                        <li
                          key={j}
                          style={{
                            fontSize: '1rem',
                            lineHeight: 1.75,
                            color: 'rgba(0,0,0,0.65)',
                            listStyleType: 'disc',
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: '1rem', lineHeight: 1.75, color: 'rgba(0,0,0,0.65)' }}>
                      {section.content}
                    </p>
                  )}
                </motion.section>
              ))}
            </motion.div>

            {/* Back link */}
            <div className="mt-16">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-sm hover:underline underline-offset-4 transition-colors duration-200"
                style={{ color: '#FFBF00' }}
              >
                <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
