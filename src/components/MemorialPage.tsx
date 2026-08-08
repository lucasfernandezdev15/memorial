"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { QuickActions } from "./QuickActions";
import { Tributes } from "./Tributes";
import { EventsSidebar } from "./EventsSidebar";
import { LiveModal } from "./LiveModal";
import { TributeFormModal } from "./TributeFormModal";
import {
  isStreamLiveNow,
  type MemorialConfig,
  type Tribute,
  type TributeType,
} from "@/data/config";
import { addLocalTribute, loadLocalTributes } from "@/lib/tributes-storage";

interface MemorialPageProps {
  config: MemorialConfig;
  autoOpenLive?: boolean;
}

export function MemorialPage({ config, autoOpenLive = false }: MemorialPageProps) {
  const [liveOpen, setLiveOpen] = useState(false);
  const [formMode, setFormMode] = useState<TributeType | null>(null);
  const [localTributes, setLocalTributes] = useState<Tribute[]>([]);
  const [liveNow, setLiveNow] = useState(false);

  const openLive = useCallback(() => setLiveOpen(true), []);
  const closeLive = useCallback(() => setLiveOpen(false), []);

  useEffect(() => {
    setLocalTributes(loadLocalTributes());
  }, []);

  useEffect(() => {
    const tick = () => setLiveNow(isStreamLiveNow(config.stream));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [config.stream]);

  useEffect(() => {
    if (autoOpenLive && isStreamLiveNow(config.stream)) {
      setLiveOpen(true);
    }
  }, [autoOpenLive, config.stream]);

  useEffect(() => {
    if (!liveOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLive();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [liveOpen, closeLive]);

  const tributes = useMemo(() => {
    const merged = [...localTributes, ...config.tributes];
    const seen = new Set<string>();
    return merged.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
  }, [localTributes, config.tributes]);

  const handleTribute = (tribute: Tribute) => {
    setLocalTributes(addLocalTribute(tribute));
  };

  return (
    <>
      <Header brand={config.brand} texts={config.texts} />
      <Hero deceased={config.deceased} texts={config.texts} />
      <QuickActions texts={config.texts} onAction={setFormMode} />

      <main className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-4 md:px-8 lg:grid-cols-[1fr_300px] lg:gap-16">
        <Tributes tributes={tributes} texts={config.texts} />
        <EventsSidebar
          events={config.events}
          texts={config.texts}
          showLiveButton={liveNow}
          onOpenLive={openLive}
        />
      </main>

      <footer className="border-t border-border/80 py-10 text-center">
        <p className="font-serif text-xl tracking-wide text-ink">
          {config.brand.name}
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-muted">
          {config.brand.tagline}
        </p>
      </footer>

      <LiveModal open={liveOpen} onClose={closeLive} config={config} />
      <TributeFormModal
        open={formMode !== null}
        mode={formMode}
        onClose={() => setFormMode(null)}
        onSubmit={handleTribute}
      />
    </>
  );
}
