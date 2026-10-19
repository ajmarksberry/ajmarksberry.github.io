"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

/**
 * Light/dark switch for a single page. The site is dark; rendering this on a
 * page lets the visitor try the light theme there. It sets data-theme on <html>
 * (the tokens live in globals.css) and clears it again on leaving the page, so
 * the choice never leaks onto the rest of the site. It always starts dark.
 *
 * Sits beside the back-to-top button, in the same corner.
 */
export function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.dataset.theme = "light";
    } else {
      delete root.dataset.theme;
    }
    return () => {
      delete root.dataset.theme;
    };
  }, [light]);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light mode"
      title={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={() => setLight((current) => !current)}
      className={`fixed bottom-5 right-[76px] z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface/70 text-ink shadow-sm backdrop-blur-md sm:bottom-8 sm:right-[88px] ${fade}`}
    >
      {light ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
