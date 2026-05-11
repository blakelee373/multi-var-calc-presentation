"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { Title, BulletList, Mono } from "@/components/Type";

export default function Slide10Recap() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>Summary.</Title>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-10 min-h-0 items-center">
        <BulletList
          items={[
            <>Partials: slope along one axis.</>,
            <>Gradient <Mono>∇f</Mono> = ⟨ f<sub>x</sub>, f<sub>y</sub> ⟩.</>,
            <>Points uphill, fastest.</>,
            <>Length = the rate of climb.</>,
            <>Perpendicular to level curves.</>,
          ]}
        />

        <div className="relative h-full flex items-end justify-center">
          <MountainScene variant="victory" className="w-full" />
          <div className="absolute left-3 bottom-2 flex items-end gap-4">
            <Character size={150} pose="confident" />
            <div className="relative">
              <div className="absolute -top-3 -left-3 opacity-30">
                <CompassIcon size={72} faded />
              </div>
              <CompassIcon size={114} glowing />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
