"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { Eyebrow, Display } from "@/components/Type";
import { motion } from "framer-motion";

const points = [
  {
    color: "text-teal",
    label: "Normal calculus",
    body: "studies change along a path.",
  },
  {
    color: "text-teal",
    label: "Multivariable calculus",
    body: "studies change on a surface.",
  },
  {
    color: "text-amber",
    label: "The gradient",
    body: "is the 3D compass — it points uphill, fastest.",
  },
];

export default function Slide10Recap() {
  return (
    <div className="h-full grid grid-cols-[5fr_6fr] gap-10 items-center">
      <div className="flex flex-col gap-6">
        <Eyebrow>The takeaway</Eyebrow>
        <Display>
          One compass for a <span className="text-amber">3D world.</span>
        </Display>
        <ul className="space-y-4 mt-3">
          {points.map((p, i) => (
            <motion.li
              key={p.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.2 }}
              className="flex gap-4 items-start"
            >
              <span className={`${p.color} font-bold text-2xl leading-none mt-1`}>→</span>
              <span className="text-[clamp(1.1rem,1.5vw,1.6rem)] text-ink/85 leading-snug">
                <strong className="text-ink">{p.label}</strong> {p.body}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="relative h-full flex items-end justify-center">
        <MountainScene variant="victory" className="w-full" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute left-4 bottom-2 flex items-end gap-4"
        >
          <Character size={160} pose="confident" />
          <div className="relative">
            <div className="absolute -top-3 -left-3 opacity-30">
              <CompassIcon size={72} faded />
            </div>
            <CompassIcon size={120} glowing />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
