"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/nav";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-line bg-paper" : "border-transparent bg-paper"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight"
          aria-label="Fermor home"
        >
          Fermor<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[15px] text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#get-started" className="hidden h-10 px-6 md:inline-flex">
            Get started
          </Button>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col gap-2 py-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex h-12 items-center border-b border-line text-lg"
              >
                {l.label}
              </a>
            ))}
            <Button href="#get-started" className="mt-4">
              Get started
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
