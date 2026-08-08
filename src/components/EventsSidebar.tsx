"use client";

import { MapPin, DoorOpen, Calendar, Radio } from "lucide-react";
import type { MemorialConfig, StreamStatus } from "@/data/config";
import { formatStreamTime } from "@/data/config";

interface EventsSidebarProps {
  events: MemorialConfig["events"];
  texts: MemorialConfig["texts"];
  stream: MemorialConfig["stream"];
  streamStatus: StreamStatus;
  onOpenLive: () => void;
}

export function EventsSidebar({
  events,
  texts,
  stream,
  streamStatus,
  onOpenLive,
}: EventsSidebarProps) {
  return (
    <aside>
      <h2 className="font-display text-2xl font-semibold text-brand">
        {texts.eventsTitle}
      </h2>

      <div className="mt-3 space-y-4">
        {events.map((event) => {
          const isLiveEvent =
            event.hasLiveStream && streamStatus === "live";

          return (
            <div
              key={event.id}
              className={`overflow-hidden rounded-xl border bg-card shadow-sm transition ${
                isLiveEvent
                  ? "border-live ring-2 ring-live/20 shadow-md"
                  : "border-stone"
              }`}
            >
              <div
                className={`flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-white ${
                  isLiveEvent
                    ? "bg-live"
                    : "bg-brand"
                }`}
              >
                <span>{event.title}</span>
                {isLiveEvent && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                    <span className="live-pulse h-1.5 w-1.5 rounded-full bg-white" />
                    {texts.liveBadge}
                  </span>
                )}
              </div>

              <div className="space-y-2.5 px-4 py-4 text-sm">
                <div className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="font-medium uppercase">{event.location}</span>
                </div>
                {event.room && (
                  <div className="flex items-start gap-2.5">
                    <DoorOpen className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{event.room}</span>
                  </div>
                )}
                <div className="flex items-start gap-2.5">
                  <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{event.datetimeLabel}</span>
                </div>

                {event.hasLiveStream && streamStatus === "live" && (
                  <button
                    type="button"
                    onClick={onOpenLive}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-live px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow transition hover:bg-live-dark"
                  >
                    <Radio className="live-pulse h-4 w-4" />
                    {texts.liveButton}
                  </button>
                )}

                {event.hasLiveStream && streamStatus === "upcoming" && (
                  <div className="mt-2 rounded-lg border border-brand/20 bg-brand-soft px-3 py-3 text-center text-xs leading-relaxed text-brand-dark">
                    <p className="font-semibold">{texts.upcomingLabel}</p>
                    <p className="mt-1 font-bold">
                      {formatStreamTime(stream.startsAt)}
                    </p>
                  </div>
                )}

                {event.hasLiveStream && streamStatus === "ended" && (
                  <div className="mt-2 rounded-lg border border-border bg-background px-3 py-3 text-center text-xs text-muted">
                    {texts.endedLabel}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
