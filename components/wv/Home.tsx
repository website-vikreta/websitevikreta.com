'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { BAND, CLIENT_LOGOS, CONTACT, IMG, MANIFESTO, QUOTES, ROTATING, SERVICES, STATS, STEPS, WORK } from './data'
import { Arrow, CountUp, HoverLetters, KineticTitle, Magnetic, ParallaxPhoto, Photo, Reveal, RotatingWord, ScrollWords, Star, VelocityMarquee, ease } from './ui'

function Hero() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const bx = useTransform(sx, (v) => -18 * v)
  const by = useTransform(sy, (v) => -18 * v)
  const fx = useTransform(sx, (v) => 26 * v)
  const fy = useTransform(sy, (v) => 26 * v)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2])
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -80])
  return (
    <section
      id="top"
      className="wv-hero"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        mx.set(e.clientX / window.innerWidth - 0.5)
        my.set(e.clientY / window.innerHeight - 0.5)
      }}
    >
      <div className="wv-grid-bg" aria-hidden />
      <motion.div className="wv-wrap wv-hero-in" style={{ opacity, y }}>
        <div className="wv-hero-copy">
          <h1 className="wv-h1">
            <KineticTitle as="p" lines={['We build', 'software that']} className="wv-h1-a" delay={0.1} />
            <span className="wv-h1-rot">
              <RotatingWord words={ROTATING} />
            </span>
          </h1>
          <Reveal delay={0.45} className="wv-hero-sub">
            <p>Websites, CRMs, web apps and AI automations, designed and built by one team. From the first audit to a handover your team owns.</p>
            <div className="wv-cta-row">
              <Magnetic>
                <Link href="/contact" className="wv-btn wv-btn-y">
                  Book a free Consultation <Arrow size={15} />
                </Link>
              </Magnetic>
              <Link href="/work" className="wv-btn wv-btn-ghost">
                See the work
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="wv-hero-art" aria-hidden>
          <motion.div
            className="wv-hero-img is-back"
            style={{ x: bx, y: by }}
            initial={!reduce && { opacity: 0, y: 60, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 0.9, ease, delay: 0.25 }}
          >
            <Photo src={IMG.studio} alt="" priority sizes="(min-width: 960px) 28vw, 60vw" />
          </motion.div>
          <motion.div
            className="wv-hero-img is-front"
            style={{ x: fx, y: fy }}
            initial={!reduce && { opacity: 0, y: 80, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
          >
            <Photo src={IMG.code} alt="" priority sizes="(min-width: 960px) 24vw, 50vw" />
          </motion.div>
          <motion.div
            className="wv-hero-tag is-a"
            style={{ x: fx }}
            initial={!reduce && { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.8 }}
          >
            <strong>6,360+</strong> hours saved
          </motion.div>
          <motion.a
            href="https://www.upwork.com/agencies/websitevikreta/"
            target="_blank"
            rel="noopener noreferrer"
            className="wv-hero-tag is-b"
            style={{ x: bx, y: by }}
            initial={!reduce && { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.95 }}
          >
            <Star /> Top Rated on Upwork
          </motion.a>
          <motion.div className="wv-hero-spin" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 14, ease: 'linear', repeat: Infinity }}>
            <svg viewBox="0 0 100 100">
              <defs>
                <path id="wv-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text>
                <textPath href="#wv-circle" textLength="205" lengthAdjust="spacing">DESIGN · BUILD · AUTOMATE</textPath>
              </text>
            </svg>
            <Star className="wv-hero-spin-star" />
          </motion.div>
        </div>
      </motion.div>
      <div className="wv-hero-foot wv-wrap">
        <span>Trusted by founders at</span>
        <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
      </div>
    </section>
  )
}

function Band() {
  return (
    <div className="wv-band" role="group" aria-label="What we do">
      <VelocityMarquee items={BAND} baseVelocity={-4} className="is-band" />
      <VelocityMarquee items={[...BAND].reverse()} baseVelocity={3} className="is-band is-outline" />
    </div>
  )
}

