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
      'We build AI automations, optimize workflows, and design and develop websites, web apps, and mobile apps. We also handle digital marketing and stay on to maintain what we build. One team, start to finish.',
  },
  {
    id: '2',
    title: 'How much does a project cost?',
    content:
      "Depends on scope. A marketing site and a full automation system aren't priced the same, so we won't quote you a number until we know what you're actually building. Most projects land between [$X and $Y]. You'll get a real figure after a short call, not a \"starting from\" line that never holds up.",
  },
  {
    id: '3',
    title: 'How long does a typical project take?',
    content:
      "A focused website usually takes 2 to 4 weeks. Automation projects move differently. One image production pipeline we built cut a client's process from 20 hours to 1 hour per collection, and getting there took about [X weeks] of build and testing. We'll give you a real timeline once we know the scope.",
  },
  {
    id: '4',
    title: 'Do you only build websites, or do you handle AI automation too?',
    content:
      'Both, same team. We build the site, then we build what runs behind it: workflow automation, AI product visuals, WhatsApp agents that handle customer replies. No handoff to a second agency halfway through.',
  },
  {
    id: '5',
    title: "What's your process like?",
    content:
      "Discovery first, then design, then build, then launch. We work stage by stage so you're approving pieces along the way, not waiting weeks for one big reveal.",
  },
  {
    id: '6',
    title: 'Do I need to know exactly what I want before reaching out?',
    content:
      "No. Most people who reach out have a problem, not a spec sheet. We'll ask the right questions and shape the solution with you.",
  },
  {
    id: '7',
    title: 'What happens after the site or system launches?',
    content:
      "We stick around. Launch is when the real work of monitoring and fixing starts, and AI systems especially need tuning once actual usage kicks in.",
  },
  {
    id: '8',
    title: 'What industries or business sizes do you work with?',
    content:
      "Funded startups, SMBs going digital, and international or high-end clients who need work that holds up. We've built for furniture e-commerce, garage services, and one design partnership that's run three years and counting.",
  },
  {
    id: '9',
    title: 'Can you work with our existing tools and tech stack?',
    content:
      "Yes. We've built on Shopify, WhatsApp Business API, and delivery-partner integrations, and we work with what you already have instead of asking you to start over.",
  },
  {
    id: '10',
    title: 'How do we get started?',
    content:
      "Book a call. We'll talk through what you need, and if it's a fit, you'll have a scope and timeline within a few days.",
  },
  {
    id: '11',
    title: 'Do you offer ongoing maintenance, or just one-time builds?',
    content:
      'Both. Some clients want a one-time build and walk away. Others keep us on for updates and support long-term. Your call.',
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
                            {item.title}
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
