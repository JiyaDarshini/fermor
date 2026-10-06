import { buildPaths } from "@/lib/chart";

const W = 1440;
const H = 640;

const lineA = [520, 500, 512, 470, 480, 430, 445, 400, 410, 360, 372, 330, 340, 290, 300, 250, 262, 215, 225, 180];
const lineB = [600, 585, 590, 560, 575, 540, 548, 520, 530, 495, 505, 470, 480, 455, 462, 430, 440, 410, 418, 390];

const candles = [
  { h: 40, wick: 14, up: true }, { h: 28, wick: 12, up: false }, { h: 52, wick: 16, up: true },
  { h: 36, wick: 10, up: true }, { h: 24, wick: 14, up: false }, { h: 60, wick: 18, up: true },
  { h: 44, wick: 12, up: true }, { h: 30, wick: 16, up: false }, { h: 68, wick: 14, up: true },
  { h: 48, wick: 12, up: true }, { h: 32, wick: 18, up: false }, { h: 76, wick: 16, up: true },
];

/** Decorative only. Pure SVG + CSS, no JS, hidden from assistive tech. */
export function FinanceBackground() {
  const a = buildPaths(lineA, W, H, 0, 0, H);
  const b = buildPaths(lineB, W, H, 0, 0, H);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, #000 60%, transparent 100%)",
      }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <pattern id="fx-grid" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0V64" fill="none" stroke="#111a17" strokeOpacity="0.06" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#fx-grid)" />

        <path
          className="fx-line"
          d={b.line}
          pathLength={1}
          fill="none"
          stroke="#111a17"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ animationDelay: "1.5s" }}
        />
        <path
          className="fx-line"
          d={a.line}
          pathLength={1}
          fill="none"
          stroke="#0b7a5c"
          strokeOpacity="0.45"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <svg
        viewBox="0 0 360 120"
        className="absolute bottom-8 right-0 hidden h-auto w-[360px] md:block"
      >
        {candles.map((c, i) => {
          const x = 12 + i * 28;
          const top = 100 - c.h;
          return (
            <g
              key={i}
              className="fx-candle"
              style={{ animationDelay: `${i * 0.35}s` }}
            >
              <line x1={x + 6} x2={x + 6} y1={top - c.wick} y2={100 + c.wick / 2} stroke={c.up ? "#0b7a5c" : "#111a17"} strokeOpacity="0.35" />
              <rect x={x} y={top} width="12" height={c.h} rx="2" fill={c.up ? "#0b7a5c" : "#111a17"} fillOpacity={c.up ? 0.22 : 0.14} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
