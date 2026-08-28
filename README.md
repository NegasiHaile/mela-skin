# Mela Skin — website

Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + TypeScript + Framer
Motion. Static: every route prerenders and nothing is fetched at runtime. The
markup is still overwhelmingly server-rendered — the client boundaries are the
motion wrappers, the hero slider and the contact form.

## Routes

| Route | What it carries |
| --- | --- |
| `/` | Hero, the argument for the clinic, both service lists in summary, the consultation model, the visit, the clinician, reviews, booking |
| `/medical-dermatology` | The twelve conditions, one anchored entry each, plus what to bring to a first appointment |
| `/cosmetic-dermatology` | The ten cosmetic treatment families and what each does, plus the service that is not open yet |
| `/treatment-menu` | The whole menu — 58 treatments across five sections, as a responsive table — plus the FAQ |
| `/skincare` | The collection the clinic will stock, then the four-step routine that makes it work |
| `/about` | Why the clinic exists, the two providers, the six operating commitments, what a consultation records, the premises |
| `/contact` | The booking form, the phone and email, and the map with directions |
| `/editorial` | The alternate design direction. `noindex`, and absent from the sitemap. |

The home page states each thing once and hands off: the pillar cards orient,
the treatment section lists, the consultation band explains how a cost is
arrived at, and the subpages carry the depth. Nothing important sits behind an
accordion anywhere.

**One form, one place.** The booking form used to close all five routes, which
left `/contact` nothing to be. It lives there now and nowhere else; every other
route ends with a `BookingCta` band pointing at it. If you add a route, end it
the same way.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static prerender
npm run lint           # eslint (flat config in eslint.config.mjs)
npm run brand:assets   # rebuild every favicon / PWA icon / social card

