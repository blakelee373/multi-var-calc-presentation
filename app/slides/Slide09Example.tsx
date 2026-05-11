"use client";

import { Bowl3D } from "@/components/visuals/Bowl3D";

export default function Slide09Example() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        Example.
      </h2>
      <p className="text-lg text-ink/65 max-w-3xl">
        At the point (1, 2), the gradient tells us which direction the function increases fastest.
      </p>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6">
        <div className="bg-paper border border-slate-200 rounded-xl overflow-hidden">
          <Bowl3D className="w-full h-full min-h-[340px]" />
        </div>
        <div className="flex flex-col gap-3 justify-center">
          <div className="bg-paper border border-slate-200 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-ink/55 font-semibold mb-2">function</p>
            <p className="font-mono text-2xl text-ink">f(x, y) = x² + y²</p>
          </div>
          <div className="bg-paper border border-slate-200 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-teal font-semibold mb-2">gradient</p>
            <p className="font-mono text-2xl text-ink">∇f = ⟨2x, 2y⟩</p>
          </div>
          <div className="bg-amber/10 border-2 border-amber rounded-xl p-5">
            <p className="text-xs uppercase tracking-wider text-amber font-bold mb-2">at the point (1, 2)</p>
            <p className="font-mono text-3xl text-ink font-bold">∇f(1, 2) = ⟨2, 4⟩</p>
          </div>
        </div>
      </div>
    </div>
  );
}
