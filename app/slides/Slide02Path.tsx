"use client";

import { CurveXY } from "@/components/visuals/CurveXY";
import { Title, BulletList, Mono } from "@/components/Type";

export default function Slide02Path() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>Single-variable calculus.</Title>

      <div className="flex-1 grid grid-cols-[5fr_6fr] gap-10 min-h-0 items-center">
        <BulletList
          items={[
            <><Mono>f : ℝ → ℝ</Mono></>,
            <>One input, one output.</>,
            <><Mono>f′(x)</Mono> = slope of the tangent.</>,
            <><Mono>f(x) = x²</Mono> &nbsp;⇒&nbsp; <Mono>f′(x) = 2x</Mono>.</>,
            <>Only one direction of motion.</>,
          ]}
        />

        <div className="rounded-lg border border-[#E5DCC4] p-4 grid place-items-center min-h-[280px]">
          <CurveXY className="w-full" showTangent />
        </div>
      </div>
    </div>
  );
}
