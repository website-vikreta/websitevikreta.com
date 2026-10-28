'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Check, Code2 } from 'lucide-react'
import { FOOTER_LINKS } from '@/config/footer-links'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

const CYCLES = [
  { key: 'quarterly', label: 'Quarterly' },
  { key: 'halfYearly', label: 'Half-yearly' },
  { key: 'yearly', label: 'Yearly' },
] as const

type CycleKey = (typeof CYCLES)[number]['key']

const PACKAGES = [
  {
    name: 'WA Starter',
    description: 'CRM, WhatsApp Business channel, and lead management for teams getting started on WhatsApp.',
    cta: 'Ask about Starter',
    features: [
      'WhatsApp CRM with lead management',
      'Official WhatsApp Business channel',
      'Message templates and approvals',
      'Basic automation workflows',
      '2 team seats with shared inbox',
    ],
    highlighted: false,
    pricing: {
      quarterly:  { price: '₹11,250', period: '/ quarter' },
      halfYearly: { price: '₹21,000', period: '/ 6 months', save: 'Save ₹1,500 · 7%' },
      yearly:     { price: '₹39,000', period: '/ year',     save: 'Save ₹6,000 · 13%' },
    },
  },
  {
    name: 'WA eCommerce',
    description: 'For stores that want cart recovery, COD confirmation, and Shopify or WooCommerce connected.',
    cta: 'Book a platform demo',
    eyebrow: 'Most stores start here',
    features: [
      'Everything in WA Starter',
      'Abandoned cart recovery with automated sequence',
      'COD order confirmation with auto-cancel',
      'Order and shipping status notifications',
      'WhatsApp product catalog',
      'Shopify and WooCommerce integration',
    ],
    highlighted: true,
    pricing: {
      quarterly:  { price: '₹15,750', period: '/ quarter' },
      halfYearly: { price: '₹27,000', period: '/ 6 months', save: 'Save ₹4,500 · 14%' },
      yearly:     { price: '₹49,200', period: '/ year',     save: 'Save ₹13,800 · 22%' },
    },
  },
] as const

/* The footer's WhatsApp number, with the custom-plan question already typed */
const WA_HREF = `${FOOTER_LINKS.social.find((l) => l.label === 'WhatsApp')!.href}?text=${encodeURIComponent('Hi, I want a custom WhatsApp setup for my store.')}`

function WaGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9c1.6.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}

/* What a custom build plugs into, as a small overlapping logo stack */
const CHANNELS = [
  { name: 'WhatsApp', bg: '#25d366', icon: <WaGlyph size={18} /> },
  {
    name: 'Instagram',
    bg: 'linear-gradient(45deg,#f9a825,#e1306c 55%,#833ab4)',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    bg: '#1877f2',
    icon: (
      <svg viewBox="0 0 24 24" width={17} height={17} fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4a20 20 0 0 0-2.2-.1c-2.2 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
      </svg>
    ),
  },
  { name: 'Custom API', bg: '#121212', icon: <Code2 size={17} strokeWidth={2} /> },
]

