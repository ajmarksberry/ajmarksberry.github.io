import type { Metadata } from "next";
import { DesignBlock } from "@/components/DesignBlock";
import { Divider } from "@/components/Divider";
import { EvaluateBlock } from "@/components/EvaluateBlock";
import { Footer } from "@/components/Footer";
import { HeroBlock } from "@/components/HeroBlock";
import { IdentifyBlock } from "@/components/IdentifyBlock";
import { InterviewBlock } from "@/components/InterviewBlock";
import { IntroBlock } from "@/components/IntroBlock";
import { NextStepsBlock } from "@/components/NextStepsBlock";
import { PlanBlock } from "@/components/PlanBlock";
import { ResultsBlock } from "@/components/ResultsBlock";
import { SprintBlock } from "@/components/SprintBlock";
import { WireframeBlock } from "@/components/WireframeBlock";

export const metadata: Metadata = {
  title: "REACH.ai Booking Dashboard | AJ Marksberry",
  description: "Bringing an outdated experience back to life again",
};

export default function ReachAiCaseStudyPage() {
  return (
    <main id="top">
      <div className="px-5 sm:px-10 lg:px-20">
        <HeroBlock />
        <IntroBlock />
        <Divider padded />
        <PlanBlock />
        <Divider padded />
        <IdentifyBlock />
        <Divider padded />
        <InterviewBlock />
        <Divider padded />
        <EvaluateBlock />
        <Divider padded />
        <SprintBlock />
        <Divider padded />
        <WireframeBlock />
        <Divider padded />
        <DesignBlock />
        <Divider padded />
        <ResultsBlock />
        <Divider padded />
        <NextStepsBlock />
      </div>
      <Footer />
    </main>
  );
}
