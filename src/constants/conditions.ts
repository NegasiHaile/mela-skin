/**
 * MEDICAL DERMATOLOGY — the ten conditions the clinic treats.
 *
 * SOURCE — Resources/more-info.md, section 1, plus two conditions added on
 * 27 Aug 2026 at the clinic's request. The brief's own ten are reproduced
 * exactly: nothing dropped, nothing reworded.
 *
 * THE TWO ADDITIONS. Dr. Abseret Hailu, service-offerings meeting, 26 Aug,
 * 00:31:40: "my thing for the medical side, Dr. Maggie, is … for the general
 * public, they may not be aware of what a dermatologist or skin doctor may
 * cover. We haven't covered hair loss in the list that we currently have. We
 * haven't covered any nail diseases in the list that we have, which is in the
 * wheelhouse of derm. So maybe we can do a deep dive list for patients, cuz I
 * assume a lot of people are not going to be health literate. The more we can
 * spell it out for patients on what we're going to see, the more uptake we're
 * going to have in terms of volume."
 *
 * `hair-loss` and `nail-disease` are those two, filed alphabetically with the
 * rest. Adding an entry here makes it appear on the home index, the medical
 * page, the footer, the search keywords and the structured data with no other
 * edits.
 *
 * THE LIST IS STILL OPEN. Dr. Margaret Gachanja, 00:32:49: "I've not seen the
 * list, but I'd be willing to add to whatever is missing so far." Her additions
 * are an outstanding action item — append them here.
 *
 * The prose is written for the site. Each entry is general dermatology: what
 * the condition is, how it tends to present on melanin-rich skin, and what a
 * first appointment is for.
 *
 * These are deliberately longer than the cosmetic summaries in ./cosmetic.ts,
 * which the same meeting cut back. Abseret asked for "less is more" on the
 * cosmetic descriptions and for the medical list to be spelled out, in the same
 * breath and for the same reason: what a patient needs before booking is more
 * information about a condition and less about a procedure. There are deliberately no outcome promises, no
 * equipment the clinic has not confirmed owning, and no claims about specific
 * procedures beyond what the priced menu already covers.
 *
 * `icon` is a key into the registry at components/icons.tsx. An unknown key
 * falls back to the pigment mark rather than rendering a hole.
 */

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
    summary: "Spots now, and dark marks for months after they clear.",
    what: "Oil and dead skin block a follicle and it inflames. Adult acne is its own condition rather than a return of the teenage kind, and it needs a different plan.",
    deeper:
      "The spot clears long before the mark it leaves. That flat dark patch is post-inflammatory hyperpigmentation, and it is what most people are actually here about.",
    approach:
      "Settle the acne first. Chasing marks while new spots keep arriving is how a year goes nowhere. Once it is quiet, the pigment work starts.",
    icon: "acne",
  },
  {
    slug: "eczema",
    title: "Eczema",
    summary: "Dry, itchy and flaring. Rarely red on deeper skin, which is why it gets missed.",
    what: "A barrier problem. Skin loses water, lets irritants in, itches, gets scratched, inflames further. Breaking that loop is most of the work.",
    deeper:
      "The textbook picture is a red patch. On deeper skin it reads grey or violet, and often shows as small bumps around each follicle rather than one broad plaque.",
    approach:
      "Find the triggers, rebuild the barrier, and keep something to hand that stops a flare early. The darkening settles once the eczema does.",
    icon: "eczema",
  },
  {
    slug: "hair-loss",
    title: "Hair loss",
    summary: "Shedding, thinning, or a bald patch. A skin condition, and one with a cause worth naming.",
    what: "Hair grows out of skin, which is why a dermatologist looks at it. Some grows back. Some will not, once the follicle has scarred, and that is what the first appointment settles.",
    deeper:
      "Two patterns bring people in. Traction alopecia, from years of tight styling, takes the hairline: reversible early, permanent once the follicle has gone. CCCA starts at the crown and scars as it spreads.",
    approach:
      "A scarring alopecia and a shedding one need opposite plans, and the window for the scarring kind closes. Bring photographs of your hairline from a year or two ago.",
    icon: "hairLoss",
  },
  {
    slug: "melanoma",
    title: "Melanoma & mole checks",
    summary: "A new mole, a changing one, or one that does not match your others.",
    what: "The skin cancer that spreads. Caught early it is usually a small problem; caught late it often is not, and the difference is months.",
    deeper:
      "Darker skin does get melanoma. It appears where nobody thinks to look: the sole of a foot, a palm, under a nail. It is found later, and that delay is why outcomes are worse.",
    approach:
      "Bring anything that has changed shape, colour, size or edge, anything that bleeds or will not heal, and any dark line running the length of a nail.",
    icon: "mole",
  },
  {
    slug: "melasma",
    title: "Melasma",
    summary: "Symmetrical brown patches that fade and return. Managed rather than cured.",
    what: "Symmetrical patches on the cheeks, forehead and upper lip. Hormones drive it, heat and sun bring it back, and it returns to the same place.",
    deeper:
      "It affects skin that tans rather than burns, which is most of who we see. Daily sun protection does more of the work than any treatment on the menu.",
    approach:
      "A plan you can keep to, and sun protection you will wear. We will not put you on an unregulated lightening cream: it thins the skin, and the rebound is worse than the melasma.",
    icon: "pigment",
  },
  {
    slug: "nail-disease",
    title: "Nail disease",
    summary: "Thickened, lifting, ridged or discoloured nails. Rarely just cosmetic.",
    what: "Nails record what happened to the skin they grow from. A thick crumbling nail is usually fungal but not always, and pitting often turns out to be psoriasis.",
    deeper:
      "A dark line down a nail is usually harmless on deeper skin. The one that matters is a single band, widening or unevenly edged, with pigment spreading onto the skin at its base. Have that looked at, not watched.",
    approach:
      "Fungal is confirmed rather than assumed: months of antifungal for something that was never fungal loses a year. Nails grow slowly, so reviews are long.",
    icon: "nail",
  },
  {
    slug: "psoriasis",
    title: "Psoriasis",
    summary: "Thick, scaly plaques. Regularly treated as eczema or fungus for years first.",
    what: "The immune system drives turnover faster than skin can shed, so cells pile into a raised, scaly plaque. Elbows, knees, scalp, lower back. Nails and joints can be involved.",
    deeper:
      'On deeper skin the plaque is more often violet, dark brown or grey than pink, and the silvery scale can be thin enough to overlook. It is among the most consistently misdiagnosed conditions in melanin-rich skin. "Treated for fungus for three years" is a sentence dermatologists hear often.',
    approach:
      "Confirm what it actually is first. Psoriasis is long-term, so the aim is long clear stretches and a plan for the flares rather than one course of cream.",
    icon: "psoriasis",
  },
  {
    slug: "rosacea",
    title: "Rosacea",
    summary: "Flushing, bumps and visible vessels. Not a fair-skin condition.",
    what: "Across the centre of the face: nose, cheeks, chin, forehead. Some flush, some get papules that look like acne, some get both, with gritty eyes.",
    deeper:
      "It is called a fair-skin condition, which is wrong. On brown skin the redness reads as warmth or a dusky look rather than pink, so it gets treated as acne.",
    approach:
      "Work out the triggers and treat the type you actually have. What settles papules does very little for flushing, and the reverse is just as true.",
    icon: "rosacea",
  },
  {
    slug: "skin-tags",
    title: "Skin tags",
    summary: "Harmless, and straightforward to remove in clinic.",
    what: "Small soft flaps where skin rubs skin: neck, underarms, eyelids, groin. Not dangerous, not catching. People remove them because they snag.",
    noteLabel: "One caution",
    deeper:
      "A growth that bleeds, darkens, grows quickly or has an irregular edge is not a skin tag. Have it looked at before you have it removed.",
    approach:
      "Removal is a short in-clinic procedure and one of the few things on this list that needs no course. It sits under add-ons on the treatment menu.",
    icon: "tag",
  },
  {
    slug: "stretch-marks",
    title: "Stretch marks",
    summary: "Far easier to influence while they are still red or purple.",
    what: "Skin stretched faster than the collagen under it can keep up. They start red or purple and settle over months into pale, slightly sunken lines.",
    deeper:
      "On deeper skin the settled mark often ends up lighter than the skin around it, which makes it more visible rather than less. That is the version people usually want help with.",
    approach:
      "New marks respond considerably better than old ones. Worth knowing before anyone sells you a twenty-session course for something that has been there fifteen years.",
    icon: "stretch",
  },
  {
    slug: "vascular-birthmarks",
    title: "Vascular birthmarks",
    summary: "Port-wine stains, haemangiomas, salmon patches. Some need treating; some do not.",
    what: "Blood vessels that formed differently before or just after birth. Salmon patches fade. Haemangiomas grow, then shrink. Port-wine stains stay.",
    deeper:
      "On deeper skin these are harder to spot early, so they are more often noticed late. That matters most for the ones where timing changes what can be done.",
    approach:
      "The first job is telling you which one it is, whether it needs treating, and what the options are. Worth knowing even when the answer is to leave it alone.",
    icon: "vessel",
  },
  {
    slug: "warts",
    title: "Warts",
    summary: "A virus, not poor hygiene. Stubborn, and worth a plan rather than a product.",
    what: "A virus in the top layer of skin. Rough, often studded with dark dots, and spread by contact, including from one part of your own body to another.",
    approach:
      "Some clear on their own. The ones that persist, around nails especially, need a sustained course rather than a single visit.",
    icon: "wart",
  },
];
