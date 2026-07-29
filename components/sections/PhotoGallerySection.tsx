'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import Image from 'next/image'

const PHOTOS = [
  {
    id: 1,
    src: '/images/about1.avif',
    alt: 'Website Vikreta team planning a client automation workflow',
    className: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: '/images/gallery-1.jpg',
    alt: 'Collaborative design session at Website Vikreta',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    src: '/images/peoples_wv.png',
    alt: 'Website Vikreta team',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    src: '/our-services/ai-automation.webp',
    alt: 'AI workflow automation in progress',
    className: 'col-span-2 row-span-1',
  },
  {
    id: 5,
    src: '/our-services/webdevelopment.webp',
    alt: 'Next.js website development workspace',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    src: '/our-services/ui-ux-design.webp',
    alt: 'UI/UX design review session',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 7,
    src: '/our-services/digital-marketing-seo-geo.webp',
    alt: 'Digital marketing and SEO strategy session',
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
              delay={index * 0.08}
              className={photo.className}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-bg-muted) transition-[border-radius] duration-300 ease-out hover:rounded-none">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  priority={index === 0}
                />
              </div>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
