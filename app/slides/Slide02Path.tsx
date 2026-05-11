"use client";

import { Character } from "@/components/visuals/Character";
import { CurveXY } from "@/components/visuals/CurveXY";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { palette } from "@/lib/palette";

export default function Slide02Path() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        In normal calculus, there is usually <span className="text-teal">one path</span> to follow.
      </h2>
      <p className="text-lg text-ink/65 max-w-3xl">
        You move along one direction, and ask: how fast is the function changing?
      </p>
      <div className="flex-1 grid grid-cols-2 gap-8 items-center">
        <div className="relative h-full">
          <svg viewBox="0 0 500 300" className="w-full h-full" aria-hidden>
            <rect x="0" y="220" width="500" height="80" fill="#E8E0CF" />
            <line x1="0" y1="220" x2="500" y2="220" stroke={palette.ink} strokeWidth="2" />
            {/* path */}
            <line x1="40" y1="248" x2="460" y2="248" stroke={palette.amberDeep} strokeWidth="4" strokeDasharray="8 6" />
            {/* sign at end */}
            <g transform="translate(440 200)">
              <rect x="-22" y="-14" width="44" height="20" rx="3" fill={palette.paper} stroke={palette.ink} strokeWidth="2" />
              <text x="0" y="1" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.ink}>NORTH</text>
              <line x1="0" y1="6" x2="0" y2="48" stroke={palette.ink} strokeWidth="2" />
            </g>
          </svg>
          <div className="absolute bottom-6 left-12 flex items-end gap-2">
            <Character size={100} />
            <CompassIcon size={68} />
          </div>
        </div>
        <div className="bg-paper border border-slate-200 rounded-xl p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ink/55 font-semibold mb-2">
            single-variable change
          </p>
          <CurveXY className="w-full" showTangent />
          <p className="text-sm text-ink/65 mt-2 italic">
            Slope at a point = derivative of f at that x.
          </p>
        </div>
      </div>
    </div>
  );
}
