'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  message: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name: keyof FormData, value: string): string | undefined {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required'
      if (value.trim().length < 2) return 'Name must be at least 2 characters'
      return undefined
    case 'email':
      if (!value.trim()) return 'Email is required'
      if (!emailRegex.test(value)) return 'Enter a valid email address'
      return undefined
    case 'message':
      if (!value.trim()) return 'Message is required'
      if (value.trim().length < 10) return 'Message must be at least 10 characters'
      return undefined
  }
}

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set())

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormData
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    if (touched.has(fieldName)) {
      setErrors(prev => ({ ...prev, [fieldName]: validateField(fieldName, value) }))
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormData
    setTouched(prev => new Set(prev).add(fieldName))
    setErrors(prev => ({ ...prev, [fieldName]: validateField(fieldName, value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Partial<FormData> = {}
    ;(Object.keys(formData) as (keyof FormData)[]).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(new Set(['name', 'email', 'message']))
      return
    }

    setFormState('submitting')

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          reply_to: formData.email,
          name: formData.name,
          mobile: "<blank>",
          email: formData.email,
          service: "<blank>",
          budget: "<blank>",
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
      setTouched(new Set())
      setTimeout(() => setFormState('idle'), 3000)
    } catch (err: unknown) {
      const e = err as { status?: number; text?: string }
      console.error('EmailJS error:', e?.status, e?.text, err)
      setFormState('error')
      setTimeout(() => setFormState('idle'), 3000)
    }
  }

  if (formState === 'success') {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-neutral-600">
          Thanks! We&apos;ll be in touch soon.
        </p>
      </div>
    )
  }

  if (formState === 'error') {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-red-500 mb-4">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:contact@websitevikreta.com" className="underline">
            contact@websitevikreta.com
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-neutral-600 mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Your name"
          className={`w-full px-4 py-3 border rounded-sm bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition ${
            errors.name ? 'border-red-400' : 'border-neutral-300'
          }`}
          disabled={formState === 'submitting'}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-neutral-600 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          className={`w-full px-4 py-3 border rounded-sm bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition ${
            errors.email ? 'border-red-400' : 'border-neutral-300'
          }`}
          disabled={formState === 'submitting'}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-neutral-600 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Tell us about your project..."
          rows={4}
          className={`w-full px-4 py-3 border rounded-sm bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none ${
            errors.message ? 'border-red-400' : 'border-neutral-300'
          }`}
          disabled={formState === 'submitting'}
        />
        {errors.message && (
          <p className="text-xs text-red-500 mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={formState === 'submitting'}
        className="w-full"
      >
        {formState === 'submitting' ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
