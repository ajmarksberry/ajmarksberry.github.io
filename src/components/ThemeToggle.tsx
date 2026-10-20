"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

/** The one place the choice is remembered; layout.tsx reads it before paint. */
const STORAGE_KEY = "theme";

/**
 * Reads the theme off <html> itself, so the toggle, the inline script in
 * layout.tsx, and any future caller can never disagree about which is active.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const isLight = () => document.documentElement.dataset.theme === "light";
const isLightOnServer = () => false;

/**
 * Light/dark switch for the whole site, fixed beside the back-to-top button.
 * Starts on DEFAULT_THEME (site.ts); the visitor's choice is remembered across
 * pages and visits. CaseStudyShell only renders it while SHOW_THEME_TOGGLE is on.
 */
export function ThemeToggle() {
  const light = useSyncExternalStore(subscribe, isLight, isLightOnServer);

  function toggle() {
    const next = light ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private window or blocked storage: the choice still holds for this page.
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label="Light mode"
      title={light ? "Switch to dark mode" : "Switch to light mode"}
      onClick={toggle}
      className={`fixed bottom-5 right-[76px] z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface/70 text-ink shadow-sm backdrop-blur-md sm:bottom-8 sm:right-[88px] ${fade}`}
    >
      {light ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
