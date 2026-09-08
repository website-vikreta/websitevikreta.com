'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage } from '@/lib/gsap/reveals'
import { WEB_DEV_SOLUTION } from '../data'

function StructureMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <rect x="16" y="6" width="8" height="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M20 12v4" stroke="currentColor" strokeWidth="1.25" />
      <rect x="8" y="18" width="8" height="6" stroke="currentColor" strokeWidth="1.25" />
      <rect x="16" y="18" width="8" height="6" stroke="currentColor" strokeWidth="1.25" />
      <rect x="24" y="18" width="8" height="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M12 18v-2M20 16v2M28 18v-2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function AdminMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <rect x="12" y="18" width="16" height="14" stroke="currentColor" strokeWidth="1.25" />
      <path d="M16 18v-4a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="20" cy="25" r="2" fill="currentColor" />
    </svg>
  )
}

function SpeedMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path d="M8 28l8-16 6 10 4-6 6 12" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 30h24" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function MobileMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <rect x="8" y="10" width="18" height="14" stroke="currentColor" strokeWidth="1.25" />
      <rect x="24" y="14" width="8" height="16" stroke="currentColor" strokeWidth="1.25" />
      <path d="M26 28h4" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

const NAV_MARKS = [StructureMark, AdminMark, SpeedMark, MobileMark]

export default function SolutionSection() {
  const scope = useRef<HTMLElement>(null)
  const [activeId, setActiveId] = useState(WEB_DEV_SOLUTION.systems[0].id)

  useGsapSection(scope, () => {
    revealLines('#solution-heading', { trigger: scope.current })
    scope.current?.querySelectorAll<HTMLElement>('.service-panel').forEach((panel) => {
      const visual = panel.querySelector<HTMLElement>('.service-image')
      if (visual) revealClipImage(visual, { scale: false, trigger: panel })
      revealFadeUp(panel.querySelectorAll('.service-copy'), { y: 20, trigger: panel })
    })
  })

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
    <section ref={scope} className="border-t border-(--color-border) py-16 md:py-20" aria-labelledby="solution-heading">
      <div className="container">
        <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2
              id="solution-heading"
              className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
            >
              {WEB_DEV_SOLUTION.heading}
            </h2>

            <nav aria-label="What we build" className="mt-8 hidden lg:block">
              <ul className="flex flex-col">
                {WEB_DEV_SOLUTION.systems.map((system, index) => {
                  const isActive = system.id === activeId
                  const Mark = NAV_MARKS[index]

                  return (
                    <li key={system.id}>
                      <a
                        href={`#${system.id}`}
                        aria-current={isActive ? 'true' : undefined}
                        className={`flex items-center gap-3 border-l-2 py-3 pl-4 text-[15px] transition-colors duration-300 ease-out focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text) ${
                          isActive
                            ? 'border-(--color-text) text-(--color-text) [text-shadow:0_0_0.5px_currentColor]'
                            : 'border-(--color-border) text-(--color-text-muted) hover:text-(--color-text)'
                        }`}
                      >
                        <Mark className="size-8 shrink-0" />
                        {system.indexLabel}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="mt-10 flex flex-col gap-20 lg:col-span-8 lg:mt-0 md:gap-24">
            {WEB_DEV_SOLUTION.systems.map((system) => (
              <article key={system.id} id={system.id} className="service-panel scroll-mt-32">
                <div className="service-image relative mb-6 overflow-hidden border border-(--color-border) bg-(--color-surface)">
                  <Image
                    src={system.image.src}
                    alt={system.image.alt}
                    width={system.image.width}
                    height={system.image.height}
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
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
