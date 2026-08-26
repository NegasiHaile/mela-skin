import Link from "next/link";
import { CONDITIONS, COSMETIC, HOME, familyFrom, kes } from "@/constants";
import { Icon } from "./icons";
import { TreatmentMedia } from "./TreatmentMedia";
import { PatternField } from "./brand/PatternField";
import { DrawRule, Lift, Reveal, Stagger, StaggerItem } from "@/motion";
import { Lede, PillGhost, PillSolid, SectionHead, Wrap } from "./ui";

/*
  Both halves of the offering, in the two forms that suit them.

  Medical is an index — ten named conditions, one line each, straight through
  to the entry that explains it. Nobody browsing "is my psoriasis actually
  psoriasis" wants a carousel; they want to find the word and click it.

  Cosmetic is a rail of cards, because it is chosen rather than diagnosed and
  because every one of these carries a published price. All ten families are on
  the rail — a horizontal snap-scroll is built for exactly this, and leaving
  half of them off the home page to "keep it clean" only hides the cheapest
  ways into the clinic.

  Copy: constants/copy.ts → HOME.treatments. Lists: constants/conditions.ts
  and constants/cosmetic.ts. Figures: constants/menu.ts, looked up rather than
  typed, so this section cannot drift out of step with the menu page.
*/

const RAIL = COSMETIC;

function MedicalIndex() {
  return (
    <div>
      <Reveal y={18} className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="eyebrow text-ms-terracotta-deep">
          {HOME.treatments.medicalLabel}
        </h3>
        <Link
          href="/medical-dermatology"
          className="group inline-flex items-center gap-2 font-sans text-[12.5px] tracking-[0.02em] text-ms-bronze transition-colors hover:text-ms-cocoa"
        >
          {HOME.treatments.medicalLink}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </Reveal>

      <Stagger
        as="ul"
        step={0.06}
        delay={0.1}
        className="mt-9 grid gap-x-14 lg:mt-11 lg:grid-cols-2"
      >
        {CONDITIONS.map((condition) => (
          <StaggerItem as="li" key={condition.slug} y={20}>
            <Link
              href={`/medical-dermatology#${condition.slug}`}
              className="group flex items-start gap-5 border-t border-ms-bronze/20 py-6 transition-colors hover:border-ms-terracotta/45 sm:gap-6 sm:py-7"
            >
              <Icon
                name={condition.icon}
                className="mt-1 shrink-0 text-ms-terracotta-deep transition-colors group-hover:text-ms-clay"
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-3">
                  <span className="font-display text-[1.4rem] leading-[1.2] tracking-[-0.01em] text-ms-cocoa sm:text-[1.55rem]">
                    {condition.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-ms-bronze opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    &rarr;
                  </span>
                </span>
                <span className="mt-2.5 block font-sans text-[15.5px] font-light leading-[1.7] text-ms-espresso/75 sm:text-[16px]">
                  {condition.summary}
                </span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

/** Brand-ground tints for the cosmetic paper cards — primaries from the deck. */
const GROUNDS = [
  "from-ms-cream via-ms-cream to-ms-sand/85",
  "from-ms-ivory via-ms-cream/95 to-ms-sand/75",
  "from-ms-sand/90 via-ms-cream to-ms-ivory",
  "from-ms-cream via-ms-ivory/90 to-ms-sand/80",
] as const;

function CosmeticRail() {
  return (
    <div>
      <Reveal y={18} className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="eyebrow text-ms-terracotta-deep">
          {HOME.treatments.cosmeticLabel}
        </h3>
        <Link
          href="/cosmetic-dermatology"
          className="group inline-flex items-center gap-2 font-sans text-[12.5px] tracking-[0.02em] text-ms-bronze transition-colors hover:text-ms-cocoa"
        >
          {HOME.treatments.cosmeticLink}
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </Reveal>

      <div className="mt-10 -mb-6 lg:mt-12">
        <Stagger
          step={0.1}
          delay={0.12}
          className="scrollbar-hide -mr-6 flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-10 pt-4 pr-6 sm:-mr-10 sm:gap-5 sm:pr-10 lg:-mr-14 lg:pr-14"
          role="list"
          aria-label={HOME.treatments.cosmeticLabel}
        >
          {RAIL.map((family, index) => (
            <StaggerItem
              as="article"
              key={family.slug}
              y={34}
              role="listitem"
              className="flex w-[290px] shrink-0 snap-start sm:w-[320px]"
            >
              <Lift amount={10} className="w-full">
                <Link
                  href={`/cosmetic-dermatology#${family.slug}`}
                  className={`paper-notch grain group relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b ${GROUNDS[index % GROUNDS.length]} shadow-[4px_6px_0_0_rgba(198,114,44,0.18),0_20px_44px_-24px_rgba(49,24,10,0.32)] ring-1 ring-ms-bronze/25`}
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
                    image={family.image}
                    icon={family.icon}
                    title={family.title}
                    sizes="(max-width: 640px) 290px, 320px"
                    className="min-h-[14.5rem] shrink-0 border-b border-dashed border-ms-bronze/30 sm:min-h-[16rem]"
                  />

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <Icon
                        name={family.icon}
                        className="mt-0.5 shrink-0 text-ms-terracotta-deep"
                      />
                      <h4 className="display-caps text-[19px] leading-[1.18] text-ms-cocoa sm:text-[20px]">
                        {family.title}
                      </h4>
                    </div>

                    <p className="mt-4 flex-1 font-sans text-[15px] font-light leading-[1.72] text-ms-espresso/80 sm:text-[15.5px]">
                      {family.summary}
                    </p>

                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-ms-bronze/25 pt-4">
                      <span>
                        <span className="block font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ms-terracotta-deep">
                          From
                        </span>
                        <span className="mt-1 block font-display text-[1.4rem] leading-none text-ms-cocoa">
                          {kes(familyFrom(family))}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="pb-1 text-ms-bronze transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </Lift>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}

export function Treatments() {
  return (
    <section
      id="treatments"
      className="relative overflow-hidden bg-ms-paper py-28 lg:py-40"
    >
      <PatternField
        id="treatments"
        tone="paper"
        fade="top"
        scale={560}
        opacity={0.9}
        drift={56}
      />

      <Wrap className="relative">
        <div className="max-w-[760px]">
          <SectionHead title={HOME.treatments.title} />
          <Lede className="mt-7">{HOME.treatments.lede}</Lede>
        </div>

        <div className="mt-20 lg:mt-24">
          <MedicalIndex />

          <DrawRule className="my-20 h-px w-full bg-ms-bronze/20 lg:my-28" />

          <CosmeticRail />
        </div>

        <Reveal
          y={22}
          delay={0.1}
          className="mt-20 flex flex-col gap-8 rounded-[24px] border border-ms-bronze/25 bg-ms-shell/70 p-8 backdrop-blur-sm sm:p-10 lg:mt-24 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:p-12"
        >
          <div className="max-w-[46ch]">
            <p className="eyebrow text-ms-terracotta-deep">
              {HOME.comingSoon.eyebrow}
            </p>
            <h3 className="mt-5 font-display text-[1.9rem] leading-[1.15] text-ms-cocoa sm:text-[2.2rem]">
              {HOME.comingSoon.title}
            </h3>
            <p className="mt-4 font-sans text-[16.5px] font-light leading-[1.8] text-ms-espresso/80">
              {HOME.comingSoon.body}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3.5">
            <PillSolid href="/treatment-menu" className="min-h-13 px-8">
              Menu &amp; prices
            </PillSolid>
            <PillGhost href="#book" className="min-h-13 px-8">
              Ask a question
            </PillGhost>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
