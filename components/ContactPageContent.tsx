'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Loader2, ArrowUpRight } from 'lucide-react'
import { Linkedin, Whatsapp, Instagram, Envelope, Telephone } from 'react-bootstrap-icons'
import emailjs from '@emailjs/browser'

function SlotText({ children }: { children: string }) {
  return (
    <span aria-label={children}>
      {children.split('').map((char, i) => (
        <span
          key={i}
          className="slot-char-wrap"
          style={{ '--char-i': i } as React.CSSProperties}
          aria-hidden="true"
        >
          <span className="slot-char">{char === ' ' ? ' ' : char}</span>
        </span>
      ))}
    </span>
  )
}

type IconComponent = React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' }>

function SocialLink({ href, label, icon: Icon, ariaLabel }: {
  href: string
  label: string
  icon: IconComponent
  ariaLabel: string
}) {
  const isExternal = !href.startsWith('mailto:')
  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="footer-anim group inline-flex items-center gap-2 w-fit"
      style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}
      aria-label={ariaLabel}
    >
      <Icon size={14} aria-hidden="true" />
      <span className="relative btn-label">
        <SlotText>{label}</SlotText>
        <span
          className="absolute -bottom-px left-0 w-full h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
          style={{ background: 'var(--color-text)' }}
        />
      </span>
      <ArrowUpRight
        size={14}
        strokeWidth={1.75}
        className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  )
}

const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/company/websitevikreta/', label: 'Connect with us', icon: Linkedin,  ariaLabel: 'Connect with Website Vikreta on LinkedIn' },
  { href: 'https://wa.me/919970445198',                       label: 'Chat with us',    icon: Whatsapp,  ariaLabel: 'Chat with Website Vikreta on WhatsApp'   },
  { href: 'https://instagram.com/websitevikreta',             label: 'Follow us',       icon: Instagram, ariaLabel: 'Follow Website Vikreta on Instagram'     },
  { href: 'mailto:contact@websitevikreta.com',                label: 'Email us',        icon: Envelope,   ariaLabel: 'Email Website Vikreta'                   },
  { href: 'tel:919970445198',                                 label: 'Call us',         icon: Telephone,  ariaLabel: 'Call Website Vikreta'                     },
] as const

const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? ''

const EASE = [0.22, 1, 0.36, 1] as const

const containerV = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, ease: EASE } },
}

const itemV = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
}

interface FormData {
  name: string
  jobOrWebsite: string
  email: string
}

interface FormErrors {
  name?: string
  jobOrWebsite?: string
  email?: string
}

const INITIAL: FormData = { name: '', jobOrWebsite: '', email: '' }

function validate(form: FormData): FormErrors {
  const e: FormErrors = {}
  if (!form.name.trim() || form.name.trim().length < 2)
    e.name = 'Enter your name'
  if (!form.jobOrWebsite.trim())
    e.jobOrWebsite = 'Enter your job or website'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Enter a valid email'
  return e
}

