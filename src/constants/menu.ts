/**
 * EVERY PRICE ON THE SITE. Nothing else in the codebase hard-codes a figure —
 * the home price band, the cosmetic cards, the page metadata and the
 * structured data all read from this file.
 *
 * The priced treatment menu.
 *
 * SOURCE — Resources/REVISED MENU OF GLO365 - 2025.pdf, transcribed item for
 * item and figure for figure. Nothing below is estimated, rounded, averaged or
 * interpolated. Four departures from the printed sheet, listed here rather than
 * made silently:
 *
 *  1. GLO2FACIAL and MESOESTETIC PEEL each print a fourth tier as
 *     "370,000 (10x)" when 10x is already set at 200,000. Whether that fourth
 *     block is 15, 20 or something else cannot be read off the sheet, so the
 *     tier is omitted rather than guessed at.
 *  2. "SHPERE SCULPT FACIAL" is set as "Sphere Sculpt Facial", matching
 *     "SPHERE SCULPT BODY" on the body page.
 *  3. "02 TO Derm" is set as "O2 to Derm", and "NAD+ 3" as "NAD+" — a zero for
 *     an O, and a stray digit that belongs to no tier on the sheet.
 *  4. BOTOX (CROMA) falls inside the biostimulator grid on the printed sheet
 *     purely because of where the layout put it. It is grouped with the other
 *     botulinum toxin item here.
 *
 * The printed sheet carries no service descriptions — those live in
 * `cosmetic.ts`, which maps each family to the menu items it covers. Every
 * price shown anywhere on the site comes from this file and nowhere else.
 *
 * BEFORE LAUNCH: confirm with the clinic that this menu and these figures are
 * Mela Skin's own. The source PDF is titled for GLO365 and a few item names
 * ("Glo+ Facial Premium") read as another operator's house branding. Prices are
 * one file away from being amended or withdrawn.
 */

export type PriceTier = {
  /** Human label — "Single session", "Course of 5", "1 area", "2cc". */
  label: string;
  /** Kenyan shillings, as printed. */
  price: number;
};

