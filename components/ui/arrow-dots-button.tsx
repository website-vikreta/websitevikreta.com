'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

interface ArrowDotsButtonProps {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'default' | 'primary' | 'secondary'
}

export function ArrowDotsButton({
  label,
  href = '#',
  onClick,
  variant = 'default',
}: ArrowDotsButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getClasses = () => {
    switch (variant) {
      case 'primary':
        return 'inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-yellow-400 hover:text-black'
      case 'secondary':
        return 'inline-flex items-center gap-3 px-8 py-4 bg-white border border-black text-black rounded-full font-semibold text-lg transition-all duration-300 hover:bg-black hover:text-white'
      default:
        return 'inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-neutral-900'
    }
  }

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
      className={getClasses()}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span>{label}</span>
      <motion.span
        className="inline-flex"
        animate={isHovered ? { x: 4 } : { x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowRight size={20} strokeWidth={2} />
      </motion.span>
    </motion.a>
  )
}
