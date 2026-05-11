"use client";

import { CurveXY } from "@/components/visuals/CurveXY";
import { Hill3D } from "@/components/visuals/Hill3D";

export default function Slide04Compare() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        Normal calculus <span className="text-ink/40">vs.</span>{" "}
        <span className="text-amber">multivariable calculus</span>
      </h2>
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="bg-paper border border-slate-200 rounded-xl p-5 flex flex-col">
          <p className="text-xs uppercase tracking-wider text-teal font-bold mb-1">single-variable</p>
          <p className="text-sm text-ink/70 mb-3">
            One input, one direction of motion.
          </p>
          <div className="flex-1 grid place-items-center">
            <CurveXY className="w-full max-w-md" />
          </div>
          <p className="text-center text-ink font-mono mt-2">y = f(x)</p>
        </div>
        <div className="bg-paper border border-slate-200 rounded-xl p-5 flex flex-col">
          <p className="text-xs uppercase tracking-wider text-amber font-bold mb-1">multivariable</p>
          <p className="text-sm text-ink/70 mb-3">
            Multiple inputs — many possible directions.
          </p>
          <div className="flex-1 min-h-[260px]">
            <Hill3D mode="many" className="w-full h-full" />
          </div>
          <p className="text-center text-ink font-mono mt-2">z = f(x, y)</p>
        </div>
      </div>
    </div>
  );
}
