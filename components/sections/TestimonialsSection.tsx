"use client"

import { Fragment, useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, LayoutGroup } from "motion/react"
import { RevealText } from "@/components/ui/Reveal"
import { cn } from "@/lib/utils"

const AUTO_INTERVAL = 10000
const EASE = [0.16, 1, 0.3, 1] as const

const testimonials = [
  {
    id: 1,
    metric: "11 hrs",
    context: "Saved per week",
    subcontext: "E-commerce",
    quote: "Our team finally does the work we hired them for. Game changer.",
    role: "Darcy McGilvery, Simpli Home",
    initial: "D",
  },
  {
    id: 2,
    metric: "3 weeks",
    context: "Delivery time",
    subcontext: "Full website",
    quote: "Fastest turnaround we had. Quality was better than agencies charging 5x.",
    role: "Co-founder, AP Cleanco",
    initial: "C",
  },
  {
    id: 3,
    metric: "3+ years",
    context: "Ongoing",
    subcontext: "Sustainable Bitcoin Protocol",
    quote: "They shaped our entire product from the ground up and are still the first people we call.",
    role: "Co-founder, Sustainable Bitcoin Protocol",
    initial: "C",
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const active = testimonials[activeIndex]
  const words = active.quote.split(" ")

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonials.length)
    }, AUTO_INTERVAL)
  }, [])

  useEffect(() => {
    startInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startInterval])

  const handleSelect = (index: number) => {
    setActiveIndex(index)
    startInterval()
  }

  return (
    <section className="py-16 md:py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">

        {/* Heading */}
        <RevealText as="h3" className="text-h3 font-bold text-[var(--color-text)] mb-10 md:mb-14">
          Work that moved numbers.
        </RevealText>

        {/* Switching content — word reveals, no opacity */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            exit={{
              y: -28,
              clipPath: "inset(100% 0 0% 0)",
              transition: { duration: 0.24, ease: [0.4, 0, 1, 1] },
            }}
          >
            {/* Metric */}
            <div className="overflow-hidden">
              <motion.span
                className="block font-black text-[var(--color-text)] leading-none tracking-tighter"
                style={{ fontSize: "clamp(5.5rem, 16vw, 10.5rem)" }}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.75, ease: EASE, delay: 0 }}
              >
                {active.metric}
              </motion.span>
            </div>

            {/* Context row */}
            <div className="overflow-hidden mt-4 mb-10">
              <motion.div
                className="flex items-center justify-center gap-2.5"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.13 }}
              >
                <span className="text-sm font-medium text-[var(--color-text-muted)]">{active.context}</span>
                <span className="text-[var(--color-border-strong)] leading-none select-none">·</span>
                <span className="text-sm text-[var(--color-text-faint)]">{active.subcontext}</span>
              </motion.div>
            </div>

            {/* Quote — word by word clip reveal */}
            <p className="text-xl md:text-[1.45rem] font-light text-[var(--color-text)] leading-[1.7] mb-5 h-[3.4em] overflow-hidden">
              <span className="text-[var(--color-text-faint)]">&ldquo;</span>
              {words.map((word, i) => (
                <Fragment key={active.id + "-w-" + i}>
                  <span
                    className="inline-block overflow-hidden"
                    style={{ verticalAlign: "bottom", lineHeight: "inherit" }}
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        duration: 0.5,
                        ease: EASE,
                        delay: 0.24 + i * 0.04,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 && " "}
                </Fragment>
              ))}
              <span className="text-[var(--color-text-faint)]">&rdquo;</span>
            </p>

            {/* Attribution */}
            <div className="overflow-hidden">
              <motion.p
                className="text-sm text-[var(--color-text-faint)] tracking-[0.12em]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.5,
                  ease: EASE,
                  delay: 0.3 + words.length * 0.04,
                }}
              >
                — {active.role}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Avatar switcher */}
        <LayoutGroup>
        <motion.div
          layout
          className="flex items-center justify-center gap-2 mt-10 md:mt-12"
        >
          {testimonials.map((t, index) => {
            const isActive = activeIndex === index
            const isHovered = hoveredIndex === index && !isActive
            const showLabel = isActive || isHovered

            return (
              <motion.button
                layout
                key={t.id}
                onClick={() => handleSelect(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                aria-label={`View ${t.role} testimonial`}
                className={cn(
                  "relative flex items-center rounded-full cursor-pointer",
                  "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isActive
                    ? "bg-[#121212] pr-4 pl-[5px] py-[5px]"
                    : "bg-transparent hover:bg-[#EBEBEB] pr-[3px] pl-[3px] py-[3px]",
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 select-none",
                    "transition-all duration-500",
                    isActive
                      ? "bg-[#FFD600] text-[#121212]"
                      : "bg-[#E0E0E0] text-[#525252]",
                  )}
                >
                  {t.initial}
                </div>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    showLabel
                      ? "grid-cols-[1fr] opacity-100 ml-2"
                      : "grid-cols-[0fr] opacity-0 ml-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      className={cn(
                        "text-xs font-medium whitespace-nowrap block",
                        isActive ? "text-white" : "text-[#121212]",
                      )}
                    >
                      {t.role}
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
        </LayoutGroup>

      </div>
    </section>
  )
}
