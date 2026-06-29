'use client'

import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { Loader2 } from 'lucide-react'
import AutomationWorkflowCanvas from '@/components/ui/automation-workflow-canvas'
import { ParallaxFeatureScroll } from '@/components/ui/parallax-feature-scroll'
import { Button } from '@/components/ui/Button'

// ─── Shared constants ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// ─── Animation helpers ────────────────────────────────────────────────────────

function scrollIn(reduce: boolean | null, delay = 0) {
  return {
    initial:     { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-80px' } as { once: boolean; margin: string },
    transition:  { duration: 0.35, delay, ease: EASE },
  }
}

const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const lineReveal = {
  hidden:   { y: '110%', opacity: 0 },
  visible:  { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const rowReveal = {
  hidden:   { y: '100%' },
  visible:  { y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const ctaContainer = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.1, delayChildren: 0 } },
}

const ctaChild = {
  hidden:   { opacity: 0, y: 36 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPARISON_ROWS: { problem: string; solution: string }[] = [
  {
    problem:  'Multiple vendors, you\'re the project manager',
    solution: 'One team, start to finish',
  },
  {
    problem:  'Generic templates, your logo on top',
    solution: 'Built around how you actually work',
  },
  {
    problem:  'Vague timelines',
    solution: 'Clear scope before we build',
  },
  {
    problem:  'Goes quiet after launch',
    solution: 'We stay on',
  },
  {
    problem:  'Locked into their platform',
    solution: 'Open, leave anytime',
  },
]

// ─── Animated success tick ────────────────────────────────────────────────────

function AnimatedTick() {
  return (
    <motion.svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <motion.circle
        cx="36" cy="36" r="30"
        stroke="var(--color-text)"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          hidden:   { pathLength: 0, opacity: 0 },
          visible:  { pathLength: 1, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
      <motion.path
        d="M22 37 L31 46 L50 27"
        stroke="var(--color-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden:   { pathLength: 0, opacity: 0 },
          visible:  { pathLength: 1, opacity: 1, transition: { duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
    </motion.svg>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

interface CtaFormData {
  firstName: string
  lastName:  string
  email:     string
  subject:   string
  message:   string
}

interface CtaFormErrors {
  firstName?: string
  lastName?:  string
  email?:     string
  subject?:   string
  message?:   string
}

const CTA_FORM_INITIAL: CtaFormData = {
  firstName: '', lastName: '', email: '', subject: '', message: '',
}

function validateCtaForm(data: CtaFormData): CtaFormErrors {
  const errs: CtaFormErrors = {}
  if (!data.firstName.trim()) errs.firstName = 'Required'
  if (!data.lastName.trim())  errs.lastName  = 'Required'
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = 'Valid email required'
  if (!data.subject.trim()) errs.subject = 'Required'
  if (!data.message.trim()) errs.message = 'Required'
  return errs
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIAutomationsClient() {
  const reduce = useReducedMotion()

  const [ctaForm,       setCtaForm]       = useState<CtaFormData>(CTA_FORM_INITIAL)
  const [ctaErrors,     setCtaErrors]     = useState<CtaFormErrors>({})
  const [ctaSubmitting, setCtaSubmitting] = useState(false)
  const [ctaSubmitted,  setCtaSubmitted]  = useState(false)
  const [ctaSendError,  setCtaSendError]  = useState(false)

  function handleCtaChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setCtaForm(prev => ({ ...prev, [name]: value }))
    if (ctaErrors[name as keyof CtaFormErrors]) {
      setCtaErrors(prev => ({ ...prev, [name]: undefined }))
    }
    if (ctaSendError) setCtaSendError(false)
  }

  async function handleCtaSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validateCtaForm(ctaForm)
    if (Object.keys(errs).length > 0) { setCtaErrors(errs); return }
    setCtaSubmitting(true)
    setCtaSendError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:         `${ctaForm.firstName} ${ctaForm.lastName}`,
          reply_to:     ctaForm.email,
          email:        ctaForm.email,
          service_type: ctaForm.subject,
          budget:       'Not specified',
          message:      ctaForm.message,
          to_name:      'Website Vikreta',
        },
        EMAILJS_PUBLIC_KEY,
      )
      setCtaSubmitted(true)
    } catch (err) {
      const e = err as { status?: number; text?: string }
      console.error('[EmailJS] send failed:', e?.status, e?.text, err)
      setCtaSendError(true)
    } finally {
      setCtaSubmitting(false)
    }
  }

  return (
    <>
      <main id="main-content" className="relative z-10">

        {/* ── 3 · Comparison table ─────────────────────────────────────────── */}
        <section className="py-16 md:py-20" aria-labelledby="why-us-heading">
          <div className="container">

            {/* Heading — 2-line clip reveal */}
            <motion.div
              className="mb-10 md:mb-12 max-w-[768px] mx-auto text-center"
              variants={lineContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2 id="why-us-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-[var(--color-text)]">
                <span className="overflow-hidden block">
                  <motion.span className="block" variants={lineReveal}>
                    Why Choose Website Vikreta for
                  </motion.span>
                </span>
                <span className="overflow-hidden block">
                  <motion.span className="block" variants={lineReveal}>
                    AI Automation?
                  </motion.span>
                </span>
              </h2>
            </motion.div>

            {/* Table — rows clip-reveal */}
            <motion.div
              className="max-w-[768px] mx-auto border border-[var(--color-border)]"
              variants={rowContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >

              {/* Column headers */}
              <div className="grid grid-cols-2 border-b border-[var(--color-border)]">
                <div className="px-5 py-3 border-r border-[var(--color-border)]">
                  <span className="text-lg font-bold text-[var(--color-text-muted)]">
                    The usual way
                  </span>
                </div>
                <div className="px-5 py-3 bg-[var(--color-accent)]">
                  <span className="text-lg font-bold text-[var(--color-text)]">
                    With Website Vikreta
                  </span>
                </div>
              </div>

              {/* Rows */}
              {COMPARISON_ROWS.map((row, i) => (
                <div
                  key={i}
                  className={`overflow-hidden${i < COMPARISON_ROWS.length - 1 ? ' border-b border-[var(--color-border)]' : ''}`}
                >
                  <motion.div className="grid grid-cols-2" variants={rowReveal}>

                    {/* Problem */}
                    <div className="px-5 py-4 border-r border-[var(--color-border)]">
                      <p className="leading-relaxed text-[var(--color-text-muted)]">
                        {row.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="px-5 py-4 bg-[var(--color-text)]">
                      <p className="leading-relaxed font-medium text-[var(--color-bg)]">
                        {row.solution}
                      </p>
                    </div>

                  </motion.div>
                </div>
              ))}

            </motion.div>
          </div>
        </section>

        {/* ── 4 · Services canvas ───────────────────────────────────────────── */}
        <section id="services" className="py-16 md:py-20" aria-labelledby="services-heading">
          <div className="container">
            <motion.div className="mb-12 md:mb-14 max-w-2xl" {...scrollIn(reduce)}>
              <h2 id="services-heading" className="text-h2 font-bold leading-[1.05] tracking-tight text-[var(--color-text)]">
                Our AI Automation Services
              </h2>
            </motion.div>

            <motion.div {...scrollIn(reduce, 0.1)}>
              <AutomationWorkflowCanvas />
            </motion.div>

          </div>
        </section>

        {/* ── 5 · Why automation matters ────────────────────────────────────── */}
        <ParallaxFeatureScroll />

        {/* ── 6 · Contact Form ──────────────────────────────────────────────── */}
        <section className="pt-28 md:pt-36 pb-20 md:pb-28" aria-labelledby="cta-form-heading">
          <div className="container">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 lg:items-start"
              variants={ctaContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >

              {/* Left — 40% */}
              <motion.div variants={ctaChild}>
                <h2
                  id="cta-form-heading"
                  className="text-h2 font-bold leading-[1.05] tracking-tight text-[var(--color-text)] mb-6"
                >
                  Share your project details.
                </h2>
                <p
                  className="text-[var(--color-text-muted)] mb-10"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}
                >
                  Tell us what your team spends time on. We&rsquo;ll map an automation that fits your business. No templates, no lock-in.
                </p>
              </motion.div>

              {/* Right — 60% */}
              <motion.div variants={ctaChild}>
                <div>
                  {ctaSubmitted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', padding: '2rem 0' }}>
                      <AnimatedTick />
                      <p style={{ fontSize: '1.25rem', lineHeight: 1.4, color: 'var(--color-text)', fontWeight: 500 }}>
                        Thanks, we&rsquo;ll get back to you within 24 hours.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setCtaSubmitted(false)
                          setCtaForm(CTA_FORM_INITIAL)
                          setCtaErrors({})
                          setCtaSendError(false)
                        }}
                        style={{
                          marginTop:           '1.25rem',
                          fontSize:            '0.875rem',
                          fontWeight:          500,
                          color:               'var(--color-text)',
                          background:          'none',
                          border:              'none',
                          padding:             0,
                          cursor:              'pointer',
                          textDecoration:      'underline',
                          textUnderlineOffset: '3px',
                        }}
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCtaSubmit} noValidate>

                      {/* First + Last Name */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">

                        <div>
                          <label
                            htmlFor="ctaFirstName"
                            className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2"
                          >
                            First Name
                          </label>
                          <input
                            id="ctaFirstName"
                            name="firstName"
                            type="text"
                            value={ctaForm.firstName}
                            onChange={handleCtaChange}
                            placeholder="Jane"
                            disabled={ctaSubmitting}
                            aria-invalid={!!ctaErrors.firstName}
                            aria-describedby={ctaErrors.firstName ? 'err-cta-fn' : undefined}
                            className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                            style={{ borderColor: ctaErrors.firstName ? '#FF4444' : 'var(--color-border)' }}
                            onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                            onBlur={e => { e.target.style.borderColor = ctaErrors.firstName ? '#FF4444' : 'var(--color-border)' }}
                          />
                          {ctaErrors.firstName && (
                            <p id="err-cta-fn" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>
                              {ctaErrors.firstName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="ctaLastName"
                            className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2"
                          >
                            Last Name
                          </label>
                          <input
                            id="ctaLastName"
                            name="lastName"
                            type="text"
                            value={ctaForm.lastName}
                            onChange={handleCtaChange}
                            placeholder="Doe"
                            disabled={ctaSubmitting}
                            aria-invalid={!!ctaErrors.lastName}
                            aria-describedby={ctaErrors.lastName ? 'err-cta-ln' : undefined}
                            className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                            style={{ borderColor: ctaErrors.lastName ? '#FF4444' : 'var(--color-border)' }}
                            onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                            onBlur={e => { e.target.style.borderColor = ctaErrors.lastName ? '#FF4444' : 'var(--color-border)' }}
                          />
                          {ctaErrors.lastName && (
                            <p id="err-cta-ln" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>
                              {ctaErrors.lastName}
                            </p>
                          )}
                        </div>

                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label
                          htmlFor="ctaEmail"
                          className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2"
                        >
                          Email
                        </label>
                        <input
                          id="ctaEmail"
                          name="email"
                          type="email"
                          value={ctaForm.email}
                          onChange={handleCtaChange}
                          placeholder="jane@company.com"
                          disabled={ctaSubmitting}
                          aria-invalid={!!ctaErrors.email}
                          aria-describedby={ctaErrors.email ? 'err-cta-email' : undefined}
                          className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                          style={{ borderColor: ctaErrors.email ? '#FF4444' : 'var(--color-border)' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                          onBlur={e => { e.target.style.borderColor = ctaErrors.email ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {ctaErrors.email && (
                          <p id="err-cta-email" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>
                            {ctaErrors.email}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div className="mb-4">
                        <label
                          htmlFor="ctaSubject"
                          className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2"
                        >
                          Subject
                        </label>
                        <input
                          id="ctaSubject"
                          name="subject"
                          type="text"
                          value={ctaForm.subject}
                          onChange={handleCtaChange}
                          placeholder="What do you need automated?"
                          disabled={ctaSubmitting}
                          aria-invalid={!!ctaErrors.subject}
                          aria-describedby={ctaErrors.subject ? 'err-cta-subject' : undefined}
                          className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                          style={{ borderColor: ctaErrors.subject ? '#FF4444' : 'var(--color-border)' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                          onBlur={e => { e.target.style.borderColor = ctaErrors.subject ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {ctaErrors.subject && (
                          <p id="err-cta-subject" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>
                            {ctaErrors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div className="mb-6">
                        <label
                          htmlFor="ctaMessage"
                          className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="ctaMessage"
                          name="message"
                          value={ctaForm.message}
                          onChange={handleCtaChange}
                          placeholder="Describe the repetitive work you want to automate…"
                          rows={5}
                          disabled={ctaSubmitting}
                          aria-invalid={!!ctaErrors.message}
                          aria-describedby={ctaErrors.message ? 'err-cta-message' : undefined}
                          className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)] resize-none"
                          style={{ borderColor: ctaErrors.message ? '#FF4444' : 'var(--color-border)' }}
                          onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                          onBlur={e => { e.target.style.borderColor = ctaErrors.message ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {ctaErrors.message && (
                          <p id="err-cta-message" style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>
                            {ctaErrors.message}
                          </p>
                        )}
                      </div>

                      {ctaSendError && (
                        <p
                          style={{ marginBottom: '1rem', fontSize: '0.8125rem', color: '#FF4444', fontFamily: 'monospace' }}
                          role="alert"
                        >
                          Something went wrong. Email us at{' '}
                          <a href="mailto:contact@websitevikreta.com" style={{ textDecoration: 'underline' }}>
                            contact@websitevikreta.com
                          </a>
                        </p>
                      )}

                      <div className="flex justify-center">
                      <Button
                        type="submit"
                        variant="accent"
                        size="md"
                        disabled={ctaSubmitting}
                      >
                        {ctaSubmitting
                          ? (
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Loader2 size={13} strokeWidth={2} className="animate-spin" aria-hidden="true" />
                              Sending…
                            </span>
                          )
                          : 'Send message'
                        }
                      </Button>
                      </div>

                    </form>
                  )}
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

      </main>
    </>
  )
}
