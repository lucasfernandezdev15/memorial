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
  message: "Enviá un mensaje de cariño",
  candle: "Encendé una vela virtual",
  photo: "Compartí una memoria",
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
        ? "Encendió una vela virtual en su memoria."
        : mode === "photo"
          ? "Compartió una memoria."
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="pr-8 text-lg font-semibold text-foreground">
          {titles[mode]}
        </h2>
        <p className="mt-1 text-xs text-muted">
          Se guarda en este navegador (demo local).
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <label className="block text-sm">
            <span className="mb-1 block font-medium">Tu nombre</span>
            <input
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-brand"
              placeholder="Nombre"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-1 block font-medium">Parentesco / relación</span>
            <input
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full rounded-lg border border-border px-3 py-2 outline-none focus:border-brand"
              placeholder="Opcional"
            />
          </label>

          {mode === "message" && (
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Mensaje</span>
              <textarea
                required
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full resize-none rounded-lg border border-border px-3 py-2 outline-none focus:border-brand"
                placeholder="Escribí tu mensaje..."
              />
            </label>
          )}

          {mode === "photo" && (
            <label className="block text-sm">
              <span className="mb-1 block font-medium">Foto</span>
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => handleImage(e.target.files?.[0] ?? null)}
                className="w-full text-sm"
              />
              {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="mt-2 max-h-40 w-full rounded-lg object-cover"
                />
              )}
            </label>
          )}

          {mode === "candle" && (
            <p className="rounded-lg bg-brand/10 px-3 py-3 text-sm text-brand-dark">
              Se publicará una vela virtual en el memorial.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-brand py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-dark"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
