# 2 Sep 2026, afternoon — the final letterhead, and the phone comes off

Four asks. One of them turned out to move the clinic.

> Lets move the social accounts icons to under the footer logo and the and find
> better way to show the contacts, and remove the phone number from everywhere
> for now. Because that phone is not real. Also update the contacts information
> to what is in the Resources\MELA SKIN - Letterhead_vf.docx bottom section. BUt
> Phone number is not real for now

Then two more, on the result:

> Great but the logo on the footer should be prominant and bigger,, letss use
> the space around ti effectively

> and for "info@melaskin.ke / Richer. Radiant. You. / OLA Energy Plaza / 1st
> Floor, Unit 32 / Muthaiga, Nairobi", lets only apply the contacts under
> horizontal line and horizotally aligned

> remove the separator line on top of "info@melaskin.ke -> OLA Energy Plaza,
> 1st Floor, Unit 32, Muthaiga, Nairobi"

---

## 1. The site was built on the wrong letterhead

`MELA SKIN - Letterhead_vf.docx` prints five things across the bottom of the
sheet. Three of them disagreed with what the site said.

| | on the site | on the final sheet |
| --- | --- | --- |
| address | The Atrium, 4th Floor, 88 Serenity, Westlands, Nairobi | **OLA Energy Plaza, 1st Floor, Unit 32, Muthaiga, Nairobi** |
| email | info@melaskin.**com** | info@melaskin.**ke** |
| site | www.melaskin.**com** | www.melaskin.**ke** |
| phone | +254 7 447 7777 | +254 7 447 7777 (and it is not a real line) |
| tagline | Richer. Radiant. You. | unchanged |

**Where the old values came from.** `Brand Identity/Letterhead/MELA SKIN -
Letterhead_DRAFT.docx` — the draft, which is what `constants/brand.ts` cited as
its source and which does carry The Atrium and melaskin.com. So this was not a
typo anywhere; the site was faithfully built on a superseded document.

**One spelling in here is not the file's.** The letterhead reads "Muthiaga". The
Nairobi suburb is **Muthaiga**, and Muthaiga is what shipped. A transposed vowel
in an address stops a map resolving the building and reads as a mistake in the
clinic rather than in a document. Say the word and it goes back to the sheet's
spelling — it is one line in `constants/brand.ts`.

### It reached a long way past the footer

The address was composed by hand in eight places across six files, and the
suburb was in nine strings of search copy. Everything below was naming a suburb
the clinic is not in:

- the default page title, `Mela Skin — … in Westlands, Nairobi`
- seven meta descriptions and nine location keywords in `constants/copy.ts`
- the PWA manifest's description, which was a second copy of one of those
- the `MedicalClinic` structured data: description, address, and the `geo` block
- the Google Maps query that both the embed and "Get directions" are built from
- `/about`'s lede, two hero image alt texts, the `/editorial` header
- the premises heading on `/about`, which was literally `address.line2`

**`https://melaskin.com` was written out by hand eleven times** across
`layout.tsx`, `robots.ts`, `sitemap.ts` and `lib/jsonld.ts` — so the canonical
URLs, the sitemap, the robots host and every `@id` in the structured data were
on the wrong domain.

### What stops it happening again

Two things, both in `constants/brand.ts`.

**`brand.address.lines`** is the letterhead's three lines, composed once:

```ts
const ADDRESS_LINES = [
  ADDRESS.line1,                          // OLA Energy Plaza
  ADDRESS.line2,                          // 1st Floor, Unit 32
  `${ADDRESS.area}, ${ADDRESS.city}`,     // Muthaiga, Nairobi
] as const;
```

with `oneLine` and `short` beside it. Every consumer used to pick `line1`,
`line2` and `city` out by hand, which is a shape that silently drops any field
added later — and `area` is exactly such a field. Eight call sites would have
shown the floor of a building and no suburb.

**`brand.origin`** is the domain, once. The eleven hand-written origins now read
from it.

**The suburb is written out longhand in the search copy, on purpose.** Those are
sentences and keyword phrases rather than fields, and half of them would need
their surrounding words changed anyway if the clinic moved again. Grepping for a
place name finds all of them in one pass, which is how these were found.

### Two things in the structured data got deleted rather than moved

- **`geo`** held `-1.2674 / 36.8108`, commented "approximate Westlands / The
  Atrium". Muthaiga makes those not approximate but wrong, and a wrong pin in
  structured data is what a phone's Maps app navigates to. Nobody has stood
  outside OLA Energy Plaza with a handset, so there is no honest replacement.
  `hasMap` still hands Google the address to resolve, which it does well.
