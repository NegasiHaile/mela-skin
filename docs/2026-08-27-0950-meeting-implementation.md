# 2026-08-27 09:50 EAT — Implementing the 26 Aug service-offerings & website meeting

What this document is: the list of changes about to be made to `web/`, and the
line in the meeting record that each one answers. Written before the work so
the team can disagree with a decision here rather than with a diff.

## Sources

| Source | Path |
| --- | --- |
| Meeting notes + full transcript (1:23:44) | `Resources/meeting-notes/2026-08-26 7pm-8pm EAT- MELA SKIN - Service Offerings & Website - Notes by Gemini.pdf` |
| New brand package (supersedes all previous brand assets) | `Resources/MELA SKIN - Visual Identity Assets/` |

Attendees quoted below: **Dr. Abseret Hailu** (dermatologist, Toronto —
consulting/collaborating), **Aser Hailu** (founder), **Dr. Margaret Gachanja**
(dermatologist, Nairobi), **Mo / Moipa** (operations, shown as "MELA SKIN" in
the transcript), **Negasi Abadi** (this work).

Timestamps in brackets are the transcript's own.

## Explicitly out of scope for this pass

- **The interactive AI chat / booking agent.** Requested by Abseret [01:06:51,
  01:08:13] and agreed to. Deferred by instruction — it is its own piece of
  work and will not be started here. No placeholder button is being added
  either, because a chat button that does nothing is worse than none.
- **EMR / patient-management platform selection** [01:05:39] — operations, not
  the website.
- **Hiring, brochures, pamphlets, consent forms, the pre-launch creator event**
  — all real action items, none of them `web/`.

---

## A. Brand foundation — the new visual identity package

### A1. Colour palette (official, replacing every previous value)

Abseret [00:18:31]: *"this brown is a little bit too red. It has a bit of a red
undertone. I would like it to be a bit more neutral … more yellow undertone."*
[00:35:00–00:36:06]: *"I just would like it to be as cool as that brown … more
of a coffee color, more like cooler than how warm that is."* And: *"if you are
going to use a lighter color, you can use creams."* Aser [00:19:34] then
dropped the designer's (Johan's) official palette into the chat.

`Resources/MELA SKIN - Visual Identity Assets/3_Color Pallet/` is that palette.
Every token in `src/app/globals.css` is repointed at it. Token **names do not
change** — they are used ~600 times across the components — only their values,
so the whole site moves at once and nothing has to be hand-audited.

| Token | Old | New | Source |
| --- | --- | --- | --- |
| `--color-ms-espresso` | `#31180a` | `#160F09` | Primary 1 |
| `--color-ms-cocoa` | `#4a2308` | `#2C190B` | Primary 2 |
| `--color-ms-field` | `#74370c` | `#602F0F` | Primary 3 |
| `--color-ms-terracotta` | `#c6722c` | `#99571D` | Primary 4 |
| `--color-ms-bronze` | `#8e714b` | `#B78850` | Primary 5 |
| `--color-ms-sand` | `#d5c6af` | `#CBAA7D` | Primary 6 |
| `--color-ms-cream` | `#f3e7d6` | `#F4E7D6` | Primary 7 |
| `--color-ms-shell` | `#fdfcf8` | `#FDFCF8` | Secondary 6 |
| `--color-ms-ivory` | `#fdfce8` | `#FDFCF8` | Secondary 6 |
| `--color-ms-panel` | `#542b15` | `#421E04` | Secondary 3 |
| `--color-ms-terracotta-deep` | `#8f4713` | `#854716` | Secondary 4 |
| `--color-ms-caramel` | *(new)* | `#D1A76D` | Secondary 5 |
| `--color-ms-paper` | `#f4efeb` | `#F9F3E9` | derived: 45% cream into shell |
| `--color-ms-gold` | `#dcbc63` | `#dcbc63` (kept) | sampled from the new gold emblem |

Three notes on the deltas:

- `ms-field` at `#602F0F` **is** the coffee brown Abseret asked for. The old
  `#74370c` is the red-leaning brown she objected to.
