"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { Title, BulletList } from "@/components/Type";

export default function Slide03Problem() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>“North” isn’t enough.</Title>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-10 min-h-0 items-center">
        <BulletList
          items={[
            <>Flat ground: one road north.</>,
            <>3D world: infinitely many routes north.</>,
            <>Same bearing, different elevations.</>,
            <>Direction alone can’t tell us the climb.</>,
            <>We need direction + terrain.</>,
          ]}
        />

        <div className="relative rounded-lg overflow-hidden border border-[#E5DCC4] min-h-[320px] h-full">
          <MountainScene variant="choice" className="w-full h-full" />
          <div className="absolute left-4 bottom-3 flex items-end gap-3">
            <Character size={118} pose="thinking" />
            <CompassIcon size={82} wiggle />
          </div>
        </div>
      </div>
    </div>
  );
}
