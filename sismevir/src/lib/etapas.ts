import type { EtapaKey } from "./types";

export const ETAPA_INFO: Record<
  EtapaKey,
  {
    label: string;
    termoOriginal: string;
    icone: string;
    missao: string;
  }
> = {
  protagonista: {
    label: "Protagonista",
    termoOriginal: "Cliente",
    icone: "👤",
    missao: "Registrar quem é a pessoa por trás da história.",
  },
  entrevista: {
    label: "Entrevista",
    termoOriginal: "Briefing",
    icone: "🎤",
    missao: "Descobrir a história real do protagonista através das perguntas certas.",
  },
  esseSouEu: {
    label: 'Momento "Esse Sou Eu"',
    termoOriginal: "Assinatura Humana",
    icone: "✨",
    missao:
      "Encontrar o detalhe que não poderia pertencer a mais ninguém — o que torna essa história única.",
  },
  conceito: {
    label: "Conceito do Filme",
    termoOriginal: "Planejamento",
    icone: "💡",
    missao: "Definir a emoção, a abordagem e a direção criativa do vídeo.",
  },
  roteiro: {
    label: "Roteiro",
    termoOriginal: "Script",
    icone: "🎬",
    missao: "Transformar a história descoberta em uma narrativa audiovisual de até 1 minuto.",
  },
  captacao: {
    label: "Captação",
    termoOriginal: "Gravação",
    icone: "📷",
    missao: "Transformar o roteiro em imagens reais no dia da gravação.",
  },
  edicao: {
    label: "Edição",
    termoOriginal: "Pós-produção",
    icone: "✂️",
    missao: "Montar o filme final a partir do material captado.",
  },
  conteudo: {
    label: "Conteúdo",
    termoOriginal: "Publicação",
    icone: "📱",
    missao: "Preparar o material para as redes sociais e outros formatos de publicação.",
  },
  entrega: {
    label: "Entrega",
    termoOriginal: "Entrega",
    icone: "📤",
    missao: "Entregar o filme final ao protagonista.",
  },
  feedback: {
    label: "Feedback",
    termoOriginal: "Avaliação",
    icone: "⭐",
    missao: "Registrar a reação do protagonista e o que pode melhorar.",
  },
  aprendizados: {
    label: "Aprendizados",
    termoOriginal: "Registro",
    icone: "📖",
    missao: "Guardar o que essa história ensinou para a próxima.",
  },
};

export const ETAPA_ORDEM_LABEL = "Etapas da História";

// 🎬 Roteiro — estrutura detalhada (seção 12 do prompt mestre)
export const ROTEIRO_CHECKLIST_ANTES = [
  "Entrevista preenchida",
  "História principal definida",
  'Momento "Esse Sou Eu" identificado',
  "Conceito do filme definido",
];

export const ROTEIRO_PASSOS = [
  "Revisar informações",
  "Identificar conflito",
  "Identificar transformação",
  "Definir emoção",
  "Definir abertura",
  "Definir desenvolvimento",
  "Definir fechamento",
  "Revisar duração",
];

export const ROTEIRO_CHECKLIST_FINAL = [
  "Existe uma história?",
  "Existe uma transformação?",
  "Existe algo específico daquela pessoa?",
  "O esporte está servindo à história?",
  "O vídeo funciona em até 1 minuto?",
  "O final tem força?",
];

// 🎤 Entrevista — categorias (seção 16)
export const ENTREVISTA_CATEGORIAS: { categoria: string; perguntas: string[] }[] = [
  { categoria: "A pessoa", perguntas: ["Quem é você, além do esporte?"] },
  { categoria: "O esporte", perguntas: ["Qual esporte pratica e há quanto tempo?"] },
  { categoria: "Como começou", perguntas: ["Como o esporte entrou na sua vida?"] },
  { categoria: "O que mudou", perguntas: ["O que o esporte mudou em você?"] },
  { categoria: "Dificuldades", perguntas: ["Qual foi o momento mais difícil?"] },
  { categoria: "Conquistas", perguntas: ["Do que você mais se orgulha?"] },
  { categoria: "Relações", perguntas: ["Quem vive essa história com você?"] },
  { categoria: "Rotina", perguntas: ["Como é a sua rotina de treino?"] },
  { categoria: "Antes do treino", perguntas: ["O que você sempre faz antes de treinar?"] },
  { categoria: "Depois do treino", perguntas: ["O que você sempre faz depois de treinar?"] },
  { categoria: "O que ninguém vê", perguntas: ["O que ninguém vê por trás do resultado?"] },
  { categoria: "O que essa pessoa sente", perguntas: ["O que você sente na hora H?"] },
  { categoria: "Futuro", perguntas: ["O que vem a seguir para você?"] },
];

// 📷 Captação — checklist (seção 20)
export const CAPTACAO_CHECKLIST = {
  Antes: ["Equipamentos", "Bateria", "Armazenamento", "Microfone", "Local", "Horário", "Roteiro", "Cenas essenciais"],
  Durante: ["Abertura", "Rotina", "Preparação", "Detalhes", "Movimento", "Esporte", "Respiração", "Sons ambientes", 'Momento "Esse Sou Eu"', "Final"],
  Depois: ["Conferir arquivos", "Backup", "Organização"],
};

// ✂️ Edição — checklist (seção 21)
export const EDICAO_CHECKLIST = [
  "Modelo de projeto",
  "Abertura",
  "Fechamento",
  "Textos",
  "Overlays",
  "Música",
  "Efeitos",
  "Sons",
  "Ritmo",
  "Duração máxima de aproximadamente 1 minuto",
];

// 📤 Entrega — fluxo (seção 22)
export const ENTREGA_CHECKLIST = [
  "Revisar vídeo",
  "Exportar",
  "Organizar arquivos",
  "Subir para Google Drive ou plataforma futura",
  "Gerar link",
  "Enviar ao cliente",
  "Registrar entrega",
  "Solicitar feedback",
];
