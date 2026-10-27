'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ProcessItem {
  id: number;
  step: string;
  title: string;
  description: string;
  src: string;
  alt: string;
}

function ProcessRow({ item, index, isLast }: { item: ProcessItem; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative w-full cursor-pointer flex flex-col",
        !isLast && !hovered ? "border-b border-neutral-200 dark:border-neutral-800" : "",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms`,
      }}
    >
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[3rem_1fr] items-center py-8 gap-x-10">
        {/* Step number */}
        <span className="text-xs font-bold text-neutral-400 tracking-widest self-center">
          {item.step}
        </span>

        {/* Rolling heading */}
        <div className="relative overflow-hidden h-[72px]">
          <div className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            <div className="h-[72px] flex items-center">
              <h3 className="text-6xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none whitespace-nowrap">
                {item.title}
              </h3>
            </div>
            <div className="h-[72px] flex items-center">
              <h3 className="text-6xl font-black uppercase tracking-tighter italic leading-none whitespace-nowrap text-white [-webkit-text-stroke:2px_black] [paint-order:stroke_fill] dark:text-black dark:[-webkit-text-stroke:2px_white]">
                {item.title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — always visible, scroll reveal */}
      <div className="md:hidden py-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-4xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none">
            {item.title}
          </h3>
          <span className="text-xs font-bold text-neutral-400 tracking-widest mt-1.5 ml-4 flex-shrink-0">
            {item.step}
          </span>
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Dropdown panel — desktop only */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full overflow-hidden hidden md:block border border-black/10 rounded-b-2xl"
          >
            <div className="w-full grid grid-cols-[1fr_auto] items-center gap-8 px-6 py-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-black dark:text-white">{item.title}</h3>
                <p className="text-sm text-black/70 dark:text-white/70 leading-relaxed">{item.description}</p>
              </div>
              <div className="relative w-40 h-52 flex-shrink-0 rounded-xl overflow-hidden">
                <Image src={item.src} alt={item.alt} fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom border when not hovered (hidden during hover so dropdown border takes over) */}
      {!isLast && hovered && (
        <div className="hidden md:block h-px" />
      )}
    </div>
  );
}

const defaultItems: ProcessItem[] = [
  {
    id: 1,
    step: "01",
    title: "Listen",
    description: "A real conversation, not a form. We ask about your business, your customers, and what's actually broken — before we suggest anything. Most problems we solve weren't the ones people originally described.",
    src: "/our-process/01-listen.jpeg",
    alt: "Real conversation",
  },
  {
    id: 2,
    step: "02",
    title: "Diagnose",
    description: "We map what you have, what's missing, and where the friction lives. We look at your workflow, your tools, your competitors, and your market. You'll get an honest read — including the parts you didn't ask about.",
    src: "/our-process/02-diagnose.jpeg",
    alt: "Deep analysis",
  },
  {
    id: 3,
    step: "03",
    title: "Propose",
    description: "We come back with a clear plan — what we'll build, why, how long it takes, and what it costs. No vague scope, no hidden phases. You approve every decision before we write a single line of code.",
    src: "/our-process/03-propose.jpeg",
    alt: "Clear proposal",
  },
  {
    id: 4,
    step: "04",
    title: "Build",
    description: "We build fast and keep you close. You see real progress at every stage — not a black box that opens three months later. If something changes, we tell you. No surprises at launch.",
    src: "/our-process/04-build.jpeg",
    alt: "Building with transparency",
  },
  {
    id: 5,
    step: "05",
    title: "Deliver & Stay",
    description: "We launch, we test, and we stick around. If something breaks or needs to change after go-live, we're still here. Your success after handoff matters to us as much as the build itself.",
    src: "/our-process/05-deliver-and-stay.jpeg",
    alt: "Delivery and support",
  },
];

interface RollingTextListProps {
  items?: ProcessItem[];
}

export function RollingTextList({ items = defaultItems }: RollingTextListProps) {
  return (
    <div className="w-full flex flex-col">
      {items.map((item, index) => (
        <ProcessRow key={item.id} item={item} index={index} isLast={index === items.length - 1} />
      ))}
    </div>
  );
}
