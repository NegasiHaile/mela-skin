# 1 Sep 2026, evening — four notes from the daily

Two renames, one heading, and four sections off the site.

---

## 1. The nav's first item is "Dermatology"

It was "Treatments", and it sat next to "Treatment menu" — so the bar opened on
two items beginning with the same word and a reader had to compare the second word
of each to tell them apart.

"Dermatology" is also the more accurate label for what is behind it. The two
children are medical dermatology and cosmetic dermatology, so the word that covers
both is the one they share, and a dermatology clinic's nav should say what it
practises rather than what it does to you.

The bar now reads: **Dermatology · Treatment menu · Skincare · About**, with the
booking pill to the right.

---

## 2. "What to expect on your visit"

Was "What actually happens on your visit". Both options offered were reasonable;
this is the one that went in and here is why.

"Timeline on your visit" is the more literal description — the section is four
numbered beats — but it is a word about the layout rather than about the reader.
"What to expect" is what a patient is actually asking, it is the standard phrasing
on clinic sites so it needs no interpreting, and it covers the whole span the
section covers, which starts at booking and ends at the six-week review rather
than at the visit itself.

"Actually" was doing nothing except implying somebody had told them otherwise.

---

## 3. The booking action is an appointment

**The closing band is "Book an appointment"** and its button is "Request an
appointment". Every pill that said "Book a consultation" now says "Book an
appointment" — nine of them, across both heroes, the mobile menu, the about,
medical, cosmetic and menu page heroes, and the clinician teaser. The header pill
stays "Book now": it is the shortest label in the bar and it has the room for
exactly that.

**Why appointment is the better word for a control.** A consultation is the name of
something that happens once you are in the room, and it costs different amounts on
the two sides of the clinic — free on the cosmetic side, a standard clinical visit
on the medical one. So a button offering a consultation was promising a thing the
page then had to qualify. An appointment is what you are asking for.

**Why the button says "request" and not "book".** Online booking is not live yet
(`todo.bookingOpens`), so the button goes to a form and a phone number. A button
that says book when nothing books is the kind of small lie a clinic site cannot
afford.

The word "consultation" is untouched everywhere it appears in body copy, where it
is describing the appointment rather than labelling a control.

---

## 4. Four sections off the site

### Skincare partners — the whole app, not just the home page

Both bands are gone: the strip on the landing page and the section on `/about`.
`ABOUT.partners` and `HOME.partners` with them, so nothing carries a value nothing
renders.

### Dr. Hailu's provider block, on `/about`

Everything in it except her name, her role and where she is based was bracketed.
The transcript gave one paragraph of self-introduction and nothing a bio, a
registration or a list of qualifications could be written from, and a provider
block that is nine tenths placeholder is a worse answer than one provider properly
stated.

**`CLINICIANS` is still an array.** Adding her back, or adding a third name, is one
entry in `constants/clinic.ts` and nothing else: `/about` maps over it and
alternates which side the portrait sits on, and the home teaser reads the first.

The copy around it moved from two to one: the providers lede, and the home
teaser's "Two clinicians, one record".

### "In their words"

Three empty slots, because the clinic has not opened and there is nobody to quote.
A testimonial band holding three placeholders says less than no band at all. The
component, `REVIEW_SLOTS` and `HOME.reviews` are gone, and so is `/editorial`'s
version of the same section.

The note on what to do when there are real ones — written consent first,
attribution to initials, and that quotes about being correctly diagnosed after a
long search carry the most weight — is kept in `constants/clinic.ts` where the
slots used to be.

### "Tailored first, quoted second"

The band that replaced the price list, off because its purpose was not clear on the
page.

**Worth flagging: this section was asked for on 26 Aug.** Dr. Abseret Hailu,
00:15:01: "we should have a section about … tailoring treatments directly to the
patient, and for that it's best done through consultation." The daily is the more
recent instruction and it is explicit, so the band has gone — but the two notes
disagree and somebody should know that.

**What it carried is not lost from the site.** The three things it said all survive
elsewhere:

| | where it still is |
| --- | --- |
| Why there is no price list | `/treatment-menu` FAQ, first question; `/cosmetic-dermatology`'s closing band |
| The cosmetic consultation is free | the same FAQ, the cosmetic page's lede, `/about`'s commitments |
| The medical consultation is a paid clinical visit | the same FAQ |

