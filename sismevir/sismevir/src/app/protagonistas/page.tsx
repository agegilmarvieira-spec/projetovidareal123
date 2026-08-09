"use client";

import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Historia } from "@/lib/types";

export default function ProtagonistasPage() {
  const [historias, , hydrated] = useStored<Historia[]>(KEYS.historias, []);

  return (
    <div>
      <PageHeader
        eyebrow="Protagonistas (Clientes)"
        title="Quem já contou sua história"
        subtitle="Cada protagonista vem de uma História criada."
        backHref="/mais"
      />

      {!hydrated ? null : historias.length === 0 ? (
        <EmptyState
          title="Nenhum protagonista ainda"
          hint="Protagonistas aparecem aqui assim que você criar uma História."
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {historias.map((h) => (
            <Link key={h.id} href={`/historias/${h.id}/protagonista`}>
              <Card className="tap-scale">
                <p className="text-[15px] font-medium text-white">{h.nome}</p>
                <p className="mt-0.5 text-xs text-ink-500">{h.esporte || "—"}</p>
                {h.protagonistaInfo && (
                  <p className="mt-2 line-clamp-2 text-sm text-ink-400">{h.protagonistaInfo}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
