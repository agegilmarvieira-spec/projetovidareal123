"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import { Field, TextInput, TextArea } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS } from "@/lib/storage";
import type { Configuracoes } from "@/lib/types";

export default function ConfiguracoesPage() {
  const [config, setConfig] = useStored<Configuracoes>(KEYS.config, {
    nome: "Gilmar Vieira Videomaker",
    assinatura: "Contando histórias através do esporte.",
    infoPessoais: "",
  });
  const [confirmando, setConfirmando] = useState(false);

  function limparTudo() {
    if (typeof window === "undefined") return;
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith("sismevir:"))
      .forEach((k) => window.localStorage.removeItem(k));
    window.location.reload();
  }

  return (
    <div>
      <PageHeader
        eyebrow="Configurações (Sistema)"
        title="Ajustes"
        subtitle="Tudo é salvo neste aparelho, no seu navegador."
        backHref="/mais"
      />

      <div className="flex flex-col gap-5">
        <Card>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
            Logo
          </p>
          <div className="flex h-32 items-center justify-center overflow-hidden rounded-lg bg-black">
            <img
              src="/brand/logo-gilmar-videos.png"
              alt="Gilmar Videos"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mb-2 mt-4 text-[11px] font-semibold uppercase tracking-tightest text-ink-500">
            Versão para fundo claro
          </p>
          <div className="flex h-24 items-center justify-center overflow-hidden rounded-lg bg-ink-100">
            <img
              src="/brand/logo-gilmar-vieira-light.png"
              alt="Gilmar Vieira Video Maker — versão clara"
              className="h-full w-full object-contain"
            />
          </div>
        </Card>

        <Card className="flex flex-col gap-4">
          <Field label="Nome">
            <TextInput
              value={config.nome}
              onChange={(e) => setConfig({ ...config, nome: e.target.value })}
            />
          </Field>
          <Field label="Assinatura">
            <TextInput
              value={config.assinatura}
              onChange={(e) => setConfig({ ...config, assinatura: e.target.value })}
            />
          </Field>
          <Field label="Informações pessoais">
            <TextArea
              rows={3}
              value={config.infoPessoais}
              onChange={(e) => setConfig({ ...config, infoPessoais: e.target.value })}
              placeholder="Contato, redes sociais, dados para propostas..."
            />
          </Field>
        </Card>

        <Card className="border-signal/30">
          <p className="text-[15px] font-medium text-white">Limpar dados</p>
          <p className="mt-0.5 text-xs text-ink-500">
            Remove histórias, agenda, biblioteca e financeiro salvos neste aparelho. Não pode ser desfeito.
          </p>
          {!confirmando ? (
            <button
              onClick={() => setConfirmando(true)}
              className="tap-scale focus-ring mt-3 w-full rounded-full border border-signal py-2.5 text-sm font-medium text-signal"
            >
              Limpar todos os dados
            </button>
          ) : (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setConfirmando(false)}
                className="tap-scale focus-ring flex-1 rounded-full border border-ink-700 py-2.5 text-sm font-medium text-ink-300"
              >
                Cancelar
              </button>
              <button
                onClick={limparTudo}
                className="tap-scale focus-ring flex-1 rounded-full bg-signal py-2.5 text-sm font-semibold text-white"
              >
                Confirmar
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
