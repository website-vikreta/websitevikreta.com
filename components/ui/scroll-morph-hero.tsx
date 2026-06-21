"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useTransform, useSpring, useMotionValue } from "motion/react";

export type AnimationPhase = "scatter" | "line" | "circle";

// ─── Constants ────────────────────────────────────────────────────────────────

const IMG_WIDTH    = 60;
const IMG_HEIGHT   = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL   = 600;
const SPRITE_COLS  = 4;
const SPRITE_ROWS  = Math.ceil(TOTAL_IMAGES / SPRITE_COLS);

// Per-card spring (matches original FlipCard spring: stiffness 40, damping 15)
const SPRING_K = 40;
const SPRING_C = 15;

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
    const mouseX             = useMotionValue(0);
    const smoothMouseX       = useSpring(mouseX, { stiffness: 30, damping: 20 });

    // Stable scatter start positions (opacity 0 → fade in during fly-to-line)
    const scatterPositions = useMemo<Target[]>(
        () => IMAGES.map(() => ({
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

    // ── Sprite: 20 images → 1 canvas → 1 blob → 1 GPU texture ─────────────────
    useEffect(() => {
        const canvas = document.createElement("canvas");
        canvas.width  = IMG_WIDTH  * SPRITE_COLS;
        canvas.height = IMG_HEIGHT * SPRITE_ROWS;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let loaded = 0;
        let revoke: (() => void) | null = null;

        IMAGES.forEach((src, idx) => {
            const img       = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                ctx.drawImage(
                    img,
                    (idx % SPRITE_COLS) * IMG_WIDTH,
                    Math.floor(idx / SPRITE_COLS) * IMG_HEIGHT,
                    IMG_WIDTH, IMG_HEIGHT
                );
                if (++loaded < IMAGES.length) return;
                canvas.toBlob(blob => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);
                    revoke = () => URL.revokeObjectURL(url);
                    cardRefs.current.forEach((el, i) => {
                        if (!el) return;
                        el.style.backgroundImage    = `url(${url})`;
                        el.style.backgroundSize     = `${IMG_WIDTH * SPRITE_COLS}px ${IMG_HEIGHT * SPRITE_ROWS}px`;
                        el.style.backgroundPosition = `-${(i % SPRITE_COLS) * IMG_WIDTH}px -${Math.floor(i / SPRITE_COLS) * IMG_HEIGHT}px`;
                    });
                }, "image/webp", 0.85);
            };
            img.onerror = () => { ++loaded; };
            img.src = src;
        });

        return () => revoke?.();
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
        const handleWheel = (e: WheelEvent) => {
            if (morphCompleteRef.current) return; // arc done — let page scroll
            e.preventDefault();
            if (introPhaseRef.current !== "circle") return; // timed intro — just block
            const v = Math.min(Math.max(virtualScroll.get() + e.deltaY, 0), MAX_SCROLL);
            virtualScroll.set(v);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
        const handleTouchMove  = (e: TouchEvent) => {
            if (morphCompleteRef.current) return;
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

    // ── Mouse parallax ────────────────────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX.set(((e.clientX - rect.left) / rect.width * 2 - 1) * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // ── Single rAF loop: real spring physics → direct DOM (zero re-renders) ───
    useEffect(() => {
        let rafId: number;
        let last = performance.now();

        const tick = (now: number) => {
            // dt in seconds, clamped to avoid jumps after tab-switch
            const dt = Math.min((now - last) / 1000, 1 / 30);
            last = now;

            const morph   = smoothMorph.get();
            const px      = smoothMouseX.get();
            const phase   = introPhaseRef.current;
            const { width: cw, height: ch } = containerSizeRef.current;

            for (let i = 0; i < TOTAL_IMAGES; i++) {
                const el = cardRefs.current[i];
                if (!el) continue;
                const t = computeTarget(i, phase, morph, px, cw, ch, scatterPositions);
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
    }, [smoothMorph, smoothMouseX, scatterPositions]);

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">
            <div className="flex h-full w-full flex-col items-center justify-center">

                {/* Intro text — fades out as arc forms */}
                <div
                    ref={introTextRef}
                    className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2"
                    style={{ opacity: 0, filter: "blur(10px)" }}
                >
                    <h1 className="text-2xl font-medium tracking-tight text-gray-800 md:text-4xl">
                        The future is built on AI.
                    </h1>
                    <p className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500">
                        SCROLL TO EXPLORE
                    </p>
                </div>

                {/* Arc content — fades in as arc forms */}
                <div
                    ref={arcTextRef}
                    className="absolute top-[10%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                    style={{ opacity: 0 }}
                >
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-4">
                        Explore Our Vision
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-lg leading-relaxed">
                        Discover a world where technology meets creativity.{" "}
                        <br className="hidden md:block" />
                        Scroll through our curated collection of innovations designed to shape the future.
                    </p>
                </div>

                {/* Cards — plain sprite tiles, no flip/hover; positioned by rAF */}
                <div className="relative flex items-center justify-center w-full h-full">
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => (
                        <div
                            key={i}
                            ref={el => { cardRefs.current[i] = el; }}
                            aria-hidden="true"
                            style={{
                                position:           "absolute",
                                width:              IMG_WIDTH,
                                height:             IMG_HEIGHT,
                                backgroundImage:    `url(${src})`,
                                backgroundSize:     "cover",
                                backgroundPosition: "center",
                                backgroundRepeat:   "no-repeat",
                                borderRadius:       12,
                                boxShadow:          "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
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
