import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const frustrations = [
  "Managing multiple, complex communication tools",
  "Dashboard feels noisy during peak hours",
  "Appointment details exist in several separate systems",
] as const;

const goals = [
  "Ability to bubble up information to business owner when asked",
  "Manage less inbound calls and emails regarding bookings",
  "Reduce front-desk interruptions",
] as const;

export function IdentifyBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10">
      <SectionHeader
        overline="Identify"
        title="Meet Emily"
        description="High-fidelity UI brought breathing room, confident typography, and a design system that made charts, status, and AI moments feel like one product family."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-center">
        <div className="relative aspect-square w-full max-w-[345px] shrink-0 overflow-hidden rounded-full lg:size-[345px] lg:max-w-none">
          <Image
            src="/images/reach/persona-emily.png"
            alt="Emily, merchant persona"
            width={690}
            height={690}
            className="size-full object-cover"
            sizes="345px"
          />
        </div>
        <blockquote
          className="w-full max-w-[620px] font-semibold italic text-[22px] leading-8 text-accent sm:text-[26px] sm:leading-9 lg:max-w-none lg:min-w-0 lg:flex-1 lg:text-[30px] lg:leading-10"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          “I need an easy-to-use interface to gain quick, high-level insights
          into our client’s booking habits and how it affects our stylist’s
          schedule.”
        </blockquote>
      </div>

      <div className="flex w-full flex-col items-center gap-6 lg:items-start">
        <div className="flex w-full max-w-[620px] flex-col items-start gap-2 lg:max-w-full">
          <h3
            className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-ink sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Frustrations
          </h3>
          <ul className="font-serif w-full list-disc text-base text-neutral-900">
            {frustrations.map((item) => (
              <li key={item} className="ms-6 leading-7">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full max-w-[620px] flex-col items-start gap-2 lg:max-w-full">
          <h3
            className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-ink sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Goals
          </h3>
          <ul className="font-serif w-full list-disc text-base text-neutral-900">
            {goals.map((item) => (
              <li key={item} className="ms-6 leading-7">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
