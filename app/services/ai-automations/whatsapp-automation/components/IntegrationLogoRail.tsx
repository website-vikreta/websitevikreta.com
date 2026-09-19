'use client'

import Image from 'next/image'

type Integration = {
  name: string
  src?: string
  mark?: string
}

const INTEGRATIONS: Integration[] = [
  { name: 'Shopify', src: '/tools-logos/20-Shopify.svg' },
  { name: 'Meta', src: '/tools-logos/26-Meta.svg' },
  { name: 'WooCommerce', src: '/services/whatsapp-automation/integrations/woocommerce.svg' },
  { name: 'Razorpay', src: '/services/whatsapp-automation/integrations/razorpay.svg' },
  { name: 'Google Sheets', src: '/services/whatsapp-automation/integrations/google-sheets.svg' },
  { name: 'PayU', src: '/services/whatsapp-automation/integrations/payu.svg' },
  { name: 'Justdial', src: '/services/whatsapp-automation/integrations/justdial.svg' },
  { name: 'IndiaMART', mark: 'IM' },
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
              <Image src={src} alt="" width={36} height={28} className="h-7 w-9 object-contain grayscale" />
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
