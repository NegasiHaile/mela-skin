/**
 * PAGE COPY — the headings, ledes and short lists that sit around the service
 * data.
 *
 * Grouped by where it appears, so editing a page means opening one object
 * rather than hunting through components. Anything with a service name or a
 * count in it is interpolated from ./menu.ts, ./conditions.ts and ./cosmetic.ts
 * rather than typed twice, which is why a few strings are template literals.
 *
 * NO FIGURES. Every price this file used to quote is gone, and the sections
 * that existed to hold them have been rewritten around the consultative model
 * the clinic settled on — see the header of ./menu.ts for who decided what and
 * when. Consultation fees are bracketed placeholders in ./placeholders.ts,
 * because the clinic has not supplied them.
 *
 * What is NOT here: button micro-labels, form field names, and the arrow
 * glyphs — those are interface, not content, and they live with the markup.
 */

import { PRIMARY_CLINICIAN } from "./clinic";
import { CONDITIONS } from "./conditions";
import { COSMETIC, COMING_SOON } from "./cosmetic";
import { MENU_ITEM_COUNT, sectionTitleList } from "./menu";
import { todo } from "./placeholders";

/**
 * Small counts read as words in prose and as numerals in lists — "across five
 * sections" in a paragraph, "All 12 conditions" in a footer. This keeps the
 * counts generated from the data (so they cannot go stale) without forcing
 * numerals into sentences.
 */
const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

const inWords = (n: number) => WORDS[n] ?? String(n);

/** The same, capitalised, for a count that opens a sentence. */
const InWords = (n: number) => {
  const word = inWords(n);
  return word[0].toUpperCase() + word.slice(1);
};

/* -- Home ----------------------------------------------------------------- */

