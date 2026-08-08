"use client";

import { Camera, MessageCircleHeart, Flame } from "lucide-react";
import type { MemorialConfig, TributeType } from "@/data/config";

interface QuickActionsProps {
  texts: MemorialConfig["texts"];
  onAction: (type: TributeType) => void;
}

export function QuickActions({ texts, onAction }: QuickActionsProps) {
  const actions: { icon: typeof Camera; label: string; type: TributeType }[] = [
    { icon: Camera, label: texts.shareMemory, type: "photo" },
    { icon: MessageCircleHeart, label: texts.sendMessage, type: "message" },
    { icon: Flame, label: texts.lightCandle, type: "candle" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-4">
      <div className="grid grid-cols-1 divide-y divide-border rounded-xl border border-border bg-white shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {actions.map(({ icon: Icon, label, type }) => (
          <button
            key={label}
            type="button"
            onClick={() => onAction(type)}
            className="flex items-center justify-center gap-3 px-4 py-5 text-sm font-medium text-brand transition hover:bg-gray-50"
          >
            <Icon className="h-6 w-6 shrink-0" strokeWidth={1.5} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
