'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'
import { ALL_FAQS as FAQ_ITEMS } from '@/lib/faq-data'

export function FaqPageContent() {
  const headerRef = useRef<HTMLDivElement>(null)
  const itemRefs  = useRef<(HTMLDivElement | null)[]>([])
  const [openValue, setOpenValue] = useState<string>('1')

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
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: { '@type': 'Answer', text: item.answer },
            })),
          }),
        }}
      />

      <main className="relative min-h-screen">

          {/* Header */}
          <div
            ref={headerRef}
            className="container pt-32 pb-16 md:pt-40 md:pb-20"
          >
            <div className="mx-auto max-w-[720px] text-center">
              <h1
                className="text-h2 font-bold leading-[1.1] tracking-tight text-[var(--color-text)]"
                style={{ marginBottom: '1rem' }}
              >
                Frequently Asked Questions
              </h1>
              <p
                style={{
                  fontSize:   'var(--text-body-lg)',
                  lineHeight: 'var(--leading-body)',
                  color:      'var(--color-text-muted)',
                }}
              >
                Everything you need to know before we start working together.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="container pb-20 md:pb-28">
            <div className="mx-auto max-w-[720px]">
            <AccordionPrimitive.Root
              type="single"
              value={openValue}
              onValueChange={setOpenValue}
            >
              {FAQ_ITEMS.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[index] = el }}
                >
                  <AccordionPrimitive.Item
                    value={item.id}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <AccordionPrimitive.Header asChild>
                      <h2>
                        <AccordionPrimitive.Trigger
                          className={cn(
                            'group flex w-full items-start gap-4 py-6 text-left',
                            'cursor-pointer',
                            'focus-visible:outline-2 focus-visible:outline-offset-4',
                          )}
                          style={{ outlineColor: 'var(--color-accent)' }}
                        >
                          <span
                            className="flex-shrink-0 font-mono text-xs mt-2"
                            style={{ color: 'var(--color-text-faint)', letterSpacing: '0.06em' }}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className="flex-1 text-xl md:text-2xl font-semibold leading-snug tracking-tight text-[var(--color-text-muted)] group-data-[state=open]:text-[var(--color-text)]"
                          >
                            {item.question}
                          </span>
                          <span
                            className="flex-shrink-0 self-center text-xl font-light text-[var(--color-text-muted)] transition-opacity duration-150 ml-2 select-none"
                            aria-hidden="true"
                          >
                            <span className="group-data-[state=open]:hidden">+</span>
                            <span className="group-data-[state=closed]:hidden">&#8722;</span>
                          </span>
                        </AccordionPrimitive.Trigger>
                      </h2>
                    </AccordionPrimitive.Header>

                    <AccordionPrimitive.Content
                      className="accordion-content"
                    >
                      <p
                        className="pb-8 text-[1.0625rem] leading-[1.7]"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {item.answer}
                      </p>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                </div>
              ))}

              <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />
            </AccordionPrimitive.Root>

            {/* Closing CTA */}
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
            </div>
          </div>

      </main>
    </>
  )
}
