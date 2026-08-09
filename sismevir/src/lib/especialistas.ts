import type { Especialista, Historia } from "./types";

export const ESPECIALISTAS: Especialista[] = [
  { key: "mentor-de-historias", numero: "01", titulo: "Mentor de Histórias", missao: "Descobrir a verdadeira história do protagonista." },
  { key: "diretor-criativo", numero: "02", titulo: "Diretor Criativo", missao: "Definir conceito, emoção, abordagem e direção criativa." },
  { key: "diretor-de-roteiros", numero: "03", titulo: "Diretor de Roteiros", missao: "Transformar a história em roteiro." },
  { key: "diretor-de-captacao", numero: "04", titulo: "Diretor de Captação", missao: "Transformar o roteiro em plano de gravação." },
  { key: "diretor-de-edicao", numero: "05", titulo: "Diretor de Edição", missao: "Orientar montagem e edição." },
  { key: "diretor-de-conteudo", numero: "06", titulo: "Diretor de Conteúdo", missao: "Transformar o projeto em conteúdo para redes sociais." },
  { key: "diretor-comercial", numero: "07", titulo: "Diretor Comercial", missao: "Organizar proposta, atendimento, relacionamento e fidelização." },
  { key: "ceo-estrategista", numero: "08", titulo: "CEO / Estrategista", missao: "Ajudar nas decisões estratégicas do negócio." },
];

export function gerarContexto(esp: Especialista, h: Historia): string {
  const entrevistaTexto = Object.entries(h.entrevista)
    .filter(([, v]) => v?.trim())
    .map(([pergunta, resposta]) => `${pergunta}: ${resposta}`)
    .join("\n");

  return [
    `CONTEXTO PARA O ${esp.titulo.toUpperCase()}`,
    `História: ${h.nome}`,
    `Esporte: ${h.esporte}`,
    `Objetivo: ${h.objetivo}`,
    h.protagonistaInfo ? `Protagonista: ${h.protagonistaInfo}` : "",
    entrevistaTexto ? `\nEntrevista:\n${entrevistaTexto}` : "",
    h.esseSouEu ? `\nMomento "Esse Sou Eu": ${h.esseSouEu}` : "",
    h.conceito ? `\nConceito criativo: ${h.conceito}` : "",
    h.roteiro ? `\nRoteiro: ${h.roteiro}` : "",
    h.especialistas["mentor-de-historias"]
      ? `\nResultado do Mentor de Histórias:\n${h.especialistas["mentor-de-historias"]}`
      : "",
    h.especialistas["diretor-criativo"]
      ? `\nResultado do Diretor Criativo:\n${h.especialistas["diretor-criativo"]}`
      : "",
    h.especialistas["diretor-de-roteiros"]
      ? `\nResultado do Diretor de Roteiros:\n${h.especialistas["diretor-de-roteiros"]}`
      : "",
  ]
    .filter(Boolean)
    .join("\n");
}
