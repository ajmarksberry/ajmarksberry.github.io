"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CaseStudyPreviewRow } from "@/components/CaseStudyPreviewRow";
import { ContactLinks } from "@/components/ContactLinks";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { SectionHeader } from "@/components/SectionHeader";
import { caseStudies, navLinks } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";
/** Shared nav link treatment, so the two navs cannot drift apart. */
const navLinkBase =
  "whitespace-nowrap font-semibold uppercase leading-none tracking-[0.04em] text-chrome-fg";
const desktopLinkClass = `${navLinkBase} text-xs sm:text-sm`;
/** The selected page link is dimmed. Its line is the sliding indicator below
 * the nav, which the Case studies trigger never gets: it is not a page. */
const selectedLinkClass = "opacity-60";
/** The hamburger menu's page links: bigger and heavier than the desktop nav's,
 * since they are the main way around on a phone. */
const menuLinkClass =
  "whitespace-nowrap text-[28px] font-extrabold leading-none tracking-[-0.5px] text-chrome-fg";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

/** What the dropdown holds: the case studies, or the Contact content. */
type Panel = "work" | "contact";

export function TopBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>("work");
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const workButtonRef = useRef<HTMLButtonElement>(null);
  const contactButtonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /** One dropdown, two contents: a trigger opens it on its own content, closes it
   * if its content is already showing, and swaps the content if the other
   * trigger's is. */
  function toggle(next: Panel) {
    if (open && panel === next) {
      setOpen(false);
      return;
    }
    setPanel(next);
    setOpen(true);
  }

  // The line under the selected page link. It is moved by hand rather than
  // rendered under each link so that it can slide from the old link to the new
  // one when the page changes; the first placement is not animated.
  const activeHref = navLinks.find(
    (link) => link.href !== "/projects" && isCurrentPath(pathname, link.href),
  )?.href;

  useEffect(() => {
    const nav = navRef.current;
    const line = indicatorRef.current;
    if (!nav || !line) return;

    function place() {
      const target = activeHref ? linkRefs.current[activeHref] : null;
      if (!line) return;
      if (!target) {
        line.style.opacity = "0";
        return;
      }
      line.style.opacity = "0.6";
      line.style.width = `${target.offsetWidth}px`;
      line.style.top = `${target.offsetTop + target.offsetHeight + 10}px`;
      line.style.transform = `translateX(${target.offsetLeft}px)`;
    }

    place();
    const frame = window.requestAnimationFrame(() => {
      line.dataset.ready = "true";
    });
    // The nav is display:none below sm and its width shifts as the font loads.
    // Re-place without sliding: a resize is not a page change.
    const observer = new ResizeObserver(() => {
      line.dataset.ready = "false";
      place();
      void line.offsetWidth;
      line.dataset.ready = "true";
    });
    observer.observe(nav);
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [activeHref]);

  useEffect(() => {
    if (!open) return;

    const header = headerRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    const dialog = header?.querySelector<HTMLElement>(
      'nav[role="dialog"]:not([inert])',
    );
    const firstLink = dialog?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        (
          (panel === "contact" ? contactButtonRef : workButtonRef).current ??
          menuButtonRef.current
        )?.focus();
        return;
      }

      if (event.key !== "Tab" || !header) return;

      const focusable = [
        ...header.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
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
  }, [open, panel]);

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
      className="sticky top-0 left-0 z-50 w-full border-b border-chrome-line bg-chrome will-change-transform backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-[1140px]">
        <div
          ref={barRef}
          className="flex h-[72px] w-full items-center justify-between px-5 py-6 sm:h-[104px] sm:px-10 lg:px-20"
        >
          {pathname === "/" ? (
            <span
              aria-current="page"
              className="shrink-0 whitespace-nowrap font-bold text-lg leading-none tracking-[-0.72px] text-chrome-fg opacity-60 sm:text-[22px] sm:tracking-[-0.88px]"
            >
              AJ Marksberry
            </span>
          ) : (
            <Link
              href="/"
              className={`shrink-0 whitespace-nowrap font-bold text-lg leading-none tracking-[-0.72px] text-chrome-fg sm:text-[22px] sm:tracking-[-0.88px] ${fade}`}
            >
              AJ Marksberry
            </Link>
          )}
          <div className="flex items-center gap-3 sm:gap-6">
            <nav
              ref={navRef}
              className="relative hidden items-center gap-6 md:flex"
              aria-label="Primary"
            >
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute left-0 h-0.5 w-0 bg-chrome-fg opacity-0 data-[ready=true]:transition-[transform,width,opacity] data-[ready=true]:duration-300 data-[ready=true]:ease-out motion-reduce:transition-none"
              />
              {navLinks.map((link) => {
                if (link.href === "/projects") {
                  return (
                    <button
                      key={link.href}
                      ref={workButtonRef}
                      type="button"
                      aria-expanded={open && panel === "work"}
                      aria-controls={menuId}
                      aria-haspopup="dialog"
                      className={`${desktopLinkClass} ${(open && panel === "work") || isCurrentPath(pathname, link.href) ? "opacity-60" : fade}`}
                      onClick={() => toggle("work")}
                    >
                      {link.label}
                    </button>
                  );
                }

                if (isCurrentPath(pathname, link.href)) {
                  return (
                    <span
                      key={link.href}
                      ref={(el) => {
                        linkRefs.current[link.href] = el;
                      }}
                      aria-current="page"
                      className={`${desktopLinkClass} ${selectedLinkClass}`}
                    >
                      {link.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    ref={(el) => {
                      linkRefs.current[link.href] = el;
                    }}
                    href={link.href}
                    className={`${desktopLinkClass} ${fade}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {/* Last in the nav. Like Case studies it opens the dropdown rather
               * than going to a page, so it never gets the current-page line. */}
              <button
                ref={contactButtonRef}
                type="button"
                aria-expanded={open && panel === "contact"}
                aria-controls={menuId}
                aria-haspopup="dialog"
                className={`${desktopLinkClass} ${open && panel === "contact" ? "opacity-60" : fade}`}
                onClick={() => toggle("contact")}
              >
                Contact
              </button>
            </nav>
            <button
              ref={menuButtonRef}
              type="button"
              className={`relative z-10 flex size-11 items-center justify-center text-chrome-fg pointer-events-auto md:hidden ${fade}`}
              aria-expanded={open}
              aria-controls={menuId}
              aria-haspopup="dialog"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => (open ? setOpen(false) : toggle("work"))}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <WorkIndexPanel
        id={menuId}
        open={open}
        panel={panel}
        onPanel={setPanel}
        pathname={pathname}
      />
    </header>
  );
}

function WorkIndexPanel({
  id,
  open,
  panel,
  onPanel,
  pathname,
}: {
  id: string;
  open: boolean;
  panel: Panel;
  onPanel: (panel: Panel) => void;
  pathname: string;
}) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-40 grid w-full max-w-none ${
        open ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"
      } ${
        open
          ? "transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
          : "transition-[grid-template-rows] duration-200 ease-in motion-reduce:transition-none"
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <nav
          id={id}
          role="dialog"
          aria-modal={open}
          aria-label={panel === "contact" ? "Contact" : "Case studies"}
          inert={!open || undefined}
          className="flex min-h-[calc(100svh-72px)] w-full flex-col overflow-y-auto border-t border-chrome-line bg-chrome-solid px-5 pb-10 pt-4 sm:min-h-[calc(100svh-104px)] sm:px-10 sm:pb-16 sm:pt-6 lg:px-20"
        >
          {panel === "contact" ? (
            <div className="mx-auto flex w-full max-w-[1140px] flex-col items-start gap-10 pt-4 sm:pt-6">
              {/* On a phone the menu is where you came from: offer the way back. */}
              <button
                type="button"
                className={`${navLinkBase} text-sm md:hidden ${fade}`}
                onClick={() => onPanel("work")}
              >
                ← Menu
              </button>
              <SectionHeader title="Let’s work together" />
              <ContactLinks />
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-[1140px] flex-col">
              <div className="mb-4 flex flex-col items-start md:hidden">
                {[
                  // Home leads; on desktop the logo is the way back.
                  { href: "/", label: "Home" },
                  ...navLinks
                    // Every other nav item. Case studies is the dropdown itself: the
                    // list below it is what that link opens on desktop.
                    .filter((link) => link.href !== "/projects"),
                ].map((link) => {
                  const current = isCurrentPath(pathname, link.href);
                  // The desktop nav's own link treatment, so the two read as one
                  // control: same type, dimmed with a line under it when it is
                  // the current page, a plain fading link otherwise.
                  const button = `${menuLinkClass} inline-block py-4`;
                  return current ? (
                    <span
                      key={link.href}
                      aria-current="page"
                      className={`${button} ${selectedLinkClass} underline decoration-[3px] underline-offset-[10px]`}
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`${button} ${fade}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                {/* Contact is a dropdown on desktop; on a phone it swaps this menu
                 * for the same content. */}
                <button
                  type="button"
                  className={`${menuLinkClass} inline-block py-4 ${fade}`}
                  onClick={() => onPanel("contact")}
                >
                  Contact
                </button>
              </div>
              <ul className="flex flex-col">
                {caseStudies.map((study) => (
                  <li key={study.href}>
                    <CaseStudyPreviewRow
                      study={study}
                      current={isCurrentPath(pathname, study.href)}
                      compact
                      dividerClassName="border-chrome-line"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
