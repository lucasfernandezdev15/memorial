import { Leaf } from "lucide-react";
import type { MemorialConfig } from "@/data/config";

export function Header({ brand, texts }: Pick<MemorialConfig, "brand" | "texts">) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-card">
            <Leaf className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="font-display text-xl font-semibold tracking-wide text-brand">
            {brand.logoText}
          </span>
        </a>

        <nav className="hidden items-center gap-5 text-xs font-semibold tracking-wide text-foreground md:flex">
          {brand.navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-brand">
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="hover:text-brand"
          >
            {brand.phoneLabel}
          </a>
          <a href="#" className="hover:text-brand">
            {texts.activateMemorial}
          </a>
          <a
            href="#"
            className="rounded-md bg-gold px-4 py-2 font-semibold text-brand transition hover:bg-gold-dark"
          >
            {texts.login}
          </a>
        </nav>
      </div>
    </header>
  );
}
