"use client";

import type { MemorialConfig, TributeType } from "@/data/config";

interface QuickActionsProps {
  texts: MemorialConfig["texts"];
  onAction: (type: TributeType) => void;
}

export function QuickActions({ texts, onAction }: QuickActionsProps) {
  const actions: { label: string; type: TributeType }[] = [
    { label: texts.shareMemory, type: "photo" },
    { label: texts.sendMessage, type: "message" },
    { label: texts.lightCandle, type: "candle" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <div className="ornament-line mb-8" />
      <div className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row sm:gap-0">
        {actions.map(({ label, type }, i) => (
          <div key={label} className="flex items-center">
            {i > 0 && (
              <span
                className="mx-6 hidden h-3 w-px bg-border sm:block"
                aria-hidden
              />
            )}
            <button
              type="button"
              onClick={() => onAction(type)}
              className="link-underline text-[12px] font-normal uppercase tracking-[0.2em] text-brand transition hover:text-brass"
            >
              {label}
            </button>
          </div>
        ))}
      </div>
      <div className="ornament-line mt-8" />
    </div>
  );
}
