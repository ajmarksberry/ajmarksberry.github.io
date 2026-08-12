import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function WireframeBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8">
      <SectionHeader
        overline="Discovery"
        title="Wireframe"
        subtitle="Structure before polish"
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full max-w-[620px] flex-col items-center lg:max-w-[996px]">
        {/* Desktop / tablet: overlapping composition matches Figma */}
        <div className="relative hidden w-full aspect-[996/616] sm:block">
          <div className="absolute left-0 top-[0.13%] h-[77.44%] w-[63.05%] overflow-hidden rounded-lg">
            <Image
              src="/images/reach/wireframe-1.png"
              alt="Dashboard wireframe concept showing revenue and bookings overview"
              fill
              className="object-cover object-top"
              sizes="(min-width: 1024px) 628px, 60vw"
            />
          </div>
          <div className="absolute left-[35.24%] top-[28.54%] h-[71.43%] w-[64.76%] overflow-hidden rounded-lg shadow-[0px_8px_24px_-4px_rgba(28,44,64,0.18)]">
            <Image
              src="/images/reach/wireframe-2.png"
              alt="Dashboard wireframe concept with location selector open"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 645px, 65vw"
            />
          </div>
        </div>

        {/* Mobile: stacked for readability */}
        <div className="flex w-full flex-col gap-4 sm:hidden">
          <div className="relative aspect-[628/477] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/reach/wireframe-1.png"
              alt="Dashboard wireframe concept showing revenue and bookings overview"
              fill
              className="object-cover object-top"
              sizes="620px"
            />
          </div>
          <div className="relative aspect-[645/440] w-full overflow-hidden rounded-lg">
            <Image
              src="/images/reach/wireframe-2.png"
              alt="Dashboard wireframe concept with location selector open"
              fill
              className="object-cover"
              sizes="620px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
