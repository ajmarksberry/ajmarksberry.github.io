import { SectionHeader } from "@/components/SectionHeader";

const stats = [
  { value: "6", label: "Participants" },
  { value: "8", label: "Tasks" },
  { value: "8+", label: "Hours" },
] as const;

const findings = [
  "Positive feedback from current customer base as well as potential customers during sales demos.",
  "The majority of clients who were using the previous UI decided to upgrade to the new dashboard design.",
] as const;

export function ItineraryInterviewsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center">
      <SectionHeader
        overline="Discovery"
        title="Interviews"
        description="8-task sessions over Zoom using a think-aloud protocol while the participants navigated through the Figma Make prototype. Findings directly shaped final design iterations before handoff."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-10 pb-11 pt-8 lg:flex-row lg:items-start">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex w-full max-w-[620px] flex-col items-start border-t-2 border-rule-strong pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
          >
            <p
              className="w-full font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-accent sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {stat.value}
            </p>
            <p
              className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-[620px] flex-col items-start gap-2 border-t-2 border-rule-strong pt-6 lg:max-w-full">
        <h3
          className="w-full max-w-[632px] font-extrabold text-[32px] leading-10 tracking-[-0.8px] text-heading sm:text-[40px] sm:leading-[50px] lg:text-[48px] lg:leading-[60px] lg:tracking-[-1.2px]"
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          Findings
        </h3>
        <ul className="w-full max-w-[632px] list-disc ps-6 text-base leading-6 text-white">
          {findings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
