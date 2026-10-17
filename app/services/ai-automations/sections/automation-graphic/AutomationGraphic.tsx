'use client'

import { useEffect, useRef, type MouseEvent, type PointerEvent } from 'react'
import { ArrowRight, MousePointerClick } from 'lucide-react'
import { useAuditModal } from '@/components/ui/AuditModalProvider'
import {
  W, H, VIEW, u, TRIGGERS, STEPS, INTEGRATIONS, CARD, JL, JR, HUB_Y, STEP,
  LEGS, DASHED, SOLID, CHAIN_LEGS, PERIOD, CHIP_STAGES, buildCycle, legsFor, rowOf, type Step, type Selection,
} from './data'
import {
  TriggerNode, CoreCard, StepNode, IntegrationNode, Gear, Halo, glass,
  TRIGGER_ICONS, STEP_ICONS, Logo,
} from './nodes'

/*
 * Live rebuild of the AI Automations workflow illustration.
 *
 * Driver: one rAF loop spawns an event every PERIOD seconds (runs overlap, so
 * the system never stalls). Per frame it moves pooled particles along the
 * connectors, toggles `data-active` on nodes inside their timeline windows, and
 * fires one-shot WAAPI effects (gear kick, glow swell). A data chip rides each
 * run's lead particle and upgrades at TRANSFORM and AI. Everything else is CSS
 * reacting to those attributes — React renders once.
 *
 * Build-your-workflow: pick a trigger and a destination and the engine runs that
 * exact route; after one full run the hint turns into the audit CTA.
 *
 * Runs only while on screen; never under prefers-reduced-motion (the graphic is
 * then a still, fully drawn diagram with hover states only).
 */

const DOT_POOL = 6
/** Runs overlap (PERIOD < run length), so each in-flight run gets its own chip. */
const CHIP_POOL = 2
const INK = 'var(--color-text)'
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2)

interface Cycle {
  start: number; steps: Step[]; end: number; fired: Set<number>
  payload: readonly string[]; chip: number
}

const HINTS = {
  none:    'Pick a trigger, then where it should go',
  trigger: 'Now pick where it should go',
  dest:    'Now pick what sets it off',
  both:    'Running your workflow…',
}

