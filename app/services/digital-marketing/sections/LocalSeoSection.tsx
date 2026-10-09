'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import {
  ArrowRight, Check, FileText, MapPin, Mic, Navigation, Phone, Search, Star, Store, Wrench, X,
} from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, DUR, EASE, STAGGER } from '@/lib/gsap/reveals'

const WORK = [
  { Icon: Store,    label: 'Complete Google Profile' },
  { Icon: MapPin,   label: 'Same name, address, and phone everywhere' },
  { Icon: Star,     label: 'Get more reviews' },
  { Icon: FileText, label: 'A page for each area you serve' },
]

// Illustration only: example businesses, ratings, and distances.
const QUERY = 'plumber near me'
const RESULTS = [
  { name: 'Your Business',     rating: '4.8', full: 5, reviews: 320, km: '2.1', ours: true },
  { name: 'Another Plumber',   rating: '4.6', full: 4, reviews: 210, km: '3.4' },
  { name: 'City Plumbing Co.', rating: '4.4', full: 4, reviews: 184, km: '4.8' },
]
const PROFILE = ['Verified', 'Photos added', 'Services listed', 'Kept up to date']
const AREAS = ['Plumber in Koregaon Park', 'Plumber in Kharadi', 'Plumber in Viman Nagar']

// The search panel is the one coloured, rounded element on the page, on
// purpose: it imitates a phone search result so it reads instantly. The cards
// around it stay in the site's sharp black/white/yellow style.
const MAP = { land: '#EEF0EC', road: '#FFFFFF', water: '#CFE2EF', park: '#DCEBD3', pinRed: '#E5484D' }

function GoogleWordmark() {
  return (
    <span className="text-lg font-semibold tracking-tight">
      <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
    </span>
  )
}

function Stars({ full }: { full: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`local-star h-3.5 w-3.5 ${i < full ? 'fill-(--color-accent) text-(--color-accent)' : 'fill-(--color-border) text-(--color-border)'}`}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}

function Badge({ n }: { n: string }) {
  return (
    <span className="local-badge absolute -left-3 -top-3 z-20 grid h-9 w-9 place-items-center bg-(--color-accent) text-sm font-bold text-(--color-text)">
      {n}
    </span>
  )
}

/** Measured connector: panel anchor → card anchor, an elbow with a dot at each end. */
interface Link { d: string; a: [number, number]; b: [number, number] }

/** Layout position inside `root`, ignoring transforms (the listing climb moves rows mid-animation). */
function boxIn(el: HTMLElement, root: HTMLElement) {
  let x = 0, y = 0
  let n: HTMLElement | null = el
  while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null }
  return { left: x, top: y, right: x + el.offsetWidth, mid: y + el.offsetHeight / 2 }
}

