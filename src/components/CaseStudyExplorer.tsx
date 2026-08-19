"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { caseStudies } from "@/lib/site";

const fade = "transition-opacity duration-200 ease-out hover:opacity-80";

export function CaseStudyExplorer() {
  const pathname = usePathname();
  const groupId = useId();

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
          My work
        </h2>
      </div>

      <ul className="flex w-full flex-col gap-8 sm:gap-10">
        {caseStudies.map((study) => {
          const current = pathname === study.href;
          return (
            <li key={study.href}>
              <Link
                href={study.href}
                aria-current={current ? "page" : undefined}
                className={`group flex flex-col overflow-hidden rounded-lg bg-panel-dark ${current ? "opacity-60" : fade}`}
              >
                <span className="relative block aspect-[16/9] w-full overflow-hidden bg-panel-dark sm:aspect-[2/1]">
                  <Image
                    src={study.thumb}
                    alt=""
                    fill
                    className="object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 980px, calc(100vw - 40px)"
                    unoptimized
                  />
                </span>
                <div className="flex flex-col gap-3 px-6 py-6 sm:gap-4 sm:px-8 sm:py-8">
                  <p
                    className="font-extrabold text-2xl leading-8 tracking-[-0.48px] text-secondary-600 sm:text-[28px] sm:leading-9 sm:tracking-[-0.56px]"
                    style={{ fontFeatureSettings: '"liga" 0' }}
                  >
                    {study.title}
                  </p>
                  <p
                    className="max-w-[640px] text-base leading-7 text-white"
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
    </section>
  );
}
