"use client";

import { MapPin, DoorOpen, Calendar, Radio } from "lucide-react";
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
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <h2 className="font-display text-2xl font-semibold text-ink">
        {texts.eventsTitle}
      </h2>

      <div className="mt-4 space-y-4">
        {events.map((event) => (
          <div key={event.id} className="surface-card overflow-hidden">
            <div className="bg-gradient-to-r from-brand to-brand-dark px-4 py-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                {event.title}
              </h3>
            </div>
            <div className="space-y-3 px-4 py-4 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="font-semibold uppercase tracking-wide">
                  {event.location}
                </span>
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
                  className="live-glow mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-live px-4 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-live-dark"
                >
                  <Radio className="live-pulse h-4 w-4" />
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
