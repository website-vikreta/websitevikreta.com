'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import { cn } from '@/lib/utils'
import { trackLinkClick } from '@/lib/analytics'
import { PROJECTS } from '../data'

export default function ProjectsSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#work-heading', { trigger: scope.current })
    // Per-card triggers, not one section trigger: the columns are offset and the
    // grid is taller than the viewport, so a single trigger would burn the
    // reveal on cards nobody has scrolled to yet.
    scope.current?.querySelectorAll<HTMLElement>('.project-card').forEach((card) => {
      revealFadeUp(card, { y: 24, trigger: card })
    })
  })

  const columnCount = 3
  const projectColumns = Array.from({ length: columnCount }, (_, colIndex) =>
    PROJECTS.filter((_, i) => i % columnCount === colIndex)
  )

  return (
    <section ref={scope} id="work" className="py-16 md:py-20" aria-labelledby="work-heading">
      <div className="container">

        <h2 id="work-heading" className="text-h2 font-bold mb-12">
          Solutions We&rsquo;ve Delivered
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectColumns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={cn(
                'flex flex-col gap-8',
                colIndex === 1 && 'lg:mt-12',
                colIndex === 2 && 'lg:mt-24',
              )}
            >
              {column.map((project) => {
                return (
                  <a
                    key={project.id}
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackLinkClick(project.href, 'web_development_projects')}
                    className="project-card group block border border-(--color-border) bg-(--color-surface) p-3"
                  >
                    <div className="relative flex w-full aspect-video items-center justify-center overflow-hidden bg-(--color-bg-muted)">
                      <div className="flex size-full items-center justify-center p-10">
                        {project.logo ? (
                          <div className="flex h-14 w-[65%] items-center justify-center">
                            <Image
                              src={project.logo}
                              alt={`${project.title} logo`}
                              width={0}
                              height={56}
                              unoptimized
                              className="h-full w-full object-contain grayscale opacity-60 transition-all duration-300 ease-out group-hover:grayscale-0 group-hover:opacity-100"
                            />
                          </div>
                        ) : (
                          <span className="text-center font-bold text-lg text-(--color-text-muted) transition-colors duration-300 ease-out group-hover:text-(--color-text)">
                            {project.title}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="mt-4 font-bold text-lg text-(--color-text)">{project.title}</h3>
                    <p className="mt-1 text-sm text-neutral-500">{project.description}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-[1rem] font-medium text-(--color-text)">
                      <span className="relative">
                        Visit site
                        <span className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-(--color-text) transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </span>
                      <ArrowUpRight size={14} strokeWidth={1.75} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </a>
                )
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
