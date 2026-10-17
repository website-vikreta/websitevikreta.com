'use client'

import { useEffect, useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { AUDIT_MODAL_CONFIGS, useAuditModal } from '@/components/ui/AuditModalProvider'
import { useGsapSection, revealLines, revealFadeUp } from '@/lib/gsap/reveals'
import { WorkflowVisual, BulkContentVisual, ProductVisualsVisual, WhatsAppVisual } from './fixes-visuals'

interface Service {
  id:          string
  title:       string
  description: string
  cta:         string
  Visual:      () => ReactNode
  /** Grid span — lg is a 3-col bento: wide/narrow, then narrow/wide. */
  span:        string
}

const SERVICES: Service[] = [
  {
    id:          'workflow-automation',
    title:       'Workflow & business process automation',
    description:
      'Your CRM, lead capture, order data and spreadsheets, wired together with n8n and Make.com so information moves without anyone copy-pasting it.',
    cta:         'Automate my workflows',
    Visual:      WorkflowVisual,
    span:        'md:col-span-2',
  },
  {
    id:          'whatsapp-agents',
    title:       'WhatsApp AI agents',
    description:
      'A customer assistant that sounds like your team and actually does things: payment links, live order tracking, returns and promotions, all inside the chat.',
    cta:         'Get a WhatsApp agent',
    Visual:      WhatsAppVisual,
    span:        '',
  },
  {
    id:          'bulk-content',
    title:       'Bulk content automation',
    description:
      'The repetitive production work your team does by hand, turned into a system anyone can run from a spreadsheet and a template. One client’s image pipeline went from 20 hours to 1.',
    cta:         'Automate my content',
    Visual:      BulkContentVisual,
    span:        '',
  },
  {
    id:          'ai-ugc',
    title:       'AI UGC & product visuals',
    description:
      'Product content without the studio, the models, or the two-week wait. Your real product, any setting, production quality.',
    cta:         'Get product visuals',
    Visual:      ProductVisualsVisual,
    span:        'md:col-span-2',
  },
]

const PROMPTS = ['Invoice entry…', 'Lead follow-ups…', 'Weekly reports…', 'Order updates…', 'Product photos…']
const AUDIT = AUDIT_MODAL_CONFIGS['#book-audit']

/** "+ Anything AI" as a prompt: whatever they type rides into the audit form's subject. */
function AnythingPrompt() {
  const { openAuditModal } = useAuditModal()
  const reduced = useReducedMotion()
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [hint, setHint] = useState(0)

  useEffect(() => {
    if (reduced || focused || value) return
    const id = setInterval(() => setHint((h) => (h + 1) % PROMPTS.length), 2400)
    return () => clearInterval(id)
  }, [reduced, focused, value])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    openAuditModal({ ...AUDIT, prefill: value.trim() || undefined })
  }

  return (
    <form onSubmit={submit} className="w-full lg:max-w-xl">
      <label htmlFor="anything-ai-input" className="mb-2 block text-sm font-medium text-(--color-text)">
        What’s eating your team’s week?
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <input
            id="anything-ai-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-12 w-full border border-(--color-border-strong) bg-(--color-bg) px-4 text-[15px] text-(--color-text) outline-none transition-colors duration-300 focus:border-(--color-text)"
          />
          {!value && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-4 flex items-center overflow-hidden text-[15px] text-(--color-text-faint)">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={hint}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {PROMPTS[hint]}
                </motion.span>
              </AnimatePresence>
            </span>
          )}
        </div>
        <Button type="submit" variant="primary" size="md" showArrow className="shrink-0">
          Book a Free Process Audit
        </Button>
      </div>
    </form>
  )
}

export default function FixesSection() {
  const scope = useRef<HTMLElement>(null)
  const { openAuditModal } = useAuditModal()

  useGsapSection(scope, () => {
    revealLines('#fix-heading', { trigger: scope.current })
    revealFadeUp(scope.current?.querySelectorAll('.fix-intro, .bento-card') ?? [], { y: 24, trigger: scope.current })
  })

  // Ambient CSS motion only runs while its card is on screen (see .fx-* in globals.css).
  useEffect(() => {
    const els = scope.current?.querySelectorAll<HTMLElement>('[data-fx]')
    if (!els?.length) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.toggleAttribute('data-running', e.isIntersecting))
    })
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Whole card is a pointer target; the Button stays the keyboard/AT target, so no nested interactives.
  const cardClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    openAuditModal(AUDIT)
  }

  return (
    <section ref={scope} className="py-16 md:py-20" aria-labelledby="fix-heading">
      <div className="container">
        <div className="mb-10 grid gap-5 md:mb-14 lg:grid-cols-12 lg:items-end">
          <h2
            id="fix-heading"
            className="text-h2 font-bold leading-[1.05] tracking-tight text-(--color-text) lg:col-span-6"
          >
            Where we focus
          </h2>
          <p className="fix-intro max-w-md text-body-lg leading-relaxed text-(--color-text-muted) lg:col-span-5 lg:col-start-8">
            The four systems we get asked for most. Once they’re live, they run without anyone watching them.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ id, title, description, cta, Visual, span }) => (
            <article
              key={id}
              id={id}
              onClick={cardClick}
              className={`bento-card group relative flex scroll-mt-32 cursor-pointer flex-col overflow-hidden border border-(--color-border) bg-(--color-surface) transition-[border-color,box-shadow] duration-500 hover:border-(--color-border-strong) hover:shadow-[0_24px_48px_-32px_rgb(0_0_0/0.25)] ${span}`}
            >
              <div data-fx className="relative h-60 overflow-hidden bg-(--color-bg) md:h-72">
                <Visual />
              </div>

              <div className="mt-auto p-6 md:p-8">
                <h3 className="font-sans text-xl font-bold leading-[1.15] text-(--color-text) sm:text-2xl">
                  {title}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-(--color-text-muted)">
                  {description}
                </p>
                <div className="mt-5">
                  <Button href="#book-audit" variant="ghost" size="sm" showArrow>
                    {cta}
                  </Button>
                </div>
              </div>
            </article>
          ))}

          <article
            id="anything-ai"
            className="bento-card flex scroll-mt-32 flex-col gap-6 border border-(--color-border) bg-(--color-surface) p-6 md:col-span-2 md:p-8 lg:col-span-3 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h3 className="font-sans text-xl font-bold leading-[1.15] text-(--color-text) sm:text-2xl">
                + Anything AI
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-(--color-text-muted)">
                If it&apos;s repetitive, rule-based, or eating hours from someone who&apos;s worth more than that, it&apos;s fair game. Tell us what it is.
              </p>
            </div>
            <AnythingPrompt />
          </article>
        </div>
      </div>
    </section>
  )
}