- `ms-clay` (`#b57035`) is **retired**. The new `ms-terracotta` `#99571D`
  clears WCAG AA on every light ground the site uses (5.48 on shell, 5.09 on
  paper, 4.62 on cream), which the old terracotta did not — so the six places
  that needed a hand-darkened accent can now use the official colour directly.
  Its usages move to `ms-terracotta` / `ms-terracotta-deep`.
- `ms-paper` is the only non-palette value, and it is a documented mix of two
  palette values rather than an invented colour. The site needs three light
  grounds to keep its section rhythm (shell / paper / cream); the sheet
  supplies two.
- `ms-gold` stays. Gold is not on the palette sheet, but the brandmark itself
  is a gold gradient and the sheet prints it in gold on all seven swatches.
  `#dcbc63` sits inside the new emblem's own measured ramp (highlights
  `#F8E088`, mids `#E0B858`/`#D8B050`/`#D0A848`, shadows `#503008`) and clears
  AA on field (5.97) and espresso (10.32), which no palette tone does at small
  sizes on field.

Contrast has been recomputed for every pairing the site actually uses; the
results go in the `globals.css` comments so the next person does not have to
redo the arithmetic.

`PatternField`'s per-section tone table, `viewport.themeColor`, the web app
manifest colours and the `BookingCta` radial gradient all carry hard-coded
hexes from the old palette. All are retuned.

### A2. Typography — Ranade becomes the secondary face

The package ships the brand's actual secondary font
(`5_Typography/Secondary Font/Ranade_Complete/`), including production `.woff2`
files and an ITF Free Font License that permits self-hosting. The official logo
lockup sets "DERMATOLOGY & COSMETIC CLINIC" in Ranade Medium.

The site currently substitutes Space Grotesk from Google Fonts. That is
replaced by self-hosted **Ranade Light 300 / Regular 400 / Medium 500** — the
same three weights, ~67KB total against Space Grotesk's ~60KB, and one fewer
third-party origin. Larken (primary) is already self-hosted and unchanged.

`PP Editorial Old` also ships in the package. It is not being wired up: nothing
in the current design needs a third face, and adding one would work against
"clean and sleek".

### A3. The logo — official artwork, no white background

Abseret [00:41:07]: *"the logo … it shouldn't have a white background. That's
an error. It should be just gold with a gold circle."*
Aser [00:41:07]: *"we can also play around with the logo — whether we do just
the M and then we do Mela Skin presented somewhere else … Maybe it's just the
giant circle of the M at the top."*

Two changes:

1. **New `Brandmark` component** drawn from the official vector
   (`2_Brand Mark/SVG/MELA SKIN - Primary Brandmark_2.svg` — four paths, ring
   plus M plus sparkle). Rendered as SVG with either a gold gradient or
   `currentColor`, transparent everywhere the artwork is transparent. The
   circle interior of the supplied gold PNG is confirmed fully transparent
   (alpha 0 at six interior sample points), so the white disc Abseret saw was
   an artefact of the old processed file, not of the artwork. The current
   `Monogram` renders a 639KB raster; the SVG is under 1KB and scales.
2. **New `Wordmark` uses the official letterforms.** `1_Logo/Secondary Logo/SVG/
   MELA SKIN - Secondary Logo_3.svg` is the wordmark as 11 clean vector paths.
   Today the header sets the words "Mela Skin" in Larken Bold, which is not the
   logo's drawn face. Replacing it means the header finally shows the real
   logo. The descriptor line under it stays live text in Ranade Medium, which
   is what the official lockup uses and what keeps it selectable and
   translatable.

Aser's "just the M" option is implemented as a `mark`-only variant, used on the
hero (see D) with the wordmark set separately beneath it.

### A4. Derived raster assets

`public/brand/`, the favicons, the PWA icons and the social card are all built
from the old artwork. They are regenerated from the new package by a rewritten
`scripts/build-brand-assets.py` (replacing `extract-logo.py`):

- `brandmark-gold.png` / `-cream.png` / `-brown.png` from `2_Brand Mark/PNG/`
- `wordmark-brown.png` / `-cream.png` from `1_Logo/Secondary Logo/PNG/`
- `favicon.ico`, `favicon.png`, `icons/icon-192`, `icons/icon-512`,
  `icons/maskable-512`, `apple-touch-icon.png` — gold mark on the new field
  brown (the mark is a thin ring; on a transparent favicon it disappears at
  32px, so it gets a ground)
