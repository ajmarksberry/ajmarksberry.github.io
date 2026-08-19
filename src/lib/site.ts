export const EMAIL = "ajmarksberry@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

export const SHOW_ABOUT = false;

export const navLinks = [
  { href: "/projects", label: "Case studies" },
  ...(SHOW_ABOUT ? [{ href: "/about", label: "About" }] : []),
  { href: "/contact", label: "Contact" },
];

export const caseStudies = [
  {
    href: "/projects/taap",
    label: "Trips on TAAP",
    title: "Trips on TAAP",
    description: "From a confusing experience, to a professional-grade agent tool",
    thumb: "/images/taap/hero-tray.webp",
  },
  {
    href: "/projects/taap-itinerary",
    label: "TAAP Itinerary builder",
    title: "TAAP Itinerary builder",
    description: "From a confusing experience, to a professional-grade agent tool",
    thumb: "/images/itinerary/hero-tray.webp",
  },
  {
    href: "/projects/reach-ai",
    label: "REACH.ai dashboard",
    title: "REACH.ai / Booking Dashboard",
    description: "Bringing an outdated experience back to life again",
    thumb: "/images/reach/hero-tray.webp",
  },
  {
    href: "/projects/reach-booking",
    label: "REACH.ai booking",
    title: "REACH.ai / booking experience",
    description: "Filling last-minute appointments to capture lost revenue for service providers, built from the ground up",
    thumb: "/images/booking/hero-tray.webp",
  },
] as const;

export type CaseStudyHref = (typeof caseStudies)[number]["href"];
