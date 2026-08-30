"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/Icons";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

/** Far enough down that the control is useful rather than noise. */
const REVEAL_AT = 320;

/** Long pages should not take proportionally longer to fly back up. */
const MIN_DURATION = 420;
const MAX_DURATION = 900;

/** Ease-out cubic: leaves quickly, settles gently. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

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

  function scrollToTop(event: React.MouseEvent<HTMLAnchorElement>) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = window.scrollY;
    if (reduced || start === 0) return; // let the anchor jump

    event.preventDefault();

    // html has scroll-behavior: smooth, which would fight a per-frame scroll and
    // impose its own ease-in-out. Suspend it for the duration of the animation.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const duration = Math.min(
      MAX_DURATION,
      Math.max(MIN_DURATION, start * 0.45),
    );
    const startedAt = performance.now();
    let raf = 0;

    function finish() {
      window.cancelAnimationFrame(raf);
      root.style.scrollBehavior = previousBehavior;
      window.removeEventListener("wheel", finish);
      window.removeEventListener("touchstart", finish);
      window.removeEventListener("keydown", finish);
    }

    function step(now: number) {
      const t = Math.min(1, (now - startedAt) / duration);
      window.scrollTo(0, Math.round(start * (1 - easeOut(t))));
      if (t < 1) {
        raf = window.requestAnimationFrame(step);
        return;
      }
      finish();
    }

    // Any deliberate input hands control straight back to the reader.
    window.addEventListener("wheel", finish, { passive: true, once: true });
    window.addEventListener("touchstart", finish, { passive: true, once: true });
    window.addEventListener("keydown", finish, { once: true });

    raf = window.requestAnimationFrame(step);
  }

  return (
    <a
      href="#top"
      aria-label="Back to top"
      onClick={scrollToTop}
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