- `og-image.jpg`, `opengraph-image.jpg`, `twitter-image.jpg` — 1200×630, field
  brown, official pattern, gold mark, official wordmark, the tagline

Old `logo*.png` / `share-square.png` are removed once nothing references them.

### A5. The pattern

`4_Pattern/SVG/MELA SKIN - Pattern.svg` confirms the existing reconstruction in
`BrandPattern.tsx` is geometrically right — overlapping circles whose
interstices form the four-pointed sparkle, on a dark-to-caramel vertical
gradient. The drawn version is kept (it tiles, recolours per section and stays
crisp), with its gradient stops moved onto the official palette and a note
recording that the official artwork has now been checked against it.

---

## B. Pricing — remove every figure from the website

This is the meeting's headline decision and it is unanimous.

- Abseret [00:13:54]: *"It's not typically routine to disclose pricing on
  websites. You want patients to come in for a free consultation … pricing I
  would like not to have on a website."*
- Abseret [00:15:01]: *"We want patients to feel that we're tailoring a
  treatment for them and not necessarily them selecting treatments … we should
  have a section about … tailoring treatments directly to the patient, and for
  that it's best done through consultation."*
- Dr. Margaret Gachanja [00:26:27]: *"on the aesthetic side … everything will be
  tailor made for each person. So maybe putting a blanket figure may not be
  ideal."*
- Abseret [00:30:28]: *"we start with no pricing and then [ops] can assess …
  which percentage of patients are uptaking … if they feel like it would have
  been helpful to have pricing up front then we can always add that."*
- Aser [00:33:50]: *"we can also have clinic brochures for the cosmetics /
  aesthetics stuff. So we don't need to publicise it on the website."*
  Abseret: *"I like that idea a lot."*

### B1. The figures leave the client bundle, not just the screen

`src/constants/menu.ts` currently holds every price from
`Resources/REVISED MENU OF GLO365 - 2025.pdf`. Simply not rendering them is not
enough — a Next.js constant ships to the browser, so an unrendered price is
still a published price, readable in view-source. The numbers therefore come
**out** of the file.

What stays is everything that is not a figure and is still useful to a visitor:
the treatment names, the section and group structure, and how each treatment is
sold — single session, course of 3 / 5 / 10 / 20, per treated area, per cc.
"Courses are available and work out cheaper per session" is information; it is
not a price.

`MenuItem.tiers: {label, price}[]` becomes `MenuItem.formats: string[]`.
`kes()`, `fromPrice`, `fromPriceForGroup`, `fromPriceForItem`, `sectionFrom`,
`MENU_FROM` and `familyFrom` are all deleted. `MENU_ITEM_COUNT` and
`sectionItemCount` survive — counts are not prices.

The printed sheet stays where it is, in `Resources/`, as the clinic's record. A
header comment in `menu.ts` says so, and says why the figures are not here.

### B2. `/treatment-menu` becomes a responsive table

Instruction from the brief: *"in the menu and prices you simply display the menu
in an easy way, maybe responsive table like."* This also answers Abseret's
*"less is more"* [00:33:50] and Mo's *"my concern with the draft is that it's too
busy — I'm not sure what exactly to look at"* [00:47:02].

`MenuBoard.tsx` is rewritten. Today each treatment is a card carrying a large
lead price and three course rates — 60-odd cards, all of which existed to hold
figures. Replacing them with a real table:

- one `<table>` per menu section, two columns: **Treatment** and **Offered as**
- "Offered as" is small chips: `Single session` · `Course of 5` · `Course of 10`
  (or `Per area` / `Per cc` for injectables)
- group names (`Renewal`, `Brightening`, `Age-defying`, …) become `<tbody>`
  row-group headers, so the printed sheet's structure survives
- below `sm` the table collapses to stacked rows — treatment name, then its
  chips beneath — driven by CSS, not by rendering the list twice
- horizontal scroll container on the table so nothing forces the page wide
- the sticky section nav stays; it is the useful thing to pin on a long page
- each section keeps its one-line blurb, rewritten without price language

Page title, `<h1>` and metadata drop "prices": **"Treatment menu"**.

