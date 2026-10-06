import { ImageResponse } from "next/og";

export const alt = "Fermor: understand your money, act on it, grow it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ec",
          color: "#111a17",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 48, display: "flex" }}>
          Fermor<span style={{ color: "#0b7a5c" }}>.</span>
        </div>
        <div style={{ fontSize: 88, lineHeight: 1.05, maxWidth: 900 }}>
          Know where your money stands. Then make it grow.
        </div>
        <div style={{ fontSize: 28, color: "#55605b" }}>Understand · Act · Grow</div>
      </div>
    ),
    size
  );
}
