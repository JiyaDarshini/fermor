import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fraunces = localFont({
  src: "../fonts/fraunces-latin-wght-normal.woff2",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

const title = "Fermor: understand your money, act on it, grow it";
const description =
  "Fermor brings your accounts, investments and goals into one clear picture, then shows you the next sensible step.";

export const metadata: Metadata = {
  metadataBase: new URL("https://fermor.in"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Fermor",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
