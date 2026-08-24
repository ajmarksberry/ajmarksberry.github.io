import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  "Understand our users",
  "Create a clear information architecture",
  "Gather inspiration",
  "Optimize the user experience and design a new UI",
  "Create an atomic design system",
] as const;

export function BookingPlanBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
      <div className="flex w-full max-w-[620px] flex-col items-start gap-6 lg:max-w-none lg:min-w-0 lg:flex-1">
        <SectionHeader
          overline="PROCCESS"
          title="The plan"
          description="We needed to build merchant’s customers a brand new experience for booking with providers offering last-minute appointments."
          className="w-full"
        />
        <p
          className="w-full text-base leading-7 text-neutral-900"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          We framed the work as a discovery-led redesign with a clear decision
          path: learn fast, pressure-test assumptions, then ship in focused
          sprints.
        </p>
      </div>
      <ol className="flex w-full max-w-[620px] flex-col gap-4 pt-0 lg:max-w-none lg:min-w-0 lg:w-[534px] lg:flex-none lg:pt-16">
        {steps.map((step, index) => (
          <li key={step} className="flex w-full items-center gap-2">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-base leading-7 text-on-primary"
              aria-hidden
            >
              {index + 1}
            </span>
            <p
              className="min-w-0 flex-1 text-sm font-medium leading-5 text-neutral-900"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
