'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import Image from 'next/image'

const PHOTOS = [
  {
    id: 1,
    src: '/about/project-review-session.webp',
    alt: 'Website Vikreta team reviewing a client project with students',
    className: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: '/about/student-project-poster-presentation.webp',
    alt: 'Website Vikreta team with students presenting a project poster',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    src: '/about/website-vikreta-team-photo.webp',
    alt: 'Website Vikreta team group photo at the office',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    src: '/about/student-training-session.webp',
    alt: 'Website Vikreta team member leading a student training session',
    className: 'col-span-2 row-span-1',
  },
  {
    id: 5,
    src: '/about/team-workspace.webp',
    alt: 'Website Vikreta team working at their office workspace',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    src: '/about/team-gift-presentation.webp',
    alt: 'Website Vikreta team presenting a gift after a training session',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 7,
    src: '/about/prompt-engineering-workshop.webp',
    alt: 'Website Vikreta team and students at a prompt engineering workshop',
    className: 'col-span-2 row-span-1',
  },
] as const

export function PhotoGallerySection() {
  return (
    <section
      className="relative py-16 md:py-20"
      aria-label="Photo Gallery"
    >
      <div className="container">
        <div className="mb-10 md:mb-14">
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text) mb-4">
              The people and process behind the systems
            </h2>
          </RevealText>
          <RevealFade delay={0.1}>
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body) max-w-2xl">
              Strategy sessions, build sprints, client reviews — this is what the work
              actually looks like between kickoff and launch.
            </p>
          </RevealFade>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[200px]">
          {PHOTOS.map((photo, index) => (
            <RevealFade
              key={photo.id}
              delay={index * 0.1}
              className={photo.className}
            >
              {photo.id === 4 ? (
                <div className="flex h-full w-full gap-3 md:gap-4">
                  <div className="relative h-full w-2/3 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-muted) transition-[border-radius] duration-300 ease-out hover:rounded-none">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 67vw, 33vw"
                    />
                  </div>
                  <div className="relative h-full w-1/3 overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-muted) transition-[border-radius] duration-300 ease-out hover:rounded-none">
                    <Image
                      src="/about/quiz-session-award-presentation.webp"
                      alt="Website Vikreta team presenting an award after a quiz session"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 33vw, 17vw"
                    />
                  </div>
                </div>
              ) : (
                <div className="relative h-full w-full overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-muted) transition-[border-radius] duration-300 ease-out hover:rounded-none">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes={
                      photo.className.includes('col-span-2')
                        ? '(max-width: 768px) 100vw, 50vw'
                        : '(max-width: 768px) 50vw, 25vw'
                    }
                    priority={index === 0}
                  />
                </div>
              )}
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
