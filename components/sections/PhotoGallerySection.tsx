'use client'

import { RevealText, RevealFade, RevealImage } from '@/components/ui/Reveal'
import Image from 'next/image'

// Spans are chosen so every row sums to 4 on desktop and to 2 on mobile — no
// cell ever has to split itself to fill a gap (the old id=4 nested flex did,
// and on a phone its 1/3 child collapsed to a ~55px sliver).
//
// Desktop (4 cols)      Mobile (2 cols)
// [ 1 ][ 1 ][2][3]      [ 1 ][ 1 ]
// [ 1 ][ 1 ][4][5]      [ 1 ][ 1 ]
// [ 6 ][ 6 ][7][8]      [2][3] · [4][5] · [ 6 ] · [7][8]
const PHOTOS = [
  {
    src: '/about/project-review-session.webp',
    alt: 'Website Vikreta team reviewing a client project with students',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/about/student-project-poster-presentation.webp',
    alt: 'Website Vikreta team with students presenting a project poster',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/about/website-vikreta-team-photo.webp',
    alt: 'Website Vikreta team group photo at the office',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/about/student-training-session.webp',
    alt: 'Website Vikreta team member leading a student training session',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/about/quiz-session-award-presentation.webp',
    alt: 'Website Vikreta team presenting an award after a quiz session',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/about/team-workspace.webp',
    alt: 'Website Vikreta team working at their office workspace',
    span: 'col-span-2 row-span-1',
  },
  {
    src: '/about/team-gift-presentation.webp',
    alt: 'Website Vikreta team presenting a gift after a training session',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/about/prompt-engineering-workshop.webp',
    alt: 'Website Vikreta team and students at a prompt engineering workshop',
    span: 'col-span-1 row-span-1',
  },
] as const

export function PhotoGallerySection() {
  return (
    <section className="relative py-16 md:py-20" aria-label="Photo Gallery">
      <div className="container">
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <RevealText className="max-w-2xl">
            <h2 className="text-h2 font-bold text-(--color-text)">
              The people and process behind the systems
            </h2>
          </RevealText>
          <RevealFade delay={0.1}>
            <p className="text-sm text-(--color-text-muted) md:text-right">
              Between kickoff and launch.
            </p>
          </RevealFade>
        </div>

        {/* Row height is viewport-relative on mobile so a 1×1 cell stays roughly
            square at any phone width; fixed once the grid goes 4-up. */}
        <div className="grid grid-cols-2 auto-rows-[42vw] gap-3 md:grid-cols-4 md:auto-rows-[200px] md:gap-4 lg:auto-rows-[230px]">
          {PHOTOS.map((photo, index) => (
            <RevealFade key={photo.src} delay={index * 0.08} className={photo.span}>
              {/* Square, unframed. `rounded-2xl` (16px) broke the design-system
                  4px radius cap, and the hover radius-morph was an interaction
                  the scroll reveal already covers. */}
              <RevealImage
                delay={index * 0.08}
                className="relative h-full w-full overflow-hidden bg-(--color-bg-muted)"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes={
                    photo.span.includes('col-span-2')
                      ? '(max-width: 768px) 100vw, 50vw'
                      : '(max-width: 768px) 50vw, 25vw'
                  }
                  priority={index === 0}
                />
              </RevealImage>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
