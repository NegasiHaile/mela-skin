/**
 * COSMETIC DERMATOLOGY — the ten treatment families, and the one service that
 * is not open yet.
 *
 * SOURCE — Resources/more-info.md, sections 2 and 3. That brief names five
 * cosmetic families (injectables, IV, filler, PRP & PRF, facials) and marks
 * laser hair removal as coming soon. The list runs to ten here because the
 * menu in ./menu.ts also offers peels, laser, HIFU, biostimulators, hair and
 * body contouring that those five headings do not name. Splitting them out is a
 * grouping decision, not an invented service — every family maps to treatments
 * that are already on the menu, and `menuItems` says which.
 *
 * NO PRICES, and no "from" figures. See the header of ./menu.ts for the
 * decision and who made it. `menuItems` used to drive a lowest-price lookup;
 * it now only names what a family covers, which is what makes each card link
 * usefully into the menu.
 *
 * DELIBERATELY SHORT. Dr. Abseret Hailu, 26 Aug, 00:33:50: "less is more
 * though. Like a few sentences I think is good. That's a sweet spot. People are
 * not going to be reading a lot, or I would hope that they are learning more of
 * it in the actual visit rather than on the actual website." Aser Hailu, same
 * moment: "we can also have clinic brochures for the cosmetics / aesthetics
 * stuff, so we don't need to publicise it on the website."
 *
 * So each `body` is two or three sentences, and the detail belongs to the
 * brochure and the consultation. If one of these grows past three sentences,
 * something has gone back on that decision. The medical list in
 * ./conditions.ts is longer on purpose and for the opposite reason — Abseret
 * asked in the same breath for the medical side to be spelled out.
 *
 * `image` is optional. Five families have photography in /public/images; the
 * rest render a brand-ground panel with the treatment mark set large. That is a
 * deliberate finish — do not fill the gap with stock photography.
 */

export type CosmeticFamily = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  /** Menu item names this family covers. Must match ./menu.ts exactly. */
  menuItems: string[];
  /** Section id in menu.ts, for the anchor link. */
  menuSection: string;
  icon: string;
  /** Only where a real photograph exists in /public/images. */
  /**
   * NO FAMILY CARRIES ONE ANY MORE, and the field is kept so a real photograph
   * of this clinic's own work can be dropped back in per family without touching
   * a component.
   *
   * Five of the ten had generated imagery — injectables, boosters, hair, peels,
   * laser — and it came off on 2 Sep: it was not the clinic's, it was not even a
   * photograph, and five illustrated cards beside five iconographic ones made the
   * grid look half-finished rather than deliberate. All ten render the brand
   * ground with the treatment mark set large, which is a finish. See
   * components/TreatmentMedia.tsx.
   */
  image?: string;
};

