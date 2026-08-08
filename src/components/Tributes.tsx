"use client";

import { useMemo, useState } from "react";
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
    { id: "photo", label: "Fotos" },
    { id: "candle", label: "Velas" },
  ];

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
            Recuerdos
          </p>
          <h2 className="font-serif mt-2 text-3xl font-medium tracking-wide text-ink md:text-4xl">
            {texts.tributesTitle}
            <span className="ml-2 text-2xl text-muted">({tributes.length})</span>
          </h2>
        </div>

        <div className="flex gap-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`text-[11px] uppercase tracking-[0.18em] transition ${
                filter === tab.id
                  ? "text-brand"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <span className={filter === tab.id ? "link-underline" : ""}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 space-y-0">
        {filtered.length === 0 && (
          <p className="border-y border-border py-12 text-center text-sm tracking-wide text-muted">
            Aún no hay homenajes.
          </p>
        )}

        {filtered.map((tribute) => (
          <article
            key={tribute.id}
            className="border-t border-border py-7 first:border-t-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-serif text-xl font-medium tracking-wide text-ink">
                {tribute.author}
              </h3>
              {tribute.relation && (
                <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
                  {tribute.relation}
                </span>
              )}
              <span className="ml-auto text-[11px] tracking-wide text-muted">
                {new Date(tribute.createdAt).toLocaleString("es-AR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>

            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/85">
              {tribute.type === "candle" ? (
                <span className="italic text-brand-mid">{tribute.content}</span>
              ) : (
                tribute.content
              )}
            </p>

            {tribute.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tribute.imageUrl}
                alt=""
                className="mt-5 max-h-72 w-full max-w-xl object-cover"
              />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
