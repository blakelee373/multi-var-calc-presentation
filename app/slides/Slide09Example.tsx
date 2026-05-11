"use client";

import { Bowl3D } from "@/components/visuals/Bowl3D";
import { Eyebrow, Headline, Lede } from "@/components/Type";
import { motion } from "framer-motion";

export default function Slide09Example() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>Example</Eyebrow>
        <Headline>
          A simple bowl: <span className="font-mono">f(x, y) = x² + y²</span>
        </Headline>
        <Lede>
          At the point (1, 2), the gradient tells us which way the function
          climbs fastest.
        </Lede>
      </div>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6 min-h-0">
        <div className="rounded-2xl border border-slate-200/60 overflow-hidden bg-paper">
          <Bowl3D className="w-full h-full min-h-[360px]" />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl bg-paper border border-slate-200/60 p-5"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-ink/55 font-bold mb-2">
              function
            </p>
            <p className="font-mono text-[clamp(1.5rem,2.4vw,2.6rem)] text-ink font-semibold">
              f(x, y) = x² + y²
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl bg-paper border-2 border-teal/40 p-5"
          >
            <p className="text-sm uppercase tracking-[0.18em] text-teal font-bold mb-2">
              gradient
            </p>
            <p className="font-mono text-[clamp(1.5rem,2.4vw,2.6rem)] text-ink font-semibold">
              ∇f = ⟨2x, 2y⟩
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.6 }}
            className="rounded-2xl bg-amber/12 border-2 border-amber p-6 shadow-lg"
          >
            <p className="text-sm uppercase tracking-[0.18em] font-bold mb-2" style={{ color: "#B45309" }}>
              at the point (1, 2)
            </p>
            <p className="font-mono text-[clamp(1.8rem,3vw,3.2rem)] text-ink font-bold">
              ∇f(1, 2) = ⟨2, 4⟩
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
