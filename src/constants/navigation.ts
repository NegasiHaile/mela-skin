/**
 * Where the site links to itself: the header bar, the footer columns and the
 * legal row.
 *
 * The footer columns are generated from the service data rather than typed
 * out, so a condition added to ./conditions.ts or a section added to ./menu.ts
 * turns up in the footer without anyone remembering to come here.
 */

import { brand } from "./brand";
import { CONDITIONS } from "./conditions";
import { COMING_SOON } from "./cosmetic";
import {
  MENU,
  MENU_ITEM_COUNT,
  sectionItemCount,
  sectionOfferingShort,
} from "./menu";

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

/** A row inside a header list panel: a name and what is behind it. */
export type NavRow = NavLink & {
  /** How much is behind the link — "18 treatments". */
  meta: string;
  /**
   * How the section is sold, in three words — "Sessions & courses", "By area
   * or volume". It replaced the from-price that used to sit here; a visitor
   * opening this panel wants to know whether they are looking at one-off
   * treatments or a commitment, and that is the part we can answer honestly
   * without publishing a figure.
   */
  offered: string;
};

/**
 * The list panel. Five sections and what each holds, then a row for the page as
 * a whole — the same thing the trigger itself does, but reachable without
 * having to guess that the trigger is also a link.
 */
export type NavList = {
  rows: NavRow[];
  all: NavLink;
};

export type NavItem = NavLink & {
  /** A card panel: a picture, a name and a line each. */
  children?: NavChild[];
  /** A list panel: one ruled row per section, with its count and how it sells. */
  list?: NavList;
  /**
   * A service named beside a card panel's rows, with no link of its own — kept
   * off `children` on purpose. `children` drives both `NAV_FLAT` and
   * `coveredBy` below, which both assume every entry actually goes somewhere;
   * a `comingSoon` entry does not, so it stays out of each rather than
   * carrying a placeholder `href` neither is built to recognise as fake.
   */
  comingSoon?: { label: string; badge: string };
};

/**
 * The header bar. Absolute paths rather than fragments, because the same bar
 * has to work from /treatment-menu as it does from the home page.
 *
 * Four items. There is no Contact item — see the note at the foot of the list.
 *
 * Medical and cosmetic used to be two top-level items, which asked a visitor
 * to know which half of dermatology their problem belongs to before they could
 * click anything. They are one "Treatments" panel now, with a line each
 * explaining the difference.
 *
 * Two items open panels, and they are deliberately different shapes.
 * Treatments is a pair of picture cards, because the choice there is which half
 * of dermatology you need. Service menu is a list of the five menu sections
 * with a count and how each is sold, because the question there is what the
 * clinic offers and in what shape, and a picture cannot answer it.
 *
 * Both keep an `href` that points somewhere real, so each trigger still works
 * as a plain link for anyone who taps or clicks it rather than hovers.
 *
 * THE FIRST ITEM IS "DERMATOLOGY" AND WAS "TREATMENTS", changed at the 1 Sep
 * daily. Two reasons. It sat next to "Service menu", so the bar opened on two
 * items beginning with the same word and a reader had to compare the second word
 * of each to tell them apart. And the two things behind it are medical
 * dermatology and cosmetic dermatology, so the word that covers both of them is
 * the one they share — a dermatology clinic's nav should say what it practises,
 * not what it does to you.
 */
