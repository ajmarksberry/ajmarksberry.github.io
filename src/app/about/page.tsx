import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DownloadIcon } from "@/components/Icons";
import { MarketingPage } from "@/components/MarketingPage";
import {
  EMAIL,
  MAILTO,
  RESUME_FILENAME,
  RESUME_PATH,
  SHOW_ABOUT,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About | AJ Marksberry",
  description:
    "Senior Product Designer with 27+ years turning complex business challenges into intuitive, human-centered digital products.",
};

const expertise = [
  "Product Design",
  "UX Strategy",
  "User Research & Validation",
  "Information Architecture",
  "Interaction Design",
  "Accessibility",
  "Design Systems",
  "Enterprise SaaS Platforms",
  "Journey Mapping",
  "Stakeholder Facilitation",
  "Visual Design",
] as const;

/** Same treatment as the homepage's contact row. */
const linkClass =
  "font-semibold text-base leading-7 text-ink transition-opacity duration-200 ease-out hover:opacity-60";

export default function AboutPage() {
  if (!SHOW_ABOUT) notFound();

  return (
    <MarketingPage
      overline="About"
      title="AJ Marksberry"
      description="I'm a Senior Product Designer with 27+ years of experience helping organizations transform complex business challenges into intuitive, human-centered digital products."
      showFooter={false}
    >
      <div className="flex w-full max-w-[640px] flex-col gap-10 lg:max-w-full">
        <div className="flex w-full max-w-[640px] flex-col gap-6 text-base leading-7 text-ink">
          <p>
            Throughout my career, I&rsquo;ve partnered with startups, SaaS
            companies, enterprise organizations, healthcare providers, agencies,
            and global brands to create experiences that improve customer
            outcomes while supporting business goals.
          </p>
          <p>
            Currently, I design enterprise experiences for Expedia Group&rsquo;s
            Travel Agent Affiliate Program (TAAP), where I lead UX initiatives
            focused on trip management, itinerary creation, post-booking
            experiences, advisor productivity tools, and workflow optimization.
          </p>
        </div>

        <section
          aria-labelledby="expertise-heading"
          className="flex w-full flex-col gap-6 border-t border-rule pt-8"
        >
          <h2
            id="expertise-heading"
            className="font-extrabold text-2xl leading-8 tracking-[-0.24px] text-heading sm:text-[30px] sm:leading-10"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Expertise
          </h2>
          <ul className="grid w-full grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-[10px] size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="text-base leading-7 text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* The rule spans the full column like the Expertise one above it; the
         * prose keeps its 640px measure on an inner wrapper. */}
        <div className="w-full border-t border-rule pt-8">
          <div className="flex w-full max-w-[640px] flex-col gap-6 text-base leading-7 text-ink">
            <p>
              I enjoy simplifying complexity, aligning teams around customer
              needs, and creating experiences that are useful, usable,
              accessible, and valuable.
            </p>
            <p>
              Over the years, I&rsquo;ve worked across travel, healthcare,
              insurance, communications, hospitality, ecommerce, and emerging
              technology industries, partnering closely with Product,
              Engineering, Research, Content Design, and business stakeholders
              to bring ideas from discovery through delivery.
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-[640px] flex-col items-start gap-4 rounded-lg bg-surface p-6 sm:p-8 lg:max-w-[760px]">
          <p className="font-extrabold text-xs uppercase leading-none text-accent">
            Open to work
          </p>
          <p
            className="text-base leading-7 text-heading sm:text-lg sm:leading-8"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            I&rsquo;m currently open to Senior Product Designer, Lead Product
            Designer, Principal Product Designer, and UX Leadership
            opportunities.
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={MAILTO}
              className={`${linkClass} underline underline-offset-4`}
            >
              {EMAIL}
            </a>
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className={`group inline-flex items-center gap-2 ${linkClass}`}
            >
              <DownloadIcon className="size-5 shrink-0" />
              <span className="underline underline-offset-4">Resume</span>
            </a>
          </div>
        </div>
      </div>
    </MarketingPage>
  );
}
