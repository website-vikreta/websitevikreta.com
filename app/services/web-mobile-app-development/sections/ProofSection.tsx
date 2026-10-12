'use client'

/**
 * Proof cards are now the exact same component web-development's
 * ProofSection uses — `ExternalProjectLink` inside a `SlopeProjectGrid` —
 * per explicit ask, same as testimonials reusing `WorkTestimonialsSection`.
 * Not every section on this page needs different UI, only where asked.
 * The client-logo marquee that used to sit below these cards moved to
 * `LogosSection.tsx`, directly under Hero — see that file.
 */

import { useRef } from 'react'
import { ExternalProjectLink } from '@/components/sections/work/CaseStudyCard'
import { SlopeProjectGrid } from '@/components/sections/work/SlopeProjectGrid'
import { useGsapSection, revealLines, revealFadeUp, STAGGER } from '@/lib/gsap/reveals'

// Real client sites with real homepage screenshots (not the generic
// service-illustration images WEB_PROJECTS uses elsewhere) — same assets
// web-development/proof/ already ships.
const PROOF_ITEMS = [
  {
    slug: 'tocal',
    title: 'Tocal',
    description: 'A sleek product site for DbyT Dynamics with a clean, modern presentation.',
    href: 'https://tocal.in/',
    logo: '/client-logos/tocal.svg',
    image: '/services/web-development/proof/tocal.webp',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
  },
  {
    slug: 'sustainable-bitcoin-protocol',
    title: 'Sustainable Bitcoin Protocol',
    description: 'The public site for a protocol that needed to read as credible to institutional users.',
    href: 'https://www.sustainablebtc.org/',
    logo: '/client-logos/sustainable-bitcoin-protocol.svg',
    image: '/services/web-development/proof/sustainable-bitcoin-protocol.webp',
    skills: 'UI/UX DESIGN / DESIGN SYSTEM',
  },
  {
    slug: 'ap-cleanco',
    title: 'AP Cleanco',
    description: 'A local service business taken from no web presence at all to a site built to convert.',
    href: 'https://apcleanco.com/',
    logo: '/client-logos/ap-cleanco.svg',
    image: '/services/web-development/proof/ap-cleanco.webp',
    skills: 'WEB DEVELOPMENT / LOCAL SEO',
  },
  {
    slug: 'archmodal',
    title: 'Archmodal',
    description: 'A polished home page for an architectural modeling and design studio.',
    href: 'https://www.archmodal.com/',
    logo: '/client-logos/archmodal.svg',
    image: '/services/web-development/proof/archmodal.webp',
    skills: 'UI/UX DESIGN / WEB DEVELOPMENT',
  },
  {
    slug: 'earth-by-blancora',
    title: 'Earth by Blancora',
    description: "A sustainable e-commerce storefront for a women's clothing brand.",
    href: 'https://blancoraclothing.com/shop',
    logo: '/client-logos/blancora.svg',
    image: '/services/web-development/proof/earth-by-blancora.webp',
    skills: 'UI/UX DESIGN / E-COMMERCE DEVELOPMENT',
  },
]

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading', { trigger: scope.current })
    revealFadeUp('.proof-card', { y: 16, stagger: STAGGER.base, trigger: scope.current })
  })

  return (
    <section ref={scope} className="py-16 md:py-20 bg-(--color-surface)" aria-labelledby="proof-heading">
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="proof-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            What We&rsquo;ve Built
          </h2>
        </div>

        <SlopeProjectGrid
          items={PROOF_ITEMS.map((item) => (
            <div key={item.slug} className="proof-card h-full">
              <ExternalProjectLink
                title={item.title}
                description={item.description}
                href={item.href}
                logo={item.logo}
                image={item.image}
                imageAlt={`${item.title} website preview`}
                skills={item.skills}
                className="h-full"
              />
            </div>
          ))}
        />
      </div>
    </section>
  )
}
