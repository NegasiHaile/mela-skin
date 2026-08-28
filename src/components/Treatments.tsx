import Link from "next/link";
import { CONDITIONS, COSMETIC, HOME } from "@/constants";
import { Icon } from "./icons";
import { TreatmentMedia } from "./TreatmentMedia";
import { PatternField } from "./brand/PatternField";
import { DrawRule, Lift, Reveal, Stagger, StaggerItem } from "@/motion";
import { Lede, PillGhost, PillSolid, SectionHead, Wrap } from "./ui";

/*
  Both halves of the offering. Both scroll horizontally; neither looks like the
  other, and that is the point — a visitor should be able to tell which list
  they are in without reading the label.

    MEDICAL   two rows, five columns, column-major. Outlined cards on the
              paper ground, numbered, no photography. Reads as an index: a
              thing you scan for a word you already have in mind.

    COSMETIC  one row of paper cards with snipped corners, a photograph or a
              brand-ground panel, and how many treatments the family covers.
              Reads as a catalogue: a thing you browse without knowing what you
              want.

  Two rows for medical is not decoration. Twelve conditions in a single rail
  would put nine of them off-screen on a phone; stacked two deep, the same rail
  shows four at a time and takes half the horizontal distance to get through.

  Copy: constants/copy.ts → HOME.treatments. Lists: constants/conditions.ts and
  constants/cosmetic.ts. The cosmetic cards used to carry a "from" price; the
  26 Aug meeting took pricing off the site, so they carry the size of each
  family instead — see the header of constants/menu.ts.
*/

const RAIL = COSMETIC;

