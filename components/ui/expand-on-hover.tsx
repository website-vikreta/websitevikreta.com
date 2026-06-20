"use client"

import { motion, AnimatePresence } from "motion/react"
import React, { useState } from "react"
import { cn } from "@/lib/utils"

export interface WorkItem {
  id: string
  title: string
  excerpt: string
  imgSrc: string
  secondaryImgSrc: string
  linkHref: string
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ")
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.22em]"
          style={{ verticalAlign: "bottom", paddingBottom: "0.05em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12 + i * 0.065,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  )
}

interface HoverExpandProps {
  items: WorkItem[]
  className?: string
}

export function HoverExpand({ items, className }: HoverExpandProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const gridCols = items.map((_, i) => (i === activeIndex ? "5fr" : "1fr")).join(" ")
  const gridRows = items.map((_, i) => (i === activeIndex ? "5fr" : "1fr")).join(" ")

  return (
    <div
      className={cn("w-full", className)}
      style={{
        display: "grid",
        gridTemplateColumns: isDesktop ? gridCols : "1fr",
        gridTemplateRows: isDesktop ? "1fr" : gridRows,
        gap: "6px",
        height: isDesktop ? "72vh" : "auto",
      }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index
        return (
          <motion.div
            key={item.id}
            layout
            transition={{
              layout: { type: "spring", stiffness: 100, damping: 16, mass: 1.5 },
            }}
            className="flex flex-col overflow-hidden cursor-pointer"
            style={{ minHeight: isDesktop ? undefined : isActive ? "520px" : "80px" }}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            {/* Top 60%: image */}
            <div className="flex-[3] relative overflow-hidden min-h-0">
              <img
                src={item.imgSrc}
                alt={item.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover",
                  "transition-transform duration-700 ease-out",
                  isActive ? "scale-105" : "scale-100"
                )}
              />
            </div>

            {/* Bottom 40% */}
            <div className="flex-[2] relative overflow-hidden min-h-0">

              {/* Inactive: second image, no text */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={item.secondaryImgSrc}
                      alt=""
                      aria-hidden
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active: dark content panel */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={`content-${item.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-[#0F0F0F] flex flex-col justify-end gap-3 p-6 md:p-8 lg:p-9"
                  >
                    {/* Title — word-masked reveal */}
                    <h3 className="font-sans font-bold text-white text-[clamp(1.1rem,1.7vw,1.75rem)] leading-[1.15] tracking-tight">
                      <WordReveal text={item.title} />
                    </h3>

                    <div>
                      {/* Excerpt */}
                      <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.52 }}
                        className="text-white/50 leading-relaxed mb-6"
                      >
                        {item.excerpt}
                      </motion.p>

                      {/* CTA */}
                      <motion.a
                        href={item.linkHref}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut", delay: 0.68 }}
                        className="inline-flex items-center gap-2.5 text-sm font-medium text-[#FFD600] w-fit group/cta"
                      >
                        <span className="border-b border-[#FFD600]/30 pb-px transition-colors duration-200 group-hover/cta:border-[#FFD600]">
                          View Case Study
                        </span>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="transition-transform duration-200 group-hover/cta:translate-x-1"
                        >
                          <path
                            d="M1 7h12M8 3l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
