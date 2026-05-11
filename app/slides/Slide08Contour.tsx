"use client";

import { ContourMap } from "@/components/visuals/ContourMap";

export default function Slide08Contour() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        Another way to see it: <span className="text-amber">contour maps</span>.
      </h2>
      <p className="text-lg text-ink/65 max-w-3xl">
        Looking from above, the gradient points straight uphill — crossing the level curves at a right angle.
      </p>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6">
        <div className="bg-paper border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
          <ContourMap className="w-full h-full max-h-[360px]" animateArrow />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <div className="bg-paper border border-slate-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-ink mb-1">Level curves</p>
            <p className="text-sm text-ink/70 leading-snug">
              Each ring is a set of points at the same height — like contour lines on a hiking map.
            </p>
          </div>
          <div className="bg-amber/10 border border-amber/40 rounded-xl p-4">
            <p className="text-sm font-semibold text-amberDeep text-amber mb-1">Gradient arrow</p>
            <p className="text-sm text-ink/80 leading-snug">
              Always perpendicular to the contour through your point — that's the steepest uphill direction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
