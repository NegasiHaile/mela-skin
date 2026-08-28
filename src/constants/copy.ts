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

import { CONDITIONS } from "./conditions";
import { COSMETIC, COMING_SOON } from "./cosmetic";
import { MENU, MENU_ITEM_COUNT } from "./menu";
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
      "Dermatology teaching images are overwhelmingly of white skin. On deeper complexions, inflammation reads violet or grey rather than red. It leaves pigment behind for months after the condition itself has cleared. Wounds that would flatten elsewhere raise into keloid. None of this is unusual. It is under-taught, which is why so many patients arrive having already been told their condition was something else.",
      `Mela Skin was built to close that gap. ${todo.clinicianName}’s practice is organised around the conditions that present most often, and most stubbornly, in melanin-rich skin. The medical and cosmetic sides of that care sit under one roof, so a diagnosis and the treatment it calls for do not need two clinics.`,
    ],
  },

  /** Three cards that orient the visitor and hand off to the subpages. */
  pillars: {
    title: "Two halves of one clinic",
    lede: "The two halves behave differently from the first phone call onwards. One has to be diagnosed before anyone can say what treating it involves. The other you can browse, then talk through. Start with whichever sounds like your problem.",
    cards: [
      {
        eyebrow: "Medical dermatology",
        title: "Diagnosed first",
        body: `${InWords(CONDITIONS.length)} conditions, from acne, eczema and hair loss through psoriasis, melasma and mole checks. Each one gets named before anything is prescribed, so you leave with a plan rather than a shelf of creams.`,
        href: "/medical-dermatology",
        cta: "What we treat",
        count: `${CONDITIONS.length} conditions`,
      },
      {
        eyebrow: "Cosmetic dermatology",
        title: "Chosen, then tailored",
        body: "Injectables, fillers, boosters, PRP, hair, facials, peels, laser and body work. Read the whole menu here, then bring it to a consultation, which for the cosmetic side costs nothing.",
        href: "/cosmetic-dermatology",
        cta: "See the treatments",
        count: `${COSMETIC.length} families`,
      },
      {
        eyebrow: "Skincare",
        title: "Coming with the clinic",
        body: "The products worth using on melanin-rich skin, chosen by the people who will be treating it, and stocked at the clinic rather than recommended and left to you to find.",
        href: "/skincare",
        cta: "What we will stock",
        count: "At opening",
      },
    ],
  },

  /** Both service lists in summary. */
  treatments: {
    title: "What we treat",
    lede: "Two lists. One is what people arrive worried about. The other is what they arrive wanting. Nothing has been added to either to make the clinic look bigger than it is.",
    medicalLabel: "Medical dermatology",
    medicalLink: `All ${CONDITIONS.length} in detail`,
    cosmeticLabel: "Cosmetic dermatology",
    cosmeticLink: "Every treatment family",
  },

  /**
   * WHAT REPLACED THE PRICE BAND.
   *
   * Six figures used to sit here in display type. The 26 Aug meeting took
   * pricing off the site, so the section that held the numbers now states the
   * model instead — which is the thing a visitor actually needs to know before
   * ringing, and the thing the old band never said.
   *
   * Dr. Abseret Hailu, 00:15:01: "We want patients to feel that we're tailoring
   * a treatment for them, and not necessarily them selecting treatments … we
   * should have a section about … tailoring treatments directly to the patient,
   * and for that it's best done through consultation." This is that section.
   */
  consult: {
    eyebrow: "Consultation",
    title: "Tailored first, quoted second",
    lede: "There is no price list on this site, and that is deliberate. What an aesthetic treatment costs depends on how much of it your skin actually needs, and that is not a thing anyone can work out from a page.",
    notes: [
      {
        heading: "A list would be wrong for most people",
        body: "Two people asking for the same treatment rarely need the same amount of it. One cheek might take a fraction of what a full jawline does. A single published figure is wrong for both of them, and it pushes everyone towards picking a treatment before anybody has looked at their skin.",
      },
      {
        heading: "You leave with the plan and its cost",
        body: "Written down, before anything is booked: what is recommended, how many sessions it takes, how long before anything shows, and what the whole thing comes to. That is the figure that matters, and it is yours to take away and think about.",
      },
    ],
    /** The three ways a first appointment can go, as the meeting set them out. */
    tracks: [
      {
        label: "Cosmetic & aesthetic",
        kind: "Complimentary",
        body: "Injectables, fillers, boosters, facials, peels, laser, hair and body work. The consultation is free, so you can find out what is worth doing, and what is not, without committing to anything.",
      },
      {
        label: "Medical dermatology",
        kind: "Standard visit",
        body: `Acne, eczema, hair loss, psoriasis, melasma, nails, mole checks and the rest. This is a clinical appointment rather than a free consult, because it is where the diagnosis happens. ${todo.consultFee}, ${todo.consultLength} minutes.`,
      },
      {
        label: "The full detail",
        kind: "In clinic",
        body: "Every cosmetic treatment has a brochure at the clinic covering what it involves, what it feels like, and what to expect afterwards. Take one home; nobody remembers this much from a conversation.",
      },
    ],
    primary: "Book a consultation",
    secondary: "See the treatment menu",
  },

  visit: { title: "What actually happens on your visit" },
  reviews: { title: "In their words" },
  comingSoon: { eyebrow: "Coming soon", ...COMING_SOON },
};

