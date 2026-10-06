import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  const [lead, ...rest] = testimonials;
  return (
    <section className="py-16 md:py-24" aria-labelledby="testimonials-title">
      <Container>
        <Reveal>
          <h2 id="testimonials-title" className="max-w-[20ch] text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
            What people notice first
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <figure className="h-full border-t border-ink pt-8">
              <blockquote className="font-serif text-2xl leading-[1.35] tracking-tight md:text-[2rem]">
                &ldquo;{lead.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="font-medium">{lead.name}</span>
                <span className="text-muted"> · {lead.role}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="space-y-8">
            {rest.map((t, i) => (
              <Reveal key={t.name} delay={0.05 * (i + 1)}>
                <figure className="border-t border-line pt-8">
                  <blockquote className="leading-7">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-medium">{t.name}</span>
                    <span className="text-muted"> · {t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
