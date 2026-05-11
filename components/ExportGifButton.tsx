"use client";

import { toPng } from "html-to-image";
import { useState, type RefObject } from "react";

type ExportGifButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  filename: string;
  duration?: number;
  fps?: number;
  width?: number;
  /** Called before capture starts. Use to remount the slide so
   * animations replay during recording. */
  onPrepare?: () => Promise<void> | void;
};

export function ExportGifButton({
  targetRef,
  filename,
  duration = 3500,
  fps = 12,
  width = 1280,
  onPrepare,
}: ExportGifButtonProps) {
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleExport() {
    if (busy) return;
    setBusy(true);
    setProgress(0);
    try {
      if (onPrepare) await onPrepare();
      const node = targetRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const height = Math.round(width * (rect.height / rect.width));
      const totalFrames = Math.max(2, Math.round((duration / 1000) * fps));
      const frameDelay = Math.round(1000 / fps);
      const pixelRatio = width / rect.width;

      const GIF = (await import("gif.js.optimized")).default;
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "/gif.worker.js",
        width,
        height,
        background: "#FFFFFF",
      });

      // Use a single offscreen canvas as the addFrame target, with
      // copy:true so gif.js takes a snapshot of pixels every frame
      // instead of holding a reference that could mutate later.
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) throw new Error("canvas 2d unavailable");

      const start = performance.now();
      for (let i = 0; i < totalFrames; i++) {
        const target = start + (i / (totalFrames - 1)) * duration;
        const wait = target - performance.now();
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));

        const dataUrl = await toPng(node, {
          pixelRatio,
          cacheBust: true,
          backgroundColor: "#FFFFFF",
        });
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const im = new Image();
          im.onload = () => resolve(im);
          im.onerror = reject;
          im.src = dataUrl;
        });
        octx.fillStyle = "#FFFFFF";
        octx.fillRect(0, 0, width, height);
        octx.drawImage(img, 0, 0, width, height);
        gif.addFrame(octx, { delay: frameDelay, copy: true });
        setProgress(Math.round(((i + 1) / totalFrames) * 70));
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
      title="Restarts the slide's animations and records ~3.5 seconds as a GIF. Insert into Google Slides via Insert › Image."
      className="px-3 py-1.5 rounded-md text-xs font-medium bg-paper border border-[#E5DCC4] text-ink hover:bg-ink/5 disabled:opacity-50 transition"
    >
      {busy ? `Recording GIF… ${progress}%` : "Download GIF"}
    </button>
  );
}
