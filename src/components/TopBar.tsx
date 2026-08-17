"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { caseStudies, navLinks } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";
const desktopLinkClass =
  "font-semibold text-xs uppercase leading-none tracking-[0.04em] text-white sm:text-sm";
const mobileLinkClass =
  "flex min-h-14 w-full items-center py-4 font-extrabold text-[32px] leading-10 tracking-[-0.8px] text-white";
const mobileProjectClass =
  "flex min-h-12 w-full items-center py-3 font-bold text-lg leading-7 tracking-[-0.18px] text-white/80";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    function onChange() {
      if (media.matches) setOpen(false);
    }
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const header = headerRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !header) return;

      const focusable = [
        ...header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ].filter((el) => !el.hasAttribute("inert") && el.tabIndex !== -1);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [open]);

  useEffect(() => {
    if (!headerRef.current || !barRef.current) return;
    const headerEl: HTMLElement = headerRef.current;
    const barEl: HTMLDivElement = barRef.current;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastY = Math.max(0, window.scrollY);
    let offset = 0;
    let ticking = false;
    let ignoreUntil = 0;

    function maxOffset() {
      return barEl.offsetHeight;
    }

    function apply(next: number) {
      offset = Math.min(maxOffset(), Math.max(0, next));
      headerEl.style.transform = offset ? `translateY(-${offset}px)` : "";
      headerEl.style.pointerEvents = "";
    }

    function reveal(holdMs = 0) {
      apply(0);
      lastY = Math.max(0, window.scrollY);
      if (holdMs > 0) ignoreUntil = performance.now() + holdMs;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        if (media.matches || openRef.current) {
          reveal();
          return;
        }

        const y = Math.max(0, window.scrollY);
        const delta = y - lastY;
        lastY = y;

        if (performance.now() < ignoreUntil || y < 8) {
          apply(0);
          return;
        }

        apply(offset + delta);
      });
    }

    reveal(400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      headerEl.style.transform = "";
      headerEl.style.pointerEvents = "";
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    if (!header) return;
    header.style.transform = "";
    header.style.pointerEvents = "";
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 left-0 z-50 w-full border-b border-white/10 bg-black/90 will-change-transform backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-[1140px]">
        <div
          ref={barRef}
          className="flex h-[72px] w-full items-center justify-between px-5 py-6 sm:h-[104px] sm:px-10 lg:px-20"
        >
          {pathname === "/" ? (
            <span
              aria-current="page"
              className="font-extrabold text-lg leading-none tracking-[-0.72px] text-white opacity-60 sm:text-[22px] sm:tracking-[-0.88px]"
            >
              AJ Marksberry
            </span>
          ) : (
            <Link
              href="/"
              className={`font-extrabold text-lg leading-none tracking-[-0.72px] text-white sm:text-[22px] sm:tracking-[-0.88px] ${fade}`}
            >
              AJ Marksberry
            </Link>
          )}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav
              className="hidden items-center gap-6 sm:flex"
              aria-label="Primary"
            >
              <DesktopNavItems pathname={pathname} />
            </nav>
            <button
              ref={buttonRef}
              type="button"
              className={`relative z-10 flex size-11 items-center justify-center text-white pointer-events-auto sm:hidden ${fade}`}
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="dialog"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 top-full z-40 w-full max-w-none grid sm:hidden ${
          open ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"
        } ${
          open
            ? "transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            : "transition-[grid-template-rows] duration-300 ease-in motion-reduce:transition-none"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            id={menuId}
            role="dialog"
            aria-modal={open}
            aria-label="Site menu"
            inert={!open || undefined}
            className="flex min-h-[calc(100svh-72px)] w-full flex-col overflow-y-auto border-t border-white/10 bg-black/90 px-5 pb-10 pt-2 backdrop-blur-md"
          >
            <div className="mx-auto w-full max-w-[1140px]">
              <MobileNavItems pathname={pathname} animate={open} />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function DesktopNavItems({ pathname }: { pathname: string }) {
  return (
    <>
      {navLinks.map((link) => {
        if (link.href === "/projects") {
          return (
            <DesktopCaseStudies key={link.href} pathname={pathname} />
          );
        }

        if (isCurrentPath(pathname, link.href)) {
          return (
            <span
              key={link.href}
              aria-current="page"
              className={`${desktopLinkClass} opacity-60`}
            >
              {link.label}
            </span>
          );
        }

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${desktopLinkClass} ${fade}`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}

function DesktopCaseStudies({ pathname }: { pathname: string }) {
  const currentSection =
    pathname === "/projects" || pathname.startsWith("/projects/");

  return (
    <div className="group relative">
      <Link
        href="/projects"
        aria-current={pathname === "/projects" ? "page" : undefined}
        className={`${desktopLinkClass} ${currentSection ? "opacity-60" : fade}`}
      >
        Case studies
      </Link>
      <ul className="invisible absolute right-0 top-full z-50 mt-3 min-w-[260px] rounded-lg border border-white/10 bg-black/90 p-2 opacity-0 shadow-lg backdrop-blur-md transition-[opacity,visibility] duration-200 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        {caseStudies.map((study) => {
          const current = pathname === study.href;
          return (
            <li key={study.href}>
              <Link
                href={study.href}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-md px-3 font-semibold text-sm leading-5 text-white ${
                  current ? "opacity-60" : fade
                }`}
              >
                {study.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MobileNavItems({
  pathname,
  animate,
}: {
  pathname: string;
  animate: boolean;
}) {
  let delay = 0;

  function itemDelay() {
    const current = delay;
    delay += 60;
    return animate ? `${current}ms` : undefined;
  }

  return (
    <ul className="flex w-full flex-col">
      {navLinks.map((link) => {
        const current = pathname === link.href;
        const delayMs = itemDelay();

        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={current ? "page" : undefined}
              className={`${mobileLinkClass} ${current ? "opacity-60" : fade} ${
                animate ? "menu-item-in" : ""
              }`}
              style={delayMs ? { animationDelay: delayMs } : undefined}
            >
              {link.label}
            </Link>
            {link.href === "/projects" ? (
              <ul className="flex flex-col pb-2" aria-label="Case studies">
                {caseStudies.map((study) => {
                  const studyCurrent = pathname === study.href;
                  const studyDelay = itemDelay();

                  return (
                    <li key={study.href}>
                      <Link
                        href={study.href}
                        aria-current={studyCurrent ? "page" : undefined}
                        className={`${mobileProjectClass} ${
                          studyCurrent ? "opacity-60" : fade
                        } ${animate ? "menu-item-in" : ""}`}
                        style={
                          studyDelay ? { animationDelay: studyDelay } : undefined
                        }
                      >
                        {study.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
