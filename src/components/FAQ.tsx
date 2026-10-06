"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-line py-16 md:py-24" aria-labelledby="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <Reveal>
          <h2 id="faq-title" className="text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
            Questions people ask first
          </h2>
          <p className="mt-4 max-w-[36ch] leading-7 text-muted">
            Not here? Write to hello@fermor.in and a person will reply.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="border-b border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-t border-line">
                  <h3 className="font-sans text-base font-medium tracking-normal">
                    <button
                      type="button"
                      id={`faq-btn-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-lg"
                    >
                      {f.q}
                      <Plus
                        size={24}
                        aria-hidden
                        className={`shrink-0 text-accent transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={`grid transition-[grid-template-rows] duration-200 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[60ch] pb-6 leading-7 text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
