import { Share2 } from "lucide-react";
import type { MemorialConfig } from "@/data/config";
import { HeroBanner, ProfileAvatar } from "./Placeholders";

export function Hero({
  deceased,
  texts,
}: Pick<MemorialConfig, "deceased" | "texts">) {
  return (
    <section className="bg-white">
      <div className="relative h-48 w-full overflow-hidden sm:h-56 md:h-64">
        <HeroBanner bannerUrl={deceased.bannerUrl} />
        <button
          type="button"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-md bg-gold px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow hover:bg-gold-dark"
        >
          <Share2 className="h-3.5 w-3.5" />
          {texts.share}
        </button>
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="absolute -top-12 left-4 sm:-top-14">
          <ProfileAvatar
            initials={deceased.initials}
            photoUrl={deceased.photoUrl}
            name={deceased.fullName}
            className="h-24 w-24 sm:h-28 sm:w-28"
          />
        </div>

        <div className="pb-6 pl-32 pt-4 sm:pl-36">
          <nav className="text-xs text-muted">
            Inicio <span className="mx-1">›</span> Obituarios{" "}
            <span className="mx-1">›</span> {deceased.fullName}
          </nav>
          <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
            {deceased.fullName}
          </h1>
          <p className="mt-0.5 text-sm text-muted">
            {deceased.birthYear} ~ {deceased.deathYear} ({deceased.age} años)
          </p>
        </div>
      </div>
    </section>
  );
}
