/**
 * THE ABOUT PAGE — why the clinic exists, how it operates, and what a
 * consultation actually examines.
 *
 * STRUCTURE borrowed, CONTENT not. Two clinics were used as reference for what
 * a page like this should contain:
 *
 *   ortaclinic.com/en/introduce/brand   a brand page that states the gap in
 *                                       the market, then lists the operating
 *                                       principles that follow from it.
 *   theiaclinic.co.kr/en/ai-program     a diagnosis-led page: read the skin,
 *                                       interpret the reading, then treat.
 *
 * What is reproduced here is that SHAPE. None of their claims are. Orta's
 * device list (Ultherapy, Thermage, Onda, Excel V), their sleep-anaesthesia
 * offering and their private-room guarantee are theirs; TheiA's patented
 * "Derma: Code" AI camera is theirs. Mela Skin owns none of it, so none of it
 * is asserted here.
 *
 * Every principle below traces to something the site already establishes and
 * the clinic has already committed to (one roof, written plans, a cost agreed
 * before anything is booked). Where the equivalent claim needs the owner's
 * confirmation, it is a visible [bracketed] placeholder instead of an invented
 * sentence.
 *
 * Principle 3 used to be "Prices published in advance". The 26 Aug 2026 meeting
 * removed pricing from the site, so the commitment moved rather than
 * disappeared: it is now about when you learn the cost, not where. See the
 * header of ./menu.ts.
 *
 * The assessment parameters are general dermatology, not anybody's proprietary
 * protocol: Fitzpatrick typing, pigment depth, barrier and sebum, vascularity,
 * scarring history. They are the readings that actually change what is safe to
 * do on Fitzpatrick IV to VI, which is the whole argument of this clinic.
 */

import { todo } from "./placeholders";

