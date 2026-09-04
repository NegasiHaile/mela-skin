import Link from "next/link";
import { COSMETIC, COSMETIC_PAGE } from "@/constants";
import { TreatmentMedia } from "./TreatmentMedia";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Callout, Wrap } from "./ui";

/*
  Ten treatment families on a two-column grid.

  Card anatomy is fixed — picture, name, one-line summary, the paragraph, and
  the treatments on the menu it covers. Ten cards of the same shape are
  scannable in a way that ten bespoke ones are not.

  The card foot used to carry a "from" price. It goes into the menu instead: the
  26 Aug 2026 meeting took pricing off the site, and handed the detail to the
  brochures at the clinic — which is what the callout above the grid says, once,
  rather than on all ten cards.

  THE COMING-SOON BAND THAT USED TO CLOSE THIS GRID IS GONE, on request. Laser
  hair removal is still named on the site — an inert card on the home page's
  "Two halves of one clinic" and an unlinked row in the Dermatology dropdown,
  see constants/copy.ts -> HOME.pillars and constants/navigation.ts -> the
  Dermatology item's `comingSoon` — it just no longer gets a band of its own
  here. `COSMETIC_PAGE.comingSoon` came off with it; see constants/copy.ts.
*/

/*
  First of the page's shell/paper/cream rotation, `ms-shell` -- see the note on
  that rotation in app/page.tsx.
*/
export function CosmeticFamilies() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        {/*
          Aser Hailu, 00:33:50: "we can also have clinic brochures for the
          cosmetics / aesthetics stuff, so we don't need to publicise it on the
          website." Said once here rather than ten times below.
        */}
        <Reveal y={16} className="mb-12 lg:mb-14">
          <Callout eyebrow="Before the grid" className="max-w-[70ch]">
            {COSMETIC_PAGE.detailNote}
          </Callout>
        </Reveal>

        <Stagger step={0.09} className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {COSMETIC.map((family) => (
            <StaggerItem
              as="article"
              key={family.slug}
              y={28}
              id={family.slug}
              className="group scroll-mt-8 overflow-hidden rounded-[24px] border border-ms-bronze/20 bg-ms-shell/90"
            >
              <TreatmentMedia
                image={family.image}
                icon={family.icon}
                title={family.title}
                sizes="(max-width: 1024px) 100vw, 620px"
                className="min-h-[15rem] border-b border-ms-bronze/20 sm:min-h-[17rem]"
              />

              <div className="p-7 sm:p-9 lg:p-10">
                {/*
                  NO ICON BESIDE THE TITLE, same reasoning as the home grid: the
                  plate above this heading carries the identical mark at four
                  times the size. Two copies of one glyph, a centimetre apart.
                */}
                <h2 className="font-display text-[1.75rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[2rem]">
                  {family.title}
                </h2>

                <p className="mt-5 font-display text-[21px] italic leading-[1.45] text-ms-terracotta-deep sm:text-[23px]">
                  {family.summary}
                </p>

                <p className="mt-6 font-sans text-[17.5px] font-light leading-[1.7] text-ms-espresso/85">
                  {family.body}
                </p>

                <div className="mt-8 border-t border-ms-bronze/20 pt-6">
                  {/*
                    "On the menu" used to sit here in 12px tracked caps, ten
                    times down the page. The pills below are plainly the
                    treatments in the family, and the count already says so on
                    the home page's version of the same card, so the label was
                    ten repetitions of a word nothing needed.
                  */}
                  <ul className="flex flex-wrap gap-2">
                    {family.menuItems.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-ms-cream/80 px-4 py-2 font-sans text-[13.5px] font-light text-ms-espresso/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
                  <p className="font-sans text-[14px] font-light tracking-[0.01em] text-ms-espresso/65">
                    {family.menuItems.length} treatment
                    {family.menuItems.length === 1 ? "" : "s"} on the menu
                  </p>

                  {/*
                    The rule belongs to the words, not to the tap target. Put
                    it on the Link itself and a 44px-tall control leaves the
                    underline floating an inch below the text.
                  */}
                  <Link
                    href={`/treatment-menu#${family.menuSection}`}
                    className="group/link inline-flex min-h-11 items-center gap-2 font-sans text-[11.5px] font-medium uppercase tracking-[0.16em] text-ms-terracotta-deep transition-colors hover:text-ms-field"
                  >
                    <span className="border-b border-ms-terracotta/50 pb-1 transition-colors group-hover/link:border-ms-field">
                      See it on the menu
                    </span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover/link:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
