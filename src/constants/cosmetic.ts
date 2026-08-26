/**
 * COSMETIC DERMATOLOGY — the ten treatment families, and the one service that
 * is not open yet.
 *
 * SOURCE — Resources/more-info.md, sections 2 and 3. That brief names five
 * cosmetic families (injectables, IV, filler, PRP & PRF, facials) and marks
 * laser hair removal as coming soon. The list runs to ten here because the
 * priced menu in ./menu.ts also sells peels, laser, HIFU, biostimulators, hair
 * and body contouring that those five headings do not name. Splitting them out
 * is a grouping decision, not an invented service — every family maps to items
 * that are already on the menu, and `menuItems` says which.
 *
 * `menuItems` is load-bearing: the "from" price on every card is the lowest
 * figure across those named items, looked up from ./menu.ts. Get a name wrong
 * and the card silently shows the wrong price, so they must match the menu
 * exactly.
 *
 * `image` is optional. Five families have real photography in /public/images;
 * the rest render a brand-ground panel with the treatment mark set large. That
 * is a deliberate finish — do not fill the gap with stock photography.
 */

import { fromPriceForItem } from "./menu";

export type CosmeticFamily = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  /** Menu item names this family covers. Drives the "from" price. */
  menuItems: string[];
  /** Section id in menu.ts, for the anchor link. */
  menuSection: string;
  icon: string;
  /** Only where a real photograph exists in /public/images. */
  image?: string;
};

