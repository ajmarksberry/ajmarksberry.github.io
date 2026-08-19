"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const next = max <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / max));
      setProgress(next);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="pointer-events-none fixed top-0 left-0 z-[60] h-[4px] w-full origin-left bg-accent"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
