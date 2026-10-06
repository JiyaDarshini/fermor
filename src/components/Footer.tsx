import Link from "next/link";
import { footerColumns, disclaimer } from "@/data/footer";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" className="font-serif text-2xl tracking-tight" aria-label="Fermor home">
              Fermor<span className="text-accent">.</span>
            </Link>
            <p className="mt-4 max-w-[28ch] leading-7 text-muted">
              Understand your money, act on it, and grow it.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-sm font-medium tracking-normal">{col.title}</h2>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="inline-flex min-h-8 items-center text-[15px] text-muted transition-colors hover:text-ink">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 border-t border-line py-8">
          <p className="max-w-[90ch] text-xs leading-6 text-muted">{disclaimer}</p>
          <p className="mt-4 text-xs text-muted">© {new Date().getFullYear()} Fermor. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
