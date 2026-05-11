"use client";

import { forwardRef, type ReactNode } from "react";

type SlideFrameProps = {
  slideNumber: number;
  totalSlides: number;
  sectionLabel?: string;
  children: ReactNode;
};

export const SlideFrame = forwardRef<HTMLDivElement, SlideFrameProps>(
  function SlideFrame(
    { slideNumber, totalSlides, sectionLabel, children },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-slide-id={slideNumber}
        className="relative overflow-hidden bg-paper"
        style={{
          width: "min(96vw, calc(94vh * 16 / 9))",
          aspectRatio: "16 / 9",
          boxShadow:
            "0 24px 60px -25px rgba(15, 23, 42, 0.32), 0 6px 18px -12px rgba(15, 23, 42, 0.18)",
          border: "1px solid #E2D9C2",
        }}
      >
        <div className="absolute inset-0 px-16 pt-12 pb-12 flex flex-col">
          {children}
        </div>

        {/* footer rule */}
        <div className="absolute bottom-0 left-16 right-16 h-px bg-[#E2D9C2]" />

        {/* footer text */}
        <div className="absolute bottom-3 left-16 right-16 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ink/45 font-semibold">
          <span>Multivariable Calculus · The Gradient</span>
          {sectionLabel ? (
            <span className="text-ink/55">{sectionLabel}</span>
          ) : null}
          <span>
            {String(slideNumber).padStart(2, "0")} ·{" "}
            <span className="opacity-50">{String(totalSlides).padStart(2, "0")}</span>
          </span>
        </div>
      </div>
    );
  }
);
