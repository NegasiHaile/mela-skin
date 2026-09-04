import Link from "next/link";
import { CONDITIONS, MENU, HOME, sectionItemCount } from "@/constants";
import { Icon } from "./icons";
import { PatternField } from "./brand/PatternField";
import { TreatmentMedia } from "./TreatmentMedia";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Lede, SectionHead, Wrap } from "./ui";

/*
  Both halves of the offering, standard page width, each rail scrolling
  horizontally inside it.

    MEDICAL   twelve cards, two rows deep, name + one-line summary + mark.
              Each links straight to that condition's own entry on
              /medical-dermatology.

    COSMETIC  the five menu categories, not the ten families
              /cosmetic-dermatology carries -- each links straight into its
              own slice of /treatment-menu.

  Copy: constants/copy.ts → HOME.treatments. Lists: constants/conditions.ts and
  constants/menu.ts.
*/

function RailHead({
  label,
  href,
  cta,
}: {
  label: string;
  href: string;
  cta: string;
}) {
  return (
    <Reveal y={18} className="flex flex-wrap items-baseline justify-between gap-4">
      <h3 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[1.7rem]">
        {label}
      </h3>
      <Link
        href={href}
        className="group inline-flex items-center gap-2 font-sans text-[12.5px] tracking-[0.02em] text-ms-terracotta-deep transition-colors hover:text-ms-cocoa"
      >
        {cta}
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </Link>
    </Reveal>
  );
}

function MedicalShelf() {
  return (
    <div className="relative">
      <RailHead
        label={HOME.treatments.medicalLabel}
        href="/medical-dermatology"
        cta={HOME.treatments.medicalLink}
      />

      {/* Two rows deep -- `grid-flow-col` fills top-to-bottom before starting
          a new column, so twelve cards make six columns of two rather than
          one long row of twelve. Standard page width, scrolling within it. */}
      <div className="mt-9 overflow-x-auto scrollbar-hide lg:mt-11">
        <Stagger
          as="ul"
          step={0.04}
          delay={0.1}
          className="grid grid-flow-col grid-rows-2 gap-3 pb-2"
          aria-label={HOME.treatments.medicalLabel}
        >
          {CONDITIONS.map((condition) => (
            <StaggerItem
              as="li"
              key={condition.slug}
              y={22}
              className="w-[240px] sm:w-[260px]"
            >
              <Link
                href={`/medical-dermatology#${condition.slug}`}
                className="group flex h-full flex-col bg-ms-terracotta/14 p-5 transition-colors duration-300 hover:bg-ms-terracotta/20"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-[1.35rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa transition-colors group-hover:text-ms-terracotta-deep">
                    {condition.title}
                  </span>
                  <Icon
                    name={condition.icon}
                    className="mt-0.5 shrink-0 text-ms-terracotta-deep/65 transition-colors group-hover:text-ms-terracotta"
                  />
                </span>
                <span className="mt-3 block font-sans text-[14.5px] font-light leading-[1.6] text-ms-espresso/80">
                  {condition.summary}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

/**
 * Brand-ground tints for the cosmetic paper cards — primaries from the deck.
 * Four grounds cycling across five cards, so the fifth repeats the first.
 */
const GROUNDS = [
  "from-ms-shell via-ms-shell to-ms-cream",
  "from-ms-ivory via-ms-paper to-ms-cream/90",
  "from-ms-paper via-ms-shell to-ms-cream",
  "from-ms-shell via-ms-paper to-ms-cream/95",
] as const;

function CosmeticRail() {
  return (
    <div className="relative">
      <RailHead
        label={HOME.treatments.cosmeticLabel}
        href="/treatment-menu"
        cta={HOME.treatments.cosmeticLink}
      />

      {/*
        EVERY CARD GOES STRAIGHT TO ITS OWN SLICE OF /treatment-menu, not to
        /cosmetic-dermatology. This rail's job is pointing a visitor who
        already knows roughly what they want at the priced list; the
        family-by-family explanation that page carries is one click away from
        there for anyone who wants it, or from the header nav.
      */}
      <div className="mt-10 overflow-x-auto scrollbar-hide pb-4 pt-4 lg:mt-12">
        <Stagger
          step={0.08}
          delay={0.12}
          className="flex gap-5 lg:gap-6"
          role="list"
          aria-label={HOME.treatments.cosmeticLabel}
        >
          {MENU.map((section, index) => (
            <StaggerItem
              as="article"
              key={section.id}
              y={34}
              role="listitem"
              className="w-[280px] shrink-0 sm:w-[300px]"
            >
              <Link
                href={`/treatment-menu#${section.id}`}
                className={`paper-notch grain group relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b ${GROUNDS[index % GROUNDS.length]} shadow-[4px_6px_0_0_rgba(153,87,29,0.18),0_20px_44px_-24px_rgba(44,25,11,0.32)] ring-1 ring-ms-bronze/25 transition-transform duration-300 hover:-translate-y-1`}
              >
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-0 z-20 size-[18px] bg-ms-terracotta/25"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 z-20 size-[18px] bg-ms-bronze/35"
                  style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }}
                />

                <TreatmentMedia
                  icon={section.icon}
                  title={section.title}
                  sizes="300px"
                  className="min-h-[14.5rem] shrink-0 border-b border-dashed border-ms-bronze/30 sm:min-h-[16rem]"
                />

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h4 className="display-caps text-[19px] leading-[1.18] text-ms-cocoa sm:text-[20px]">
                    {section.title}
                  </h4>

                  <p className="mt-4 flex-1 font-sans text-[15px] font-light leading-[1.72] text-ms-espresso/80 sm:text-[15.5px]">
                    {section.blurb}
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-3 border-t border-ms-bronze/25 pt-4">
                    <span className="font-display text-[1.35rem] leading-none text-ms-cocoa">
                      {sectionItemCount(section)} on the menu
                    </span>
                    <span
                      aria-hidden="true"
                      className="pb-1 text-ms-terracotta-deep/65 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

/*
  Third of the page's shell/paper/cream rotation, `ms-cream` -- see the note on
  that rotation in app/page.tsx.

  STANDARD PAGE WIDTH, ON REQUEST -- back inside `Wrap`'s 1320px column, same
  as every other section. Both rails keep the horizontal scroll: each one's
  card row is `overflow-x-auto` on its own, so it scrolls within the column
  rather than bleeding past it.
*/
export function Treatments() {
  return (
    <section
      id="treatments"
      className="relative overflow-hidden py-28 lg:py-40"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <SectionHead title={HOME.treatments.title} />
        <Lede className="mt-7">{HOME.treatments.lede}</Lede>

        <div className="mt-20 lg:mt-24">
          <MedicalShelf />
        </div>

        <div aria-hidden="true" className="h-32 lg:h-44" />

        <CosmeticRail />
      </Wrap>
    </section>
  );
}
