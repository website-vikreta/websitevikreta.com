'use client'

/**
 * Three systems as a tabbed slider: tabs on the left, one panel on the right.
 * Autoplays (a GSAP tween fills the active tab's progress bar, then advances)
 * and pauses on hover/focus. All three panels stay in the DOM (inactive ones
 * `hidden`) so every system's copy is crawlable and images switch instantly.
 */

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, prefersReducedMotion, STAGGER, EASE } from '@/lib/gsap/reveals'

const SLIDE_SECONDS = 7

interface System {
  id:          string
  title:       string
  /** Short label for the sticky index — the full title is too long to scan there. */
  indexLabel:  string
  description: string
  cta:         string
  /** What the work covers — four points per system so the panels stay consistent. */
  points?:     { title: string; body: string }[]
  image:       { src: string; alt: string }
}

const SYSTEMS: System[] = [
  {
    id:          'seo-geo-foundations',
    title:       'SEO & GEO foundations',
    indexLabel:  'SEO & GEO',
    description: 'Technical SEO, structured content, and schema markup so you rank in Google and get cited when people ask AI for a recommendation.',
    cta:         'See how we approach SEO & GEO',
    points: [
      { title: 'Technical SEO',     body: 'Page speed, crawl errors, broken links, and indexing, fixed before new content goes live.' },
      { title: 'Schema markup',     body: 'Structured data for your services, locations, prices, and FAQs.' },
      { title: 'Answer-first pages', body: 'Built around the questions customers type into Google and ask ChatGPT.' },
      { title: 'Local consistency', body: 'The same name, address, phone, and hours on Google Business Profile and every directory.' },
    ],
    image: {
      src: '/services/digital-marketing/systems/seo-geo-foundations.webp',
      alt: 'A search results screen with a schema markup panel and a sitemap diagram beside it.',
    },
  },
  {
    id:          'content-systems',
    title:       'Content & growth systems',
    indexLabel:  'Content',
    description: 'A blog and content pipeline that keeps ranking and getting cited long after we ship it, not a retainer that stops producing the day you cancel.',
    cta:         'See how we build content systems',
    points: [
      { title: 'Topic clusters',      body: 'A blog plan grouped around the services you sell, not random posts.' },
      { title: 'Service page copy',   body: 'Pages that answer what buyers ask before they call.' },
      { title: 'Content refresh',     body: 'Old pages updated so they keep ranking instead of slipping.' },
      { title: 'Guides and checklists', body: 'Useful downloads that turn readers into leads.' },
    ],
    image: {
      src: '/services/digital-marketing/systems/content-systems.webp',
      alt: 'A content calendar and article draft feeding into a write, automate, promote pipeline with a rising growth chart.',
    },
  },
  {
    id:          'paid-local-campaigns',
    title:       'Paid & local campaigns',
    indexLabel:  'Paid & local',
    description: 'Targeted paid campaigns and local SEO tied to one goal: booked jobs and qualified leads, not clicks.',
    cta:         'See how we run paid & local campaigns',
    points: [
      { title: 'Campaign setup',      body: 'Keywords and audiences picked for buyers, not browsers.' },
      { title: 'Matching landing pages', body: 'Each ad sends people to a page built for that one offer.' },
      { title: 'Retargeting',         body: 'Reaching people who visited but didn’t call yet.' },
      { title: 'Budget by cost per lead', body: 'Spend moves to whatever brings leads in cheapest.' },
    ],
    image: {
      src: '/services/digital-marketing/systems/paid-local-campaigns.webp',
      alt: 'An ad card and a phone showing a local map listing with reviews, beside a storefront and a revenue chart.',
    },
  },
]

export default function SolutionSection() {
  const scope = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    revealFadeUp('.sys-reveal', { y: 20, stagger: STAGGER.base, trigger: scope.current })
  })

  const tween = useRef<gsap.core.Tween | null>(null)

  // New slide: fade the panel in and start filling its tab's progress bar;
  // when the bar is full, move on. Reduced motion: no autoplay.
  useEffect(() => {
    const root = scope.current
    if (!root || prefersReducedMotion()) return
    const panel = root.querySelector(`#${SYSTEMS[active].id}`)
    if (panel) gsap.fromTo(panel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: EASE.out })
    const bar = root.querySelector('.sys-progress')
    tween.current = gsap.fromTo(bar, { scaleX: 0 }, {
      scaleX: 1, duration: SLIDE_SECONDS, ease: 'none',
      onComplete: () => setActive((i) => (i + 1) % SYSTEMS.length),
    })
    return () => { tween.current?.kill() }
  }, [active])

  useEffect(() => {
    if (paused) tween.current?.pause()
    else tween.current?.resume()
  }, [paused])

  return (
    <section
      ref={scope}
      id="systems"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="solution-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="solution-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
            Three Systems We Build And Run
          </h2>
          <p className="sys-reveal mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
            Each one works on its own. Together they cover how people find you,
            what they read, and what makes them call.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Tabs */}
          <div role="tablist" aria-label="Systems" className="sys-reveal grid grid-cols-3 gap-2 lg:col-span-4 lg:flex lg:flex-col lg:gap-3">
            {SYSTEMS.map((system, i) => {
              const on = i === active
              return (
                <button
                  key={system.id}
                  id={`tab-${system.id}`}
                  role="tab"
                  type="button"
                  aria-selected={on}
                  aria-controls={system.id}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden border p-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text) lg:p-5 ${
                    on ? 'border-(--color-text) bg-(--color-surface)' : 'border-(--color-border) hover:border-(--color-border-strong)'
                  }`}
                >
                  <span className={`block font-mono text-xs ${on ? 'text-(--color-text)' : 'text-(--color-text-faint)'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`mt-1 block text-sm font-bold leading-snug lg:mt-2 lg:text-xl ${on ? 'text-(--color-text)' : 'text-(--color-text-muted)'}`}>
                    <span className="lg:hidden">{system.indexLabel}</span>
                    <span className="hidden lg:inline">{system.title}</span>
                  </span>
                  {/* Progress: its animation end advances the slider */}
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-(--color-bg-muted)">
                    {on && <span key={active} className="sys-progress block h-full origin-left bg-(--color-accent)" />}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Panels */}
          <div className="lg:col-span-8">
            {SYSTEMS.map((system, i) => (
              <article
                key={system.id}
                id={system.id}
                role="tabpanel"
                aria-labelledby={`tab-${system.id}`}
                hidden={i !== active}
                className="sys-panel"
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-(--color-border) bg-(--color-surface)">
                    <Image
                      src={system.image.src}
                      alt={system.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold leading-[1.1] text-(--color-text) sm:text-3xl">{system.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-(--color-text-muted)">{system.description}</p>
                    {system.points && (
                      <ul className="mt-6 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                        {system.points.map((point) => (
                          <li key={point.title} className="border-t border-(--color-border) py-3">
                            <h4 className="text-sm font-bold text-(--color-text)">{point.title}</h4>
                            <p className="mt-1 text-xs leading-relaxed text-(--color-text-muted)">{point.body}</p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6">
                      <Button href="#marketing-audit" variant="ghost" size="sm" showArrow>
                        {system.cta}
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
