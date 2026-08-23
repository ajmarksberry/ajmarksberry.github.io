import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapXItem } from "@/components/taap/TaapListItems";

const gaps = [
  "Two tabs only: Upcoming and Past and Canceled",
  "A flat list of hyperlinks showing destination, date, and itinerary number only",
  "No traveler name visible, which is critical for multi-client agents",
  "No search, no filter, no booking type indicators",
  "No earnings, no refund status, no agent-specific actions",
] as const;

export function TaapOriginsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="History"
        title="The challenge"
        description={`The original "My Trips" page was built for consumers, not professional travel agents. For agents managing hundreds of client bookings at once, it was completely inadequate.`}
        className="w-full max-w-[620px] pb-6 lg:max-w-full"
      />

      <div className="flex w-full min-w-0 max-w-[620px] flex-col items-center gap-10 overflow-hidden rounded-none bg-mat px-6 pt-8 sm:px-10 sm:pt-16 lg:max-w-full lg:flex-row lg:items-end lg:justify-center lg:gap-10 lg:px-10">
        <div className="relative aspect-[733/489] w-full min-w-0 overflow-hidden rounded-none lg:max-w-[733px] lg:flex-1">
          <Image
            src="/images/taap/origins-shot.webp"
            alt="Original My Trips page with a flat list of hyperlinks"
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 733px, (min-width: 640px) 620px, calc(100vw - 40px)"
            unoptimized
          />
        </div>

        <div className="flex w-full flex-col items-start gap-3 pb-8 sm:pb-10 lg:max-w-[397px] lg:flex-none">
          {gaps.map((item) => (
            <TaapXItem key={item}>{item}</TaapXItem>
          ))}
        </div>
      </div>
    </section>
  );
}
