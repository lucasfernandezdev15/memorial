"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import type { StreamType } from "@/data/config";

interface LivePlayerProps {
  type: StreamType;
  url: string;
  posterUrl?: string;
}

export function LivePlayer({ type, url, posterUrl }: LivePlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (type !== "hls" && type !== "mp4") return;
    const video = videoRef.current;
    if (!video) return;

    if (type === "mp4") {
      video.src = url;
      void video.play().catch(() => undefined);
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      void video.play().catch(() => undefined);
      return;
    }

    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        void video.play().catch(() => undefined);
      });
      return () => hls.destroy();
    }
  }, [type, url]);

  if (type === "youtube") {
    const embedUrl = url.includes("youtube.com") || url.includes("youtu.be")
      ? toYoutubeEmbed(url)
      : `https://www.youtube.com/embed/${url}?autoplay=1&rel=0`;

    return (
      <iframe
        className="aspect-video w-full rounded-md bg-black"
        src={embedUrl}
        title="Velatorio en vivo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (type === "iframe") {
    return (
      <iframe
        className="aspect-video w-full rounded-md bg-black"
        src={url}
        title="Velatorio en vivo"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className="aspect-video w-full rounded-md bg-black object-contain"
      controls
      playsInline
      autoPlay
      muted
      poster={posterUrl}
    />
  );
}

function toYoutubeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}?autoplay=1&rel=0`;
    }
    const id = parsed.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  } catch {
    /* ignore */
  }
  return url;
}
