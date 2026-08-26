/**
 * Where the site links to itself: the header bar, the footer columns and the
 * legal row.
 *
 * The footer columns are generated from the service data rather than typed
 * out, so a condition added to ./conditions.ts or a section added to ./menu.ts
 * turns up in the footer without anyone remembering to come here.
 */

import { CONDITIONS } from "./conditions";
import { COSMETIC } from "./cosmetic";
import { MENU } from "./menu";

export type NavLink = { label: string; href: string };

/** A card inside a header dropdown: a picture, a name and a line about it. */
export type NavChild = NavLink & {
  /** One or two lines. Read at ~14px, so keep it short enough to scan. */
  description: string;
  /**
   * A real file in /public/images. Both are dense 3:2 collages, so they are
   * centre-cropped in the panel: the medical one lands on the clinician and
   * patient, the cosmetic one on the model.
   */
  image: string;
  imageAlt: string;
};

export type NavItem = NavLink & {
  /** Present on the one item that opens a panel rather than navigating. */
  children?: NavChild[];
};

/**
 * The header bar. Absolute paths rather than fragments, because the same bar
 * has to work from /treatment-menu as it does from the home page.
 *
 * Medical and cosmetic used to be two top-level items, which asked a visitor
 * to know which half of dermatology their problem belongs to before they could
 * click anything. They are one "Treatments" panel now, with a line each
 * explaining the difference. Its `href` still points somewhere real, so the
 * trigger works as a link for anyone who taps or clicks it rather than hovers.
 */
export const nav: NavItem[] = [
  {
    label: "Treatments",
    href: "/medical-dermatology",
    children: [
      {
        label: "Medical dermatology",
        href: "/medical-dermatology",
        description:
          "Ten conditions diagnosed before they are treated, from acne and eczema through psoriasis, melasma and mole checks.",
        image: "/images/medcal-dermatology-treatment.webp",
        imageAlt: "A dermatologist examining a patient's skin at Mela Skin",
      },
      {
        label: "Cosmetic dermatology",
        href: "/cosmetic-dermatology",
        description:
          "Injectables, fillers, boosters, PRP, hair, facials, peels, laser and body work, every one with a published price.",
        image: "/images/cosmotic-dermatology-treatment.webp",
        imageAlt: "Cosmetic dermatology treatments at Mela Skin",
      },
    ],
  },
  { label: "Menu & prices", href: "/treatment-menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * The same list with every dropdown child promoted to the top level. For
 * consumers that render a plain row of links and have nowhere to put a panel.
 */
export const NAV_FLAT: NavLink[] = nav.flatMap((item) =>
  item.children
    ? item.children.map(({ label, href }) => ({ label, href }))
    : [{ label: item.label, href: item.href }],
);

const conditionLinks = (count: number): NavLink[] =>
  CONDITIONS.slice(0, count).map((condition) => ({
    label: condition.title,
    href: `/medical-dermatology#${condition.slug}`,
  }));

const familyLinks = (count: number): NavLink[] =>
  COSMETIC.slice(0, count).map((family) => ({
    label: family.title,
    href: `/cosmetic-dermatology#${family.slug}`,
  }));

/** Four columns, which is what divides evenly against the brand block at lg. */
export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Medical",
    links: [
      ...conditionLinks(5),
      { label: `All ${CONDITIONS.length} conditions`, href: "/medical-dermatology" },
    ],
  },
  {
    heading: "Cosmetic",
    links: [
      ...familyLinks(5),
      { label: "Every treatment", href: "/cosmetic-dermatology" },
    ],
  },
  {
    heading: "Menu & prices",
    links: MENU.map((section) => ({
      label: section.title,
      href: `/treatment-menu#${section.id}`,
    })),
  },
  {
    heading: "Clinic",
    links: [
      { label: "About the clinic", href: "/about" },
      { label: "How we work", href: "/about#principles" },
      { label: "Skin assessment", href: "/about#assessment" },
      { label: "Your visit", href: "/#visit" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Contact & directions", href: "/contact" },
    ],
  },
];

/**
 * The editorial direction's narrower footer. Same data, shorter columns.
 *
 * There is no legal column. Privacy, terms and complaints were placeholders
 * pointing at `#`, and a dead link in a footer is worse than an absent one —
 * add them back here when the pages exist.
 */
export const FOOTER_COLUMNS_COMPACT: { heading: string; links: NavLink[] }[] = [
  { heading: "Medical", links: conditionLinks(4) },
  { heading: "Cosmetic", links: familyLinks(4) },
  {
    heading: "Clinic",
    links: [
      { label: "About the clinic", href: "/about" },
      { label: "Your visit", href: "#visit" },
      { label: "Reviews", href: "#reviews" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
