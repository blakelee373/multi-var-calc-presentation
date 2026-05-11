"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { SectionLabel, Title, BulletList } from "@/components/Type";

export default function Slide03Problem() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>03 · Motivation</SectionLabel>
        <Title>“North” isn’t enough information.</Title>
      </div>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-10 min-h-0">
        <div className="flex flex-col gap-5">
          <BulletList
            items={[
              <>
                On flat ground, a 2D compass picks out a unique road. Walking
                north fully determines where you go.
              </>,
              <>
                Add a third dimension — height — and the same compass bearing
                covers <strong>infinitely many routes</strong>.
              </>,
              <>
                Two routes labelled “north”:
                <ul className="mt-1 ml-4 space-y-0.5 list-[lower-alpha]">
                  <li>through the tunnel — elevation stays flat</li>
                  <li>over the mountain — elevation climbs sharply</li>
                </ul>
              </>,
              <>
                Same compass direction. Very different functions of position.
                Direction alone no longer captures rate of change.
              </>,
              <>
                <strong>The need:</strong> a tool that takes both <em>where you
                are</em> and <em>which way you face</em>, and reports how the
                surface responds.
              </>,
            ]}
          />
        </div>

        <div className="relative rounded-lg overflow-hidden border border-[#E5DCC4] bg-paper min-h-0">
          <MountainScene variant="choice" className="w-full h-full" />
          <div className="absolute left-4 bottom-3 flex items-end gap-3">
            <Character size={120} pose="thinking" />
            <CompassIcon size={84} wiggle />
          </div>
        </div>
      </div>
    </div>
  );
}
