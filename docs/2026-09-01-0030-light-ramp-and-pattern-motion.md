# 1 Sep 2026 — the coming-soon band, the light ramp, and the pattern's motion

Three asks and one rejected attempt, in the order they landed.

---

## 1. The coming-soon band is off the home page

The closing band of the treatment section — "Coming soon / Laser hair removal",
with a pair of pills out to the menu and to `/contact` — has gone. The home page
states what the clinic can serve today.

**The pills went with it rather than being kept.** Both rails in that section
already link out to their own page, and the consultation band immediately below
closes on the same two destinations, so what was removed is a duplicate CTA
rather than a route off the page. `PillSolid` and `PillGhost` are no longer
imported by `Treatments.tsx`.

**The copy moved rather than being deleted.** It was `HOME.comingSoon`, read by
two components: the band that has gone, and a card at the foot of
`/cosmetic-dermatology`. It is `COSMETIC_PAGE.comingSoon` now, which is where its
one remaining reader lives.

**Two places still name laser hair removal, and both are the clinic's call, not
a formatting decision.**

| where | what it is |
| --- | --- |
| `/cosmetic-dermatology`, the card at the foot | "Not on the menu yet. It is on the way, and this page is where it will appear the day it becomes bookable." On the page that is the full account of the cosmetic side, "not yet" is information a reader came for. |
| `constants/cosmetic.ts`, tenth family; `constants/menu.ts`, body-and-hair | It is a treatment family with menu items. |

Say the word and both come off.

---

## 2. Section colour: one light ramp, and the footer

Two notes, and the second settled it: the colour was "to durastic from one to
another", and then **"we do not have to use much darker version other than the
footer in the home page"**.

### What it was

The home page flipped between the near-white grounds and `#2C190B` **six times**.
Three flooded bands — the consultation argument, the clinician, the booking band
— each with a light section between it and the next. `/about` had five flips for
the same reason.

### What it is

**Every route is now the same shape: a flooded hero, a light body, a flooded
footer.** One dark section besides the hero, and it is the footer.

A fourth light ground was added to make that work. Three (`shell`, `paper`,
`cream`) is not enough steps for eight sections.

| step | token | value | note |
| --- | --- | --- | --- |
| 1 | `ms-shell` | `#FDFCF8` | Secondary 6, off the palette sheet |
| 2 | `ms-paper` | `#F9F3E9` | derived, 45% cream into shell |
| 3 | `ms-cream` | `#F4E7D6` | Primary 7 |
| 4 | **`ms-linen`** | **`#E8D5BB`** | **new** — derived, 30% sand into cream |

`ms-linen` is, near enough, the terracotta tint on the medical treatment tiles
(`#E7D3BC`), which is the reference the instruction gave: "lets use lighter color
like we used in the dermatology treatment cards".

**The home page runs the ramp twice**, and the reset is the argument rather than
a gap in the sequence:

| | ground | |
| --- | --- | --- |
| hero | `field` | the opening, under its own review |
| Focus | `shell` | ┐ |
| Pillars | `paper` | │ what the clinic treats |
| Treatments | `cream` | │ |
| Consultation | `linen` | ┘ |
| Visit | `shell` | ┐ |
| AboutTeaser | `paper` | │ you, at the clinic |
| Reviews | `cream` | │ |
| BookingCta | `linen` | ┘ |
| footer | `field` | |

`/about` does the same over seven sections. The four subpages run the tail of it,
`BookingCta` always taking `ms-linen` because it is always the last thing above
the footer.

### No gradients, and why the steps do not need them

Adjacent steps measure **1.08, 1.10 and 1.18** apart in contrast. At that
distance a hard boundary between two of them is not a transition a reader
registers, which is the point — the smooth answer is small steps, not blended
ones.

A gradient version was built earlier the same day: a `GroundBridge` component
that laid the previous ground over the top of the next section and faded it out
across 120–176px, so the two crossed over each other instead of meeting at a
line. It is deleted. **"stope the very bad gradient color transition between
section."**

Nothing on the site fades one ground into another now.

### Five sections were reversed out and had to be turned over

Each one is roughly fifteen colour swaps, and each was measured rather than
eyeballed.

| section | was | is |
| --- | --- | --- |
| `Consultation` (home) | `field` | `linen` |
| `AboutTeaser` (home) | `field` | `paper` |
| `Reviews` (home) | `field` | `cream` |
| `BookingCta` (six routes) | `field` | `linen` |
| `Clinician` (`/about`) | `field` | `paper` |
| `Assessment` (`/about`) | `field` | `paper` |
| `Booking` (`/contact`) | `field` | `shell` |

**On linen, accents are `terracotta-deep` and not `terracotta`.** Measured on
`#E8D5BB`: cocoa 10.33:1, espresso at 80% 6.95, terracotta-deep 5.04 — and
terracotta 3.93, which is under AA and not usable for a 10px eyebrow. Rules move
from `bronze/25` to `/35` on linen to hold the same weight against the deeper
ground.

**The contact form gained from the move.** Its plate is a shell sheet with a
shadow under it rather than a darker well cut into a brown band, and the inputs
are espresso on white — which is what a form somebody has to read their own
typing back from should have been. Its submit button flipped with it: an ivory
pill on a shell plate is invisible, so it is the dark pill now.

**The footer's gold hairline has gone, and the reason it existed went with it.**
The booking band above used to be the field colour too, so the two ran together
into one long brown block and a rule was the only thing dividing them. The band
above is `ms-linen` now and the change in value is the boundary; a gold line
drawn across a join that is already 11.7:1 reads as a stray line.

### Two things the move exposed, both fixed

