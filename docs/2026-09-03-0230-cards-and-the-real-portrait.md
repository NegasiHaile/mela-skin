# 3 Sep 2026 — the cards, and the first real photograph on the site

> pleasee make the cosmotic dermatology grid cards size on home page like the
> previouse version while the AI generated images were there and use 4 items on
> row on large screens. And make sure the card icons background color a bit more
> darker than the existing one. the current one is not distingushable like with
> the background. Also plese remove the cions on the titles while we are using
> them on the top section in prominant way.
>
> And youd id not extact data from Resources\Deyabo Capital - Deal Announcement
> (MELA SKIN).pptx about Dr. Margarate, please do that and update the "Dr.
> Margaret Gachanja" and also the iamge from there.

The last point was fair. I read the deck's text and never opened its media.

---

## 1. The deck has two photographs, and I missed both

`ppt/media/` holds `image1.png` (1080x1080) and `image2.jpg` (1000x1250). Both
are real portraits, and which belongs to whom comes off the slide geometry: they
sit at x=812 and x=1185 on y=621, the same row as the Key Partners names.

| image | x | sits beside | who |
| --- | --- | --- | --- |
| `image1.png` | 812 | "International" / Dr. Abseret Hailu | headshot, dark scrubs, embroidered name |
| `image2.jpg` | 1185 | "Local" / Dr. Margaret Gachanja | white-coat portrait, plain wall |

Opening them confirms the pairing.

**Dr. Gachanja's is live.** Converted to WebP at 71KB and pointed at from
`photos.gachanja`. The frame on `/about` is about 0.76 wide-to-tall and the
photograph is 0.80, so `object-cover` trims a little from the sides and nothing
off the top; her face sits on the horizontal centre, which is where
`object-center` keeps it. It renders 484x750 on `/about` and 484x625 on the home
teaser.

**What it replaces mattered.** `dermatologist.webp` was a licensed stock
portrait, and it had to carry "[Sample image. Not Dr. Gachanja.]" underneath it,
because it was somebody else's face standing in for the doctor you would
actually see. Dr. Abseret Hailu, 26 Aug 00:17:24: "I'm not a huge fan on the AI
pics of the people, because I do want it to be real." The caption is `null` now:
there is nothing left to disclose. The stock file is deleted.

**Dr. Hailu's is extracted and wired but not rendered.** `photos.hailu.src`
points at it, and nothing reads that, because her provider block came off at the
1 Sep daily for being nine tenths placeholder. A photograph does not change
that: the block still needs a bio, a registration and her agreement to be
listed. Adding her back is now one entry in `CLINICIANS` and nothing else.

### And the text, which was already in

For the record, since the note said the extraction had not happened: her
qualifications were taken from the deck earlier the same evening and are written
up in `docs/2026-09-03-0130`. The deck lists "MBChB (Kenya), MSc(Derm) (UK)",
which corroborated the Nairobi and Cardiff degrees from the 26 Aug transcript
and let the `⚠️ CONFIRM BEFORE LAUNCH` come off them. Her bio, registration
number and special interests are not in the deck and are still bracketed.

---

## 2. The home grid: the old card, four across

The cards were shrunk on 2 Sep when the generated images came off them, on the
reasoning that a plate sized for a 320px rail card was mostly empty ground once
it held a mark rather than a photograph. That was wrong in one respect: it also
made the whole card small.

| | 2 Sep | now |
| --- | --- | --- |
| plate height | 10 / 11rem | **14.5 / 16rem** (its pre-2 Sep size) |
| columns | `sm:2 lg:3` | `sm:2 lg:3` **`xl:4`** |
| card at 1320 | 380 x ~430 | **284 x 543** |
| plate at 1320 | 380 x 176 | **284 x 256** |

`xl` and not `lg` for the fourth column, which is what the medical tiles above
already do: at 1024 the inner measure is 912px, and four cards there are 210px
each, which is narrower than the summary text can hold. At 1280 and up they are
284px.

**Ten cards divide better by four.** Three across left the tenth family alone on
its own row, which the 2 Sep note recorded as the cost of that grid. Four across
is 4 + 4 + 2.

## 3. The plate is darker, because the first attempt was not a plate

Yesterday's wash went out at terracotta `/10` into `/20`. Against the card that
is 1.14:1 rising to 1.32:1 — a 20-unit difference at the top corner, which reads
as a slightly grubby edge rather than as a plate. "Not distingushable like with
the background" was accurate.

| | plate | vs the card | delta from the card | icon on it |
| --- | --- | --- | --- | --- |
| before 3 Sep | `#602F0F` -> `#2C190B` | 10.71:1 / 16.35:1 | near-black | gold, 4.79-6.99:1 |
| first attempt | terracotta `/10` -> `/20` | 1.14:1 / 1.32:1 | (20, 33, 44) | terracotta-deep, 5.32:1 |
| **now** | terracotta `/20` -> `/34` | **1.32:1 / 1.63:1** | **(34, 56, 74)** | terracotta-deep, **4.30:1** |

About 1.7 times the separation, and the mark is still 4.30:1 at the darkest
corner — past the 3:1 a meaningful graphic needs. **That headroom is the reason
the plate could be darkened without touching the mark**, which is what made this
a one-value change rather than a re-fit.

The `image` branch's holding colour moved with it, `/8` to `/14`, so a
photograph would letterbox against the same wash.

## 4. The icon beside each title is gone

Both the home card and the cosmetic page card had the family's mark twice: once
on the plate at 96px, and again at 24px next to the heading, a centimetre below
it. The small one was not adding anything the large one had not already said.

