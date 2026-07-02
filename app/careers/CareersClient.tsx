'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'

interface Opening {
  _id: string
  title: string
  slug: string
  type: string
  stipend: string
  positions: number
  description: string
  prerequisites: string[]
  skills: string[]
}

interface Props {
  openings: Opening[]
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function CareersClient({ openings }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container pt-32 pb-12 md:pt-40 md:pb-16">

          {/* Page title — matches blog page pattern exactly */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden mb-10">
              <motion.h2
                variants={lineReveal}
                className="text-h2 font-bold leading-[1.1] tracking-tight text-[var(--color-text)]"
              >
                Careers
              </motion.h2>
            </div>

            {/* Banner placeholder */}
            <motion.div
              variants={fadeUp}
              className="w-full h-[280px] md:h-[380px] bg-[var(--color-bg-muted)] flex items-center justify-center"
            >
              <span className="font-mono text-meta-label tracking-[0.12em] uppercase text-[var(--color-text-faint)]">
                Banner coming soon
              </span>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── Openings listing ─────────────────────────────────────────────── */}
      <section id="openings" className="py-16 md:py-20">
        <div className="container">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.h2 variants={fadeUp} className="text-h3 font-bold tracking-tight text-[var(--color-text)] mb-4">
              Open Roles
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--color-text-muted)] mb-12" style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}>
              All roles are internship positions based in Pune (hybrid/remote flexible).
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openings.map((opening) => (
              <motion.div
                key={opening.slug}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 24 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[var(--color-bg-muted)] p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-meta-label tracking-(--tracking-meta) uppercase text-(--color-text-faint)">
                    {opening.type}
                  </span>
                  <span className="font-mono text-meta-label tracking-(--tracking-meta) uppercase text-(--color-text-faint)">
                    {opening.positions} {opening.positions === 1 ? 'intern' : 'interns'} needed
                  </span>
                </div>

                <h3 className="text-xl font-bold text-(--color-text)">{opening.title}</h3>

                <p className="text-(--color-text-muted) text-sm leading-relaxed line-clamp-3">{opening.description}</p>

                <div className="flex flex-wrap gap-2">
                  {opening.skills.map(skill => (
                    <span key={skill} className="text-xs font-mono px-2 py-1 border border-(--color-border) text-(--color-text-muted)">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-(--color-border)">
                  <span className="text-sm font-medium text-(--color-text)">₹{opening.stipend}</span>
                  <Link href={`/careers/${opening.slug}`}>
                    <Button variant="ghost" size="md" showArrow>View & Apply</Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
