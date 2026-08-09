"use client";

import PageHeader from "@/components/PageHeader";
import { TextArea } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";

export default function AnotacoesPage({ params }: { params: { id: string } }) {
  const [historias, setHistorias, hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const h = historias.find((x) => x.id === params.id);

  if (!hydrated) return null;
  if (!h) return <PageHeader title="História não encontrada" backHref="/historias" />;

  return (
    <div>
      <PageHeader eyebrow="📝 Anotações (Notas)" title={h.nome} backHref={`/historias/${h.id}`} />
      <TextArea
        rows={12}
        value={h.anotacoes}
        onChange={(e) =>
          setHistorias(historias.map((x) => (x.id === h.id ? { ...x, anotacoes: e.target.value } : x)))
        }
        placeholder="Qualquer coisa que você queira guardar sobre essa história..."
      />
    </div>
  );
}
