import type { Metadata } from "next";
import { MarketingPage } from "@/components/MarketingPage";
import { EMAIL, MAILTO } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | AJ Marksberry",
  description: "Get in touch with AJ Marksberry",
};

export default function ContactPage() {
  return (
    <MarketingPage
      overline="Contact"
      title="Let’s work together"
      description="Placeholder for a short contact note. The fastest way to reach me is email."
      showFooter={false}
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
