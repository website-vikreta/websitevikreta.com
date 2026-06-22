'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

// Single sprite sheet holds all 20 frames — 2 cols × 10 rows, tile = 9:16.
// Frame n lives at col = n % 2, row = n / 2.
const SPRITE = '/preloader/sprite.jpg'
const COUNT = 20
const COLS = 2
const ROWS = 10

// Two touching stacks of 10 (no gaps). Slot 0-9 left, 10-19 right.
// All cards in a stack share the exact spot — they pile flush on each other.
const STACK = Array.from({ length: COUNT }, (_, i) => ({
  x: i < 10 ? -50 : 50,   // xPercent of card width → columns meet at center
  y: 0,
}))

// Reveal order alternates columns: left0, right0, left1, right1, …
const ORDER = Array.from({ length: 10 }, (_, d) => [d, d + 10]).flat()

const shuffle = <T,>(arr: T[]) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function HomePreloader() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const frameRef   = useRef<HTMLDivElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])
  const maskRefs   = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const finish = () => {
      document.body.style.overflow = ''
      window.dispatchEvent(new Event('preloader-done'))
      setVisible(false)
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.dispatchEvent(new Event('preloader-done'))
      setVisible(false)
      return
    }

    document.body.style.overflow = 'hidden'

    // Random image sequence every load — slot i shows tile tiles[i]
    const tiles = shuffle(Array.from({ length: COUNT }, (_, n) => n))
    maskRefs.current.forEach((mask, i) => {
      if (!mask) return
      const tile = tiles[i]
      mask.style.backgroundImage = `url(${SPRITE})`
      mask.style.backgroundSize = `${COLS * 100}% ${ROWS * 100}%`
      mask.style.backgroundPosition =
        `${(tile % COLS) * 100}% ${(Math.floor(tile / COLS) / (ROWS - 1)) * 100}%`
    })

    const ctx = gsap.context(() => {
      // Park every card at its final stack pose
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        gsap.set(card, { xPercent: STACK[i].x, yPercent: STACK[i].y })
      })
      // Masks start hidden below their clip
      const masks = ORDER.map(i => maskRefs.current[i]).filter(Boolean)
      gsap.set(masks, { yPercent: 110 })

      gsap.timeline({ onComplete: finish })
        // Reveal each card in place, alternating left/right column
        .to(masks, {
          yPercent: 0,
          duration: 0.5,
          ease: 'expo.out',
          stagger: 0.08,
        })
        // Whole pile zooms forward + vanishes, handing off to the hero
        .to(frameRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.in',
        }, '+=0.2')
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        }, '-=0.35')
    })

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-white flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={frameRef}
        className="relative w-[80vw] max-w-[460px] aspect-square md:w-[55vw] md:max-w-[560px]"
      >
        {Array.from({ length: COUNT }, (_, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            className="absolute left-1/2 top-1/2 -ml-[16%] -mt-[28.5%] w-[32%] aspect-[9/16] overflow-hidden will-change-transform"
          >
            {/* Mask-inner — slides up to reveal, mirrors the hero title reveal */}
            <div
              ref={el => { maskRefs.current[i] = el }}
              className="h-full w-full will-change-transform"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
