'use client'

import { useEffect, useRef, useState } from 'react'

const MIN = 20
const MAX = 600
const RTO_RATE = 0.3
const COST_PER_RTO = 250

function inr(value: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value))
}

/* Slider thumb styles injected once — avoids re-injecting on every render */
const STYLE_ID = 'wa-rto-calculator-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    #rto-orders { -webkit-appearance:none; appearance:none; background:transparent; }
    #rto-orders::-webkit-slider-runnable-track {
      height:4px; border-radius:2px; background:var(--rto-track);
    }
    #rto-orders::-moz-range-track {
      height:4px; border-radius:2px; background:var(--rto-track);
    }
    #rto-orders::-webkit-slider-thumb {
      -webkit-appearance:none; appearance:none;
      width:22px; height:22px; border-radius:50%;
      background:#25d366; cursor:grab;
      border:3px solid rgba(255,255,255,0.9);
      box-shadow:0 2px 10px rgba(0,0,0,0.35);
      margin-top:-9px;
    }
    #rto-orders::-moz-range-thumb {
      width:20px; height:20px; border-radius:50%;
      background:#25d366; cursor:grab;
      border:3px solid rgba(255,255,255,0.9);
      box-shadow:0 2px 10px rgba(0,0,0,0.35);
    }
    #rto-orders:active::-webkit-slider-thumb { cursor:grabbing; }
    #rto-orders:focus-visible::-webkit-slider-thumb {
      outline:2px solid #25d366; outline-offset:2px;
    }
  `
  document.head.appendChild(s)
}

export default function RtoCalculator() {
  const [orders, setOrders] = useState(120)
  const [intro, setIntro] = useState(0)
  const hostRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const node = hostRef.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      started.current = true
      const id = requestAnimationFrame(() => setIntro(1))
      return () => cancelAnimationFrame(id)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1100)
          setIntro(1 - Math.pow(1 - p, 4))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const monthly  = orders * 30
  const returned = monthly * RTO_RATE
  const cost     = returned * COST_PER_RTO
  const percent  = ((orders - MIN) / (MAX - MIN)) * 100
  const trackGrad = `linear-gradient(to right, #25d366 ${percent}%, rgba(255,255,255,0.18) ${percent}%)`

  return (
    <div
      ref={hostRef}
      style={{
        borderRadius: '20px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        padding: 'clamp(20px, 4vw, 32px)',
      }}
    >
      <label
        htmlFor="rto-orders"
        style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.45)', marginBottom: '10px' }}
      >
        COD orders per day
      </label>

      {/* Order count */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#fff', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
          {orders}
        </span>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>a day</span>
      </div>

      {/* Slider */}
      <input
        id="rto-orders"
        type="range"
        min={MIN}
        max={MAX}
        step={10}
        value={orders}
        onChange={e => setOrders(Number(e.target.value))}
        style={{ '--rto-track': trackGrad, marginTop: '20px', width: '100%', outline: 'none' } as React.CSSProperties}
        aria-valuetext={`${orders} orders per day`}
      />

      {/* Stats */}
      <dl style={{ marginTop: '28px' }}>
        {[
          { label: 'Orders per month',  value: inr(monthly * intro) },
          { label: 'Returned to you',   value: inr(returned * intro) },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '12px 0' }}
          >
            <dt style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>{label}</dt>
            <dd style={{ fontVariantNumeric: 'tabular-nums', fontSize: '17px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>
              {value}
            </dd>
          </div>
        ))}

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '4px 16px', paddingTop: '18px' }}>
          <dt style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>Round-trip cost per month</dt>
          <dd>
            <span style={{ fontSize: 'clamp(1.7rem, 4vw, 2.4rem)', fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em', color: '#ff6b5e' }}>
              ₹{inr(cost * intro)}
            </span>
          </dd>
        </div>
      </dl>

      <p style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', fontSize: '11.5px', lineHeight: 1.75, color: 'rgba(255,255,255,0.35)' }}>
        Assumes 30% RTO rate and ₹250 per round trip. India COD runs 28–35%; fashion and footwear
        often higher. Adjust the slider to your own volume.
      </p>
    </div>
  )
}
