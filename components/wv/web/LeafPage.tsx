'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValue, type MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { LeafContent } from '@/content/web/types'
import { CASE_STUDIES, WEB_PROJECTS } from '@/lib/work-data'
import { CLIENT_LOGOS, QUOTES, STATS } from '../data'
import { Arrow, CountUp, HoverLetters, KineticTitle, Magnetic, ParallaxPhoto, Photo, Reveal, RotatingWord, ScrollWords, Star, VelocityMarquee, ease } from '../ui'
import './web.css'

const QUOTE = CASE_STUDIES.find((c) => c.slug === 'ap-cleanco')!
const SHOT = WEB_PROJECTS.find((p) => p.slug === 'ap-cleanco-site')!

type C = LeafContent

function Section({ title, aside }: { title: string[]; aside?: React.ReactNode }) {
  return (
    <div className="wv-sec-head">
      <KineticTitle lines={title} accent={title.length - 1} className="wv-h2" />
      {aside && <Reveal className="wv-sec-aside">{aside}</Reveal>}
    </div>
  )
}

/** Old site fading behind a clean rebuild, joined by a redirect arrow. Drawn with blocks, no client screenshots. */
function BeforeAfter() {
  return (
    <div className="cw-ba" aria-hidden>
      <div className="cw-ba-card is-old">
        <div className="cw-browser-bar">
          <i /><i /><i />
          <em>OLD</em>
        </div>
        <div className="cw-ba-body">
          <div className="cw-ba-nav"><i /><i /><i /><i /></div>
          <b className="cw-ba-block" />
          <div className="cw-ba-three"><i /><i /><i /></div>
          <b className="cw-ba-strip" />
        </div>
      </div>
      <div className="cw-ba-card is-new">
        <div className="cw-browser-bar">
          <i /><i /><i />
          <span className="is-mono">vikreta.com/new</span>
          <em className="is-y">NEW</em>
        </div>
        <div className="cw-ba-body">
          <div className="cw-ba-top"><b /><span><i /><i /></span></div>
          <b className="cw-ba-h" />
          <b className="cw-ba-h is-short" />
          <i className="cw-ba-sub" />
          <div className="cw-ba-cta"><span>Convert <Arrow size={11} /></span><i /></div>
          <div className="cw-ba-two"><i><b /></i><i><b /></i></div>
        </div>
      </div>
      <span className="cw-ba-301">
        301 redirect <Arrow size={12} />
      </span>
    </div>
  )
}

/** The three Core Web Vitals as plain bars. Illustration only, no measured values. */
function Vitals() {
  const rows = [
    { k: 'LCP', t: 'Loading', d: 'How fast the main content shows up', w: '78%' },
    { k: 'INP', t: 'Responding', d: 'How fast it reacts to a tap or click', w: '64%' },
    { k: 'CLS', t: 'Staying still', d: 'Whether the layout jumps while loading', w: '88%' },
  ]
  return (
    <div className="cw-vit" aria-hidden>
      {rows.map((r) => (
        <div key={r.k} className="cw-vit-row">
          <div>
            <b>{r.t}</b>
            <span>{r.d}</span>
          </div>
          <em>{r.k}</em>
          <i>
            <u style={{ width: r.w }} />
          </i>
        </div>
      ))}
    </div>
  )
}

/** A storefront: logo, cart, product tiles and an add-to-cart button. Blocks only. */
function Store() {
  return (
    <div className="cw-store" aria-hidden>
      <div className="cw-store-top">
        <b />
        <span><i /><i /><u>2</u></span>
      </div>
      <div className="cw-store-grid">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="cw-store-tile">
            <i />
            <b />
            <em />
          </div>
        ))}
      </div>
      <div className="cw-store-cta">
        Add to cart <Arrow size={12} />
      </div>
    </div>
  )
}

/** Storefront, API and commerce engine as three joined nodes. */
function Headless() {
  const nodes = [
    { t: 'Storefront', d: 'Custom front end' },
    { t: 'API', d: 'Products, cart, checkout' },
    { t: 'Commerce engine', d: 'Orders and stock' },
  ]
  return (
    <div className="cw-hl" aria-hidden>
      {nodes.map((n, i) => (
        <div key={n.t} className="cw-hl-step">
          <div className={`cw-hl-node${i === 0 ? ' is-y' : ''}`}>
            <b>{n.t}</b>
            <span>{n.d}</span>
          </div>
          {i < nodes.length - 1 && <i className="cw-hl-link" />}
        </div>
      ))}
    </div>
  )
}

