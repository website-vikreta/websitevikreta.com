'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, revealClipImage, STAGGER } from '@/lib/gsap/reveals'

interface FixCard {
  title:       string
  description: string
  cta:         string
  image:       string
  stat?:       { from: string; to: string }
}

const FIX_CARDS: FixCard[] = [
  {
    title:       'Bulk content and workflow automation',
    description: 'The repetitive production work your team does by hand. We turn a spreadsheet and a template into a system anyone can run.',
    cta:         'See how we cut a 20-hour job to 1',
    image:       '/images/careers-banner.png',
    stat:        { from: '20h', to: '1h' },
  },
  {
    title:       'AI product visuals and UGC',
    description: 'Product content without the studio, the models, or the two-week wait. Your real product, any setting, production quality.',
    cta:         'See what a shoot costs now',
    image:       '/images/careers-banner.png',
  },
  {
    title:       'WhatsApp AI agents',
    description: 'A customer assistant that sounds like your team and actually does things: payment links, live tracking, returns, all in the chat.',
    cta:         'See how it works',
    image:       '/images/careers-banner.png',
  },
]

export default function FixesSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#fix-heading', { trigger: scope.current })
    revealFadeUp('.fix-card', { y: 0, stagger: STAGGER.base, trigger: scope.current })
    scope.current
      ?.querySelectorAll<HTMLElement>('.fix-card-image')
      .forEach((el) => revealClipImage(el, { scale: false, trigger: el }))
  })

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="fix-heading">
      <div className="container">

        <div className="mb-10 md:mb-14 max-w-2xl">
          <h2 id="fix-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            Three Things We Fix Most Often
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-(--color-border)">
          {FIX_CARDS.map((card) => (
            <article
              key={card.title}
              className="fix-card group flex h-full flex-col border-r border-b border-(--color-border) bg-(--color-surface) p-6 sm:p-8 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-(--color-border-strong)"
            >
              <div className="fix-card-image relative w-full aspect-video mb-6 overflow-hidden bg-(--color-bg-muted)">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {card.stat && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-(--color-text) px-3 py-1.5">
                    <span className="text-sm font-bold text-(--color-bg) line-through decoration-2">
                      {card.stat.from}
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-(--color-accent) shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-bold text-(--color-bg)">
                      {card.stat.to}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text)">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-(--color-text-muted)">
                {card.description}
              </p>

              <div className="mt-6">
                <Button href="#book-audit" variant="ghost" size="sm" showArrow>
                  {card.cta}
                </Button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