export function ContactPageContent() {
  const prefersReduced = useReducedMotion()
  const animate = !prefersReduced

  const [form, setForm]           = useState<FormData>(INITIAL)
  const [errors, setErrors]       = useState<FormErrors>({})
  const [isSubmitting, setSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
    if (sendError) setSendError(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmit(true)
    setSendError(false)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          reply_to:     form.email,
          from_email:   form.email,
          service_type: form.jobOrWebsite,
          budget:       'Not specified',
          message:      `${form.name} has a ${form.jobOrWebsite} that needs help.`,
          to_name:      'Website Vikreta',
        },
        EMAILJS_PUBLIC_KEY,
      )
      setSubmitted(true)
    } catch {
      setSendError(true)
    } finally {
      setSubmit(false)
    }
  }

  return (
    <>
      <style>{`
        .inline-field {
          display: inline-block;
          background: transparent;
          border: none;
          border-bottom: 2px solid var(--color-text);
          outline: none;
          font-family: inherit;
          font-size: inherit;
          font-weight: inherit;
          line-height: inherit;
          color: var(--color-text);
          padding: 0 4px 2px;
          transition: border-color 0.2s;
          min-width: 160px;
          vertical-align: baseline;
        }
        .inline-field::placeholder {
          color: var(--color-text-faint);
          font-weight: 400;
        }
        .inline-field:focus {
          border-bottom-color: #FFD600;
        }
        .inline-field.error {
          border-bottom-color: #FF4444;
        }
        .inline-field.field-email {
          min-width: 220px;
        }

        @media (max-width: 640px) {
          .inline-field {
            display: block;
            width: 100%;
            margin: 0.5rem 0;
            min-width: 0;
            border-bottom-width: 1px;
            padding: 4px 0;
          }
          .prose-form {
            display: block !important;
          }
        }
      `}</style>

      <section className="relative min-h-screen overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24 items-start">

            {/* ── Left ── */}
            <motion.div
              variants={animate ? containerV : undefined}
              initial={animate ? 'hidden' : false}
              animate={animate ? 'visible' : undefined}
              className="lg:sticky lg:top-40"
            >
              <motion.h1
                variants={animate ? itemV : undefined}
                className="font-bold"
                style={{
                  fontSize:      'clamp(3rem, 6vw, 5rem)',
                  lineHeight:    1.0,
                  letterSpacing: '-0.02em',
                  color:         'var(--color-text)',
                  marginBottom:  '3rem',
                }}
              >
                Let&apos;s get<br />started.
              </motion.h1>

              {/* Social CTAs */}
              <motion.div
                variants={animate ? itemV : undefined}
                className="flex flex-col gap-4"
              >
                {SOCIAL_LINKS.map(({ href, label, icon, ariaLabel }) => (
                  <SocialLink key={href} href={href} label={label} icon={icon} ariaLabel={ariaLabel} />
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right — conversational form ── */}
            <motion.div
              initial={animate ? { opacity: 0, y: 24 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p
                    className="font-bold"
                    style={{
                      fontSize:      'clamp(1.5rem, 3.5vw, 2.25rem)',
                      lineHeight:    1.25,
                      letterSpacing: '-0.01em',
                      color:         'var(--color-text)',
                      maxWidth:      '28ch',
                    }}
                  >
                    Thanks for reaching out, our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Prose sentence form */}
                  <p
                    className="prose-form font-bold"
                    style={{
                      fontSize:      'clamp(1.375rem, 3vw, 2rem)',
                      lineHeight:    1.55,
                      letterSpacing: '-0.01em',
                      color:         'var(--color-text)',
                    }}
                  >
                    My name is{' '}
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="YOUR FULL NAME"
                      className={`inline-field${errors.name ? ' error' : ''}`}
                      aria-label="Your full name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                      disabled={isSubmitting}
                    />{' '}
                    and I have a{' '}
                    <input
                      name="jobOrWebsite"
                      type="text"
                      value={form.jobOrWebsite}
                      onChange={handleChange}
                      placeholder="WEBSITE, FULL-TIME JOB, ETC."
                      className={`inline-field${errors.jobOrWebsite ? ' error' : ''}`}
                      style={{ minWidth: '240px' }}
                      aria-label="Your job or website"
                      aria-invalid={!!errors.jobOrWebsite}
                      aria-describedby={errors.jobOrWebsite ? 'err-job' : undefined}
                      disabled={isSubmitting}
                    />{' '}
                    that needs help. You can reach me at{' '}
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="YOUR EMAIL ADDRESS"
                      className={`inline-field field-email${errors.email ? ' error' : ''}`}
                      aria-label="Your email address"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'err-email' : undefined}
                      disabled={isSubmitting}
                    />{' '}
                    to get things started.
                  </p>

                  {/* Inline error hints */}
                  {(errors.name || errors.jobOrWebsite || errors.email) && (
                    <div
                      style={{
                        marginTop:     '1.25rem',
                        display:       'flex',
                        flexDirection: 'column',
                        gap:           '0.25rem',
                      }}
                      role="alert"
                    >
                      {errors.name        && <p id="err-name"  style={{ fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.name}</p>}
                      {errors.jobOrWebsite && <p id="err-job"   style={{ fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.jobOrWebsite}</p>}
                      {errors.email       && <p id="err-email" style={{ fontSize: '0.75rem', color: '#FF4444', fontFamily: 'monospace' }}>{errors.email}</p>}
                    </div>
                  )}

                  {sendError && (
                    <p
                      style={{ marginTop: '1rem', fontSize: '0.8125rem', color: '#FF4444', fontFamily: 'monospace' }}
                      role="alert"
                    >
                      Something went wrong. Email us at{' '}
                      <a href="mailto:contact@websitevikreta.com" style={{ textDecoration: 'underline' }}>
                        contact@websitevikreta.com
                      </a>
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      marginTop:       '2.5rem',
                      display:         'inline-flex',
                      alignItems:      'center',
                      gap:             '0.5rem',
                      background:      'none',
                      border:          'none',
                      cursor:          isSubmitting ? 'not-allowed' : 'pointer',
                      padding:         '0',
                      fontFamily:      'monospace',
                      fontSize:        '0.8125rem',
                      textTransform:   'uppercase',
                      letterSpacing:   '0.14em',
                      color:           isSubmitting ? 'var(--color-text-faint)' : 'var(--color-text)',
                      transition:      'opacity 0.2s',
                      opacity:         isSubmitting ? 0.5 : 1,
                    }}
                    onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.color = '#FFD600' }}
                    onMouseLeave={e => { e.currentTarget.style.color = isSubmitting ? 'var(--color-text-faint)' : 'var(--color-text)' }}
                  >
                    {isSubmitting
                      ? <><Loader2 size={13} strokeWidth={2} className="animate-spin" aria-hidden="true" /> Sending…</>
                      : <>— Send Info</>
                    }
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
