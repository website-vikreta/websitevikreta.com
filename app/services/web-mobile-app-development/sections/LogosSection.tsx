/**
 * Sits directly under Hero — proof of scale up front, before the
 * pain/impact narrative starts. Was at the bottom of ProofSection; moved
 * here per explicit ask. A local, larger-logo adaptation via
 * `InfiniteSlider` directly (fully size/color-agnostic already) rather than
 * `components/ui/logo-cloud-3.tsx`, whose `h-6/h-8` sizing is baked into the
 * component — same "copy, don't mutate the shared scaffold" precedent as
 * ProofSection/TestimonialsSection this session. Sized (`h-14…h-20` + a
 * 64px gap) so roughly 5-6 logos sit in view at once at typical desktop
 * container width, not the whole strip crammed small.
 */

import { InfiniteSlider } from '@/components/ui/infinite-slider'

const LOGOS = [
  { src: '/client-logos/ambrosia.svg', alt: 'Ambrosia' },
  { src: '/client-logos/ap-cleanco.svg', alt: 'AP Cleanco' },
  { src: '/client-logos/archmodal.svg', alt: 'Archmodal' },
  { src: '/client-logos/blancora.svg', alt: 'Blancora' },
  { src: '/client-logos/boompanda.png', alt: 'Boom Panda' },
  { src: '/client-logos/budget-renovations.svg', alt: 'Budget Renovations' },
  { src: '/client-logos/champion-lenders.svg', alt: 'Champion Lenders' },
  { src: '/client-logos/cozmo-realty.svg', alt: 'Cozmo Realty' },
  { src: '/client-logos/katalyst.png', alt: 'Katalyst Consulting' },
  { src: '/client-logos/limra-events.png', alt: 'Limra Events' },
  { src: '/client-logos/raicoon.svg', alt: 'Raicoon' },
  { src: '/client-logos/simpli-home.svg', alt: 'Simpli Home' },
  { src: '/client-logos/sr-design-hub.svg', alt: 'SR Design Hub' },
  { src: '/client-logos/strandzboost.svg', alt: 'Strandzboost' },
  { src: '/client-logos/sustainable-bitcoin-protocol.svg', alt: 'Sustainable Bitcoin Protocol' },
  { src: '/client-logos/tocal.svg', alt: 'Tocal' },
  { src: '/client-logos/workik.svg', alt: 'Workik' },
]

export default function LogosSection() {
  return (
    <section className="pb-16 md:pb-20" aria-label="Teams we've built for">
      <div className="container">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.12em] text-(--color-text-faint) md:text-left">
          Teams we&rsquo;ve built for
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <InfiniteSlider gap={64} duration={30}>
            {LOGOS.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className="pointer-events-none h-14 w-auto select-none opacity-70 grayscale transition-opacity duration-300 hover:opacity-100 sm:h-16 md:h-20"
              />
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  )
}