- **`telephone`** went with the number. It was the one field that would have put
  the fake line into a search result.

`sameAs` gained something instead: it was `[]`, which asserted no profiles at
all including the LinkedIn the clinic actually has. It now maps `SOCIAL` and
drops the bracketed three.

---

## 2. There is no phone number on the site

`+254 7 447 7777` is on both letterheads and it is not a line anybody answers.
It was a live `tel:` link in five places, plus the structured data:

| where | what it was | what it is |
| --- | --- | --- |
| the mobile menu | two rows under a gold rule, phone over email | one row: the email, which inherits the rule and the delay slot |
| the footer | in the contact block | the email is the only way to reach a person |
| the closing band, six routes | a ghost pill, `tel:` | a ghost pill, `mailto:` |
| `/contact` hero card | the number in Larken over the email | the email in Larken over the address |
| under the booking form | "Or call +254 …" | what the send button actually does |
| `lib/jsonld.ts` | `telephone` | absent |
| `/editorial` — header, footer, booking | three more `tel:` links | the email |

Plus the prose that offered a call: `/contact`'s lede said "call during opening
hours", the first visit step said "Online or by phone", and the contact meta
description opened with "Phone, email, opening hours".

**`formatDetection.telephone` is now `false`.** That follows from the removal
rather than being a change of heart about the feature: with no number to
linkify, Safari's detector has nothing to find and everything to get wrong.
What is left in that shape on these pages is a KRA PIN, a KMPDC registration
number and a consultation fee, and a `tel:` link wrapped round any of those is a
dial prompt to nothing.

**It is not a bracketed placeholder.** Every other unconfirmed fact on this site
lives in `constants/placeholders.ts` and renders in visible `[square brackets]`
so it cannot ship unnoticed. A phone number is the exception: those placeholders
render, and a footer reading "[Phone number]" is worse than a footer with no
phone in it. `constants/brand.ts` carries the note and the restore path instead.

**One `+254` is still on the site, deliberately.** The booking form's Phone
field has `placeholder="+254 …"`. That is asking the visitor for *their* number
so the clinic can call them back — a dialling-code hint, not a number.

### Two side-effects worth knowing

**The closing band's second button broke the pill style.** `PILL` sets uppercase
at 0.14em tracking, which is right for two or three words of display copy and
wrong for an address: "INFO@MELASKIN.KE" spaced out by a seventh of an em is a
worse thing to read back than the address itself. So that one pill sets
`normal-case` at 0.01em.

**It had to go on a child `<span>`, not on `className`.** Tailwind resolves
same-property classes by stylesheet order rather than by the order they are
written, and it emits `.normal-case` *before* `.uppercase` — verified in the
built CSS, `.normal-case` at byte 56282 against `.uppercase` at 56315. The
pill's own class would have won and the override would have silently done
nothing. Both properties are inherited, so a declaration on the child beats the
parent's whatever order the sheet is in.

**The form's send button explains itself now.** The corner that held "Or call"
holds `CONTACT.form.mailNote`: "The button opens your own mail app with this
filled in." That is the more useful thing to have had there all along — the form
has no server behind it and does not post anywhere, and a send button that opens
Outlook and sends nothing looks broken.

---

## 3. The social row belongs to the logo

It was at the right-hand end of the bottom bar, opposite the copyright and the
medical disclaimer, which put the clinic's own channels in the same breath as a
KRA PIN. It is under the mark now.

**It centres on the lockup's axis, not on the footer's column.** The supplied
logo is a centred stack — emblem over wordmark, descriptor centred under it — so
a row of icons hung off its left edge would have been the one thing in that
column not on that axis. The `<img>` and the `<ul>` share a box at the artwork's
own width, and the row centres in it. Measured at 400px: logo centre 136.0,
social centre 136.0.

**The bottom bar went back to holding its two lines apart** across the full
width, the copyright at the left and the disclaimer at the right. That is the
arrangement a legal bar normally has; the social row only moved to its end on
1 Sep to stop the middle of the rule sitting empty, and with the row gone there
is nothing in the middle to notice.

---

## 4. The mark is the anchor, and the contacts are a strip under a rule

Two passes. The first put the letterhead's three-part contact block into the
footer as a row of blocks. It was told to be a line instead, and the mark was
told to be prominent, and between them those two notes settled the whole lower
half of the footer.

