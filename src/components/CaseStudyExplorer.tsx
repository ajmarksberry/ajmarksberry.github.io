"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { ArrowRightIcon } from "@/components/Icons";
import { caseStudies } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-60";

/** Static export serves trailing-slash URLs; hrefs in site.ts have none. */
function samePath(a: string, b: string) {
  const trim = (v: string) => (v.length > 1 ? v.replace(/\/+$/, "") : v);
  return trim(a) === trim(b);
}

export function CaseStudyExplorer() {
  const pathname = usePathname();
  const groupId = useId();

  // On a case study page this leaves the other three; elsewhere, all of them.
  const others = caseStudies.filter((study) => !samePath(study.href, pathname));
  if (others.length === 0) return null;

  return (
    <section
      aria-labelledby={`${groupId}-heading`}
      className="flex w-full flex-col gap-6 pb-16 sm:gap-8 sm:pb-20"
    >
      <div className="flex flex-col gap-3">
        <p className="font-extrabold text-xs uppercase leading-none text-accent">
          Case studies
        </p>
        <h2
          id={`${groupId}-heading`}
          className="font-extrabold text-[28px] leading-9 tracking-[-0.7px] text-heading sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          More work
        </h2>
      </div>

      <ul className="flex w-full flex-col">
        {others.map((study) => (
          <li key={study.href}>
            <Link
              href={study.href}
              className={`group flex items-center justify-between gap-6 border-b border-rule py-4 sm:py-5 ${fade}`}
            >
              <span
                className="font-extrabold text-lg leading-6 tracking-[-0.36px] text-heading sm:text-[28px] sm:leading-9 sm:tracking-[-0.56px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {study.title}
              </span>
              <ArrowRightIcon className="size-6 shrink-0 text-ink transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
