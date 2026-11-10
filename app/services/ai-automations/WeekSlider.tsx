"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import "./week.css";

type Block = {
  day: number;
  start: number;
  len: number;
  label: string;
  kind: "busy" | "keep";
  /** keep blocks only: position in the after state (expanded into freed time) */
  after?: { start: number; len: number };
  /** keep blocks only: exists only in the after state */
  afterOnly?: boolean;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const FIRST = 9;
const HOURS = 9;
const TIMES = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];
const h12 = (h: number) => ((h - 1) % 12) + 1;

const BLOCKS: Block[] = [
  { day: 0, start: 9, len: 1, label: "Missed calls", kind: "busy" },
  { day: 0, start: 10, len: 2, label: "Client call", kind: "keep" },
  { day: 0, start: 12, len: 1, label: "Copy-paste data", kind: "busy" },
  { day: 0, start: 15, len: 2, label: "Strategy", kind: "keep" },
  { day: 0, start: 12, len: 3, label: "Deep work", kind: "keep", afterOnly: true },
  { day: 1, start: 9, len: 1, label: "Slow lead replies", kind: "busy" },
  { day: 1, start: 10, len: 2, label: "Content backlog", kind: "busy" },
  { day: 1, start: 13, len: 3, label: "Deep work", kind: "keep", after: { start: 11, len: 5 } },
  { day: 1, start: 16, len: 2, label: "Hiring paperwork", kind: "busy" },
  { day: 2, start: 9, len: 2, label: "Ad creatives", kind: "busy" },
  { day: 2, start: 11, len: 1, label: "Team 1:1", kind: "keep" },
  { day: 2, start: 12, len: 2, label: "Proposals take days", kind: "busy" },
  { day: 2, start: 15, len: 2, label: "Product review", kind: "keep" },
  { day: 2, start: 17, len: 1, label: "Missed calls", kind: "busy" },
  { day: 3, start: 9, len: 1, label: "Chasing invoices", kind: "busy" },
  { day: 3, start: 10, len: 2, label: "Client call", kind: "keep" },
  { day: 3, start: 13, len: 2, label: "Copy-paste data", kind: "busy" },
  { day: 3, start: 13, len: 2, label: "Strategy", kind: "keep", afterOnly: true },
  { day: 4, start: 9, len: 2, label: "Content backlog", kind: "busy" },
  { day: 4, start: 12, len: 2, label: "Strategy", kind: "keep", after: { start: 11, len: 3 } },
];


function Calendar({ after }: { after: boolean }) {
  const blocks = BLOCKS.filter((b) => (after ? b.kind === "keep" : !b.afterOnly));
  return (
    <div className={`ws-cal ${after ? "ws-after" : "ws-before"}`} aria-hidden="true">
      <div className="ws-gutter">
        {TIMES.map((t) => (
          <span key={t} className="ws-time">{t}</span>
        ))}
        <span className="ws-time ws-time-end">6pm</span>
      </div>
      {DAYS.map((d, day) => (
        <div key={d} className="ws-day" data-day={day}>
          <div className="ws-dayname">{d}</div>
          <div className="ws-col">
            {blocks
              .filter((b) => b.day === day)
              .map((b) => {
                const s = after && b.after ? b.after.start : b.start;
                const l = after && b.after ? b.after.len : b.len;
                return (
                  <div
                    key={`${b.label}-${b.start}`}
                    className={`ws-block ws-${b.kind}${l < 2 ? " is-short" : ""}`}
                    style={{
                      // 2px inset top and bottom so stacked blocks never touch
                      top: `calc(${((s - FIRST) / HOURS) * 100}% + 2px)`,
                      height: `calc(${(l / HOURS) * 100}% - 4px)`,
                    }}
                  >
                    <b>{b.label}</b>
                    {l >= 2 && <span>{h12(s)}–{h12(s + l)}</span>}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WeekSlider() {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const sweep = useRef<{ stop: () => void } | null>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const stopSweep = () => {
    sweep.current?.stop();
    sweep.current = null;
  };

  const fromX = useCallback((x: number) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r || !r.width) return;
    setPos(Math.min(100, Math.max(0, Math.round(((x - r.left) / r.width) * 100))));
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setPos(85);
        const a = animate(85, 15, { duration: 1.4, ease: "easeOut", onUpdate: setPos });
        sweep.current = a;
        a.then(() => {
          if (!sweep.current) return;
          const b = animate(15, 50, { duration: 1, ease: "easeOut", onUpdate: setPos });
          sweep.current = b;
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      sweep.current?.stop();
    };
  }, [reduce]);

  return (
    <figure className="ws">
      <div
        ref={stage}
        className="ws-stage"
        onPointerDown={(e) => {
          stopSweep();
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          fromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <Calendar after={false} />
        <div className="ws-top" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
          <Calendar after />
        </div>
        <span className="ws-chip ws-chip-l">Your week now</span>
        <span className="ws-chip ws-chip-r">With automation</span>
        <div className="ws-handle" style={{ transform: `translateX(${pos}%)` }} aria-hidden="true">
          <span className="ws-line" />
          <span className="ws-knob">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
        <input
          className="ws-range"
          type="range"
          min={0}
          max={100}
          value={pos}
          aria-label="Compare your week before and after automation"
          aria-valuetext={`${pos}% after automation`}
          onChange={(e) => {
            stopSweep();
            setPos(Number(e.target.value));
          }}
          onPointerDown={(e) => e.stopPropagation()}
        />
      </div>
    </figure>
  );
}
