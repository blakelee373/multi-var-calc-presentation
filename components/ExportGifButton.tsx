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

// Wait up to `ms` for `p` to settle. If it doesn't, reject so the
// caller can decide whether to retry or abort. Without this guard,
// html-to-image can hang silently when it races a WebGL repaint and
// the export loop appears "stuck at 3%".
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

// Wait for real wall-time to pass via setTimeout, with rAF before + after
// so the browser actually paints. A single rAF resolves BEFORE paint, so
// using only rAF lets r3f / framer-motion fall behind — the symptom is
// a GIF where every frame is pixel-identical because the WebGL canvas
// backbuffer never refreshed between captures.
const waitForPaint = (ms: number) =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      setTimeout(() => {
        requestAnimationFrame(() => resolve());
      }, ms);
    });
  });

// Quick fingerprint of frame pixels so we can detect "all frames
// identical" without expensive full comparison. Samples every 64th
// byte from the Uint8ClampedArray and sums them.
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
  width = 960,
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

      // Phase 1: capture frames into ImageData buffers.
      //
      // We CANNOT call gif.addFrame inside the capture loop — gif.js
      // workers start encoding immediately and compete with toCanvas
      // for main-thread time, which is what was causing the "stuck at
      // 3%" hang. Decoupling capture from encoding fixes this and
      // also lets us yield to the browser via rAF between frames so
      // framer-motion / r3f animations have time to advance.
      const captureCanvas = document.createElement("canvas");
      captureCanvas.width = width;
      captureCanvas.height = height;
      const cctx = captureCanvas.getContext("2d");
      if (!cctx) throw new Error("could not create capture canvas");

      type Frame = { data: ImageData; delay: number };
      const frames: Frame[] = [];
      const MAX_FRAMES = 24;
      const sessionStart = performance.now();
      let prevCaptureTime = sessionStart;

      while (frames.length < MAX_FRAMES) {
        // Per-frame timeout — 2s is generous; toCanvas of a slide is
        // typically 100-300ms. If we exceed this, something's wrong
        // (lost WebGL context, etc) and we should surface it instead
        // of looping silently.
        let snapshot: HTMLCanvasElement;
        try {
          snapshot = await withTimeout(
            toCanvas(node, {
              pixelRatio,
              // cacheBust true forces fresh resource fetches and
              // bypasses html-to-image's internal cache between calls.
              cacheBust: true,
              backgroundColor: "#FFFFFF",
            }),
            2500,
            `frame ${frames.length} capture`
          );
        } catch (e) {
          if (frames.length === 0) throw e;
          console.warn("frame capture failed mid-loop, stopping early", e);
          break;
        }
        if (!snapshot.width || !snapshot.height) {
          if (frames.length === 0) {
            throw new Error("first frame produced 0×0 canvas");
          }
          break;
        }

        const now = performance.now();
        const sinceLast = now - prevCaptureTime;
        prevCaptureTime = now;

        cctx.fillStyle = "#FFFFFF";
        cctx.fillRect(0, 0, width, height);
        cctx.drawImage(snapshot, 0, 0, width, height);
        const imgData = cctx.getImageData(0, 0, width, height);

        const delay =
          frames.length === 0
            ? 80
            : Math.max(40, Math.min(Math.round(sinceLast), 400));
        frames.push({ data: imgData, delay });

        const elapsed = now - sessionStart;
        setProgress(Math.round((elapsed / duration) * 50));
        if (elapsed >= duration) break;

        // Wait for the browser to actually paint at least one frame so
        // r3f / framer-motion advance pixels before the next capture.
        // 120ms ≈ 7 paint frames at 60fps — plenty for r3f to redraw.
        await waitForPaint(120);
      }

      if (frames.length < 2) {
        throw new Error(
          `only ${frames.length} frame(s) captured — animations may not be running. Try reloading the slide.`
        );
      }

      // Sanity check: if every captured frame fingerprints identically,
      // the animations didn't advance during capture and the resulting
      // GIF would be a static loop. Surface this loudly instead of
      // shipping a broken file.
      const prints = frames.map((f) => fingerprint(f.data));
      const allSame = prints.every((p) => p === prints[0]);
      if (allSame) {
        throw new Error(
          `captured ${frames.length} identical frames — animations did not advance. Check that the slide has motion (try slide 5, 7, or 9).`
        );
      }
      console.log("GIF capture fingerprints:", prints);
      setProgress(50);

      // Phase 2: hand all captured frames to gif.js at once, then render.
      const GIF = (await import("gif.js.optimized")).default;
      const gif = new GIF({
        workers: 2,
        quality: 20,
        workerScript: "/gif.worker.js",
        width,
        height,
        background: "#FFFFFF",
      });

      // gif.js.optimized accepts ImageData directly — no need to keep
      // a live canvas around, which is what was making `copy: true`
      // expensive in the previous version.
      for (const f of frames) {
        // Cast: the optimized fork's types omit ImageData but the JS
        // accepts it. Same path used by react-native-gif-encoder etc.
        gif.addFrame(f.data as unknown as CanvasRenderingContext2D, {
          delay: f.delay,
        });
      }

      gif.on("progress", (p: number) => {
        setProgress(50 + Math.round(p * 50));
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
