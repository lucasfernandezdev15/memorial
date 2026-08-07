"use client";

import { MapPin, DoorOpen, Calendar } from "lucide-react";
import type { MemorialConfig } from "@/data/config";

interface EventsSidebarProps {
  events: MemorialConfig["events"];
  texts: MemorialConfig["texts"];
  showLiveButton: boolean;
  onOpenLive: () => void;
}

export function EventsSidebar({
  events,
  texts,
  showLiveButton,
  onOpenLive,
}: EventsSidebarProps) {
  return (
    <aside>
      <h2 className="text-lg font-bold text-foreground">{texts.eventsTitle}</h2>

      <div className="mt-3 space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
          >
            <div className="bg-brand px-4 py-2.5 text-sm font-semibold text-white">
              {event.title}
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

              {event.hasLiveStream && showLiveButton && (
                <button
                  type="button"
                  onClick={onOpenLive}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-live px-4 py-3 text-sm font-bold uppercase tracking-wide text-white shadow transition hover:bg-live-dark"
                >
                  <span className="live-pulse" aria-hidden>
                    ((●))
                  </span>
                  {texts.liveButton}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
