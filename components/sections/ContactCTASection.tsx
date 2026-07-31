'use client'

import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import emailjs from '@emailjs/browser'
import { Loader2 } from 'lucide-react'
import { RevealText, RevealFade } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
}

const INITIAL: FormData = { firstName: '', lastName: '', email: '', subject: '', message: '' }

function validate(data: FormData): FormErrors {
  const errs: FormErrors = {}
  if (!data.firstName.trim()) errs.firstName = 'Required'
  if (!data.lastName.trim()) errs.lastName = 'Required'
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = 'Valid email required'
  if (!data.subject.trim()) errs.subject = 'Required'
  if (!data.message.trim()) errs.message = 'Required'
  return errs
}

interface ContactCTASectionProps {
  /** Anchor id for the section (e.g. for #book-a-call links). */
  id: string
  heading: string
  subheading: ReactNode
  formHeading: string
  subjectLabel?: string
  subjectPlaceholder?: string
  messagePlaceholder?: string
  submitLabel?: string
  buttonVariant?: 'primary' | 'accent'
  buttonSize?: 'md' | 'lg'
  /** Override the section's padding/background. Default matches the sitewide `py-16 md:py-20` standard. */
  className?: string
}

export function ContactCTASection({
  id,
  heading,
  subheading,
  formHeading,
  subjectLabel = 'Subject',
  subjectPlaceholder = 'What do you need help with?',
  messagePlaceholder = "Describe what isn't working…",
  submitLabel = 'Send message',
  buttonVariant = 'primary',
  buttonSize = 'md',
  className = 'py-16 md:py-20',
}: ContactCTASectionProps) {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }))
    if (sendError) setSendError(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    setSendError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: `${form.firstName} ${form.lastName}`,
          reply_to: form.email,
          email: form.email,
          service_type: form.subject,
          budget: 'Not specified',
          message: form.message,
          to_name: 'Website Vikreta',
        },
        EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
    } catch (err) {
      const e = err as { status?: number; text?: string }
      console.error('[EmailJS] send failed:', e?.status, e?.text, err)
      setSendError(true)
    } finally {
      setSubmitting(false)
    }
  }

  const formHeadingId = `${id}-form-heading`

  return (
    <section id={id} className={className} aria-labelledby={formHeadingId}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:items-start">

          <div>
            <RevealText as="h2" className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) mb-6">
              {heading}
            </RevealText>
            <RevealFade delay={0.1}>
              <p className="text-body-lg leading-relaxed text-(--color-text-muted)">{subheading}</p>
            </RevealFade>
          </div>

          <RevealFade delay={0.2}>
            <div className="bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
              {submitted ? (
                <div>
                  <p className="text-h3 font-normal max-w-[28ch]" style={{ color: '#16a34a' }}>
                    Thanks, we&rsquo;ll get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false)
                      setForm(INITIAL)
                      setErrors({})
                      setSendError(false)
                    }}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-(--color-text) underline underline-offset-[3px] bg-transparent border-none p-0 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2 id={formHeadingId} className="font-sans font-bold text-2xl sm:text-3xl leading-[1.1] text-(--color-text) mb-6">
                    {formHeading}
                  </h2>

                  <div className="flex flex-col gap-3 sm:gap-3.5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`${id}-firstName`} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                          First Name
                        </label>
                        <input
                          id={`${id}-firstName`}
                          name="firstName"
                          type="text"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Jane"
                          disabled={isSubmitting}
                          aria-invalid={!!errors.firstName}
                          aria-describedby={errors.firstName ? `err-${id}-firstName` : undefined}
                          className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                          style={{ borderColor: errors.firstName ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {errors.firstName && (
                          <p id={`err-${id}-firstName`} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor={`${id}-lastName`} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                          Last Name
                        </label>
                        <input
                          id={`${id}-lastName`}
                          name="lastName"
                          type="text"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                          disabled={isSubmitting}
                          aria-invalid={!!errors.lastName}
                          aria-describedby={errors.lastName ? `err-${id}-lastName` : undefined}
                          className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                          style={{ borderColor: errors.lastName ? '#FF4444' : 'var(--color-border)' }}
                        />
                        {errors.lastName && (
                          <p id={`err-${id}-lastName`} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor={`${id}-email`} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                        Email
                      </label>
                      <input
                        id={`${id}-email`}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        disabled={isSubmitting}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `err-${id}-email` : undefined}
                        className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                        style={{ borderColor: errors.email ? '#FF4444' : 'var(--color-border)' }}
                      />
                      {errors.email && (
                        <p id={`err-${id}-email`} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`${id}-subject`} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                        {subjectLabel}
                      </label>
                      <input
                        id={`${id}-subject`}
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder={subjectPlaceholder}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? `err-${id}-subject` : undefined}
                        className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                        style={{ borderColor: errors.subject ? '#FF4444' : 'var(--color-border)' }}
                      />
                      {errors.subject && (
                        <p id={`err-${id}-subject`} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor={`${id}-message`} className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                        Message
                      </label>
                      <textarea
                        id={`${id}-message`}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder={messagePlaceholder}
                        rows={5}
                        disabled={isSubmitting}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? `err-${id}-message` : undefined}
                        className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none placeholder:text-(--color-text-faint) resize-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-text)"
                        style={{ borderColor: errors.message ? '#FF4444' : 'var(--color-border)' }}
                      />
                      {errors.message && (
                        <p id={`err-${id}-message`} className="mt-1 text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }}>
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {sendError && (
                      <p className="text-xs" style={{ color: '#FF4444', fontFamily: 'monospace' }} role="alert">
                        Something went wrong. Email us at{' '}
                        <a href="mailto:contact@websitevikreta.com" style={{ textDecoration: 'underline' }}>
                          contact@websitevikreta.com
                        </a>
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant={buttonVariant}
                      size={buttonSize}
                      showArrow={!isSubmitting}
                      disabled={isSubmitting}
                      className="w-fit"
                    >
                      {isSubmitting
                        ? (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Loader2 size={13} strokeWidth={2} className="animate-spin" aria-hidden="true" />
                            Sending…
                          </span>
                        )
                        : submitLabel
                      }
                    </Button>

                  </div>
                </form>
              )}
            </div>
          </RevealFade>

        </div>
      </div>
    </section>
  )
}
