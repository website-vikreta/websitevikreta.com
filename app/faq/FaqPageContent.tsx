'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { ArrowUpRight } from 'lucide-react'

const FAQ_ITEMS = [
  {
    id: '1',
    title: 'What does Website Vikreta actually do?',
    content:
      "We design, build, and maintain websites and AI-powered systems for businesses — from a marketing site to a custom automation that handles your team's repetitive work. One team, start to finish.",
  },
  {
    id: '2',
    title: 'How much does a project cost?',
    content:
      "It depends on scope — a landing page and a full custom platform aren't priced the same way. We give you a clear quote after understanding what you actually need, not a generic package price before we've talked.",
  },
  {
    id: '3',
    title: 'How long does a typical project take?',
    content:
      "Most websites take 2–4 weeks depending on complexity. AI automation projects vary more — a simple workflow might ship in a week, a multi-system integration can take longer. We give you a real timeline once we've scoped the work.",
  },
  {
    id: '4',
    title: 'Do you only build websites, or do you handle AI automation too?',
    content:
      'Both. Websites are where we started, but a lot of our work now is building AI-driven systems — chatbots, document automation, lead qualification — that plug into a site or run independently.',
  },
  {
    id: '5',
    title: "What's your process like?",
    content:
      "We listen first, then diagnose what's actually needed, propose a clear plan, build it, and deliver with support after launch. No black-box handoffs — you know what's happening at every stage.",
  },
  {
    id: '6',
    title: 'Do I need to know exactly what I want before reaching out?',
    content:
      "No. Most clients come to us with a problem, not a finished spec. Part of what we do is figuring out the right solution with you — that's the diagnose step in our process.",
  },
  {
    id: '7',
    title: 'What happens after the site or system launches?',
    content:
      "We don't disappear. We offer ongoing support, monitoring, and adjustments as your business changes — launch is the start of the relationship, not the end of it.",
  },
  {
    id: '8',
    title: 'What industries or business sizes do you work with?',
    content:
      "We've worked across a range of industries and business sizes — from solo founders to growing teams. What matters more than size is whether there's a real problem worth solving.",
  },
  {
    id: '9',
    title: 'Can you work with our existing tools and tech stack?',
    content:
      'Yes. Most of our automation work is built specifically to connect with what you already use — your CRM, inbox, spreadsheets, internal tools — rather than asking you to switch platforms.',
  },
  {
    id: '10',
    title: 'How do we get started?',
    content:
      "Reach out through our contact page with a short note about what you're working on. We'll get back to you, usually within 24–48 hours, to set up a conversation.",
  },
  {
    id: '11',
    title: 'Do you offer ongoing maintenance, or just one-time builds?',
    content:
      'Both, depending on what you need. Some clients want a one-time build, others want ongoing maintenance and iteration. We can scope either.',
  },
]

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
              name: item.title,
              acceptedAnswer: { '@type': 'Answer', text: item.content },
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
                className="font-bold"
                style={{
                  fontSize:      'var(--text-h1)',
                  lineHeight:    'var(--leading-h1)',
                  letterSpacing: '-0.02em',
                  color:         'var(--color-text)',
                  marginBottom:  '1rem',
                }}
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
                            'group flex w-full items-start gap-4 pl-6 md:pl-14 py-6 text-left',
                            '[&>svg]:hidden',
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
                            className={cn(
                              'flex-1 text-xl md:text-2xl font-semibold leading-snug tracking-tight',
                              'text-[var(--color-text-muted)]',
                              'transition-colors duration-200',
                              'group-hover:text-[var(--color-text)]',
                              'group-data-[state=open]:text-[var(--color-text)]',
                            )}
                          >
                            {item.title}
                          </span>
                        </AccordionPrimitive.Trigger>
                      </h2>
                    </AccordionPrimitive.Header>

                    <AccordionPrimitive.Content
                      className="accordion-content"
                    >
                      <p
                        className="pl-6 md:pl-14 pb-8 text-[1.0625rem] leading-[1.8]"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {item.content}
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
