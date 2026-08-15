import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  "Identify and understand merchant’s pain points, wants, and needs",
  "Interview with merchants to learn about their current experience and what they expect from the experience",
  "Evaluate the existing page designs",
  "Conduct a 3-day in-person workshop",
  "Wireframe concepts",
  "Update visual designs and create a style guide",
] as const;

export function PlanBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
      <div className="flex w-full max-w-[620px] flex-col items-start gap-6 lg:max-w-none lg:min-w-0 lg:flex-1">
        <SectionHeader
          overline="PROCCESS"
          title="The plan"
          description="High-fidelity UI brought breathing room, confident typography, and a design system that made charts, status, and AI moments feel like one product family."
          className="w-full"
        />
        <p
          className="font-serif w-full text-base leading-7 text-neutral-900"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          We framed the work as a discovery-led redesign with a clear decision
          path — learn fast, pressure-test assumptions, then ship in focused
          sprints.
        </p>
      </div>
      <ol className="font-serif w-full max-w-[620px] list-decimal text-left text-base text-neutral-900 lg:max-w-none lg:min-w-0 lg:flex-1">
        {steps.map((step, index) => (
          <li
            key={step}
            className={`ms-6 leading-7 ${index < steps.length - 1 ? "mb-2" : ""}`}
          >
            {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
