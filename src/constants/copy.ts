/**
 * PAGE COPY — the headings, ledes and short lists that sit around the service
 * data.
 *
 * Grouped by where it appears, so editing a page means opening one object
 * rather than hunting through components. Anything with a price or a service
 * name in it is interpolated from ./menu.ts, ./conditions.ts and ./cosmetic.ts
 * rather than typed twice, which is why a few strings are template literals.
 *
 * What is NOT here: button micro-labels, form field names, and the arrow
 * glyphs — those are interface, not content, and they live with the markup.
 */

import { CONDITIONS } from "./conditions";
import { COSMETIC, COMING_SOON } from "./cosmetic";
import { MENU, MENU_FROM, MENU_ITEM_COUNT, kes } from "./menu";
import { todo } from "./placeholders";

/* -- Home ----------------------------------------------------------------- */

export const HOME = {
  /** The argument for the clinic. Sits directly under the hero. */
  focus: {
    title: "Deeper skin isn’t harder to treat",
    subtitle: "It has simply been studied less.",
    paragraphs: [
      "Dermatology teaching images are overwhelmingly of white skin. On deeper complexions, inflammation reads violet or grey rather than red. It leaves pigment behind for months after the condition itself has cleared. Wounds that would flatten elsewhere raise into keloid. None of this is unusual — it is only under-taught, which is why so many patients arrive having already been told their condition was something else.",
      `Mela Skin was built to close that gap. ${todo.clinicianName}’s practice is organised around the conditions that present most often, and most stubbornly, in melanin-rich skin — with the medical and cosmetic sides of that care under one roof, so a diagnosis and the treatment it calls for do not need two clinics.`,
    ],
  },

  /** Three cards that orient the visitor and hand off to the subpages. */
  pillars: {
    title: "Two halves of one clinic",
    lede: "The two halves behave differently from the first phone call onwards. One has to be diagnosed before anyone can tell you what it costs. The other has a price list you can read right now. Start with whichever sounds like your problem.",
    cards: [
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
    ],
  },

  /** Both service lists in summary. */
  treatments: {
    title: "What we treat",
    lede: "Two lists. One is what people arrive worried about. The other is what they arrive wanting. Neither is longer than it needs to be, and nothing on either has been added to make the clinic look bigger.",
    medicalLabel: "Medical dermatology",
    medicalLink: `All ${CONDITIONS.length} in detail`,
    cosmeticLabel: "Cosmetic dermatology",
    cosmeticLink: "Every treatment family",
  },

  /** Six real figures, before the visitor has committed to anything. */
  prices: {
    eyebrow: "Prices",
    title: "Published, not on request",
    lede: `All ${MENU_ITEM_COUNT} cosmetic treatments carry a figure you can see before you call. Here are six of them.`,
    /**
     * `item` must match a name in ./menu.ts exactly — the figure is looked up,
     * never typed. `prefix: null` means the price is fixed rather than a floor.
     */
    anchors: [
      { item: "Express Hydra Cleanser", note: "Facial, single session", prefix: "From" },
      { item: "Skin Tag Removal", note: "Add-on, single session", prefix: null },
      { item: "Korean Glass Skin", note: "Brightening facial, single session", prefix: "From" },
      { item: "Botox (Nabota)", note: "Botulinum toxin, one area", prefix: "From" },
      { item: "PRP / PRF", note: "Hair or skin, single session", prefix: "From" },
      { item: "Filler (EPTQ)", note: "Hyaluronic acid filler, 1cc", prefix: "From" },
    ] as { item: string; note: string; prefix: string | null }[],
    notes: [
      {
        heading: "Sessions, then courses",
        body: "Every price is for one session unless the label says otherwise. Courses run in threes, fives, tens and twenties, and always work out cheaper per session — five Korean Glass Skin facials cost KES 95,000 rather than KES 125,000.",
      },
      {
        heading: "Injectables by volume",
        body: "Toxin is priced by area and filler by the cc, because that is what you are actually buying. A session is a meaningless unit when one cheek takes 1cc and a full jawline takes four.",
      },
      {
        heading: "Medical is quoted, not listed",
        body: "Acne, eczema, psoriasis and the rest are consultation-led. You leave your first appointment with the plan and its cost written down.",
      },
    ],
  },

  visit: { title: "What actually happens on your visit" },
  reviews: { title: "In their words" },
  comingSoon: { eyebrow: "Coming soon", ...COMING_SOON },
};

/* -- Booking band (every route) -------------------------------------------- */

export const BOOKING = {
  eyebrow: "Contact",
  title: "Book a consultation",
  lede: `${todo.consultLength} min with ${todo.clinicianName}. Online booking opens ${todo.bookingOpens}.`,
  formEyebrow: "Write to us",
  formNote: "We reply within hours.",
  messagePrompt: "Tell us briefly what brings you in",
  submitLabel: "Send message",
  submittingLabel: "Opening mail…",
};

/* -- /medical-dermatology -------------------------------------------------- */

