import type { MemorialConfig } from "@/data/config";

export function Header({ brand, texts }: Pick<MemorialConfig, "brand" | "texts">) {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <a href="/" className="group">
          <span className="font-serif text-2xl font-medium tracking-[0.04em] text-paper md:text-[1.65rem]">
            {brand.logoText}
          </span>
          <span className="mt-0.5 block text-[10px] font-normal uppercase tracking-[0.28em] text-brass-soft/90">
            {brand.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-[11px] font-normal uppercase tracking-[0.18em] text-paper/85 md:flex">
          {brand.navLinks.map((link) => (
            <a key={link.label} href={link.href} className="link-underline">
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="link-underline text-brass-soft"
          >
            {brand.phoneLabel}
          </a>
          <a href="#" className="link-underline">
            {texts.activateMemorial}
          </a>
          <a
            href="#"
            className="border border-brass-soft/50 px-4 py-2 text-paper transition hover:border-brass-soft hover:bg-paper/5"
          >
            {texts.login}
          </a>
        </nav>
      </div>
    </header>
  );
}
