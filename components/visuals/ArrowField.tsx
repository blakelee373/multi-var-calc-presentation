"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";
import { r3 } from "@/lib/round";

type ArrowFieldProps = {
  count?: number;
  className?: string;
};

export function ArrowField({ count = 12, className }: ArrowFieldProps) {
  const cx = 200;
  const cy = 200;
  const r = 110;
  const bestIndex = 1;
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <radialGradient id="afGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={palette.amber} stopOpacity="0.28" />
          <stop offset="100%" stopColor={palette.amber} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={r + 40} fill="url(#afGlow)" />
      <circle cx={cx} cy={cy} r="9" fill={palette.ink} />
      <circle cx={cx} cy={cy} r="4" fill={palette.amber} />

      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2 - Math.PI / 2;
        const isBest = i === bestIndex;
        const len = isBest ? r + 10 : r - 8;
        const ex = r3(cx + Math.cos(a) * len);
        const ey = r3(cy + Math.sin(a) * len);
        const sx = r3(cx + Math.cos(a) * 12);
        const sy = r3(cy + Math.sin(a) * 12);
        const ax1 = r3(ex - Math.cos(a - 0.4) * 16);
        const ay1 = r3(ey - Math.sin(a - 0.4) * 16);
        const ax2 = r3(ex - Math.cos(a + 0.4) * 16);
        const ay2 = r3(ey - Math.sin(a + 0.4) * 16);
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: isBest ? 1 : 0.32, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.05 * i }}
          >
            <line
              x1={sx}
              y1={sy}
              x2={ex}
              y2={ey}
              stroke={isBest ? palette.amber : palette.slate}
              strokeWidth={isBest ? 7 : 2.4}
              strokeLinecap="round"
            />
            <polygon
              points={`${ex},${ey} ${ax1},${ay1} ${ax2},${ay2}`}
              fill={isBest ? palette.amber : palette.slate}
            />
          </motion.g>
        );
      })}

      <motion.text
        x={cx}
        y={35}
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        letterSpacing="2"
        fill={palette.amberDeep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        STEEPEST DIRECTION
      </motion.text>
      <motion.text
        x={cx}
        y={385}
        textAnchor="middle"
        fontSize="13"
        fill={palette.ink}
        opacity="0.65"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 1.0 }}
      >
        candidate directions from a single point
      </motion.text>
    </svg>
  );
}
