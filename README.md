# Memorial Vivo

Plantilla Next.js (demo de venta) para memoriales online con **velatorio virtual en vivo**. Lista para Vercel.

## Inicio rápido

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Qué incluye la demo

- Página de memorial genérica (marca + fallecido de ejemplo)
- Un solo evento: **Velatorio**
- Botón rojo **EN VIVO** solo durante la ventana del velatorio (`startsAt` / `endsAt`)
- Modal con player (YouTube por defecto)
- Homenajes: mensaje, foto y vela — se guardan en **localStorage** del navegador
- Sin fotos reales: avatar con iniciales + banner en CSS

## Stream: opción más fácil (YouTube Live)

Para el comprador no hace falta servidor de video:

1. Transmitir desde el celular o una cámara a **YouTube Live**
2. En `src/data/config.ts`, pegar el link:

```ts
stream: {
  enabled: true,
  type: "youtube",
  url: "https://www.youtube.com/watch?v=XXXX",
  startsAt: "2026-08-07T13:00:00-03:00",
  endsAt: "2026-08-07T17:00:00-03:00",
  forceLive: false, // en producción
}
```

### Otras opciones

| `type` | Cuándo usarla |
|--------|----------------|
| `youtube` | **Recomendada** — cero infraestructura |
| `hls` | Cámara IP / NVR que publique `.m3u8` |
| `iframe` | Player de un proveedor (Mux, Wowza, etc.) |
| `mp4` | Solo demos con archivo local |

## Botón EN VIVO

- Visible solo entre `stream.startsAt` y `stream.endsAt`
- Fuera de ese horario **no se muestra**
- `forceLive: true` → siempre visible (útil para mostrar a un cliente). Al entregar el proyecto, poner `false`

## Personalización al vender

Editá `src/data/config.ts`:

- `brand` — nombre, teléfono, menú
- `deceased` — nombre, años, `initials` (y opcional `photoUrl` / `bannerUrl`)
- `stream` — URL de YouTube Live + horarios
- `events` — datos del velatorio

## Deploy en Vercel

1. Repo en GitHub
2. Importar en [vercel.com](https://vercel.com)
3. Deploy

## Stack

Next.js 16 · Tailwind CSS 4 · hls.js · lucide-react