export const HOME = {
  /** The argument for the clinic. Sits directly under the hero. */
  focus: {
    title: "Deeper skin isn’t harder to treat",
    subtitle: "It has simply been studied less.",
    paragraphs: [
      "Dermatology is taught on white skin. On deeper complexions inflammation reads violet or grey, leaves pigment behind, and raises into keloid. None of that is rare. It is under-taught.",
      `MELA SKIN was built around it. ${PRIMARY_CLINICIAN.name}’s practice is organised around the conditions that behave most stubbornly in melanin-rich skin, with the medical and cosmetic sides under one roof.`,
    ],
  },

  /** Three cards that orient the visitor and hand off to the subpages. */
  pillars: {
    title: "Two halves of one clinic",
    lede: "One half has to be diagnosed before anyone can say what treating it involves. The other you can browse, then talk through. Start with whichever sounds like yours.",
    cards: [
      {
        eyebrow: "Medical dermatology",
        title: "Diagnosed first",
        body: `${InWords(CONDITIONS.length)} conditions, from acne and eczema to hair loss, melasma and mole checks. Named before anything is prescribed, so you leave with a plan rather than a shelf of creams.`,
        href: "/medical-dermatology",
        cta: "What we treat",
        count: `${CONDITIONS.length} conditions`,
      },
      {
        eyebrow: "Cosmetic dermatology",
        title: "Chosen, then tailored",
        body: "Injectables, fillers, boosters, PRP, hair, facials, peels, laser and body work. Read the menu here, then bring it to a consultation. On this side it is free.",
        href: "/cosmetic-dermatology",
        cta: "See the treatments",
        count: `${COSMETIC.length} families`,
      },
      {
        /*
          WAS THE SKINCARE CARD. Swapped for the service the clinic actually
          named as its third, coming thing — Resources/more-info.md, section 3:
          medical, cosmetic, then laser hair removal, marked coming soon.
          Skincare is still its own page (/skincare, off the top nav until the
          shelf is stocked — see constants/navigation.ts), it just is not one
          of the three cards this section orients a visitor with any more.

          DISABLED ON REQUEST: it no longer has anywhere to send anyone, since
          the destination band on /cosmetic-dermatology came off that page
          (see CosmeticFamilies.tsx). `href: null` is what tells Pillars.tsx to
          render this one as a plain, unlinked card instead of a `<Link>` —
          same shape as the other two, nothing to click. The service is also
          named, just as inertly, in the Dermatology dropdown — see
          constants/navigation.ts.

          `eyebrow` and `body` both read off `COMING_SOON` (./cosmetic.ts)
          rather than repeating it, so the one place left that states this
          service's name and status is the one place worth editing.
        */
        eyebrow: COMING_SOON.title,
        title: "Coming soon",
        body: COMING_SOON.body,
        href: null as string | null,
        cta: null as string | null,
        count: "Not yet bookable",
      },
    ],
  },

  /**
   * BOTH LISTS IN SUMMARY, and the heading names them rather than describing
   * them.
   *
   * IT WAS "WHAT WE TREAT", which was false of half of what is under it. The
   * medical list is twelve conditions the clinic treats; the cosmetic list is
   * what it offers, and nobody arrives with a filler. The lede has always said
   * so -- "one list is what people arrive worried about, the other is what
   * they arrive wanting" -- so the title was contradicted one line below
   * itself.
   *
   * "Conditions and treatments" is also where the site's vocabulary is taught.
   * Those two words are reserved from here on: a CONDITION is what a patient
   * has, a TREATMENT is what the clinic does, and an individually named item on
   * the menu is a SERVICE. "Treatment" used to mean all three.
   *
   * The lede is unchanged. It explains WHY there are two lists, which the title
   * deliberately does not.
   *
   * COSMETIC IS FIVE CATEGORIES HERE, NOT TEN FAMILIES. It used to repeat the
   * full family grid /cosmetic-dermatology already carries -- the exact list,
   * twice, on two pages. This band's job is orientation, not the second copy
   * of a list that already has a home; the five menu sections are the level a
   * visitor actually needs to pick a direction before landing on either the
   * explanations (/cosmetic-dermatology) or the priced menu
   * (/treatment-menu), and each category card on the home page goes straight
   * to its own slice of the menu -- see components/Treatments.tsx. The medical
   * side stays all twelve conditions, because there is no grouping above them
   * that is not invented: each condition is its own reason to click, not a
   * member of some other category.
   */
  treatments: {
    title: "Our dermatology services",
    lede: "One list is what people arrive worried about. The other is what they arrive wanting. Nothing has been added to either to make the clinic look bigger.",
    medicalLabel: "Medical dermatology",
    medicalLink: `All ${CONDITIONS.length} conditions`,
    cosmeticLabel: "Cosmetic dermatology",
    cosmeticLink: `All ${MENU_ITEM_COUNT} treatments`,
  },

  /*
    THE PRICING SECTION IS GONE, and this is the note rather than the copy.

    It was "Tailored first, quoted second", taken off the site at the 1 Sep
    daily ("the Tailored first, quoted second section which is not clear its
    purpose on the website"), and the constant sat here unrendered until the
    production review on 2 Sep found it.

    Its argument still exists, once, where a reader is actually looking at a
    list of things they cannot see a price for: COSMETIC_PAGE.closingTitle,
    "Quoted for your skin, not from a list". That is the only place the model is
    argued now. The menu page's own FAQ answers the mechanical question
    directly ("Why are there no prices on this page?"), which is now the only
    place THAT is stated -- MENU_PAGE.rules, which used to cover the same
    ground under a "Costs" heading, is gone along with the rest of the aside
    it lived in (see the note on MENU_PAGE below).

    Dr. Abseret Hailu, 26 Aug 00:15:01, is the source and still holds: "We want
    patients to feel that we're tailoring a treatment for them, and not
    necessarily them selecting treatments."
  */

  visit: { title: "What to expect on your visit" },
};

/* -- /medical-dermatology -------------------------------------------------- */

export const MEDICAL_PAGE = {
  eyebrow: "Medical dermatology",
  /*
    WAS "Named before it is treated" -- a fair sentence, but a play on the
    page's own argument (diagnose, then treat) rather than a plain statement
    of what the page is. Replaced on request with something a reader does not
    have to unpack first.
  */
  title: "The conditions we treat",
  lede: `${InWords(CONDITIONS.length)} conditions the clinic sees most, and how each one presents on brown and black skin. If yours is not here, we may still be able to help.`,
  indexLabel: "Jump to",
  /** The block under the conditions. Numbering is generated, not stored. */
  prepTitle: "Three things worth bringing",
  prepLede:
    "None of it is required and nobody is sent home without it. It is what turns a first appointment from a guess into a diagnosis.",
  prep: [
    {
      title: "Photograph the bad days",
      body: "Almost nothing behaves in a consulting room at eleven on a Tuesday. A phone picture of a flare at its worst beats any description of one.",
    },
    {
      title: "Bring what you have used",
      body: "Every cream, tablet, oil and injection, prescribed or not. Skin-lightening products matter most: they change what is safe to do next.",
    },
    {
      title: "Know roughly when it started",
      body: "A month, a season, a pregnancy, a new job. You do not need a date. A rough beginning narrows the list of possibilities faster than almost anything else you can say.",
    },
  ],
};

