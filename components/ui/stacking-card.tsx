'use client'

import { useTransform, motion, useScroll, MotionValue } from 'motion/react'
import { useRef } from 'react'

interface CardProps {
  i: number
  title: string
  description: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}

export function StackingCard({
  i,
  title,
  description,
  progress,
  range,
  targetScale,
}: CardProps) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  const isEven = i % 2 === 0
  const bgColor = isEven ? '#000000' : '#ffffff'
  const textColor = isEven ? 'text-white' : 'text-black'
  const borderClass = isEven ? '' : 'border border-black'
  const placeholderBg = isEven ? 'bg-neutral-800' : 'bg-neutral-200'
  const placeholderText = isEven ? 'text-neutral-500' : 'text-neutral-600'

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: bgColor,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[70%] rounded-lg p-10 origin-top ${borderClass}`}
      >
        <h2 className={`font-sans text-3xl md:text-4xl text-center font-semibold ${textColor}`}>
          {title}
        </h2>

        <div className="flex h-full mt-5 gap-10">
          {/* Description (left side) */}
          <div className="w-[40%] relative top-[10%]">
            <p className={`font-sans text-sm md:text-base leading-relaxed ${textColor}`}>
              {description}
            </p>
          </div>

          {/* Image placeholder (right side) */}
          <div className="relative w-[60%] h-full rounded-lg overflow-hidden">
            <motion.div className="w-full h-full" style={{ scale: imageScale }}>
              <div
                className={`absolute inset-0 w-full h-full ${placeholderBg} flex items-center justify-center`}
              >
                <span
                  className={`${placeholderText} text-xs font-mono uppercase tracking-widest`}
                >
                  Visual Placeholder
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
