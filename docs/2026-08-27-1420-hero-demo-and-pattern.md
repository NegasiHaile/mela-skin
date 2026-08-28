# 2026-08-27 14:20 EAT — Two heroes for review, and one continuous pattern

Third pass. Follows `2026-08-27-1101-second-pass.md`. Four things: a real bug in
the hero, the header's contrast over a photograph, the pattern reading as one
image down the page, and two selectable heroes for the team to choose between.

## 1. The hero overlay was swallowing every click

**The bug.** The header, the two hero buttons and the logo were all dead on the
home page. Nothing looked wrong; nothing responded.

**The cause, exactly.** `HeroBackground` renders its scrims at `z-20` inside a
wrapper that was `absolute inset-0` with **no `z-index`**. An element with
`z-index: auto` does not create a stacking context, so those `z-20` children did
not stack inside the wrapper — they joined the section's own stacking context and
painted above the content, which sits at `z-10`. And the wrapper had no
`pointer-events-none`, so three full-bleed decorative divs were lying on top of
the entire first screen collecting the clicks.

**The fix**, both halves needed:

- `z-0` on the wrapper. Any z-index other than `auto` closes the hole; 0 is the
  one that changes nothing else.
- `pointer-events-none` on it.

Verified by hit-testing rather than by eye: `elementFromPoint` at the centre of
every control in the first screen, then a real navigation through each one. All
nine reach their target and all nine navigate, on both hero variants.

## 2. The top bar over a photograph

The nav's right-hand items sat on the brightest part of the frame. Two changes,
because neither was enough alone:

- **A top scrim** in the hero background, `ms-field` 85% → 45% → transparent
  over the first 208px. The nav runs the full width, so unlike the tagline it
  cannot rely on the left weight.
- **Stronger link colours on the dark tone**: `text-ms-cream/80` →
  `text-ms-cream`, the phone off sand onto `cream/85`, the burger border to
  `cream/55`.

Measured on the render, cream against the ground behind each item:

| | ground | cream |
| --- | --- | --- |
| TREATMENTS | `#513F2E` | 8.21:1 |
| TREATMENT MENU | `#52402F` | 8.09:1 |
| SKINCARE | `#564533` | 7.52:1 |
| ABOUT | `#4E3A2A` | 8.79:1 |
| CONTACT | `#533F2D` | 8.15:1 (the item has since left the bar — see the fourth pass) |
| BOOK NOW pill | `#493425` | 9.58:1 |

## 3. The pattern is now one image down the whole page

**What was broken.** Each section rendered its own SVG, with its own `<pattern>`
starting at its own origin, at its own `scale` (400 to 620), drifting by its own
scroll progress, behind its own fade mask. Four independent reasons for the
lattice to be out of phase with the section above it, so every boundary showed
the motif restarting.

**What it is now.** One tile, one size, one phase, colour per section.

- `BrandPattern` builds a **tileable data-URI SVG** instead of rendering an
  element. One `TILE_W` of 520px for the whole site.
- `PatternField` paints it as a `background-image` and offsets each section by
  `-(its distance from the top of the document mod TILE_H)`, which lands every
  section on the tile the page-wide lattice would have there. Measured, with a
  `ResizeObserver` on the body, because section heights depend on content and
  fonts.
- **The overhang is exactly one tile.** Not a round number for comfort: at any
  other size the tile origin shifts and has to be corrected for. At `TILE_H` the
  correction is a no-op, since `(docTop - TILE_H) mod TILE_H` equals
  `docTop mod TILE_H`.
- **The drift is global.** `PatternDrift`, rendered once by `MotionProvider`,
  writes one custom property on `:root` and every layer translates by it. Per
  section, parallax *was* phase drift. It wraps at one tile, which is invisible
  because the pattern is periodic with exactly that period, and it is a
  `transform` so scrolling composites instead of repainting eight tiled
  backgrounds.
- **The fades are gone.** A mask that fades the pattern out towards a section
  edge puts a gap at exactly the join this is trying to make invisible.
- `scale`, `fade`, `drift`, `opacity` and `id` all left the props. 34 call sites
  are now `<PatternField tone="…" />`.

Result: a sparkle straddling a boundary renders its top half in one section's
colour and its bottom half in the next — geometry continuous, colour per section,
which is what was asked for.