/* -- /cosmetic-dermatology ------------------------------------------------- */

export const COSMETIC_PAGE = {
  eyebrow: "Cosmetic dermatology",
  title: "Chosen, not prescribed",
  lede: `The half of the clinic you can browse: ${inWords(COSMETIC.length)} families, and what each does to skin. Which suits yours is the consultation, and on this side that is free.`,
  stats: [
    { value: `${COSMETIC.length}`, label: "Treatment families" },
    { value: `${MENU_ITEM_COUNT}`, label: "Services on the menu" },
    { value: "Free", label: "Cosmetic consultation" },
  ],
  /**
   * The brochures, stated once rather than on all ten cards. Aser Hailu,
   * 00:33:50: "we can also have clinic brochures for the cosmetics /
   * aesthetics stuff, so we don't need to publicise it on the website. And if
   * people come in and ask questions, we can just give them a pamphlet."
   */
  detailNote:
    "Each has a brochure at the clinic going further than a web page usefully can, including what the treatment will not do. Ask for the one you are considering.",

  closingTitle: "Quoted for your skin, not from a list",
  closingLede:
    "A figure that changes at the appointment is the worst of both. So there is no price list: one plan, in writing, with its cost on it, after somebody has looked at your skin.",
};

/* -- /treatment-menu ------------------------------------------------------- */

/**
 * Hoisted out of `MENU_PAGE` so `faqLede` can count it -- an object literal
 * cannot read its own `faq` field while building `faqLede` in the same
 * literal, so the array has to exist first under its own name.
 */
const MENU_FAQ = [
  {
    q: "Why are there no prices on this page?",
    a: "A treatment is sized to the person having it, so a published figure is wrong for most people reading it. The cost comes with the plan, in writing, at the consultation.",
  },
  {
    q: "What does a course actually get me?",
    a: "A prepaid block of sessions at a better rate than buying singly. Where a course length appears beside something here, it is because it works considerably better as one.",
  },
  {
    q: "Why are injectables measured by area and by cc?",
    a: "The appointment is not what you are buying. One cheek takes a single cc and a jawline four. Toxin goes by treated area, filler and boosters by volume.",
  },
  {
    q: "Do I need a consultation before booking a treatment?",
    a: `Yes, and on the cosmetic side it is free. Allow ${todo.consultLength} minutes. Medical dermatology is a clinical appointment rather than a free consult.`,
  },
  {
    q: "Which of these are safe on deeper skin?",
    a: "How a treatment is set matters more than which one it is. Most trouble on Fitzpatrick IV to VI is a device run at settings validated on lighter skin. Ask what is being used, and why.",
  },
  {
    q: "What is not on this menu?",
    a: "Laser hair removal, which is still coming. And medical dermatology, which is diagnosed first and treated second, so it is not a menu item at all.",
  },
];

