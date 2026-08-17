import type { Metadata } from "next";
import { CaseStudyExplorer } from "@/components/CaseStudyExplorer";
import { Divider } from "@/components/Divider";
import { Footer } from "@/components/Footer";
import { TaapGen1Block } from "@/components/taap/TaapGen1Block";
import { TaapGen2Block } from "@/components/taap/TaapGen2Block";
import { TaapGen3Block } from "@/components/taap/TaapGen3Block";
import { TaapHandoffBlock } from "@/components/taap/TaapHandoffBlock";
import { TaapHeroBlock } from "@/components/taap/TaapHeroBlock";
import { TaapIntroBlock } from "@/components/taap/TaapIntroBlock";
import { TaapOriginsBlock } from "@/components/taap/TaapOriginsBlock";
import { TaapResultsBlock } from "@/components/taap/TaapResultsBlock";

export const metadata: Metadata = {
  title: "Trips on TAAP | AJ Marksberry",
  description:
    "From a confusing experience, to a professional-grade agent tool",
};

export default function TaapTripsCaseStudyPage() {
  return (
    <main id="top">
      <div className="mx-auto w-full max-w-[1140px] px-5 sm:px-10 lg:px-20">
        <TaapHeroBlock />
        <TaapIntroBlock />
        <Divider padded />
        <TaapOriginsBlock />
        <Divider padded />
        <TaapGen1Block />
        <Divider padded />
        <TaapGen2Block />
        <Divider padded />
        <TaapHandoffBlock />
        <Divider padded />
        <TaapGen3Block />
        <Divider padded />
        <TaapResultsBlock />
        <Divider padded />
        <CaseStudyExplorer />
      </div>
      <Footer />
    </main>
  );
}
