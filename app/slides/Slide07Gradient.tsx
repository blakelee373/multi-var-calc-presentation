"use client";

import { Hill3D } from "@/components/visuals/Hill3D";
import { Eyebrow, Headline } from "@/components/Type";
import { motion } from "framer-motion";

export default function Slide07Gradient() {
  return (
    <div className="h-full flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Eyebrow>Step 2</Eyebrow>
        <Headline>
          Combine them. Meet the <span className="text-amber">gradient</span>.
        </Headline>
      </div>
      <div className="flex-1 grid grid-cols-[3fr_2fr] gap-6 min-h-0">
        <div className="rounded-2xl border border-slate-200/60 overflow-hidden bg-paper">
          <Hill3D mode="gradient" className="w-full h-full min-h-[360px]" rotate />
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl bg-amber/12 border-2 border-amber p-7 text-center shadow-lg"
          >
            <p className="text-base uppercase tracking-[0.22em] text-amberDeep font-bold mb-3" style={{ color: "#B45309" }}>
              the gradient
            </p>
            <p className="font-mono text-[clamp(2.5rem,5vw,5.5rem)] text-ink font-bold leading-none">
              ∇f = ⟨f<sub>x</sub>, f<sub>y</sub>⟩
            </p>
          </motion.div>
          <p className="text-[clamp(1.05rem,1.4vw,1.5rem)] text-ink leading-snug">
            The multivariable version of a compass for <strong>change</strong>.
          </p>
          <p className="text-[clamp(1rem,1.3vw,1.4rem)] text-ink/70 leading-snug">
            It points in the{" "}
            <strong className="text-amberDeep" style={{ color: "#B45309" }}>
              direction of fastest increase
            </strong>{" "}
            — and its length tells you <em>how steep</em> that direction is.
          </p>
        </div>
      </div>
    </div>
  );
}
