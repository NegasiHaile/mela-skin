/**
 * Who the clinic is. Name, address, contact, tagline, hero photography.
 *
 * Every value here is taken from a file in ../../../Resources and can be
 * checked against it:
 *  - MELA SKIN - Letterhead_vf.docx (address, email, site, tagline). THE FINAL
 *    SHEET, and it is not the one this file used to read from: see the note on
 *    the address below for what changed and why the draft's values are gone.
 *  - Marketing/Brand Identity/MELA SKIN - Visual Identity Branding
 *    Presentation.pdf (descriptor lockup, tagline)
 *  - Corporate/Entity Documents/PIN Certificate-Mela Skin Limited.pdf
 *    (registered name)
 *
 * Anything the clinic has NOT confirmed lives in ./placeholders.ts instead,
 * where it renders in visible [square brackets] so it cannot ship unnoticed.
 */

import { heroSampleCredit, heroSamples, photos } from "./placeholders";

/**
 * The descriptor lockup's own line, hoisted out of the object so the hero
 * sentence can be built from it.
 *
 * They have to agree, and they are the only two places the phrase appears as
 * something a visitor reads. Written out twice they would eventually disagree
 * by one word, which on a line this short is the kind of thing that looks like
 * a mistake in the brand rather than a mistake in a file.
 */
const DESCRIPTOR = "Dermatology & Cosmetic Clinic";

/**
 * WHERE THE CLINIC IS, from the FINAL letterhead.
 *
 * `Resources/MELA SKIN - Letterhead_vf.docx` sets it across the bottom of the
 * sheet in three right-aligned lines, and these are those lines:
 *
 *     OLA Energy Plaza
 *     1st Floor, Unit 32
 *     Muthaiga, Nairobi
 *
 * IT IS NOT WHERE THE SITE SAID THE CLINIC WAS. Every contact value in this
 * file came from `Brand Identity/Letterhead/MELA SKIN - Letterhead_DRAFT.docx`,
 * which put the clinic at The Atrium, 4th Floor, 88 Serenity, Westlands, on
 * melaskin.com. The final sheet moves the building to Muthaiga and the domain
 * to .ke. So the draft's address, its suburb and its domain are out of the
 * whole site, and that reached further than the footer: the page titles, seven
 * meta descriptions, nine search keywords, the map query and the structured
 * data were all naming a suburb the clinic is not in.
 *
 * ONE SPELLING HERE IS NOT THE FILE'S. The letterhead reads "Muthiaga"; the
 * Nairobi suburb is Muthaiga, and Muthaiga is what is here. A transposed vowel
 * in an address stops a map resolving the building and reads as a mistake in
 * the clinic rather than in a document. Say the word and it goes back.
 */
const ADDRESS = {
  /** The building. */
  line1: "OLA Energy Plaza",
  /** Where in the building. */
  line2: "1st Floor, Unit 32",
  /** The suburb. This is the half of a Nairobi address people navigate by. */
  area: "Muthaiga",
  city: "Nairobi",
  country: "Kenya",
} as const;

/**
 * The three lines the letterhead prints, the suburb sharing the last one with
 * the city.
 *
 * COMPOSED ONCE, because every consumer used to build its own version out of
 * `line1`, `line2` and `city`. Eight of them did, in six files, and all eight
 * would have silently dropped `area` the moment it was added, which is how a
 * site ends up with the floor of a building and no suburb.
 */
const ADDRESS_LINES = [
  ADDRESS.line1,
  ADDRESS.line2,
  `${ADDRESS.area}, ${ADDRESS.city}`,
] as const;

