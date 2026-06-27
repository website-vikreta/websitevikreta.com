"use client"

import { motion } from "motion/react"
import BlogMinimalCard from "@/components/ui/BlogMinimalCard"

export interface BlogPreviewPost {
  title: string
  excerpt: string
  href: string
  imageUrl?: string
  category?: string
  readTime?: string
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardReveal = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

export function BlogPreviewSectionClient({ posts }: { posts: BlogPreviewPost[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container py-16 md:py-20">

        {/* Heading */}
        <motion.div
          className="mb-12 md:mb-16 max-w-3xl"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="overflow-hidden">
            <motion.h2
              className="font-bold text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-[var(--color-text)]"
              variants={lineReveal}
            >
              The{" "}
              <span style={{ color: "var(--color-accent)" }}>thinking</span>
              {" "}behind the work.
            </motion.h2>
          </div>
        </motion.div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, i) => (
            <motion.article
              key={post.href}
              custom={i}
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="flex flex-col"
            >
              <BlogMinimalCard
                imageUrl={post.imageUrl ?? "/placeholder-blog.jpg"}
                title={post.title}
                href={post.href}
              />
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
