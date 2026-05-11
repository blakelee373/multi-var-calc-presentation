"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type CurveXYProps = {
  showTangent?: boolean;
  className?: string;
};

// y(x) — defined once so the tangent uses the same function as the curve.
function yOf(x: number) {
  return 180 - (50 - 0.0007 * (x - 230) * (x - 230) - 5 * Math.sin(x / 40));
}
// dy/dx
function dyOf(x: number) {
  return -(-2 * 0.0007 * (x - 230) - (5 / 40) * Math.cos(x / 40));
}

export function CurveXY({ showTangent = false, className }: CurveXYProps) {
  const pts: string[] = [];
  for (let x = 30; x <= 470; x += 4) {
    pts.push(`${x},${yOf(x).toFixed(1)}`);
  }
  // Sample point ON the curve and its actual tangent line.
  const tx = 300;
  const ty = yOf(tx);
  const slope = dyOf(tx);
  const tLen = 90;
  const tx1 = tx - tLen;
  const ty1 = ty - slope * tLen;
  const tx2 = tx + tLen;
  const ty2 = ty + slope * tLen;

  return (
    <svg viewBox="0 0 500 240" className={className} aria-hidden>
      <defs>
        <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.teal} stopOpacity="0.24" />
          <stop offset="100%" stopColor={palette.teal} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="500" height="240" fill={palette.paper} />

      <g stroke={palette.slate} strokeWidth="0.5" opacity="0.28">
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

      <polygon fill="url(#curveFill)" points={`30,210 ${pts.join(" ")} 470,210`} />

      <motion.polyline
        fill="none"
        stroke={palette.teal}
        strokeWidth="3.5"
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
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <line
            x1={tx1}
            y1={ty1}
            x2={tx2}
            y2={ty2}
            stroke={palette.amber}
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
          />
          <circle
            cx={tx}
            cy={ty}
            r="5"
            fill={palette.amber}
            stroke={palette.paper}
            strokeWidth="2"
          />
          <text
            x={tx2 + 8}
            y={ty2 + 5}
            fontSize="13"
            fontWeight="700"
            fill={palette.amberDeep}
          >
            tangent · slope = f′(x)
          </text>
        </motion.g>
      )}

      <text x="356" y="64" fontSize="18" fontWeight="700" fill={palette.teal}>
        y = f(x)
      </text>
    </svg>
  );
}
