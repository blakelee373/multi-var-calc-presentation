"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { SectionLabel, Title, Mono } from "@/components/Type";

const points = [
  {
    label: "Generalize derivatives",
    body: "Partial derivatives ∂f/∂x and ∂f/∂y extend the single-variable derivative one axis at a time.",
  },
  {
    label: "Assemble into a vector",
    body: "The gradient ∇f = ⟨fx, fy⟩ packages both partials into a single object that lives at every point.",
  },
  {
    label: "Direction & magnitude",
    body: "∇f points the way f increases fastest. Its length is that fastest rate of change.",
  },
  {
    label: "Geometry on contour maps",
    body: "∇f is perpendicular to level curves; tight contours mean a large gradient — steep terrain.",
  },
  {
    label: "Where it goes next",
    body: "Critical points (∇f = 0), gradient descent in ML, Lagrange multipliers, the Jacobian for vector-valued functions.",
  },
];

export default function Slide10Recap() {
  return (
    <div className="h-full grid grid-cols-[6fr_5fr] gap-10 items-start">
      <div className="flex flex-col gap-5">
        <SectionLabel>10 · Summary</SectionLabel>
        <Title>The whole story in five lines.</Title>
        <ol className="mt-2 space-y-3.5">
          {points.map((p, i) => (
            <li key={p.label} className="flex gap-4">
              <span className="shrink-0 w-7 text-right text-amber font-bold text-[clamp(0.95rem,1.18vw,1.15rem)] leading-snug">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[clamp(0.95rem,1.18vw,1.2rem)] text-ink/85 leading-snug">
                <strong className="text-ink">{p.label}.</strong> {p.body}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-[clamp(0.85rem,1vw,1.05rem)] text-ink/55 italic mt-1">
          One sentence to keep: <Mono>∇f</Mono> is the 3D compass for change —
          it tells you which way is uphill and how steep it is.
        </p>
      </div>
      <div className="relative h-full flex items-end justify-center">
        <MountainScene variant="victory" className="w-full" />
        <div className="absolute left-3 bottom-2 flex items-end gap-4">
          <Character size={150} pose="confident" />
          <div className="relative">
            <div className="absolute -top-3 -left-3 opacity-30">
              <CompassIcon size={72} faded />
            </div>
            <CompassIcon size={114} glowing />
          </div>
        </div>
      </div>
    </div>
  );
}
