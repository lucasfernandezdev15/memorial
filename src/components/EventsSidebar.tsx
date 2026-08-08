"use client";

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
    <aside className="lg:sticky lg:top-8 lg:self-start">
      <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
        {texts.eventsTitle}
      </p>

      <div className="mt-5 space-y-10">
        {events.map((event) => (
          <div key={event.id}>
            <h3 className="font-serif text-3xl font-medium tracking-wide text-ink">
              {event.title}
            </h3>
            <div className="ornament-line mt-3 w-16" />

            <dl className="mt-6 space-y-4 text-sm tracking-wide text-foreground/90">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Lugar
                </dt>
                <dd className="mt-1 font-medium uppercase tracking-[0.08em]">
                  {event.location}
                </dd>
              </div>
              {event.room && (
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    Sala
                  </dt>
                  <dd className="mt-1">{event.room}</dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Horario
                </dt>
                <dd className="mt-1">{event.datetimeLabel}</dd>
              </div>
            </dl>

            {event.hasLiveStream && showLiveButton && (
              <button
                type="button"
                onClick={onOpenLive}
                className="mt-8 flex w-full items-center justify-center gap-3 bg-live px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-paper transition hover:bg-live-soft"
              >
                <span className="live-pulse h-1.5 w-1.5 rounded-full bg-paper" />
                {texts.liveButton}
              </button>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
