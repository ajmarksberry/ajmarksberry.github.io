import { CaseStudyCarousel } from "@/components/CaseStudyCarousel";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Footer } from "@/components/Footer";
import { SectionHeader } from "@/components/SectionHeader";
import type { ReactNode } from "react";

export function MarketingPage({
  overline,
  title,
  description,
  children,
  showFooter = true,
  showCaseStudies,
  caseStudyLayout = "list",
}: {
  overline: string;
  title: string;
  description?: string;
  children?: ReactNode;
  showFooter?: boolean;
  showCaseStudies?: boolean;
  caseStudyLayout?: "list" | "carousel";
}) {
  const explorer = showCaseStudies ?? showFooter;

  return (
    <main id="top">
      <div className="px-5 sm:px-10 lg:px-20">
        <section className="flex w-full max-w-[640px] flex-col items-start gap-10 py-16 sm:py-20 lg:max-w-full lg:py-24">
          <SectionHeader
            overline={overline}
            title={title}
            description={description}
            className="w-full max-w-[640px]"
          />
          {children}
        </section>
        {explorer ? (
          caseStudyLayout === "carousel" ? (
            <CaseStudyCarousel />
          ) : (
            <CaseStudyExplorer />
          )
        ) : null}
      </div>
      {showFooter ? <Footer /> : null}
    </main>
  );
}
