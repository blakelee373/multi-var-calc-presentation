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
        className="relative bg-paper shadow-2xl rounded-xl overflow-hidden"
        style={{
          width: "min(96vw, calc(96vh * 16 / 9))",
          aspectRatio: "16 / 9",
        }}
      >
        <div className="absolute inset-0 px-16 py-12 flex flex-col">
          {children}
        </div>
        <div className="pointer-events-none absolute bottom-4 right-6 text-xs font-medium text-ink/50 tracking-wider">
          {slideNumber} / {totalSlides}
        </div>
      </div>
    );
  }
);
