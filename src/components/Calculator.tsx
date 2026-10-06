"use client";

import { useId, useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { buildPaths } from "@/lib/chart";
import { inr, inrCompact } from "@/lib/format";

function futureValue(monthly: number, years: number, annualPct: number) {
  const n = years * 12;
  const r = annualPct / 100 / 12;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
  minLabel: string;
  maxLabel: string;
};

function Slider({ label, value, min, max, step, display, onChange, minLabel, maxLabel }: SliderProps) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        <output htmlFor={id} className="num font-serif text-2xl">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-4"
      />
      <div className="mt-2 flex justify-between text-xs text-muted" aria-hidden>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

export function Calculator() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(11);

  const result = useMemo(() => {
    const valueSeries: number[] = [];
    const investedSeries: number[] = [];
    for (let y = 0; y <= years; y++) {
      valueSeries.push(futureValue(monthly, y, rate));
      investedSeries.push(monthly * 12 * y);
    }
    const total = valueSeries[years];
    const invested = investedSeries[years];
    return { valueSeries, investedSeries, total, invested, gains: total - invested };
  }, [monthly, years, rate]);

  const W = 640;
  const H = 280;
  const max = result.total || 1;
  const value = buildPaths(result.valueSeries, W, H, 16, 0, max);
  const invested = buildPaths(result.investedSeries, W, H, 16, 0, max);
  const gainShare = result.total ? Math.round((result.gains / result.total) * 100) : 0;

  return (
    <section id="calculator" className="bg-card py-16 md:py-24" aria-labelledby="calc-title">
      <Container>
        <Reveal>
          <div className="max-w-[640px]">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-accent">Try it yourself</p>
            <h2 id="calc-title" className="mt-4 text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
              See what steady saving can become
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Move the sliders. The numbers update as you go, and nothing leaves your browser.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="space-y-8">
            <Slider
              label="Monthly amount"
              value={monthly}
              min={500}
              max={100000}
              step={500}
              display={inr(monthly)}
              onChange={setMonthly}
              minLabel="₹500"
              maxLabel="₹1,00,000"
            />
            <Slider
              label="For how long"
              value={years}
              min={1}
              max={40}
              step={1}
              display={`${years} ${years === 1 ? "year" : "years"}`}
              onChange={setYears}
              minLabel="1 year"
              maxLabel="40 years"
            />
            <Slider
              label="Expected yearly return"
              value={rate}
              min={4}
              max={16}
              step={0.5}
              display={`${rate.toFixed(1)}%`}
              onChange={setRate}
              minLabel="4%"
              maxLabel="16%"
            />
            <p className="text-sm leading-6 text-muted">
              An illustration, not a forecast. Real returns change from year to year and can be negative.
            </p>
          </div>

          <div className="rounded-3xl bg-ink p-6 text-paper md:p-8">
            <div aria-live="polite" className="grid gap-6 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <p className="text-sm text-paper/70">You could have</p>
                <p className="num mt-1 font-serif text-4xl tracking-tight">{inrCompact(result.total)}</p>
                <p className="sr-only">{inr(result.total)}</p>
              </div>
              <div>
                <p className="text-sm text-paper/70">You put in</p>
                <p className="num mt-1 font-serif text-2xl">{inrCompact(result.invested)}</p>
              </div>
              <div>
                <p className="text-sm text-paper/70">Growth ({gainShare}%)</p>
                <p className="num mt-1 font-serif text-2xl text-[#7fd3b4]">+{inrCompact(result.gains)}</p>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${W} ${H}`}
              role="img"
              aria-label={`Chart: investing ${inr(monthly)} a month for ${years} years at ${rate} percent grows to about ${inr(result.total)}, of which ${inr(result.invested)} is your own money.`}
              className="mt-8 h-auto w-full"
            >
              {[0.25, 0.5, 0.75].map((g) => (
                <line key={g} x1="16" x2={W - 16} y1={H * g} y2={H * g} stroke="#f6f3ec" strokeOpacity="0.12" strokeDasharray="2 6" />
              ))}
              <path d={value.area} fill="#7fd3b4" fillOpacity="0.18" />
              <path d={value.line} fill="none" stroke="#7fd3b4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <path d={invested.line} fill="none" stroke="#f6f3ec" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx={value.last.x} cy={value.last.y} r="5" fill="#111a17" stroke="#7fd3b4" strokeWidth="3" />
            </svg>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-paper/70">
              <span aria-hidden>Today</span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-4 bg-[#7fd3b4]" aria-hidden /> Total value
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-0.5 w-4 border-t-2 border-dashed border-paper/70" aria-hidden /> Your money
                </span>
              </span>
              <span aria-hidden>Year {years}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