export default function AutomationGraphic({ label }: { label: string }) {
  const root = useRef<HTMLDivElement>(null)
  const sel = useRef<Selection>({ t: null, i: null })
  const { openAuditModal } = useAuditModal()
  const hovered = useRef<string | null>(null)
  const respawn = useRef<() => void>(() => {})

  // ── Driver ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = new Map<string, HTMLElement[]>()
    el.querySelectorAll<HTMLElement>('[data-node]').forEach((n) => {
      const id = n.dataset.node!
      nodes.set(id, [...(nodes.get(id) ?? []), n])
    })
    const paths: Record<string, SVGPathElement> = {}
    const trails: Record<string, SVGPathElement> = {}
    const lengths: Record<string, number> = {}
    for (const leg of Object.keys(LEGS)) {
      paths[leg] = el.querySelector(`[data-path="${leg}"]`)!
      trails[leg] = el.querySelector(`[data-trail="${leg}"]`)!
      lengths[leg] = paths[leg].getTotalLength()
    }
    const dots = Array.from(el.querySelectorAll<SVGGElement>('[data-dot]'))
    const kicks = el.querySelectorAll<SVGGElement>('[data-gear-kick]')
    const swell = el.querySelector<HTMLElement>('[data-swell]')!
    const chips = Array.from(el.querySelectorAll<HTMLElement>('[data-chip]'))

    const setChip = (c: Cycle, stage: number) => {
      const chip = chips[c.chip]
      if (stage < 0) { chip.style.opacity = '0'; return }
      chip.querySelector('[data-chip-stage]')!.textContent = CHIP_STAGES[stage]
      chip.querySelector('[data-chip-text]')!.textContent = c.payload[stage]
      chip.style.opacity = '1'
      chip.firstElementChild!.animate(
        [{ transform: 'scale(0.85)', filter: 'brightness(1.08)' }, { transform: 'scale(1.06)', offset: 0.5 }, { transform: 'none' }],
        { duration: 450, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
      )
    }

    const coreFx = () => {
      kicks.forEach((g) =>
        g.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(90deg)' }], {
          duration: 1400, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', composite: 'add',
        }),
      )
      swell.animate(
        [{ opacity: 0, transform: 'scale(0.92)' }, { opacity: 1, transform: 'scale(1.04)', offset: 0.35 }, { opacity: 0, transform: 'scale(1.1)' }],
        { duration: 1900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      )
    }

    let cycles: Cycle[] = []
    let n = 0
    let clock = 0
    let nextSpawn = 0.3
    let last = 0
    let raf = 0
    let active = new Set<string>()
    let lit = new Set<string>()

    respawn.current = () => {
      cycles = []
      chips.forEach((c) => { c.style.opacity = '0' })
      nextSpawn = clock
    }

    const frame = (now: number) => {
      // Clamped delta: a backgrounded tab resumes mid-step instead of fast-forwarding.
      clock += Math.min(now - (last || now), 50) / 1000
      last = now

      if (clock >= nextSpawn) {
        cycles.push({ start: clock, ...buildCycle(n, sel.current), fired: new Set(), chip: n % CHIP_POOL })
        n++
        nextSpawn = clock + PERIOD
      }

      let slot = 0
      const nowActive = new Set<string>()
      const nowLit = new Set<string>()
      // px per canvas unit, for positioning chips with a cheap transform.
      const k = chips[0].parentElement!.clientWidth / W
      for (const c of cycles) {
        const t = clock - c.start
        const lead: { pt: DOMPoint | null } = { pt: null }
        c.steps.forEach((s, i) => {
          if ('node' in s) {
            if (t >= s.at && t < s.at + s.hold) nowActive.add(s.node)
          } else if ('fx' in s || 'chip' in s) {
            if (t >= s.at && !c.fired.has(i)) {
              c.fired.add(i)
              if ('chip' in s) setChip(c, s.chip)
              else if (s.fx === 'core') coreFx()
              else showCta(true)
            }
          } else if (t >= s.at && t < s.at + s.dur && slot < DOT_POOL) {
            const raw = (t - s.at) / s.dur
            const len = lengths[s.leg]
            const pos = easeInOut(raw) * len
            const pt = paths[s.leg].getPointAtLength(pos)
            lead.pt ??= pt
            const dot = dots[slot++]
            dot.setAttribute('transform', `translate(${pt.x} ${pt.y})`)
            dot.style.opacity = String(Math.min(1, raw / 0.08, (1 - raw) / 0.08))
            // Soft comet: a short accent stroke that ends at the particle.
            const tl = Math.min(140, len)
            trails[s.leg].style.strokeDasharray = `${tl} ${len + tl}`
            trails[s.leg].style.strokeDashoffset = String(tl - pos)
            trails[s.leg].style.opacity = String(Math.min(1, (1 - raw) / 0.15))
            nowLit.add(s.leg)
          }
        })
        // The chip rides just above the run's lead particle (and waits where it stops);
        // in the pipeline it floats over the row instead of covering the step tiles.
        if (lead.pt) {
          const y = lead.pt.y > STEP.y - 30 ? STEP.y - 10 : lead.pt.y - 22
          // On the trigger lines, hang it off to the right so it never covers trigger copy.
          const ax = lead.pt.x < JL.x ? '-12%' : '-50%'
          chips[c.chip].style.transform = `translate(${lead.pt.x * k}px, ${y * k}px) translate(${ax}, -100%)`
        }
      }
      cycles = cycles.filter((c) => clock - c.start < c.end + 0.1)

      for (; slot < DOT_POOL; slot++) dots[slot].style.opacity = '0'
      for (const leg of lit) if (!nowLit.has(leg)) trails[leg].style.opacity = '0'
      for (const id of active) if (!nowActive.has(id)) nodes.get(id)?.forEach((e) => e.removeAttribute('data-active'))
      for (const id of nowActive) if (!active.has(id)) nodes.get(id)?.forEach((e) => e.setAttribute('data-active', ''))
      active = nowActive
      lit = nowLit
      raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf)
        el.toggleAttribute('data-running', entry.isIntersecting)
        if (entry.isIntersecting) {
          last = 0
          raf = requestAnimationFrame(frame)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      respawn.current = () => {}
    }
  }, [])

  /** Swap the hint for the audit CTA (and make the button reachable only while it shows). */
  const showCta = (on: boolean) => {
    const el = root.current
    if (!el) return
    el.toggleAttribute('data-cta', on)
    const btn = el.querySelector<HTMLButtonElement>('[data-cta-button]')!
    btn.tabIndex = on ? 0 : -1
    btn.setAttribute('aria-hidden', String(!on))
  }

  // ── Hover + click focus ──────────────────────────────────────────────────
  const paint = () => {
    const el = root.current
    if (!el) return
    const { t, i } = sel.current
    const h = hovered.current
    const on = new Set<string>([
      ...(h ? legsFor(h) : []),
      ...(t !== null ? [`t${t}`, ...CHAIN_LEGS] : []),
      ...(i !== null ? [...CHAIN_LEGS, `b${rowOf(i)}`] : []),
    ])
    el.querySelectorAll<SVGPathElement>('[data-ghost]').forEach((g) => g.toggleAttribute('data-on', on.has(g.dataset.ghost!)))
    el.querySelectorAll<HTMLElement>('[data-kind="trigger"], [data-kind="int"]').forEach((node) => {
      const id = node.dataset.node!
      const picked = id[0] === 't' ? t : i
      node.toggleAttribute('data-dim', picked !== null && id !== `${id[0]}${picked}`)
      node.toggleAttribute('data-quiet', picked === null && i === null && Boolean(h?.startsWith('i')) && id[0] === 'i' && id !== h)
    })
    const hint = el.querySelector('[data-hint-text]')!
    hint.textContent = t !== null && i !== null ? HINTS.both : t !== null ? HINTS.trigger : i !== null ? HINTS.dest : HINTS.none
  }
  const nodeAt = (target: EventTarget) => (target as Element).closest<HTMLElement>('[data-kind]')?.dataset.node ?? null
  const onPointerOver = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const id = nodeAt(e.target)
    if (id !== hovered.current) { hovered.current = id; paint() }
  }
  const onPointerLeave = () => { hovered.current = null; paint() }
  // Pick a trigger and/or a destination to run that route; click a pick again to drop it.
  const onClick = (e: MouseEvent) => {
    const id = nodeAt(e.target)
    if (!id || !/^[ti]\d/.test(id)) return
    const key = id[0] === 't' ? 't' : 'i'
    const idx = Number(id.slice(1))
    sel.current = { ...sel.current, [key]: sel.current[key] === idx ? null : idx }
    showCta(false)
    paint()
    respawn.current()
  }

  return (
    <div
      ref={root}
      data-graphic
      className="group/graphic @container relative isolate select-none"
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      <div role="img" aria-label={label}>
      {/* Desktop / tablet: the full canvas, viewed through VIEW (cropped to the content) */}
      <div className="relative hidden @[40rem]:block" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
        <div className="absolute" style={{ left: u(-VIEW.x), top: u(-VIEW.y), width: u(W), height: u(H) }}>
          <Glow />
          <Wires />
          {TRIGGERS.map((t, i) => <TriggerNode key={t.id} index={i} />)}
          <CoreCard />
          {STEPS.map((s, i) => <StepNode key={s.id} index={i} />)}
          {INTEGRATIONS.map((_, i) => <IntegrationNode key={i} index={i} />)}
          <Particles />
          {Array.from({ length: CHIP_POOL }, (_, i) => <DataChip key={i} />)}
        </div>
      </div>

      <MobileFlow />
      </div>

      {/* Hint → CTA. Outside the role="img" so the button stays a real, reachable control. */}
      <div className="relative mx-auto mb-5 grid w-fit place-items-center @[40rem]:absolute @[40rem]:bottom-[1.4%] @[40rem]:left-[47%] @[40rem]:mb-0 @[40rem]:-translate-x-1/2">
        <p
          className="col-start-1 row-start-1 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-[11px] text-(--color-text-muted) transition-opacity duration-300 group-data-cta/graphic:opacity-0 @[40rem]:text-[length:max(10px,1.05cqw)]"
          style={glass(999, (n) => `${n}px`)}
        >
          <MousePointerClick strokeWidth={1.75} className="size-[1.2em] shrink-0 text-(--color-text)" />
          <span data-hint-text>{HINTS.none}</span>
        </p>
        <button
          type="button"
          data-cta-button
          tabIndex={-1}
          aria-hidden="true"
          onClick={(e) => { e.stopPropagation(); openAuditModal() }}
          className="pointer-events-none col-start-1 row-start-1 flex translate-y-1 items-center gap-1.5 whitespace-nowrap rounded-full bg-(--color-text) px-4 py-2 font-sans text-[12px] font-medium text-(--color-surface) opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text) group-data-cta/graphic:pointer-events-auto group-data-cta/graphic:translate-y-0 group-data-cta/graphic:opacity-100 @[40rem]:text-[length:max(11px,1.15cqw)]"
        >
          Want this workflow built? Book a free audit
          <ArrowRight strokeWidth={2} className="size-[1.1em] text-(--color-accent)" />
        </button>
      </div>
    </div>
  )
}