python scripts/optimise-images.py   # public/images/*.png -> optimised .webp
python scripts/fonts-to-woff2.py    # src/fonts/*.ttf -> .woff2
python scripts/subset-fonts.py      # then trim those to the glyphs in use
python scripts/humanizer-lint.py    # scan rendered copy for AI-writing tells
```

`brand:assets` (`scripts/build-brand-assets.py`) is Python and needs Pillow. It
reads `../Resources/MELA SKIN - Visual Identity Assets/` and writes the
favicons, the PWA icons, the Apple touch icon and the 1200x630 social card. Run
it when the brand package changes; its output is committed. It replaced
`extract-logo.py`, which flood-filled a monogram out of a social-media JPEG and
is where the white disc behind the ring came from.

## Pricing

**There are no prices on this site, and none should be added without the
clinic saying so.** This is the load-bearing content rule and it survives every
redesign, so it comes before everything else.

It was decided unanimously in the service-offerings meeting of 26 August 2026:

> **Dr. Abseret Hailu (00:13:54)** — "It's not typically routine to disclose
> pricing on websites. You want patients to come in for a free consultation or a
> consultation, and then you'll have conversations about pricing during that
> conversation … pricing I would like not to have on a website."
>
> **Dr. Abseret Hailu (00:15:01)** — "We want patients to feel that we're
> tailoring a treatment for them, and not necessarily them selecting
> treatments."
>
> **Dr. Margaret Gachanja (00:26:27)** — "on the aesthetic side, I kind of feel
> like everything will be tailor made for each person, so maybe putting a
> blanket figure may not be ideal."
>
> **Aser Hailu (00:33:50)** — "we can also have clinic brochures for the
> cosmetics / aesthetics stuff, so we don't need to publicise it on the
> website." — Abseret: "I like that idea a lot."

Four things follow from it, and each is a place the rule could quietly be
broken again:

1. **The figures left the source, not just the screen.** A constant in
   `src/constants` is bundled and shipped to the browser, so a price that is in
   the bundle but never rendered is still published — one view-source away.
   `menu.ts` therefore carries no numbers at all. The printed sheet in
   `Resources/` stays the clinic's record of them.
2. **What replaced them is how each treatment is sold** — single session, course
   of 3/5/10/20, treated area, cc of product. Those are units, not prices, and a
   visitor deciding whether something is a one-off or a commitment needs them.
   `sectionOffering()` and `sectionOfferingShort()` summarise them per section.
3. **The structured data makes no price claim either.** The `AggregateOffer`
   with its `lowPrice` and the `priceRange: "$$"` band both came out of
   `lib/jsonld.ts`. Asserting a price floor in schema.org while declining to
   publish prices on the page is the same disclosure by a side door, and it is
   the version that ends up in a search result rather than on a page a patient
   can read in context.
4. **The consultation model is stated in its place.** Cosmetic consultations are
   complimentary; medical dermatology is a standard clinical visit at a set fee.
   That distinction was explicit — "when it comes to the medical sector, I don't
   want them to assume that's cuz we can't give free consultation for that …
   that would be a regular visit and not a free consult" (00:16:05) — and it is
   what `components/Consultation.tsx` and `HOME.consult` exist to say. The
   medical fee itself is a bracketed placeholder: Abseret said it should be a set
   price (00:25:41) but the figure has not been supplied and whether it is
   published at all was left open (00:26:27).

**If the clinic reverses this**, the decision has a review condition attached —
Abseret, 00:30:28: "we start with no pricing and then [ops] can assess … which
percentage of patients are uptaking on treatments … if they feel like it would
have been helpful for them to have pricing up front then we can always add
that." Reversing it means adding figures back to `menu.ts` and reinstating the
formatter, the lookups and the section that used to display them. The git
history has all of it.

## What the 26 August 2026 meeting changed

The full decision log is in `docs/2026-08-27-0950-meeting-implementation.md`,
written against the transcript before the work started. In brief, and with the
file that carries each:

| Decision | Where it landed |
| --- | --- |
| No prices anywhere on the site | `constants/menu.ts`, `components/Consultation.tsx`, `lib/jsonld.ts` — see **Pricing** above |
| Menu as a plain, easy, responsive table | `components/MenuBoard.tsx` |
| Cosmetic detail belongs in clinic brochures, not on the web | `COSMETIC_PAGE.detailNote`, and the trimmed bodies in `constants/cosmetic.ts` |
| The official palette, and the flooded sections on the *second* brown — "that darker chocolate" | `app/globals.css`, `brand/PatternField.tsx` |
| Ranade as the secondary face | `app/layout.tsx`, `src/fonts` |
| The logo is gold on transparency, with no white disc | `brand/Marks.tsx` |
| "Just the M" as a hero lockup | `components/Hero.tsx` |
| Hero is one full-bleed image with four things on it — Elevate's lockup in the Canadian one's frame | `components/Hero.tsx`, `components/HeroBackground.tsx` |
| Less is more; fewer elements on the first screen | `brand.hero`, the trimmed cosmetic bodies, the shorter page ledes |
| Real photographs, not generated people | `constants/placeholders.ts` → `photos`; the hero portrait and the clinician portrait are slots |
| Hair loss and nail disease added to medical | `constants/conditions.ts`, `components/icons.tsx` |
| About is the clinic, then the providers — portrait beside bio, one block each, special interests named | `app/about/page.tsx` order, `constants/clinic.ts`, `components/Clinic.tsx` |
| A skincare section, shaped as a collection like the reference sites' | `app/skincare/`, `components/Skincare.tsx`, `SKINCARE_PAGE` |

**Deliberately not built yet: the interactive AI chat.** Requested by Abseret
(01:06:51, 01:08:13) and agreed to. It is its own piece of work and no
placeholder button has been added for it, because a chat button that does
nothing is worse than none.

**Still open, and worth asking about before launch.** Whether cosmetic or
medical should come first (Dr. Gachanja raised it at 00:39:40 and it was never
resolved; medical is first). Whether the medical consultation fee is published.
The Kenyan-market benchmark sites Mo was to gather, which have not arrived, so
nothing here is tailored to them yet.

## Where the design came from

Everything visual is lifted from the files in `../Resources`, not invented:

Everything below comes from **`../Resources/MELA SKIN - Visual Identity
Assets/`**, the designer's handover of 26 August 2026. It supersedes every
earlier brand file in `Resources/Marketing/Brand Identity`, which should now be
treated as historical.

| Thing | Source |
| --- | --- |
| The fourteen palette colours | `3_Color Pallet/MELA SKIN - Color Pallet Info.png` |
| The hero's fallback ground | generated from `4_Pattern` by `scripts/build-brand-assets.py` |
| Brandmark (vector paths) | `2_Brand Mark/SVG/…Primary Brandmark_2.svg` |
| Gold ramp (sampled) | `2_Brand Mark/PNG/…Brandmark_1_3D Gold Emblem.png` |
| Wordmark letterforms (vector paths) | `1_Logo/Secondary Logo/SVG/…Secondary Logo_3.svg` |
| Larken (display face) | `5_Typography/Primary Font/Larken`, self-hosted in `src/fonts` |
| Ranade (secondary face) | `5_Typography/Secondary Font/Ranade_Complete`, self-hosted |
| Circle-and-sparkle pattern | `4_Pattern/`, checked against the drawn version |
| Tagline "Richer. Radiant. You." | Letterhead + the brand's own banners |
| Address, phone, email | `Brand Identity/Letterhead/…Letterhead_DRAFT.docx` |
| Patient-journey steps | `Operations/…/Mela Skin - Focus Area.docx` |
| The service offering — the medical conditions, the cosmetic families, laser hair removal as "coming soon" | `Resources/more-info.md`, plus two conditions from the 26 Aug meeting |
| The treatment menu — names and structure, no figures | `Resources/REVISED MENU OF GLO365 - 2025.pdf` |

Three notes on fidelity:

- **The logo is the real artwork now.** `brand/Marks.tsx` carries the four
  brandmark paths and the eleven wordmark paths verbatim out of the supplied
  SVGs, so the ring, the M, the sparkle and the letterforms are the designer's
  drawing and not a Larken lookalike. Both fill on transparency, which settles
  the note from the 26 Aug call — "it shouldn't have a white background. That's
  an error. It should be just gold with a gold circle." The gold is two
  gradients in `GoldDefs`, sampled off the supplied emblem: one in
  objectBoundingBox units for a lone sparkle, one in userSpaceOnUse across the
  mark's own viewBox so the ring and the M share a single sweep.
- **The pattern is drawn, not tiled from a bitmap.** Sampling gives a horizontal
  pitch of 899px, a vertical pitch of 738px and a 368px sparkle, which solves to
  a circle radius of 455px — so `R = 0.506W` and `H = 0.821W`. Those two ratios
  are the whole motif and the only thing `BrandPattern` hard-codes; `scale`
  moves the tile size without touching them. The official `4_Pattern` artwork
  has since been checked against it and agrees; the drawn version is kept
  because it tiles, recolours per section and stays crisp at any size.
- **Two colours are not on the palette sheet, and both say so where they are
  defined.** `--color-ms-paper` is a documented mix of two palette values (the
  layout needs three light grounds and the sheet supplies two), and
  `--color-ms-gold` is sampled from the brandmark rather than the sheet, because
  gold is in the mark and printed on every swatch of the sheet but is not one of
  the fourteen.

## The pattern as a section ground

**It is one image running down the whole page, with the colour changing at each
section boundary.** That is the design and it is the constraint: a sparkle
straddling a boundary renders its top half in one section's colour and its bottom
half in the next.

`BrandPattern` builds a tileable data-URI SVG. `brand/PatternField.tsx` paints it
and keeps it in phase, and it is what every section uses — 34 call sites, all of
them now just `<PatternField tone="…" />`.

**What every section shares, and why it has to.** The pattern used to restart at
every boundary because four things were per-section props, and all four had to
become page-wide:

| | why it could not stay per section |
| --- | --- |
| `scale` | Two sections at 400px and 620px can never line up, whatever else is done. One `TILE_W` of 520 for the site. |
| `drift` | Per-section parallax *is* per-section phase drift. One global value now, set on `:root` by `PatternDrift`. |
| `fade` | A mask that fades the motif out towards a section edge puts a gap at exactly the join we are hiding. Gone. |
| `opacity` | Not an alignment problem, but it had drifted to seven values for four grounds. One number per tone. |

**The phase.** A repeating background starts at its own element's top-left, so
two stacked sections both start a fresh tile. Each layer therefore offsets itself
by `-(its distance from the top of the document mod TILE_H)`, which lands it on
the tile the page-wide lattice would have there. Measured in an effect rather than
derived, with a `ResizeObserver` on the body, because section heights depend on
content, fonts and images. Before hydration each section starts its own tile,
which is the old behaviour — briefly out of phase, never missing.

**The overhang is exactly one tile**, top and bottom. Not a round number picked
for comfort: at any other size the tile origin shifts and has to be corrected for
in the phase. At `TILE_H` the correction is a no-op, because
`(docTop - TILE_H) mod TILE_H` equals `docTop mod TILE_H`.

**The drift wraps at one tile**, which is invisible: the pattern is periodic with
exactly that period, so translating by `t` and by `t - TILE_H` paint the same
pixels. It is a `transform` rather than a moving `background-position`, so
scrolling composites instead of repainting eight tiled backgrounds. Reduced motion
never sets the property and the layers fall back to `0px`.

**What is still per section: the colour.** Each tone's sparkle colour IS the
section's own background, so the interstices disappear into the ground and only
the circles read. Tones are keyed to the grounds they sit on — `field`,
`espresso`, `panel`, `shell`, `paper`, `cream`, `sand`.

**Two traps, both of which bit.**

- **`url("data:image/svg+xml,<svg xmlns="…")` is invalid CSS** — the attribute's
  own double quote closes the url string, the browser drops the declaration
  silently, and the pattern paints nowhere with no error anywhere. SVG attributes
  are on single quotes, and `<`, `>` and `#` are percent-encoded.
- **The opacities had been tuned behind the fade masks.** A nominal 0.85 only
  ever showed across part of a section; uncovered, the same number is wallpaper.
  Light tones are 0.40–0.45 now, dark 0.50.

A section carrying a `PatternField` must (a) be `relative overflow-hidden` and
(b) put its own content in a positioned wrapper — usually `<Wrap className=
"relative">`. The field is absolutely positioned and would otherwise paint over
static in-flow content.

## Placeholders

Every fact the clinic has not supplied renders visibly in `[square brackets]`
so nothing ships looking finished when it is not. They are collected in
`src/constants/placeholders.ts` under `todo` — replace the values there and they update
across the page.

Beyond that, three things need a human before this goes live:

1. **Sign off the menu.** Every treatment name is transcribed from
   `Resources/REVISED MENU OF GLO365 - 2025.pdf` and lives only in
   `src/constants/menu.ts`. That PDF is titled for GLO365, and a few item names
   read as another operator's house branding, so somebody has to confirm the
   menu is Mela Skin's own before launch. The figures have already gone — see
   **Pricing** below — and the four places the transcription departs from the
   printed sheet are listed at the top of that file rather than applied
   silently.
2. **Confirm Dr. Gachanja's profile.** `constants/clinic.ts` publishes the
   qualifications she stated on the 26 Aug call. Her bio, her KMPDC number and
   her special interests are bracketed until she sends them, and she should see
   the page before it goes live.
3. **Every photograph is a slot or a labelled sample.** There are none of the
   clinic yet: "I'm not a huge fan on the AI pics of the people, because I do want
   it to be real." The shoot list is one object — `constants/placeholders.ts` →
   `photos`: reception and entrance, a cosmetic treatment, a medical
   consultation, and one portrait per provider. Two of them currently show a
   stand-in and say so on the page — the hero's licensed stock reception (credit
   bottom right) and Dr. Gachanja's portrait ("[Sample image. Not Dr.
   Gachanja.]" under it). The rest render as visibly unfinished panels. Filling in
   a `src` turns a slot into the photograph with no layout work. Five of the ten
   cosmetic families still carry illustrative imagery; the other five carry a
   brand-ground panel with the treatment mark set large, which is a finish rather
   than a gap.
