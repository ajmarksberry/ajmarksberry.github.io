"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/Icons";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

/** Far enough down that the control is useful rather than noise. */
const REVEAL_AT = 320;

export function BackToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // rAF-throttled: scroll fires far more often than the state needs to change.
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setShown(window.scrollY > REVEAL_AT);
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      // Hidden from pointer and keyboard alike while it is out of view, so it
      // cannot be tabbed to invisibly.
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
      className={`fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface/70 text-ink shadow-sm backdrop-blur-md transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:bottom-8 sm:right-8 ${fade} ${
        shown
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUpIcon />
    </a>
  );
}
