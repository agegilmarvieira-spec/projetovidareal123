"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import EmptyState from "@/components/EmptyState";
import { Field, TextInput } from "@/components/Field";
import { useStored } from "@/lib/useStored";
import { KEYS, uid } from "@/lib/storage";
import type { ItemFinanceiro } from "@/lib/types";

const statusList: ItemFinanceiro["status"][] = ["Proposta", "Aprovado", "Pago"];
const statusColor: Record<ItemFinanceiro["status"], string> = {
  Proposta: "text-ink-400 border-ink-700",
  Aprovado: "text-signal border-signal/50",
  Pago: "text-emerald-400 border-emerald-500/40",
};

export default function FinanceiroPage() {
  const [itens, setItens, hydrated] = useStored<ItemFinanceiro[]>(KEYS.financeiro, []);
  const [form, setForm] = useState({
    historiaNome: "",
    valor: "",
    formaPagamento: "",
    data: "",
    custos: "",
  });

  function adicionar() {
    if (!form.historiaNome.trim()) return;
    const novo: ItemFinanceiro = { id: uid(), createdAt: Date.now(), status: "Proposta", ...form };
    setItens([novo, ...itens]);
    setForm({ historiaNome: "", valor: "", formaPagamento: "", data: "", custos: "" });
  }

  function avancarStatus(item: ItemFinanceiro) {
    const idx = statusList.indexOf(item.status);
    const proximo = statusList[Math.min(idx + 1, statusList.length - 1)];
    setItens(itens.map((x) => (x.id === item.id ? { ...x, status: proximo } : x)));
  }

  return (
    <div>
      <PageHeader
        eyebrow="Financeiro (Vendas)"
        title="Propostas e pagamentos"
        subtitle="O necessário para acompanhar o negócio, sem virar um sistema financeiro complexo."
        backHref="/mais"
      />

      <div className="mb-6 flex flex-col gap-3">
        <Field label="História / Cliente">
          <TextInput
            value={form.historiaNome}
            onChange={(e) => setForm({ ...form, historiaNome: e.target.value })}
            placeholder="Nome do protagonista ou projeto"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Valor">
            <TextInput
              value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })}
              placeholder="R$"
            />
          </Field>
          <Field label="Data">
            <TextInput
              type="date"
              value={form.data}
              onChange={(e) => setForm({ ...form, data: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Forma de pagamento">
          <TextInput
            value={form.formaPagamento}
            onChange={(e) => setForm({ ...form, formaPagamento: e.target.value })}
            placeholder="Pix, cartão, transferência..."
          />
        </Field>
        <Field label="Custos">
          <TextInput
            value={form.custos}
            onChange={(e) => setForm({ ...form, custos: e.target.value })}
            placeholder="Custos envolvidos nesse projeto"
          />
        </Field>
        <button
          onClick={adicionar}
          disabled={!form.historiaNome.trim()}
          className="tap-scale focus-ring rounded-full bg-signal py-3 text-sm font-semibold text-white disabled:opacity-40"
        >
          Registrar
        </button>
      </div>

      {!hydrated ? null : itens.length === 0 ? (
        <EmptyState title="Nada registrado ainda" hint="Propostas e pagamentos aparecem aqui." />
      ) : (
        <div className="flex flex-col gap-2.5">
          {itens.map((item) => (
            <Card key={item.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[15px] font-medium text-white">{item.historiaNome}</p>
                  <p className="mt-0.5 text-xs text-ink-500">
                    {[item.valor, item.formaPagamento].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <button
                  onClick={() => avancarStatus(item)}
                  className={`tap-scale shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusColor[item.status]}`}
                >
                  {item.status}
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