export const ABOUT = {
  eyebrow: "About the clinic",
  title: "Built for the skin it treats",
  lede: "Mela Skin is a dermatology clinic in Westlands where the medical and cosmetic sides of skin care sit in one building, on one record, under one clinician. This page covers why it was set up that way, how it runs, and what actually gets examined before anyone recommends a treatment.",

  /* -- Why the clinic exists ---------------------------------------------- */

  story: {
    title: "Why this clinic",
    paragraphs: [
      "Dermatology is taught from photographs, and most of those photographs are of white skin. On deeper complexions the same condition changes colour, leaves pigment behind for months after it has cleared, and heals differently. It gets named wrong, then treated wrong, sometimes for years.",
      "[Two or three sentences on how the clinic came about: who started it, what they were doing before, and the point at which a practice built around melanin-rich skin started to look necessary rather than optional. Write it in the founder's voice.]",
      "Medical and cosmetic care sit under one roof here, so a diagnosis and the treatment it calls for do not send you to two clinics. Aesthetic treatment is sized to the skin in front of us rather than sold off a list, and the consultation where that gets worked out is free. Every plan is written down, with its cost, before you agree to it.",
    ],
    /** Set large beside the paragraphs. Must be a sentence, not a slogan. */
    pull: "Dermatology training follows its photographs, and its photographs are of white skin.",
  },

  /* -- How the clinic operates -------------------------------------------- */

  principles: {
    title: "How we work",
    lede: "Six commitments, in the order they affect you.",
    items: [
      {
        title: "One roof, one record",
        body: "Medical and cosmetic care happen in the same building and go on the same notes, with the same clinician deciding what your skin needs. A diagnosis and the treatment it calls for do not require two clinics or two sets of photographs.",
      },
      {
        title: "Settings chosen for your skin",
        body: "Fitzpatrick type, your history with lasers and how you scar are all recorded before a device is switched on. On Fitzpatrick IV to VI the setting decides the outcome more reliably than the machine does.",
      },
      {
        title: "A cost before you agree, not after",
        body: "The cosmetic consultation is free, and it is where the figure comes from: what is recommended, how many sessions, and what the whole thing comes to, written down before anything is booked. Nothing gets added to it later.",
      },
      {
        title: "A plan you leave with",
        body: "You go home from the first appointment with the plan in writing: what it costs, how many sessions it takes, how long before anything shows, and what happens if it does not work.",
      },
      {
        title: "No treatment you do not need",
        body: "Some marks and lesions are better left alone, and some courses are not worth what they cost for the result they give. Where that is the honest answer, it is the answer you get at the consultation rather than after the course.",
      },
      {
        title: "The room and the protocol",
        body: "[Confirm before launch: how many treatment rooms there are, whether every procedure happens in a private single room, what pain relief is offered and for which treatments, and how equipment is cleaned between patients. Patients ask about all four.]",
      },
    ],
  },

  /* -- What a consultation examines --------------------------------------- */

  assessment: {
    eyebrow: "Skin assessment",
    title: "How your skin gets read",
    lede: `Every plan starts with a reading rather than a recommendation. The consultation runs ${todo.consultLength} minutes and follows the same three beats each time, whatever you have come in for.`,
    steps: [
      {
        title: "Read",
        body: "Examination under proper lighting, a history of what you have already used, and clinical photographs kept on your record so a course can be measured against where it started.",
      },
      {
        title: "Explain",
        body: "What we found and what it means, in plain language. Including the parts that rule treatments out, which is usually the more useful half.",
      },
      {
        title: "Decide",
        body: "The realistic options with their prices and their trade-offs, then your choice. Written down before anything is booked.",
      },
    ],
    /** The readings themselves. General dermatology, not a proprietary set. */
    parametersTitle: "What gets recorded",
    parametersLede:
      "Seven readings, each of which changes what is safe to do next. The last three matter most on deeper skin.",
    parameters: [
      {
        title: "Fitzpatrick type",
        body: "Where your skin sits on the I to VI scale, which is how it responds to sun rather than how it looks. It sets the ceiling on laser and peel settings before anything else is decided.",
      },
      {
        title: "Pigment: pattern and depth",
        body: "Whether a mark sits in the epidermis, the dermis or both. That changes what will shift it, how long it takes, and whether it is worth starting.",
      },
      {
        title: "Texture and pores",
        body: "Scarring, roughness and pore size, recorded at baseline so improvement can be judged against a photograph rather than a memory.",
      },
      {
        title: "Barrier and sebum",
        body: "How quickly the skin is losing water and how much oil it is making. A compromised barrier changes what can be applied and at what strength.",
      },
      {
        title: "Vascularity",
        body: "Redness and visible vessels. On brown skin these read as warmth or a dusky tone rather than as pink, which is why they are so often missed.",
      },
      {
        title: "How you scar",
        body: "Any history of keloid or raised scarring, in you or in your family. It rules some procedures out completely and changes the technique for others.",
      },
      {
        title: "What you are already using",
        body: "Prescriptions, over-the-counter creams, oils and lightening products. Skin-lightening preparations matter most, because they change what is safe to do next.",
      },
    ],
    /**
     * TheiA's page is built around an imaging device. Mela Skin has not
     * confirmed one, so this asks rather than claims.
     */
    note: "[Confirm whether imaging-based skin analysis will be offered at launch and on what device. If it will be, name it here along with the readings it produces, and say whether it is included in the consultation fee or charged separately.]",
  },

  /* -- The providers ------------------------------------------------------ */

  /**
   * The section head above the provider blocks. It exists because there are two
   * of them now, and because Abseret named this as the second thing the page is
   * for (00:17:24): "either about our clinic, our mission and vision, and then
   * each provider that we have a little bit of a bio about them."
   */
  providers: {
    eyebrow: "Our providers",
    title: "Who you will see",
    lede: "Two clinicians, one record. Each block below is one of them: what they trained in, what they see most, and the areas they have a particular interest in, which is usually the more useful half.",
  },

  /* -- The band on the home page ------------------------------------------ */

  teaser: {
    eyebrow: "Who you will see",
    body: "Two clinicians, one record, and a plan you leave with in writing. The medical and cosmetic sides of your care sit in the same building rather than in two.",
    cta: "Meet the providers",
  },
} as const;
