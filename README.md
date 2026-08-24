# Mela Skin — landing page

Next.js 15 (App Router) + Tailwind CSS v4 + TypeScript. Static: the whole page
prerenders, there is no client-side JavaScript of our own, and no runtime data
fetching.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static prerender
```

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
share `lib/brand.ts`, the fonts and `BrandPattern`, so facts and placeholders
stay in one place. When you settle on one, delete the other component folder
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

The nav lives inside the hero card rather than in a sticky bar, so it scrolls
away. The booking card and footer repeat every route out of the page.

## Structure

```
src/
  app/           layout (fonts, metadata), page, globals.css (brand tokens)
  components/
    brand/       BrandPattern, Marks (wordmark, monogram, sparkle)
    *.tsx        one file per page section
    ui.tsx       Container, SectionLabel, buttons, PhotoSlot
    icons.tsx    treatment icons
  fonts/         Larken — 4 cuts (the family is not variable despite the
                 archive naming, so each extra weight costs ~95KB)
  lib/brand.ts   verified facts + the `todo` placeholder map
```

## Accessibility

Colour is the one place the brand palette needed a derived value. Terracotta
`#c6722c` only reaches 2.97:1 on the cream background, so it is limited to
fills, rules and large type; small accent text uses `--color-ms-terracotta-deep`
(`#8f4713`, 5.6:1). On the espresso sections the primary terracotta clears AA on
its own and is used directly.

Narrow screens get a `<details>`-based disclosure menu rather than a JS drawer,
so the nav stays a server component. Tap targets are 44px.
