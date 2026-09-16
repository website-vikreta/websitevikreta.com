'use client'

import Image from 'next/image'

type Integration = {
  name: string
  src?: string
  mark?: string
}

const INTEGRATIONS: Integration[] = [
  { name: 'Shopify', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/shopify/default.svg' },
  { name: 'WooCommerce', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/woocommerce/default.svg' },
  { name: 'Razorpay', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/razorpay/default.svg' },
  { name: 'PayU', mark: 'PayU' },
  { name: 'Meta', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/meta/default.svg' },
  { name: 'IndiaMART', mark: 'IM' },
  { name: 'Justdial', mark: 'Jd' },
  { name: 'Google Sheets', src: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-sheets/default.svg' },
]

type IntegrationLogoRailProps = {
  className?: string
}

export default function IntegrationLogoRail({ className = '' }: IntegrationLogoRailProps) {
  return (
    <div className={className}>
      <ul className="flex flex-wrap items-center gap-3" aria-label="Supported commerce and marketing integrations">
        {INTEGRATIONS.map(({ name, src, mark }) => (
          <li
            key={name}
            className="grid h-12 w-12 place-items-center border border-(--color-border) bg-(--color-surface) transition-colors duration-300 hover:border-(--color-border-strong)"
          >
            {src ? (
              <Image src={src} alt="" width={24} height={24} className="h-6 w-6 object-contain grayscale" />
            ) : (
              <span aria-hidden="true" className="text-[10px] font-bold tracking-tight text-(--color-text)">
                {mark}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
