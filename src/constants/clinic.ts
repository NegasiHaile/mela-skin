/**
 * THE CLINIC ITSELF — who you see, what happens on a visit, the premises, and
 * the review slots.
 *
 * The patient-journey structure (appointment → consultation → plan →
 * follow-up) is the clinic's own, from
 * Resources/Operations/…/Mela Skin - Focus Area.docx. The words around it are
 * written for the site.
 */

import { brand } from "./brand";
import { photos, todo } from "./placeholders";

export type Clinician = {
  /** Renders as the section heading. */
  name: string;
  role: string;
  /** Regulator registration number. Shown next to the role. */
  registration: string;
  /**
   * The most-read paragraph on a clinic page. Write it in their own voice
   * rather than in the third person.
   */
  bio: string;
  /**
   * One line each: qualifications, the registration, then any affiliation or
   * membership. Rendered by components/ClinicianProfile.tsx, which is shared
   * by /about's full listing and the ClinicianBand teaser on the home page and
   * /contact -- one array, the same rows wherever she appears.
   */
  credentials: string[];
  /**
   * Named special interests, one line.
   *
   * Dr. Abseret Hailu asked for this specifically (26 Aug, 00:32:49): "even if
   * you have a special interest in certain areas … under your bio you could be
   * like 'I have a special interest in hair loss' … 'in hyperpigmentation or
   * pigmentary disorders', so that people feel like they're being seen by an
   * expert within that. So maybe we can also include that in the bios."
   */
  interests: string;
  /**
   * `src: null` renders a labelled slot rather than a photograph. The generated
   * portrait that used to stand here was a made-up face presented as the doctor
   * you will see, which is exactly what Abseret objected to at 00:17:24.
   */
  portrait: {
    src: string | null;
    label: string;
    alt: string;
    /** Set where `src` is a stand-in, so the page can say so under it. */
    caption?: string | null;
  };
  /**
   * Set on exactly one entry: the clinician named wherever copy elsewhere on
   * the site needs to mention "the doctor" without listing everyone —
   * `PRIMARY_CLINICIAN` below is how that copy reaches her. Flagged explicitly
   * rather than assumed to be the array's first entry, so the name travels
   * with her if a second provider is ever listed ahead of her.
   */
  primary?: boolean;
};

/**
 * An array, so a second clinician is a matter of adding an entry rather than
 * editing a layout. With one entry the page renders exactly as it always has;
 * with two, the second block mirrors the first with the portrait on the other
 * side.
 */
