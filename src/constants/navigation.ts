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

/**
 * The header bar. Absolute paths rather than fragments, because the same bar
 * has to work from /treatment-menu as it does from the home page. `/#clinic`
 * points at a section that only exists on the home page, which is why it keeps
 * the leading slash.
 */
export const nav: NavLink[] = [
  { label: "Medical", href: "/medical-dermatology" },
  { label: "Cosmetic", href: "/cosmetic-dermatology" },
  { label: "Menu & prices", href: "/treatment-menu" },
  { label: "The clinic", href: "/#clinic" },
];

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
      { label: "Your visit", href: "/#visit" },
      { label: "The clinician", href: "/#clinic" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Book a consultation", href: "#book" },
    ],
  },
];

/**
 * Not written yet. They render as dead `#` links on purpose rather than as
 * invented policy text — point them at real pages when those exist.
 */
export const LEGAL: NavLink[] = [
  { label: "Privacy notice", href: "#" },
  { label: "Patient terms", href: "#" },
  { label: "Complaints", href: "#" },
];

/** The editorial direction's narrower footer. Same data, shorter columns. */
export const FOOTER_COLUMNS_COMPACT: { heading: string; links: NavLink[] }[] = [
  { heading: "Medical", links: conditionLinks(4) },
  { heading: "Cosmetic", links: familyLinks(4) },
  {
    heading: "Clinic",
    links: [
      { label: "Your visit", href: "#visit" },
      { label: "The clinic", href: "#clinic" },
      { label: "Reviews", href: "#reviews" },
      { label: "Book", href: "#book" },
    ],
  },
  { heading: "Legal", links: LEGAL },
];
