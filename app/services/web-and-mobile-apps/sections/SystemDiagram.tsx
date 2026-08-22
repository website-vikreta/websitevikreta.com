'use client'

/**
 * The page's one visual idea, in two states: scattered → connected.
 *
 * `ToolSprawl`      — the mess a business runs on today (Pain section).
 * `ConvergeDiagram` — many inputs collapsing into one system (Solution cards).
 *
 * Both are real HTML chips (legible text at any width, no shrinking SVG type)
 * over an SVG connector layer stretched with `preserveAspectRatio="none"` —
 * straight lines survive a non-uniform scale, and `vector-effect` keeps the
 * hairline at 1px. `ToolSprawl`'s hub stays monochrome (the mess has no
 * "reward" moment); `ConvergeDiagram`'s output chip is the one accent-colored
 * element — the payoff, colored deliberately (see .claude/learning.md
 * [Accent] page budget entry for the reasoning).
 */

const CHIP =
  'absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-(--color-border) bg-(--color-surface) px-2.5 py-1.5 text-xs sm:text-sm text-(--color-text-muted)'

interface SprawlNode {
  label: string
  /** Centre position as a percentage of the box. */
  x: number
  y: number
}

const SPRAWL_NODES: SprawlNode[] = [
  { label: 'Leads sheet', x: 18, y: 12 },
  { label: 'WhatsApp',    x: 82, y: 16 },
  { label: 'Orders',      x: 13, y: 50 },
  { label: 'Invoices',    x: 87, y: 51 },
  { label: 'Notes',       x: 22, y: 88 },
  { label: 'Email',       x: 79, y: 86 },
]

const HUB = { x: 50, y: 50 }

// Every tool routes through the person in the middle — plus two crossing runs
// between tools, which is what the copying actually looks like.
const SPRAWL_LINKS: [number, number][] = [
  [0, 3],
  [1, 2],
]

export function ToolSprawl() {
  return (
    <div
      className="relative w-full aspect-[4/3] sm:aspect-[16/10]"
      role="img"
      aria-label="Six disconnected tools — a leads sheet, WhatsApp, orders, invoices, notes and email — all routed by hand through one person on your team."
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g
          className="sd-link"
          stroke="var(--color-text)"
          strokeOpacity={0.28}
          strokeWidth={1}
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        >
          {SPRAWL_NODES.map((n) => (
            <line key={n.label} x1={n.x} y1={n.y} x2={HUB.x} y2={HUB.y} />
          ))}
          {SPRAWL_LINKS.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={SPRAWL_NODES[a].x}
              y1={SPRAWL_NODES[a].y}
              x2={SPRAWL_NODES[b].x}
              y2={SPRAWL_NODES[b].y}
            />
          ))}
        </g>
      </svg>

      {SPRAWL_NODES.map((n) => (
        <span
          key={n.label}
          className={`sd-node ${CHIP}`}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          {n.label}
        </span>
      ))}

      <span
        className="sd-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap border border-(--color-text) bg-(--color-text) px-3 py-2 text-xs sm:text-sm font-medium text-(--color-bg)"
        style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
      >
        Someone on your team
      </span>
    </div>
  )
}

interface ConvergeDiagramProps {
  /** What the business juggles today — three short labels. */
  inputs: string[]
  /** What replaces them. */
  output: string
}

export function ConvergeDiagram({ inputs, output }: ConvergeDiagramProps) {
  const step = 100 / (inputs.length + 1)

  return (
    <div
      className="flex items-stretch"
      role="img"
      aria-label={`${inputs.join(', ')} — replaced by ${output}.`}
    >
      <div className="flex w-[44%] flex-col justify-between gap-2">
        {inputs.map((label) => (
          <span
            key={label}
            className="sd-node truncate border border-(--color-border) bg-(--color-surface) px-2.5 py-1.5 text-center text-xs text-(--color-text-faint)"
          >
            {label}
          </span>
        ))}
      </div>

      <svg
        className="w-[16%] shrink-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <g
          className="sd-link"
          stroke="var(--color-text)"
          strokeOpacity={0.35}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        >
          {inputs.map((label, i) => (
            <line key={label} x1={0} y1={step * (i + 1)} x2={100} y2={50} />
          ))}
        </g>
      </svg>

      <div className="flex w-[40%] items-center">
        <span className="sd-node w-full border border-(--color-accent) bg-(--color-accent) px-2.5 py-2 text-center text-xs font-medium text-(--color-text)">
          {output}
        </span>
      </div>
    </div>
  )
}
