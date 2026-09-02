"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ReachLogo } from "@/components/ReachLogo";
import { TaapLogo } from "@/components/TaapLogo";
import { caseStudies } from "@/lib/site";

type Study = (typeof caseStudies)[number];
type Treatment = "banner" | "circles";

/**
 * The Circles treatment is built and working but not offered to visitors yet.
 * Flip this to true to show the Banner / Circles control; DEFAULT_TREATMENT is
 * what renders while it stays hidden. Same pattern as SHOW_ABOUT / SHOW_FOOTER.
 */
const SHOW_LAYOUT_TOGGLE = false;
const DEFAULT_TREATMENT: Treatment = "banner";

const treatments = [
  { value: "banner", label: "Banner" },
  { value: "circles", label: "Circles" },
] as const;

/**
 * Breaks out of BOTH the page padding and CaseStudyShell's max-w-[1140px], so a
 * card spans the viewport rather than the content column.
 */
const fullBleed = "ml-[calc(50%-50vw)] w-screen";

/** Stand-ins for the case studies that have no photograph of their own yet. */
const FALLBACK_BANNER = "/images/home/case-study-backdrop.webp";
const FALLBACK_CIRCLE = "/images/home/case-study-circle.webp";

/** How far a pointer travels before it counts as a drag rather than a tap. */
const DRAG_THRESHOLD = 8;

/**
 * Touch only. Stops a swipe that started on a card from being resolved as a tap
 * on its link — without that, scrolling a phone lands you inside a case study.
 *
 * The browser's own touch scrolling is left alone; it has momentum and
 * rubber-banding a JS handler would only degrade. All this does is watch how far
 * the finger moved and swallow the click if it was a swipe. Desktop is untouched:
 * a mouse scrolls with the wheel, so drag-to-scroll would only get in the way of
 * selecting and clicking.
 */
function useSwipeGuard<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let pointerId: number | null = null;
    let originY = 0;
    let dragging = false;
    let swallowClick = false;

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse") return;
      pointerId = event.pointerId;
      originY = event.clientY;
      dragging = false;
      // Clear it here, not in the click handler: a swipe that scrolls fires no
      // click at all, so a flag left armed would swallow the NEXT real tap.
      swallowClick = false;
    }

    function onPointerMove(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;
      if (dragging) return;
      if (Math.abs(event.clientY - originY) < DRAG_THRESHOLD) return;
      dragging = true;
      swallowClick = true;
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;
      pointerId = null;
      dragging = false;
    }

    function onClickCapture(event: MouseEvent) {
      if (!swallowClick) return;
      event.preventDefault();
      event.stopPropagation();
      swallowClick = false;
    }

    node.addEventListener("pointerdown", onPointerDown);
    node.addEventListener("pointermove", onPointerMove, { passive: true });
    node.addEventListener("pointerup", onPointerUp);
    node.addEventListener("pointercancel", onPointerUp);
    node.addEventListener("click", onClickCapture, true);

    return () => {
      node.removeEventListener("pointerdown", onPointerDown);
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerup", onPointerUp);
      node.removeEventListener("pointercancel", onPointerUp);
      node.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return ref;
}

/** Figma "Shadow xs" — keeps the copy legible over the photograph. */
const textShadow = "[text-shadow:0px_2px_8px_rgba(28,44,64,0.16)]";

/** Which brand lockup sits above each title. */
const logoFor: Record<string, "taap" | "reach"> = {
  "/projects/taap": "taap",
  "/projects/taap-itinerary": "taap",
  "/projects/reach-ai": "reach",
  "/projects/reach-booking": "reach",
};

/**
 * Figma 7821:4320, minus the product shot: the photograph now carries the whole
 * frame at 40% opacity and the copy sits in the right half.
 *
 * The design put the copy at x=720 w=620 in a 1440 frame with 100px gutters —
 * which is exactly the right half of the 1240 content box, so `ml-auto w-1/2`
 * reproduces it without hard-coding percentages. Below lg it goes full width.
 */
