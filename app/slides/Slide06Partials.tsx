"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { Title, BulletList, Mono } from "@/components/Type";

export default function Slide06Partials() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>Partial derivatives.</Title>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-8 min-h-0 items-stretch">
        <div className="flex flex-col gap-4 min-h-0 justify-center">
          <BulletList
            items={[
              <>Vary one input. Hold the other fixed.</>,
              <><Mono>f<sub>x</sub> = ∂f/∂x</Mono> — slope along x.</>,
              <><Mono>f<sub>y</sub> = ∂f/∂y</Mono> — slope along y.</>,
              <>Slice the surface; take a 1D derivative.</>,
              <><Mono>f = x²y + 3y</Mono> ⇒ <Mono>f<sub>x</sub> = 2xy</Mono>, <Mono>f<sub>y</sub> = x² + 3</Mono>.</>,
            ]}
          />
        </div>

        <div className="rounded-lg border border-[#E5DCC4] overflow-hidden min-h-0">
          <Hill3D mode="partials" className="w-full h-full" rotate={false} />
        </div>
      </div>
    </div>
  );
}