export const brand = {
  /*
    FULL CAPS ON REQUEST, matching the wordmark: the logo has always set MELA
    SKIN in caps (Marks.tsx renders it as letterform paths, not text), and the
    site's own prose used to spell it "Mela Skin" -- one brand, two cases. This
    is the one place that mattered: everything that reads `brand.name` picked
    the new case up without being touched. Places that intentionally keep
    "Mela Skin" mixed-case did not read from here in the first place -- alt
    text and `sr-only` labels describing a photo or standing in for the
    wordmark, where a screen reader saying the name as two ordinary words
    serves a reader better than it reading as an acronym.
  */
  name: "MELA SKIN",
  entity: "MELA SKIN Limited",
  descriptor: DESCRIPTOR,
  tagline: "Richer. Radiant. You.",
  address: {
    ...ADDRESS,
    /** The letterhead's three lines. Use this to SET the address. */
    lines: ADDRESS_LINES,
    /** The same thing on one line, for prose and for the map query. */
    oneLine: ADDRESS_LINES.join(", "),
    /** Building and suburb. For a heading that has to name the place. */
    short: `${ADDRESS.line1}, ${ADDRESS.area}`,
  },
  /*
    THERE IS NO PHONE NUMBER IN HERE, and nothing on the site offers one.

    `+254 7 447 7777` is on both letterheads and it is not a line anybody
    answers: "remove the phone number from everywhere for now. Because that
    phone is not real", 2 Sep. It was a live `tel:` link in five places -- the
    top bar's mobile menu, the footer, the closing band on six routes, the
    contact page's hero card and the line under the form -- plus the
    `telephone` field in the structured data, which is the one that would have
    put it in a search result. All six are gone, and the two that offered a
    call offer the email address instead, which reaches somebody.

    IT IS NOT A BRACKETED PLACEHOLDER like the other unconfirmed facts in
    ./placeholders.ts, because those render on the page, and a footer reading
    "[Phone number]" is worse than a footer with no phone in it.

    When there is a real one: `phone` and `phoneHref` go back here and the six
    call sites are one `git show` away.
  */
  email: "info@melaskin.ke",
  site: "www.melaskin.ke",
  /**
   * The same domain as an origin, for canonical URLs, the sitemap, robots and
   * the structured data -- all four of which had `https://melaskin.com`
   * written out by hand, in eleven places across four files.
   */
  origin: "https://melaskin.ke",
  /**
   * THE HOME HERO. Two strings, and that is the whole first screen.
   *
   * It carried a tagline, an eyebrow, two lines of copy, a large brandmark and
   * a framed image stack. All of that is off it now:
   *
   *   Mo / operations, 26 Aug 00:47:02 — "my concern with the draft is that
   *   it's too busy. Even when I look at it, I'm not sure what exactly to look
   *   at … it would be best if we can do it in a clean format that feels like
   *   elegance and excellence."
   *
   *   Dr. Abseret Hailu, 00:56:08 — "I want our brand to be more clean. I don't
   *   want it to be so busy."
   *
   *   Negasi, 00:57:11 — "even if we are having the background image we can
   *   minimize the contents that we display on the first screen."
   *
   * What is left is the tagline (Aser, 00:37:22: "the text is strong, like the
   * 'richer, radiant you' reads well"), one sentence, and two buttons, over one
   * full-bleed image.
   *
   * THE SENTENCE OPENS ON THE DESCRIPTOR as of 1 Sep, and it did not before.
   * "Dermatology & Cosmetic Clinic" used to sit under the wordmark in the top
   * bar; it came off there because the bar is the one place the lockup competes
   * for width, and the line was setting at 8px to fit. Opening the hero sentence
   * with it puts the phrase back on the first screen at a size somebody can
   * actually read, and says what the clinic is before it says who it is for.
   *
   * It reads "Dermatology & Cosmetic Clinic built for melanin-rich skin, on one
   * record and under one roof." — the descriptor as the subject, which is what
   * the phrase is.
   */
  hero: {
    line: `${DESCRIPTOR} built for melanin-rich skin, on one record and under one roof.`,
    /**
     * The committed hero's two lines, kept for the demo variant that restores
     * it (components/hero/HeroOriginal.tsx). The current hero carries one line
     * and no address: the descriptor is in the header lockup a few centimetres
     * above and the address is on /contact, in the footer and in the JSON-LD,
     * so on the first screen they were the third and fourth things saying what
     * the other two already said.
     *
     * Named `legacy*` so nothing reaches for them by accident. They go when the
     * team picks a hero.
     */
    legacyLine1: "Cosmetic & medical dermatology clinic.",
    legacyLine2: `${ADDRESS_LINES.join(", ")}.`,
  },
} as const;

/**
 * THE HERO'S FULL-BLEED GROUND.
 *
 * The 26 Aug review of four reference sites landed on one image filling the
 * first screen with the clinic's name over it — the Canadian site's frame with
 * Elevate's lockup. Abseret [00:48:09]: "I also like the Elevate one where they
 * had the clinic name … This one I like the most. It was a little bit cleaner."
 *
 * `heroFrames` is the eventual sequence, and it is Mo's [00:47:02]: "it shows
 * the entrance, the reception, the waiting area, and then flips into the
 * cosmetic procedures … and then the next, medical procedure. So possible
 * potential clients are able to see our clean space, they're able to see a
 * glimpse of the cosmetics and the medical, on the landing page." Dr. Gachanja
 * [00:49:44] called that a blend of the two reference sites, which it is.
 *
 * NONE OF THE THREE EXISTS YET. Aser [00:49:00]: "one thing is, we don't have
 * the clean space pictures yet." So all three are empty and the hero slides
 * through `heroSamples` instead — three licensed stock interiors, credited on
 * the page. Point a `src` here at the clinic's own photograph and it takes over;
 * fill all three and the samples are never used again.
 */
export const heroFrames = [
  { id: "reception", ...photos.reception },
  { id: "cosmetic", ...photos.cosmetic },
  { id: "medical", ...photos.medical },
] as const;

/** Re-exported so components take the hero's samples from one place. */
export { heroSampleCredit, heroSamples };

/**
 * The last-resort ground, used only if the frames above and the samples are all
 * empty: the official 4_Pattern motif at architectural scale over Primary 2,
 * vignetted. Generated by `scripts/build-brand-assets.py` from the brand
 * package, so it is real artwork rather than a stand-in for one.
 */
export const heroBackground = {
  id: "brand",
  src: "/images/hero-background.webp",
  label: "MELA SKIN",
  caption: null,
  alt: "",
} as const;
