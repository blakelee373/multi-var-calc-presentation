"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";

export default function Slide10Recap() {
  return (
    <div className="h-full grid grid-cols-2 gap-8 items-center">
      <div className="flex flex-col gap-5">
        <p className="text-sm uppercase tracking-[0.25em] text-amber font-semibold">
          Final idea
        </p>
        <h2 className="text-5xl font-bold leading-[1.1] text-ink">
          One compass for a 3D world.
        </h2>
        <ul className="space-y-3 text-lg text-ink/80 max-w-md">
          <li className="flex gap-3">
            <span className="text-teal font-bold">→</span>
            <span>
              <strong>Normal calculus</strong> studies change along a path.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-teal font-bold">→</span>
            <span>
              <strong>Multivariable calculus</strong> studies change on a surface.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber font-bold">→</span>
            <span>
              <strong>The gradient</strong> is the 3D compass that tells us which way goes uphill fastest.
            </span>
          </li>
        </ul>
      </div>
      <div className="relative h-full flex flex-col items-center justify-center">
        <MountainScene variant="victory" className="w-full max-w-xl" />
        <div className="absolute left-6 bottom-4 flex items-end gap-3">
          <Character size={120} pose="confident" />
          <div className="relative">
            <div className="absolute -top-2 -left-2 opacity-40">
              <CompassIcon size={56} faded />
            </div>
            <CompassIcon size={86} glowing />
          </div>
        </div>
      </div>
    </div>
  );
}
