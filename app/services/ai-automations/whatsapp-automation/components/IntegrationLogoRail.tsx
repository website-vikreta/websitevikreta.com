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
      {/* Desktop and tablet: the logos wrap in a row */}
      <ul
        className="hidden flex-wrap items-center gap-x-9 gap-y-6 md:flex"
        aria-label="Supported commerce and marketing integrations"
      >
        {INTEGRATIONS.map(({ name, src }) => (
          <li key={name}>
            <Image
              src={src}
              alt={name}
              width={120}
              height={32}
              className="h-7 w-auto max-w-32 object-contain opacity-60 grayscale transition-opacity duration-300 hover:opacity-100"
            />
          </li>
        ))}
      </ul>

      {/* Phones: one line that slides sideways. The list is repeated once so the loop has no gap; the copy is hidden from
          screen readers. With reduced motion it stops and can be swiped instead. */}
      <div className="wa-marquee-wrap overflow-hidden md:hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-reduce:overflow-x-auto">
        <div className="wa-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-x-9 pr-9"
              aria-hidden={copy === 1 ? true : undefined}
              aria-label={copy === 0 ? 'Supported commerce and marketing integrations' : undefined}
            >
              {INTEGRATIONS.map(({ name, src }) => (
                <li key={name}>
                  <Image
                    src={src}
                    alt={copy === 0 ? name : ''}
                    width={120}
                    height={32}
                    className="h-6 w-auto max-w-28 object-contain opacity-60 grayscale"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
