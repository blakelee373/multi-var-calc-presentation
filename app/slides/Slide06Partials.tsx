"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { palette } from "@/lib/palette";

export default function Slide06Partials() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        Step 1: Check the slope in the <span className="text-teal">basic directions</span>.
      </h2>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6">
        <div className="bg-paper border border-slate-200 rounded-xl overflow-hidden">
          <Hill3D mode="partials" className="w-full h-full min-h-[340px]" />
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-paper border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span
                aria-hidden
                className="inline-block w-6 h-2 rounded-full"
                style={{ background: palette.teal }}
              />
              <p className="font-mono text-2xl text-teal font-semibold">f<sub>x</sub></p>
            </div>
            <p className="text-ink/80 leading-snug">
              How the surface changes if we move only in the <strong>x direction</strong>.
            </p>
          </div>
          <div className="bg-paper border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span
                aria-hidden
                className="inline-block w-6 h-2 rounded-full"
                style={{ background: "#0F766E" }}
              />
              <p className="font-mono text-2xl font-semibold" style={{ color: "#0F766E" }}>f<sub>y</sub></p>
            </div>
            <p className="text-ink/80 leading-snug">
              How the surface changes if we move only in the <strong>y direction</strong>.
            </p>
          </div>
          <p className="text-sm text-ink/55 italic">
            These two “directional slopes” are called the partial derivatives.
          </p>
        </div>
      </div>
    </div>
  );
}
