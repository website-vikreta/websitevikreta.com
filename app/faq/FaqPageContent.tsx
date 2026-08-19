'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'motion/react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { FaqAnswer } from '@/components/ui/FaqAnswer'
import { ALL_FAQS as FAQ_ITEMS, faqPageJsonLd } from '@/lib/faq-data'

export function FaqPageContent() {
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs  = useRef<(HTMLDivElement | null)[]>([])
  // Always a string ('' = none open), never undefined — Radix's controlled
  // `value` treats undefined as "uncontrolled" and desyncs its internal
  // state from ours if the two modes ever flip between renders.
  const [openValue, setOpenValue] = useState<string>('')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(headerRef.current, { opacity: 1, y: 0 })
        itemRefs.current.forEach(el => gsap.set(el, { opacity: 1, y: 0 }))
        return
      }

      gsap.set(headerRef.current, { opacity: 0, y: 24 })
      itemRefs.current.forEach(el => gsap.set(el, { opacity: 0, y: 20 }))

      const tl = gsap.timeline({ delay: 0.05 })

      tl.to(headerRef.current, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
        .to(
          itemRefs.current.filter(Boolean),
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.05 },
          '-=0.1',
        )
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(FAQ_ITEMS)),
        }}
      />

      <main className="relative min-h-screen">

          {/* Header */}
          <div
            ref={headerRef}
            className="container pt-32 pb-16 md:pt-40 md:pb-20"
          >
            <div className="mx-auto max-w-[720px] text-center">
              <h1 className="mb-4 text-h2 font-bold leading-[1.1] tracking-tight text-(--color-text)">
                Frequently Asked Questions
              </h1>
              <p className="text-body-lg text-(--color-text-muted)">
                Everything you need to know before we start working together.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="container pb-20 md:pb-28">
            <div className="mx-auto max-w-[720px]">
            <AccordionPrimitive.Root
              type="single"
              collapsible
              value={openValue}
              onValueChange={setOpenValue}
            >
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = item.id === openValue
                return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el }}
                >
                  <AccordionPrimitive.Item
                    value={item.id}
                    className="border-t border-(--color-border)"
                  >
                    <AccordionPrimitive.Header asChild>
                      <h2>
                        <AccordionPrimitive.Trigger
                          className={cn(
                            'group flex w-full items-start gap-4 py-6 text-left',
                            'cursor-pointer',
                            'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-accent)',
                          )}
                        >
                          <span
                            className="flex-shrink-0 font-mono text-xs mt-2 text-(--color-text-faint) tracking-[0.06em]"
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className="flex-1 text-xl md:text-2xl font-semibold leading-snug tracking-tight text-(--color-text-muted) group-data-[state=open]:text-(--color-text)"
                          >
                            {item.question}
                          </span>
                          <span
                            className="flex-shrink-0 self-center text-xl font-light text-(--color-text-muted) transition-opacity duration-150 ml-2 select-none"
                            aria-hidden="true"
                          >
                            <span className="group-data-[state=open]:hidden">+</span>
                            <span className="group-data-[state=closed]:hidden">&#8722;</span>
                          </span>
                        </AccordionPrimitive.Trigger>
                      </h2>
                    </AccordionPrimitive.Header>

                    <AccordionPrimitive.Content forceMount className="overflow-hidden">
                      <FaqAnswer answer={item.answer} isOpen={isOpen} reduceMotion={!!prefersReducedMotion} />
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                </div>
                )
              })}

              <div className="border-t border-(--color-border)" />
            </AccordionPrimitive.Root>

            {/* Closing CTA */}
            <p className="mt-12 text-[1.0625rem] leading-[1.8] text-center text-(--color-text-muted)">
              Still have questions?{' '}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-medium text-(--color-text) underline underline-offset-[3px] transition-colors duration-200 hover:opacity-70"
              >
                Get in touch
                <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
              </Link>
            </p>
            </div>
          </div>

      </main>
    </>
  )
}
