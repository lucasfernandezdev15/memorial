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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Velatorio virtual"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/20 p-1.5 text-white transition hover:bg-black/40"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-24 bg-brand">
          <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2">
            <ProfileAvatar
              initials={deceased.initials}
              photoUrl={deceased.photoUrl}
              name={deceased.fullName}
              className="h-20 w-20"
            />
          </div>
        </div>

        <div className="px-6 pb-6 pt-14 text-center">
          <p className="text-sm text-muted">{texts.watchingLive}</p>
          <h2 className="font-display mt-1 text-2xl font-semibold text-foreground">
            {deceased.fullName}
          </h2>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-live px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            <span className="live-pulse" aria-hidden>
              ((●))
            </span>
            {texts.liveBadge}
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <LivePlayer type={stream.type} url={stream.url} />
          </div>
        </div>
      </div>
    </div>
  );
}