### B3. The home page price band becomes the consultation band

`src/components/Prices.tsx` — six figures set large — is replaced by
`Consultation.tsx`, which states the model the meeting actually agreed:

- cosmetic and aesthetic treatments are **quoted at a complimentary
  consultation**, because the treatment is tailored to the skin in front of us
  (Abseret [00:15:01, 00:16:05]; recorded in the notes' Decisions Aligned)
- **medical dermatology is a standard consultation**, not a free one — Abseret
  [00:16:05] was explicit that patients must not assume otherwise: *"under the
  medical section, that would be a regular visit and not a free consult"*
- you leave with the plan **and its cost** written down (already the clinic's
  own commitment, `clinic.ts` → `VISIT_STEPS`)
- detail on individual cosmetic procedures is in the **clinic brochures**
  (Aser [00:33:50])

The consultation fee for medical stays a bracketed placeholder. Abseret said it
*should* be a set price [00:25:41] but the figure has not been supplied, and
whether it is published at all was left open [00:26:27].

### B4. Everything else that quotes a figure or a "from" price

| File | Change |
| --- | --- |
| `constants/copy.ts` | `HOME.prices` → `HOME.consult`. `COSMETIC_PAGE.stats` loses "Lowest published price". `COSMETIC_PAGE.closing*` ("One number, not a range") rewritten. `MENU_PAGE.lede`, `.rules`, `.faq` rewritten — the course-rate arithmetic and the two price examples go. `META.*` descriptions and keywords drop "every price published", "Botox price Nairobi", "filler price Nairobi", "HIFU price Kenya" etc. |
| `constants/cosmetic.ts` | `familyFrom` deleted. Summaries and bodies rewritten off price language: "Starting at KES 7,000", "starting at the lowest price on the menu", "priced by area rather than by the hour", "at a published price", "the menu prints both figures side by side". Each family gains a line pointing at the in-clinic brochure instead. |
| `constants/navigation.ts` | Nav item "Menu & prices" → **"Treatment menu"**. Its dropdown rows lose the from-price column and keep the treatment count. `All N prices` → `All N treatments`. Footer column heading likewise. |
| `constants/about.ts` | Principle 3, "Prices published in advance", becomes **"A price before you agree"** — the plan and its cost in writing at the consultation. This is a real commitment the clinic already made; it just moves from the website to the appointment. |
| `constants/conditions.ts` | Skin tags: *"Priced on the menu"* / *"one of the few things on this list with a fixed price"* → the treatment is named without a figure. |
| `components/Treatments.tsx` | Cosmetic rail cards lose their "From KES …" foot; the card foot becomes the treatment-family count and the arrow. Closing band button "Menu & prices" → "Treatment menu". |
| `components/CosmeticFamilies.tsx` | Cards lose the "From KES …" block. "Every price →" → "See it on the menu →". |
| `lib/jsonld.ts` | `makesOffer` / `AggregateOffer` / `lowPrice` / `offerCount` removed, and `priceRange` with them — asserting a price band in structured data while declining to publish prices is the same disclosure by another route. |
| `app/treatment-menu/page.tsx` | Title, hero aside ("How to read it"), and the FAQ block. |

---

## C. Structure the meeting asked for

Abseret [00:16:05–00:17:24] gave the page list explicitly, and [00:59:51]:
*"The biggest takeaway with the websites is how to structure what we offer — the
about page, the medical page, the cosmetic page, the skincare product. When it
comes to the design aspect, you can have freedom to express our vision in any
way as long as it's clean, sleek … more simple."*

Landing → About (clinic mission/vision, then a bio per provider) → Medical
(in depth) → Cosmetic → **Skincare** → Contact last. Four of the six exist.

### C1. New `/skincare` route

Abseret [00:17:24]: *"we can have a skin care section as well. So eventually
we're going to incorporate that, because we are planning on selling skincare
products in the clinic. So that should also be on the website."*
Aser [00:44:13]: *"the last website had a skincare section … you can use that
website to build the skin[care one]."*

Built now, honestly staged: the section's shape, its place in the nav, footer
and sitemap, and bracketed placeholders for the ranges the clinic has not
chosen yet. No invented product names, no invented brands. Follows the
`placeholders.ts` convention so it cannot ship looking finished.

### C2. Two conditions added to medical dermatology

Abseret [00:31:40]: *"my thing for the medical side, Dr. Maggie, is … for the
general public they may not be aware of what a dermatologist may cover. **We
haven't covered hair loss** in the list that we currently have. **We haven't
covered any nail diseases** in the list that we have, which is in the wheelhouse
of derm. So maybe we can do a deep dive list for patients, cuz I assume a lot of
people are not going to be health literate. The more we can spell it out for
patients on what we're going to see, the more uptake we're going to have."*

`CONDITIONS` gains **Hair loss** (`hair-loss`) and **Nail disease**
(`nail-disease`), written in the file's existing three-beat voice — what it is,
how it presents on melanin-rich skin, what the first appointment is for — with
no outcome promises. Ten becomes twelve, and the count propagates on its own to
the home index, the medical page, the footer, the keywords and the JSON-LD.

Two new icons are added to `components/icons.tsx` for them.

Dr. Margaret Gachanja's action item is to expand the list further [00:32:49:
*"I've not seen the list, but I'd be willing to add to whatever is missing"*].
A bracketed note records that the list is open.

