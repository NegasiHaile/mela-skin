/**
 * What the clinic offers, and what to say about it.
 *
 * SOURCE — Resources/more-info.md, which sets the service offering out in
 * three parts: medical dermatology (ten named conditions), cosmetic (five
 * named families: injectables, IV, filler, PRP & PRF, facials), and one
 * service marked coming soon. That three-part structure is the clinic's own
 * and is followed here exactly.
 *
 * The ten conditions are that list, unchanged — nothing added, nothing
 * dropped. The cosmetic side runs to ten families rather than five because the
 * priced menu in `menu.ts` sells peels, laser, HIFU, biostimulators and body
 * contouring that more-info.md's five headings do not name. Splitting those
 * out is a grouping decision, not an invented service: every family maps to
 * items that are already on the menu, and the `menuItems` list on each one
 * says which.
 *
 * The prose is written for the site. Condition descriptions are general
 * dermatology — what the thing is, how it tends to present on melanin-rich
 * skin, and what a first appointment is for. There are no outcome promises,
 * no named equipment the clinic has not confirmed owning, and no claims about
 * specific procedures beyond what the menu already prices.
 *
 * NOT USED HERE, deliberately: Resources/Cosmetic Pricing Recommendations for
 * Associate Feedback.pdf. That file is an internal pricing-strategy memo for
 * York Dermatology in Canada — competitor names, margin positions, "strategic
 * action" columns, prices in Canadian dollars. None of it belongs on a public
 * page and none of it is Mela Skin's.
 */

import { fromPriceForItem } from "./menu";

export type Condition = {
  slug: string;
  title: string;
  /** One line. Used on cards and in the footer. */
  summary: string;
  /** What the condition actually is. */
  what: string;
  /** How it behaves or presents on melanin-rich skin. Omitted where there is
   *  nothing specific and honest to say. */
  deeper?: string;
  /** Heading for that block. Defaults to "On deeper skin" — override where the
   *  note earns its place for another reason, so the label stays truthful. */
  noteLabel?: string;
  /** What a first appointment is for. */
  approach: string;
  /** Key into the icon set in components/icons.tsx. */
  icon: string;
};

