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
| `/treatment-menu` | The whole priced menu — 58 treatments across five sections — and the pricing FAQ |
| `/editorial` | The alternate design direction. `noindex`, and absent from the sitemap. |

The home page states each thing once and hands off: the pillar cards orient,
the treatment section lists, the price band proves, and the three subpages
carry the depth. Nothing important sits behind an accordion anywhere.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static prerender
npm run lint         # eslint (flat config in eslint.config.mjs)
npm run hero:frames  # rebuild the hero cross-fade stills
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
   `src/lib/menu.ts`. That PDF is titled for GLO365, and a few item names read
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
share `lib/brand.ts`, `lib/services.ts`, `lib/menu.ts`, the fonts and
`motion.tsx`, so facts, prices, placeholders and the motion vocabulary stay in
one place. Only the immersive direction has the three subpages; `/editorial`
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
want on screen while scanning sixty priced items. Below `lg` the links collapse
into a `<details>` disclosure: no JS, so it works before the bundle lands.

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
  motion.tsx     the motion primitives — shared by BOTH directions
  components/
    brand/       BrandPattern (the motif), PatternField (how it is worn),
                 Marks (wordmark, monogram, sparkle)
    SiteHeader   one nav bar, light or dark, on every route
    PageHero     the field-colour opening band on the three subpages
    *.tsx        one file per page section
    ui.tsx       Wrap, SectionHead, pills, Lede, PriceFrom, Callout, PhotoSlot
    HeroFrames   the hero push-slider
    icons.tsx    20 condition/treatment marks + a name-to-component registry
  fonts/         Larken — 4 cuts (the family is not variable despite the
                 archive naming, so each extra weight costs ~95KB)
  lib/
    brand.ts     verified facts, the `todo` placeholder map, primary nav
    services.ts  the ten conditions and ten cosmetic families, with the copy
    menu.ts      the priced menu, transcribed — the ONLY source of prices
    jsonld.ts    MedicalClinic graph, built from services.ts + menu.ts
```

### One source per fact

`menu.ts` holds every figure. `services.ts` holds every service name and every
word of description. Everything else reads from them — the home price band, the
cosmetic cards, the footer columns, the page metadata, the JSON-LD, the counts
on the pillar cards. Add a condition to `services.ts` and it appears in the
home index, the medical page, the footer and the search keywords without
anybody remembering to go and add it.

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

Narrow screens get a `<details>`-based disclosure menu rather than a JS drawer.
Tap targets are 44px.

Motion is covered above: reduced motion drops every transform and keeps the
fades, headings animate word by word but expose a single `aria-label` with the
words hidden from the accessibility tree, and the `<noscript>` rule guarantees
nothing is left invisible if the bundle never arrives.
