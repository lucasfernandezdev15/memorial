import type { MemorialConfig } from "@/data/config";
import { HeroBanner, ProfileAvatar } from "./Placeholders";

export function Hero({
  deceased,
  texts,
}: Pick<MemorialConfig, "deceased" | "texts">) {
  return (
    <section className="relative">
      <div className="grain relative min-h-[68vh] w-full overflow-hidden md:min-h-[72vh]">
        <HeroBanner bannerUrl={deceased.bannerUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/55 to-brand/25" />

        <div className="absolute inset-0 flex flex-col items-center justify-end px-5 pb-16 pt-28 text-center md:pb-20">
          <div className="animate-rise mb-8">
            <ProfileAvatar
              initials={deceased.initials}
              photoUrl={deceased.photoUrl}
              name={deceased.fullName}
              className="mx-auto h-28 w-28 md:h-32 md:w-32"
            />
          </div>

          <p className="animate-rise-delay text-[11px] uppercase tracking-[0.35em] text-brass-soft">
            En memoria de
          </p>
          <h1 className="animate-rise-delay font-serif mt-3 max-w-3xl text-4xl font-medium leading-[1.1] tracking-wide text-paper sm:text-5xl md:text-6xl">
            {deceased.fullName}
          </h1>
          <div className="animate-rise-delay-2 ornament-line mx-auto mt-6 w-24" />
          <p className="animate-rise-delay-2 mt-5 text-sm tracking-[0.12em] text-paper/75">
            {deceased.birthYear} — {deceased.deathYear}
            <span className="mx-2 text-brass-soft">·</span>
            {deceased.age} años
          </p>
          <button
            type="button"
            className="animate-rise-delay-2 mt-8 text-[11px] uppercase tracking-[0.22em] text-brass-soft transition hover:text-paper"
          >
            {texts.share}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pt-4 md:px-8">
        <nav className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Inicio <span className="mx-2 text-brass">/</span> Obituarios{" "}
          <span className="mx-2 text-brass">/</span>{" "}
          <span className="text-foreground">{deceased.fullName}</span>
        </nav>
      </div>
    </section>
  );
}
