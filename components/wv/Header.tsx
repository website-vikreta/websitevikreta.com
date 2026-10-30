'use client'

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { CONTACT, NAV, SERVICES } from './data'
import { Arrow, Chevron, Logo, Magnetic, ease } from './ui'

const AI_HREF = '/services/ai-automations'

const TAIL = 70
const LAYERS = Array.from({ length: 12 }, (_, i) => TAIL - i * 6)

/** One thin line chasing the pill's edge: stacked dashes share a head and shrink in length, so alpha builds toward a bright tip. */
function Snake() {
  const id = useId()
  const dash = (len: number, o: CSSProperties = {}) => ({ pathLength: 100, strokeDasharray: `${len} ${100 - len}`, style: { '--o': len - TAIL, ...o } as CSSProperties })
  return (
    <svg className="wv-snake" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#ff2d95" />
        </linearGradient>
      </defs>
      {LAYERS.map((len) => (
        <rect key={len} width="100%" height="100%" ry="50%" stroke={`url(#${id})`} strokeWidth="1.25" strokeOpacity=".09" {...dash(len)} />
      ))}
      <rect width="100%" height="100%" ry="50%" stroke="#fff" strokeWidth="2" strokeOpacity=".9" {...dash(1.2, { filter: 'drop-shadow(0 0 2px #ff2d95)' })} />
    </svg>
  )
}

function Bolt() {
  return (
    <svg className="wv-bolt" width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="M13.5 2 4 13.5h6.5L9.5 22 20 9.5h-6.8z" fill="currentColor" />
    </svg>
  )
}

