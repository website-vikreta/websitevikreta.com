'use client'

/**
 * Sticky chapter index + full-width panels — the "Where we focus" pattern
 * from app/services/ai-automations/sections/FixesSection.tsx, reused here
 * instead of the sticky scroll-stack this section used to be. Same reason
 * that page moved off a card grid: each system's visual needs real room to
 * read, not a thumbnail, and a scroll-spied index lets the visitor jump
 * straight to the one they came for.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage } from '@/lib/gsap/reveals'

interface SystemImage {
  src: string
  alt: string
}

interface System {
  id:          string
  title:       string
  /** Short label for the sticky index — the full title is too long to scan there. */
  indexLabel:  string
  description: string
  cta:         string
  image:       SystemImage
}

const SYSTEMS: System[] = [
  {
    id:          'custom-crms',
    title:       'Custom CRMs & internal tools',
    indexLabel:  'CRMs & tools',
    description: 'Leads, orders, and ops dashboards in one place your team already understands.',
    cta:         'See how we scope a build',
    image: {
      src: '/services/crm-dashboard-overview.webp',
      alt: 'CRM dashboard showing a lead funnel, customer profile, order pipeline, and revenue charts in one screen',
    },
  },
  {
    id:          'customer-portals',
    title:       'Customer & partner portals',
    indexLabel:  'Portals',
    description: 'Your customers log in, check their own status, and stop emailing you for it.',
    cta:         'See how portals work',
    image: {
      src: '/services/customer-portal-overview.webp',
      alt: 'Customer portal showing a secure login, live order status tracker, downloadable invoices, and support chat',
    },
  },
  {
    id:          'ecommerce-apps',
    title:       'E-commerce & mobile apps',
    indexLabel:  'E-commerce & apps',
    description: 'Storefront, stock, and checkout wired as one system. The app follows when you need it.',
    cta:         'See what we’ve shipped',
    image: {
      src: '/services/ecommerce-storefront-overview.webp',
      alt: 'E-commerce storefront on laptop and mobile with product catalog, cart, checkout, and delivery tracking',
    },
  },
]

export default function SolutionSection() {
  const scope = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState(SYSTEMS[0].id)

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    scope.current?.querySelectorAll<HTMLElement>('.service-panel').forEach((panel) => {
      const img = panel.querySelector<HTMLElement>('.service-image')
      if (img) revealClipImage(img, { scale: false, trigger: panel })
      revealFadeUp(panel.querySelectorAll('.service-copy'), { y: 20, trigger: panel })
    })
  })

  // Scroll-spy for the sticky index — same technique as FixesSection: panels
  // are tall blocks, so a thin band near the top of the viewport reliably has
  // exactly one crossing it.
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
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="solution-heading">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">

          {/* ── Sticky chapter index ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2
              id="solution-heading"
              className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              Three Systems We Build Most Often
            </h2>

            <nav aria-label="Systems" className="mt-8 hidden lg:block">
              <ul className="flex flex-col">
                {SYSTEMS.map((system) => {
                  const isActive = system.id === activeId
                  return (
                    <li key={system.id}>
                      <a
                        href={`#${system.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`block border-l-2 py-2 pl-4 text-[15px] transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${
                          isActive
                            ? 'border-(--color-text) text-(--color-text) [text-shadow:0_0_0.5px_currentColor]'
                            : 'border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)'
                        }`}
                      >
                        {system.indexLabel}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* ── System panels ── */}
          <div className="mt-10 flex flex-col gap-20 lg:col-span-8 lg:mt-0 md:gap-24">
            {SYSTEMS.map((system) => (
              <article key={system.id} id={system.id} className="service-panel scroll-mt-32">
                <div className="service-image relative mb-6 overflow-hidden border border-(--color-border) bg-(--color-surface)">
                  <Image
                    src={system.image.src}
                    alt={system.image.alt}
                    width={1672}
                    height={941}
                    sizes="(min-width: 1024px) 830px, 100vw"
                    className="h-auto w-full"
                  />
                </div>

                <h3 className="service-copy font-sans text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl">
                  {system.title}
                </h3>
                <p className="service-copy mt-3 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)">
                  {system.description}
                </p>
                <div className="service-copy mt-6">
                  <Button href="#start-project" variant="ghost" size="sm" showArrow>
                    {system.cta}
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
