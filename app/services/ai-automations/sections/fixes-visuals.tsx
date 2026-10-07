'use client'

import { useEffect, useRef, useState, type ComponentType } from 'react'
import Image from 'next/image'
import useMeasure from 'react-use-measure'
import { AnimatePresence, motion, useAnimate, useInView, useReducedMotion } from 'motion/react'
import {
  FileText, Webhook, Mail, Zap, Image as ImageIcon, Type, Video, Sparkles,
  Truck, Undo2, CreditCard, Check,
} from 'lucide-react'

/*
 * Bento visuals for FixesSection. Each card plays one small "run" at a time
 * (input → work → result, narrated by a status pill) instead of looping
 * decoration. JS timelines only tick while the card is in view; the few CSS
 * loops (fx-* in globals.css) pause off screen via [data-running]. Hovering a
 * card speeds its run up. Under reduced motion every visual is a still frame.
 */

const EASE_IO = [0.65, 0, 0.35, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))
/** Time multiplier: < 1 while the pointer is over the card, so hover makes the run snappier. */
const pace = (el?: Element | null) => (el?.closest('.group')?.matches(':hover') ? 0.55 : 1)

type Pill = { tag: string; text: string }

function StatusPill({ pill }: { pill: Pill }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pill.text}
        initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="flex items-center gap-2 whitespace-nowrap rounded-full border border-(--color-border) bg-(--color-surface) px-3 py-1.5 shadow-[0_6px_16px_-10px_rgb(0_0_0/0.2)]"
      >
        <span className="hidden text-[9px] font-semibold uppercase tracking-[0.12em] text-(--color-text-faint) sm:inline">{pill.tag}</span>
        <span className="text-[11px] font-medium text-(--color-text)">{pill.text}</span>
      </motion.div>
    </AnimatePresence>
  )
}

/* ── Workflow automation ──────────────────────────────────────── */

/*
 * Not an ambient loop: one run plays at a time, like a real execution log.
 * A trigger lights up → its payload travels to the engine → the engine kicks
 * and enriches it → it fans out to two apps → each confirms with a check.
 * One imperative useAnimate timeline drives everything; React only re-renders
 * the status pill. Runs only while on screen; still frame under reduced motion.
 */

const TRIGGERS: { Icon: ComponentType<{ className?: string }>; label: string }[] = [
  { Icon: FileText, label: 'Form' },
  { Icon: Webhook, label: 'Webhook' },
  { Icon: Mail, label: 'Email' },
]
const OUTPUTS = [
  { file: 'slack-icon', label: 'Slack' },
  { file: 'whatsapp-icon', label: 'WhatsApp' },
  { file: 'google-sheets', label: 'Google Sheets' },
  { file: 'google-gmail', label: 'Gmail' },
  { file: 'shopify', label: 'Shopify' },
]
const RUNS = [
  { trigger: 0, outs: [0, 2], incoming: 'New lead · Priya S.', enriched: 'Scored: hot lead', done: 'Sales pinged · row added' },
  { trigger: 1, outs: [1, 4], incoming: 'Order #4821 paid', enriched: 'Matched to customer', done: 'Customer updated · stock synced' },
  { trigger: 2, outs: [2, 3], incoming: 'Invoice from Acme', enriched: 'Extracted ₹18,400', done: 'Logged · reply drafted' },
]
const TILE = 44
const HUB = 64
const IN_Y = [0.2, 0.5, 0.8]
const OUT_Y = [0.1, 0.3, 0.5, 0.7, 0.9]
const HUB_Y = 0.42

/** Horizontal-tangent cubic between two px points. */
const curve = (ax: number, ay: number, bx: number, by: number) => {
  const mx = (ax + bx) / 2
  return `M${ax} ${ay} C${mx} ${ay} ${mx} ${by} ${bx} ${by}`
}

function Wire({ id, d }: { id: string; d: string }) {
  return (
    <>
      <path data-base={id} d={d} stroke="#121212" strokeOpacity={0.12} strokeWidth={1} fill="none" />
      {/* the route "lit" behind the travelling head: drawn 1→0 by dashoffset, butt caps so nothing peeks at rest */}
      <path data-lit={id} d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1} stroke="#E0B800" strokeWidth={1.75} fill="none" opacity={0} />
    </>
  )
}

