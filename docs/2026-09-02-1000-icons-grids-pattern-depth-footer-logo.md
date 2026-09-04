# 2 Sep 2026 — icons, grids, the letterhead's pattern, and the footer lockup

Four notes. Two of them were answered by measuring the letterhead rather than by
choosing.

---

## 1. The cosmetic cards show the mark, not a picture

Five of the ten families carried generated imagery — injectables, boosters, hair,
peels, laser. It is off. All ten render the treatment mark on the brand ground with
two sparkles off the monogram, which is what the other five already did.

**Why it was worse than a gap.** The imagery was not the clinic's work and it was
not a photograph of anything. And five illustrated cards beside five iconographic
ones made the grid look half-finished rather than deliberate — the inconsistency
did more damage than the absence.

**One file changed.** The five `image:` values came out of
`constants/cosmetic.ts`; `TreatmentMedia` already had the icon branch and it is
shared by the home grid and `/cosmetic-dermatology`, so both pages moved together.
The `image` field is kept, and so is the branch: the day there is a photograph of
THIS clinic doing a treatment, it goes in per family with no component change.

**Ten orphaned files deleted**, 14MB of `public/images` — the five webp the cards
served and the five PNG masters beside them. Recoverable from git if the clinic
ever wants them back.

**Three generated images are still on the site and I have left them**, because
they are not the cards this note is about and one of them is a whole design:

| where | what |
| --- | --- |
| the nav dropdown | two picture cards, medical and cosmetic. The panel IS the pictures; replacing them is a redesign of the dropdown, not a swap. |
| `/cosmetic-dermatology`, closing band | the treatment collage beside "Quoted for your skin, not from a list" |

Say the word on either.

---

## 2. Both lists are grids

The medical shelf was a two-row horizontal scroller; the cosmetic rail was a
single row of 320px cards. Both are responsive grids now — **twelve tiles at four
across, ten cards at three** — and everything is on the screen at once.

**What is wrong with a horizontal scroller is not the styling.** On a desktop page
it has no affordance: no scrollbar, no arrows, and the gesture is a trackpad swipe
or a shift-wheel that most visitors never try. So the section showed four of twelve
conditions and three of ten families and quietly kept the rest, which is the
opposite of what a "what we treat" section is for. It also loses to a grid on
every other count worth having — a grid is keyboard-reachable, it prints, it
reflows on a phone with no gesture at all, and a crawler reads all of it.

**What the industry does with a list this size is a grid**, and for a landing page
either the whole list in a grid or a curated subset with a link out. Both lists
already have their link out ("All 12 in detail", "Every treatment family"), so
showing all of both and keeping the links is the honest version — nothing is
hidden and nothing is a decision the clinic did not make.

Three things fell out of it:

- **The section is one `Wrap` again.** A scroller cannot reach the edges of the
  screen from inside a centred column, so the head and the two rails used to be a
  run of full-bleed siblings each padding itself back onto the column. A grid has
  no reason to bleed, so the section is one column like every other one — and the
  head, the two list labels and the first card of each grid line up because they
  are in the same box, rather than because three separate paddings happen to
  agree. **`page-inset` and `page-scroll-inset` are deleted**; they existed only
  for the scrollers.
- **The icon plate came down from 14.5/16rem to 10/11.** It was sized for a 320px
  rail card where it was the card's whole top half. In a 380px grid cell holding
  one mark rather than a photograph, that much of it was empty ground.
- **The gap between the two lists came down** from 160/224px to 128/176. They are
  under each other in one column now rather than being two separately scrolling
  things, so they need less air to read as two lists.

The tenth family sits alone on the last row. That is what a grid of ten does, and
the alternatives are worse: hide one, or five columns at 230px where the summary
wraps to six lines.

---

## 3. The pattern is faint at the top and full at the bottom

`Resources/MELA SKIN - Letterhead_vf.docx` prints the pattern down the whole
sheet, but not evenly: barely there at the top where the logo and the address sit,
full strength across the bottom third.

**Measured off the artwork rather than chosen.** Sampling the letterhead's own
ground — the difference between an interstice and the middle of a circle, row by
row down the page:

| depth | 5% | 20% | 35% | 45% | 55% | 65% | 80% | 100% |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| strength | 0.31 | 0.46 | 0.54 | 0.77 | 0.85 | 0.85 | 1.00 | 1.00 |

About a third at the top, rising, level from four fifths down. So
`DEPTH_FLOOR = 0.32` and `DEPTH_FULL = 0.8` in `PatternField`, and every layer
multiplies its tone's opacity by where its own middle sits in the document:

```
strength = 0.32 + 0.68 x min(depth / 0.8, 1)
opacity  = tone.opacity x strength
```

Which on the home page's bands gives roughly 0.15 effective at the top and 0.42 at
the footer, against a flat 0.42 before.

**Three details.**

- **The band's MIDDLE, not its top.** A band is often taller than a screen, and
  measuring from the top would hold a tall first section at the floor all the way
  down its own height.
- **The floor is 0.32, not 0.** On the letterhead the pattern at the top is faint,
  not absent, and a hero with no ground at all is a flat brown rectangle.
- **It is measured in the same effect as the phase**, off the same rect, so it
  costs nothing extra and it re-runs whenever anything above a section changes
  height — which matters, because the ramp is a fraction of the document and the
  document gets taller as fonts and images land. The CSS fallback is `1`, so
  before hydration every band paints at its tone's own strength: the pattern is
  never missing, only briefly even.

---