- **`text-ms-bronze` was carrying real text on nine light-ground call sites**, at
  10–13px. It measures **2.21–3.08:1** on the four light grounds, against AA's
  4.5. `globals.css` says so at the token itself — "NOT for small type on light
  grounds" — and they were doing it anyway. All nine are `terracotta-deep` (5.04
  to 7.03) or `espresso/70`. The two remaining bronze glyphs are decorative and
  went to `terracotta-deep/65`, which clears the 3:1 non-text threshold on cream.
- **The medical tiles' tint had to come down with the ground.** They were
  terracotta at 18% on `ms-paper`; that section is `ms-cream` now, and the same
  tint over a darker ground put the index numeral at **4.23:1** on hover. At 14%
  (20% on hover) the tile still lifts 1.19:1 off the ground — the separation it
  had on paper — and everything on it clears AA: title 10.18, summary 6.95,
  numeral 4.96 falling to 4.58 on hover.

Also: the cosmetic cards' four gradients ran cream into sand, which was a card
*darker* than the paper it lay on, and once the section moved to cream the
lightest of them started at exactly the ground colour. All four start at or above
the ground and run down into it now.

### Two smaller fixes found on the way

- `/cosmetic-dermatology`'s coming-soon card used a bare `<a href="/contact">`
  for an internal route, which costs a full document load. It is a `Link`.
- `HeroSwitcher`'s header still described two heroes and "A or B". There are
  three.

---

## 3. Pattern motion: it pans sideways now

**The pattern itself is unchanged.** Filled circles, the vertical `from → to →
from` gradient, the section's own ground in the interstices, one 520px tile, one
page-wide phase. `ms-linen` was given a tone in the same family as the rest
(`from #DFC9AB`, `to #D4B891`, sparkle `#E8D5BB`, 0.42) and `hero-committed` was
kept. Nothing else about it moved.

**What changed is how it moves.** It used to counter-scroll: the ground
travelling up at 6% of the scroll distance, so the lattice appeared to lag behind
the page. That is the most common parallax there is, and against a motif this
large it read as the whole background sliding.

It travels **across** now, at 9%. The type, the rules and the cards on a page all
move vertically, so a ground that also moves vertically competes with them and a
ground that moves across does not. What you see is the lattice being drawn slowly
along the page while everything on it goes down.

Horizontal is also the axis this pattern can afford to move on. Vertically the
tile has a phase pinned to the document, or the sections stop lining up with each
other; horizontally there is nothing to line up against, so it is free.

**Two mechanical consequences.**

- It wraps at `TILE_W` rather than `TILE_H`. Invisible either way: the pattern is
  periodic with exactly that period, so translating by `t` and by `t - TILE_W`
  paint the same pixels.
- The layer overhangs its section by one tile on **all four** sides —
  `TILE_H` top and bottom for the phase, `TILE_W` left and right for the drift.
  Both parents are `overflow-hidden`, so nothing bleeds and no horizontal
  scrollbar appears.

9% and not 6%: a horizontal offset does not fight the reading direction, so it
stays calm at a rate that would have been obvious going up. A full viewport of
scrolling moves the lattice about 70px against a 520px tile — a seventh of a
motif. Reduced motion never sets the property and every layer falls back to 0px,
exactly as before.

---

## Addendum: the stroked pattern, built and rejected

Worth writing down, because the reasoning that produced it was wrong in a way
that is easy to repeat.

**What was built.** The same lattice at the same pitch and phase, but the circles
**stroked** at a 1.25px hairline instead of filled, with the brandmark's own
sparkle path — imported from `Marks.tsx`, not approximated — picked out as a
small solid mark at each node of the lattice. Espresso arcs and terracotta marks
on the light grounds; sand arcs and gold marks on the dark ones. The tile was
transparent rather than painting its own ground, which meant two tiles for the
whole site instead of seven, and meant a section could carry a gradient ground
with the lattice running unbroken through it.

**Why it was reasoned to.** The brief was "we still need the patterns as
background, but the team expects something really different", and filled circles
at 520px are 260px-wide areas of tone — so what a section showed was soft
blotching rather than a motif. Stroking it turns the same geometry into engraving,
which is what a letterhead does.

**Why that was the wrong move.** "Really different" was read as *change the
drawing*. It meant *change how it behaves*. The pattern is the brand's own
supplied artwork and the clinic likes it; redrawing supplied artwork is not a
latitude a website has, however defensible the redraw. The reply was immediate
and unambiguous, and the second ask — an animation on scrolling, different from
the previous one — is where the change actually belonged.

