import Image from "next/image";
import { SectionHeader } from "@/components/SectionHeader";

const features = [
  {
    title: "Welcome screen",
    description:
      "We designed a welcome screen for users to search by service or provider. A search function helps find services easily.",
    src: "/images/booking/design-welcome-tray.webp",
    alt: "Three mobile screens for searching by service or provider",
    width: 2560,
    height: 1861,
  },
  {
    title: "Book an appointment",
    description:
      "A simple and quick 3-step process was implemented into the design to give the users a pleasant experience booking a last-minute appointment",
    src: "/images/booking/design-book-tray.webp",
    alt: "Find, review, and confirm appointment screens",
    width: 2560,
    height: 1648,
  },
  {
    title: "Join a waitlist",
    description:
      "Users wanted to see a provider at a specific time, so we added a waitlist. After testing, it didn’t significantly impact bookings and was removed.",
    src: "/images/booking/design-waitlist-tray.webp",
    alt: "Waitlist join, phone number, and confirmation screens",
    width: 2560,
    height: 1252,
  },
  {
    title: "1-step SSO sign in",
    description:
      "We simplified sign-in to a single SSO step, significantly reducing drop-off rates.",
    src: "/images/booking/design-sso-tray.webp",
    alt: "One-time email link sign-in, error, and success states",
    width: 2560,
    height: 1256,
  },
] as const;

export function BookingDesignBlock() {
  return (
    <section className="section-reveal flex w-full flex-col items-center gap-10 lg:items-start lg:gap-8">
      <SectionHeader
        overline="Design"
        title="Design & handoff"
        subtitle="Polishing the pixels"
        className="w-full max-w-[620px] pb-0 lg:max-w-full"
      />

      <div className="flex w-full flex-col items-center gap-20 lg:items-start">
        {features.map((feature) => (
          <div
            key={feature.src}
            className="flex w-full flex-col items-center gap-10 lg:items-start"
          >
            <div className="flex w-full max-w-[620px] flex-col items-start gap-4 lg:max-w-[800px]">
              <h3
                className="w-full font-bold text-[28px] leading-9 tracking-[-0.7px] text-ink sm:text-[36px] sm:leading-[48px] sm:tracking-[-0.9px]"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {feature.title}
              </h3>
              <p
                className="w-full max-w-[620px] text-base leading-7 text-ink"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {feature.description}
              </p>
            </div>
            <div className="w-full min-w-0 overflow-hidden rounded-lg">
              <Image
                src={feature.src}
                alt={feature.alt}
                width={feature.width}
                height={feature.height}
                className="block h-auto w-full rounded-lg"
                sizes="(min-width: 1140px) 980px, calc(100vw - 40px)"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
