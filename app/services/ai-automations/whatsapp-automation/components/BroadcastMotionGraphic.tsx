'use client'

import Image from 'next/image'
import { useInView } from './useInView'
import { Check, ExternalLink, Sparkles, Truck } from 'lucide-react'

// Authentic WhatsApp double-check ticks SVG (matching WhatsApp's exact vector & cyan-blue)
function WhatsAppTicks({ className = 'text-[#53bdeb]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 11" width={16} height={11} className={className} fill="currentColor">
      <path d="M11.07.65 5.4 6.32 3.6 4.5l-.9.9 2.7 2.7 6.57-6.57zM15.35.65 9.68 6.32l-.72-.72-.9.9 1.62 1.62L15.35 1.55z" />
      <path d="m.65 5.4 2.7 2.7.9-.9-2.7-2.7z" />
    </svg>
  )
}

// WhatsApp official logo badge
function WhatsAppBadge() {
  return (
    <div className="absolute -top-5 -right-4 z-10 h-11 w-11 rounded-full bg-white shadow-[0_4px_12px_rgba(37,211,102,0.4)] ring-3 ring-white">
      <Image src="/services/whatsapp-automation/whatsapp.svg" alt="WhatsApp" fill className="object-contain p-0.5" />
    </div>
  )
}

// angle in degrees from 3 o'clock; ring = px radius of the SVG ring it sits on (outer 275, dashed 208)
const AUDIENCE = [
  { src: '/our-work/testimonials/Fiona_Li.webp', size: 64, angle: -52, ring: 275, delay: 0.2 },
  { src: '/our-work/testimonials/Stacey_Bae.webp', size: 56, angle: 6, ring: 275, delay: 0.8 },
  { src: '/our-work/testimonials/Ashutosh_Thokare.webp', size: 68, angle: 54, ring: 275, delay: 1.3 },
]

