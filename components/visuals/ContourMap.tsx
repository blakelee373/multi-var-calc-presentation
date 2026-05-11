"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";

type ContourMapProps = {
  className?: string;
  animateArrow?: boolean;
};

/**
 * Top-down "topographic map" of an elongated hill.
 * Hill center at (cx, cy) with elliptical level curves. The gradient at any
 * point is the outward normal of the ellipse — drawn as the amber arrow.
 */
export function ContourMap({ className, animateArrow = false }: ContourMapProps) {
  const cx = 220;
  const cy = 180;
  const rings = [40, 70, 100, 130, 160, 190];
  const ratio = 0.65; // ry / rx for elliptical contours

  // Sample point on the second-outermost ring; gradient is the outward normal.
  const r = 130;
  const theta = -Math.PI / 4;
  const px = cx + r * Math.cos(theta);
  const py = cy + r * ratio * Math.sin(theta);
  // Outward normal of ellipse x²/a² + y²/b² = 1 → (x/a², y/b²)
  const a = r;
  const b = r * ratio;
  const nx = (px - cx) / (a * a);
  const ny = (py - cy) / (b * b);
  const nlen = Math.hypot(nx, ny);
  const ux = nx / nlen;
  const uy = ny / nlen;
  const arrowLen = 70;
  const ex = px + ux * arrowLen;
  const ey = py + uy * arrowLen;

  // Arrow head
  const headSize = 10;
  const angle = Math.atan2(uy, ux);
  const hx1 = ex - headSize * Math.cos(angle - Math.PI / 6);
  const hy1 = ey - headSize * Math.sin(angle - Math.PI / 6);
  const hx2 = ex - headSize * Math.cos(angle + Math.PI / 6);
  const hy2 = ey - headSize * Math.sin(angle + Math.PI / 6);

  return (
    <svg viewBox="0 0 440 360" className={className} aria-hidden>
      <rect width="440" height="360" fill={palette.paper} />

      {/* Rings (low → high elevation) */}
      {rings
        .slice()
        .reverse()
        .map((rr, i) => {
          const idx = rings.length - 1 - i;
          const opacity = 0.25 + (idx / rings.length) * 0.55;
          return (
            <ellipse
              key={rr}
              cx={cx}
              cy={cy}
              rx={rr}
              ry={rr * ratio}
              fill={palette.amber}
              opacity={opacity * 0.18}
              stroke={palette.slate}
              strokeWidth="1.5"
            />
          );
        })}

      {/* peak marker */}
      <circle cx={cx} cy={cy} r="4" fill={palette.amberDeep} />
      <text x={cx + 8} y={cy + 4} fontSize="12" fill={palette.ink} fontWeight="600">
        peak
      </text>

      {/* elevation labels along one axis */}
      {rings.map((rr, i) => (
        <text
          key={`lab-${rr}`}
          x={cx + rr + 4}
          y={cy + 4}
          fontSize="10"
          fill={palette.slate}
        >
          {(rings.length - i) * 100}
        </text>
      ))}

      {/* sample point */}
      <circle cx={px} cy={py} r="5" fill={palette.ink} />
      <text x={px - 22} y={py + 22} fontSize="12" fill={palette.ink} fontWeight="600">
        you
      </text>

      {/* tangent line to the ring */}
      <line
        x1={px - uy * 50}
        y1={py + ux * 50}
        x2={px + uy * 50}
        y2={py - ux * 50}
        stroke={palette.slate}
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />

      {/* gradient arrow */}
      <motion.g
        initial={animateArrow ? { opacity: 0, scale: 0.6 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ transformOrigin: `${px}px ${py}px` }}
      >
        <line
          x1={px}
          y1={py}
          x2={ex}
          y2={ey}
          stroke={palette.amber}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <polygon
          points={`${ex},${ey} ${hx1},${hy1} ${hx2},${hy2}`}
          fill={palette.amber}
        />
        <text
          x={ex + 8}
          y={ey - 6}
          fontSize="14"
          fontWeight="700"
          fill={palette.amberDeep}
        >
          ∇f
        </text>
      </motion.g>
    </svg>
  );
}
