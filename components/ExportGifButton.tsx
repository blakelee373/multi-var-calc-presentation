"use client";

import { toCanvas } from "html-to-image";
import { useState, type RefObject } from "react";

type ExportGifButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  filename: string;
  duration?: number;
  fps?: number;
  width?: number;
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
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    if (busy) return;
    setBusy(true);
    setProgress(0);
    setError(null);
    try {
      if (onPrepare) await onPrepare();
      const node = targetRef.current;
      if (!node) throw new Error("slide not mounted — please try again");

      const rect = node.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) {
        throw new Error(
          `slide is too small (${rect.width}x${rect.height}) — open it in the deck first`
        );
      }
      const height = Math.round(width * (rect.height / rect.width));
      const totalFrames = Math.max(2, Math.round((duration / 1000) * fps));
      const frameDelay = Math.round(1000 / fps);
      const pixelRatio = width / rect.width;

      // Confirm the worker script is actually reachable before kicking off
      // gif.js — otherwise the error is silent inside the worker.
      const workerOk = await fetch("/gif.worker.js", { method: "HEAD" })
        .then((r) => r.ok)
        .catch(() => false);
      if (!workerOk) {
        throw new Error("GIF worker missing at /gif.worker.js");
      }

      const GIF = (await import("gif.js.optimized")).default;
      const gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: "/gif.worker.js",
        width,
        height,
        background: "#FFFFFF",
      });

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) throw new Error("could not create offscreen canvas");

      let capturedFrames = 0;
      const start = performance.now();
      for (let i = 0; i < totalFrames; i++) {
        const target = start + (i / (totalFrames - 1)) * duration;
        const wait = target - performance.now();
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));

        // toCanvas returns a real HTMLCanvasElement so we skip the
        // dataURL → Image decode round-trip that was failing on frame 2
        // when html-to-image embedded a WebGL canvas as a giant data URL.
        let snapshot: HTMLCanvasElement;
        try {
          snapshot = await toCanvas(node, {
            pixelRatio,
            cacheBust: false,
            backgroundColor: "#FFFFFF",
          });
        } catch (e) {
          console.warn(`frame ${i} snapshot failed, skipping`, e);
          continue;
        }
        if (!snapshot.width || !snapshot.height) {
          console.warn(
            `frame ${i} produced ${snapshot.width}x${snapshot.height} canvas, skipping`
          );
          continue;
        }
        octx.fillStyle = "#FFFFFF";
        octx.fillRect(0, 0, width, height);
        octx.drawImage(snapshot, 0, 0, width, height);
        gif.addFrame(octx, { delay: frameDelay, copy: true });
        capturedFrames++;
        setProgress(Math.round(((i + 1) / totalFrames) * 70));
      }
      if (capturedFrames === 0) {
        throw new Error(
          "no frames captured — try refreshing the page or check the console"
        );
      }

      gif.on("progress", (p: number) => {
        setProgress(70 + Math.round(p * 30));
      });

      await new Promise<void>((resolve, reject) => {
        gif.on("finished", (blob: Blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.download = filename;
          link.href = url;
          link.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          resolve();
        });
        gif.on("abort", () => reject(new Error("gif render aborted")));
        try {
          gif.render();
        } catch (e) {
          reject(e instanceof Error ? e : new Error(String(e)));
        }
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("GIF export failed:", e);
      setError(msg);
    } finally {
      setBusy(false);
      setProgress(0);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleExport}
        disabled={busy}
        title="Restarts the slide's animations and records ~3.5 seconds as a GIF. Insert into Google Slides via Insert › Image."
        className="px-3 py-1.5 rounded-md text-xs font-medium bg-paper border border-[#E5DCC4] text-ink hover:bg-ink/5 disabled:opacity-50 transition"
      >
        {busy ? `Recording GIF… ${progress}%` : "Download GIF"}
      </button>
      {error ? (
        <p className="text-[11px] text-red-600 max-w-[260px] text-right bg-paper px-2 py-1 rounded border border-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
