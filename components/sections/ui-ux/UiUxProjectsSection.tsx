'use client'

import { useRef } from 'react'
import { ExternalProjectLink } from '@/components/sections/work/CaseStudyCard'
import { SlopeProjectGrid } from '@/components/sections/work/SlopeProjectGrid'
import { revealFadeUp, revealLines, useGsapSection, STAGGER } from '@/lib/gsap/reveals'
import { UI_UX_FEATURED_PROJECTS, UI_UX_PROJECTS_COPY } from '@/app/services/uiux-design/data'

export function UiUxProjectsSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#uiux-projects-heading', { trigger: scope.current })
    revealFadeUp('.uiux-project-card', { y: 16, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} id="proof" className="py-8 sm:py-10 md:py-12 2xl:py-20" aria-labelledby="uiux-projects-heading">
      <div className="container">
        <header className="mb-4 max-w-2xl md:mb-5 2xl:mb-8">
          <h2 id="uiux-projects-heading" className="text-xl sm:text-2xl md:text-3xl 2xl:text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            {UI_UX_PROJECTS_COPY.heading}
          </h2>
        </header>

        <SlopeProjectGrid
          items={UI_UX_FEATURED_PROJECTS.map((card) => (
            <div key={card.id} className="uiux-project-card h-full">
              <ExternalProjectLink
                title={card.title}
                description={card.catchphrase}
                href={card.href}
                logo=""
                image={card.thumbnail.src}
                imageAlt={card.thumbnail.alt}
                skills={card.skills}
                className="h-full"
              />
            </div>
          ))}
        />
      </div>
    </section>
  )
}
