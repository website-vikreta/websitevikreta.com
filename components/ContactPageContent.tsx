'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Mail, MapPin, Clock, ChevronDown, Loader2, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { DotGrid } from '@/components/ui/DotGrid'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

const COUNTRY_CODES = [
  { flag: '🇮🇳', code: '+91',  name: 'India' },
  { flag: '🇺🇸', code: '+1',   name: 'United States' },
  { flag: '🇬🇧', code: '+44',  name: 'United Kingdom' },
  { flag: '🇦🇪', code: '+971', name: 'UAE' },
  { flag: '🇸🇬', code: '+65',  name: 'Singapore' },
  { flag: '🇦🇺', code: '+61',  name: 'Australia' },
  { flag: '🇨🇦', code: '+1',   name: 'Canada' },
  { flag: '🇩🇪', code: '+49',  name: 'Germany' },
  { flag: '🇫🇷', code: '+33',  name: 'France' },
  { flag: '🇯🇵', code: '+81',  name: 'Japan' },
]

const SERVICES = [
  'Website Design & Development',
  'E-Commerce Development',
  'UI/UX Design',
  'Brand Identity',
  'SEO & Performance',
  'Maintenance & Support',
  'Other',
]

interface FormData {
  name: string
  countryCode: string
  phone: string
  email: string
  serviceType: string
  budget: string
  message: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  serviceType?: string
  message?: string
}

const INITIAL: FormData = {
  name: '',
  countryCode: '+91',
  phone: '',
  email: '',
  serviceType: '',
  budget: '',
  message: '',
}

const EASE = [0.22, 1, 0.36, 1] as const

const containerV = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, ease: EASE },
  },
}

const itemV = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
}

function fieldClass(error?: string, extra = '') {
  const base = `contact-field${error ? ' error' : ''}`
  return extra ? `${base} ${extra}` : base
}