4. **The reviews are deliberately empty.** The clinic has not opened, so there
   are no patients to quote. Each card states what belongs in it. Get written
   consent before publishing any real ones, and keep attribution to initials.

## Two directions

The same content and brand system, laid out two ways. Both build; pick one and
delete the other.

| Route | Direction | Shape |
| --- | --- | --- |
| `/` | **Immersive** | Full-bleed sections flooded with `ms-field`, wide-tracked Larken caps, pill controls, and a hero that is one background image with four things on it |
| `/editorial` | **Editorial** | Rounded cards floating on `ms-paper`, mixed roman/italic headings, square buttons, nav inside the hero card |

`/` uses `src/components`, `/editorial` uses `src/components-editorial`. They
share `src/constants`, the fonts and `motion.tsx`, so facts, copy,
placeholders and the motion vocabulary stay in one place. Only the immersive direction has the three subpages; `/editorial`
links into them rather than duplicating them, and is `noindex` so it never
competes with `/` in search. When you settle on one, delete the other component folder
and its route.

### The immersive direction (`/`)

The hero fills the first screen (`min-h-svh`) and holds **four things**: the
tagline, one sentence, and two pills, over one full-bleed background image. That
is the whole first screen, and the count is the point — it was nine.

The shape came out of the 26 Aug review of four reference sites, where the group
picked parts rather than one site. Abseret [00:48:09] wanted Elevate's clinic
name owning the frame; Mo [00:47:02] wanted the Canadian site's clinic space
filling it, and said the draft was "too busy — I'm not sure what exactly to look
at"; Dr. Gachanja [00:49:44] asked for a blend of the two. Negasi, on the call
[00:57:11], stated the resolution: "even if we are having the background image
we can minimize the contents that we display on the first screen." That is the
design.

What came off, and where it went: the brandmark and the descriptor eyebrow (both
already in the header lockup a few centimetres above), the framed image stack
(it became the background), the street address (/contact, the footer, the
JSON-LD), and a generated portrait of a woman. `components/Hero.tsx` quotes who
asked for what.

