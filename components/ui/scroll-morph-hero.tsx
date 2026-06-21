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
const SPRITE_ROWS  = Math.ceil(TOTAL_IMAGES / SPRITE_COLS);

// Scroll ranges for each phase transition
const SCATTER_TO_LINE_START   = 0;
const SCATTER_TO_LINE_END     = 600;
const LINE_TO_CIRCLE_START    = 600;
const LINE_TO_CIRCLE_END      = 1200;
const CIRCLE_TO_ARC_START     = 1200;
const CIRCLE_TO_ARC_END       = 2200;
const ARC_ROTATE_START        = 1600;
const ARC_ROTATE_END          = 3000;
const INTRO_TEXT_IN_START     = 900;
const INTRO_TEXT_IN_END       = 1100;
const INTRO_TEXT_OUT_START    = 1600;
const INTRO_TEXT_OUT_END      = 1800;
const ARC_TEXT_IN_START       = 1800;
const ARC_TEXT_IN_END         = 2100;

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

// ─── Position computation ─────────────────────────────────────────────────────
// All phases are continuous lerps driven by scrolled motion values.
// lineT: 0=scatter 1=line | circleT: 0=line 1=circle | arcT: 0=circle 1=arc

function computeTarget(
    i: number,
    lineT: number,
    circleT: number,
    arcT: number,
    rotateT: number,
    parallaxVal: number,
    containerW: number,
    containerH: number,
    scatter: Array<{ x: number; y: number; rotation: number; scale: number; opacity: number }>
) {
    const sp = scatter[i];

    // Line position
    const lineSpacing = 70;
    const lx = i * lineSpacing - (TOTAL_IMAGES * lineSpacing) / 2;
    const lp = { x: lx, y: 0, rot: 0, scale: 1, opacity: 1 };

    // Circle position
    const circleAngle = (i / TOTAL_IMAGES) * 360;
    const circleRad   = (circleAngle * Math.PI) / 180;
    const circleR     = Math.min(Math.min(containerW, containerH) * 0.35, 350);
    const cp = {
        x:    Math.cos(circleRad) * circleR,
        y:    Math.sin(circleRad) * circleR,
        rot:  circleAngle + 90,
        scale:   1,
        opacity: 1,
    };

    // Arc position (same geometry as original)
    const isMobile    = containerW < 768;
    const baseRadius  = Math.min(containerW, containerH * 1.5);
    const arcRadius   = baseRadius * (isMobile ? 1.4 : 1.1);
    const arcApexY    = containerH * (isMobile ? 0.35 : 0.25);
    const arcCenterY  = arcApexY + arcRadius;
    const spreadAngle = isMobile ? 100 : 130;
    const startAngle  = -90 - spreadAngle / 2;
    const step        = spreadAngle / (TOTAL_IMAGES - 1);

    const scrollProgress  = Math.min(Math.max(rotateT / 360, 0), 1);
    const boundedRotation = -scrollProgress * spreadAngle * 0.8;
    const currentArcAngle = startAngle + i * step + boundedRotation;
    const arcRad          = (currentArcAngle * Math.PI) / 180;
    const ap = {
        x:    Math.cos(arcRad) * arcRadius + parallaxVal,
        y:    Math.sin(arcRad) * arcRadius + arcCenterY,
        rot:  currentArcAngle + 90,
        scale:   isMobile ? 1.4 : 1.8,
        opacity: 1,
    };

    // Lerp through phases: scatter → line → circle → arc
    const p1 = {
        x:       lerp(sp.x,        lp.x,    lineT),
        y:       lerp(sp.y,        lp.y,    lineT),
        rot:     lerp(sp.rotation, lp.rot,  lineT),
        scale:   lerp(sp.scale,    lp.scale,   lineT),
        opacity: lerp(sp.opacity,  lp.opacity, lineT),
    };
    const p2 = {
        x:       lerp(p1.x,   cp.x,    circleT),
        y:       lerp(p1.y,   cp.y,    circleT),
        rot:     lerp(p1.rot, cp.rot,  circleT),
        scale:   lerp(p1.scale,   cp.scale,   circleT),
        opacity: lerp(p1.opacity, cp.opacity, circleT),
    };
    return {
        x:        lerp(p2.x,   ap.x,   arcT),
        y:        lerp(p2.y,   ap.y,   arcT),
        rotation: lerp(p2.rot, ap.rot, arcT),
        scale:    lerp(p2.scale,   ap.scale,   arcT),
        opacity:  lerp(p2.opacity, ap.opacity, arcT),
    };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function IntroAnimation() {
    const containerRef     = useRef<HTMLDivElement>(null);
    const containerSizeRef = useRef({ width: 0, height: 0 });
    const scrollRef        = useRef(0);

    const cardRefs  = useRef<Array<HTMLDivElement | null>>(Array(TOTAL_IMAGES).fill(null));
    const introTextRef = useRef<HTMLDivElement>(null);
    const arcTextRef   = useRef<HTMLDivElement>(null);

    // ── Motion values ─────────────────────────────────────────────────────────
    const virtualScroll = useMotionValue(0);

    // Phase lerp factors (raw, 0→1)
    const rawLineT   = useTransform(virtualScroll, [SCATTER_TO_LINE_START,  SCATTER_TO_LINE_END],  [0, 1]);
    const rawCircleT = useTransform(virtualScroll, [LINE_TO_CIRCLE_START,   LINE_TO_CIRCLE_END],   [0, 1]);
    const rawArcT    = useTransform(virtualScroll, [CIRCLE_TO_ARC_START,    CIRCLE_TO_ARC_END],    [0, 1]);
    const rawRotateT = useTransform(virtualScroll, [ARC_ROTATE_START,       ARC_ROTATE_END],       [0, 360]);

    // Text opacity
    const rawIntroOpa = useTransform(
        virtualScroll,
        [INTRO_TEXT_IN_START, INTRO_TEXT_IN_END, INTRO_TEXT_OUT_START, INTRO_TEXT_OUT_END],
        [0, 1, 1, 0]
    );
    const rawArcOpa  = useTransform(virtualScroll, [ARC_TEXT_IN_START, ARC_TEXT_IN_END], [0, 1]);
    const rawArcTop  = useTransform(virtualScroll, [ARC_TEXT_IN_START, ARC_TEXT_IN_END], [10, 38]);
    const rawArcY    = useTransform(virtualScroll, [ARC_TEXT_IN_START, ARC_TEXT_IN_END], [20, 0]);

    // Spring smooth everything — same params as original (stiffness:40 damping:20/15)
    const SPRING_SLOW = { stiffness: 40, damping: 20 } as const;
    const lineT    = useSpring(rawLineT,   SPRING_SLOW);
    const circleT  = useSpring(rawCircleT, SPRING_SLOW);
    const arcT     = useSpring(rawArcT,    SPRING_SLOW);
    const rotateT  = useSpring(rawRotateT, SPRING_SLOW);
    const introOpa = useSpring(rawIntroOpa, SPRING_SLOW);
    const arcOpa   = useSpring(rawArcOpa,   SPRING_SLOW);
    const arcTop   = useSpring(rawArcTop,   SPRING_SLOW);
    const arcY     = useSpring(rawArcY,     SPRING_SLOW);

    const mouseX       = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    // Stable scatter positions
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

    // ── Sprite builder ────────────────────────────────────────────────────────
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

    // ── Container resize → ref (no re-render) ────────────────────────────────
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

    // ── Virtual scroll ────────────────────────────────────────────────────────
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

    // ── rAF loop: read sprung motion values → mutate DOM directly ────────────
    useEffect(() => {
        let rafId: number;

        const tick = () => {
            const lt = lineT.get();
            const ct = circleT.get();
            const at = arcT.get();
            const rt = rotateT.get();
            const px = smoothMouseX.get();
            const { width: cw, height: ch } = containerSizeRef.current;

            for (let i = 0; i < TOTAL_IMAGES; i++) {
                const target = computeTarget(i, lt, ct, at, rt, px, cw, ch, scatterPositions);
                const el = cardRefs.current[i];
                if (!el) continue;
                el.style.transform = `translate(${target.x}px,${target.y}px) rotate(${target.rotation}deg) scale(${target.scale})`;
                el.style.opacity   = String(Math.max(0, Math.min(1, target.opacity)));
            }

            if (introTextRef.current) {
                introTextRef.current.style.opacity = String(Math.max(0, introOpa.get()));
            }
            if (arcTextRef.current) {
                const opa = Math.max(0, Math.min(1, arcOpa.get()));
                arcTextRef.current.style.opacity   = String(opa);
                arcTextRef.current.style.top       = `${arcTop.get()}%`;
                arcTextRef.current.style.transform = `translateY(${arcY.get()}px)`;
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [lineT, circleT, arcT, rotateT, smoothMouseX, introOpa, arcOpa, arcTop, arcY, scatterPositions]);

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden">

            {/* Intro text — visible during circle phase */}
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

            {/* Arc content text — fades in with arc phase */}
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

            {/* Cards — positions driven by rAF loop above */}
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
                            boxShadow:          "0 4px 20px rgba(0,0,0,0.15)",
                            opacity:            0,
                            willChange:         "transform, opacity",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
