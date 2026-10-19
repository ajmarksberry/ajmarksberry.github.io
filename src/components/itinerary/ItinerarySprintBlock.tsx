import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const leftActivities = [
  "Stakeholder alignment",
  "Research synthesis",
  "Dot voting",
  "Sketching",
  "Crazy-eights",
] as const;

const rightActivities = [
  "Homework",
  "Critique",
  "Wireframes",
  "Solution",
  "Retro",
] as const;

export function ItinerarySprintBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10">
      <SectionHeader
        overline="Discovery"
        title="Sprint"
        subtitle="A 2-day design sprint exploring 3 concepts"
        description="Facilitated a sprint with UX, Research, and Content."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      {/* Text first, image beneath: the copy sits side by side from lg up so the
       * board below gets the full column instead of half of it. */}
      <div className="flex w-full max-w-[620px] flex-col gap-8 lg:max-w-full lg:flex-row lg:items-start lg:gap-12">
        <div className="flex w-full flex-col gap-4 lg:min-w-0 lg:flex-1">
          <p
            className="w-full text-2xl font-bold leading-8 text-heading"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Sprint overview
          </p>
          <ul className="w-full list-disc text-base leading-7 text-ink">
            <li className="ms-6">
              <span className="font-bold">Day 1:</span> reviewed current
              experience and presented 3 interaction concepts.
            </li>
            <li className="ms-6">
              <span className="font-bold">Day 2:</span> dot voting, discussion,
              and takeaways.
            </li>
          </ul>
        </div>

        <div className="flex w-full flex-col gap-4 lg:min-w-0 lg:flex-1">
          <p
            className="w-full text-2xl font-bold leading-8 text-heading"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Activities
          </p>
          <div className="flex w-full flex-col gap-2 text-base text-ink sm:flex-row sm:gap-10">
            <ul className="min-w-0 flex-1 list-disc">
              {leftActivities.map((item) => (
                <li key={item} className="ms-6 leading-7">
                  {item}
                </li>
              ))}
            </ul>
            <ul className="min-w-0 flex-1 list-disc">
              {rightActivities.map((item) => (
                <li key={item} className="ms-6 leading-7">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Natural aspect, not cropped: the board is the content, and object-cover
       * would cut off the top of it. */}
      <div className="relative aspect-[2000/1118] w-full max-w-[620px] overflow-clip rounded-lg lg:max-w-full">
        <Image
          src="/images/itinerary/sprint-board.webp"
          alt="Miro board from the itinerary builder design sprint: booked itineraries, the single-page itinerary view, export options, and the team's sticky-note feedback"
          fill
          className="object-cover"
          sizes="(min-width: 1140px) 1140px, (min-width: 640px) 620px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
