"use client";

import { useMemo, useState } from "react";
import { Flame, ImageIcon, MessageSquare } from "lucide-react";
import type { MemorialConfig, Tribute, TributeType } from "@/data/config";

type Filter = "all" | TributeType;

interface TributesProps {
  tributes: Tribute[];
  texts: MemorialConfig["texts"];
}

export function Tributes({ tributes, texts }: TributesProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return tributes;
    if (filter === "photo") {
      return tributes.filter((t) => t.type === "photo" || Boolean(t.imageUrl));
    }
    return tributes.filter((t) => t.type === filter);
  }, [filter, tributes]);

  const tabs: { id: Filter; label: string }[] = [
    { id: "all", label: "Todas" },
    { id: "photo", label: "Fotos y videos" },
    { id: "candle", label: "Velas" },
  ];

  return (
    <section>
      <h2 className="font-display text-2xl font-semibold text-ink">
        {texts.tributesTitle}{" "}
        <span className="text-brand">({tributes.length})</span>
      </h2>

      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
              filter === tab.id
                ? "bg-brand text-white shadow-sm"
                : "border border-border bg-card text-foreground hover:border-brand hover:text-brand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {filtered.length === 0 && (
          <p className="surface-card p-8 text-center text-sm text-muted">
            No hay homenajes todavía. Sé el primero en dejar un recuerdo.
          </p>
        )}

        {filtered.map((tribute) => (
          <article key={tribute.id} className="surface-card p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                  tribute.type === "candle"
                    ? "bg-accent/15 text-accent-dark"
                    : "bg-brand-soft text-brand"
                }`}
              >
                {tribute.type === "candle" && <Flame className="h-5 w-5" />}
                {tribute.type === "photo" && <ImageIcon className="h-5 w-5" />}
                {tribute.type === "message" && (
                  <MessageSquare className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-semibold text-ink">{tribute.author}</h3>
                  {tribute.relation && (
                    <span className="text-xs text-muted">{tribute.relation}</span>
                  )}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
                  {tribute.content}
                </p>
                {tribute.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tribute.imageUrl}
                    alt=""
                    className="mt-3 max-h-64 w-full rounded-xl object-cover"
                  />
                )}
                <p className="mt-2.5 text-xs text-muted">
                  {new Date(tribute.createdAt).toLocaleString("es-AR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
