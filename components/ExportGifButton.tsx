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

      const GIF = (await import("gif.js.optimized")).default;
      const gif = new GIF({
        // More workers = parallel encoding = faster final assembly.
        workers: 4,
        // Higher number = lower quality but much faster encoding. 20 is
        // a good balance for slide animations (mostly flat colors).
        quality: 20,
        workerScript: "/gif.worker.js",
        width,
        height,
        background: "#FFFFFF",
        // dither: false would be faster but the gif.js typedef doesn't
        // accept it via TS without a cast — default is fine here.
      });

      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const octx = off.getContext("2d");
      if (!octx) throw new Error("could not create offscreen canvas");

      // Capture as fast as the browser can paint and toCanvas can serialize.
      // For each frame, record REAL elapsed wall-time since the previous
      // frame and pass it to gif.addFrame as the GIF delay. This keeps
      // playback at the same speed as the live animation — the prior
      // fixed-83ms-delay approach made GIFs play ~3-4× too fast because
      // toCanvas alone takes ~300ms per frame on a slide with WebGL.
      let capturedFrames = 0;
      const sessionStart = performance.now();
      let prevCaptureTime = sessionStart;
      // Soft cap: never more than this many frames even if duration drifts.
      // 30 frames × ~250ms = ~7.5s worst-case capture window.
      const MAX_FRAMES = 30;

      while (capturedFrames < MAX_FRAMES) {
        let snapshot: HTMLCanvasElement;
        try {
          snapshot = await toCanvas(node, {
            pixelRatio,
            cacheBust: false,
            backgroundColor: "#FFFFFF",
          });
        } catch (e) {
          console.warn(`frame ${capturedFrames} snapshot failed, skipping`, e);
          continue;
        }
        if (!snapshot.width || !snapshot.height) {
          console.warn(
            `frame ${capturedFrames} produced ${snapshot.width}x${snapshot.height} canvas, skipping`
          );
          continue;
        }

        const now = performance.now();
        const sinceLast = now - prevCaptureTime;
        prevCaptureTime = now;

        octx.fillStyle = "#FFFFFF";
        octx.fillRect(0, 0, width, height);
        octx.drawImage(snapshot, 0, 0, width, height);
        // First frame's delay = small (it's the entry frame). Subsequent
        // frames use the real elapsed time since the previous capture,
        // clamped so a slow first frame doesn't turn into a long pause.
        const delay =
          capturedFrames === 0 ? 60 : Math.max(40, Math.min(sinceLast, 400));
        gif.addFrame(octx, { delay, copy: true });
        capturedFrames++;
        const elapsed = now - sessionStart;
        setProgress(Math.round((elapsed / duration) * 60));
        if (elapsed >= duration) break;
      }
      if (capturedFrames === 0) {
        throw new Error(
          "no frames captured — try refreshing the page or check the console"
        );
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
