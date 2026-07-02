'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'

interface Opening {
  _id: string
  title: string
  slug: string
  type: string
  stipend: string
  positions: number
  description: string
  prerequisites: string[]
  skills: string[]
  metaTitle?: string
  metaDescription?: string
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
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', email: '', phone: '' })
        setResumeFile(null)
        setErrors({})
        setSubmitError('')
        setFileInputKey(k => k + 1)
      }, 4000)
    } catch {
      setSubmitError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 container">
        <h2 className="text-h3 font-bold tracking-tight text-[var(--color-text)] mb-10">{opening.title}</h2>
        <p className="text-body-lg text-[var(--color-text-muted)] mb-4" style={{ lineHeight: 1.7 }}>
          {opening.description}
        </p>
        <p className="text-sm font-medium text-[var(--color-text)]">
          Stipend: ₹{opening.stipend} / month
        </p>
        <p className="text-sm font-medium text-[var(--color-text-muted)] mt-2">
          {opening.positions} {opening.positions === 1 ? 'position' : 'positions'} available
        </p>
      </section>

      {/* ── Two-column: Details + Form ─────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Prerequisites + Skills */}
          <div className="flex flex-col gap-10">

            {/* Prerequisites */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-6">Prerequisites</h3>
              <ul className="flex flex-col gap-3">
                {opening.prerequisites.map(p => (
                  <li key={p} className="flex items-start gap-3 text-[var(--color-text-muted)]" style={{ lineHeight: 1.7 }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-6">Skills You Will Work With</h3>
              <div className="flex flex-wrap gap-2">
                {opening.skills.map(skill => (
                  <span key={skill} className="font-mono text-sm px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors duration-200 hover:bg-[var(--color-text)] hover:text-[var(--color-bg)] hover:border-[var(--color-text)] cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT — Application Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed bottom-6 right-6 z-50 bg-white border border-[var(--color-border)] shadow-lg px-5 py-4 flex items-center gap-3 rounded-sm"
              >
                <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-sm font-medium text-[var(--color-text)]">Application submitted successfully!</p>
              </motion.div>
            ) : null}

            <h2 className="text-h3 font-bold tracking-tight text-[var(--color-text)] mb-8">Apply now!</h2>

            <div className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2 tracking-[0.12em]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Jane Doe"
                  disabled={submitting}
                  className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                  style={{ borderColor: errors.name ? '#FF4444' : 'var(--color-border)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                  onBlur={e => { e.target.style.borderColor = errors.name ? '#FF4444' : 'var(--color-border)' }}
                />
                {errors.name && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2 tracking-[0.12em]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="jane@company.com"
                  disabled={submitting}
                  className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                  style={{ borderColor: errors.email ? '#FF4444' : 'var(--color-border)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? '#FF4444' : 'var(--color-border)' }}
                />
                {errors.email && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2 tracking-[0.12em]">
                  Phone <span className="normal-case text-[var(--color-text-faint)]">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+91 98765 43210"
                  disabled={submitting}
                  className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors placeholder:text-[var(--color-text-faint)]"
                  style={{ borderColor: 'var(--color-border)' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-border-strong)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-meta-label font-medium uppercase text-[var(--color-text-muted)] mb-2 tracking-[0.12em]">
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
                  className="w-full border bg-transparent px-4 py-3 text-base text-[var(--color-text)] outline-none transition-colors file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-medium file:bg-transparent file:text-[var(--color-text)] file:border file:border-black/35 cursor-pointer"
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
                showArrow
                disabled={submitting}
                onClick={handleSubmit}
                className="w-fit"
              >
                {submitting ? 'Submitting…' : 'Submit Application'}
              </Button>

              <p className="text-xs text-[var(--color-text-faint)]">
                We review every application and get back within 5–7 working days.
              </p>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}
