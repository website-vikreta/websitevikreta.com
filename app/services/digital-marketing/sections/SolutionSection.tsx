'use client'

/**
 * Sticky chapter index + full-width panels — the "Where we focus" pattern
 * from app/services/ai-automations/sections/FixesSection.tsx, also used by
 * Apps & CRM's SolutionSection. Each panel's visual is an illustrated crop
 * (same watercolor/hand-drawn language as manual-work-vs-automated.webp),
 * one per system, cropped from a single generated triptych so the three
 * share one consistent style.
 */

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'

interface System {
  id:          string
  title:       string
  /** Short label for the sticky index — the full title is too long to scan there. */
  indexLabel:  string
  description: string
  cta:         string
  image:       { src: string; alt: string }
}

const SYSTEMS: System[] = [
  {
    id:          'seo-geo-foundations',
    title:       'SEO & GEO foundations',
    indexLabel:  'SEO & GEO',
    description: 'Technical SEO, structured content, and schema markup so you rank in Google and get cited when people ask AI for a recommendation.',
    cta:         'See how we approach SEO & GEO',
    image: {
      src: '/services/digital-marketing/systems/seo-geo-foundations.png',
      alt: 'A search results screen with a schema markup panel and a sitemap diagram beside it.',
    },
  },
  {
    id:          'content-systems',
    title:       'Content & growth systems',
    indexLabel:  'Content',
    description: 'A blog and content pipeline that keeps ranking and getting cited long after we ship it, not a retainer that stops producing the day you cancel.',
    cta:         'See how we build content systems',
    image: {
      src: '/services/digital-marketing/systems/content-systems.png',
      alt: 'A content calendar and article draft feeding into a write, automate, promote pipeline with a rising growth chart.',
    },
  },
  {
    id:          'paid-local-campaigns',
    title:       'Paid & local campaigns',
    indexLabel:  'Paid & local',
    description: 'Targeted paid campaigns and local SEO tied to one goal: booked jobs and qualified leads, not clicks.',
    cta:         'See how we run paid & local campaigns',
    image: {
      src: '/services/digital-marketing/systems/paid-local-campaigns.png',
      alt: 'An ad card and a phone showing a local map listing with reviews, beside a storefront and a revenue chart.',
    },
  },
]

export default function SolutionSection() {
  const scope = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState(SYSTEMS[0].id)

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    scope.current?.querySelectorAll<HTMLElement>('.service-panel').forEach((panel) => {
      revealFadeUp(panel.querySelectorAll('.service-copy, .service-visual'), { y: 20, trigger: panel })
    })
  })

  // Scroll-spy for the sticky index — panels are tall blocks, so a thin band
  // near the top of the viewport reliably has exactly one crossing it.
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
              Three Systems We Build And Run
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
                <div className="service-visual relative mb-6 aspect-video w-full overflow-hidden border border-(--color-border) bg-(--color-surface)">
                  <Image
                    src={system.image.src}
                    alt={system.image.alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <h3 className="service-copy font-sans text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl">
                  {system.title}
                </h3>
                <p className="service-copy mt-3 max-w-2xl text-body-lg leading-relaxed text-(--color-text-muted)">
                  {system.description}
                </p>
                <div className="service-copy mt-6">
                  <Button href="#marketing-audit" variant="ghost" size="sm" showArrow>
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
