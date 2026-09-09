'use client'

import { useRef } from 'react'
import {
  MessageCircle,
  Package,
  RefreshCcw,
  RotateCcw,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from 'lucide-react'
import {
  revealDraw,
  revealFadeUp,
  revealLines,
  STAGGER,
  useGsapSection,
} from '@/lib/gsap/reveals'
import SnakePath, {
  type SnakeStep,
} from '../components/SnakePath'

const STAGES: SnakeStep[] = [
  {
    step: '01',
    title: 'Chats & enquiries',
    detail: 'AI chatbot + live chat widget',
    icon: MessageCircle,
  },
  {
    step: '02',
    title: 'Product catalogs',
    detail: 'Catalog in WhatsApp + AI agent',
    icon: ShoppingBag,
  },
  {
    step: '03',
    title: 'Checkout & cart',
    detail: 'Abandoned cart recovery',
    icon: ShoppingCart,
    accent: true,
  },
  {
    step: '04',
    title: 'Order tracking',
    detail: 'Order + shipping updates',
    icon: Truck,
  },
  {
    step: '05',
    title: 'Returns',
    detail: 'AI support + human handoff',
    icon: RotateCcw,
  },
  {
    step: '06',
    title: 'Post-purchase',
    detail: 'Follow-up workflows',
    icon: Package,
  },
  {
    step: '07',
    title: 'Reviews & feedback',
    detail: 'Re-engagement (opt-in)',
    icon: Star,
  },
  {
    step: '08',
    title: 'Retention & win-back',
    detail: 'Win-back + bulk messaging',
    icon: RefreshCcw,
  },
]

export default function JourneySection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('#journey-heading', { trigger: scope.current })
    revealFadeUp('.journey-intro', { y: 20, trigger: scope.current })
    revealDraw('.journey-map .snake-wave', { trigger: scope.current })
    revealFadeUp('.journey-map .snake-node', {
      y: 16,
      stagger: STAGGER.tight,
      trigger: scope.current,
    })
  })

  return (
    <section
      ref={scope}
      id="journey"
      className="scroll-mt-32 py-16 md:py-20"
      aria-labelledby="journey-heading"
    >
      <div className="container">
        <div className="mb-10 max-w-2xl md:mb-14">
          <h2
            id="journey-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text)"
          >
            From first enquiry to repeat purchase
          </h2>
          <p className="journey-intro mt-6 text-body-lg leading-relaxed text-(--color-text-muted)">
            Eight stages. One platform. Cart recovery is one stage. The rest of
            the customer lifecycle runs on WhatsApp too.
          </p>
        </div>

        <div className="journey-map">
          <SnakePath
            steps={STAGES}
            rows={[3, 3, 2]}
            minWidthClass="min-w-[48rem]"
            ariaLabel="Eight stages of the customer lifecycle"
          />
        </div>
      </div>
    </section>
  )
}
