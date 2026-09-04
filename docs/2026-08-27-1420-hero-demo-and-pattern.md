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

---

## Fifth pass: the treatment menu is not a table any more

**What was wrong.** Two columns per section — the treatment, then its formats as
chips. Counted across the thirteen groups, the chips column was almost entirely
redundant:

| | groups |
| --- | --- |
| One identical pattern top to bottom | 3 |
| One pattern covering more than half | 6 |
| Genuinely mixed | 4 |

So it printed "Single session · Course of 5 · Course of 10" fifty times and buried
the twenty-two rows that say something different. Fifty-eight near-identical rows
also gave a reader nothing to steer by: every row looked like every other row and
only the name told them apart.

**The change.** The redundancy moved out of the rows and into the headings.

- The **group** states its pattern once: "Singly, or as a course of 5, 10 or 20".
- Only the treatments that **depart** from it are marked: "single session only",
  "1, 2 or 3 areas", "courses of 3 or 5". Twenty-two of fifty-eight.
- Everything else carries just its name, so a bare name reads as "as stated
  above" rather than "unknown".

`groupPlan` in `constants/menu.ts` does the arithmetic. **Strictly** more than
half the group has to share a pattern before it is stated — at exactly half there
is no majority to state and two competing patterns to hide, so those groups mark
every treatment. Four come out that way, and they are the ones where the unit IS
the distinguishing fact: toxin by treated area, filler by cc, the IV pair.

**Three levels, each looking like itself**, because "which of these do I want" is
a different question from "what is this called":

| level | treatment |
| --- | --- |
| Section | A full band with its own ground, mark and count. The sticky nav pins the five. |
| Group | A panel lifting off that ground. This is where a visitor actually chooses — Renewal against Brightening against Age defying — so it carries the most weight. |
| Treatment | A ruled row, name in the display face, nothing else unless it differs. Two columns from `sm`, three from `xl`. |

**Two details worth keeping.** The group statement drops from tracked caps to a
tighter setting on a phone, because caps plus letter-spacing plus a wrap is the
worst of the three. And every row keeps its rule rather than dropping it on the
last one: which items land on the final visual row depends on the column count,
so any `last:` rule is right at one breakpoint and wrong at the others.

The page's "How to read it" panel was rewritten to match — it explained chips
that no longer exist.

---

## Sixth pass: the menu becomes five rails of cards

Asked for directly: horizontally scrollable cards per category, each category
looking different, and the colour used well between them.

**Why the ruled list was still not it.** The fifth pass fixed the redundancy but
not the shape. Fifty-eight rows are fifty-eight rows: nothing to steer by,
nothing to stop at, and a group heading is the only thing distinguishing one part
of the page from another. A card can be told apart at a glance. A row cannot.

**One rail per section, one card per treatment.** Per section rather than per
group, so every rail genuinely scrolls: the group rails would have run three and
four cards long and not moved at all on a desktop. Rails run 8 to 18 cards, which
overflow by 730px to 4750px depending on width.

The card carries three things and stops:

| | |
| --- | --- |
| the family | Renewal, Brightening, Age defying. Cards from one group run consecutively, so the eyebrow reads as a running header down the rail. |
| the name | The only line set in the display face. |
| how it is sold | A label and a value: `Sessions / 1, 5, 10 or 20`. |

The families are also listed as chips in the section head, because a rail hides
its own end and without that a reader has no way to know whether the thing they
came for is further along it.

**Colour between the categories.** The brand is one hue family, so five different
hues was never on the table; they would all have been brown. The five looks are
built from value and shape instead, and the sequence is deliberate rather than
five arbitrary tints:

| section | band | card |
| --- | --- | --- |
| Facials | shell | cream fill, 26px corners, a drop shadow. The lightest, and the opening. |
| Skin rejuvenation | paper | reversed: `#602F0F` panel, cream type, gold ring. The device treatments read as the technical ones. |
| Body & hair | shell | caramel, 3px corners, no shadow. A warm block, and squared tiles are already this site's vocabulary for a plain index. |
| Injectables | **field, a dark band** | crisp near-white cards. The strongest contrast on the page, for the section that earns it. |
| Add-ons | paper | dashed outline, narrower card. Extras carrying the weight of extras. |

Injectables is the one section where the unit IS the distinguishing fact, so it is
the one section where the unit is set in the display face: `Treated areas 1, 2 or
3` against `Volume 1, 2 or 3cc`. That difference was invisible in both the table
and the list, and it is the first thing you see on that band now.

Ink is chosen per fill rather than inherited. The lowest pairing in the file is
sand on the reversed panel at 5.02:1; the display-face names run 6.67:1 on
caramel to 14.41:1 on the cards over the dark band.

