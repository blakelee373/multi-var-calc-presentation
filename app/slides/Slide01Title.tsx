"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { DisplayTitle } from "@/components/Type";

export default function Slide01Title() {
  return (
    <div className="h-full grid grid-cols-[5fr_6fr] gap-10 items-center">
      <div className="flex flex-col gap-6">
        <DisplayTitle>
          Multivariable
          <br />
          calculus
          <br />
          &amp; the gradient.
        </DisplayTitle>
      </div>
      <div className="relative h-full flex items-end justify-center">
        <MountainScene variant="intro" className="w-full" />
        <div className="absolute left-3 bottom-2 flex items-end gap-4">
          <Character size={138} pose="thinking" />
          <CompassIcon size={100} wiggle />
        </div>
      </div>
    </div>
  );
}
