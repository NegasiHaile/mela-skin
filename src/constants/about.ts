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
  lede: "A dermatology clinic in Muthaiga where the medical and cosmetic sides sit in one building, on one record.",

  /* -- Why the clinic exists ---------------------------------------------- */

  story: {
    title: "Why this clinic",
    /*
      REWRITTEN A SECOND TIME, ON REQUEST, TO DROP THE COMPARISON. The
      previous pass (see the note below it, kept for the research trail) still
      defined the clinic against lighter skin -- "a diagnosis built for
      lighter skin misses that" -- which was itself a fair improvement on the
      version before, but still framed as a contrast rather than a statement
      of what Mela Skin is FOR. Told on request to end on that instead: what
      the clinic focuses on, not what it is unlike.

      SO THE COMPARATIVE CLAUSES ARE GONE from both the pull and the first
      paragraph, and the first paragraph is shorter, one sentence rather than
      two. What is left is the same clinical fact this site states everywhere
      else without needing an opposite to state it against (see
      constants/conditions.ts -- violet or grey inflammation, marks that
      outlast the flare, keloid, all stated as what melanin-rich skin does,
      never as what it does unlike something else), plus a direct sentence of
      focus for the pull: dermatology and skincare, and melanin-rich skin is
      the whole of what either one is for here.

      THE KENYANS-ABROAD SENTENCE FROM THE PREVIOUS PASS CAME OUT TOO, for
      length rather than accuracy -- it is still true and still sourced (the
      deal announcement deck's own words are "a significant number of Kenyans
      currently seek dermatological and aesthetic treatments abroad, driven by
      a perception that comparable quality is unavailable locally"), it just
      no longer fits a one-sentence paragraph. It is a real, still-unused
      sentence if a later pass has room for it.

      PREVIOUS RESEARCH PASS, KEPT FOR THE TRAIL: the paragraph originally
      opened on "most textbook photographs are of white skin" -- true, and the
      reason the site still says "under-taught" on the home page (HOME.focus),
      but an observation about the profession rather than a statement of what
      this clinic is for. Replaced after checking every file in Resources/ for
      the clinic's own reason, and reading how three real skin-of-color-
      focused centres (Mount Sinai's, Weill Cornell's, UCLA's) state their own
      case.

      STILL MISSING, unchanged across both passes: WHO STARTED IT, in the
      founder's own voice. The deal deck and the 26 Aug meeting transcript
      were both checked for it and neither has it -- it stays out rather than
      invented.

      NOT NAMED HERE, and both are the clinic's call rather than a writing
      decision: the acquired business (Sonrol Dermatology Medical Center) and
      the parent (Deyabo Capital). Patients who knew the predecessor may well
      wonder, which is an argument for naming it; corporate structure on a
      patient page is an argument against.
    */
    paragraphs: [
      "Melanin-rich skin behaves, heals and scars in its own way, and every condition here is read and treated with that in mind.",
      "It took over a built facility in Muthaiga in April 2026, which is why it opens with eight procedure rooms and a laboratory of its own.",
      "Both sides sit under one roof, so a diagnosis and its treatment do not send you to two clinics. Every plan is written down, with its cost, before you agree to it.",
    ],
    /**
     * Set large beside the paragraphs. Must be a sentence, not a slogan.
     * States the focus directly rather than by contrast: dermatology and
     * skincare, for melanin-rich skin, and that is the whole of it.
     */
    pull: "Deep, deliberate dermatology and skincare for melanin-rich skin.",
  },

  /* -- Who makes what the clinic will sell --------------------------------- */

  principles: {
    title: "How we work",
    lede: "Six commitments, in the order they affect you.",
    items: [
      {
        title: "One roof, one record",
        body: "Same building, same notes, same clinician. A diagnosis and its treatment do not need two clinics or two sets of photographs.",
      },
      {
        title: "Settings chosen for your skin",
        body: "Your Fitzpatrick type, laser history and how you scar are recorded before a device is switched on. On IV to VI the setting decides the outcome, not the machine.",
      },
      {
        title: "A cost before you agree, not after",
        body: "The cosmetic consultation is free, and it is where the figure comes from: what is recommended, how many sessions, what it costs.",
      },
      {
        title: "A plan you leave with",
        body: "In writing, from the first appointment: the cost, the sessions, how long before anything shows, and what happens if it does not work.",
      },
      {
        title: "No treatment you do not need",
        body: "Some marks are better left alone, and some courses are not worth the cost. You get that at the consultation, not after it.",
      },
      {
        title: "The room and the protocol",
        /*
          THE FIRST OF ITS FOUR QUESTIONS IS ANSWERED. The deal announcement
          deck's key clinic details give the room count and the laboratory; it
          says nothing about single-room privacy, pain relief or how equipment
          is cleaned between patients, so those three stay bracketed. Patients
          ask about all four, and three quarters bracketed is still better
          than four quarters.

          THE PHARMACY CAME OUT ON REQUEST: there is no pharmacy at the clinic
          for now, and the site is not to say anything about it rather than
          hold its place with a bracket. See the longer note on this in
          constants/clinic.ts -> PREMISES.intro, where the same removal
          happened first.
        */
        body: "Eight procedure rooms and a registered laboratory, on one floor. [Confirm before launch: single-room privacy, pain relief, and how equipment is cleaned between patients.]",
      },
    ],
  },

  /* -- What a consultation examines --------------------------------------- */

  assessment: {
    title: "How your skin gets read",
    lede: `A reading, not a recommendation. ${todo.consultLength} minutes, three beats, every time.`,
    steps: [
      {
        title: "Read",
        body: "Proper lighting, what you have already used, and photographs kept on your record so a course can be measured against where it started.",
      },
      {
        title: "Explain",
        body: "What we found and what it means, in plain language. Including what it rules out, which is usually the more useful half.",
      },
      {
        title: "Decide",
        body: "The realistic options, their prices and their trade-offs. Then your choice, written down.",
      },
    ],
    /** The readings themselves. General dermatology, not a proprietary set. */
    parametersTitle: "What gets recorded",
    parametersLede:
      "Seven readings, each of which changes what is safe to do next. The last three matter most on deeper skin.",
    parameters: [
      {
        title: "Fitzpatrick type",
        body: "Where your skin sits on the I to VI scale, which is how it answers sun rather than how it looks. It sets the ceiling on every laser and peel setting.",
      },
      {
        title: "Pigment: pattern and depth",
        body: "Whether a mark sits in the epidermis, the dermis or both. That decides what will shift it, and whether it is worth starting.",
      },
      {
        title: "Texture and pores",
        body: "Scarring, roughness and pore size, recorded so improvement is judged against a photograph rather than a memory.",
      },
      {
        title: "Barrier and sebum",
        body: "How fast the skin loses water and how much oil it makes. A weak barrier changes what can be applied, and how strong.",
      },
      {
        title: "Vascularity",
        body: "Redness and visible vessels. On brown skin these read as warmth or a dusky tone rather than pink, which is why they get missed.",
      },
      {
        title: "How you scar",
        body: "Any keloid or raised scarring, in you or your family. It rules some procedures out and changes the technique for others.",
      },
      {
        title: "What you are already using",
        body: "Prescriptions, creams, oils and lightening products. The lightening ones matter most: they change what is safe to do next.",
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
  /*
    NEITHER OF THESE IS PRINTED SINCE 3 SEP, and the reason is the supplied
    design for the provider band: it opens on the portrait and the name, with no
    section head above them. See the note in components/Clinic.tsx.

    `title` still renders as an `sr-only` h2, because the /about hero's
    on-this-page nav links to #clinician under this exact label and the document
    outline should not have a hole in it. `lede` renders nowhere. It is kept
    because it is the sentence that belongs above the block if the head ever
    comes back, and because rewriting it later is worse than leaving it here.
  */
  providers: {
    title: "Who you will see",
    lede: "Who treats you: what she trained in, and what she sees most.",
  },

  /* -- The band on the home page and /contact ------------------------------ */

  /**
   * `body` used to be a short stand-in sentence shown instead of her own bio,
   * back when the band carried a shortened card of its own. It renders the
   * same ClinicianProfile as /about now -- see components/ClinicianBand.tsx --
   * so her real bio is what shows there too, and this is only the link label.
   */
  teaser: {
    cta: "Meet the providers",
  },
} as const;
