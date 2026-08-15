import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const visuals = [
  {
    src: "/images/reach/design-desktops.png",
    alt: "Overlapping REACH.ai desktop screens showing bookings and results dashboards",
    width: 2468,
    height: 1306,
    className: "max-w-[1234px]",
    sizes: "(min-width: 1024px) 1234px, (min-width: 640px) 620px, calc(100vw - 40px)",
  },
  {
    src: "/images/reach/design-mobiles.png",
    alt: "Three REACH.ai mobile screens showing menu, results, and bookings",
    width: 1676,
    height: 1554,
    className: "max-w-[838px]",
    sizes: "(min-width: 1024px) 838px, (min-width: 640px) 620px, calc(100vw - 40px)",
  },
  {
    src: "/images/reach/design-login.png",
    alt: "REACH.ai welcome back login screen with portrait",
    width: 2104,
    height: 1258,
    className: "max-w-[1020px] shadow-[0px_4px_16px_0px_rgba(69,68,69,0.37)]",
    sizes: "(min-width: 1024px) 1020px, (min-width: 640px) 620px, calc(100vw - 40px)",
  },
  {
    src: "/images/reach/design-settings.png",
    alt: "REACH.ai settings billing screen with AI assistant",
    width: 2496,
    height: 1884,
    className: "max-w-[1216px] shadow-[0px_4px_16px_0px_rgba(69,68,69,0.37)]",
    sizes: "(min-width: 1024px) 1216px, (min-width: 640px) 620px, calc(100vw - 40px)",
  },
  {
    src: "/images/reach/design-account.png",
    alt: "REACH.ai my account billing and payment details screen",
    width: 2068,
    height: 1888,
    className: "max-w-[1002px] shadow-[0px_4px_16px_0px_rgba(69,68,69,0.37)]",
    sizes: "(min-width: 1024px) 1002px, (min-width: 640px) 620px, calc(100vw - 40px)",
  },
  {
    src: "/images/reach/design-system.png",
    alt: "REACH.ai design system sheets with colors, buttons, and typography",
    width: 2348,
    height: 1568,
    className: "max-w-[1158px] shadow-[0px_2px_8px_0px_rgba(69,68,69,0.26)]",
    sizes: "(min-width: 1024px) 1158px, (min-width: 640px) 620px, calc(100vw - 40px)",
  },
] as const;

export function DesignBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-8 lg:gap-10">
      <SectionHeader
        overline="Create"
        title="Design"
        subtitle="Polishing the pixels"
        description="High-fidelity UI brought breathing room, confident typography, and a design system that made charts, status, and AI moments feel like one product family."
        className="w-full max-w-[620px] lg:max-w-full"
      />

      <div className="flex w-full max-w-[620px] flex-col items-center gap-10 lg:max-w-full lg:gap-20">
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
