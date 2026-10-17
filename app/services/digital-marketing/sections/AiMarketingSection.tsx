'use client'

import { useRef, type ReactNode } from 'react'
import { BarChart3, Bell, Check, FileText, Mail, Sparkles, Star } from 'lucide-react'
import { gsap } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { useGsapSection, revealLines, revealFadeUp, DUR, EASE, STAGGER } from '@/lib/gsap/reveals'

const FACTS: [string, string][] = [
  ['< 5 min', 'Reply to every new enquiry'],
  ['Mon 9:00', 'Report in your inbox'],
  ['24/7', 'Ad spend watched for spikes'],
]

// ── Illustration: the automation as a little scene (example content) ────────
// A customer's enquiry flies (paper plane) into the automation cloud; a reply
// (envelope) travels on to the inbox; the weekly report travels there too; and
// alerts / briefs / review requests pop as they fire. Stage is a fixed 6:5
// box, and the SVG viewBox is 600×500 on the same ratio, so HTML pieces placed
// at x/600, y/500 percentages sit exactly on the SVG paths. The stage is laid
// out at a fixed 600×500 and CSS-zoomed down on small screens, so it scales
// like a picture instead of the cards overlapping.

const P = (x: number, y: number) => ({ left: `${(x / 600) * 100}%`, top: `${(y / 500) * 100}%` })

const PATH_IN     = 'M 118 330 C 52 250, 96 130, 226 104'          // customer → cloud
const PATH_REPLY  = 'M 376 96 H 508 Q 520 96 520 108 V 166'        // cloud → inbox
const PATH_REPORT = 'M 286 318 V 420 Q 286 434 300 434 H 492 Q 506 434 506 420 V 362' // report → inbox

function GoogleG({ size = 'h-4 w-4' }: { size?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={size}>
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  )
}
function MapsPin() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path fill="#EA4335" d="M12 1.5a7.5 7.5 0 0 0-7.5 7.5c0 5.6 7.5 13.5 7.5 13.5s7.5-7.9 7.5-13.5A7.5 7.5 0 0 0 12 1.5z" />
      <path fill="#34A853" d="M12 22.5s3.2-3.4 5.3-7L12 9 6 14c2.1 3.7 6 8.5 6 8.5z" />
      <circle cx="12" cy="9" r="2.8" fill="#fff" />
    </svg>
  )
}
function MetaMark() {
  return (
    <svg viewBox="0 0 32 20" className="h-3 w-5">
      <path fill="none" stroke="#0866FF" strokeWidth="3.4" strokeLinecap="round"
        d="M3 15c0-6 3-11 6.5-11 4.5 0 7.5 12 12 12 3 0 5-3 5-7s-2-6-4.5-6c-4 0-6.5 9-10.5 12S3 19 3 15z" />
    </svg>
  )
}

const soft = 'rounded-xl border border-(--color-border) bg-(--color-surface) shadow-[0_14px_36px_-16px_rgba(18,18,18,0.28)]'

function At({ x, y, className = '', children }: { x: number; y: number; className?: string; children: ReactNode }) {
  return <div className={`absolute ${className}`} style={P(x, y)}>{children}</div>
}

/** Faint UI skeleton blocks in the background, like the reference's ghost screens. */
function Ghost({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g opacity="0.55">
      <rect x={x} y={y} width={w} height={h} rx="8" fill="#F1EFEA" />
      <rect x={x + 10} y={y + 10} width={w * 0.35} height="6" rx="3" fill="#E6E2DA" />
      <rect x={x + 10} y={y + 22} width={w * 0.6} height="6" rx="3" fill="#E6E2DA" />
    </g>
  )
}

