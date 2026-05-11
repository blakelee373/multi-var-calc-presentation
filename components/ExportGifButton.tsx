"use client";

import { toPng } from "html-to-image";
import { useState, type RefObject } from "react";

type ExportGifButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  filename: string;
  // Total duration in ms
  duration?: number;
  // Frames per second
  fps?: number;
  // Output width (height inferred from aspect ratio of the source node)
  width?: number;
};

export function ExportGifButton({
  targetRef,
  filename,
  duration = 3000,
  fps = 12,
  width = 1280,
}: ExportGifButtonProps) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleExport() {
    if (!targetRef.current || busy) return;
    setBusy(true);
    setProgress(0);
    try {
      const node = targetRef.current;
      const rect = node.getBoundingClientRect();
      const height = Math.round(width * (rect.height / rect.width));
      const totalFrames = Math.max(2, Math.round((duration / 1000) * fps));
      const frameDelay = Math.round(1000 / fps);
      const pixelRatio = width / rect.width;

      // Dynamic import so SSR is happy
      const GIF = (await import("gif.js.optimized")).default;
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "/gif.worker.js",
        width,
        height,
        background: "#FFFFFF",
      });

      // Capture frames over the duration in real time so looping
      // animations show actual motion in the GIF.
      const start = performance.now();
      for (let i = 0; i < totalFrames; i++) {
        const target = start + (i / (totalFrames - 1)) * duration;
        const wait = target - performance.now();
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));

        const dataUrl = await toPng(node, {
          pixelRatio,
          cacheBust: false,
          backgroundColor: "#FFFFFF",
        });
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = reject;
          im.src = dataUrl;
        });
        gif.addFrame(img, { delay: frameDelay });
        setProgress(Math.round(((i + 1) / totalFrames) * 70)); // capture is 70%
      }

      gif.on("progress", (p: number) => {
        setProgress(70 + Math.round(p * 30));
      });

      await new Promise<void>((resolve) => {
        gif.on("finished", (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = filename;
          link.href = url;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          resolve();
        });
        gif.render();
      });
    } finally {
      setBusy(false);
      setProgress(0);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={busy}
      title="Captures ~3 seconds of the slide at 12fps and saves as a single GIF. Insert it into Google Slides via Insert › Image."
      className="px-3 py-1.5 rounded-md text-xs font-medium bg-paper border border-[#E5DCC4] text-ink hover:bg-ink/5 disabled:opacity-50 transition"
    >
      {busy ? `Recording GIF… ${progress}%` : "Download GIF"}
    </button>
  );
}
