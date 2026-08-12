"use client";

import { useEffect, useState } from "react";

type FontVersion = "inter" | "serif";

const STORAGE_KEY = "portfolio-font-version";

function applyFontVersion(version: FontVersion) {
  document.documentElement.classList.toggle(
    "font-version-serif",
    version === "serif",
  );
}

export function FontVersionToggle() {
  const [version, setVersion] = useState<FontVersion>("inter");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const next: FontVersion = stored === "serif" ? "serif" : "inter";
    setVersion(next);
    applyFontVersion(next);
    setReady(true);
  }, []);

  function selectVersion(next: FontVersion) {
    setVersion(next);
    applyFontVersion(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  if (!ready) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:p-5">
      <div
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/95 p-1 shadow-[0px_8px_24px_-4px_rgba(28,44,64,0.18)] backdrop-blur-md"
        role="group"
        aria-label="Typography version"
      >
        <button
          type="button"
          onClick={() => selectVersion("inter")}
          aria-pressed={version === "inter"}
          className={`rounded-full px-4 py-2.5 text-xs font-semibold leading-none transition-colors ${
            version === "inter"
              ? "bg-ink text-background"
              : "text-ink/70 hover:text-ink"
          }`}
        >
          Inter
        </button>
        <button
          type="button"
          onClick={() => selectVersion("serif")}
          aria-pressed={version === "serif"}
          className={`rounded-full px-4 py-2.5 text-xs font-semibold leading-none transition-colors ${
            version === "serif"
              ? "bg-ink text-background"
              : "text-ink/70 hover:text-ink"
          }`}
        >
          Serif
        </button>
      </div>
    </div>
  );
}