### C3. Provider bios, with special interests

Abseret [00:32:49]: *"even if you have a special interest in certain areas …
under your bio you could be like 'I have a special interest in hair loss' … 'in
hyperpigmentation or pigmentary disorders', so that people feel like they're
being seen by an expert within that. So maybe we can also include that in the
bios when Dr. Maggie gives Negasi her bio."*

- `Clinician` gains an **`interests`** field, rendered as its own labelled line.
- `CLINICIANS` is populated with **Dr. Margaret Gachanja** and only what she
  stated on the call [00:20:57]: MBChB, University of Nairobi; MSc Clinical
  Dermatology, Cardiff University; aesthetic training with the American Academy
  of Aesthetic Medicine. Her KMPDC registration, her bio paragraph and her
  special interests stay bracketed — she is sending those.
- The AI portrait currently standing in for her becomes a labelled photo slot
  rather than a generated face (see D3).

⚠️ **Confirm before launch.** This publishes a named clinician's
qualifications. They are hers, stated by her, and the notes carry
*"[Margaret Gachanja] Provide bio: Submit personal background information to
Negasi for the website profile"* as her action item — but she should see the
page before it goes live.

Whether Dr. Abseret Hailu appears as a listed provider was not decided. A
second bracketed slot is left for her, unpopulated.

### C4. "Less is more"

Abseret [00:33:50]: *"less is more though. Like a few sentences I think is good.
That's a sweet spot. People are not going to be reading a lot, or I would hope
that they are learning more of it in the actual visit rather than on the actual
website."*

Read together with Aser's brochure decision, that cuts one way for cosmetic and
the other for medical:

- **Cosmetic** family bodies drop from ~5 sentences to 2–3, with the detail
  handed to the in-clinic brochure. This is the half Aser said should not be
  publicised on the site.
- **Medical** conditions keep their three beats. Abseret asked for the medical
  list to be *expanded* and spelled out in the same breath, so trimming there
  would be answering the wrong sentence.

---

## D. The landing page

The references, per the transcript: **Derm Atelier on Avenue** (team photo),
**a Canadian dermatology clinic** — the clinic space taking the full screen,
words over it, — **Elevate** (the clinic name overlying the actual space), and
**a New York clinic** ("personalised solutions tailored to your unique needs").

Who wanted what:

- Abseret [00:48:09]: *"I also like the Elevate one where they had the clinic
  name … This one I like the most … It was a little bit cleaner."* And: *"how
  about we just use the Elevate this part, and then the rest we can make dynamic
  with the treatments that we mentioned."*
- Mo [00:47:02]: *"Mine was the Canadian, the second one … I'm tied between
  having the clinic background and having the dynamic profile of the cosmetic
  procedures … it shows the entrance, the reception, the waiting area and then
  flips into the cosmetic procedures … then the next, medical procedure. So
  potential clients are able to see our clean space, a glimpse of the cosmetics
  and the medical, on the landing page."* And: *"my concern with the draft is
  that it's too busy. Even when I look at it, I'm not sure what exactly to look
  at … a clean format that feels like elegance and excellence."*