function CaseStudyBanner({
  study,
  current,
}: {
  study: Study;
  current: boolean;
}) {
  const brand = logoFor[study.href];

  return (
    <Link
      href={study.href}
      aria-current={current ? "page" : undefined}
      draggable={false}
      className={`group relative flex h-full w-full items-center touch-pan-y overflow-clip bg-panel-dark px-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:px-10 lg:px-[6.94%] ${current ? "opacity-60" : ""}`}
    >
      <span
        aria-hidden
        className="card-media absolute inset-0 will-change-transform"
      >
        <Image
          src={study.hero ?? FALLBACK_BANNER}
          alt=""
          draggable={false}
          fill
          className="object-cover opacity-40"
          style={{ objectPosition: "50% 30%" }}
          sizes="100vw"
          priority={study.href === caseStudies[0].href}
          unoptimized
        />
      </span>

      <div className="relative flex w-full min-w-0 flex-col gap-6 lg:ml-auto lg:w-1/2">
        <div className="card-rise flex flex-col gap-5">
          <p
            className={`font-extrabold text-xs uppercase leading-none text-white ${textShadow}`}
          >
            Case Study
          </p>
          {brand === "taap" ? <TaapLogo /> : <ReachLogo />}
        </div>

        <p
          className={`card-rise card-rise-2 font-semibold text-[32px] leading-10 tracking-[-0.8px] text-white sm:text-[40px] sm:leading-[50px] sm:tracking-[-1px] lg:text-[48px] lg:leading-[60px] lg:tracking-[-1.2px] ${textShadow}`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.title}
        </p>

        <p
          className={`card-rise card-rise-3 max-w-[620px] font-medium text-base leading-7 text-ink sm:text-lg ${textShadow}`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.description}
        </p>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-200 ease-out [box-shadow:inset_0_0_0_12px_var(--accent)] group-hover:opacity-100 motion-reduce:transition-none"
      />
    </Link>
  );
}

/**
 * One project as a circle. The forward/back behaviour is sibling-aware, so it
 * lives in globals.css as .circle-row / .circle-item rather than here.
 */
function CaseStudyCircle({
  study,
  current,
}: {
  study: Study;
  current: boolean;
}) {
  return (
    <Link
      href={study.href}
      aria-current={current ? "page" : undefined}
      className={`circle-item group relative flex flex-col items-center gap-4 outline-none ${current ? "opacity-60" : ""}`}
    >
      <span className="relative block aspect-square w-full overflow-clip rounded-full bg-panel-dark ring-1 ring-border group-focus-visible:ring-2 group-focus-visible:ring-accent">
        {/* The fallback is circle-cropped with transparent corners in Figma, so
         * it lines up with the container's own rounding. */}
        <Image
          src={study.hero ?? FALLBACK_CIRCLE}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 24vw, 44vw"
          unoptimized
        />
      </span>
      <p
        className="text-center font-semibold text-sm leading-6 text-ink sm:text-base"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {study.title}
      </p>
    </Link>
  );
}

export function CaseStudyShowcase() {
  const pathname = usePathname();
  const groupId = useId();
  const [treatment, setTreatment] = useState<Treatment>(DEFAULT_TREATMENT);
  const bannerListRef = useSwipeGuard<HTMLUListElement>();
  const listId = `${groupId}-list`;

  return (
    <section
      aria-labelledby={`${groupId}-heading`}
      className="flex w-full flex-col gap-8 pb-16 sm:gap-10 sm:pb-20"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-extrabold text-xs uppercase leading-none text-accent">
            Selected work
          </p>
          <h2
            id={`${groupId}-heading`}
            className="font-extrabold text-[28px] leading-9 tracking-[-0.7px] text-heading sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Case studies
          </h2>
        </div>

        {SHOW_LAYOUT_TOGGLE ? (
          <div
            role="group"
            aria-label="Case study layout"
            className="flex shrink-0 items-center gap-1 self-start border border-border p-1 sm:self-auto"
          >
            {treatments.map((option) => {
              const active = treatment === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  aria-controls={listId}
                  className={`flex h-9 items-center px-4 font-semibold text-xs uppercase tracking-[0.04em] transition-colors duration-200 ease-out motion-reduce:transition-none ${
                    active
                      ? "bg-surface text-heading"
                      : "text-muted hover:text-ink"
                  }`}
                  onClick={() => setTreatment(option.value)}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Cards sit one after another at full height — no overlap. The movement
       * comes from globals.css: the photograph parallaxes against the scroll and
       * the copy staggers in, both on scroll-driven timelines. */}
      {treatment === "banner" ? (
        <ul id={listId} ref={bannerListRef} className={fullBleed}>
          {caseStudies.map((study) => (
            <li key={study.href} className="h-[100svh] overflow-clip">
              <CaseStudyBanner
                study={study}
                current={pathname === study.href}
              />
            </li>
          ))}
        </ul>
      ) : (
        // 2x2 below lg — four circles across a phone would be thumbnails.
        <ul
          id={listId}
          className="circle-row grid grid-cols-2 gap-8 py-4 sm:gap-10 lg:grid-cols-4"
        >
          {caseStudies.map((study) => (
            <li key={study.href} className="w-full">
              <CaseStudyCircle
                study={study}
                current={pathname === study.href}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