export type MenuItem = {
  name: string;
  tiers: PriceTier[];
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
      "Three families, sorted by what you want out of the hour: barrier repair, tone, or lift. The price climbs with what the treatment actually does to the skin.",
    groups: [
      {
        name: "Renewal",
        items: [
          {
            name: "Express Hydra Cleanser",
            tiers: [
              { label: SINGLE, price: 7000 },
              { label: course(5), price: 32000 },
              { label: course(10), price: 52000 },
              { label: course(20), price: 92000 },
            ],
          },
          {
            name: "Clear Blue",
            tiers: [
              { label: SINGLE, price: 15000 },
              { label: course(5), price: 65000 },
              { label: course(10), price: 115000 },
              { label: course(20), price: 210000 },
            ],
          },
          {
            name: "Oxygen Glass Facial",
            tiers: [
              { label: SINGLE, price: 15000 },
              { label: course(5), price: 65000 },
              { label: course(10), price: 115000 },
            ],
          },
        ],
      },
      {
        name: "Brightening",
        items: [
          {
            name: "Korean Glass Skin",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(5), price: 95000 },
              { label: course(10), price: 155000 },
              { label: course(20), price: 285000 },
            ],
          },
          {
            name: "7 Step K-Beauty Ritual",
            tiers: [
              { label: SINGLE, price: 19000 },
              { label: course(5), price: 90000 },
              { label: course(10), price: 130000 },
              { label: course(20), price: 240000 },
            ],
          },
          {
            name: "Red Carpet Ready",
            tiers: [
              { label: SINGLE, price: 19000 },
              { label: course(5), price: 90000 },
              { label: course(10), price: 130000 },
              { label: course(20), price: 240000 },
            ],
          },
        ],
      },
      {
        name: "Age defying",
        items: [
          {
            name: "Lift 360 Facial",
            tiers: [
              { label: SINGLE, price: 15000 },
              { label: course(5), price: 65000 },
              { label: course(10), price: 115000 },
              { label: course(20), price: 210000 },
            ],
          },
          {
            name: "24K Uplift",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(5), price: 95000 },
              { label: course(10), price: 155000 },
              { label: course(20), price: 285000 },
            ],
          },
          {
            name: "Sphere Sculpt Facial",
            tiers: [
              { label: SINGLE, price: 15000 },
              { label: course(5), price: 65000 },
              { label: course(10), price: 115000 },
              { label: course(20), price: 210000 },
            ],
          },
        ],
      },
      {
        name: "Advanced facials & peels",
        items: [
          {
            name: "Glo2Facial",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 120000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "Glo+ Facial Premium",
            tiers: [
              { label: SINGLE, price: 20000 },
              { label: course(5), price: 90000 },
              { label: course(10), price: 160000 },
              { label: course(20), price: 270000 },
            ],
          },
          {
            name: "Glamour X",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(5), price: 95000 },
              { label: course(10), price: 155000 },
              { label: course(20), price: 285000 },
            ],
          },
          {
            name: "Mesoestetic Peel",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 120000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "BioRePeel",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 120000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "Lhala Peel",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 120000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "Fractional Laser",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 130000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "Oxygen Lifting Facial",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 130000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "Virtue RF",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 130000 },
              { label: course(10), price: 200000 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "rejuvenation",
    title: "Skin rejuvenation",
    blurb:
      "Laser, radiofrequency and ultrasound. Almost everything here is priced as a course, because one session of any of it is a sample rather than a result.",
    groups: [
      {
        name: "Laser",
        items: [
          {
            name: "Skin Gym Combo",
            tiers: [
              { label: SINGLE, price: 35000 },
              { label: course(5), price: 160000 },
              { label: course(10), price: 250000 },
            ],
          },
          {
            name: "Picosecond Laser",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 130000 },
              { label: course(10), price: 200000 },
            ],
          },
          {
            name: "Carbon Laser",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(5), price: 95000 },
              { label: course(10), price: 155000 },
            ],
          },
          {
            name: "Fabulips",
            tiers: [
              { label: SINGLE, price: 10000 },
              { label: course(5), price: 40000 },
              { label: course(10), price: 65000 },
            ],
          },
        ],
      },
      {
        name: "Resurfacing & regeneration",
        items: [
          {
            name: "RF Micro-needling",
            tiers: [
              { label: SINGLE, price: 52000 },
              { label: course(3), price: 130000 },
              { label: course(5), price: 200000 },
            ],
          },
          {
            name: "PRP Vampire Facial",
            tiers: [
              { label: SINGLE, price: 42000 },
              { label: course(3), price: 100000 },
              { label: course(5), price: 140000 },
            ],
          },
          {
            name: "Exosome Secret Glow",
            tiers: [
              { label: SINGLE, price: 55000 },
              { label: course(3), price: 130000 },
              { label: course(5), price: 200000 },
            ],
          },
          {
            name: "Histolab Dermapen",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(5), price: 95000 },
              { label: course(10), price: 155000 },
            ],
          },
        ],
      },
      {
        name: "Young Lift",
        items: [
          {
            name: "HIFU Face",
            tiers: [
              { label: SINGLE, price: 75000 },
              { label: course(3), price: 195000 },
            ],
          },
          {
            name: "HIFU Neck / Chin",
            tiers: [
              { label: SINGLE, price: 35000 },
              { label: course(3), price: 90000 },
              { label: course(5), price: 130000 },
            ],
          },
          {
            name: "HIFU Golden Eye",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(3), price: 65000 },
              { label: course(5), price: 95000 },
            ],
          },
          {
            name: "Wonder Face",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(5), price: 120000 },
              { label: course(10), price: 200000 },
            ],
          },
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
            tiers: [
              { label: SINGLE, price: 7000 },
              { label: course(5), price: 32000 },
              { label: course(10), price: 52000 },
              { label: course(20), price: 92000 },
            ],
          },
          {
            name: "Hair Magic Growth",
            tiers: [
              { label: SINGLE, price: 25000 },
              { label: course(5), price: 95000 },
              { label: course(10), price: 155000 },
              { label: course(20), price: 285000 },
            ],
          },
          {
            name: "PRP / PRF",
            tiers: [
              { label: SINGLE, price: 42000 },
              { label: course(3), price: 100000 },
              { label: course(5), price: 140000 },
              { label: course(10), price: 250000 },
            ],
          },
          {
            name: "Exosome Hair",
            tiers: [
              { label: SINGLE, price: 55000 },
              { label: course(3), price: 130000 },
              { label: course(5), price: 200000 },
              { label: course(10), price: 320000 },
            ],
          },
        ],
      },
      {
        name: "Body",
        items: [
          {
            name: "Sphere Sculpt Body",
            tiers: [
              { label: SINGLE, price: 19000 },
              { label: course(5), price: 92000 },
              { label: course(10), price: 160000 },
              { label: course(20), price: 290000 },
            ],
          },
          {
            name: "Lipotropic",
            tiers: [
              { label: SINGLE, price: 45000 },
              { label: course(3), price: 115000 },
              { label: course(5), price: 160000 },
              { label: course(10), price: 260000 },
            ],
          },
          {
            name: "Liposonix",
            tiers: [
              { label: SINGLE, price: 75000 },
              { label: course(3), price: 190000 },
              { label: course(5), price: 290000 },
              { label: course(10), price: 490000 },
            ],
          },
          {
            name: "HIFU Body",
            tiers: [
              { label: SINGLE, price: 92000 },
              { label: course(3), price: 260000 },
              { label: course(5), price: 420000 },
              { label: course(10), price: 690000 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "injectables",
    title: "Injectables",
    blurb:
      "Priced by area or by volume rather than by the hour, so what you pay tracks what actually goes in. Every product on this list is named, so ask which one you are getting.",
    groups: [
      {
        name: "Botulinum toxin & filler",
        items: [
          {
            name: "Botox (Nabota)",
            tiers: [
              { label: "1 area", price: 35000 },
              { label: "2 areas", price: 55000 },
              { label: "3 areas", price: 75000 },
            ],
          },
          {
            name: "Botox (Croma)",
            tiers: [
              { label: "1 area", price: 45000 },
              { label: "2 areas", price: 80000 },
              { label: "3 areas", price: 112000 },
            ],
          },
          {
            name: "Filler (EPTQ)",
            tiers: [
              { label: "1cc", price: 55000 },
              { label: "2cc", price: 95000 },
              { label: "3cc", price: 130000 },
            ],
          },
          {
            name: "Filler (Croma / Aliaxin)",
            tiers: [
              { label: "1cc", price: 75000 },
              { label: "2cc", price: 125000 },
              { label: "4cc", price: 215000 },
            ],
          },
          {
            name: "Radiesse / Sculptra",
            tiers: [
              { label: SINGLE, price: 125000 },
              { label: course(2), price: 225000 },
            ],
          },
        ],
      },
      {
        name: "Biostimulators & skin boosters",
        items: [
          {
            name: "Profhilo",
            tiers: [
              { label: "2cc", price: 70000 },
              { label: "4cc", price: 130000 },
              { label: "6cc", price: 200000 },
            ],
          },
          {
            name: "Profhilo Structura",
            tiers: [
              { label: "2cc", price: 125000 },
              { label: "4cc", price: 225000 },
              { label: "6cc", price: 300000 },
            ],
          },
          {
            name: "Polynucleotide",
            tiers: [
              { label: SINGLE, price: 80000 },
              { label: course(3), price: 210000 },
              { label: course(5), price: 330000 },
            ],
          },
          {
            name: "Saypha",
            tiers: [
              { label: SINGLE, price: 55000 },
              { label: course(3), price: 145000 },
              { label: course(5), price: 235000 },
            ],
          },
          {
            name: "Exocode",
            tiers: [
              { label: SINGLE, price: 75000 },
              { label: course(3), price: 190000 },
              { label: course(5), price: 280000 },
            ],
          },
          {
            name: "HA Magic Glow",
            tiers: [
              { label: SINGLE, price: 40000 },
              { label: course(3), price: 105000 },
              { label: course(5), price: 165000 },
            ],
          },
          {
            name: "Infini",
            tiers: [
              { label: "3cc", price: 80000 },
              { label: "6cc", price: 140000 },
              { label: "9cc", price: 200000 },
            ],
          },
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
          {
            name: "Hydra Glow",
            tiers: [
              { label: SINGLE, price: 4000 },
              { label: course(5), price: 16000 },
              { label: course(10), price: 30000 },
            ],
          },
          {
            name: "Infusion",
            tiers: [
              { label: SINGLE, price: 4000 },
              { label: course(5), price: 16000 },
              { label: course(10), price: 30000 },
            ],
          },
          {
            name: "Medical LED",
            tiers: [
              { label: SINGLE, price: 5000 },
              { label: course(5), price: 20000 },
              { label: course(10), price: 40000 },
            ],
          },
          {
            name: "O2 to Derm",
            tiers: [
              { label: SINGLE, price: 5000 },
              { label: course(5), price: 20000 },
              { label: course(10), price: 40000 },
            ],
          },
          {
            name: "Skin Tag Removal",
            tiers: [
              { label: SINGLE, price: 20000 },
              { label: course(3), price: 50000 },
              { label: course(5), price: 75000 },
            ],
          },
          {
            name: "Filler Dissolve",
            tiers: [{ label: SINGLE, price: 19500 }],
          },
        ],
      },
      {
        name: "IV & infusions",
        items: [
          {
            name: "IV Drip",
            tiers: [
              { label: SINGLE, price: 32000 },
              { label: course(5), price: 130000 },
              { label: course(10), price: 210000 },
            ],
          },
          {
            name: "NAD+",
            tiers: [
              { label: SINGLE, price: 30000 },
              { label: course(2), price: 55000 },
              { label: course(4), price: 100000 },
            ],
          },
        ],
      },
    ],
  },
];

/**
 * Thousands separators without `toLocaleString`, which resolves against the
 * runtime's own locale data and can disagree between the prerender and the
 * browser. Prices have to be byte-identical on both sides or React rehydrates
 * over them.
 */
export function kes(amount: number): string {
  return `KES ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

/** Every price in a section, flattened — used for the "from" figures. */
function pricesIn(sectionId: string): number[] {
  const section = MENU.find((s) => s.id === sectionId);
  if (!section) return [];
  return section.groups.flatMap((group) =>
    group.items.flatMap((item) => item.tiers.map((tier) => tier.price)),
  );
}

/** Lowest figure in a section. The "from" price on overview cards. */
export function fromPrice(sectionId: string): number {
  const prices = pricesIn(sectionId);
  return prices.length ? Math.min(...prices) : 0;
}

/** Lowest figure for one named group inside a section. */
export function fromPriceForGroup(sectionId: string, groupName: string): number {
  const section = MENU.find((s) => s.id === sectionId);
  const group = section?.groups.find((g) => g.name === groupName);
  if (!group) return 0;
  const prices = group.items.flatMap((item) => item.tiers.map((t) => t.price));
  return prices.length ? Math.min(...prices) : 0;
}

/** Lowest figure for one named item, wherever it sits. */
export function fromPriceForItem(itemName: string): number {
  for (const section of MENU) {
    for (const group of section.groups) {
      const item = group.items.find((i) => i.name === itemName);
      if (item) return Math.min(...item.tiers.map((t) => t.price));
    }
  }
  return 0;
}

/** How many priced items one section lists. */
export const sectionItemCount = (section: MenuSection): number =>
  section.groups.reduce((n, group) => n + group.items.length, 0);

/**
 * Lowest published figure inside one section — the cheapest tier of the
 * cheapest item, whether that tier is a single session or a course.
 */
export const sectionFrom = (section: MenuSection): number =>
  Math.min(
    ...section.groups.flatMap((group) =>
      group.items.flatMap((item) => item.tiers.map((tier) => tier.price)),
    ),
  );

/**
 * The totals, derived from the per-section figures rather than walking the
 * tree a second time. Both are quoted in page copy, in the header dropdown and
 * in the JSON-LD, so there is one definition of each.
 */

/** Total number of priced items on the menu. */
export const MENU_ITEM_COUNT = MENU.reduce(
  (total, section) => total + sectionItemCount(section),
  0,
);

/** Lowest published figure anywhere on the menu. */
export const MENU_FROM = Math.min(...MENU.map(sectionFrom));
