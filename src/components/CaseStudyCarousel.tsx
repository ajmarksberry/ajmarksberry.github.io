"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/Icons";
import { caseStudies } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-80";
const pagerClass =
  "flex size-11 items-center justify-center rounded-full border border-border text-ink transition-[opacity,background-color] duration-200 ease-out hover:bg-surface-muted disabled:pointer-events-none disabled:opacity-30";

/** Left edge of the track's content box, where a snapped slide comes to rest. */
function contentEdge(track: HTMLElement) {
  const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
  return track.getBoundingClientRect().left + padLeft;
}

export function CaseStudyCarousel() {
  const pathname = usePathname();
  const groupId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const perViewRef = useRef(1);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;

    const slides = Array.from(track.children) as HTMLElement[];
    if (slides.length === 0) return;

    const edge = contentEdge(track);
    const step =
      slides.length > 1
        ? slides[1].getBoundingClientRect().left -
          slides[0].getBoundingClientRect().left
        : slides[0].getBoundingClientRect().width;
    const perView = Math.max(1, Math.round(track.clientWidth / step));
    const total = Math.max(1, Math.ceil(slides.length / perView));

    let current = total - 1;
    if (track.scrollLeft < track.scrollWidth - track.clientWidth - 1) {
      let nearest = 0;
      let best = Number.POSITIVE_INFINITY;
      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - edge);
        if (distance < best) {
          best = distance;
          nearest = index;
        }
      });
      current = Math.min(total - 1, Math.floor(nearest / perView));
    }

    perViewRef.current = perView;
    setPageCount(total);
    setPage(current);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    }

    sync();
    track.addEventListener("scroll", onScroll, { passive: true });
    const observer = new ResizeObserver(sync);
    observer.observe(track);

    return () => {
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sync]);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    const scroller: HTMLUListElement = node;

    const snapClass = ["snap-x", "snap-mandatory"];
    let pointerId: number | null = null;
    let originX = 0;
    let originY = 0;
    let originScroll = 0;
    let dragging = false;
    let suppressClick = false;

    function stopSnap() {
      scroller.classList.remove(...snapClass);
    }

    function restoreSnap() {
      scroller.classList.add(...snapClass);
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      pointerId = event.pointerId;
      originX = event.clientX;
      originY = event.clientY;
      originScroll = scroller.scrollLeft;
      dragging = false;
    }

    function onPointerMove(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;

      const dx = event.clientX - originX;
      const dy = event.clientY - originY;

      if (!dragging) {
        if (Math.abs(dx) < 8) return;
        if (Math.abs(dx) < Math.abs(dy)) {
          pointerId = null;
          return;
        }

        dragging = true;
        suppressClick = true;
        stopSnap();
        scroller.setPointerCapture(event.pointerId);
      }

      event.preventDefault();
      scroller.scrollLeft = originScroll - dx;
    }

    function onPointerUp(event: PointerEvent) {
      if (pointerId !== event.pointerId) return;

      pointerId = null;
      if (dragging) {
        dragging = false;
        restoreSnap();
      }
    }

    function onClickCapture(event: MouseEvent) {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }

    function onDragStart(event: DragEvent) {
      event.preventDefault();
    }

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove, { passive: false });
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);
    scroller.addEventListener("click", onClickCapture, true);
    scroller.addEventListener("dragstart", onDragStart);

    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
      scroller.removeEventListener("click", onClickCapture, true);
      scroller.removeEventListener("dragstart", onDragStart);
      restoreSnap();
    };
  }, []);

  const goToPage = useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const slide =
      slides[Math.max(0, Math.min(slides.length - 1, next * perViewRef.current))];
    if (!slide) return;

    const target =
      track.scrollLeft + slide.getBoundingClientRect().left - contentEdge(track);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: Math.min(target, track.scrollWidth - track.clientWidth),
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  const trackId = `${groupId}-track`;
  const atStart = page === 0;
  const atEnd = page >= pageCount - 1;

  return (
    <section
      aria-labelledby={`${groupId}-heading`}
      aria-roledescription="carousel"
      className="flex w-full flex-col gap-8 pb-16 sm:gap-10 sm:pb-20"
    >
      <div className="flex flex-col gap-3">
        <p className="font-extrabold text-xs uppercase leading-none text-accent">
          Selected work
        </p>
        <h2
          id={`${groupId}-heading`}
          className="font-extrabold text-[28px] leading-9 tracking-[-0.7px] text-ink sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          Case studies
        </h2>
      </div>

      <ul
        ref={trackRef}
        id={trackId}
        className="relative -mx-5 flex touch-pan-x snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain scroll-pl-5 px-5 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:mx-0 sm:scroll-pl-0 sm:px-0 lg:gap-10 [&::-webkit-scrollbar]:hidden"
      >
        {caseStudies.map((study) => {
          const current = pathname === study.href;
          return (
            <li
              key={study.href}
              className="w-[86%] shrink-0 snap-start last:snap-end sm:w-[44%] lg:w-[44%]"
            >
              <Link
                href={study.href}
                aria-current={current ? "page" : undefined}
                className={`group flex h-full flex-col overflow-hidden rounded-lg bg-panel-dark outline-none focus-visible:ring-2 focus-visible:ring-accent ${current ? "opacity-60" : fade}`}
              >
                <span className="relative block aspect-[16/9] w-full overflow-hidden bg-panel-dark">
                  <Image
                    src={study.thumb}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 470px, (min-width: 640px) 50vw, 86vw"
                    unoptimized
                  />
                </span>
                <div className="flex flex-col gap-3 px-6 py-6 sm:px-8 sm:py-8">
                  <p
                    className="font-extrabold text-xl leading-7 tracking-[-0.4px] text-secondary-600 sm:text-2xl sm:leading-8 sm:tracking-[-0.48px]"
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {study.title}
                  </p>
                  <p
                    className="text-sm leading-6 text-white sm:text-base sm:leading-7"
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {study.description}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Choose a page of case studies"
          className="-ml-2 flex items-center"
        >
          {Array.from({ length: pageCount }, (_, index) => {
            const active = index === page;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to page ${index + 1} of ${pageCount}`}
                aria-current={active ? "true" : undefined}
                aria-controls={trackId}
                className="flex h-11 items-center px-2"
                onClick={() => goToPage(index)}
              >
                <span
                  className={`h-2 rounded-full transition-[width,background-color] duration-200 ease-out motion-reduce:transition-none ${
                    active ? "w-6 bg-accent" : "w-2 bg-border"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous case studies"
            aria-controls={trackId}
            disabled={atStart}
            className={pagerClass}
            onClick={() => goToPage(page - 1)}
          >
            <ArrowRightIcon className="rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next case studies"
            aria-controls={trackId}
            disabled={atEnd}
            className={pagerClass}
            onClick={() => goToPage(page + 1)}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
