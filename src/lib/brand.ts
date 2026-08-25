/**
 * Verified brand facts, taken from the files in ../../Resources.
 *
 * Sources:
 *  - Marketing/Brand Identity/Letterhead/MELA SKIN - Letterhead_DRAFT.docx
 *    (address, phone, email, site, tagline)
 *  - Marketing/Brand Identity/MELA SKIN - Visual Identitiy Branding Presentation.pdf
 *    (descriptor lockup, tagline, address — hero subcopy)
 *  - Corporate/Entity Documents/PIN Certificate-Mela Skin Limited.pdf
 *    (registered name)
 *  - Operations/.../Mela Skin - Focus Area.docx (December launch, patient journey)
 *
 * Anything NOT in those files is a TODO below, not a value invented here.
 */
export const brand = {
  name: "Mela Skin",
  entity: "Mela Skin Limited",
  descriptor: "Dermatology & Cosmetic Clinic",
  tagline: "Richer. Radiant. You.",
  address: {
    line1: "The Atrium, 4th Floor",
    line2: "88 Serenity, Westlands",
    city: "Nairobi",
    country: "Kenya",
  },
  phone: "+254 7 447 7777",
  phoneHref: "tel:+254744777777",
  email: "info@melaskin.com",
  site: "www.melaskin.com",
  /** Hero subcopy — brand deck p.3–6, 24–25; letterhead address block. */
  hero: {
    line1: "Cosmetic & medical dermatology clinic.",
    line2: "The Atrium, 4th Floor, 88 Serenity, Westlands, Nairobi.",
  },
} as const;

/** Portrait frames for the hero push-slider. Order = autoplay order. */
export const heroSlides = [
  {
    src: "/images/hero.png",
    alt: "Woman with radiant melanin-rich skin — the Mela Skin patient aesthetic",
  },
  {
    src: "/images/pigmentation-melasma.png",
    alt: "Melanin-rich skin with a calm, luminous finish",
  },
  {
    src: "/images/acne-acne_scarring.png",
    alt: "Clear, treated skin after dermatology care",
  },
] as const;

/**
 * TODO — every value here is a placeholder. Each renders visibly bracketed on
 * the page so it cannot ship unnoticed. Replace with real information before
 * launch; delete the brackets, not the bracketed text's surrounding copy.
 */
export const todo = {
  openingDate: "[December 2026]",
  bookingOpens: "[Date bookings open]",
  hoursWeekday: "[Mon–Fri, 00:00–00:00]",
  hoursSaturday: "[Sat, 00:00–00:00]",
  consultLength: "[45]",
  consultFee: "[KES 0,000]",
  reviewGap: "[6]",
  clinicianName: "[Dr. Full Name]",
  clinicianRole: "[Consultant Dermatologist]",
  clinicianReg: "[KMPDC Reg. No. 00000]",
  regulator: "[KMPDC]",
  pin: "[KRA PIN]",
} as const;

export const nav = [
  { label: "Treatments", href: "#treatments" },
  { label: "Your Visit", href: "#visit" },
  { label: "The Clinic", href: "#clinic" },
  { label: "Contact", href: "#book" },
] as const;
