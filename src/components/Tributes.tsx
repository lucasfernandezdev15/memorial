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
    { id: "all", label: "TODAS" },
    { id: "photo", label: "FOTOS Y VIDEOS" },
    { id: "candle", label: "VELAS" },
  ];

  return (
    <section>
      <h2 className="text-lg font-bold text-foreground">
        {texts.tributesTitle} ({tributes.length})
      </h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition ${
              filter === tab.id
                ? "bg-brand text-white"
                : "border border-border bg-white text-foreground hover:border-brand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 && (
          <p className="rounded-xl border border-border bg-white p-6 text-center text-sm text-muted">
            No hay homenajes todavía.
          </p>
        )}

        {filtered.map((tribute) => (
          <article
            key={tribute.id}
            className="rounded-xl border border-border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                {tribute.type === "candle" && <Flame className="h-5 w-5" />}
                {tribute.type === "photo" && <ImageIcon className="h-5 w-5" />}
                {tribute.type === "message" && (
                  <MessageSquare className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h3 className="font-semibold text-foreground">
                    {tribute.author}
                  </h3>
                  {tribute.relation && (
                    <span className="text-xs text-muted">{tribute.relation}</span>
                  )}
                </div>
                <p className="mt-1 text-sm text-foreground/90">{tribute.content}</p>
                {tribute.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tribute.imageUrl}
                    alt=""
                    className="mt-3 max-h-64 w-full rounded-lg object-cover"
                  />
                )}
                <p className="mt-2 text-xs text-muted">
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
