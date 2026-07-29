'use client'

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { revealLines, revealFadeUp, useGsapSection, STAGGER } from '@/lib/gsap/reveals'

// ─── CSS-transition tokens (micro-interactions; per motion-spec §6) ───────────

/** CSS-equivalent of the site reveal curve — cubic-bezier(0.16,1,0.3,1). */
const CSS_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
/** Focus/hover micro-interaction duration (DUR.micro = 0.2s). */
const T_MICRO = '0.2s'
/** Error-alert fade duration (DUR.fast = 0.4s). */
const T_FAST = '0.4s'

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

export function AboutContactCTASection() {
  const [ctaForm,       setCtaForm]       = useState<CtaFormData>(CTA_FORM_INITIAL)
  const [ctaErrors,     setCtaErrors]     = useState<CtaFormErrors>({})
  const [ctaSubmitting, setCtaSubmitting] = useState(false)
  const [ctaSubmitted,  setCtaSubmitted]  = useState(false)
  const [ctaSendError,  setCtaSendError]  = useState(false)

  // Presentational-only: drives the error alert's opacity fade-in. Does not touch form/validation state.
  const [ctaErrorVisible, setCtaErrorVisible] = useState(false)

  const scope = useRef<HTMLElement>(null)

  // Entrance: left column (heading masked lines + sub fade-up) → form card → field rows, tight cascade.
  useGsapSection(scope, () => {
    revealLines('.about-cta-heading', { trigger: scope.current })
    revealFadeUp('.about-cta-sub', { y: 20, delay: STAGGER.loose, trigger: scope.current })
    revealFadeUp('.about-cta-form-card', { y: 24, delay: STAGGER.loose + STAGGER.base, trigger: scope.current })
    revealFadeUp('.about-cta-field-row', {
      y: 16,
      stagger: STAGGER.tight,
      delay: STAGGER.loose + STAGGER.base * 2,
      trigger: scope.current,
    })
  })

  // Success message: fades/rises in on submit (feedback, not a scroll reveal — load-triggered).
  useEffect(() => {
    if (!ctaSubmitted) return
    const tween = revealFadeUp('.about-cta-success-msg', { y: 16, trigger: null })
    return () => { tween.kill() }
  }, [ctaSubmitted])

  // Error alert: simple opacity fade-in (no y-transform, per spec) — needs a two-frame state
  // flip since a CSS transition requires a prior style to animate from.
  useEffect(() => {
    if (!ctaSendError) { setCtaErrorVisible(false); return }
    const id = requestAnimationFrame(() => setCtaErrorVisible(true))
    return () => cancelAnimationFrame(id)
  }, [ctaSendError])

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
    <section
      ref={scope}
      id="book-a-call"
      className="pt-16 pb-24 md:pt-20 md:pb-32"
      aria-labelledby="about-cta-form-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-20 lg:items-start">

          {/* Left — 40% */}
          <div className='md:py-8'>
            <h2
              id="about-cta-form-heading"
              className="about-cta-heading text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) mb-6"
            >
              Tell Us What&apos;s Broken
            </h2>
            <p className="about-cta-sub text-body-lg text-(--color-text-muted) leading-relaxed mb-4 md:mb-10">
              Free call. No commitment. Describe what isn&apos;t working — the manual process, the site that doesn&apos;t convert, the leads going cold — and we&apos;ll tell you what we&apos;d actually do about it. Not a pitch. Just a conversation.
            </p>
          </div>

          {/* Right — 60% */}
          <div>
            <div className="about-cta-form-card bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
              {ctaSubmitted ? (
                <div className="about-cta-success-msg">
                  <p
                    className="text-h3 font-normal max-w-[28ch]"
                    style={{ color: '#16a34a' }}
                  >
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
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-(--color-text) underline underline-offset-[3px] bg-transparent border-none p-0 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCtaSubmit} noValidate>

                  <h2 className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text) mb-6">
                    Book a Free Call
                  </h2>

                  <div className="flex flex-col gap-3 sm:gap-3.5">

                    {/* First + Last Name */}
                    <div className="about-cta-field-row grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div>
                        <label
                          htmlFor="aboutCtaFirstName"
                          className="block text-sm font-medium text-(--color-text-muted) mb-1.5"
                        >
                          First Name
                        </label>
                        <input
                          id="aboutCtaFirstName"
                          name="firstName"
                          type="text"
                          value={ctaForm.firstName}
                          onChange={handleCtaChange}
                          placeholder="Jane"
                          disabled={ctaSubmitting}
                          aria-invalid={!!ctaErrors.firstName}
                          aria-describedby={ctaErrors.firstName ? 'err-about-cta-fn' : undefined}
                          className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                          style={{ borderColor: ctaErrors.firstName ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
                          onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                          onBlur={e => { e.target.style.borderColor = ctaErrors.firstName ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {ctaErrors.firstName && (
                          <p id="err-about-cta-fn" className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                            {ctaErrors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="aboutCtaLastName"
                          className="block text-sm font-medium text-(--color-text-muted) mb-1.5"
                        >
                          Last Name
                        </label>
                        <input
                          id="aboutCtaLastName"
                          name="lastName"
                          type="text"
                          value={ctaForm.lastName}
                          onChange={handleCtaChange}
                          placeholder="Doe"
                          disabled={ctaSubmitting}
                          aria-invalid={!!ctaErrors.lastName}
                          aria-describedby={ctaErrors.lastName ? 'err-about-cta-ln' : undefined}
                          className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                          style={{ borderColor: ctaErrors.lastName ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
                          onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                          onBlur={e => { e.target.style.borderColor = ctaErrors.lastName ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {ctaErrors.lastName && (
                          <p id="err-about-cta-ln" className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                            {ctaErrors.lastName}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Email */}
                    <div className="about-cta-field-row">
                      <label
                        htmlFor="aboutCtaEmail"
                        className="block text-sm font-medium text-(--color-text-muted) mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="aboutCtaEmail"
                        name="email"
                        type="email"
                        value={ctaForm.email}
                        onChange={handleCtaChange}
                        placeholder="jane@company.com"
                        disabled={ctaSubmitting}
                        aria-invalid={!!ctaErrors.email}
                        aria-describedby={ctaErrors.email ? 'err-about-cta-email' : undefined}
                        className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                        style={{ borderColor: ctaErrors.email ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
                        onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                        onBlur={e => { e.target.style.borderColor = ctaErrors.email ? '#FF4444' : 'var(--color-border)' }}
                      />
                      {ctaErrors.email && (
                        <p id="err-about-cta-email" className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                          {ctaErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="about-cta-field-row">
                      <label
                        htmlFor="aboutCtaSubject"
                        className="block text-sm font-medium text-(--color-text-muted) mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="aboutCtaSubject"
                        name="subject"
                        type="text"
                        value={ctaForm.subject}
                        onChange={handleCtaChange}
                        placeholder="What do you need help with?"
                        disabled={ctaSubmitting}
                        aria-invalid={!!ctaErrors.subject}
                        aria-describedby={ctaErrors.subject ? 'err-about-cta-subject' : undefined}
                        className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                        style={{ borderColor: ctaErrors.subject ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
                        onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                        onBlur={e => { e.target.style.borderColor = ctaErrors.subject ? '#FF4444' : 'var(--color-border)' }}
                      />
                      {ctaErrors.subject && (
                        <p id="err-about-cta-subject" className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                          {ctaErrors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="about-cta-field-row">
                      <label
                        htmlFor="aboutCtaMessage"
                        className="block text-sm font-medium text-(--color-text-muted) mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="aboutCtaMessage"
                        name="message"
                        value={ctaForm.message}
                        onChange={handleCtaChange}
                        placeholder="Describe what isn't working…"
                        rows={5}
                        disabled={ctaSubmitting}
                        aria-invalid={!!ctaErrors.message}
                        aria-describedby={ctaErrors.message ? 'err-about-cta-message' : undefined}
                        className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) resize-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                        style={{ borderColor: ctaErrors.message ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
                        onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                        onBlur={e => { e.target.style.borderColor = ctaErrors.message ? '#FF4444' : 'var(--color-border)' }}
                      />
                      {ctaErrors.message && (
                        <p id="err-about-cta-message" className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                          {ctaErrors.message}
                        </p>
                      )}
                    </div>

                    {ctaSendError && (
                      <p
                        className="text-xs"
                        style={{
                          color: '#FF4444',
                          fontFamily: 'monospace',
                          opacity: ctaErrorVisible ? 1 : 0,
                          transition: `opacity ${T_FAST} ${CSS_EASE}`,
                        }}
                        role="alert"
                      >
                        Something went wrong. Email us at{' '}
                        <a href="mailto:contact@websitevikreta.com" style={{ textDecoration: 'underline' }}>
                          contact@websitevikreta.com
                        </a>
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      showArrow={!ctaSubmitting}
                      disabled={ctaSubmitting}
                      className="about-cta-field-row w-fit"
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
          </div>

        </div>
      </div>
    </section>
  )
}
