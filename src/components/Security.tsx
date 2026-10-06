import { securityPoints } from "@/data/security";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Security() {
  return (
    <section id="security" className="bg-ink py-16 text-paper md:py-24" aria-labelledby="security-title">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#7fd3b4]">Security</p>
          <h2 id="security-title" className="mt-4 text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
            Your money stays where it is. We only look.
          </h2>
          <p className="mt-6 max-w-[40ch] leading-7 text-paper/75">
            Fermor is not a bank and never holds your funds. It reads your accounts so it can explain them, and that is all.
          </p>
        </Reveal>

        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {securityPoints.map((p, i) => {
            const Icon = p.icon;
            return (
              <li key={p.title} className={i % 2 === 1 ? "sm:mt-8" : ""}>
                <Reveal delay={i * 0.05}>
                  <div className="border-t border-paper/20 pt-6">
                    <Icon size={24} className="text-[#7fd3b4]" aria-hidden />
                    <h3 className="mt-4 text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)]">{p.title}</h3>
                    <p className="mt-2 leading-7 text-paper/75">{p.text}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
