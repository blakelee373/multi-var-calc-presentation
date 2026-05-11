"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { Eyebrow, Headline } from "@/components/Type";
import { palette } from "@/lib/palette";

export default function Slide06Partials() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>Step 1</Eyebrow>
        <Headline>
          Measure the slope in the <span className="text-teal">basic directions</span>.
        </Headline>
      </div>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6 min-h-0">
        <div className="rounded-2xl border border-slate-200/60 overflow-hidden bg-paper">
          <Hill3D mode="partials" className="w-full h-full min-h-[360px]" rotate />
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <div className="rounded-2xl bg-paper border-2 border-teal/40 p-6">
            <div className="flex items-center gap-4 mb-3">
              <span
                aria-hidden
                className="inline-block w-10 h-3 rounded-full"
                style={{ background: palette.teal }}
              />
              <p className="font-mono text-[clamp(2rem,3.2vw,3.4rem)] text-teal font-bold">
                f<sub>x</sub>
              </p>
            </div>
            <p className="text-[clamp(1rem,1.3vw,1.4rem)] text-ink/80 leading-snug">
              How the surface changes if we move <em>only</em> in the{" "}
              <strong>x direction</strong>.
            </p>
          </div>
          <div className="rounded-2xl bg-paper border-2 p-6" style={{ borderColor: "#0F766E66" }}>
            <div className="flex items-center gap-4 mb-3">
              <span
                aria-hidden
                className="inline-block w-10 h-3 rounded-full"
                style={{ background: "#0F766E" }}
              />
              <p className="font-mono text-[clamp(2rem,3.2vw,3.4rem)] font-bold" style={{ color: "#0F766E" }}>
                f<sub>y</sub>
              </p>
            </div>
            <p className="text-[clamp(1rem,1.3vw,1.4rem)] text-ink/80 leading-snug">
              How the surface changes if we move <em>only</em> in the{" "}
              <strong>y direction</strong>.
            </p>
          </div>
          <p className="text-base text-ink/55 italic px-2">
            These two directional slopes are called <strong>partial derivatives</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
