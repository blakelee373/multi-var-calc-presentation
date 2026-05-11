import type { ReactNode } from "react";

export function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[clamp(2.5rem,4vw,4.25rem)] font-bold leading-[1.02] tracking-tight text-ink">
      {children}
    </h2>
  );
}

export function DisplayTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[clamp(3rem,5.4vw,5.75rem)] font-bold leading-[0.98] tracking-tight text-ink">
      {children}
    </h1>
  );
}

export function BulletList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul className={`space-y-4 ${className ?? ""}`}>
      {items.map((node, i) => (
        <li
          key={i}
          className="flex gap-4 text-[clamp(1.15rem,1.5vw,1.7rem)] text-ink leading-snug font-medium"
        >
          <span aria-hidden className="shrink-0 w-4 text-ink/40">
            ·
          </span>
          <span className="flex-1">{node}</span>
        </li>
      ))}
    </ul>
  );
}

export function Mono({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono tabular-nums whitespace-nowrap ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
