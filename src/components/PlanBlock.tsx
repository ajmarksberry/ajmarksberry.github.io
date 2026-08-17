import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  "Identify and understand merchant’s pain points, wants, and needs",
  "Interview with merchants to learn about their current experience and what they expect from the experience",
  "Evaluate the existing page designs",
  "Conduct a 3-day in-person workshop",
  "Wireframe concepts",
  "Update visual designs and create a style guide/design system",
] as const;

export function PlanBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
      <div className="flex w-full max-w-[620px] flex-col items-start lg:max-w-none lg:min-w-0 lg:flex-1">
        <SectionHeader
          overline="PROCCESS"
          title="The plan"
          description="We framed the work as a discovery-led redesign with a clear decision path — learn fast, pressure-test assumptions, then ship in focused sprints."
          className="w-full"
        />
      </div>
      <ol className="flex w-full max-w-[620px] flex-col gap-4 pt-0 lg:max-w-none lg:min-w-0 lg:w-[534px] lg:flex-none lg:pt-16">
        {steps.map((step, index) => (
          <li key={step} className="flex w-full items-center gap-2">
            <span
              className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-base leading-7 text-white"
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