**What it cost.** One turn. Everything it touched was restorable from `HEAD`:
`BrandPattern.tsx`, `PatternField.tsx`, `Marks.tsx` and the editorial hero's call
site were checked out whole rather than hand-reverted, and only the two additions
worth keeping (`ms-linen`'s tone, `hero-committed`) were re-applied by hand.

**The lesson, for the next time this comes up.** Supplied brand artwork is a
fact, not a starting point. When a brief asks for something different about a
piece of it, the answer is in its colour, its scale, its strength, its motion or
where it is allowed to appear — not in its geometry.

---

## Verified

- `tsc --noEmit` clean; `eslint .` clean; `next build` generates all 17 routes.
- `scripts/humanizer-lint.py`: 72 files, 0 violations.
- Ground sequence read out of the rendered HTML on all seven routes plus
  `/editorial`. Every route is `field` hero → the light ramp → `field` footer, and
  no route contains a flooded content band.
- Zero gradient-stop classes (`to-ms-*/0`) and zero seam rules anywhere in the
  rendered markup.
- Both pattern tiles decoded out of the rendered HTML and checked against the
  tone table: five distinct tiles on the home page, each one's interstice colour
  equal to its section's ground.
- The drift transform in the rendered markup is
  `translate3d(var(--ms-pattern-drift, 0px), 0, 0)`.
- Contrast measured, not assumed, for every colour pair the seven converted
  sections introduced.

## Not done, and why

- **The heroes are untouched.** All three variants stay `ms-field`, because the
  switcher is under its own review and the instruction was about sections. If the
  opening should be lighter too, that is a one-line change per variant.
- **Laser hair removal is still on `/cosmetic-dermatology` and in the menu.** See
  the table in section 1 — removing a service from a clinic's site is the
  clinic's decision.

---

## Addendum, same day: the descriptor moves, and the footer gets a bottom bar

### "Dermatology & Cosmetic Clinic" came off the top bar and went into the hero

It was set under the wordmark in the header lockup. The bar is the one place on
the site where the lockup competes for width — with the nav and the booking pill
— so the line was setting at 8px on a 96px bar to fit, which is a descriptor
nobody reads.

It is the first thing in the hero sentence now:

> **Dermatology & Cosmetic Clinic** built for melanin-rich skin, on one record
> and under one roof.

That says what the clinic is before it says who it is for, and it puts the phrase
on the first screen at a size somebody can actually read. `brand.ts` builds the
sentence from the same `DESCRIPTOR` constant the lockup uses, so the two cannot
drift apart by a word.

**The footer keeps the descriptor under its wordmark**, at `md`, where nothing
competes with it and it is the last thing naming the clinic on the page.

**Nothing was lost from the accessibility tree.** `Wordmark` carries an `sr-only`
"Mela Skin" because the letterforms are paths, the header link has its own label,
and the home `h1` still opens with a visually hidden "Mela Skin, dermatology and
cosmetic clinic in Westlands, Nairobi" for anything reading the heading rather
than looking at it.

**The meta descriptions were left alone.** `manifest.ts`, `copy.ts` and
`jsonld.ts` open on "Medical and cosmetic dermatology…", which is the phrase
people search for. "Dermatology & Cosmetic Clinic" is the brand's line, not a
search term.

`/editorial`'s nav carries the same lockup at `sm`, descriptor and all. Left
alone: it is the competing direction, and touching it would muddy what changed.

### The footer's bottom bar

It was one hairline with the copyright at the left end and the medical
disclaimer at the right, which left the middle of the bar empty above about
1100px and gave the footer nothing to end on.

Now: the same hairline, the two legal lines stacked as one block of small print
on the left, and a row of social icons on the right. Centred against each other
rather than baseline-aligned, which survives the copyright line wrapping to three
on a narrow desktop.

**None of the four accounts is a link, because there is no handle for any of
them.** They render as dashed slots — the treatment every unshot photograph on
this site gets — with the bracketed platform name as the accessible name. An
anchor to `#`, or to a platform's home page, is a footer link that gets clicked
and goes nowhere.

Fill them in at `constants/placeholders.ts` → `SOCIAL`: put the profile URL in
`href`, take the brackets off `label`. The row is generated from that array, so
three platforms or five both lay out, and deleting one the clinic is not on is a
one-line edit.

**The glyphs are drawn, not fetched**, so the footer costs no extra request and
they inherit `currentColor` like every other icon on the site. Rendered at 18px
against the footer's ground and checked: the Facebook `f` was drawn as strokes
rather than as the outline of the solid mark, which at that size is two hairlines
a millimetre apart, and it was scaled up to match the optical weight of the two
squircles; TikTok is inset to 88% because its mark fills its own viewBox edge to
edge and read a size larger than the rest of the row.

**Hit targets** are 40px on an 18px glyph with `gap-1` between them, which puts
44px between adjacent centres — what WCAG 2.5.8 actually measures.

**WhatsApp is not in the row**, and that is deliberate. The 31 Aug benchmarking
turned it up as the one clear channel gap on this site, but it is a way of
reaching a person rather than a feed to follow, so it belongs beside the phone
number and the email. Still unbuilt, still the clinic's decision.

---

## Addendum, same day: the boundaries become gradients

Asked for, after the ramp landed: connect the bands gradually, with a gradient
between the two section colours at the bottom and the top of every section other
than the hero, and no blurred colours.

### The shape of it

**Each band ramps to the halfway colour at both ends.** A band's top runs from
`mix(above, own)` down to its own colour; its bottom runs from its own colour to
`mix(own, below)`. Both sides of a boundary therefore arrive at exactly the same
value, which is what makes the seam itself disappear, and the transition is
spread across two bands instead of being crammed into one, so neither band has to
give up the space its copy needs.

Depth is one number, `--ms-ramp` in `globals.css`: **96px on a phone, 140 from
`lg`**. A phone's bands are about half the height of a desktop's, and a ramp that
is a sixth of a band reads as a transition where one that is a third reads as the
band having no colour of its own.

### No alpha, no blur

Every ramp is an **opaque two-stop gradient between two real palette colours,
interpolated in oklab**. Nothing fades to `transparent`, nothing is blurred, and
no intermediate colour is invented: the midpoint of linen and the field colour is
`#84705C`, a warm brown, and oklab is what keeps it warm rather than letting it
pass through a desaturated grey the way sRGB would.

Fading one ground over another at falling alpha is the same crossfade
arithmetically. It is also how you end up reaching for `transparent` as a stop,
or blurring an edge to cover a join, and both of those are what make a transition
look hazy instead of gradual.

### Where the ramps live, and why

**In `PatternField`.** A ramp has to sit UNDER the lattice and OVER the band's
flat background colour, and there is nowhere else that is true: above the lattice
it hides the pattern at exactly the join it is trying to smooth, below the
background it is not painted at all. That component already renders on every band
that has a ground, so nothing needed new markup.

A band gains a transition by naming its neighbours:

```tsx
<PatternField tone="cream" above="paper" below="linen" />
```

Both props are optional and leaving one off gives a hard edge, which is what the
heroes do. **Reorder a page and these have to move with it** - a band's ground and
its neighbours are two halves of one fact, and a wrong `above` shows as a band
fading in from a colour that is not on the page.

### The tile had to stop painting its own ground

`patternTileUrl` opened with a full-bleed `<rect>` filled with the section's own
background colour, so the interstices matched the band the tile sat on.

**On a flat ground that rect is provably invisible.** The layer composites as
`opacity x tile + (1 - opacity) x ground`, and in the interstices the tile pixel
WAS the ground, so the result is the ground either way. Removing it changed
nothing that was on screen, verified by reading the tiles back out of the
rendered HTML.

**On a ramping ground it changes everything.** One flat colour at 0.4-0.5 opacity
dragged 40-50% of the ramp back toward the band's own colour and halved every
transition. The interstices are transparent now and the ramp reads through them
at full strength. `sparkle` became `ground` in the tone table, where it earns its
keep as the colour the ramps interpolate between.

### The one thing a ramp cannot carry

A tile is one fixed set of colours, so across a ramp that runs from a light
ground to a dark one, a lattice toned for either end is wrong at the other. Left
alone, the linen lattice over the bottom of the booking band would have inverted
(circles 30 values LIGHTER than the ground where they are 12 darker at the top of
the band), and the footer's lattice over the top of its own ramp would have been
dark blobs on a mid brown.

A cross-fade was built for it: the neighbour's lattice masked to fade out across
the ramp, the section's own masked to fade in, complementary so the pair sum to
one and the lattice never thins. It worked, and it is gone, because the join it
existed for went back to being a hard edge the same day (see the second addendum
below).

What is left is simpler for it. Between two light grounds the two tiles differ by
two or three percent of one colour, which across 140px is not something anybody
can see, so every ramp on the site now carries one unmasked lattice. `RampTone`
in `PatternField` is typed to exclude the dark grounds, so the case that needed
the cross-fade cannot be re-entered without the compiler saying so.

### Three knock-on changes

- **The footer's top padding went from `py-12 lg:py-14` to `pt-28 lg:pt-40`**, and
  back again when the footer ramp was dropped. It was the one band whose ramp
  arrived from a much lighter colour, and at the old padding the address line
  would have sat two thirds of the way up it, on a mid brown, at 2.7:1.
- **`/contact`'s map band moved from cream to linen**, so the footer arrives from
  the same colour on all seven routes and `SiteFooter` needs no per-route prop.
- **The jump-to bar on `/medical-dermatology` lost its bronze hairline** and
  gained a ramp and a lattice of its own. A rule and a gradient across the same
  join say the same thing twice, and the rule is the one that reads as a boundary
  rather than as a handover. It was also the last band on the site without the
  pattern on it.

### Verified

- A checker reads the rendered HTML of all seven routes, extracts each band's
  ground and the colours in its two ramp gradients, and asserts that what a band
  declares as its neighbours is what is actually above and below it. All seven
  pass, and the heroes are the only hard edges.
- Both halves of every boundary meet at the same `color-mix` value. Five distinct
  boundaries on the home page, ten ramp gradients, correctly paired.
- No `<rect>` in either tile in the rendered output.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.

### If `in oklab` is unsupported

The whole declaration is invalid and the ramp simply does not paint, leaving the
band its flat background colour, which is exactly what the site looked like
before this change. Chrome 111, Safari 16.2 and Firefox 113 and up have it, and
Tailwind v4 already emits oklab gradients elsewhere in this stylesheet, so the
site depended on it already.

---

## Addendum, same day: no borders, and the footer keeps its edge

Two corrections to the ramps, and both simplify.

### The footer is a hard edge again

Every band still ramps into the next, but the last one hands over to the footer
the way it always did: a clean change of colour, no gradient. Asked for directly,
and it is the better call anyway. A footer arriving as a change of colour is what
a footer normally does, and that join was the only one on the site between two
grounds eleven stops apart, which is what made it expensive:

- The footer's copy had to be pushed down to clear the ramp — `pt-28 lg:pt-40`
  against `py-12 lg:py-14`, because the 14.5px sand address line two thirds of the
  way up a linen-to-brown ramp reads at 2.7:1. **That padding is reverted.**
- The lattice had to cross-fade underneath it, since no single tile is right at
  both ends of a light-to-dark ramp. **That mechanism is deleted**: the masks, the
  second `Lattice` layer, the `ink` field in the tone table and the `mask` prop.

So the site has two hard edges per page and they are the same two everywhere: out
of the hero, into the footer. `RampTone` is now typed as the light grounds only,
so `below="field"` is a compile error rather than a lattice that silently inverts.
If the footer is ever asked to ramp again, widening that type is the wrong first
move — the cross-fade has to come back with it, and the type says so.

### Nothing between sections is a border

The one section-level rule left on the site was the bronze hairline under the
jump-to bar on `/medical-dermatology`, and it went when that bar gained a ramp: a
rule and a gradient across the same join say the same thing twice, and the rule is
the one that reads as a division rather than as a handover.

Checked rather than assumed — the verifier now also asserts that no `<section>`
or `<footer>` carries a `border-t`, `border-b` or `border-y` class on any of the
seven routes. Every border still in the codebase is inside a band: card edges,
ruled list entries, the menu's sticky filter bar, and the rule above the footer's
own bottom row.

*(A light line was still being seen after this, and the next addendum is what it
turned out to be.)*

### Verified, again

- All seven routes: the hero edge and the footer edge are hard, every other
  boundary ramps on both sides, and no section carries a border.
- The home page renders 14 ramp gradients (8 bands, less the two hero and footer
  edges), 9 lattice layers and **0 masks**.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.

---

## Addendum, same day: the last two lines, and a one-pixel seam guard

Reported after the borders came off: still a separator line between the bands, or
else a space showing as a light-coloured line.

Two candidates, and both are now dealt with, because the markup had no rule
between any two sections and the reading could have been either.

### The two horizontal rules that were left

Neither was between sections, and both were near enough to read as if they were.

**The gold hairline over every section head.** `SectionHead` drew a 220px
`hairline-gold` rule above its words, on twelve bands. It sat 96-144px under a
join, which is close enough that while scrolling it reads as the thing dividing
the band from the one above it — and once every other line on the page had gone,
it was the only horizontal mark left anywhere near a boundary. Gone, along with
the `rule` prop two call sites were already passing `false` to, and the
`hairline-gold` utility itself, which now had no users.

**The full-width bronze rule between the two treatment rails.** `h-px w-full
bg-ms-bronze/20`, with `my-20 lg:my-28` either side of it — the most line-like
thing on the home page and the one full-bleed rule left. It is a plain gap now,
`h-40 lg:h-56`, which is the same 160/224px the rule's own margins were making.
The two shelves are further from each other than any part of one shelf is from
the rest of it, and that is what says they are two lists. It does not need
drawing.

### And the seam guard, for the other reading

Stacked full-bleed bands can show a hairline at a join even with nothing between
them, and on this site that hairline would be the page ground: **`#FDFCF8`, the
lightest colour in the palette**, against bands that are all warmer than it. Two
things produce one:

- **A band whose height lands on a fractional pixel.** Every band here does, since
  the type is set in `clamp()` with `vw` units and the leading is fractional.
- **`content-visibility: auto`,** which swaps a band between its remembered size
  and its real one as it scrolls into view, moving everything below by a fraction
  of a pixel as it does.

So each band now ends one pixel inside the next:

```css
main > section {
  margin-bottom: -1px;
}
```

**The overlap cannot show**, and that is a property of the ramps rather than luck:
both sides of every join are already the same colour, because a band's bottom ramp
and the next band's top ramp both end at the midpoint of the two grounds. Where a
join is deliberately hard — out of a hero, into the footer — the covered pixel is
the arriving band's own flat colour, which is what would have been painted there
anyway. One pixel and not two: this is covering a rounding error, not a gap.

### Verified

- Zero `hairline-gold` elements and zero full-width rules in the rendered markup
  of all seven routes. The only full-bleed hairlines left are the mobile menu
  panel's, the contact form plate's, and the scroll-progress bar — none of them
  between two bands.
- `main > section { margin-bottom: -1px }` present in the served stylesheet, and
  the `hairline-gold` utility absent from it.
- All seven routes still pass the ramp checker: hard edges out of the hero and
  into the footer, every other boundary ramped on both sides, no section border.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.

---

## Addendum, same day: shorter copy, bigger type, and the footer's ink

Three asks: take the numbers off the medical cards, cut the wordiness so the type
can be prominent, and lighten the footer with an arrow on hover.

### The 01-12 numerals are off the medical cards

They held a column down the left of every tile, which is why the name and the
summary were set small enough to fit beside them. Nothing was counting: the order
is alphabetical, the numbers were referred to nowhere, and an index numeral on a
card that is one of twelve equal things tells a reader nothing they cannot see.

With the column gone the name runs the full width of the tile at **1.5/1.7rem, up
from 1.35/1.5**, and the summary at 15.5/16px, up from 14.5/15.

The `01-04` on the visit steps stay. Those are a sequence and the numbers are the
point of it.

### The copy came down, and the type went up

Both halves of the same change: a shorter line of larger type is what a cut buys.

| where | was | is |
| --- | --- | --- |
| Focus, the two paragraphs | 160 words | 68 |
| Consultation, the whole band | 310 words | 150 |
| `Lede`, everywhere | 18/19/20px at 62ch | **19/21/23px at 54ch** |
| Every section lede | 34-73 words | 22-30 |
| The ten cosmetic family cards | 513 words | 369 |
| The five longest FAQ answers | 85w down to 63w each | 45-50 |
| /about, the six commitments | 42w each at the top end | 32 |

Sizes went up across every reading surface, not only the ones that were cut:
body copy from 15-17px to 16.5-19, sub-headings from 1.2-1.45rem to 1.35-1.6, the
review quotes from 20px to 23/25, and the ledes on the two argument bands
(consultation, assessment) to 20/22-23px. Leading came DOWN as the sizes went up
— 1.8-1.85 to 1.65-1.7 — because slack that reads as generous at 15px reads as
loose at 20.

**What was cut is connective tissue, not information.** The rule applied
throughout: keep every fact, drop the sentence that restates the one before it,
and drop the clause that anticipates an objection nobody made. The consultation
band still says there is no price list, why a list would be wrong, what you leave
with, and what each of the three tracks costs. It says it in 208 rendered words
instead of roughly 330.

**What was deliberately left long:** the twelve condition entries on
`/medical-dermatology`. Five of them were trimmed where they had padding, but
those are the clinical content the page exists for — what a condition is, how it
presents on brown and black skin, what happens at the appointment — and cutting
them further removes information rather than over-explanation. Say the word if
they should come down too.

### The footer

**Everything in it was `ms-sand` at 75%**, which measures 4.91:1 on the field
colour: over the line for AA and under anything you would call comfortable, on the
one band of the page that is entirely small print. It is `ms-cream` now — links
and the address at 80% (**9.22:1**), the copyright at 75% (8.27), the disclaimer
at 60%, which is the one line that should stay quiet. Sizes came up with it,
14.5px to 15. The gold column headings are unchanged; they were already the
brightest thing in there.

**Every link in the four columns shows a gold arrow on hover**, sliding in from
the left of where it lands. It holds its space whether shown or not — `opacity-0`
rather than conditional rendering — so nothing reflows under the cursor and a
two-line label cannot rewrap mid-hover. The address, phone and email lines are
`w-fit` now, so their hover target ends at the text rather than running the width
of the column.

### Verified

- Twelve medical tiles render, no numerals in the shelf, and the section's
  full-width rule is gone.
- No `text-ms-sand/75` left in the footer; 23 hover arrows across the four
  columns.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter (73 files, 0
  violations) all clean.

---

## Addendum, same day: four small things, one of which is not small

### The scroll progress bar is gone

The 2px gold hairline across the top of the viewport, off all seven routes and out
of `motion.tsx`. `useSpring` went with it, since nothing else sprang, and so did
the `[data-motion="progress"]` rule in the root layout's noscript block.

### The current page is marked in the bar and the footer

`ActiveLink` — a client component around `next/link` that compares `usePathname()`
to the route the link points at. **Gold** on the dark bar (9.13:1 on the field
colour), **terracotta-deep** on the light one (7.03 on shell), gold in the footer.
`aria-current="page"` goes with the colour, because colour on its own is not
something every reader has.

Two rules make it behave:

- **The anchored links never mark.** Four of the footer's links go to a section of
  /about and five of the menu column to a section of /treatment-menu. Marking those
  on their own page would light five links at once, which tells a reader nothing —
  "you are here" only means something pointing at one thing.
- **The dropdown triggers claim their children.** Treatments points at
  /medical-dermatology and holds /cosmetic-dermatology inside it, so a bar that
  went quiet on the cosmetic page would be telling the truth about the href and
  lying about where you are. `coveredBy()` collects them, and the mobile group
  reads the same list so the two can never disagree.

The mobile menu's group headers are `<summary>` elements rather than links, so they
read the route directly instead of going through `ActiveLink`.

Verified per route, as header/footer marks: `/about` 2/1, `/skincare` 2/1,
`/treatment-menu` 2/0 (its whole footer column is anchored), `/medical-dermatology`
2/1, `/cosmetic-dermatology` 2/1 (through `coveredBy`), `/contact` 0/1 (there is no
Contact item in the bar, by design), `/` 0/0 (there is no Home item).

### The pillar cards are square

The 24px radius is off "Two halves of one clinic", and with it the last rounded
panel on the home page: the treatment tiles below are hard-edged, the cosmetic
cards are notched, and a third corner treatment in the same scroll was two too
many.

### The pattern grows instead of panning, and there is a trade-off in it

It scales `background-size` rather than the layer. A `transform: scale()` is about
each element's own centre, so two stacked sections would grow about their own
middles and the lattice would step at every boundary — the one thing the phase
machinery exists to prevent. Growing the tile keeps every layer anchored to the
same document origin.

**Two consequences fell out of that, and both simplify:**

- The phase is no longer reduced modulo the tile height. A repeating background
  tiles infinitely, so an offset of `-12,000px` paints exactly what
  `-12,000 mod H` would; left unwrapped the same number is correct at every tile
  size, which is what lets the tile change size without the phase being
  recomputed for every layer on every frame.
- The layers lost their overhang. They hung one tile past all four edges because a
  moving layer exposes its own edge. Nothing moves now.

**And here is the part worth being straight about.** A tiling anchored to the
document cannot grow without also sliding. Boundaries sit at multiples of the tile
height, so a fraction `f` of growth moves the boundary near depth `d` by `d x f`.
Keep the anchor and you get a slide; kill the slide and every section anchors to
its own top, which is the per-section restart the phase was built to stop. **One
lattice down the page, a scroll-linked zoom, and no drift: any two of the three,
never all three.**

So the growth is set at **9%**, where the slide it drags along stays under what was
already there. The tile runs 520px to 567 across a page — a swell you can see
between the top and the foot — and the induced parallax ramps from nothing at the
top to 9% at the bottom, averaging around four and a half against the flat 6% the
original counter-scroll ran at. **Turn the growth up and the slide comes with it,
one for one.** That is the dial, and it is `GROWTH` in `PatternDrift.tsx`.

It is quantised to 0.004 because changing `background-size` re-rasterises the SVG
where a transform did not: twenty-two distinct sizes across a page instead of one
per frame, so the raster cache is hit on nearly every scroll frame, and a 0.4% step
on a 520px tile is two pixels.

### Verified

- Zero progress bars, zero rounded pillar cards, nine zoom-driven
  `background-size` declarations and zero drift transforms in the rendered home
  page.
- Active marks correct on all seven routes, header and footer.
- The ramp checker still passes: hard edges out of the hero and into the footer,
  every other boundary ramped both sides, no section border.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.

---

## Addendum, same day: the booking pill, and the zoom made visible

### "Book now" marks on /contact

There is no Contact item in the nav — the pill sits two centimetres to its right
and goes to the same page, so the bar was offering /contact twice. That left
/contact as the one route with nothing lit in the header, which reads as a page
outside the site rather than as the page you are on. **The pill is the bar's
contact item, so it marks like one.**

It keeps the ghost pill's shape and takes the accent for its border and its ink:
gold on the dark bar, terracotta-deep on the light one, the same two colours the
nav items use. A filled pill would have been the obvious move and is the wrong
one — the pill is already the loudest thing in the bar, and making it louder says
"press me" rather than "you are here".

The shape moved out of `PillGhost` into a `PILL_SHAPE` constant in the header, to
the pixel, because a ghost pill with an active state is a header concern rather
than a general one.

### The zoom, rebuilt so it can be seen

**It was running.** The wiring was correct; 9% spread over an entire page is 0.9%
per thousand pixels scrolled, and its side-effect drift is zero at the top of the
page, which is where you look first. It was, accurately, no movement.

**Why it had to be that small** is the interesting part, and it is now written into
`PatternField`: a tiling anchored to the document has its boundaries at multiples
of the tile height, so growing the tile by a fraction `f` slides the boundary near
depth `d` by `d x f`. One lattice down the page, a visible zoom, and no slide —
**any two of the three, never all three.** At a visible `f` the document-anchored
version is hundreds of pixels of slide at the foot of a page and none at the top,
which is the sliding that was turned down twice.

**So the lattice is anchored per band now** and each band swells as it crosses the
screen: 1.00 when its top reaches the bottom of the viewport, 1.10 by the time its
bottom leaves the top. Over the 1,800-odd pixels it takes a 1,000px band to cross
an 800px screen, that is 5.5% per thousand pixels — six times the old rate, and it
is the same on the first screen as on the last.

**What it costs, plainly:** two neighbouring bands are at different points in their
crossing, so their lattices are at slightly different scales and the arcs step at
the join — about 50px mid-page and 90 at the foot, against a 427px tile, inside a
colour ramp, on a motif that sits one or two percent off its own ground. `ZOOM` in
`PatternField` is the dial: turning it up makes the swell plainer and the step
bigger, one for one, and **setting it to 0 hands back the unbroken page-wide
lattice** with the motion.

**Three mechanical changes came with it.**

- `PatternDrift` is gone. It published one number for the page on `:root` and the
  layers read it in CSS; a per-band zoom needs each band's own top and height, and
  CSS cannot divide one length by another. The scroll position is shared through
  **`brand/scrollFrame.ts`** instead — one listener, many subscribers, so no two
  bands can ever be a frame apart, and nothing measures anything on a scroll frame.
- The phase went back to being wrapped modulo the tile height, and the layers got
  their one-tile overhang back. Scaling about the centre pulls a layer's edges
  inward by half the band's height times the growth — 125px on the tallest band —
  and `TILE_H` covers that several times over while costing the phase nothing.
- It is a `transform` and not `background-size`. Both scale the tile; only the
  transform composites. And no `will-change`: a changing transform is promoted on
  its own, where declaring it would pin all nine layers in video memory at roughly
  15MB each, which is the property `content-visibility: auto` exists to protect.

### Verified

- Nine scale transforms and nine `transform-origin: center` in the rendered home
  page; `background-size` back to `auto`; the one-tile overhang restored.
- /contact: one header mark (the pill) and one footer mark.
- The ramp checker passes on all seven routes.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.

---

## Addendum, same day: the zoom is reverted, and LinkedIn is live

### The pattern is back to the panning connected flow

The per-band zoom broke the one thing the pattern layer exists to produce — a
single lattice running unbroken down the page — and it was reverted whole. What is
back is exactly what was there before: the document-anchored phase wrapped modulo
the tile height, the one-tile overhang on all four sides, and the global 9%
horizontal pan on `:root`.

**Deleted with it:** `brand/scrollFrame.ts`, the `ZOOM` constant, the per-band
scroll subscription and the cached box it needed. `PatternDrift` is back and
`MotionProvider` renders it again.

**The arithmetic is kept in both files' comments**, because it is the part that
stops this being attempted a third time. Three things cannot all hold: one lattice
unbroken down the page, a zoom you can see, and no sliding. Anchored to the
document the lattice stays whole, but its boundaries sit at multiples of the tile
height, so growing the tile by a fraction `f` slides the boundary near depth `d` by
`d x f` — and keeping that slide down forces `f` so small that nothing is visible.
Anchored per band the zoom is visible with no slide, but neighbouring bands sit at
different scales and the arcs step at every join.

I shipped the second of those on the strength of "not showing any movement" and
took the wrong half of the trade. The flow is the design; the pan is the motion.

### LinkedIn

`https://www.linkedin.com/company/mela-skin/`, in `constants/placeholders.ts` →
`SOCIAL`. It renders as a real link with the hover arrow and the brackets off its
label; Instagram, Facebook and TikTok are still dashed slots until their handles
arrive.

### Verified

- Nine drift transforms, zero scale transforms, `background-size: auto`, the
  one-tile overhang on all four sides.
- One live social link in the footer, three unfilled slots.
- The ramp checker passes on all seven routes; /contact still marks the booking
  pill in the header and its own link in the footer.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.

---

## Addendum, same day: a skincare partners strip on the landing page

`components/SkincarePartners.tsx`, between the consultation band and the visit
steps.

### Why a strip and not the /about section

`/about` already has a partners section, and no section runs twice across the two
pages — the rule `AboutTeaser` follows for the clinician. So the two do different
jobs: /about answers the question a patient actually has about a clinic's shelf,
which is who chose these ranges and on what evidence, in two tall panels with a
paragraph each. This is the landing page's version — the ranges laid out **side by
side**, one line saying what they have to clear, and the way across to the detail.

**The list is not duplicated.** The plates read straight off
`constants/about.ts` → `ABOUT.partners.items`, so the two ranges are named once
and both pages change together when they are named for real. Only the strip's own
heading and lede are new, in `HOME.partners`.

### Where it sits, and why the page's colour had to move

Between the consultation argument and the visit steps. The band above ends on "you
leave with the plan and its cost"; this is what may be on that plan to take home,
and the band below is what happens on the day. It is also the one place on the page
where the clinic vouches for somebody else's product, so it reads as credibility
rather than as another list of services.

**Adding a ninth band broke the ramp's arithmetic**, and this is the part worth
recording. The page had two clean descents of four — shell, paper, cream, linen,
twice — with `BookingCta` pinned to linen because it is shared by six routes. A
ninth band cannot be fitted into that with single stops only: working backwards
from linen, the four bands above it are forced to cream, paper, shell, and the four
above those are the first descent, which leaves the new band with nowhere to go.

So it takes `cream`, one stop back **up** from the consultation band's linen, and
the page now has two upward steps instead of one: a single stop at the shelf, and
the two-stop chapter break at `Visit`. Both read as intentional, and every other
step is still one stop.

### Two plates, because there are two ranges

A row built for five would either invent three or stand three-fifths empty, and a
clinic's shelf is not a place to imply more than it has. `grid-cols-2` rather than
a scroller — two things do not need one — and the plates are a fixed height rather
than an aspect ratio, because a skincare range's mark is almost always a wordmark
and at 16:9 the empty plate grew with the column until it was the biggest thing in
the section.

Both are dashed and bracketed, the treatment every unshot photograph on this site
gets. Neither range has been chosen; filling in `ABOUT.partners.items` fills in
both pages at once.

### Verified

- Home ground sequence is now `field · shell paper cream linen cream shell paper
  cream linen · field`, and the ramp checker confirms every band's declared
  neighbours match its actual ones — on this route and the other six.
- The strip renders both plates, the eyebrow, the heading, the lede and the link
  to `/about#partners`.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter (75 files, 0
  violations) all clean.

---

## Addendum, same day: the partners strip redrawn, and every small title off

### The partners strip, from scratch

The first version was two bordered cards, each holding an empty dashed logo box, a
tracked-caps kicker and a name. Four elements to say one thing, and it read as a
component rather than as a page.

**What it is now: two names set large on the ground.** No cards, no plates, no
dashed rectangles, no label above anything. A partner strip's whole job is that
the marks are the content, so the ranges are set at the size that says so —
`clamp(2rem, 4.4vw, 3.1rem)` in Larken — with one plain sentence under each.

- **It runs edge to edge**, keeping the content column's gutter as its padding.
  Two names in a centred column sat in the middle of the screen with a third of
  the width empty either side; across the full bleed they read as a shelf.
- **The split is space, not a rule.** `gap-y-14` stacked, a wide `gap-x` beside
  each other. Two things that size do not need a line between them to be two
  things, and this page has no rules on it anywhere else.
- **The brackets are the whole placeholder.** At this size `[Skincare range one]`
  is unmistakably unfilled; a dashed box on top of it was saying the same thing
  twice.
- **The slot is the logo slot.** `min-h-[5.5rem] lg:min-h-[7rem]` with the name
  bottom-aligned in it, which is the figure a supplied wordmark gets. Once the
  ranges are named the `<h3>` becomes an `<Image>` in the same slot at the same
  size and nothing else about the section changes — which is the test of whether
  the layout was right before the logos arrived.

The section's own head is `Our skincare partners`, which is what the kicker used
to say — so removing the kicker gave the section the name it was asked for.

### Every small title, gone or promoted

A 12px tracked-caps kicker over a display heading is the most recognisable tell of
a generated layout, and in nearly every case here it was saying a word the heading
under it already said. **Twelve went outright:** the page-hero subject line and the
kickers over the consultation, clinician-teaser, booking, assessment, providers,
map, partners and coming-soon headings.

**Four were the only name their content had, so they were promoted:**

| | was | is |
| --- | --- | --- |
| Pillar cards | `Medical dermatology` in 12px caps over `Diagnosed first` as the heading | the subject IS the heading; the phrase is an italic Larken line under it |
| The two treatment rails | 12px caps | Larken 1.5/1.7rem |
| "At your appointment" on each condition | 12px caps | Larken 1.3rem |
| `Callout`'s label, including "On deeper skin" ten times on /medical | 12px caps | Larken 1.2rem |

The pillar cards are the one that was wrong twice over: the reader wants the
subject, and the subject was in the small print while a phrase about it was the
heading.

**Three folded into what they labelled.** "Jump to" above the condition pills (a
row of condition names is self-evidently a jump list); "On the menu" above the
pill list on /cosmetic, ten times down the page; and the same label on the home
page's cosmetic cards, where a caps label over "4 treatments" became "4 on the
menu" in one line.

**Also restyled**, since they were the same 12px caps doing a different job: the
clinician's role-and-registration line, the review bylines, and the four aside-card
titles in the page heroes ("On this page", "How to read this page", "Reach us
directly", the menu's rules title) — all now plain type or Larken.

**What still uses the utility**, and is not the same thing: definition-list terms
(Address, Hours, Parking, Access), the footer's column headings, the mobile menu's
Call and Email actions, the skincare cards' product categories, and every
`PhotoSlot` label. Those are data labels and unfinished markers rather than titles
over headings.

**Nine copy keys went with them**, so nothing carries a value nothing renders:
`HOME.consult.eyebrow`, `ABOUT.teaser/assessment/providers/partners.eyebrow`,
`CONTACT.cta/map.eyebrow`, `COSMETIC_PAGE.comingSoon.eyebrow` and
`COSMETIC_PAGE.menuItemsLabel`. The `Eyebrow` primitive in `ui.tsx` is gone too —
it had no callers.

**The page-hero subject is not lost.** It stays in front of the `h1` for anything
reading the page rather than looking at it, the lede's first clause says it in
words, and the top bar now marks which page you are on.

### Verified

- The partners strip renders both names and both sentences with zero dashed
  borders and zero tracked-caps labels in it.
- Across all seven routes, what is left of the utility inside `<main>` is: the two
  mobile-menu actions, the definition-list terms, the skincare categories and the
  photo placeholders. No route has a small title over a heading.
- The ramp checker passes on all seven routes.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter all clean.
