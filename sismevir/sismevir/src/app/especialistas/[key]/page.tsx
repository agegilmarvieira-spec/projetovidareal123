"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { TextArea } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";
import { ESPECIALISTAS, gerarContexto } from "@/lib/especialistas";

export default function EspecialistaPage({ params }: { params: { key: string } }) {
  const [historias, setHistorias, hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const esp = ESPECIALISTAS.find((e) => e.key === params.key);
  const [historiaId, setHistoriaId] = useState<string>("");
  const [copiado, setCopiado] = useState(false);
  const [resultado, setResultado] = useState("");

  if (!esp) return <PageHeader title="Especialista não encontrado" backHref="/especialistas" />;
  if (!hydrated) return null;

  const h = historias.find((x) => x.id === historiaId);
  const contexto = h ? gerarContexto(esp, h) : "";

  async function copiar() {
    try {
      await navigator.clipboard.writeText(contexto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // clipboard indisponível — o texto continua selecionável manualmente
    }
  }

  function salvar() {
    if (!h || !resultado.trim()) return;
    setHistorias(
      historias.map((x) =>
        x.id === h.id ? { ...x, especialistas: { ...x.especialistas, [esp!.key]: resultado } } : x
      )
    );
    setResultado("");
  }

  return (
    <div>
      <PageHeader
        eyebrow={`${esp.numero} — Especialista`}
        title={esp.titulo}
        subtitle={esp.missao}
        backHref="/especialistas"
      />

      {historias.length === 0 ? (
        <EmptyState title="Nenhuma história ainda" hint="Crie uma história primeiro para gerar o contexto." />
      ) : (
        <>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
            Para qual história?
          </p>
          <select
            value={historiaId}
            onChange={(e) => setHistoriaId(e.target.value)}
            className="mb-6 w-full rounded-lg border border-ink-800 bg-ink-950 px-3.5 py-3 text-[15px] text-white focus-ring"
          >
            <option value="">Selecione...</option>
            {historias.map((x) => (
              <option key={x.id} value={x.id}>
                {x.nome} — {x.esporte}
              </option>
            ))}
          </select>

          {h && (
            <>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                🎯 Missão para o especialista
              </p>
              <Card className="mb-3 whitespace-pre-wrap text-sm leading-relaxed text-ink-200">
                {contexto}
              </Card>
              <button
                onClick={copiar}
                className="tap-scale focus-ring mb-8 w-full rounded-full bg-signal py-3 text-sm font-semibold text-white"
              >
                {copiado ? "Copiado!" : "📋 Copiar missão"}
              </button>

              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                📥 Colar resultado do especialista
              </p>
              <TextArea
                rows={8}
                value={resultado}
                onChange={(e) => setResultado(e.target.value)}
                placeholder="Cole aqui o que o ChatGPT respondeu..."
              />
              <button
                onClick={salvar}
                disabled={!resultado.trim()}
                className="tap-scale focus-ring mt-3 w-full rounded-full border border-ink-800 py-3 text-sm font-medium text-white disabled:opacity-40"
              >
                Salvar resultado
              </button>

              {h.especialistas[esp.key] && (
                <>
                  <p className="mb-2 mt-8 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                    Último resultado salvo
                  </p>
                  <Card className="whitespace-pre-wrap text-sm leading-relaxed text-ink-300">
                    {h.especialistas[esp.key]}
                  </Card>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
