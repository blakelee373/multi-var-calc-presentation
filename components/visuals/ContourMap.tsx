"use client";

import { motion } from "framer-motion";
import { palette } from "@/lib/palette";
import { r3 } from "@/lib/round";

type ContourMapProps = {
  className?: string;
  animateArrow?: boolean;
};

export function ContourMap({ className, animateArrow = false }: ContourMapProps) {
  const cx = 240;
  const cy = 220;
  const rings = [50, 90, 130, 170, 210, 250, 290];
  const ratio = 0.7;

  const r = 170;
  const theta = -Math.PI / 4;
  const px = r3(cx + r * Math.cos(theta));
  const py = r3(cy + r * ratio * Math.sin(theta));

  const a = r;
  const b = r * ratio;
  const nx = (px - cx) / (a * a);
  const ny = (py - cy) / (b * b);
  const nlen = Math.hypot(nx, ny);
  const ux = nx / nlen;
  const uy = ny / nlen;
  const arrowLen = 92;
  const ex = r3(px + ux * arrowLen);
  const ey = r3(py + uy * arrowLen);

  const headSize = 14;
  const angle = Math.atan2(uy, ux);
  const hx1 = r3(ex - headSize * Math.cos(angle - Math.PI / 6));
  const hy1 = r3(ey - headSize * Math.sin(angle - Math.PI / 6));
  const hx2 = r3(ex - headSize * Math.cos(angle + Math.PI / 6));
  const hy2 = r3(ey - headSize * Math.sin(angle + Math.PI / 6));

  const fieldPoints: { x: number; y: number }[] = [];
  for (let i = 0; i < 14; i++) {
    const t = (i / 14) * Math.PI * 2;
    const fr = 110 + (i % 3) * 60;
    fieldPoints.push({
      x: r3(cx + Math.cos(t) * fr),
      y: r3(cy + Math.sin(t) * fr * ratio),
    });
  }

  const ux3 = r3(ux);
  const uy3 = r3(uy);

  return (
    <svg viewBox="0 0 540 440" className={className} aria-hidden>
      <defs>
        <radialGradient id="peakGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={palette.amber} stopOpacity="0.9" />
          <stop offset="60%" stopColor={palette.amber} stopOpacity="0.35" />
          <stop offset="100%" stopColor={palette.amber} stopOpacity="0" />
        </radialGradient>
        <filter id="cmShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
          <feOffset dx="0" dy="1.5" result="off" />
          <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width="540" height="440" fill={palette.paper} />

      {rings
        .slice()
        .reverse()
        .map((rr, i) => {
          const idx = rings.length - 1 - i;
          const fillOpacity = r3((idx / rings.length) * 0.22 + 0.05);
          return (
            <ellipse
              key={rr}
              cx={cx}
              cy={cy}
              rx={rr}
              ry={r3(rr * ratio)}
              fill={palette.amber}
              opacity={fillOpacity}
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
          );
        })}

      {fieldPoints.map((p, i) => {
        const dx = (p.x - cx) / (170 * 170);
        const dy = (p.y - cy) / ((170 * ratio) * (170 * ratio));
        const dl = Math.hypot(dx, dy);
        const fx = dx / dl;
        const fy = dy / dl;
        const len = 20;
        const tx = r3(p.x + fx * len);
        const ty = r3(p.y + fy * len);
        const sx = r3(p.x + fx * (len - 5) - fy * 3);
        const sy = r3(p.y + fy * (len - 5) + fx * 3);
        const ex2 = r3(p.x + fx * (len - 5) + fy * 3);
        const ey2 = r3(p.y + fy * (len - 5) - fx * 3);
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.4, delay: 0.05 * i }}
          >
            <line
              x1={p.x}
              y1={p.y}
              x2={tx}
              y2={ty}
              stroke={palette.slate}
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <polygon
              points={`${tx},${ty} ${sx},${sy} ${ex2},${ey2}`}
              fill={palette.slate}
            />
          </motion.g>
        );
      })}

      <circle cx={cx} cy={cy} r="42" fill="url(#peakGlow)" />
      <circle cx={cx} cy={cy} r="6" fill={palette.amberDeep} />
      <text x={cx + 12} y={cy + 4} fontSize="14" fontWeight="700" fill={palette.ink}>
        peak
      </text>

      {rings.slice(0, -1).map((rr, i) => (
        <text
          key={`lab-${rr}`}
          x={cx + rr + 6}
          y={cy + 5}
          fontSize="11"
          fill={palette.slate}
          fontWeight="600"
        >
          {(rings.length - i) * 100}
        </text>
      ))}

      <circle cx={px} cy={py} r="14" fill={palette.amber} opacity="0.25" />
      <circle cx={px} cy={py} r="7" fill={palette.ink} stroke={palette.paper} strokeWidth="2" filter="url(#cmShadow)" />
      <text x={r3(px - 34)} y={r3(py + 30)} fontSize="14" fill={palette.ink} fontWeight="700">
        you
      </text>

      <line
        x1={r3(px - uy * 70)}
        y1={r3(py + ux * 70)}
        x2={r3(px + uy * 70)}
        y2={r3(py - ux * 70)}
        stroke={palette.slate}
        strokeWidth="2"
        strokeDasharray="5 4"
      />

      <polyline
        points={`${r3(px + ux3 * 18)},${r3(py + uy3 * 18)} ${r3(px + ux3 * 18 - uy3 * 14)},${r3(py + uy3 * 18 + ux3 * 14)} ${r3(px - uy3 * 14)},${r3(py + ux3 * 14)}`}
        fill="none"
        stroke={palette.slate}
        strokeWidth="1.5"
      />

      <motion.g
        initial={animateArrow ? { opacity: 0, scale: 0.7 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ transformOrigin: `${px}px ${py}px` }}
      >
        <line
          x1={px}
          y1={py}
          x2={ex}
          y2={ey}
          stroke={palette.amber}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <polygon
          points={`${ex},${ey} ${hx1},${hy1} ${hx2},${hy2}`}
          fill={palette.amber}
        />
        <text
          x={r3(ex + 10)}
          y={r3(ey - 6)}
          fontSize="22"
          fontWeight="800"
          fill={palette.amberDeep}
        >
          ∇f
        </text>
      </motion.g>
    </svg>
  );
}
