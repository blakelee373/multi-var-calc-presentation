"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";
import { r3 } from "@/lib/round";

type CurveXYProps = {
  showTangent?: boolean;
  className?: string;
};

// y(x) — same function used to draw the curve and to compute its tangent.
function yOf(x: number) {
  return 130 + 0.0009 * (x - 230) * (x - 230) - 8 * Math.sin(x / 50);
}
function dyOf(x: number) {
  return 0.0018 * (x - 230) - (8 / 50) * Math.cos(x / 50);
}

export function CurveXY({ showTangent = false, className }: CurveXYProps) {
  const pts: string[] = [];
  for (let x = 30; x <= 470; x += 4) {
    pts.push(`${x},${r3(yOf(x))}`);
  }

  // Pick a sample point in the steep left flank so the tangent is visibly
  // *not* parallel to a near-horizontal stretch of curve.
  const tx = 110;
  const ty = yOf(tx);
  const slope = dyOf(tx);
  const tLen = 130;
  const tx1 = r3(tx - tLen);
  const ty1 = r3(ty - slope * tLen);
  const tx2 = r3(tx + tLen);
  const ty2 = r3(ty + slope * tLen);

  return (
    <svg viewBox="0 0 500 240" className={className} aria-hidden>
      <rect x="0" y="0" width="500" height="240" fill={palette.paper} />

      <g stroke={palette.slate} strokeWidth="0.5" opacity="0.22">
        {[70, 110, 150, 190, 230, 270, 310, 350, 390, 430].map((x) => (
          <line key={`vx${x}`} x1={x} y1="30" x2={x} y2="210" />
        ))}
        {[60, 100, 140, 180].map((y) => (
          <line key={`hy${y}`} x1="30" y1={y} x2="470" y2={y} />
        ))}
      </g>

      <line x1="30" y1="210" x2="470" y2="210" stroke={palette.ink} strokeWidth="1.5" />
      <line x1="30" y1="30" x2="30" y2="210" stroke={palette.ink} strokeWidth="1.5" />
      <polygon points="470,210 462,206 462,214" fill={palette.ink} />
      <polygon points="30,30 26,38 34,38" fill={palette.ink} />
      <text x="476" y="226" fontSize="14" fontWeight="700" fill={palette.ink}>x</text>
      <text x="14" y="28" fontSize="14" fontWeight="700" fill={palette.ink}>y</text>

      <motion.polyline
        fill="none"
        stroke={palette.teal}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pts.join(" ")}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />

      {showTangent && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {/* white halo so the tangent reads against grid + curve */}
          <line
            x1={tx1}
            y1={ty1}
            x2={tx2}
            y2={ty2}
            stroke={palette.paper}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <line
            x1={tx1}
            y1={ty1}
            x2={tx2}
            y2={ty2}
            stroke={palette.amberDeep}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <circle
            cx={tx}
            cy={r3(ty)}
            r="6"
            fill={palette.amber}
            stroke={palette.paper}
            strokeWidth="2.5"
          />
          {/* annotation placed inside the chart, above the curve */}
          <g transform="translate(180 50)">
            <rect
              x="0"
              y="0"
              width="158"
              height="26"
              rx="4"
              fill={palette.paper}
              stroke={palette.amberDeep}
              strokeWidth="1.5"
            />
            <text x="10" y="18" fontSize="13" fontWeight="700" fill={palette.amberDeep}>
              tangent · slope = f′(x)
            </text>
          </g>
          {/* leader from annotation to marker */}
          <line
            x1="220"
            y1="76"
            x2={r3(tx + 6)}
            y2={r3(ty - 8)}
            stroke={palette.amberDeep}
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.7"
          />
        </motion.g>
      )}

      <text x="356" y="80" fontSize="18" fontWeight="700" fill={palette.teal}>
        y = f(x)
      </text>
    </svg>
  );
}
