"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { ArrowField } from "@/components/visuals/ArrowField";

export default function Slide05Compass() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        We need something better: a <span className="text-amber">3D compass</span>.
      </h2>
      <p className="text-lg text-ink/65 max-w-3xl">
        At any point on a surface, we want to know which direction goes uphill the fastest.
      </p>
      <div className="flex-1 grid grid-cols-[2fr_1fr] gap-6">
        <div className="bg-paper border border-slate-200 rounded-xl overflow-hidden">
          <Hill3D mode="best" className="w-full h-full min-h-[320px]" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-paper border border-slate-200 rounded-xl p-4 flex-1 grid place-items-center">
            <ArrowField className="w-full max-w-[220px]" />
          </div>
          <div className="bg-amber/10 border border-amber/40 rounded-xl p-4">
            <p className="text-xs uppercase tracking-wider text-amber font-bold mb-1">
              the idea
            </p>
            <p className="text-sm text-ink leading-snug">
              Out of all the directions you could step, only one makes you climb the fastest. That arrow is our 3D compass.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
