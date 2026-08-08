"use client";

import { Camera, MessageCircleHeart, Flame } from "lucide-react";
import type { MemorialConfig, TributeType } from "@/data/config";

interface QuickActionsProps {
  texts: MemorialConfig["texts"];
  onAction: (type: TributeType) => void;
}

export function QuickActions({ texts, onAction }: QuickActionsProps) {
  const actions: {
    icon: typeof Camera;
    label: string;
    type: TributeType;
    hint: string;
  }[] = [
    {
      icon: Camera,
      label: texts.shareMemory,
      type: "photo",
      hint: "Fotos y momentos",
    },
    {
      icon: MessageCircleHeart,
      label: texts.sendMessage,
      type: "message",
      hint: "Palabras de consuelo",
    },
    {
      icon: Flame,
      label: texts.lightCandle,
      type: "candle",
      hint: "Presencia simbólica",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-5">
      <div className="surface-card grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {actions.map(({ icon: Icon, label, type, hint }) => (
          <button
            key={label}
            type="button"
            onClick={() => onAction(type)}
            className="group flex items-center gap-4 px-5 py-5 text-left transition hover:bg-brand-soft/60"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
              <Icon className="h-6 w-6" strokeWidth={1.6} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-brand">{label}</span>
              <span className="mt-0.5 block text-xs text-muted">{hint}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