Off both, and `CosmeticFamilies.tsx` no longer imports `Icon` at all.

## Verified

- **Measured in the browser, not off a screenshot.** The home grid reports
  `grid-template-columns: 284px 284px 284px 284px`, 10 items, card 284x543,
  plate 284x256, icon 96px at `rgb(133, 71, 22)`, and no `svg` before the
  heading. Same probe on `/cosmetic-dermatology`: plate 590x272, icon 96px, no
  icon before the heading.
- Dr. Gachanja's portrait resolves on `/about` at 484x750 with
  `alt="Dr. Margaret Gachanja, dermatologist at Mela Skin"`.
- Tailwind emitted all four new utilities: `from-ms-terracotta/20` as
  `#99571d33`, `to-ms-terracotta/34` as `#99571d57`, `bg-ms-terracotta/14`, and
  `xl:grid-cols-4`.
- The plate change was judged on a composite of the resolved colours rather than
  a page capture, because headless Chrome fires reveals unreliably and the
  cosmetic cards sit behind them (see `docs/2026-09-02-1800`).
- `tsc`, `eslint`, `next build` across 17 routes, copy linter 71 files / 0
  violations. Built into `.next-verify` throughout; the dev server on 3000 was
  not interrupted.

---

## 5. The clinician is one component, wearing the contact page's card

> for "Dr. Margaret Gachanja" lets use the smae style o nhome like we used in
> the contacts
>
> I ma talking about having one component for the doctor in the clink and use it
> from the home section and the contact page

### I did this backwards first

I read "one component, used on both" and built it, but kept the HOME band's
styling and pushed that onto /contact. The instruction was the other direction:
the home section should take the **contact page's** style. "No way, I asked to
update that section to have the style in the cotnact page but you did the
reverse."

The sharing was right. The direction of the styling was not.

### What it is now

`components/ClinicianBand.tsx`, and the facts sit in the panel the /contact hero
uses for "Reach us directly":

```
 ┌──────────────┐   DR. MARGARET GACHANJA
 │              │
 │              │   One clinician, one record, and a plan you
 │   portrait    │   leave with in writing…
 │              │
 │              │   ╭────────────────────────────────────────╮
 │              │   │ Dermatologist                          │
 │              │   │ MBChB, University of Nairobi           │
 │              │   │ ────────────────────────────────────── │
 │              │   │ MSc Clinical Dermatology, Cardiff      │
 │              │   │ ────────────────────────────────────── │
 └──────────────┘   │ Aesthetic training, AAAM               │
                    │ ────────────────────────────────────── │
                    │ [KMPDC Reg. No. 00000]                 │
                    │ ────────────────────────────────────── │
                    │ Meet the providers                  →  │
                    ╰────────────────────────────────────────╯
```

Anatomy, spacing and type scale are that card's: `rounded-[20px]`, a hairline
border, a translucent fill, `backdrop-blur-sm`, a 1.35rem display title, ruled
rows, and a last row that is a link at 1.4rem display with an arrow that slides
on hover. Her role takes the slot "Reach us directly" holds — a label for what
the rows are — and the rows are her credentials.

**The pills are gone.** The card's last row is the way through to the full
profile, so a `PillSolid` saying the same thing under it was the same link
twice; and "Book an appointment" was a second route to a band the home page
already ends on. Which means the two callers are now identical apart from the
anchor: `<ClinicianBand id="clinic" />` on home, `<ClinicianBand />` on
/contact. `AboutTeaser` is three lines.

### The colours are the one thing translated, and it is not a liberty

That card sits on the PageHero's field brown, where `bg-ms-espresso/35` renders
**1.05:1 against its ground** — a barely-tinted sheet defined by its border.
This band sits on cream on both routes, so copying those hex values would not
copy the style: it would put a dark panel on a light page, inverting the whole
relationship and breaking the standing rule that nothing but the footer floods
dark.

| | on the dark hero | on this light band |
| --- | --- | --- |
| panel | `bg-ms-espresso/35`, 1.05:1 | `bg-ms-shell/70`, 1.13:1 on cream, 1.27:1 on linen |
| hairline | `border-ms-gold/30` | `border-ms-bronze/45` — gold on cream is 1.37:1 and does not read as an edge |
| row rule | `border-ms-sand/15` | `border-ms-bronze/25` |
| title, link row | `text-ms-cream` / `text-ms-ivory` | `text-ms-cocoa`, **13.7:1** |
| rows | `text-ms-cream` | `text-ms-espresso/85`, **8.6:1** |
| arrow | `text-ms-gold` | `text-ms-terracotta-deep`, **6.7:1** |
| link hover | `hover:text-ms-gold` | `hover:text-ms-terracotta`, **5.2:1** |

### Where it sits on /contact

Between the form and the map, which is the order the page gets used in: write to
the clinic, see who will read it, then work out how to get there. The map stays
last, because that is what somebody scrolling to the bottom of a contact page is
after.

**/about's `Clinician` block stays its own component.** Full biography, special
interests, and it alternates the portrait side when there is more than one
provider. This is the short form, and the card's last row is the way to it.

### Verified

Rendered and eyeballed on /contact: the panel, the ruled credential rows, her
portrait, and "Meet the providers" closing the card in display type. Probed on
both routes beforehand: `section id=clinic` on home and an unnamed section
between `#book` and `#map` on /contact, same portrait at 484x625, same `h2`.

`tsc`, `eslint`, `next build` across 17 routes, copy linter 0 violations. Built
into `.next-verify`; the dev server on 3000 was not interrupted.
