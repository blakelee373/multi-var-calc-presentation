"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { SectionLabel, Title, BulletList, Mono } from "@/components/Type";

export default function Slide07Gradient() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>07 · Definition</SectionLabel>
        <Title>The gradient packages the partials together.</Title>
      </div>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-8 min-h-0">
        <div className="flex flex-col gap-4 min-h-0">
          <div className="rounded-lg border-l-[4px] border-amber bg-paper px-5 py-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-ink/55 font-semibold">
              definition
            </p>
            <p className="font-mono whitespace-nowrap text-[clamp(1.6rem,2.8vw,2.9rem)] text-ink font-bold leading-tight">
              ∇f(x, y) = ⟨ f<sub>x</sub>, f<sub>y</sub> ⟩
            </p>
          </div>
          <BulletList
            items={[
              <>
                The gradient is a <strong>vector</strong>, not a number. Its
                two components are the two partial derivatives.
              </>,
              <>
                <strong>Direction:</strong> at any point, <Mono>∇f</Mono>{" "}
                points the way <em>f</em> increases the fastest.
              </>,
              <>
                <strong>Magnitude:</strong> <Mono>|∇f|</Mono> is the rate of
                that fastest increase — the maximum directional derivative.
              </>,
              <>
                Directional derivative in any unit direction <Mono>u</Mono>:{" "}
                <Mono>D<sub>u</sub>f = ∇f · u</Mono>. Largest when{" "}
                <Mono>u</Mono> matches the gradient.
              </>,
              <>
                Zero gradient ⇒ a flat spot. These critical points are where
                maxima, minima, and saddles live.
              </>,
            ]}
          />
        </div>

        <div className="rounded-lg border border-[#E5DCC4] bg-paper overflow-hidden min-h-0">
          <Hill3D mode="gradient" className="w-full h-full" rotate={false} />
        </div>
      </div>
    </div>
  );
}
