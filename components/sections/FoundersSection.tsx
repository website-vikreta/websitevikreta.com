'use client'

import { RevealText, RevealFade } from '@/components/ui/Reveal'
import Image from 'next/image'

const FOUNDERS = [
  {
    id: 1,
    name: 'Founder Name 1',
    role: 'Co-Founder & CEO',
    image: '/images/founder-1.png',
  },
  {
    id: 2,
    name: 'Founder Name 2',
    role: 'Co-Founder & CTO',
    image: '/images/founder-2.png',
  },
]

export function FoundersSection() {
  return (
    <section className="relative py-16 md:py-20 bg-(--color-bg-muted)" aria-label="Founders">
      <div className="container">
        <div className="mb-10 md:mb-14">
          <RevealText>
            <span className="text-meta-label font-bold uppercase tracking-(--tracking-meta) text-(--color-text-faint) block mb-4">
              Meet the Founders
            </span>
          </RevealText>
          <RevealText>
            <h2 className="text-h2 font-bold text-(--color-text) mb-4">
              Unveiling the Minds Behind the Strategy
            </h2>
          </RevealText>
          <RevealFade delay={0.2}>
            <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body) max-w-2xl">
              What began as two visionaries has evolved into a powerful community of creators.
            </p>
          </RevealFade>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {FOUNDERS.map((founder, index) => (
            <RevealFade key={founder.id} delay={0.3 + index * 0.1}>
              <div className="group">
                <div className="relative aspect-[3/4] bg-(--color-bg-muted) border border-(--color-border) rounded-sm overflow-hidden mb-4 transition-all duration-300 group-hover:border-(--color-border-strong)">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-(--color-text) mb-2">
                  {founder.name}
                </h3>
                <p className="text-body text-(--color-text-muted)">
                  {founder.role}
                </p>
              </div>
            </RevealFade>
          ))}
        </div>
      </div>
    </section>
  )
}
