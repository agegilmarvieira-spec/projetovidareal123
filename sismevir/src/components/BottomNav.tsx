"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Dashboard", icon: HomeIcon },
  { href: "/historias", label: "Histórias", icon: BookIcon },
  { href: "/especialistas", label: "Especialistas", icon: BotIcon },
  { href: "/biblioteca", label: "Biblioteca", icon: FolderIcon },
  { href: "/mais", label: "Mais", icon: GridIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-ink-800 bg-ink-950/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegação principal"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="tap-scale focus-ring flex flex-col items-center gap-1 rounded-xl py-2.5 text-[10px] font-medium"
              >
                <Icon active={active} />
                <span className={active ? "text-white" : "text-ink-400"}>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Shell({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={active ? "#ff4d2e" : "#71717a"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}
function HomeIcon({ active }: { active: boolean }) {
  return (
    <Shell active={active}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9.5v-6h5v6H17.5a1 1 0 0 0 1-1v-9" />
    </Shell>
  );
}
function BookIcon({ active }: { active: boolean }) {
  return (
    <Shell active={active}>
      <path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6.5A1.5 1.5 0 0 1 5 19.5v-15Z" />
      <path d="M8 3v18" />
    </Shell>
  );
}
function BotIcon({ active }: { active: boolean }) {
  return (
    <Shell active={active}>
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V4M9 4h6" />
      <circle cx="9.5" cy="13.5" r="1" fill={active ? "#ff4d2e" : "#71717a"} stroke="none" />
      <circle cx="14.5" cy="13.5" r="1" fill={active ? "#ff4d2e" : "#71717a"} stroke="none" />
    </Shell>
  );
}
function FolderIcon({ active }: { active: boolean }) {
  return (
    <Shell active={active}>
      <path d="M4 6.5A1.5 1.5 0 0 1 5.5 5h4l2 2.5h7A1.5 1.5 0 0 1 20 9v8.5A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5v-11Z" />
    </Shell>
  );
}
function GridIcon({ active }: { active: boolean }) {
  return (
    <Shell active={active}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </Shell>
  );
}
