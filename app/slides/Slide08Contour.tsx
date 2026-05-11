"use client";

import { ContourMap } from "@/components/visuals/ContourMap";
import { Title, BulletList, Mono } from "@/components/Type";

export default function Slide08Contour() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>Contour maps.</Title>

      <div className="flex-1 grid grid-cols-[6fr_5fr] gap-8 min-h-0 items-stretch">
        <div className="rounded-lg border border-[#E5DCC4] p-3 flex items-center justify-center min-h-0">
          <ContourMap className="w-full h-full" animateArrow />
        </div>

        <div className="flex flex-col gap-4 min-h-0 justify-center">
          <BulletList
            items={[
              <>A <strong>level curve</strong>: <Mono>{`f(x, y) = c`}</Mono>.</>,
              <>Stacked level curves = topographic map.</>,
              <><Mono>∇f</Mono> is perpendicular to every level curve.</>,
              <>Tight contours ⇒ steep slope.</>,
              <>Along a contour, <Mono>f</Mono> doesn’t change.</>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
