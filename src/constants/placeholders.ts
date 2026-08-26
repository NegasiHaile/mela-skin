/**
 * Facts the clinic has not supplied yet.
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
  /** Premises copy: "Doors open …" */
  openingDate: "[December 2026]",
  /** Booking band: "Online booking opens …" */
  bookingOpens: "[Date bookings open]",
  hoursWeekday: "[Mon–Fri, 00:00–00:00]",
  hoursSaturday: "[Sat, 00:00–00:00]",
  /** Minutes. Used in the visit steps, the booking band and the pricing FAQ. */
  consultLength: "[45]",
  /** Pricing FAQ. */
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