`SiteHeader` is the bar, and it is the same component on every route —
`tone="dark"` on the field colour, `tone="light"` on paper. It does not stick.
The long pages pin their own section nav instead, which is what you actually
want on screen while scanning sixty rows of menu.

### The mobile menu

Below `lg` the links collapse into a panel that drops the full width of the
screen from the underside of the bar: espresso ground, a gold hairline across
the top, 72px rows set in Larken at 1.7rem and divided by hairlines, then the
phone and email under a gold rule, then a full-width booking button. The rows
rise into place in sequence.

Three things about it are load-bearing:

- **It is still a `<details>`/`<summary>`.** No JavaScript opens it, so it works
  before the bundle lands, with JS off, and in a text browser. The burger
  becomes an X through `group-open:` variants; the drop and the row stagger are
  the two `@keyframes` in `globals.css`, both cut to nothing by the
  reduced-motion block.
- **Nothing between the panel and the header wrapper may carry a transform.**
  The panel is `absolute inset-x-0 top-full` against the header's own wrapper,
  which is what makes it full-bleed without `100vw` arithmetic. Framer Motion
  writes a `transform` onto whatever it animates, and a transformed element
  becomes the containing block for absolutely positioned descendants — so the
  `<details>` sits *beside* the `Mount`, not inside it. Move it in and the panel
  snaps back to the width of the burger.
- **The booking pill hides below `sm`.** A 390px bar holding a wordmark, a pill
  and a burger is three things competing; the menu carries the booking CTA at
  full width instead, and every hero has one within the first screen. The room
  that frees up goes to the lockup, which now reads at `md` all the way down to
  360px instead of dropping to `sm` on phones.

`public/images/hero.png` is a cut-out on transparency sitting directly on the
field, bleeding off the bottom and right. One `<Image>` node serves both
breakpoints — normal flow under the type on narrow screens, absolute on the
right half at `lg` — so the file is never fetched twice. Replacing the
photograph is a file swap; nothing in the layout is tied to its dimensions
beyond `object-contain object-bottom`.

Type: the tagline is Larken italic at `clamp(3.1rem, 7.4vw, 6.1rem)`, section
headings are Larken Light caps at `0.045em` tracking (the `display-caps`
utility), body copy is 15–17px. The display type carries the page, but nothing
is set small enough to squint at.

## Layout system (editorial direction)

The page is a stack of rounded cards floating on `ms-paper`, not a run of
full-bleed bands. Three primitives in `ui.tsx` carry it — `Shell` (outer
gutter), `Card` (22px radius, soft lift), `Inner` (padding) — so a new section
is a `<Shell><Card><Inner>` sandwich and inherits the rhythm.

Two conventions hold the tone together:

- **One italic word per heading.** Larken italic in `ms-terracotta` marks the
  operative word ("studied *less*", "one *roof*", "start to *finish*"). It is
  the only decorative move in the type, so it should stay at one per heading.
- **Cards separate by lightness, not by rules.** `ms-shell` sits above
  `ms-paper`, tinted cards use `ms-sand/40`, reversed cards use `ms-panel`.
  Borders are hairlines at low opacity; nothing is boxed in hard strokes.
- **The card is the section, so the card carries the motion.** `Card` animates
  itself — a short rise out of a 1.5% underscale as it enters, which reads as a
  sheet being laid onto the paper. Everything inside then staggers against that
  single arrival. Pass `still` to opt out; the hero does, because it is already
  on screen.

The nav lives inside the hero card rather than in a sticky bar, so it scrolls
away. The booking card and footer repeat every route out of the page.

## The hero, and the two variants under review

`components/hero/`. The home page currently renders **two heroes with a toggle**,
so the team can pick between them live rather than from screenshots — Dr.
Gachanja, 26 Aug 00:57:11: "you can play around with it and share with us; we can
pick, you know, the one that comes out best."

| | Hero A (`HeroPhoto`) | Hero B (`HeroOriginal`) |
| --- | --- | --- |
| Content | Tagline, one line, two buttons | Tagline, two lines with the address, two buttons |
| Picture | Full-bleed, three interiors sliding | Cut-out portrait push-sliding on the right half |
| Ground | Primary 2 `#2C190B` + field scrims | The committed `#74370c` |
| Source | Current | Commit b894798, restored |

**Hero B carries its own palette.** Every class resolves against `--color-ms-*`,
and those have moved twice since that hero was written, so rendering its layout
in today's colours would be a third hero rather than the old one. `HeroOriginal`
redeclares the committed values on its own section; nothing outside it is
touched. Its pattern is likewise drawn inline at the committed tone and 440px
scale, because `PatternField` is page-wide now and wiring a frozen snapshot into
it would either break the continuity above or restyle the snapshot.

One deliberate deviation from the commit: its second button read "See the prices"
and says "Treatment menu", because there are no prices behind that link any more.

**`HeroSwitcher` is a demo control, not a feature.** When the choice is made,
delete the losing variant, delete the switcher, render the winner from
`app/page.tsx`, and drop `brand.hero.legacyLine1` / `legacyLine2`.

### A stacking trap worth remembering

The hero's scrims sit at `z-20` inside a wrapper that was `absolute inset-0` with
**no `z-index`**. `z-index: auto` does not create a stacking context, so those
children joined the *section's* context and painted over the content at `z-10` —
and without `pointer-events-none` they were three full-bleed divs collecting every
click in the first screen. The header went dead and nothing looked wrong. The
wrapper is `z-0 pointer-events-none` now, and both halves are needed.

Hit-test rather than eyeball this one: `elementFromPoint` at the centre of every
control, then a real navigation through each.

### Hero A's background

`components/HeroBackground.tsx`. One image behind everything, `object-cover`, with
three flat scrims over it. No pattern layer: a photograph should not have the
letterhead printed over it, and the fallback ground already carries the motif.

