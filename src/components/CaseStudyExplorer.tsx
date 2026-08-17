"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { caseStudies } from "@/lib/site";

const LAYOUTS = [
  { id: "cards", label: "Cards" },
  { id: "thumbnails", label: "Thumbnails" },
  { id: "list", label: "List" },
] as const;

type LayoutId = (typeof LAYOUTS)[number]["id"];

const STORAGE_KEY = "case-study-nav";
const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

function isLayout(value: string | null): value is LayoutId {
  return value === "cards" || value === "thumbnails" || value === "list";
}

export function CaseStudyExplorer() {
  const pathname = usePathname();
  const groupId = useId();
  const [layout, setLayout] = useState<LayoutId>("cards");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLayout(stored)) setLayout(stored);
  }, []);

  function selectLayout(next: LayoutId) {
    setLayout(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }

  return (
    <section
      aria-labelledby={`${groupId}-heading`}
      className="flex w-full flex-col gap-8 pb-16 sm:gap-10 sm:pb-20"
    >
      <div className="flex flex-col gap-3">
        <p className="font-extrabold text-xs uppercase leading-none text-accent">
          Case studies
        </p>
        <h2
          id={`${groupId}-heading`}
          className="font-extrabold text-[28px] leading-9 tracking-[-0.7px] text-ink sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          More work
        </h2>
      </div>

      <ul
        data-explorer-layout="cards"
        hidden={layout !== "cards"}
        className="grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"
      >
        {caseStudies.map((study) => {
          const current = pathname === study.href;
          return (
            <li key={study.href}>
              <Link
                href={study.href}
                aria-current={current ? "page" : undefined}
                className={`group flex flex-col gap-4 ${current ? "opacity-60" : ""}`}
              >
                <Thumb src={study.thumb} alt="" />
                <div className="flex flex-col gap-2">
                  <p
                    className={`font-extrabold text-xl leading-7 tracking-[-0.4px] text-secondary-600 ${current ? "" : fade}`}
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {study.title}
                  </p>
                  <p
                    className="text-sm leading-6 text-ink"
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

      <ul
        data-explorer-layout="thumbnails"
        hidden={layout !== "thumbnails"}
        className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
      >
        {caseStudies.map((study) => {
          const current = pathname === study.href;
          return (
            <li key={study.href}>
              <Link
                href={study.href}
                aria-current={current ? "page" : undefined}
                className={`group relative block overflow-hidden rounded-lg ${current ? "opacity-60" : ""}`}
              >
                <Thumb src={study.thumb} alt="" className="aspect-[4/3] sm:aspect-[5/4]" />
                <span className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 font-extrabold text-sm leading-5 text-white backdrop-blur-sm sm:text-base">
                  {study.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <ul
        data-explorer-layout="list"
        hidden={layout !== "list"}
        className="flex w-full flex-col"
      >
        {caseStudies.map((study) => {
          const current = pathname === study.href;
          return (
            <li key={study.href} className="border-t border-border last:border-b">
              <Link
                href={study.href}
                aria-current={current ? "page" : undefined}
                className={`flex min-h-16 items-center gap-4 py-4 sm:min-h-20 sm:gap-6 ${
                  current ? "opacity-60" : fade
                }`}
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-md sm:size-16">
                  <Image
                    src={study.thumb}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="64px"
                    unoptimized
                  />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span
                    className="font-extrabold text-lg leading-6 tracking-[-0.36px] text-secondary-600 sm:text-xl sm:leading-7"
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {study.title}
                  </span>
                  <span className="hidden text-sm leading-5 text-ink sm:block">
                    {study.label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex w-full flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-extrabold text-xs uppercase leading-none text-accent">
          Layout
        </p>
        <div
          role="radiogroup"
          aria-label="Case study layout"
          className="grid w-full grid-cols-3 rounded-full border border-border p-1 sm:w-auto sm:min-w-[320px]"
        >
          {LAYOUTS.map((option) => {
            const selected = layout === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                data-explorer-option={option.id}
                onClick={() => selectLayout(option.id)}
                className={`min-h-11 rounded-full px-3 font-semibold text-xs uppercase tracking-[0.04em] sm:min-h-10 sm:text-sm ${
                  selected
                    ? "bg-ink text-white"
                    : "text-ink hover:opacity-60"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Thumb({
  src,
  alt,
  className = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <span
      className={`relative block w-full overflow-hidden rounded-lg bg-panel-dark ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, calc(100vw - 40px)"
        unoptimized
      />
    </span>
  );
}
