'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const COD_STEPS = [
  {
    n: '01',
    title: 'Order comes in',
    body: 'A COD order lands on Shopify or WooCommerce. We pick it up immediately — no manual trigger needed.',
  },
  {
    n: '02',
    title: 'Customer gets a WhatsApp',
    body: "Their name, product, amount, two buttons — yes or no. Nothing to type. Most answer inside an hour.",
  },
  {
    n: '03',
    title: 'You ship the confirmed ones',
    body: 'Yes moves the order to dispatch. No cancels it in your store. 24 hours of silence cancels too. You touch nothing.',
  },
]

const TIMELINE = [
  { at: 'Under 5 min', title: 'Message goes out',    body: 'Order lands, we send it. No one on your team does anything.' },
  { at: '3 hours',     title: 'One reminder',         body: 'Same message, once. We do not chase past this.' },
  { at: '24 hours',    title: 'Order cancels itself', body: 'Silence is a no. It never reaches your packing table.' },
]

/* ── Singleton keyframes for the timeline ── */
const TL_STYLE_ID = 'wa-cod-timeline-styles'
if (typeof document !== 'undefined' && !document.getElementById(TL_STYLE_ID)) {
  const s = document.createElement('style')
  s.id = TL_STYLE_ID
  s.textContent = `
    .wa-cod-line {
      transform: scaleY(0);
      transform-origin: top;
      transition: transform 1400ms cubic-bezier(0.16,1,0.3,1);
    }
    .wa-cod-timeline.wa-shown .wa-cod-line { transform: scaleY(1); }
    .wa-cod-node {
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .wa-cod-timeline.wa-shown .wa-cod-node:nth-child(2) { opacity:1; transform:none; transition-delay:350ms; }
    .wa-cod-timeline.wa-shown .wa-cod-node:nth-child(3) { opacity:1; transform:none; transition-delay:670ms; }
    .wa-cod-timeline.wa-shown .wa-cod-node:nth-child(4) { opacity:1; transform:none; transition-delay:990ms; }
    @media (prefers-reduced-motion:reduce) {
      .wa-cod-line  { transition:none!important; transform:scaleY(1)!important; }
      .wa-cod-node  { opacity:1!important; transform:none!important; transition:none!important; }
    }
  `
  document.head.appendChild(s)
}

