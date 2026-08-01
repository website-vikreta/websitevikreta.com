import { ContactCTASection } from '@/components/sections/ContactCTASection'

export function WorkCTASection() {
  return (
    <ContactCTASection
      id="work-cta"
      heading="Have a problem like these?"
      subheading="Free call. No commitment. Tell us what isn't working and we'll tell you what we'd actually do about it — before any proposal."
      formHeading="Book a Free Call"
      subjectLabel="What isn't working?"
      subjectPlaceholder="e.g. leads going cold, manual reporting, slow site"
      messagePlaceholder="Tell us more about what you're dealing with…"
      submitLabel="Book a Free Call"
      buttonVariant="accent"
      buttonSize="lg"
      className="py-16 md:py-20"
    />
  )
}