export function ContactPageContent() {
  const prefersReduced = useReducedMotion()

  const [form, setForm]           = useState<FormData>(INITIAL)
  const [errors, setErrors]       = useState<FormErrors>({})
  const [isSubmitting, setSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    if (sendError) setSendError(null)
  }

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Please enter your full name (min 2 characters)'
    const digits = form.phone.replace(/\D/g, '')
    if (!digits || digits.length < 7 || digits.length > 15)
      e.phone = 'Please enter a valid phone number'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address'
    if (!form.serviceType)
      e.serviceType = 'Please select a type of service'
    if (!form.message.trim() || form.message.trim().length < 20)
      e.message = 'Message must be at least 20 characters'
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmit(true)
    setSendError(null)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          phone:        `${form.countryCode} ${form.phone}`,
          reply_to:     form.email,
          from_email:   form.email,
          service_type: form.serviceType,
          budget:       form.budget || 'Not specified',
          message:      form.message,
          to_name:      'Website Vikreta',
        },
        EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('[ContactForm] EmailJS send failed:', msg, err)
      setSendError(msg)
    } finally {
      setSubmit(false)
    }
  }

  function resetForm() {
    setForm(INITIAL)
    setErrors({})
    setSendError(null)
    setSubmitted(false)
  }

  const animate = !prefersReduced

  return (
    <>
      <style>{`
        .contact-field {
          display: block;
          width: 100%;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.12);
          border-radius: 8px;
          padding: 12px 16px;
          color: var(--color-text);
          font-size: 0.875rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .contact-field::placeholder {
          color: rgba(0,0,0,0.35);
        }
        .contact-field:focus {
          border-color: #FFBF00;
          box-shadow: 0 0 0 3px rgba(255,191,0,0.15);
        }
        .contact-field.error {
          border-color: #FF4444;
        }
        .contact-field.error:focus {
          box-shadow: none;
        }
        .contact-select {
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
        }
        .contact-select option {
          background: #ffffff;
          color: #121212;
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .contact-label {
          display: block;
          font-size: 0.6875rem;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(0,0,0,0.4);
          margin-bottom: 0.5rem;
        }
        .contact-error {
          margin-top: 0.375rem;
          font-size: 0.75rem;
          color: #FF4444;
        }
      `}</style>

      {/* Outer wrapper — no bg override, inherits site light bg */}
      <section className="relative min-h-screen overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32">
        <DotGrid />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── Left column ── */}
            <motion.div
              variants={animate ? containerV : undefined}
              initial={animate ? 'hidden' : false}
              animate={animate ? 'visible' : undefined}
            >
              <motion.h1
                variants={animate ? itemV : undefined}
                className="font-semibold leading-[1.05] tracking-[-0.02em] mb-6"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--color-text)' }}
              >
                Let&apos;s build something together.
              </motion.h1>

              <motion.p
                variants={animate ? itemV : undefined}
                className="leading-relaxed mb-12 max-w-sm"
                style={{ fontSize: '1.0625rem', color: 'var(--color-text-muted)' }}
              >
                Tell us about your project. We&apos;ll get back to you within 24 hours.
              </motion.p>

              <motion.div
                variants={animate ? itemV : undefined}
                className="flex flex-col gap-5"
              >
                {([
                  { Icon: Mail,   text: 'contact@websitevikreta.com' },
                  { Icon: MapPin, text: 'Pune, India' },
                  { Icon: Clock,  text: 'Response within 24 hours' },
                ] as const).map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={16} strokeWidth={1.5} style={{ color: '#FFBF00', flexShrink: 0 }} />
                    <span className="font-mono" style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      {text}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right column — form card ── */}
            <motion.div
              initial={animate ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.12 }}
              style={{
                background:           'rgba(255,255,255,0.7)',
                border:               '1px solid rgba(0,0,0,0.08)',
                borderRadius:         16,
                backdropFilter:       'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding:              'clamp(24px, 5vw, 40px)',
              }}
            >
              {submitted ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center justify-center text-center py-12 gap-4">
                  <CheckCircle2 size={56} strokeWidth={1.25} style={{ color: '#FFBF00' }} />
                  <h2
                    className="font-semibold"
                    style={{ fontSize: '1.25rem', marginTop: '0.5rem', color: 'var(--color-text)' }}
                  >
                    Enquiry sent successfully!
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    We&apos;ll be in touch within 24 hours.
                  </p>
                  <button
                    onClick={resetForm}
                    style={{
                      marginTop:           '1rem',
                      fontSize:            '0.875rem',
                      color:               '#FFBF00',
                      textDecoration:      'underline',
                      textUnderlineOffset: '4px',
                      background:          'none',
                      border:              'none',
                      cursor:              'pointer',
                      fontFamily:          'inherit',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text)')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#FFBF00')}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                  {/* Name */}
                  <div>
                    <label className="contact-label">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={fieldClass(errors.name)}
                    />
                    {errors.name && <p className="contact-error">{errors.name}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="contact-label">Phone Number</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{ position: 'relative', flexShrink: 0, width: 120 }}>
                        <select
                          name="countryCode"
                          value={form.countryCode}
                          onChange={handleChange}
                          className={fieldClass(errors.phone, 'contact-select')}
                          style={{ paddingRight: '2rem' }}
                        >
                          {COUNTRY_CODES.map(c => (
                            <option key={`${c.code}-${c.name}`} value={c.code}>
                              {c.flag} {c.code}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={12}
                          strokeWidth={2}
                          style={{
                            position:      'absolute',
                            right:         '0.625rem',
                            top:           '50%',
                            transform:     'translateY(-50%)',
                            color:         'rgba(0,0,0,0.4)',
                            pointerEvents: 'none',
                          }}
                        />
                      </div>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        className={fieldClass(errors.phone)}
                        style={{ flex: 1 }}
                      />
                    </div>
                    {errors.phone && <p className="contact-error">{errors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="contact-label">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={fieldClass(errors.email)}
                    />
                    {errors.email && <p className="contact-error">{errors.email}</p>}
                  </div>

                  {/* Service type */}
                  <div>
                    <label className="contact-label">Type of Service</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        name="serviceType"
                        value={form.serviceType}
                        onChange={handleChange}
                        className={fieldClass(errors.serviceType, 'contact-select')}
                        style={{ paddingRight: '2rem' }}
                      >
                        <option value="" disabled>Select a service</option>
                        {SERVICES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        style={{
                          position:      'absolute',
                          right:         '0.75rem',
                          top:           '50%',
                          transform:     'translateY(-50%)',
                          color:         'rgba(0,0,0,0.4)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                    {errors.serviceType && <p className="contact-error">{errors.serviceType}</p>}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="contact-label">Budget</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        name="budget"
                        value={form.budget}
                        onChange={handleChange}
                        className={fieldClass(undefined, 'contact-select')}
                        style={{ paddingRight: '2rem' }}
                      >
                        <option value="" disabled>Select a budget</option>
                      </select>
                      <ChevronDown
                        size={14}
                        strokeWidth={2}
                        style={{
                          position:      'absolute',
                          right:         '0.75rem',
                          top:           '50%',
                          transform:     'translateY(-50%)',
                          color:         'rgba(0,0,0,0.4)',
                          pointerEvents: 'none',
                        }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="contact-label">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project, goals, and timeline..."
                      maxLength={1000}
                      className={fieldClass(errors.message, 'contact-textarea')}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.375rem' }}>
                      {errors.message
                        ? <p className="contact-error" style={{ marginTop: 0 }}>{errors.message}</p>
                        : <span />
                      }
                      <p style={{ fontSize: '0.75rem', color: 'rgba(0,0,0,0.3)', marginLeft: 'auto' }}>
                        {form.message.length} / 1000
                      </p>
                    </div>
                  </div>

                  {/* Error banner */}
                  {sendError && (
                    <div style={{
                      display:      'flex',
                      gap:          '0.75rem',
                      alignItems:   'flex-start',
                      border:       '1px solid #FF4444',
                      borderRadius: '8px',
                      padding:      '1rem',
                      background:   'rgba(255,68,68,0.06)',
                    }}>
                      <AlertCircle size={16} strokeWidth={1.5} style={{ color: '#FF4444', flexShrink: 0, marginTop: '0.125rem' }} />
                      <div style={{ fontSize: '0.8125rem', color: '#FF4444', lineHeight: 1.6 }}>
                        <p>
                          Something went wrong. Please try again or email us at{' '}
                          <a href="mailto:contact@websitevikreta.com" style={{ textDecoration: 'underline' }}>
                            contact@websitevikreta.com
                          </a>
                        </p>
                        {sendError && (
                          <p style={{ marginTop: '0.25rem', opacity: 0.75, fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            Error: {sendError}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary py-[0.8125rem] px-[1.625rem] text-[0.9375rem] w-full justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} strokeWidth={1.75} className="animate-spin btn-icon" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <span className="btn-label">Send Enquiry</span>
                        <ArrowRight size={15} strokeWidth={1.75} className="btn-icon" aria-hidden="true" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}
