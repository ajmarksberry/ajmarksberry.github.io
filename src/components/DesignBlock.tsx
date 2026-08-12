import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const visuals = [
  {
    src: "/images/reach/design-desktops.png",
    alt: "Overlapping REACH.ai desktop screens showing results dashboard and bookings table",
    width: 2200,
    height: 1284,
    className: "max-w-[1100px]",
    sizes: "(min-width: 1280px) 1100px, calc(100vw - 80px)",
  },
  {
    src: "/images/reach/design-mobiles.png",
    alt: "Three REACH.ai mobile screens showing menu, results, and bookings",
    width: 1676,
    height: 1666,
    className: "max-w-[838px]",
    sizes: "(min-width: 1280px) 838px, calc(100vw - 80px)",
  },
  {
    src: "/images/reach/design-login.png",
    alt: "REACH.ai welcome back login screen with portrait",
    width: 2552,
    height: 1534,
    className: "max-w-[813px]",
    sizes: "(min-width: 1280px) 813px, calc(100vw - 80px)",
  },
  {
    src: "/images/reach/design-account.png",
    alt: "REACH.ai my account settings screen",
    width: 2880,
    height: 2418,
    className: "max-w-[626px]",
    sizes: "(min-width: 1280px) 626px, calc(100vw - 80px)",
  },
  {
    src: "/images/reach/design-system.png",
    alt: "REACH.ai design system sheets with colors, buttons, and typography",
    width: 2292,
    height: 1465,
    className: "max-w-[1158px]",
    sizes: "(min-width: 1280px) 1158px, calc(100vw - 80px)",
  },
] as const;

export function DesignBlock() {
  return (
    <section className="section-reveal w-full">
      <div className="flex w-full flex-col items-center gap-12 overflow-hidden rounded-3xl bg-black p-6 sm:gap-16 sm:rounded-[40px] sm:p-10 lg:gap-20 lg:rounded-[48px] lg:p-14">
        <div className="flex w-full flex-col items-start gap-6">
          <SectionHeader
            overline="Create"
            title="Design"
            subtitle="Polishing the pixels"
            inverse
            className="w-full"
          />
          <p
            className="font-serif w-full max-w-[620px] text-base leading-7 text-white"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            High-fidelity UI brought breathing room, confident typography, and a
            design system that made charts, status, and AI moments feel like one
            product family.
          </p>
        </div>

        {visuals.map((visual) => (
          <div key={visual.src} className={`relative w-full ${visual.className}`}>
            <Image
              src={visual.src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              className="h-auto w-full"
              sizes={visual.sizes}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
