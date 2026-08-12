import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const findings = [
  "Simplify the color palette.",
  "Collapse redundant navigation into a calm primary rail",
  "Optimize for mobile. Responsive design.",
  "Remove unnecessary/legacy features.",
  "Reduce the amount of content on the page. Cognitive overload.",
  "Establish consistent status color, type, and confirmation patterns",
] as const;

export function EvaluateBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8">
      <SectionHeader
        overline="Evaluate"
        title="Heuristic evaluation"
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:items-start">
        <div className="w-full max-w-[620px] overflow-hidden rounded-lg shadow-[0px_8px_16px_-4px_rgba(28,44,64,0.08)] lg:max-w-none lg:min-w-0 lg:flex-1">
          <div className="relative aspect-[2464/1600] w-full bg-surface">
            <Image
              src="/images/reach/evaluate-dashboard.png"
              alt="Annotated REACH.ai dashboard with heuristic findings"
              fill
              className="object-contain object-center"
              sizes="(min-width: 1024px) 50vw, (min-width: 640px) 620px, calc(100vw - 40px)"
            />
          </div>
        </div>

        <div className="flex w-full max-w-[620px] flex-col items-start gap-6 text-neutral-900 lg:max-w-none lg:min-w-0 lg:flex-1">
          <p
            className="font-serif w-full text-lg font-bold leading-7"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            I reviewed the existing designs and identified areas of improvement
            of the UI/visual design and documented experience risks.
          </p>
          <ul className="font-serif w-full list-disc text-base">
            {findings.map((item) => (
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
