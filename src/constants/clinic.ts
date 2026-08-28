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
  /** One line each. Qualifications, registration, affiliations, memberships. */
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
};

/**
 * An array, so a second clinician is a matter of adding an entry rather than
 * editing a layout. With one entry the page renders exactly as it always has;
 * with two, the second block mirrors the first with the portrait on the other
 * side.
 */
export const CLINICIANS: Clinician[] = [
  /*
    ⚠️ CONFIRM BEFORE LAUNCH. The qualifications below are the ones Dr. Gachanja
    stated herself on the 26 Aug call (00:20:57): "I studied my undergraduate at
    University of Nairobi, I did my bachelor's of medicine and surgery, and then
    I proceeded to do my master's at Cardiff University — that's in clinical
    dermatology — and then later on I did aesthetic training with AAAM, which is
    American Academy of Aesthetic Medicine."

    Her bio paragraph, her registration number and her special interests are
    hers to supply, and are her outstanding action item from that meeting
    ("Provide bio: Submit personal background information to Negasi for the
    website profile"). They stay bracketed until she does. She should see this
    page before it goes live.
  */
  {
    name: "Dr. Margaret Gachanja",
    role: "Dermatologist",
    registration: todo.clinicianReg,
    bio: "[Two or three sentences in her own voice: what she does at the clinic, what she sees most, and why a practice built around melanin-rich skin was worth starting in Nairobi. This is the most-read paragraph on a clinic page, so it should not read as a CV.]",
    credentials: [
      "MBChB, University of Nairobi",
      "MSc Clinical Dermatology, Cardiff University",
      "Aesthetic training, American Academy of Aesthetic Medicine",
      todo.clinicianReg,
    ],
    interests:
      "[Special interests, e.g. hair loss, pigmentary disorders. One line. This is what tells a patient they are being seen by someone who sees their problem often.]",
    portrait: {
      src: photos.gachanja.src,
      label: photos.gachanja.label,
      caption: photos.gachanja.caption,
      alt: "Sample portrait, standing in for Dr. Margaret Gachanja",
    },
  },
  /*
    Dr. Hailu introduced herself on the same call, 00:02:15: "I'm Dr. Hailu.
    I'm a skin doctor based out of Toronto, Canada … I will be basically
    consulting and collaborating with Aser on this project and this new venture
    of ours. And I'm really looking forward to bringing Mela Skin into hopefully
    a clinic that serves a greater area of East Africa."

    That is all the transcript gives, so everything except her name, her role
    and where she is based is bracketed. Whether she appears as a listed provider
    at all is her call — this block is here because the page's shape calls for
    the providers to be shown, and hers is the second one.
  */
  {
    name: "Dr. Abseret Hailu",
    role: "Consulting Dermatologist · Toronto",
    registration: "[Registration]",
    bio: "[Two or three sentences in her own voice: where she trained, what she practises in Toronto, and what brought her into a clinic built around melanin-rich skin in Nairobi.]",
    credentials: [
      "[Qualifications]",
      "[Registration, and whether it belongs on a Kenyan site]",
      "[Hospital or teaching affiliation, if held]",
      "[Society membership, research or publications]",
    ],
    interests:
      "[Special interests. One line, and the same reason as above: it is what tells a patient they are being seen by somebody who sees their problem often.]",
    portrait: {
      src: photos.hailu.src,
      label: photos.hailu.label,
      alt: "Dr. Abseret Hailu, consulting dermatologist at Mela Skin",
    },
  },
];

/** The four beats of a first visit. Numbering is generated, not stored. */
export const VISIT_STEPS = [
  {
    title: "Appointment",
    body: "Book online or by phone. You will be asked what brought you in and how long it has been going on, so the clinician has read your history before you sit down.",
  },
  {
    title: "Consultation",
    body: `${todo.consultLength} minutes. Examination under proper lighting, a diagnosis explained in plain language, and clinical photographs kept on your record as a baseline.`,
  },
  {
    title: "Your plan",
    body: "A written plan you leave with, priced up front: what it will cost, how long it will take, and what happens if it does not work.",
  },
  {
    title: "Follow-up",
    body: `A review at ${todo.reviewGap} weeks, with a reminder before it. Most pigmentation and scar work fails because it is abandoned early, not because it was the wrong plan.`,
  },
];

/** The premises band: the room, the address, the hours, the photo slots. */
export const PREMISES = {
  /** Heading. Currently the street line, which is how the brand refers to it. */
  title: brand.address.line2,
  intro:
    "[Describe the space in two or three sentences: the treatment rooms, the lighting, parking and access, and anything a patient would want to know before a first visit.]",
  /** Appended to `intro`. Keep the sentence, replace the placeholder. */
  opening: `Doors open ${todo.openingDate}.`,
  facts: [
    {
      label: "Address",
      lines: [brand.address.line1, brand.address.line2, brand.address.city],
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
export const REVIEW_SLOTS = [
  {
    quote:
      "[Patient review. Three or four lines sits best here. Quotes about being correctly diagnosed after a long search tend to carry the most weight on a clinic page.]",
    attribution: "[Initials] · [Treatment] · [Year]",
  },
  {
    quote:
      "[Patient review. A quote naming one specific outcome reads far stronger than a general compliment.]",
    attribution: "[Initials] · [Treatment] · [Year]",
  },
  {
    quote:
      "[Patient review. Written consent required before publishing. Keep attribution to initials.]",
    attribution: "[Initials] · [Treatment] · [Year]",
  },
];

/** The facts plate on the editorial direction's feature row. */
export const CLINIC_FACTS = [
  { label: "Registered practice", value: todo.regulator },
  { label: "Doors open", value: todo.openingDate },
  { label: "Address", value: `${brand.address.line1}, ${brand.address.line2}` },
  { label: "Clinic hours", value: todo.hoursWeekday },
];

/** Contact block shown beside the booking form. */
export const CONTACT_DETAILS = [
  {
    label: "Clinic",
    lines: [brand.address.line1, `${brand.address.line2}, ${brand.address.city}`],
  },
  { label: "Reach us", lines: [brand.phone, brand.email] },
  { label: "Hours", lines: [todo.hoursWeekday, todo.hoursSaturday] },
];
