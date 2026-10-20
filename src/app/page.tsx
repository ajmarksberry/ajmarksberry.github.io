import type { Metadata } from "next";
import { ContactLinks } from "@/components/ContactLinks";
import { MarketingPage } from "@/components/MarketingPage";

export const metadata: Metadata = {
  title: "AJ Marksberry",
  description: "Product design portfolio",
};

export default function HomePage() {
  return (
    <MarketingPage
      title="Let’s work together"
      caseStudyLayout="stack"
      caseStudiesFirst
    >
      <ContactLinks />
    </MarketingPage>
  );
}
