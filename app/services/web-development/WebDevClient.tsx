'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Button } from '@/components/ui/Button'
import { RevealText } from '@/components/ui/Reveal'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Shared constants ──────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const grainBg = (() => {
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#g)"/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
})()

const aspectRatios = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-[1/1]', 'aspect-[4/3]'] as const

// ─── Animation variants ────────────────────────────────────────────────────────

const lineContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, ease: EASE } },
}

// Delayed so subtitle + CTA appear after heading lines finish (~0.9s)
const heroCtaContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.9 } },
}

const ctaChild = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

const projectsContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

// ─── Placeholder data ──────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: 'Tocal',
    description: 'A sleek product site for DbyT Dynamics with a clean, modern presentation.',
    image: 'https://placehold.co/600x750',
    href: 'https://tocal.in/',
  },
  {
    id: 2,
    title: 'Sustainable Bitcoin Protocol',
    description: 'Institutional-grade market infrastructure site for a sustainable Bitcoin protocol.',
    image: 'https://placehold.co/600x750',
    href: 'https://www.sustainablebtc.org/',
  },
  {
    id: 3,
    title: 'Earth by Blancora',
    description: 'A sustainable, stylish e-commerce storefront for a women\'s clothing brand.',
    image: 'https://placehold.co/600x750',
    href: 'https://blancoraclothing.com/shop',
  },
  {
    id: 4,
    title: 'Archmodal',
    description: 'A polished home page for an architectural modeling and design studio.',
    image: 'https://placehold.co/600x750',
    href: 'https://www.archmodal.com/',
  },
  {
    id: 5,
    title: 'Psilent Ganges',
    description: 'An engineering solutions site built for clarity, performance, and trust.',
    image: 'https://placehold.co/600x750',
    href: 'https://psilentganges.netlify.app/',
  },
  {
    id: 6,
    title: 'Katalyst Consulting',
    description: 'A professional consulting firm site focused on credibility and growth.',
    image: 'https://placehold.co/600x750',
    href: 'https://www.katalystcs.co.in/',
  },
]

// ─── FAQ data ──────────────────────────────────────────────────────────────────

