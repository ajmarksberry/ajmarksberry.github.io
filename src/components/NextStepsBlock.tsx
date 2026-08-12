import { SectionHeader } from "@/components/SectionHeader";

export function NextStepsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="Design"
        title="Next steps"
        subtitle="Continuing the process"
        className="w-full max-w-[620px] pb-6 lg:max-w-full"
      />
      <p
        className="font-serif w-full max-w-[620px] text-lg leading-8 text-ink"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        Based on the dashboard page and consumer comments, I pushed forward with
        updating the visual design of all remaining pages. I also built a design
        system for visual consistency throughout the experience.
      </p>
    </section>
  );
}