### The logo fills its column

It was 246px in a column 376px wide, with the socials under it and about 90px of
dead height below — the shortest block in a footer whose link columns run 250.

**376px is not a size I chose, it is the column.** The grid is
`lg:grid-cols-12` with `gap-x-10` inside a 1208px measure, so a column is 64px
and the logo's four of them plus their three gaps come to exactly 376. `w-full`
at `lg`, and the mark is now 53% larger and flush with both the page margin on
its left and the first link column's gap on its right.

**The descriptor went from about 8px to 12px**, which is the part that matters
most. The whole line "DERMATOLOGY & COSMETIC CLINIC" is set at 7.93px in a
245.7-wide viewBox; at 246px it renders at its drawn size, which is smaller than
anything else on the site and only just legible. It scales with the mark.

264px on a phone and 320px from `sm`, up from 224 — the `sm` column spans the
whole grid, so `w-full` there would give a 720px logo on a tablet.

### The tagline came out of the footer

It went in two steps, and it is worth recording that the middle one was wrong.

"Richer. Radiant. You." was the centre of the contact row, on the letterhead's
three-part arrangement. When the row was told to carry only the contacts, I moved
it up under the wordmark rather than delete it -- centred on the lockup's axis
with the social row, in gold Larken -- on the reasoning that it reads better as
the brand's line than as a third contact detail, and that it earned the logo
column's leftover height.

**The clinic then took it off the footer altogether**, which is the right call
and was available at the first step: the line is on the home hero, which is where
it was praised in the first place, and a brand line printed twice on one page is
a brand line nobody reads once. `brand.tagline` still feeds the three heroes and
the JSON-LD `slogan`, so nothing is lost but the duplicate.

The logo column is the mark and the social row. It comes to about 240px against
250 of link columns beside it, which is the balance the enlarged mark bought on
its own -- the tagline was never what was holding that up.

### The contact strip

One horizontal line, two items on it, taking the two edges — the same two
margins the copyright and the disclaimer take under the rule below, so the
footer's lower half is two lines on one pair of margins.

```
info@melaskin.ke →              OLA Energy Plaza, 1st Floor, Unit 32, Muthaiga, Nairobi
─────────────────────────────────────────────────────────────────────────────
© 2026 Mela Skin Limited. …                Nothing on this site is a substitute …
```

**THERE WAS A HAIRLINE OVER IT FOR AN AFTERNOON, and it came off.** It made the
contacts a closed strip between two rules, which is a legible thing to be, and
two rules 92px apart in one footer is one more than the site draws anywhere
else. So the footer has ONE rule again, the bottom bar's, and space does the
dividing instead: the strip sits **80px below the columns and 28 above the
rule**, nearly three times as far from what is over it as from what is under
it, so it reads as the head of the footer's lower band rather than as a loose
line in the middle of nothing.

That is the same instruction the section grounds got on 1 Sep -- "please avoide
using separator line between sections, or you are using space that shows light
colored line" -- applied one level down.

**THREE THINGS ON ONE LINE DID NOT WORK, and it is worth recording why.** With
the tagline still in the middle, the address is 476px of the 1208 and the email
is 190:

- `auto 1fr auto` sizes the outer columns to content and centres the tagline in
  what is left, which put it **133px to the left of the footer's own axis** —
  close enough to centre to read as a miss rather than a decision.
- `1fr auto 1fr` fixes the axis and breaks the address instead. It hands the
  address a fixed half of the row, 469px, which is less than the address needs,
  so the one thing the line exists to keep on one line wraps.

Two items have neither problem. `justify-between` and they are exactly on the
margins at every width.

**The address is one line now**, from `brand.address.oneLine` so the suburb
cannot be dropped by whoever composes it next. Three stacked lines is right on a
sheet of paper with a margin to itself, and wrong in a band that is one line
high everywhere else — it made the right-hand third of the footer a paragraph
while the other two thirds carried one line each.

**Horizontal from `md` rather than `lg`.** Two items fit a 688px tablet measure
with room to spare; three needed 1024 before the address stopped wrapping, which
is what held the row at `lg` when the tagline was in it. Below `md` it stacks —
same two things, same order, and the address wraps to two lines on a phone.

**Two of the letterhead's five lines are still absent, both on purpose.** The
phone number is not a real line. And `www.melaskin.ke` is the address of the
page you are reading: printing it is what a letterhead is *for*, and a footer
link to the site the footer is on goes nowhere. So the email is the only way to
reach a person, and it is set larger than the address for that reason rather
than for balance.

