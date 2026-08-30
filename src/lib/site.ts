export const EMAIL = "ajmarksberry@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export const RESUME_PATH = "/AJ_Marksberry_Resume_2026.pdf";
/** Name the file lands under on the visitor's machine. */
export const RESUME_FILENAME = "AJ-Marksberry-Resume-2026.pdf";

export const SHOW_ABOUT = false;

export const navLinks = [
  { href: "/projects", label: "Case studies" },
  ...(SHOW_ABOUT ? [{ href: "/about", label: "About" }] : []),
];

/**
 * `hero` is the photograph that represents a case study on the homepage — the
 * banner backdrop and the circle thumbnail both read it. null means "no image of
 * its own yet"; the showcase falls back to a shared placeholder.
 */
export const caseStudies = [
  {
    href: "/projects/taap",
    title: "Expedia TAAP Trips",
    description:
      "From chaos to clarity: three generations that turned a consumer list into a professional agent workspace",
    thumb: "/images/taap/hero-tray.webp",
    hero: "/images/taap/trips-hero.webp",
  },
  {
    href: "/projects/taap-itinerary",
    title: "Expedia TAAP Itinerary Builder",
    description:
      "A new tool that turns scattered bookings into one itinerary agents can share",
    thumb: "/images/itinerary/hero-tray.webp",
    hero: null,
  },
  {
    href: "/projects/reach-ai",
    title: "REACH.ai Booking Dashboard",
    description: "Bringing an outdated experience back to life again",
    thumb: "/images/reach/hero-tray.webp",
    hero: "/images/reach/dashboard-hero.webp",
  },
  {
    href: "/projects/reach-booking",
    title: "REACH.ai booking experience",
    description: "Filling last-minute appointments to capture lost revenue for service providers, built from the ground up",
    thumb: "/images/booking/hero-tray.webp",
    hero: "/images/booking/experience-hero.webp",
  },
] as const;

export type CaseStudyHref = (typeof caseStudies)[number]["href"];
