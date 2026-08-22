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
  /** Short label for the sticky index — the full title is too long to scan there. */
  indexLabel:  string
  description: string
  cta:         string
  image?:      ServiceImage
}

const SERVICES: Service[] = [
  {
    id:          'workflow-automation',
    title:       'Workflow & business process automation',
    indexLabel:  'Workflow automation',
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
    indexLabel:  'Bulk content',
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
    indexLabel:  'AI product visuals',
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
    indexLabel:  'WhatsApp agents',
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
    indexLabel:  'Anything else',
    description:
      'If it\'s repetitive, rule-based, or eating hours from someone who\'s worth more than that, it\'s fair game. Tell us what it is.',
    cta:         'Book a Free Process Audit',
  },
]

export default function FixesSection() {
  const scope = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState(SERVICES[0].id)

  useGsapSection(scope, () => {
    revealLines('#fix-heading', { trigger: scope.current })
    scope.current?.querySelectorAll<HTMLElement>('.service-panel').forEach((panel) => {
      const img = panel.querySelector<HTMLElement>('.service-image')
      if (img) revealClipImage(img, { scale: false, trigger: panel })
      revealFadeUp(panel.querySelectorAll('.service-copy'), { y: 20, trigger: panel })
    })
  })

  // Scroll-spy for the sticky index. Panels are tall blocks (not zero-height
  // headings), so a single thin band near the top of the viewport reliably has
  // exactly one panel crossing it — no need for the nearest-entry/exit-direction
  // arbitration the blog ToC needs.
  useEffect(() => {
    const panels = scope.current?.querySelectorAll<HTMLElement>('.service-panel')
    if (!panels?.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit?.target.id) setActiveId(hit.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px' },
    )

    panels.forEach((panel) => observer.observe(panel))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="fix-heading">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">

          {/* ── Sticky chapter index ────────────────────────────────
              Desktop-only wayfinding: it holds no content of its own, so
              hiding it on mobile duplicates nothing (the panels carry
              everything). Anchors are plain hrefs — the browser does the
              scrolling, no JS handler needed. */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2
              id="fix-heading"
              className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              Where we focus
            </h2>

            <nav aria-label="Services" className="mt-8 hidden lg:block">
              <ul className="flex flex-col">
                {SERVICES.map((service) => {
                  const isActive = service.id === activeId
                  return (
                    <li key={service.id}>
                      <a
                        href={`#${service.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`block border-l-2 py-2 pl-4 text-[15px] transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${
                          isActive
                            ? 'border-(--color-text) text-(--color-text) [text-shadow:0_0_0.5px_currentColor]'
                            : 'border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)'
                        }`}
                      >
                        {service.indexLabel}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* ── Diagram panels ──────────────────────────────────────
              One per row at the full width of the 8-col track (~830px at
              1440). These are dense explainers, not thumbnails — at 3-up
              card size their labels are unreadable, which is the whole
              reason this section isn't a card grid. */}
          <div className="mt-10 flex flex-col gap-20 lg:col-span-8 lg:mt-0 md:gap-24">
            {SERVICES.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="service-panel scroll-mt-32"
              >
                {service.image && (
                  <div className="service-image relative mb-6 overflow-hidden border border-(--color-border) bg-(--color-surface)">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={service.image.width}
                      height={service.image.height}
                      sizes="(min-width: 1024px) 830px, 100vw"
                      className="h-auto w-full"
                    />
                  </div>
                )}

                <h3 className="service-copy font-sans text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl">
                  {service.title}
                </h3>
                <p className="service-copy mt-3 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)">
                  {service.description}
                </p>
                <div className="service-copy mt-6">
                  <Button href="#book-audit" variant="ghost" size="sm" showArrow>
                    {service.cta}
                  </Button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
