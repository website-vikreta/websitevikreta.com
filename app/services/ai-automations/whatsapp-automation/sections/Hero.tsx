'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { TextLink } from '@/components/ui/TextLink'
import { CALENDLY_URL } from '@/config/site'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import HeroJourneyPhone from '../components/HeroJourneyPhone'
import IntegrationLogoRail from '../components/IntegrationLogoRail'

const STATS = [
  { n: '68+', label: 'client projects shipped' },
  { n: '7 to 14', label: 'days to go live' },
  { n: '98%', label: 'average WhatsApp open rate' },
]

/* Singleton — avoids re-injecting on every render */
const HERO_STYLE_ID = 'wa-hero-styles'
if (typeof document !== 'undefined' && !document.getElementById(HERO_STYLE_ID)) {
  const s = document.createElement('style')
  s.id = HERO_STYLE_ID
  s.textContent = `
    .wa-phone-reveal {
      animation: waPhoneEnter 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both;
    }
    @keyframes waPhoneEnter {
      from { opacity:0; transform:translateY(28px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @media (prefers-reduced-motion:reduce) {
      .wa-phone-reveal { animation:none; }
    }
  `
  document.head.appendChild(s)
}

export default function Hero() {
  const scope = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const proofRef = useRef<HTMLDivElement>(null)

  useGsapSection(scope, () => {
    const heading = headingRef.current
    const sub = subRef.current
    const cta = ctaRef.current
    const proof = proofRef.current
    if (!heading || !sub || !cta || !proof) return
    revealLines(heading, { trigger: null })
    revealFadeUp(sub, { y: 20, delay: 0.35, trigger: null })
    revealFadeUp(cta, { y: 16, delay: 0.5, trigger: null })
    revealFadeUp(proof, { y: 16, delay: 0.65, trigger: null })
  })

  return (
    <section
      ref={scope}
      id="hero"
      className="relative overflow-x-clip"
      style={{
        paddingTop: 'calc(var(--navbar-height) + clamp(3rem, 6vw, 5rem))',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
      aria-label="WhatsApp Commerce Platform for Indian D2C Stores"
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── Left: copy ── */}
          <div>
            <h1
              ref={headingRef}
              className="text-h1 font-bold"
              style={{ marginBottom: '1.5rem', maxWidth: '13ch', lineHeight: 1.0 }}
            >
              Your store on{' '}
              <span style={{ color: 'var(--color-accent)' }}>WhatsApp.</span>{' '}
              Every step of the sale.
            </h1>

            <p
              ref={subRef}
              className="text-body-lg"
              style={{ color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '46ch', marginBottom: '2.5rem' }}
            >
              Abandoned cart recovery, COD order confirmation, order status updates,
              and AI customer support. One platform deployed on your brand and
              connected to your Shopify or WooCommerce store.
            </p>

            <div ref={ctaRef} className="mb-11 flex flex-wrap items-center gap-5">
              <Button href="#whatsapp-demo" variant="primary" size="lg" showArrow>
                Book a Platform Demo
              </Button>
              {CALENDLY_URL && (
                <TextLink href={CALENDLY_URL} external arrow="diagonal">
                  Prefer a call? Schedule one
                </TextLink>
              )}
            </div>

            {/* Proof */}
            <div ref={proofRef}>
              <div className="flex flex-wrap gap-2">
                {STATS.map(({ n, label }) => (
                  <div
                    key={n}
                    className="flex min-w-0 items-baseline gap-1 border border-(--color-border) bg-(--color-surface) px-2.5 py-2 sm:gap-1.5 sm:px-3.5"
                  >
                    <span className="shrink-0 text-[1.05rem] font-extrabold tracking-tight text-(--color-text) sm:text-[1.125rem]">{n}</span>
                    <span className="text-[11px] leading-tight text-(--color-text-muted) sm:text-[13px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: phone demo ── */}
          <div className="wa-phone-reveal mx-auto w-full max-w-[380px] lg:mx-0 lg:max-w-none">
            <HeroJourneyPhone />
          </div>

        </div>

        <div className="mt-14 pt-2 md:mt-16 md:flex md:items-center md:gap-10">
          <p className="mb-4 shrink-0 text-(--color-text-muted) md:mb-0">
            Works with your existing stack
          </p>
          <IntegrationLogoRail />
        </div>
      </div>
    </section>
  )
}
