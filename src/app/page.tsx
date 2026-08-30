import type { Metadata } from "next";
import { DownloadIcon } from "@/components/Icons";
import { MarketingPage } from "@/components/MarketingPage";
import { EMAIL, MAILTO, RESUME_FILENAME, RESUME_PATH } from "@/lib/site";

export const metadata: Metadata = {
  title: "AJ Marksberry",
  description: "Product design portfolio",
};

const linkClass =
  "font-semibold text-base leading-7 text-ink transition-opacity duration-200 ease-out hover:opacity-60";

export default function HomePage() {
  return (
    <MarketingPage
      title="Let’s work together"
      caseStudyLayout="stack"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
        <a href={MAILTO} className={`${linkClass} underline underline-offset-4`}>
          {EMAIL}
        </a>
        <a
          href={RESUME_PATH}
          download={RESUME_FILENAME}
          className={`group inline-flex items-center gap-2 ${linkClass}`}
        >
          <DownloadIcon className="size-5 shrink-0" />
          <span className="underline underline-offset-4">Resume</span>
        </a>
      </div>
    </MarketingPage>
  );
}