/* -- /medical-dermatology -------------------------------------------------- */

export const MEDICAL_PAGE = {
  eyebrow: "Medical dermatology",
  title: "Named before it is treated",
  lede: `${InWords(CONDITIONS.length)} conditions the clinic sees most, set out plainly: what each one actually is, how it tends to present on brown and black skin, and what the first appointment is for. Hair and nails are on this list too. Both are dermatology, and both are regularly taken somewhere else first. If your condition is not here we may still be able to help. The list is a starting point rather than a catalogue.`,
  asideTitle: "How to read this page",
  asideBody:
    "Every entry answers the same three questions in the same order: what it is, how it looks on deeper skin, and what happens at your appointment. Skip to whichever one you came for.",
  indexLabel: "Jump to",
  /** The block under the conditions. Numbering is generated, not stored. */
  prepTitle: "Three things worth bringing",
  prepLede:
    "None of this is required and nobody will be sent home without it. It is simply what turns a first appointment from a guess into a diagnosis.",
  prep: [
    {
      title: "Photograph the bad days",
      body: "Most conditions behave. Almost none of them behave in a consulting room at eleven on a Tuesday. A phone picture of a flare at its worst is worth more than a paragraph describing it.",
    },
    {
      title: "Bring what you have used",
      body: "Every cream, tablet, oil and injection, including the ones bought without a prescription and the ones a relative recommended. Skin-lightening products matter most here, because they change what is safe to do next.",
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
  lede: `This is the half of the clinic you can browse: ${inWords(COSMETIC.length)} families of treatment, and what each one actually does to the skin. What none of it can tell you is which is right for yours, or how much of it you need. That part is the consultation, and on this side of the clinic it is free.`,
  stats: [
    { value: `${COSMETIC.length}`, label: "Treatment families" },
    { value: `${MENU_ITEM_COUNT}`, label: "Treatments on the menu" },
    { value: "Free", label: "Cosmetic consultation" },
  ],
  menuItemsLabel: "On the menu",
  /**
   * The brochures, stated once rather than on all ten cards. Aser Hailu,
   * 00:33:50: "we can also have clinic brochures for the cosmetics /
   * aesthetics stuff, so we don't need to publicise it on the website. And if
   * people come in and ask questions, we can just give them a pamphlet."
   */
  detailNote:
    "Each of these has a brochure at the clinic going considerably further than a web page usefully can: what the treatment involves, what it feels like, what to expect in the days after, and what it will not do. Ask for the one you are considering.",
  closingTitle: "Quoted for your skin, not from a list",
  closingLede:
    "Aesthetic pricing arrives as a figure on a page and then changes at the appointment, which is the worst of both. So there is no page: you get one plan, written down, with its cost on it, after somebody has looked at your skin. If it is not worth doing, that is what you will be told, and it will not have cost you a consultation fee to find out.",
};

/* -- /treatment-menu ------------------------------------------------------- */

export const MENU_PAGE = {
  eyebrow: "Treatment menu",
  title: "Everything the clinic offers",
  lede: `${MENU_ITEM_COUNT} treatments across ${inWords(MENU.length)} sections, each listed with how it is sold: a session, a course, a treated area, or a volume. No prices: what a treatment costs depends on how much of it your skin needs, so it is quoted at your consultation.`,
  rulesTitle: "How to read it",
  rules: [
    {
      label: "Sessions and courses",
      body: "Blocks of 3, 5, 10 or 20 where a treatment works better as a course than as a one-off.",
    },
    {
      label: "Areas and volumes",
      body: "Toxin by treated area, filler and boosters by cc. That is the unit, not the appointment.",
    },
    {
      label: "Costs",
      body: "Quoted in writing at your consultation, which is free for anything on this page.",
    },
  ],
  faqTitle: "Before you book",
  faqLede:
    "Six things people ask on the phone, answered here so you do not have to.",
  faq: [
    {
      q: "Why are there no prices on this page?",
      a: "Because an aesthetic treatment is sized to the person having it, and a published figure would be wrong for most of the people reading it. It also changes the conversation: patients start choosing treatments off a list rather than being told what their skin actually needs. So the menu tells you what we do and how it is sold, and the cost comes with the plan, in writing, at the consultation. For the cosmetic side that consultation is free, so finding out costs you nothing.",
    },
    {
      q: "What does a course actually get me?",
      a: "A prepaid block of sessions, at a better rate than buying them one at a time. The blocks run in threes, fives, tens and twenties depending on the treatment, and where a treatment appears with a course length beside it on this page, that is because it works considerably better as a course than as a single visit. The difference is worked out for you at the consultation.",
    },
    {
      q: "Why are injectables measured by area and by cc?",
      a: "Because the appointment is not what you are buying. One cheek might take a single cc and a full jawline four, so charging by session would charge two people the same for very different work. Toxin goes by treated area, filler and boosters by volume, and the product name sits next to the treatment so you can ask which one you are getting.",
    },
    {
      q: "Do I need a consultation before booking a treatment?",
      a: `Yes, and for the cosmetic side it is free. Allow ${todo.consultLength} minutes. It is where your skin gets examined properly, where the plan and its cost get written down, and where anything that should not be done to your skin gets ruled out. Medical dermatology is a standard clinical appointment rather than a free consult, because that is where a diagnosis is made.`,
    },
    {
      q: "Which of these are safe on deeper skin?",
      a: "How a treatment is set matters more than which treatment it is. Most of the trouble on Fitzpatrick IV to VI comes from a device run at settings validated on lighter skin, or a peel taken deeper than the skin will forgive, and the mark left behind is worse than what you walked in with. Ask what is being used and why. Anywhere worth your money will tell you.",
    },
    {
      q: "What is not on this menu?",
      a: "Laser hair removal, which is still coming. And all of medical dermatology: acne, eczema, hair loss, nail disease, psoriasis, melasma and the rest are diagnosed first and treated second, so they are not menu items at all.",
    },
  ],
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
  lede: "A short shelf, chosen by the people who will be treating your skin, and the routine that makes it work. Both are deliberately short. The routines that get abandoned are the long ones, and an abandoned routine does nothing at all.",
  asideTitle: "Opening with the clinic",
  asideBody: `The shelf is being chosen now and will be stocked from ${todo.openingDate}. Until then this page is the advice without the products. Worth reading either way, and none of it depends on buying anything from us.`,
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
      body: "Once in the evening is enough for most people; twice if you have been in dust or heavy sunscreen. The test is how your skin feels ten minutes later. Tight and squeaky means the cleanser is too strong, and a stripped barrier is what half of the irritation we see is actually about.",
    },
    {
      title: "Treat",
      body: "The one active step, and the one that changes anything: a retinoid, a vitamin C, an exfoliating acid or a pigment-directed agent, chosen for what you are trying to shift. One at a time, introduced slowly. Stacking three of them is the fastest route to the inflammation that leaves marks on deeper skin.",
    },
    {
      title: "Moisturise",
      body: "Not a luxury and not only for dry skin. It is what keeps the barrier intact enough to tolerate the step above, which is why the actives fail without it.",
    },
    {
      title: "Sunscreen",
      body: "Every morning, indoors near a window included. On melanin-rich skin this is not about burning. It is the single thing standing between you and the pigmentation that brings most people to this clinic, and it is doing more for melasma and post-acne marks than anything else on the menu.",
    },
  ],
  cautionEyebrow: "One warning",
  caution:
    "Skin-lightening creams sold over the counter are the single most common cause of the damage we will be treating. The hydroquinone-and-steroid mixtures thin the skin, spread pigment into patterns that are far harder to treat than what you started with, and rebound worse the moment you stop. Nothing of that kind will be sold here, and if you are using one, bring it in; it changes what is safe to do next.",
};

