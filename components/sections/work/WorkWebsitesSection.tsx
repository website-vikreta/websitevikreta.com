'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { WEB_PROJECTS } from '@/lib/work-data'
import { ExternalProjectLink } from '@/components/sections/CaseStudyCard'

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

        <div className="grid grid-cols-1 border-t border-l border-(--color-border) md:grid-cols-2 lg:grid-cols-3">
          {WEB_PROJECTS.map((project, index) => (
            <RevealFade
              key={project.slug}
              delay={(index % 3) * 0.08}
              className="border-r border-b border-(--color-border)"
            >
              <ExternalProjectLink
                title={project.title}
                description={project.description}
                href={project.href}
                image={project.image}
                skills={project.skills}
                className="h-full"
              />
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
