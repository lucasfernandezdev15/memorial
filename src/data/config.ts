/**
 * CONFIGURACIÓN DEL MEMORIAL (demo de venta genérica)
 * Al vender: cambiá marca, fallecido, horarios y URL del stream.
 */

export type StreamType = "youtube" | "hls" | "iframe" | "mp4";

export type TributeType = "message" | "photo" | "candle";

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
    /** Iniciales si no hay foto */
    initials: string;
    /** Opcional: dejar vacío para usar placeholder */
    photoUrl?: string;
    bannerUrl?: string;
  };
  stream: {
    enabled: boolean;
    /**
     * Lo más fácil para el comprador: YouTube Live.
     * 1) Transmitir desde el celular/cámara a YouTube
     * 2) Pegar acá el link o el ID del video
     */
    type: StreamType;
    url: string;
    /** Inicio de la velación (ISO). El botón EN VIVO solo se ve en esta ventana. */
    startsAt: string;
    /** Fin de la velación (ISO). */
    endsAt: string;
    /**
     * true = botón siempre visible (útil para demos de venta).
     * En entrega al cliente: false, y usá startsAt/endsAt reales.
     */
    forceLive: boolean;
  };
  events: CeremonyEvent[];
  /** Homenajes iniciales de demo (se mezclan con lo guardado en el navegador) */
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
  };
}

/** Ventana de demo: todo el día de hoy (hora local del servidor/build). */
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
    phoneLabel: "0800 123 4848 · 24H",
    logoText: "Memorial Vivo",
    navLinks: [
      { label: "Institucional", href: "#" },
      { label: "Floristería", href: "#" },
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
    // Opción más fácil de instalar: YouTube Live (solo pegar URL)
    type: "youtube",
    // Video de demo (paisaje tranquilo). Al vender: URL del YouTube Live real.
    url: "https://www.youtube.com/watch?v=BHACKCNDMW8",
    startsAt: liveWindow.startsAt,
    endsAt: liveWindow.endsAt,
    // Demo de venta: botón visible. Al entregar: false + horarios reales.
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
      content: "Encendió una vela en su memoria.",
      createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    },
    {
      id: "seed-2",
      author: "Leonardo",
      relation: "Sobrino",
      type: "candle",
      content: "Encendió una vela en su memoria.",
      createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    },
    {
      id: "seed-3",
      author: "Familia Rodríguez",
      type: "message",
      content:
        "Con profundo respeto y cariño, acompañamos a la familia en este momento. Su legado permanece entre nosotros.",
      createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
  ],
  texts: {
    shareMemory: "Compartí una memoria",
    sendMessage: "Enviá un mensaje",
    lightCandle: "Encendé una vela",
    watchingLive: "Estás mirando el velatorio virtual de",
    liveBadge: "En vivo",
    liveButton: "Velatorio virtual en vivo",
    tributesTitle: "Homenajes",
    eventsTitle: "Eventos",
    share: "Compartir",
    login: "Login",
    activateMemorial: "Activar memorial",
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

/** ¿El botón EN VIVO debe mostrarse ahora? */
export function isStreamLiveNow(
  stream: MemorialConfig["stream"],
  now = new Date(),
): boolean {
  if (!stream.enabled) return false;
  if (stream.forceLive) return true;
  const t = now.getTime();
  return t >= new Date(stream.startsAt).getTime() && t <= new Date(stream.endsAt).getTime();
}
