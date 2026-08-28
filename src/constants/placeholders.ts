/**
 * Facts and photographs the clinic has not supplied yet.
 *
 * Every value renders on the page inside visible [square brackets], so an
 * unfinished site never looks finished. Replace the value here — keep the
 * brackets off, they are part of the placeholder, not part of the layout — and
 * it updates everywhere at once.
 *
 * When a value is filled in, delete the brackets from the string. Nothing else
 * needs changing; the surrounding copy already reads correctly with a real
 * value in place.
 */
export const todo = {
  /** Premises and skincare copy: "Doors open …" */
  openingDate: "[December 2026]",
  /** Booking band: "Online booking opens …" */
  bookingOpens: "[Date bookings open]",
  hoursWeekday: "[Mon–Fri, 00:00–00:00]",
  hoursSaturday: "[Sat, 00:00–00:00]",
  /** Minutes. Used in the visit steps, the booking band and the menu FAQ. */
  consultLength: "[45]",
  /**
   * The MEDICAL consultation fee, and only that one.
   *
   * The cosmetic consultation is complimentary — that is a settled decision
   * (Dr. Abseret Hailu, 26 Aug, 00:16:05: "when it comes to cosmetic services
   * like the injectables, like the fillers, like the PRP, PRF, all of that will
   * be under the cosmetic section, and that we can offer free consults"), so it
   * is stated as a fact in the copy rather than held here.
   *
   * The medical side is a standard clinical visit at a set price (00:25:41: "I
   * think we should have pricing for medical consultations … that should be a
   * set price"). The figure has not been supplied, and whether it is published
   * at all was left open at 00:26:27 — so this stays bracketed. If the answer
   * is "do not publish it", replace the copy that uses it rather than inventing
   * a number.
   */
  consultFee: "[KES 0,000]",
  /** Weeks between the first appointment and the review. */
  reviewGap: "[6]",
  clinicianName: "[Dr. Full Name]",
  clinicianRole: "[Consultant Dermatologist]",
  clinicianReg: "[KMPDC Reg. No. 00000]",
  /** Footer: "Regulated by …" */
  regulator: "[KMPDC]",
  /** Footer: the company's KRA PIN. */
  pin: "[KRA PIN]",
} as const;

/**
 * THE PHOTOGRAPH LIST.
 *
 * Kept in one place because it is a shoot brief, not a set of scattered image
 * paths. From the 26 Aug meeting:
 *
 *   Dr. Abseret Hailu, 00:17:24 — "I'm not a huge fan on the AI pics of the
 *   people, because I do want it to be real."
 *
 *   Dr. Abseret Hailu, 00:33:33 — on what the landing photograph should be:
 *   "the desk where people are going to sit, with the two lit hanging lights,
 *   and where LED-lit Mela Skin [is]. That could be our photo for the landing
 *   page." And 00:51:10: "I think the entrance way would be ideal, cuz it'll
 *   have our brand name, it will have the aesthetic."
 *
 *   Aser Hailu, 00:49:00 — "one thing is, we don't have the clean space
 *   pictures yet, so I think we need to also keep that in mind."
 *
 * Every `src` here is null: this is the list of photographs the clinic owes, not
 * the list of what the site currently shows. Until the shoot happens the hero
 * runs `heroSamples` below instead, and every other slot renders as a labelled
 * brand-ground panel. Fill in a `src` and that slot becomes the photograph with
 * no other edit; fill in all three of the hero's and the samples stop being
 * used at all.
 */

export type Photo = {
  src: string | null;
  label: string;
  caption: string | null;
  /** Photographer and source. Shown on the page wherever a sample is shown. */
  credit?: string | null;
};