export default function ProductRevealSection() {
  const platformScope = useRef<HTMLElement>(null)
  const codScope      = useRef<HTMLElement>(null)
  const timelineRef   = useRef<HTMLOListElement>(null)

  useGsapSection(platformScope, () => {
    revealLines('#reveal-heading',  { trigger: platformScope.current })
    revealFadeUp('.reveal-copy',    { y: 20, trigger: platformScope.current })
    revealClipImage('.reveal-visual', { scale: true, trigger: platformScope.current })
  })

  useGsapSection(codScope, () => {
    revealLines('#cod-heading',  { trigger: codScope.current })
    revealFadeUp('.cod-intro',   { y: 20, trigger: codScope.current })
    revealFadeUp('.cod-step',    { y: 20, stagger: STAGGER.base, trigger: codScope.current })
  })

  /* Timeline scroll observer — useEffect so it never runs on the server */
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('wa-shown'); io.disconnect() } },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* ── Platform overview ── */}
      <section
        ref={platformScope}
        id="product"
        className="scroll-mt-32 py-16 md:py-20"
        aria-labelledby="reveal-heading"
      >
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="reveal-heading"
                className="text-h2 font-bold tracking-tight text-(--color-text)"
                style={{ marginBottom: '1.25rem', lineHeight: 1.05 }}
              >
                Not a chatbot. Your entire business on WhatsApp.
              </h2>
              <p className="reveal-copy text-body-lg leading-relaxed text-(--color-text-muted)">
                Every lead from every channel lands in one CRM. WhatsApp handles
                sales, support, cart recovery, and order tracking. Your store stays
                in sync. Your team works from one dashboard instead of five tabs.
              </p>

              {/* Feature list — replaces the redundant 4-module grid */}
              <ul className="mt-8 space-y-3">
                {[
                  { label: 'Sales & CRM',        detail: 'Every lead from every channel in one place' },
                  { label: 'Cart Recovery',       detail: '3-message sequence, no discount on message one' },
                  { label: 'COD Confirmation',    detail: 'One message before dispatch. Auto-cancel on silence' },
                  { label: 'Order Updates',       detail: 'Confirmed, shipped, delivered — all on WhatsApp' },
                  { label: 'Omni-Channel Inbox',  detail: 'WhatsApp + Instagram + Facebook, one dashboard' },
                ].map(({ label, detail }) => (
                  <li key={label} className="flex items-baseline gap-3">
                    <span
                      aria-hidden
                      style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0, marginTop: '7px' }}
                    />
                    <span>
                      <span className="text-sm font-bold text-(--color-text)">{label}</span>
                      <span className="text-sm text-(--color-text-faint)"> — {detail}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-visual relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
              <Image
                src="/services/whatsapp-commerce-hub.webp"
                alt="All channels feeding into one WhatsApp dashboard: catalog, automation, support, and a unified team inbox."
                width={1448}
                height={1086}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COD confirmation ── */}
      <section
        ref={codScope}
        id="cod-confirmation"
        className="scroll-mt-32 border-y border-(--color-border) bg-(--color-bg-muted) py-16 md:py-20"
        aria-labelledby="cod-heading"
      >
        <div className="container">
          <div className="grid grid-cols-1 items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-2">

            {/* Left */}
            <div>
              <p className="text-meta-label mb-4 font-medium uppercase tracking-widest text-(--color-text-faint)">
                COD Confirmation
              </p>
              <h2
                id="cod-heading"
                className="text-h2 font-bold tracking-tight text-(--color-text)"
                style={{ maxWidth: '14ch', lineHeight: 1.05, marginBottom: '1.5rem' }}
              >
                One message. Before the parcel moves.
              </h2>
              <p
                className="cod-intro text-body-lg leading-relaxed text-(--color-text-muted)"
                style={{ maxWidth: '44ch', marginBottom: '2rem' }}
              >
                Every COD order gets one WhatsApp before it leaves your warehouse.
                Customer taps yes, it ships. Taps no, it cancels itself.
              </p>

              <ol
                className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-(--color-border) bg-(--color-border)"
                style={{ listStyle: 'none' }}
              >
                {COD_STEPS.map(({ n, title, body }) => (
                  <li key={n} className="cod-step bg-(--color-surface) p-6 md:p-7">
                    <span
                      className="font-mono text-xs tracking-widest"
                      style={{ color: '#1a8a5a' }}
                    >
                      {n}
                    </span>
                    <h3 className="mt-3 text-base font-bold tracking-tight text-(--color-text)">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{body}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right — 24h rule + timeline */}
            <div>
              <p className="text-meta-label mb-4 font-medium uppercase tracking-widest text-(--color-text-faint)">
                The rule that does the work
              </p>
              <h2
                className="font-bold tracking-tight text-(--color-text)"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.05, maxWidth: '13ch', marginBottom: '1.25rem' }}
              >
                No answer in 24 hours is an answer.
              </h2>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '44ch' }}>
                Someone who ordered at 2am on impulse won&apos;t reply. Someone with
                a fake number can&apos;t. The person who ordered from three stores
                will only answer one of you.
              </p>

              {/* Timeline */}
              <ol
                ref={timelineRef}
                className="wa-cod-timeline mt-10"
                style={{ position: 'relative', paddingLeft: '44px', listStyle: 'none' }}
              >
                <span
                  aria-hidden="true"
                  className="wa-cod-line"
                  style={{ position: 'absolute', left: '13px', top: '8px', bottom: '24px', width: '1px', background: 'var(--color-border)' }}
                />
                {TIMELINE.map((item, i) => (
                  <li
                    key={item.at}
                    className="wa-cod-node"
                    style={{ position: 'relative', marginBottom: i < TIMELINE.length - 1 ? '32px' : 0 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute', left: '-44px', top: '2px',
                        display: 'grid', height: '27px', width: '27px',
                        placeItems: 'center', borderRadius: '50%',
                        border: `2px solid ${i === TIMELINE.length - 1 ? 'var(--color-text)' : 'var(--color-border)'}`,
                        background: i === TIMELINE.length - 1 ? 'var(--color-text)' : 'var(--color-bg)',
                      }}
                    >
                      <span style={{ height: '8px', width: '8px', borderRadius: '50%', background: i === TIMELINE.length - 1 ? '#25d366' : 'var(--color-text-faint)' }} />
                    </span>
                    <p className="text-meta-label mb-1 font-medium uppercase tracking-widest text-(--color-text-faint)">
                      {item.at}
                    </p>
                    <h3 className="text-base font-bold tracking-tight text-(--color-text)">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '40ch' }}>
                      {item.body}
                    </p>
                  </li>
                ))}
              </ol>

              <p className="mt-8 text-sm leading-relaxed text-(--color-text-faint)" style={{ maxWidth: '42ch' }}>
                Set the window to match your dispatch schedule. Most stores leave it at 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