function Drawer({ onNavigate }: { onNavigate: () => void }) {
  const [open, setOpen] = useState<string | null>(null)
  const item = (i: number) => ({
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.12 + 0.05 * i, duration: 0.5, ease } },
  })
  return (
    <div className="wv-drawer-in">
      <p className="wv-eyebrow">Services</p>
      {SERVICES.map((s, i) => {
        const isOpen = open === s.id
        return (
          <motion.div key={s.id} {...item(i)} className="wv-acc">
            <button className="wv-acc-btn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : s.id)}>
              {s.title}
              <span className={`wv-plus${isOpen ? ' is-open' : ''}`} aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="wv-acc-body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="wv-acc-pad">
                    {s.groups.map((g) => (
                      <div key={g.title} className="wv-acc-group">
                        <Link href={g.href} className="wv-acc-gt" onClick={onNavigate}>
                          {g.title}
                        </Link>
                        <ul>
                          {g.leaves.map((l) => (
                            <li key={l.t}>
                              <Link href={l.href} onClick={onNavigate}>
                                {l.t}
                              </Link>
                              {l.tag && <span className="wv-chip">{l.tag}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="wv-acc-extras">
                      {s.extras.map((x) => (
                        <Link key={x.t} href={x.href} onClick={onNavigate}>
                          {x.t}
                        </Link>
                      ))}
                    </div>
                    <Link href={s.href} className="wv-link" onClick={onNavigate}>
                      Explore {s.title} <Arrow size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
      <div className="wv-drawer-links">
        {NAV.map((n, i) => (
          <motion.div key={n.t} {...item(SERVICES.length + i)}>
            <Link href={n.href} onClick={onNavigate} className="wv-drawer-big">
              {n.t}
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div {...item(SERVICES.length + NAV.length)} className="wv-drawer-ai">
        <Link href={AI_HREF} onClick={onNavigate} className="wv-nav-ai is-lg">
          <Snake />
          <Bolt /> AI Solutions <Arrow size={14} />
        </Link>
      </motion.div>
      <motion.div {...item(SERVICES.length + NAV.length + 1)} className="wv-drawer-foot">
        <Link href="/contact" className="wv-btn wv-btn-y" onClick={onNavigate}>
          Book a free Consultation <Arrow size={14} />
        </Link>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </motion.div>
    </div>
  )
}

export function Header() {
  const [mega, setMega] = useState(false)
  const [tab, setTab] = useState(SERVICES[0].id)
  const [drawer, setDrawer] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 24)
    setHidden(y > 240 && y > prev && !mega && !drawer)
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (mega) trigger.current?.focus()
      setMega(false)
      setDrawer(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mega])

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [drawer])

  const open = () => {
    if (timer.current) clearTimeout(timer.current)
    setMega(true)
  }
  const close = () => {
    setMega(false)
    setDrawer(false)
  }
  const cur = SERVICES.find((s) => s.id === tab)!

  return (
    <>
      <motion.header
        className={`wv-header${solid || mega ? ' is-solid' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease }}
        onMouseLeave={() => {
          timer.current = setTimeout(() => setMega(false), 160)
        }}
        onMouseEnter={() => timer.current && clearTimeout(timer.current)}
      >
        <div className="wv-bar">
          <Link href="/" className="wv-logo" onClick={close} aria-label="Website Vikreta home">
            <Logo height={38} />
          </Link>
          <nav className="wv-nav" aria-label="Primary">
            <button
              ref={trigger}
              className={`wv-nav-link${mega ? ' is-open' : ''}`}
              aria-expanded={mega}
              aria-controls="wv-mega"
              onMouseEnter={open}
              onClick={() => setMega((v) => !v)}
            >
              Services <Chevron className="wv-chev" />
            </button>
            {NAV.map((n) => (
              <Link key={n.t} href={n.href} className="wv-nav-link" onMouseEnter={() => setMega(false)} onClick={close}>
                <span className="wv-roll" data-text={n.t}>
                  <span>{n.t}</span>
                </span>
              </Link>
            ))}
            <Link href={AI_HREF} className="wv-nav-ai" onMouseEnter={() => setMega(false)} onClick={close}>
              <Snake />
              <Bolt /> AI Solutions
            </Link>
          </nav>
          <div className="wv-bar-cta">
            <Magnetic>
              <Link href="/contact" className="wv-btn wv-btn-y wv-btn-sm" onClick={close}>
                Book a free Consultation <Arrow size={14} />
              </Link>
            </Magnetic>
            <button
              className={`wv-burger${drawer ? ' is-x' : ''}`}
              aria-label={drawer ? 'Close menu' : 'Open menu'}
              aria-expanded={drawer}
              aria-controls="wv-drawer"
              onClick={() => setDrawer((v) => !v)}
            >
              <i />
              <i />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mega && (
            <motion.div
              id="wv-mega"
              className="wv-mega"
              initial={{ opacity: 0, y: -12, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, y: -8, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.38, ease }}
              onMouseEnter={open}
            >
              <div className="wv-mega-in">
                <div className="wv-mega-list" role="tablist" aria-orientation="vertical" aria-label="Services">
                  <p className="wv-eyebrow">What we do</p>
                  {SERVICES.map((s) => (
                    <button
                      key={s.id}
                      role="tab"
                      id={`wv-tab-${s.id}`}
                      aria-selected={s.id === tab}
                      aria-controls={`wv-panel-${s.id}`}
                      className="wv-mega-tab"
                      onMouseEnter={() => setTab(s.id)}
                      onFocus={() => setTab(s.id)}
                      onClick={() => setTab(s.id)}
                    >
                      <span className="wv-mega-tt">{s.title}</span>
                      <Arrow size={14} />
                    </button>
                  ))}
                  <Link href="/services" className="wv-mega-all" onClick={close}>
                    All services <Arrow size={14} />
                  </Link>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.id}
                    role="tabpanel"
                    id={`wv-panel-${cur.id}`}
                    aria-labelledby={`wv-tab-${cur.id}`}
                    className="wv-mega-panel"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.22, ease }}
                  >
                    <div className="wv-mega-head">
                      <div>
                        <p className="wv-eyebrow is-y">{cur.kicker}</p>
                        <h3>{cur.title}</h3>
                        <p>{cur.blurb}</p>
                      </div>
                      <Link href={cur.href} className="wv-link" onClick={close}>
                        Explore {cur.title} <Arrow size={14} />
                      </Link>
                    </div>
                    <div className="wv-mega-groups">
                      {cur.groups.map((g) => (
                        <div key={g.title} className="wv-mega-group">
                          <Link href={g.href} className="wv-mega-gt" onClick={close}>
                            {g.title}
                          </Link>
                          <ul>
                            {g.leaves.map((l) => (
                              <li key={l.t}>
                                <Link href={l.href} onClick={close}>
                                  {l.t}
                                </Link>
                                {l.tag && <span className="wv-chip">{l.tag}</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <AnimatePresence>
        {drawer && (
          <motion.div
            id="wv-drawer"
            className="wv-drawer"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.55, ease }}
          >
            <Drawer onNavigate={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
