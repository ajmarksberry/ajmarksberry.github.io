import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

export function ItineraryWireframesBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center lg:items-start">
      <SectionHeader
        overline="Discovery"
        title="Wireframes"
        subtitle="3 Concepts explored"
        className="w-full max-w-[620px] pb-10 lg:max-w-full"
      />

      <div className="w-full min-w-0 max-w-[620px] overflow-hidden rounded-lg lg:max-w-full">
        <Image
          src="/images/itinerary/wireframes-tray.webp"
          alt="Three wireframe concepts for the itinerary share flow, including edit mode and the confirmed reservation view"
          width={1280}
          height={1123}
          className="block h-auto w-full"
          sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
          unoptimized
        />
      </div>
    </section>
  );
}