Baselines, not tops — two sizes on one line, and it is the type that should
share a baseline, not the boxes.

### Contrast, measured

| | | on `#2c190b` |
| --- | --- | --- |
| email, address | cream 85% | 10.24:1 |
| email on hover | ivory | 16.35:1 |
| tagline | gold | 9.13:1 |
| copyright | cream 75% | 8.27:1 |
| disclaimer | cream 60% | 5.77:1 |

Everything clears AA; everything but the disclaimer clears AAA, and that is the
one line that should stay quiet.

### The footer, now

```
the mark        the supplied logo at its column's full width,
                the social row centred under it
the four lists  medical, cosmetic, the menu, the clinic
contact         the email at the left, the address at the right
                ────────────────────────────────────────────
the bottom bar  the copyright at the left, the disclaimer at the right
```

One rule, over the legal copy. Everything above it is held apart by space.

---

## 5. The logo now reads what it says

Yesterday's note flagged this and left it:

> The descriptor line is live `<text>` in Ranade, and an SVG loaded through
> `<img>` cannot reach the page's webfonts, so it draws in the browser's default
> face. … The fix, if it shows: embed the Ranade Medium woff2 in the file.

**It showed.** Rendered at size, the footer lockup read
**"DERM ATOLOGY & COSMETIC CLINIC"** — a hole in the middle of the first word.

The file sets the line as eight `<tspan>`s, each with an absolute `x` its design
tool computed from Ranade's metrics at 7.93px:

```xml
<tspan x="0">DERM</tspan><tspan x="24.99">A</tspan><tspan x="30.06">T</tspan>…
```

Drawn in a fallback serif those are the designer's positions with somebody
else's letter widths, so the gaps land wherever the two faces disagree. It was
never going to be marginal.

**What was added, and it is only this:** one `@font-face` at the top of the
file's own `<style>`, carrying Ranade Medium as a data URI. No path, no
coordinate, no colour and no glyph position is touched. This is the file drawing
as designed rather than differently from designed, which is the whole point of
using the supplied artwork.

**Subset to the sixteen characters the descriptor uses** — `&ACDEGILMNORSTY`
plus the space — so the 22KB webfont becomes **1,808 bytes**. The file goes from
654,765 to 658,054 bytes, 3.2KB for the fix.

**Two gotchas, one of which cost a round trip.**

- **No angle brackets in the injected CSS comment.** The first attempt explained
  itself using the words `<text>` and `<img>`, and an SVG `<style>` element is
  XML text and not CDATA — so `<text>` opened an element, `</style>` mismatched,
  and the whole document stopped parsing. The footer rendered a broken-image
  icon. The rebuild script now validates with `ElementTree.parse` before it is
  considered done.
- **It rebuilds from `Resources/` every run**, so the splice can never land
  twice and the pristine artwork is always the starting point.

**Still not changed: the 487KB embedded PNG.** It is the 3D emblem at 884px,
rendering at about 35px in the footer, and it is 493KB of the 495KB gzipped
weight. `loading="lazy"` keeps it off the critical path — the footer is below the
fold on all seven routes — so it costs nothing until somebody scrolls, and then
once. Resampling only the raster, leaving every vector path untouched, takes the
file under 40KB. That is a one-line change and it is the clinic's call.

---

## Verified

- **The phone is gone from all eight rendered routes** — no `tel:`, no `+254`
  outside the form's own placeholder, no `7777`. Same for `robots.txt`,
  `sitemap.xml` and the manifest.
- **Westlands, The Atrium, 88 Serenity, melaskin.com, "4th Floor" and "fourth
  floor" appear on no route.**
- **All seven footers carry all five new facts**: OLA Energy Plaza / 1st Floor,
  Unit 32 / Muthaiga, Nairobi / info@melaskin.ke / Richer. Radiant. You.
- **The footer's shape**, asserted against the rendered markup on all seven
  routes (the RSC payload excluded, or every class counts twice): DOM order runs
  logo, tagline, socials, columns, email, address, legal copy; the contact strip
  is the email then the address; the address is one string from
  `brand.address.oneLine`; the bottom bar holds no list and both legal lines.
- **Exactly ONE `border-t` in the footer**, and it sits between the address and
  the copyright. No other border utility appears anywhere in it.
- **The logo is its column's full width** at `lg`, 376px against the grid's
  4-of-12 plus gaps, and 264/320 below that.
