"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { DisplayTitle, SectionLabel } from "@/components/Type";

export default function Slide01Title() {
  return (
    <div className="h-full grid grid-cols-[5fr_6fr] gap-10 items-center">
      <div className="flex flex-col gap-7">
        <SectionLabel>An introduction</SectionLabel>
        <DisplayTitle>
          Multivariable calculus
          <br />
          <span className="text-amber">&amp; the gradient.</span>
        </DisplayTitle>
        <p className="text-[clamp(1.05rem,1.4vw,1.55rem)] text-ink/70 leading-snug max-w-[44ch]">
          When a function depends on more than one input, the question
          <em> &ldquo;how fast does it change?&rdquo;</em> stops having a single
          answer. This deck builds intuition for what we do instead.
        </p>
        <div className="flex flex-col gap-1 mt-2 text-[clamp(0.85rem,1vw,1.05rem)] text-ink/55 leading-snug">
          <span>10 slides · roughly 8 minutes</span>
          <span>Audience: prior exposure to single-variable calculus helpful but not required.</span>
        </div>
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
