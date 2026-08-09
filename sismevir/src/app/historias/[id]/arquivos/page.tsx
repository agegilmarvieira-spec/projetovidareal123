"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { Field, TextInput } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS, uid } from "@/lib/storage";
import type { Historia } from "@/lib/types";

export default function ArquivosPage({ params }: { params: { id: string } }) {
  const [historias, setHistorias, hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const h = historias.find((x) => x.id === params.id);
  const [form, setForm] = useState({ nome: "", link: "" });

  if (!hydrated) return null;
  if (!h) return <PageHeader title="História não encontrada" backHref="/historias" />;

  function adicionar() {
    if (!form.nome.trim()) return;
    const novo = { id: uid(), ...form };
    setHistorias(
      historias.map((x) => (x.id === h!.id ? { ...x, arquivos: [novo, ...x.arquivos] } : x))
    );
    setForm({ nome: "", link: "" });
  }

  function remover(id: string) {
    setHistorias(
      historias.map((x) =>
        x.id === h!.id ? { ...x, arquivos: x.arquivos.filter((a) => a.id !== id) } : x
      )
    );
  }

  return (
    <div>
      <PageHeader eyebrow="📎 Arquivos (Uploads)" title={h.nome} backHref={`/historias/${h.id}`} />

      <div className="mb-6 flex flex-col gap-3">
        <Field label="Nome do arquivo">
          <TextInput
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            placeholder="Ex: Roteiro final.pdf"
          />
        </Field>
        <Field label="Link (Google Drive, etc.)">
          <TextInput
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://..."
          />
        </Field>
        <button
          onClick={adicionar}
          disabled={!form.nome.trim()}
          className="tap-scale focus-ring rounded-full bg-signal py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Adicionar arquivo
        </button>
      </div>

      {h.arquivos.length === 0 ? (
        <EmptyState title="Nenhum arquivo ainda" hint="Referências, fotos, roteiros e documentos aparecem aqui." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {h.arquivos.map((a) => (
            <Card key={a.id} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-medium text-white">{a.nome}</p>
                {a.link && (
                  <a href={a.link} target="_blank" rel="noreferrer" className="truncate text-xs text-signal">
                    {a.link}
                  </a>
                )}
              </div>
              <button
                onClick={() => remover(a.id)}
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
