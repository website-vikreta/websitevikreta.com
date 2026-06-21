'use client'

import React from 'react'
import { motion } from 'motion/react'
import { HoverExpand, WorkItem } from '@/components/ui/expand-on-hover'

const ITEMS: WorkItem[] = [
  {
    id: "sbp-webapp-redesign",
    title: "Figma Buzz automation for Bulk media generation",
    excerpt:
      "Reimagined the web experience for a leading sustainable Bitcoin initiative — modern UI, faster flows, clearer architecture.",
    imgSrc:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&h=900&q=80",
    secondaryImgSrc:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&h=600&q=80",
    linkHref: "#",
  },
  {
    id: "blancora-ecommerce",
    title: "E-Commerce & CMS for Blancora Clothing",
    excerpt:
      "Built a full e-commerce platform with custom CMS — the Blancora team owns their store completely.",
    imgSrc:
      "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=1400&h=900&q=80",
    secondaryImgSrc:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&h=600&q=80",
    linkHref: "#",
  },
  {
    id: "iendorse-mvp",
    title: "MVP for Influencer Affiliate Platform iEndorse",
    excerpt:
      "Built the MVP from zero — core flows, dashboards, and affiliate tracking infrastructure for day-one launch.",
    imgSrc:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&h=900&q=80",
    secondaryImgSrc:
      "https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?auto=format&fit=crop&w=1400&h=600&q=80",
    linkHref: "#",
  },
]

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
                className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-(--color-text)"
                variants={lineReveal}
              >
                {line}
              </motion.h2>
            </div>
          ))}

          <div className="overflow-hidden">
            <motion.h2
              className="font-sans font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-(--color-text)"
              variants={lineReveal}
            >
              now <span style={{ color: 'var(--color-accent)' }}>powered by AI.</span>
            </motion.h2>
          </div>

          <div className="overflow-hidden mt-5">
            <motion.p
              className="text-base md:text-lg text-(--color-text-muted) max-w-2xl leading-relaxed"
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
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <HoverExpand items={ITEMS} />
        </motion.div>

      </div>
    </section>
  )
}
