import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { heroCopy, netWorth } from "@/data/hero";
import { Container } from "@/components/ui/Container";
import { FinanceBackground } from "@/components/ui/FinanceBackground";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { buildPaths } from "@/lib/chart";
import { inr } from "@/lib/format";

function NetWorthCard() {
  const W = 400;
  const H = 140;
  const { line, area, last } = buildPaths(netWorth.series, W, H, 8);

  return (
    <div
      role="img"
      aria-label={`Example Fermor dashboard. Net worth ${inr(netWorth.total)}, up ${netWorth.changePct} percent this month.`}
      className="relative w-full max-w-[480px] rounded-3xl border border-line bg-card p-6 shadow-[0_24px_48px_-24px_rgba(17,26,23,0.25)] md:p-8"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">Net worth</p>
          <p className="num mt-1 font-serif text-4xl tracking-tight md:text-5xl">
            {inr(netWorth.total)}
          </p>
        </div>
        <span className="num inline-flex items-center gap-1 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-strong">
          <ArrowUpRight size={16} aria-hidden />
          {netWorth.changePct}%
        </span>
      </div>
      <p className="num mt-2 text-sm text-muted">
        +{inr(netWorth.change)} since last month
      </p>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 h-auto w-full"
        aria-hidden
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#0b7a5c" stopOpacity="0.18" />
            <stop offset="1" stopColor="#0b7a5c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1="0"
            x2={W}
            y1={H * g}
            y2={H * g}
            stroke="#ddd8cb"
            strokeDasharray="2 6"
          />
        ))}
        <path d={area} fill="url(#hero-area)" />
        <path d={line} fill="none" stroke="#0b7a5c" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={last.x} cy={last.y} r="5" fill="#f6f3ec" stroke="#0b7a5c" strokeWidth="2.5" />
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted" aria-hidden>
        {netWorth.months.map((m, i) => (
          <span key={`${m}-${i}`}>{m}</span>
        ))}
      </div>

      <ul className="mt-6 space-y-2 border-t border-line pt-6">
        {netWorth.holdings.map((h, i) => (
          <li key={h.name} className="flex items-center gap-4 text-sm">
            <span className="w-32 shrink-0">{h.name}</span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full"
                style={{
                  width: `${h.share}%`,
                  background: ["#0b7a5c", "#111a17", "#9a9588"][i],
                }}
              />
            </span>
            <span className="num w-24 text-right text-muted">{inr(h.amount)}</span>
          </li>
        ))}
      </ul>

      {/* Floating next-step chip */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-ink p-4 text-paper md:absolute md:-bottom-8 md:-left-12 md:mt-0 md:max-w-[320px] md:shadow-xl">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent">
          <Check size={16} aria-hidden />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-paper/60">Next step</p>
          <p className="mt-1 text-sm leading-6">{netWorth.nudge}</p>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-16 pt-12 md:pb-24 md:pt-24" aria-labelledby="hero-title">
      <FinanceBackground />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">
              {heroCopy.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              id="hero-title"
              className="mt-6 max-w-[14ch] text-[length:var(--text-display)] leading-[var(--text-display--line-height)]"
            >
              {heroCopy.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[48ch] text-lg leading-8 text-muted">
              {heroCopy.sub}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button href={heroCopy.primary.href}>
                {heroCopy.primary.label}
                <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href={heroCopy.secondary.href} variant="secondary">
                {heroCopy.secondary.label}
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{heroCopy.note}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="flex justify-center lg:justify-end">
          <div className="pb-0 md:pb-8 md:pl-12">
            <NetWorthCard />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
