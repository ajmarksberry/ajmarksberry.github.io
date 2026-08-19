import { SectionHeader } from "@/components/SectionHeader";

export function ItineraryPrototypeBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="Make"
        title="Prototype"
        subtitle="Figma Make prototype — built for research"
        description="Used Figma Make (AI-powered prototyping) to build a working, interactive prototype — giving interview participants a realistic experience rather than a standard click-through, leading to richer feedback."
        className="w-full max-w-[620px] lg:max-w-full"
      />
    </section>
  );
}
