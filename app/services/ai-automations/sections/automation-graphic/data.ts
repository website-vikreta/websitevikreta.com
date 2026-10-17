/*
 * Layout + timeline for the AI Automations workflow graphic.
 *
 * Laid out on the original illustration's 1672×941 canvas (same composition,
 * same scale of elements) and scaled with the container via `cqw`.
 */

export const W = 1672
export const H = 941
/** Visible window into the canvas — cropped to the content so nothing is spent on margins. */
export const VIEW = { x: 50, y: -40, w: 1580, h: 972 }
/** Canvas units → CSS length that scales with the graphic's width. */
export const u = (n: number) => `calc(${n} * 100cqw / ${VIEW.w})`

// ── Copy ──────────────────────────────────────────────────────────────────────
export const TRIGGERS = [
  { id: 't0', title: 'Webhook', sub: ['New webhook', 'received'], icon: 'webhook' },
  { id: 't1', title: 'Schedule', sub: ['Runs on a specific', 'time'], icon: 'schedule' },
  { id: 't2', title: 'Form / Typeform', sub: ['New form', 'submission'], icon: 'form' },
  { id: 't3', title: 'Database', sub: ['New or updated', 'record'], icon: 'database' },
  { id: 't4', title: 'Email Received', sub: ['When an email', 'arrives'], icon: 'email' },
  { id: 't5', title: 'App Event', sub: ['New event from', 'any app'], icon: 'app' },
] as const

export const STEPS = [
  { id: 's0', label: ['If / condition'], icon: 'if' },
  { id: 's1', label: ['Transform /', 'enrich'], icon: 'transform' },
  { id: 's2', label: ['AI / logic'], icon: 'ai' },
  { id: 's3', label: ['Then', 'action'], icon: 'then' },
] as const

export const INTEGRATIONS = [
  ['Slack'], ['Microsoft', 'Teams'], ['Google', 'Workspace'],
  ['WhatsApp'], ['Gmail'], ['Google', 'Sheets'],
  ['Shopify'], ['PostgreSQL', 'MySQL'], ['Airtable'],
  ['OpenAI', 'AI Bots'], ['Mailchimp'], ['SendGrid'],
  ['GitHub'], ['Jira /', 'Atlassian'], ['Code'],
] as const

// ── Geometry ──────────────────────────────────────────────────────────────────
export const HUB_Y = 442
export const TRIGGER = { cx: 134, r: 58, textX: 212, pitch: 166 }
export const TRIGGER_CY = [0, 1, 2, 3, 4, 5].map((i) => HUB_Y + (i - 2.5) * TRIGGER.pitch)

export const CARD = { x: 600, y: 304, w: 428, h: 270 }
export const JL = { x: 498, y: HUB_Y }
export const JR = { x: 1118, y: HUB_Y }

export const STEP = { y: 712, w: 122, h: 126, x0: 496, pitch: 158 }
export const stepX = (k: number) => STEP.x0 + k * STEP.pitch

export const TILE = { x0: 1205, w: 126, h: 128, pitchX: 142, pitchY: 174 }
export const tileX = (c: number) => TILE.x0 + c * TILE.pitchX
/** Rows are centred on the hub line so the middle row is wired straight across. */
export const tileY = (r: number) => HUB_Y - TILE.h / 2 + (r - 2) * TILE.pitchY
export const rowOf = (i: number) => Math.floor(i / 3)

// ── Connectors ────────────────────────────────────────────────────────────────
/** Trigger → left hub: each gets its own lane and arrow slot so the fan-in never overlaps. */
function triggerLeg(i: number) {
  const cy = TRIGGER_CY[i]
  const ty = HUB_Y + (i - 2.5) * 15
  const lane = [446, 430, 414, 414, 430, 446][i]
  const dir = ty > cy ? 1 : -1
  return `M372,${cy} H${lane - 16} Q${lane},${cy} ${lane},${cy + 16 * dir} V${ty - 16 * dir} Q${lane},${ty} ${lane + 16},${ty} H484`
}

function branch(r: number) {
  const cy = tileY(r) + TILE.h / 2
  const end = TILE.x0 - 12
  if (r === 2) return `M${JR.x + 12},${HUB_Y} H${end}`
  const lane = r === 0 || r === 4 ? 1148 : 1166
  const dir = cy < HUB_Y ? -1 : 1
  return `M${JR.x + 12},${HUB_Y} H${lane - 14} Q${lane},${HUB_Y} ${lane},${HUB_Y + 14 * dir} V${cy - 14 * dir} Q${lane},${cy} ${lane + 14},${cy} H${end}`
}

