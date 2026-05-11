"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type MountainSceneProps = {
  variant?: "intro" | "choice" | "victory";
  className?: string;
};

export function MountainScene({ variant = "intro", className }: MountainSceneProps) {
  return (
    <svg viewBox="0 0 800 360" className={className} aria-hidden>
      {/* sky / ground */}
      <rect x="0" y="0" width="800" height="280" fill={palette.sky} opacity="0.45" />
      <rect x="0" y="280" width="800" height="80" fill="#E8E0CF" />
      <line x1="0" y1="280" x2="800" y2="280" stroke={palette.ink} strokeWidth="2" />

      {/* sun */}
      <circle cx="680" cy="70" r="34" fill={palette.amber} opacity="0.85" />

      {/* clouds */}
      <g fill={palette.paper} opacity="0.85">
        <ellipse cx="120" cy="60" rx="36" ry="12" />
        <ellipse cx="150" cy="56" rx="24" ry="10" />
        <ellipse cx="540" cy="40" rx="42" ry="11" />
      </g>

      {/* far mountain */}
      <polygon points="200,280 360,140 520,280" fill="#7A8AB0" stroke={palette.ink} strokeWidth="2" />
      <polygon points="320,180 360,140 400,180 380,200 340,200" fill={palette.paper} />

      {/* near mountain */}
      <polygon points="380,280 540,120 720,280" fill="#8FA3C7" stroke={palette.ink} strokeWidth="2" />
      <polygon points="500,170 540,120 580,170 555,195 525,195" fill={palette.paper} />

      {/* tunnel */}
      <path
        d="M450 280 Q450 230 480 230 Q510 230 510 280 Z"
        fill={palette.ink}
        stroke={palette.ink}
        strokeWidth="2"
      />
      <path
        d="M450 280 Q450 230 480 230 Q510 230 510 280"
        fill="none"
        stroke={palette.amberDeep}
        strokeWidth="3"
      />

      {/* "North" sign */}
      <g transform="translate(390 230)">
        <rect x="-30" y="-18" width="60" height="24" rx="4" fill={palette.paper} stroke={palette.ink} strokeWidth="2" />
        <text x="0" y="-2" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.ink}>
          NORTH
        </text>
        <line x1="0" y1="6" x2="0" y2="50" stroke={palette.ink} strokeWidth="2" />
      </g>

      {variant === "choice" && (
        <>
          {/* tunnel arrow */}
          <motion.g
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <path d="M200 260 Q330 260 440 260" stroke={palette.teal} strokeWidth="4" fill="none" strokeLinecap="round" />
            <polygon points="440,260 428,254 428,266" fill={palette.teal} />
            <text x="280" y="248" fontSize="14" fontWeight="600" fill={palette.teal}>
              through the tunnel
            </text>
          </motion.g>
          {/* uphill arrow */}
          <motion.g
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <path d="M200 260 Q360 230 520 140" stroke={palette.amber} strokeWidth="4" fill="none" strokeLinecap="round" />
            <polygon points="520,140 510,148 516,154" fill={palette.amber} />
            <text x="300" y="200" fontSize="14" fontWeight="600" fill={palette.amber}>
              over the mountain
            </text>
          </motion.g>
        </>
      )}

      {variant === "victory" && (
        <>
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <path d="M200 260 Q360 230 520 130" stroke={palette.amber} strokeWidth="6" fill="none" strokeLinecap="round" />
            <polygon points="520,130 508,140 516,148" fill={palette.amber} />
          </motion.g>
        </>
      )}
    </svg>
  );
}
