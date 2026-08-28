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
    what: "Oil and dead skin block a follicle, bacteria move in, and the follicle inflames. It happens on foreheads at fifteen and along jawlines at thirty-five. Adult acne is its own condition rather than a return of the teenage kind, and it usually needs a different plan.",
    deeper:
      "On brown and black skin the spot almost always clears long before the mark it leaves. That flat dark patch is post-inflammatory hyperpigmentation, and it is what most people are actually here about. It is a separate problem from the acne that caused it.",
    approach:
      "Settle the acne first. Chasing marks while new spots keep arriving is how people spend a year and a lot of money going nowhere. Once it is quiet, the pigment work starts.",
    icon: "acne",
  },
  {
    slug: "eczema",
    title: "Eczema",
    summary: "Dry, itchy and flaring. Rarely red on deeper skin, which is why it gets missed.",
    what: "Atopic dermatitis starts as a barrier problem. Skin loses water too quickly, lets irritants in, itches, gets scratched, and inflames further. Breaking that loop is most of the work.",
    deeper:
      "The textbook picture is a red patch. On deeper skin it reads grey, violet, or simply darker than the skin around it, and it often shows up as small bumps around each hair follicle rather than as one broad plaque. Both presentations are eczema, and neither matches the photograph in the textbook.",
    approach:
      "Find the triggers, rebuild the barrier, and keep something to hand that stops a flare early. The darkening left behind usually settles on its own, but only once the eczema underneath is controlled.",
    icon: "eczema",
  },
  {
    slug: "hair-loss",
    title: "Hair loss",
    summary: "Shedding, thinning, or a bald patch. A skin condition, and one with a cause worth naming.",
    what: "Hair grows out of skin, which is why a dermatologist is the right person to look at it. The causes barely overlap: androgenetic thinning behaves nothing like a patch of alopecia areata, and neither behaves like hair pulled out at the hairline by tension. Some of it grows back on its own. Some of it will not once the follicle has scarred over, and that is the distinction the first appointment exists to make.",
    deeper:
      "Two patterns bring people in here more than anywhere else. Traction alopecia comes from years of braids, weaves and tight styling, and it takes the hairline and the temples first. Reversible early, permanent once the follicle has gone. Central centrifugal cicatricial alopecia starts at the crown and spreads outwards, is far more common in women of African descent than in anyone else, and scars as it goes. Both are quiet at the start, which is why they are so often shown to us late.",
    approach:
      "Work out which kind it is before anything is prescribed, because a scarring alopecia and a shedding one need opposite plans and the window for the scarring kind closes. Expect questions about styling, tension, chemical relaxing and heat, along with iron, thyroid and anything that has changed in the last year. Bring photographs of the hairline from a year or two ago if you have them.",
    icon: "hairLoss",
  },
  {
    slug: "melanoma",
    title: "Melanoma & mole checks",
    summary: "A new mole, a changing one, or one that does not match your others.",
    what: "Melanoma is the skin cancer that matters most, because it is the one that spreads. Caught early it is usually a small problem. Caught late it often is not, and the difference is frequently a matter of months.",
    deeper:
      "There is a stubborn idea that darker skin does not get melanoma. It does. It tends to appear where nobody thinks to look: the sole of a foot, a palm, under a finger or toenail. It is also typically found later, and that delay is the main reason outcomes are worse.",
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
      "Melasma overwhelmingly affects skin that tans rather than burns, which is most of the people this clinic sees. It is controlled rather than cured. Daily sun protection does more of the work than any single treatment on the menu, and no course holds without it.",
    approach:
      "A plan you can keep to, and sun protection you will actually wear. We will not put you on an unregulated lightening cream. The hydroquinone and steroid mixtures sold over the counter thin the skin, and the rebound is worse than the melasma was.",
    icon: "pigment",
  },
  {
    slug: "nail-disease",
    title: "Nail disease",
    summary: "Thickened, lifting, ridged or discoloured nails. Rarely just cosmetic.",
    what: "Nails record what has happened to the skin they grow out of, and to the body around it. A thick crumbling nail is usually fungal but not always; pitting and ridging often turn out to be psoriasis; a nail lifting off its bed can follow an injury, an infection, or a thyroid problem. Ingrown nails, chronic paronychia and the damage left by acrylics and gels all belong here too.",
    deeper:
      "A brown or black line running the length of a nail is common and usually harmless on deeper skin: melanonychia, often several nails at once. The one that matters looks different: a single band that is widening, darkening or unevenly edged, especially with pigment spreading onto the skin at the base. Subungual melanoma is repeatedly mistaken for a bruise or a fungal nail, and it is found later on brown and black skin than on any other. Have it looked at rather than watched.",
    approach:
      "Fungal is confirmed rather than assumed, because months of antifungal treatment for something that was never fungal is a common way to lose a year. Nails grow slowly, so plan on a long review interval and photographs on your record to measure against.",
    icon: "nail",
  },
  {
    slug: "psoriasis",
    title: "Psoriasis",
    summary: "Thick, scaly plaques. Regularly treated as eczema or fungus for years first.",
    what: "The immune system drives skin turnover faster than the skin can shed, so cells pile up into a raised plaque with scale on top. Elbows, knees, scalp and the lower back are the usual sites. Nails and joints can be involved too.",
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
    what: "Rosacea works across the centre of the face: nose, cheeks, chin and forehead. Some people flush, some get papules that look like acne, and some get both, along with visible vessels and gritty, irritated eyes.",
    deeper:
      "It is repeatedly described as a condition of pale European skin, which is wrong. On brown skin the redness reads as warmth or a dusky, slightly swollen look rather than as pink, and that is why it so often gets treated as acne instead.",
    approach:
      "Work out the triggers (heat, sun, alcohol, the wrong skincare) and treat the type you actually have. What settles papules does very little for flushing, and the reverse is just as true.",
    icon: "rosacea",
  },
  {
    slug: "skin-tags",
    title: "Skin tags",
    summary: "Harmless, and straightforward to remove in clinic.",
    what: "Small soft flaps of skin that appear where skin rubs skin: neck, underarms, eyelids, groin, under the bust. They are not dangerous and they are not catching. People have them removed because they snag on collars and jewellery, or simply because they would rather not have them.",
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
    what: "Striae form when skin is stretched faster than the collagen underneath can keep up: growth spurts, pregnancy, rapid weight change, some steroid use. They start red or purple and settle over months into pale, slightly sunken lines.",
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
    what: "Blood vessels that formed differently before or shortly after birth. Salmon patches usually fade on their own. Infantile haemangiomas often grow first and shrink over years. Port-wine stains stay, and can thicken with age.",
    deeper:
      "On deeper skin these are harder to spot early, so they are more often noticed late. That matters most for the ones where timing changes what can be done.",
    approach:
      "The first job is telling you which one it is, whether it needs treating at all, and what the realistic options are. That is worth knowing even when the recommendation is to leave it alone.",
    icon: "vessel",
  },
  {
    slug: "warts",
    title: "Warts",
    summary: "A virus, not poor hygiene. Stubborn, and worth a plan rather than a product.",
    what: "Human papillomavirus infecting the top layer of skin. Rough, often studded with tiny dark dots, and spread by contact, including from one part of your own body to another. On the sole of a foot they get pressed flat and can hurt to walk on.",
    approach:
      "Some clear on their own inside a year or two. Many do not, and the ones that persist (around nails especially) need a sustained course rather than a single visit. We will tell you which of those you are looking at.",
    icon: "wart",
  },
];
