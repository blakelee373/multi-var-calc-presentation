"use client";

import { CurveXY } from "@/components/visuals/CurveXY";
import { Hill3D } from "@/components/visuals/Hill3D";
import { Title, Mono } from "@/components/Type";

export default function Slide04Compare() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>One input vs. many.</Title>

      <div className="flex-1 grid grid-cols-2 gap-8 min-h-0">
        <div className="rounded-lg border border-[#E5DCC4] p-5 flex flex-col">
          <p className="font-mono text-[clamp(1.5rem,2.2vw,2.25rem)] text-ink whitespace-nowrap">
            y = f(x)
          </p>
          <div className="flex-1 grid place-items-center min-h-0 my-3">
            <CurveXY className="w-full" />
          </div>
          <ul className="space-y-1.5 text-[clamp(1.05rem,1.35vw,1.4rem)] text-ink font-medium">
            <li>· Domain: a line.</li>
            <li>· One direction.</li>
            <li>· One slope <Mono>f′(x)</Mono>.</li>
          </ul>
        </div>

        <div className="rounded-lg border border-[#E5DCC4] p-5 flex flex-col">
          <p className="font-mono text-[clamp(1.5rem,2.2vw,2.25rem)] text-ink whitespace-nowrap">
            z = f(x, y)
          </p>
          <div className="flex-1 min-h-[200px] rounded-md overflow-hidden my-3">
            <Hill3D mode="many" className="w-full h-full" rotate />
          </div>
          <ul className="space-y-1.5 text-[clamp(1.05rem,1.35vw,1.4rem)] text-ink font-medium">
            <li>· Domain: a plane.</li>
            <li>· Infinitely many directions.</li>
            <li>· One slope per direction.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
