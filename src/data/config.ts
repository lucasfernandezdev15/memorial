/**
 * CONFIGURACIÓN DEL MEMORIAL (demo de venta genérica)
 * Al vender: cambiá marca, fallecido, horarios y URL del stream.
 */

export type StreamType = "youtube" | "hls" | "iframe" | "mp4";

export type TributeType = "message" | "photo" | "candle";

export type StreamStatus = "disabled" | "upcoming" | "live" | "ended";

export interface Tribute {
  id: string;
  author: string;
  relation?: string;
  type: TributeType;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface CeremonyEvent {
  id: string;
  type: "velatorio" | "cremacion" | "sepultura" | "misa" | "otro";
  title: string;
  location: string;
  room?: string;
  datetime: string;
  datetimeLabel: string;
  hasLiveStream?: boolean;
}

export interface MemorialConfig {
  brand: {
    name: string;
    tagline: string;
    phone: string;
    phoneLabel: string;
    logoText: string;
    navLinks: { label: string; href: string }[];
  };
  deceased: {
    fullName: string;
    birthYear: number;
    deathYear: number;
    age: number;
    initials: string;
    photoUrl?: string;
    bannerUrl?: string;
  };
  stream: {
    enabled: boolean;
    type: StreamType;
    url: string;
    startsAt: string;
    endsAt: string;
    /**
     * true = siempre "en vivo" (demo de venta).
     * En entrega: false + startsAt/endsAt reales.
     */
    forceLive: boolean;
  };
  events: CeremonyEvent[];
  tributes: Tribute[];
  texts: {
    shareMemory: string;
    sendMessage: string;
    lightCandle: string;
    watchingLive: string;
    liveBadge: string;
    liveButton: string;
    tributesTitle: string;
    eventsTitle: string;
    share: string;
    login: string;
    activateMemorial: string;
    liveBanner: string;
    upcomingLabel: string;
    endedLabel: string;
  };
}

function demoDayWindow() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  return { startsAt: start.toISOString(), endsAt: end.toISOString() };
}

const liveWindow = demoDayWindow();

export const memorialConfig: MemorialConfig = {
  brand: {
    name: "Memorial Vivo",
    tagline: "Memorias que acompañan",
    phone: "0800 123 4848",
    phoneLabel: "0800 123 4848 | 24H",
    logoText: "Memorial Vivo",
    navLinks: [
      { label: "INSTITUCIONAL", href: "#" },
      { label: "FLORISTERÍA", href: "#" },
    ],
  },
  deceased: {
    fullName: "Sergio Esteban Fernandez",
    birthYear: 1960,
    deathYear: 2026,
    age: 66,
    initials: "SF",
  },
  stream: {
    enabled: true,
    type: "youtube",
    url: "https://www.youtube.com/watch?v=BHACKCNDMW8",
    startsAt: liveWindow.startsAt,
    endsAt: liveWindow.endsAt,
    forceLive: true,
  },
  events: [
    {
      id: "velatorio-1",
      type: "velatorio",
      title: "Velatorio",
      location: "VELATORIO 04",
      room: "Sala de Velatorio 04",
      datetime: liveWindow.startsAt,
      datetimeLabel: formatEventLabel(liveWindow.startsAt),
      hasLiveStream: true,
    },
  ],
  tributes: [
    {
      id: "seed-1",
      author: "Paula Santos",
      relation: "Amiga",
      type: "candle",
      content: "Encendió una vela virtual en su memoria.",
      createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: "seed-2",
      author: "Leonardo",
      relation: "Sobrino",
      type: "candle",
      content: "Encendió una vela virtual en su memoria.",
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: "seed-3",
      author: "Familia Rodríguez",
      type: "message",
      content:
        "Querido Sergio, siempre te recordaremos con cariño. Descansá en paz.",
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
  ],
  texts: {
    shareMemory: "Compartí una memoria",
    sendMessage: "Enviá un mensaje de cariño",
    lightCandle: "Encendé una vela virtual",
    watchingLive: "Estás mirando el velatorio virtual de",
    liveBadge: "EN VIVO",
    liveButton: "VELATORIO VIRTUAL EN VIVO",
    tributesTitle: "Homenajes",
    eventsTitle: "Eventos",
    share: "COMPARTIR",
    login: "LOGIN",
    activateMemorial: "ACTIVAR MEMORIAL",
    liveBanner: "El velatorio virtual está en vivo — mirá la transmisión",
    upcomingLabel: "El velatorio virtual inicia",
    endedLabel: "El velatorio virtual ya finalizó",
  },
};

function formatEventLabel(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return `${date} a las 13:00`;
}

export function formatStreamTime(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStreamStatus(
  stream: MemorialConfig["stream"],
  now = new Date(),
): StreamStatus {
  if (!stream.enabled) return "disabled";
  if (stream.forceLive) return "live";
  const t = now.getTime();
  const start = new Date(stream.startsAt).getTime();
  const end = new Date(stream.endsAt).getTime();
  if (t < start) return "upcoming";
  if (t > end) return "ended";
  return "live";
}

/** @deprecated prefer getStreamStatus === "live" */
export function isStreamLiveNow(
  stream: MemorialConfig["stream"],
  now = new Date(),
): boolean {
  return getStreamStatus(stream, now) === "live";
}