export const CLINICIANS: Clinician[] = [
  /*
    THE QUALIFICATIONS ARE CORROBORATED, as of 3 Sep. They were flagged
    "confirm before launch" because the only source was Dr. Gachanja saying them
    aloud on the 26 Aug call (00:20:57): "I studied my undergraduate at
    University of Nairobi, I did my bachelor's of medicine and surgery, and then
    I proceeded to do my master's at Cardiff University — that's in clinical
    dermatology — and then later on I did aesthetic training with AAAM, which is
    American Academy of Aesthetic Medicine."

    `Resources/Deyabo Capital - Deal Announcement (MELA SKIN).pptx` lists her
    under Key Partners as "MBChB (Kenya), MSc(Derm) (UK)", which is the same two
    degrees in the abbreviated form: Nairobi is the Kenyan one, Cardiff the
    British one. A written owner document agreeing with the transcript is as
    close to confirmation as this gets without her saying so, so the long form
    below stands and the warning has come off it. The deck does not mention the
    AAAM aesthetic training, which is the transcript's alone.

    STILL HERS TO SUPPLY, and still bracketed: the bio paragraph, the
    registration number and the special interests. They are her outstanding
    action item from that meeting ("Provide bio: Submit personal background
    information to Negasi for the website profile"), and the deck has none of
    them. She should see this page before it goes live.

    DR. ABSERET HAILU IS THE DECK'S OTHER KEY PARTNER, listed as the
    international half against Dr. Gachanja's local one: "BSc, MD (Canada),
    CCFP, PgDip(Derm) (UK)". Her block came off this array at the 1 Sep daily
    for being nine tenths placeholder, and these qualifications do not change
    that: a provider block still needs a bio, a registration and a statement
    that she is seeing patients, and whether she is listed at all was always her
    call. The credentials are recorded here so nobody has to re-read the deck if
    the answer becomes yes.
  */
  {
    /*
      BIO AND INTERESTS, from her own stated title and tagline: "Dr. Margaret
      Gachanja / Board-Certified Dermatologist | Skin, Hair & Nails / Helping
      you glow" -- combined with the qualifications already corroborated above
      (Nairobi, Cardiff, AAAM). `role` is her own wording; the bio is written
      in the site's plain voice rather than as a lifted slogan, but says the
      same thing the tagline does: dermatology across skin, hair and nails
      together, aimed at a patient leaving looking and feeling better than
      when they arrived.
    */
    name: "Dr. Margaret Gachanja",
    role: "Board-Certified Dermatologist",
    registration: todo.clinicianReg,
    /** The only clinician listed right now, but flagged rather than assumed. */
    primary: true,
    bio: "Dr. Gachanja is a board-certified dermatologist, trained at the University of Nairobi and in clinical dermatology at Cardiff University, with further training in aesthetic medicine through the American Academy of Aesthetic Medicine. Her practice covers skin, hair and nails together, since on melanin-rich skin the three rarely present as separate problems.",
    /*
      ONE LIST, rendered wherever she appears -- see the note on
      components/ClinicianProfile.tsx. Corroborated only, on request: the
      registration, affiliation and membership rows came off completely
      rather than staying as rendered placeholders. `todo.clinicianReg`,
      `.clinicianAffiliation` and `.clinicianMemberships` are still defined in
      constants/placeholders.ts and `registration` is still on this object
      (see above) -- add any of them back onto the end of this array once the
      clinic has supplied it.
    */
    credentials: [
      "MBChB, University of Nairobi",
      "MSc Clinical Dermatology, Cardiff University",
      "Aesthetic training, American Academy of Aesthetic Medicine",
    ],
    interests: "Skin, hair and nail conditions together, rather than skin on its own.",
    portrait: {
      src: photos.gachanja.src,
      label: photos.gachanja.label,
      caption: photos.gachanja.caption,
      alt: "Dr. Margaret Gachanja, dermatologist at Mela Skin",
    },
  },
  /*
    DR. HAILU'S BLOCK WAS THE SECOND ENTRY AND CAME OFF AT THE 1 SEP DAILY.

    Everything in it except her name, her role and where she is based was
    bracketed — the transcript gave one paragraph of self-introduction and nothing
    a bio, a registration or a list of qualifications could be written from. A
    provider block that is nine tenths placeholder is a worse answer than one
    provider properly stated, and whether she is listed as a provider at all was
    always her call rather than the page's.

    The array is still an array. Adding her back, or adding a third name, is one
    entry here and nothing else: /about maps over it and alternates the portrait
    side, and the home teaser reads the first.
  */
];

/**
 * THE CLINICIAN NAMED WHEREVER COPY MENTIONS "THE DOCTOR" IN PASSING — the
 * Focus section on the home page, the booking CTA band, the editorial
 * direction's booking card. Those used to read a separate, generic
 * `todo.clinicianName` placeholder ("[Dr. Full Name]") that had nothing to do
 * with this array, so filling in a real name here left three other files
 * still showing brackets. One clinician is real now; this is the one export
 * that lets copy say so without typing her name a fourth time.
 *
 * Throws at module load rather than silently falling back to `CLINICIANS[0]`
 * if nobody is flagged `primary` — a wrong name in that copy is worse than a
 * build failure that says exactly what to fix.
 */
export const PRIMARY_CLINICIAN = (() => {
  const primary = CLINICIANS.find((clinician) => clinician.primary);
  if (!primary) {
    throw new Error(
      "constants/clinic.ts: no clinician in CLINICIANS is flagged `primary: true`.",
    );
  }
  return primary;
})();

/** The four beats of a first visit. Numbering is generated, not stored. */
export const VISIT_STEPS = [
  {
    title: "Appointment",
    body: "By email or through the form. You are asked what brought you in and how long it has gone on, so your history is read before you sit down.",
  },
  {
    title: "Consultation",
    body: `${todo.consultLength} minutes. Examination under proper lighting, a diagnosis in plain language, and photographs kept as a baseline.`,
  },
  {
    title: "Your plan",
    body: "In writing, priced up front: what it costs, how long it takes, and what happens if it does not work.",
  },
  {
    title: "Follow-up",
    body: `A review at ${todo.reviewGap} weeks, with a reminder before it. Pigmentation work usually fails from being abandoned early, not from being the wrong plan.`,
  },
];

