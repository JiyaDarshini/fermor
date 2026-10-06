export type ChartPaths = {
  line: string;
  area: string;
  last: { x: number; y: number };
  points: { x: number; y: number }[];
};

/** Turns a series into SVG line + area paths inside a w x h box. */
export function buildPaths(
  values: number[],
  w: number,
  h: number,
  pad = 8,
  min?: number,
  max?: number
): ChartPaths {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  const points = values.map((v, i) => ({
    x: pad + i * step,
    y: pad + (h - pad * 2) * (1 - (v - lo) / span),
  }));
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const last = points[points.length - 1];
  const area = `${line} L${last.x.toFixed(1)} ${h} L${points[0].x.toFixed(1)} ${h} Z`;
  return { line, area, last, points };
}
