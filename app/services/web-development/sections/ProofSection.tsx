'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'
import { trackLinkClick } from '@/lib/analytics'
import { WEB_DEV_PROOF_CARDS, WEB_DEV_PROOF_COPY } from '../data'

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 16, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="proof"
      className="scroll-mt-32 border-t border-b border-(--color-border) py-16 md:py-20"
      aria-labelledby="proof-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="proof-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            {WEB_DEV_PROOF_COPY.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-l border-(--color-border) md:grid-cols-3">
          {WEB_DEV_PROOF_CARDS.map((card) => (
            <article
              key={card.id}
              className="proof-card border-r border-b border-(--color-border) p-6 md:p-8"
            >
              <p className="font-mono text-2xl font-bold leading-none text-(--color-accent) md:text-3xl">
                {card.label}
              </p>
              <span
                className="mt-3 block h-px w-8 origin-left bg-(--color-accent)"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-xl font-bold text-(--color-text)">{card.title}</h3>

              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkClick(card.href, 'web_dev_proof_section')}
                className="group/thumb mt-5 block overflow-hidden border border-(--color-border) bg-(--color-bg-muted) focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--color-text)"
              >
                <div className="relative aspect-video">
                  {card.thumbnail.kind === 'logo' ? (
                    <div className="flex size-full items-center justify-center p-10">
                      <div className="flex h-14 w-[65%] items-center justify-center">
                        <Image
                          src={card.thumbnail.src}
                          alt={card.thumbnail.alt}
                          width={0}
                          height={56}
                          unoptimized
                          className="h-full w-full object-contain grayscale opacity-60 transition-all duration-300 ease-out group-hover/thumb:grayscale-0 group-hover/thumb:opacity-100"
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={card.thumbnail.src}
                      alt={card.thumbnail.alt}
                      fill
                      className="object-cover object-top transition-transform duration-300 ease-out group-hover/thumb:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <span className="absolute right-3 top-3 flex size-8 items-center justify-center border border-(--color-border) bg-(--color-surface)/90 text-(--color-text) opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100">
                    <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                </div>
                <span className="sr-only">Visit {card.title} website</span>
              </a>

              {card.stat ? (
                <p className="mt-4 font-mono text-4xl font-bold leading-none tracking-[-0.05em] text-(--color-text) md:text-5xl">
                  {card.stat}
                </p>
              ) : card.skills ? (
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-(--color-text-muted)">
                  {card.skills}
                </p>
              ) : null}
              <div className="my-6 h-px bg-(--color-border)" />
              <p className="text-body-lg font-bold leading-snug text-(--color-text)">{card.catchphrase}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
