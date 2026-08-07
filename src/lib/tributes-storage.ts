import type { Tribute } from "@/data/config";

const STORAGE_KEY = "memorial-vivo-tributes";

export function loadLocalTributes(): Tribute[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Tribute[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalTributes(tributes: Tribute[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tributes));
}

export function addLocalTribute(tribute: Tribute): Tribute[] {
  const current = loadLocalTributes();
  const next = [tribute, ...current];
  saveLocalTributes(next);
  return next;
}
