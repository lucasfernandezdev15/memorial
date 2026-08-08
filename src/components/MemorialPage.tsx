"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { QuickActions } from "./QuickActions";
import { Tributes } from "./Tributes";
import { EventsSidebar } from "./EventsSidebar";
import { LiveModal } from "./LiveModal";
import { LiveStatusBar } from "./LiveStatusBar";
import { TributeFormModal } from "./TributeFormModal";
import {
  getStreamStatus,
  type MemorialConfig,
  type StreamStatus,
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
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("disabled");

  const openLive = useCallback(() => setLiveOpen(true), []);
  const closeLive = useCallback(() => setLiveOpen(false), []);

  useEffect(() => {
    setLocalTributes(loadLocalTributes());
  }, []);

  useEffect(() => {
    const tick = () => setStreamStatus(getStreamStatus(config.stream));
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, [config.stream]);

  useEffect(() => {
    if (autoOpenLive && getStreamStatus(config.stream) === "live") {
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
      <LiveStatusBar
        status={streamStatus}
        stream={config.stream}
        texts={config.texts}
        onOpenLive={openLive}
      />
      <Hero deceased={config.deceased} texts={config.texts} />
      <QuickActions texts={config.texts} onAction={setFormMode} />

      <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-2 lg:grid-cols-[1fr_320px]">
        <Tributes tributes={tributes} texts={config.texts} />
        <EventsSidebar
          events={config.events}
          texts={config.texts}
          stream={config.stream}
          streamStatus={streamStatus}
          onOpenLive={openLive}
        />
      </main>

      <footer className="border-t border-border bg-white py-6 text-center text-xs text-muted">
        {config.brand.name} — {config.brand.tagline}
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
