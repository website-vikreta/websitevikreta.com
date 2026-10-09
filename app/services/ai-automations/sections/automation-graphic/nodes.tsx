import type { ComponentType, CSSProperties } from 'react'
import Image from 'next/image'
import { Webhook, CalendarDays, FileText, Database, Mail, LayoutGrid, Split, Wand2, Brain, Cog } from 'lucide-react'
import { CodeSlash } from 'react-bootstrap-icons'
import {
  u, TRIGGERS, STEPS, INTEGRATIONS, TRIGGER, TRIGGER_CY, CARD, STEP, stepX, TILE, tileX, tileY, rowOf,
} from './data'

/*
 * Presentational pieces, positioned on the 1672×941 canvas with `u()`.
 * Active state is the `data-active` attribute the driver toggles; every
 * reaction is a CSS transition on transform/opacity.
 */

export type Icon = ComponentType<{ strokeWidth?: number; className?: string; style?: CSSProperties }>

const SPRING = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const OUT = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const sq = (n: number): CSSProperties => ({ width: u(n), height: u(n) })

/** Frosted surface: translucent white, hairline border, top highlight, soft layered shadow. */
export const glass = (radius: number, k: (n: number) => string = u): CSSProperties => ({
  borderRadius: radius >= 999 ? '9999px' : k(radius),
  background:   'linear-gradient(180deg, rgb(255 255 255 / 0.92), rgb(255 255 255 / 0.7))',
  border:       `${k(1.5)} solid rgb(18 18 18 / 0.09)`,
  boxShadow:    `inset 0 ${k(1.5)} 0 rgb(255 255 255 / 0.9), 0 ${k(2)} ${k(4)} rgb(18 18 18 / 0.04), 0 ${k(14)} ${k(36)} rgb(18 18 18 / 0.08)`,
})

