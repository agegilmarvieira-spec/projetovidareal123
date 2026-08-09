import { ETAPAS } from "./types";
import type { EtapaKey, EtapaStatus, Historia } from "./types";
import { uid } from "./storage";

export function novaHistoria(nome: string, esporte: string, objetivo: string): Historia {
  const status = {} as Record<EtapaKey, EtapaStatus>;
  ETAPAS.forEach((e) => (status[e] = "pendente"));

  return {
    id: uid(),
    nome,
    esporte,
    objetivo,
    createdAt: Date.now(),
    protagonistaInfo: "",
    entrevista: {},
    esseSouEu: "",
    conceito: "",
    roteiro: "",
    conteudo: "",
    checklists: {},
    feedback: "",
    aprendizados: "",
    anotacoes: "",
    arquivos: [],
    status,
    especialistas: {},
    concluida: false,
  };
}

export function progresso(h: Historia): number {
  const concluidas = ETAPAS.filter((e) => h.status[e] === "concluida").length;
  return Math.round((concluidas / ETAPAS.length) * 100);
}

export function proximaMissao(h: Historia): EtapaKey | null {
  const proxima = ETAPAS.find((e) => h.status[e] !== "concluida");
  return proxima ?? null;
}

export function statusIcon(s: EtapaStatus): string {
  if (s === "concluida") return "✓";
  if (s === "andamento") return "🟡";
  return "⚪";
}