function Manifesto() {
  return (
    <section className="wv-sec wv-manifesto" id="about">
      <div className="wv-wrap wv-manifesto-in">
        <div>
          <p className="wv-eyebrow is-y">( Who we are )</p>
          <ScrollWords text={MANIFESTO} className="wv-big-p" />
          <Reveal className="wv-manifesto-foot">
            <Link href="/about" className="wv-link">
              Meet the team <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <ParallaxPhoto src={IMG.huddle} alt="The Website Vikreta team in a planning session" className="wv-manifesto-img" sizes="(min-width: 960px) 34vw, 100vw" />
      </div>
    </section>
  )
}

function Services() {
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 350, damping: 30 })
  const y = useSpring(my, { stiffness: 350, damping: 30 })
  const list = useRef<HTMLDivElement>(null)
  return (
    <section className="wv-sec wv-services" id="services">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['What we', 'build']} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>Six practices, one team. Hire us for one piece or let us own the whole stack.</p>
          </Reveal>
        </div>
        <div
          ref={list}
          className="wv-svc-list"
          onPointerMove={(e) => {
            if (!list.current) return
            const r = list.current.getBoundingClientRect()
            mx.set(e.clientX - r.left)
            my.set(e.clientY - r.top)
          }}
          onPointerLeave={() => setHover(null)}
        >
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={0.05 * i}>
              <Link href={s.href} className="wv-svc-row" onPointerEnter={() => setHover(i)}>
                <span className="wv-svc-n">0{i + 1}</span>
                <span className="wv-svc-t">
                  <HoverLetters text={s.title} />
                </span>
                <span className="wv-svc-d">{s.blurb}</span>
                <span className="wv-svc-go">
                  <Arrow size={22} />
                </span>
                <span className="wv-svc-mobile-img">
                  <Photo src={s.image} alt="" sizes="100vw" />
                </span>
              </Link>
            </Reveal>
          ))}
          <AnimatePresence>
            {hover !== null && !reduce && (
              <motion.div
                className="wv-svc-float"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25, ease }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div key={hover} className="wv-svc-float-in" initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.35, ease }}>
                    <Photo src={SERVICES[hover].image} alt="" sizes="320px" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="wv-stats" aria-label="Results">
      <div className="wv-wrap wv-stats-in">
        <KineticTitle lines={['Small team.', 'Real results.']} className="wv-h2 is-dark" />
        <div className="wv-stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i} className="wv-stat">
              <strong>
                <CountUp to={s.n} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkCard({ w, i, total }: { w: (typeof WORK)[number]; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1 - (total - i) * 0.035])
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 0.5])
  return (
    <div ref={ref} className="wv-stack-slot" style={{ top: `calc(96px + ${22 * i}px)` }}>
      <motion.article className="wv-card" style={{ scale }}>
        <Link href={'slug' in w ? `/work/${w.slug}` : '/work'} className="wv-card-link" aria-label={`${w.client}: ${w.title}`}>
          <div className="wv-card-img">
            <Photo src={w.image} alt={`${w.client} campaign`} sizes="(min-width: 960px) 60vw, 100vw" />
          </div>
          <div className="wv-card-body">
            <div className="wv-card-top">
              {/* eslint-disable-next-line @next/next/no-img-element -- SVG/PNG client logo */}
              <img src={w.logo} alt={w.client} className="wv-card-logo" style={{ height: w.logoH }} />
              <span className="wv-card-year">{w.year}</span>
            </div>
            <h3>{w.title}</h3>
            <div className="wv-card-tags">
              {w.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="wv-card-metric">
              <strong>{w.metric}</strong>
              <span>{w.metricLabel}</span>
            </div>
            <span className="wv-card-go">
              View case <Arrow size={14} />
            </span>
          </div>
        </Link>
        <motion.div className="wv-card-dim" style={{ opacity: dim }} aria-hidden />
      </motion.article>
    </div>
  )
}

function Work() {
  return (
    <section className="wv-sec wv-work" id="work">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle lines={['Featured', 'projects']} accent={1} className="wv-h2" />
          <Reveal className="wv-sec-aside">
            <p>Projects we shipped, and what they changed for the business behind them.</p>
            <Link href="/work" className="wv-link">
              All case studies <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="wv-stack">
          {WORK.map((w, i) => (
            <WorkCard key={w.client} w={w} i={i} total={WORK.length} />
          ))}
        </div>
      </div>
    </section>
  )
}

