"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Checklist from "@/components/Checklist";
import { TextArea } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { EtapaKey, EtapaStatus, Historia } from "@/lib/types";
import { ETAPAS } from "@/lib/types";
import {
  ETAPA_INFO,
  ROTEIRO_CHECKLIST_ANTES,
  ROTEIRO_PASSOS,
  ROTEIRO_CHECKLIST_FINAL,
  ENTREVISTA_CATEGORIAS,
  CAPTACAO_CHECKLIST,
  EDICAO_CHECKLIST,
  ENTREGA_CHECKLIST,
} from "@/lib/etapas";

const STATUS_LABEL: Record<EtapaStatus, string> = {
  pendente: "Pendente",
  andamento: "Em andamento",
  concluida: "Concluída",
};

export default function EtapaPage({
  params,
}: {
  params: { id: string; etapa: string };
}) {
  const [historias, setHistorias, hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const h = historias.find((x) => x.id === params.id);
  const etapa = params.etapa as EtapaKey;
  const info = ETAPA_INFO[etapa];

  if (!hydrated) return null;
  if (!h || !info || !ETAPAS.includes(etapa)) {
    return <PageHeader title="Etapa não encontrada" backHref={`/historias/${params.id}`} />;
  }

  function update(patch: Partial<Historia>) {
    setHistorias(historias.map((x) => (x.id === h!.id ? { ...x, ...patch } : x)));
  }

  function setStatus(s: EtapaStatus) {
    update({ status: { ...h!.status, [etapa]: s } });
  }

  function toggleChecklist(key: string) {
    const atual = h!.checklists[etapa] ?? {};
    update({
      checklists: { ...h!.checklists, [etapa]: { ...atual, [key]: !atual[key] } },
    });
  }

  const checklistEtapa = h.checklists[etapa] ?? {};

  return (
    <div>
      <PageHeader
        eyebrow={`${info.icone} ${info.label} (${info.termoOriginal})`}
        title={h.nome}
        backHref={`/historias/${h.id}`}
      />

      <Card className="mb-6">
        <p className="text-[11px] font-semibold uppercase tracking-tightest text-signal">Missão</p>
        <p className="mt-1.5 text-[15px] leading-relaxed text-white">{info.missao}</p>
      </Card>

      <div className="flex flex-col gap-6">
        {etapa === "protagonista" && (
          <TextArea
            rows={5}
            value={h.protagonistaInfo}
            onChange={(e) => update({ protagonistaInfo: e.target.value })}
            placeholder="Quem é essa pessoa? Nome completo, contato, contexto de vida..."
          />
        )}

        {etapa === "entrevista" && (
          <div className="flex flex-col gap-5">
            {ENTREVISTA_CATEGORIAS.map((cat) => (
              <div key={cat.categoria}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                  {cat.categoria}
                </p>
                {cat.perguntas.map((p) => (
                  <div key={p} className="mb-3">
                    <p className="mb-1.5 text-[14px] font-medium text-white">{p}</p>
                    <TextArea
                      rows={2}
                      value={h.entrevista[p] ?? ""}
                      onChange={(e) => update({ entrevista: { ...h.entrevista, [p]: e.target.value } })}
                      placeholder="Resposta..."
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {etapa === "esseSouEu" && (
          <>
            <Card>
              <p className="text-sm leading-relaxed text-ink-300">
                Todo vídeo precisa ter um detalhe que não poderia pertencer a mais ninguém.
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-relaxed text-ink-500">
                <li>Cuidar do bebê antes de sair</li>
                <li>Comprar pão depois do treino</li>
                <li>Fazer uma oração</li>
                <li>Tomar café com a família</li>
                <li>Um ritual específico antes da corrida</li>
              </ul>
            </Card>
            <TextArea
              rows={4}
              value={h.esseSouEu}
              onChange={(e) => update({ esseSouEu: e.target.value })}
              placeholder='O que torna essa história única — o "Esse Sou Eu" dessa pessoa...'
            />
          </>
        )}

        {etapa === "conceito" && (
          <TextArea
            rows={5}
            value={h.conceito}
            onChange={(e) => update({ conceito: e.target.value })}
            placeholder="Emoção principal, abordagem e direção criativa do filme..."
          />
        )}

        {etapa === "roteiro" && (
          <>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                O que preciso ter antes
              </p>
              <Checklist
                itens={ROTEIRO_CHECKLIST_ANTES}
                checked={checklistEtapa}
                onToggle={toggleChecklist}
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                Passos
              </p>
              <Card className="flex flex-col gap-2">
                {ROTEIRO_PASSOS.map((p, i) => (
                  <p key={p} className="text-sm text-ink-300">
                    <span className="text-signal">{i + 1}.</span> {p}
                  </p>
                ))}
              </Card>
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                Roteiro
              </p>
              <TextArea
                rows={6}
                value={h.roteiro}
                onChange={(e) => update({ roteiro: e.target.value })}
                placeholder="Escreva o roteiro final aqui..."
              />
            </div>
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                Checklist final
              </p>
              <Checklist
                itens={ROTEIRO_CHECKLIST_FINAL}
                checked={checklistEtapa}
                onToggle={toggleChecklist}
              />
            </div>
          </>
        )}

        {etapa === "captacao" &&
          Object.entries(CAPTACAO_CHECKLIST).map(([grupo, itens]) => (
            <div key={grupo}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                {grupo}
              </p>
              <Checklist
                itens={itens.map((i) => `${grupo}:${i}`)}
                checked={checklistEtapa}
                onToggle={toggleChecklist}
              />
            </div>
          ))}

        {etapa === "edicao" && (
          <Checklist itens={EDICAO_CHECKLIST} checked={checklistEtapa} onToggle={toggleChecklist} />
        )}

        {etapa === "conteudo" && (
          <TextArea
            rows={5}
            value={h.conteudo}
            onChange={(e) => update({ conteudo: e.target.value })}
            placeholder="Ideias e notas para publicação nas redes sociais..."
          />
        )}

        {etapa === "entrega" && (
          <Checklist itens={ENTREGA_CHECKLIST} checked={checklistEtapa} onToggle={toggleChecklist} />
        )}

        {etapa === "feedback" && (
          <TextArea
            rows={5}
            value={h.feedback}
            onChange={(e) => update({ feedback: e.target.value })}
            placeholder="O que o protagonista achou do resultado?"
          />
        )}

        {etapa === "aprendizados" && (
          <TextArea
            rows={5}
            value={h.aprendizados}
            onChange={(e) => update({ aprendizados: e.target.value })}
            placeholder="O que essa história ensinou para a próxima?"
          />
        )}
      </div>

      <p className="mb-2 mt-8 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Status desta etapa
      </p>
      <div className="flex gap-2">
        {(["pendente", "andamento", "concluida"] as EtapaStatus[]).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`tap-scale focus-ring flex-1 rounded-full border py-2.5 text-xs font-medium ${
              h.status[etapa] === s
                ? "border-signal bg-signal/15 text-signal"
                : "border-ink-800 text-ink-400"
            }`}
          >
            {STATUS_LABEL[s]}
          </button>
        ))}
      </div>
    </div>
  );
}
