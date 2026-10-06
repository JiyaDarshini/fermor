import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section id="get-started" className="pb-16 md:pb-24" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <div className="grid gap-8 rounded-[32px] bg-accent p-8 text-white md:grid-cols-[1.4fr_1fr] md:items-end md:p-16">
            <div>
              <h2 id="cta-title" className="max-w-[16ch] text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
                Start with the full picture
              </h2>
              <p className="mt-4 max-w-[44ch] leading-7 text-white">
                Link your first account in a couple of minutes. You will see where you stand before you decide anything.
              </p>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <Button href="#" variant="light" className="w-full md:w-auto">
                Get started, it&apos;s free
                <ArrowRight size={16} aria-hidden />
              </Button>
              <p className="text-sm text-white">No card needed. Cancel any time.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
