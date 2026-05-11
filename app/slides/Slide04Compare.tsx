"use client";

import { CurveXY } from "@/components/visuals/CurveXY";
import { Hill3D } from "@/components/visuals/Hill3D";
import { SectionLabel, Title, Mono } from "@/components/Type";

export default function Slide04Compare() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>04 · Setup</SectionLabel>
        <Title>From one input to several.</Title>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        <div className="rounded-lg border border-[#E5DCC4] bg-paper p-5 flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.22em] text-teal font-bold mb-1">
            single-variable
          </p>
          <p className="font-mono text-[clamp(1.25rem,1.8vw,1.85rem)] text-ink whitespace-nowrap">
            f : ℝ → ℝ &nbsp;·&nbsp; y = f(x)
          </p>
          <div className="flex-1 grid place-items-center min-h-0 my-2">
            <CurveXY className="w-full" />
          </div>
          <ul className="space-y-1.5 text-[clamp(0.85rem,1.05vw,1.05rem)] text-ink/80">
            <li>· Domain is a line; graph lives in the plane (ℝ²).</li>
            <li>· One direction of motion: ±x.</li>
            <li>· One derivative <Mono>f′(x)</Mono> captures everything about rate of change.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-[#E5DCC4] bg-paper p-5 flex flex-col">
          <p className="text-[11px] uppercase tracking-[0.22em] text-amber font-bold mb-1" style={{ color: "#B45309" }}>
            multivariable
          </p>
          <p className="font-mono text-[clamp(1.25rem,1.8vw,1.85rem)] text-ink whitespace-nowrap">
            f : ℝ² → ℝ &nbsp;·&nbsp; z = f(x, y)
          </p>
          <div className="flex-1 min-h-[200px] rounded-md overflow-hidden my-2">
            <Hill3D mode="many" className="w-full h-full" rotate />
          </div>
          <ul className="space-y-1.5 text-[clamp(0.85rem,1.05vw,1.05rem)] text-ink/80">
            <li>· Domain is a plane; graph is a surface in ℝ³.</li>
            <li>· From any point, <em>infinitely</em> many directions of motion.</li>
            <li>· One number <Mono>f′</Mono> can&rsquo;t describe all of them — we need a richer object.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
