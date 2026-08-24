import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const findings = [
  "Simplify the color palette",
  "Collapse redundant navigation into a calm primary rail",
  "Optimize for mobile. Responsive design",
  "Remove unnecessary/legacy features",
  "Reduce the amount of content on the page",
  "Establish consistent status color, type, and confirmation patterns",
] as const;

function NumberItem({ index, children }: { index: number; children: string }) {
  return (
    <div className="flex w-full max-w-[400px] items-start gap-2">
      <span
        className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600 font-bold text-base leading-7 text-on-primary"
        aria-hidden
      >
        {index}
      </span>
      <p
        className="min-w-0 flex-1 text-sm font-medium leading-5 text-ink"
        style={{ fontFeatureSettings: '"liga" 0' }}
      >
        {children}
      </p>
    </div>
  );
}

export function EvaluateBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8">
      <SectionHeader
        overline="Evaluate"
        title="Heuristic evaluation"
        description="I reviewed the existing designs and identified areas of improvement of the UI/visual design and documented experience risks."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full max-w-[620px] flex-col items-center gap-10 overflow-hidden rounded-lg bg-mat px-6 pt-16 sm:px-10 lg:max-w-full lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:px-10 lg:pt-20">
        <div className="w-full min-w-0 lg:max-w-[647px] lg:flex-1">
          <Image
            src="/images/reach/evaluate-shot.webp"
            alt="Annotated REACH.ai dashboard with heuristic findings"
            width={1294}
            height={1200}
            className="h-auto w-full"
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 620px, calc(100vw - 40px)"
            unoptimized
          />
        </div>

        <div className="flex w-full flex-col items-start gap-3 pb-10 lg:w-[400px] lg:flex-none lg:pb-0">
          {findings.map((item, index) => (
            <NumberItem key={item} index={index + 1}>
              {item}
            </NumberItem>
          ))}
        </div>
      </div>
    </section>
  );
}
