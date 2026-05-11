"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { SectionLabel, Title, BulletList, Mono } from "@/components/Type";

export default function Slide06Partials() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>06 · Definitions</SectionLabel>
        <Title>Partial derivatives are the building blocks.</Title>
      </div>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-8 min-h-0">
        <div className="flex flex-col gap-4 min-h-0">
          <BulletList
            items={[
              <>
                <strong>Idea:</strong> change only one input at a time, hold
                the others constant, then take the ordinary derivative.
              </>,
              <>
                <Mono>∂f/∂x = f<sub>x</sub></Mono> = derivative with respect
                to <Mono>x</Mono>, treating <Mono>y</Mono> as a constant.
              </>,
              <>
                <Mono>∂f/∂y = f<sub>y</sub></Mono> = derivative with respect
                to <Mono>y</Mono>, treating <Mono>x</Mono> as a constant.
              </>,
              <>
                <strong>Geometry:</strong> slice the surface with a plane
                parallel to the chosen axis; the partial is the slope of that
                slice through the point.
              </>,
              <>
                Tiny worked example — <Mono>f(x, y) = x²y + 3y</Mono>:
                <ul className="ml-4 mt-1 space-y-0.5">
                  <li>· <Mono>f<sub>x</sub> = 2xy</Mono> &nbsp; (y is constant)</li>
                  <li>· <Mono>f<sub>y</sub> = x² + 3</Mono> &nbsp; (x is constant)</li>
                </ul>
              </>,
              <>
                Each partial answers <em>one</em> coordinate question. They
                will combine to answer the full directional question.
              </>,
            ]}
          />
        </div>

        <div className="flex flex-col gap-3 min-h-0">
          <div className="flex-1 rounded-lg border border-[#E5DCC4] bg-paper overflow-hidden min-h-0">
            <Hill3D mode="partials" className="w-full h-full" rotate={false} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-[#E5DCC4] bg-paper p-3 text-center">
              <p className="font-mono text-[clamp(1.4rem,2.2vw,2.2rem)] text-teal font-bold leading-none">
                f<sub>x</sub>
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-1">
                along +x · y fixed
              </p>
            </div>
            <div className="rounded-md border border-[#E5DCC4] bg-paper p-3 text-center">
              <p className="font-mono text-[clamp(1.4rem,2.2vw,2.2rem)] font-bold leading-none" style={{ color: "#0F766E" }}>
                f<sub>y</sub>
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-1">
                along +y · x fixed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
