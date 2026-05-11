"use client";

import { Bowl3D } from "@/components/visuals/Bowl3D";
import { SectionLabel, Title, Mono } from "@/components/Type";

export default function Slide09Example() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div>
        <SectionLabel>09 · Practice</SectionLabel>
        <Title>
          Worked example: <Mono>f(x, y) = x² + y²</Mono>
        </Title>
      </div>

      <div className="flex-1 grid grid-cols-[6fr_5fr] gap-8 min-h-0">
        <div className="rounded-lg border border-[#E5DCC4] bg-paper overflow-hidden min-h-0">
          <Bowl3D className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-3 min-h-0">
          <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 items-baseline">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 font-semibold">step 1</p>
            <p className="font-mono whitespace-nowrap text-[clamp(1.05rem,1.5vw,1.5rem)] text-ink">
              f(x, y) = x² + y²
            </p>

            <p className="text-[11px] uppercase tracking-[0.22em] text-teal font-semibold">step 2 · f<sub>x</sub></p>
            <p className="font-mono whitespace-nowrap text-[clamp(1.05rem,1.5vw,1.5rem)] text-ink">
              ∂f/∂x = 2x
            </p>

            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: "#0F766E" }}>step 3 · f<sub>y</sub></p>
            <p className="font-mono whitespace-nowrap text-[clamp(1.05rem,1.5vw,1.5rem)] text-ink">
              ∂f/∂y = 2y
            </p>

            <p className="text-[11px] uppercase tracking-[0.22em] text-amber font-semibold" style={{ color: "#B45309" }}>step 4 · ∇f</p>
            <p className="font-mono whitespace-nowrap text-[clamp(1.05rem,1.5vw,1.5rem)] text-ink">
              ∇f = ⟨ 2x, 2y ⟩
            </p>
          </div>

          <div className="mt-2 rounded-lg border-l-[4px] border-amber bg-paper px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55 font-semibold">
              evaluate at (1, 2)
            </p>
            <p className="font-mono whitespace-nowrap text-[clamp(1.3rem,2vw,2rem)] text-ink font-bold leading-tight">
              ∇f(1, 2) = ⟨ 2, 4 ⟩
            </p>
            <p className="text-[clamp(0.85rem,1.05vw,1.1rem)] text-ink/70 mt-1">
              The arrow above lies in the input plane along this direction.
              Its length, <Mono>|∇f| = √20 ≈ 4.47</Mono>, is the slope of the
              steepest path leaving (1, 2).
            </p>
          </div>

          <ul className="text-[clamp(0.85rem,1.05vw,1.1rem)] text-ink/75 space-y-1.5 mt-1">
            <li>· The gradient points <em>away</em> from the bowl&rsquo;s minimum at the origin.</li>
            <li>· To descend, follow <Mono>−∇f</Mono> — the basis of gradient descent.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
