"use client";

import { MountainScene } from "@/components/visuals/MountainScene";
import { Character } from "@/components/visuals/Character";
import { CompassIcon } from "@/components/visuals/CompassIcon";
import { Eyebrow, Headline, Lede } from "@/components/Type";
import { motion } from "framer-motion";

export default function Slide03Problem() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <Eyebrow>Chapter 2 — the problem</Eyebrow>
        <Headline>
          But what if “north” is <span className="text-amber">not enough?</span>
        </Headline>
        <Lede>
          In a 3D world, the direction alone doesn't tell you how the{" "}
          <em>height</em> changes.
        </Lede>
      </div>
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-slate-200/60 min-h-0">
        <MountainScene variant="choice" className="w-full h-full" />
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-6 bottom-4 flex items-end gap-3"
        >
          <Character size={150} pose="thinking" />
          <CompassIcon size={100} wiggle />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="absolute right-6 top-6 max-w-[22rem] bg-paper/95 backdrop-blur-sm border border-slate-200 rounded-xl p-5 shadow-lg"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-amber font-bold mb-1">
            Same north — two outcomes
          </p>
          <p className="text-[clamp(0.95rem,1.2vw,1.2rem)] text-ink/80 leading-snug">
            The compass points the same way. The mountain doesn't care — your
            elevation depends on <em>which</em> way north you choose.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