export const COSMETIC: CosmeticFamily[] = [
  {
    slug: "injectables",
    title: "Injectables",
    summary: "Softens the lines that come from movement. Priced by area, not by hour.",
    body: "Botulinum toxin relaxes the specific muscles that fold the skin — the horizontal lines across the forehead, the vertical ones between the brows, the creases at the outer eye. It does very little for lines that are already there when your face is at rest, which is the single most useful thing to know before booking. It also wears off. That is the point: the dose can be adjusted next time rather than lived with.",
    menuItems: ["Botox (Nabota)", "Botox (Croma)"],
    menuSection: "injectables",
    icon: "injectable",
    image: "/images/injectables.png",
  },
  {
    slug: "fillers",
    title: "Fillers",
    summary: "Volume where volume has gone. Priced per cc, so you pay for what goes in.",
    body: "Hyaluronic acid gels restore structure to cheeks, chin, jawline, tear troughs and lips. The unit is the cc rather than the appointment, which means the number on the menu is the number for the product itself. Radiesse and Sculptra work differently again — they prompt your own collagen over months rather than filling on the day. And if you want something undone, Filler Dissolve is on the add-ons list at a published price.",
    menuItems: ["Filler (EPTQ)", "Filler (Croma / Aliaxin)", "Radiesse / Sculptra"],
    menuSection: "injectables",
    icon: "booster",
  },
  {
    slug: "skin-boosters",
    title: "Skin boosters & biostimulators",
    summary: "Not filler. These change how the skin behaves rather than its shape.",
    body: "Profhilo, polynucleotides, Saypha, Exocode and HA Magic Glow go into the skin to improve hydration, firmness and quality across a whole area, rather than to build a contour in one place. Most run as a short course a few weeks apart. If someone offers you “filler” and hands you one of these, they are not the same treatment and they should not carry the same price.",
    menuItems: [
      "Profhilo",
      "Profhilo Structura",
      "Polynucleotide",
      "Saypha",
      "Exocode",
      "HA Magic Glow",
      "Infini",
    ],
    menuSection: "injectables",
    icon: "boosterAlt",
    image: "/images/skin-boosters-microneedling.png",
  },
  {
    slug: "prp-prf",
    title: "PRP & PRF",
    summary: "Your own blood, concentrated and put back. For thinning hair and for skin.",
    body: "A small draw is spun down to concentrate the platelets, then placed into the scalp for hair thinning or into the face as a rejuvenation treatment. PRF is the fibrin-rich variant of the same idea. Either way it is course work, which is why the menu prices it in threes and fives rather than singles.",
    menuItems: ["PRP / PRF", "PRP Vampire Facial"],
    menuSection: "body-hair",
    icon: "tube",
  },
  {
    slug: "hair-restoration",
    title: "Hair restoration",
    summary: "Thinning, shedding and a scalp that has stopped behaving. Starting at KES 7,000.",
    body: "Hair Reboot and Hair Magic Growth sit at the accessible end; Exosome Hair and PRP into the scalp at the other. Which one is right depends on why the hair is going, and that is a medical question before it is a menu one — traction, scarring alopecia and seborrhoeic dermatitis all need naming first.",
    menuItems: ["Hair Reboot", "Hair Magic Growth", "Exosome Hair", "PRP / PRF"],
    menuSection: "body-hair",
    icon: "hair",
    image: "/images/hair-scalp.png",
  },
  {
    slug: "facials",
    title: "Facials",
    summary: "Nine of them, across three families. The cheapest way into the clinic.",
    body: "Renewal is barrier work — hydration, congestion, calming things down. Brightening goes after tone and dullness. Age-defying is lift and firmness. Above those sit the device-led treatments: Glo2Facial, Glamour X, the oxygen facials. Every one costs less per session booked as a course, and the menu prints both figures side by side so you can do the arithmetic yourself.",
    menuItems: [
      "Express Hydra Cleanser",
      "Clear Blue",
      "Korean Glass Skin",
      "Lift 360 Facial",
      "24K Uplift",
      "Glo2Facial",
      "Glamour X",
    ],
    menuSection: "facials",
    icon: "peel",
  },
  {
    slug: "peels-resurfacing",
    title: "Peels & resurfacing",
    summary: "Depth and agent chosen for your skin, not for a brochure.",
    body: "Mesoestetic, BioRePeel and Lhala peels, plus micro-needling with the Histolab Dermapen and radiofrequency micro-needling. Agent and depth matter more on melanin-rich skin than on any other kind: a peel calibrated for lighter skin is a dependable way to produce exactly the pigmentation you came in to treat.",
    menuItems: ["Mesoestetic Peel", "BioRePeel", "Lhala Peel", "Histolab Dermapen", "RF Micro-needling"],
    menuSection: "facials",
    icon: "peelAlt",
    image: "/images/chemical-peels.png",
  },
  {
    slug: "laser-energy",
    title: "Laser & energy",
    summary: "Picosecond, carbon and fractional laser, radiofrequency, HIFU.",
    body: "Four different kinds of physics aimed at pigment, texture and lift. On deeper skin the settings are the whole game, which is why this is the part of the menu that starts with a conversation rather than a booking — your history with lasers, what you are using on your skin now, and how you scar all change the answer.",
    menuItems: ["Picosecond Laser", "Carbon Laser", "Fractional Laser", "Virtue RF", "HIFU Face", "Fabulips"],
    menuSection: "rejuvenation",
    icon: "laser",
    image: "/images/laser-energy.png",
  },
  {
    slug: "iv-infusions",
    title: "IV drips & infusions",
    summary: "Hydration and vitamin infusions, given in clinic.",
    body: "IV Drip and NAD+ run as full infusions; Infusion and Hydra Glow are the short add-ons that get attached to something else on the day. If you are considering one, raise it at your consultation — it is a medical treatment and it belongs in your notes alongside everything else.",
    menuItems: ["IV Drip", "NAD+", "Infusion", "Hydra Glow"],
    menuSection: "add-ons",
    icon: "drip",
  },
  {
    slug: "body-contouring",
    title: "Body contouring",
    summary: "Liposonix, Lipotropic, HIFU Body and Sphere Sculpt.",
    body: "Non-surgical contouring for defined areas, all four priced and scheduled as courses because that is how they work. None of it is a substitute for weight loss, and anyone telling you otherwise is selling rather than advising.",
    menuItems: ["Sphere Sculpt Body", "Lipotropic", "Liposonix", "HIFU Body"],
    menuSection: "body-hair",
    icon: "body",
  },
];

/** Resources/more-info.md, section 3. One service, stated plainly. */
export const COMING_SOON = {
  title: "Laser hair removal",
  body: "Not on the menu yet. It is on the way, and this page is where it will appear the day it becomes bookable.",
} as const;

/** Lowest published figure across a family's menu items. */
export function familyFrom(family: CosmeticFamily): number {
  const prices = family.menuItems.map(fromPriceForItem).filter((n) => n > 0);
  return prices.length ? Math.min(...prices) : 0;
}
