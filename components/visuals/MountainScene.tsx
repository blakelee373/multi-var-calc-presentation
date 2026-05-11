"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type MountainSceneProps = {
  variant?: "intro" | "choice" | "victory";
  className?: string;
};

// Helper: arrowhead triangle at (tipX, tipY) pointing along direction (dx, dy).
function head(tipX: number, tipY: number, dx: number, dy: number, size = 14) {
  const dl = Math.hypot(dx, dy) || 1;
  const ux = dx / dl;
  const uy = dy / dl;
  const px = -uy;
  const py = ux;
  const baseX = tipX - ux * size;
  const baseY = tipY - uy * size;
  const x1 = baseX + px * size * 0.55;
  const y1 = baseY + py * size * 0.55;
  const x2 = baseX - px * size * 0.55;
  const y2 = baseY - py * size * 0.55;
  return `${tipX},${tipY} ${x1},${y1} ${x2},${y2}`;
}

export function MountainScene({ variant = "intro", className }: MountainSceneProps) {
  return (
    <svg viewBox="0 0 900 460" className={className} aria-hidden>
      {/* Flat, calmer color blocks — no heavy gradients on the slide. */}
      <rect x="0" y="0" width="900" height="340" fill="#F1E6CE" />
      <rect x="0" y="340" width="900" height="120" fill="#DCCFAE" />
      <line x1="0" y1="340" x2="900" y2="340" stroke={palette.ink} strokeWidth="1.5" />

      {/* sun */}
      <circle cx="770" cy="86" r="40" fill="#F5C95F" />

      {/* clouds */}
      <g fill="#FFFFFF" opacity="0.85">
        <ellipse cx="160" cy="78" rx="46" ry="12" />
        <ellipse cx="200" cy="72" rx="30" ry="10" />
        <ellipse cx="610" cy="56" rx="50" ry="11" />
      </g>

      {/* distant ridge */}
      <polygon
        points="0,340 120,260 220,300 340,210 460,290 580,250 720,300 900,260 900,340"
        fill="#B6BFD4"
        opacity="0.55"
      />

      {/* far mountain */}
      <polygon points="200,340 380,150 560,340" fill="#8C9CBC" />
      <polygon points="332,200 380,150 428,200 400,224 360,224" fill="#FFFFFF" />
      <polygon points="380,150 560,340 440,340 380,260" fill="#6E7E9E" opacity="0.5" />

      {/* near mountain */}
      <polygon points="380,340 580,110 800,340" fill="#7388AC" />
      <polygon points="528,170 580,110 632,170 600,200 562,200" fill="#FFFFFF" />
      <polygon points="580,110 800,340 660,340 580,230" fill="#4B5C82" opacity="0.55" />

      {/* tunnel */}
      <path
        d="M488 340 Q488 268 540 268 Q592 268 592 340 Z"
        fill="#0F172A"
      />
      <path
        d="M488 340 Q488 268 540 268 Q592 268 592 340"
        fill="none"
        stroke={palette.amberDeep}
        strokeWidth="2.5"
      />

      {/* sign */}
      <g transform="translate(420 270)">
        <rect x="-38" y="-22" width="76" height="30" rx="4" fill="#FFFFFF" stroke={palette.ink} strokeWidth="2.5" />
        <text x="0" y="-2" textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="2" fill={palette.ink}>
          NORTH
        </text>
        <line x1="0" y1="8" x2="0" y2="68" stroke={palette.ink} strokeWidth="2.5" />
      </g>

      {variant === "choice" && (
        <>
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.path
              d="M220 320 Q360 320 478 320"
              stroke={palette.teal}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
            />
            <polygon points={head(478, 320, 1, 0, 14)} fill={palette.teal} />
            <rect x="270" y="296" width="138" height="22" rx="11" fill="#FFFFFF" stroke={palette.teal} strokeWidth="2" />
            <text x="339" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill={palette.teal}>
              route A — through the tunnel
            </text>
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.path
              d="M220 320 Q380 280 540 130"
              stroke={palette.amber}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />
            {/* tangent at end: from control (380,280) to end (540,130) is direction (160,-150) */}
            <polygon points={head(540, 130, 160, -150, 14)} fill={palette.amber} />
            <rect x="320" y="222" width="148" height="22" rx="11" fill="#FFFFFF" stroke={palette.amber} strokeWidth="2" />
            <text x="394" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill={palette.amberDeep}>
              route B — over the mountain
            </text>
          </motion.g>
        </>
      )}

      {variant === "victory" && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.path
            d="M220 320 Q380 280 540 130"
            stroke={palette.amber}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, delay: 0.4 }}
          />
          {/* clean triangle arrowhead aligned with the curve's tangent at the end */}
          <polygon points={head(540, 130, 160, -150, 18)} fill={palette.amberDeep} />
        </motion.g>
      )}
    </svg>
  );
}
