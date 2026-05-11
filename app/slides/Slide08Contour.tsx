"use client";

import { ContourMap } from "@/components/visuals/ContourMap";
import { Eyebrow, Headline, Lede } from "@/components/Type";

export default function Slide08Contour() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>Another view</Eyebrow>
        <Headline>
          Looking down: <span className="text-amber">contour maps</span>.
        </Headline>
        <Lede>
          From above, the gradient points <em>straight uphill</em> — crossing the
          level curves at a right angle.
        </Lede>
      </div>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6 min-h-0">
        <div className="rounded-2xl border border-slate-200/60 bg-paper overflow-hidden flex items-center justify-center p-3">
          <ContourMap className="w-full h-full" animateArrow />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <div className="rounded-2xl bg-paper border border-slate-200/60 p-5">
            <p className="text-base uppercase tracking-[0.18em] text-ink/55 font-bold mb-2">
              Level curves
            </p>
            <p className="text-[clamp(1rem,1.3vw,1.35rem)] text-ink/80 leading-snug">
              Each ring connects points at the <em>same height</em> — like
              contour lines on a hiking map.
            </p>
          </div>
          <div className="rounded-2xl bg-amber/12 border-2 border-amber/50 p-5">
            <p className="text-base uppercase tracking-[0.18em] font-bold mb-2" style={{ color: "#B45309" }}>
              Gradient arrow
            </p>
            <p className="text-[clamp(1rem,1.3vw,1.35rem)] text-ink leading-snug">
              Always <strong>perpendicular</strong> to the contour through your
              point — that's the steepest uphill direction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
