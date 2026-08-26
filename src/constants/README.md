# `src/constants` — everything the site says

All content lives here. No component hard-codes a price, a service name, a
heading or a paragraph — they read from these files. Change a value here and it
updates on every page that uses it, including the search-engine metadata and
the structured data.

Import from the folder, not from the individual files:

```ts
import { brand, CONDITIONS, MENU, kes } from "@/constants";
```

## Which file holds what

| File | What to edit here |
| --- | --- |
| `brand.ts` | Clinic name, address, phone, email, tagline, hero photographs |
| `placeholders.ts` | Every fact not confirmed yet — opening date, hours, consultation fee and length, clinician name and registration, KRA PIN |
| `menu.ts` | **Every price on the site.** The full treatment menu: sections, groups, items, session and course tiers |
| `conditions.ts` | Medical dermatology — the ten conditions, their descriptions and their icons |
| `cosmetic.ts` | Cosmetic dermatology — the ten treatment families, plus the service marked coming soon |
| `clinic.ts` | The clinicians, the four visit steps, the premises, the review slots, the contact block |
| `navigation.ts` | The header bar, the footer columns, the legal links |
| `copy.ts` | Headings, ledes, the pricing FAQ, and the search-engine descriptions and keywords, grouped by page |

## The rules that keep it honest

**Prices are typed once.** `menu.ts` is the only file in the codebase with a
figure in it. The home price band, the cosmetic cards, the page descriptions
and the JSON-LD all look their numbers up from it. If a card shows the wrong
price, the cause is a mismatched name — not a stale copy of the number.

**Names have to match.** A cosmetic family's `menuItems` and a home price
anchor's `item` are looked up against `menu.ts` by exact string. Rename an item
on the menu and rename it in both places, or the "from" price silently falls
back to zero.

**Lists generate their own links.** Add an eleventh condition to
`conditions.ts` and it appears on the home index, the medical page, the footer
and the search keywords with no other edits. The same is true of a cosmetic
family and of a menu section.

**Placeholders are visible on purpose.** Everything in `placeholders.ts`
renders inside `[square brackets]` so an unfinished site never looks finished.
When you fill one in, delete the brackets from the string — the surrounding
copy already reads correctly with a real value in it.

**Do not invent.** Prices, services, credentials, policies and patient reviews
all come from a source document in `../../../Resources`, or they are a bracketed
placeholder. The review slots are empty for this reason: the clinic has not
opened, so there is nobody to quote yet.

## Before launch

`menu.ts` carries a note at the top that needs a human decision: the prices are
transcribed from `Resources/REVISED MENU OF GLO365 - 2025.pdf`, and somebody has
to confirm that menu is Mela Skin's own. Amending or withdrawing the prices is
an edit to that one file.
