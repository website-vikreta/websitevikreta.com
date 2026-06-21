"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useTransform, useSpring, useMotionValue } from "motion/react";

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

// ─── Constants ────────────────────────────────────────────────────────────────

const IMG_WIDTH    = 60;
const IMG_HEIGHT   = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL   = 3000;
const SPRITE_COLS  = 4;
const SPRITE_ROWS  = Math.ceil(TOTAL_IMAGES / SPRITE_COLS); // 5

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

// ─── Position computation (pure, same logic as original) ──────────────────────

function computeTarget(
    i: number,
    phase: AnimationPhase,
    morphVal: number,
    rotateVal: number,
    parallaxVal: number,
    containerW: number,
    containerH: number,
    scatter: Array<{ x: number; y: number; rotation: number; scale: number; opacity: number }>
) {
    if (phase === "scatter") return scatter[i];

    if (phase === "line") {
        const lineSpacing    = 70;
        const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
        return { x: i * lineSpacing - lineTotalWidth / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
    }

    // circle phase + arc morph
    const isMobile     = containerW < 768;
    const minDimension = Math.min(containerW, containerH);
    const circleRadius = Math.min(minDimension * 0.35, 350);
    const circleAngle  = (i / TOTAL_IMAGES) * 360;
    const circleRad    = (circleAngle * Math.PI) / 180;
    const circlePos    = {
        x:        Math.cos(circleRad) * circleRadius,
        y:        Math.sin(circleRad) * circleRadius,
        rotation: circleAngle + 90,
    };

    const baseRadius  = Math.min(containerW, containerH * 1.5);
    const arcRadius   = baseRadius * (isMobile ? 1.4 : 1.1);
    const arcApexY    = containerH * (isMobile ? 0.35 : 0.25);
    const arcCenterY  = arcApexY + arcRadius;
    const spreadAngle = isMobile ? 100 : 130;
    const startAngle  = -90 - spreadAngle / 2;
    const step        = spreadAngle / (TOTAL_IMAGES - 1);

    const scrollProgress  = Math.min(Math.max(rotateVal / 360, 0), 1);
    const boundedRotation = -scrollProgress * spreadAngle * 0.8;
    const currentArcAngle = startAngle + i * step + boundedRotation;
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
    const containerRef = useRef<HTMLDivElement>(null);

    // Refs replace useState for values read inside rAF (avoids stale closures + re-renders)
    const introPhaseRef    = useRef<AnimationPhase>("scatter");
    const containerSizeRef = useRef({ width: 0, height: 0 });
    const scrollRef        = useRef(0);

    // Card DOM refs + per-card spring state (position + velocity)
    const cardRefs  = useRef<Array<HTMLDivElement | null>>(Array(TOTAL_IMAGES).fill(null));
    const cardState = useRef(
        Array.from({ length: TOTAL_IMAGES }, () => ({
            x: 0, y: 0, rot: 0, scale: 1, opacity: 0,
            vx: 0, vy: 0, vrot: 0, vscale: 0, vopa: 0,
        }))
    );

    // Intro text DOM refs (opacity driven by rAF, not React state)
    const introTextRef = useRef<HTMLDivElement>(null);
    const arcTextRef   = useRef<HTMLDivElement>(null);

    // Motion values — kept for spring smoothing of scroll + mouse (no React re-renders)
    const virtualScroll    = useMotionValue(0);
    const morphProgress    = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph      = useSpring(morphProgress, { stiffness: 40, damping: 20 });
    const scrollRotate     = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRot  = useSpring(scrollRotate, { stiffness: 40, damping: 20 });
    const mouseX           = useMotionValue(0);
    const smoothMouseX     = useSpring(mouseX, { stiffness: 30, damping: 20 });

    // Stable random scatter positions (generated once)
    const scatterPositions = useMemo(
        () => IMAGES.map(() => ({
            x:        (Math.random() - 0.5) * 1500,
            y:        (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale:    0.6,
            opacity:  0,
        })),
        []
    );

    // ── Sprite builder ───────────────────────────────────────────────────────
    // Loads all 20 images into one canvas → single blob URL → one GPU texture
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
                const col = idx % SPRITE_COLS;
                const row = Math.floor(idx / SPRITE_COLS);
                ctx.drawImage(img, col * IMG_WIDTH, row * IMG_HEIGHT, IMG_WIDTH, IMG_HEIGHT);

                if (++loaded < IMAGES.length) return;

                canvas.toBlob(blob => {
                    if (!blob) return;
                    const url = URL.createObjectURL(blob);
                    revoke = () => URL.revokeObjectURL(url);

                    // Swap all card backgrounds to the single sprite in one pass
                    cardRefs.current.forEach((el, i) => {
                        if (!el) return;
                        const c = i % SPRITE_COLS;
                        const r = Math.floor(i / SPRITE_COLS);
                        el.style.backgroundImage    = `url(${url})`;
                        el.style.backgroundSize     = `${IMG_WIDTH * SPRITE_COLS}px ${IMG_HEIGHT * SPRITE_ROWS}px`;
                        el.style.backgroundPosition = `-${c * IMG_WIDTH}px -${r * IMG_HEIGHT}px`;
                    });
                }, "image/webp", 0.85);
            };
            img.onerror = () => { if (++loaded === IMAGES.length) { /* sprite incomplete, individual fallbacks remain */ } };
            img.src = src;
        });

        return () => revoke?.();
    }, []);

    // ── Container resize → ref only, no re-render ────────────────────────────
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

    // ── Virtual scroll (identical to original) ────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            const atMax = scrollRef.current >= MAX_SCROLL;
            const atMin = scrollRef.current <= 0;
            if ((atMax && e.deltaY > 0) || (atMin && e.deltaY < 0)) return;
            e.preventDefault();
            const v = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = v;
            virtualScroll.set(v);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
        const handleTouchMove  = (e: TouchEvent) => {
            const deltaY = touchStartY - e.touches[0].clientY;
            touchStartY  = e.touches[0].clientY;
            const atMax  = scrollRef.current >= MAX_SCROLL;
            const atMin  = scrollRef.current <= 0;
            if ((atMax && deltaY > 0) || (atMin && deltaY < 0)) return;
            e.preventDefault();
            const v = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = v;
            virtualScroll.set(v);
        };

        container.addEventListener("wheel",      handleWheel,      { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove",  handleTouchMove,  { passive: false });
        return () => {
            container.removeEventListener("wheel",      handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove",  handleTouchMove);
        };
    }, [virtualScroll]);

    // ── Mouse parallax (identical to original) ────────────────────────────────
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

    // ── Intro phase timers ────────────────────────────────────────────────────
    useEffect(() => {
        const t1 = setTimeout(() => { introPhaseRef.current = "line";   }, 500);
        const t2 = setTimeout(() => { introPhaseRef.current = "circle"; }, 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    // ── rAF render loop: zero React re-renders per frame ─────────────────────
    // Custom spring: K=stiffness, D=velocity damping (tuned to match original feel)
    useEffect(() => {
        const K = 0.07;
        const D = 0.82;
        let rafId: number;

        const tick = () => {
            const morph   = smoothMorph.get();
            const rotate  = smoothScrollRot.get();
            const px      = smoothMouseX.get();
            const phase   = introPhaseRef.current;
            const { width: cw, height: ch } = containerSizeRef.current;

            for (let i = 0; i < TOTAL_IMAGES; i++) {
                const target = computeTarget(i, phase, morph, rotate, px, cw, ch, scatterPositions);
                const s      = cardState.current[i];
                const el     = cardRefs.current[i];
                if (!el) continue;

                s.vx     = s.vx     * D + (target.x        - s.x)       * K;
                s.vy     = s.vy     * D + (target.y        - s.y)       * K;
                s.vrot   = s.vrot   * D + (target.rotation - s.rot)     * K;
                s.vscale = s.vscale * D + (target.scale    - s.scale)   * K;
                s.vopa   = s.vopa   * D + (target.opacity  - s.opacity) * K;

                s.x       += s.vx;
                s.y       += s.vy;
                s.rot     += s.vrot;
                s.scale   += s.vscale;
                s.opacity += s.vopa;

                el.style.transform = `translate(${s.x}px,${s.y}px) rotate(${s.rot}deg) scale(${s.scale})`;
                el.style.opacity   = String(Math.max(0, Math.min(1, s.opacity)));
            }

            // Intro text — fades in at circle phase, fades out as morph progresses
            if (introTextRef.current) {
                const show = phase === "circle" ? Math.max(0, 1 - morph * 2) : 0;
                introTextRef.current.style.opacity = String(show);
            }

            // Arc content text — fades in once morph > 0.5
            if (arcTextRef.current) {
                const t   = Math.max(0, Math.min(1, (morph - 0.5) * 2));
                const top = lerp(10, 38, t);
                arcTextRef.current.style.opacity   = String(t);
                arcTextRef.current.style.top       = `${top}%`;
                arcTextRef.current.style.transform = `translateY(${lerp(20, 0, t)}px)`;
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [smoothMorph, smoothScrollRot, smoothMouseX, scatterPositions]);

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">

            {/* Intro text — opacity driven by rAF */}
            <div
                ref={introTextRef}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center pointer-events-none"
                style={{ opacity: 0 }}
            >
                <h1 className="text-2xl font-medium tracking-tight text-gray-800 md:text-4xl">
                    The future is built on AI.
                </h1>
                <p className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-500">
                    SCROLL TO EXPLORE
                </p>
            </div>

            {/* Arc content text — opacity + position driven by rAF */}
            <div
                ref={arcTextRef}
                className="absolute left-0 right-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4"
                style={{ opacity: 0, top: "10%" }}
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

            {/* Card container — centered, cards positioned absolutely via rAF */}
            <div className="relative flex items-center justify-center w-full h-full">
                {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                    const col = i % SPRITE_COLS;
                    const row = Math.floor(i / SPRITE_COLS);
                    return (
                        <div
                            key={i}
                            ref={el => { cardRefs.current[i] = el; }}
                            aria-hidden="true"
                            style={{
                                position:            "absolute",
                                width:               IMG_WIDTH,
                                height:              IMG_HEIGHT,
                                // Individual URL as fallback; sprite builder will override once ready
                                backgroundImage:     `url(${src})`,
                                backgroundSize:      "cover",
                                backgroundPosition:  "center",
                                backgroundRepeat:    "no-repeat",
                                borderRadius:        12,
                                boxShadow:           "0 4px 20px rgba(0,0,0,0.15)",
                                opacity:             0,
                                willChange:          "transform, opacity",
                                // Sprite position attributes stored for builder callback
                                // (dataset not used; builder reads index directly)
                            }}
                            data-col={col}
                            data-row={row}
                        />
                    );
                })}
            </div>
        </div>
    );
}
