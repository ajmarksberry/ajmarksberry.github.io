import { SectionHeader } from "@/components/SectionHeader";

export function BookingCompetitiveBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="Research"
        title="Competitive analysis"
        description="I explored existing booking flows and studied UX/UI patterns for last-minute reservations to inform the experience I was designing."
        className="w-full max-w-[620px] lg:max-w-full"
      />
    </section>
  );
}
