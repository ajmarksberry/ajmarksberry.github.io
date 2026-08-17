import { SectionHeader } from "@/components/SectionHeader";

export function BookingResultsBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="Retrospective"
        title="Results"
        description="Our new booking platform was a success, as confirmed by users. Without metrics, we relied on real-time feedback to iterate and refine the design. User testing further shaped the project."
        className="w-full max-w-[620px] lg:max-w-full"
      />
    </section>
  );
}