export const LEGS: Record<string, string> = {
  ...Object.fromEntries(TRIGGERS.map((t, i) => [t.id, triggerLeg(i)])),
  'hub-l': `M${JL.x + 12},${HUB_Y} H${CARD.x - 8}`,
  'card-if': `M${CARD.x + 40},${CARD.y + CARD.h} C${CARD.x + 40},${CARD.y + CARD.h + 55} ${stepX(0) + STEP.w / 2},${STEP.y - 50} ${stepX(0) + STEP.w / 2},${STEP.y}`,
  'step-1': `M${stepX(0) + STEP.w + 4},${STEP.y + STEP.h / 2} H${stepX(1) - 8}`,
  'step-2': `M${stepX(1) + STEP.w + 4},${STEP.y + STEP.h / 2} H${stepX(2) - 8}`,
  'step-3': `M${stepX(2) + STEP.w + 4},${STEP.y + STEP.h / 2} H${stepX(3) - 8}`,
  'then-out': `M${stepX(3) + STEP.w + 2},${STEP.y + STEP.h / 2} H${JR.x - 18} Q${JR.x},${STEP.y + STEP.h / 2} ${JR.x},${STEP.y + STEP.h / 2 - 18} V${HUB_Y + 13}`,
  ...Object.fromEntries([0, 1, 2, 3, 4].map((r) => [`b${r}`, branch(r)])),
}
/** Dashed fan-in/fan-out wiring, drawn with arrowheads like the original. */
export const DASHED = ['t0', 't1', 't2', 't3', 't4', 't5', 'b0', 'b1', 'b2', 'b3', 'b4']
export const SOLID = ['hub-l', 'step-1', 'step-2', 'step-3']
/** Engine → pipeline → hub: lit as one path when a node is focused. */
export const CHAIN_LEGS = ['hub-l', 'card-if', 'step-1', 'step-2', 'step-3', 'then-out']

export function legsFor(id: string): string[] {
  if (id.startsWith('t')) return [id, 'hub-l']
  if (id.startsWith('s')) {
    const pipe = ['card-if', 'step-1', 'step-2', 'step-3', 'then-out']
    const k = Number(id.slice(1))
    return [pipe[k], pipe[k + 1]]
  }
  if (id.startsWith('i')) return [`b${rowOf(Number(id.slice(1)))}`]
  return []
}

// ── Data riding the signal ────────────────────────────────────────────────────
/** What each trigger hands the engine, and how it improves: incoming → cleaned → enriched. */
export const PAYLOADS: [string, string, string][] = [
  ['order.created', 'Order + customer + items', 'Priority: same-day'],
  ['Mon 09:00 schedule', "Last week's sales rows", 'Summary written'],
  ['{ name, email, msg }', 'Lead + company + city', 'Hot lead'],
  ['row.updated', 'Contact + consent', 'Segment: repeat buyer'],
  ['Re: delivery date?', 'Order found, ETA Friday', 'Reply drafted'],
  ['error.thrown', 'Stack trace + user', 'Severity: high'],
]
export const CHIP_STAGES = ['Incoming', 'Cleaned', 'Enriched'] as const

/** What the visitor has picked: a trigger, a destination, or both (their own workflow). */
export interface Selection { t: number | null; i: number | null }

// ── Timeline ──────────────────────────────────────────────────────────────────
export type Step =
  | { at: number; node: string; hold: number }
  | { at: number; leg: string; dur: number }
  /** One-shot effects: the engine's gear kick + glow, or revealing the audit CTA. */
  | { at: number; fx: 'core' | 'cta' }
  /** Data chip stage (index into the run's payload), or -1 to put it away. */
  | { at: number; chip: number }

/** A new event enters every PERIOD seconds; runs overlap so the system never stalls. */
export const PERIOD = 4.6

export function buildCycle(n: number, sel: Selection) {
  const ti = sel.t ?? n % 6
  const trig = `t${ti}`
  const outs = sel.i !== null ? [sel.i] : [(n * 2) % 15, (n * 2 + 1) % 15]
  const s: Step[] = [{ at: 0.3, chip: 0 }]
  let t = 0

  s.push({ at: t, node: trig, hold: 0.9 }, { at: t + 0.3, leg: trig, dur: 1.1 })
  t += 1.4
  s.push({ at: t, node: 'jl', hold: 0.5 }, { at: t + 0.05, leg: 'hub-l', dur: 0.5 })
  t += 0.55
  s.push({ at: t, node: 'card', hold: 1.0 }, { at: t, fx: 'core' })
  t += 0.55

  s.push({ at: t, leg: 'card-if', dur: 0.7 })
  t += 0.7
  const pipe = ['step-1', 'step-2', 'step-3', 'then-out']
  for (let k = 0; k < 4; k++) {
    const ai = k === 2
    s.push({ at: t, node: `s${k}`, hold: ai ? 1.2 : 0.75 })
    // The data visibly improves: cleaned at TRANSFORM, enriched once AI has thought about it.
    if (k === 1) s.push({ at: t + 0.3, chip: 1 })
    if (ai) s.push({ at: t + 0.7, chip: 2 })
    const lead = ai ? 0.8 : 0.35
    const dur = k === 3 ? 0.9 : 0.5
    s.push({ at: t + lead, leg: pipe[k], dur })
    t += lead + dur
  }

  s.push({ at: t, node: 'jr', hold: 0.5 }, { at: t, chip: -1 })
  outs.forEach((j, k) => {
    s.push({ at: t + k * 0.35, leg: `b${rowOf(j)}`, dur: 0.7 })
    s.push({ at: t + k * 0.35 + 0.7, node: `i${j}`, hold: 0.9 })
  })
  const custom = sel.t !== null && sel.i !== null
  // Their route just delivered — that's the moment to offer to build it.
  if (custom) s.push({ at: t + 0.7, fx: 'cta' })
  return {
    steps: s,
    end: t + (outs.length - 1) * 0.35 + 0.7 + 0.9,
    payload: PAYLOADS[ti],
    /** The visitor picked both ends — this run is their workflow. */
    custom,
  }
}
