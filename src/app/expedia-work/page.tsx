import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpediaWorkSection } from "@/components/ExpediaWorkSection";
import { MarketingPage } from "@/components/MarketingPage";
import { expediaWork } from "@/lib/expedia-work";
import { SHOW_EXPEDIA_WORK } from "@/lib/site";

export const metadata: Metadata = {
  title: "Expedia work | AJ Marksberry",
  description:
    "More of the work I've done at Expedia Group, beyond the case studies.",
};

export default function ExpediaWorkPage() {
  if (!SHOW_EXPEDIA_WORK) notFound();

  return (
    <MarketingPage
      overline="Expedia"
      title="Other Expedia work"
      description="More of the work I've done at Expedia Group, beyond the case studies."
      showFooter={false}
    >
      <div className="flex w-full flex-col gap-14">
        {expediaWork.map((item) => (
          <ExpediaWorkSection key={item.id} item={item} />
        ))}
      </div>
    </MarketingPage>
  );
}
