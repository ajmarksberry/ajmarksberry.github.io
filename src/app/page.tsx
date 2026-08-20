import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";
import { EMAIL, MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "AJ Marksberry",
  description: "Product design portfolio",
};

export default function HomePage() {
  return (
    <MarketingPage
      overline="Contact"
      title="Let’s work together"
      caseStudyLayout="carousel"
    >
      <a
        href={MAILTO}
        className="font-semibold text-base leading-7 text-ink underline underline-offset-4 transition-opacity duration-200 ease-out hover:opacity-60"
      >
        {EMAIL}
      </a>
    </MarketingPage>
  );
}