export const MEDICAL_PAGE = {
  eyebrow: "Medical dermatology",
  title: "Named before it is treated",
  lede: "Ten conditions the clinic sees most, set out plainly: what each one actually is, how it tends to present on brown and black skin, and what the first appointment is for. If your condition is not on this list, it does not mean we cannot help — it means the list is a starting point rather than a catalogue.",
  asideTitle: "How to read this page",
  asideBody:
    "Every entry answers the same three questions in the same order — what it is, how it looks on deeper skin, and what happens at your appointment. Skip to whichever one you came for.",
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
      body: "Every cream, tablet, oil and injection, including the ones bought without a prescription and the ones a relative recommended. Skin-lightening products especially — they change what is safe to do next.",
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
  lede: `This is the half of the clinic you can browse. ${COSMETIC.length} families of treatment, every one of them with a figure attached and a course rate beside it, so you can work out what something costs before you speak to anyone. What a price will not tell you is whether it is the right treatment for your skin — that part still needs a conversation.`,
  stats: [
    { value: `${COSMETIC.length}`, label: "Treatment families" },
    { value: `${MENU_ITEM_COUNT}`, label: "Priced treatments" },
    { value: kes(MENU_FROM), label: "Lowest published price" },
  ],
  menuItemsLabel: "On the menu",
  closingTitle: "One number, not a range",
  closingLede:
    "Aesthetic pricing tends to arrive as “from” figures and quotes on request, which makes comparing two clinics almost impossible. The whole menu is published instead — single sessions, course rates, and the volume tiers for anything injected — so the arithmetic is yours to do.",
};

/* -- /treatment-menu ------------------------------------------------------- */

export const MENU_PAGE = {
  eyebrow: "Treatment menu",
  title: "Every price, in one place",
  lede: `${MENU_ITEM_COUNT} cosmetic treatments across ${MENU.length} sections, each with its single-session price and its course rate set out beside it. Nothing is held back for an enquiry form, and nothing on this page is a range. Prices start at ${kes(MENU_FROM)}.`,
  rulesTitle: "How to read it",
  rules: [
    { label: "Per session", body: "Unless the label says otherwise." },
    {
      label: "Course rates",
      body: "Blocks of 3, 5, 10 or 20 — always cheaper per session.",
    },
    {
      label: "Injectables",
      body: "Priced by treated area or by cc, not by appointment.",
    },
  ],
  faqTitle: "Before you book",
  faqLede:
    "Five things people ask on the phone, answered here so you do not have to.",
  faq: [
    {
      q: "What does a course actually get me?",
      a: "A prepaid block of sessions at a lower rate than buying them one at a time. The blocks run in threes, fives, tens and twenties depending on the treatment. Five Korean Glass Skin facials come to KES 95,000 on a course against KES 125,000 bought singly — that gap is why the column exists.",
    },
    {
      q: "Why are injectables priced by area and by cc?",
      a: "Because the appointment is not what you are buying. One cheek might take a single cc and a full jawline four, so pricing by session would charge two people very differently for the same work. Toxin goes by treated area, filler and boosters by volume, and the product name sits next to the price.",
    },
    {
      q: "Do I need a consultation before booking a treatment?",
      a: `For anything medical, yes. For the cosmetic side it is still the sensible route — a consultation is where the plan gets written down with its cost, which is more than a menu can do. Allow ${todo.consultLength} minutes; the consultation itself is ${todo.consultFee}.`,
    },
    {
      q: "Which of these are safe on deeper skin?",
      a: "The question is less which treatment than how it is set. Most of the trouble on Fitzpatrick IV to VI comes from a device run at settings validated on lighter skin, or a peel taken deeper than the skin will forgive — and the mark left behind is worse than what you walked in with. Ask what is being used and why. Anywhere worth your money will tell you.",
    },
    {
      q: "What is not on this menu?",
      a: "Laser hair removal, for now — that one is still coming. And all of medical dermatology: acne, eczema, psoriasis, melasma and the rest are quoted after a diagnosis rather than listed, because the cost depends entirely on what you turn out to have.",
    },
  ],
};

/* -- Search engines -------------------------------------------------------- */

export const META = {
  siteDescription:
    "Medical and cosmetic dermatology built for melanin-rich skin. Acne, eczema, melasma, psoriasis and mole checks, alongside injectables, facials, laser and PRP — with every cosmetic price published. Westlands, Nairobi.",
  shortDescription:
    "Medical and cosmetic dermatology built for melanin-rich skin, in Westlands, Nairobi.",
  medicalDescription:
    "Acne, eczema, melasma, psoriasis, rosacea, warts, skin tags, stretch marks, vascular birthmarks and mole checks — diagnosed and treated for melanin-rich skin in Westlands, Nairobi.",
  cosmeticDescription: `Injectables, fillers, skin boosters, PRP and PRF, facials, peels, laser and body treatments in Westlands, Nairobi — ${MENU_ITEM_COUNT} treatments, every one with a published price.`,
  menuDescription: `Every cosmetic treatment at Mela Skin with its price — ${MENU_ITEM_COUNT} treatments across facials, skin rejuvenation, body and hair, injectables and add-ons, from ${kes(MENU_FROM)}. Westlands, Nairobi.`,
  keywords: [
    "Mela Skin",
    "dermatology Nairobi",
    "cosmetic clinic Westlands",
    "melanin-rich skin",
    "melasma Kenya",
    "acne treatment Nairobi",
    "eczema Nairobi",
    "psoriasis Kenya",
    "mole check Nairobi",
    "Botox price Nairobi",
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
  menuKeywords: [
    "dermatology prices Nairobi",
    "Botox price Kenya",
    "filler price Nairobi",
    "facial prices Westlands",
    "HIFU price Kenya",
    "PRP price Nairobi",
  ],
};
