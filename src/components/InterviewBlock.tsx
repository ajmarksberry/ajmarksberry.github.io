import { SectionHeader } from "@/components/SectionHeader";

const stats = [
  { value: "12", label: "Participants" },
  { value: "14", label: "Questions" },
  { value: "16+", label: "Hours" },
] as const;

const questions = [
  "How do you feel about the design?",
  "How would you improve the design?",
  "What features are most important to you, visited most?",
] as const;

export function InterviewBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center">
      <SectionHeader
        overline="Discovery"
        title="Interviews"
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-8 pt-8">
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex w-full max-w-[620px] flex-col items-start border-t-2 border-ink pt-6 lg:max-w-none lg:min-w-0 lg:flex-1"
            >
              <p
                className="w-full font-extrabold text-[48px] leading-[60px] tracking-[-1.2px] text-ink sm:text-[60px] sm:leading-[72px] lg:text-[72px] lg:leading-[90px] lg:tracking-[-1.8px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {stat.value}
              </p>
              <p
                className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-ink sm:text-[30px] sm:leading-10 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full max-w-[620px] flex-col items-start gap-4 lg:mr-auto">
          <div className="flex w-full flex-col items-start gap-2">
            <h3
              className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] text-neutral-900"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              What we asked
            </h3>
            <p
              className="font-serif w-full text-base leading-7 text-neutral-900"
              style={{ fontFeatureSettings: '"liga" 0' }}
            >
              Because we couldn’t afford to do user testing or interviews, we
              offered the customer success team a list of questions to ask
              consumers during sales and support calls.
            </p>
          </div>
          <ol className="font-serif w-full list-decimal text-base font-bold text-neutral-900">
            {questions.map((question) => (
              <li key={question} className="ms-6 leading-7">
                {question}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex w-full max-w-[620px] flex-col gap-6 rounded-lg bg-primary-600 p-6 text-white dark:text-ink lg:max-w-full lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <h3
            className="w-full font-bold text-2xl leading-8 tracking-[-0.24px] lg:w-[254px] lg:shrink-0 lg:text-[36px] lg:leading-[48px] lg:tracking-[-0.9px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            What we heard
          </h3>
          <div
            className="font-serif flex w-full flex-col gap-2 text-lg font-medium leading-8 lg:max-w-[640px] lg:flex-1 lg:text-xl lg:leading-9"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            <p>
              “There is a lot of information on the dashboard.”
              <br />
              “I can’t find what I’m looking for.”
            </p>
            <p>“My staff shouldn’t need a tutorial to check in a walk-up.”</p>
            <p>“It’s difficult to change locations.”</p>
          </div>
        </div>
      </div>
    </section>
  );
}