/* -- Search engines -------------------------------------------------------- */

export const META = {
  siteDescription:
    "Medical and cosmetic dermatology built for melanin-rich skin. Acne, eczema, hair loss, melasma, psoriasis, nail disease and mole checks, alongside injectables, facials, laser and PRP. Complimentary cosmetic consultation. Westlands, Nairobi.",
  shortDescription:
    "Medical and cosmetic dermatology built for melanin-rich skin, in Westlands, Nairobi.",
  medicalDescription:
    "Acne, eczema, hair loss, nail disease, melasma, psoriasis, rosacea, warts, skin tags, stretch marks, vascular birthmarks and mole checks, diagnosed and treated for melanin-rich skin in Westlands, Nairobi.",
  cosmeticDescription: `Injectables, fillers, skin boosters, PRP and PRF, facials, peels, laser and body treatments in Westlands, Nairobi. ${MENU_ITEM_COUNT} treatments across ${COSMETIC.length} families, tailored and quoted at a complimentary consultation.`,
  menuDescription: `Every treatment at Mela Skin: ${MENU_ITEM_COUNT} across facials, skin rejuvenation, body and hair, injectables and add-ons, with how each one is sold. Quoted at a complimentary consultation. Westlands, Nairobi.`,
  skincareDescription:
    "The four-step routine that holds on melanin-rich skin, and the products Mela Skin will stock: cleansers, actives, pigment care and sun protection. Westlands, Nairobi.",
  contactDescription:
    "Contact Mela Skin: the clinic is on the fourth floor of The Atrium, 88 Serenity, Westlands, Nairobi. Phone, email, opening hours, parking and a map with directions.",
  contactKeywords: [
    "Mela Skin contact",
    "dermatology clinic Westlands address",
    "skin clinic Nairobi directions",
    "The Atrium 88 Serenity Westlands",
    "book dermatologist Nairobi",
  ],
  aboutDescription:
    "Why Mela Skin was built around melanin-rich skin, how the clinic works, and the seven readings a consultation records before any treatment is recommended. Westlands, Nairobi.",
  keywords: [
    "Mela Skin",
    "dermatology Nairobi",
    "cosmetic clinic Westlands",
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
    "dermatologist Westlands",
  ],
  cosmeticKeywords: [
    "Botox Nairobi",
    "dermal filler Nairobi",
    "Profhilo Kenya",
    "PRP hair Nairobi",
    "facials Westlands",
    "chemical peel Nairobi",
    "HIFU Nairobi",
  ],
  /** One per condition, so the list stays in step with ./conditions.ts. */
  medicalKeywords: CONDITIONS.map((condition) => `${condition.title} Nairobi`),
  aboutKeywords: [
    "dermatology clinic Westlands",
    "skin analysis Nairobi",
    "Fitzpatrick skin type",
    "dermatologist Nairobi about",
    "skin consultation Nairobi",
  ],
  menuKeywords: [
    "dermatology treatments Nairobi",
    "cosmetic dermatology Westlands",
    "Botox Kenya",
    "filler Nairobi",
    "facials Westlands",
    "HIFU Kenya",
    "PRP Nairobi",
  ],
  skincareKeywords: [
    "skincare melanin-rich skin",
    "sunscreen dark skin Kenya",
    "retinoid Nairobi",
    "hyperpigmentation skincare Nairobi",
    "dermatologist skincare Westlands",
  ],
};