export default function BroadcastMotionGraphic() {
  const [rootRef, inView] = useInView<HTMLDivElement>()
  return (
      <div ref={rootRef} data-offscreen={inView ? undefined : ''} className="relative mx-auto flex h-[780px] md:h-[580px] w-full max-w-[620px] items-center justify-center overflow-visible select-none">
        
        {/* ── 1. Smooth Hardware-Accelerated SVG Concentric Radar Wiring ── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Subtle green ambient center glow */}
          <div className="absolute h-[360px] w-[360px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(209,250,229,0.75) 0%, rgba(209,250,229,0.3) 45%, transparent 70%)' }} />

          {/* Precision SVG Circular Radar Wiring */}
          <svg
            className="absolute h-[580px] w-[580px] overflow-visible"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flat pale-green disc: gives the man something to stand against */}
            <circle cx="300" cy="300" r="205" fill="#10B981" fillOpacity="0.07" />

            {/* Static crisp concentric orbit rings (Zero lag, pure vector) */}
            <circle cx="300" cy="300" r="130" stroke="#10B981" strokeWidth="1" strokeOpacity="0.25" />
            <circle cx="300" cy="300" r="215" stroke="#10B981" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3" />
            <circle cx="300" cy="300" r="285" stroke="#10B981" strokeWidth="1" strokeOpacity="0.18" />

            {/* Soft transmitting pulse wave: scaled with a transform, not by animating r */}
            <circle cx="300" cy="300" r="290" stroke="#10B981" strokeWidth="1.5" className="wa-pulse" style={{ transformOrigin: '300px 300px' }} />
          </svg>
        </div>

        {/* ── 2. Central Person with Feather-Soft Gradient Bottom Fade ── */}
        <div className="relative z-10 mt-14 flex h-full items-end justify-center translate-x-3 max-md:-translate-y-14 md:translate-x-6">
          <div
            className="relative h-[480px] w-[480px] overflow-hidden"
            style={{
              /* Deep, feather-soft gradient fade starting at 45% down to 98% to eliminate any sudden cut */
              maskImage: 'linear-gradient(to bottom, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.3) 85%, transparent 98%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 45%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.3) 85%, transparent 98%)',
            }}
          >
            <Image
              src="/services/whatsapp-automation/hero-broadcast-man.webp"
              alt="Professional sending WhatsApp bulk broadcast"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* ── 3. WhatsApp Business E-commerce Message Bubble (Left Side) ── */}
        <div className="wa-bob absolute left-0 top-0 z-[5] w-[260px] sm:-left-12 md:-left-16 md:top-10 md:w-[300px] lg:-left-20" style={{ '--a': '6px', '--d': '4.8s' } as React.CSSProperties}>
          {/* WhatsApp light-mode business message: media, copy, CTA button */}
          <div className="relative rounded-[18px] rounded-tl-sm bg-white p-1.5 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.06)] border border-[#e9edef]">
            <WhatsAppBadge />

            {/* Media + link-preview strip */}
            <div className="overflow-hidden rounded-[12px] bg-[#f0f2f5]">
              <div className="relative h-36 w-full bg-[#f4f1e8]">
                <Image
                  src="/services/whatsapp-automation/whatsapp-broadcast-team.webp"
                  alt="Store team reviewing WhatsApp recovery results on a dashboard"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/75 px-2 py-0.5 text-[10px] font-medium text-white ">
                  <Sparkles size={10} className="text-[#FFD600]" />
                  <span>7 in 10 carts never convert</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-2.5 py-1.5 text-[11px] text-[#667781]">
                <span>websitevikreta.com</span>
                <span className="rounded bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">Free audit</span>
              </div>
            </div>

            {/* Copy */}
            <div className="px-2 pt-2 text-[#111b21]">
              <div className="mb-1 flex items-center gap-1.5 text-[12px] font-semibold text-[#667781]">
                <span>Website Vikreta</span>
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <Check size={8} strokeWidth={3.5} />
                </span>
              </div>
              <p className="text-[14px] font-semibold leading-snug">Hey Vishal 👋 Losing carts and COD orders? 🛒</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#3b4a54]">
                We set up WhatsApp <strong className="font-semibold text-[#111b21]">cart recovery, COD confirmation and order updates</strong> on your store in 7 to 14 days.{' '}
                <span className="font-semibold text-[#027eb5]">Read more</span>
              </p>
              <div className="mt-1 text-right font-mono text-[10.5px] text-[#667781]">13:00</div>
            </div>

            {/* CTA button row */}
            <div className="mt-1 border-t border-[#e9edef] py-2">
              <button
                type="button"
                className="group flex w-full items-center justify-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-[#027eb5] transition-colors hover:text-[#015f87]"
              >
                <ExternalLink size={14} className="stroke-[2.2]" />
                <span>Book a platform demo</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 4. Floating Pill / Toast Over Phone ("Cart reminders sent to every abandoned cart") ── */}
        <div className="wa-bob absolute bottom-14 left-1/2 z-30 md:bottom-16 md:left-[56%] -translate-x-1/2" style={{ '--a': '4px', '--d': '3.6s', '--dl': '0.3s' } as React.CSSProperties}>
          <div className="flex items-center gap-2 rounded-full border border-emerald-300/80 bg-white/95 px-3.5 py-1.5 shadow-[0_12px_28px_-6px_rgba(16,185,129,0.22)] ">
            <span className="text-[12px] font-semibold tracking-tight text-gray-900 md:text-[13px]">
              Order shipped · tracking sent
            </span>
            <div className="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
              <Truck size={11} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ── 5. Audience avatars pinned on the orbit rings ── */}
        {AUDIENCE.map(({ src, size, angle, ring, delay }) => {
          const rad = (angle * Math.PI) / 180
          return (
            <div
              key={src}
              className="absolute z-20"
              style={{
                left: `calc(50% + ${Math.round(Math.cos(rad) * ring)}px)`,
                top: `calc(50% + ${Math.round(Math.sin(rad) * ring)}px)`,
                marginLeft: -size / 2,
                marginTop: -size / 2,
              }}
            >
              <div className="wa-bob" style={{ '--a': '3px', '--d': `${4 + delay}s`, '--dl': `${delay}s` } as React.CSSProperties}>
                <div className="relative">
                  <div
                    className="relative overflow-hidden rounded-full border-2 border-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] ring-2 ring-emerald-100"
                    style={{ width: size, height: size }}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-6 items-center justify-center rounded-full bg-white px-1 shadow-md ring-1 ring-black/5">
                    <WhatsAppTicks className="text-[#53bdeb]" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </div>
  )
}
