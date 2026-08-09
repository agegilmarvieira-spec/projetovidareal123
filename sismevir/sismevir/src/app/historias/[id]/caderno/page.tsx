"use client";

import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";

export default function CadernoPage({ params }: { params: { id: string } }) {
  const [historias, , hydrated] = useStored<Historia[]>(KEYS.historias, []);
  const h = historias.find((x) => x.id === params.id);

  if (!hydrated) return null;
  if (!h) return <PageHeader title="História não encontrada" backHref="/historias" />;

  const secoes = [
    { titulo: "Protagonista", texto: h.protagonistaInfo },
    { titulo: "Conceito do filme", texto: h.conceito },
    { titulo: 'Momento "Esse Sou Eu"', texto: h.esseSouEu },
    { titulo: "Roteiro (cenas a gravar)", texto: h.roteiro },
  ].filter((s) => s.texto?.trim());

  return (
    <div>
      <PageHeader eyebrow="📖 Caderno da História" title={h.nome} backHref={`/historias/${h.id}`} />

      <img
        src="/brand/logo-conte-sua-historia.png"
        alt="Conte a sua história"
        className="mb-6 w-full rounded-xl2"
      />

      <Card className="mb-6 bg-gradient-to-br from-ink-900 to-ink-950">
        <p className="text-[11px] font-semibold uppercase tracking-tightest text-signal">
          O que vamos criar juntos
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-white">
          Eu não quero apenas mostrar o seu esporte. Quero mostrar quem você é através dele.
        </p>
      </Card>

      {secoes.length === 0 ? (
        <p className="text-sm text-ink-500">
          Preencha as etapas da história para o caderno ganhar conteúdo.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {secoes.map((s) => (
            <Card key={s.titulo}>
              <p className="text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
                {s.titulo}
              </p>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-ink-200">
                {s.texto}
              </p>
            </Card>
          ))}
        </div>
      )}

      <Card className="mt-6 text-center">
        <p className="text-sm leading-relaxed text-ink-300">
          No fim das contas, o que inspira não é o seu pace. É a sua história.
        </p>
        <p className="mt-3 text-[11px] text-ink-500">(adapte esta frase para o esporte, se não for corrida)</p>
        <div className="mt-4 flex flex-col items-center border-t border-ink-800 pt-4">
          <img
            src="/brand/logo-gilmar-videos.png"
            alt="Gilmar Vieira Videomaker"
            className="h-14 w-14 rounded-lg"
          />
          <p className="mt-2 text-sm font-medium text-white">Gilmar Vieira Videomaker</p>
          <p className="text-xs text-ink-500">Contando histórias através do esporte.</p>
        </div>
      </Card>

      <p className="mt-6 text-center text-xs text-ink-600">
        Geração de PDF ainda não disponível nesta versão — apresente esta tela diretamente ao protagonista.
      </p>
    </div>
  );
}
