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
import { todo } from "./placeholders";

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
  portrait: { src: string; alt: string };
};

/**
 * An array, so a second clinician is a matter of adding an entry rather than
 * editing a layout. With one entry the page renders exactly as it always has;
 * with two, the second block mirrors the first with the portrait on the other
 * side.
 */
export const CLINICIANS: Clinician[] = [
  {
    name: todo.clinicianName,
    role: todo.clinicianRole,
    registration: todo.clinicianReg,
    bio: "[Two or three sentences: where they trained, the subspecialty interest that led to this clinic, and why Nairobi needed one built around melanin-rich skin. This is the most-read paragraph on a clinic page, so write it in their own voice rather than in the third person.]",
    credentials: [
      "[Qualifications, e.g. MBChB, MMed Dermatology]",
      todo.clinicianReg,
      "[Hospital or teaching affiliation, if held]",
      "[Society membership, research or publications]",
    ],
    portrait: {
      src: "/images/dermatologist.webp",
      alt: "The lead clinician at Mela Skin",
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
