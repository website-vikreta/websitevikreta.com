'use client'

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { AI_HREF, CONTACT, NAV, SERVICES } from './data'
import './nav/nav.css'
import { Arrow, Chevron, Logo, Magnetic, ease } from './ui'

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
  const toggle = (id: string) => setOpen((o) => (o === id ? null : id))
  const item = (i: number) => ({
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.1 + 0.05 * i, duration: 0.5, ease } },
  })
  const Acc = ({ id, title, children, i }: { id: string; title: string; children: React.ReactNode; i: number }) => {
    const isOpen = open === id
    return (
      <motion.div {...item(i)} className="wv-acc">
        <button className="wv-acc-btn" aria-expanded={isOpen} aria-controls={`wvd-${id}`} onClick={() => toggle(id)}>
          {title}
          <span className={`wv-plus${isOpen ? ' is-open' : ''}`} aria-hidden />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`wvd-${id}`}
              className="wv-acc-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
            >
              <div className="wv-acc-pad">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }
  let n = 0
  return (
    <div className="wv-drawer-in">
      {NAV.map((it) => {
        const i = n++
        if (it.kind === 'ai')
          return (
            <motion.div key={it.id} {...item(i)} className="wvn-d-ai">
              <Link href={AI_HREF} onClick={onNavigate} className="wv-nav-ai is-lg">
                <Snake />
                <Bolt /> {it.t} <Arrow size={14} />
              </Link>
            </motion.div>
          )
        if (it.kind === 'services')
          return (
            <Acc key={it.id} id="services" title={it.t} i={i}>
              {SERVICES.map((s) => (
                <div key={s.id} className="wvn-d-svc">
                  <Link href={s.href} className="wv-acc-gt" onClick={onNavigate}>
                    {s.title}
                  </Link>
                  {s.groups.map((g) => (
                    <div key={g.title} className="wv-acc-group">
                      <Link href={g.href} className="wvn-d-gt" onClick={onNavigate}>
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
                </div>
              ))}
              <Link href="/services" className="wv-link" onClick={onNavigate}>
                All services <Arrow size={14} />
              </Link>
            </Acc>
          )
        if (it.children)
          return (
            <Acc key={it.id} id={it.id} title={it.t} i={i}>
              <ul className="wvn-d-plain">
                {it.children.map((c) => (
                  <li key={c.t}>
                    <Link href={c.href} onClick={onNavigate}>
                      {c.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </Acc>
          )
        return (
          <motion.div key={it.id} {...item(i)} className="wv-acc">
            <Link href={it.href!} onClick={onNavigate} className="wv-acc-btn">
              {it.t}
            </Link>
          </motion.div>
        )
      })}
      <motion.div {...item(n)} className="wv-drawer-foot">
        <Link href="/contact" className="wv-btn wv-btn-y" onClick={onNavigate}>
          Book a free call <Arrow size={14} />
        </Link>
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </motion.div>
    </div>
  )
}

function ServicesPanel({ close }: { close: () => void }) {
  const [tab, setTab] = useState(SERVICES[0].id)
  const cur = SERVICES.find((s) => s.id === tab)!
  return (
    <div className="wv-mega-in wvn-svc">
      <div className="wv-mega-list" role="tablist" aria-orientation="vertical" aria-label="Services">
        {SERVICES.map((s) => (
          <button
            key={s.id}
            role="tab"
            id={`wv-tab-${s.id}`}
            aria-selected={s.id === tab}
            aria-controls="wv-tabpanel"
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
          id="wv-tabpanel"
          aria-labelledby={`wv-tab-${cur.id}`}
          className="wv-mega-panel"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2, ease }}
        >
          <div className="wv-mega-head">
            <div>
              <h3>{cur.title}</h3>
              <p>{cur.blurb}</p>
            </div>
            <Link href={cur.href} className="wv-link" onClick={close}>
              Explore {cur.title} <Arrow size={14} />
            </Link>
          </div>
            <div className={`wv-mega-groups${cur.groups.length > 4 ? ' is-many' : ''}`}>
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
  )
}

const panelMotion = {
  initial: { opacity: 0, y: -8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.22, ease },
}

export function Header() {
  const [openId, setOpenId] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const ptr = useRef('mouse')
  const root = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 24)
    setHidden(y > 240 && y > prev && !openId && !drawer)
  })

  const focusTrigger = (id: string) => root.current?.querySelector<HTMLElement>(`[data-nav="${id}"]`)?.focus()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openId) focusTrigger(openId)
      setOpenId(null)
      setDrawer(false)
    }
    const onDown = (e: PointerEvent) => {
      if (openId && !root.current?.contains(e.target as Node)) setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [openId])

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [drawer])

  const clear = () => timer.current && clearTimeout(timer.current)
  // Hover intent: short delay when nothing is open, instant switch between open panels.
  const hover = (id: string | null) => (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    clear()
    if (id === null || openId) return setOpenId(id)
    timer.current = setTimeout(() => setOpenId(id), 90)
  }
  const close = () => {
    clear()
    setOpenId(null)
    setDrawer(false)
  }
  const trig = (id: string) => ({
    'data-nav': id,
    'aria-expanded': openId === id,
    'aria-controls': `wvn-${id}`,
    onPointerDown: (e: React.PointerEvent) => void (ptr.current = e.pointerType),
    onPointerEnter: hover(id),
    onClick: (e: React.MouseEvent) => setOpenId((v) => (v === id && (e.detail === 0 || ptr.current !== 'mouse') ? null : id)),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setOpenId(id)
        requestAnimationFrame(() => document.querySelector<HTMLElement>(`#wvn-${id} a, #wvn-${id} [role=tab]`)?.focus())
      }
    },
  })

  return (
    <>
      <motion.header
        ref={root}
        className={`wv-header wvn-header${solid || openId ? ' is-solid' : ''}`}
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.35, ease }}
        onPointerLeave={(e) => {
          if (e.pointerType === 'mouse') timer.current = setTimeout(() => setOpenId(null), 180)
        }}
        onPointerEnter={clear}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenId(null)
        }}
      >
        <div className="wv-bar">
          <Link href="/" className="wv-logo" onClick={close} aria-label="Website Vikreta home">
            <Logo height={38} />
          </Link>
          <nav className="wvn-nav" aria-label="Primary">
            {NAV.map((n) => {
              if (!n.kind)
                return (
                  <Link key={n.id} href={n.href!} className="wv-nav-link" onPointerEnter={hover(null)} onClick={close}>
                    {n.t}
                  </Link>
                )
              if (n.kind === 'ai')
                return (
                  <Link key={n.id} href={AI_HREF} className="wv-nav-ai" onPointerEnter={hover(null)} onClick={close}>
                    <Snake />
                    <Bolt /> {n.t}
                  </Link>
                )
              const isOpen = openId === n.id
              return (
                <div key={n.id} className={`wvn-item${n.kind === 'menu' ? ' is-rel' : ''}`}>
                  <button type="button" className={`wv-nav-link${isOpen ? ' is-open' : ''}`} {...trig(n.id)}>
                    {n.t} <Chevron className="wv-chev" />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div id={`wvn-${n.id}`} className={`wvn-panel${n.kind === 'menu' ? ' is-menu' : ''}`} {...panelMotion}>
                        {n.kind === 'services' && <ServicesPanel close={close} />}
                        {n.kind === 'menu' && (
                          <ul className="wvn-menu">
                            {n.children!.map((c) => (
                              <li key={c.t}>
                                <Link href={c.href} onClick={close}>
                                  {c.t}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </nav>
          <div className="wv-bar-cta">
            <Magnetic>
              <Link href="/contact" className="wv-btn wv-btn-y wv-btn-sm" onClick={close}>
                Book a free call <Arrow size={14} />
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
