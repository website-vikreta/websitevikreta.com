'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

interface ArrowDotsButtonProps {
  label: string
  href?: string
  onClick?: () => void
}

export function ArrowDotsButton({
  label,
  href = '#',
  onClick,
}: ArrowDotsButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          onClick()
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-neutral-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{label}</span>
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={isHovered ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <path d="M5 10h10M15 7l3 3-3 3" />
      </motion.svg>
    </motion.a>
  )
}