export const MENU_PAGE = {
  /**
   * "TREATMENTS MENU", on request -- it was "Service menu", specifically to
   * avoid the word "treatment" clashing with the cosmetic side's word for a
   * whole family and the home page's word for what the clinic treats. That
   * clash is a real one and worth knowing if this ever reads ambiguous: what
   * this page lists is one named SERVICE each, sold on its own, asked for by
   * name -- fifty-nine of them. The ten FAMILIES they belong to are the
   * cosmetic dermatology page's subject.
   *
   * TITLE FIXED ON REQUEST: "Everything the clinic offers" was not true. This
   * page lists cosmetic SERVICES, sold on their own; medical dermatology is
   * diagnosed first and is not a menu item at all, which the FAQ's own last
   * question already said ("What is not on this menu? ... medical
   * dermatology ... is not a menu item at all") -- the title was contradicting
   * the page under it. "Every treatment on the menu" is the claim this page
   * can actually back up.
   *
   * LEDE REWRITTEN ONCE ALREADY, for the same reason as the rules below: it
   * introduced "family" -- the cosmetic dermatology page's word for a group of
   * services -- as if this page had already explained it, when this page
   * groups by SECTION and never uses "family" anywhere else. A reader landing
   * here first had no way to know what it meant. That rewrite stated what
   * this page is, pointed elsewhere for what a treatment does, and stated the
   * no-price policy in one line -- correctly, but as one 40-word sentence
   * doing three jobs at once ("... of them across ... sections, and how each
   * one is sold") that took a second read to parse.
   *
   * REWRITTEN AGAIN ON REQUEST, FOR PLAINER WORDS AND SHORTER SENTENCES. Three
   * short sentences now, one job each: what is here, what is not (with where
   * to find it instead), and how the cost works. The section names are read
   * out of `MENU` itself via `sectionTitleList()` rather than typed here a
   * second time, so a section renamed in menu.ts cannot leave this sentence
   * saying something else.
   *
   * NO COUNT IN THIS SENTENCE ANY MORE, on request, and deliberately not
   * replaced with `MENU_ITEM_COUNT` the way the old one had one: the number is
   * exact and live either way (it is computed off `MENU`, so it can never go
   * stale), but a specific figure in the opening line reads as a claim the
   * page has to keep matching, and the list is expected to change. The table
   * itself still states the live count as you filter it -- see MenuBoard.tsx
   * -- which is where a reader wants the precise number, not in a sentence
   * that is trying to say what kind of page this is.
   */
  eyebrow: "Treatment menu",
  title: "Every treatment on the menu",
  lede: `We provide treatments across ${sectionTitleList()}. What each one does is on the cosmetic dermatology page. What it costs is quoted at your consultation, once we know what your skin needs.`,
  /*
    THE "HOW TO READ IT" ASIDE CAME OFF THIS PAGE'S HERO ENTIRELY, on request
    -- `rulesTitle` and `rules` (two entries: how the tick-a-section filter
    works, and what "sold as" means) used to fill it and are gone with it,
    rather than left here unread by anything. The text column takes the full
    width the aside used to share with it now (PageHero.tsx renders the text
    at `lg:col-span-12` rather than `lg:col-span-7` whenever no `aside` is
    passed).

    Neither rule's job has vanished, in case that reads as a gap: the filter
    is a checkbox with a label, which does not need a caption to be usable,
    and "sold as" is a column header sitting directly next to the values it
    describes. The FAQ still carries the one thing that genuinely needed
    stating in words -- "Why are there no prices on this page?" -- so nothing
    the aside said is unsaid, it just is not repeated up here as well.
  */
  faqTitle: "Before you book",
  /** Counts `MENU_FAQ` rather than saying "Six" by hand, so an FAQ added or removed there cannot leave this sentence stating the wrong number. */
  faqLede: `${InWords(MENU_FAQ.length)} things people ask on the phone, answered here so you do not have to.`,
  faq: MENU_FAQ,
};

/* -- /skincare ------------------------------------------------------------- */

/**
 * A route the 26 Aug meeting asked for and the clinic has not stocked yet.
 *
 * Dr. Abseret Hailu, 00:17:24, laying out the site's structure: "we can have a
 * skin care section as well. So eventually we're going to incorporate that, cuz
 * we are planning on selling skincare products in the clinic. So that should
 * also be on the website."
 *
 * Aser Hailu, 00:44:13: "the last website had a skincare section … you can use
 * that website to build the skin[care one]."
 *
 * WHAT SHAPE IT TAKES, and where that came from. Abseret, 00:44:13, walking the
 * group through the reference sites: "here they do skincare collection on the
 * bottom, if you see. So there's a few different ways to incorporate it." Aser,
 * in the same breath: "the last website had a skincare section … you can use
 * that website to build the skin[care one]." The Korean clinic site was the
 * first reference sent at all, at 00:09:40.
 *
 * What all of those pages do is a COLLECTION: a clean grid of large square
 * tiles on a light ground, a category and a name under each, and very little
 * type. Not an essay. So the collection is the first band, and the routine
 * follows it — the routine is the part that is useful before there is a shelf
 * to sell from.
 *
 * The page's shape, its place in the nav and its footer links are real. The
 * ranges are not chosen, so every product NAME is a bracketed placeholder while
 * every category and every line of advice is real. Nothing here claims the
 * clinic stocks anything it does not.
 */
