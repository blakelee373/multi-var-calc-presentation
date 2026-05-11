"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { Title, BulletList, Mono } from "@/components/Type";
import { palette } from "@/lib/palette";

export default function Slide07Gradient() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>The gradient <Mono>∇f</Mono>.</Title>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-8 min-h-0 items-stretch">
        <div className="flex flex-col gap-5 min-h-0 justify-center">
          <p className="font-mono whitespace-nowrap text-[clamp(1.8rem,3vw,3rem)] text-ink font-bold">
            ∇f = ⟨ f<sub>x</sub>, f<sub>y</sub> ⟩
          </p>
          <BulletList
            items={[
              <>A vector. Two components.</>,
              <>Direction: where <Mono>f</Mono> grows fastest.</>,
              <>Length: how fast it grows.</>,
              <><Mono>D<sub>u</sub>f = ∇f · u</Mono>.</>,
              <><Mono>∇f = 0</Mono> ⇒ a flat spot.</>,
            ]}
          />
        </div>

        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex-1 rounded-lg border border-[#E5DCC4] overflow-hidden min-h-0">
            <Hill3D mode="gradient" className="w-full h-full" />
          </div>
          <div className="flex items-center justify-center gap-5 text-[clamp(0.85rem,1.1vw,1.1rem)] text-ink/75">
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block w-3 h-3 rounded-sm" style={{ background: palette.teal }} />
              <Mono>f<sub>x</sub></Mono>
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block w-3 h-3 rounded-sm" style={{ background: "#0F766E" }} />
              <Mono>f<sub>y</sub></Mono>
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="inline-block w-3 h-3 rounded-sm" style={{ background: palette.amber }} />
              <Mono>∇f</Mono>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