export default function LocalSeoSection() {
  const scope = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [size, setSize] = useState({ w: 0, h: 0 })

  // Connectors only exist at xl, where panel and cards sit side by side.
  useLayoutEffect(() => {
    const el = stage.current
    if (!el) return
    const measure = () => {
      if (window.innerWidth < 1280) { setLinks([]); return }
      const at = (sel: string) => {
        const node = el.querySelector<HTMLElement>(sel)
        return node ? boxIn(node, el) : null
      }
      const pairs: [string, string][] = [['[data-from="1"]', '[data-to="1"]'], ['[data-from="2"]', '[data-to="2"]'], ['[data-from="3"]', '[data-to="3"]']]
      const next: Link[] = []
      for (const [f, t] of pairs) {
        const s = at(f), e = at(t)
        if (!s || !e) continue
        const a: [number, number] = [s.right, s.mid]
        const b: [number, number] = [e.left, e.mid]
        const mid = a[0] + (b[0] - a[0]) * 0.55
        next.push({ d: `M ${a[0]} ${a[1]} H ${mid} V ${b[1]} H ${b[0]}`, a, b })
      }
      setSize({ w: el.offsetWidth, h: el.offsetHeight })
      setLinks(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Story: query types → pins drop → your listing climbs 3rd → 1st and gets its
  // label → connectors draw out to the cards → badges pop, checks tick, stars
  // fill. Markup is the end state (you're already #1).
  useGsapSection(scope, (reduce) => {
    revealLines('#local-seo-heading', { trigger: scope.current })
    revealFadeUp('.local-copy', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    if (reduce) return

    const query = scope.current?.querySelector<HTMLElement>('.local-query')
    const rows = gsap.utils.toArray<HTMLElement>('.local-result')
    const rowStep = rows[1] ? rows[1].offsetTop - rows[0].offsetTop : 0
    const typed = { n: 0 }
    if (query) query.textContent = ''

    const tl = gsap.timeline({ scrollTrigger: { trigger: stage.current, start: 'top 70%' } })
    tl.from('.local-panel', { opacity: 0, y: 28, duration: DUR.base, ease: EASE.out })
      .to(typed, { n: QUERY.length, duration: 0.9, ease: 'none', onUpdate: () => { if (query) query.textContent = QUERY.slice(0, Math.round(typed.n)) } })
      .from('.local-pin', { y: -20, opacity: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base })
      .from(rows, { opacity: 0, duration: DUR.fast, stagger: STAGGER.tight }, '<')
      .from(rows[0], { y: rowStep * 2, duration: DUR.slow, ease: EASE.inOut }, '+=0.3')
      .from(rows.slice(1), { y: -rowStep, duration: DUR.slow, ease: EASE.inOut }, '<')
      .from('.local-label', { opacity: 0, scale: 0.8, duration: DUR.fast, ease: EASE.out }, '-=0.2')
    // Connectors only render at xl; skip their tweens when they aren't there
    if (links.length) {
      tl.from('.local-link-mask', { strokeDashoffset: 1, duration: DUR.base, ease: EASE.draw, stagger: STAGGER.loose })
        .from('.local-dot', { scale: 0, transformOrigin: 'center', duration: DUR.micro, stagger: 0.05 }, '<')
    }
    tl.from('.local-side', { opacity: 0, x: 20, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.loose }, '<0.1')
      .from('.local-badge', { scale: 0, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.loose }, '<0.1')
      .from('.local-tick', { opacity: 0, x: -6, duration: DUR.micro, stagger: 0.08 })
      .from('.local-area', { opacity: 0, x: 10, duration: DUR.fast, ease: EASE.out, stagger: STAGGER.base }, '<')

    gsap.fromTo('.local-radius', { scale: 0.5, opacity: 0.9 }, { scale: 1.4, opacity: 0, duration: 2.2, ease: 'none', repeat: -1 })
  }, [links.length])

  return (
    <section ref={scope} id="local-seo" className="scroll-mt-32 overflow-x-clip py-16 md:py-20" aria-labelledby="local-seo-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-12 xl:items-center xl:gap-10">

          {/* ── Copy ── */}
          <div className="xl:col-span-5">
            <h2 id="local-seo-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
              Be In The <span className="text-(--color-accent)">Top 3</span>{' '}
              <span className="xl:block">When People Search</span> Near You.
            </h2>
            <p className="local-copy mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
              When someone nearby searches for what you do, your business should
              be one of the first three they see.
            </p>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {WORK.map(({ Icon, label }) => (
                <li key={label} className="local-copy flex items-center gap-4 border border-(--color-border) bg-(--color-surface) p-3 pr-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center bg-(--color-accent)">
                    <Icon className="h-5 w-5 text-(--color-text)" strokeWidth={1.75} />
                  </span>
                  <span className="text-[15px] font-semibold leading-snug text-(--color-text)">{label}</span>
                </li>
              ))}
            </ul>

            <div className="local-copy mt-8">
              <Button href="#marketing-audit" variant="primary" size="lg" showArrow>
                Improve My Local Rankings
              </Button>
            </div>
          </div>

          {/* ── Illustration: example search, businesses, and reviews ── */}
          <div ref={stage} aria-hidden="true" className="relative xl:col-span-7">
            {links.length > 0 && (
              <svg className="pointer-events-none absolute inset-0 z-10 overflow-visible" width={size.w} height={size.h}>
                <defs>
                  {links.map((l, i) => (
                    <mask key={i} id={`local-m${i}`} maskUnits="userSpaceOnUse" x={-20} y={-20} width={size.w + 40} height={size.h + 40}>
                      <path className="local-link-mask" d={l.d} fill="none" stroke="#fff" strokeWidth={12} pathLength={1} strokeDasharray={1} strokeDashoffset={0} />
                    </mask>
                  ))}
                </defs>
                {links.map((l, i) => (
                  <g key={i}>
                    <path className="dash-march" d={l.d} fill="none" stroke="var(--color-text)" strokeWidth={1.25} strokeDasharray="4 4" mask={`url(#local-m${i})`} />
                    <circle className="local-dot" cx={l.a[0]} cy={l.a[1]} r={4} fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth={2} />
                    <circle className="local-dot" cx={l.b[0]} cy={l.b[1]} r={4} fill="var(--color-accent)" stroke="var(--color-surface)" strokeWidth={2} />
                  </g>
                ))}
              </svg>
            )}

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,24rem)_15.5rem] xl:items-center xl:justify-center xl:gap-14">

              {/* Search panel: compact, phone-sized */}
              <div className="local-panel mx-auto w-full max-w-sm rounded-2xl border border-(--color-border) bg-(--color-surface) p-3.5 shadow-[0_10px_40px_-12px_rgba(18,18,18,0.18)] xl:max-w-none">
                <div className="flex items-center gap-3">
                  <GoogleWordmark />
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-(--color-border) px-3 py-1.5 shadow-[0_1px_6px_rgba(18,18,18,0.08)]">
                    <span className="local-query min-h-5 min-w-0 flex-1 truncate text-sm text-(--color-text)">{QUERY}</span>
                    <X className="h-3.5 w-3.5 shrink-0 text-(--color-text-muted)" strokeWidth={2} />
                    <Mic className="h-3.5 w-3.5 shrink-0 text-[#4285F4]" strokeWidth={2} />
                    <Search className="h-3.5 w-3.5 shrink-0 text-[#4285F4]" strokeWidth={2.25} />
                  </div>
                </div>
                <div className="mt-3 flex gap-4 border-b border-(--color-border) px-1 text-xs text-(--color-text-muted)">
                  <span className="border-b-2 border-(--color-text) pb-2 font-semibold text-(--color-text)">All</span>
                  <span className="pb-2">Maps</span>
                  <span className="pb-2">Images</span>
                  <span className="pb-2">Shopping</span>
                  <span className="pb-2">More</span>
                </div>

                {/* Map */}
                <div data-from="1" className="relative mt-3 h-32 overflow-hidden rounded-xl">
                  <svg viewBox="0 0 520 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                    <rect width="520" height="200" fill={MAP.land} />
                    <path d="M330 0 C350 40 420 60 430 110 C440 160 400 190 420 200 H520 V0 Z" fill={MAP.water} />
                    <path d="M40 140 C60 120 110 130 120 150 C130 175 80 190 50 180 Z" fill={MAP.park} />
                    <path d="M200 20 C230 10 260 30 250 55 C240 75 205 70 195 50 Z" fill={MAP.park} />
                    <g stroke={MAP.road} strokeWidth="7" fill="none" strokeLinecap="round">
                      <path d="M0 120 C120 100 220 110 330 80 S470 40 520 30" />
                      <path d="M150 0 C170 60 160 140 190 200" />
                      <path d="M0 40 C90 60 200 50 300 70" />
                    </g>
                    <g stroke={MAP.road} strokeWidth="3" fill="none">
                      {[30, 70, 160, 220, 270].map((x) => <line key={x} x1={x} y1="0" x2={x + 30} y2="200" />)}
                      {[25, 90, 150, 180].map((y) => <line key={y} x1="0" y1={y} x2="330" y2={y - 20} />)}
                    </g>
                  </svg>
                  {[{ l: '15%', t: '38%' }, { l: '30%', t: '66%' }, { l: '80%', t: '74%' }].map((p, i) => (
                    <MapPin key={i} className="local-pin absolute h-6 w-6 -translate-x-1/2 -translate-y-full" style={{ left: p.l, top: p.t, color: MAP.pinRed, fill: MAP.pinRed }} stroke="#fff" strokeWidth={1.5} />
                  ))}
                  <div className="absolute left-[46%] top-[72%]">
                    <span className="local-radius absolute left-0 top-0 block h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--color-accent)/45" />
                    <MapPin className="local-pin relative h-9 w-9 -translate-x-1/2 -translate-y-full fill-(--color-accent) text-(--color-text)" strokeWidth={1.5} />
                  </div>
                  <span className="local-label absolute left-[54%] top-[24%] rounded-full border-2 border-(--color-accent) bg-(--color-surface) px-3 py-1 text-xs font-bold text-(--color-text) shadow-sm">
                    Your Business
                  </span>
                </div>

                {/* Listings: yours is first in the markup; the animation lifts it from third */}
                <ul className="mt-3 flex flex-col gap-2">
                  {RESULTS.map((r, i) => (
                    <li
                      key={r.name}
                      data-from={i === 0 ? '2' : i === 2 ? '3' : undefined}
                      className={`local-result relative flex items-center gap-3 rounded-xl border p-2.5 ${
                        r.ours ? 'z-10 border-2 border-(--color-accent) bg-[#FFFBE6]' : 'border-(--color-border) bg-(--color-surface)'
                      }`}
                    >
                      <span className={`grid h-12 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#d9dcdf] to-[#9aa1a8] ${r.ours ? '' : 'opacity-50'}`}>
                        <Wrench className="h-5 w-5 text-white" strokeWidth={1.75} />
                      </span>
                      <div className={`min-w-0 flex-1 ${r.ours ? '' : 'opacity-50'}`}>
                        <p className="truncate text-sm font-bold text-(--color-text)">{r.name}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-(--color-text-muted)">
                          {r.rating} <Stars full={r.full} /> ({r.reviews})
                        </p>
                        <p className="mt-0.5 text-xs text-(--color-text-muted)">Open · {r.km} km</p>
                      </div>
                      <div className={`flex shrink-0 gap-2.5 ${r.ours ? '' : 'opacity-50'}`}>
                        {[{ Icon: Phone, label: 'Call' }, { Icon: Navigation, label: 'Directions' }].map(({ Icon, label }) => (
                          <span key={label} className="flex flex-col items-center gap-0.5">
                            <span className="grid h-8 w-8 place-items-center rounded-full border border-(--color-border) bg-(--color-surface)">
                              <Icon className="h-3.5 w-3.5 text-(--color-text)" strokeWidth={2} />
                            </span>
                            <span className="text-[10px] text-(--color-text-muted)">{label}</span>
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full bg-(--color-bg-muted) px-5 py-2 text-xs font-medium text-(--color-text)">
                    More businesses <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {/* Side cards */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 xl:flex xl:flex-col xl:gap-8">
                <div data-to="1" className="local-side relative border border-(--color-border-strong) bg-(--color-surface) p-5">
                  <Badge n="01" />
                  <p className="flex items-center gap-3 text-[15px] font-bold text-(--color-text)">
                    <Store className="h-6 w-6" strokeWidth={1.75} /> Google Business Profile
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {PROFILE.map((item) => (
                      <li key={item} className="local-tick flex items-center gap-3 text-sm text-(--color-text)">
                        <span className="grid h-4 w-4 shrink-0 place-items-center bg-(--color-text)">
                          <Check className="h-3 w-3 text-(--color-surface)" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div data-to="2" className="local-side relative border border-(--color-border-strong) bg-(--color-surface) p-4">
                  <Badge n="02" />
                  <p className="flex items-center gap-3 px-1 text-[15px] font-bold text-(--color-text)">
                    <Star className="h-6 w-6" strokeWidth={1.75} /> More Reviews
                  </p>
                  <div className="mt-3 flex gap-3 border border-(--color-border) p-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-(--color-text) text-xs font-bold text-(--color-surface)">RK</span>
                    <div>
                      <Stars full={5} />
                      <p className="mt-1 text-[13px] leading-snug text-(--color-text-muted)">&ldquo;Came the same day and fixed it. Will call again.&rdquo;</p>
                    </div>
                  </div>
                </div>

                <div data-to="3" className="local-side relative border border-(--color-border-strong) bg-(--color-surface) p-4">
                  <Badge n="03" />
                  <p className="flex items-center gap-3 px-1 text-[15px] font-bold text-(--color-text)">
                    <MapPin className="h-6 w-6" strokeWidth={1.75} /> Location Pages
                  </p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {AREAS.map((a) => (
                      <li key={a} className="local-area flex items-center justify-between gap-2 border border-(--color-border) px-3 py-2 text-[13px] text-(--color-text)">
                        <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-(--color-text-muted)" strokeWidth={2} />{a}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-(--color-text-muted)" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