export const COSMETIC: CosmeticFamily[] = [
  {
    slug: "injectables",
    title: "Injectables",
    summary: "Softens the lines that come from movement, not the ones already there at rest.",
    body: "Botulinum toxin relaxes the muscles that fold the skin: forehead, brows, outer eye. It does little for lines that are there when your face is still. It wears off, so the dose can be adjusted.",
    menuItems: ["Botox (Nabota)", "Botox (Croma)"],
    menuSection: "injectables",
    icon: "injectable",
  },
  {
    slug: "fillers",
    title: "Fillers",
    summary: "Volume where volume has gone. Measured in cc, because that is what goes in.",
    body: "Hyaluronic acid gels restore structure to cheeks, chin, jawline and lips, sized to the face rather than the appointment. Radiesse and Sculptra prompt your own collagen instead.",
    menuItems: ["Filler (EPTQ)", "Filler (Croma / Aliaxin)", "Radiesse / Sculptra"],
    menuSection: "injectables",
    icon: "booster",
  },
  {
    slug: "skin-boosters",
    title: "Skin boosters & biostimulators",
    summary: "These change how the skin behaves rather than its shape, which makes them a different thing from filler.",
    body: "Profhilo, polynucleotides, Saypha and Exocode work on hydration, firmness and quality across an area rather than building a contour in one place.",
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
  },
  {
    slug: "prp-prf",
    title: "PRP & PRF",
    summary: "Your own blood, concentrated and put back. For thinning hair and for skin.",
    body: "A small draw, spun to concentrate the platelets, then placed into the scalp or the face. PRF is the fibrin-rich variant. Both work as courses.",
    menuItems: ["PRP / PRF", "PRP Vampire Facial"],
    menuSection: "body-hair",
    icon: "tube",
  },
  {
    slug: "hair-restoration",
    title: "Hair restoration",
    summary: "Thinning, shedding, and a scalp that has stopped behaving.",
    body: "Hair Reboot and Hair Magic Growth at one end, Exosome Hair and scalp PRP at the other. Which is right depends on why the hair is going, which is a medical question first.",
    menuItems: ["Hair Reboot", "Hair Magic Growth", "Exosome Hair", "PRP / PRF"],
    menuSection: "body-hair",
    icon: "hair",
  },
  {
    slug: "facials",
    title: "Facials",
    summary: "Nine of them, across three families: barrier, tone, and lift.",
    body: "Renewal is barrier work, brightening goes after tone, age-defying after lift. Above them sit the device-led ones: Glo2Facial, Glamour X and the oxygen facials.",
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
    summary: "Depth and agent chosen for the skin in front of us.",
    body: "Mesoestetic, BioRePeel and Lhala peels, plus micro-needling. Agent and depth matter more here than on any other skin: a peel calibrated for lighter skin produces the pigmentation you came to treat.",
    menuItems: ["Mesoestetic Peel", "BioRePeel", "Lhala Peel", "Histolab Dermapen", "RF Micro-needling"],
    menuSection: "facials",
    icon: "peelAlt",
  },
  {
    slug: "laser-energy",
    title: "Laser & energy",
    summary: "Picosecond, carbon and fractional laser, radiofrequency, HIFU.",
    body: "Four kinds of physics aimed at pigment, texture and lift. On deeper skin the settings decide the outcome, so this part of the menu starts with a conversation rather than a booking.",
    menuItems: ["Picosecond Laser", "Carbon Laser", "Fractional Laser", "Virtue RF", "HIFU Face", "Fabulips"],
    menuSection: "rejuvenation",
    icon: "laser",
  },
  {
    slug: "iv-infusions",
    title: "IV drips & infusions",
    summary: "Hydration and vitamin infusions, given in clinic.",
    body: "IV Drip and NAD+ run as full infusions; Infusion and Hydra Glow attach to something else on the day. Raise it at your consultation: it is a medical treatment and it belongs in your notes.",
    menuItems: ["IV Drip", "NAD+", "Infusion", "Hydra Glow"],
    menuSection: "add-ons",
    icon: "drip",
  },
  {
    slug: "body-contouring",
    title: "Body contouring",
    summary: "Liposonix, Lipotropic, HIFU Body and Sphere Sculpt.",
    body: "Non-surgical contouring for defined areas, all four scheduled as courses because that is how they work. None of it replaces weight loss, and you will be told so before you commit.",
    menuItems: ["Sphere Sculpt Body", "Lipotropic", "Liposonix", "HIFU Body"],
    menuSection: "body-hair",
    icon: "body",
  },
];

/**
 * Resources/more-info.md, section 3. One service, stated plainly.
 *
 * NOT ITS OWN BAND ON /cosmetic-dermatology ANY MORE — that came off on
 * request. Named in two places now instead: an inert card on the home page
 * ("Two halves of one clinic", see constants/copy.ts -> HOME.pillars) and an
 * unlinked row in the Dermatology dropdown (constants/navigation.ts). Neither
 * links anywhere, which is why `body` no longer points a reader at "this
 * page" — there no longer is one to point at.
 */
export const COMING_SOON = {
  title: "Laser hair removal",
  body: "Not on the menu yet. Ask at your consultation and we will let you know the day it becomes bookable.",
} as const;