- Dr. Gachanja [00:49:44]: *"a blend between this Canadian and the Elevate,
  because of the dynamic aspect. I feel a blend of the two is what would look
  really nice."*
- Abseret [00:56:08]: *"I don't want it to be like the whole … I do like the
  components that you already have … I want our brand to be more clean. I don't
  want it to be so busy. If it's going to be image on top of words on top of
  other photos, I just worry it's going to be too cluttered."*
- Aser [00:37:22, 00:59:51]: motion, not a static page — *"those are built by
  Squarespace, in a time when websites were so much more static. The content
  from those websites is good, but Negasi, we should have a huge website."*
- Abseret [00:33:33]: the landing photo should be *"the desk where people are
  going to sit, with the two lit hanging lights and the LED-lit Mela Skin"* —
  the reception and entrance.
- Aser [00:49:00]: *"one thing is, we don't have the clean space pictures yet …
  the 'Radiant You' that Negasi did, in my opinion, can work. It's more of how
  it's positioned and what complements it."*

### D1. What the hero becomes

Full-bleed first screen, one thing to look at, in this order down the page:

1. **Ground:** the field brown with the brand pattern at architectural scale —
   the letterhead's own relationship to its sheet. This is the interim answer
   to having no clinic photography; it reads as designed rather than as a
   missing image.
2. **The lockup, over the ground** — Aser's "just the M" gold brandmark, with
   the official wordmark set large beneath it. This is the Elevate move: the
   clinic's name owning the opening frame.
3. **"Richer. Radiant. You."** in Larken italic — Aser [00:37:22]: *"the text is
   strong, the 'Richer, Radiant You' reads well."* Kept, given room.
4. **One line** of descriptor, then two buttons. The address line moves off the
   first screen. Fewer elements is the whole brief.
5. **A frame stack, right-hand column** that cross-fades **reception & entrance
   → cosmetic dermatology → medical dermatology**, captioned. That is Mo's flip
   exactly, at a size that leaves the type alone — Abseret's "an add-on", not
   the whole screen.

Cross-fade with a slow scale, not the current push-slide: three frames sliding
past a full-bleed pattern is two motions competing. Motion honours
`prefers-reduced-motion` as everything else here does.

### D2. The AI portrait comes off the hero

Abseret [00:17:24]: *"I'm not a huge fan of the AI pics of the people, because I
do want it to be real."* Notes, Decisions/Details: *"The team decided to replace
AI-generated images with real photos of the clinic space, specifically the
reception and entrance area, to ensure authenticity."*

`public/images/hero.webp` is a generated portrait of a woman, captioned in the
code as "the Mela Skin patient aesthetic". It is the most direct instance of
what she objected to, and it is removed from the hero.

The three hero frames are declared as `{ id, label, caption, src }` with `src`
nullable. Where there is no photograph the frame renders a labelled brand-ground
panel; dropping in the reception shoot is one line per frame, no layout work.

### D3. The other generated imagery

The remaining generated images (`dermatologist.webp`, the two treatment
collages, the condition images) stay for now — Abseret [00:59:51] handed image
choice back: *"whether these are AI or real images, those are like the
highlights; how you choose to incorporate it, I think we can leave up to you and
your discretion."*

Two exceptions, because both present a generated face as a real person:

- the **clinician portrait** on `/about` becomes a labelled photo slot
- the hero portrait, as above

Every pending photograph is registered in `constants/placeholders.ts` so the
shoot list is one file rather than a hunt through components.

### D4. Screenshot review loop

Abseret [00:57:11]: *"why don't you send us screenshots of the landing page …
then we can see what looks good. If we need to remove something, add
something."* Dr. Gachanja [00:57:11]: *"you can play around with it and share
with us; we can pick the one that comes out best."*

`/editorial` already exists as the second design direction and is kept, so
there are two landing pages to screenshot and compare rather than one to
argue about. It inherits the new palette and typography automatically.

---

## E. Metadata, structured data, sitemap

- `sitemap.ts` gains `/skincare`.
- `viewport.themeColor`, `manifest.ts` `background_color` / `theme_color` move
  to the new palette.
