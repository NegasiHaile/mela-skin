# Mela Skin — website

Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + TypeScript + Framer
Motion. Static: every route prerenders and nothing is fetched at runtime. The
markup is still overwhelmingly server-rendered — the client boundaries are the
motion wrappers, the hero slider and the contact form.

## Routes

| Route | What it carries |
| --- | --- |
| `/` | Hero, the argument for the clinic, both service lists in summary, six anchor prices, the visit, the clinician, the premises, reviews, booking |
| `/medical-dermatology` | The ten conditions, one anchored entry each, plus what to bring to a first appointment |
| `/cosmetic-dermatology` | The ten cosmetic treatment families, each with its published starting price, plus the service that is not open yet |
| `/about` | Why the clinic exists, the six operating commitments, what a consultation records, the clinician, the premises |
| `/contact` | The booking form, the phone and email, and the map with directions |
| `/treatment-menu` | The whole priced menu — 58 treatments across five sections — and the pricing FAQ |
| `/editorial` | The alternate design direction. `noindex`, and absent from the sitemap. |

The home page states each thing once and hands off: the pillar cards orient,
the treatment section lists, the price band proves, and the subpages carry the
depth. Nothing important sits behind an accordion anywhere.

**One form, one place.** The booking form used to close all five routes, which
left `/contact` nothing to be. It lives there now and nowhere else; every other
route ends with a `BookingCta` band pointing at it. If you add a route, end it
the same way.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static prerender
npm run lint         # eslint (flat config in eslint.config.mjs)
npm run hero:frames  # rebuild the hero cross-fade stills

