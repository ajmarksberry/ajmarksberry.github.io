import type { ExpediaWorkItem } from "@/lib/expedia-work";

/**
 * Content for the "Visual design" page. Same shape, and the same renderer, as
 * the Expedia work page (see expedia-work.ts for what each field does). These
 * are single-image entries with a caption; `description` is left out.
 *
 * Images live in public/images/visual-design/, exported from the "other
 * designs" frame in the AJM Portfolio 2026 - 2027 Figma file (node 8110:3453).
 */
export const visualDesign: readonly ExpediaWorkItem[] = [
  {
    id: "security-workbench",
    title: "Security analytics workbench",
    images: [
      {
        src: "/images/visual-design/workbench.webp",
        alt: "A dark analytics workbench: a search bar and filters above an activity histogram, with a table of devices listing type, operating system, activity, and a notable-artifacts count",
        width: 2000,
        height: 1096,
        bare: true,
        caption:
          "A workbench for investigating the devices, domains, and activity on a network.",
      },
    ],
  },
  {
    id: "rockin-refuel",
    title: "Rockin’ Refuel",
    images: [
      {
        src: "/images/visual-design/rockin-refuel.webp",
        alt: "The Rockin’ Refuel homepage: a rotating banner of athletes and protein milk bottles, upcoming events, a product locator, and a featured team member",
        width: 1380,
        height: 1936,
        bare: true,
        caption:
          "Homepage for a protein milk brand, built around its athletes, events, and a product locator.",
      },
    ],
  },
  {
    id: "cowtown-skateboards",
    title: "Cowtown Skateboards",
    images: [
      {
        src: "/images/visual-design/cowtown.webp",
        alt: "The Cowtown Skateboards homepage: a bold navigation header, a skater hero photo, featured products, news and events, and store locations",
        width: 982,
        height: 2000,
        bare: true,
        caption:
          "Ecommerce homepage for a skate shop, with featured products, news and events, and store locations.",
      },
    ],
  },
  {
    id: "millennium-three",
    title: "Millennium Three snowboards",
    images: [
      {
        src: "/images/visual-design/m3-snowboards.webp",
        alt: "A Millennium Three product page for women’s snowboards: each board shown with its graphics, a short description, and a table of construction features",
        width: 798,
        height: 1966,
        bare: true,
        caption:
          "The women’s snowboard line, with each board’s graphics and construction features side by side.",
      },
    ],
  },
  {
    id: "hardware-mobile",
    title: "Madesmart website",
    images: [
      {
        src: "/images/visual-design/hardware-mobile.webp",
        alt: "Two phone screens: a menu of color-coded product collections for kitchen and office, and an About us page with a portrait and a welcome message",
        width: 1396,
        height: 1348,
        bare: true,
        caption: "Mobile views of the Madesmart website.",
      },
    ],
  },
  {
    id: "revolution-parts",
    title: "Revolution Parts",
    stacked: true,
    images: [
      {
        src: "/images/visual-design/revolution-parts.webp",
        alt: "The Revolution Parts marketing homepage: a headline about selling auto parts online, a row of usage stats, and three reasons to choose the platform",
        width: 1685,
        height: 1906,
        bare: true,
        caption:
          "Marketing site for an online auto parts platform, leading with its numbers.",
      },
      {
        src: "/images/visual-design/revolution-nissan.webp",
        alt: "A branded Revolution Parts storefront for an official Nissan parts center, with a year, make, and model picker, vehicle types, and popular parts categories",
        width: 1396,
        height: 1923,
        bare: true,
        caption:
          "A branded storefront for an official Nissan parts center, with vehicle lookup and popular categories.",
      },
    ],
  },
];
