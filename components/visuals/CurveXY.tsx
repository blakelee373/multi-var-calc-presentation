import { palette } from "@/lib/palette";

type CurveXYProps = {
  showTangent?: boolean;
  className?: string;
};

export function CurveXY({ showTangent = false, className }: CurveXYProps) {
  // Curve: y = 60 - 0.0035*(x-200)^2 mapped on a 400x200 SVG canvas.
  const pts: string[] = [];
  for (let x = 20; x <= 380; x += 4) {
    const y = 170 - (40 - 0.0006 * (x - 200) * (x - 200) - 4 * Math.sin(x / 40));
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox="0 0 400 200" className={className} aria-hidden>
      <rect x="0" y="0" width="400" height="200" fill={palette.paper} />
      {/* axes */}
      <line x1="20" y1="180" x2="380" y2="180" stroke={palette.ink} strokeWidth="2" />
      <line x1="20" y1="20" x2="20" y2="180" stroke={palette.ink} strokeWidth="2" />
      <polygon points="380,180 372,176 372,184" fill={palette.ink} />
      <polygon points="20,20 16,28 24,28" fill={palette.ink} />
      <text x="384" y="195" fontSize="12" fill={palette.ink}>x</text>
      <text x="6" y="18" fontSize="12" fill={palette.ink}>y</text>
      {/* gridlines */}
      <g stroke={palette.slate} strokeWidth="0.5" opacity="0.4">
        {[60, 100, 140, 180, 220, 260, 300, 340].map((x) => (
          <line key={`vx${x}`} x1={x} y1="30" x2={x} y2="180" />
        ))}
        {[40, 80, 120, 160].map((y) => (
          <line key={`hy${y}`} x1="20" y1={y} x2="380" y2={y} />
        ))}
      </g>
      {/* curve */}
      <polyline
        fill="none"
        stroke={palette.teal}
        strokeWidth="3"
        strokeLinecap="round"
        points={pts.join(" ")}
      />
      {showTangent && (
        <>
          <line x1="180" y1="60" x2="260" y2="120" stroke={palette.amber} strokeWidth="2.5" strokeDasharray="4 3" />
          <circle cx="220" cy="90" r="4" fill={palette.amber} />
        </>
      )}
      <text x="320" y="60" fontSize="13" fontWeight="600" fill={palette.teal}>
        y = f(x)
      </text>
    </svg>
  );
}
