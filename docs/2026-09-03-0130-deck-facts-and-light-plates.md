# 3 Sep 2026 — the deal announcement's facts, and the last dark plate

Two notes:

> And get about Dr. Margaret detail from Resources/Deyabo Capital - Deal
> Announcement (MELA SKIN).pptx. Also get more about the clinic to be added on
> the about page from thsi file specifically the key clinic details.

> minimize the darker version of the brand color used in the cards like
> cosmotic dermatology and the skin care collection icons background

---

## 1. What the deck actually says

One slide. **Read off the shape geometry, not the flat text order**, because the
values and their labels are separate text boxes and the flat reading order
interleaves them with a slide number — which would have paired "1" with "Medical
Procedure Rooms". Values sit at x=760, labels at x=941, matched by row:

| value | label |
| --- | --- |
| 2K+ sq. ft. | Medical Facility |
| **8** | Medical Procedure Rooms |
| 1 | Registered Pharmacy |
| 1 | Registered Laboratory |

Plus "Located in the upscale neighbourhood of Muthaiga, Nairobi", and under
**Key Partners**, two clinicians labelled International and Local:

| | | |
| --- | --- | --- |
| International | Dr. Abseret Hailu | BSc, MD (Canada), CCFP, PgDip(Derm) (UK) |
| Local | Dr. Margaret Gachanja | MBChB (Kenya), MSc(Derm) (UK) |

### What is deliberately not copied across

It is an investor announcement, and its register is not a patient page's: "A
Premier Dermatology & Cosmetic Clinic in Kenya", "one of Kenya's leading",
"world-class care", "for undisclosed consideration". The clinic has not opened,
so "leading" is not a claim it can make, and a superlative is the one thing this
site's voice has never used. Every fact underneath is here; none of the
adjectives are.

Two names are also held back, and both are the clinic's call rather than a
writing decision: **Sonrol Dermatology Medical Center**, the acquired business,
and **Deyabo Capital**, the parent. Patients who knew the predecessor may well
wonder, which argues for naming it; corporate structure on a patient page argues
against. Both are recorded in the code comments either way.

## 2. Dr. Gachanja's qualifications are now corroborated

They carried a `⚠️ CONFIRM BEFORE LAUNCH` because the only source was her saying
them aloud on the 26 Aug call. The deck lists "MBChB (Kenya), MSc(Derm) (UK)",
which is **the same two degrees in abbreviated form** — Nairobi is the Kenyan
one, Cardiff the British one. A written owner document agreeing with the
transcript is as close to confirmation as this gets without her signing it off,
so the long form stands and the warning has come off.

The deck does **not** mention the AAAM aesthetic training; that remains the
transcript's alone. And it gives nothing for the three things still bracketed —
her bio paragraph, her registration number and her special interests. Those are
her outstanding action item from 26 Aug, and she should still see the page before
it goes live.

**Dr. Hailu's credentials are recorded in a comment, not rendered.** Her provider
block came off at the 1 Sep daily for being nine tenths placeholder, and
qualifications do not change that: a block still needs a bio, a registration and
a statement that she is seeing patients, and whether she is listed at all was
always her call. They are written down so nobody has to re-read the deck if the
answer becomes yes.

## 3. Three bracketed placeholders became facts

| where | was | now |
| --- | --- | --- |
| `PREMISES.intro` | "[Describe the space in two or three sentences…]" | 2,000 sq ft on one floor, eight procedure rooms, a registered pharmacy and a registered laboratory, in a building that was a medical facility before it was this one. One sentence still bracketed: what the rooms look like. |
| `PREMISES.facts` | Address, Hours | plus **The facility** — the only block on that page that is entirely confirmed fact |
| `ABOUT.story.paragraphs[1]` | "[Two or three sentences on how the clinic came about…]" | the April 2026 takeover of a built facility, and the access gap it was set up to close |
| `principles → The room and the protocol` | four bracketed questions | the room count answered; single-room privacy, pain relief and equipment cleaning still bracketed |

**The origin paragraph earns its place next to the one above it.** That one is
about how dermatology is *taught* — from photographs of white skin. The deck's
argument is different and stacks with it: "a significant number of Kenyans
currently seek dermatological and aesthetic treatments abroad, driven by a
perception that comparable quality is unavailable locally". The training gap
explains being misdiagnosed at home; the access gap explains getting on a plane.

The placeholder asked for the founder's voice. This is third person and factual
instead, because a founder's voice cannot be written for her — the paragraph is
still the slot if Dr. Hailu or Dr. Gachanja wants to say it first-person.

---

## 4. The last dark plate on a light page

`TreatmentMedia`'s icon plate was `bg-gradient-to-br from-ms-panel to-ms-field`
— **#602F0F into #2C190B, the two darkest browns in the palette**, at 10.7:1 and
16.4:1 against the card holding them. One component, three routes:

- the home page's ten cosmetic cards
- `/cosmetic-dermatology`'s ten family cards
- `/skincare`'s eight collection items

So a dozen near-black rectangles per page, against a standing instruction that
nothing but the footer floods dark ("we do not have to use much darker version
other than the footer in the home page", 31 Aug).

**It is a terracotta wash now**, `/10` into `/20` on the diagonal, which keeps
the depth the gradient was there for. `ms-terracotta/14` is the middle of that
range and is exactly what the medical tiles wear — the colour the clinic pointed
at when it asked for "lighter color like we used in the deramtology treatment
cards" — so the two halves of the home grid are finally in one family.

**The mark had to change colour with it.** Gold on #2C190B is 7.0:1; gold on a
terracotta wash is about 1.6:1, which is not a mark, it is a smudge.

| | plate | vs the card | icon on it |
| --- | --- | --- | --- |
| was | `#602F0F` → `#2C190B` | 10.71:1 / 16.35:1 | gold/85, 4.79–6.99:1 |
| now | terracotta `/10` → `/20` | 1.14:1 / 1.35:1 | **terracotta-deep, 5.80:1** |

Comfortably past the 3:1 a meaningful graphic needs, and measured at both ends of
the page's ground gradient (5.80:1 at the top, 5.61:1 at the bottom) because
these cards appear at every depth.

The two sparkles took the same journey: they were the `ms-gold` gradient, drawn
for a near-black plate, and they are `currentColor` at terracotta 30 to 35% now.
The `image` branch's holding colour moved with them, `ms-paper/40` to
`ms-terracotta/8`, so a photograph would letterbox against the same wash.

## Verified

- 10 light plates on the home grid, 10 on `/cosmetic-dermatology`, 8 on
  `/skincare`; **zero dark plates and zero gold icons** anywhere in the built
  HTML. The only surviving mention of `from-ms-panel to-ms-field` is the comment
  explaining what it replaced.
- Rendered and eyeballed on `/skincare`: soft wash, crisp terracotta marks, faint
  sparkles. `/cosmetic-dermatology` could not be captured — its cards sit behind
  reveals, and headless Chrome does not fire those (see
  `docs/2026-09-02-1800`) — so the HTML count is the check there.
- `PhotoSlot`'s dark variant is untouched: its default is already light and the
  dark one is opt-in, used only where the ground behind it is dark.
- `tsc`, `eslint`, `next build` and the copy linter (71 files, 0 violations).
- Built into `.next-verify` throughout, so the dev server on 3000 was never
  interrupted.