---

## What the two pages look like now

Both run the four light grounds with the footer as the only dark band, and both
lost one section, so both ramps were re-solved. Every move is a single stop.

| | home | /about |
| --- | --- | --- |
| | hero `field` | hero `field` |
| | Focus `shell` | Story `shell` |
| | Pillars `paper` | Clinician `paper` |
| | Treatments `cream` | Principles `cream` |
| | Visit `linen` | Assessment `linen` |
| | AboutTeaser `cream` | Premises `cream` |
| | BookingCta `linen` | BookingCta `linen` |
| | footer `field` | footer `field` |

Six light bands over four grounds means the last two step back up and down again.
That is the whole cost of it: no step is larger than one stop, so nothing needed
fading, and the only large transitions left are the hero handing over and the
footer arriving — both deliberately hard.

Two bands changed ground as a result and were re-measured rather than assumed:
`Visit` moved to linen (rules from bronze/25 to /35; its 01-04 numerals are
terracotta at 2.6rem, 3.93:1, which is over the 3:1 display sizes need) and
`Assessment` moved to linen from paper.

---

## Verified

- All seven routes pass the ramp checker: declared neighbours match actual ones,
  hard edges only at the hero and the footer, no section borders.
- Ground sequence on both `/` and `/about` is
  `field · shell paper cream linen cream linen · field`.
- "Tailored first", "In their words", "skincare partners" and "Abseret" return
  nothing on `/`, `/about` or `/editorial`.
- The nav's first item is Dermatology; the visit heading is "What to expect on
  your visit"; "Book an appointment" is present and "Book a consultation" is not.
- `/about` renders exactly one clinician block.
- Five dead copy keys removed: `HOME.consult`, `HOME.reviews`, `HOME.partners`,
  `ABOUT.partners`, `CONTACT.cta.secondary`, plus `REVIEW_SLOTS` and
  `photos.hailu`.
- `tsc`, `eslint`, `next build` across 17 routes and the copy linter (70 files, 0
  violations) all clean.

---

## Addendum: "What we treat" aligns to the page column, and scrolls past it

Two passes at this, and the second one is right.

**The problem, stated properly.** The section has two horizontally scrolling
rails. A scroller has to be the width of the screen: cap it at the 1320px content
column and a card is clipped out of existence half a screen before the screen ends,
which on a wide monitor reads as the rail being broken rather than scrollable — a
stretch of empty ground either side with the cards hidden underneath it. But at
rest a rail has to start where the heading starts, or the section reads as two
different layouts stacked.

**The first pass gave up the column** and moved the head out to the raw gutter to
match the rails. That fixed the alignment and lost something better: every other
section on the site aligns to the column, so this one no longer looked like part of
the same page.

**What it does now: the rails are full-bleed elements that pad themselves back
onto the column.** Two utilities in `globals.css`:

```css
--ms-gutter: 1.5rem / 2.5rem / 3.5rem      /* Wrap's own padding, at its three widths */

page-inset          padding-inline: max(gutter, (100% - 1320px) / 2 + gutter)
page-scroll-inset   the same figure as scroll-padding
```

Which resolves to exactly where the column's content starts, at every width:

| viewport | gutter | `page-inset` | column starts at |
| --- | --- | --- | --- |
| 390 | 24 | 24 | 24 |
| 768 | 40 | 40 | 40 |
| 1024 | 56 | 56 | 56 |
| 1440 | 56 | 116 | 116 |
| 1920 | 56 | 356 | 356 |
| 2560 | 56 | 676 | 676 |

So below 1320px nothing changes at all, and above it the head, both rail labels
and both first cards start under the H of the heading — while the scrollers still
own the whole screen for their cards to travel across. `page-scroll-inset` is the
same number as scroll padding, so a snapped card comes to rest on the column
rather than against the edge of the screen.

**Percentages and not `100vw`.** A percentage resolves against the containing
block, which for a full-bleed rail is the section — the document's own width, with
no scrollbar in it. `100vw` includes the scrollbar and would have thrown the
alignment out by its width on Windows.

**The description sits under the title**, and the head uses the same `INSET`
constant the rails do rather than a `Wrap`. Both get to the same place today; only
one of them still agrees the day somebody changes a gutter.