**Session counts became numerals.** `Sessions / 1, 5, 10 or 20` rather than
"Single, 5, 10 or 20". Radiesse forced it: it sells singly or as a course of two,
and the worded form gives "Single, 2", which reads as a typo. Numerals also line
the sessions up with the areas and the cc, so the four labels are read once and
every card after that is a row of numbers.

**Two things a screenshot cannot show, both tested.**

Nothing inside a card is focusable, because there is no per-treatment page to
link to. Left alone, that means a keyboard reader reaches the four or five cards
that happen to be on screen and none of the rest. The scroller carries
`tabIndex={0}` and a `role`/`aria-label`, so it is a tab stop that drives with the
arrow keys: verified moving `scrollLeft` 0 to 306 on desktop and 0 to 284 on a
phone, with zero focusable children inside.

And the rails sit in the same 1320px column as the heading above them rather than
running edge to edge. Full bleed was built first, padded to the column gutter the
way the home page rails are, and it comes apart above 1320px: at 1440 the heading
started 60px in from the first card, at 2560 it started 620px in. Measured at five
widths after the change, heading and first card start at the same x at every one,
a snapped card comes to rest 0px from the column edge on all five rails, and the
page body never scrolls sideways.

---

## Seventh pass: the table comes back, with filters

Asked for directly: a normal table, filter features on top, and ticking a
category gives only that category's rows a different background. Responsive.

The table was the right shape all along. Fifty-eight treatments with three facts
each is tabular data, and someone hunting for one of them wants rows, not a
shuffle of card decks. What the original table lacked was any way to cut it down,
and the two attempts in between tried to solve that by changing the shape instead
of adding a control.

**Three columns.** Treatment, Family, Sold as. The formats column that started
all this is gone for good: each cell is now one self-describing line, `1, 5, 10 or
20 sessions`, `1, 2 or 3 areas`, `1, 2 or 3cc`. Column widths are set at
44/24/32 rather than left to the content, which had given the names a narrow
column and pushed Sold as to the far right edge with 300px of nothing in front of
it.

**Two filters above it.**

| | |
| --- | --- |
| Tick a category | Its rows take that category's tint. Nothing is hidden. |
| Type a name | Narrows across every column, and a section with nothing left drops out. |

Ticking tints rather than hides, which is what was asked for and also the right
call: someone who ticks Injectables still benefits from seeing that Add-ons
exists two blocks further down. The search box is there for when narrowing IS
what you want, and it matches names, families, sections and the sold-as line, so
"inject" finds all twelve and "3cc" finds the one.

**The five tints were searched for, not chosen.** The brand is a single hue
family, so an eye-picked set collapses: the first attempt had two pairs less than
10 apart in RGB distance, which is invisible. A bounded search over the palette
found a set where **every pair is at least 29 apart**, each is at least 26 from
an untinted row, and the least contrasty of them still holds 7.39:1 for the
treatment name and 8.38:1 for the meta:

| section | tint |
| --- | --- |
| Facials | `sand/18` |
| Skin rejuvenation | `bronze/45` |
| Body & hair | `terracotta/45` |
| Injectables | `gold/75` |
| Add-ons | `terracotta-deep/18` |

That 8.38 is why the meta ink is espresso and not terracotta: terracotta falls to
3.60:1 on the two darkest tints, and one ink has to hold on all five. Same
reasoning moved the section header rows' rules from bronze to cocoa, which
otherwise vanish on exactly the section being looked at.

**The control is the legend.** Unticked, a checkbox carries a swatch of the colour
it would apply. Ticked, the pill fills with that colour and the swatch becomes a
tick. The first build changed only the border on ticking and it could not be seen:
five ticked pills looked like five unticked ones.

**Responsive: it stops being a table below `md`.** `thead` is hidden and each row
becomes a block, name on its own line, the two meta cells labelled under it. The
usual fix for a table on a phone is to let it scroll sideways, which hides the
column saying how a treatment is sold. `md` and not `sm` because at 640 the three
columns technically fit and every one of them wraps.

**One real bug, found by measuring rather than looking.** The page scrolled
sideways below 640px: 267px of it at 360 wide. Nothing was visibly out of place,
and a sweep for elements past the viewport edge found none that were not already
inside a clipping ancestor. The culprit was the sticky filter bar. Its category
row scrolls sideways inside itself, and that inner clip does not survive the
sticky, backdrop-filtered boundary: the bar reported a 627px scrollable width and
took the document with it. `overflow-x: clip` on the bar fixes it, and `clip`
rather than `hidden` because `hidden` on one axis forces the other to `auto`,
which would have made the bar a vertical scroll container as well. Now measured
clean at 360, 390, 430, 640, 768, 1024, 1440 and 1920.

