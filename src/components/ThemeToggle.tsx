"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/Icons";
import {
  applyTheme,
  getPreferredTheme,
  setTheme,
  type Theme,
} from "@/lib/theme";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useEffect(() => {
    const initial = getPreferredTheme();
    applyTheme(initial);
    setThemeState(initial);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  }

  const ready = theme !== null;
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={ready ? isDark : undefined}
      disabled={!ready}
      className={`relative z-10 flex size-11 items-center justify-center text-white ${fade} ${className}`}
      onClick={toggle}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
