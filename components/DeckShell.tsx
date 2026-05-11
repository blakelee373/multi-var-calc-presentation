"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SlideFrame } from "./SlideFrame";
import { ExportButton } from "./ExportButton";
import { ExportGifButton } from "./ExportGifButton";
import { slides } from "@/app/slides";

export function DeckShell() {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [restartKey, setRestartKey] = useState(0);
  const [railOpen, setRailOpen] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: number) => {
      const bounded = Math.max(0, Math.min(total - 1, next));
      setIndex(bounded);
      const url = new URL(window.location.href);
      url.searchParams.set("slide", String(bounded + 1));
      window.history.replaceState(null, "", url.toString());
    },
    [total]
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    const param = Number(url.searchParams.get("slide"));
    if (Number.isFinite(param) && param >= 1 && param <= total) {
      setIndex(param - 1);
    }
  }, [total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") {
        go(0);
      } else if (e.key === "End") {
        go(total - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, go]);

  const Active = useMemo(() => slides[index].Component, [index]);
  const meta = slides[index];

  // Called before GIF capture starts. Forces the slide to remount via
  // flushSync so framer-motion entrance animations and r3f arrow growth
  // replay from t=0 during the capture window.
  const prepareForGif = useCallback(async () => {
    flushSync(() => setRestartKey((k) => k + 1));
    // Two rAFs then a small buffer so the new tree paints and r3f draws
    // at least one warm-up frame before the first capture lands.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );
    await new Promise<void>((resolve) => setTimeout(resolve, 80));
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center relative px-4 py-6">
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 z-20">
        <button
          type="button"
          onClick={() => setRailOpen((v) => !v)}
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-paper border border-slate-200 text-ink hover:bg-ink/5 transition"
        >
          {railOpen ? "Hide outline" : "Outline"}
        </button>
        <div className="flex items-center gap-2">
          <ExportGifButton
            targetRef={slideRef}
            filename={`slide-${String(index + 1).padStart(2, "0")}-${meta.slug}.gif`}
            onPrepare={prepareForGif}
          />
          <ExportButton
            targetRef={slideRef}
            filename={`slide-${String(index + 1).padStart(2, "0")}-${meta.slug}.png`}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${index}-${restartKey}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          <SlideFrame
            ref={slideRef}
            slideNumber={index + 1}
            totalSlides={total}
            sectionLabel={meta.section}
          >
            <Active />
          </SlideFrame>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="w-8 h-8 rounded-full bg-paper border border-slate-200 disabled:opacity-40 flex items-center justify-center text-ink hover:bg-ink/5"
        >
          ‹
        </button>
        <div className="w-48 h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-ink/60 transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
          className="w-8 h-8 rounded-full bg-paper border border-slate-200 disabled:opacity-40 flex items-center justify-center text-ink hover:bg-ink/5"
        >
          ›
        </button>
      </div>

      {railOpen && (
        <aside className="absolute top-16 left-4 bottom-16 w-64 bg-paper border border-slate-200 rounded-xl shadow-lg overflow-y-auto z-30">
          <ol className="p-2">
            {slides.map((s, i) => (
              <li key={s.slug}>
                <button
                  type="button"
                  onClick={() => {
                    go(i);
                    setRailOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                    i === index
                      ? "bg-ink/8 text-ink font-semibold"
                      : "hover:bg-ink/5 text-ink/80"
                  }`}
                >
                  <span className="inline-block w-6 text-xs opacity-60">
                    {i + 1}
                  </span>
                  {s.title}
                </button>
              </li>
            ))}
          </ol>
        </aside>
      )}
    </div>
  );
}
