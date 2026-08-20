"use client";

import { usePathname } from "next/navigation";
import { ArrowUpIcon } from "@/components/Icons";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

export function BackToTop() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface/70 text-ink shadow-sm backdrop-blur-md sm:bottom-8 sm:right-8 ${fade}`}
    >
      <ArrowUpIcon />
    </a>
  );
}
