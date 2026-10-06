import { stats } from "@/data/stats";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section aria-label="Fermor in numbers" className="border-y border-line">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 lg:grid-cols-[1.3fr_1.3fr_1fr_1fr]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col-reverse justify-end gap-2 px-0 py-8 lg:px-8 ${
                  i > 0 ? "lg:border-l lg:border-line" : "lg:pl-0"
                } ${i % 2 === 1 ? "pl-6 border-l border-line lg:pl-8" : ""} ${
                  i > 1 ? "border-t border-line lg:border-t-0" : ""
                }`}
              >
                <dt className="max-w-[24ch] text-sm leading-6 text-muted">{s.label}</dt>
                <dd className="num font-serif text-3xl tracking-tight md:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
