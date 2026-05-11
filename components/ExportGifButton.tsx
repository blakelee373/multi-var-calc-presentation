"use client";

import { toCanvas } from "html-to-image";
import { useState, type RefObject } from "react";

type ExportGifButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  filename: string;
  duration?: number;
  width?: number;
  onPrepare?: () => Promise<void> | void;
};

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${label} timed out after ${ms}ms`)),
      ms
    );
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

function fingerprint(img: ImageData) {
  const d = img.data;
  let h = 0;
  for (let i = 0; i < d.length; i += 64) h = (h * 31 + d[i]) | 0;
  return h;
}

export function ExportGifButton({
  targetRef,
  filename,
  duration = 3500,
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
      const pixelRatio = width / rect.width;

      const workerOk = await fetch("/gif.worker.js", { method: "HEAD" })
        .then((r) => r.ok)
        .catch(() => false);
      if (!workerOk) {
        throw new Error("GIF worker missing at /gif.worker.js");
      }

      // ─── HYBRID CAPTURE STRATEGY ────────────────────────────────
      // toCanvas takes ~300ms per call which caps us at ~3 fps. The
      // slow path is SVG serialization + image decode of the entire
      // DOM. But the DOM is mostly STATIC during the capture window
      // — the only thing actually moving is the WebGL canvas (r3f
      // arrow growth, pulse sphere). So:
      //
      //   1. Take ONE expensive toCanvas snapshot as the "base"
      //      (captures all the text, SVG mountains, formulas, etc).
      //   2. Locate every live <canvas> inside the slide.
      //   3. Per frame: drawImage(base) + drawImage(each live canvas)
      //      at its measured position. That's a ~5ms operation, so
      //      we can run at 20-30 fps without timeouts.
      //
      // Cost: framer-motion 250ms text fade-ins don't animate in the
      // GIF — they're frozen at the post-entrance state. That's fine
      // because the recordable interesting motion is the 3D scene.
      // ────────────────────────────────────────────────────────────

      setProgress(5);
      const baseSnapshot = await withTimeout(
        toCanvas(node, {
          pixelRatio,
          cacheBust: false,
          backgroundColor: "#FFFFFF",
        }),
        8000,
        "base snapshot"
      );
      if (!baseSnapshot.width || !baseSnapshot.height) {
        throw new Error("base snapshot was 0×0 — try reopening the slide");
      }
      // Clean up the <style> nodes html-to-image leaks into <head>.
      document
        .querySelectorAll("style[data-html2canvas-internal]")
        .forEach((n) => n.remove());

      const baseRect = node.getBoundingClientRect();
      const liveCanvases = Array.from(
        node.querySelectorAll("canvas")
      ) as HTMLCanvasElement[];
      const overlays = liveCanvases.map((c) => {
        const r = c.getBoundingClientRect();
        return {
          canvas: c,
          dx: (r.left - baseRect.left) * pixelRatio,
          dy: (r.top - baseRect.top) * pixelRatio,
          dw: r.width * pixelRatio,
          dh: r.height * pixelRatio,
        };
      });

      // Compositing canvas — base + live overlays land here each frame.
      const frameCanvas = document.createElement("canvas");
      frameCanvas.width = width;
      frameCanvas.height = height;
      const fctx = frameCanvas.getContext("2d");
      if (!fctx) throw new Error("could not create compositing canvas");

      type Frame = { data: ImageData; delay: number };
      const frames: Frame[] = [];
      // Target ~20 fps over the capture window. Browser may not hit
      // exactly this rate but the loop's setTimeout target keeps it
      // close, and each frame's GIF delay reflects real elapsed time
      // so playback always matches reality.
      const TARGET_FPS = 20;
      const TARGET_INTERVAL = 1000 / TARGET_FPS;
      const totalFrames = Math.round((duration / 1000) * TARGET_FPS);

      const sessionStart = performance.now();
      let prevCaptureTime = sessionStart;

      for (let i = 0; i < totalFrames; i++) {
        const targetTime = sessionStart + i * TARGET_INTERVAL;
        const waitFor = targetTime - performance.now();
        if (waitFor > 0) {
          await new Promise<void>((r) => setTimeout(r, waitFor));
        }

        // Composite: base image → each live WebGL canvas at its slot.
        fctx.drawImage(baseSnapshot, 0, 0, width, height);
        for (const o of overlays) {
          try {
            fctx.drawImage(o.canvas, o.dx, o.dy, o.dw, o.dh);
          } catch {
            // A live canvas can be 0×0 mid-resize; just skip the overlay
            // for that frame rather than aborting the entire export.
          }
        }
        const imgData = fctx.getImageData(0, 0, width, height);

        const now = performance.now();
        const sinceLast = now - prevCaptureTime;
        prevCaptureTime = now;

        const delay =
          i === 0 ? 50 : Math.max(20, Math.min(Math.round(sinceLast), 200));
        frames.push({ data: imgData, delay });
        setProgress(5 + Math.round((i / totalFrames) * 55));
      }

      if (frames.length < 2) {
        throw new Error(
          `only ${frames.length} frame(s) captured — try reloading the slide`
        );
      }

      const prints = frames.map((f) => fingerprint(f.data));
      const allSame = prints.every((p) => p === prints[0]);
      if (allSame) {
        throw new Error(
          `captured ${frames.length} identical frames — the 3D canvas isn't animating. Try advancing to another slide and back.`
        );
      }
      console.log(
        `captured ${frames.length} frames, ${
          new Set(prints).size
        } distinct, in ${Math.round(performance.now() - sessionStart)}ms`
      );
      setProgress(60);

      const GIF = (await import("gif.js.optimized")).default;
      const gif = new GIF({
        workers: 2,
        quality: 15,
        workerScript: "/gif.worker.js",
        width,
        height,
        background: "#FFFFFF",
      });

      for (const f of frames) {
        gif.addFrame(f.data as unknown as CanvasRenderingContext2D, {
          delay: f.delay,
        });
      }

      gif.on("progress", (p: number) => {
        setProgress(60 + Math.round(p * 40));
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
