'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { revealLines, revealFadeUp, revealClipImage, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const FEATURES = [
  {
    label: 'WhatsApp CRM',
    detail: 'Every lead from Shopify, Instagram, Meta Ads, and IndiaMART in one unified dashboard',
  },
  {
    label: 'Abandoned Cart Recovery',
    detail: 'Three message WhatsApp sequence sent automatically when a customer drops off at checkout',
  },
  {
    label: 'COD Order Confirmation',
    detail: 'One WhatsApp message before dispatch. Customer confirms or cancels with no manual follow up',
  },
  {
    label: 'Order Status Notifications',
    detail: 'Automated WhatsApp updates for order confirmation, dispatch, and delivery',
  },
  {
    label: 'Omnichannel Inbox',
    detail: 'WhatsApp, Instagram DMs, and Facebook Messenger managed from one team inbox',
  },
]

const COD_STEPS = [
  {
    n: '01',
    title: 'Order received on your storefront',
    body: 'A cash on delivery order drops into your Shopify or WooCommerce backend. Our system detects it instantly without manual input.',
  },
  {
    n: '02',
    title: 'Instant WhatsApp verification',
    body: 'The buyer receives a personalized message with order details and quick reply buttons to confirm or decline the order. No typing needed.',
  },
  {
    n: '03',
    title: 'Approved orders move to fulfillment',
    body: 'A confirmation click instantly tags the order for shipping. A cancellation tap automatically updates your store inventory.',
  },
]

const TIMELINE = [
  { at: 'Under 5 minutes', title: 'Verification message delivered',  body: 'The WhatsApp prompt is sent out as soon as the checkout is completed. Your team does nothing.' },
  { at: '3 hours',         title: 'Automated follow up sent',     body: 'If the buyer has not replied, the system sends one final nudge to get their attention.' },
  { at: '24 hours',        title: 'Order automatically voided', body: 'No response means no shipment. The order is seamlessly cancelled in your system to prevent RTO losses.' },
]

/* Singleton keyframes — safe from re-injection */
const TL_STYLE_ID = 'wa-cod-timeline-styles'
if (typeof document !== 'undefined' && !document.getElementById(TL_STYLE_ID)) {
  const s = document.createElement('style')
  s.id = TL_STYLE_ID
  s.textContent = `
    .wa-cod-line {
      transform: scaleY(0); transform-origin: top;
      transition: transform 1400ms cubic-bezier(0.16,1,0.3,1);
    }
    .wa-cod-timeline.wa-shown .wa-cod-line { transform: scaleY(1); }
    .wa-cod-node { opacity:0; transform:translateY(12px); transition:opacity 0.6s ease, transform 0.6s ease; }
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
    revealLines('#reveal-heading',    { trigger: platformScope.current })
    revealFadeUp('.reveal-copy',      { y: 20, trigger: platformScope.current })
    revealFadeUp('.reveal-feature',   { y: 16, stagger: STAGGER.tight, trigger: platformScope.current })
    revealClipImage('.reveal-visual', { scale: true, trigger: platformScope.current })
  })

  useGsapSection(codScope, () => {
    revealLines('#cod-heading', { trigger: codScope.current })
    revealFadeUp('.cod-intro',  { y: 20, trigger: codScope.current })
    revealFadeUp('.cod-step',   { y: 20, stagger: STAGGER.base, trigger: codScope.current })
  })

  useEffect(() => {
    const el = timelineRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('wa-shown'); io.disconnect() } },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <>
      {/* ── Platform overview ── */}
      <section ref={platformScope} id="product" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="reveal-heading">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2
                id="reveal-heading"
                className="text-h2 font-bold tracking-tight text-(--color-text)"
                style={{ marginBottom: '1.25rem', lineHeight: 1.05 }}
              >
                Not a chatbot. Your entire WhatsApp commerce stack.
              </h2>
              <p className="reveal-copy text-body-lg leading-relaxed text-(--color-text-muted)" style={{ marginBottom: '2rem' }}>
                Every lead from every channel lands in one WhatsApp CRM. Cart
                recovery, COD confirmation, and order updates run automatically.
                Your team works from one dashboard instead of five tabs.
              </p>

              <ul className="space-y-3.5">
                {FEATURES.map(({ label, detail }) => (
                  <li key={label} className="reveal-feature flex items-start gap-3">
                    <span
                      aria-hidden
                      style={{
                        width: '7px', height: '7px', borderRadius: '50%',
                        background: 'var(--color-accent)',
                        flexShrink: 0, marginTop: '7px',
                      }}
                    />
                    <span>
                      <span className="text-sm font-bold text-(--color-text)">{label}.</span>{' '}
                      <span className="text-sm leading-relaxed text-(--color-text-muted)">{detail}.</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal-visual relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
              <Image
                src="/services/whatsapp-commerce-hub.webp"
                alt="All sales channels feeding into a single WhatsApp Business dashboard — catalog, automated flows, live chat support, and a unified team inbox."
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

            {/* Left side */}
            <div>
              <p className="text-meta-label mb-4 font-medium uppercase tracking-widest text-(--color-text-faint)">
                Automated COD Verification
              </p>
              <h2
                id="cod-heading"
                className="text-h2 font-bold tracking-tight text-(--color-text)"
                style={{ maxWidth: '14ch', lineHeight: 1.05, marginBottom: '1.5rem' }}
              >
                Stop fake orders before they ship.
              </h2>
              <p
                className="cod-intro text-body-lg leading-relaxed text-(--color-text-muted)"
                style={{ maxWidth: '44ch', marginBottom: '2rem' }}
              >
                Every cash on delivery purchase triggers an instant WhatsApp confirmation. Customers can approve or cancel their purchase with one tap, saving your team hours of manual calling.
              </p>

              <ol className="grid grid-cols-1 gap-px overflow-hidden border border-(--color-border) bg-(--color-border)" style={{ listStyle: 'none' }}>
                {COD_STEPS.map(({ n, title, body }) => (
                  <li key={n} className="cod-step bg-(--color-surface) p-6 md:p-7">
                    <span className="font-mono text-xs tracking-widest" style={{ color: '#1a8a5a' }}>{n}</span>
                    <h3 className="mt-3 text-base font-bold tracking-tight text-(--color-text)">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{body}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right side */}
            <div>
              <p className="text-meta-label mb-4 font-medium uppercase tracking-widest text-(--color-text-faint)">
                Handling silent or fake orders
              </p>
              <h2
                className="font-bold tracking-tight text-(--color-text)"
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)', lineHeight: 1.05, maxWidth: '14ch', marginBottom: '1.25rem' }}
              >
                Unresponsive orders are automatically dropped.
              </h2>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '44ch' }}>
                Customers who provide fake numbers or place impulse orders often ignore verification messages. If an order remains unconfirmed, our system automatically marks it as cancelled so you never ship a package that will be rejected at the door.
              </p>

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
                    <p className="text-meta-label mb-1 font-medium uppercase tracking-widest text-(--color-text-faint)">{item.at}</p>
                    <h3 className="text-base font-bold tracking-tight text-(--color-text)">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-(--color-text-muted)" style={{ maxWidth: '40ch' }}>{item.body}</p>
                  </li>
                ))}
              </ol>

              <p className="mt-8 text-sm leading-relaxed text-(--color-text-faint)" style={{ maxWidth: '42ch' }}>
                The confirmation window can be adjusted to match your dispatch
                schedule. Most stores use 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
