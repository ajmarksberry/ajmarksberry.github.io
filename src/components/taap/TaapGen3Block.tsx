import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function TaapGen3Block() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Generation 3"
        title="Post-launch"
        subtitle="2025–2026"
        description="Further post-launch research, including user testing, surveys, and feedback questionnaires conducted with the Research team, surfaced specific refinements. I organized 20+ changes into four categories for engineering prioritization."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] overflow-hidden rounded-lg lg:max-w-full">
        <Image
          src="/images/taap/gen3-tray.webp"
          alt="Generation 3 Trips dashboard after post-launch refinements"
          width={2560}
          height={3032}
          className="block h-auto w-full rounded-lg"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
