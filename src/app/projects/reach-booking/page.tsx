import type { Metadata } from "next";
import { BookingCompetitiveBlock } from "@/components/booking/BookingCompetitiveBlock";
import { BookingDesignBlock } from "@/components/booking/BookingDesignBlock";
import { BookingHeroBlock } from "@/components/booking/BookingHeroBlock";
import { BookingIdentifyBlock } from "@/components/booking/BookingIdentifyBlock";
import { BookingIntroBlock } from "@/components/booking/BookingIntroBlock";
import { BookingPlanBlock } from "@/components/booking/BookingPlanBlock";
import { BookingResultsBlock } from "@/components/booking/BookingResultsBlock";
import { BookingWireframeBlock } from "@/components/booking/BookingWireframeBlock";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "REACH.ai booking experience | AJ Marksberry",
  description:
    "Filling last-minute appointments to capture lost revenue for service providers, built from the ground up",
};

export default function ReachBookingCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
        <BookingHeroBlock />
        <BookingIntroBlock />
        <Divider padded />
        <BookingPlanBlock />
        <Divider padded />
        <BookingIdentifyBlock />
        <Divider padded />
        <BookingWireframeBlock />
        <Divider padded />
        <BookingCompetitiveBlock />
        <Divider padded />
        <BookingDesignBlock />
        <Divider padded />
        <BookingResultsBlock />
        <Divider padded />
        <CaseStudyExplorer />
      </div>
      <Footer />
    </main>
  );
}
