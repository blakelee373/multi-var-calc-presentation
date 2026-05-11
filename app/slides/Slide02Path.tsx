"use client";

import { CurveXY } from "@/components/visuals/CurveXY";
import { SectionLabel, Title, BulletList, Mono } from "@/components/Type";

export default function Slide02Path() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>02 · Foundations</SectionLabel>
        <Title>Single-variable calculus, in one breath.</Title>
      </div>

      <div className="flex-1 grid grid-cols-[6fr_5fr] gap-10 min-h-0">
        <div className="flex flex-col gap-5">
          <BulletList
            items={[
              <>
                A function <Mono>f : ℝ → ℝ</Mono> takes one number in and gives
                one number back.
              </>,
              <>
                The <strong>derivative</strong>{" "}
                <Mono>f′(x) = lim<sub>h→0</sub> [f(x+h) − f(x)] ⁄ h</Mono>{" "}
                measures the instantaneous rate of change.
              </>,
              <>
                Geometrically, <Mono>f′(x)</Mono> is the <strong>slope of the tangent line</strong> to the graph at <Mono>x</Mono>.
              </>,
              <>
                Example: <Mono>f(x) = x²</Mono> gives{" "}
                <Mono>f′(x) = 2x</Mono>; at <Mono>x = 3</Mono> the slope is{" "}
                <Mono>6</Mono>.
              </>,
              <>
                <strong>The constraint:</strong> motion happens along{" "}
                <em>one</em> axis. There is exactly one direction to ask about.
              </>,
            ]}
          />
          <p className="text-[clamp(0.9rem,1.1vw,1.1rem)] text-ink/55 italic mt-1">
            We need to keep this picture in mind — the multivariable case will
            generalize each of these ideas.
          </p>
        </div>

        <div className="flex flex-col min-h-0">
          <div className="flex-1 rounded-lg border border-[#E5DCC4] bg-paper p-4 grid place-items-center min-h-0">
            <CurveXY className="w-full" showTangent />
          </div>
          <p className="text-[clamp(0.85rem,1vw,1.05rem)] text-ink/60 italic mt-2 text-center">
            The orange line is tangent to the curve at the marked point — its
            slope <em>is</em> <Mono>f′(x)</Mono>.
          </p>
        </div>
      </div>
    </div>
  );
}
