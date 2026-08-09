export default function EmptyState({
  title,
  hint,
}: {
  title: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl2 border border-dashed border-ink-700 px-5 py-10 text-center">
      <p className="text-sm font-medium text-ink-200">{title}</p>
      <p className="mx-auto mt-1.5 max-w-xs text-xs leading-relaxed text-ink-500">
        {hint}
      </p>
    </div>
  );
}
