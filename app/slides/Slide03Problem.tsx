"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";

export default function Slide03Problem() {
  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-ink leading-tight">
        But what if going “north” is <span className="text-amber">not enough information?</span>
      </h2>
      <p className="text-lg text-ink/65 max-w-3xl">
        In a 3D world, direction alone does not tell you how the <em>height</em> changes.
      </p>
      <div className="flex-1 relative">
        <MountainScene variant="choice" className="w-full h-full" />
        <div className="absolute left-6 bottom-6 flex items-end gap-3">
          <Character size={120} pose="thinking" />
          <CompassIcon size={80} wiggle />
        </div>
        <div className="absolute right-6 top-2 max-w-[18rem] text-sm bg-paper/90 border border-slate-200 rounded-lg p-3 shadow-sm">
          <p className="font-semibold text-ink">Same north direction.</p>
          <p className="text-ink/70">Two routes — but very different elevation outcomes.</p>
        </div>
      </div>
    </div>
  );
}
