import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";
import { TaapNumberItem } from "@/components/taap/TaapListItems";

const changes = [
  "4 status tabs: Upcoming, In progress, Past, Canceled",
  "Sortable data table",
  "LOB icons per row, paginated results (30/page), universal search",
  "Full search capability. Search by traveler name, trip name, trip dates or itinerary number",
] as const;

export function TaapGen1Block() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline="Generation 1"
        title="Table format redesign"
        description={`Replaced the consumer pattern with a professional data table. Renamed "My Trips" to "Trips," reframing the page as an agent workspace. Designed 4 status tabs, sortable columns, LOB icons, paginated results, and universal search with typeahead and full search states.`}
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full min-w-0 max-w-[620px] flex-col-reverse items-center gap-10 overflow-hidden rounded-lg bg-mat px-6 pt-8 sm:px-10 sm:pt-16 lg:max-w-full lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:px-10">
        <div className="flex w-full min-w-0 flex-col items-start gap-4 pb-8 sm:pb-10 lg:max-w-[375px] lg:flex-none lg:pb-0">
          <h3
            className="w-full font-extrabold text-2xl leading-8 text-ink sm:text-[30px] sm:leading-10"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            What changed
          </h3>
          <div className="flex w-full flex-col items-start gap-4">
            {changes.map((item, index) => (
              <TaapNumberItem key={item} n={index + 1}>
                {item}
              </TaapNumberItem>
            ))}
          </div>
        </div>

        <div className="relative aspect-[753/480] w-full min-w-0 overflow-hidden rounded-none lg:max-w-[753px] lg:flex-1">
          <Image
            src="/images/taap/gen1-shot.webp"
            alt="Generation 1 Trips page redesigned as a sortable data table"
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 753px, (min-width: 640px) 620px, calc(100vw - 40px)"
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
