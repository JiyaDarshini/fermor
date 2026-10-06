/** Indian digit grouping, e.g. 1842650 -> "18,42,650" */
export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

/** Compact form for chart labels, e.g. 1842650 -> "₹18.4 L" */
export const inrCompact = (n: number) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(1)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
};
