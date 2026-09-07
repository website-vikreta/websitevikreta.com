'use client'

import { useRef } from 'react'
import {
  revealLines,
  revealFadeUp,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

const PAINS = [
  {
    stat: '70%',
    title: 'Carts are being abandoned',
    line: 'Seven in ten checkouts never complete. That revenue is still recoverable if you reach buyers where they actually read messages.',
  },
  {
    stat: '5 to 8%',
    title: 'Email recovery is not working',
    line: 'Cart recovery emails land in Promotions. Open rates sit around 20%. WhatsApp inverts that. Messages get read.',
  },
  {
    stat: 'Hours',
    title: 'Your team is chasing manually',
    line: 'Leads in a sheet, orders in Shopify, replies in WhatsApp. Someone on your team is copy-pasting between all three.',
  },
]

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#pain-heading', { trigger: scope.current })
    revealFadeUp('.pain-card', {
      y: 24,
      stagger: STAGGER.base,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="pain"
      className="py-16 md:py-20"
      aria-labelledby="pain-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="pain-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            You are losing buyers you already paid to acquire
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {PAINS.map(({ stat, title, line }) => (
            <article
              key={title}
              className="pain-card border border-(--color-border) bg-(--color-surface) p-6 md:p-8"
            >
              <p className="font-sans text-4xl font-bold tracking-tight text-(--color-accent) md:text-5xl">
                {stat}
              </p>
              <h3 className="mt-4 font-sans text-xl font-bold leading-tight text-(--color-text)">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--color-text-muted)">
                {line}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
