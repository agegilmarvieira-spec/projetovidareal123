"use client";

import Card from "./Card";

export default function Checklist({
  itens,
  checked,
  onToggle,
}: {
  itens: string[];
  checked: Record<string, boolean>;
  onToggle: (item: string) => void;
}) {
  return (
    <Card className="flex flex-col divide-y divide-ink-800 p-0">
      {itens.map((item) => {
        const isChecked = !!checked[item];
        return (
          <button
            key={item}
            onClick={() => onToggle(item)}
            className="tap-scale focus-ring flex w-full items-center justify-between px-4 py-3.5 text-left"
          >
            <span className={`text-[15px] ${isChecked ? "text-ink-500 line-through" : "text-white"}`}>
              {item}
            </span>
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${isChecked ? "border-signal bg-signal" : "border-ink-700"}`}
            >
              {isChecked && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12.5 4.5 4.5L19 7" />
                </svg>
              )}
            </span>
          </button>
        );
      })}
    </Card>
  );
}
