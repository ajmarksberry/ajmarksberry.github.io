import Image from "next/image";
import { Divider } from "@/components/Divider";
import { ReachLogo } from "@/components/ReachLogo";

const meta = [
  { label: "Client", value: "REACH.ai" },
  { label: "Role", value: "Lead product designer" },
  { label: "Duration", value: "2020-2022" },
  { label: "Tools", value: "Figma · Principle" },
] as const;

export function HeroBlock() {
  return (
    <section className="flex w-full flex-col items-start py-10">
      <div className="flex w-full max-w-[620px] flex-col items-start gap-6 pb-10">
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
          className="hero-reveal w-full text-lg leading-7 text-ink sm:text-xl"
          style={{ fontFeatureSettings: '"liga" 0', animationDelay: "240ms" }}
        >
          Bringing an outdated experience back to life again
        </p>
      </div>

      <div className="hero-devices w-full overflow-hidden rounded-none">
        <Image
          src="/images/reach/hero-tray.webp"
          alt="REACH.ai dashboard shown on desktop and mobile"
          width={2560}
          height={1322}
          className="block h-auto w-full rounded-none"
          priority
          unoptimized
          sizes="(min-width: 1140px) 980px, (min-width: 1024px) calc(100vw - 160px), calc(100vw - 40px)"
        />
      </div>

      <div
        className="hero-reveal flex w-full flex-col items-center gap-6"
        style={{ animationDelay: "360ms" }}
      >
        <Divider />
        <dl className="flex w-full flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-start lg:justify-center lg:gap-x-[60px] lg:gap-y-6">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col items-start gap-2">
              <dt className="font-extrabold text-xs uppercase tracking-[0.48px] leading-none text-accent">
                {item.label}
              </dt>
              <dd
                className="whitespace-nowrap text-base font-semibold leading-7 text-ink"
                style={{ fontFeatureSettings: '"liga" 0' }}
              >
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
        <Divider />
      </div>
    </section>
  );
}
