'use client'
import { useEffect } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import type { Branch, Demo, Product } from '@/content/ai-automations/types'
import { ease } from '../../ui'
import { HeroCopy } from '../HeroCopy'
import { ChatStage, HeroShell, toolLogo, useClock, type ChatItem } from './HubHero'
import './heroes-a.css'

type GNode = { key?: string; name: string; label: string }
type Graph = { nodes: GNode[]; edges: [number, number][] }

const SLOTS: [number, number][] = [[72, 330], [150, 130], [330, 80], [300, 250], [405, 372], [240, 392]]
const W = 480
const H = 440
const NS = 72

const DEFAULT: Graph = {
  nodes: [
    { key: 'typeform', name: 'Typeform', label: 'New lead: Sara, Austin' },
    { key: 'hubspot', name: 'HubSpot', label: 'Contact and deal created' },
    { key: 'slack', name: 'Slack', label: '#sales: Sara scored 92' },
    { key: 'gmail', name: 'Gmail', label: 'Reply drafted for Sara' },
    { key: 'googlesheets', name: 'Google Sheets', label: 'Row 214 added' },
  ],
  edges: [[0, 1], [1, 2], [1, 3], [3, 4]],
}

function fromFlow(d: Extract<Demo, { kind: 'flow' }>): Graph {
  const idx = new Map(d.nodes.map((n, i) => [n.id, i]))
  const nodes = d.nodes.slice(0, SLOTS.length).map((n, i) => {
    const key = (n.app ?? '').toLowerCase().replace(/\s+/g, '')
    return { key: toolLogo(key) ? key : undefined, name: n.app ?? n.label, label: i === 0 ? 'New lead: Sara, Austin' : n.label }
  })
  const edges = d.edges.flatMap(([a, b]): [number, number][] => {
    const x = idx.get(a), y = idx.get(b)
    return x !== undefined && y !== undefined && x < nodes.length && y < nodes.length ? [[x, y]] : []
  })
  return { nodes, edges }
}

/** Quadratic bezier with a gentle perpendicular bow. */
function curve(a: [number, number], b: [number, number], i: number) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const k = i % 2 ? 0.2 : -0.2
  const c: [number, number] = [mx - dy * k, my + dx * k]
  const at = (p: number): [number, number] => {
    const q = 1 - p
    return [q * q * a[0] + 2 * q * p * c[0] + p * p * b[0], q * q * a[1] + 2 * q * p * c[1] + p * p * b[1]]
  }
  return { d: `M${a[0]} ${a[1]}Q${c[0]} ${c[1]} ${b[0]} ${b[1]}`, at }
}

function Packet({ at, label }: { at: (p: number) => [number, number]; label: string }) {
  const p = useMotionValue(0)
  const x = useTransform(p, (v) => at(v)[0])
  const y = useTransform(p, (v) => at(v)[1])
  useEffect(() => {
    const c = animate(p, 1, { duration: 1.2, ease })
    return () => c.stop()
  }, [p])
  const w = label.length * 6.4 + 18
  return (
    <motion.g className="hx-pk" style={{ x, y }}>
      <rect x={12} y={-30} width={w} height={22} rx={11} />
      <text x={21} y={-15}>{label}</text>
      <circle r={9} />
    </motion.g>
  )
}

const SEG0 = 900
const SEG = 1500

export default function WorkflowHero({ branch, product }: { branch: Branch; product?: Product }) {
  const slug = product?.slug
  const demo = product?.page?.demo
  const h1 = product?.page?.h1 ?? branch.h1
  const sub = product?.page?.heroSub ?? branch.heroSub ?? branch.lead
  const interest = product?.name ?? branch.name
  const copyOf = (secRef: Parameters<typeof HeroShell>[0]['secRef'], children: React.ReactNode, label: string) => (
    <HeroShell
      secRef={secRef}
      className="hx-wf"
      label={label}
      copy={<HeroCopy h1={h1} sub={sub} persona={undefined} interest={interest} waText={`Hi, I'd like help with ${interest.toLowerCase()}.`} />}
    >
      {children}
    </HeroShell>
  )

  if (slug === 'ai-teammates' && demo?.kind === 'chat') return <TeamVariant demo={demo} wrap={copyOf} />
  if (slug === 'document-data-extraction' && demo?.kind === 'doc') return <ScanVariant demo={demo} wrap={copyOf} />
  const g = slug === 'crm-automation' && demo?.kind === 'flow' ? fromFlow(demo) : DEFAULT
  return <GraphVariant g={g} wrap={copyOf} />
}

type Wrap = (r: Parameters<typeof HeroShell>[0]['secRef'], c: React.ReactNode, label: string) => React.ReactElement