/** The premises band: the room, the address, the hours, the photo slots. */
export const PREMISES = {
  /** Heading: the building and the suburb, which is how anyone refers to it. */
  title: brand.address.short,
  /*
    THE FACILITY, from the deal announcement deck. This was a bracketed
    placeholder asking somebody to describe the space; the deck describes it in
    numbers, which is better than an adjective would have been.

    "Built as a medical facility rather than converted into one" is the honest
    reading of a 2,000 sq ft floor with eight procedure rooms and a registered
    laboratory on it. The deck's own framing is that the operating assets of an
    existing dermatology centre were acquired in April 2026 and rebranded,
    which is why the clinic opens at this size instead of growing into it.

    THE PHARMACY CAME OUT ON REQUEST, EVERYWHERE IT APPEARED, not narrowed to a
    bracketed "not yet": there is no pharmacy at the clinic for now, and the
    clinic asked for the site to say nothing about it rather than something
    provisional. The deal deck's own "Key Clinic Details" named one, which is
    where every mention of it on this site traced back to -- removed here in
    constants/clinic.ts, in constants/about.ts's story paragraph and its "The
    room and the protocol" principle, and nowhere else (checked: the only file
    that had it).

    WHAT THE ROOMS LOOK LIKE is still a sentence only somebody who has stood in
    them can write, and it stayed bracketed here until launch was close enough
    that a visible "[One sentence left for somebody who has stood in it.]" was
    worse than saying nothing -- removed on request rather than filled in,
    since nobody has supplied it. Add it back onto the end of `intro` once
    someone has.
  */
  intro:
    "Just over 2,000 square feet on one floor: eight procedure rooms and a registered laboratory.",
  /**
   * Appended to `intro` on /about until launch, when the date was still
   * "[December 2026]" and unconfirmed -- removed from the render rather than
   * shown as a placeholder (see components/Clinic.tsx). Still used as-is by
   * the skincare page's own opening line, and by CLINIC_FACTS below, so
   * filling in `todo.openingDate` in constants/placeholders.ts updates every
   * one of those the moment it is confirmed.
   */
  opening: `Doors open ${todo.openingDate}.`,
  facts: [
    {
      label: "Address",
      lines: [...brand.address.lines],
    },
    /*
      THE ONE BLOCK ON THIS PAGE THAT IS ENTIRELY CONFIRMED FACT, and the only
      numbers a patient can use to picture the place before the photographs
      exist. Straight off the deal announcement deck's "Key Clinic Details".
    */
    {
      label: "The facility",
      lines: [
        "2,000+ sq ft on one floor",
        "8 procedure rooms",
        "Registered laboratory",
      ],
    },
    {
      label: "Hours",
      lines: [todo.hoursWeekday, todo.hoursSaturday],
    },
  ],
  /**
   * Photographs the clinic has not supplied. Each renders as a visibly
   * unfinished slot rather than as stock imagery. Replace a label with a real
   * image path once the shoot happens.
   */
  photoSlots: [
    "[Reception or treatment room]",
    "[Detail shot]",
    "[Exterior or signage]",
  ],
};

/**
 * Deliberately empty quotes. The clinic has not opened, so there are no
 * patients to quote — writing plausible-sounding reviews here would be
 * fabricating them. Each slot states what belongs in it instead.
 *
 * Kenyan practice, like most, requires written consent before publishing a
 * patient's words. Keep attribution to initials.
 */
/*
  THE REVIEW SLOTS ARE GONE, and the section that rendered them with them.

  There were three, all bracketed, because the clinic has not opened and there is
  nobody to quote — a testimonial band holding three placeholders says less than
  no testimonial band at all. Taken off at the 1 Sep daily.

  When there are real ones: get written consent first, keep the attribution to
  initials, and quotes about being correctly diagnosed after a long search carry
  the most weight on a clinic page.
*/

/** The facts plate on the editorial direction's feature row. */
export const CLINIC_FACTS = [
  { label: "Registered practice", value: todo.regulator },
  { label: "Doors open", value: todo.openingDate },
  { label: "Address", value: brand.address.short },
  { label: "Clinic hours", value: todo.hoursWeekday },
];

/** Contact block shown beside the booking form. */
export const CONTACT_DETAILS = [
  {
    label: "Clinic",
    lines: [...brand.address.lines],
  },
  /* One line, since 2 Sep: the phone number came off the site. */
  { label: "Reach us", lines: [brand.email] },
  { label: "Hours", lines: [todo.hoursWeekday, todo.hoursSaturday] },
];
