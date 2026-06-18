'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { gsap } from '@/lib/gsap'
import { Loader2, ArrowUpRight } from 'lucide-react'
import { Linkedin, Whatsapp, Instagram, Envelope, Telephone } from 'react-bootstrap-icons'
import emailjs from '@emailjs/browser'
import { Button } from '@/components/ui/Button'

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
          <span className="slot-char">{char === ' ' ? ' ' : char}</span>
        </span>
      ))}
    </span>
  )
}

type IconComponent = React.ComponentType<{ size?: number; 'aria-hidden'?: boolean | 'true' }>

function SocialLink({
  href,
  label,
  icon: Icon,
  ariaLabel,
}: {
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
  {
    href: 'https://www.linkedin.com/company/websitevikreta/',
    label: 'Connect with us',
    icon: Linkedin,
    ariaLabel: 'Connect with Website Vikreta on LinkedIn',
  },
  {
    href: 'https://wa.me/919970445198',
    label: 'Chat with us',
    icon: Whatsapp,
    ariaLabel: 'Chat with Website Vikreta on WhatsApp',
  },
  {
    href: 'https://instagram.com/websitevikreta',
    label: 'Follow us',
    icon: Instagram,
    ariaLabel: 'Follow Website Vikreta on Instagram',
  },
  {
    href: 'mailto:contact@websitevikreta.com',
    label: 'Email us',
    icon: Envelope,
    ariaLabel: 'Email Website Vikreta',
  },
  {
    href: 'tel:919970445198',
    label: 'Call us',
    icon: Telephone,
    ariaLabel: 'Call Website Vikreta',
  },
] as const

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''

const EASE = [0.22, 1, 0.36, 1] as const

// H1 words for masked reveal — same pattern as HeroSection
const H1_WORDS = ["Let's", 'get', 'started.']
const H1_BREAK_BEFORE = new Set([2]) // <br> before "started." on desktop

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
  if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Enter your name'
  if (!form.jobOrWebsite.trim()) e.jobOrWebsite = 'Enter your job or website'
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    e.email = 'Enter a valid email'
  return e
}

