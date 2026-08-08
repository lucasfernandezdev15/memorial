import { Leaf } from "lucide-react";
import type { MemorialConfig } from "@/data/config";

export function Header({ brand, texts }: Pick<MemorialConfig, "brand" | "texts">) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
            <Leaf className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <span className="font-display block text-lg font-semibold tracking-tight text-ink">
              {brand.logoText}
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
              {brand.tagline}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-5 text-xs font-semibold tracking-wide text-foreground md:flex">
          {brand.navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-brand">
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="text-brand hover:text-brand-dark"
          >
            {brand.phoneLabel}
          </a>
          <a href="#" className="hover:text-brand">
            {texts.activateMemorial}
          </a>
          <a
            href="#"
            className="rounded-full bg-accent px-4 py-2 font-bold text-white transition hover:bg-accent-dark"
          >
            {texts.login}
          </a>
        </nav>
      </div>
    </header>
  );
}
