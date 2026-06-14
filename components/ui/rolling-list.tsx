'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flipLeft, setFlipLeft] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
    // image is 208px wide + 12px cursor offset
    setFlipLeft(x + 12 + 208 > rect.width);
  };

  return (
    <div
      ref={ref}
      className={`group relative w-full cursor-pointer ${!isLast ? 'border-b border-neutral-200 dark:border-neutral-800' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 90}ms, transform 0.6s ease ${index * 90}ms`,
      }}
    >
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[3rem_1fr_1fr] items-center py-8 gap-x-10">
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

        {/* Description — slides in on hover */}
        <p className={cn(
          "text-base text-neutral-500 dark:text-neutral-400 leading-relaxed self-center",
          "opacity-0 translate-x-5 transition-all duration-500 ease-out",
          "group-hover:opacity-100 group-hover:translate-x-0"
        )}>
          {item.description}
        </p>
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

      {/* Magnetic cursor image — desktop only, follows mouse */}
      <div
        className="pointer-events-none absolute z-50 h-36 w-52 overflow-hidden shadow-2xl hidden md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: `${flipLeft ? 'translate(calc(-100% - 12px), 12px)' : 'translate(12px, 12px)'} scale(${hovered ? 1 : 0.85}) rotate(${hovered ? 0 : 4}deg)`,
          opacity: hovered ? 1 : 0,
          transition: hovered
            ? 'opacity 0.35s ease, transform 0.35s ease, left 0.1s ease-out, top 0.1s ease-out'
            : 'opacity 0.25s ease, transform 0.25s ease',
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        </div>
      </div>
    </div>
  );
}

const defaultItems: ProcessItem[] = [
  {
    id: 1,
    step: "01",
    title: "Listen",
    description: "A real conversation, not a form. We understand your business before we touch anything.",
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format&fit=crop&q=60",
    alt: "Real conversation",
  },
  {
    id: 2,
    step: "02",
    title: "Diagnose",
    description: "We study your requirements and look deeper. We find what you asked for and what you didn't know to ask for.",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=60",
    alt: "Deep analysis",
  },
  {
    id: 3,
    step: "03",
    title: "Propose",
    description: "We bring you a solution that's honest, scoped, and priced clearly. You approve before anything moves.",
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60",
    alt: "Clear proposal",
  },
  {
    id: 4,
    step: "04",
    title: "Build",
    description: "We develop with transparency. You see progress, not silence.",
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60",
    alt: "Building with transparency",
  },
  {
    id: 5,
    step: "05",
    title: "Deliver & Stay",
    description: "We don't hand over a zip file and disappear. We make sure it works.",
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&auto=format&fit=crop&q=60",
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