python scripts/optimise-images.py   # public/images/*.png -> optimised .webp
python scripts/fonts-to-woff2.py    # src/fonts/*.ttf -> .woff2
python scripts/subset-fonts.py      # then trim those to the glyphs in use
python scripts/humanizer-lint.py    # scan rendered copy for AI-writing tells
```

The two asset scripts (`brand:assets`, `hero:frames`) are Python and need
Pillow, NumPy and SciPy. They are only run when the source artwork changes;
their output is committed.

## Where the design came from

Everything visual is lifted from the files in `../Resources`, not invented:

| Thing | Source |
| --- | --- |
| Six primary colours | Brand deck p.6, labelled `PRIMARY COLOR` |
| Larken (display face) | `Brand Identity/Fonts/Larken.rar`, self-hosted in `src/fonts` |
| Space Grotesk (secondary) | Option 3 of the three the brand deck offers on p.9 |
| Wordmark lockup + descriptor | `Social Media/MELA SKIN - Social Profile_1.jpg` |
| Tagline "Richer. Radiant. You." | Letterhead + LinkedIn banner |
| Circle-and-sparkle pattern | Measured off `Letterhead/Picture1.png` |
| Pattern-as-section-ground | `Social Media/MELA SKIN - SM_Linkedin Banner.jpg` |
| Address, phone, email | `Brand Identity/Letterhead/…Letterhead_DRAFT.docx` |
| Patient-journey steps | `Operations/…/Mela Skin - Focus Area.docx` |
| The service offering — ten conditions, the cosmetic families, laser hair removal as "coming soon" | `Resources/more-info.md` |
| Every price on the site | `Resources/REVISED MENU OF GLO365 - 2025.pdf` |

Two notes on fidelity:

- **The pattern is drawn, not tiled from a bitmap.** Sampling the letterhead
  gives a horizontal pitch of 899px, a vertical pitch of 738px and a 368px
  sparkle, which solves to a circle radius of 455px — so `R = 0.506W` and
  `H = 0.821W`. Those two ratios are the whole motif and are the only thing
  `BrandPattern` hard-codes; `scale` moves the tile size without touching them.
- **The monogram is a stand-in.** The M is set in Larken inside the ring with
  the sparkle, which is close, but it is not the real artwork. Drop the vector
  logo into `src/components/brand/Marks.tsx` when it exists as SVG.

## The pattern as a section ground

`BrandPattern` draws the motif. `brand/PatternField.tsx` decides how it is
worn, and it is what every section actually uses. Three things keep a
letterhead watermark from turning into wallpaper:

1. **The sparkle colour of each tone is the section's own background colour.**
   The interstices disappear into the ground and only the circles read, so the
   pattern never competes with the copy for the same value. Tones are keyed to
   the grounds they sit on — `field`, `espresso`, `panel`, `shell`, `paper`,
   `cream`, `sand`.
2. **A mask decides which edge survives.** `fade` takes `edges | top | bottom |
   left | right | radial | none`, named for the edge that stays inked. It is
   how the pattern gets out of the way of a text column.
3. **It counter-scrolls.** `drift` moves the ground a few dozen pixels against
   the page, so it sits behind the content rather than locked to it. The layer
   overhangs its section by 10% vertically, which is what stops the drift from
   exposing an edge.

Scale is the other lever, and it does most of the work: 300px reads as texture
(the footer), 500px+ reads as architecture (the light sections). Opacity is
higher on the light grounds than the dark ones because the tones there sit only
a few percent off the paper.

A section carrying a `PatternField` must (a) be `relative overflow-hidden` and
(b) put its own content in a positioned wrapper — usually `<Wrap className=
"relative">`. The field is absolutely positioned and would otherwise paint over
static in-flow content.

## Placeholders

Every fact the clinic has not supplied renders visibly in `[square brackets]`
so nothing ships looking finished when it is not. They are collected in
`src/lib/brand.ts` under `todo` — replace the values there and they update
across the page.

Beyond that, three things need a human before this goes live:

1. **Sign off the prices.** Every figure on the site is transcribed from
   `Resources/REVISED MENU OF GLO365 - 2025.pdf` and lives only in
   `src/constants/menu.ts`. That PDF is titled for GLO365, and a few item names read
   as another operator's house branding, so somebody has to confirm the menu
   and the figures are Mela Skin's own before launch. Amending or withdrawing
   them is a one-file edit; nothing else in the codebase hard-codes a price.
   The four places the transcription departs from the printed sheet — one
   ambiguous tier, two typos, one regrouped item — are listed at the top of
   that file rather than applied silently.
2. **Two photographs are real, the rest are slots.** `hero.png` (cut-out) and
   `dermatologist.png` (clinician) are in place. The reception, detail,
   exterior and treatment shots still render as visibly unfinished
   `PhotoSlot`s. Five of the ten cosmetic families have real photography; the
   other five carry a brand-ground panel with the treatment mark set large,
   which is a finish rather than a gap — no stock photograph goes in to fill a
   hole.
3. **The reviews are deliberately empty.** The clinic has not opened, so there
   are no patients to quote. Each card states what belongs in it. Get written
   consent before publishing any real ones, and keep attribution to initials.

## Two directions

The same content and brand system, laid out two ways. Both build; pick one and
delete the other.

| Route | Direction | Shape |
| --- | --- | --- |
| `/` | **Immersive** | Full-bleed sections flooded with `ms-field`, wide-tracked Larken caps, pill controls, cut-out portrait on the field |
| `/editorial` | **Editorial** | Rounded cards floating on `ms-paper`, mixed roman/italic headings, square buttons, nav inside the hero card |

`/` uses `src/components`, `/editorial` uses `src/components-editorial`. They
share `src/constants`, the fonts and `motion.tsx`, so facts, prices,
placeholders and the motion vocabulary stay in one place. Only the immersive direction has the three subpages; `/editorial`
links into them rather than duplicating them, and is `noindex` so it never
competes with `/` in search. When you settle on one, delete the other component folder
and its route.

### The immersive direction (`/`)

The hero fills the first screen (`min-h-svh`) and holds the wordmark, the nav,
the descriptor, the tagline and two pills. It gained a nav when the site gained
routes. It has not gained an explanation, which is the thing this direction is
trying not to be.

`SiteHeader` is that bar, and it is the same component on all four routes —
`tone="dark"` on the field colour, `tone="light"` on paper. It does not stick.
The long pages pin their own section nav instead, which is what you actually
want on screen while scanning sixty priced items.

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

- **One italic word per heading.** Larken italic in `ms-clay` marks the
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
renders (`scripts/subset-fonts.py`): 377 KB of TTF becomes 98 KB. Space Grotesk
dropped its 700 weight, which nothing used. Run the two scripts in that order
if the family is ever updated; the `.ttf` files stay as the masters.

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
`backdrop-blur` came off the panels that repeat — 58 price cards and 10
condition cards, each its own backdrop root — and their fills went up a notch
to compensate exactly. The blurs that stay are the ones that do visible work
and exist once per page: the sticky menu nav, the booking form, the page-hero
asides.

**Still on the table.** 201 KB of JavaScript, nearly all Framer Motion. Moving
to `LazyMotion` with `domAnimation` (already done, and `strict` keeps it that
way) only recovered 6 KB, because the animation and gesture features are most
of what the site uses. Getting materially below that means replacing the
entrance animations with CSS, which is a bigger change than this pass was for.

## The header

Four items: a Treatments panel, then Menu & prices, About and Contact. Medical
and cosmetic used to sit in the bar as separate items, which asked a visitor to
know which half of dermatology their problem belonged to before they could
click anything.

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

## The two rails

`components/Treatments.tsx` carries both service lists, and both scroll
horizontally. Neither looks like the other, which is deliberate: a visitor
should be able to tell which list they are in without reading the label.

| | Medical | Cosmetic |
| --- | --- | --- |
| Shape | Two rows, five columns, column-major | One row |
| Entry | No box at all — a hanging `01`–`10`, a name and a line of type under a hairline | A paper card: snipped corners, hard shadow, tinted ground |
| Carries | Icon, name, one line | Photograph or brand panel, name, one line, the price it starts at |
| Reads as | An index — you scan for a word you already have | A catalogue — you browse without knowing what you want |

Exactly one of the two is in card form, and that is the whole reason they read
apart. The medical entries use the same ruled-entry language as the visit steps
and the review slots; boxing them made the section look like two rows of the
same thing. The title reserves two lines (`min-h-[2.4em]`) whether the name
needs them or not, so every summary in a row starts at the same height.

Two rows for the medical list is not decoration. Ten conditions in a single
rail put seven off-screen on a phone; stacked two deep the same rail shows four
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

The hero slider (`HeroFrames`) predates this and is still its own component,
driven by state and CSS transitions rather than by Motion.

## Structure

```
src/
  app/
    layout.tsx             fonts, motion policy, metadata, clinic JSON-LD
    page.tsx               /
    medical-dermatology/   the ten conditions
    cosmetic-dermatology/  the ten treatment families
    treatment-menu/        the priced menu + pricing FAQ
    editorial/             the alternate direction (noindex)
    globals.css
  constants/     EVERYTHING THE SITE SAYS — see constants/README.md
    about.ts         the about page: story, principles, skin assessment
    brand.ts         name, address, contact, tagline, hero photography
    contact.ts       the contact page, the map embed, the closing CTA
    placeholders.ts  every fact not confirmed yet, rendered in [brackets]
    menu.ts          the priced menu — the ONLY source of prices
    conditions.ts    the ten medical conditions
    cosmetic.ts      the ten cosmetic families + the coming-soon service
    clinic.ts        clinicians, visit steps, premises, review slots
    navigation.ts    header bar, footer columns, legal links
    copy.ts          headings, ledes, FAQ, metadata — grouped by page
    index.ts         the barrel: `import { … } from "@/constants"`
  motion.tsx     the motion primitives — shared by BOTH directions
  components/
    brand/       BrandPattern (the motif), PatternField (how it is worn),
                 Marks (wordmark, monogram, sparkle)
    SiteHeader   one nav bar, light or dark, on every route
    PageHero     the field-colour opening band on the four subpages
    *.tsx        one file per page section
    ui.tsx       Wrap, SectionHead, pills, Lede, Callout, PhotoSlot
    HeroFrames   the hero push-slider
    icons.tsx    21 condition/treatment marks + a name-to-component registry
  fonts/         Larken — 4 cuts (the family is not variable despite the
                 archive naming, so each extra weight costs ~95KB)
  lib/
    jsonld.ts    MedicalClinic graph, built from the constants
