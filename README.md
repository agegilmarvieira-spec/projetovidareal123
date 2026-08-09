# SISMeViR — Sistema Método Vida Real

Sistema operacional pessoal de produção audiovisual para **Gilmar Vieira Videomaker**.
Conduz cada História (Projeto) do primeiro contato ao protagonista até a entrega final,
uma missão por vez.

## Rodando localmente

Pré-requisito: Node.js 18 ou mais recente.

```bash
npm install
npm run dev
```

Abra http://localhost:3000. No celular, use "Adicionar à Tela de Início" para instalar
como app.

## Build de produção

```bash
npm run build
npm run start
```

## Estrutura

- `src/app/*` — cada rota do menu (Dashboard, Histórias, Especialistas, Método,
  Agenda, Biblioteca, Financeiro, Configurações, Protagonistas)
- `src/app/historias/[id]/*` — dentro de uma História: etapas dinâmicas
  (`[etapa]`), Caderno da História, Anotações, Arquivos
- `src/lib/types.ts` — modelo de dados (Historia, Especialista, etc.)
- `src/lib/etapas.ts` — missões, checklists e passos de cada etapa (conteúdo
  do prompt mestre)
- `src/lib/especialistas.ts` — os 8 especialistas e o gerador de contexto para
  colar no ChatGPT
- `src/lib/storage.ts` + `useStored.ts` — persistência local (localStorage)

## O que esta primeira versão NÃO faz (de propósito)

Conforme o prompt mestre (seção 34): sem integração automática com ChatGPT,
Claude, Google Agenda, Google Drive ou WhatsApp. A área de Especialistas
prepara o texto de contexto e você mesmo copia/cola no ChatGPT — a
automação fica para uma versão futura.

## Dados

Tudo fica salvo apenas no navegador de quem usa o app (localStorage). Trocar
de aparelho ou limpar o navegador apaga os dados.