export default function AiMarketingSection() {
  const scope = useRef<HTMLElement>(null)

  useGsapSection(scope, (reduce) => {
    revealLines('#ai-marketing-heading', { trigger: scope.current })
    revealFadeUp('.ai-copy', { y: 20, stagger: STAGGER.base, trigger: scope.current })
    if (reduce) return
    gsap.timeline({ scrollTrigger: { trigger: '.ai-stage', start: 'top 70%' } })
      .from('.ai-piece', { opacity: 0, y: 18, duration: DUR.base, ease: EASE.out, stagger: 0.12 })
      .from('.ai-path', { opacity: 0, duration: DUR.base, stagger: 0.15 }, '-=0.4')
    // Gentle bob on the big pieces, out of step.
    gsap.utils.toArray<HTMLElement>('.ai-bob').forEach((el, i) => {
      gsap.to(el, { y: i % 2 ? 5 : -5, duration: 2.8 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true })
    })
    // Events fire one after another, on loop: each pops in, holds, leaves.
    const pops = gsap.utils.toArray<HTMLElement>('.ai-pop')
    gsap.set(pops, { opacity: 0, scale: 0.85, y: 8 })
    const loop = gsap.timeline({ repeat: -1, delay: 1.5 })
    pops.forEach((el) => {
      loop.to(el, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: EASE.out })
        .to(el, { opacity: 0, y: -6, duration: 0.4, ease: 'power1.in' }, '+=1.6')
    })
    // The inbox's "reply sent" tick pulses each time the envelope lands.
    gsap.fromTo('.ai-tick', { scale: 0.6 }, { scale: 1, duration: 0.4, ease: EASE.out, repeat: -1, repeatDelay: 2.8 })
  })

  return (
    <section ref={scope} id="ai-marketing" className="scroll-mt-32 overflow-x-clip py-16 md:py-20" aria-labelledby="ai-marketing-heading">
      <div className="container">
        <div className="grid grid-cols-1 gap-14 xl:grid-cols-12 xl:items-center xl:gap-10">

          <div className="xl:col-span-5">
            <h2 id="ai-marketing-heading" className="text-h2 font-bold tracking-tight text-(--color-text)">
              Marketing That <span className="text-(--color-accent) xl:block">Runs While</span>{' '}
              <span className="xl:block">You Work.</span>
            </h2>
            <p className="ai-copy mt-6 max-w-lg text-body-lg leading-relaxed text-(--color-text-muted)">
              We build automations for other businesses too, so we set them up
              for your marketing. Enquiries get a reply, reports go out, and
              alerts fire when ad costs jump, without anyone copying numbers
              between tools.
            </p>
            <div className="ai-copy mt-8">
              <Button href="/services/ai-automations" variant="primary" size="lg" showArrow>
                See Our Automation Work
              </Button>
            </div>
            {/* What the automations are set to do — the same three things the scene shows */}
            <dl className="ai-copy mt-10 grid max-w-lg grid-cols-3">
              {FACTS.map(([value, label]) => (
                <div key={value} className="border-l border-(--color-border-strong) pl-4 pr-2">
                  <dt className="sr-only">{label}</dt>
                  <dd className="whitespace-nowrap font-mono text-lg font-bold leading-none tracking-[-0.04em] text-(--color-text) sm:text-2xl md:text-3xl">{value}</dd>
                  <dd className="mt-2 text-xs leading-snug text-(--color-text-muted) md:text-sm">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Illustration: an enquiry travelling through the automations (example content) */}
          <div aria-hidden="true" className="ai-stage relative mx-auto h-[500px] w-[600px] [zoom:0.55] min-[400px]:[zoom:0.6] sm:[zoom:0.95] md:[zoom:1] xl:col-span-7">
            <svg viewBox="0 0 600 500" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <radialGradient id="ai-blob" cx="55%" cy="45%" r="60%">
                  <stop offset="0" stopColor="#FFF6CC" />
                  <stop offset="1" stopColor="#FFF6CC" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="330" cy="250" rx="300" ry="230" fill="url(#ai-blob)" />
              <Ghost x={40} y={20} w={120} h={40} />
              <Ghost x={430} y={30} w={140} h={40} />
              <Ghost x={30} y={430} w={110} h={40} />
              <Ghost x={180} y={150} w={100} h={40} />

              {/* Cloud */}
              <g className="ai-piece">
                <path d="M226 128 a34 34 0 0 1 8-66 a44 44 0 0 1 84-14 a34 34 0 0 1 58 22 a28 28 0 0 1-6 58 Z"
                  fill="#FFFFFF" stroke="#ECE7DC" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 12px 22px rgba(18,18,18,0.12))' }} />
              </g>

              {/* Routes */}
              <path className="ai-path dash-march" id="ai-route-in" d={PATH_IN} fill="none" stroke="#6366F1" strokeWidth="1.75" strokeDasharray="4 4" />
              <path className="ai-path dash-march" id="ai-route-reply" d={PATH_REPLY} fill="none" stroke="#14B8A6" strokeWidth="1.75" strokeDasharray="4 4" />
              <path className="ai-path dash-march" id="ai-route-report" d={PATH_REPORT} fill="none" stroke="#F97316" strokeWidth="1.75" strokeDasharray="4 4" />
              <path d="M 520 160 l -5 -8 h 10 z" fill="#14B8A6" />
              <path d="M 506 356 l -5 8 h 10 z" fill="#F97316" />

              {/* Travellers: paper plane (enquiry), envelope (reply), report chip */}
              <g>
                <path d="M-11 -9 L12 0 L-11 9 L-6 0 Z" fill="#10B981" />
                <path d="M-6 0 L12 0" stroke="#047857" strokeWidth="1" />
                <animateMotion dur="3.2s" repeatCount="indefinite" rotate="auto"><mpath href="#ai-route-in" /></animateMotion>
              </g>
              <g>
                <rect x="-11" y="-8" width="22" height="16" rx="2" fill="#fff" stroke="#14B8A6" strokeWidth="1.5" />
                <path d="M-11 -8 L0 1 L11 -8" fill="none" stroke="#14B8A6" strokeWidth="1.5" />
                <animateMotion dur="2.6s" begin="0.8s" repeatCount="indefinite"><mpath href="#ai-route-reply" /></animateMotion>
              </g>
              <g>
                <rect x="-10" y="-9" width="20" height="18" rx="3" fill="#fff" stroke="#F97316" strokeWidth="1.5" />
                <path d="M-5 5 V1 M0 5 V-3 M5 5 V-1" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
                <animateMotion dur="3.6s" begin="1.4s" repeatCount="indefinite"><mpath href="#ai-route-report" /></animateMotion>
              </g>
            </svg>

            {/* Cloud label */}
            <At x={300} y={88} className="ai-piece -translate-x-1/2 -translate-y-1/2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-(--color-text) md:text-sm">
                <Sparkles className="h-4 w-4 text-[#E6B800]" strokeWidth={2} /> AI automation
              </span>
            </At>

            {/* Customer */}
            <At x={118} y={378} className="ai-piece -translate-x-1/2 -translate-y-1/2">
              <div className="ai-bob relative">
                <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-(--color-surface) shadow-[0_14px_36px_-12px_rgba(18,18,18,0.3)] md:h-24 md:w-24">
                  <svg viewBox="0 0 48 48" className="h-12 w-12 md:h-16 md:w-16">
                    <circle cx="24" cy="18" r="8" fill="#F5D0B5" />
                    <path d="M15 15 q9 -12 18 0 q-2 -3 -9 -3 q-7 0 -9 3z" fill="#2563EB" />
                    <path d="M8 44 q2 -15 16 -15 q14 0 16 15 z" fill="#FFD600" />
                  </svg>
                </div>
                <div className="absolute -top-9 left-1/2 flex -translate-x-1/2 gap-1">
                  {[<GoogleG key="g" />, <MapsPin key="m" />, <MetaMark key="f" />, <Mail key="e" className="h-4 w-4 text-(--color-text)" strokeWidth={2} />].map((icon, i) => (
                    <span key={i} className="grid h-7 w-7 place-items-center rounded-full bg-(--color-surface) shadow-[0_6px_16px_-8px_rgba(18,18,18,0.35)]">{icon}</span>
                  ))}
                </div>
              </div>
            </At>
            <At x={118} y={460} className="ai-piece -translate-x-1/2">
              <span className="whitespace-nowrap rounded-full bg-(--color-surface) px-3 py-1 text-[11px] font-semibold text-(--color-text) shadow-sm md:text-xs">New enquiry</span>
            </At>

            {/* Weekly report window */}
            <At x={226} y={230} className="ai-piece">
              <div className={`ai-bob ${soft} w-[120px] overflow-hidden md:w-[132px]`}>
                <div className="flex gap-1 border-b border-(--color-border) px-2 py-1.5">
                  {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />)}
                </div>
                <div className="p-2.5">
                  <p className="text-[10px] font-bold text-(--color-text) md:text-[11px]">Weekly report</p>
                  <div className="mt-2 flex h-8 items-end gap-1">
                    {[40, 55, 45, 70, 62, 85].map((h, i) => <span key={i} className="flex-1 rounded-t-sm bg-[#FDBA74]" style={{ height: `${h}%` }} />)}
                  </div>
                </div>
              </div>
            </At>

            {/* Inbox / CRM window */}
            <At x={420} y={170} className="ai-piece">
              <div className={`ai-bob ${soft} w-[160px] overflow-hidden md:w-[180px]`}>
                <div className="flex items-center gap-1 border-b border-(--color-border) bg-[#F5F7FA] px-2.5 py-1.5">
                  {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c }} />)}
                  <span className="ml-1.5 text-[10px] font-semibold text-(--color-text-muted)">Inbox · CRM</span>
                </div>
                <div className="space-y-2 p-2.5">
                  <div className="flex items-center gap-2 rounded-lg bg-[#EEF6FF] p-2">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white">PS</span>
                    <div className="min-w-0">
                      <p className="truncate text-[10px] font-bold text-(--color-text) md:text-[11px]">Priya S. · enquiry</p>
                      <p className="flex items-center gap-1 text-[10px] text-[#15803D]">
                        <span className="ai-tick grid h-3 w-3 place-items-center rounded-full bg-[#16A34A]"><Check className="h-2 w-2 text-white" strokeWidth={4} /></span>
                        Reply sent · 2 min
                      </p>
                    </div>
                  </div>
                  {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-2 px-1">
                      <span className="h-6 w-6 shrink-0 rounded-full bg-(--color-bg-muted)" />
                      <span className="flex-1 space-y-1"><span className="block h-1.5 w-3/4 rounded bg-(--color-bg-muted)" /><span className="block h-1.5 w-1/2 rounded bg-(--color-bg-muted)" /></span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg border border-[#FED7AA] bg-[#FFF7ED] px-2 py-1.5 text-[10px] text-[#C2410C]">
                    <span className="flex items-center gap-1 font-semibold"><BarChart3 className="h-3 w-3" /> Report delivered</span>
                    <span>Mon 9:00</span>
                  </div>
                </div>
              </div>
            </At>

            {/* Events firing (loop) */}
            <At x={330} y={160} className="ai-pop">
              <span className={`${soft} flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-[11px] font-semibold text-[#B45309]`}>
                <Bell className="h-3.5 w-3.5" /> Ad alert · CPL +38%
              </span>
            </At>
            <At x={26} y={160} className="ai-pop">
              <span className={`${soft} flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-[11px] font-semibold text-(--color-text)`}>
                <FileText className="h-3.5 w-3.5 text-[#6366F1]" /> Content brief ready
              </span>
            </At>
            <At x={330} y={448} className="ai-pop">
              <span className={`${soft} flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-[11px] font-semibold text-(--color-text)`}>
                <span className="flex">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-3 w-3 fill-(--color-accent) text-(--color-accent)" />)}</span>
                Review request sent
              </span>
            </At>
          </div>
        </div>
      </div>
    </section>
  )
}
