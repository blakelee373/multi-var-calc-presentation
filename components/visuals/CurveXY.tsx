"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type CurveXYProps = {
  showTangent?: boolean;
  className?: string;
};

export function CurveXY({ showTangent = false, className }: CurveXYProps) {
  const pts: string[] = [];
  for (let x = 30; x <= 470; x += 4) {
    const y = 180 - (50 - 0.0007 * (x - 230) * (x - 230) - 5 * Math.sin(x / 40));
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 500 240" className={className} aria-hidden>
      <defs>
        <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.teal} stopOpacity="0.28" />
          <stop offset="100%" stopColor={palette.teal} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="500" height="240" fill={palette.paper} />

      {/* gridlines */}
      <g stroke={palette.slate} strokeWidth="0.5" opacity="0.32">
        {[70, 110, 150, 190, 230, 270, 310, 350, 390, 430].map((x) => (
          <line key={`vx${x}`} x1={x} y1="30" x2={x} y2="210" />
        ))}
        {[60, 100, 140, 180].map((y) => (
          <line key={`hy${y}`} x1="30" y1={y} x2="470" y2={y} />
        ))}
      </g>

      {/* axes */}
      <line x1="30" y1="210" x2="470" y2="210" stroke={palette.ink} strokeWidth="2" />
      <line x1="30" y1="30" x2="30" y2="210" stroke={palette.ink} strokeWidth="2" />
      <polygon points="470,210 460,205 460,215" fill={palette.ink} />
      <polygon points="30,30 25,40 35,40" fill={palette.ink} />
      <text x="476" y="226" fontSize="14" fontWeight="700" fill={palette.ink}>x</text>
      <text x="14" y="28" fontSize="14" fontWeight="700" fill={palette.ink}>y</text>

      {/* area fill below curve */}
      <polygon
        fill="url(#curveFill)"
        points={`30,210 ${pts.join(" ")} 470,210`}
      />

      {/* animated curve */}
      <motion.polyline
        fill="none"
        stroke={palette.teal}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.join(" ")}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, ease: "easeInOut" }}
      />

      {showTangent && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ transformOrigin: "270px 120px" }}
        >
          <line
            x1="200"
            y1="84"
            x2="340"
            y2="160"
            stroke={palette.amber}
            strokeWidth="3"
            strokeDasharray="6 4"
          />
          <circle cx="270" cy="122" r="6" fill={palette.amber} stroke={palette.paper} strokeWidth="2" />
          <text x="346" y="156" fontSize="13" fontWeight="700" fill={palette.amberDeep}>
            f′(x)
          </text>
        </motion.g>
      )}

      <text x="380" y="68" fontSize="18" fontWeight="700" fill={palette.teal}>
        y = f(x)
      </text>
    </svg>
  );
}
