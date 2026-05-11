"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { ArrowField } from "@/components/visuals/ArrowField";
import { Eyebrow, Headline, Lede } from "@/components/Type";

export default function Slide05Compass() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>The idea</Eyebrow>
        <Headline>
          We need a <span className="text-amber">3D compass</span>.
        </Headline>
        <Lede>
          At any point on a surface — which direction goes uphill the fastest?
        </Lede>
      </div>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6 min-h-0">
        <div className="rounded-2xl border border-slate-200/60 overflow-hidden bg-paper">
          <Hill3D mode="best" className="w-full h-full min-h-[340px]" rotate />
        </div>
        <div className="flex flex-col gap-4 min-h-0">
          <div className="rounded-2xl border border-slate-200/60 bg-paper p-4 flex-1 grid place-items-center min-h-0">
            <ArrowField className="w-full max-w-[280px]" />
          </div>
          <div className="rounded-2xl bg-amber/12 border-2 border-amber/50 p-5">
            <p className="text-base uppercase tracking-[0.2em] text-amberDeep font-bold mb-2" style={{ color: "#B45309" }}>
              the rule
            </p>
            <p className="text-[clamp(1rem,1.35vw,1.45rem)] text-ink leading-snug">
              Out of <em>every</em> direction you could step, only one climbs the
              fastest. That arrow is our 3D compass.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
