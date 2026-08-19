import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";

export const metadata: Metadata = {
  title: "Case studies | AJ Marksberry",
  description: "Selected product design case studies",
};

export default function ProjectsPage() {
  return (
    <MarketingPage
      overline="Case studies"
      title="Selected case studies"
      description="Three product design case studies, each on its own page."
    />
  );
}
