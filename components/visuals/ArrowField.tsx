"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type ArrowFieldProps = {
  count?: number;
  className?: string;
};

/**
 * Top-down "candidate directions" graphic for slide 5: many faded arrows,
 * one highlighted as the "best uphill" direction.
 */
export function ArrowField({ count = 8, className }: ArrowFieldProps) {
  const cx = 110;
  const cy = 110;
  const r = 70;
  const bestIndex = 1; // upper-right
  return (
    <svg viewBox="0 0 220 220" className={className} aria-hidden>
      <circle cx={cx} cy={cy} r={r + 14} fill={palette.amber} opacity="0.08" />
      <circle cx={cx} cy={cy} r="6" fill={palette.ink} />
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        const ex = cx + Math.cos(a) * r;
        const ey = cy + Math.sin(a) * r;
        const isBest = i === bestIndex;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: isBest ? 1 : 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 * i }}
          >
            <line
              x1={cx}
              y1={cy}
              x2={ex}
              y2={ey}
              stroke={isBest ? palette.amber : palette.slate}
              strokeWidth={isBest ? 4 : 2}
              strokeLinecap="round"
            />
            <polygon
              points={`${ex},${ey} ${ex - Math.cos(a - 0.35) * 10},${ey - Math.sin(a - 0.35) * 10} ${ex - Math.cos(a + 0.35) * 10},${ey - Math.sin(a + 0.35) * 10}`}
              fill={isBest ? palette.amber : palette.slate}
            />
          </motion.g>
        );
      })}
      <text
        x={cx + 80}
        y={cy - 35}
        fontSize="12"
        fontWeight="600"
        fill={palette.amberDeep}
      >
        best uphill
      </text>
    </svg>
  );
}
