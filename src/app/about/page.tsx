import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketingPage } from "@/components/MarketingPage";
import { SHOW_ABOUT } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | AJ Marksberry",
  description: "About AJ Marksberry",
};

export default function AboutPage() {
  if (!SHOW_ABOUT) notFound();

  return (
    <MarketingPage
      overline="About"
      title="A placeholder for the about page"
      description="This page will hold a short bio, the kind of work I like, and how I work with teams. For now, this is just a placeholder so the navigation can land here."
      showFooter={false}
    >
      <div className="flex w-full max-w-[640px] flex-col gap-4 text-base leading-7 text-ink">
        <p>
          Placeholder: background, current focus, and a few notes on process
          will go here.
        </p>
        <p>
          Placeholder: selected experience, tools, and the kinds of problems I
          like to take on.
        </p>
      </div>
    </MarketingPage>
  );
}
