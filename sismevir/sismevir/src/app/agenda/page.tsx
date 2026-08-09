"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { Field, TextInput } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS, uid } from "@/lib/storage";
import type { EventoAgenda } from "@/lib/types";

const tipos = ["Gravação", "Entrevista", "Entrega", "Reunião", "Publicação", "Follow-up"];

export default function AgendaPage() {
  const [eventos, setEventos, hydrated] = useStored<EventoAgenda[]>(KEYS.agenda, []);
  const [form, setForm] = useState({ titulo: "", tipo: tipos[0], data: "", notas: "" });

  function adicionar() {
    if (!form.titulo.trim() || !form.data) return;
    const novo: EventoAgenda = { id: uid(), createdAt: Date.now(), ...form };
    setEventos([...eventos, novo].sort((a, b) => a.data.localeCompare(b.data)));
    setForm({ titulo: "", tipo: tipos[0], data: "", notas: "" });
  }

  function remover(id: string) {
    setEventos(eventos.filter((e) => e.id !== id));
  }

  return (
    <div>
      <PageHeader
        eyebrow="Agenda (Calendário)"
        title="Compromissos"
        subtitle="Gravações, entrevistas, entregas e reuniões."
        backHref="/mais"
      />

      <div className="mb-6 flex flex-col gap-3">
        <Field label="Título">
          <TextInput
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            placeholder="Ex: Gravação — João"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo">
            <select
              value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              className="w-full rounded-lg border border-ink-800 bg-ink-950 px-3.5 py-3 text-[15px] text-white focus-ring"
            >
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Data">
            <TextInput
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
            />
          </Field>
        </div>
        <button
          onClick={adicionar}
          disabled={!form.titulo.trim() || !form.data}
          className="tap-scale focus-ring rounded-full bg-signal py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Adicionar compromisso
        </button>
      </div>

      {!hydrated ? null : eventos.length === 0 ? (
        <EmptyState title="Agenda vazia" hint="Os próximos compromissos aparecem aqui." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {eventos.map((e) => (
            <Card key={e.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[15px] font-medium text-white">{e.titulo}</p>
                <p className="mt-0.5 text-xs text-ink-500">
                  {e.tipo} · {new Date(e.data + "T00:00:00").toLocaleDateString("pt-BR")}
                </p>
              </div>
              <button
                onClick={() => remover(e.id)}
                className="tap-scale focus-ring shrink-0 text-xs font-medium text-ink-500"
              >
                Remover
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
