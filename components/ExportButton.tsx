"use client";

import { toPng } from "html-to-image";
import { useState, type RefObject } from "react";

type ExportButtonProps = {
  targetRef: RefObject<HTMLElement | null>;
  filename: string;
};

export function ExportButton({ targetRef, filename }: ExportButtonProps) {
  const [busy, setBusy] = useState(false);

  async function handleExport() {
    if (!targetRef.current || busy) return;
    setBusy(true);
    try {
      const node = targetRef.current;
      const rect = node.getBoundingClientRect();
      const scale = 1920 / rect.width;
      const dataUrl = await toPng(node, {
        pixelRatio: scale,
        cacheBust: true,
        backgroundColor: "#FFFFFF",
      });
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={busy}
      className="px-3 py-1.5 rounded-md text-xs font-medium bg-ink text-paper hover:bg-ink/90 disabled:opacity-50 transition"
    >
      {busy ? "Exporting…" : "Download PNG"}
    </button>
  );
}
