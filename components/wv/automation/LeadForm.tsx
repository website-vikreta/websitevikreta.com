'use client'

import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Arrow, Magnetic } from '../ui'
import { trackFormSubmit } from '@/lib/analytics'
import { WaButton } from './WaButton'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[1-9]\d{6,14}$/

const PREFILL = 'wv:lead-prefill'
const MAX = 120
const CONFIGURED = !!(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

/** Prefill the lead form in-page, scroll to it and focus the field. */
export function prefillLead(interest: string, id = 'lead') {
  window.dispatchEvent(new CustomEvent(PREFILL, { detail: interest.slice(0, MAX) }))
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  window.setTimeout(() => el?.querySelector<HTMLInputElement>('input[name="want"]')?.focus({ preventScroll: true }), 400)
  history.replaceState(null, '', `?interest=${encodeURIComponent(interest)}#${id}`)
}

/** <a> that keeps its href (no-JS works) but prefills in-page when JS is on. */
export function PrefillLink({ interest, className, children }: { interest: string; className?: string; children: React.ReactNode }) {
  return (
    <a
      className={className}
      href={`?interest=${encodeURIComponent(interest)}#lead`}
      onClick={(e) => {
        e.preventDefault()
        prefillLead(interest)
      }}
    >
      {children}
    </a>
  )
}

export function LeadForm({ interest, source, id = 'lead' }: { interest: string; source: string; id?: string }) {
  const [want, setWant] = useState(interest)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const okRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (done) okRef.current?.focus()
  }, [done])

  // ?interest= from a product row overrides the default prefill.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('interest')
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read ?interest= after hydration
    if (q) setWant(q.slice(0, MAX))
    const on = (e: Event) => setWant(String((e as CustomEvent<string>).detail).slice(0, MAX))
    window.addEventListener(PREFILL, on)
    return () => window.removeEventListener(PREFILL, on)
  }, [])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (busy) return
    const form = e.currentTarget
    const f = new FormData(form)
    const name = String(f.get('name') ?? '').trim()
    const email = String(f.get('email') ?? '').trim()
    const phone = String(f.get('phone') ?? '').trim()
    const what = String(f.get('want') ?? '').trim()
    const errs: Record<string, string> = {}
    if (name.length < 2) errs.name = 'Enter your name'
    if (!EMAIL_RE.test(email)) errs.email = 'Enter a valid work email'
    if (phone && !PHONE_RE.test(phone.replace(/[\s\-().]/g, ''))) errs.phone = 'Enter a valid number, or leave it empty'
    if (!what) errs.want = 'Tell us what to automate'
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus()
      return
    }
    setBusy(true)
    setFailed(false)
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name,
          reply_to: email,
          email,
          service: `AI Automations: ${interest}`,
          mobile: phone || 'Not provided',
          budget: 'Not specified',
          message: `${name} wants to automate: ${what}\nService/product: ${interest}\nSource: ${source}`,
          to_name: 'Website Vikreta',
        },
        PUBLIC_KEY,
      )
      setDone(true)
      trackFormSubmit(`ai_automations_${source}`)
    } catch (err) {
      console.error('[EmailJS] send failed', err)
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  if (!CONFIGURED)
    return (
      <div className="wv-ax-form is-done" id={id}>
        <p>Message us on WhatsApp or email contact@websitevikreta.com</p>
        <div className="wv-cta-row">
          <WaButton text={`Hi, I want to automate: ${interest}`} variant="y" />
        </div>
      </div>
    )

  if (done)
    return (
      <div className="wv-ax-form is-done" id={id} role="status" ref={okRef} tabIndex={-1}>
        <p className="wv-ax-form-ok">Got it.</p>
        <p>We will reply within one working day with a short plan. Need it faster? Message us on WhatsApp.</p>
      </div>
    )

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="wv-ax-field">
      <label htmlFor={`${id}-${name}`}>{label}</label>
      <input id={`${id}-${name}`} name={name} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${id}-${name}-e` : undefined} {...props} />
      {errors[name] && (
        <em id={`${id}-${name}-e`} role="alert">
          {errors[name]}
        </em>
      )}
    </div>
  )

  return (
    <form className="wv-ax-form" id={id} onSubmit={onSubmit} noValidate>
      {field('name', 'Your name', { type: 'text', autoComplete: 'name', required: true })}
      {field('email', 'Work email', { type: 'email', autoComplete: 'email', required: true })}
      {field('phone', 'Phone or WhatsApp (optional)', { type: 'tel', autoComplete: 'tel' })}
      {field('want', 'What should we automate?', { type: 'text', value: want, maxLength: MAX, onChange: (e) => setWant(e.target.value), required: true })}
      <div className="wv-cta-row">
        <Magnetic>
          <button type="submit" className="wv-btn wv-btn-y" disabled={busy}>
            {busy ? 'Sending…' : 'Get my plan'} <Arrow size={15} />
          </button>
        </Magnetic>
      </div>
      {failed && (
        <p className="wv-ax-form-err" role="alert">
          Something broke on our side. Email contact@websitevikreta.com or use WhatsApp.
        </p>
      )}
    </form>
  )
}
