"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type CharacterProps = {
  pose?: "neutral" | "confident" | "thinking";
  size?: number;
};

// Each pose defines paired arm endpoint + matching hand position so the
// hand circle always sits exactly on the wrist.
const POSES = {
  neutral: {
    left: { arm: "M28 60 L22 80", hand: [22, 80] },
    right: { arm: "M52 60 L58 80", hand: [58, 80] },
  },
  confident: {
    left: { arm: "M28 60 L18 70", hand: [18, 70] },
    right: { arm: "M52 60 L72 48", hand: [72, 48] },
  },
  thinking: {
    left: { arm: "M28 60 L34 44", hand: [34, 44] },
    right: { arm: "M52 60 L58 80", hand: [58, 80] },
  },
} as const;

export function Character({ pose = "neutral", size = 160 }: CharacterProps) {
  const cfg = POSES[pose];
  return (
    <motion.svg
      viewBox="0 0 80 140"
      width={size}
      height={(size * 140) / 80}
      aria-hidden
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <defs>
        <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14B8B8" />
          <stop offset="100%" stopColor={palette.teal} />
        </linearGradient>
        <linearGradient id="skin" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FCD9B0" />
          <stop offset="100%" stopColor="#E9B98A" />
        </linearGradient>
      </defs>

      <ellipse cx="40" cy="120" rx="20" ry="3" fill={palette.ink} opacity="0.16" />

      {/* head */}
      <circle cx="40" cy="22" r="15" fill="url(#skin)" stroke={palette.ink} strokeWidth="2" />
      <path d="M25 18 Q40 4 55 18 Q52 10 40 8 Q28 10 25 18Z" fill={palette.ink} />
      <circle cx="34" cy="22" r="1.5" fill={palette.ink} />
      <circle cx="46" cy="22" r="1.5" fill={palette.ink} />
      <path
        d={pose === "confident" ? "M34 29 Q40 33 46 29" : "M35 29 Q40 31 45 29"}
        stroke={palette.ink}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />

      {/* body */}
      <path d="M26 40 L54 40 L54 80 L26 80 Z" fill="url(#shirt)" stroke={palette.ink} strokeWidth="2" />
      <path d="M30 40 L40 48 L50 40" fill="none" stroke={palette.ink} strokeWidth="1.5" />

      {/* arms */}
      <path d={cfg.left.arm} stroke={palette.ink} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d={cfg.right.arm} stroke={palette.ink} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* hands — placed exactly on arm endpoints */}
      <circle cx={cfg.left.hand[0]} cy={cfg.left.hand[1]} r="3.2" fill="url(#skin)" stroke={palette.ink} strokeWidth="1.4" />
      <circle cx={cfg.right.hand[0]} cy={cfg.right.hand[1]} r="3.2" fill="url(#skin)" stroke={palette.ink} strokeWidth="1.4" />

      {/* legs */}
      <path d="M32 80 L30 112" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 80 L50 112" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="28" cy="116" rx="7" ry="3.5" fill={palette.ink} />
      <ellipse cx="52" cy="116" rx="7" ry="3.5" fill={palette.ink} />
    </motion.svg>
  );
}
