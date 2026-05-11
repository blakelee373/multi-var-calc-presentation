"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-base xl:text-lg uppercase tracking-[0.32em] text-amber font-semibold"
    >
      {children}
    </motion.p>
  );
}

export function Display({ children }: { children: ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.05 }}
      className="text-[clamp(2.75rem,5.6vw,6rem)] font-bold leading-[0.98] tracking-tight text-ink"
    >
      {children}
    </motion.h1>
  );
}

export function Headline({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-[clamp(2.25rem,4.2vw,4.25rem)] font-bold leading-[1.02] tracking-tight text-ink"
    >
      {children}
    </motion.h2>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="text-[clamp(1.15rem,1.65vw,1.75rem)] text-ink/70 leading-snug max-w-[42ch]"
    >
      {children}
    </motion.p>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[clamp(1rem,1.35vw,1.45rem)] text-ink/80 leading-snug ${className ?? ""}`}>
      {children}
    </p>
  );
}

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`font-mono tabular-nums ${className ?? ""}`}>{children}</span>
  );
}