export const CONDITIONS: Condition[] = [
  {
    slug: "acne",
    title: "Acne",
    summary: "Spots now, dark marks for months afterwards. Two problems, two plans.",
    what: "Oil and dead skin block a follicle, bacteria move in, the follicle inflames. It happens on foreheads at fifteen and along jawlines at thirty-five, and the second kind is not the first kind come back.",
    deeper:
      "On brown and black skin the spot almost always clears long before the mark it leaves. That flat dark patch is post-inflammatory hyperpigmentation, and it is what most people are actually here about. It is a separate problem from the acne that caused it.",
    approach:
      "Settle the acne first. Chasing marks while new spots keep arriving is how people spend a year and a great deal of money going nowhere. Once it is quiet, the pigment work starts.",
    icon: "acne",
  },
  {
    slug: "eczema",
    title: "Eczema",
    summary: "Dry, itchy, flaring — and rarely red on deeper skin, which is why it gets missed.",
    what: "Atopic dermatitis is a barrier problem before it is anything else. Skin loses water too quickly, lets irritants in, itches, gets scratched, and inflames further. Breaking that loop is most of the work.",
    deeper:
      "The textbook picture is a red patch. On deeper skin it reads grey, violet, or simply darker than the skin around it, and it often shows up as small bumps around each hair follicle rather than as one broad plaque. Both are eczema. Neither looks like the photograph in the book.",
    approach:
      "Find the triggers, rebuild the barrier, and keep something to hand that stops a flare early. The darkening left behind usually settles on its own — but only once the eczema underneath is controlled.",
    icon: "eczema",
  },
  {
    slug: "melanoma",
    title: "Melanoma & mole checks",
    summary: "A new mole, a changing one, or one that does not match your others.",
    what: "Melanoma is the skin cancer that matters most, because it is the one that spreads. Found early it is usually a small problem. Found late it is not, and the gap between those two sentences is measured in months.",
    deeper:
      "There is a stubborn idea that darker skin does not get melanoma. It does. It tends to appear where nobody thinks to look — the sole of a foot, a palm, under a finger or toenail — and it is typically found later. That delay, not the disease, is the main reason outcomes are worse.",
    approach:
      "Bring us anything that has changed shape, colour, size or edge, anything that bleeds or will not heal, and any dark line running the length of a nail. If something needs investigating further, we will explain what that involves before anything happens.",
    icon: "mole",
  },
  {
    slug: "melasma",
    title: "Melasma",
    summary: "Symmetrical brown patches that fade and return. Managed rather than cured.",
    what: "Melasma sits on the cheeks, forehead and upper lip, usually in a mirror-image pattern. Hormones drive it. Heat and sunlight bring it back. It has a long memory, and the same patch tends to return in the same place.",
    deeper:
      "Melasma overwhelmingly affects skin that tans rather than burns, which is most of the people this clinic sees. Worth knowing before you spend anything: it is controlled rather than cured. Daily sun protection does more of the work than any single treatment on the menu, and no course holds without it.",
    approach:
      "A plan you can actually keep to, and sun protection you will actually wear. What we will not do is put you on an unregulated lightening cream — the hydroquinone-and-steroid mixtures sold over the counter thin the skin and rebound worse than the melasma did.",
    icon: "pigment",
  },
  {
    slug: "psoriasis",
    title: "Psoriasis",
    summary: "Thick, scaly plaques. Regularly treated as eczema or fungus for years first.",
    what: "The immune system drives skin turnover faster than the skin can shed, so cells pile up into a raised plaque with scale on top. Elbows, knees, scalp and the lower back are the usual sites. Nails and joints can be involved too.",
    deeper:
      "On deeper skin the plaque is more often violet, dark brown or grey than pink, and the silvery scale can be thin enough to overlook. It is among the most consistently misdiagnosed conditions in melanin-rich skin — “treated for fungus for three years” is a sentence dermatologists hear often.",
    approach:
      "Confirm what it actually is first. Psoriasis is long-term: the aim is long clear stretches and a plan for the flares, not a tube of cream and a wave goodbye.",
    icon: "psoriasis",
  },
  {
    slug: "rosacea",
    title: "Rosacea",
    summary: "Flushing, bumps and visible vessels. Not a fair-skin condition.",
    what: "Rosacea works across the centre of the face — nose, cheeks, chin, forehead. Some people flush. Some get papules that look like acne. Some get both, along with visible vessels and gritty, irritated eyes.",
    deeper:
      "It is repeatedly described as a condition of pale European skin. It is not. On brown skin the redness reads as warmth or a dusky, slightly swollen look rather than as pink, which is why it so often gets treated as acne instead.",
    approach:
      "Work out the triggers — heat, sun, alcohol, the wrong skincare — and treat the type you actually have. What settles papules does very little for flushing, and the reverse is just as true.",
    icon: "rosacea",
  },
  {
    slug: "skin-tags",
    title: "Skin tags",
    summary: "Harmless, and straightforward to remove. Priced on the menu.",
    what: "Small soft flaps of skin that appear where skin rubs skin: neck, underarms, eyelids, groin, under the bust. They are not dangerous and they are not catching. People have them removed because they snag on collars and jewellery, or simply because they would rather not have them.",
    noteLabel: "One caution",
    deeper:
      "This matters more than the rest of the entry. A growth that bleeds, darkens, grows quickly or has an irregular edge is not a skin tag. Have it looked at before you have it removed.",
    approach:
      "Removal is a short in-clinic procedure and it is one of the few things on this list with a fixed price. It sits under add-ons on the treatment menu.",
    icon: "tag",
  },
  {
    slug: "stretch-marks",
    title: "Stretch marks",
    summary: "Far easier to influence while they are still red or purple.",
    what: "Striae form when skin is stretched faster than the collagen underneath can keep up — growth spurts, pregnancy, rapid weight change, some steroid use. They start red or purple and settle over months into pale, slightly sunken lines.",
    deeper:
      "On deeper skin the settled mark often ends up lighter than the skin around it, which makes it more visible rather than less. That is the version people usually want help with.",
    approach:
      "The honest version: new marks respond considerably better than old ones. Worth knowing before anyone sells you a twenty-session course for something that has been there fifteen years.",
    icon: "stretch",
  },
  {
    slug: "vascular-birthmarks",
    title: "Vascular birthmarks",
    summary: "Port-wine stains, haemangiomas, salmon patches. Some need treating; some do not.",
    what: "Blood vessels that formed differently before or shortly after birth. Salmon patches usually fade on their own. Infantile haemangiomas often grow first and shrink over years. Port-wine stains stay, and can thicken with age.",
    deeper:
      "On deeper skin these are harder to spot early, so they are more often noticed late. That matters most for the ones where timing changes what can be done.",
    approach:
      "The first job is telling you which one it is, whether it needs anything doing at all, and what the realistic options are. That answer is worth having even when the answer is to leave it alone.",
    icon: "vessel",
  },
  {
    slug: "warts",
    title: "Warts",
    summary: "A virus, not poor hygiene. Stubborn, and worth a plan rather than a product.",
    what: "Human papillomavirus infecting the top layer of skin. Rough, often studded with tiny dark dots, and spread by contact — including from one part of your own body to another. On the sole of a foot they get pressed flat and can hurt to walk on.",
    approach:
      "Some clear on their own inside a year or two. Many do not, and the ones that persist — around nails especially — need a sustained course rather than a single visit. We will tell you which of those you are looking at.",
    icon: "wart",
  },
];

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

/** The three-part shape the clinic set out in more-info.md. */
export const PILLARS = [
  {
    eyebrow: "Medical dermatology",
    title: "Diagnosed first",
    body: "Ten conditions, from acne and eczema through psoriasis, melasma and mole checks. Each gets named before anything is prescribed, which is the whole difference between a plan and a shelf of creams.",
    href: "/medical-dermatology",
    cta: "What we treat",
    count: `${CONDITIONS.length} conditions`,
  },
  {
    eyebrow: "Cosmetic dermatology",
    title: "Priced in the open",
    body: "Injectables, fillers, boosters, PRP, hair, facials, peels, laser and body work. You can look up what any of it costs without speaking to anyone first, which is not how this industry usually works.",
    href: "/cosmetic-dermatology",
    cta: "See the treatments",
    count: `${COSMETIC.length} families`,
  },
  {
    eyebrow: "Coming soon",
    title: COMING_SOON.title,
    body: COMING_SOON.body,
    href: "/cosmetic-dermatology#coming-soon",
    cta: "Ask to be told",
    count: "In development",
  },
] as const;
