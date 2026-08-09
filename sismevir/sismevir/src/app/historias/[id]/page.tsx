"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";
import { ETAPAS } from "@/lib/types";
import { ETAPA_INFO } from "@/lib/etapas";
import { progresso, statusIcon } from "@/lib/historia";

export default function HistoriaDetailPage({ params }: { params: { id: string } }) {
  const [historias, setHistorias, hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const router = useRouter();
  const h = historias.find((x) => x.id === params.id);

  if (!hydrated) return null;
  if (!h) {
    return (
      <div>
        <PageHeader title="História não encontrada" backHref="/historias" />
      </div>
    );
  }

  function remover() {
    setHistorias(historias.filter((x) => x.id !== h!.id));
    router.push("/historias");
  }

  function alternarConcluida() {
    setHistorias(
      historias.map((x) => (x.id === h!.id ? { ...x, concluida: !x.concluida } : x))
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="História (Projeto)"
        title={h.nome}
        subtitle={[h.esporte, h.concluida ? "Concluída" : "Em andamento"].filter(Boolean).join(" · ")}
        backHref="/historias"
      />

      {h.objetivo && (
        <p className="mb-4 rounded-xl2 border border-ink-800 bg-ink-900 p-4 text-sm leading-relaxed text-ink-300">
          {h.objetivo}
        </p>
      )}

      <div className="mb-6 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-800">
          <div
            className="h-full rounded-full bg-signal transition-all"
            style={{ width: `${progresso(h)}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-signal">{progresso(h)}%</span>
      </div>

      <Link
        href={`/historias/${h.id}/caderno`}
        className="tap-scale focus-ring mb-6 flex items-center justify-between rounded-xl2 border border-signal/30 bg-ink-900 p-4"
      >
        <span className="text-[15px] font-medium text-white">📖 Caderno da História</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff4d2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 6 6 6-6 6" />
        </svg>
      </Link>

      <p className="mb-3 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Etapas
      </p>
      <div className="flex flex-col gap-2">
        {ETAPAS.map((etapa) => {
          const info = ETAPA_INFO[etapa];
          return (
            <Link key={etapa} href={`/historias/${h.id}/${etapa}`}>
              <Card className="tap-scale flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span>{info.icone}</span>
                  <div>
                    <p className="text-[15px] font-medium text-white">
                      {info.label}{" "}
                      <span className="text-xs font-normal text-ink-500">
                        ({info.termoOriginal})
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-base">{statusIcon(h.status[etapa])}</span>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-2.5">
        <Link
          href={`/historias/${h.id}/anotacoes`}
          className="tap-scale focus-ring rounded-full border border-ink-800 py-3 text-center text-sm font-medium text-ink-300"
        >
          📝 Anotações
        </Link>
        <Link
          href={`/historias/${h.id}/arquivos`}
          className="tap-scale focus-ring rounded-full border border-ink-800 py-3 text-center text-sm font-medium text-ink-300"
        >
          📎 Arquivos
        </Link>
        <button
          onClick={alternarConcluida}
          className="tap-scale focus-ring rounded-full border border-ink-800 py-3 text-sm font-medium text-ink-300"
        >
          {h.concluida ? "Reabrir história" : "Marcar como concluída"}
        </button>
        <button
          onClick={remover}
          className="tap-scale focus-ring rounded-full border border-signal/40 py-3 text-sm font-medium text-signal"
        >
          Remover história
        </button>
      </div>
    </div>
  );
}
