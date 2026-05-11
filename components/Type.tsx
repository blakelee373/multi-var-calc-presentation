import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[13px] uppercase tracking-[0.32em] text-ink/55 font-semibold">
      {children}
    </p>
  );
}

export function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[clamp(2.25rem,3.6vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-ink mt-3">
      {children}
    </h2>
  );
}

export function DisplayTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="text-[clamp(2.75rem,5vw,5.25rem)] font-bold leading-[0.98] tracking-tight text-ink">
      {children}
    </h1>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <p className="text-[clamp(1.05rem,1.4vw,1.4rem)] text-ink/65 leading-snug max-w-[60ch] mt-3">
      {children}
    </p>
  );
}

export function BulletList({
  items,
  className,
  variant = "dash",
}: {
  items: ReactNode[];
  className?: string;
  variant?: "dash" | "dot" | "num";
}) {
  return (
    <ul className={`space-y-3 ${className ?? ""}`}>
      {items.map((node, i) => (
        <li
          key={i}
          className="flex gap-3 text-[clamp(0.95rem,1.18vw,1.18rem)] text-ink/85 leading-snug"
        >
          <span
            aria-hidden
            className={
              variant === "num"
                ? "shrink-0 w-6 text-amber font-bold text-right"
                : variant === "dot"
                ? "shrink-0 w-4 text-amber font-bold"
                : "shrink-0 w-4 text-amber font-bold"
            }
          >
            {variant === "num" ? `${i + 1}.` : variant === "dot" ? "●" : "—"}
          </span>
          <span className="flex-1">{node}</span>
        </li>
      ))}
    </ul>
  );
}

export function Callout({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="border-l-[3px] border-amber pl-4 py-1">
      {label ? (
        <p className="text-[11px] uppercase tracking-[0.22em] text-amber font-bold mb-1">
          {label}
        </p>
      ) : null}
      <div className="text-[clamp(1rem,1.3vw,1.3rem)] text-ink leading-snug">
        {children}
      </div>
    </div>
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