/** Glowing head that rides a wire via CSS offset-path (coords match the px viewBox). */
function Head({ id, d }: { id: string; d: string }) {
  return (
    <span
      data-head={id}
      className="absolute left-0 top-0 size-2.5 rounded-full bg-[#E0B800] shadow-[0_0_0_3px_rgb(255_214_0/0.35),0_0_16px_5px_rgb(255_214_0/0.55)]"
      style={{ offsetPath: `path('${d}')`, offsetDistance: '0%', offsetRotate: '0deg', opacity: 0 }}
    />
  )
}

/** `latent` ports (the hub's) stay invisible until a beam lights them, so the hub doesn't read as a pinned chip. */
function Port({ id, x, y, latent = false }: { id: string; x: number; y: number; latent?: boolean }) {
  return (
    <span
      data-port={id}
      className={`absolute size-[7px] ${latent ? 'opacity-0 data-[active]:opacity-100' : ''} -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--color-border-strong) bg-(--color-surface) transition-[background-color,border-color,box-shadow,opacity] duration-300 data-[active]:border-[#E0B800] data-[active]:bg-(--color-accent) data-[active]:shadow-[0_0_0_3px_rgb(255_214_0/0.3)]`}
      style={{ left: x, top: y }}
    />
  )
}

export function WorkflowVisual() {
  const [measureRef, { width: w, height: h }] = useMeasure()
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const inView = useInView(scope, { margin: '-15% 0px' })
  const reduced = useReducedMotion()
  const [pill, setPill] = useState<Pill>({ tag: 'Incoming', text: RUNS[0].incoming })
  const ready = w > 0

  useEffect(() => {
    if (!ready || !inView || reduced) return
    let alive = true
    const root = scope.current
    const $ = (sel: string) => root?.querySelectorAll(sel) ?? []
    const one = (sel: string) => root?.querySelector<HTMLElement>(sel) ?? null
    const sleep = (ms: number) => wait(ms * pace(root))
    const on = (sel: string) => one(sel)?.setAttribute('data-active', '')

    // Head rides the wire, the lit route draws in behind it, ports light at each end.
    const beam = async (id: string, duration: number) => {
      const d = duration * pace(root)
      on(`[data-port="${id}-a"]`)
      animate($(`[data-base="${id}"]`), { strokeOpacity: 0.3 }, { duration: 0.3 })
      animate($(`[data-lit="${id}"]`), { opacity: 1, strokeDashoffset: [1, 0] }, { duration: d, ease: EASE_IO })
      animate($(`[data-head="${id}"]`), { opacity: [0, 1, 1, 0] }, { duration: d, times: [0, 0.08, 0.88, 1] })
      await animate($(`[data-head="${id}"]`), { offsetDistance: ['0%', '100%'] }, { duration: d, ease: EASE_IO })
      on(`[data-port="${id}-b"]`)
    }
    const unlit = (id: string) => {
      animate($(`[data-base="${id}"]`), { strokeOpacity: 0.12 }, { duration: 0.5 })
      animate($(`[data-lit="${id}"]`), { opacity: 0 }, { duration: 0.5 })
    }

    ;(async () => {
      for (let n = 0; alive; n++) {
        const run = RUNS[n % RUNS.length]
        const trig = one(`[data-trigger="${run.trigger}"]`)
        const outs = run.outs.map((o) => one(`[data-out="${o}"]`))

        // 1 · trigger fires
        setPill({ tag: 'Incoming', text: run.incoming })
        trig?.setAttribute('data-active', '')
        if (trig) animate(trig, { scale: [1, 1.05, 1] }, { duration: 0.5, ease: EASE_OUT })
        await sleep(400)
        if (!alive) break

        // 2 · payload travels to the engine
        await beam(`in-${run.trigger}`, 1.1)
        if (!alive) break

        // 3 · engine kicks and enriches
        animate($('[data-hub]'), { scale: [1, 1.1, 1] }, { type: 'spring', visualDuration: 0.5, bounce: 0.45 })
        animate($('[data-hub-glow]'), { opacity: [0.35, 1, 0.35], scale: [1, 1.3, 1] }, { duration: 1.2, ease: EASE_OUT })
        animate($('[data-hub-bolt]'), { rotate: [0, -14, 0], scale: [1, 1.15, 1] }, { duration: 0.55, ease: EASE_OUT })
        setPill({ tag: 'AI step', text: run.enriched })
        await sleep(700)
        if (!alive) break

        // 4 · fan out, staggered
        await Promise.all(run.outs.map((o, k) => sleep(k * 200).then(() => beam(`out-${o}`, 1))))
        if (!alive) break

        // 5 · destinations confirm
        outs.forEach((el, k) => {
          if (!el) return
          el.setAttribute('data-active', '')
          const spring = { type: 'spring', visualDuration: 0.4, bounce: 0.5, delay: k * 0.08 } as const
          animate(el.querySelector('[data-tile]')!, { scale: [1, 1.12, 1] }, spring)
          animate(el.querySelector('[data-check]')!, { scale: [0, 1], opacity: [0, 1] }, spring)
          animate(el.querySelector('[data-label]')!, { opacity: [0, 1], x: [6, 0] }, { duration: 0.35, ease: EASE_OUT, delay: 0.1 + k * 0.08 })
        })
        setPill({ tag: 'Done', text: run.done })
        await sleep(1700)
        if (!alive) break

        // 6 · settle
        trig?.removeAttribute('data-active')
        unlit(`in-${run.trigger}`)
        run.outs.forEach((o) => unlit(`out-${o}`))
        $('[data-port][data-active]').forEach((el) => el.removeAttribute('data-active'))
        outs.forEach((el) => {
          if (!el) return
          el.removeAttribute('data-active')
          animate(el.querySelector('[data-check]')!, { scale: 0, opacity: 0 }, { duration: 0.25 })
          animate(el.querySelector('[data-label]')!, { opacity: 0 }, { duration: 0.25 })
        })
        await sleep(600)
      }
    })()
    return () => {
      alive = false
      // Leaving mid-run: drop back to the idle frame so the next run starts clean.
      root?.querySelectorAll('[data-active]').forEach((el) => el.removeAttribute('data-active'))
      root?.querySelectorAll<HTMLElement>('[data-check], [data-label], [data-head]').forEach((el) => { el.style.opacity = '0' })
      root?.querySelectorAll('[data-base]').forEach((el) => el.setAttribute('stroke-opacity', '0.12'))
      root?.querySelectorAll<SVGPathElement>('[data-lit]').forEach((el) => { el.style.opacity = '0' })
    }
  }, [ready, inView, reduced, animate, scope])

  // Layout in px from the measured box, so wires meet node edges exactly at every width.
  const wide = w >= 520
  const tile = h < 220 ? 34 : TILE // 5 tiles must fit the short mobile box
  const trigW = wide ? 124 : tile
  const hubX = (trigW + (w - tile)) / 2
  const hubY = h * HUB_Y
  // Wires land on separate ports along the hub's flat edges instead of one pinch point.
  const wires = [
    ...TRIGGERS.map((_, i) => ({ id: `in-${i}`, a: [trigW, h * IN_Y[i]], b: [hubX - HUB / 2, hubY + (i - 1) * 12] })),
    ...OUTPUTS.map((_, i) => ({ id: `out-${i}`, a: [hubX + HUB / 2, hubY + (i - 2) * 8], b: [w - tile, h * OUT_Y[i]] })),
  ].map((wire) => ({ ...wire, d: curve(wire.a[0], wire.a[1], wire.b[0], wire.b[1]) }))

  return (
    <>
      {/* builder-canvas dot grid, faded at the edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgb(18_18_18/0.09)_1px,transparent_1.2px)] bg-size-[18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_80%)]" aria-hidden="true" />
      <div ref={measureRef} className="absolute inset-x-6 top-6 bottom-6" aria-hidden="true">
        <div ref={scope} className="absolute inset-0">
          {ready && (
            <>
              <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 size-full overflow-visible">
                {wires.map(({ id, d }) => <Wire key={id} id={id} d={d} />)}
              </svg>

              {TRIGGERS.map(({ Icon, label }, i) => (
                <div
                  key={label}
                  data-trigger={i}
                  className="group/t absolute flex -translate-y-1/2 items-center gap-2.5 rounded-xl border border-(--color-border) bg-(--color-surface) px-2.5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_6px_16px_-8px_rgb(0_0_0/0.12)] transition-[border-color,box-shadow] duration-500 data-[active]:border-(--color-text) data-[active]:shadow-[0_1px_2px_rgb(0_0_0/0.04),0_10px_24px_-10px_rgb(0_0_0/0.3)]"
                  style={{ left: 0, top: h * IN_Y[i], width: trigW, height: wide ? 40 : tile, justifyContent: wide ? 'flex-start' : 'center' }}
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-(--color-bg-muted) text-(--color-text) transition-colors duration-500 group-data-[active]/t:bg-(--color-accent)">
                    <Icon className="size-3.5" />
                  </span>
                  {wide && <span className="text-xs font-medium text-(--color-text)">{label}</span>}
                  {wide && <span className="ml-auto size-1.5 rounded-full bg-(--color-border-strong) transition-colors duration-500 group-data-[active]/t:bg-[#22C55E]" />}
                </div>
              ))}

              <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: hubX, top: hubY, width: HUB, height: HUB }}>
                <span data-hub-glow className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgb(255_214_0/0.45),transparent)] opacity-35" />
                <div data-hub className="relative flex size-full items-center justify-center rounded-2xl bg-(--color-text) shadow-[inset_0_1px_0_rgb(255_255_255/0.14),0_14px_32px_-12px_rgb(0_0_0/0.5)]">
                  <Zap data-hub-bolt className="size-7 fill-(--color-accent) text-(--color-accent)" />
                </div>
              </div>

              <div className="absolute -translate-x-1/2" style={{ left: hubX, top: hubY + HUB / 2 + 18 }}>
                <StatusPill pill={pill} />
              </div>

              {OUTPUTS.map((o, i) => (
                <div key={o.label} data-out={i} className="group/o absolute -translate-y-1/2" style={{ left: w - tile, top: h * OUT_Y[i], width: tile, height: tile }}>
                  <span data-label className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-(--color-text) px-2 py-1 text-[10px] font-medium text-(--color-bg)" style={{ opacity: 0 }}>
                    {o.label}
                  </span>
                  <div data-tile className="flex size-full items-center justify-center rounded-xl border border-(--color-border) bg-(--color-surface) shadow-[0_1px_2px_rgb(0_0_0/0.04),0_6px_16px_-8px_rgb(0_0_0/0.12)] transition-[border-color] duration-500 group-data-[active]/o:border-(--color-text)">
                    <Image src={`/services/integrations/${o.file}.svg`} alt="" width={20} height={20} className="size-5" />
                  </div>
                  <span data-check className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-(--color-text)" style={{ opacity: 0, transform: 'scale(0)' }}>
                    <Check className="size-2.5 text-(--color-accent)" strokeWidth={3} />
                  </span>
                </div>
              ))}

              {wires.map(({ id, a, b }) => (
                <span key={id}>
                  <Port id={`${id}-a`} x={a[0]} y={a[1]} latent={id.startsWith('out')} />
                  <Port id={`${id}-b`} x={b[0]} y={b[1]} latent={id.startsWith('in')} />
                </span>
              ))}
              {wires.map(({ id, d }) => <Head key={id} id={id} d={d} />)}
            </>
          )}
        </div>
      </div>
    </>
  )
}

/* ── Bulk content ─────────────────────────────────────────────── */

/*
 * One sheet row at a time: the highlight lands on a row, that row becomes a
 * file, the file slides into the tray, the counter rolls. Rows loop; the
 * counter never does.
 */

const OUTPUT_TYPES: { Icon: ComponentType<{ className?: string }>; name: (n: string) => string }[] = [
  { Icon: ImageIcon, name: (n) => `post-${n}.png` },
  { Icon: Type, name: (n) => `caption-${n}.txt` },
  { Icon: Video, name: (n) => `reel-${n}.mp4` },
  { Icon: FileText, name: (n) => `catalog-${n}.pdf` },
]
const ROW_W = [0.9, 0.7, 0.8, 0.6]
const ROW_H = 24
const pad = (n: number) => String(n).padStart(3, '0')

export function BulkContentVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const reduced = useReducedMotion()
  const [n, setN] = useState(3) // files generated so far; starts non-zero so the tray isn't empty

  useEffect(() => {
    if (!inView || reduced) return
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      setN((c) => c + 1)
      t = setTimeout(tick, 1300 * pace(ref.current))
    }
    t = setTimeout(tick, 900)
    return () => clearTimeout(t)
  }, [inView, reduced])

  const row = n % ROW_W.length
  const recent = [n, n - 1, n - 2, n - 3]

  return (
    <div ref={ref} className="absolute inset-x-6 top-6 bottom-6 flex flex-col justify-center gap-3" aria-hidden="true">
      <div className="overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) shadow-[0_6px_16px_-10px_rgb(0_0_0/0.15)]">
        <div className="flex h-7 items-center gap-1.5 border-b border-(--color-border) px-3">
          <Image src="/services/integrations/google-sheets.svg" alt="" width={12} height={12} />
          <span className="text-[11px] font-medium text-(--color-text-muted)">content-plan.xlsx</span>
          <span className="ml-auto flex items-center gap-1 text-[10px] tabular-nums text-(--color-text-muted)">
            <span className="relative inline-flex h-3.5 overflow-hidden font-semibold text-(--color-text)">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={n}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                >
                  {pad(n)}
                </motion.span>
              </AnimatePresence>
            </span>
            generated
          </span>
        </div>
        <div className="relative">
          <motion.div
            className="absolute inset-x-0 top-0 border-y border-(--color-accent-dark)/40 bg-(--color-accent)/25"
            style={{ height: ROW_H }}
            animate={{ y: row * ROW_H }}
            transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.15 }}
          />
          {ROW_W.map((w, i) => (
            <div key={i} className="relative flex items-center gap-3 border-b border-(--color-border) px-3 last:border-0" style={{ height: ROW_H }}>
              <span className="w-3 text-[10px] tabular-nums text-(--color-text-faint)">{i + 1}</span>
              <span className="h-1.5 rounded-full bg-(--color-border-strong)" style={{ width: `${w * 40}%` }} />
              <span className="h-1.5 w-1/4 rounded-full bg-(--color-bg-muted)" />
              <AnimatePresence>
                {i === row && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="ml-auto flex items-center gap-1 text-[10px] font-medium text-(--color-text)"
                  >
                    <Sparkles className="size-3 text-(--color-accent-dark)" />
                    Building
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-hidden [mask-image:linear-gradient(to_right,#000_70%,transparent)]">
        <AnimatePresence mode="popLayout" initial={false}>
          {recent.map((k) => {
            const { Icon, name } = OUTPUT_TYPES[k % OUTPUT_TYPES.length]
            return (
              <motion.div
                key={k}
                layout
                initial={{ opacity: 0, scale: 0.85, x: -12 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', visualDuration: 0.45, bounce: 0.2 }}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] text-(--color-text) transition-colors duration-700 ${
                  k === n ? 'border-(--color-text) bg-(--color-surface)' : 'border-(--color-border) bg-(--color-surface)'
                }`}
              >
                <Icon className="size-3.5 text-(--color-text-muted)" />
                {name(pad(k))}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── AI product visuals ───────────────────────────────────────── */

/*
 * One product in, six scenes out, one at a time: the tile being rendered
 * shimmers, then its veil lifts. After all six, a short hold, then reset.
 */

function Bottle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 80" className={className} aria-hidden="true">
      <rect x="15" y="2" width="10" height="14" rx="5" fill="#1d1d1d" />
      <rect x="13" y="14" width="14" height="9" rx="1.5" fill="#2b2b2b" />
      <rect x="8" y="22" width="24" height="54" rx="7" fill="#8a4b14" />
      <rect x="11" y="36" width="18" height="24" rx="2" fill="#f3ede2" />
    </svg>
  )
}

const SCENES = [
  { label: 'Marble', bg: 'linear-gradient(160deg,#efece7,#cbc6bd)' },
  { label: 'Bath', bg: 'linear-gradient(160deg,#f6f1e8,#d6cdbd)' },
  { label: 'Water', bg: 'linear-gradient(160deg,#d6e8f1,#86afc6)' },
  { label: 'Linen', bg: 'linear-gradient(160deg,#f3e9d9,#d8c3a2)' },
  { label: 'Wood', bg: 'linear-gradient(160deg,#c99c6d,#80522d)' },
  { label: 'Leaves', bg: 'linear-gradient(160deg,#b4cda6,#4c7743)' },
]
const HOLD = 2 // extra ticks the finished grid stays up before resetting

function Connector({ className = '' }: { className?: string }) {
  return (
    <div className={`relative mx-2 h-px flex-1 border-t border-dashed border-(--color-border-strong) ${className}`}>
      <div className="fx-travel absolute inset-0">
        <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-(--color-accent-dark)" />
      </div>
    </div>
  )
}

export function ProductVisualsVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-15% 0px' })
  const reduced = useReducedMotion()
  // Ticks 0..5 render tile `step`; 6..6+HOLD show the finished grid. Starts finished (also the reduced-motion frame).
  const [step, setStep] = useState(SCENES.length)

  useEffect(() => {
    if (!inView || reduced) return
    let t: ReturnType<typeof setTimeout>
    const tick = () => {
      setStep((s) => (s >= SCENES.length + HOLD ? 0 : s + 1))
      t = setTimeout(tick, 950 * pace(ref.current))
    }
    t = setTimeout(tick, 1400)
    return () => clearTimeout(t)
  }, [inView, reduced])

  const rendering = step < SCENES.length ? step : -1
  const pill: Pill = rendering >= 0
    ? { tag: 'Rendering', text: `${SCENES[rendering].label} scene` }
    : { tag: 'Done', text: '6 visuals · no studio' }

  return (
    <div ref={ref} className="absolute inset-x-6 top-6 bottom-6 flex flex-wrap content-center items-center gap-y-4 sm:flex-nowrap" aria-hidden="true">
      <div className="flex shrink-0 flex-col items-center gap-2">
        <div className="flex size-14 items-center justify-center rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-[0_6px_16px_-10px_rgb(0_0_0/0.15)] sm:size-24">
          <Bottle className="h-10 sm:h-16" />
        </div>
        <span className="hidden text-[11px] text-(--color-text-muted) sm:block">Your product</span>
      </div>

      <Connector />

      {/* mobile: pill sits beside the chip to save height; sm+: under it */}
      <div className="relative flex shrink-0 items-center gap-3 sm:flex-col sm:gap-0">
        <div className="relative">
          {rendering >= 0 && <span className="fx-ping absolute inset-0 rounded-xl bg-(--color-accent)" />}
          <div className="relative flex size-12 items-center justify-center rounded-xl bg-(--color-text) sm:size-14 text-sm font-bold text-(--color-accent) shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_12px_28px_-10px_rgb(0_0_0/0.45)]">
            AI
          </div>
          <Sparkles className="fx-twinkle absolute -right-4 -top-4 size-4 text-(--color-accent-dark)" />
        </div>
        <div className="flex h-7 justify-center sm:mt-3">
          <StatusPill pill={pill} />
        </div>
      </div>

      <Connector className="hidden sm:block" />

      <div className="grid w-full shrink-0 grid-cols-3 gap-1.5 sm:w-[46%]">
        {SCENES.map((s, i) => {
          const done = rendering < 0 || i < rendering
          return (
            <div key={s.label} className="relative aspect-video overflow-hidden rounded-lg sm:aspect-square" style={{ background: s.bg }}>
              <Bottle className="absolute bottom-[10%] left-1/2 h-[55%] -translate-x-1/2 drop-shadow-md" />
              <span className="absolute left-1.5 top-1 text-[9px] font-medium text-white/90 [text-shadow:0_1px_2px_rgb(0_0_0/0.4)]">{s.label}</span>
              {/* veil lifts when the scene is "rendered"; opacity only, so it stays on the compositor */}
              <motion.div
                className="absolute inset-0 overflow-hidden bg-(--color-bg-muted)"
                initial={false}
                animate={{ opacity: done ? 0 : 1 }}
                transition={{ duration: done ? 0.7 : 0.3, ease: EASE_OUT }}
              >
                <Bottle className="absolute bottom-[10%] left-1/2 h-[55%] -translate-x-1/2 opacity-[0.08]" />
                {i === rendering && <span className="fx-shimmer absolute inset-y-0 -left-full w-full bg-[linear-gradient(100deg,transparent,rgb(255_255_255/0.85),transparent)]" />}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── WhatsApp agent ───────────────────────────────────────────── */

/*
 * Customer asks → agent "types" → agent answers with an action chip that
 * flashes once (the agent did something, not just replied).
 */

type Msg = { from: 'user' | 'bot'; text: string; action?: { Icon: ComponentType<{ className?: string }>; label: string } }

const CHAT: Msg[] = [
  { from: 'user', text: "Where's my order #4821?" },
  { from: 'bot', text: 'Out for delivery. Arriving today by 6 PM.', action: { Icon: Truck, label: 'Live tracking' } },
  { from: 'user', text: 'Can I return the blue one?' },
  { from: 'bot', text: 'Done. Pickup is booked for tomorrow.', action: { Icon: Undo2, label: 'Return started' } },
  { from: 'user', text: 'Do you have it in black?' },
  { from: 'bot', text: 'Yes, and it’s 10% off today.', action: { Icon: CreditCard, label: 'Pay ₹1,349' } },
]
const VISIBLE = 4
const BUBBLE = 'max-w-[85%] rounded-lg px-3 py-2 text-xs leading-snug shadow-[0_1px_1px_rgb(0_0_0/0.06)]'
const SPRING_IN = { type: 'spring', visualDuration: 0.4, bounce: 0.15 } as const

export function WhatsAppVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [count, setCount] = useState(VISIBLE)
  const [typing, setTyping] = useState(false)

  // One timeout per state: user message → pause → typing → bot message → pause → …
  useEffect(() => {
    if (!inView || reduced) return
    const k = pace(ref.current)
    const next = CHAT[count % CHAT.length]
    const t = typing
      ? setTimeout(() => { setTyping(false); setCount((c) => c + 1) }, 1100 * k)
      : next.from === 'bot'
        ? setTimeout(() => setTyping(true), 600 * k)
        : setTimeout(() => setCount((c) => c + 1), 1700 * k)
    return () => clearTimeout(t)
  }, [count, typing, inView, reduced])

  const slots = typing ? VISIBLE - 1 : VISIBLE
  const shown = Array.from({ length: slots }, (_, k) => {
    const n = count - slots + k
    return { n, msg: CHAT[n % CHAT.length] }
  })

  return (
    <div ref={ref} className="absolute inset-x-6 top-6 bottom-6 flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-[#F5F1EA] shadow-[0_6px_16px_-10px_rgb(0_0_0/0.15)]" aria-hidden="true">
      <div className="flex items-center gap-2 border-b border-(--color-border) bg-(--color-surface) px-3 py-2">
        <Image src="/services/integrations/whatsapp-icon.svg" alt="" width={18} height={18} />
        <span className="text-xs font-semibold text-(--color-text)">AI Assistant</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-(--color-text-muted)">
          <span className="size-1.5 rounded-full bg-[#25D366]" />
          {typing ? 'typing…' : 'online'}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 p-3">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map(({ n, msg }) => (
            <motion.div
              key={n}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
              transition={SPRING_IN}
              className={`${BUBBLE} ${msg.from === 'user' ? 'self-end bg-[#D9FDD3] text-(--color-text)' : 'self-start bg-(--color-surface) text-(--color-text)'}`}
            >
              {msg.text}
              {msg.action && (
                <motion.span
                  initial={{ backgroundColor: 'rgb(255 214 0 / 0.5)' }}
                  animate={{ backgroundColor: 'rgb(255 214 0 / 0)' }}
                  transition={{ delay: 0.35, duration: 1.4, ease: 'easeOut' }}
                  className="-mx-1 mt-1.5 flex items-center gap-1.5 rounded border-t border-(--color-border) px-1 pt-1.5 font-medium text-[#128C7E]"
                >
                  <msg.action.Icon className="size-3.5" />
                  {msg.action.label}
                </motion.span>
              )}
              {msg.from === 'user' && <Check className="ml-1 inline size-3 text-[#53BDEB]" />}
            </motion.div>
          ))}
          {typing && (
            <motion.div
              key={`typing-${count}`}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={SPRING_IN}
              className={`${BUBBLE} flex gap-1 self-start bg-(--color-surface)`}
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="size-1.5 rounded-full bg-(--color-text-faint)"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.15, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
