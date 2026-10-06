import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const styles = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  light: "bg-paper text-ink hover:bg-white",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
