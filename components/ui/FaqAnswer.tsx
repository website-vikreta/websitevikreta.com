'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Animates a plain measured px height instead of Framer Motion's `'auto'`
// keyframe — that needs its own measurement pass to resolve, which races
// against Radix's forceMount content and can leave the answer stuck at
// height 0 while the trigger icon has already flipped to open. `ref`
// measures the answer's natural height directly (overflow-hidden on the
// wrapper doesn't affect the child's own layout size), so this works
// regardless of the wrapper's current collapsed state.
export function FaqAnswer({ answer, isOpen, reduceMotion }: { answer: string; isOpen: boolean; reduceMotion: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight)
  }, [isOpen, answer])

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? height : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
      style={{ overflow: 'hidden' }}
    >
      <p ref={ref} className="pb-8 text-[1.0625rem] leading-[1.7] text-(--color-text-muted)">
        {answer}
      </p>
    </motion.div>
  )
}