const webDevFaqs = [
  {
    question: 'How long does it take to build a website?',
    answer:
      'Most business websites take 3–6 weeks from kickoff to launch, depending on the number of pages, content readiness, and how quickly feedback comes back during review. Larger builds with custom features or CMS integration can take longer — we\'ll give you a realistic timeline upfront, not an aggressive one we can\'t hit.',
  },
  {
    question: 'Do you build custom websites or use templates?',
    answer:
      'Every site we build is custom-coded from scratch using Next.js and Tailwind CSS — not a theme with your logo swapped in. That means your site is built around your brand and goals, not squeezed into someone else\'s layout, and it\'s faster and more flexible to extend later.',
  },
  {
    question: 'Will my website be optimized for SEO and mobile from day one?',
    answer:
      'Yes. Every site we ship includes proper metadata, sitemaps, semantic HTML, fast load times, and mobile-first responsive design as standard — not as an add-on. SEO isn\'t something we bolt on after launch; it\'s part of how the site is built.',
  },
  {
    question: 'How much does a custom website cost?',
    answer:
      'Pricing depends on scope — number of pages, custom functionality, and CMS needs all factor in. We\'ll give you a clear, itemized quote after understanding your requirements, with no hidden costs added later.',
  },
  {
    question: 'Do I own the code and content after the project is delivered?',
    answer:
      'Yes, completely. Once the project is delivered, the code and content are yours — no licensing fees, no lock-in, and no dependency on us to keep the site running.',
  },
  {
    question: 'Do you offer support or maintenance after launch?',
    answer:
      'Yes. We offer post-launch support for bug fixes, content updates, and ongoing maintenance, so your site keeps running smoothly as your business grows. We can walk you through options once your site is live.',
  },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export default function WebDevClient() {
  const router = useRouter()
  const columnCount = 3
  const projectColumns = Array.from({ length: columnCount }, (_, colIndex) =>
    projects.filter((_, i) => i % columnCount === colIndex)
  )

  return (
    <main>

      {/* ─── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center text-center px-6">
        <div className="mx-auto w-full max-w-3xl">

          {/* Heading — two-line masked reveal, triggered on mount */}
          <motion.h2
            className="text-h2 font-bold"
            variants={lineContainer}
            initial="hidden"
            animate="visible"
          >
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span className="block" variants={lineReveal}>
                Crafting{' '}
                <span style={{ color: 'var(--color-accent)' }}>High-Performance</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
              <motion.span className="block" variants={lineReveal}>
                Websites That Drive Growth
              </motion.span>
            </span>
          </motion.h2>

          {/* Subtitle + CTA — staggered fade-up, sequenced after heading */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-8"
            variants={heroCtaContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-[var(--color-text-muted)] max-w-2xl"
              style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}
              variants={ctaChild}
            >
              We design and develop fast, scalable, and visually stunning websites
              that help businesses attract customers, build credibility, and grow online.
            </motion.p>

            <motion.div variants={ctaChild}>
              {/* TODO: confirm final CTA destination */}
              <Button href="#work" variant="primary" showArrow>
                See What We Build
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ─── Video placeholder ─────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20">
        <div className="container">
          <motion.div
            className="aspect-video w-full bg-black rounded-none overflow-hidden flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* TODO: Replace with final video asset — 16:9, no border-radius, autoplay/loop/muted */}
            {/* <video autoPlay loop muted playsInline className="w-full h-full object-cover" src="..." /> */}
            <span className="text-xs uppercase tracking-widest text-neutral-600">
              Video coming soon
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── Projects ─────────────────────────────────────────────────────── */}
      <section id="work" className="py-16 md:py-20">
        <div className="container">

          <RevealText as="h2" className="text-h2 font-bold mb-12">
            Solutions We&rsquo;ve Delivered
          </RevealText>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectColumns.map((column, colIndex) => (
              <motion.div
                key={colIndex}
                className={cn(
                  'flex flex-col gap-8',
                  colIndex === 1 && 'lg:mt-12',
                  colIndex === 2 && 'lg:mt-24',
                )}
                variants={projectsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                {column.map((project) => {
                  const globalIndex = projects.findIndex((p) => p.id === project.id)
                  return (
                    <motion.a
                      key={project.id}
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariant}
                      className="group block border border-(--color-border) bg-(--color-surface) p-3"
                    >
                      <div className={cn('relative w-full overflow-hidden bg-(--color-bg-muted)', aspectRatios[globalIndex % aspectRatios.length])}>
                        <motion.div
                          className="size-full"
                          initial={{ clipPath: 'inset(100% 0 0 0)' }}
                          whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                          viewport={{ once: true, margin: '-80px' }}
                          transition={{ duration: 0.9, ease: EASE }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={project.title}
                            loading="lazy"
                            className="size-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:grayscale-0"
                          />
                        </motion.div>

                        {/* Grain overlay — premium texture */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.14]"
                          style={{ backgroundImage: grainBg, backgroundSize: '200px 200px' }}
                        />

                        {/* Accent corner tag — reveals on hover */}
                        <span className="absolute top-3 left-3 bg-(--color-accent) px-2 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-(--color-text) opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer">
                          View Site
                        </span>
                      </div>

                      <h3 className="mt-4 font-bold text-lg text-(--color-text)">{project.title}</h3>
                      <p className="mt-1 text-sm text-neutral-500">{project.description}</p>
                      <span
                        role="link"
                        tabIndex={0}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push('/coming-soon') }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); router.push('/coming-soon') } }}
                        className="group/link mt-3 inline-flex w-fit cursor-pointer items-center gap-1.5 text-[1rem] font-medium text-(--color-text)"
                      >
                        <span className="relative">
                          Read more
                          <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                        </span>
                        <ArrowRight size={14} strokeWidth={1.75} className="transition-transform duration-300 ease-out group-hover/link:translate-x-1" />
                      </span>
                    </motion.a>
                  )
                })}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="container">

          <motion.div
            className="mx-auto max-w-[720px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="text-center mb-12">
              <RevealText as="h2" className="text-h2 font-bold">
                Frequently Asked Questions
              </RevealText>
            </div>

            <AccordionPrimitive.Root type="single" collapsible>
              {webDevFaqs.map((faq, index) => (
                <AccordionPrimitive.Item
                  key={faq.question}
                  value={`item-${index}`}
                  className="border-t"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <AccordionPrimitive.Header asChild>
                    <h3>
                      <AccordionPrimitive.Trigger
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
                        style={{ outlineColor: 'var(--color-accent)' }}
                      >
                        <div className="flex gap-4">
                          <span
                            className="mt-2 flex-shrink-0 font-mono text-xs"
                            style={{ color: 'var(--color-text-faint)', letterSpacing: '0.06em' }}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xl md:text-2xl font-semibold leading-snug tracking-tight text-[var(--color-text-muted)] group-data-[state=open]:text-[var(--color-text)]">
                            {faq.question}
                          </span>
                        </div>
                        <span
                          className="mt-2 flex-shrink-0 text-xl font-light text-[var(--color-text-muted)] transition-opacity duration-150 select-none"
                          aria-hidden="true"
                        >
                          <span className="group-data-[state=open]:hidden">+</span>
                          <span className="group-data-[state=closed]:hidden">&#8722;</span>
                        </span>
                      </AccordionPrimitive.Trigger>
                    </h3>
                  </AccordionPrimitive.Header>

                  <AccordionPrimitive.Content className="accordion-content">
                    <p
                      className="pb-8 text-[1.0625rem] leading-[1.7]"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {faq.answer}
                    </p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
              <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />
            </AccordionPrimitive.Root>

            <p
              className="mt-12 text-[1.0625rem] leading-[1.8] text-center"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Still have questions?{' '}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-medium transition-colors duration-200 hover:opacity-70"
                style={{ color: 'var(--color-text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Get in touch
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </Link>
            </p>
          </motion.div>

        </div>
      </section>

    </main>
  )
}
