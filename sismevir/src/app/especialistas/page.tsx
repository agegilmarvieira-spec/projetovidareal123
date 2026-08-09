import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import { ESPECIALISTAS } from "@/lib/especialistas";

export default function EspecialistasPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Especialistas (Chats GPT)"
        title="Prepare o contexto certo"
        subtitle="Cada especialista monta um texto pronto para colar no ChatGPT. Depois, cole o resultado de volta aqui."
        backHref="/"
      />
      <div className="flex flex-col gap-2.5">
        {ESPECIALISTAS.map((e) => (
          <Link key={e.key} href={`/especialistas/${e.key}`}>
            <Card className="tap-scale flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal/15 text-[11px] font-semibold text-signal">
                {e.numero}
              </span>
              <div>
                <p className="text-[15px] font-medium text-white">{e.titulo}</p>
                <p className="mt-0.5 text-xs leading-snug text-ink-500">{e.missao}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
