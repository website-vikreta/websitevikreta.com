"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const IMAGES = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=80",
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=300&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&q=80",
  "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=300&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&q=80",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&q=80",
  "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&q=80",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=80",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=300&q=80",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&q=80",
  "https://images.unsplash.com/photo-1614064641938-31aeb8e35bab?w=300&q=80",
  "https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=300&q=80",
  "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=300&q=80",
];

// Arc geometry constants
const ARC_SPAN   = 150;  // degrees total spread of cards across the arc
const BASE_ANGLE = 270;  // 12-o'clock = top of imaginary circle
const CARD_W     = 72;   // px
const CARD_H     = 100;  // px
const SPEED      = 0.03; // degrees per frame (~1.8°/s at 60fps)

// Pre-compute static card angles (evenly spaced across the arc)
const CARD_ANGLES = IMAGES.map((_, i) =>
  BASE_ANGLE - ARC_SPAN / 2 + (i / (IMAGES.length - 1)) * ARC_SPAN
);

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelRef     = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);

  // radius: circle radius in px
  // pivotBottom: CSS bottom value for the pivot div (can be negative = below container)
  const [layout, setLayout] = useState({ radius: 700, pivotBottom: -450 });

  // Compute responsive arc layout from container size
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const compute = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      // Radius scales with width, clamped for very small/large screens
      const r = Math.min(Math.max(w * 0.65, 380), 950);
      // pivot is below container bottom so the top of the circle (12-o'clock card)
      // appears at ~62% from the container top (lower third of hero)
      const pivotBottom = -(r - h * 0.38);
      setLayout({ radius: r, pivotBottom });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Continuous rotation — direct DOM mutation, zero React re-renders
  useEffect(() => {
    let angle = 0;
    const tick = () => {
      angle += SPEED;
      if (wheelRef.current) {
        wheelRef.current.style.transform = `rotate(${angle}deg)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" style={{ background: "var(--color-bg)" }}>

      {/* Hero text — centered, above the arc */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-mono uppercase text-xs mb-5"
          style={{ color: "var(--color-accent)", letterSpacing: "0.2em" }}
        >
          AI Automation Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl"
          style={{ color: "var(--color-text)" }}
        >
          We Automate.<br />You Scale.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mt-5 text-base md:text-lg max-w-md leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          Repetitive work, automated. Human energy, redirected to what actually matters.
        </motion.p>
      </div>

      {/*
        Pivot: a 0×0 point at the center of the imaginary circle.
        Placed at bottom-center of container, offset downward by pivotBottom.
        `translateX(-50%)` centres it horizontally (doesn't affect a 0-width element).
      */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: `${layout.pivotBottom}px`,
          width: 0,
          height: 0,
          transform: "translateX(-50%)",
        }}
      >
        {/*
          Wheel: rotates around the pivot point (its own 0×0 origin).
          All cards are children positioned at (cos, sin) * radius from this origin.
        */}
        <div
          ref={wheelRef}
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
        >
          {IMAGES.map((src, i) => {
            const deg = CARD_ANGLES[i];
            const rad = (deg * Math.PI) / 180;
            const x   = Math.cos(rad) * layout.radius;
            const y   = Math.sin(rad) * layout.radius;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left:      x - CARD_W / 2,
                  top:       y - CARD_H / 2,
                  width:     CARD_W,
                  height:    CARD_H,
                  // Tilt each card tangentially so it follows the arc
                  transform: `rotate(${deg + 90}deg)`,
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  width={CARD_W}
                  height={CARD_H}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
