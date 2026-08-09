"use client";

import Link from "next/link";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";
import { progresso, proximaMissao } from "@/lib/historia";
import { ETAPA_INFO } from "@/lib/etapas";
import EmptyState from "@/components/EmptyState";

export default function DashboardPage() {
  const [historias, , hydrated] = useStored<Historia[]>(KEYS.historias, []);

  const emAndamento = historias.filter((h) => !h.concluida);
  const destaque = emAndamento[0];
  const missaoDestaque = destaque ? proximaMissao(destaque) : null;

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-tightest text-signal">
        {today}
      </p>
      <div className="mt-2 flex items-center gap-3">
        <img
          src="/brand/logo-gv-monograma.png"
          alt=""
          className="h-11 w-11 shrink-0 rounded-lg"
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-tightest text-white">
            SISMeViR
          </h1>
          <p className="text-sm text-ink-400">Contando histórias através do esporte.</p>
        </div>
      </div>

      <p className="mb-3 mt-8 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Missão do dia
      </p>

      {!hydrated ? null : !destaque || !missaoDestaque ? (
        <EmptyState
          title="Nenhuma missão pendente"
          hint="Crie uma nova História para o sistema te mostrar o próximo passo."
        />
      ) : (
        <Link
          href={`/historias/${destaque.id}/${missaoDestaque}`}
          className="tap-scale focus-ring relative block overflow-hidden rounded-xl2 border border-ink-800 bg-gradient-to-br from-ink-900 to-ink-950 p-6"
        >
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-signal/20 blur-3xl" />
          <p className="text-xs font-medium uppercase tracking-tightest text-signal">
            🎯 {ETAPA_INFO[missaoDestaque].label}
          </p>
          <p className="mt-2 text-lg font-medium leading-snug text-white">
            {ETAPA_INFO[missaoDestaque].missao}
          </p>
          <p className="mt-3 text-sm text-ink-400">
            História: {destaque.nome} — {destaque.esporte}
          </p>
          <p className="mt-1 text-xs text-ink-500">
            Progresso: {progresso(destaque)}%
          </p>
          <span className="tap-scale mt-4 inline-flex items-center gap-2 rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white">
            Iniciar missão
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      )}

      <div className="mb-3 mt-8 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
          Histórias em andamento
        </p>
        <Link href="/historias" className="text-xs font-medium text-signal">
          Ver todas
        </Link>
      </div>

      {!hydrated ? null : emAndamento.length === 0 ? (
        <EmptyState
          title="Nenhuma história em andamento"
          hint="Comece uma nova história para ver o progresso aqui."
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {emAndamento.slice(0, 4).map((h) => {
            const prox = proximaMissao(h);
            return (
              <Link
                key={h.id}
                href={`/historias/${h.id}`}
                className="tap-scale focus-ring rounded-xl2 border border-ink-800 bg-ink-900 p-4 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[15px] font-medium text-white">
                    {h.nome} — {h.esporte}
                  </p>
                  <p className="text-xs font-semibold text-signal">{progresso(h)}%</p>
                </div>
                {prox && (
                  <p className="mt-1 text-xs text-ink-500">
                    Próxima missão: {ETAPA_INFO[prox].label}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}

      <p className="mb-3 mt-8 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Próximos compromissos
      </p>
      <EmptyState
        title="Agenda ainda não conectada"
        hint="Em breve, a Agenda vai mostrar aqui os próximos compromissos."
      />
    </div>
  );
}