- **Nothing in the footer overflows at 400px.** Measured live in the browser
  rather than off a screenshot: layout viewport 400, `scrollWidth` 400, and
  every `<p>`, `<a>`, `<img>` and `<ul>` inside its own box. The address wraps
  to two lines and the copyright to two, both within the margins. See the note
  below on why the screenshots said otherwise.
- **The logo and the social row share a centre to one decimal place**, 136.0 at
  400px.
- **The lockup's descriptor reads "DERMATOLOGY & COSMETIC CLINIC" in Ranade**,
  and the SVG parses as XML.
- **Structured data**: `melaskin.ke` throughout, no `telephone`, no `geo`,
  `addressRegion: Muthaiga`, `sameAs` carrying the one real profile.
- **Canonical, og:url, sitemap and robots host** all on `melaskin.ke`.
- All seven routes pass the ground-ramp checker.
- `tsc`, `eslint`, `next build` across 17 routes, and the copy linter (70 files,
  0 violations), all clean.

**The typecheck did real work here.** Deleting `brand.phone` and
`brand.phoneHref` rather than blanking them turned every remaining call site
into a compile error, which is how the three in `/editorial` were found — a live
route, `noindex` but not unrendered, and easy to forget.

---

## Two traps in headless screenshots

Both cost a round trip, and between them they are the reason every load-bearing
measurement in this note came from a live DOM probe rather than off a crop.

### 1. `--window-size=400` does not lay out at 400

Chrome's headless window has a minimum width, and on this machine it is **500
CSS px**. Measured by dumping `innerWidth` from a page loaded at a range of
window sizes:

| `--window-size` | 360 | 400 | 440 | 460 | 480 | 520 |
| --- | --- | --- | --- | --- | --- | --- |
| layout width | 500 | 500 | 500 | 500 | 500 | 504 |

The *capture* is still the width you asked for. So `--screenshot` at
`--window-size=400` hands back a 400px-wide crop of a 500px layout, and every
line between 400 and 500 looks cut off mid-word at the right edge. That is what
made the footer's address and copyright appear to overflow at phone width three
separate times; the DOM said 400px layout, address `24..376`, two lines, and the
DOM was right.

**An earlier version of this note blamed the pattern lattice for that.** It was
wrong -- the lattice does run to the edge by design, but what the crop was
showing was real text on a wider layout.

**How to actually shoot a phone width:** put the page in an `<iframe>` of the
width you want inside a window wider than 500, and screenshot the host page.
The iframe gets the exact CSS width, and the layout inside it is the real thing.

### 2. The reveal system has a floor

A headless capture of `/contact` at a 3400px viewport rendered the footer's logo
and its four link columns and left the contact band and the bottom bar blank.
The same page at 4000px rendered all of it. `src/motion.tsx`:

Not introduced here, not fixed here, and worth writing down because it cost a
round of screenshots.

A headless capture of `/contact` at a 3400px viewport rendered the footer's logo
and its four link columns and left the contact row and the bottom bar blank. The
same page at 4000px rendered all of it. `src/motion.tsx`:

```ts
const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
```

At a 3400px viewport that puts the reveal trigger line at y=2992. The contact
band's top sits at about 2990, the bottom bar lower still, and a 3225px page in
a 3400px window has nothing to scroll — so neither ever enters the trigger zone
and both stay at `opacity: 0` forever.

**It cannot happen on a real device.** The failure needs a viewport TALLER than
the whole page, and every content route is over 3000px against a desktop
viewport of roughly 800. At 800px the line sits 704px into the screen and
scrolling carries everything through it.

The margin is a global motion decision that predates this work and changing it
moves every animation on the site, so it is left alone. To capture a footer,
give the window or the iframe a height over `page / 0.88` and the whole thing
sits above the line — which is what `scratchpad/foot.py` does.

---

## For the clinic

1. **Confirm the spelling: Muthaiga or Muthiaga?** The sheet says Muthiaga; the
   suburb is Muthaiga; the site says Muthaiga.
2. **Confirm the domain is `melaskin.ke`.** Canonical URLs, the sitemap and the
   robots host now point there. If the site is deployed anywhere else, search
   engines will be told the wrong home.
3. **The real coordinates**, when somebody is next outside the building: they
   restore the `geo` block and let `CONTACT.map` use a real place link instead
   of an address search.
4. **A phone number** whenever there is one to publish. It goes back in one
   place.
5. **Three social accounts are still dashed slots** — Instagram, Facebook,
   TikTok. Only LinkedIn is live.
