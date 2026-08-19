import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";

export const metadata: Metadata = {
  title: "AJ Marksberry",
  description: "Product design portfolio",
};

export default function HomePage() {
  return (
    <MarketingPage
      overline="Hello"
      title="AJ Marksberry"
      // description="Placeholder intro. I’ll use this space for a short home-page statement, selected work, and a path into the rest of the site."
    />
  );
}
