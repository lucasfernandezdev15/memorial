import { Share2 } from "lucide-react";
import type { MemorialConfig } from "@/data/config";
import { HeroBanner, ProfileAvatar } from "./Placeholders";

export function Hero({
  deceased,
  texts,
}: Pick<MemorialConfig, "deceased" | "texts">) {
  return (
    <section className="bg-card">
      <div className="relative h-52 w-full overflow-hidden sm:h-60 md:h-72">
        <HeroBanner bannerUrl={deceased.bannerUrl} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/10" />
        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-accent-dark"
        >
          <Share2 className="h-3.5 w-3.5" />
          {texts.share}
        </button>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="absolute -top-14 left-4 animate-fade-up sm:-top-16">
          <ProfileAvatar
            initials={deceased.initials}
            photoUrl={deceased.photoUrl}
            name={deceased.fullName}
            className="h-28 w-28 sm:h-32 sm:w-32"
          />
        </div>

        <div className="animate-fade-up-delay pb-7 pl-36 pt-5 sm:pl-40">
          <nav className="text-xs text-muted">
            Inicio <span className="mx-1 text-accent">›</span> Obituarios{" "}
            <span className="mx-1 text-accent">›</span> {deceased.fullName}
          </nav>
          <h1 className="font-display mt-1 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {deceased.fullName}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {deceased.birthYear} ~ {deceased.deathYear}
            <span className="mx-2 text-border">|</span>
            {deceased.age} años
          </p>
        </div>
      </div>
    </section>
  );
}
