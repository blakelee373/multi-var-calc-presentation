"use client";

import { Character } from "@/components/visuals/Character";
import { CurveXY } from "@/components/visuals/CurveXY";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { Eyebrow, Headline, Lede } from "@/components/Type";
import { palette } from "@/lib/palette";

export default function Slide02Path() {
  return (
    <div className="h-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Eyebrow>Chapter 1 — one path</Eyebrow>
        <Headline>
          In normal calculus, there is usually{" "}
          <span className="text-teal">one path</span> to follow.
        </Headline>
        <Lede>
          You move along one direction and ask:{" "}
          <em>how fast is the function changing?</em>
        </Lede>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8 items-stretch min-h-0">
        <div className="relative rounded-2xl overflow-hidden border border-slate-200/60 bg-paper/70">
          <svg viewBox="0 0 500 300" className="w-full h-full" aria-hidden>
            <defs>
              <linearGradient id="s2sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDE4B6" />
                <stop offset="100%" stopColor="#F8CB85" />
              </linearGradient>
              <linearGradient id="s2ground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8DDC4" />
                <stop offset="100%" stopColor="#C9BB97" />
              </linearGradient>
            </defs>
            <rect width="500" height="220" fill="url(#s2sky)" />
            <rect y="220" width="500" height="80" fill="url(#s2ground)" />
            <line x1="0" y1="220" x2="500" y2="220" stroke={palette.ink} strokeWidth="2" />
            {/* sun */}
            <circle cx="420" cy="60" r="32" fill="#FCD988" />
            {/* dashed path */}
            <line x1="40" y1="248" x2="440" y2="248" stroke={palette.amberDeep} strokeWidth="5" strokeDasharray="12 8" strokeLinecap="round" />
            {/* sign */}
            <g transform="translate(440 200)">
              <rect x="-26" y="-16" width="52" height="22" rx="4" fill={palette.paper} stroke={palette.ink} strokeWidth="2.5" />
              <text x="0" y="1" textAnchor="middle" fontSize="12" fontWeight="800" fill={palette.ink}>NORTH</text>
              <line x1="0" y1="6" x2="0" y2="48" stroke={palette.ink} strokeWidth="2.5" />
            </g>
          </svg>
          <div className="absolute bottom-3 left-12 flex items-end gap-3">
            <Character size={130} />
            <CompassIcon size={84} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200/60 bg-paper p-6 flex flex-col">
          <Eyebrow>single-variable change</Eyebrow>
          <div className="flex-1 grid place-items-center mt-3">
            <CurveXY className="w-full" showTangent />
          </div>
          <p className="text-[clamp(0.95rem,1.15vw,1.2rem)] text-ink/65 mt-3 italic">
            Slope at a point = the derivative of <span className="font-mono">f</span> at that{" "}
            <span className="font-mono">x</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
