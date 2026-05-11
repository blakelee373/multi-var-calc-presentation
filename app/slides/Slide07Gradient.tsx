"use client";

import { Hill3D } from "@/components/visuals/Hill3D";

export default function Slide07Gradient() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        Step 2: Combine them into the <span className="text-amber">gradient</span>.
      </h2>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6">
        <div className="bg-paper border border-slate-200 rounded-xl overflow-hidden">
          <Hill3D mode="gradient" className="w-full h-full min-h-[340px]" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <div className="bg-amber/10 border-2 border-amber rounded-xl p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-amber font-bold mb-2">
              the gradient
            </p>
            <p className="font-mono text-5xl text-ink font-bold">
              ∇f = ⟨f<sub>x</sub>, f<sub>y</sub>⟩
            </p>
          </div>
          <p className="text-ink leading-snug text-lg">
            The gradient is the multivariable version of a compass for change.
          </p>
          <p className="text-ink/70 leading-snug">
            It points in the <strong className="text-amber">direction of fastest increase</strong>, and its length tells you how steep that direction is.
          </p>
        </div>
      </div>
    </div>
  );
}
