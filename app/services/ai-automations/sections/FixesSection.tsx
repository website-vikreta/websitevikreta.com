'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage } from '@/lib/gsap/reveals'

interface ServiceImage {
  src:    string
  width:  number
  height: number
  alt:    string
}

interface Service {
  id:          string
  title:       string
  description: string
  cta:         string
  image?:      ServiceImage
}

const SERVICES: Service[] = [
  {
    id:          'workflow-automation',
    title:       'Workflow & business process automation',
    description:
      'Your CRM, lead capture, order data and spreadsheets, wired together with n8n and Make.com so information moves without anyone copy-pasting it.',
    cta:         'See a workflow we built',
    image: {
      src:    '/services/ai-automation-flow.webp',
      width:  1672,
      height: 941,
      alt:    'Workflow automation diagram: webhooks, schedules, form submissions, database updates and incoming email feed a central automation tool that applies conditions, data transforms and AI logic, then pushes actions out to Slack, Microsoft Teams, WhatsApp, Gmail, Google Sheets, Shopify, Airtable, Mailchimp and GitHub.',
    },
  },
  {
    id:          'bulk-content',
    title:       'Bulk content automation',
    description:
      'The repetitive production work your team does by hand, turned into a system anyone can run from a spreadsheet and a template.',
    cta:         'See how we cut 20 hours to 1',
    image: {
      src:    '/services/bulk-content-automation.webp',
      width:  1672,
      height: 941,
      alt:    'Bulk content automation diagram: a spreadsheet of content, assets and details feeds an automation engine that outputs images, copy, social posts, PDFs, video and sheets, then delivers them to Slack, Teams, Google Workspace, WhatsApp, email, Mailchimp, a database, Shopify, GitHub and Jira.',
    },
  },
  {
    id:          'ai-ugc',
    title:       'AI UGC & product visuals',
    description:
      'Product content without the studio, the models, or the two-week wait. Your real product, any setting, production quality.',
    cta:         'See what a shoot costs now',
    image: {
      src:    '/services/ai-ugc-product-visuals.webp',
      width:  1672,
      height: 941,
      alt:    'AI product visual pipeline: upload your product images and details, AI generates realistic UGC-style visuals in any setting, producing production-quality images ready for social media, e-commerce, website, email marketing and ads.',
    },
  },
  {
    id:          'whatsapp-agents',
    title:       'WhatsApp AI agents',
    description:
      'A customer assistant that sounds like your team and actually does things: payment links, live order tracking, returns and promotions, all inside the chat.',
    cta:         'See how it works',
    image: {
      src:    '/services/whatsapp-ai-agent.webp',
      width:  1536,
      height: 1024,
      alt:    'WhatsApp AI agent handling a customer conversation about order status and returns, surrounded by its capabilities: dead cart recovery, personalised customer support, orders and returns, marketing broadcasts, payment links, smart promotions, AI-powered replies and analytics, connecting to Shopify, WooCommerce, Google Sheets and delivery partners.',
    },
  },
  {
    id:          'anything-ai',
    title:       '+ Anything AI',
    description:
      'If it\'s repetitive, rule-based, or eating hours from someone who\'s worth more than that, it\'s fair game. Tell us what it is.',
    cta:         'Book a Free Process Audit',
    image: {
      src:    '/services/anything-ai-automated.png',
      width:  1672,
      height: 941,
      alt:    'A person surrounded by stacks of spreadsheets, PDFs and reports hands the pile to an AI agent, which processes it and returns completed reports, handled emails, processed data, automated tasks and ready insights.',
    },
  },
]

export default function FixesSection() {
  const scope = useRef<HTMLElement>(null)
  // Highest step reached so far, monotonic — same rail mechanic as HowWeWork,
  // so scrolling alone (no click) tracks progress and lights the rail up.
  const [reached, setReached] = useState(0)

  useGsapSection(scope, () => {
    revealLines('#fix-heading', { trigger: scope.current })
    scope.current?.querySelectorAll<HTMLElement>('.fix-row').forEach((row) => {
      const img = row.querySelector<HTMLElement>('.fix-image')
      if (img) revealClipImage(img, { scale: false, trigger: row })
      revealFadeUp(row.querySelectorAll('.fix-copy'), { y: 20, trigger: row })
    })
  })

  useEffect(() => {
    const items = scope.current?.querySelectorAll<HTMLElement>('.fix-row')
    if (!items?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number((entry.target as HTMLElement).dataset.index)
          setReached((prev) => (index > prev ? index : prev))
        })
      },
      { rootMargin: '0px 0px -45% 0px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="fix-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="fix-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Where we focus
          </h2>
        </div>

        {/* Scroll rail, not a click accordion — every category is visible
            just by scrolling, nothing is gated behind an interaction. */}
        <div className="flex flex-col">
          {SERVICES.map((service, i) => {
            const isReached = i <= reached
            const isLast = i === SERVICES.length - 1

            return (
              <article
                key={service.id}
                data-index={i}
                className={`fix-row grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-x-10 ${
                  isLast ? 'pb-2' : 'pb-16 md:pb-20'
                }`}
              >
                <div className="fix-copy">
                  <h3 className="font-sans text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-body-lg leading-relaxed text-(--color-text-muted)">
                    {service.description}
                  </p>
                  <div className="mt-6">
                    <Button href="#book-audit" variant="ghost" size="sm" showArrow>
                      {service.cta}
                    </Button>
                  </div>
                </div>

                {/* Rail — a dot on a centered line, between text and image,
                    same position the reference component's progress line
                    sits in. A dot, not a numeral: HowWeWork's big numerals
                    stay that section's own signature. Hidden on mobile,
                    where text and image just stack directly. */}
                <div className="hidden lg:flex lg:flex-col lg:items-center">
                  <span
                    aria-hidden="true"
                    className={`size-3 shrink-0 rounded-full border-2 transition-colors duration-500 ease-out ${
                      isReached
                        ? 'border-(--color-accent) bg-(--color-accent)'
                        : 'border-(--color-border) bg-(--color-bg)'
                    }`}
                  />
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className={`mt-2 w-px flex-1 transition-colors duration-500 ease-out ${
                        i < reached ? 'bg-(--color-accent)' : 'bg-(--color-border)'
                      }`}
                    />
                  )}
                </div>

                {service.image && (
                  <div className="fix-image relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={service.image.width}
                      height={service.image.height}
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
