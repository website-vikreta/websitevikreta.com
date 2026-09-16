'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { WEB_PROJECTS } from '@/lib/work-data'
import { ExternalProjectLink } from '@/components/sections/work/CaseStudyCard'
import { SlopeProjectGrid } from '@/components/sections/work/SlopeProjectGrid'

export function WorkWebsitesSection() {
  return (
    <section
      id="websites"
      className="relative py-16 md:py-20"
      aria-label="Selected Websites"
    >
      <div className="container">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <RevealText as="h2" className="text-h2 font-bold tracking-tight text-(--color-text)">
            Selected websites
          </RevealText>
          <RevealFade className="mt-5" delay={0.1}>
            <p className="text-body-lg leading-relaxed text-(--color-text-muted)">
              Marketing sites and product pages we&apos;ve built for clients across e-commerce,
              consulting, architecture, and engineering.
            </p>
          </RevealFade>
        </div>

        <SlopeProjectGrid
          items={WEB_PROJECTS.map((project, index) => (
            <RevealFade key={project.slug} delay={(index % 3) * 0.08}>
              <ExternalProjectLink
                title={project.title}
                description={project.description}
                href={project.href}
                logo={project.logo}
                skills={project.skills}
                className="h-full"
              />
            </RevealFade>
          ))}
        />
      </div>
    </section>
  )
}
