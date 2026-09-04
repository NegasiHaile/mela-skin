# 2 Sep 2026, evening — one ground, one lattice, and a footer that never rendered

Two notes from the clinic:

> The copy right section is not there still, please add it at the very bottom of
> the footer

> Can we also use gradient background from ligheter version which is what we used
> under the hero section to what we used in the "Book an appointment" instead of
> per section background.

The first turned out to be a real bug with a general cause, and I gave the wrong
answer about it first. The second replaced most of the section-ground machinery
with one line of CSS, and then took two more passes to actually be seamless.

---

## 1. The footer's legal bar had never once rendered

**I said it was a stale build. It was not, and the source was the wrong place to
look.** The copy was in `SiteFooter.tsx` all along, at full opacity in the
markup. It was the reveal system that never let it paint.

### The mechanism, which is general and worth knowing

`motion.tsx` triggers every reveal off one viewport setting:

```ts
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
```

That margin holds the trigger line 12% of the viewport height above its bottom
edge, so a block fires when

```
top < scrollY + 0.88 × V
```

Scrolling stops at `scrollY = doc − V`. So the highest threshold a reader can
ever reach is

```
doc − 0.12 × V
```

and **any block whose top is inside the last 0.12 × V of the document never
fires at all.** It is not a race, or a timing problem, or something a slower
scroll fixes: there is no scroll position from which those pixels satisfy the
condition.

| viewport | dead zone at the end of the document |
| --- | --- |
| 900px | last 108px |
| 1080px | last 130px |
| 1440px | last 173px |

The legal bar's top is **60px from the end of the document** on every route. It
needed a viewport under 500px tall to appear. The contact strip, at 142px, goes
the same way on anything taller than about 1190px.

### Two fixes, because they are for two different things

**`eager`, a new prop on `Reveal` and `Stagger`**, swaps the viewport for
`{ once: true, margin: "0px" }` — the same once-only trigger with no dead zone
at either end. Every motion wrapper in the footer takes it. That is the right
fix for the logo, the social row, the link columns and the contact strip: they
should still animate, they just should not be gated on a line they can never
cross.

`amount` is NOT the fix, and the comment above `VIEWPORT` already said why: a
fractional threshold can never be satisfied by a block taller than the screen,
which trades this bug for a worse one on the long sections.

**The legal bar does not animate at all.** It is plain markup at full opacity
now, not a `Reveal`. This is the one block on the site that is legal text — the
registered company name, the KRA PIN, the regulator, a medical disclaimer — and
the reason to animate two lines of compliance copy was never strong enough to
put them behind an observer. It renders whatever happens to the JavaScript.

That also makes it **checkable in the build output** rather than only in a
browser, which matters here more than usual, because:

### The environment could not have caught this, and now cannot verify it either

Headless Chrome under `--virtual-time-budget` does not re-deliver
`IntersectionObserver` on a programmatic scroll. Measured on `/contact`:
**19 of 56 `[data-motion]` elements had fired at scroll 0, and still exactly 19
after scrolling to the bottom of the document.** Every element in the footer
reported `inView: true` with `opacity: 0`.

So no screenshot of this environment can show whether a reveal works, in either
direction. Two things follow, and both are now in `motion.tsx`:

- The `eager` fix is verified **arithmetically** — `top = doc − 60 < doc`, which
  is the condition with `margin: 0` — and not from a render.
- The legal bar is verified **statically**, from the built HTML on all seven
  routes: the copyright and the disclaimer are present, carry no `data-motion`,
  and carry no `opacity:0`.

Two other traps in this environment, both found the same day and both in
`docs/2026-09-02-1400`: `--window-size=400` lays out at 500px, and
`scroll-behavior: smooth` on `html` means a programmatic `scrollTo` never
arrives under virtual time (pass `behavior: "instant"`).

---

## 2. One gradient for the whole light part of a page

```css
.ms-ground {
  background-image: linear-gradient(
    to bottom in oklab,
    var(--color-ms-shell),
    var(--color-ms-linen)
  );
}
```

