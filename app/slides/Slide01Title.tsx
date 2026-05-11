"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { Eyebrow, Display } from "@/components/Type";
import { motion } from "framer-motion";

export default function Slide01Title() {
  return (
    <div className="h-full grid grid-cols-[5fr_6fr] gap-10 items-center">
      <div className="flex flex-col gap-7">
        <Eyebrow>A short story</Eyebrow>
        <Display>
          Multivariable
          <br />
          Calculus.
          <br />
          <span className="text-amber">A 3D compass.</span>
        </Display>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-[clamp(1.15rem,1.65vw,1.75rem)] text-ink/70 leading-snug max-w-[44ch]"
        >
          How calculus changes when the world has{" "}
          <span className="text-ink font-semibold">more than one direction</span>.
        </motion.p>
      </div>
      <div className="relative h-full flex items-end justify-center">
        <MountainScene variant="intro" className="w-full" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute left-4 bottom-2 flex items-end gap-4"
        >
          <Character size={150} pose="thinking" />
          <CompassIcon size={110} wiggle />
        </motion.div>
      </div>
    </div>
  );
}
