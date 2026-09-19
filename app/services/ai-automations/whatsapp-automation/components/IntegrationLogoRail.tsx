'use client'

import Image from 'next/image'

const INTEGRATIONS = [
  { name: 'Shopify', src: '/tools-logos/20-Shopify.svg' },
  { name: 'Meta', src: '/tools-logos/26-Meta.svg' },
  { name: 'WooCommerce', src: '/services/whatsapp-automation/integrations/woocommerce.svg' },
  { name: 'Razorpay', src: '/services/whatsapp-automation/integrations/razorpay.svg' },
  { name: 'Google Sheets', src: '/services/whatsapp-automation/integrations/google-sheets.svg' },
  { name: 'PayU', src: '/services/whatsapp-automation/integrations/payu.svg' },
  { name: 'Justdial', src: '/services/whatsapp-automation/integrations/justdial.svg' },
  { name: 'IndiaMART', src: '/services/whatsapp-automation/integrations/indiamart.svg' },
]

type IntegrationLogoRailProps = {
  className?: string
}

export default function IntegrationLogoRail({ className = '' }: IntegrationLogoRailProps) {
  return (
    <div className={className}>
      <ul
        className="flex flex-wrap items-center gap-x-9 gap-y-6"
        aria-label="Supported commerce and marketing integrations"
      >
        {INTEGRATIONS.map(({ name, src }) => (
          <li key={name}>
            <Image
              src={src}
              alt={name}
              width={120}
              height={32}
              className="h-7 w-auto max-w-26 object-contain opacity-60 grayscale transition-opacity duration-300 hover:opacity-100"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
