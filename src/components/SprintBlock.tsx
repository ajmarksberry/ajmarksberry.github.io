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
  "Retro",
] as const;

export function SprintBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10">
      <SectionHeader
        overline="Discovery"
        title="Sprint"
        subtitle="3-day, in-person workshop"
        description="I planned and lead a 3-day workshop onsite in Phoenix, Arizona. We reviewed the existing experience and eventually identified areas where we could improve the user experience."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full max-w-[620px] flex-col gap-8 lg:max-w-full lg:flex-row lg:items-start">
        <div className="relative aspect-[1296/728] w-full overflow-hidden lg:h-[332px] lg:min-w-0 lg:flex-1 lg:aspect-auto">
          <Image
            src="/images/reach/sprint-workshop.webp"
            alt="Workshop participants reviewing sticky notes on a wall"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 620px, calc(100vw - 40px)"
            unoptimized
          />
        </div>

        <div className="flex w-full flex-col items-start gap-6 lg:min-w-0 lg:flex-1">
          <p
            className="w-full text-lg font-bold leading-7 text-ink"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Design sprint activities
          </p>
          <div className="flex w-full flex-col gap-2 text-base text-ink sm:flex-row sm:justify-between sm:gap-10">
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
    </section>
  );
}
