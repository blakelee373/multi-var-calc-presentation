"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type CharacterProps = {
  pose?: "neutral" | "confident" | "thinking";
  size?: number;
};

export function Character({ pose = "neutral", size = 160 }: CharacterProps) {
  const arms = {
    neutral: { left: "M28 60 L20 80", right: "M52 60 L62 80" },
    confident: { left: "M28 60 L18 70", right: "M52 60 L74 48" },
    thinking: { left: "M28 60 L34 42", right: "M52 60 L62 80" },
  }[pose];

  return (
    <motion.svg
      viewBox="0 0 80 140"
      width={size}
      height={(size * 140) / 80}
      aria-hidden
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
        <radialGradient id="cheek" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#F5A8A8" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F5A8A8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="40" cy="120" rx="20" ry="3" fill={palette.ink} opacity="0.18" />

      {/* head */}
      <circle cx="40" cy="22" r="15" fill="url(#skin)" stroke={palette.ink} strokeWidth="2" />
      {/* hair */}
      <path d="M25 18 Q40 4 55 18 Q52 10 40 8 Q28 10 25 18Z" fill={palette.ink} />
      {/* cheeks */}
      <circle cx="32" cy="26" r="4" fill="url(#cheek)" />
      <circle cx="48" cy="26" r="4" fill="url(#cheek)" />
      {/* eyes */}
      <circle cx="34" cy="22" r="1.7" fill={palette.ink} />
      <circle cx="46" cy="22" r="1.7" fill={palette.ink} />
      <circle cx="34.5" cy="21.4" r="0.5" fill={palette.paper} />
      <circle cx="46.5" cy="21.4" r="0.5" fill={palette.paper} />
      {/* smile */}
      <path
        d={pose === "confident" ? "M34 29 Q40 33 46 29" : "M35 29 Q40 31 45 29"}
        stroke={palette.ink}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* body */}
      <path d="M26 40 L54 40 L54 80 L26 80 Z" fill="url(#shirt)" stroke={palette.ink} strokeWidth="2" />
      <path d="M40 40 L40 80" stroke={palette.ink} strokeWidth="0.8" opacity="0.25" />
      {/* collar */}
      <path d="M30 40 L40 48 L50 40" fill="none" stroke={palette.ink} strokeWidth="1.5" />
      {/* arms */}
      <path d={arms.left} stroke={palette.ink} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d={arms.right} stroke={palette.ink} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* hands */}
      <circle cx={pose === "thinking" ? "34" : "20"} cy={pose === "thinking" ? "42" : "80"} r="3" fill="url(#skin)" stroke={palette.ink} strokeWidth="1.2" />
      <circle cx={pose === "confident" ? "74" : "62"} cy={pose === "confident" ? "48" : "80"} r="3" fill="url(#skin)" stroke={palette.ink} strokeWidth="1.2" />
      {/* legs */}
      <path d="M32 80 L30 112" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
      <path d="M48 80 L50 112" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
      {/* shoes */}
      <ellipse cx="28" cy="116" rx="7" ry="3.5" fill={palette.ink} />
      <ellipse cx="52" cy="116" rx="7" ry="3.5" fill={palette.ink} />
    </motion.svg>
  );
}
