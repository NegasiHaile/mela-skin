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
  /*
    THERE IS NO SEPARATE `bookingOpens` HERE ANY MORE. It used to be its own
    bracketed placeholder, "[Date bookings open]", answering a question that
    is really the same question as `openingDate`: online booking has no
    reason to open before the doors do, and no date has ever been floated for
    it to open later. So "Online booking opens …" now reads `openingDate`
    directly wherever it appears (constants/contact.ts and
    components-editorial/Booking.tsx) rather than a second bracket that would
    have to be kept in step with this one by hand. If the clinic ever does
    want booking to open on its own date, that is one line to reintroduce
    here, not a sign this merge was wrong.
  */
  hoursWeekday: "Mon–Fri, 9am–6pm",
  hoursSaturday: "Sat–Sun, Closed",
  /** Minutes. Used in the visit steps, the booking band and the menu FAQ. */
  consultLength: "45",
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
  /*
    THERE IS NO `clinicianName` HERE ANY MORE. It used to be a generic
    "[Dr. Full Name]" that copy interpolated without knowing which clinician it
    meant, which is exactly backwards once a real one exists: filling in her
    name in constants/clinic.ts left this bracket still showing in three other
    files. `PRIMARY_CLINICIAN.name`, exported from clinic.ts, is what copy
    reaches for now — see the note on `PRIMARY_CLINICIAN` there.
  */
  clinicianRole: "[Consultant Dermatologist]",
  clinicianReg: "[KMPDC Reg. No. 00000]",
  /**
   * The two credential rows the provider block has slots for and the clinic has
   * not supplied. They are separate from the qualifications, which are known:
   * see constants/clinic.ts -> CLINICIANS. Delete the entry rather than the
   * brackets if a provider holds neither -- the list is generated from the
   * array, so four rows and six both work.
   */
  clinicianAffiliation: "[Hospital or teaching affiliation, if held]",
  clinicianMemberships: "[Society membership, research or publications]",
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
  /**
   * REAL, AND THE FIRST PHOTOGRAPH ON THIS SITE THAT IS.
   *
   * Out of `Resources/Deyabo Capital - Deal Announcement (MELA SKIN).pptx`,
   * which carries a portrait of each Key Partner. Hers is the one at x=1185 on
   * the slide, beside "Local / Dr. Margaret Gachanja"; 1000x1250, a white-coat
   * portrait against a plain wall, converted to WebP at 71KB.
   *
   * IT REPLACES A LICENSED STOCK PORTRAIT, `dermatologist.webp`, which had to
   * carry "[Sample image. Not Dr. Gachanja.]" under it because it was somebody
   * else's face standing in for the doctor you would actually see. Dr. Abseret
   * Hailu, 26 Aug 00:17:24: "I'm not a huge fan on the AI pics of the people,
   * because I do want it to be real." The caption is `null` now, because there
   * is nothing left to disclose.
   *
   * The frame is about 0.76 wide-to-tall and this is 0.80, so `object-cover`
   * trims a little from the sides and nothing off the top. Her face sits on the
   * horizontal centre, which is where `object-center` keeps it.
   */
  gachanja: {
    src: "/images/dr-margaret-gachanja.webp" as string | null,
    label: "Dr. Margaret Gachanja",
    /** Rendered under the picture. Nothing to say now that the photo is real. */
    caption: null as string | null,
  },
  /**
   * ALSO REAL, AND DELIBERATELY NOT RENDERED.
   *
   * The deck's other Key Partner portrait, x=812, beside "International". It is
   * wired up so that adding Dr. Hailu back to constants/clinic.ts -> CLINICIANS
   * is one entry and nothing else; her block came off at the 1 Sep daily for
   * being nine tenths placeholder, and a photograph does not change that -- it
   * still needs a bio, a registration, and her agreement to be listed.
   */
  hailu: {
    src: "/images/dr-abseret-hailu.webp" as string | null,
    label: "Dr. Abseret Hailu",
    caption: null as string | null,
  },
};

/**
 * THE SOCIAL ACCOUNTS. One of them is real; three are not yet.
 *
 * LinkedIn was supplied on 1 Sep and is a live link. The other three have no
 * handle, so their `href` is null and the footer renders each as a visibly
 * unfinished slot rather than as a link to nowhere — the same rule the
 * photographs follow. A dead social icon in a footer is worse than no icon: it
 * gets clicked.
 *
 * ALL FOUR ARE LIVE as of 2 Sep. TO DROP A PLATFORM the clinic is not on, delete
 * its entry — the row is generated from this array, so three icons or five both
 * work. TO PUT ONE BACK IN PROGRESS, set `href` to `null` and wrap `label` in
 * brackets; it renders as a dashed, unfocusable slot again with no other change.
 * The `href: string | null` type and that branch in components/SocialLinks.tsx
 * both stay for exactly that.
 *
 * WHY THESE FOUR. Instagram and TikTok are where aesthetic clinics in Nairobi
 * actually post before-and-afters, Facebook is where the older half of the
 * catchment looks a business up, and LinkedIn is for hiring rather than for
 * patients. Whether the clinic wants all four is its call.
 *
 * WHATSAPP IS DELIBERATELY NOT HERE. It came out of the 31 Aug benchmarking as
 * the one clear channel gap — both comparable Nairobi clinics pin a WhatsApp
 * widget to every page — but it is a way of reaching a person rather than a
 * feed to follow, so it belongs beside the phone number and the email, not in a
 * row of social icons. Still not built, still the clinic's decision.
 */
export type SocialAccount = {
  /** Picks the glyph in components/SocialLinks.tsx. */
  id: "instagram" | "facebook" | "tiktok" | "linkedin";
  /** The accessible name, and the visible one while the slot is unfilled. */
  label: string;
  href: string | null;
};

/**
 * ONE HANDLE, WRITTEN TWO WAYS, AND THE PLATFORMS ARE WHY.
 *
 * The clinic's handle is `mela-skin`. LinkedIn takes it literally, because a
 * company-page slug is the one of these four that permits a hyphen. The other
 * three do not permit one at all:
 *
 *     LinkedIn (company)   letters, numbers, hyphens        mela-skin
 *     Instagram            letters, numbers, . _            melaskin
 *     Facebook (page)      letters, numbers, . (5 min)      melaskin
 *     TikTok               letters, numbers, _ .            melaskin
 *
 * So `melaskin` is not a shortening anybody chose here; it is the only form of
 * `mela-skin` those three will accept. It is also the form the clinic already
 * uses everywhere else it has to be one word — `melaskin.ke` and
 * `info@melaskin.ke` — which is the reason to close up the hyphen rather than
 * replace it with a dot or an underscore.
 *
 * NOBODY HAS CONFIRMED THE CLINIC HOLDS THE THREE NEW ONES. LinkedIn came from
 * the clinic directly on 1 Sep; these three are derived from the handle it gave.
 * A footer link to an account somebody else owns is worse on a clinic site than
 * a dashed placeholder, so if any of the three is not the clinic's, set that
 * `href` back to `null` and its `label` back to brackets — the row renders the
 * unfinished slot again with no other change.
 */
const HANDLE = "melaskin";

export const SOCIAL: SocialAccount[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: `https://www.instagram.com/${HANDLE}/`,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: `https://www.facebook.com/${HANDLE}`,
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: `https://www.tiktok.com/@${HANDLE}`,
  },
  {
    /* The one that keeps the hyphen. See the note above. */
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/mela-skin/",
  },
];