/** Shared by both rails so their labels and first cards line up. */
const GUTTER = "px-6 sm:px-10 lg:px-14";

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
    <div className={GUTTER}>
      <Reveal y={18} className="flex flex-wrap items-baseline justify-between gap-4">
        <h3 className="eyebrow text-ms-terracotta-deep">{label}</h3>
        <Link
          href={href}
          className="group inline-flex items-center gap-2 font-sans text-[12.5px] tracking-[0.02em] text-ms-bronze transition-colors hover:text-ms-cocoa"
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
    </div>
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

      {/*
        `grid-flow-col` with `grid-rows-2` fills down before it fills across, so
        the ten arrive in pairs — Acne/Eczema, then Melanoma/Melasma, and so on
        — and each column is one snap position. `auto-cols` sets the column
        width rather than the entries doing it, which is what keeps the two
        rows of rules aligned across the whole shelf.

        Square tiles on the brand terracotta at 18%, against the section's
        `ms-paper` ground. Bare type on the ground read as loose copy rather
        than as ten things you can click, and a hairline was not enough to hold
        an entry together.

        18% is the measured answer rather than a guess. It is the strongest
        tint that keeps every element clear of WCAG AA on the fill: the title
        at 9.99:1, the summary at 7.13:1 and the index numeral at 4.98:1. Hover
        deepens to 26%, where the numeral still holds 4.53:1. Cream was tried
        first and sits 1.17:1 off the paper, which is why it disappeared.

        Square is the point. The cosmetic rail below uses notched corners and a
        drop shadow, the pillar cards above use a 24px radius, and the condition
        cards on /medical-dermatology use one too. A hard-edged tinted block is
        the one card shape this site was not already using, so these still read
        as their own thing rather than as a fourth variation on the same card.

        Tracks are `minmax(19rem, 1fr)`, not a fixed width. Below about 1600px
        the ten cannot fit, so the tracks sit at their 19rem minimum and the
        shelf scrolls; above it they grow into the spare width instead of
        bunching against the left edge with dead space to the right. One
        declaration covers both, because `fr` only has free space to hand out
        once the minimum is satisfied.
      */}
      <div className="mt-9 lg:mt-11">
        <Stagger
          as="ul"
          step={0.06}
          delay={0.1}
          className={`scrollbar-hide grid snap-x snap-mandatory auto-cols-[minmax(16.5rem,1fr)] grid-flow-col grid-rows-2 gap-3 overflow-x-auto scroll-p-6 sm:auto-cols-[minmax(19rem,1fr)] sm:scroll-p-10 lg:scroll-p-14 ${GUTTER}`}
          aria-label={HOME.treatments.medicalLabel}
        >
          {CONDITIONS.map((condition, index) => (
            <StaggerItem as="li" key={condition.slug} y={22} className="snap-start">
              <Link
                href={`/medical-dermatology#${condition.slug}`}
                className="group flex h-full gap-4 bg-ms-terracotta/18 p-5 transition-colors duration-500 hover:bg-ms-terracotta/26 sm:gap-5 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.4rem] shrink-0 font-sans text-[11px] font-medium tracking-[0.2em] text-ms-terracotta-deep"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="flex items-start justify-between gap-3">
                    {/*
                      Two lines held open whether the name needs them or not.
                      "Melanoma & mole checks" wraps and "Acne" does not, and
                      without the reserve their summaries start at different
                      heights across the same row — which is exactly the ragged
                      edge a ruled index exists to avoid.
                    */}
                    <span className="min-h-[2.4em] font-display text-[1.35rem] leading-[1.2] tracking-[-0.01em] text-ms-cocoa transition-colors group-hover:text-ms-terracotta-deep sm:text-[1.5rem]">
                      {condition.title}
                    </span>
                    <Icon
                      name={condition.icon}
                      className="mt-0.5 shrink-0 text-ms-bronze transition-colors group-hover:text-ms-terracotta"
                    />
                  </span>

                  <span className="mt-3 block font-sans text-[14.5px] font-light leading-[1.7] text-ms-espresso/80 sm:text-[15px]">
                    {condition.summary}
                  </span>

                  {/*
                    The tile gives no other sign that it goes anywhere. It
                    holds its row whether shown or not — `opacity-0` rather
                    than `hidden` — so revealing it on hover moves nothing.
                    `mt-auto` pins it to the bottom, and because grid rows are
                    equal height the arrows line up across the shelf.
                  */}
                  <span
                    aria-hidden="true"
                    className="mt-auto flex justify-end pt-4 font-sans text-[15px] leading-none text-ms-terracotta-deep opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
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

/*
  Both rails run the full width of the viewport rather than the width of the
  1320px content column the rest of the section sits in. They keep the column's
  own gutter as their padding, so on anything narrower than 1320px nothing
  moves at all — the labels and the first cards land exactly where they always
  did. Past that width the rails widen, which is the point: capped at the
  column they would waste half a large monitor.

  GUTTER is shared between every label row and every scroller deliberately. If
  they drift apart the first card stops lining up under its heading, and that
  is the one alignment in this section anybody would notice.

  `scroll-p-*` matches the padding so a snapped card comes to rest against the
  gutter rather than against the edge of the screen.
*/

function CosmeticRail() {
  return (
    <div className="relative">
      <RailHead
        label={HOME.treatments.cosmeticLabel}
        href="/cosmetic-dermatology"
        cta={HOME.treatments.cosmeticLink}
      />

      <div className="mt-10 -mb-6 lg:mt-12">
        <Stagger
          step={0.1}
          delay={0.12}
          className={`scrollbar-hide flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto scroll-p-6 pb-10 pt-4 sm:gap-5 sm:scroll-p-10 lg:scroll-p-14 ${GUTTER}`}
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
                  className={`paper-notch grain group relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b ${GROUNDS[index % GROUNDS.length]} shadow-[4px_6px_0_0_rgba(153,87,29,0.18),0_20px_44px_-24px_rgba(44,25,11,0.32)] ring-1 ring-ms-bronze/25`}
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
                          On the menu
                        </span>
                        <span className="mt-1 block font-display text-[1.4rem] leading-none text-ms-cocoa">
                          {family.menuItems.length} treatment
                          {family.menuItems.length === 1 ? "" : "s"}
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
      <PatternField tone="paper" />

      {/*
        The head and the closing band stay in the 1320px column; the two rails
        and the rule between them run edge to edge. That is why this is a run
        of siblings rather than one `Wrap` around everything — a rail cannot
        reach the edges of the screen from inside a centred column.
      */}
      <Wrap className="relative">
        <div className="max-w-[760px]">
          <SectionHead title={HOME.treatments.title} />
          <Lede className="mt-7">{HOME.treatments.lede}</Lede>
        </div>
      </Wrap>

      <div className="mt-20 lg:mt-24">
        <MedicalShelf />
      </div>

      <div className={`relative my-20 lg:my-28 ${GUTTER}`}>
        <DrawRule className="h-px w-full bg-ms-bronze/20" />
      </div>

      <CosmeticRail />

      <Wrap className="relative">
        <Reveal
          y={22}
          delay={0.1}
          className="mt-20 flex flex-col gap-8 rounded-[24px] border border-ms-bronze/25 bg-ms-shell/80 p-8 sm:p-10 lg:mt-24 lg:flex-row lg:items-center lg:justify-between lg:gap-14 lg:p-12"
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
              The treatment menu
            </PillSolid>
            <PillGhost href="/contact" className="min-h-13 px-8">
              Ask a question
            </PillGhost>
          </div>
        </Reveal>
      </Wrap>
    </section>
  );
}
