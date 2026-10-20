import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpediaWorkSection } from "@/components/ExpediaWorkSection";
import { MarketingPage } from "@/components/MarketingPage";
import { SHOW_VISUAL_DESIGN } from "@/lib/site";
import { visualDesign } from "@/lib/visual-design";

export const metadata: Metadata = {
  title: "Visual design | AJ Marksberry",
  description: "A selection of websites and interfaces I've designed.",
};

export default function VisualDesignPage() {
  if (!SHOW_VISUAL_DESIGN) notFound();

  return (
    <MarketingPage
      overline="Selected work"
      title="Visual design"
      description="A selection of websites and interfaces I've designed."
      showFooter={false}
    >
      <div className="flex w-full flex-col gap-14">
        {visualDesign.map((item) => (
          <ExpediaWorkSection key={item.id} item={item} />
        ))}
      </div>
    </MarketingPage>
  );
}