export default function PackagesSection() {
  const scope = useRef<HTMLElement>(null)
  const [cycle, setCycle] = useState<CycleKey>('quarterly')

  useGsapSection(scope, () => {
    revealLines('#packages-heading',  { trigger: scope.current })
    revealFadeUp('.packages-intro',   { y: 20, trigger: scope.current })
    revealFadeUp('.package-card',     { y: 20, stagger: STAGGER.base, trigger: scope.current })
    revealFadeUp('.packages-footer',  { y: 16, trigger: scope.current })
  })

  return (
    <section ref={scope} id="packages" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="packages-heading">
      <div className="container">

        <div className="mb-10 max-w-2xl md:mb-14">
          <h2 id="packages-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)">
            WhatsApp automation pricing: two tiers, pick the one your store needs.
          </h2>
          <p className="packages-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Platform subscription billed quarterly, half-yearly, or yearly. Meta&apos;s message
            charges are billed separately at cost: about 11 paise per Utility message, more for
            Marketing. Setup is a one-time quote. Prices exclude GST.
          </p>
        </div>

        {/* Billing cycle */}
        <div
          role="tablist"
          aria-label="Billing cycle"
          className="packages-intro mb-8 inline-flex border border-(--color-border)"
        >
          {CYCLES.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={cycle === key}
              onClick={() => setCycle(key)}
              className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                cycle === key
                  ? 'bg-(--color-text) text-white'
                  : 'bg-(--color-surface) text-(--color-text-muted) hover:text-(--color-text)'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Plain tier on the left; the dark recommended card is taller and slides over its edge */}
        <div className="grid grid-cols-1 gap-4 lg:my-6 lg:grid-cols-[5fr_6fr] lg:gap-0">
          {PACKAGES.map(({ name, pricing, description, features, cta, highlighted }) => {
            const { price, period, save } = { save: undefined as string | undefined, ...pricing[cycle] }
            const dark = highlighted
            const muted = 'text-(--color-text-muted)'
            return (
              <article
                key={name}
                className={`package-card flex flex-col p-6 md:p-9 ${dark ? 'relative z-10 border border-(--color-border) bg-(--color-surface) text-(--color-text) lg:-my-6 lg:-ml-12 lg:shadow-2xl' : 'bg-(--color-bg-muted) text-(--color-text) lg:pr-14'}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold md:text-2xl">{name}</h3>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className={`text-5xl font-bold leading-none tracking-tight md:text-6xl ${dark ? 'text-(--color-accent)' : ''}`}>{price}</span>
                  <span className={`self-end pb-1.5 text-base ${muted}`}>{period}</span>
                  {save && (
                    <span
                      key={`${cycle}-${save}`}
                      className="fade-in-on-mount border border-[#1a8a5a]/30 bg-[#1a8a5a]/10 px-3 py-1.5 text-base font-bold text-[#1a8a5a]"
                    >
                      {save}
                    </span>
                  )}
                </div>

                <p className={`mt-4 text-base leading-relaxed ${muted}`}>{description}</p>

                <ul className={`mt-7 grid flex-1 content-start gap-x-8 gap-y-4 ${dark ? 'md:grid-cols-2' : ''}`}>
                  {features.map((f) => {
                    const heading = f.startsWith('Everything in')
                    return (
                      <li
                        key={f}
                        className={`flex items-start gap-3 text-base leading-relaxed ${heading ? 'font-semibold md:col-span-2' : muted}`}
                      >
                        {!heading && (
                          <Check size={16} strokeWidth={2.5} aria-hidden className="mt-1 shrink-0 text-[#25d366]" />
                        )}
                        {f}
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-8">
                  <Button href="#whatsapp-demo" variant="ghost" size="md" showArrow className="w-full justify-center">
                    {cta}
                  </Button>
                </div>

              </article>
            )
          })}
        </div>

        {/* Custom tier: a WhatsApp-flavoured call CTA that opens a real chat */}
        <div className="packages-footer mt-4 flex lg:mt-12 flex-col gap-5 border border-[#25d366]/30 bg-[#e7f6ec] p-6 sm:flex-row sm:items-center md:p-7">
          <div className="flex shrink-0 -space-x-2" aria-hidden>
            {CHANNELS.map(({ name, bg, icon }) => (
              <span
                key={name}
                title={name}
                className="grid h-10 w-10 place-items-center rounded-full text-white ring-[3px] ring-[#e7f6ec]"
                style={{ background: bg }}
              >
                {icon}
              </span>
            ))}
          </div>
          <div className="flex-1">
            <p className="font-bold text-(--color-text)">Custom and Enterprise</p>
            <p className="mt-1 text-base leading-relaxed text-(--color-text-muted)">
              AI WhatsApp agents, Instagram and Facebook inbox integration, custom API
              connections, and multi-brand setups. Quoted based on scope.
            </p>
          </div>
          <Button href={WA_HREF} external variant="primary" size="sm" showArrow className="shrink-0 self-start sm:self-auto">
            Chat with us on WhatsApp
          </Button>
        </div>

      </div>
    </section>
  )
}
