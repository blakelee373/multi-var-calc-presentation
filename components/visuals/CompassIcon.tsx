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
        filter: glowing ? "drop-shadow(0 0 12px rgba(245,158,11,0.55))" : undefined,
      }}
    >
      <circle cx="60" cy="60" r="56" fill="#FFFFFF" stroke={palette.ink} strokeWidth="2" />
      <circle cx="60" cy="60" r="48" fill="#FAF6EC" stroke="#CBD5E1" strokeWidth="1" />

      <g stroke={palette.ink} strokeWidth="1.3" strokeLinecap="round">
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
        animate={wiggle ? { rotate: [-12, 16, -8, 10, -4, 0] } : { rotate: 0 }}
        transition={
          wiggle
            ? { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            : undefined
        }
        style={{ transformOrigin: "60px 60px" }}
      >
        <polygon
          points="60,22 65,60 60,66 55,60"
          fill={glowing ? palette.amber : "#E11D48"}
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
    </svg>
  );
}
