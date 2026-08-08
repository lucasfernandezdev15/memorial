"use client";

import { X } from "lucide-react";
import { LivePlayer } from "./LivePlayer";
import { ProfileAvatar } from "./Placeholders";
import type { MemorialConfig } from "@/data/config";

interface LiveModalProps {
  open: boolean;
  onClose: () => void;
  config: MemorialConfig;
}

export function LiveModal({ open, onClose, config }: LiveModalProps) {
  if (!open) return null;

  const { deceased, stream, texts } = config;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Velatorio virtual"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden bg-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-paper/80 transition hover:text-paper"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="relative bg-brand px-6 pb-12 pt-10 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-brass-soft">
            {texts.watchingLive}
          </p>
          <h2 className="font-serif mt-3 text-3xl font-medium tracking-wide text-paper">
            {deceased.fullName}
          </h2>
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
            <ProfileAvatar
              initials={deceased.initials}
              photoUrl={deceased.photoUrl}
              name={deceased.fullName}
              className="h-16 w-16"
            />
          </div>
        </div>

        <div className="px-6 pb-8 pt-12 text-center">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-live">
            <span className="live-pulse h-1.5 w-1.5 rounded-full bg-live" />
            {texts.liveBadge}
          </div>

          <div className="mt-5 overflow-hidden border border-border">
            <LivePlayer type={stream.type} url={stream.url} />
          </div>
        </div>
      </div>
    </div>
  );
}
