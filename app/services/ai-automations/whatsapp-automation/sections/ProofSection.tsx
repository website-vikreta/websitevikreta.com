'use client'

import { useRef } from 'react'
import { Check } from 'lucide-react'
import { revealLines, revealFadeUp, useGsapSection } from '@/lib/gsap/reveals'

const CHANNEL_STATS = [
  {
    n: '98%',
    label: 'Average open rate',
    context: 'Cart emails get opened far less often, and many land in Promotions or spam.',
    comparison: {
      primaryLabel: 'WhatsApp opened',
      primaryVal: '98%',
      pct: 98,
      secondaryLabel: 'Typical cart email open rate',
      secondaryVal: '~20%',
    },
  },
  {
    n: '45%',
    label: 'Average click-through',
    context: 'Interactive CTA buttons inside WhatsApp make completing dropped checkouts frictionless.',
    comparison: {
      primaryLabel: 'WhatsApp clicked',
      primaryVal: '45%',
      pct: 45,
      secondaryLabel: 'Standard SMS',
      secondaryVal: '~9%',
    },
  },
  {
    n: '~11 paise',
    label: 'Per utility alert',
    context: 'Automated order confirmations, updates, and cart alerts are billed at Meta’s base utility rate.',
    comparison: {
      primaryLabel: 'WhatsApp Utility',
      primaryVal: '~11 paise',
      pct: 10,
      secondaryLabel: 'Marketing Broadcast',
      secondaryVal: '₹1.09',
    },
  },
]

const COMPARE = {
  cols: ['This platform', 'Email-only recovery', 'Generic broadcast tool'],
  rows: [
    { label: 'Cart recovery', sub: 'After a checkout drops', cells: [['Automated', 'Sequence starts within minutes'], ['~20% opened', 'Often lands in Promotions'], ['Manual', 'You build the flow']] },
    { label: 'COD confirmation', sub: 'Before you ship', cells: [['Auto-cancel', 'Unconfirmed orders are cancelled'], ['None', 'Email cannot confirm COD'], ['Rarely', 'Custom work or add-on']] },
    { label: 'Setup and Meta verification', sub: 'Templates and approvals', cells: [['Done for you', 'We submit and resubmit'], ['n/a', 'No WhatsApp involved'], ['You do it', 'Verification is on you']] },
    { label: 'Store integration', sub: 'Orders and carts sync', cells: [['Shopify + WooCommerce', 'Webhooks wired for you'], ['Partial', 'Depends on the plugin'], ['Varies', 'Check per tool']] },
  ],
}

