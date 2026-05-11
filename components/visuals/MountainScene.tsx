"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type MountainSceneProps = {
  variant?: "intro" | "choice" | "victory";
  className?: string;
};

export function MountainScene({ variant = "intro", className }: MountainSceneProps) {
  return (
    <svg viewBox="0 0 900 460" className={className} aria-hidden>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCE3B6" />
          <stop offset="55%" stopColor="#FBD597" />
          <stop offset="100%" stopColor="#F5C089" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8DDC4" />
          <stop offset="100%" stopColor="#D4C8AB" />
        </linearGradient>
        <linearGradient id="farMountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A4B3D1" />
          <stop offset="100%" stopColor="#7889A8" />
        </linearGradient>
        <linearGradient id="nearMountain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94A8CC" />
          <stop offset="100%" stopColor="#5F7099" />
        </linearGradient>
        <linearGradient id="snow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#FFE8A3" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="0" dy="3" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* sky + ground */}
      <rect x="0" y="0" width="900" height="340" fill="url(#sky)" />
      <rect x="0" y="340" width="900" height="120" fill="url(#ground)" />

      {/* sun glow */}
      <circle cx="760" cy="90" r="140" fill="url(#sunGlow)" />
      <circle cx="760" cy="90" r="42" fill="#FCD988" />

      {/* sun rays */}
      <g opacity="0.35" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={760 + Math.cos(a) * 56}
              y1={90 + Math.sin(a) * 56}
              x2={760 + Math.cos(a) * 78}
              y2={90 + Math.sin(a) * 78}
            />
          );
        })}
      </g>

      {/* parallax clouds */}
      <g fill={palette.paper} opacity="0.85">
        <ellipse cx="140" cy="78" rx="48" ry="13" />
        <ellipse cx="180" cy="72" rx="32" ry="11" />
        <ellipse cx="600" cy="52" rx="54" ry="13" />
        <ellipse cx="640" cy="48" rx="34" ry="10" />
      </g>

      {/* distant ridge */}
      <polygon
        points="0,340 120,260 220,300 340,210 460,290 580,250 720,300 900,260 900,340"
        fill="#B6C3DC"
        opacity="0.75"
      />

      {/* far mountain */}
      <polygon
        points="200,340 380,150 560,340"
        fill="url(#farMountain)"
      />
      <polygon
        points="332,200 380,150 428,200 400,224 360,224"
        fill="url(#snow)"
      />
      {/* far mountain shadow side */}
      <polygon points="380,150 560,340 440,340 380,260" fill="#5F7099" opacity="0.35" />

      {/* near mountain */}
      <polygon
        points="380,340 580,110 800,340"
        fill="url(#nearMountain)"
      />
      <polygon
        points="528,170 580,110 632,170 600,200 562,200"
        fill="url(#snow)"
      />
      <polygon points="580,110 800,340 660,340 580,230" fill="#3F4D72" opacity="0.4" />

      {/* tree line on near mountain */}
      <g fill="#3F4D72" opacity="0.55">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <polygon
            key={i}
            points={`${440 + i * 22},${320 - i * 4} ${448 + i * 22},${300 - i * 4} ${456 + i * 22},${320 - i * 4}`}
          />
        ))}
      </g>

      {/* tunnel — arched */}
      <path
        d="M488 340 Q488 268 540 268 Q592 268 592 340 Z"
        fill="#0F172A"
        stroke="#020617"
        strokeWidth="2"
      />
      <path
        d="M488 340 Q488 268 540 268 Q592 268 592 340"
        fill="none"
        stroke={palette.amberDeep}
        strokeWidth="3"
      />
      {/* tunnel inner glow */}
      <ellipse cx="540" cy="330" rx="18" ry="6" fill="#F59E0B" opacity="0.4" />

      {/* sign post (NORTH) */}
      <g transform="translate(420 268)" filter="url(#softShadow)">
        <rect x="-38" y="-22" width="76" height="30" rx="5" fill={palette.paper} stroke={palette.ink} strokeWidth="2.5" />
        <text x="0" y="-2" textAnchor="middle" fontSize="14" fontWeight="800" letterSpacing="2" fill={palette.ink}>
          NORTH
        </text>
        <line x1="0" y1="8" x2="0" y2="68" stroke={palette.ink} strokeWidth="2.5" />
      </g>

      {/* ground texture dots */}
      <g fill="#A89773" opacity="0.45">
        {Array.from({ length: 30 }).map((_, i) => (
          <circle key={i} cx={20 + i * 30} cy={420 - (i % 3) * 6} r={1.5} />
        ))}
      </g>

      {variant === "choice" && (
        <>
          {/* tunnel arrow */}
          <motion.g
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <motion.path
              d="M220 320 Q360 320 478 320"
              stroke={palette.teal}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="0 1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            />
            <polygon points="478,320 462,312 462,328" fill={palette.teal} />
            <rect x="270" y="296" width="138" height="22" rx="11" fill={palette.paper} stroke={palette.teal} strokeWidth="2" />
            <text x="339" y="312" textAnchor="middle" fontSize="13" fontWeight="700" fill={palette.teal}>
              through the tunnel
            </text>
          </motion.g>

          {/* uphill arrow */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <motion.path
              d="M220 320 Q380 280 540 130"
              stroke={palette.amber}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
            />
            <polygon points="540,130 528,140 538,148" fill={palette.amber} />
            <rect x="320" y="222" width="148" height="22" rx="11" fill={palette.paper} stroke={palette.amber} strokeWidth="2" />
            <text x="394" y="238" textAnchor="middle" fontSize="13" fontWeight="700" fill={palette.amberDeep}>
              over the mountain
            </text>
          </motion.g>
        </>
      )}

      {variant === "victory" && (
        <>
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ transformOrigin: "540px 110px" }}
          >
            <motion.path
              d="M220 320 Q380 280 540 110"
              stroke={palette.amber}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4, delay: 0.4 }}
            />
            <motion.circle
              cx="540"
              cy="110"
              r="14"
              fill={palette.amber}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <polygon points="540,110 524,126 540,118 556,126" fill={palette.amberDeep} />
          </motion.g>
        </>
      )}
    </svg>
  );
}
