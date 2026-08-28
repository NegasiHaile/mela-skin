/**
 * THE TREATMENT MENU — what the clinic offers, and how each treatment is sold.
 *
 * SOURCE — Resources/REVISED MENU OF GLO365 - 2025.pdf. Every treatment name,
 * every section and every group below is transcribed from that printed sheet.
 *
 * THERE ARE NO PRICES IN THIS FILE, AND NONE SHOULD BE ADDED.
 *
 * That is a decision, not an omission. From the service-offerings meeting of
 * 26 Aug 2026:
 *
 *   Dr. Abseret Hailu (00:13:54) — "It's not typically routine to disclose
 *   pricing on websites. You want patients to come in for a free consultation …
 *   pricing I would like not to have on a website."
 *
 *   Dr. Abseret Hailu (00:15:01) — "We want patients to feel that we're
 *   tailoring a treatment for them, and not necessarily them selecting
 *   treatments."
 *
 *   Dr. Margaret Gachanja (00:26:27) — "on the aesthetic side, everything will
 *   be tailor made for each person, so maybe putting a blanket figure may not
 *   be ideal."
 *
 *   Aser Hailu (00:33:50) — "we can also have clinic brochures for the
 *   cosmetics / aesthetics stuff, so we don't need to publicise it on the
 *   website." Abseret: "I like that idea a lot."
 *
 * WHY THE FIGURES LEFT THE FILE RATHER THAN JUST THE SCREEN. A constant in
 * this directory is bundled and shipped to the browser. A price that is in the
 * bundle but not rendered is still published — it is one view-source away — so
 * "do not display prices" can only be honoured by not carrying them. The
 * printed sheet in Resources/ remains the clinic's record of them.
 *
 * WHAT IS STILL HERE, and why it is not a price: how each treatment is sold.
 * Single sessions, courses of three, five, ten or twenty, treated areas, and
 * cc of product. Those are units, and a visitor deciding whether a treatment
 * is a one-off or a commitment needs them. Nothing here says what any of it
 * costs.
 *
 * BEFORE LAUNCH: confirm with the clinic that this menu is Mela Skin's own.
 * The source PDF is titled for GLO365 and a few item names ("Glo+ Facial
 * Premium") read as another operator's house branding.
 *
 * Four departures from the printed sheet, recorded rather than made silently:
 *
 *  1. "SHPERE SCULPT FACIAL" is set as "Sphere Sculpt Facial", matching
 *     "SPHERE SCULPT BODY" on the body page.
 *  2. "02 TO Derm" is set as "O2 to Derm", and "NAD+ 3" as "NAD+" — a zero for
 *     an O, and a stray digit that belonged to no tier on the sheet.
 *  3. BOTOX (CROMA) falls inside the biostimulator grid on the printed sheet
 *     purely because of where the layout put it. It is grouped with the other
 *     botulinum toxin item here.
 *  4. GLO2FACIAL and MESOESTETIC PEEL each printed an unreadable fourth tier.
 *     With the figures gone this no longer matters, but the omission stands:
 *     both are listed with the three course lengths the sheet sets clearly.
 */

export type MenuItem = {
  name: string;
  /**
   * How the treatment is sold, in the order the sheet sets it. Either session
   * counts ("Single session", "Course of 5") or units of what is administered
   * ("2 areas", "4cc"). Never a figure.
   */
  formats: string[];
};

export type MenuGroup = {
  name: string;
  items: MenuItem[];
};

export type MenuSection = {
  id: string;
  title: string;
  /** One line under the section head. Written for the site, not lifted. */
  blurb: string;
  groups: MenuGroup[];
};

const SINGLE = "Single session";
const course = (n: number) => `Course of ${n}`;

