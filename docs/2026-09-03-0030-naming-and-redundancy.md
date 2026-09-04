# 3 Sep 2026 — one word per concept

> Can we also change the title name for this "What we treat / One list is what
> people arrive worried about…" also the description if neccessary. Because i
> believe we are not using names properly. We are using treatment for both
> medica and cosmotic dematologies and the treatment menu. Please find right
> names for all fo them acrros the app. And pelase avoide redundency between
> pages. We are doing last time review for production

The diagnosis was right. "Treatment" was naming three different things at three
different sizes, and the home page's heading was false of half of what sat under
it.

## The vocabulary

| word | what it means | where it lives | how many |
| --- | --- | --- | --- |
| **condition** | what the patient arrives with | `/medical-dermatology` | 12 |
| **treatment** | what the clinic does, described by family | `/cosmetic-dermatology` | 10 families |
| **service** | one named, individually sold item | the menu | 58 |

Each of the three pages now names its own unit and nothing else's. Before, all
three said "treatment", so "what we treat", "treatment families" and "treatment
menu" were one word at three granularities and no page's name told you which
size of thing it held.

## The heading that prompted it

**"What we treat" → "Conditions and treatments".**

It was not true. The medical list is twelve conditions the clinic treats; the
cosmetic list is ten families of treatment it offers, and nobody arrives with a
filler. The section's own lede has always said so — "one list is what people
arrive worried about, the other is what they arrive wanting" — so the heading
was contradicted one line below itself.

**The lede is unchanged, deliberately.** It explains *why* there are two lists,
which the new heading does not attempt; and a heading that named the two things
plus a lede that named them again would be the redundancy this pass is for.

The new heading is also where the vocabulary is taught: the two reserved words
appear together at the top of the section, and the two list labels under it
repeat the pairing.

## Every rename

| where | was | now |
| --- | --- | --- |
| home section heading | What we treat | **Conditions and treatments** |
| home medical link | All 12 in detail | **All 12 conditions** |
| home cosmetic link | Every treatment family | **All 10 treatment families** |
| nav item | Treatment menu | **Service menu** |
| nav dropdown, footer | All 58 treatments | **All 58 services** |
| nav dropdown row meta | 12 treatments | **12 services** (and it pluralises now) |
| footer column heading | Treatment menu | **Service menu** |
| footer cosmetic link | Every treatment | **All 10 families** |
| `<title>` on the menu | Treatment menu | **Service menu** |
| menu page eyebrow | Treatment menu | **Service menu** |
| menu counts line | 58 treatments across 5 sections | **58 services across 5 sections** |
| menu section header | 18 treatments | **18 services** |
| menu table column | Treatment | **Service** |
| menu table caption | Every treatment on the… menu | **Every service on the… menu** |
| cosmetic page stat | Treatments on the menu | **Services on the menu** |
| four CTA buttons | Treatment menu / The treatment menu | **Service menu / The service menu** |
| meta descriptions | 58 treatments across 10 families | **58 services across 10 treatment families** |

**`*Keywords` arrays are deliberately untouched.** "dermatology treatments
Nairobi" and "acne treatment Nairobi" are queries people type, not labels the
site wears. The opening phrase of each meta description stays for the same
reason; only the parts that count things follow the vocabulary.

**Generic English stays too.** "No treatment you do not need", "antifungal
treatment for something that is not fungal", "a treatment is sized to the person
having it" — a treatment is a thing a clinic does, and that is what these mean.
The rule is about *names*, not about banning a word.

## The redundancy

**The pricing model was stated four times.** Now twice, with different jobs:

| | before | after |
| --- | --- | --- |
| `HOME.consult` "Tailored first, quoted second" | a whole home section | **deleted** — it was already off the page at the 1 Sep daily and the constant sat unrendered until this review |
| `MENU_PAGE.lede` | "No prices: what one costs depends on how much of it your skin needs…" | **removed from the lede**, which now points at the cosmetic page instead of duplicating it |
| `MENU_PAGE.rules → Costs` | "Quoted in writing at your consultation…" | **deleted** — the first FAQ question on the same page answers it properly, and "How to read it" should hold reading instructions |
| `COSMETIC_PAGE.closingLede` | argues the model | **kept** — the end of the browsable list is where it belongs |
| `MENU_PAGE.faq[0]` | "Why are there no prices on this page?" | **kept** — the direct question, on the page where the column is missing |

**Two pages were describing themselves in the same words.** Both ledes said
"what they do to the skin": the cosmetic page about its families, the menu about
its sections. The menu's lede now cross-references rather than repeats — "what
each family of treatments actually does to skin is on the cosmetic dermatology
page; this is the list" — which also states the one thing neither page said
before: how the two differ.

## Left for the clinic to decide

**The route is still `/treatment-menu`.** Everything a visitor reads says
"Service menu", but the URL does not, and a URL is the one name that is awkward
to change after launch rather than before it. Renaming it to `/service-menu`
touches 19 references plus the sitemap, and a redirect keeps any link already
shared alive. It is a ten-minute change and it is the clinic's call, because the
clinic may have printed or sent the current one.
