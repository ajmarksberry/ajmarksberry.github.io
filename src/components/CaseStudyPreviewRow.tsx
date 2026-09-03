import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import type { caseStudies } from "@/lib/site";

type Study = (typeof caseStudies)[number];

/** Landscape, no transparency — safe as a small rectangular thumbnail, unlike
 * the circle-cropped fallback the homepage's round treatment uses. */
const FALLBACK_THUMB = "/images/home/case-study-backdrop.webp";

/**
 * A smaller, horizontal echo of the homepage banners: thumbnail beside title
 * and (optionally) description, full width of whatever contains it. Used at
 * the bottom of each case study page and, in `compact` form, in the mobile
 * nav's case-study list.
 */
export function CaseStudyPreviewRow({
  study,
  current,
  compact = false,
  dividerClassName = "border-rule",
}: {
  study: Study;
  current: boolean;
  /** Tighter row, no description — the mobile nav has little room to spare. */
  compact?: boolean;
  /** The two call sites sit on different backgrounds, so the divider differs. */
  dividerClassName?: string;
}) {
  return (
    <Link
      href={study.href}
      aria-current={current ? "page" : undefined}
      className={`group flex w-full items-center gap-4 border-b py-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent sm:gap-6 ${
        compact ? "sm:py-4" : "py-4 sm:py-5"
      } ${dividerClassName} ${
        current
          ? "opacity-60"
          : "transition-opacity duration-200 ease-out hover:opacity-80"
      }`}
    >
      <span
        className={`relative block shrink-0 overflow-clip rounded-md bg-panel-dark ${
          compact
            ? "h-[52px] w-[84px] sm:h-[60px] sm:w-[96px]"
            : "h-[64px] w-[104px] sm:h-[88px] sm:w-[148px] lg:h-[100px] lg:w-[168px]"
        }`}
      >
        <Image
          src={study.hero ?? FALLBACK_THUMB}
          alt=""
          fill
          className="object-cover transition-[filter] duration-300 ease-out group-hover:brightness-110 motion-reduce:transition-none"
          sizes={compact ? "96px" : "168px"}
          unoptimized
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className={`font-extrabold leading-6 text-heading ${
            compact
              ? "line-clamp-2 text-sm sm:text-base"
              : "truncate text-base sm:text-lg"
          }`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {study.title}
        </span>
        {!compact ? (
          <span className="line-clamp-1 text-sm leading-6 text-ink sm:line-clamp-2">
            {study.description}
          </span>
        ) : null}
      </span>

      <ArrowRightIcon className="size-5 shrink-0 text-ink transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none" />
    </Link>
  );
}
