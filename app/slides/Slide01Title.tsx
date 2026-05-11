"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";

export default function Slide01Title() {
  return (
    <div className="h-full grid grid-cols-2 gap-8 items-center">
      <div className="flex flex-col gap-6">
        <p className="text-sm uppercase tracking-[0.25em] text-amber font-semibold">
          A short story
        </p>
        <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] text-ink">
          Multivariable Calculus:
          <br />
          <span className="text-amber">Why We Need a 3D Compass</span>
        </h1>
        <p className="text-xl text-ink/70 max-w-md leading-snug">
          A simple story about how calculus changes when the world has more than
          one direction.
        </p>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center">
        <MountainScene variant="intro" className="w-full max-w-xl" />
        <div className="absolute left-6 bottom-4 flex items-end gap-3">
          <Character size={110} pose="thinking" />
          <CompassIcon size={86} wiggle />
        </div>
      </div>
    </div>
  );
}
