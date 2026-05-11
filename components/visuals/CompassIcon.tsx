"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type CompassIconProps = {
  size?: number;
  wiggle?: boolean;
  glowing?: boolean;
  faded?: boolean;
};

export function CompassIcon({
  size = 120,
  wiggle = false,
  glowing = false,
  faded = false,
}: CompassIconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      aria-hidden
      style={{
        opacity: faded ? 0.35 : 1,
        filter: glowing
          ? "drop-shadow(0 0 16px rgba(245,158,11,0.65))"
          : "drop-shadow(0 4px 8px rgba(31,42,68,0.18))",
      }}
    >
      <defs>
        <radialGradient id="bezel" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#94A3B8" />
        </radialGradient>
        <radialGradient id="face" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#FFFCF7" />
          <stop offset="100%" stopColor="#F2EBDC" />
        </radialGradient>
        <linearGradient id="needleN" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="60" r="56" fill="url(#bezel)" stroke={palette.ink} strokeWidth="2" />
      <circle cx="60" cy="60" r="48" fill="url(#face)" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* tick marks */}
      <g stroke={palette.ink} strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          const long = i % 4 === 0;
          const r1 = long ? 38 : 42;
          const r2 = 46;
          return (
            <line
              key={i}
              x1={60 + Math.cos(a) * r1}
              y1={60 + Math.sin(a) * r1}
              x2={60 + Math.cos(a) * r2}
              y2={60 + Math.sin(a) * r2}
            />
          );
        })}
      </g>

      <text x="60" y="22" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.ink}>N</text>
      <text x="60" y="108" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.ink}>S</text>
      <text x="103" y="65" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.ink}>E</text>
      <text x="17" y="65" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.ink}>W</text>

      <motion.g
        animate={
          wiggle
            ? { rotate: [-14, 18, -10, 12, -5, 4, 0] }
            : glowing
            ? { rotate: 0 }
            : { rotate: 0 }
        }
        transition={
          wiggle
            ? { duration: 3.4, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            : undefined
        }
        style={{ transformOrigin: "60px 60px" }}
      >
        <polygon
          points="60,22 65,60 60,66 55,60"
          fill={glowing ? palette.amber : "url(#needleN)"}
          stroke={palette.ink}
          strokeWidth="1"
        />
        <polygon
          points="60,98 65,60 60,54 55,60"
          fill="#FAFAFA"
          stroke={palette.ink}
          strokeWidth="1"
        />
      </motion.g>
      <circle cx="60" cy="60" r="4" fill={palette.ink} />
      <circle cx="60" cy="60" r="1.5" fill={palette.paper} />
    </svg>
  );
}
