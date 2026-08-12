import Image from "next/image";
import { Divider } from "@/components/Divider";
import { ReachLogo } from "@/components/ReachLogo";

const meta = [
  { label: "Role", value: "Lead Product Designer" },
  { label: "Timeline", value: "2021 - 2022" },
  { label: "Team", value: "2 Engineers, 1 Designer" },
] as const;

export function HeroBlock() {
  return (
    <section className="flex w-full flex-col items-start py-10">
      <div className="flex w-full max-w-[620px] flex-col items-start gap-6">
        <div
          className="hero-reveal flex w-full flex-col items-start gap-5"
          style={{ animationDelay: "40ms" }}
        >
          <p className="font-extrabold text-xs uppercase leading-none text-accent">
            Case Study
          </p>
          <ReachLogo />
        </div>
        <h1
          className="hero-reveal w-full font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-ink sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.5px]"
          style={{ fontFeatureSettings: '"liga" 0', animationDelay: "140ms" }}
        >
          REACH.ai
          <br />
          Booking Dashboard
        </h1>
        <p
          className="hero-reveal font-serif w-full text-lg leading-7 text-ink sm:text-xl"
          style={{ animationDelay: "240ms" }}
        >
          Bringing an outdated experience back to life again
        </p>
      </div>

      <div className="hero-devices flex w-full flex-col items-center py-8 lg:px-20 lg:py-10">
        <div className="relative w-full">
          <Image
            src="/images/reach/hero-devices.png"
            alt="REACH.ai dashboard shown on desktop and mobile"
            width={2560}
            height={1167}
            className="h-auto w-full"
            priority
            sizes="(min-width: 1440px) 1120px, (min-width: 1024px) calc(100vw - 320px), calc(100vw - 40px)"
          />
        </div>
      </div>

      <div
        className="hero-reveal flex w-full flex-col items-center gap-6"
        style={{ animationDelay: "360ms" }}
      >
        <Divider thin />
        <dl className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-[60px]">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col items-start gap-2">
              <dt className="font-extrabold text-xs uppercase tracking-[0.48px] leading-none text-accent">
                {item.label}
              </dt>
              <dd
                className="font-serif text-base font-medium leading-7 text-ink"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        <Divider thin />
      </div>
    </section>
  );
}
