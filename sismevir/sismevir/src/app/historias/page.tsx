"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { Field, TextInput, TextArea } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";
import { novaHistoria, progresso, proximaMissao } from "@/lib/historia";
import { ETAPA_INFO } from "@/lib/etapas";

export default function HistoriasPage() {
  const [historias, setHistorias, hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const [aberto, setAberto] = useState(false);
  const [form, setForm] = useState({ nome: "", esporte: "", objetivo: "" });

  function criar() {
    if (!form.nome.trim()) return;
    const h = novaHistoria(form.nome, form.esporte, form.objetivo);
    setHistorias([h, ...historias]);
    setForm({ nome: "", esporte: "", objetivo: "" });
    setAberto(false);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Histórias (Projetos)"
        title="Suas histórias"
        subtitle="Cada história conduz do primeiro contato até a entrega."
        backHref="/"
      />

      <button
        onClick={() => setAberto((v) => !v)}
        className="tap-scale focus-ring mb-5 w-full rounded-full border border-ink-800 py-3 text-sm font-medium text-white"
      >
        {aberto ? "Fechar" : "+ Nova história"}
      </button>

      {aberto && (
        <div className="mb-6 flex flex-col gap-3">
          <Field label="Nome do protagonista">
            <TextInput
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Ex: João"
            />
          </Field>
          <Field label="Esporte">
            <TextInput
              value={form.esporte}
              onChange={(e) => setForm({ ...form, esporte: e.target.value })}
              placeholder="Ex: Mundial de Orientação"
            />
          </Field>
          <Field label="Objetivo">
            <TextArea
              rows={2}
              value={form.objetivo}
              onChange={(e) => setForm({ ...form, objetivo: e.target.value })}
              placeholder="Para que essa história vai servir?"
            />
          </Field>
          <button
            onClick={criar}
            disabled={!form.nome.trim()}
            className="tap-scale focus-ring rounded-full bg-signal py-3 text-sm font-semibold text-white disabled:opacity-40"
          >
            Criar história
          </button>
        </div>
      )}

      {!hydrated ? null : historias.length === 0 ? (
        <EmptyState
          title="Nenhuma história ainda"
          hint="A primeira que você criar aparece aqui."
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {historias.map((h) => {
            const prox = proximaMissao(h);
            return (
              <Link key={h.id} href={`/historias/${h.id}`}>
                <Card className="tap-scale">
                  <div className="flex items-center justify-between">
                    <p className="text-[15px] font-medium text-white">
                      {h.nome} — {h.esporte || "—"}
                    </p>
                    <p className="text-xs font-semibold text-signal">{progresso(h)}%</p>
                  </div>
                  <p className="mt-1 text-xs text-ink-500">
                    {h.concluida
                      ? "Concluída"
                      : prox
                        ? `🎯 Próxima missão: ${ETAPA_INFO[prox].label}`
                        : "—"}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
