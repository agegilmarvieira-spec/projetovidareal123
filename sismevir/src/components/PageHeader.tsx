"use client";

import { useRouter } from "next/navigation";

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
  back = true,
  backHref,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  back?: boolean;
  backHref?: string;
}) {
  const router = useRouter();

  return (
    <header className="mb-6 flex items-start gap-3">
      {back && (
        <button
          onClick={() => (backHref ? router.push(backHref) : router.back())}
          aria-label="Voltar"
          className="tap-scale focus-ring mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-800 bg-ink-900 text-ink-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
      )}
      <div className="min-w-0">
        {eyebrow && (
          <p className="mb-1 truncate text-[11px] font-semibold uppercase tracking-tightest text-signal">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-semibold tracking-tightest text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1 text-sm leading-relaxed text-ink-400">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
