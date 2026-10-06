# Fermor homepage

A new homepage for Fermor, built with Next.js (App Router), TypeScript, Tailwind CSS 4, Framer Motion and lucide-react.

## Product brief

1. **Who it's for:** young professionals and first-time investors who find finance confusing.
2. **Core promise:** understand your money, act on it, then grow it, one clear step at a time.
3. **Tone:** calm, confident, plain English. No jargon, no hype.
4. **Visual direction:** editorial and quiet. Warm paper background, deep green-black ink, one green accent, a serif for headlines.
5. **Product context:** public descriptions of Fermor suggest an India focus (₹, SIP, direct plans) and an information-and-education stance, so the page avoids advice-style claims and carries a clear disclaimer.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

Requires Node 20+.

## Structure

```
src/
  app/            layout.tsx (fonts, metadata), page.tsx, icon.svg, opengraph-image.tsx, globals.css (tokens)
  components/     Navbar, Hero, Stats, Journey, Features, Calculator, Security,
                  Testimonials, FAQ, CTA, Footer  (+ ui/: Container, Button, Reveal)
  data/           nav, hero, stats, journey, features, security, testimonials, faq, footer
  lib/            chart.ts (SVG path builder), format.ts (₹ formatting, Indian grouping)
  fonts/          Fraunces + Inter (variable, self-hosted via next/font/local)
```

## Design decisions

**Palette (one accent).** Paper `#f6f3ec`, card `#fbfaf6`, ink `#111a17`, muted text `#55605b`, line `#ddd8cb`, accent green `#0b7a5c` (hover `#095f48`), accent tint `#dcebe3`. White on accent is 5.3:1 and muted on paper is about 5.9:1, so body text clears WCAG AA. No gradients except a faint area fill inside charts, no glass, no glow, no emoji.

**Type.** Fraunces for headlines (a warm, slightly bookish serif that signals "considered" rather than "app"), Inter for body and UI. Numbers use tabular figures so they don't jitter when the calculator updates. Display, H2 and H3 sizes are tokens in `globals.css`.

**Spacing and layout.** Tailwind's 4px unit, used only in 8px steps. Content is capped at 1200px. Layouts are deliberately uneven: asymmetric hero columns, a bento grid that goes 4+2, 2+4, 3+3, a tab list beside a preview, and one large testimonial beside two small ones.

**Motion.** Fade and slide on scroll, a tab cross-fade, hover lifts. All of it is off under `prefers-reduced-motion` (Framer's `useReducedMotion` plus a global CSS guard).

**Fonts.** Self-hosted with `next/font/local` (files from the `@fontsource-variable` packages). This avoids a build-time request to Google Fonts and keeps layout shift low.

**Accessibility.** Skip link, landmarks, visible focus ring, tabs with arrow-key navigation, FAQ as real buttons with `aria-expanded`/`aria-controls`, labelled range inputs with `aria-valuetext`, chart `aria-label`s that state the result in words, and a mobile menu that closes on Escape.

## Placeholder content to replace before launch

- Stats in `src/data/stats.ts` (users, assets tracked) are illustrative, not verified numbers.
- Testimonials in `src/data/testimonials.ts` are sample quotes, not real customers.
- Security claims (256-bit encryption, read-only connections, two-step sign-in) and the FAQ pricing answer should be checked against what Fermor actually offers.
- Footer links marked `#` and the CTA button have no destinations yet.
- The calculator's hero and fee-comparison figures are examples, not real products.

## What I'd improve with more time

1. Run Lighthouse and manual device tests. I could not do either in the build environment, so the Performance 90+ and Accessibility 95+ targets are designed for, not measured.
2. Add Playwright checks for horizontal overflow at 360, 768, 1024 and 1440px, plus axe-core in CI.
3. Add a typed entry field next to the calculator sliders and a hover readout on the chart.
4. Replace the sample testimonials and stats with real, approved ones, and add logos or press mentions if they exist.
5. Add a real sign-up flow behind the CTA and an email-capture waitlist.
6. Add dark mode using the same tokens.
7. Build supporting pages (guides, SIP and EMI calculators) so the footer links go somewhere.
