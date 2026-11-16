'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

/* Mobile only — desktop already has Navbar's persistent "Contact Us" button.
   On mobile that CTA is hidden behind the hamburger drawer, so this fills the gap:
   visible once the visitor scrolls past Hero, hidden again once the real demo
   form (#whatsapp-demo) is on screen. */
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const contact = document.getElementById('whatsapp-demo')
    if (!hero || !contact) return

    let pastHero = false
    let reachedContact = false
    const update = () => setVisible(pastHero && !reachedContact)

    const heroObserver = new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting
      update()
    })
    heroObserver.observe(hero)

    // One-way: once the real form has been seen, stay hidden — including
    // past it in the Footer — instead of reappearing every time it scrolls
    // back out of view.
    const contactObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      reachedContact = true
      update()
      contactObserver.disconnect()
    })
    contactObserver.observe(contact)

    return () => {
      heroObserver.disconnect()
      contactObserver.disconnect()
    }
  }, [])

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-(--color-border) bg-(--color-surface) px-4 py-3 transition-transform duration-300 md:hidden"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-sm font-semibold text-(--color-text)">
          See it on your store
        </p>
        <Button href="#whatsapp-demo" variant="primary" size="sm" showArrow className="shrink-0">
          Book a demo
        </Button>
      </div>
    </div>
  )
}