export const SKINCARE_PAGE = {
  eyebrow: "Skincare",
  title: "Skincare that holds on deeper skin",
  lede: "A short shelf, chosen by the people treating your skin, and the routine that makes it work. Both are short on purpose. The routines that get abandoned are the long ones.",
  asideTitle: "Opening with the clinic",
  asideBody: `The shelf is being chosen now and stocked from ${todo.openingDate}. Until then this page is the advice without the products, and none of it depends on buying anything from us.`,
  /**
   * THE COLLECTION. Eight tiles, in the order a routine uses them.
   *
   * `name` is bracketed because the ranges are not chosen. `category` and
   * `note` are not: the category is what the product is for and the note is
   * what to know about that category on melanin-rich skin, both of which are
   * true whichever brand ends up on the shelf.
   *
   * `icon` keys into components/icons.tsx.
   */
  collectionTitle: "The collection",
  collectionLede:
    "A short shelf rather than a shop. Eight things, in the order a routine uses them, and each one chosen for skin that pigments rather than burns.",
  collection: [
    {
      category: "Cleanse",
      name: "[Gentle cleanser]",
      note: "Non-stripping, and enough of it to take off a day of sunscreen.",
      icon: "drip",
    },
    {
      category: "Repair",
      name: "[Barrier moisturiser]",
      note: "The step that makes everything else tolerable. Not optional on oily skin either.",
      icon: "boosterAlt",
    },
    {
      category: "Brighten",
      name: "[Vitamin C serum]",
      note: "Mornings. Works on dullness and on the marks left behind by old spots.",
      icon: "booster",
    },
    {
      category: "Renew",
      name: "[Retinoid]",
      note: "Evenings, slowly. Start twice a week; the people who go faster stop altogether.",
      icon: "tube",
    },
    {
      category: "Exfoliate",
      name: "[Exfoliating acid]",
      note: "Once or twice a week at most. Over-exfoliated skin darkens rather than glows.",
      icon: "peelAlt",
    },
    {
      category: "Pigment",
      name: "[Pigment corrector]",
      note: "For melasma and post-acne marks, and only alongside daily sun protection.",
      icon: "pigment",
    },
    {
      category: "Protect",
      name: "[Broad-spectrum SPF]",
      note: "Every morning. The one that leaves no grey cast is the one you will wear.",
      icon: "sun",
    },
    {
      category: "Aftercare",
      name: "[Post-procedure kit]",
      note: "What goes on the skin in the week after a peel, a laser or micro-needling.",
      icon: "scar",
    },
  ],

  /**
   * The routine. General dermatology written for this site, not any brand's
   * protocol and not tied to a product the clinic has committed to.
   */
  stepsTitle: "A routine you will actually keep to",
  stepsLede:
    "Four steps, morning and night, with one of them doing most of the work. Anything longer than this gets abandoned by week three, and an abandoned routine is worse than a short one.",
  steps: [
    {
      title: "Cleanse",
      body: "Once in the evening is enough for most people. The test is how your skin feels ten minutes later: tight and squeaky means the cleanser is too strong.",
    },
    {
      title: "Treat",
      body: "The one step that changes anything: a retinoid, a vitamin C, an acid or a pigment-directed agent. One at a time, slowly. Stacking three is the fastest route to marks on deeper skin.",
    },
    {
      title: "Moisturise",
      body: "Not a luxury and not only for dry skin. It is what keeps the barrier intact enough to tolerate the step above, which is why the actives fail without it.",
    },
    {
      title: "Sunscreen",
      body: "Every morning, indoors near a window included. On melanin-rich skin this is not about burning: it is what stands between you and the pigmentation most people come here about.",
    },
  ],
  cautionEyebrow: "One warning",
  caution:
    "Over-the-counter lightening creams are the most common cause of the damage we treat. They thin the skin and rebound worse the moment you stop. Nothing of the kind is sold here. If you use one, bring it in.",
};

/* -- Search engines -------------------------------------------------------- */

