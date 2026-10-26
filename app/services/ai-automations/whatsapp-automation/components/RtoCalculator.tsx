'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

/* COD confirmation before dispatch brings India RTO from ~30–35% to ~18–22%:
   modelled as roughly a third fewer returns (35% reduction) */
const CONFIRMED_FACTOR = 0.65

function inr(value: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(value))
}

/* Slider styles injected once */
const STYLE_ID = 'wa-rto-calculator-styles'
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style')
  s.id = STYLE_ID
  s.textContent = `
    .rto-range { -webkit-appearance:none; appearance:none; background:transparent; width:100%; outline:none; }
    .rto-range::-webkit-slider-runnable-track { height:4px; background:var(--rto-track); border-radius:0; }
    .rto-range::-moz-range-track { height:4px; background:var(--rto-track); border-radius:0; }
    .rto-range::-webkit-slider-thumb {
      -webkit-appearance:none; appearance:none; width:22px; height:22px; border-radius:50%;
      background:#121212; cursor:grab; border:3px solid #fff; box-shadow:0 0 0 1px #121212;
      margin-top:-9px; transition:transform 0.15s ease;
    }
    .rto-range::-moz-range-thumb {
      width:18px; height:18px; border-radius:50%; background:#121212; cursor:grab;
      border:3px solid #fff; box-shadow:0 0 0 1px #121212;
    }
    .rto-range:active::-webkit-slider-thumb { cursor:grabbing; transform:scale(1.1); }
    .rto-range:focus-visible::-webkit-slider-thumb { outline:2px solid #FFD600; outline-offset:2px; }
  `
  document.head.appendChild(s)
}

function Field({ id, label, unit, prefix = '', value, min, max, step, onChange }: {
  id: string; label: string; unit?: string; prefix?: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void
}) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm sm:text-base font-bold text-(--color-text)">{label}</label>
        <span className="flex items-center gap-1 border border-(--color-border) bg-(--color-surface) px-3 py-1.5 text-sm font-semibold focus-within:border-(--color-text)">
          {prefix && <span className="text-(--color-text-muted)">{prefix}</span>}
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
            aria-label={`${label} value`}
            className="w-16 bg-transparent text-right font-bold tabular-nums text-(--color-text) outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
        className="rto-range mt-4"
        style={{ '--rto-track': `linear-gradient(to right, #121212 ${pct}%, #e4e4e7 ${pct}%)` } as React.CSSProperties}
      />
      <div className="mt-2 flex justify-between text-xs font-mono tabular-nums text-(--color-text-faint)">
        <span>{prefix}{min}{unit === '%' ? '%' : ''}</span>
        <span>{prefix}{max}{unit === '%' ? '%' : ''}+</span>
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
    <div className="grid grid-cols-1 border border-(--color-border) bg-(--color-surface) lg:grid-cols-[1.05fr_1.15fr]">
      {/* Inputs */}
      <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
        <div className="flex flex-col gap-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-(--color-text-faint)">
            Your store numbers
          </span>

          <Field id="rto-orders" label="COD orders per day" unit="a day" value={orders} min={10} max={600} step={10} onChange={setOrders} />
          <Field id="rto-rate" label="Return rate (RTO)" unit="%" value={rate} min={5} max={50} step={1} onChange={(v) => setRate(Math.min(100, v))} />
          <Field id="rto-cost" label="Cost per return" prefix="₹" value={cost} min={100} max={600} step={10} onChange={setCost} />
        </div>

        <div className="mt-8 border-t border-(--color-border) pt-6">
          <p className="text-xs text-(--color-text-muted) leading-relaxed">
            <span className="font-semibold text-(--color-text)">Why courier loss averages ₹250+:</span> A failed COD delivery incurs forward shipping (~₹100–140), return logistics (~₹100–140), packaging waste, and blocked inventory.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col justify-between bg-(--color-text) p-6 sm:p-8 md:p-10 text-white">
        <div>
          {/* Period Toggle */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Loss calculation
            </span>
            <div className="inline-flex border border-white/20 p-0.5 text-xs" role="group" aria-label="Period">
              {[false, true].map((y) => (
                <button
                  key={String(y)}
                  type="button"
                  onClick={() => setYearly(y)}
                  aria-pressed={yearly === y}
                  className={`px-3 py-1 font-semibold transition-colors duration-200 ${
                    yearly === y ? 'bg-white text-(--color-text)' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {y ? 'Per year' : 'Per month'}
                </button>
              ))}
            </div>
          </div>

          {/* Main Stat: User asked for ₹2,70,000 to be yellow, larger font, humanized */}
          <div className="mt-8">
            <p className="text-sm font-medium text-white/70">
              Lost to returned COD orders
            </p>
            <p className="mt-2 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-(--color-accent) leading-none tabular-nums">
              ₹{inr(lost)}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-white/50">
              paid to couriers for packages that never turned into revenue
            </p>
          </div>

          {/* Breakdown Grid */}
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-xs text-white/60">Parcels returned</p>
              <p className="mt-1 text-2xl sm:text-3xl font-bold tabular-nums text-white">
                {inr(returned)}
                <span className="ml-1 text-xs font-normal text-white/50">/ {period}</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-white/60">RTO with confirmation</p>
              <p className="mt-1 text-2xl sm:text-3xl font-bold tabular-nums text-white">
                ~{Math.round(confirmedRate)}%
                <span className="ml-1 text-xs font-normal text-white/50">from {rate}%</span>
              </p>
            </div>
          </div>

          {/* Savings Box */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm text-white/70">
                Saved with WhatsApp COD confirmation
              </span>
              <span className="border border-(--color-accent)/40 bg-(--color-accent)/10 px-2 py-0.5 text-[11px] font-semibold text-(--color-accent)">
                ~35% fewer returns
              </span>
            </div>
            <p className="mt-2 text-3xl sm:text-4xl font-bold tabular-nums text-white">
              ₹{inr(saved)}
              <span className="ml-1.5 text-sm font-normal text-white/50">/ {period}</span>
            </p>
          </div>
        </div>

        {/* Footer Notes & CTA */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[34ch] text-xs leading-relaxed text-white/50">
            Estimate based on Indian D2C delivery averages. Automated WhatsApp checks verify buyer intent and address accuracy before courier pickup.
          </p>
          <Button href="#packages" variant="light" size="sm" showArrow className="shrink-0">
            See the plans
          </Button>
        </div>
      </div>
    </div>
  )
}