## 4. The footer wears the letterhead's lockup

The footer had the inline lockup — mark beside type — which is what the top bar
wears because a 96px bar has no room for anything else. The letterhead, and
`1_Logo/Primary Logo`, put the emblem centred above the wordmark with the
descriptor centred under it.

### First pass: composed from parts. Rejected.

I built a stacked variant of the `Wordmark` component: the 3D emblem as a 25KB
WebP, the wordmark's own vector paths, a live Ranade descriptor, at gaps measured
off the printed sheet (113px emblem over a 689px wordmark, 51 and 54 between them
— 7.4% and 7.8% of the wordmark's width).

It landed in the right place and it was still a reconstruction. The reply was
"exactly the same as what is in this. No need to update", which is the correct
call: a logo is a supplied artefact, and reproducing one from its parts is a
decision nobody asked for however carefully the proportions are measured.

**Taken out:** the `layout` prop, `STACK_GAP`, the `EMBLEM` constant, the
`next/image` import it needed, and the `brandmark-gold.webp` line in
`scripts/build-brand-assets.py`.

### What ships: the file itself

`1_Logo/Primary Logo/SVG/MELA SKIN - Primary Logo_2.svg`, copied to
`public/brand/primary-logo-2.svg` **byte for byte** — verified against the source
— and served with a plain `<img>`. `_2` is the cream variant, `#EDDDC9`, which is
the one drawn for a dark ground.

`<img>` and not `next/image`: Next will not optimise an SVG unless
`dangerouslyAllowSVG` is set, so the component would wrap the file and pass it
through unchanged while adding a srcset that cannot apply. Width and height are
the file's own viewBox, 245.7 x 110.62, so the box is reserved before it lands.

**Two things about it worth knowing, neither of which I have changed.**

- **It is 654KB, 493KB over the wire.** 487KB of that is an embedded base64 PNG
  of the 3D emblem at 884px, rendering at about 35px in the footer. `loading="lazy"`
  is what keeps it off the critical path — the footer is below the fold on all
  seven routes — so it costs nothing until somebody scrolls, and then once.
  If that ever matters: resampling only the embedded raster, leaving every vector
  path, colour and coordinate untouched, takes it under 40KB.
- **The descriptor line is live `<text>` in Ranade**, and an SVG loaded through
  `<img>` cannot reach the page's webfonts, so it draws in the browser's default
  face. Its per-letter `x` positions are baked into the file, so the letters land
  exactly where the designer put them either way, and at 7.9px the difference in
  face is marginal. The fix, if it shows: embed the Ranade Medium woff2 in the
  file as an `@font-face`, about 25KB.

Both are one-line changes and both edit the file, which is why neither is done.

> **The second one showed, and it was not marginal.** Rendered at size the
> lockup read "DERM ATOLOGY & COSMETIC CLINIC": the absolute tspan positions are
> the designer's and the letter widths were the fallback serif's, so the gaps
> landed wherever the two faces disagree. Fixed the same afternoon by embedding
> Ranade Medium subset to the descriptor's sixteen characters -- 1,808 bytes,
> 3.2KB on the file, and no path, coordinate or colour touched. See
> `2026-09-02-1400-final-letterhead-contacts.md`, section 5.
>
> The 487KB raster is still there and still the clinic's call.

---

## 5. Contact is its own section

> **Superseded the same afternoon.** The row survives, but nothing in it does:
> the phone came off the whole site, the address changed building and suburb, the
> email changed domain, and the row was rebuilt on the letterhead's own
> three-part arrangement with the social icons moved down into the logo column.
> See `2026-09-02-1400-final-letterhead-contacts.md`. What follows is why the
> block left the logo column, which still holds.

The address, the phone and the email were stacked under the logo in the footer's
left column. **That column holds the logo and nothing else now**, and the three
facts are their own row between the link columns and the bottom bar.

Two reasons it is better there. The left column was the only one in the footer
doing two jobs — a mark and a set of facts — and the address was squeezed into a
280px measure, so "The Atrium, 4th Floor, 88 Serenity, Westlands, Nairobi" wrapped
to three lines. Across its own row it reads in one.

The row puts the address at the left and the two ways to reach a person grouped at
the right, which is the order somebody reads a footer looking for either: where
the clinic is, then how to get hold of it. No rule above it — the gap is 14/16
against the 9/10 inside the link columns, so it separates itself.

The footer is four parts now: the logo, the four lists, contact, and the bottom
bar. *(Still four that afternoon, but the first part gained the social row and
the last one lost it.)*

---

## Verified

- The treatments section renders 12 medical tiles and 10 cosmetic cards, **zero
  `<img>`, zero `overflow-x-auto`, zero snap classes**, grid columns
  `sm:2 / lg:3 / xl:4`, inside the 1320px column. `/cosmetic-dermatology` shows
  ten icon plates too.
- Seven pattern layers read `calc(<tone> * var(--ms-pattern-depth, 1))`.
- The footer serves `/brand/primary-logo-2.svg`, byte-identical to the supplied
  file, lazily and with its viewBox reserved; the composed lockup is gone from
  both the markup and `Marks.tsx`.
- The contact row renders the address, the phone and the email, and the logo
  column holds only the logo. *(The phone came off the site that afternoon and
  the social row moved into the logo column; see the 1400 note.)*
- The site's own ramp rendered beside the letterhead's ground: same behaviour,
  faint at the top, full by the footer.
- All seven routes pass the ground-ramp checker.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter (70 files, 0
  violations) all clean.