export function ContactPageContent() {
  const sectionRef     = useRef<HTMLElement>(null)
  const wordInnerRefs  = useRef<(HTMLSpanElement | null)[]>([])
  const formWordRefs   = useRef<(HTMLElement | null)[]>([])
  const btnRef         = useRef<HTMLDivElement>(null)
  const socialsRef     = useRef<HTMLDivElement>(null)
  const mobileSocRef   = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setSubmit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [sendError, setSendError] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const h1Els   = wordInnerRefs.current.filter((el): el is HTMLSpanElement => el !== null)
    const formEls = formWordRefs.current.filter((el): el is HTMLElement => el !== null)

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([...h1Els, ...formEls], { y: '0%' })
        gsap.set([btnRef.current, socialsRef.current, mobileSocRef.current], { opacity: 1, y: 0 })
        return
      }

      // h1 words start hidden via .word-inner CSS; form elements start hidden via inline style
      gsap.set(h1Els, { y: '110%' })
      gsap.set([btnRef.current, socialsRef.current, mobileSocRef.current], { opacity: 0, y: 18 })

      const tl = gsap.timeline({ delay: 0.1 })

      tl.to(h1Els, { y: '0%', duration: 1.05, ease: 'expo.out', stagger: 0.065 })
        .to(formEls, { y: '0%', duration: 0.85, ease: 'expo.out', stagger: 0.04 }, '-=0.45')
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .to(socialsRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '<-=0.2')
        .to(mobileSocRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // After reset (submitted → false), form remounts with words at translateY(110%).
  // GSAP mount animation already ran once — just snap everything visible.
  const wasSubmitted = useRef(false)
  useEffect(() => {
    if (submitted) {
      wasSubmitted.current = true
      return
    }
    if (!wasSubmitted.current) return
    // reset path: wait one frame for React to commit new form DOM, then reveal
    requestAnimationFrame(() => {
      const formEls = formWordRefs.current.filter((el): el is HTMLElement => el !== null)
      gsap.set(formEls, { y: '0%' })
      gsap.set(btnRef.current, { opacity: 1, y: 0 })
    })
  }, [submitted])

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
          name: form.name,
          reply_to: form.email,
          email: form.email,
          service_type: form.jobOrWebsite,
          budget: 'Not specified',
          message: `${form.name} has a ${form.jobOrWebsite} that needs help.`,
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
      setSubmit(false)
    }
  }

  return (
    <>
      <style>{`
        .inline-field {
          display: inline-block;
          background-color: transparent;
          background-image: linear-gradient(var(--color-accent), var(--color-accent));
          background-repeat: no-repeat;
          background-position: left 100%;
          background-size: 0% 1px;
          border: none;
          border-bottom: 1px solid var(--color-border-strong);
          outline: none;
          caret-color: var(--color-accent);
          font-family: inherit;
          font-size: inherit;
          font-weight: 800;
          line-height: inherit;
          color: var(--color-text);
          padding: 0 4px 2px;
          transition: background-size 0.32s cubic-bezier(0.22,1,0.36,1), border-color 0.2s;
          min-width: 160px;
          vertical-align: baseline;
          height: 2em;
          box-sizing: border-box;
        }
        .inline-field::placeholder {
          color: var(--color-text-faint);
          font-weight: 400;
        }
        .inline-field:focus,
        .inline-field.filled {
          background-size: 100% 2px;
          border-bottom-color: transparent;
        }
        .inline-field.error {
          border-bottom-color: transparent;
          background-image: linear-gradient(#FF4444, #FF4444);
          background-size: 100% 1px;
        }
        .email-row {
          display: flex;
          align-items: baseline;
          gap: 0.5ch;
          width: 100%;
          flex-wrap: wrap;
          margin-top: 0;
        }
        .inline-field.field-email {
          flex: 1 1 220px;
          min-width: 220px;
        }
        /* form-specific word reveal — clip-path instead of overflow:hidden
           so baseline stays natural (overflow:hidden on inline-block shifts
           baseline to bottom edge, breaking text/input alignment) */
        .form-word-wrapper {
          display: inline-block;
          clip-path: inset(-4px 0 0 0);
          vertical-align: baseline;
        }
        .form-word-inner {
          display: inline-block;
          transform: translateY(110%);
        }
        .input-word-wrapper {
          display: inline-block;
          clip-path: inset(-4px 0 0 0);
          vertical-align: baseline;
        }
        .email-row-mask {
          display: block;
          clip-path: inset(0 0 0 0);
        }
        .social-divider {
          display: none;
        }

        @media (max-width: 1024px) {
          .contact-left  { order: 1; }
          .contact-right { order: 2; }
          .contact-socials-mobile { order: 3; display: flex !important; }
          .contact-socials-desktop { display: none !important; }
          .social-divider {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            font-family: monospace;
            font-size: 0.75rem;
            letter-spacing: 0.14em;
            color: var(--color-text-faint);
          }
          .social-divider::before,
          .social-divider::after {
            content: '';
            flex: 1;
            height: 1px;
            background: var(--color-border);
          }
        }

        @media (max-width: 640px) {
          .inline-field {
            display: block;
            width: 100% !important;
            margin: 0.5rem 0;
            min-width: 0;
            padding: 4px 0;
          }
          .prose-form {
            display: block !important;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-x-clip pt-32 pb-24 md:pt-40 md:pb-32"
      >
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 lg:gap-24 items-start">

            {/* ── Left ── */}
            <div className="contact-left lg:sticky lg:top-40">
              {/* H1 — word-by-word masked reveal, same as HeroSection */}
              <h1
                className="font-bold"
                style={{
                  fontSize: 'clamp(3rem, 6vw, 5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text)',
                  marginBottom: 'clamp(1rem, 4vw, 3rem)',
                }}
                aria-label="Let's get started."
              >
                {H1_WORDS.map((word, i) => (
                  <span key={i} aria-hidden="true">
                    {H1_BREAK_BEFORE.has(i) && <br className="hidden lg:block" />}
                    <span className="word-wrapper">
                      <span
                        className="word-inner"
                        ref={(el) => { wordInnerRefs.current[i] = el }}
                      >
                        {word}
                      </span>
                    </span>
                    {i < H1_WORDS.length - 1 ? ' ' : null}
                  </span>
                ))}
              </h1>

              {/* Social CTAs — desktop only */}
              <div ref={socialsRef} className="contact-socials-desktop flex flex-col gap-4">
                {SOCIAL_LINKS.map(({ href, label, icon, ariaLabel }) => (
                  <SocialLink key={href} href={href} label={label} icon={icon} ariaLabel={ariaLabel} />
                ))}
              </div>
            </div>

            {/* ── Right — conversational form ── */}
            <div className="contact-right py-4">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
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
                    Thanks for reaching out, our team will get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setForm(INITIAL); setErrors({}); setSendError(false) }}
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
                    Submit another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Prose — word-by-word masked reveal, same technique as H1 */}
                  <p
                    className="prose-form font-semibold"
                    style={{
                      fontSize:      'clamp(1.375rem, 3vw, 2rem)',
                      lineHeight:    2,
                      letterSpacing: '-0.01em',
                      color:         'var(--color-text)',
                    }}
                  >
                    {/* "My name is" [0–2] */}
                    {(['My', 'name', 'is'] as const).map((w, i) => (
                      <span key={`w${i}`}>
                        <span className="form-word-wrapper">
                          <span className="form-word-inner" ref={(el) => { formWordRefs.current[i] = el }}>{w}</span>
                        </span>
                        {' '}
                      </span>
                    ))}
                    {/* name input [3] */}
                    <span className="input-word-wrapper">
                      <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="your name"
                        className={`inline-field${form.name.trim() ? ' filled' : ''}${errors.name ? ' error' : ''}`}
                        style={{ transform: 'translateY(110%)' }}
                        ref={(el) => { formWordRefs.current[3] = el }}
                        aria-label="Your name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'err-name' : undefined}
                        disabled={isSubmitting}
                      />
                    </span>
                    {' '}
                    {/* "and I have a" [4–7] */}
                    {(['and', 'I', 'have', 'a'] as const).map((w, i) => (
                      <span key={`w${4 + i}`}>
                        <span className="form-word-wrapper">
                          <span className="form-word-inner" ref={(el) => { formWordRefs.current[4 + i] = el }}>{w}</span>
                        </span>
                        {' '}
                      </span>
                    ))}
                    {/* job input [8] */}
                    <span className="input-word-wrapper">
                      <input
                        name="jobOrWebsite"
                        type="text"
                        value={form.jobOrWebsite}
                        onChange={handleChange}
                        placeholder="website, app, team, etc."
                        className={`inline-field${form.jobOrWebsite.trim() ? ' filled' : ''}${errors.jobOrWebsite ? ' error' : ''}`}
                        style={{ minWidth: '240px', transform: 'translateY(110%)' }}
                        ref={(el) => { formWordRefs.current[8] = el }}
                        aria-label="Your job or website"
                        aria-invalid={!!errors.jobOrWebsite}
                        aria-describedby={errors.jobOrWebsite ? 'err-job' : undefined}
                        disabled={isSubmitting}
                      />
                    </span>
                    {' '}
                    {/* "that needs help. You can reach me at" [9–16] */}
                    {(['that', 'needs', 'help.', 'You', 'can', 'reach', 'me', 'at'] as const).map((w, i) => (
                      <span key={`w${9 + i}`}>
                        <span className="form-word-wrapper">
                          <span className="form-word-inner" ref={(el) => { formWordRefs.current[9 + i] = el }}>{w}</span>
                        </span>
                        {' '}
                      </span>
                    ))}
                    {/* email-row as one masked unit [17] */}
                    <span className="email-row-mask">
                      <span
                        className="email-row"
                        ref={(el) => { formWordRefs.current[17] = el }}
                        style={{ transform: 'translateY(110%)' }}
                      >
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your email address"
                          className={`inline-field field-email${form.email.trim() ? ' filled' : ''}${errors.email ? ' error' : ''}`}
                          aria-label="Your email address"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'err-email' : undefined}
                          disabled={isSubmitting}
                        />
                        <span>to</span>
                      </span>
                    </span>
                    {/* "get things started." [18–20] */}
                    {(['get', 'things', 'started.'] as const).map((w, i) => (
                      <span key={`w${18 + i}`}>
                        {' '}
                        <span className="form-word-wrapper">
                          <span className="form-word-inner" ref={(el) => { formWordRefs.current[18 + i] = el }}>{w}</span>
                        </span>
                      </span>
                    ))}
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
                  <div ref={btnRef} style={{ marginTop: '2.5rem' }}>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      showArrow={!isSubmitting}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Loader2 size={13} strokeWidth={2} className="animate-spin" aria-hidden="true" />Sending…</span>
                        : 'Send Info'
                      }
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Mobile social CTAs ── */}
            <div
              ref={mobileSocRef}
              className="contact-socials-mobile hidden flex-col gap-4 mt-12"
            >
              <div className="social-divider">OR</div>
              {SOCIAL_LINKS.map(({ href, label, icon, ariaLabel }) => (
                <SocialLink key={href} href={href} label={label} icon={icon} ariaLabel={ariaLabel} />
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
