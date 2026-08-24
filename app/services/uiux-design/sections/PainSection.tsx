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

export default function PainSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, () => {
    revealLines('.pain-h2', { trigger: scope.current })
    revealFadeUp('.pain-p', { y: 20, stagger: STAGGER.loose, delay: 0.1, trigger: scope.current })
    revealClipImage('.pain-diagram', { scale: false, trigger: '.pain-diagram' })
  })

  return (
    <section ref={scope} className="pb-16 md:pb-20" aria-labelledby="pain-heading">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="max-w-xl">
            <h2
              id="pain-heading"
              className="pain-h2 text-h3 font-bold tracking-tight text-(--color-text) mb-6"
            >
              The Screens Got Built Before Anyone Tested Them
            </h2>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed mb-5">
              A developer laid out the screens because no one else was going to.
              It looks like a product. Then real users open it, hesitate on the
              first screen, and go looking for the back button.
            </p>

            <p className="pain-p text-body-lg text-(--color-text-muted) leading-relaxed">
              Hiring a designer for a fresh coat of visual polish doesn&rsquo;t
              fix that — it just makes the same confusing flow look better while
              people still can&rsquo;t find what they came for.
            </p>
          </div>

          <div className="pain-diagram order-first md:order-last relative overflow-hidden border border-(--color-border) bg-(--color-surface)">
            <Image
              src="/services/screens-built-before-tested.webp"
              alt="A developer builds and ships screens alone; a user opens the result confused, stuck on a loading state, and backs out — while a designer working from research ships a flow the same user completes without hesitating"
              width={1448}
              height={1086}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
