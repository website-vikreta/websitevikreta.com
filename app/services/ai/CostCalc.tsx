'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'motion/react'
import { prefillLead } from '@/components/wv/automation/LeadForm'
import { Arrow } from '@/components/wv/ui'
import './cost.css'

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function CostCalc() {
  const [hours, setHours] = useState(15)
  const [rate, setRate] = useState(40)
  const reduce = useReducedMotion()
  const total = hours * rate * 48
  const mv = useMotionValue(total)
  const out = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = out.current
    const unsub = mv.on('change', (v) => {
      if (el) el.textContent = usd.format(Math.round(v))
    })
    if (reduce) mv.set(total)
    else {
      const c = animate(mv, total, { duration: 0.6, ease: [0.16, 1, 0.3, 1] })
      return () => {
        c.stop()
        unsub()
      }
    }
    return unsub
  }, [total, reduce, mv])

  const weeks = Math.round((hours * 48) / 40)

  return (
    <div className="wv-cost">
      <div className="wv-cost__inputs">
        <div className="wv-cost__field">
          <div className="wv-cost__row">
            <label htmlFor="cost-hours">Hours a week your team spends on repetitive work</label>
            <output htmlFor="cost-hours">{hours} hrs</output>
          </div>
          <input
            id="cost-hours"
            type="range"
            min={1}
            max={80}
            step={1}
            value={hours}
            style={{ '--p': `${((hours - 1) / 79) * 100}%` } as React.CSSProperties}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <div className="wv-cost__hints"><span>1 hr</span><span>80 hrs</span></div>
        </div>
        <div className="wv-cost__field">
          <div className="wv-cost__row">
            <label htmlFor="cost-rate">What an hour of that time costs you</label>
            <output htmlFor="cost-rate">${rate}</output>
          </div>
          <input
            id="cost-rate"
            type="range"
            min={15}
            max={150}
            step={5}
            value={rate}
            style={{ '--p': `${((rate - 15) / 135) * 100}%` } as React.CSSProperties}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <div className="wv-cost__hints"><span>$15</span><span>$150</span></div>
        </div>
      </div>

      <div className="wv-cost__panel" aria-live="polite">
        <p className="wv-cost__lead">Busywork is costing you about</p>
        <div className="wv-cost__big">
          <span className="wv-sr">{usd.format(total)}</span>
          <span aria-hidden="true" ref={out}>{usd.format(total)}</span>
        </div>
        <p className="wv-cost__lead">a year</p>
        <p className="wv-cost__weeks">
          That&rsquo;s about <strong>{weeks} working weeks a year</strong> of full-time work
        </p>
        <p className="wv-cost__note">
          Based on 48 working weeks. Your numbers, your estimate. We check them with you on the call.
        </p>
        <button
          type="button"
          className="wv-btn wv-btn-y"
          onClick={() => prefillLead(`AI automation plan: about ${hours} hrs/week of busywork`)}
        >
          Get a plan to win this back <Arrow size={15} />
        </button>
      </div>
    </div>
  )
}
