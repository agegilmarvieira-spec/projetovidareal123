"use client";

const PREFIX = "sismevir:";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // armazenamento indisponível — falha silenciosa, dado fica só na sessão
  }
}

export const storage = { read, write };

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export const KEYS = {
  historias: "historias",
  agenda: "agenda",
  financeiro: "financeiro",
  biblioteca: "biblioteca",
  config: "config",
} as const;
