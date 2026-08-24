import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function IntroBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start">
      <SectionHeader
        overline="Introduction"
        title="Setting the stage"
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12">
        <div className="w-full max-w-[468px] shrink-0 lg:size-[468px] lg:max-w-none">
          <Image
            src="/images/reach/intro-salon.webp"
            alt="Barber blow-drying a client's hair in a salon"
            width={936}
            height={936}
            className="h-auto w-full rounded-full"
            sizes="(min-width: 1024px) 468px, min(468px, 100vw)"
            unoptimized
          />
        </div>

        <div className="flex w-full max-w-[620px] flex-col items-start gap-6 lg:max-w-none lg:min-w-0 lg:flex-1">
          <p className="font-extrabold text-xs uppercase leading-none text-accent">
            Context
          </p>
          <div className="flex w-full flex-col items-start gap-8 text-neutral-900">
            <div className="flex w-full flex-col items-start gap-4">
              <h3
                className="w-full font-extrabold text-[28px] leading-9 tracking-[-0.7px] sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                What is REACH.ai?
              </h3>
              <p
                className="w-full text-base leading-7"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                REACH integrates with your scheduling software (think hair salon)
                & scans your live appointment book to look for last-minute
                openings and cancellations. REACH then contacts your customers on
                your behalf to fill these appointments using machine learning
                algorithms to predict who most likely will fill this opening.
              </p>
            </div>
            <div className="flex w-full flex-col items-start gap-4">
              <h3
                className="w-full font-extrabold text-2xl leading-8 tracking-[-0.24px] sm:text-[30px] sm:leading-10"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                Merchant dashboard
              </h3>
              <p
                className="w-full text-base leading-7"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                Owners needed a command center that made demand, staffing, and
                client conversations obvious at a glance. Our task was to redesign
                the merchant experience so busy operators could trust the product
                in the middle of a packed Saturday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
