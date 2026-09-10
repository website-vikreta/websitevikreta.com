'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { CALENDLY_URL } from '@/config/site'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'
import PhoneDemo from '../components/PhoneDemo'

const INTEGRATIONS = ['Shopify', 'WooCommerce', 'Razorpay', 'PayU', 'Meta Ads', 'Google Sheets']

/* Singleton style — avoids re-injecting on every render */
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
    revealFadeUp(sub,   { y: 18, delay: 0.35, trigger: null })
    revealFadeUp(cta,   { y: 18, delay: 0.5,  trigger: null })
    revealFadeUp(proof, { y: 14, delay: 0.65, trigger: null })
  })

  return (
    <section
      ref={scope}
      className="relative overflow-x-clip"
      style={{
        paddingTop: 'calc(var(--navbar-height) + clamp(3rem, 6vw, 5rem))',
        paddingBottom: 'clamp(3rem, 6vw, 5rem)',
      }}
      aria-label="WhatsApp Commerce Platform"
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-[clamp(2.5rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">

          {/* ── Left: copy ── */}
          <div>
            <p className="text-meta-label mb-5 font-medium uppercase tracking-widest text-(--color-text-faint)">
              WhatsApp Commerce Platform
            </p>

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
              Cart recovery, COD confirmation, order updates, AI support — one
              platform deployed on your brand and wired into your store.
            </p>

            <div
              ref={ctaRef}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2.75rem' }}
            >
              <Button href="#whatsapp-demo" variant="primary" size="lg" showArrow>
                Book a Platform Demo
              </Button>
              {CALENDLY_URL && (
                <Button href={CALENDLY_URL} external variant="ghost" size="lg" showArrow>
                  Schedule a Call
                </Button>
              )}
            </div>

            {/* Stats + integrations */}
            <div ref={proofRef}>
              {/* Stat chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {[
                  { n: '68+', label: 'projects shipped' },
                  { n: '7–14', label: 'days to go live' },
                  { n: '98%', label: 'WhatsApp read rate' },
                ].map(({ n, label }) => (
                  <div
                    key={n}
                    style={{
                      display: 'flex', alignItems: 'baseline', gap: '6px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                      padding: '8px 14px',
                      background: 'var(--color-surface)',
                    }}
                  >
                    <span style={{ fontSize: '1.125rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-text)' }}>{n}</span>
                    <span style={{ fontSize: '13px', color: 'var(--color-text-faint)' }}>{label}</span>
                  </div>
                ))}
              </div>

              {/* Integration chips */}
              <p style={{ fontSize: '12px', color: 'var(--color-text-faint)', marginBottom: '10px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Connects to
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {INTEGRATIONS.map(name => (
                  <span
                    key={name}
                    style={{
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: 'var(--color-text-muted)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      padding: '4px 10px',
                      background: 'var(--color-bg-muted)',
                    }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: phone demo (CSS-only entrance — singleton style above) ── */}
          <div className="wa-phone-reveal mx-auto w-full lg:mx-0">
            <PhoneDemo />
          </div>

        </div>
      </div>
    </section>
  )
}
