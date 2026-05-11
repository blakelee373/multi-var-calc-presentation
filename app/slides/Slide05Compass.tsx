"use client";

import { ArrowField } from "@/components/visuals/ArrowField";
import { Hill3D } from "@/components/visuals/Hill3D";
import { SectionLabel, Title, BulletList, Mono, Callout } from "@/components/Type";

export default function Slide05Compass() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>05 · Concept</SectionLabel>
        <Title>The direction of fastest increase.</Title>
      </div>

      <div className="flex-1 grid grid-cols-[6fr_5fr] gap-8 min-h-0">
        <div className="flex flex-col gap-4 min-h-0">
          <BulletList
            items={[
              <>
                Stand on a surface <Mono>z = f(x, y)</Mono>. You can step in
                any direction — each unit vector <Mono>u</Mono> in the input
                plane is a valid choice.
              </>,
              <>
                Every direction has its own slope, called a <strong>directional
                derivative</strong>: <Mono>D<sub>u</sub>f</Mono> = the rate of
                change of <Mono>f</Mono> along <Mono>u</Mono>.
              </>,
              <>
                Out of all those directions, exactly <em>one</em> gives the
                largest rate of climb. That direction is what we want.
              </>,
              <>
                Two questions we want one object to answer at every point:
                <ul className="mt-1 ml-4 space-y-0.5 list-[lower-alpha]">
                  <li>Which way is steepest uphill?</li>
                  <li>How steep is it that way?</li>
                </ul>
              </>,
            ]}
          />
          <Callout label="working title">
            We call this object the <strong>gradient</strong>. It’s a vector
            that lives at every point of the input plane and acts like a 3D
            compass for change.
          </Callout>
        </div>

        <div className="grid grid-rows-[1fr_1fr] gap-4 min-h-0">
          <div className="rounded-lg border border-[#E5DCC4] bg-paper overflow-hidden min-h-0">
            <Hill3D mode="best" className="w-full h-full" rotate />
          </div>
          <div className="rounded-lg border border-[#E5DCC4] bg-paper p-3 grid place-items-center min-h-0">
            <ArrowField className="w-full max-h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
