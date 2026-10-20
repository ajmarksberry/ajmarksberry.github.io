import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";
import { OpenToWorkCard } from "@/components/OpenToWorkCard";

export const metadata: Metadata = {
  title: "Contact | AJ Marksberry",
  description:
    "Open to Senior Product Designer, Lead Product Designer, Principal Product Designer, and UX Leadership opportunities.",
};

export default function ContactPage() {
  return (
    <MarketingPage
      overline="Contact"
      title="Let’s work together"
      showFooter={false}
    >
      <OpenToWorkCard />
    </MarketingPage>
  );
}