That is the whole thing. It replaced a four-step ramp of flat grounds — shell,
paper, cream, linen — where every band also painted a 96/140px gradient at each
end running to the midpoint it shared with its neighbour.

**What came out:** the per-band `bg-ms-shell|paper|cream|linen`, both ramp
elements, the `above`/`below` props at 24 call sites, the `--ms-ramp` token, the
`RampTone` type, and the `meet()` helper.

**Why, when the ramps worked.** They were eight or nine separate transitions per
page, and each one was a fact stated twice: a band declared its own ground *and*
the grounds either side of it. A wrong `above` rendered as a band fading in from
a colour that is not there, and reordering a page meant editing the bands on
both sides of the move. One gradient has nothing to declare and nothing to keep
in step.

**It is a wrapper and not a background on `main`, so that nothing has to be
measured.** The wrapper begins where the hero ends and ends where the footer
begins, so `0%` is exactly the colour under the hero and `100%` is exactly the
colour of the booking band — which is what was asked for, in those words. On
`main` the first stop would land at the top of the *hero*, and the visible top of
each page would start a tenth of the way into the ramp, by a different amount on
every route because the heroes are different heights.

Measured on `/about`: `#faf8f3` under the hero, ramping monotonically to
`#e4cfb3` at the booking band, with no step anywhere.

### Two knock-on changes

**`content-visibility` is scoped to `.ms-ground > section` now**, not
`main > section:not(:first-of-type)`. The hero is the one band outside the
wrapper, so the exclusion it needs — it carries the header, whose mobile menu is
positioned out of the section, and containment would clip it — is now structural
rather than positional.

One consequence to know about: `contain-intrinsic-size: auto 720px` guesses an
unrendered band's height, so the wrapper's height, and therefore the gradient's
scale, is an estimate until every band has been rendered once. On a first scroll
down the home page the ground drifts by about a tenth of the span, four units of
red and seven of blue. Judged not worth giving up the containment for.

**The seam guard now covers two joins, not eight.** `main > section` and
`main > .ms-ground` each end one pixel inside what follows, which are the hero
into the ground and the ground into the footer — the only two hard edges left on
a page. There is no join *inside* the ground to leak through.

---

## 3. The lattice, in two passes, because the first one made a hairline

This is the part that took the longest, and the reason is worth recording: **the
lattice was tuned to flat grounds, and a gradient breaks that tuning in two
separate ways.**

### Pass one: the ink stepped

The tile is one image per band, and each of the four light tones was an *opaque*
pair drawn a few percent off ONE flat ground. With the ground now continuous,
the tile still changed at every band boundary where the tone changed — and it
stepped there.

