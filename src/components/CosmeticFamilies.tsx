import Link from "next/link";
import { COSMETIC, COSMETIC_PAGE, HOME } from "@/constants";
import { Icon } from "./icons";
import { TreatmentMedia } from "./TreatmentMedia";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Callout, Wrap } from "./ui";

/*
  Ten treatment families on a two-column grid, then the service that is not
  open yet as a full-width band beneath them. Spanning it is the point: a
  coming-soon note dropped into a grid cell reads as an afterthought, and the
  clinic has been asked about this one enough that it should not.

  Card anatomy is fixed — picture, name, one-line summary, the paragraph, and
  the treatments on the menu it covers. Ten cards of the same shape are
  scannable in a way that ten bespoke ones are not.

  The card foot used to carry a "from" price. It goes into the menu instead: the
  26 Aug 2026 meeting took pricing off the site, and handed the detail to the
  brochures at the clinic — which is what the callout above the grid says, once,
  rather than on all ten cards.
*/

export function CosmeticFamilies() {
  return (
    <section className="relative overflow-hidden bg-ms-paper py-20 lg:py-28">
      <PatternField tone="paper" />

      <Wrap className="relative">
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
                <div className="flex items-start gap-4">
                  <Icon
                    name={family.icon}
                    className="mt-1.5 shrink-0 text-ms-terracotta-deep"
                  />
                  <h2 className="font-display text-[1.75rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[2rem]">
                    {family.title}
                  </h2>
                </div>

                <p className="mt-5 font-display text-[19px] italic leading-[1.5] text-ms-terracotta-deep sm:text-[20px]">
                  {family.summary}
                </p>

                <p className="mt-6 font-sans text-[16.5px] font-light leading-[1.85] text-ms-espresso/85">
                  {family.body}
                </p>

                <div className="mt-8 border-t border-ms-bronze/20 pt-6">
                  <p className="eyebrow text-ms-bronze">{COSMETIC_PAGE.menuItemsLabel}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
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

          <StaggerItem
            as="article"
            y={28}
            id="coming-soon"
            className="scroll-mt-8 overflow-hidden rounded-[24px] border border-dashed border-ms-terracotta/45 bg-ms-cream/60 lg:col-span-2"
          >
            <div className="flex h-full flex-col justify-center gap-8 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:p-12">
              <div className="lg:max-w-[46ch]">
              <div className="flex items-center gap-3">
                <Sparkle width={12} height={24} fill="url(#ms-gold)" />
                <p className="eyebrow text-ms-terracotta-deep">
                  {HOME.comingSoon.eyebrow}
                </p>
              </div>

              <h2 className="mt-6 font-display text-[1.75rem] leading-[1.15] text-ms-cocoa sm:text-[2rem]">
                {HOME.comingSoon.title}
              </h2>

              <p className="mt-5 font-sans text-[16.5px] font-light leading-[1.85] text-ms-espresso/85">
                {HOME.comingSoon.body}
              </p>
              </div>

              <a
                href="/contact"
                className="inline-flex min-h-12 shrink-0 items-center gap-2 self-start rounded-full bg-ms-field px-8 lg:self-center font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-ms-ivory transition-colors hover:bg-ms-panel"
              >
                Ask to be told first
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </StaggerItem>
        </Stagger>
      </Wrap>
    </section>
  );
}
