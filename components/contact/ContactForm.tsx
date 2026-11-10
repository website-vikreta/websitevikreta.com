'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Linkedin, Whatsapp, Instagram, Envelope, Telephone, ArrowUpRight, ArrowClockwise } from 'react-bootstrap-icons'
import emailjs from '@emailjs/browser'
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from 'libphonenumber-js/min'
import { trackFormSubmit, trackLinkClick } from '@/lib/analytics'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

const CHANNELS = [
  { href: 'https://wa.me/919970445198', label: 'Chat with us', icon: Whatsapp, ariaLabel: 'Chat with Website Vikreta on WhatsApp' },
  { href: 'mailto:contact@websitevikreta.com', label: 'Email us', icon: Envelope, ariaLabel: 'Email Website Vikreta' },
  { href: 'tel:919970445198', label: 'Call us', icon: Telephone, ariaLabel: 'Call Website Vikreta' },
  { href: 'https://www.linkedin.com/company/websitevikreta/', label: 'Connect with us', icon: Linkedin, ariaLabel: 'Connect with Website Vikreta on LinkedIn' },
  { href: 'https://instagram.com/websitevikreta', label: 'Follow us', icon: Instagram, ariaLabel: 'Follow Website Vikreta on Instagram' },
] as const

export function ContactChannels() {
  return (
    <ul className="wv-ct-channels">
      {CHANNELS.map(({ href, label, icon: Icon, ariaLabel }) => (
        <li key={href}>
          <a
            href={href}
            {...(href.startsWith('mailto:') || href.startsWith('tel:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
            onClick={() => trackLinkClick(href, 'contact_page')}
            aria-label={ariaLabel}
            className="wv-ct-channel"
          >
            <Icon size={16} aria-hidden="true" />
            <span>{label}</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

const flag = (cc: string) => String.fromCodePoint(...[...cc].map((c) => 0x1f1a5 + c.charCodeAt(0)))

interface FormData { name: string; jobOrWebsite: string; email: string; phone: string; message: string }
type FormErrors = Partial<Record<keyof FormData, string>>
const INITIAL: FormData = { name: '', jobOrWebsite: '', email: '', phone: '', message: '' }

const LIMITS = { name: 80, jobOrWebsite: 120, email: 254, phone: 20, message: 2000 } as const
const regionName = (c: CountryCode) => new Intl.DisplayNames(['en'], { type: 'region' }).of(c) ?? c

function checkField(id: keyof FormData, raw: string, country: CountryCode): string | undefined {
  const v = raw.trim()
  switch (id) {
    case 'name':
      if (!v) return 'Enter your name'
      if (v.length < 2) return 'Name must be at least 2 characters'
      if (v.length > LIMITS.name) return `Name must be under ${LIMITS.name} characters`
      if (!/^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u.test(v)) return 'Use letters, spaces, apostrophes or hyphens only'
      return
    case 'jobOrWebsite':
      if (!v) return 'Enter your job or website'
      if (v.length < 2) return 'Must be at least 2 characters'
      if (v.length > LIMITS.jobOrWebsite) return `Must be under ${LIMITS.jobOrWebsite} characters`
      return
    case 'email':
      if (!v) return 'Enter your email'
      if (v.length > LIMITS.email || !/^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i.test(v)) return 'Enter a valid email, like you@company.com'
      return
    case 'phone': {
      if (!v) return 'Enter your phone number'
      if (!/^[\d\s()+.-]+$/.test(v)) return 'Use digits only'
      const p = parsePhoneNumberFromString(v, country)
      if (!p?.isValid()) return `Enter a valid phone number for ${regionName(country)}`
      return
    }
    case 'message':
      if (v.length > LIMITS.message) return `Keep it under ${LIMITS.message} characters`
      return
  }
}

function validate(form: FormData, country: CountryCode): FormErrors {
  const errs: FormErrors = {}
  for (const id of Object.keys(form) as (keyof FormData)[]) {
    const e = checkField(id, form[id], country)
    if (e) errs[id] = e
  }
  return errs
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [country, setCountry] = useState<CountryCode>('IN')
  const touchedCountry = useRef(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState(false)

  const countries = useMemo(() => {
    const names = new Intl.DisplayNames(['en'], { type: 'region' })
    return getCountries()
      .map((c) => ({ c, name: names.of(c) ?? c, code: getCountryCallingCode(c) }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])
  const current = countries.find((x) => x.c === country)

  // Prefill from ?service= / ?interest= (links from AI Automations pages).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const v = (q.get('service') || q.get('interest') || '').slice(0, 70)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (v) setForm((f) => (f.jobOrWebsite ? f : { ...f, jobOrWebsite: `${v} project` }))
  }, [])

  // Preselect visitor country; never blocks render or overrides a manual pick.
  useEffect(() => {
    fetch('/api/geo')
      .then((r) => r.json())
      .then((d: { country: string | null }) => {
        const c = d.country as CountryCode | null
        if (c && getCountries().includes(c)) setCountry((prev) => (touchedCountry.current ? prev : c))
      })
      .catch(() => {})
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof FormData
    const value = e.target.value
    setForm((prev) => ({ ...prev, [name]: value }))
    // Field already flagged: re-check live so the error clears as soon as it's fixed.
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: checkField(name, value, country) }))
    if (sendError) setSendError(false)
  }

  // Validate on leaving a field, but not an untouched empty one.
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof FormData
    if (!e.target.value.trim() && !errors[name]) return
    setErrors((prev) => ({ ...prev, [name]: checkField(name, e.target.value, country) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isSubmitting) return
    const errs = validate(form, country)
    setErrors(errs)
    const firstBad = (Object.keys(INITIAL) as (keyof FormData)[]).find((k) => errs[k])
    if (firstBad) {
      document.getElementById(`ct-${firstBad}`)?.focus()
      return
    }
    const e164 = parsePhoneNumberFromString(form.phone.trim(), country)!.number
    setSubmit(true)
    setSendError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name.trim().replace(/\s+/g, ' '),
          reply_to: form.email.trim(),
          email: form.email.trim(),
          service: form.jobOrWebsite.trim(),
          mobile: e164,
          budget: 'Not specified',
          message: form.message.trim() || `${form.name.trim()} has a ${form.jobOrWebsite.trim()} that needs help.`,
          to_name: 'Website Vikreta',
        },
        EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
      trackFormSubmit('contact_us')
    } catch (err) {
      const e = err as { status?: number; text?: string }
      console.error('[EmailJS] send failed:', e?.status, e?.text, err)
      setSendError(true)
    } finally {
      setSubmit(false)
    }
  }

  if (submitted) {
    return (
      <div className="wv-ct-done" role="status">
        <p>Thanks for reaching out, our team will get back to you within 24 hours.</p>
        <button
          type="button"
          className="wv-link"
          onClick={() => { setSubmitted(false); setForm(INITIAL); setErrors({}); setSendError(false) }}
        >
          Submit another request
        </button>
      </div>
    )
  }

  const field = (id: keyof FormData, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="wv-ct-field">
      <label htmlFor={`ct-${id}`}>{label}</label>
      <input
        id={`ct-${id}`}
        name={id}
        value={form[id]}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={LIMITS[id]}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `err-${id}` : undefined}
        disabled={isSubmitting}
        {...props}
      />
      {errors[id] && <p id={`err-${id}`} className="wv-ct-err" role="alert">{errors[id]}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit} noValidate className="wv-ct-form">
      {field('name', 'Your name', { type: 'text', autoComplete: 'name', placeholder: 'Jane Doe' })}
      {field('jobOrWebsite', 'Your job or website', { type: 'text', placeholder: 'Website, app, team, etc.' })}
      {field('email', 'Email address', { type: 'email', autoComplete: 'email', placeholder: 'you@company.com' })}

      <div className="wv-ct-field">
        <label htmlFor="ct-phone">Phone number</label>
        <div className="wv-ct-phone" data-invalid={!!errors.phone}>
          <div className="wv-ct-cc">
            <span aria-hidden="true">{flag(country)} +{current?.code}</span>
            <select
              aria-label="Country calling code"
              value={country}
              onChange={(e) => {
                const c = e.target.value as CountryCode
                setCountry(c)
                touchedCountry.current = true
                if (form.phone.trim()) setErrors((p) => ({ ...p, phone: checkField('phone', form.phone, c) }))
              }}
              disabled={isSubmitting}
            >
              {countries.map((x) => (
                <option key={x.c} value={x.c}>{flag(x.c)} {x.name} +{x.code}</option>
              ))}
            </select>
          </div>
          <input
            id="ct-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={LIMITS.phone}
            placeholder="Phone number"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'err-phone' : undefined}
            disabled={isSubmitting}
          />
        </div>
        {errors.phone && <p id="err-phone" className="wv-ct-err" role="alert">{errors.phone}</p>}
      </div>

      <div className="wv-ct-field">
        <label htmlFor="ct-message">Your message (optional)</label>
        <textarea
          id="ct-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What do you want to build or automate?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'err-message' : undefined}
          disabled={isSubmitting}
        />
        <p className="wv-ct-count" aria-hidden="true">{form.message.trim().length}/{LIMITS.message}</p>
        {errors.message && <p id="err-message" className="wv-ct-err" role="alert">{errors.message}</p>}
      </div>

      {sendError && (
        <p className="wv-ct-err" role="alert">
          Something went wrong. Email us at{' '}
          <a href="mailto:contact@websitevikreta.com" className="wv-link" onClick={() => trackLinkClick('mailto:contact@websitevikreta.com', 'contact_page_error')}>
            contact@websitevikreta.com
          </a>
        </p>
      )}

      <button type="submit" className="wv-btn wv-btn-y" disabled={isSubmitting}>
        {isSubmitting ? (<><ArrowClockwise size={14} className="animate-spin" aria-hidden="true" />Sending…</>) : 'Send Info'}
      </button>
    </form>
  )
}
