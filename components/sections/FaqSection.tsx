'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ArrowUpRight } from 'lucide-react'
import { RevealText } from '@/components/ui/Reveal'
import { faqPageJsonLd, type FaqItem } from '@/lib/faq-data'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface FaqSectionProps {
  items: FaqItem[]
  heading?: string
  viewAllHref?: string
  ariaLabel: string
  /** Skip when `items` is a verbatim subset already schema'd on another page (e.g. /faq) — two FAQPage blocks for the same Q&As is duplicate content. */
  emitSchema?: boolean
}

export function FaqSection({ items, heading = 'Frequently Asked Questions', viewAllHref = '/faq', ariaLabel, emitSchema = true }: FaqSectionProps) {
  return (
    <section className="py-16 md:py-20" aria-label={ariaLabel}>
      {emitSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(items)) }}
        />
      )}
      <div className="container">
        <motion.div
          className="mx-auto max-w-[720px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="mb-12">
            <RevealText as="h2" className="text-h2 font-bold">
              {heading}
            </RevealText>
          </div>

          <AccordionPrimitive.Root type="single" collapsible defaultValue={items[0]?.id}>
            {items.map((faq, index) => (
              <AccordionPrimitive.Item
                key={faq.id}
                value={faq.id}
                className="border-t border-(--color-border)"
              >
                <AccordionPrimitive.Header asChild>
                  <h3>
                    <AccordionPrimitive.Trigger
                      className="group flex w-full items-start justify-between gap-6 py-6 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-accent)"
                    >
                      <div className="flex gap-4">
                        <span
                          className="mt-2 flex-shrink-0 font-mono text-xs text-(--color-text-faint) tracking-[0.06em]"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-xl md:text-2xl font-semibold leading-snug tracking-tight text-(--color-text-muted) group-data-[state=open]:text-(--color-text)">
                          {faq.question}
                        </span>
                      </div>
                      <span
                        className="mt-2 flex-shrink-0 text-xl font-light text-(--color-text-muted) transition-opacity duration-150 select-none"
                        aria-hidden="true"
                      >
                        <span className="group-data-[state=open]:hidden">+</span>
                        <span className="group-data-[state=closed]:hidden">&#8722;</span>
                      </span>
                    </AccordionPrimitive.Trigger>
                  </h3>
                </AccordionPrimitive.Header>

                <AccordionPrimitive.Content className="accordion-content" forceMount>
                  <p className="pb-8 text-[1.0625rem] leading-[1.7] text-(--color-text-muted)">
                    {faq.answer}
                  </p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
            <div className="border-t border-(--color-border)" />
          </AccordionPrimitive.Root>

          <p className="mt-12 text-[1.0625rem] leading-[1.8] text-center text-(--color-text-muted)">
            Still have questions?{' '}
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 font-medium text-(--color-text) underline underline-offset-[3px] transition-colors duration-200 hover:opacity-70"
            >
              Read all FAQs
              <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