function GraphVariant({ g, wrap }: { g: Graph; wrap: Wrap }) {
  const end = SEG0 + g.edges.length * SEG + 900
  const { ref, t } = useClock(end, 3800, Math.round(end * 0.55))
  const pos = g.nodes.map((_, i) => SLOTS[i])
  const segs = g.edges.map(([a, b], i) => ({ a, b, start: SEG0 + i * SEG, ...curve(pos[a], pos[b], i) }))
  const litAt = g.nodes.map((_, n) => (n === 0 ? 300 : Math.min(...segs.filter((s) => s.b === n).map((s) => s.start + 1200), Infinity)))
  const cur = segs.findIndex((s) => t >= s.start && t < s.start + 1200)
  const arrived = g.nodes.map((n, i) => ({ n, i, at: litAt[i] })).filter((x) => t >= x.at).sort((a, b) => a.at - b.at).slice(-3)
  const hours = (18.5 * Math.min(1, t / end)).toFixed(1)
  return wrap(
    ref,
    <div className="hx-win">
      <div className="hx-win-bar">
        <span>New lead, handled</span>
        <i><span className="hx-live" /> Running</i>
      </div>
      <div className="hx-gwrap">
        <div className="hx-g">
        <svg className="hx-graph" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          {segs.map((s) => (
            <g key={s.start}>
              <path className="hx-edge" d={s.d} />
              <path className={`hx-edge-on${t >= s.start ? ' is-on' : ''}`} d={s.d} pathLength={1} />
            </g>
          ))}
          {g.nodes.map((n, i) => {
            const lg = n.key ? toolLogo(n.key) : undefined
            const [x, y] = pos[i]
            return (
              <g key={n.name + i} className={`hx-node${t >= litAt[i] ? ' is-lit' : ''}`}>
                <rect x={x - NS / 2} y={y - NS / 2} width={NS} height={NS} rx={20} />
                {lg ? <image href={lg.src} x={x - 20} y={y - 20} width={40} height={40} /> : <text className="hx-node-ini" x={x} y={y + 8} textAnchor="middle">{n.name[0]}</text>}
              </g>
            )
          })}
          {cur >= 0 && <Packet key={cur} at={segs[cur].at} label={g.nodes[segs[cur].a].label} />}
        </svg>
        {g.nodes.map((n, i) => (
          <span key={n.name + i} className={`hx-nl${t >= litAt[i] ? ' is-lit' : ''}`} style={{ left: `${(pos[i][0] / W) * 100}%`, top: `${((pos[i][1] + NS / 2 + 4) / H) * 100}%` }}>{n.name}</span>
        ))}
        </div>
      </div>
      <div className="hx-feed">
        <ul>
          {arrived.map(({ n, i }) => {
            const lg = n.key ? toolLogo(n.key) : undefined
            return (
              <li key={i}>
                {lg && <img src={lg.src} alt="" />}
                {n.name} <em>{n.label}</em>
              </li>
            )
          })}
        </ul>
        <div className="hx-count">
          <span>Hours saved this week</span>
          <b>{hours}</b>
        </div>
      </div>
    </div>,
    'Apps connected: a new lead from Typeform becomes a HubSpot deal, a Slack alert, a drafted Gmail reply and a Google Sheets row.',
  )
}

function TeamVariant({ demo, wrap }: { demo: Extract<Demo, { kind: 'chat' }>; wrap: Wrap }) {
  const items: ChatItem[] = demo.messages.map((m, i) => {
    const bot = m.from === 'meher' || m.from === 'ira' || m.from === 'arjun'
    const a = m.attachment
    return {
      id: String(i),
      at: 700 + i * 1700,
      from: bot ? (m.from as 'meher') : 'user',
      name: bot ? m.from[0].toUpperCase() + m.from.slice(1) : m.from,
      text: m.text,
      card: a ? (a.kind === 'pdf' ? { kind: 'pdf', title: a.label, meta: a.meta } : { kind: 'call', title: a.label, lines: a.meta ? [a.meta] : [] }) : undefined,
    }
  })
  const end = 700 + items.length * 1700 + 1200
  const { ref, t, live } = useClock(end, 4500, 700 + 2 * 1700)
  return wrap(ref, <ChatStage items={items} faces={['meher']} channel="# team" logo="slack" t={t} live={live} solo />, 'A team chat in Slack where Meher, an AI teammate, drafts an offer letter and sends it for e-sign.')
}

function ScanVariant({ demo, wrap }: { demo: Extract<Demo, { kind: 'doc' }>; wrap: Wrap }) {
  const f = demo.fields
  const end = 1600 + f.length * 750 + 2600
  const { ref, t } = useClock(end, 4000, 1600 + Math.floor(f.length / 2) * 750)
  const sh = toolLogo('googlesheets')
  const doneAt = 1600 + f.length * 750 + 500
  return wrap(
    ref,
    <div className="hx-win">
      <div className="hx-win-bar">
        <span>Invoice inbox</span>
        <i><span className="hx-live" /> Reading</i>
      </div>
      <div className="hx-ex">
        <div className="hx-pdf">
          <h3>{demo.docTitle}</h3>
          {f.map((x) => (
            <div key={x.label}><span>{x.label}</span><b>{x.value}</b></div>
          ))}
          <span className={`hx-beam${t >= 700 ? ' is-on' : ''}`} />
        </div>
        <div className="hx-tbl">
          {f.map((x, i) => (
            <div key={x.label} className={`hx-pop${t >= 1600 + i * 750 ? ' is-on' : ''}`}>
              <span>{x.label}</span><b>{x.value}</b><i>{96 + (i % 3)}%</i>
            </div>
          ))}
          <footer className={`hx-pop${t >= doneAt ? ' is-on' : ''}`}>
            <span className="hx-chip is-y">Saved to your sheet · {sh ? <img src={sh.src} alt="Google Sheets" /> : 'Google Sheets'}</span>
          </footer>
        </div>
      </div>
    </div>,
    'An invoice PDF is scanned and its fields land as a clean row in a Google Sheet.',
  )
}
