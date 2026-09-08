'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  revealLines,
  revealFadeUp,
  revealClipImage,
  useGsapSection,
  STAGGER,
} from '@/lib/gsap/reveals'

const CAUSES = [
  {
    cause: 'Unexpected costs revealed late',
    fix: 'All-in pricing on cart + recovery message with final total',
  },
  {
    cause: 'Forced account creation',
    fix: 'Guest checkout default + one-tap recovery link in WhatsApp',
  },
  {
    cause: 'Long or complicated checkout',
    fix: 'Field reduction + PIN autofill + checkout deep link in chat',
  },
  {
    cause: 'Limited payment options',
    fix: 'UPI, wallets, COD first on mobile + payment link in message',
  },
  {
    cause: 'Slow checkout page',
    fix: 'Speed audit. Target LCP under 2.5s',
  },
  {
    cause: 'Trust hesitation at payment',
    fix: 'Trust badges at checkout + COD double-confirm on WhatsApp',
  },
]

const MESSAGES = [
  {
    timing: '+15 min',
    label: 'Plain reminder',
    note: 'Utility. No discount',
    src: '/services/whatsapp-automation/whatsapp-recovery-reminder.webp',
    alt: 'Sketch of a phone chat with a product thumbnail and one short reminder, no offer.',
  },
  {
    timing: '+4 hrs',
    label: 'Objection handling',
    note: 'Social proof',
    src: '/services/whatsapp-automation/whatsapp-recovery-social-proof.webp',
    alt: 'Sketch of a phone chat with a product and small star marks suggesting other buyers.',
  },
  {
    timing: '+24 hrs',
    label: 'Time-boxed offer',
    note: 'Marketing. Last nudge',
    src: '/services/whatsapp-automation/whatsapp-recovery-offer.webp',
    alt: 'Sketch of a phone chat beside a clock, suggesting a last limited offer.',
  },
]

export default function CartRecoverySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#cart-heading', { trigger: scope.current })
    revealFadeUp('.cart-intro', { y: 20, trigger: scope.current })
    revealFadeUp('.cart-pair', {
      y: 16,
      stagger: STAGGER.tight,
      trigger: scope.current,
    })
    revealClipImage('.cart-mockup', { scale: true, trigger: scope.current })
  })

  return (
    <section
      ref={scope}
      id="cart-recovery"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="cart-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="cart-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            We fix checkout, then recover the carts that still leave
          </h2>
          <p className="cart-intro mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Six fixable reasons carts die. We address checkout friction first,
            then run a three-message WhatsApp sequence on the ones that still
            abandon. No discount on message one. That trains shoppers to leave
            on purpose.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 md:mb-14 md:grid-cols-2">
          {CAUSES.map(({ cause, fix }) => (
            <div
              key={cause}
              className="cart-pair grid grid-cols-1 gap-3 border border-(--color-border) bg-(--color-surface) p-6 sm:grid-cols-2 sm:gap-6 md:p-8"
            >
              <div>
                <p className="text-sm text-(--color-text-muted)">Root cause</p>
                <p className="mt-1 text-sm font-medium text-(--color-text)">{cause}</p>
              </div>
              <div>
                <p className="text-sm text-(--color-text-muted)">How we fix it</p>
                <p className="mt-1 text-sm text-(--color-text-muted)">{fix}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-6 font-sans text-xl font-bold text-(--color-text) md:text-2xl">
            The 3-message recovery sequence
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {MESSAGES.map(({ timing, label, note, src, alt }) => (
              <div key={timing}>
                <div className="cart-mockup relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
                  <Image
                    src={src}
                    alt={alt}
                    width={864}
                    height={1152}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
                <p className="mt-3 font-mono text-xs text-(--color-accent)">{timing}</p>
                <p className="mt-1 text-sm font-medium text-(--color-text)">{label}</p>
                <p className="mt-0.5 text-xs text-(--color-text-faint)">{note}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-(--color-text-faint) md:mt-14">
            Explicit WhatsApp opt-in required before any message is sent. Compliant
            with India&apos;s DPDP Act and Meta&apos;s WhatsApp Business policy.
          </p>
        </div>
      </div>
    </section>
  )
}