/** What a maintenance month covers, as a checked list. */
function Checklist() {
  const rows = ['Updates applied', 'Backups checked', 'Links and forms tested', 'Small fixes done']
  return (
    <div className="cw-chk" aria-hidden>
      {rows.map((r) => (
        <div key={r} className="cw-chk-row">
          <span>
            <svg viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
          </span>
          {r}
        </div>
      ))}
    </div>
  )
}

/** A generic one-offer page, drawn with blocks. Used instead of a client screenshot on the landing-pages hero. */
function Wireframe() {
  return (
    <div className="cw-wire" aria-hidden>
      <i className="cw-wire-tag" />
      <b className="cw-wire-h" />
      <b className="cw-wire-h is-soft" />
      <i className="cw-wire-p" />
      <i className="cw-wire-p is-short" />
      <div className="cw-wire-form">
        <i className="cw-wire-label" />
        <span className="cw-wire-field"><i /></span>
        <span className="cw-wire-field"><i className="is-long" /></span>
        <span className="cw-wire-btn">
          Get started <Arrow size={13} />
        </span>
      </div>
      <div className="cw-wire-proof">
        <i />
        <span>
          {[0, 1, 2, 3, 4].map((n) => (
            <Star key={n} />
          ))}
        </span>
      </div>
    </div>
  )
}

function Hero({ c }: { c: C }) {
  const { hero } = c
  return (
    <section className="cw-hero">
      <div className="wv-grid-bg" aria-hidden />
      <div className="cw-glow" aria-hidden />
      <div className="cw-ghost-circle" aria-hidden />
      <div className="cw-cols" aria-hidden>
        <div className="wv-wrap">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div>
      </div>
      <div className="wv-wrap cw-hero-in">
        <div className="cw-hero-copy">
          <nav className="wv-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>/<Link href="/services">Services</Link>/<Link href="/services/web-development">Web Design &amp; Development</Link>/<span aria-current="page">{c.crumb}</span>
          </nav>
          <h1 className={`wv-h1${c.h1.some((l) => l.length > 13) ? ' is-long' : ''}`}>
            <KineticTitle as="p" lines={c.h1} accent={1} delay={0.1} />
          </h1>
          <Reveal delay={0.45} className="cw-hero-sub">
            <p className="wv-page-lead">{hero.lead}</p>
            <div className="wv-cta-row">
              <Magnetic>
                <Link href="/contact" className="wv-btn wv-btn-y">
                  Get a free website audit <Arrow size={15} />
                </Link>
              </Magnetic>
              <Link href="#proof" className="wv-btn wv-btn-ghost">
                See the work
              </Link>
            </div>
            <p className="cw-rot">
              {hero.rot} <RotatingWord words={hero.words} />
            </p>
            <div className="cw-hero-proof">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <Star /> {hero.proof}
              </span>
              <span className="wv-pill">
                <i className="cw-dot" /> Taking new projects
              </span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.3} className={`cw-hero-art${hero.art === 'ba' ? ' is-ba' : ''}${['vitals', 'checklist', 'store', 'headless'].includes(hero.art) ? ' is-card' : ''}`}>
          {hero.art === 'ba' ? (
            <BeforeAfter />
          ) : (
            <div className="cw-browser">
              <i className="cw-cross is-tl" aria-hidden />
              <i className="cw-cross is-tr" aria-hidden />
              <div className="cw-browser-bar">
                <i /><i /><i />
                <span>{hero.url}</span>
              </div>
              {hero.art === 'shot' && (
                <div className="cw-browser-shot">
                  <Photo src={SHOT.image!} alt={SHOT.imageAlt!} priority sizes="(min-width: 960px) 30vw, 90vw" />
                </div>
              )}
              {hero.art === 'wire' && <Wireframe />}
              {hero.art === 'vitals' && <Vitals />}
              {hero.art === 'checklist' && <Checklist />}
              {hero.art === 'store' && <Store />}
              {hero.art === 'headless' && <Headless />}
            </div>
          )}
          <span className="cw-hero-tag">
            <i className="cw-dot" /> {hero.tag}
          </span>
          <a href="https://www.upwork.com/agencies/websitevikreta/" target="_blank" rel="noopener noreferrer" className="cw-hero-tag is-b">
            <Star /> Top Rated on Upwork
          </a>
        </Reveal>
      </div>
      <div className="wv-wrap cw-hero-foot">
        <span>Trusted by founders at</span>
        <VelocityMarquee items={CLIENT_LOGOS} baseVelocity={-2} className="is-logos" />
      </div>
    </section>
  )
}