```

### Content lives in `src/constants`, and only there

No component hard-codes a price, a service name, a heading or a paragraph.
`constants/menu.ts` holds every figure; `constants/conditions.ts` and
`constants/cosmetic.ts` hold every service; `constants/copy.ts` holds the prose
around them. Everything else reads from those — the home price band, the
cosmetic cards, the footer columns, the page metadata, the JSON-LD, the counts
on the pillar cards, and the editorial direction as well as the immersive one.

Add a condition to `constants/conditions.ts` and it appears in the home index,
the medical page, the footer and the search keywords without anybody
remembering to go and add it. `constants/README.md` is the guide to which file
holds what.

Two invariants worth knowing before editing:

- **Names are lookup keys.** A cosmetic family's `menuItems` and a home price
  anchor's `item` are matched against `constants/menu.ts` by exact string.
  Rename a menu item and rename it in both places, or the "from" price silently
  falls back to zero.
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

Colour is the one place the brand palette needed a derived value. Terracotta
`#c6722c` only reaches 2.97:1 on the cream background, so it is limited to
fills, rules and large type; small accent text uses `--color-ms-terracotta-deep`
(`#8f4713`, 5.6:1). On the espresso sections the primary terracotta clears AA on
its own and is used directly.

Narrow screens get a `<details>`-based disclosure menu rather than a JS drawer,
so the navigation works with no JavaScript at all. Tap targets are 44px, and
the mobile menu's own rows are 72px.

Motion is covered above: reduced motion drops every transform and keeps the
fades, headings animate word by word but expose a single `aria-label` with the
words hidden from the accessibility tree, and the `<noscript>` rule guarantees
nothing is left invisible if the bundle never arrives.
