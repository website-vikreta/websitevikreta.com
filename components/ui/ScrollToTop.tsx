'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { trackScrollToTop } from '@/lib/analytics'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    trackScrollToTop()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex size-9 cursor-pointer items-center justify-center border border-(--color-border) bg-(--color-text) text-(--color-bg) transition-colors duration-300 ease-out hover:bg-(--color-accent) hover:text-(--color-text) hover:border-(--color-accent) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2"
          aria-label="Scroll to top"
          type="button"
        >
          <ArrowUp size={16} strokeWidth={2} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
