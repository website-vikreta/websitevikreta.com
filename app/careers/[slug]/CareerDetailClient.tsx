'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { PortableTextBlock } from '@portabletext/react'
import { Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import PortableTextContent from '@/components/ui/PortableTextContent'
import { SocialShare } from '@/components/ui/SocialShare'

const SUBHEAD = 'text-h4 font-bold tracking-tight text-(--color-text) mb-6'

interface Opening {
  _id: string
  title: string
  slug: string
  type: string
  stipend: string
  positions: number
  isActive: boolean
  shortDescription: string
  description?: PortableTextBlock[]
  prerequisites: string[]
  skills: string[]
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
}

interface FormState {
  name: string
  email: string
  phone: string
}

interface FormErrors {
  name?: string
  email?: string
  resume?: string
}

export default function CareerDetailClient({ opening }: { opening: Opening }) {
  const [submitted, setSubmitted]     = useState(false)
  const [formData, setFormData]       = useState<FormState>({ name: '', email: '', phone: '' })
  const [errors, setErrors]           = useState<FormErrors>({})
  const [resumeFile, setResumeFile]   = useState<File | null>(null)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting]   = useState(false)
  const [fileInputKey, setFileInputKey] = useState(0)

  async function handleSubmit() {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Required'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Valid email required'
    if (!resumeFile) newErrors.resume = 'Please upload your resume'
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) newErrors.resume = 'File too large. Maximum size is 5MB.'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    setSubmitError('')

    try {
      const fd = new FormData()
      fd.append('name', formData.name)
      fd.append('email', formData.email)
      fd.append('phone', formData.phone)
      fd.append('openingId', opening._id)
      fd.append('openingTitle', opening.title)
      fd.append('openingSlug', opening.slug)
      fd.append('resume', resumeFile!)

      const res = await fetch('/api/careers/apply', { method: 'POST', body: fd })
      const data = await res.json()

      if (!res.ok) {
        setSubmitError(data.error ?? 'Something went wrong.')
        return
      }

      setSubmitted(true)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function resetForm() {
    setSubmitted(false)
    setFormData({ name: '', email: '', phone: '' })
    setResumeFile(null)
    setErrors({})
    setSubmitError('')
    setFileInputKey(k => k + 1)
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="container pt-[150px] pb-16">
        <Link
          href="/careers"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-(--color-text-muted) transition-colors duration-300 hover:text-(--color-text)"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to careers
        </Link>
        <h1 className="text-h2 font-bold tracking-tight text-(--color-text) mb-6">
          {opening.title}
        </h1>
        <div>
          <p className="text-body-lg text-(--color-text-muted) leading-relaxed">
            {opening.shortDescription}
          </p>
          <p className="mt-4 text-sm text-(--color-text-muted)">
            ₹{opening.stipend} / month · {opening.positions} {opening.positions === 1 ? 'position' : 'positions'} available
          </p>
          <div className="mt-6">
            <SocialShare path={`/careers/${opening.slug}`} title={opening.title} campaign="careers" />
          </div>
        </div>
      </section>

      {/* ── Two-column: Details + Form ─────────────────────────────────────── */}
      <section className="pb-12 md:pb-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Prerequisites + Skills */}
          <div className="flex flex-col gap-10">

            {/* About the Internship */}
            {opening.description && opening.description.length > 0 && (
              <div>
                <h2 className={SUBHEAD}>About the Internship</h2>
                <PortableTextContent value={opening.description} />
              </div>
            )}

            {/* Prerequisites */}
            <div>
              <h2 className={SUBHEAD}>Prerequisites</h2>
              <ul className="flex flex-col gap-3">
                {opening.prerequisites.map(p => (
                  <li key={p} className="flex items-baseline gap-3 text-(--color-text-muted) leading-relaxed">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--color-accent) flex-shrink-0 translate-y-[-2px]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h2 className={SUBHEAD}>Skills You Will Work With</h2>
              <div className="flex flex-wrap gap-2">
                {opening.skills.map(skill => (
                  <span key={skill} className="rounded-full border border-(--color-border) px-3 py-1 text-sm text-(--color-text)">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — Application Form */}
          <div className="bg-(--color-surface) border border-(--color-border) p-5 sm:p-6 md:p-8">
            {!opening.isActive ? (
              <div>
                <h2 className={SUBHEAD}>Applications closed</h2>
                <p className="text-base text-(--color-text-muted) leading-relaxed">
                  We&apos;re not accepting applications for this role right now. Check back later or browse other open roles.
                </p>
                <Button href="/careers" variant="primary" size="md" showArrow className="mt-6 w-fit">
                  Browse open roles
                </Button>
              </div>
            ) : submitted ? (
              <div>
                <p
                  style={{
                    fontSize:      'clamp(1.5rem, 3.5vw, 2.25rem)',
                    lineHeight:    1.25,
                    letterSpacing: '-0.01em',
                    color:         '#16a34a',
                    maxWidth:      '28ch',
                    fontWeight:    400,
                  }}
                >
                  Thanks for applying, our team will review your application and get back within 5–7 working days.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    marginTop:      '1.25rem',
                    display:        'inline-flex',
                    alignItems:     'center',
                    gap:            '0.25rem',
                    fontSize:       '0.875rem',
                    fontWeight:     500,
                    color:          'var(--color-text)',
                    background:     'none',
                    border:         'none',
                    padding:        0,
                    cursor:         'pointer',
                    textDecoration: 'underline',
                    textUnderlineOffset: '3px',
                  }}
                >
                  Submit another application
                </button>
              </div>
            ) : (
            <>
            <h2 className={SUBHEAD}>Apply now!</h2>

            <div className="flex flex-col gap-3 sm:gap-3.5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Jane Doe"
                  disabled={submitting}
                  className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-faint)"
                  style={{ borderColor: errors.name ? '#FF4444' : 'var(--color-border)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                  onBlur={e => { e.target.style.borderColor = errors.name ? '#FF4444' : 'var(--color-border)' }}
                />
                {errors.name && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="jane@company.com"
                  disabled={submitting}
                  className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-faint)"
                  style={{ borderColor: errors.email ? '#FF4444' : 'var(--color-border)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? '#FF4444' : 'var(--color-border)' }}
                />
                {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                  Phone <span className="text-(--color-text-faint)">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  disabled={submitting}
                  className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none transition-colors placeholder:text-(--color-text-faint)"
                  style={{ borderColor: 'var(--color-border)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-(--color-text-muted) mb-1.5">
                  Resume (PDF, max 5MB)
                </label>
                <input
                  key={fileInputKey}
                  type="file"
                  accept=".pdf"
                  disabled={submitting}
                  onChange={e => {
                    const file = e.target.files?.[0] ?? null
                    setResumeFile(file)
                    if (file && file.size > 5 * 1024 * 1024) {
                      setErrors(prev => ({ ...prev, resume: 'File too large. Maximum size is 5MB.' }))
                    } else {
                      setErrors(prev => ({ ...prev, resume: undefined }))
                    }
                  }}
                  className="w-full border bg-transparent px-3.5 py-2 sm:py-2.5 text-sm sm:text-base text-(--color-text) outline-none transition-colors file:mr-3 sm:file:mr-4 file:py-1 file:px-2.5 sm:file:px-3 file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-transparent file:text-(--color-text) file:border file:border-black/35 cursor-pointer"
                  style={{ borderColor: errors.resume ? '#FF4444' : 'var(--color-border)' }}
                />
                {errors.resume && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.resume}</p>}
              </div>

              {submitError && (
                <p style={{ fontSize: '0.8125rem', color: '#FF4444', fontFamily: 'monospace' }} role="alert">
                  {submitError}
                </p>
              )}

              <Button
                variant="primary"
                size="md"
                showArrow={!submitting}
                disabled={submitting}
                onClick={handleSubmit}
                className="w-fit"
              >
                {submitting
                  ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Loader2 size={13} strokeWidth={2} className="animate-spin" aria-hidden="true" />Submitting…</span>
                  : 'Submit Application'
                }
              </Button>

              <p className="text-xs text-(--color-text-faint)">
                We review every application and get back within 5–7 working days.
              </p>

            </div>
            </>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