/** The data riding a run: stage label + payload, upgraded in place by the driver. */
function DataChip() {
  return (
    <div data-chip aria-hidden="true" className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity duration-300 will-change-transform">
      <div
        className="flex items-center whitespace-nowrap font-sans text-(--color-text)"
        style={{ ...glass(999), gap: u(8), padding: `${u(6)} ${u(14)}`, fontSize: u(15) }}
      >
        <span data-chip-stage className="font-mono uppercase tracking-[0.12em] text-(--color-text-faint)" style={{ fontSize: u(10.5) }}>Incoming</span>
        <span data-chip-text className="font-medium" />
      </div>
    </div>
  )
}

// ── Layers ────────────────────────────────────────────────────────────────────
const svg = { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none', fill: 'none', 'aria-hidden': true } as const
const pct = (v: number, of: number) => `${(v / of) * 100}%`

/** Soft accent energy behind the engine: always breathing, swells when data lands. */
function Glow() {
  const cx = CARD.x + CARD.w / 2
  const cy = CARD.y + CARD.h / 2 + 10
  const style = {
    left: pct(cx - 420, W), top: pct(cy - 320, H), width: pct(840, W), height: pct(640, H),
    background: 'radial-gradient(closest-side, rgb(255 214 0 / 0.85), rgb(255 214 0 / 0.45) 50%, rgb(255 214 0 / 0.12) 75%, transparent)',
  }
  return (
    <>
      <div aria-hidden="true" className="ag-breathe pointer-events-none absolute -z-[1] blur-2xl" style={style} />
      <div aria-hidden="true" data-swell className="pointer-events-none absolute -z-[1] opacity-0 blur-2xl" style={style} />
    </>
  )
}

function Wires() {
  const portY = HUB_Y
  return (
    <svg {...svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <marker id="ag-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill={INK} />
        </marker>
      </defs>

      {DASHED.map((leg) => (
        <path key={leg} d={LEGS[leg]} stroke={INK} strokeOpacity={0.55} strokeWidth={2} strokeDasharray="7 7" strokeLinecap="round" className="ag-march" markerEnd="url(#ag-arrow)" />
      ))}
      {SOLID.map((leg) => <path key={leg} d={LEGS[leg]} stroke={INK} strokeWidth={2.2} markerEnd="url(#ag-arrow)" />)}
      <path d={`M${JR.x - 12},${HUB_Y} H${CARD.x + CARD.w + 8}`} stroke={INK} strokeWidth={2.2} markerEnd="url(#ag-arrow)" />

      {/* Half-round ports where the hub lines meet the card */}
      <path d={`M${CARD.x},${portY - 42} A42,42 0 0 0 ${CARD.x},${portY + 42}`} stroke={INK} strokeOpacity={0.35} strokeWidth={1.8} />
      <path d={`M${CARD.x + CARD.w},${portY - 42} A42,42 0 0 1 ${CARD.x + CARD.w},${portY + 42}`} stroke={INK} strokeOpacity={0.35} strokeWidth={1.8} />

      {Object.entries(LEGS).map(([leg, d]) => (
        <g key={leg}>
          <path data-path={leg} d={d} />
          <path data-ghost={leg} d={d} stroke={INK} strokeWidth={2.4} strokeLinecap="round" className="opacity-0 transition-opacity duration-300 data-on:opacity-70" />
          <path data-trail={leg} d={d} stroke="var(--color-accent-dark)" strokeWidth={4} strokeLinecap="round" opacity={0} />
        </g>
      ))}

      {[{ id: 'jl', ...JL }, { id: 'jr', ...JR }].map((j) => (
        <g key={j.id} data-node={j.id} className="group/node">
          <circle cx={j.x} cy={j.y} r={26} fill="var(--color-accent)" className="origin-center scale-50 opacity-0 transition-[opacity,transform] duration-500 ease-out [transform-box:fill-box] group-data-active/node:scale-100 group-data-active/node:opacity-40" />
          <circle cx={j.x} cy={j.y} r={11} fill="var(--color-accent)" stroke={INK} strokeWidth={2.4} className="origin-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] [transform-box:fill-box] group-data-active/node:scale-[1.35]" />
        </g>
      ))}
    </svg>
  )
}

function Particles() {
  return (
    <svg {...svg} className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      {Array.from({ length: DOT_POOL }, (_, i) => (
        <g key={i} data-dot opacity={0}>
          <circle r={20} fill="var(--color-accent)" opacity={0.3} />
          <circle r={8} fill="var(--color-accent)" stroke={INK} strokeWidth={2.2} />
        </g>
      ))}
    </svg>
  )
}

// ── Mobile stack ──────────────────────────────────────────────────────────────
const MOBILE_NODE = 'group/node relative transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] data-active:-translate-y-0.5 data-active:scale-[1.03] data-dim:opacity-40'
const px = (n: number) => `${n}px`

function Flow() {
  return (
    <div aria-hidden="true" className="relative mx-auto my-2 h-9 w-0 border-l-2 border-dashed border-(--color-text)/40">
      <span className="ag-flow absolute -left-[6px] top-0 size-2.5 rounded-full border-2 border-(--color-text) bg-(--color-accent)" />
    </div>
  )
}

function MobileFlow() {
  return (
    <div className="relative px-4 py-6 font-sans text-(--color-text) @[40rem]:hidden">
      <div className="grid grid-cols-2 gap-2">
        {TRIGGERS.map((t) => {
          const Icon = TRIGGER_ICONS[t.icon]
          return (
            <div key={t.id} data-node={t.id} data-kind="trigger" className={`${MOBILE_NODE} flex cursor-pointer items-center gap-2 p-1.5 pr-3`} style={glass(999, px)}>
              <Halo radius="9999px" k={px} />
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-(--color-bg-muted)"><Icon strokeWidth={1.75} className="size-[18px]" /></span>
              <span className="text-[12px] font-semibold leading-tight">{t.title}</span>
            </div>
          )
        })}
      </div>

      <Flow />
      <div data-node="card" className={`${MOBILE_NODE} mx-auto flex w-fit items-center gap-3 px-4 py-3`} style={{ ...glass(18, px), boxShadow: `${glass(18, px).boxShadow}, 0 0 40px rgb(255 214 0 / 0.35)` }}>
        <Halo radius="18px" k={px} />
        <span className="relative block size-12 shrink-0"><Gear style={{ inset: 0, width: '100%', height: '100%' }} /></span>
        <span>
          <span className="block text-lg font-bold leading-tight tracking-tight">Automation Tool</span>
          <span className="block text-[11px] text-(--color-text-muted)">Connect · Orchestrate · Automate</span>
        </span>
      </div>

      <Flow />
      <div className="grid grid-cols-4 gap-1.5">
        {STEPS.map((s) => {
          const Icon = STEP_ICONS[s.icon]
          return (
            <div key={s.id} data-node={s.id} className={`${MOBILE_NODE} flex flex-col items-center gap-1 px-1 py-2.5`} style={glass(12, px)}>
              <Halo radius="12px" k={px} strong={s.id === 's2'} />
              <Icon strokeWidth={1.6} className="size-5" />
              <span className="text-center text-[8.5px] font-semibold uppercase leading-tight tracking-wide">{s.label.join(' ')}</span>
            </div>
          )
        })}
      </div>

      <Flow />
      <div className="grid grid-cols-3 gap-2">
        {INTEGRATIONS.map((lines, i) => {
          return (
            <div key={i} data-node={`i${i}`} data-kind="int" className={`${MOBILE_NODE} flex cursor-pointer flex-col items-center gap-1.5 px-1 py-3`} style={glass(14, px)}>
              <Halo radius="14px" k={px} />
              <span className="block size-6"><Logo index={i} /></span>
              <span className="text-center text-[10px] font-medium leading-tight">{lines.join(' ')}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
