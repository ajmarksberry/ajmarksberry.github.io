import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function BookingWireframeBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:items-start">
      <SectionHeader
        overline="Discovery"
        title="Information architecture"
        subtitle="Mapping out the experience"
        description="Sitemaps, content hierarchies, and navigation models were developed to organize information intuitively, ensuring users could find what they needed without friction across every touchpoint."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] overflow-hidden rounded-none lg:max-w-full">
        <Image
          src="/images/booking/wireframes-tray.webp"
          alt="Booking experience sitemap and information architecture diagrams"
          width={2560}
          height={768}
          className="block h-auto w-full rounded-none"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
