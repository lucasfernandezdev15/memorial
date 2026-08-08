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
  message: "Dejar un mensaje",
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-paper px-8 py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted transition hover:text-ink"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <p className="text-[11px] uppercase tracking-[0.28em] text-brass">
          Homenaje
        </p>
        <h2 className="font-serif mt-2 text-3xl font-medium tracking-wide text-ink">
          {titles[mode]}
        </h2>
        <div className="ornament-line mt-4 w-16" />
        <p className="mt-4 text-xs tracking-wide text-muted">
          Se guarda en este navegador (demo local).
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
            Su nombre
            <input
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="field mt-1 text-sm tracking-normal text-foreground normal-case"
              placeholder="Nombre completo"
            />
          </label>

          <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
            Relación
            <input
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="field mt-1 text-sm tracking-normal text-foreground normal-case"
              placeholder="Opcional"
            />
          </label>

          {mode === "message" && (
            <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
              Mensaje
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="field mt-1 resize-none text-sm tracking-normal text-foreground normal-case"
                placeholder="Escriba su mensaje..."
              />
            </label>
          )}

          {mode === "photo" && (
            <label className="block text-[11px] uppercase tracking-[0.16em] text-muted">
              Imagen
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files?.[0] ?? null)}
                className="mt-3 w-full text-sm normal-case tracking-normal text-foreground"
              />
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="mt-4 max-h-40 w-full object-cover"
                />
              )}
            </label>
          )}

          {mode === "candle" && (
            <p className="border-y border-border py-4 text-sm italic leading-relaxed text-brand-mid">
              Se publicará una vela en el memorial, como gesto de presencia y
              recuerdo.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-brand py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-paper transition hover:bg-brand-mid"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
