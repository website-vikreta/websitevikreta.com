'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

/* COD confirmation before dispatch brings India RTO from ~30–35% to ~18–22% (research brief):
   modelled as roughly a third fewer returns */
const CONFIRMED_FACTOR = 0.65

function inr(value: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value))
}

/* Slider styles injected once — avoids re-injecting on every render */
const STYLE_ID = 'wa-rto-calculator-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    .rto-range { -webkit-appearance:none; appearance:none; background:transparent; width:100%; outline:none; }
    .rto-range::-webkit-slider-runnable-track { height:3px; background:var(--rto-track); }
    .rto-range::-moz-range-track { height:3px; background:var(--rto-track); }
    .rto-range::-webkit-slider-thumb {
      -webkit-appearance:none; appearance:none; width:22px; height:22px; border-radius:50%;
      background:#121212; cursor:grab; border:4px solid #fff; box-shadow:0 0 0 1px #121212;
      margin-top:-9.5px;
    }
    .rto-range::-moz-range-thumb {
      width:16px; height:16px; border-radius:50%; background:#121212; cursor:grab;
      border:4px solid #fff; box-shadow:0 0 0 1px #121212;
    }
    .rto-range:active::-webkit-slider-thumb { cursor:grabbing; }
    .rto-range:focus-visible::-webkit-slider-thumb { outline:2px solid #121212; outline-offset:3px; }
  `
  document.head.appendChild(s)
}

/* One input: a slider plus a number box you can type into. Typed values outside the slider's
   range still count (a store doing 900 orders a day is real); the slider just pins to its end. */
function Field({ id, label, unit, prefix = '', value, min, max, step, onChange }: {
  id: string; label: string; unit?: string; prefix?: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void
}) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-[15px] font-semibold text-(--color-text)">{label}</label>
        <span className="flex items-center gap-1 border border-(--color-border-strong) bg-(--color-surface) px-3 py-1.5 text-sm focus-within:border-(--color-text)">
          {prefix && <span className="text-(--color-text-muted)">{prefix}</span>}
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
            aria-label={`${label} value`}
            className="w-14 bg-transparent text-right font-semibold tabular-nums text-(--color-text) outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {unit && <span className="text-(--color-text-muted)">{unit}</span>}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(max, Math.max(min, value))}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rto-range mt-5"
        style={{ '--rto-track': `linear-gradient(to right, #121212 ${pct}%, #e4e4e7 ${pct}%)` } as React.CSSProperties}
      />
      <div className="mt-2 flex justify-between text-[13px] text-(--color-text-faint)">
        <span>{prefix}{min}{unit === '%' ? '%' : ''}</span><span>{prefix}{max}{unit === '%' ? '%' : ''}+</span>
      </div>
    </div>
  )
}

export default function RtoCalculator() {
  const [orders, setOrders] = useState(120)
  const [rate, setRate] = useState(30)
  const [cost, setCost] = useState(250)
  const [yearly, setYearly] = useState(false)

  const months = yearly ? 12 : 1
  const returned = orders * 30 * (rate / 100) * months
  const lost = returned * cost
  const confirmedRate = rate * CONFIRMED_FACTOR
  const saved = orders * 30 * ((rate - confirmedRate) / 100) * cost * months
  const period = yearly ? 'year' : 'month'

  return (
    <div className="grid grid-cols-1 border border-(--color-border) bg-(--color-surface) shadow-[0_30px_60px_-34px_rgba(20,18,15,0.35)] lg:grid-cols-[1.05fr_1fr]">
      {/* Inputs */}
      <div className="flex flex-col gap-8 p-[clamp(24px,4vw,40px)]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-text-faint)">Your store</span>

        <Field id="rto-orders" label="COD orders per day" unit="a day" value={orders} min={10} max={600} step={10} onChange={setOrders} />
        <Field id="rto-rate" label="Return rate (RTO)" unit="%" value={rate} min={5} max={50} step={1} onChange={(v) => setRate(Math.min(100, v))} />
        <Field id="rto-cost" label="Cost per return" prefix="₹" value={cost} min={100} max={600} step={10} onChange={setCost} />
      </div>

      {/* Results */}
      <div className="flex flex-col">
        <div className="bg-(--color-bg-muted) p-[clamp(24px,4vw,40px)]">
          <div className="inline-flex border border-(--color-text) p-0.5 text-[13px]" role="group" aria-label="Period">
            {[false, true].map((y) => (
              <button
                key={String(y)}
                type="button"
                onClick={() => setYearly(y)}
                aria-pressed={yearly === y}
                className={`px-3.5 py-1.5 font-medium transition-colors duration-200 ${yearly === y ? 'bg-(--color-text) text-white' : 'text-(--color-text)'}`}
              >
                {y ? 'Per year' : 'Per month'}
              </button>
            ))}
          </div>
          <p className="mt-6 text-[15px] font-semibold text-(--color-text-muted)">Lost to returned COD orders</p>
          <p className="mt-1 text-[clamp(2.4rem,5vw,3.4rem)] font-bold leading-none tracking-tight tabular-nums text-(--color-text)">
            ₹{inr(lost)}
          </p>
        </div>

        <div className="flex flex-1 flex-col bg-(--color-text) p-[clamp(24px,4vw,40px)] text-white">
          <dl className="grid grid-cols-2 gap-6">
            <div>
              <dt className="text-[13px] text-white/55">Parcels returned</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">{inr(returned)} <span className="text-sm font-normal text-white/45">/ {period}</span></dd>
            </div>
            <div>
              <dt className="text-[13px] text-white/55">RTO with confirmation</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">~{Math.round(confirmedRate)}% <span className="text-sm font-normal text-white/45">from {rate}%</span></dd>
            </div>
            <div className="col-span-2 border-t border-white/10 pt-5">
              <dt className="text-[13px] text-white/55">Saved with WhatsApp COD confirmation</dt>
              <dd className="mt-1 text-[1.75rem] font-bold tabular-nums text-[#25d366]">₹{inr(saved)} <span className="text-sm font-normal text-white/45">/ {period}</span></dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-[30ch] text-[12px] leading-relaxed text-white/45">
              An estimate. India COD runs 28 to 35% RTO; confirmation before dispatch typically brings it to 18 to 22%.
            </p>
            <Button href="#packages" variant="light" size="sm" showArrow className="shrink-0">
              See the plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
