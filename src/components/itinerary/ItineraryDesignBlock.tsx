import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function ItineraryDesignBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Make"
        title="Design"
        subtitle="Final designs for desktop and mobile"
        description="Production-ready UI with full accessibility annotations, conditional logic, and edge case coverage delivered at dev handoff."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] overflow-hidden rounded-lg lg:max-w-full">
        <Image
          src="/images/itinerary/design-tray.webp"
          alt="Final TAAP Share itinerary design on a mint background"
          width={2560}
          height={4562}
          className="block h-auto w-full rounded-lg"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
