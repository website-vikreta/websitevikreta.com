'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { TextLink } from '@/components/ui/TextLink'
import type { DisplayPost } from '@/sanity/types'

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

const cardReveal = {
  hidden: { y: 24, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
}

export function BlogListingClient({ posts }: { posts: DisplayPost[] }) {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="container pt-32 pb-20 md:pt-40 md:pb-28">

          {/* Hero header */}
          <motion.div
            className="mb-10 md:mb-14"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-hidden">
              <motion.h2
                className="text-h2 font-bold leading-[1.1] tracking-tight text-[var(--color-text)]"
                variants={lineReveal}
              >
                Blogs
              </motion.h2>
            </div>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-x-10 md:gap-y-20">
            {posts.map((post, i) => (
              <motion.article
                key={post.slug}
                custom={i}
                variants={cardReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                className="flex flex-col"
              >
                {/* Image with category badge */}
                <Link href={`/blog/${post.slug}`} className="block relative mb-5 group/img">
                  <div className="relative w-full aspect-video bg-[#121212] overflow-hidden">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-[filter] duration-300 border border-(--color-border)"
                      />
                    ) : null}
                  </div>
                </Link>

                {/* Title */}
                <h2
                  className="font-bold leading-[1.2] tracking-tight text-[var(--color-text)] mb-3"
                  style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.35rem)' }}
                >
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-muted)] leading-[1.7] mb-5 flex-1">
                  {post.description}
                </p>

                {/* Footer: date + readtime | Read more */}
                <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4 mt-auto gap-4">
                  <span className="text-[0.75rem] text-[var(--color-text-faint)] tracking-[0.03em] whitespace-nowrap">
                    {post.publishDate} · {post.readTime}
                  </span>
                  <TextLink href={`/blog/${post.slug}`} arrow="diagonal">
                    Read more
                  </TextLink>
                </div>
              </motion.article>
            ))}
          </div>


</div>
      </section>
    </main>
  )
}
