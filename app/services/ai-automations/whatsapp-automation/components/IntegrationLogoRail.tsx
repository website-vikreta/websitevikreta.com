'use client'

import Image from 'next/image'

type Integration = {
  name: string
  src?: string
  mark?: string
  compact?: boolean
}

const INTEGRATIONS: Integration[] = [
  { name: 'Shopify', src: '/tools-logos/20-Shopify.svg' },
  { name: 'WooCommerce', mark: 'Woo' },
  { name: 'Razorpay', mark: 'Rz' },
  { name: 'PayU', mark: 'PayU', compact: true },
  { name: 'Meta Ads', src: '/tools-logos/26-Meta.svg' },
  { name: 'IndiaMART', mark: 'IM' },
  { name: 'Justdial', mark: 'Jd' },
  { name: 'Google Sheets', src: '/tools-logos/27-GoogleLabs(GoogleLogo).svg' },
]

type IntegrationLogoRailProps = {
  className?: string
}

export default function IntegrationLogoRail({ className = '' }: IntegrationLogoRailProps) {
  return (
    <div className={className}>
      <p className="mb-4 text-sm text-(--color-text-faint)">Connects to what you already use</p>
      <ul className="flex flex-wrap gap-2" aria-label="Supported commerce and marketing integrations">
        {INTEGRATIONS.map(({ name, src, mark, compact }) => (
          <li
            key={name}
            className="flex h-12 items-center gap-2 border border-(--color-border) bg-(--color-surface) px-4 text-sm font-medium text-(--color-text-muted) transition-colors duration-300 hover:border-(--color-border-strong) hover:text-(--color-text)"
          >
            {src ? (
              <span className="relative block h-5 w-5 shrink-0 grayscale">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={`grid h-6 shrink-0 place-items-center border border-(--color-border-strong) px-1.5 text-[10px] font-bold leading-none text-(--color-text) ${
                  compact ? 'min-w-8' : 'min-w-6'
                }`}
              >
                {mark}
              </span>
            )}
            <span>{name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