/** Accent halo that fades in while a node is active. */
export function Halo({ radius, strong = false, k = u }: { radius: string; strong?: boolean; k?: (n: number) => string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -inset-px scale-[0.97] opacity-0 transition-[opacity,transform] duration-500 ${OUT} group-data-active/node:scale-100 group-data-active/node:opacity-100`}
      style={{
        borderRadius: radius,
        boxShadow: `0 0 0 ${k(strong ? 3 : 2.5)} var(--color-accent), 0 ${k(10)} ${k(36)} rgb(255 214 0 / ${strong ? 0.55 : 0.4})`,
      }}
    />
  )
}

const NODE = 'group/node absolute cursor-pointer transition-opacity duration-500 data-dim:opacity-40 data-quiet:opacity-55'
const LIFT = `transition-transform duration-500 ${SPRING} group-hover/node:-translate-y-[1.5%] group-data-active/node:-translate-y-[2.5%]`

// ── Triggers ──────────────────────────────────────────────────────────────────
export const TRIGGER_ICONS: Record<(typeof TRIGGERS)[number]['icon'], Icon> = {
  webhook: Webhook, schedule: CalendarDays, form: FileText, database: Database, email: Mail, app: LayoutGrid,
}

export function TriggerNode({ index }: { index: number }) {
  const t = TRIGGERS[index]
  const Icon = TRIGGER_ICONS[t.icon]
  const cy = TRIGGER_CY[index]
  const d = TRIGGER.r * 2
  return (
    <div
      data-node={t.id}
      data-kind="trigger"
      className={NODE}
      style={{ left: u(TRIGGER.cx - TRIGGER.r), top: u(cy - TRIGGER.r), width: u(300), height: u(d) }}
    >
      <div className={`absolute left-0 top-0 grid place-items-center ${LIFT} group-data-active/node:scale-[1.06]`} style={{ ...glass(999), ...sq(d) }}>
        <Halo radius="9999px" />
        <Icon strokeWidth={1.6} className={`text-(--color-text) transition-transform duration-500 ${SPRING} group-data-active/node:scale-110`} style={sq(44)} />
        {t.icon === 'email' && (
          <span className="absolute rounded-full border-(--color-text) bg-(--color-accent)" style={{ ...sq(15), right: u(22), top: u(26), borderWidth: u(2) }}>
            <span className="ag-ping absolute inset-0 rounded-full bg-(--color-accent) opacity-0 group-data-active/node:opacity-100" />
          </span>
        )}
      </div>
      <div className="absolute font-sans text-(--color-text)" style={{ left: u(TRIGGER.textX - (TRIGGER.cx - TRIGGER.r)), top: u(15) }}>
        <p className="whitespace-nowrap font-semibold tracking-tight" style={{ fontSize: u(22.5), lineHeight: 1.2 }}>{t.title}</p>
        <p className="whitespace-nowrap text-(--color-text-muted)" style={{ fontSize: u(16.5), lineHeight: 1.4, marginTop: u(4) }}>
          {t.sub[0]}<br />{t.sub[1]}
        </p>
      </div>
    </div>
  )
}

// ── Automation Tool ───────────────────────────────────────────────────────────
export function CoreCard() {
  return (
    <div data-node="card" className="group/node absolute" style={{ left: u(CARD.x), top: u(CARD.y), width: u(CARD.w), height: u(CARD.h) }}>
      <div className={`absolute inset-0 backdrop-blur-md transition-transform duration-700 ${OUT} group-data-active/node:scale-[1.015]`} style={glass(26)}>
        <Halo radius={u(26)} />
        <Gear style={{ left: u(CARD.w / 2 - 65), top: u(18), ...sq(130) }} />
        <p className="absolute inset-x-0 text-center font-sans font-bold tracking-tight text-(--color-text)" style={{ top: u(160), fontSize: u(42), lineHeight: 1 }}>
          Automation Tool
        </p>
        <p className="absolute inset-x-0 text-center font-sans text-(--color-text-muted)" style={{ top: u(214), fontSize: u(18.5) }}>
          Connect <Dot /> Orchestrate <Dot /> Automate
        </p>
      </div>
    </div>
  )
}

function Dot() {
  return <span className="mx-[0.3em] inline-block size-[0.4em] rounded-full bg-(--color-accent) align-middle" />
}

/** Ink gear with an accent hub. Slow ambient spin; the kick group takes a WAAPI turn when data lands. */
export function Gear({ style }: { style: CSSProperties }) {
  return (
    <svg viewBox="-70 -70 140 140" className="absolute overflow-visible" style={style} aria-hidden="true">
      <g data-gear-kick style={{ transformOrigin: '0 0' }}>
        <g className="ag-spin" style={{ transformOrigin: '0 0' }}>
          <path d={GEAR_PATH} fill="var(--color-text)" />
        </g>
      </g>
      <circle r={31} fill="var(--color-surface)" />
      <circle r={25} fill="var(--color-accent)" className="origin-center transition-transform duration-500 ease-out [transform-box:fill-box] group-data-active/node:scale-110" />
      <path
        d="M4,-17 L-10,3 H-1 L-4,17 L10,-3 H1 Z"
        fill="var(--color-text)"
        className={`origin-center transition-transform duration-500 ${SPRING} [transform-box:fill-box] group-data-active/node:scale-125`}
      />
    </svg>
  )
}

const GEAR_PATH = (() => {
  const pt = (r: number, deg: number) => {
    const a = (deg * Math.PI) / 180
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`
  }
  const pts: string[] = []
  for (let i = 0; i < 8; i++) {
    const a = i * 45
    pts.push(pt(50, a - 15), pt(64, a - 9), pt(64, a + 9), pt(50, a + 15))
  }
  return `M${pts.join(' L')} Z`
})()

// ── Pipeline ──────────────────────────────────────────────────────────────────
export const STEP_ICONS: Record<(typeof STEPS)[number]['icon'], Icon> = { if: Split, transform: Wand2, ai: Brain, then: Cog }

