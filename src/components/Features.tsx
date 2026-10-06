import { features, accountRows } from "@/data/features";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const tones = {
  light: "bg-card border border-line",
  soft: "bg-accent-soft border border-accent-soft",
  dark: "bg-ink text-paper border border-ink",
} as const;

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24" aria-labelledby="features-title">
      <Container>
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-end">
            <h2 id="features-title" className="max-w-[18ch] text-[length:var(--text-h2)] leading-[var(--text-h2--line-height)]">
              The small tools that add up to clarity
            </h2>
            <p className="max-w-[44ch] leading-7 text-muted">
              Fermor does a few things well. Each one is built to answer a plain question about your money.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-6 md:gap-6 lg:mt-16">
          {features.map((f, i) => {
            const Icon = f.icon;
            const dark = f.tone === "dark";
            return (
              <li key={f.id} className={`${f.span} list-none`}>
                <Reveal delay={(i % 3) * 0.05} className="h-full">
                  <article
                    className={`flex h-full flex-col justify-between gap-8 rounded-3xl p-6 transition-transform duration-200 hover:-translate-y-0.5 md:p-8 ${tones[f.tone]}`}
                  >
                    <div>
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                          dark ? "bg-paper/10 text-paper" : "bg-paper text-accent"
                        }`}
                      >
                        <Icon size={24} aria-hidden />
                      </span>
                      <h3 className="mt-6 max-w-[22ch] text-[length:var(--text-h3)] leading-[var(--text-h3--line-height)]">
                        {f.title}
                      </h3>
                      <p className={`mt-2 max-w-[48ch] leading-7 ${dark ? "text-paper/75" : "text-muted"}`}>
                        {f.text}
                      </p>
                    </div>

                    {"visual" in f && f.visual === "accounts" && (
                      <ul className="divide-y divide-line rounded-2xl border border-line bg-paper px-4">
                        {accountRows.map((r) => (
                          <li key={r.name} className="flex items-center justify-between py-3 text-sm">
                            <span>
                              {r.name}
                              <span className="ml-2 text-muted">{r.meta}</span>
                            </span>
                            <span className="num font-medium">{r.amount}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {"visual" in f && f.visual === "fees" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-paper/10 p-4">
                          <p className="text-xs uppercase tracking-wider text-paper/60">Regular plan</p>
                          <p className="num mt-2 font-serif text-3xl">₹1,12,000</p>
                          <p className="mt-1 text-sm text-paper/60">fees over 20 years</p>
                        </div>
                        <div className="rounded-2xl bg-accent p-4">
                          <p className="text-xs uppercase tracking-wider text-white">Direct plan</p>
                          <p className="num mt-2 font-serif text-3xl">₹38,000</p>
                          <p className="mt-1 text-sm text-white">fees over 20 years</p>
                        </div>
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