const GLYPHS = [
  <svg key="a" viewBox="0 0 24 24" aria-hidden><path d="M4 7h16M4 12h10M4 17h5" /></svg>,
  <svg key="b" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="8" /><path d="m6.3 17.7 11.4-11.4" /></svg>,
  <svg key="c" viewBox="0 0 24 24" aria-hidden><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>,
  <svg key="d" viewBox="0 0 24 24" aria-hidden><path d="M4 5h16M7 11h10M10 17h4" /></svg>,
]

function Friction({ c }: { c: C }) {
  const { friction } = c
  return (
    <section className="wv-sec cw-friction" id="friction">
      <div className="wv-wrap cw-friction-in">
        <div>
          <ScrollWords text={friction.statement} className="wv-big-p" />
          <Reveal className="cw-friction-foot">
            <Link href="#build" className="wv-link">
              See how we fix it <Arrow size={14} />
            </Link>
          </Reveal>
          <ul className="cw-friction-list">
            {friction.items.map((f) => (
              <li key={f.t}>
                <span className="cw-glyph">{GLYPHS[f.g]}</span>
                <Reveal>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <ParallaxPhoto src={friction.photo} alt={friction.alt} className="cw-friction-photo" sizes="(min-width: 960px) 34vw, 100vw" />
      </div>
    </section>
  )
}

function Build({ c }: { c: C }) {
  const { build } = c
  const reduce = useReducedMotion()
  const [hover, setHover] = useState<number | null>(null)
  const list = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 350, damping: 30 })
  const y = useSpring(my, { stiffness: 350, damping: 30 })
  const row = hover === null ? null : build.rows[hover]
  return (
    <section className="wv-sec cw-build" id="build">
      <div className="wv-wrap">
        <Section title={build.title ?? ['What you', 'get']} aside={<p>{build.aside}</p>} />
        <div
          ref={list}
          className="wv-svc-list cw-build-list"
          onPointerMove={(e) => {
            if (!list.current || e.pointerType !== 'mouse') return
            const r = list.current.getBoundingClientRect()
            mx.set(e.clientX - r.left + 24)
            my.set(e.clientY - r.top + 24)
          }}
          onPointerLeave={() => setHover(null)}
        >
          {build.rows.map((r, i) => (
            <Reveal key={r.t} delay={0.04 * i}>
              <Link href={r.href} className="wv-svc-row" aria-label={`${r.t}: see ours`} onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}>
                <span className="wv-svc-n">0{i + 1}</span>
                <span className="wv-svc-t">
                  <HoverLetters text={r.t} />
                </span>
                <span className="wv-svc-d">{r.d}</span>
                <span className="wv-svc-go" aria-hidden>
                  <Arrow size={22} />
                </span>
              </Link>
            </Reveal>
          ))}
          <AnimatePresence>
            {row && !reduce && (
              <motion.div className="cw-pop" style={{ x, y }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2, ease }} aria-hidden>
                <b>{row.t}</b>
                <ul>
                  {row.pop.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function Step({ s, i, p }: { s: C['steps']['items'][number]; i: number; p: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const from = i * 0.2
  const opacity = useTransform(p, [from, from + 0.25], [reduce ? 1 : 0.35, 1])
  const y = useTransform(p, [from, from + 0.25], [reduce ? 0 : 28, 0])
  return (
    <motion.li className="wv-step" style={{ opacity, y }}>
      <span className="wv-step-n">{s.n}</span>
      <div>
        <h3>{s.t}</h3>
        <p>{s.d}</p>
      </div>
    </motion.li>
  )
}

/** The four steps wake up one by one and a yellow rail fills as you scroll through them. */
function Compare({ c }: { c: C }) {
  const cmp = c.compare
  if (!cmp) return null
  return (
    <section className="wv-sec cw-compare" id="compare">
      <div className="wv-wrap">
        <Section title={['Which one', 'fits you?']} aside={<p>{cmp.aside}</p>} />
        <Reveal>
          <div className="cw-cmp" role="table">
            <div className="cw-cmp-head" role="row">
              <span role="columnheader" />
              {cmp.cols.map((col) => (
                <b key={col.t} role="columnheader" className={col.on ? 'is-on' : ''}>
                  {col.t}
                  {col.on && <small>This page</small>}
                </b>
              ))}
            </div>
            {cmp.rows.map((r) => (
              <div key={r.k} className="cw-cmp-row" role="row">
                <span className="cw-cmp-k" role="rowheader">{r.k}</span>
                {r.v.map((v, i) => (
                  <span key={cmp.cols[i].t} role="cell" data-col={cmp.cols[i].t} className={cmp.cols[i].on ? 'is-on' : ''}>
                    {v}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Connects({ c }: { c: C }) {
  const cn = c.connects
  if (!cn) return null
  return (
    <section className="wv-sec cw-connects">
      <div className="wv-wrap">
        <Section title={['What it', 'connects to']} aside={<p>{cn.aside}</p>} />
        <ul className="cw-conn">
          {cn.items.map((it, i) => (
            <li key={it.t}>
              <Reveal delay={0.04 * i}>
                <span className="cw-conn-n">0{i + 1}</span>
                <h3>{it.t}</h3>
                <p>{it.d}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Process({ c }: { c: C }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <section className="wv-sec cw-steps-sec" id="process">
      <div className="wv-wrap">
        <Section title={['Four steps,', 'no surprises']} aside={<p>{c.steps.aside}</p>} />
        <div ref={ref}>
          <div className="cw-dim" aria-hidden>
            <span>01</span>
            <i>
              <motion.b style={{ scaleX: fill }} />
            </i>
            <span>04</span>
          </div>
          <ol className="cw-steps">
            {c.steps.items.map((s, i) => (
              <Step key={s.n} s={s} i={i} p={scrollYProgress} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Band({ c }: { c: C }) {
  return (
    <div className="wv-band" role="group" aria-label="Stack and promise">
      <VelocityMarquee items={c.band[0]} baseVelocity={-4} className="is-band" />
      <VelocityMarquee items={c.band[1]} baseVelocity={3} className="is-band is-outline" />
    </div>
  )
}

type Project = (typeof WEB_PROJECTS)[number]

/** Sticky slot: each card pins a little lower than the last, then scales back and dims as the next one slides over it. */
function StackSlot({ i, total, className, children }: { i: number; total: number; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1 - (total - i) * 0.035])
  const dim = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 0.5])
  return (
    <div ref={ref} className="wv-stack-slot" style={{ top: `calc(96px + ${22 * i}px)` }}>
      <motion.article className={className} style={{ scale }}>
        {children}
        <motion.div className="wv-card-dim" style={{ opacity: dim }} aria-hidden />
      </motion.article>
    </div>
  )
}

function ProofCard({ p, i, total, metric }: { p: Project; i: number; total: number; metric?: string }) {
  return (
    <StackSlot i={i} total={total} className="cw-case">
      <div className="cw-case-copy">
        <div>
          <div className="cw-case-tags">
            {p.skills.split(' / ').map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
        <div>
          {metric && (
            <div className="cw-case-metric">
              <small>Result</small>
              <b>{metric}</b>
            </div>
          )}
          <a href={p.href} target="_blank" rel="noopener noreferrer" className="wv-link">
            View live site <Arrow size={14} />
          </a>
        </div>
      </div>
      <div className="cw-browser">
        <div className="cw-browser-bar">
          <i /><i /><i />
          <span>{p.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '')}</span>
        </div>
        <div className="cw-browser-shot">
          <Photo src={p.image!} alt={p.imageAlt!} sizes="(min-width: 960px) 44vw, 90vw" />
        </div>
      </div>
    </StackSlot>
  )
}

function Proof({ c }: { c: C }) {
  const { proof } = c
  const cases = proof.slugs.map((s) => WEB_PROJECTS.find((p) => p.slug === s)!)
  const total = cases.length + (proof.invite ? 1 : 0)
  return (
    <section className="wv-sec" id="proof">
      <div className="wv-wrap">
        <Section title={['Sites we', 'have shipped']} aside={<p>{proof.aside}</p>} />
        <div className="wv-stack">
          {cases.map((p, i) => (
            <ProofCard key={p.slug} p={p} i={i} total={total} metric={proof.metric[p.slug]} />
          ))}
          {proof.invite && (
            <StackSlot i={cases.length} total={total} className="cw-case is-invite">
              <h3>{proof.invite.t}</h3>
              <p>{proof.invite.d}</p>
              <Link href={proof.invite.href} className="wv-btn wv-btn-y">
                {proof.invite.cta} <Arrow size={15} />
              </Link>
            </StackSlot>
          )}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="wv-stats cw-stats" aria-label="Results">
      <div className="wv-wrap wv-stats-in">
        <KineticTitle lines={['The numbers', 'so far']} className="wv-h2 is-dark" />
        <div className="wv-stats-grid">
          {STATS.slice(0, 3).map((s, i) => (
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

const who = (name: string) => QUOTES.find((q) => q.name === name)!
const WEB_QUOTES = [
  { tab: 'AP Cleanco', quote: QUOTE.testimonial!.quote, name: QUOTE.testimonial!.role, role: '', logo: QUOTE.logo, avatar: undefined as string | undefined },
  { tab: 'Champion Lenders', ...who('John Kim'), logo: undefined as string | undefined },
  { tab: 'BoomPanda', ...who('Rudra Ghodke'), logo: undefined as string | undefined },
  { tab: 'Cozmo Realty', ...who('Sang Hyun Han'), logo: undefined as string | undefined },
]

function Quote() {
  const reduce = useReducedMotion()
  const [a, setA] = useState(0)
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setA((v) => (v + 1) % WEB_QUOTES.length), 7000)
    return () => clearInterval(t)
  }, [reduce, a])
  const q = WEB_QUOTES[a]
  return (
    <section className="wv-sec cw-quote-sec" aria-label="What clients say">
      <div className="cw-ghost-circle" aria-hidden />
      <div className="wv-wrap cw-quote-in">
        <div className="cw-quote-tabs" role="tablist" aria-label="Choose a client">
          {WEB_QUOTES.map((t, i) => (
            <button key={t.tab} role="tab" aria-selected={i === a} onClick={() => setA(i)} className={i === a ? 'is-on' : ''}>
              {t.tab}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.blockquote key={a} initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.4, ease }}>
            <p>&ldquo;{q.quote}&rdquo;</p>
            <footer>
              {q.logo ? (
                // eslint-disable-next-line @next/next/no-img-element -- svg client mark
                <img src={q.logo} alt={q.tab} />
              ) : (
                q.avatar && (
                  <span className="cw-quote-av">
                    <Photo src={q.avatar} alt="" sizes="56px" />
                  </span>
                )
              )}
              <span>
                <strong>{q.name}</strong>
                {q.role && <em>{q.role}</em>}
              </span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
    </section>
  )
}

function Fit({ c }: { c: C }) {
  return (
    <section className="wv-sec cw-fit">
      <div className="wv-wrap">
        <Section title={['Is this', 'for you?']} />
        <div className="cw-fit-cols">
          <div>
            <h3>A good fit</h3>
            <ul>
              {c.fit.good.map((t) => (
                <li key={t}>
                  <Star /> <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Probably not</h3>
            <ul>
              {c.fit.notFit.map((n) => (
                <li key={n.t}>
                  <i className="cw-dash" aria-hidden />
                  <div>
                    <span>{n.t}</span>
                    <br />
                    <Link href={n.href} className="wv-link">
                      {n.link} <Arrow size={14} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Faq({ c }: { c: C }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="wv-sec" id="faq">
      <div className="wv-wrap">
        <Section title={['Questions', 'we get asked']} />
        <div>
          {c.faqs.map((f, i) => (
            <div key={f.q} className={`cw-faq-item${open === i ? ' is-open' : ''}`}>
              <h3>
                <button className="cw-faq-q" aria-expanded={open === i} aria-controls={`cw-faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span>{f.q}</span>
                  <i className="cw-faq-icon" aria-hidden />
                </button>
              </h3>
              <div className="cw-faq-a" id={`cw-faq-${i}`} role="region">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Related({ c }: { c: C }) {
  return (
    <section className="wv-sec cw-rel">
      <div className="wv-wrap">
        <h2 className="cw-rel-title">Keep exploring</h2>
        <div className="cw-rel-grid">
          {c.related.map((r, i) => {
            const inner = (
              <>
                <div>
                  <h3>{r.t}</h3>
                  <p>{r.d}</p>
                </div>
                {r.href ? (
                  <span className="wv-link">
                    Open <Arrow size={14} />
                  </span>
                ) : (
                  <span className="wv-chip">Coming soon</span>
                )}
              </>
            )
            return (
              <Reveal key={r.t} delay={0.06 * i}>
                {r.href ? (
                  <Link href={r.href} className="cw-rel-card is-link">
                    {inner}
                  </Link>
                ) : (
                  <div className="cw-rel-card">{inner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function LeafPage({ c }: { c: C }) {
  return (
    <main className="cw-page">
      <Hero c={c} />
      <Band c={c} />
      <Friction c={c} />
      <Build c={c} />
      <Connects c={c} />
      <Compare c={c} />
      <Process c={c} />
      <Proof c={c} />
      <Stats />
      <Quote />
      <Fit c={c} />
      <Faq c={c} />
      <Related c={c} />
    </main>
  )
}
