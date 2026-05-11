"use client";

import { CurveXY } from "@/components/visuals/CurveXY";
import { Hill3D } from "@/components/visuals/Hill3D";
import { Eyebrow, Headline } from "@/components/Type";

export default function Slide04Compare() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>The big shift</Eyebrow>
        <Headline>
          One direction <span className="text-ink/35">vs.</span>{" "}
          <span className="text-amber">many directions</span>.
        </Headline>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6 min-h-0">
        <div className="rounded-2xl border border-teal/30 bg-paper p-6 flex flex-col">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-base uppercase tracking-[0.22em] text-teal font-bold">
              single-variable
            </p>
            <span className="font-mono text-2xl text-teal">y = f(x)</span>
          </div>
          <p className="text-[clamp(0.95rem,1.2vw,1.25rem)] text-ink/70 mb-3">
            One input. One direction of motion.
          </p>
          <div className="flex-1 grid place-items-center min-h-0">
            <CurveXY className="w-full max-w-2xl" />
          </div>
        </div>
        <div className="rounded-2xl border border-amber/40 bg-paper p-6 flex flex-col">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-base uppercase tracking-[0.22em] text-amber font-bold">
              multivariable
            </p>
            <span className="font-mono text-2xl text-amberDeep" style={{ color: "#B45309" }}>
              z = f(x, y)
            </span>
          </div>
          <p className="text-[clamp(0.95rem,1.2vw,1.25rem)] text-ink/70 mb-3">
            Multiple inputs. <em>Many</em> possible directions.
          </p>
          <div className="flex-1 min-h-[240px] rounded-xl overflow-hidden">
            <Hill3D mode="many" className="w-full h-full" rotate />
          </div>
        </div>
      </div>
    </div>
  );
}
