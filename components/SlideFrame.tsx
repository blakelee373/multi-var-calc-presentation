"use client";

import { forwardRef, type ReactNode } from "react";

type SlideFrameProps = {
  slideNumber: number;
  totalSlides: number;
  sectionLabel?: string;
  children: ReactNode;
};

export const SlideFrame = forwardRef<HTMLDivElement, SlideFrameProps>(
  function SlideFrame({ slideNumber, children }, ref) {
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
        <div className="absolute inset-0 px-16 pt-14 pb-14 flex flex-col">
          {children}
        </div>
      </div>
    );
  }
);
