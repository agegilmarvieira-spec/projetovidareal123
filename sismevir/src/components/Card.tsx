import { HTMLAttributes } from "react";

export default function Card({
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-xl2 border border-ink-800 bg-ink-900 p-4 shadow-card ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