- JSON-LD: prices out (B4); the two new conditions in via `knowsAbout`;
  `availableService` descriptions follow the rewritten cosmetic summaries.
- Titles: "Treatment menu & prices" → "Treatment menu".

---

## F. Open questions to put back to the team

1. **Medical or cosmetic first?** Dr. Gachanja [00:39:40]: *"what we had
   discussed before is whether to interchange and say cosmetic and medical
   dermatology — which one should come first."* Never resolved. Left as
   medical-first, which is the current order.
2. **Is the medical consultation fee published?** Abseret said it should be a
   set price [00:25:41]; whether it appears on the site was left *"open … up for
   discussion"* [00:26:27]. Bracketed placeholder until someone says.
3. **Kenyan-market benchmarks.** Mo's action item — *"gather a few different
   clinics within the Kenyan context so he can have a reference and also tailor
   it towards that context"* [00:17:24]. Not yet received, so nothing in this
   pass is tailored to it.
4. **Reception photography.** Everything in D is interim until the shoot.
5. **Dr. Gachanja's bio, registration number and special interests** — her
   action item, and the gate on C3 going live.
6. **Is the GLO365 menu Mela Skin's own?** Pre-existing flag in `menu.ts`. Now
   lower-stakes with the figures gone, but the item *names* are still from that
   sheet and a few read as another operator's house branding.

---

## G. Order of work

1. Palette + fonts + `PatternField` tones (A1, A2) — everything else renders on
   top of these.
2. `Brandmark` / `Wordmark` components, then the asset script (A3, A4, A5).
3. Strip prices from `menu.ts`, then fix every consumer until the build is
   clean (B1, B4).
4. Rewrite `MenuBoard` as a table (B2); replace `Prices` with `Consultation`
   (B3).
5. Conditions, bios, `/skincare` (C1–C3), copy trim (C4).
6. Hero (D1, D2), photo slots (D3).
7. Metadata, sitemap, README (E).
8. `next build` + lint, then screenshots for the group.

---

## As built — what changed against this plan

Written after the work. Everything above was implemented; the list below is the
places the finished thing differs from the plan, so the plan is not left
describing something that does not exist.

### Deltas

