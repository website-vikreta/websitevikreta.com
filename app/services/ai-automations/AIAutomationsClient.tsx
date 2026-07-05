'use client'

import { DotGrid } from '@/components/ui/DotGrid'
import Hero from './sections/Hero'
import PainSection from './sections/PainSection'
import FixesSection from './sections/FixesSection'
import HowWeWork from './sections/HowWeWork'
import WhySection from './sections/WhySection'
import ContactSection from './sections/ContactSection'

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
          name:     `${ctaForm.firstName} ${ctaForm.lastName}`,
          reply_to: ctaForm.email,
          email:    ctaForm.email,
          service:  ctaForm.subject,
          mobile:   'Not provided',
          budget:   'Not specified',
          message:  ctaForm.message,
          to_name:  'Website Vikreta',
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
      <DotGrid global />
      <main id="main-content" className="relative z-10">
        <Hero />
        <PainSection />
        <FixesSection />
        <HowWeWork />
        <WhySection />
        <ContactSection />
      </main>
    </>
  )
}
