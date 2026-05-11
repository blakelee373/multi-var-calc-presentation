"use client";

import { Bowl3D } from "@/components/visuals/Bowl3D";
import { Title, Mono } from "@/components/Type";

export default function Slide09Example() {
  return (
    <div className="h-full flex flex-col gap-7">
      <Title>
        Example: <Mono>f(x, y) = x² + y²</Mono>
      </Title>

      <div className="flex-1 grid grid-cols-[6fr_5fr] gap-8 min-h-0 items-stretch">
        <div className="rounded-lg border border-[#E5DCC4] overflow-hidden min-h-0">
          <Bowl3D className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-5 min-h-0 justify-center">
          <ul className="space-y-4">
            <li className="font-mono whitespace-nowrap text-[clamp(1.3rem,1.9vw,2rem)] text-ink">
              <span className="text-ink/40 mr-3">·</span>f<sub>x</sub> = 2x
            </li>
            <li className="font-mono whitespace-nowrap text-[clamp(1.3rem,1.9vw,2rem)] text-ink">
              <span className="text-ink/40 mr-3">·</span>f<sub>y</sub> = 2y
            </li>
            <li className="font-mono whitespace-nowrap text-[clamp(1.3rem,1.9vw,2rem)] text-ink">
              <span className="text-ink/40 mr-3">·</span>∇f = ⟨ 2x, 2y ⟩
            </li>
            <li className="font-mono whitespace-nowrap text-[clamp(1.6rem,2.4vw,2.5rem)] text-ink font-bold mt-2">
              ∇f(1, 2) = ⟨ 2, 4 ⟩
            </li>
            <li className="font-mono whitespace-nowrap text-[clamp(1.05rem,1.4vw,1.45rem)] text-ink/70">
              |∇f| = √20 ≈ 4.47
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
