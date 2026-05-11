"use client";

import { ArrowField } from "@/components/visuals/ArrowField";
import { Hill3D } from "@/components/visuals/Hill3D";
import { Title, BulletList, Mono } from "@/components/Type";

export default function Slide05Compass() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>Which way is steepest?</Title>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-8 min-h-0 items-stretch">
        <div className="flex flex-col gap-4 min-h-0 justify-center">
          <BulletList
            items={[
              <>Infinite directions from any point.</>,
              <>Each direction: its own slope.</>,
              <>Called <Mono>D<sub>u</sub>f</Mono>.</>,
              <>One direction wins — the steepest.</>,
              <>That direction is the gradient.</>,
            ]}
          />
        </div>

        <div className="grid grid-rows-[1fr_1fr] gap-4 min-h-0">
          <div className="rounded-lg border border-[#E5DCC4] overflow-hidden min-h-0">
            <Hill3D mode="best" className="w-full h-full" />
          </div>
          <div className="rounded-lg border border-[#E5DCC4] p-3 grid place-items-center min-h-0">
            <ArrowField className="w-full max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
