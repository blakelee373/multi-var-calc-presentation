"use client";

import { forwardRef, type ReactNode } from "react";

type SlideFrameProps = {
  slideNumber: number;
  totalSlides: number;
  children: ReactNode;
};

export const SlideFrame = forwardRef<HTMLDivElement, SlideFrameProps>(
  function SlideFrame({ slideNumber, totalSlides, children }, ref) {
    return (
      <div
        ref={ref}
        data-slide-id={slideNumber}
        className="relative overflow-hidden rounded-2xl"
        style={{
          width: "min(96vw, calc(94vh * 16 / 9))",
          aspectRatio: "16 / 9",
          background:
            "radial-gradient(ellipse at top, #FFFFFF 0%, #FBF6EC 60%, #F4EBD8 100%)",
          boxShadow:
            "0 35px 80px -20px rgba(31,42,68,0.35), 0 8px 24px -8px rgba(31,42,68,0.18)",
        }}
      >
        {/* subtle inner border */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/40" />

        {/* accent bar */}
        <div
          className="absolute top-0 left-0 h-1.5 w-full"
          style={{
            background:
              "linear-gradient(90deg, #F59E0B 0%, #34D399 50%, #0EA5A4 100%)",
          }}
        />

        <div className="absolute inset-0 px-14 pt-14 pb-12 flex flex-col">
          {children}
        </div>

        {/* slide number — bottom right */}
        <div className="pointer-events-none absolute bottom-5 right-7 text-sm font-semibold text-ink/35 tracking-[0.18em]">
          {String(slideNumber).padStart(2, "0")}
          <span className="opacity-50"> / {String(totalSlides).padStart(2, "0")}</span>
        </div>
      </div>
    );
  }
);
