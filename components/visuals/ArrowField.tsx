"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type ArrowFieldProps = {
  count?: number;
  className?: string;
};

export function ArrowField({ count = 10, className }: ArrowFieldProps) {
  const cx = 140;
  const cy = 140;
  const r = 92;
  const bestIndex = 1;
  return (
    <svg viewBox="0 0 280 280" className={className} aria-hidden>
      <defs>
        <radialGradient id="afGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={palette.amber} stopOpacity="0.35" />
          <stop offset="100%" stopColor={palette.amber} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r + 30} fill="url(#afGlow)" />
      <circle cx={cx} cy={cy} r="9" fill={palette.ink} />
      <circle cx={cx} cy={cy} r="4" fill={palette.amber} />

      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        const isBest = i === bestIndex;
        const len = isBest ? r + 8 : r - 6;
        const ex = cx + Math.cos(a) * len;
        const ey = cy + Math.sin(a) * len;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: isBest ? 1 : 0.3, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
          >
            <line
              x1={cx + Math.cos(a) * 12}
              y1={cy + Math.sin(a) * 12}
              x2={ex}
              y2={ey}
              stroke={isBest ? palette.amber : palette.slate}
              strokeWidth={isBest ? 6 : 2.2}
              strokeLinecap="round"
            />
            <polygon
              points={`${ex},${ey} ${ex - Math.cos(a - 0.4) * 14},${ey - Math.sin(a - 0.4) * 14} ${ex - Math.cos(a + 0.4) * 14},${ey - Math.sin(a + 0.4) * 14}`}
              fill={isBest ? palette.amber : palette.slate}
            />
          </motion.g>
        );
      })}

      <motion.text
        x={cx + 78}
        y={cy - 60}
        fontSize="14"
        fontWeight="800"
        fill={palette.amberDeep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        ▲ best uphill
      </motion.text>
    </svg>
  );
}
