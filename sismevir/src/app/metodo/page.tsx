import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";

const filosofia = [
  { titulo: "Identidade", texto: "Eu conto histórias através do esporte." },
  { titulo: "Assinatura da marca", texto: "Contando histórias através do esporte." },
  {
    titulo: "Promessa ao cliente",
    texto: "Eu não quero apenas mostrar o seu esporte. Quero mostrar quem você é através dele.",
  },
  { titulo: "Filosofia", texto: "O esporte mostra o que você faz. A história mostra quem você é." },
];

const vocabulario = [
  ["Histórias", "Projetos"],
  ["Protagonistas", "Clientes"],
  ["Entrevista", "Briefing"],
  ["Conceito do Filme", "Planejamento"],
  ["Roteiro", "Script"],
  ["Captação", "Gravação"],
  ["Edição", "Pós-produção"],
  ["Conteúdo", "Publicação"],
  ["Entrega", "Entrega"],
  ["Feedback", "Avaliação"],
  ["Aprendizados", "Registro"],
  ["Anotações", "Notas"],
  ["Arquivos", "Uploads"],
  ["Método Vida Real", "Manual"],
  ["Agenda", "Calendário"],
  ["Especialistas", "Chats GPT"],
  ["Biblioteca", "Arquivos"],
];

const principio = "Isso faz Gilmar pensar menos e agir mais?";

export default function MetodoPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Método Vida Real (Manual)"
        title="Como o sistema pensa"
        subtitle="Uma tela = uma missão. O sistema mostra sempre o próximo passo."
        backHref="/mais"
      />

      <p className="mb-3 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Filosofia da marca
      </p>
      <div className="mb-8 flex flex-col gap-2.5">
        {filosofia.map((f) => (
          <Card key={f.titulo}>
            <p className="text-[11px] font-semibold uppercase tracking-tightest text-signal">
              {f.titulo}
            </p>
            <p className="mt-1 text-[15px] leading-relaxed text-white">{f.texto}</p>
          </Card>
        ))}
      </div>

      <p className="mb-3 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Princípio central
      </p>
      <Card className="mb-8 text-center">
        <p className="text-[15px] font-medium italic text-white">"{principio}"</p>
      </Card>

      <p className="mb-3 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
        Vocabulário do sistema
      </p>
      <Card className="flex flex-col divide-y divide-ink-800 p-0">
        {vocabulario.map(([novo, antigo]) => (
          <div key={novo} className="flex items-center justify-between px-4 py-3">
            <span className="text-[14px] font-medium text-white">{novo}</span>
            <span className="text-xs text-ink-500">({antigo})</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
