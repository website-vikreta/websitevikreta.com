"use client"

import { motion } from "motion/react"
import { TextLink } from "@/components/ui/TextLink"

const posts = [
  {
    title: "Where your team's week actually goes — and what to automate first",
    excerpt: "The most common time sinks in 20–100 person businesses, mapped.",
    href: "/blog/automate-first",
  },
  {
    title: "Why ranking on Google now also means ranking on AI answer engines",
    excerpt: "Build a content system that wins both search and AI discovery.",
    href: "/blog/seo-and-geo",
  },
  {
    title: "Your website is either your best salesperson or your worst",
    excerpt: "What separates a site that generates leads from one that just sits there.",
    href: "/blog/web-conversion",
  },
]

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

export function BlogPreviewSection() {
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
              {/* Placeholder image — 16:9 */}
              <div className="w-full aspect-video bg-[#121212] mb-6" />

              {/* Title */}
              <h3
                className="font-bold leading-[1.2] tracking-tight text-[var(--color-text)] mb-3"
                style={{ fontSize: "clamp(1.05rem, 1.6vw, 1.35rem)" }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-[var(--color-text-muted)] leading-[1.7] mb-5 flex-1">
                {post.excerpt}
              </p>

              <TextLink href={post.href} arrow="diagonal">Read more</TextLink>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