/*
  WESTLANDS IS NOT IN HERE ANY MORE, and it was in nine of these strings.

  Every description and every location keyword named Westlands, because the
  draft letterhead put the clinic at The Atrium on 88 Serenity. The final sheet
  moves it to OLA Energy Plaza in Muthaiga -- see constants/brand.ts -- and a
  meta description advertising the wrong suburb is the one kind of stale copy
  that gets a clinic found by people who then cannot find it.

  The suburb is written out rather than interpolated from `brand.address.area`,
  on purpose: these are sentences and keyword phrases, not fields, and half of
  them would need the surrounding words changed anyway if the clinic moved.
  Grepping for a place name finds all of them in one pass, which is how these
  were caught.
*/
export const META = {
  siteDescription:
    "Medical and cosmetic dermatology built for melanin-rich skin. Acne, eczema, hair loss, melasma, psoriasis, nail disease and mole checks, alongside injectables, facials, laser and PRP. Complimentary cosmetic consultation. Muthaiga, Nairobi.",
  shortDescription:
    "Medical and cosmetic dermatology built for melanin-rich skin, in Muthaiga, Nairobi.",
  medicalDescription:
    "Acne, eczema, hair loss, nail disease, melasma, psoriasis, rosacea, warts, skin tags, stretch marks, vascular birthmarks and mole checks, diagnosed and treated for melanin-rich skin in Muthaiga, Nairobi.",
  /*
    The opening phrase of each stays as somebody would search it -- "laser and
    body treatments in Nairobi" is a query, not a label. What follows counts
    things, and there the vocabulary applies: services on the menu, families on
    the cosmetic page. The `*Keywords` arrays below are search terms throughout
    and are deliberately not touched.
  */
  cosmeticDescription: `Injectables, fillers, skin boosters, PRP and PRF, facials, peels, laser and body treatments in Muthaiga, Nairobi. ${MENU_ITEM_COUNT} services across ${COSMETIC.length} treatment families, tailored and quoted at a complimentary consultation.`,
  menuDescription: `Every service at MELA SKIN: ${MENU_ITEM_COUNT} across ${sectionTitleList()}, with how each one is sold. Quoted at a complimentary consultation. Muthaiga, Nairobi.`,
  skincareDescription:
    "The four-step routine that holds on melanin-rich skin, and the products MELA SKIN will stock: cleansers, actives, pigment care and sun protection. Muthaiga, Nairobi.",
  contactDescription:
    "Contact MELA SKIN: 1st floor, OLA Energy Plaza, Muthaiga, Nairobi. Email, opening hours and a map with directions.",
  contactKeywords: [
    "MELA SKIN contact",
    "dermatology clinic Muthaiga address",
    "skin clinic Nairobi directions",
    "OLA Energy Plaza Muthaiga",
    "book dermatologist Nairobi",
  ],
  aboutDescription:
    "Why MELA SKIN was built around melanin-rich skin, how the clinic works, and the seven readings a consultation records before any treatment is recommended. Muthaiga, Nairobi.",
  keywords: [
    "MELA SKIN",
    "dermatology Nairobi",
    "cosmetic clinic Muthaiga",
    "melanin-rich skin",
    "melasma Kenya",
    "acne treatment Nairobi",
    "eczema Nairobi",
    "hair loss Nairobi",
    "traction alopecia Nairobi",
    "nail disease Nairobi",
    "psoriasis Kenya",
    "mole check Nairobi",
    "Botox Nairobi",
    "dermal filler Kenya",
    "PRP hair Nairobi",
    "dermatologist Muthaiga",
  ],
  cosmeticKeywords: [
    "Botox Nairobi",
    "dermal filler Nairobi",
    "Profhilo Kenya",
    "PRP hair Nairobi",
    "facials Muthaiga",
    "chemical peel Nairobi",
    "HIFU Nairobi",
  ],
  /** One per condition, so the list stays in step with ./conditions.ts. */
  medicalKeywords: CONDITIONS.map((condition) => `${condition.title} Nairobi`),
  aboutKeywords: [
    "dermatology clinic Muthaiga",
    "skin analysis Nairobi",
    "Fitzpatrick skin type",
    "dermatologist Nairobi about",
    "skin consultation Nairobi",
  ],
  menuKeywords: [
    "dermatology treatments Nairobi",
    "cosmetic dermatology Muthaiga",
    "Botox Kenya",
    "filler Nairobi",
    "facials Muthaiga",
    "HIFU Kenya",
    "PRP Nairobi",
  ],
  skincareKeywords: [
    "skincare melanin-rich skin",
    "sunscreen dark skin Kenya",
    "retinoid Nairobi",
    "hyperpigmentation skincare Nairobi",
    "dermatologist skincare Muthaiga",
  ],
};