Measured on `/about`: **4 to 7 units out of 255, across 87 to 99% of the page
width, three times down the page.** A full-width hairline at every join, which
is exactly what the clinic has twice asked to be rid of ("please avoide using
separator line between sections, or you are using space that shows light colored
line").

Assigning tones by measured band midpoint helped and did not fix it. The step is
inherent to one opaque tile per band.

**So the four light tones became one translucent ink.** A translucent ink cannot
step, because there is one tile everywhere, and its contrast tracks the ground
for nothing: `alpha × (ink − ground)` shrinks on its own as the ground darkens.

Fitted, not picked — one ink and one alpha per gradient stop, least squares
against what the four opaque pairs rendered over their own grounds, weighted by
the layer opacity that reaches the screen:

```
rgba(140, 84, 10, 0.087)   the tile's top and bottom edge
rgba(140, 84, 10, 0.184)   its middle
```

Worst residual is under four units at full depth, against a step of four to
seven that it removes. `#8C540A` is near the palette's Primary 4 and sits on the
line all four old pairs were already walking — every one of them was its ground
pushed a few percent toward this colour, which is why one ink fits all four.

**`DEPTH_FLOOR` moved from 0.32 to 0.248, and that is not a fudge.** The
letterhead's measured 0.31 is a *contrast* at the top of the sheet. A
translucent ink over a ground that lightens toward the top produces more
contrast per unit of alpha up there, so the alpha that renders 0.31 is lower
than 0.31. The arithmetic: the top of a page used to render 4.35 units of
contrast in its worst channel, the ink at full depth renders 17.54, and
4.35 / 17.54 = 0.248.

### Pass two: then the ink doubled

Translucency fixed the step and immediately created a different hairline. Two
neighbouring bands share a boundary that almost never lands on a whole pixel,
and the browser gives *each* of them that whole pixel row — so both painted it.
With opaque tiles the second simply covered the first and nothing showed. With a
translucent ink they add, and the shared row came out at twice the ink.

Measured on `/medical-dermatology`: **18.8 units** at the top of the booking
band. Worse than the step it replaced.

**So the light lattice is one layer, on the ground wrapper.**
`brand/GroundLattice.tsx`. One layer has no internal boundary, so neither
artefact is possible. It also replaces six to nine phase measurements per page
with one, and the per-band depth constant — which stepped at every join too, by
about 1.7 units — with a mask that does not step at all.

`PatternField` still serves the three dark bands, unchanged. Each of those is a
flat colour with a hard edge either side and nothing continuous about it.

**Three details in `GroundLattice`:**

- **The depth ramp is a `mask-image`, not an opacity.** As a per-band opacity the
  letterhead's curve was a staircase; on one layer it is the curve. The mask has
  three stops when the curve's kink — where it reaches full strength at four
  fifths of the document — lands inside the element, and two when it does not.
- **Two nested elements.** The outer is exactly the ground's box and carries the
  mask and the clip; the inner overhangs by one tile on all four sides and
  carries the tile and the drift. The mask has to measure the ground and nothing
  else, so it cannot live on the element that overhangs it.
- **`z-index: -1`, with `isolation: isolate` on the wrapper.** A positioned
  element at `z-index: auto` paints above the in-flow *inline content* of its
  siblings, which would put the lattice over every word on the page.

### What it measures out at

Worst row-to-row step in the page margin, across the light region:

| route | per band, opaque | per band, one ink | one layer |
| --- | --- | --- | --- |
| `/about` | 4.4–6.4 at joins | 4.1 | **3.0** |
| `/medical-dermatology` | — | 18.8 | **3.0** |
| `/cosmetic-dermatology` | — | 6.0 | **3.0** |
| `/skincare` | — | 2.2 | **3.0** |
| `/contact` | — | 5.0 | **2.3** |

The uniform 3.0 is the pattern's own circle edges — the same value on every page
is what tells you it is the tile's geometry and not a boundary.

---

## 4. The social row: bigger, and the live account looks live

Two notes, and the second is the one that mattered:

> please make the social icons a bit more prominant and the one with real link
> should ahve a background both by default and on hover

**40px slots around 18px glyphs became 44 around 21.** The old size was the
smallest thing WCAG 2.5.8 will accept — at 40 with `gap-1` the *centres* of two
adjacent icons sit exactly 44px apart, which is what the rule measures — so the
row was as tight as it could legally be. That was right under a 246px lockup.
Under the enlarged mark at its column's full 376px it read as a line of specks.
At 44 with `gap-1.5` the centres are 50px apart and the row is 194px, about half
the mark's width.

The stroke stayed at 1.6 in a 24 viewBox, so it renders at 1.4px against the old
1.2 — the three line marks gained weight with the size rather than thinning out
inside it.

**The live account now wears a filled disc at rest, not only on hover.** This was
the real defect: LinkedIn is the only one of the four with a URL, and until now it
looked identical to the three that go nowhere until you happened to point at it.
The one thing in the row a visitor can actually use was the one thing not marked.

| | disc | vs the footer | glyph on the disc |
| --- | --- | --- | --- |
| live, at rest | `bg-ms-cream/18` → `#503E30` | 1.66:1 | 7.32:1 |
| live, on hover | `bg-ms-gold/30` → `#614A25` | 2.01:1 | 8.14:1 |
| not set up | none, dashed ring | — | 3.27:1 on the footer |

Hover changes hue rather than only weight, because gold is what every other
interaction in this footer uses — the link arrows, the current page. And the
placeholders keep the dashed ring with no fill: **the gap between a filled circle
and an outlined one is the signal**, and the live glyph carries about three times
the contrast of a placeholder's, so the difference reads at a glance rather than
on inspection.

The dashed slot is not focusable and announces as "…, not set up yet".

**All four accounts went live later the same evening**, on the handle the clinic
gave: `mela-skin`. Only LinkedIn takes it literally — a company-page slug is the
one of the four that permits a hyphen, and Instagram, Facebook and TikTok reject
one outright — so the other three are `melaskin`, which is both the only form
they accept and the form the clinic already uses in `melaskin.ke` and
`info@melaskin.ke`. The array feeds the footer and the JSON-LD `sameAs` together,
so the row and the structured data cannot disagree.

Nobody has confirmed the clinic holds the three derived handles. LinkedIn came
from the clinic directly; a footer link to somebody else's account is worse on a
clinic site than a dashed placeholder, so the reversal is one `href: null` per
platform.

---

## 5. The tagline came off the footer

"Richer. Radiant. You." passed through two positions on 2 Sep before leaving: the
centre of the contact band, then centred under the mark. The clinic took it off
the footer altogether.

**That was available at the first step and I did not take it.** When the contact
strip was told to carry only the contacts, I moved the tagline up rather than
delete it, reasoning that it read better as the brand's line than as a third
contact detail. It does — but the line is already on the home hero, which is
where it was praised in the first place, and a brand line printed twice on one
page is a brand line nobody reads once.

`brand.tagline` still feeds the three heroes and the JSON-LD `slogan`, so nothing
is lost but the duplicate. The logo column is the mark and the social row, about
240px against 250 of link columns — the balance the enlarged mark bought on its
own. The tagline was never what was holding that up.

---

## 6. The depth ramp came off the light ground

> The entire page patter color should be as what of on the top part under the
> hero section of the pattern color. That is cool

So the letterhead's ramp is off the light body. The motif holds ONE strength
from the top of the page to the bottom, and that strength is what the ramp used
to reach just under the hero.

**Measured, not guessed.** The mask ran from about 0.35 at the top of the ground
to 1.000 at its bottom, and multiplied a layer opacity of 0.42. Effective
opacity at the top of the ground, per route:

| route | depth at the ground's top | mask there | effective |
| --- | --- | --- | --- |
| `/` | 0.131 | 0.371 | 0.1558 |
| `/about` | 0.100 | 0.342 | 0.1435 |
| `/medical-dermatology` | 0.080 | 0.323 | 0.1356 |
| `/treatment-menu` | 0.118 | 0.359 | 0.1507 |
| `/contact` | 0.171 | 0.409 | 0.1716 |

Mean 0.1514, so **`OPACITY = 0.15`** and no mask. `DEPTH_FLOOR`, `DEPTH_FULL`
and the whole mask computation are out of `GroundLattice`; its effect now does
the phase and nothing else.

**A single constant also fixes something nobody asked about.** The ramp was a
fraction of each *document*, and the documents are different lengths — so the top
of `/contact` was rendering 27% stronger than the top of `/medical-dermatology`.
The thing the clinic pointed at was not the same on every route. Now it is.

Sampled down `/about`, peak-to-trough across a tile row in the page margin:

| depth | 0.15 | 0.30 | 0.50 | 0.70 | 0.85 |
| --- | --- | --- | --- | --- | --- |
| ramped | 20 | 21 | 27 | 33 | 32 |
| flat | 21 | 18 | 19 | 20 | 18 |

**It still softens very slightly toward the footer, and nothing is doing that on
purpose.** The ink is translucent, so its contrast is `alpha × (ink − ground)`,
and the ground darkens down the page — which closes that gap. Worst channel at a
constant alpha: about 6.2 units of blue under the hero against 4.6 at the booking
band. Under two units across a whole page.

### A bug this exposed in `PatternField`

`DEPTH_FLOOR` there was **0.248, and it should have been 0.32.**

The 0.248 was derived a few hours earlier, correctly, *for the light lattice*: a
translucent ink over a ground that lightens toward the top produces more contrast
per unit of alpha up there, so the alpha rendering the letterhead's measured 0.31
was lower than 0.31. Then the light lattice moved out of `PatternField` into
`GroundLattice`, which carried its own copy of the number — and `PatternField`
kept the adjusted floor while every ground it still paints is **flat**: the field
colour on the heroes and the footer, and editorial's card grounds.

On a constant ground the alpha and the contrast are the same number, so the
measured 0.31 is the floor. Holding 0.248 was quietly rendering the heroes 22%
fainter than the artwork does. Back to 0.32.

**The dark bands still carry the letterhead ramp**, which means the footer's motif
is stronger than the hero's — they are three separate flat grounds rather than one
continuous one, and the note above was about the light body. Say the word if those
should flatten too.

---

## 7. The menu's sticky bar had to be re-tinted

MenuBoard's filter bar is `position: sticky` and travels about 3,900px down the
board. Its section used to be a flat `bg-ms-shell`, so a `bg-ms-shell/95` bar
matched it exactly the whole way. Against the ramp it does not: by the bottom of
the table the ground behind it is roughly `#EDDCC4`, and a 95% shell bar over
that is **49 units of blue too light** — a pale box sliding down a warm page.

It is `bg-ms-cream/55` now: the midpoint of the ramp at about half strength, so
it is within about ten units of the ground at *both* ends instead of matching at
one and missing at the other. With the blur doing the separating, what is left
reads as glass over the page rather than a panel on top of it.

Contrast holds all the way down:

| ground behind the bar | bar resolves to | chip text | "SECTIONS" |
| --- | --- | --- | --- |
| `#FDFCF8` (board top) | `#F8F0E5` | 9.68:1 | 6.85:1 |
| mid ramp | `#F4E7D6` | 9.13:1 | 6.36:1 |
| `#EDDCC4` (board bottom) | `#F1E2CE` | 8.84:1 | 6.09:1 |

Every other light background in the live direction was checked and left: they
are cards, chips and plates, which are *meant* to read as sheets on the ground,
and most are already translucent so they pick the ramp up on their own.

---

## Verified

- **The legal bar is plain markup at full opacity on all seven routes**, with no
  `data-motion` and no `opacity:0` in the built HTML. It also now appears in a
  headless screenshot of the footer — an environment where, as above, no reveal
  fires at all. That is the clearest demonstration of both the bug and the fix.
- The social row renders three dashed slots and one filled disc, and the filled
  one is the account with a URL.
- No "Richer. Radiant. You." anywhere in the footer's markup on any route.
- Every motion wrapper in the footer carries `eager`.
- **The ground ramps monotonically from shell to linen on all seven routes**, and
  the two ends are the two colours that were asked for: sampled `#FAF8F3` to
  `#E4CFB3` on `/about`.
- **The light pattern is flat down the page**: 21, 18, 19, 20, 18 at five depths
  on `/about`, against 20, 21, 27, 33, 32 before.
- **No ground seam anywhere in the light region above 3.0 units**, page margin,
  full length, all six content routes. The only larger step left on the menu page
  is the sticky bar's own `border-b`, which is a deliberate rule.
- `tsc`, `eslint`, `next build` across all routes, and the copy linter at 71
  files / 0 violations.

## Left alone, deliberately

- **`/editorial` still runs the four-tone opaque path** through its own
  component tree, on flat card grounds, where an opaque tile per band is
  correct. It re-exports the live `PatternField`, so `panel` and `sand` stay in
  `TONES` for it.
- **The reveal dead zone is fixed at the footer, not globally.** The `-12%`
  margin is what stops a block animating while it is still half off the screen,
  and it is right everywhere except the last 200px of a document — which is the
  footer, on every route, by construction. Anything new placed at the very end
  of a page needs `eager`; the note in `motion.tsx` says so.