function useDesktop(q = '(min-width: 960px)') {
  const [m, setM] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

function Process() {
  const desktop = useDesktop()
  const reduce = useReducedMotion()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)
  useEffect(() => {
    const measure = () => {
      const t = track.current
      if (t) setDist(Math.max(0, t.scrollWidth - window.innerWidth + 48))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [desktop])
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist])
  const pinned = desktop && !reduce
  return (
    <section ref={section} id="process" className={`wv-process${pinned ? ' is-pinned' : ''}`}>
      <div className="wv-process-sticky">
        <div className="wv-wrap wv-process-head">
          <KineticTitle lines={['How we', 'work']} accent={1} className="wv-h2" />
          <p className="wv-sec-aside">We listen before we touch anything. Four steps, the same on every project.</p>
        </div>
        <motion.div ref={track} className="wv-process-track" style={pinned ? { x } : undefined}>
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={pinned ? 0 : 0.05 * i} className="wv-step">
              <span className="wv-step-n">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </Reveal>
          ))}
          <div className="wv-step is-img">
            <Photo src={IMG.table} alt="Workshop with a client team" sizes="40vw" />
          </div>
        </motion.div>
        {pinned && (
          <div className="wv-wrap">
            <div className="wv-process-rail">
              <motion.i style={{ scaleX: scrollYProgress }} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Quotes() {
  const reduce = useReducedMotion()
  const [a, setA] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setA((v) => (v + 1) % QUOTES.length), 6000)
    return () => clearInterval(t)
  }, [reduce, a])
  const q = QUOTES[a]
  return (
    <section className="wv-sec wv-quotes" aria-label="What clients say">
      <div className="wv-wrap wv-quotes-in">
        <div>
          <p className="wv-eyebrow is-y">( What clients say )</p>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={a}
              className="wv-quote"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
            >
              <p>
                {q.quote.split(' ').map((w, i) => (
                  <motion.span
                    key={i}
                    initial={!reduce && { opacity: 0, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.35, delay: 0.025 * i }}
                  >
                    {w}{' '}
                  </motion.span>
                ))}
              </p>
              <footer>
                <span className="wv-quote-av">
                  {q.avatar ? <Photo src={q.avatar} alt="" sizes="56px" /> : <b className="wv-quote-initial">{q.name[0]}</b>}
                </span>
                <span>
                  <strong>{q.name}</strong>
                  <em>{q.role}</em>
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="wv-quote-nav" role="tablist" aria-label="Choose testimonial">
            {QUOTES.map((t, i) => (
              <button key={t.name} role="tab" aria-selected={i === a} aria-label={t.name} onClick={() => setA(i)} className={i === a ? 'is-on' : ''}>
                <i />
              </button>
            ))}
          </div>
        </div>
        <ParallaxPhoto src={IMG.review} alt="Client review session" className="wv-quotes-img" sizes="(min-width: 960px) 36vw, 100vw" />
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="wv-cta" id="contact">
      <VelocityMarquee items={["Let's talk", "Let's build", "Let's automate"]} baseVelocity={-3} className="is-cta" />
      <div className="wv-wrap wv-cta-in">
        <KineticTitle lines={['Got something', 'worth building?']} accent={1} className="wv-h2" />
        <Reveal className="wv-cta-row is-center">
          <Magnetic strength={0.5}>
            <a href={`mailto:${CONTACT.email}`} className="wv-cta-orb">
              <span>Book a free Consultation</span>
              <Arrow size={26} />
            </a>
          </Magnetic>
        </Reveal>
        <Reveal className="wv-cta-meta">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
          <span>{CONTACT.city}</span>
        </Reveal>
      </div>
    </section>
  )
}

export function Vikreta() {
  return (
    <main>
      <Hero />
      <Band />
      <Manifesto />
      <Services />
      <Stats />
      <Work />
      <Process />
      <Quotes />
      <Cta />
    </main>
  )
}
