"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useTransform, useSpring, useMotionValue } from "motion/react";
import { Button } from "@/components/ui/Button";

export type AnimationPhase = "scatter" | "line" | "circle";

// ─── Constants ────────────────────────────────────────────────────────────────

const IMG_WIDTH    = 60;
const IMG_HEIGHT   = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL   = 600;

// Shared preloader sprite — 2 cols × 10 rows, frame t at col t%2, row t/2.
const SPRITE       = "/preloader/sprite.jpg";
const SPRITE_COLS  = 2;
const SPRITE_ROWS  = Math.ceil(TOTAL_IMAGES / SPRITE_COLS);

const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

// Per-card spring (matches original FlipCard spring: stiffness 40, damping 15)
const SPRING_K = 40;
const SPRING_C = 15;

const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

type Target = { x: number; y: number; rotation: number; scale: number; opacity: number };

// ─── Target position per phase (identical math to original) ───────────────────

function computeTarget(
    i: number,
    phase: AnimationPhase,
    morphVal: number,
    parallaxVal: number,
    cw: number,
    ch: number,
    scatter: Target[]
): Target {
    // 1. Scatter
    if (phase === "scatter") return scatter[i];

    // 2. Line
    if (phase === "line") {
        const lineSpacing = 70;
        const lineX = i * lineSpacing - (TOTAL_IMAGES * lineSpacing) / 2;
        return { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    // 3. Circle → Arc morph
    const isMobile     = cw < 768;
    const minDimension = Math.min(cw, ch);
    const circleRadius = Math.min(minDimension * 0.35, 350);
    const circleAngle  = (i / TOTAL_IMAGES) * 360;
    const circleRad    = (circleAngle * Math.PI) / 180;
    const circlePos = {
        x:        Math.cos(circleRad) * circleRadius,
        y:        Math.sin(circleRad) * circleRadius,
        rotation: circleAngle + 90,
    };

    const baseRadius  = Math.min(cw, ch * 1.5);
    const arcRadius   = baseRadius * (isMobile ? 1.4 : 1.1);
    const arcApexY    = ch * (isMobile ? 0.35 : 0.25);
    const arcCenterY  = arcApexY + arcRadius;
    const spreadAngle = isMobile ? 100 : 130;
    const startAngle  = -90 - spreadAngle / 2;
    const step        = spreadAngle / (TOTAL_IMAGES - 1);

    const currentArcAngle = startAngle + i * step;
    const arcRad          = (currentArcAngle * Math.PI) / 180;
    const arcPos = {
        x:        Math.cos(arcRad) * arcRadius + parallaxVal,
        y:        Math.sin(arcRad) * arcRadius + arcCenterY,
        rotation: currentArcAngle + 90,
        scale:    isMobile ? 1.4 : 1.8,
    };

    return {
        x:        lerp(circlePos.x,        arcPos.x,        morphVal),
        y:        lerp(circlePos.y,        arcPos.y,        morphVal),
        rotation: lerp(circlePos.rotation, arcPos.rotation, morphVal),
        scale:    lerp(1,                  arcPos.scale,    morphVal),
        opacity:  1,
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function IntroAnimation() {
    const containerRef     = useRef<HTMLDivElement>(null);
    const containerSizeRef  = useRef({ width: 0, height: 0 });
    const morphCompleteRef  = useRef(false);
    const introPhaseRef    = useRef<AnimationPhase>("scatter");

    const cardRefs     = useRef<Array<HTMLDivElement | null>>(Array(TOTAL_IMAGES).fill(null));
    const introTextRef = useRef<HTMLDivElement>(null);
    const arcTextRef   = useRef<HTMLDivElement>(null);

    // Scroll-driven scalars (smoothed) — same as original
    const virtualScroll      = useMotionValue(0);
    const morphProgress      = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph        = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // Stable scatter start positions (opacity 0 → fade in during fly-to-line)
    const scatterPositions = useMemo<Target[]>(
        () => Array.from({ length: TOTAL_IMAGES }, () => ({
            x:        (Math.random() - 0.5) * 1500,
            y:        (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale:    0.6,
            opacity:  0,
        })),
        []
    );

    // Per-card live spring state (position + velocity), seeded at scatter
    const cardState = useRef(
        scatterPositions.map(s => ({
            x: s.x, y: s.y, rot: s.rotation, scale: s.scale, opacity: s.opacity,
            vx: 0, vy: 0, vrot: 0, vscale: 0, vopacity: 0,
        }))
    );

    // ── Map shared sprite onto cards — random frame per card, reshuffled each load ──
    useEffect(() => {
        const order = shuffle(Array.from({ length: TOTAL_IMAGES }, (_, n) => n));
        cardRefs.current.forEach((el, i) => {
            if (!el) return;
            const tile = order[i];
            el.style.backgroundImage    = `url(${SPRITE})`;
            el.style.backgroundSize     = `${IMG_WIDTH * SPRITE_COLS}px ${IMG_HEIGHT * SPRITE_ROWS}px`;
            el.style.backgroundPosition = `-${(tile % SPRITE_COLS) * IMG_WIDTH}px -${Math.floor(tile / SPRITE_COLS) * IMG_HEIGHT}px`;
        });
    }, []);

    // ── Resize → ref (no re-render) ───────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const update = () => {
            containerSizeRef.current = { width: container.offsetWidth, height: container.offsetHeight };
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(container);
        return () => ro.disconnect();
    }, []);

    // ── Skip animation if hero is off-screen on mount (e.g. page refresh while scrolled) ──
    useEffect(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect && (rect.bottom < 0 || rect.top > window.innerHeight)) {
            morphCompleteRef.current = true;
            virtualScroll.set(MAX_SCROLL);
        }
    }, [virtualScroll]);

    // ── Intro timeline (original): scatter → line @500ms → circle @2500ms ─────
    useEffect(() => {
        const t1 = setTimeout(() => { introPhaseRef.current = "line";   }, 500);
        const t2 = setTimeout(() => { introPhaseRef.current = "circle"; }, 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    // ── Scroll capture: block page scroll until arc is complete ──────────────
    // During scatter/line: preventDefault only (intro is timed, scroll does nothing).
    // During circle: scroll drives virtualScroll (morph).
    // Once morphCompleteRef flips true (set in rAF when smoothMorph ≈ 1):
    //   handlers return without preventDefault → page scrolls normally.
    useEffect(() => {
        const isHeroVisible = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            return rect && rect.bottom > 0 && rect.top < window.innerHeight;
        };

        const handleWheel = (e: WheelEvent) => {
            if (morphCompleteRef.current) return;
            if (!isHeroVisible()) {
                morphCompleteRef.current = true;
                return;
            }
            e.preventDefault();
            if (introPhaseRef.current !== "circle") return;
            const v = Math.min(Math.max(virtualScroll.get() + e.deltaY, 0), MAX_SCROLL);
            virtualScroll.set(v);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
        const handleTouchMove  = (e: TouchEvent) => {
            if (morphCompleteRef.current) return;
            if (!isHeroVisible()) {
                morphCompleteRef.current = true;
                return;
            }
            e.preventDefault();
            if (introPhaseRef.current !== "circle") return;
            const deltaY = touchStartY - e.touches[0].clientY;
            touchStartY  = e.touches[0].clientY;
            const v = Math.min(Math.max(virtualScroll.get() + deltaY, 0), MAX_SCROLL);
            virtualScroll.set(v);
        };

        window.addEventListener("wheel",      handleWheel,      { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove",  handleTouchMove,  { passive: false });
        return () => {
            window.removeEventListener("wheel",      handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove",  handleTouchMove);
        };
    }, [virtualScroll]);


    // ── Single rAF loop: real spring physics → direct DOM (zero re-renders) ───
    useEffect(() => {
        let rafId: number;
        let last = performance.now();

        const tick = (now: number) => {
            // dt in seconds, clamped to avoid jumps after tab-switch
            const dt = Math.min((now - last) / 1000, 1 / 30);
            last = now;

            const morph   = smoothMorph.get();
            const phase   = introPhaseRef.current;
            const { width: cw, height: ch } = containerSizeRef.current;

            for (let i = 0; i < TOTAL_IMAGES; i++) {
                const el = cardRefs.current[i];
                if (!el) continue;
                const t = computeTarget(i, phase, morph, 0, cw, ch, scatterPositions);
                const s = cardState.current[i];

                // Critically-ish damped spring per axis (mass = 1)
                s.vx       += (-SPRING_K * (s.x       - t.x)        - SPRING_C * s.vx)       * dt;
                s.vy       += (-SPRING_K * (s.y       - t.y)        - SPRING_C * s.vy)       * dt;
                s.vrot     += (-SPRING_K * (s.rot     - t.rotation) - SPRING_C * s.vrot)     * dt;
                s.vscale   += (-SPRING_K * (s.scale   - t.scale)    - SPRING_C * s.vscale)   * dt;
                s.vopacity += (-SPRING_K * (s.opacity - t.opacity)  - SPRING_C * s.vopacity) * dt;

                s.x       += s.vx       * dt;
                s.y       += s.vy       * dt;
                s.rot     += s.vrot     * dt;
                s.scale   += s.vscale   * dt;
                s.opacity += s.vopacity * dt;

                el.style.transform = `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg) scale(${s.scale})`;
                el.style.opacity   = String(clamp01(s.opacity));
            }

            // Release page scroll once arc is fully formed
            if (!morphCompleteRef.current && morph > 0.98 && introPhaseRef.current === "circle") {
                morphCompleteRef.current = true;
            }

            // Intro text — visible in circle phase, fades as morph crosses 0.5
            if (introTextRef.current) {
                const show = phase === "circle" ? Math.max(0, 1 - morph * 2) : 0;
                introTextRef.current.style.opacity = String(show);
                introTextRef.current.style.filter  = `blur(${(1 - show) * 10}px)`;
            }

            // Arc content — fades in as arc forms (morph 0.8 → 1), same as original
            if (arcTextRef.current) {
                const o = clamp01((morph - 0.8) / 0.2);
                arcTextRef.current.style.opacity   = String(o);
                arcTextRef.current.style.transform = `translateY(${lerp(20, 0, o)}px)`;
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [smoothMorph, scatterPositions]);

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center">

                {/* Intro text — fades out as arc forms */}
                <div
                    ref={introTextRef}
                    className="absolute z-30 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2"
                    style={{ opacity: 0, filter: "blur(10px)" }}
                >
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl md:text-6xl">
                        We automate<br />
                        the <span style={{ color: "#FFD600" }}>busywork.</span>
                    </h1>
                </div>

                {/* Arc content — fades in as arc forms */}
                <div
                    ref={arcTextRef}
                    className="absolute top-[18%] z-30 flex flex-col items-center justify-center text-center px-4"
                    style={{ opacity: 0 }}
                >
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl mb-4">
                        We automate the <span style={{ color: "#FFD600" }}>busywork.</span><br />
                        Your team does the real work.
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed mb-6">
                        Invoicing, reporting, follow-ups — if it repeats, we automate it. Built around how your business actually runs, not a generic playbook.
                    </p>
                    <Button href="#services" variant="primary" showArrow>
                        See what we automate
                    </Button>
                </div>

                {/* Cards — plain sprite tiles, no flip/hover; positioned by rAF */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {Array.from({ length: TOTAL_IMAGES }, (_, i) => (
                        <div
                            key={i}
                            ref={el => { cardRefs.current[i] = el; }}
                            aria-hidden="true"
                            style={{
                                position:           "absolute",
                                width:              IMG_WIDTH,
                                height:             IMG_HEIGHT,
                                backgroundRepeat:   "no-repeat",
                                opacity:            0,
                                willChange:         "transform, opacity",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