/**
 * THE HERO'S SLIDING SAMPLES.
 *
 * Three licensed stock interiors, used only while `photos.reception`,
 * `.cosmetic` and `.medical` are all empty. They slide rather than cross-fade,
 * which is the "dynamic" the meeting kept coming back to — Aser [00:37:22]:
 * "what about a dynamic landing page? Like a lot of tech businesses have like
 * motion, graphics"; Dr. Gachanja [00:49:44]: "a blend between this Canadian and
 * the Elevate, because of the dynamic aspect."
 *
 * The order follows Mo's [00:47:02]: "it shows the entrance, the reception, the
 * waiting area, and then flips into the cosmetic procedures." Entrance and
 * reception first, then the seating, then the consulting end.
 *
 * ALL THREE ARE BY THE SAME PHOTOGRAPHER, on purpose. A slider that changes
 * lens, colour temperature and exposure between frames reads as a slideshow of
 * stock; three frames shot the same way read as one building.
 *
 * WHAT DISQUALIFIED THE OTHER CANDIDATES, in order of how much it mattered:
 *  1. Another business's signage in frame. The first result for "clinic
 *     reception" carries another clinic's logo and name on the wall, which would
 *     put a competitor's brand on Mela Skin's hero. Non-negotiable.
 *  2. Faces. Nobody appears in any of these.
 *  3. The wrong palette. Grey marble hotel lobbies, mosaic-tiled spa zones and
 *     blue swimming pools all read as somebody else's brand.
 *
 * Unsplash License: free for commercial use, attribution not required. The
 * credit is shown anyway, because its job here is to say the photograph is not
 * the clinic's.
 */
export const heroSamples = [
  {
    id: "sample-reception",
    src: "/images/hero-sample-1.webp",
    label: "Reception & entrance",
    caption: null as string | null,
    /** https://unsplash.com/photos/pt0nGH-NvoA */
  },
  {
    id: "sample-waiting",
    src: "/images/hero-sample-2.webp",
    label: "The waiting area",
    caption: null as string | null,
    /** https://unsplash.com/photos/Ypv0MH4izf8 */
  },
  {
    id: "sample-consulting",
    src: "/images/hero-sample-3.webp",
    label: "The consulting end",
    caption: null as string | null,
    /** https://unsplash.com/photos/tUcVQwXsNck */
  },
] as const;

/**
 * The credit for the set, printed once rather than per frame.
 *
 * All three samples are by the same photographer on purpose (see the note
 * above), so a per-frame credit was the same string three times and had to be
 * lifted out of whichever component happened to be sliding. It is rendered
 * beside the hero's variant toggle.
 *
 * The Unsplash License requires no attribution. This line is here to say the
 * photographs are not the clinic's own, which is a different job — Abseret,
 * 00:17:24: "I do want it to be real."
 */
export const heroSampleCredit = "Sample images · Unsplash / Aalo Lens";

export const photos = {
  /** The hero's first frame, and the one everybody agreed on. */
  reception: {
    src: null as string | null,
    label: "[Reception & entrance]",
    caption: "The desk, the hanging lights, the lit sign",
  },
  /** The hero's second frame. */
  cosmetic: {
    src: null as string | null,
    label: "[A cosmetic treatment]",
    caption: "Injectables, boosters, facials, laser",
  },
  /** The hero's third frame. */
  medical: {
    src: null as string | null,
    label: "[A medical consultation]",
    caption: "Examined, named, then treated",
  },
  /**
   * PROVIDER PORTRAITS, on /about.
   *
   * Abseret set the shape of that page at 00:17:24: "usually you'll have a
   * little bit more of an about section about each provider. So either about
   * our clinic, our mission and vision, and then each provider that we have a
   * little bit of a bio about them." Portrait beside bio, one block each.
   *
   * `gachanja.src` is a SAMPLE and its `caption` says so under the picture on
   * the page. It is there so the layout can be reviewed rather than guessed at;
   * it is not Dr. Gachanja and must be replaced before launch. The second
   * provider is an empty slot, which is what an unlabelled sample would have to
   * become if nobody replaced it.
   */
  gachanja: {
    src: "/images/dermatologist.webp" as string | null,
    label: "[Dr. Gachanja's portrait]",
    /** Rendered under the picture, so the page says what this file says. */
    caption: "[Sample image. Not Dr. Gachanja.]" as string | null,
  },
  hailu: {
    src: null as string | null,
    label: "[Dr. Hailu's portrait]",
    caption: null as string | null,
  },
};
