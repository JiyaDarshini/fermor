"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { journeySteps, spending, actions, goal, type JourneyId } from "@/data/journey";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buildPaths } from "@/lib/chart";
import { inr } from "@/lib/format";
import { ArrowRight } from "lucide-react";

function UnderstandPreview() {
  return (
    <div>
      <p className="text-sm text-muted">Where your money went in September</p>
      <p className="num mt-1 font-serif text-4xl">{inr(58340)}</p>
      <ul className="mt-8 space-y-4">
        {spending.map((s) => (
          <li key={s.name}>
            <div className="flex justify-between text-sm">
              <span>{s.name}</span>
              <span className="num text-muted">{inr(s.amount)}</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full rounded-full bg-accent" style={{ width: `${s.share * 2}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-8 rounded-xl bg-accent-soft p-4 text-sm leading-6 text-accent-strong">
        Subscriptions are up ₹640 from August. Two of them haven&apos;t been used in 60 days.
      </p>
    </div>
  );
}

function ActPreview() {
  return (
    <div>
      <p className="text-sm text-muted">Three things worth doing this week</p>
      <ul className="mt-6 space-y-4">
        {actions.map((a, i) => (
          <li
            key={a.title}
            className={`flex items-center justify-between gap-4 rounded-2xl border p-4 ${
              i === 0 ? "border-accent bg-accent-soft/60" : "border-line bg-paper"
            }`}
          >
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-accent-strong">
                {a.tag}
              </span>
              <p className="mt-1 font-medium">{a.title}</p>
              <p className="num mt-1 text-sm text-muted">{a.impact}</p>
            </div>
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper"
              aria-hidden
            >
              <ArrowRight size={16} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GrowPreview() {
  const W = 360;
  const H = 120;
  const pct = Math.round((goal.saved / goal.target) * 100);
  const { line, area, last } = buildPaths(goal.series, W, H, 8, 0);
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted">{goal.name}</p>
          <p className="num mt-1 font-serif text-4xl">{inr(goal.saved)}</p>
          <p className="num mt-1 text-sm text-muted">of {inr(goal.target)} by {goal.date}</p>
        </div>
        <p className="num font-serif text-3xl text-accent">{pct}%</p>
      </div>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-line" aria-hidden>
        <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-6 h-auto w-full" aria-hidden>
        <path d={area} fill="#0b7a5c" fillOpacity="0.12" />
        <path d={line} fill="none" stroke="#0b7a5c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={last.x} cy={last.y} r="5" fill="#f6f3ec" stroke="#0b7a5c" strokeWidth="2.5" />
      </svg>
      <p className="mt-6 rounded-xl bg-accent-soft p-4 text-sm leading-6 text-accent-strong">
        You&apos;re on track. Adding ₹2,000 a month would bring the date forward by 5 months.
      </p>
    </div>
  );
}

const previews: Record<JourneyId, () => React.JSX.Element> = {
  understand: UnderstandPreview,
  act: ActPreview,
  grow: GrowPreview,
};

export function Journey() {
  const [active, setActive] = useState<JourneyId>("understand");
  const reduce = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = journeySteps.length - 1;
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(journeySteps[next].id);
    tabRefs.current[next]?.focus();
  };

  const Preview = previews[active];

  return (
    <section id="how-it-works" className="py-16 md:py-24" aria-labelledby="journey-title">
      <Container>
        <Reveal>
          <div className="max-w-[640px]">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">How it works</p>
            <h2 id="journey-title" className="mt-4 text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
              Three steps, in the order that makes sense
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div role="tablist" aria-label="Fermor journey" aria-orientation="vertical" className="flex flex-col">
            {journeySteps.map((s, i) => {
              const selected = s.id === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(s.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`group border-t border-line py-6 text-left transition-colors last:border-b ${
                    selected ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`num text-sm ${selected ? "text-accent" : ""}`}>{s.number}</span>
                    <span className="font-serif text-3xl tracking-tight">{s.title}</span>
                  </span>
                  <span className="mt-2 block pl-10 leading-7">{s.summary}</span>
                  {selected && (
                    <span className="mt-2 block pl-10 text-sm leading-6 text-muted">{s.detail}</span>
                  )}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`panel-${active}`}
            aria-labelledby={`tab-${active}`}
            tabIndex={0}
            className="min-h-[480px] rounded-3xl border border-line bg-card p-6 md:p-8"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Preview />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