**The scrims are all `ms-field`, and that is deliberate.** They were `ms-espresso`
over a heavily vignetted ground, and between them the home page opened a stop
darker than the band at the top of every other route, all of which are
`bg-ms-field` flat. Now: a flat 60% wash across the frame, a left weight to 62%
under the type column, and a bottom lift under the buttons. Measured off the
render, the whole home hero averages `#4B3828` against `/about`'s `#4C3A2C` — one
to four values of 255 apart, which is the same brown. Behind the tagline ivory
reads 5.0:1 at 1440px and 6.9:1 at 390px; behind the paragraph cream reads 6.6:1.

**What it shows, eventually.** `heroFrames` in `constants/brand.ts` is the
sequence Mo asked for at 00:47:02 — "it shows the entrance, the reception, the
waiting area, and then flips into the cosmetic procedures … and then the next,
medical procedure" — and the component cross-fades through whichever of the
three has a `src`, on a 6.4s hold with a 1.6s fade.

**What it shows today: a licensed stock photograph, credited on the page.** None
of the clinic's own photographs exist yet (Aser, 00:49:00: "we don't have the
clean space pictures yet"), so the reception frame carries
[unsplash.com/photos/pt0nGH-NvoA](https://unsplash.com/photos/pt0nGH-NvoA) —
Aalo Lens, Unsplash License, free for commercial use — cropped to
`public/images/hero-clinic-sample.webp`. Chosen for a wood-slatted feature wall,
pendant lights over a reception desk, and no other business's signage in frame;
that last condition ruled out most of the candidates.

Any frame marked `sample` prints its `credit` bottom right in 11px cream. The
licence does not require attribution — the line is there so the photograph
cannot pass for the clinic's own room, which is what Abseret objected to at
00:17:24 ("I do want it to be real"). It removes itself when a real photograph
replaces it.

**The generated brand ground is the floor.** If every frame is emptied,
`heroBackground` renders the official `4_Pattern` motif at architectural scale
over Primary 2, vignetted, from `scripts/build-brand-assets.py`. It is the one
hero ground that needs nobody's permission.

**Filling one in is the whole job.** Point `photos.reception.src` at the clinic's
photograph, drop its `sample` and `credit`, and it becomes the background; point
all three and the sequence starts on its own. One frame means nothing animates at
all, which is the reason the code has no clone frame, no snap-back and no chained
`requestAnimationFrame`s — the things the old horizontal track needed.

**Historical note, kept because it is a trap worth remembering.** Before it was a
cross-fade it was a transform track, and before that it set each frame's offset
and added the `transition-*` classes in the same render. A CSS transition only
starts if the transition property is already on the element in the before-change
style; add it in the same commit as the value change and the browser has nothing
to interpolate from, so every frame snapped into place instead of sliding. And in
a transform track, percentages resolve against the transformed element's own
width, so the track has to be exactly one container wide with the frames laid
along it by `left`; give it the combined width and every translate is out by a
factor of the frame count.

## Weight and scroll

The site was slow to load and juddery to scroll. Four things were responsible,
in order of how much they cost. All four are fixed without any change to the
design; the numbers below are from `scratchpad/pw/perf2.mjs`, Chrome at 1440px,
warm cache.

| | before | after |
| --- | --- | --- |
| Source images | 35.3 MB | 3.2 MB |
| Fonts over the wire | 208 KB | 121 KB |
| p95 frame while scrolling | 33.3 ms | 17.0 ms |
| Frames over 20 ms | 10-16% | 1-3% |

**Images.** The supplied artwork was 1024-1536px PNG at 2-3 MB a file. Nothing
on the site displays one wider than about 640 CSS pixels. They are now WebP,
capped at 1280px on the long edge: 91% smaller, and indistinguishable at the
sizes they are drawn. `scripts/optimise-images.py` regenerates them. The `.png`
masters are still in `public/images` and nothing loads them any more, so they
can be moved to `Resources` and deleted from the app whenever you like.

**Fonts.** The Larken cuts were being served as raw TTF. They are WOFF2 now
(`scripts/fonts-to-woff2.py`), then subset to the glyphs the site actually
renders (`scripts/subset-fonts.py`): 377 KB of TTF becomes 98 KB. Run the two
scripts in that order if the family is ever updated; the `.ttf` files stay as
the masters. The secondary face is Ranade now, self-hosted from the brand
package's own `.woff2` files in three upright cuts (300/400/500) and no italic,
which also took Google Fonts off the critical path.

**One spring per section.** Every `PatternField` ran its scroll progress
through a Framer Motion spring, and a page carries ten to twelve of them. Every
spring woke on every frame of every scroll whether or not its section was
anywhere near the viewport. The raw scroll value drives the same transforms;
on a background motif travelling forty pixels the smoothing was never visible,
and the frame budget it cost was. That single change took p95 from 33 ms to
17 ms.

**Paint.** `content-visibility: auto` on every section after the first lets the
browser skip layout and paint for bands nowhere near the viewport, which
matters on a 13,000px menu page. The first section is excluded on purpose: it
holds the header, and the containment would clip the mobile menu panel. The
`backdrop-blur` came off the panels that repeat — the condition cards and the
cosmetic family cards, each its own backdrop root — and their fills went up a notch
to compensate exactly. The blurs that stay are the ones that do visible work
and exist once per page: the sticky menu nav, the booking form, the page-hero
asides.

**Still on the table.** 201 KB of JavaScript, nearly all Framer Motion. Moving
to `LazyMotion` with `domAnimation` (already done, and `strict` keeps it that
way) only recovered 6 KB, because the animation and gesture features are most
of what the site uses. Getting materially below that means replacing the
entrance animations with CSS, which is a bigger change than this pass was for.

## The header

Four items: a Treatments panel, a Treatment menu panel, then Skincare and About.
Medical and cosmetic used to sit in the bar as separate items, which asked a
visitor to know which half of dermatology their problem belonged to before they
could click anything.

**There is no Contact item, and no phone number.** Both were removed because the
"Book now" pill sits at the end of the same bar and goes to the same place: the
bar was offering /contact three times inside a few centimetres. It is still
reachable from every route — the pill, each page hero's second button, the
BookingCta band that closes every route, the footer's "Contact & directions", and
the mobile menu's booking button. Tap-to-call stays in the mobile menu, where it
is the shortest route to an appointment rather than a duplicate of the button
next to it.

The two panels are deliberately different shapes. Treatments is a pair of
picture cards, because the choice there is which half of dermatology you need.
Treatment menu is a list of the five menu sections with a count and how each is
sold, because a photograph cannot answer that. Its rows carried a from-price
until 27 Aug; they carry `sectionOfferingShort()` now.

**Desktop (lg and up).** Treatments opens a panel with a picture and a line
each on the two halves. It runs on `group-hover` and `group-focus-within`, so
it works with a pointer, with a keyboard and with no JavaScript. Three things
hold it together and none of them are optional:

- The panel is positioned against the `<nav>`, not against the trigger. The nav
  is `relative`; the trigger sits inside a Framer Motion wrapper that writes a
  transform, and a transformed element becomes the containing block for
  absolutely positioned children. Anchoring to the nav also keeps the panel on
  screen at 1024px, which centring on the trigger does not.
- The gap between the bar and the card is the panel's own transparent padding.
  Take it off and the menu closes as the pointer reaches for it.
- `invisible`, not `opacity-0` alone, so the links stay out of the
  accessibility tree and out of tab order until the panel is open.

The panel is 38rem, which is the widest it can be and still clear the right
gutter at 1024px. The lockup drops to `md` below `xl` for the same reason: 332px
of lockup plus the nav plus the booking pill does not fit a 1024px bar, and the
nav wraps to two lines without saying so.

**Mobile (below lg).** The same full-width `<details>` panel, with Treatments
as a nested `<details>` inside it. Still no JavaScript.

## The map

`/contact` embeds Google Maps through the keyless `?q=…&output=embed` form,
which is the only kind that works on a site with no server and no billing
account. `loading="lazy"` keeps the third-party request out of the initial
load.

**It searches the address rather than pinning coordinates**, and that is
deliberate. The only coordinates the clinic has supplied are approximate
(`lib/jsonld.ts` carries them, flagged), and a pin on approximate coordinates
sends a patient to the wrong door with more confidence than no pin at all.
Google resolves the address better than a guessed lat/lng does.

`CONTACT.map.placeUrl` is a placeholder for the clinic's own Maps place link.
Once somebody has stood outside the building with a phone, paste it there and
point `embedUrl` and `directionsUrl` at it.

## The voice

All published copy has been through the pattern list at
[blader/humanizer](https://github.com/blader/humanizer). The rules that
actually bit on this site, in order of how much they changed:

- **Em dashes doing a comma's job (14).** The copy leaned on them for rhythm,
  which is the loudest AI tell there is. Rendered strings now contain none. The
  seven that survive are structural rather than prose: the separator in a page
  `<title>`, the one in a mailto subject, the one in an image `alt`, and the
  en dashes inside `Mon–Fri, 00:00–00:00`, which is what an en dash is for.
- **Fragment punchlines (31).** "Some people flush. Some get papules. Some get
  both." became one sentence that says the same thing.
- **Not-X-but-Y (9).** "Not filler. These change how the skin behaves" became
  a claim rather than a correction of an objection nobody raised.
- **Fake depth (27).** "The honest version:" and "Worth knowing before you
  spend anything:" announced a point instead of making it. Both gone.
- **Formulaic sayings (32).** Aphorisms that sound true and verify nothing were
  replaced with statements you can check.
- **Curly quotes (19).** None left in rendered strings.

`scratchpad/humanizer_lint.py` in the session directory scans every string
literal that reaches the page (comments stripped) against a regex encoding of
the patterns. Run it after any copy change.

Two rules from that list constrain more than style. **No fabrication:** names,
numbers, dates and quotes come from `../Resources` or from the clinic, never
from the writer. **Preserve intent:** the rewrite changed how the copy sounds
and never what it says.

## What came from the reference clinics, and what did not

Two sites were used as reference for what an about page should contain:
[ortaclinic.com/en/introduce/brand](https://www.ortaclinic.com/en/introduce/brand)
(state the gap in the market, then list the principles that follow) and
[theiaclinic.co.kr/en/ai-program](https://theiaclinic.co.kr/en/ai-program)
(read the skin, interpret the reading, then treat).

**The shape was taken. The claims were not.** Orta's device list (Ultherapy,
Thermage, Onda, Excel V), their sleep-anaesthesia offering and their
private-room guarantee are theirs. TheiA's patented "Derma: Code" AI camera is
theirs. Mela Skin owns none of it, so none of it is asserted on this site.

The medical content that did transfer is the assessment itself, because it is
general dermatology rather than anybody's proprietary protocol: Fitzpatrick
typing, pigment pattern and depth, texture and pores, barrier and sebum,
vascularity, scarring history, and current products. Those are the seven
readings that change what is safe to do on Fitzpatrick IV to VI, which is this
clinic's whole argument.

Where the equivalent of one of their claims needs the owner to confirm it, the
site carries a visible bracketed question instead of a sentence. Two of them:
the treatment rooms, pain relief and cleaning protocol (`ABOUT.principles`,
item six), and whether imaging-based skin analysis will exist at launch and on
what device (`ABOUT.assessment.note`).

### The four landing pages reviewed on 26 August

Dr. Abseret Hailu shared four clinic sites on the call and the group walked
through them together: Derm Atelier on Avenue (a team photo), a Canadian
dermatology clinic (the clinic space taking the full screen, words over it),
Elevate (the clinic name overlying the actual space), and a New York clinic
("personalised solutions tailored to your unique needs").

**Structure was the takeaway, not design.** Abseret, 00:59:51: "these are more
for direction of where to go, but we don't necessarily have to fit this mold …
The biggest takeaway with the websites is how to structure what we offer — in
terms of the about page, in terms of the medical page, in terms of the cosmetic
page, and in terms of like the skincare product. That's an important takeaway …
When it comes to the design aspect, I think you can have freedom to be able to
express our vision in any way, as long as it's clean, like sleek."

Aser, in the same exchange: "I think we should strive to be better than the
competition … they're built by Squarespace, and in a time where websites were so
much more static."

So what the references decided here is the route list — about, medical,
cosmetic, skincare, contact — and not a layout. The one place a reference is
visible is the hero, and it is a blend rather than a copy: see
`components/Hero.tsx`.

## The two rails

`components/Treatments.tsx` carries both service lists, and both scroll
horizontally. Neither looks like the other, which is deliberate: a visitor
should be able to tell which list they are in without reading the label.

| | Medical | Cosmetic |
| --- | --- | --- |
| Shape | Two rows, five columns, column-major | One row |
| Entry | A square tile on the brand terracotta at 18%, with a hanging `01`–`12` | A paper card: snipped corners, hard shadow, tinted ground |
| Carries | Icon, name, one line | Photograph or brand panel, name, one line, how many treatments it covers |
| Reads as | An index — you scan for a word you already have | A catalogue — you browse without knowing what you want |

Square corners are what keeps the two apart. The cosmetic rail uses notched
corners and a drop shadow, the pillar cards above use a 24px radius, and so do
the condition cards on `/medical-dermatology` — a hard-edged tinted block is the
one card shape the site was not already using.

The 18% tint is measured, not picked. It is the strongest fill that keeps every
element clear of WCAG AA on it: the title at 9.99:1, the summary at 7.13:1, the
index numeral at 4.98:1. Hover deepens to 26%, where the numeral still holds
4.53:1. `ms-cream` was tried first and sits 1.17:1 off the paper ground, which
is why it vanished into it.

The title reserves two lines (`min-h-[2.4em]`) whether the name needs them or
not, so every summary in a row starts at the same height.

Two rows for the medical list is not decoration. Twelve conditions in a single
rail put nine off-screen on a phone; stacked two deep the same rail shows four
at a time and takes half the horizontal distance to get through. `grid-flow-col`
with `grid-rows-2` fills down before across, so they arrive in pairs and each
column is one snap position; `auto-cols` sets the column width rather than the
cards doing it, which is what keeps the two rows in step.

Both rails ignore the 1320px content column. They span the full viewport and
carry the column's own gutter (24 / 40 / 56px) as their padding on both ends.
Below 1320px this changes nothing — the gutter and the column's padding are the
same measurement, so the labels and first cards sit exactly where they always
did. Above it the rails widen, which is the point: capped at the column the
cosmetic rail shows four cards on a 1920px monitor and seven when it is allowed
the screen.

Three things hold it together, and all three matter:

- `GUTTER` is one string shared by `RailHead` and both scrollers. If they drift
  apart the first card stops lining up under its heading, which is the one
  alignment in that section anybody would notice.
- `scroll-p-*` matches the padding, so a snapped card comes to rest against the
  gutter rather than against the edge of the screen.
- The section is a run of siblings — head in a `Wrap`, then rail, rule, rail,
  then the closing band in a `Wrap` — rather than one `Wrap` around everything.
  A `Wrap` cannot be escaped from the inside without `100vw` tricks that
  reintroduce horizontal scroll on any platform that reserves space for a
  scrollbar.

## Motion

All of it is Framer Motion, and all of it comes from one file: `src/motion.tsx`.
That file sits outside both component folders because it is direction-neutral —
`/` and `/editorial` import the same primitives.

The vocabulary is deliberately small, so the page reads as one object rather
than as a collection of tricks:

| Primitive | What it does | Where it is used |
| --- | --- | --- |
| `Reveal` | one block rises 28px and fades, once, on entry | paragraphs, standalone blocks |
| `Stagger` / `StaggerItem` | a list arrives as a wave off a single trigger | card rails, step lists, credentials, footer columns |
| `Lines` | a heading rises word by word out of its own mask | every `SectionHead` |
| `Wipe` | an image uncovers from a clip-path and settles out of a 6% overscale | the clinician portrait, the editorial photo slots |
| `Drift` | counter-scroll, linked to the section's pass across the viewport | the portrait inside its frame, every `PatternField` |
| `ScrollAway` | the hero copy lifts and fades as the first screen leaves | both heroes |
| `Mount` / `MountStagger` | the same entrance, fired on load instead of on a trigger | above-the-fold hero content |
| `Lift` | spring lift on hover, press-down on tap | treatment cards, step cards, review cards |
| `DrawRule` | a rule that draws itself from the left | section-head hairlines, the editorial `SectionLabel` |
| `ScrollProgress` | a gold hairline of reading progress across the top of the viewport | both routes |

Two rules hold it together. **Travel is short** — 24–34px, never a slide across
the screen. **Everything eases on one curve**, the `EASE` expo-out exported from
that file; the only exceptions are the hover springs, because a pointer can
reverse mid-gesture and a timed tween would fight it.

Four decisions worth knowing before you change any of it:

- **Viewport triggers fire at 12% and never again** (`once: true`, `margin:
  "0px 0px -12% 0px"`). `amount` is left at its default on purpose: a block
  taller than the screen would never satisfy a fractional threshold and would
  sit faded out forever. That was the failure mode of the CSS scroll-timeline
  system this replaced.
- **Stagger belongs to the parent, not the child.** `StaggerItem` carries no
  timing of its own. Variants propagate through React context, so plain markup
  between a `Stagger` and its items is fine.
- **Reduced motion is honoured in two places.** `MotionConfig
  reducedMotion="user"` in the root layout drops every transform while keeping
  the fades, so nothing travels but nothing is stranded invisible either. It
  does not reach `useScroll`/`useTransform`, so the scroll-linked hooks check
  `useReducedMotion()` themselves.
- **There is a no-JS fallback and it is not optional.** Framer Motion renders
  its `initial` state into the server HTML, which means ~80 blocks ship at
  `opacity: 0` and are revealed on hydration. Every wrapper that ships hidden
  carries `data-motion`, and a `<noscript>` block in the root layout puts all of
  them back. **If you add a primitive with a hidden initial state, tag it
  `data-motion` too**, or it will be invisible whenever the bundle fails to
  land.

The hero background (`HeroBackground`) is its own component, driven by state and
CSS transitions rather than by Motion — which is also what makes the global
reduced-motion rule in `globals.css` cover it for free.

## Structure

```
src/
  app/
    layout.tsx             fonts, motion policy, metadata, clinic JSON-LD
    page.tsx               /
    medical-dermatology/   the twelve conditions
    cosmetic-dermatology/  the ten treatment families
    treatment-menu/        the menu, as a responsive table, + the FAQ
    skincare/              the collection, and the routine that uses it
    editorial/             the alternate direction (noindex)
    globals.css
  constants/     EVERYTHING THE SITE SAYS — see constants/README.md
    about.ts         the about page: story, principles, skin assessment
    brand.ts         name, address, contact, tagline, hero photography
    contact.ts       the contact page, the map embed, the closing CTA
    placeholders.ts  every unconfirmed fact in [brackets], + the photo shoot list
    menu.ts          the treatment menu — names and how each is sold, NO figures
    conditions.ts    the twelve medical conditions
    cosmetic.ts      the ten cosmetic families + the coming-soon service
    clinic.ts        clinicians, visit steps, premises, review slots
    navigation.ts    header bar, footer columns, legal links
    copy.ts          headings, ledes, FAQ, metadata — grouped by page
    index.ts         the barrel: `import { … } from "@/constants"`
  motion.tsx     the motion primitives — shared by BOTH directions
  components/
    brand/       BrandPattern (the tile), PatternField (how it is worn and
                 kept in phase), PatternDrift (one counter-scroll for all of
                 them), Marks (brandmark, wordmark, sparkle, gold ramps)
    SiteHeader   one nav bar, light or dark, on every route
    PageHero     the field-colour opening band on the five subpages
    *.tsx        one file per page section
    ui.tsx       Wrap, SectionHead, pills, Lede, Callout, PhotoSlot
    hero/        TWO HEROES UNDER REVIEW + the toggle between them:
                 HeroSwitcher (demo control), HeroPhoto (A), HeroOriginal (B),
                 HeroBackground (A's sliding ground), HeroOriginalFrames (B's)
    MenuBoard    the menu as a per-section responsive table
    Skincare     the collection grid + the routine
    icons.tsx    24 condition/treatment/skincare marks + a name registry
  fonts/         Larken — 4 cuts (the family is not variable despite the
                 archive naming, so each extra weight costs ~95KB)
  lib/
    jsonld.ts    MedicalClinic graph, built from the constants
```

### Content lives in `src/constants`, and only there

No component hard-codes a service name, a heading or a paragraph.
`constants/menu.ts` holds the menu; `constants/conditions.ts` and
`constants/cosmetic.ts` hold every service; `constants/copy.ts` holds the prose
around them. Everything else reads from those — the menu tables, the cosmetic
cards, the footer columns, the page metadata, the JSON-LD, the counts on the
pillar cards, and the editorial direction as well as the immersive one.

Add a condition to `constants/conditions.ts` and it appears in the home index,
the medical page, the footer and the search keywords without anybody
remembering to go and add it. `constants/README.md` is the guide to which file
holds what.

Two invariants worth knowing before editing:

- **Names are lookup keys.** A cosmetic family's `menuItems` names treatments in
  `constants/menu.ts` by exact string, and the family card counts them. Rename a
  menu item and rename it in both places, or the card's count quietly drifts
  from the section it links into.
- **Constant modules import from siblings, never from the barrel.** `copy.ts`
  imports `./menu`, not `.`, so `index.ts` can never become part of a cycle.

The same rule decides what is absent. The internal pricing memo in the
Resources folder (`Cosmetic Pricing Recommendations for Associate Feedback.pdf`)
is represented nowhere in this codebase and should stay that way: it is a
pricing-strategy document for York Dermatology in Canada, with competitor
names, margin positions and figures in Canadian dollars. None of it is Mela
Skin's, and none of it belongs on a public page.

`BrandPattern` and `PatternField` are duplicated per direction folder, so
either folder can be deleted whole when a direction is chosen. `motion.tsx` is
not — it is direction-neutral and lives one level up.

## Accessibility

Colour needed no derived value once the official palette landed. Terracotta
`#99571D` (Primary 4) clears WCAG AA for small text on all three light grounds —
5.48:1 on shell, 5.09:1 on paper, 4.62:1 on cream — which the previous
`#c6722c` did not, and which is why the hand-darkened `ms-clay` it used to need
has been retired. `--color-ms-terracotta-deep` (`#854716`, Secondary 4) still
carries the 10–11px eyebrows, at 7.03 / 6.54 / 5.93:1, and holds 5.14:1 on the
18% terracotta tint the condition tiles use (4.56:1 at their 26% hover).

**`#2C190B` is the darkest colour in the app**, at the clinic's request: Primary
1 `#160F09` and the three near-blacks in the palette's secondary row are all
unused, because anything darker read as black rather than as brown. That makes
`--color-ms-espresso` and `--color-ms-field` the same value — two names for one
colour, like `shell` and `ivory`, kept apart because one is ink and one is a
ground.

On that single dark ground: ivory reads 16.35:1, cream 13.79, gold 9.13, sand
7.66, caramel 7.56. Body ink on the light grounds reads 16.35 / 15.21 / 13.79:1
at full strength on shell, paper and cream, and 5.08:1 at the weakest opacity the
site uses it at (65% on paper). Headings use cocoa `#421E04` at 14.41 / 13.41 /
12.15:1.

Bronze `#B78850` is the one palette colour that must not carry small type on a
light ground — it reaches only 3.08:1 on shell, so it is for rules, borders and
type on the dark sections. Every pairing above is recomputed in the comments at
the top of `globals.css`.

Narrow screens get a `<details>`-based disclosure menu rather than a JS drawer,
so the navigation works with no JavaScript at all. Tap targets are 44px, and
the mobile menu's own rows are 72px.

Motion is covered above: reduced motion drops every transform and keeps the
fades, headings animate word by word but expose a single `aria-label` with the
words hidden from the accessibility tree, and the `<noscript>` rule guarantees
nothing is left invisible if the bundle never arrives.
