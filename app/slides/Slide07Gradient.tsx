"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { Title, BulletList, Mono } from "@/components/Type";

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
              <>A vector. Two components: the partials.</>,
              <>Direction: where <Mono>f</Mono> grows fastest.</>,
              <>Length <Mono>|∇f|</Mono>: how fast it grows.</>,
              <><Mono>D<sub>u</sub>f = ∇f · u</Mono>.</>,
              <><Mono>∇f = 0</Mono> ⇒ a flat spot.</>,
            ]}
          />
        </div>

        <div className="rounded-lg border border-[#E5DCC4] overflow-hidden min-h-0">
          <Hill3D mode="gradient" className="w-full h-full" rotate={false} />
        </div>
      </div>
    </div>
  );
}