Also verified: ticking paints the ticked section and leaves the others untouched,
all five fills resolve distinct in the browser, and the checkboxes work from the
keyboard with the count announced through `aria-live`.

---

## Eighth pass: the filter collapses, the search goes

Asked for directly: ticking a category collapses every other category, and the
search box comes out.

**The search is gone**, and so is the precomputed search string it needed on each
of the fifty-eight rows in `constants/menu.ts`. One control now, doing one thing.

**Ticking collapses the rest.** Three states rather than two:

| | |
| --- | --- |
| Nothing ticked | Every section open, nothing tinted. The state the page loads in, because the first thing anyone does with a menu is look at all of it. |
| One or more ticked | Those stay open and take their tint; every other section folds to its header row. |
| "Show all" | Back to the first state. |

**Collapsed, not hidden.** A section that vanished outright would leave a reader
thinking the menu is eight items long. The header row stays, still numbered,
still named, and still counted: `05 Add-ons, 8 treatments`. So what has been put
away is legible, and the row itself is the way to get it back.

**The header row becomes a button, but only while something is collapsed.** With
nothing ticked every section is already open, and a heading whose only effect is
to close the four other sections is not what someone clicking a heading expects.
Once the filter is on, every header is a toggle with `aria-expanded`, wired to
the same state as its pill, so ticking from either place agrees. The word reads
"Show" or "Hide" because the row is an action either way, and drops to just the
chevron on a phone, where a long title and its count already take two lines.

**Opening a section moves two things into view.** Collapsing four sections can
shorten the page by thousands of pixels and dump a reader wherever the browser
clamps the scroll, so opening one scrolls to it. And on a phone the pills scroll
sideways, so ticking from a header row could leave the matching pill off the end
of the row: that scrolls into view too, with `block: "nearest"` so it moves its
own row and never the page. Both are skipped under `prefers-reduced-motion`.

**Layout fix found on the phone.** The header row was one wrapping flex row, so
"Skin rejuvenation" pushed the chevron onto a line of its own and the collapsed
headers came out at three different heights. It is two boxes now: the label wraps
inside its own, the action is pinned outside it and cannot wrap.

Re-verified after the change: seventeen checks pass, none fail. All five sections
open on load, ticking one leaves exactly that one open, ticking a second opens
both, clicking a collapsed header opens it and ticks its pill, clicking it again
collapses it, "Show all" restores everything, the space bar works the pills with
`aria-expanded` correct on both an open and a collapsed section, and there is no
sideways page scroll at 360, 390, 430, 640, 768, 1024, 1440 or 1920.

---

## Ninth pass: the nav dropdowns get their own ground

Both dropdown panels were `bg-ms-espresso`, which is `#2C190B`: the same value as
`ms-field`, which is every page hero and the home hero's scrim. So over a hero the
panel was not a panel. It was a shadow with links in it, at a 1.00 lift, with
nothing to sit against.

**They are `ms-panel` #602F0F now**, one stop up the brand's own ladder and
already this site's colour for a reversed plate. Measured against the hero it
sits on: **1.53 lift, 56.6 apart in RGB**. Confirmed in the browser on three
pages, both panels: painted `rgb(96, 47, 15)` with `rgb(44, 25, 11)` behind it
every time.

**Everything inside had to move with it**, which is the part that is easy to skip.
Ink chosen against `#2C190B` is a stop too dim on a ground this much brighter, and
the two places that used `ms-panel` as an accent *on* espresso would have become
invisible against a ground that now is `ms-panel`.

| what | was | now | why |
| --- | --- | --- | --- |
| Row hover | `ms-panel/70` | `ms-terracotta/35` | the old value is the ground |
| Photo tile | `ms-panel` | `ms-cocoa` | the tile has to be darker than the card, not equal to it |
| Photo's right-edge fade | `to-ms-espresso/75` | `to-ms-panel/85` | it must land on the card's colour |
| Section count line | `cream/55` | `cream/80` | 3.87:1 on the new ground, under AA |
| Card description | `cream/70` | `cream/80` | 5.30:1, and 4.4 on its own hover |
| All-sections row | `ms-panel/45` | `ms-cocoa/65` | it read as a recess against espresso and as nothing against panel |
| Mobile note | `sand/75` | `cream/80` | 3.51:1 on the new ground, under AA |

Every value re-measured on the new ground and its two states. Worst case in the
panel is now 4.56:1 (gold on a hovered row); the treatment names sit at 10.71:1
and the descriptions at 6.38:1.

The mobile menu takes the same ground for the same reason: it drops out of a
header bar that is itself over the hero.

### Found while doing it, not fixed

