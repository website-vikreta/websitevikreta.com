'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import { RevealText, RevealFade, RevealImage } from '@/components/ui/Reveal'

export function VisionSection() {
  const textRef = useRef<HTMLDivElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const [imageHeight, setImageHeight] = useState<number>()

  // Floor is 16:9 (CSS `aspect-video`); ceiling is the text column's height —
  // but only at `lg`+, where the two columns actually sit side by side. Pure
  // CSS can't express "match a sibling, with a minimum" (aspect-ratio always
  // wins over grid stretch), so this measures both and picks the larger.
  useLayoutEffect(() => {
    const text = textRef.current
    const wrap = imageWrapRef.current
    if (!text || !wrap) return

    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      if (!mq.matches) {
        setImageHeight(undefined)
        return
      }
      const floor = wrap.offsetWidth * (9 / 16)
      setImageHeight(Math.max(text.offsetHeight, floor))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(text)
    ro.observe(wrap)
    mq.addEventListener('change', update)
    return () => {
      ro.disconnect()
      mq.removeEventListener('change', update)
    }
  }, [])

  return (
    <section id="vision" className="relative py-16 md:py-20 scroll-mt-24" aria-label="Our Vision">
      <div className="container">
        {/* Asymmetric split: heading + copy hold the left rail, the photo sits in
            the right half. The gap column IS the breathing room — no extra padding. */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div ref={textRef} className="flex flex-col gap-6 lg:col-span-6">
            <RevealText>
              <h2 className="text-h2 font-bold text-(--color-text)">
                We start with your{' '}
                <span className="text-(--color-accent)">bottleneck</span>, not our
                services list
              </h2>
            </RevealText>
            <RevealFade delay={0.15}>
              <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
                Every project starts with a real problem: leads slipping, hours
                disappearing, traffic that never converts. We automate around it
                until something measurable moves.
              </p>
            </RevealFade>
            <RevealFade delay={0.25}>
              <p className="text-body-lg text-(--color-text-muted) leading-(--leading-body)">
                Strategy, design, development and AI automation under one roof in
                Pune.
              </p>
            </RevealFade>
          </div>

          {/* Unframed, square corners — same treatment as the photo gallery.
              `aspect-video` is the mobile/initial floor; the `useLayoutEffect`
              above overrides it with an explicit px height at `lg`+ so the
              image never runs past the text column's last line. */}
          <div
            ref={imageWrapRef}
            className="relative aspect-video w-full overflow-hidden bg-(--color-bg-muted) lg:aspect-auto lg:col-span-5 lg:col-start-8"
            style={imageHeight ? { height: imageHeight } : undefined}
          >
            <RevealImage delay={0.2} className="h-full w-full">
              <Image
                src="/about/team-strategy-meeting.webp"
                alt="Website Vikreta team mapping a client's workflow in a strategy meeting"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </RevealImage>
          </div>
        </div>
      </div>
    </section>
  )
}
