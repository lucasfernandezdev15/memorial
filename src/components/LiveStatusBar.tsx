"use client";

import { Radio } from "lucide-react";
import type { MemorialConfig, StreamStatus } from "@/data/config";
import { formatStreamTime } from "@/data/config";

interface LiveStatusBarProps {
  status: StreamStatus;
  stream: MemorialConfig["stream"];
  texts: MemorialConfig["texts"];
  onOpenLive: () => void;
}

export function LiveStatusBar({
  status,
  stream,
  texts,
  onOpenLive,
}: LiveStatusBarProps) {
  if (status === "disabled") return null;

  if (status === "live") {
    return (
      <button
        type="button"
        onClick={onOpenLive}
        className="live-banner-in sticky top-[57px] z-30 flex w-full items-center justify-center gap-3 bg-live px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-live-dark"
      >
        <span className="live-pulse inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        <Radio className="h-4 w-4 shrink-0" />
        <span className="text-left">{texts.liveBanner}</span>
        <span className="hidden rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide sm:inline">
          {texts.liveBadge}
        </span>
      </button>
    );
  }

  if (status === "upcoming") {
    return (
      <div className="live-banner-in flex w-full items-center justify-center gap-2 border-b border-brand/15 bg-brand-soft px-4 py-2.5 text-sm text-brand-dark">
        <span className="font-medium">{texts.upcomingLabel}</span>
        <span className="font-bold">{formatStreamTime(stream.startsAt)}</span>
      </div>
    );
  }

  return (
    <div className="live-banner-in flex w-full items-center justify-center border-b border-stone bg-card px-4 py-2.5 text-sm text-muted">
      {texts.endedLabel}
    </div>
  );
}