- **`sectionFormats` became two functions, not one.** Printing a section's raw
  formats comma-separated gives, for injectables, thirteen labels ("1 area" …
  "9cc") and a line nobody reads. `sectionOffering()` collapses them into a
  phrase ("single sessions, courses of 2, 3 and 5, by treated area and by
  volume") for the menu page, and `sectionOfferingShort()` into three words for
  the header dropdown. That also let the hard-coded per-section map planned for
  `navigation.ts` be deleted — both are derived, so neither can end up
  describing a section that no longer looks like that.
- **`ms-clay` had to be retired in the editorial direction too.** The plan only
  counted its six uses in `src/components`; `src/components-editorial` had nine
  more. They split the same way: eyebrows to `ms-terracotta-deep`, large italic
  display words to `ms-terracotta`.
- **`ms-caramel` (Secondary 5, `#D1A76D`) was added** as the light accent for
  dark grounds, which the plan mentioned in the table but did not explain. It
  carries the scroll-progress rail's light end.
- **Skincare is a top-level nav item, not only a footer link.** Abseret listed
  it as a section of the site alongside about, medical and cosmetic, so it sits
  in the bar. The header is five items now rather than four.
- **The third home pillar card changed subject.** It was "Coming soon — laser
  hair removal", which duplicated the band at the foot of the treatments
  section. It is the skincare card now, so the three cards are the three things
  the clinic actually offers. Laser hair removal still has its own band and its
  own anchor on `/cosmetic-dermatology`.
- **The hero frame stack is hidden below `sm`.** On a 360px screen the type
  already fills the first screen; a second block under it is how a hero stops
  being one thing to look at, which is the complaint the rebuild answers.
- **`WordmarkImage` was deleted** rather than repointed. Nothing used it.
- **`Prices.tsx` was deleted, not renamed.** `Consultation.tsx` keeps its
  layout and its place in the page order but shares no copy with it.
- **Sixteen em dashes had to come back out of the new copy.** The site's own
  rule (README → The voice) is that no rendered string uses an em dash where a
  comma or a full stop will do, and `scripts/humanizer-lint.py` enforces it. The
  first draft of the new copy broke it sixteen times; it is back to zero
  violations.
- **`hero:frames` was dropped from `package.json`.** It pointed at
  `scripts/build-hero-frames.py`, which does not exist and has not for a while.

### Verified

- `next build` clean, all seven public routes prerender, `/skincare` included.
- `eslint .` clean. `scripts/humanizer-lint.py`: 0 violations across 65 files.
- **No price reaches the browser.** The only `KES` string anywhere in
  `.next/server` and `.next/static` is the visible `[KES 0,000]` placeholder for
  the medical consultation fee. Every real figure is out of the bundle, not just
  off the screen.
- Contrast recomputed for every pairing the site uses; all clear WCAG AA at the
  sizes they are set. The numbers are in the comments at the top of
  `globals.css`.
- Screenshots taken at 1440px and 390px for `/`, `/treatment-menu`,
  `/skincare`, `/cosmetic-dermatology`, `/medical-dermatology` and `/about`.
  The menu table collapses to stacked rows below `sm` with no horizontal
  scroll.

### Not committed

The changes are in the working tree of `web/`. Nothing has been committed or
pushed.

### Screenshots for the group

`docs/2026-08-27-0950-screenshots/` — twelve frames against the current build,
desktop at 1440px plus the hero, the menu table and the collection at 390px.
Refreshed after the second pass (`2026-08-27-1101-second-pass.md`), so they show
the darker palette and the rebuilt hero.

That covers the action item from 00:57:11: "why don't you send us screenshots of
the landing page, because obviously it's going to be hard for you to constantly
change the website, but you can send us screenshots of the landing page and then
we can see what looks good. If we need to remove something, add something."

| File | What to look at |
| --- | --- |
| `01-hero-A-desktop.png` | Hero A: four elements over a full-bleed sliding photograph |
| `02-hero-A-mobile.png` | Hero A on a phone |
| `13-hero-B-dark-ground.png` | Hero B, the committed hero, on today's brown |
| `14-hero-B-committed-ground.png` | The same, on the committed `#74370c` |
| `15-hero-toggles.png` | Both dot groups: GROUND and HERO, with the credit beside them |
| `18-hero-C-serum.png` | Hero C: a glass serum bottle, modelled and lit live in WebGL |
| `19-hero-C-serum-mobile.png` | The same on a phone, bottle above the copy |
| `16-pattern-continuity.png` | The pattern running through a section, at its new strength |
| `17-booking-to-footer.png` | The lattice running from the light band through the booking band and into the footer, with the gold hairline marking the join |
| `03-home-consultation-band.png` | What replaced the six prices |
| `04-treatment-menu-hero.png` | How the menu page opens now that it has no prices |
| `05a-menu-all-open.png` | The menu as one table, nothing ticked, all five sections open |
| `05b-menu-one-ticked.png` | One section ticked: tinted and open, the other four collapsed to a line |
| `05c-menu-two-ticked.png` | Two ticked, so the tints can be checked against each other |
| `06-menu-mobile-ticked.png` | The same on a phone, rows stacked with their labels |
| `07-cosmetic-dermatology.png` | The free-consultation stat in place of the lowest price |
| `08-medical-dermatology.png` | Twelve conditions, hair loss and nails included |
| `09-skincare-collection.png` | The collection grid, shaped like the reference sites' |
| `10-skincare-collection-mobile.png` | Two up on a phone |
| `11-about-providers.png` | Dr. Gachanja: portrait beside bio, interests line, sample label |
| `12-about-second-provider.png` | Dr. Hailu, mirrored, portrait still a slot |

**Three things to know looking at these.**

1. **There are two heroes on the page**, with a toggle bottom right, so the team
   can pick. A is the current one; B is the hero on the last commit, restored with
   its own palette. See `2026-08-27-1420-hero-demo-and-pattern.md`.
2. **The flooded sections carry Primary 2 `#2C190B`** rather than Primary 3 — the
   "second brown" / "darker chocolate" Abseret and Aser named at 00:35:00.
3. **Hero A's photographs are licensed stock**, credited bottom right, standing
   in until the clinic is shot. `2026-08-27-1101-second-pass.md` lists which
   candidates were rejected and why.