export function StepNode({ index }: { index: number }) {
  const step = STEPS[index]
  const Icon = STEP_ICONS[step.icon]
  const ai = step.id === 's2'
  return (
    <div data-node={step.id} data-kind="step" className={NODE} style={{ left: u(stepX(index)), top: u(STEP.y), width: u(STEP.w), height: u(STEP.h) }}>
      <div className={`absolute inset-0 backdrop-blur-sm ${LIFT} ${ai ? 'group-data-active/node:scale-[1.07]' : 'group-data-active/node:scale-[1.04]'}`} style={glass(18)}>
        <Halo radius={u(18)} strong={ai} />
        <span className="absolute left-1/2 -translate-x-1/2" style={{ ...sq(38), top: u(22) }}>
          <Icon
            strokeWidth={1.6}
            className={`size-full text-(--color-text) transition-transform duration-700 ${SPRING} ${ai ? 'group-data-active/node:scale-[1.15]' : 'group-data-active/node:scale-110'} ${step.icon === 'then' ? 'group-data-active/node:rotate-90' : ''}`}
          />
        </span>
        {ai && <Orbit />}
        <p className="absolute inset-x-0 text-center font-sans font-semibold uppercase tracking-wide text-(--color-text)" style={{ top: u(step.label.length > 1 ? 72 : 80), fontSize: u(12.5), lineHeight: 1.3 }}>
          {step.label.map((l) => <span key={l} className="block">{l}</span>)}
        </p>
      </div>
    </div>
  )
}

/** Three particles circling the brain while AI / LOGIC holds the signal. */
function Orbit() {
  return (
    <span aria-hidden="true" className="absolute left-1/2 opacity-0 transition-opacity duration-500 group-data-active/node:opacity-100" style={{ ...sq(66), top: u(5), marginLeft: u(-33) }}>
      <span className="ag-orbit absolute inset-0 [animation-play-state:paused] group-data-active/node:[animation-play-state:running]">
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 rounded-full bg-(--color-accent)"
            style={{ ...sq(8), border: `${u(1.5)} solid var(--color-text)`, transform: `rotate(${deg}deg) translate(${u(33)}) translate(-50%, -50%)` }}
          />
        ))}
      </span>
    </span>
  )
}

// ── Integrations ──────────────────────────────────────────────────────────────
/** Full-colour brand marks (gilbarbara/logos, CC0; Sheets from Simple Icons). `null` = generic code glyph. */
const LOGOS = [
  'slack-icon', 'microsoft-teams', 'google-drive',
  'whatsapp-icon', 'google-gmail', 'google-sheets',
  'shopify', 'postgresql', 'airtable',
  'openai-icon', 'mailchimp-icon', 'sendgrid-icon',
  'github-icon', 'jira', null,
]

export function Logo({ index, className = '' }: { index: number; className?: string }) {
  const file = LOGOS[index]
  if (!file) return <CodeSlash className={`size-full text-(--color-text) ${className}`} />
  return <Image src={`/services/integrations/${file}.svg`} alt="" width={40} height={40} className={`size-full object-contain ${className}`} />
}

export function IntegrationNode({ index }: { index: number }) {
  const label = INTEGRATIONS[index]
  return (
    <div
      data-node={`i${index}`}
      data-kind="int"
      className={NODE}
      style={{ left: u(tileX(index % 3)), top: u(tileY(rowOf(index))), width: u(TILE.w), height: u(TILE.h) }}
    >
      <div className={`absolute inset-0 ${LIFT} group-data-active/node:scale-[1.05]`} style={glass(18)}>
        <Halo radius={u(18)} />
        <span className="absolute left-1/2 -translate-x-1/2" style={{ ...sq(42), top: u(label.length > 1 ? 18 : 27) }}>
          <Logo index={index} className={`transition-transform duration-500 ${SPRING} group-data-active/node:scale-110`} />
        </span>
        <p className="absolute inset-x-0 text-center font-sans font-medium text-(--color-text)" style={{ bottom: u(label.length > 1 ? 14 : 22), fontSize: u(15), lineHeight: 1.2 }}>
          {label.map((l) => <span key={l} className="block">{l}</span>)}
        </p>
      </div>
    </div>
  )
}