export default function ProofSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#proof-heading',  { trigger: scope.current })
    revealFadeUp('.proof-intro',   { y: 20, trigger: scope.current })
  })

  return (
    <section ref={scope} id="proof" className="scroll-mt-32 py-16 md:py-20" aria-labelledby="proof-heading">
      <div className="container">

        {/* Heading */}
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="proof-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            Why WhatsApp outperforms email and SMS.
          </h2>
          <p className="proof-intro mt-5 text-body-lg leading-relaxed text-(--color-text-muted)">
            Customer attention moved to WhatsApp years ago. Here is how direct messaging compares to traditional channels.
          </p>
        </div>

        {/* Channel benchmarks: clean, sharp cards with sleek comparison rail */}
        <div className="mb-14 grid grid-cols-1 gap-6 md:mb-20 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CHANNEL_STATS.map(({ n, label, context, comparison }, i) => (
            <article key={n} className={`${i === CHANNEL_STATS.length - 1 ? 'md:col-span-2 lg:col-span-1' : ''} flex border border-(--color-border) bg-(--color-surface) shadow-xs transition-all duration-300 hover:border-(--color-border-strong) hover:-translate-y-0.5`}>
              <div className="flex w-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="font-sans text-5xl sm:text-6xl lg:text-4xl xl:text-6xl font-bold tracking-tight text-(--color-text) leading-none">{n}</p>
                  <h3 className="mt-4 text-lg font-bold text-(--color-text)">{label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--color-text-muted)">{context}</p>
                </div>

                <div className="mt-6 border-t border-(--color-border) pt-5">
                  <div className="mb-2 flex justify-between gap-3 text-xs font-medium text-(--color-text)">
                    <span>{comparison.primaryLabel}</span>
                    <span className="font-bold tabular-nums">{comparison.primaryVal}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-bg-muted)">
                    <div className="h-full rounded-full bg-[#25d366] transition-all duration-700" style={{ width: `${comparison.pct}%` }} />
                  </div>
                  <div className="mt-2 flex justify-between gap-3 text-xs text-(--color-text-muted)">
                    <span>{comparison.secondaryLabel}</span>
                    <span className="tabular-nums">{comparison.secondaryVal}</span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

        <div className="mt-0">
          <h3 className="mb-6 text-center text-h3 font-bold tracking-tight text-(--color-text)">Let&apos;s compare</h3>

          {/* Phones: one card per row, this platform first, so nothing scrolls sideways */}
          <div className="space-y-4 md:hidden">
            {COMPARE.rows.map(({ label, sub, cells }) => (
              <div key={label} className="border border-(--color-border) bg-(--color-surface)">
                <div className="border-b border-(--color-border) px-4 py-3">
                  <p className="text-base font-semibold text-(--color-text)">{label}</p>
                  <p className="text-xs text-(--color-text-muted)">{sub}</p>
                </div>
                {cells.map(([value, caption], i) => (
                  <div
                    key={COMPARE.cols[i]}
                    className={`px-4 py-3 ${i === 0 ? 'bg-(--color-text) text-(--color-bg)' : 'border-t border-(--color-border)'}`}
                  >
                    <p className={`text-[11px] font-bold uppercase tracking-widest ${i === 0 ? 'text-(--color-bg)/70' : 'text-(--color-text-muted)'}`}>
                      {COMPARE.cols[i]}
                    </p>
                    <p className={`mt-1 flex items-center gap-1.5 text-base font-bold ${i === 0 ? '' : 'text-(--color-text-muted)'}`}>
                      {i === 0 && <Check size={16} className="shrink-0 text-[#25d366]" aria-hidden />}
                      {value}
                    </p>
                    <p className={`text-xs ${i === 0 ? 'text-(--color-bg)/70' : 'text-(--color-text-muted)'}`}>{caption}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="hidden overflow-x-auto pb-2 md:block">
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-center">
              <thead>
                <tr>
                  <th scope="col" className="w-[22%]"><span className="sr-only">Feature</span></th>
                  {COMPARE.cols.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-4 text-xs font-bold uppercase tracking-widest ${
                        i === 0
                          ? 'border border-(--color-text) bg-(--color-text) text-(--color-bg)'
                          : 'bg-(--color-bg-muted) text-(--color-text-muted)'
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.rows.map(({ label, sub, cells }, r) => {
                  const last = r === COMPARE.rows.length - 1
                  return (
                    <tr key={label}>
                      <th scope="row" className="border-b border-(--color-border) bg-(--color-bg-muted) p-4 text-left">
                        <span className="block text-sm font-semibold text-(--color-text)">{label}</span>
                        <span className="block text-xs text-(--color-text-muted)">{sub}</span>
                      </th>
                      {cells.map(([value, caption], i) => (
                        <td
                          key={i}
                          className={`p-4 ${
                            i === 0
                              ? `border-x border-(--color-text) bg-(--color-surface) shadow-sm ${last ? 'border-b' : ''}`
                              : 'border-b border-(--color-border)'
                          } ${i === 0 && !last ? 'border-b border-b-(--color-border)' : ''}`}
                        >
                          <span className={`block text-base font-bold ${i === 0 ? 'text-(--color-text)' : 'text-(--color-text-muted)'}`}>{i === 0 && <Check size={16} className="mr-1 inline" aria-hidden />}{value}</span>
                          <span className="block text-xs text-(--color-text-muted)">{caption}</span>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  )
}
