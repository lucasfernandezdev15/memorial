"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Tribute, TributeType } from "@/data/config";

interface TributeFormModalProps {
  open: boolean;
  mode: TributeType | null;
  onClose: () => void;
  onSubmit: (tribute: Tribute) => void;
}

const titles: Record<TributeType, string> = {
  message: "Enviar un mensaje",
  candle: "Encender una vela",
  photo: "Compartir un recuerdo",
};

export function TributeFormModal({
  open,
  mode,
  onClose,
  onSubmit,
}: TributeFormModalProps) {
  const [author, setAuthor] = useState("");
  const [relation, setRelation] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  if (!open || !mode) return null;

  const reset = () => {
    setAuthor("");
    setRelation("");
    setContent("");
    setImageUrl(undefined);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleImage = (file: File | null) => {
    if (!file) {
      setImageUrl(undefined);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!author.trim()) return;

    const defaultContent =
      mode === "candle"
        ? "Encendió una vela en su memoria."
        : mode === "photo"
          ? "Compartió un recuerdo."
          : content.trim();

    if (mode === "message" && !content.trim()) return;
    if (mode === "photo" && !imageUrl) return;

    onSubmit({
      id: `local-${Date.now()}`,
      author: author.trim(),
      relation: relation.trim() || undefined,
      type: mode,
      content: mode === "message" ? content.trim() : defaultContent,
      imageUrl,
      createdAt: new Date().toISOString(),
    });
    reset();
    onClose();
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted transition hover:bg-background hover:text-ink"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-display pr-8 text-2xl font-semibold text-ink">
          {titles[mode]}
        </h2>
        <p className="mt-1 text-xs text-muted">
          Se guarda en este navegador (demo local).
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block text-sm font-medium">
            Tu nombre
            <input
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
              placeholder="Nombre"
            />
          </label>

          <label className="block text-sm font-medium">
            Parentesco / relación
            <input
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className={inputClass}
              placeholder="Opcional"
            />
          </label>

          {mode === "message" && (
            <label className="block text-sm font-medium">
              Mensaje
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Escribí tu mensaje..."
              />
            </label>
          )}

          {mode === "photo" && (
            <label className="block text-sm font-medium">
              Foto
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files?.[0] ?? null)}
                className="mt-2 w-full text-sm"
              />
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="mt-3 max-h-40 w-full rounded-xl object-cover"
                />
              )}
            </label>
          )}

          {mode === "candle" && (
            <p className="rounded-xl bg-accent/10 px-4 py-3 text-sm text-accent-dark">
              Se publicará una vela en el memorial como gesto de recuerdo.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-brand py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
