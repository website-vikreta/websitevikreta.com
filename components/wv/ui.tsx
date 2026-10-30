'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import Lenis from 'lenis'
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  AnimatePresence,
  type MotionValue,
} from 'motion/react'
import { asset } from './data'

export const ease = [0.16, 1, 0.3, 1] as const

export function Photo({ src, alt, sizes = '(min-width: 900px) 50vw, 100vw', priority, className = '' }: { src: string; alt: string; sizes?: string; priority?: boolean; className?: string }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`wv-photo ${className}`}>
      {!failed && <Image src={src} alt={alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} />}
    </div>
  )
}

export function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`wv-star ${className}`}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  )
}

export function Arrow({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={`wv-arrow ${className}`}>
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  )
}

export function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden className={className}>
      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ light = false, height = 30 }: { light?: boolean; height?: number }) {
  return (
    <Image
      src={asset(light ? 'logo-light.svg' : 'logo.svg')}
      alt="Website Vikreta"
      width={Math.round((1364 * height) / 300)}
      height={height}
      unoptimized
      priority
      className="wv-logo-img"
    />
  )
}

export function Reveal({ children, className = '', delay = 0, y = 24 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function KineticTitle({ lines, className = '', delay = 0, as = 'h2', accent }: { lines: string[]; className?: string; delay?: number; as?: 'h2' | 'p'; accent?: number }) {
  const reduce = useReducedMotion()
  const Tag = as
  let n = 0
  return (
    <Tag className={`wv-kt ${className}`}>
      <span className="wv-sr">{lines.join(' ')}</span>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`wv-kt-line${i === accent ? ' is-accent' : ''}`}
          initial={reduce ? 'show' : 'hide'}
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
        >
          {line.split(' ').map((word, w) => (
            <span key={w} className="wv-kt-word">
              {[...word].map((ch, c) => {
                const idx = n++
                return (
                  <motion.span
                    key={c}
                    className="wv-kt-ch"
                    variants={{
                      hide: { y: '105%', rotate: 8 },
                      show: { y: '0%', rotate: 0, transition: { duration: 0.6, ease, delay: delay + 0.08 * i + 0.018 * idx } },
                    }}
                  >
                    {ch}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </motion.span>
      ))}
    </Tag>
  )
}

const nb = (c: string) => (c === ' ' ? '\u00a0' : c)

/** First word rises in like the kinetic titles; every change after that uses the original per-letter roll. */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [cycled, setCycled] = useState(false)
  useEffect(() => {
    if (reduce) return
    // ponytail: first change waits a fixed 2.6s for the reveal to finish instead of listening for its end.
    let t = setTimeout(function tick() {
      setCycled(true)
      setI((v) => (v + 1) % words.length)
      t = setTimeout(tick, interval)
    }, 2600)
    return () => clearTimeout(t)
  }, [reduce, words.length, interval])
  const word = words[i]
  return (
    <span className="wv-rot" aria-live="polite">
      <AnimatePresence mode="wait" initial>
        <motion.span key={word} className="wv-rot-in">
          <span className="wv-sr">{word}</span>
          {[...word].map((ch, c) => (
            <motion.span
              key={c}
              aria-hidden
              className="wv-rot-ch"
              initial={cycled ? { y: '100%', opacity: 0 } : { y: '105%', rotate: 8 }}
              animate={
                cycled
                  ? { y: '0%', opacity: 1, transition: { duration: 0.42, ease, delay: 0.022 * c } }
                  : { y: '0%', rotate: 0, transition: { duration: 0.6, ease, delay: 0.26 + 0.018 * (19 + c) } }
              }
              exit={{ y: '-100%', opacity: 0, transition: { duration: 0.24, ease: 'easeIn', delay: 0.008 * c } }}
            >
              {nb(ch)}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function HoverLetters({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`wv-hl ${className}`}>
      <span className="wv-sr">{text}</span>
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden className="wv-hl-word">
          {[...word].map((ch, c) => (
            <span key={c} className="wv-hl-ch">
              {ch}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}

export function CountUp({ to, suffix = '', decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const v = useMotionValue(0)
  const text = useTransform(v, (x) => `${Number(x.toFixed(decimals)).toLocaleString('en-US')}${suffix}`)
  useEffect(() => {
    if (!inView) return
    if (reduce) {
      v.set(to)
      return
    }
    const c = animate(v, to, { duration: 1.4, ease })
    return () => c.stop()
  }, [inView, reduce, to, v])
  return (
    <span ref={ref}>
      <span className="wv-sr">{`${to}${suffix}`}</span>
      <motion.span aria-hidden>{text}</motion.span>
    </span>
  )
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useSpring(0, { stiffness: 300, damping: 20 })
  const y = useSpring(0, { stiffness: 300, damping: 20 })
  return (
    <motion.span
      ref={ref}
      className="wv-mag"
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * strength)
        y.set((e.clientY - r.top - r.height / 2) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}

export function ParallaxPhoto({ src, alt, className = '', sizes }: { src: string; alt: string; className?: string; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])
  return (
    <motion.div
      ref={ref}
      className={`wv-pp ${className}`}
      initial={reduce ? false : { clipPath: 'inset(12% 12% 12% 12% round 28px)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease }}
    >
      <motion.div className="wv-pp-in" style={{ y }}>
        <Photo src={src} alt={alt} sizes={sizes} />
      </motion.div>
    </motion.div>
  )
}

function ScrollWord({ children, p, range }: { children: string; p: MotionValue<number>; range: [number, number] }) {
  const reduce = useReducedMotion()
  const opacity = useTransform(p, range, reduce ? [1, 1] : [0.16, 1])
  const y = useTransform(p, range, reduce ? [0, 0] : [6, 0])
  return (
    <span aria-hidden className="wv-sw-w">
      <motion.span style={{ opacity, y }}>{children}</motion.span>{' '}
    </span>
  )
}

export function ScrollWords({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={`wv-sw ${className}`}>
      <span className="wv-sr">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <ScrollWord key={i} p={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </ScrollWord>
        ))}
      </span>
    </p>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 30 })
  return <motion.div className="wv-progress" style={{ scaleX }} aria-hidden />
}

export function Smooth() {
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const lenis = new Lenis({ lerp: 0.12 })
    let raf = 0
    const tick = (t: number) => {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']")
      if (!a) return
      const url = new URL(a.href)
      if (url.pathname !== location.pathname || !url.hash) return
      const el = document.querySelector(url.hash)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 })
      }
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [reduce])
  return null
}

export function VelocityMarquee({ items, baseVelocity = -3, className = '' }: { items: readonly (string | { src: string; alt: string; h?: number })[]; baseVelocity?: number; className?: string }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`)
  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = dir.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * Math.abs(f)
    base.set(base.get() + move)
  })
  const row = (
    <>
      {items.map((t, i) => (
        <span key={i} className="wv-mq-item">
          {typeof t === 'string' ? (
            t
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- SVG/PNG marquee logos, same as the other client-logo strips
            <img src={t.src} alt="" className="wv-mq-logo" style={t.h ? { height: t.h } : undefined} />
          )}
          <Star />
        </span>
      ))}
    </>
  )
  return (
    <div className={`wv-mq ${className}`}>
      <span className="wv-sr">{items.map((t) => (typeof t === 'string' ? t : t.alt)).join(', ')}</span>
      <motion.div className="wv-mq-track" style={{ x }} aria-hidden>
        {row}
        {row}
      </motion.div>
    </div>
  )
}