On the home page at phone width, with the mobile menu open **and** a group
expanded, the hero demo's credit line and dot togglers paint through the bottom
of the menu. Clicks are unaffected: the bar is `pointer-events-none` and
hit-testing at four points down the open menu returns the menu's own elements
every time. It is purely paint.

The cause is a stacking context, not a z-index. `SiteHeader` is `z-40`, but it
renders inside the hero's foreground wrapper, which is `relative z-10`; the demo
toggle bar is `z-30` **outside** that wrapper. So the header's 40 is confined
inside a 10 and never competes with the 30. The comment on the toggle bar asserts
the opposite and is wrong.

It is left alone deliberately. Lowering the bar below the wrapper was measured and
breaks its own dots: at `z-5` both are `blocked by div.mx-auto`, the hero's own
content column, at 390 and at 1440. The fix is to make the hero's foreground
wrapper `pointer-events-none` and hand pointer events back to each interactive
child, which is exactly the change that made the whole hero unclickable once
already, and the toggle bar is a demo control that goes away as soon as the team
picks a hero. Worth doing on purpose, with the nine-control hit test re-run, not
as a side effect of a colour change.

---

## Ninth pass: the nav dropdowns get their own ground

Asked for directly: the dropdowns should differ from the hero background, a bit
brighter than it, but not too light, only slightly different.

A dropdown only ever opens over a page hero, so its ground is read against that
`#2C190B` and nothing else. It has now been all three things:

| ground | lift off the hero | reads as |
| --- | --- | --- |
| `ms-field` `#2C190B` | 1.00 | a shadow with links in it, nothing to sit against |
| `ms-panel` `#602F0F` | 1.53 | a bold reversed plate, louder than a menu needs |
| **`ms-drop` `#49250D`** | **1.24** | a card, with the shadow doing the rest |

`ms-drop` is a new token, derived rather than sampled: 55% of the way from field
to panel. It is the only thing on the site that uses it, which is the point of
giving it a name instead of an inline hex.

Everything reversed out of it was measured on it and has room to spare: ivory
13.17:1, cream 11.10, the 80% summaries 7.65, gold 7.35. The row hover,
terracotta at 35%, still lifts 1.35 off the ground and holds ivory at 9.79.

**Two fills inside had to move with it.** The media plate behind each treatment
picture and the "All 58 treatments" footer row were `ms-cocoa` `#421E04`, which
was a recess under the old `#602F0F`. Under `#49250D` cocoa is 1.09 lift the
wrong way, so both would have stopped reading as inset. They are `ms-field` now,
the hero's own colour, which sits 1.24 below the panel: the recess this wants,
and one fewer colour in the header.

Verified on all six routes with a hero (`/`, `/skincare`, `/about`,
`/cosmetic-dermatology`, `/medical-dermatology`, `/treatment-menu`): the card
resolves `rgb(73, 37, 13)` over `rgb(44, 25, 11)` on every one, desktop and in
the mobile menu panel.

---

## Tenth pass: hero B joins the page's lattice

Reported: hero B's background pattern is not synced with the rest of the page,
and it should look continuous.

Correct, and it was my own doing. When hero B was rebuilt from commit `b894798`
I kept its pattern as an inline layer at the committed 440px pitch and 0.6
opacity, on the argument that a snapshot should be a snapshot, and wrote that
down as a deliberate deviation. It was the wrong call. The rest of the page runs
one 520x427 lattice, phase-locked to document position and drifting off a single
`:root` variable, so a hero on a 440px pitch cannot line up with the section
under it at any scroll position: the pattern visibly restarted at the hero's
bottom edge. Continuity is a page-wide property and it outranks the pitch of one
variant.

Hero B now renders `<PatternField>` like every other section. Its ground toggle
still swaps the tile colours, because a tone's sparkle colour has to BE its
section's background or the layer stops disappearing into the ground:

| ground | tone |
| --- | --- |
| `dark` `#2C190B` | `field`, which this ground literally is |
| `committed` `#74370C` | `hero-committed`, a tone that exists for this toggle alone |

`hero-committed` keeps the circle gradient from `b894798` and changes one thing:
the sparkle. That commit used `#7D3F11` against a `#74370C` ground, which leaves
the interstices a shade lighter than the ground and makes the layer read as a
printed-on rectangle. It is the ground exactly now. The tone goes when the demo
does.

Measured after the change, with hero B showing, on both grounds: **all ten
pattern layers in phase**, every one within 0.6px of `-(docTop mod 427)`, one
tile size across the whole page, and one drift transform shared by every layer at
scrollY 0, 600 and 1400. The seam where the hero meets the section below was
shot on both grounds and the lattice carries straight through it.
