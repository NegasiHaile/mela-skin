/**
 * Who the clinic is. Name, address, contact, tagline, hero photography.
 *
 * Every value here is taken from a file in ../../../Resources and can be
 * checked against it:
 *  - Marketing/Brand Identity/Letterhead/MELA SKIN - Letterhead_DRAFT.docx
 *    (address, phone, email, site, tagline)
 *  - Marketing/Brand Identity/MELA SKIN - Visual Identity Branding
 *    Presentation.pdf (descriptor lockup, tagline, address)
 *  - Corporate/Entity Documents/PIN Certificate-Mela Skin Limited.pdf
 *    (registered name)
 *
 * Anything the clinic has NOT confirmed lives in ./placeholders.ts instead,
 * where it renders in visible [square brackets] so it cannot ship unnoticed.
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
  /** The two lines under the tagline on the home hero. */
  hero: {
    line1: "Cosmetic & medical dermatology clinic.",
    line2: "The Atrium, 4th Floor, 88 Serenity, Westlands, Nairobi.",
  },
} as const;

/** Portrait frames for the hero push-slider. Array order is autoplay order. */
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
