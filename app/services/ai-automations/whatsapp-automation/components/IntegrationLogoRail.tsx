'use client'

import Image from 'next/image'

const INTEGRATIONS = [
  { name: 'Shopify', w: 98, h: 112, src: '/tools-logos/20-Shopify.svg' },
  { name: 'Meta', w: 120, h: 80, src: '/tools-logos/26-Meta.svg' },
  { name: 'WooCommerce', w: 120, h: 25, src: '/services/whatsapp-automation/integrations/woocommerce.svg' },
  { name: 'Razorpay', w: 32, h: 32, src: '/services/whatsapp-automation/integrations/razorpay.svg' },
  { name: 'Google Sheets', w: 32, h: 32, src: '/services/whatsapp-automation/integrations/google-sheets.svg' },
  { name: 'PayU', w: 96, h: 32, src: '/services/whatsapp-automation/integrations/payu.svg' },
  { name: 'Justdial', w: 120, h: 31, src: '/services/whatsapp-automation/integrations/justdial.svg' },
  { name: 'IndiaMART', w: 120, h: 21, src: '/services/whatsapp-automation/integrations/indiamart.svg' },
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
        {INTEGRATIONS.map(({ name, src, w, h }) => (
          <li key={name}>
            <Image
              src={src}
              alt={name}
              width={w}
              height={h}
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
              {INTEGRATIONS.map(({ name, src, w, h }) => (
                <li key={name}>
                  <Image
                    src={src}
                    alt={copy === 0 ? name : ''}
                    width={w}
                    height={h}
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