**Two bugs found on the way, both worth writing down.**

1. **The data URI was invalid and the pattern was painting nowhere.** Written as
   `url("data:image/svg+xml,<svg xmlns="…")`, the attribute's own double quote
   closes the url string. The browser drops the declaration silently — no error,
   no warning, just no ground. Attributes are on single quotes now, and `<`, `>`
   and `#` are percent-encoded. Caught by asserting on
   `getComputedStyle(...).backgroundImage`, not by looking at the page.
2. **The opacities were roughly twice what they should be.** They had been tuned
   behind fade masks, so a nominal 0.85 only ever showed across part of a
   section. Uncovered, the same number is wallpaper — the one thing this ground
   must not be (Mo, 00:47:02: "it's too busy. Even when I look at it, I'm not
   sure what exactly to look at"). Light tones are now 0.40–0.45, dark 0.50.

Verified on `/`, `/treatment-menu`, `/about` and `/skincare`: every layer paints,
every layer's phase matches the lattice to within a rounding error, and the drift
is one shared value that moves with scroll.

## 4. Two heroes, with a toggle

For the review the meeting set up. Abseret, 00:57:11: *"why don't you send us
screenshots of the landing page … then we can see what looks good."* Dr.
Gachanja, same moment: *"you can play around with it and share with us; we can
pick, you know, the one that comes out best."*

Screenshots are one way. Two live heroes with a switch is better, because the
difference between these two is motion and proportion and neither survives a
still.

| | Hero A | Hero B |
| --- | --- | --- |
| Content | Tagline, one line, two buttons | Tagline, two lines including the address, two buttons |
| Picture | Full-bleed, three interiors sliding | Cut-out portrait push-sliding on the right half |
| Ground | Primary 2 `#2C190B` + field scrims | Toggles: `#2C190B` (default) or the committed `#74370c` |
| Pattern | None over the photograph | 440px tile at 0.6, unmasked, colours following the ground |
| Source | Current | Commit b894798 |

**Hero B carries its own palette**, which is the only way the comparison means
anything. Every class resolves against `--color-ms-*`, and those have moved twice
since that hero was written. Rendering its layout in today's colours would be a
third hero, not the old one — so `HeroOriginal` redeclares the committed values
on its own section and nothing outside it is touched. That `#74370c` is the brown
Abseret was looking at when she said, 00:18:31: *"this brown is a little bit too
red."*

**Two deliberate deviations from the commit, stated rather than smuggled:**

1. The second button read **"See the prices"**. It says "Treatment menu". There
   are no prices behind that link any more, so the original wording would send
   somebody looking for something the clinic decided not to publish. That is a
   content rule and it outranks snapshot fidelity. Say the word and it goes back.
2. Its pattern is drawn inline at the committed tone, scale and opacity rather
   than through `PatternField`, which is now page-wide. Wiring the snapshot into
   it would either break the continuity above or restyle the snapshot.

**The toggle** is bottom right of the first screen, where the image credit was:
the word "Hero" and two dots. The credit sits beside it and switches with the
variant, because the two are not showing the same pictures — A is on the licensed
stock interiors, B on the generated portraits. One line covering both would have
credited Unsplash for images Unsplash did not take.

**It is a demo control, not a feature.** When the choice is made: delete the
losing variant, delete `HeroSwitcher`, render the winner from `app/page.tsx`, and
drop `brand.hero.legacyLine1` / `legacyLine2`. Nothing else imports any of it.

## Verified

- Clean `rm -rf .next && npm run build`: 17 routes prerender. `eslint .` clean.
  Copy lint 0 violations across 69 files.
- Every control in both heroes hit-tested and navigated.
- Pattern: painting and in phase on all four pattern-bearing routes.
- Contrast measured off renders, not modelled: the nav, both heroes' type, and
  the toggle row. The toggle's credit went from `cream/70` to `cream/85` because
  70% reached only 3.82:1 over Hero B's portrait.

## Also fixed

**A corrupted `.next` build.** Three manifests (`export-marker.json`,
`functions-config-manifest.json`, `pages-manifest.json`) were left truncated by
overlapping `next build` and `next start` runs during review, and the server threw
`SyntaxError: Unexpected token ' '` on every request. `rm -rf .next` and one clean
build; nothing in `src/` was involved. Do not run a build while a `next start` is
serving the same `.next`.

---

## Fourth pass: one darkest colour, and a ground toggle on Hero B

### `#2C190B` is now the darkest colour in the app

**What was asked.** The footer and the consultation band were reading as
near-black rather than as brown. Bring them up to the colour the page heroes use,
across the whole app, and let nothing go darker than that.

**What changed.** `--color-ms-espresso` moved from Primary 1 `#160F09` to Primary
2 `#2C190B`, which makes it the same value as `--color-ms-field`. Primary 1 and
the three near-blacks in the palette's secondary row are now unused, and the
note at the top of `globals.css` says so.

Two token names for one value, like `shell` and `ivory` already are. They stay
apart because they mean different things at the call site — `espresso` is ink and
the deepest ground, `field` is the colour a section is flooded with — and
renaming sixty `text-ms-espresso` body-copy usages to `text-ms-field` would be a
large diff to make type read as scenery.

**Contrast, measured rather than assumed.** Body ink at the new value: 16.35 /
15.21 / 13.79:1 on shell, paper and cream at full strength, and 5.08:1 at the
weakest opacity the site actually uses (65% on paper). Reversed type on the
single dark ground: ivory 16.35, cream 13.79, gold 9.13, sand 7.66, caramel 7.56.

**Three consequences, each of which needed handling rather than just recolouring.**

1. **The `espresso` pattern tone is gone.** A tone's sparkle colour has to *be*
   its section's background or the layer stops disappearing into the ground and
   starts reading as a layer. With the two grounds identical, a second dark tone
   would have been the field tone under another name. The two sections that used
   it — the consultation band and the footer — take `field`.
2. **The footer needed a rule.** It used to be a stop darker than the booking
   band directly above it, and that change in value *was* the boundary. Both are
   the field colour now, so without a hairline they run together into one long
   brown block. There is a gold hairline across the footer's top edge — the same
   move the mobile menu uses to divide places-to-go from ways-to-reach-a-person.
3. **The booking bands' radial vignettes had to come out.** Both `BookingCta` and
   `Booking` painted a radial in the field colour at rising opacity, which
   modelled the band when the field was `#74370c`. Painting `#2C190B` over
   `#2C190B` changes nothing except covering the pattern — so those two bands had
   become flat holes in a lattice that is meant to run unbroken down the page.
   Removing them was the fix, and it is the second time this pass that a leftover
   from the old palette turned out to be doing damage rather than nothing.

**Verified** by walking every route and comparing the relative luminance of every
painted background against `#2C190B`: nothing on `/`, `/about`, `/skincare`,
`/treatment-menu`, `/cosmetic-dermatology`, `/medical-dermatology`, `/contact` or
`/editorial` is darker.

### Hero B has a ground toggle

Hero B is the committed hero, and its brown `#74370c` is a stop brighter than
every other opening band on the site. It now carries a second dot group so the
layout can be seen in both:

| dot | ground | what it is |
| --- | --- | --- |
| first, default | `#2C190B` | the colour the page heroes use |
| second | `#74370c` | as committed — the brown Abseret called "a little bit too red" |

**The pattern colours move with the ground.** Swapping the ground without
swapping the tile would leave the motif's interstices the wrong colour, and the
whole reason the pattern disappears into a section is that its sparkle colour IS
that section's background.

**It defaults to the dark one**, since the request was to see the layout in
today's colour with the original a click away rather than the other way round.
One index in `HeroSwitcher` reverses that.

**The toggle only exists while Hero B is showing.** A control that appears and
disappears is usually a smell; it is right here, because the alternative is a
dead third dot on Hero A, and in a demo a dot that does nothing gets clicked and
then explained. The corner reads:

```
Placeholder portraits · generated…    GROUND ▬ ●    HERO ● ▬
```

### Also in this pass

**Contact and the phone number left the top bar.** The "Book now" pill sits at
the end of the same bar and goes to the same page, so the bar was offering
`/contact` three times within a few centimetres. Four items now: Treatments,
Treatment menu, Skincare, About.

`/contact` is still reachable from every route — the pill, each page hero's
second button, the booking band that closes every route, the footer's "Contact &
directions", and the mobile menu's booking button. **Tap-to-call stays in the
mobile menu**, where it is the shortest route to an appointment rather than a
third duplicate of the button beside it. Say the word if that should go too.
