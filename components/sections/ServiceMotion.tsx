import type { CSSProperties, ReactNode } from 'react'

// Motion accents drawn over the service illustrations. The viewBox matches the images (16:9,
// mapped to 1000 wide), so every coordinate below is a spot in the picture. CSS-only
// (globals.css → "Service bento motion"): runs on the active card, paused everywhere else.

const YELLOW = '#E8B53A'
const GREEN = '#7FA05A'
const BLUE = '#3B82F6'

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

// A round dot that rides along `d` once per cycle
const Travel = ({ d, at = 0 }: { d: string; at?: number }) => (
  <path d={d} pathLength={100} className="svc-travel" style={delay(at)} />
)

// A ring that swells out of a circle in the picture and fades
const Ring = ({ cx, cy, r, color = YELLOW, at = 0 }: { cx: number; cy: number; r: number; color?: string; at?: number }) => (
  <circle cx={cx} cy={cy} r={r} stroke={color} className="svc-ring" style={delay(at)} />
)

const CHECKS = [121, 193, 267, 334, 407]

const SCENES: Record<string, ReactNode> = {
  'ai-automation': (
    <>
      {/* Messy inputs flow into the bot... */}
      <Travel d="M210 180 C280 180 300 232 392 232" />
      <Travel d="M215 262 C290 262 310 252 392 252" at={0.6} />
      <Travel d="M210 330 C280 322 320 282 392 290" at={1.2} />
      {/* ...and come out as finished tasks, each one ticked off */}
      {CHECKS.map((y, i) => (
        <Travel key={y} d={`M700 ${y} H795`} at={i * 0.35} />
      ))}
      {CHECKS.map((y, i) => (
        <Ring key={y} cx={946} cy={y} r={12} color={GREEN} at={i * 0.35 + 1} />
      ))}
      <g className="svc-blink" fill="#262626">
        <circle cx={486} cy={268} r={11} />
        <circle cx={529} cy={268} r={11} />
      </g>
    </>
  ),
  'web-dev': (
    <>
      {/* Page load bar across the laptop browser */}
      <rect x={248} y={109} width={404} height={3} rx={1.5} fill={YELLOW} className="svc-grow" />
      <circle
        cx={883}
        cy={135}
        r={34}
        pathLength={100}
        stroke={YELLOW}
        strokeWidth={4}
        strokeLinecap="round"
        transform="rotate(-90 883 135)"
        className="svc-draw"
      />
      <Ring cx={541} cy={63} r={10} at={0.4} />
      <Travel d="M150 140 H178 V197 H238" />
      <Travel d="M148 275 H178 V340" at={0.8} />
      <Travel d="M838 393 H800" at={1.6} />
    </>
  ),
  uiux: (
    <>
      {/* Research → wireframe → design → shipped, along the bottom track */}
      <Travel d="M150 492 H735" />
      <Ring cx={122} cy={487} r={22} />
      <Ring cx={325} cy={493} r={22} at={0.8} />
      <Ring cx={542} cy={493} r={22} color={BLUE} at={1.6} />
      <Ring cx={760} cy={493} r={20} at={2.4} />
      <Travel d="M92 180 C130 168 160 170 185 185" at={1.2} />
      {/* Live selection on the frame being designed */}
      <rect x={478} y={185} width={158} height={84} stroke={BLUE} className="svc-ants" />
    </>
  ),
  'web-mobile-crm': (
    <>
      {/* Inventory statuses checking in one by one */}
      {[372, 386, 400].map((y, i) => (
        <Ring key={y} cx={882} cy={y} r={5} color={GREEN} at={i * 0.4} />
      ))}
      <Ring cx={778} cy={443} r={7} at={1.2} />
      <clipPath id="svc-login">
        <rect x={392} y={289} width={86} height={14} rx={3} />
      </clipPath>
      <g clipPath="url(#svc-login)">
        <rect x={392} y={289} width={30} height={14} fill="#fff" opacity={0.6} className="svc-shimmer" />
      </g>
      <Travel d="M212 172 C230 172 240 180 250 196" />
      <Travel d="M135 432 C95 410 100 360 128 340" at={1.2} />
    </>
  ),
  'digital-marketing': (
    <>
      {/* SEO, GEO and paid each feed the one dashboard */}
      <Ring cx={360} cy={105} r={52} />
      <Ring cx={515} cy={98} r={53} at={0.5} />
      <Ring cx={660} cy={112} r={50} at={1} />
      <Travel d="M405 150 C420 175 480 165 500 192" at={0.3} />
      <Travel d="M515 152 V192" at={0.8} />
      <Travel d="M612 150 C600 175 545 168 530 192" at={1.3} />
      <Ring cx={598} cy={390} r={30} at={1.8} />
      <Ring cx={540} cy={250} r={6} color={GREEN} at={1.4} />
    </>
  ),
}

export function ServiceMotion({ id, active }: { id: string; active: boolean }) {
  return (
    <svg
      viewBox="0 0 1000 562"
      aria-hidden="true"
      data-active={active}
      className="svc-motion pointer-events-none absolute inset-0 h-full w-full"
    >
      {SCENES[id]}
    </svg>
  )
}
