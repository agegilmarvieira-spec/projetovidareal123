import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const sections = [
  { href: "/protagonistas", label: "Protagonistas", desc: "Clientes" },
  { href: "/metodo", label: "Método Vida Real", desc: "Manual" },
  { href: "/agenda", label: "Agenda", desc: "Calendário" },
  { href: "/financeiro", label: "Financeiro", desc: "Vendas" },
  { href: "/configuracoes", label: "Configurações", desc: "Sistema" },
];

export default function MaisPage() {
  return (
    <div>
      <PageHeader title="Mais" subtitle="O restante do sistema, em um lugar só." back={false} />
      <div className="flex flex-col gap-2.5">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="tap-scale focus-ring flex items-center justify-between rounded-xl2 border border-ink-800 bg-ink-900 p-4 shadow-card"
          >
            <div>
              <p className="text-[15px] font-medium text-white">{s.label}</p>
              <p className="mt-0.5 text-xs text-ink-500">({s.desc})</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
