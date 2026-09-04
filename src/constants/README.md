# `src/constants` — everything the site says

All content lives here. No component hard-codes a service name, a heading or a
paragraph — they read from these files. Change a value here and it updates on
every page that uses it, including the search-engine metadata and the structured
data.

Import from the folder, not from the individual files:

```ts
import { brand, CONDITIONS, MENU } from "@/constants";
```

## Which file holds what

| File | What to edit here |
| --- | --- |
| `brand.ts` | Clinic name, address, phone, email, tagline, the hero frame stack |
| `about.ts` | The about page: the story, the six operating commitments, the seven consultation readings |
| `contact.ts` | The contact page, the map embed and directions, the closing CTA band |
| `placeholders.ts` | Every fact not confirmed yet, and the photograph shoot list |
| `menu.ts` | The treatment menu: sections, groups, treatments, and how each is sold. **No figures — see below.** |
| `conditions.ts` | Medical dermatology — the twelve conditions, their descriptions and their icons |
| `cosmetic.ts` | Cosmetic dermatology — the ten treatment families, plus the service marked coming soon |
| `clinic.ts` | The clinicians, the four visit steps, the premises, the review slots, the contact block |
| `navigation.ts` | The header bar and its two dropdowns, the footer columns |
| `copy.ts` | Headings, ledes, the FAQs, the skincare page, and the search-engine descriptions and keywords, grouped by page |

## The rules that keep it honest

**There are no prices in here, and none should be added.** The service-offerings
meeting of 26 August 2026 took pricing off the site — the reasoning, the quotes
and the reversal condition are in the header of `menu.ts` and in the **Pricing**
section of `../../README.md`. The important mechanical point: a constant in this
folder is bundled and shipped to the browser, so a figure that is present but
never rendered is still published. Not displaying prices can only be honoured by
not carrying them.

**What `menu.ts` carries instead** is how each treatment is sold — single
session, course of 3/5/10/20, treated area, cc of product. Those are units, not
prices, and they are what a visitor needs to tell a one-off from a commitment.
`sectionOffering()` turns them into a phrase for the menu page;
`sectionOfferingShort()` into three words for the header dropdown.

**Names have to match.** A cosmetic family's `menuItems` are looked up against
`menu.ts` by exact string, and the family card counts them. Rename a treatment
on the menu and rename it in both places, or the card's count drifts from the
section it links into.

**Lists generate their own links.** Add a thirteenth condition to
`conditions.ts` and it appears on the home index, the medical page, the footer,
the search keywords and the structured data with no other edits. The same is
true of a cosmetic family and of a menu section.

**Placeholders are visible on purpose.** Everything in `placeholders.ts` renders
inside `[square brackets]` so an unfinished site never looks finished. When you
fill one in, delete the brackets from the string — the surrounding copy already
reads correctly with a real value in it. `photos` works the same way: a `src` of
`null` renders a labelled slot, and setting it to a real path turns that slot
into the photograph with no layout work.

**Do not invent.** Services, credentials, policies and patient reviews all come
from a source document in `../../../Resources` or from the meeting record, or
they are a bracketed placeholder. The review slots are empty for this reason:
the clinic has not opened, so there is nobody to quote yet.

**Modules import from siblings, never from the barrel.** `copy.ts` imports
`./menu`, not `.`, so `index.ts` can never become part of a cycle.

## Before launch

Two things in here need a human:

- `menu.ts` carries a note at the top: the treatment names are transcribed from
  `Resources/REVISED MENU OF GLO365 - 2025.pdf`, which is titled for another
  operator, and somebody has to confirm the menu is Mela Skin's own.
- `clinic.ts` publishes Dr. Margaret Gachanja's qualifications as she stated
  them on the 26 Aug call. Her bio, registration number and special interests
  are bracketed until she sends them, and she should see the page first.
