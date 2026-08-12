import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function TopBar() {
  return (
    <header className="flex h-[72px] w-full items-center justify-between border-b border-border bg-surface px-5 py-6 sm:h-[104px] sm:px-10 lg:px-20">
      <Link
        href="/"
        className="font-extrabold text-lg leading-none tracking-[-0.72px] text-ink sm:text-[22px] sm:tracking-[-0.88px]"
      >
        AJ Marksberry
      </Link>
      <nav className="flex items-center gap-3 sm:gap-6" aria-label="Primary">
        <Link
          href="/projects"
          className="font-semibold text-xs leading-none text-ink sm:text-sm"
        >
          PROJECTS
        </Link>
        <Link
          href="/profile"
          className="font-semibold text-xs leading-none text-ink sm:text-sm"
        >
          PROFILE
        </Link>
        <ThemeToggle />
        <Link
          href="/resume"
          className="flex items-center justify-center rounded-full bg-ink px-3 py-2 font-semibold text-xs leading-none text-background sm:px-4 sm:py-2.5 sm:text-sm"
        >
          RESUME
        </Link>
      </nav>
    </header>
  );
}
