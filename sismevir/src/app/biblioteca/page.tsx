"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { Field, TextInput, TextArea } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS, uid } from "@/lib/storage";
import type { BibliotecaCategoria, BibliotecaItem } from "@/lib/types";

const categorias: BibliotecaCategoria[] = [
  "Frases",
  "Ideias",
  "Referências",
  "Fotos",
  "Vídeos",
  "Documentos",
  "Templates",
];

export default function BibliotecaPage() {
  const [itens, setItens, hydrated] = useStored<BibliotecaItem[]>(KEYS.biblioteca, []);
  const [ativa, setAtiva] = useState<BibliotecaCategoria>("Frases");
  const [form, setForm] = useState({ titulo: "", conteudo: "" });

  function salvar() {
    if (!form.titulo.trim()) return;
    const novo: BibliotecaItem = { id: uid(), createdAt: Date.now(), categoria: ativa, ...form };
    setItens([novo, ...itens]);
    setForm({ titulo: "", conteudo: "" });
  }

  function remover(id: string) {
    setItens(itens.filter((i) => i.id !== id));
  }

  const filtrados = itens.filter((i) => i.categoria === ativa);

  return (
    <div>
      <PageHeader
        eyebrow="Biblioteca (Arquivos)"
        title="Frases, ideias e referências"
        subtitle="Inclui o Banco de Frases e o Banco de Ideias."
        backHref="/"
      />

      <div className="scrollbar-none mb-5 flex gap-2 overflow-x-auto">
        {categorias.map((c) => (
          <button
            key={c}
            onClick={() => setAtiva(c)}
            className={`tap-scale focus-ring shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
              ativa === c ? "border-signal bg-signal/15 text-signal" : "border-ink-800 text-ink-400"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-3">
        <Field label="Título">
          <TextInput
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            placeholder={`Adicionar em ${ativa}`}
          />
        </Field>
        <Field label="Conteúdo">
          <TextArea
            rows={2}
            value={form.conteudo}
            onChange={(e) => setForm({ ...form, conteudo: e.target.value })}
            placeholder="Texto, link ou descrição"
          />
        </Field>
        <button
          onClick={salvar}
          disabled={!form.titulo.trim()}
          className="tap-scale focus-ring rounded-full bg-signal py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Adicionar a {ativa}
        </button>
      </div>

      {!hydrated ? null : filtrados.length === 0 ? (
        <EmptyState title={`Nada em ${ativa} ainda`} hint="O que você adicionar aqui fica guardado neste aparelho." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {filtrados.map((i) => (
            <Card key={i.id}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-[15px] font-medium text-white">{i.titulo}</p>
                <button
                  onClick={() => remover(i.id)}
                  className="tap-scale focus-ring shrink-0 text-xs font-medium text-ink-500"
                >
                  Remover
                </button>
              </div>
              {i.conteudo && <p className="mt-1.5 text-sm leading-relaxed text-ink-400">{i.conteudo}</p>}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
