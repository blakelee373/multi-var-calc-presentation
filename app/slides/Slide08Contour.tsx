"use client";

import { ContourMap } from "@/components/visuals/ContourMap";
import { SectionLabel, Title, BulletList, Mono } from "@/components/Type";

export default function Slide08Contour() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>08 · Geometry</SectionLabel>
        <Title>Reading the gradient on a contour map.</Title>
      </div>

      <div className="flex-1 grid grid-cols-[6fr_5fr] gap-8 min-h-0">
        <div className="rounded-lg border border-[#E5DCC4] bg-paper p-3 flex items-center justify-center min-h-0">
          <ContourMap className="w-full h-full" animateArrow />
        </div>

        <div className="flex flex-col gap-4 min-h-0">
          <BulletList
            items={[
              <>
                A <strong>level curve</strong> is the set{" "}
                <Mono>{`{ (x, y) : f(x, y) = c }`}</Mono> — all points at the
                same height.
              </>,
              <>
                Stacking level curves gives a <strong>contour map</strong>,
                exactly like a topographic hiking map.
              </>,
              <>
                <strong>Key fact:</strong> the gradient at any point is{" "}
                <em>perpendicular</em> to the level curve through that point.
              </>,
              <>
                <strong>Spacing reads slope.</strong> Tightly packed contours
                ⇒ a steep gradient. Widely spaced contours ⇒ gentle slope.
              </>,
              <>
                Moving along a contour, <Mono>f</Mono> is constant — so the
                directional derivative along a level curve is zero. The
                gradient does no work in that direction.
              </>,
              <>
                The arrow in the figure is the true outward normal of the
                level ellipse at the marked point — perpendicular by
                construction.
              </>,
            ]}
          />
        </div>
      </div>
    </div>
  );
}
