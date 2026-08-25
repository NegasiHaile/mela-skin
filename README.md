# Mela Skin — landing page

Next.js 16 (App Router, Turbopack) + Tailwind CSS v4 + TypeScript + Framer
Motion. Static: every route prerenders and nothing is fetched at runtime. The
markup is still overwhelmingly server-rendered — the client boundaries are the
motion wrappers, the hero slider and the contact form.

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

Beyond that, two things need a human before this goes live:

1. **The treatment list is drafted, not supplied.** The Resources folder has no
   service list, so the eight treatments are standard dermatology and aesthetic
   services written to fit the positioning. Several are regulated activities in
   Kenya and are bracketed inline for that reason: laser platforms, licensed
   dispensing, hydroquinone, and the scar-revision procedures. Confirm each.
2. **Two photographs are real, the rest are slots.** `hero.png` (cut-out) and
   `dermatologist.png` (clinician) are in place. The reception, detail,
   exterior and treatment shots still render as visibly unfinished
   `PhotoSlot`s.
3. **The reviews are deliberately empty.** The clinic has not opened, so there
   are no patients to quote. Each card states what belongs in it. Get written
   consent before publishing any real ones, and keep attribution to initials.

## Two directions

The same content and brand system, laid out two ways. Both build; pick one and
delete the other.

| Route | Direction | Shape |
| --- | --- | --- |
| `/` | **Immersive** | Full-bleed sections flooded with `ms-field`, wide-tracked Larken caps, pill controls, cut-out portrait on the field, near-empty nav |
| `/editorial` | **Editorial** | Rounded cards floating on `ms-paper`, mixed roman/italic headings, square buttons, nav inside the hero card |

`/` uses `src/components`, `/editorial` uses `src/components-editorial`. They
share `lib/brand.ts`, the fonts and `motion.tsx`, so facts, placeholders and
the motion vocabulary stay in one place. When you settle on one, delete the other component folder
and its route.

### The immersive direction (`/`)

The hero fills the first screen (`min-h-svh`) and holds four things only: the
wordmark, one pill, the descriptor, and the tagline. Everything else was cut —
a hero that explains itself is the thing this direction is trying not to be.

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
  app/           layout (fonts, motion policy, metadata), page, globals.css
  motion.tsx     the motion primitives — shared by BOTH directions
  components/
    brand/       BrandPattern (the motif), PatternField (how it is worn),
                 Marks (wordmark, monogram, sparkle)
    *.tsx        one file per page section
    ui.tsx       Wrap, SectionHead, pills, PhotoSlot
    HeroFrames   the hero push-slider
    icons.tsx    treatment icons
  fonts/         Larken — 4 cuts (the family is not variable despite the
                 archive naming, so each extra weight costs ~95KB)
  lib/brand.ts   verified facts + the `todo` placeholder map
```

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
