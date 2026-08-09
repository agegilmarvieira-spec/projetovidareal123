export const ETAPAS = [
  "protagonista",
  "entrevista",
  "esseSouEu",
  "conceito",
  "roteiro",
  "captacao",
  "edicao",
  "conteudo",
  "entrega",
  "feedback",
  "aprendizados",
] as const;

export type EtapaKey = (typeof ETAPAS)[number];

export type EtapaStatus = "pendente" | "andamento" | "concluida";

export type Historia = {
  id: string;
  nome: string;
  esporte: string;
  objetivo: string;
  createdAt: number;

  // 👤 Protagonista (Cliente)
  protagonistaInfo: string;

  // 🎤 Entrevista (Briefing) — respostas por pergunta
  entrevista: Record<string, string>;

  // Momento "Esse Sou Eu"
  esseSouEu: string;

  // 💡 Conceito do Filme (Planejamento)
  conceito: string;

  // 🎬 Roteiro (Script)
  roteiro: string;

  // 📱 Conteúdo (Publicação)
  conteudo: string;

  // checklists por etapa (roteiro final, captação, edição, entrega)
  checklists: Record<string, Record<string, boolean>>;

  // ⭐ Feedback (Avaliação)
  feedback: string;

  // 📖 Aprendizados (Registro)
  aprendizados: string;

  // 📝 Anotações (Notas)
  anotacoes: string;

  // 📎 Arquivos (Uploads) — apenas referências manuais (nome + link)
  arquivos: { id: string; nome: string; link: string }[];

  // status manual por etapa principal
  status: Record<EtapaKey, EtapaStatus>;

  // resultados colados dos Especialistas
  especialistas: Record<string, string>;

  concluida: boolean;
};

export type Especialista = {
  key: string;
  numero: string;
  titulo: string;
  missao: string;
};

export type EventoAgenda = {
  id: string;
  titulo: string;
  tipo: string;
  data: string;
  notas: string;
  createdAt: number;
};

export type ItemFinanceiro = {
  id: string;
  historiaNome: string;
  valor: string;
  formaPagamento: string;
  status: "Proposta" | "Aprovado" | "Pago";
  data: string;
  custos: string;
  createdAt: number;
};

export type BibliotecaCategoria =
  | "Frases"
  | "Ideias"
  | "Referências"
  | "Fotos"
  | "Vídeos"
  | "Documentos"
  | "Templates";

export type BibliotecaItem = {
  id: string;
  categoria: BibliotecaCategoria;
  titulo: string;
  conteudo: string;
  createdAt: number;
};

export type Configuracoes = {
  nome: string;
  assinatura: string;
  infoPessoais: string;
};
