'use client'

/**
 * Sticky chapter index + panels — same interaction pattern as
 * app/services/web-mobile-app-development/sections/SolutionSection.tsx,
 * each panel paired with an image using the same revealClipImage treatment.
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
    id:          'research-flows',
    title:       'Research & UX flows',
    indexLabel:  'Research & flows',
    description:
      'Interviews, competitor teardowns, and user flows mapped before a single screen gets styled. We find out where people actually get stuck first.',
    cta:         'See how we scope research',
    image: {
      src: '/services/research-ux-flows.webp',
      alt: 'A user interview, a user-flow map with sticky notes, an information-architecture tree, and a heatmap review, laid out as one research process',
    },
  },
  {
    id:          'design-systems',
    title:       'Visual design systems',
    indexLabel:  'Design systems',
    description:
      'A component library in Figma, not a one-off set of screens: type, color, spacing, and states your team can reuse without re-deciding them each time.',
    cta:         'See how systems hold up',
    image: {
      src: '/services/visual-design-systems.webp',
      alt: 'A Figma design system panel showing a color palette, type scale, spacing grid, and button/input/toggle component states',
    },
  },
  {
    id:          'prototyping-handoff',
    title:       'Prototyping & handoff',
    indexLabel:  'Prototyping',
    description:
      'Clickable prototypes you can test with real users before a line of code gets written, then dev-ready specs so build doesn’t reinterpret the design.',
    cta:         'See what handoff looks like',
    image: {
      src: '/services/prototyping-handoff.webp',
      alt: 'A clickable mobile-screen prototype flow next to a developer handoff panel with spacing specs and exported code',
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

  // Scroll-spy for the sticky index — same technique as the Apps/CRM version:
  // panels are tall blocks, so a thin band near the top of the viewport
  // reliably has exactly one crossing it.
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
          <div className="mt-10 flex flex-col gap-16 lg:col-span-8 lg:mt-0 md:gap-20">
            {SYSTEMS.map((system) => (
              <article key={system.id} id={system.id} className="service-panel scroll-mt-32">
                <div className="service-image relative mb-6 overflow-hidden border border-(--color-border) bg-(--color-surface)">
                  <Image
                    src={system.image.src}
                    alt={system.image.alt}
                    width={1448}
                    height={1086}
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
