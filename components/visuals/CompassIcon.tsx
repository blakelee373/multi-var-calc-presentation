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
  size = 96,
  wiggle = false,
  glowing = false,
  faded = false,
}: CompassIconProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden
      style={{ opacity: faded ? 0.35 : 1, filter: glowing ? "drop-shadow(0 0 12px rgba(245,158,11,0.6))" : undefined }}
    >
      <circle cx="50" cy="50" r="46" fill={palette.paper} stroke={palette.ink} strokeWidth="3" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={palette.slate} strokeWidth="1" strokeDasharray="2 3" />
      {/* N S E W */}
      <text x="50" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.ink}>N</text>
      <text x="50" y="90" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.ink}>S</text>
      <text x="86" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.ink}>E</text>
      <text x="14" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.ink}>W</text>

      <motion.g
        animate={wiggle ? { rotate: [-12, 14, -8, 10, -4, 0] } : { rotate: 0 }}
        transition={
          wiggle
            ? { duration: 2.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }
            : undefined
        }
        style={{ transformOrigin: "50px 50px" }}
      >
        <polygon
          points="50,22 54,50 50,55 46,50"
          fill={glowing ? palette.amber : "#E11D48"}
          stroke={palette.ink}
          strokeWidth="1"
        />
        <polygon
          points="50,78 54,50 50,45 46,50"
          fill={palette.paper}
          stroke={palette.ink}
          strokeWidth="1"
        />
      </motion.g>
      <circle cx="50" cy="50" r="3" fill={palette.ink} />
    </svg>
  );
}