export const nav: NavItem[] = [
  {
    label: "Dermatology",
    href: "/medical-dermatology",
    children: [
      {
        label: "Medical dermatology",
        href: "/medical-dermatology",
        description:
          `${CONDITIONS.length} conditions diagnosed before they are treated, from acne, eczema and hair loss through psoriasis, melasma and mole checks.`,
        image: "/images/medcal-dermatology-treatment.webp",
        imageAlt: "A dermatologist examining a patient's skin at Mela Skin",
      },
      {
        label: "Cosmetic dermatology",
        href: "/cosmetic-dermatology",
        description:
          "Injectables, fillers, boosters, PRP, hair, facials, peels, laser and body work, tailored and quoted at a complimentary consultation.",
        image: "/images/cosmotic-dermatology-treatment.webp",
        imageAlt: "Cosmetic dermatology treatments at Mela Skin",
      },
    ],
    /**
     * Named here, not linked anywhere — its own band on /cosmetic-dermatology
     * came off on request, and the home page's card is inert for the same
     * reason (see constants/copy.ts -> HOME.pillars). `COMING_SOON.title`
     * rather than a retyped string, so the one place this service is named
     * differently from "Laser hair removal" is nowhere.
     */
    comingSoon: { label: COMING_SOON.title, badge: "Coming soon" },
  },
  {
    label: "Treatment menu",
    href: "/treatment-menu",
    /*
      Generated from ./menu.ts, so a section added or renamed there turns up
      here and the counts in the panel can never drift from the page they link
      into.

      This used to be "Menu & prices" with a from-price against every row. The
      26 Aug meeting removed pricing from the site, so the label lost the word
      and the rows lost the figure — see the header of ./menu.ts.
    */
    list: {
      rows: MENU.map((section) => {
        const count = sectionItemCount(section);
        return {
          label: section.title,
          href: `/treatment-menu#${section.id}`,
          meta: `${count} service${count === 1 ? "" : "s"}`,
          offered: sectionOfferingShort(section),
        };
      }),
      all: {
        label: `All ${MENU_ITEM_COUNT} services`,
        href: "/treatment-menu",
      },
    },
  },
  /*
    SKINCARE OFF THE TOP BAR, for now -- the clinic does not have the shelf
    stocked yet (see constants/copy.ts -> HOME.skincare / the page's own aside:
    "the shelf is being chosen now"), so linking to it from primary nav offers
    something that is not there. The route, the page and its content are
    untouched: /skincare still exists and works, it is just not advertised in
    the bar until there is a shelf behind it. Uncomment the line below to
    bring it back.

    { label: "Skincare", href: "/skincare" },
  */
  { label: "About", href: "/about" },
  /*
    NO CONTACT ITEM. The "Book now" pill sits two centimetres to its right and
    goes to the same page, so the bar was offering /contact twice. It is still
    reachable from every route: the pill, each page hero's second button, the
    BookingCta band that closes every route, the footer's "Contact & directions",
    and the mobile menu's own booking button and tap-to-call rows.
  */
];

/**
 * The same list with every card-panel child promoted to the top level. For
 * consumers that render a plain row of links and have nowhere to put a panel.
 *
 * The list panel's rows are not promoted: they are anchors into the page its
 * trigger already points at, so flattening them would repeat one destination
 * six times.
 */
export const NAV_FLAT: NavLink[] = nav.flatMap((item) =>
  item.children
    ? item.children.map(({ label, href }) => ({ label, href }))
    : [{ label: item.label, href: item.href }],
);

/**
 * THE FOOTER'S "DERMATOLOGY" COLUMN IS THE TOP BAR'S, not a second list of its
 * own. It used to be two footer columns, "Medical" and "Cosmetic", each
 * listing five conditions or families by name; merged into one column on
 * request, headed the same as the bar's own item and holding exactly the two
 * links that item's dropdown does — nothing per-condition or per-family down
 * here any more. Read off `nav` itself rather than retyped, so the footer
 * cannot say something different from the bar three lines above it.
 */
const dermatologyItem = nav.find((item) => item.label === "Dermatology");
if (!dermatologyItem?.children) {
  throw new Error(
    'constants/navigation.ts: no "Dermatology" nav item with children found for the footer to read.',
  );
}
const dermatologyLinks: NavLink[] = dermatologyItem.children.map(
  ({ label, href }) => ({ label, href }),
);

/** Three columns, which is what divides evenly against the brand block at lg. */
export const FOOTER_COLUMNS: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Dermatology",
    links: dermatologyLinks,
  },
  {
    heading: "Treatment menu",
    links: MENU.map((section) => ({
      label: section.title,
      href: `/treatment-menu#${section.id}`,
    })),
  },
  {
    heading: "Clinic",
    /*
      "Skin assessment", "Skincare" and "Your visit" came off this list on
      request. The email moved onto the end of it the same request, in place
      of its own band further down the footer -- see the note on the removed
      contact band in components/SiteFooter.tsx -- rendered exactly like the
      three links above it rather than in the larger standalone style that
      band used.
    */
    links: [
      { label: "About the clinic", href: "/about" },
      { label: "How we work", href: "/about#principles" },
      { label: "Contact & directions", href: "/contact" },
      { label: brand.email, href: `mailto:${brand.email}` },
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
  { heading: "Dermatology", links: dermatologyLinks },
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
