import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapXItem } from "@/components/taap/TaapListItems";

const painPoints = [
  "Messy, unorganized list of itineraries",
  "Ability to adjust content was limited",
  "Outdated UI",
  "Limited preview functionality",
  "Inconsistent content hierarchy",
] as const;

export function ItineraryChallengeBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="History"
        title="The challenge"
        description="Travel agents using TAAP could book flights, hotels, and experiences — but once bookings were made, there was no unified view for the agent or the traveler. Agents were forced to manually compile trip details outside the platform, creating extra work and an inconsistent client experience on both desktop and mobile."
        className="w-full max-w-[620px] pb-10 lg:max-w-full"
      />

      <div className="flex w-full min-w-0 max-w-[620px] flex-col items-center gap-10 overflow-hidden rounded-none bg-[#f4dbd7] px-6 pt-8 sm:px-10 sm:pt-16 lg:max-w-full lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:px-10">
        <div className="relative aspect-[688/475] w-full min-w-0 overflow-hidden rounded-none lg:max-w-[688px] lg:flex-1">
          <Image
            src="/images/itinerary/challenge-shot.webp"
            alt="Original TAAP itinerary detail and booked itineraries list"
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 688px, (min-width: 640px) 620px, calc(100vw - 40px)"
            unoptimized
          />
        </div>

        <div className="flex w-full flex-col items-start gap-3 pb-8 sm:pb-10 lg:max-w-[442px] lg:flex-none">
          <h3
            className="w-full font-extrabold text-2xl leading-8 text-ink sm:text-[30px] sm:leading-10"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Pain points
          </h3>
          {painPoints.map((item) => (
            <TaapXItem key={item}>{item}</TaapXItem>
          ))}
        </div>
      </div>
    </section>
  );
}
