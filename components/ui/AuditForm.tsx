'use client'

import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { revealFadeUp } from '@/lib/gsap/reveals'
import { trackFormSubmit, trackLinkClick } from '@/lib/analytics'

// ─── CSS-transition tokens (micro-interactions; per motion-spec §6) ───────────
const CSS_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const T_MICRO = '0.2s'

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

interface AuditFormData {
  firstName: string
  lastName:  string
  email:     string
  subject:   string
  message:   string
}

interface AuditFormErrors {
  firstName?: string
  lastName?:  string
  email?:     string
  subject?:   string
  message?:   string
}

const FORM_INITIAL: AuditFormData = {
  firstName: '', lastName: '', email: '', subject: '', message: '',
}

function validateForm(data: AuditFormData): AuditFormErrors {
  const errs: AuditFormErrors = {}
  if (!data.firstName.trim()) errs.firstName = 'Required'
  if (!data.lastName.trim())  errs.lastName  = 'Required'
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = 'Valid email required'
  if (!data.subject.trim()) errs.subject = 'Required'
  if (!data.message.trim()) errs.message = 'Required'
  return errs
}

interface AuditFormProps {
  /** GA4 form_name + button_location label, e.g. 'book_audit_modal' vs 'book_audit_inline'. */
  formName?: string
  heading?:  string
  subjectPlaceholder?: string
  messagePlaceholder?: string
  /** Fires after a confirmed successful send (e.g. so a modal can auto-close). */
  onSuccess?: () => void
}

/**
 * Shared "book a free audit" form — fields, validation, EmailJS submit,
 * loading/success/error states. Self-contained (no outer section/card
 * chrome) so it can be dropped into a page section or a modal dialog.
 * `useId()` keeps field ids unique whenever more than one instance is
 * mounted at once (e.g. the inline section + the popup on the same page).
 */
export function AuditForm({
  formName = 'book_audit',
  heading = 'Book a Free Process Audit',
  subjectPlaceholder = 'What do you need automated?',
  messagePlaceholder = 'Describe the repetitive work you want to automate…',
  onSuccess,
}: AuditFormProps) {
  const [form,       setForm]       = useState<AuditFormData>(FORM_INITIAL)
  const [errors,     setErrors]     = useState<AuditFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)
  const [sendError,  setSendError]  = useState(false)

  const uid = useId()
  const fieldId = (name: string) => `${uid}-${name}`

  const successRef = useRef<HTMLDivElement>(null)

  // Success message: fades/rises in on submit (feedback, not a scroll reveal — load-triggered).
  useEffect(() => {
    if (!submitted || !successRef.current) return
    const tween = revealFadeUp(successRef.current, { y: 16, trigger: null })
    return () => { tween.kill() }
  }, [submitted])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    const nextForm = { ...form, [name]: value }
    setForm(nextForm)
    if (errors[name as keyof AuditFormErrors]) {
      const fieldErrors = validateForm(nextForm)
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name as keyof AuditFormErrors] }))
    }
    if (sendError) setSendError(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validateForm(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    setSendError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:         `${form.firstName} ${form.lastName}`,
          reply_to:     form.email,
          email:        form.email,
          service_type: form.subject,
          budget:       'Not specified',
          message:      form.message,
          to_name:      'Website Vikreta',
        },
        EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
      trackFormSubmit(formName)
      onSuccess?.()
    } catch (err) {
      const e = err as { status?: number; text?: string }
      console.error('[EmailJS] send failed:', e?.status, e?.text, err)
      setSendError(true)
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setSubmitted(false)
    setForm(FORM_INITIAL)
    setErrors({})
    setSendError(false)
  }

  if (submitted) {
    return (
      <div ref={successRef}>
        <p className="text-h3 font-normal max-w-[28ch]" style={{ color: '#16a34a' }}>
          Thanks, we&apos;ll get back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-(--color-text) underline underline-offset-[3px] bg-transparent border-none p-0 cursor-pointer"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>

      {heading && (
        <h2 className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text) mb-6">
          {heading}
        </h2>
      )}

      <div className="flex flex-col gap-3 sm:gap-3.5">

        {/* First + Last Name */}
        <div className="cta-field-row grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label htmlFor={fieldId('firstName')} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
              First Name
            </label>
            <input
              id={fieldId('firstName')}
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Jane"
              disabled={submitting}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? fieldId('err-firstName') : undefined}
              className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
              style={{ borderColor: errors.firstName ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
              onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
              onBlur={e => { e.target.style.borderColor = errors.firstName ? '#FF4444' : 'var(--color-border)' }}
            />
            {errors.firstName && (
              <p id={fieldId('err-firstName')} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId('lastName')} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
              Last Name
            </label>
            <input
              id={fieldId('lastName')}
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              disabled={submitting}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? fieldId('err-lastName') : undefined}
              className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
              style={{ borderColor: errors.lastName ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
              onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
              onBlur={e => { e.target.style.borderColor = errors.lastName ? '#FF4444' : 'var(--color-border)' }}
            />
            {errors.lastName && (
              <p id={fieldId('err-lastName')} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                {errors.lastName}
              </p>
            )}
          </div>

        </div>

        {/* Email */}
        <div className="cta-field-row">
          <label htmlFor={fieldId('email')} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
            Email
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            disabled={submitting}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? fieldId('err-email') : undefined}
            className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
            style={{ borderColor: errors.email ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
            onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
            onBlur={e => { e.target.style.borderColor = errors.email ? '#FF4444' : 'var(--color-border)' }}
          />
          {errors.email && (
            <p id={fieldId('err-email')} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject */}
        <div className="cta-field-row">
          <label htmlFor={fieldId('subject')} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
            Subject
          </label>
          <input
            id={fieldId('subject')}
            name="subject"
            type="text"
            value={form.subject}
            onChange={handleChange}
            placeholder={subjectPlaceholder}
            disabled={submitting}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? fieldId('err-subject') : undefined}
            className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
            style={{ borderColor: errors.subject ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
            onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
            onBlur={e => { e.target.style.borderColor = errors.subject ? '#FF4444' : 'var(--color-border)' }}
          />
          {errors.subject && (
            <p id={fieldId('err-subject')} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="cta-field-row">
          <label htmlFor={fieldId('message')} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
            Message
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={messagePlaceholder}
            rows={5}
            disabled={submitting}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? fieldId('err-message') : undefined}
            className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) resize-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
            style={{ borderColor: errors.message ? '#FF4444' : 'var(--color-border)', transition: `border-color ${T_MICRO} ${CSS_EASE}` }}
            onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
            onBlur={e => { e.target.style.borderColor = errors.message ? '#FF4444' : 'var(--color-border)' }}
          />
          {errors.message && (
            <p id={fieldId('err-message')} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
              {errors.message}
            </p>
          )}
        </div>

        {sendError && (
          <p className="fade-in-on-mount text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }} role="alert">
            Something went wrong. Email us at{' '}
            <a
              href="mailto:contact@websitevikreta.com"
              style={{ textDecoration: 'underline' }}
              onClick={() => trackLinkClick('mailto:contact@websitevikreta.com', formName)}
            >
              contact@websitevikreta.com
            </a>
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="md"
          showArrow={!submitting}
          disabled={submitting}
          className="cta-field-row w-fit"
        >
          {submitting
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
  )
}