export const MENU: MenuSection[] = [
  {
    id: "facials",
    title: "Facials",
    blurb:
      "Three families, sorted by what you want out of the hour: barrier repair, tone, or lift. Above them sit the device-led treatments, where the work goes deeper than a facial does.",
    groups: [
      {
        name: "Renewal",
        items: [
          {
            name: "Express Hydra Cleanser",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Clear Blue",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Oxygen Glass Facial",
            formats: [SINGLE, course(5), course(10)],
          },
        ],
      },
      {
        name: "Brightening",
        items: [
          {
            name: "Korean Glass Skin",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "7 Step K-Beauty Ritual",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Red Carpet Ready",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
        ],
      },
      {
        name: "Age defying",
        items: [
          {
            name: "Lift 360 Facial",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "24K Uplift",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Sphere Sculpt Facial",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
        ],
      },
      {
        name: "Advanced facials & peels",
        items: [
          { name: "Glo2Facial", formats: [SINGLE, course(5), course(10)] },
          {
            name: "Glo+ Facial Premium",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Glamour X",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Mesoestetic Peel",
            formats: [SINGLE, course(5), course(10)],
          },
          { name: "BioRePeel", formats: [SINGLE, course(5), course(10)] },
          { name: "Lhala Peel", formats: [SINGLE, course(5), course(10)] },
          {
            name: "Fractional Laser",
            formats: [SINGLE, course(5), course(10)],
          },
          {
            name: "Oxygen Lifting Facial",
            formats: [SINGLE, course(5), course(10)],
          },
          { name: "Virtue RF", formats: [SINGLE, course(5), course(10)] },
        ],
      },
    ],
  },
  {
    id: "rejuvenation",
    title: "Skin rejuvenation",
    blurb:
      "Laser, radiofrequency and ultrasound. Almost everything here runs as a course, because one session of any of it is a sample rather than a result.",
    groups: [
      {
        name: "Laser",
        items: [
          { name: "Skin Gym Combo", formats: [SINGLE, course(5), course(10)] },
          {
            name: "Picosecond Laser",
            formats: [SINGLE, course(5), course(10)],
          },
          { name: "Carbon Laser", formats: [SINGLE, course(5), course(10)] },
          { name: "Fabulips", formats: [SINGLE, course(5), course(10)] },
        ],
      },
      {
        name: "Resurfacing & regeneration",
        items: [
          {
            name: "RF Micro-needling",
            formats: [SINGLE, course(3), course(5)],
          },
          {
            name: "PRP Vampire Facial",
            formats: [SINGLE, course(3), course(5)],
          },
          {
            name: "Exosome Secret Glow",
            formats: [SINGLE, course(3), course(5)],
          },
          {
            name: "Histolab Dermapen",
            formats: [SINGLE, course(5), course(10)],
          },
        ],
      },
      {
        name: "Young Lift",
        items: [
          { name: "HIFU Face", formats: [SINGLE, course(3)] },
          { name: "HIFU Neck / Chin", formats: [SINGLE, course(3), course(5)] },
          { name: "HIFU Golden Eye", formats: [SINGLE, course(3), course(5)] },
          { name: "Wonder Face", formats: [SINGLE, course(5), course(10)] },
        ],
      },
    ],
  },
  {
    id: "body-hair",
    title: "Body & hair",
    blurb:
      "Contouring below the jawline, and the scalp work people come to a dermatology clinic for rather than to a salon.",
    groups: [
      {
        name: "Hair",
        items: [
          {
            name: "Hair Reboot",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Hair Magic Growth",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "PRP / PRF",
            formats: [SINGLE, course(3), course(5), course(10)],
          },
          {
            name: "Exosome Hair",
            formats: [SINGLE, course(3), course(5), course(10)],
          },
        ],
      },
      {
        name: "Body",
        items: [
          {
            name: "Sphere Sculpt Body",
            formats: [SINGLE, course(5), course(10), course(20)],
          },
          {
            name: "Lipotropic",
            formats: [SINGLE, course(3), course(5), course(10)],
          },
          {
            name: "Liposonix",
            formats: [SINGLE, course(3), course(5), course(10)],
          },
          {
            name: "HIFU Body",
            formats: [SINGLE, course(3), course(5), course(10)],
          },
        ],
      },
    ],
  },
  {
    id: "injectables",
    title: "Injectables",
    blurb:
      "Sold by treated area or by volume rather than by appointment, because that is what actually goes in. Every product on this list is named, so ask which one you are getting.",
    groups: [
      {
        name: "Botulinum toxin & filler",
        items: [
          { name: "Botox (Nabota)", formats: ["1 area", "2 areas", "3 areas"] },
          { name: "Botox (Croma)", formats: ["1 area", "2 areas", "3 areas"] },
          { name: "Filler (EPTQ)", formats: ["1cc", "2cc", "3cc"] },
          { name: "Filler (Croma / Aliaxin)", formats: ["1cc", "2cc", "4cc"] },
          { name: "Radiesse / Sculptra", formats: [SINGLE, course(2)] },
        ],
      },
      {
        name: "Biostimulators & skin boosters",
        items: [
          { name: "Profhilo", formats: ["2cc", "4cc", "6cc"] },
          { name: "Profhilo Structura", formats: ["2cc", "4cc", "6cc"] },
          { name: "Polynucleotide", formats: [SINGLE, course(3), course(5)] },
          { name: "Saypha", formats: [SINGLE, course(3), course(5)] },
          { name: "Exocode", formats: [SINGLE, course(3), course(5)] },
          { name: "HA Magic Glow", formats: [SINGLE, course(3), course(5)] },
          { name: "Infini", formats: ["3cc", "6cc", "9cc"] },
        ],
      },
    ],
  },
  {
    id: "add-ons",
    title: "Add-ons",
    blurb:
      "Short treatments, most of them well under an hour. A few are worth booking on their own; most get added to something else on the day.",
    groups: [
      {
        name: "In clinic",
        items: [
          { name: "Hydra Glow", formats: [SINGLE, course(5), course(10)] },
          { name: "Infusion", formats: [SINGLE, course(5), course(10)] },
          { name: "Medical LED", formats: [SINGLE, course(5), course(10)] },
          { name: "O2 to Derm", formats: [SINGLE, course(5), course(10)] },
          { name: "Skin Tag Removal", formats: [SINGLE, course(3), course(5)] },
          { name: "Filler Dissolve", formats: [SINGLE] },
        ],
      },
      {
        name: "IV & infusions",
        items: [
          { name: "IV Drip", formats: [SINGLE, course(5), course(10)] },
          { name: "NAD+", formats: [SINGLE, course(2), course(4)] },
        ],
      },
    ],
  },
];

/** How many treatments one section lists. */
export const sectionItemCount = (section: MenuSection): number =>
  section.groups.reduce((n, group) => n + group.items.length, 0);

/**
 * Total number of treatments on the menu. Quoted in page copy, in the header
 * dropdown and in the structured data, so there is one definition of it.
 *
 * A count is not a price, which is why this survived the figures leaving.
 */
export const MENU_ITEM_COUNT = MENU.reduce(
  (total, section) => total + sectionItemCount(section),
  0,
);

/**
 * How a section is sold, as a phrase rather than a list.
 *
 * The raw `formats` do not summarise: the injectables section alone carries
 * thirteen distinct labels ("1 area" … "9cc"), and printing them comma-separated
 * gives a line nobody reads. This collapses them into the four things a reader
 * actually wants to know — are these one-offs, are there courses and of what
 * length, and is anything sold by area or by volume.
 *
 * Used in the menu page's section head and, in its short form below, in the
 * header dropdown. Both are derived so a change to the menu cannot leave either
 * one describing a section that no longer looks like that.
 */

const COURSE_OF = /^Course of (\d+)$/;
const BY_AREA = /area/i;
const BY_VOLUME = /^\d+cc$/i;

function formatsIn(section: MenuSection): string[] {
  const seen = new Set<string>();
  for (const group of section.groups) {
    for (const item of group.items) {
      for (const format of item.formats) seen.add(format);
    }
  }
  return [...seen];
}

/** "one, two and three" — an Oxford-comma-free list for prose. */
function inSeries(parts: (string | number)[]): string {
  if (parts.length <= 1) return String(parts[0] ?? "");
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

export function sectionOffering(section: MenuSection): string {
  const formats = formatsIn(section);
  const parts: string[] = [];

  if (formats.includes(SINGLE)) parts.push("single sessions");

  const courses = formats
    .map((format) => COURSE_OF.exec(format)?.[1])
    .filter((n): n is string => Boolean(n))
    .map(Number)
    .sort((a, b) => a - b);
  if (courses.length) parts.push(`courses of ${inSeries(courses)}`);

  if (formats.some((format) => BY_AREA.test(format))) parts.push("by treated area");
  if (formats.some((format) => BY_VOLUME.test(format))) parts.push("by volume");

  return inSeries(parts);
}

/**
 * The same in three or four words, for a dropdown row where the long form would
 * wrap onto a second line.
 */
export function sectionOfferingShort(section: MenuSection): string {
  const formats = formatsIn(section);
  const byUnit = formats.some(
    (format) => BY_AREA.test(format) || BY_VOLUME.test(format),
  );
  if (byUnit) return "By area or volume";

  const hasCourses = formats.some((format) => COURSE_OF.test(format));
  const hasSingle = formats.includes(SINGLE);
  if (hasCourses && hasSingle) return "Sessions & courses";
  if (hasCourses) return "Courses";
  return "Single sessions";
}
