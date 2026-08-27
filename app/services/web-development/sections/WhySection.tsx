'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Users, Clock, LifeBuoy } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage, STAGGER } from '@/lib/gsap/reveals'

const DIFFERENTIATORS = [
  {
    icon:  Users,
    title: 'Real client work, not concepts',
    body:  'Every project above is live today, built for a real business, not a portfolio filler piece.',
  },
  {
    icon:  Clock,
    title: 'Realistic timelines',
    body:  '3 to 6 weeks, start to finish. We give you a timeline we can actually hit, not one that sounds good in a pitch.',
  },
  {
    icon:  LifeBuoy,
    title: 'You own what we build',
    body:  'The code and content are yours from day one, plus support after launch to keep things running.',
  },
]

export default function WhySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.why-heading', { trigger: scope.current })
    revealFadeUp('.why-item', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealClipImage('.why-image', { trigger: '.why-image' })
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-label="Why Website Vikreta">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="max-w-2xl">
            <h2 className="why-heading mb-6 text-h3 font-bold tracking-tight text-(--color-text)">
              Why Website Vikreta
            </h2>

            <ul className="flex flex-col gap-6">
              {DIFFERENTIATORS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="why-item flex gap-4">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-(--color-accent)"
                  />
                  <div>
                    <h3 className="font-sans text-lg font-bold tracking-tight text-(--color-text)">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-body-lg leading-relaxed text-(--color-text-muted)">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="why-image relative order-first aspect-[4/3] w-full self-center overflow-hidden border border-(--color-border) bg-(--color-bg-muted) md:order-last">
            <Image
              src="/services/why-website-vikreta.webp"
              alt="Website Vikreta web development process: discovery, build, launch, and ongoing support"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
