"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ERAS,
  SERVICES_ROWS,
  THINKING,
  WORKING,
  identity,
} from "@/content/about";
import { STATS } from "./data";
import {
  Arrow,
  CountUp,
  HoverLetters,
  InfinityMark,
  KineticTitle,
  Magnetic,
  ParallaxPhoto,
  Photo,
  Reveal,
  ScrollWords,
  Star,
  ease,
} from "./ui";

const HV = ERAS.map((e) => e.img);
const HV_GAP = 150;
const HV_BLOCK = "a, button, h1, .wv-page-lead, .wv-crumbs";

/** Mouse-only (desktop) photo trail. One sticky lead photo springs after the cursor; every HV_GAP px it drops a tile and the lead changes photo. */
function HeroPhotos({ host }: { host: React.RefObject<HTMLElement | null> }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 16, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 140, damping: 16, mass: 0.5 });
  const [on, setOn] = useState(false);
  const [over, setOver] = useState(false);
  const [lead, setLead] = useState(0);
  const [slots, setSlots] = useState(() =>
    HV.map(() => ({ x: 0, y: 0, r: 0, t: 0 })),
  );
  const last = useRef({ x: -999, y: -999, n: 0 });

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const move = (ev: PointerEvent) => {
      if (ev.pointerType !== "mouse") return;
      const b = el.getBoundingClientRect();
      const x = ev.clientX - b.left;
      const y = ev.clientY - b.top;
      mx.set(x);
      my.set(y);
      setOn(true);
      const blocked = (ev.target as Element).closest(HV_BLOCK) !== null;
      setOver(blocked);
      if (blocked) return;
      const l = last.current;
      if (Math.hypot(x - l.x, y - l.y) > HV_GAP) {
        const i = l.n % HV.length;
        const r = ((l.n * 7) % 13) - 6;
        setSlots((s) =>
          s.map((v, k) => (k === i ? { x, y, r, t: v.t + 1 } : v)),
        );
        l.x = x;
        l.y = y;
        l.n += 1;
        setLead(l.n % HV.length);
      }
    };
    const leave = () => setOn(false);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [host, mx, my]);

  return (
    <div className={`wv-hv${over ? " is-over" : ""}`} aria-hidden>
      <motion.div
        className="wv-hv-tiles"
        animate={{ opacity: over ? 0 : 1, scale: over ? 0.96 : 1 }}
        transition={{ duration: 0.7, ease }}
      >
        {slots.map((s, i) => (
          <motion.div
            key={`${i}-${s.t}`}
            className="wv-hv-tile"
            style={{ left: s.x, top: s.y, x: "-50%", y: "-50%", rotate: s.r }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={
              s.t
                ? { scale: [0.6, 1, 1, 0.92], opacity: [0, 1, 1, 0] }
                : { opacity: 0 }
            }
            transition={{ duration: 1.5, times: [0, 0.15, 0.7, 1], ease }}
          >
            <Photo src={HV[i].src} alt="" sizes="220px" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="wv-hv-lead"
        style={{ left: sx, top: sy, x: "-50%", y: "-50%" }}
        animate={{ opacity: on && !over ? 1 : 0, scale: on && !over ? 1 : 0.6 }}
        transition={{ duration: 0.7, ease }}
      >
        {HV.map((p, i) => (
          <div key={p.src} className={i === lead ? "is-on" : ""}>
            <Photo src={p.src} alt="" sizes="220px" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  return (
    <section className="wv-page wv-ab-hero" ref={ref}>
      <div className="wv-grid-bg" aria-hidden />
      <HeroPhotos host={ref} />
      <motion.div className="wv-wrap" style={{ opacity, y }}>
        <nav className="wv-crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden>/</span>
          <span>About</span>
        </nav>
        <h1 className="wv-h1 wv-page-h1">
          <KineticTitle
            as="span"
            lines={["A creative studio", "for everything digital"]}
            delay={0.1}
          />
        </h1>
        <Reveal delay={0.45}>
          <p className="wv-page-lead">
            Website Vikreta is a UI/UX design and web development studio in
            Pune, India. Since August 2020 we&apos;ve shipped 68+ websites, apps
            and digital products for businesses around the world, and today we
            add AI automation where it saves a team real time.
          </p>
          <div className="wv-cta-row">
            <Magnetic>
              <Link href="#roadmap" className="wv-btn wv-btn-y">
                See how we got here <Arrow />
              </Link>
            </Magnetic>
            <Link href="/contact" className="wv-btn wv-btn-ghost">
              Talk to us
            </Link>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}

function Identity() {
  return (
    <section className="wv-sec wv-ab-id" aria-label="Who we are">
      <div className="wv-wrap">
        <ScrollWords text={identity()} className="wv-big-p" />
        <div className="wv-ab-facts">
          {[
            "Founded August 2020",
            "Pune, India",
            "Clients across the globe",
            "AI services since 2025",
          ].map((f, i) => (
            <Reveal key={f} delay={0.08 * i}>
              <span>
                <Star /> {f}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Roadmap() {
  const [a, setA] = useState(0);
  const list = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const { scrollYProgress } = useScroll({
    target: list,
    offset: ["start 0.6", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) =>
            e.isIntersecting &&
            setA(Number((e.target as HTMLElement).dataset.i)),
        ),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = ERAS[a];
  return (
    <section className="wv-sec wv-rm" id="roadmap" aria-label="Roadmap">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle
            lines={["The road", "so far"]}
            accent={1}
            className="wv-h2"
          />
          <Reveal className="wv-sec-aside">
            <p>
              From hand-written websites to design, apps, marketing and AI, one
              line of business at a time.
            </p>
          </Reveal>
        </div>
        <div className="wv-rm-grid">
          <div className="wv-rm-rail" aria-hidden>
            <div className="wv-rm-year">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={cur.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className={cur.inf ? "is-inf" : ""}
                >
                  {cur.inf ? <InfinityMark /> : cur.year}
                </motion.span>
              </AnimatePresence>
            </div>
            <ul className="wv-rm-dots">
              {ERAS.map((e, i) => (
                <li
                  key={e.id}
                  className={i === a ? "is-on" : i < a ? "is-past" : ""}
                >
                  {e.inf ? "∞" : e.year}
                </li>
              ))}
            </ul>
          </div>
          <div className="wv-rm-list" ref={list}>
            <motion.i className="wv-rm-line" style={{ scaleY }} aria-hidden />
            {ERAS.map((e, i) => (
              <article
                key={e.id}
                id={e.id}
                data-i={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`wv-rm-era${i === a ? " is-on" : ""}`}
              >
                <p className="wv-rm-y">
                  <span className="wv-rm-yt">
                    {e.inf ? <InfinityMark /> : e.year}
                  </span>
                  {e.now && (
                    <span className="wv-pill">
                      <i className="wv-dot" /> We are here
                    </span>
                  )}
                </p>
                <ParallaxPhoto
                  src={e.img.src}
                  alt={e.img.alt}
                  className="wv-rm-img"
                  sizes="(min-width: 960px) 46vw, 100vw"
                />
                <h3>
                  <KineticTitle as="span" lines={e.headline} />
                </h3>
                <Reveal delay={0.15}>
                  <p className="wv-rm-why">{e.why}</p>
                </Reveal>
                {e.beats.length > 0 && (
                  <div className="wv-card-tags">
                    {e.beats.map((b, k) => (
                      <motion.span
                        key={b}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-8% 0px" }}
                        transition={{
                          duration: 0.5,
                          ease,
                          delay: 0.25 + 0.05 * k,
                        }}
                      >
                        {b}
                      </motion.span>
                    ))}
                  </div>
                )}
                <div className="wv-rm-links">
                  {e.links.map((l) => (
                    <Link key={l.href} href={l.href} className="wv-link">
                      {l.t} <Arrow size={14} />
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="wv-stats" aria-label="Numbers">
      <div className="wv-wrap wv-stats-in">
        <KineticTitle
          lines={["The numbers", "so far"]}
          className="wv-h2 is-dark"
        />
        <div className="wv-stats-grid">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={0.06 * i} className="wv-stat">
              <strong>
                <CountUp to={s.n} suffix={s.suffix} />
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rows({
  items,
  link,
}: {
  items: readonly { t: string; d: string; href?: string }[];
  link?: boolean;
}) {
  return (
    <div className="wv-ab-rows">
      {items.map((r, i) => (
        <Reveal key={r.t} delay={0.05 * i}>
          {link && r.href ? (
            <Link href={r.href} className="wv-ab-row">
              <h3>
                <HoverLetters text={r.t} />
              </h3>
              <p>{r.d}</p>
              <Arrow size={22} />
            </Link>
          ) : (
            <div className="wv-ab-row">
              <h3>{r.t}</h3>
              <p>{r.d}</p>
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}

function WhatWeDo() {
  return (
    <section className="wv-sec" aria-label="What we do">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle
            lines={["What we", "take care of"]}
            accent={1}
            className="wv-h2"
          />
          <Reveal className="wv-sec-aside">
            <p>
              Six lines of business under one roof, each one a page of its own.
            </p>
            <Link href="/work" className="wv-link">
              See the work <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <Rows items={SERVICES_ROWS} link />
      </div>
    </section>
  );
}

function HowWeWork() {
  return (
    <section className="wv-sec wv-ab-work" aria-label="How we work">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle
            lines={["How we", "work"]}
            accent={1}
            className="wv-h2"
          />
          <Reveal className="wv-sec-aside">
            <p>The same rhythm on every project, since the first one.</p>
            <Link href="/faq" className="wv-link">
              Common questions <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <div className="wv-ab-cards">
          {WORKING.map((w, i) => (
            <Reveal key={w.t} delay={0.06 * i} className="wv-ab-card">
              <Star />
              <h3>{w.t}</h3>
              <p>{w.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeThink() {
  return (
    <section className="wv-sec" aria-label="How we think">
      <div className="wv-wrap">
        <div className="wv-sec-head">
          <KineticTitle
            lines={["How we", "decide"]}
            accent={1}
            className="wv-h2"
          />
          <Reveal className="wv-sec-aside">
            <p>The filter every project runs through.</p>
            <Link href="/careers" className="wv-link">
              Work with us <Arrow size={14} />
            </Link>
          </Reveal>
        </div>
        <Rows items={THINKING} />
      </div>
    </section>
  );
}

export function AboutPageBody() {
  return (
    <main>
      <Hero />
      <Identity />
      <Roadmap />
      <Numbers />
      <WhatWeDo />
      <HowWeWork />
      <HowWeThink />
    </main>
  );
}
