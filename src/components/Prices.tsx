import { HOME, fromPriceForItem, kes } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  Prices, on the home page, in figures large enough to read at arm's length.

  A clinic site that hides its pricing behind an enquiry form is making the
  visitor do the work, so this section exists to put six real numbers in front
  of them before they have committed to anything. Every figure is looked up
  from constants/menu.ts rather than typed here, so the home page cannot drift
  step with the menu page.

  Set on espresso rather than on the field colour: the page already floods
  ms-field at the hero, the clinician band and the booking band, and a fourth
  would flatten the rhythm. Terracotta clears AA on espresso and is used
  directly here.

  Copy and the six anchors: constants/copy.ts → HOME.prices. Each anchor names
  a menu item; the figure beside it is looked up from constants/menu.ts, never
  typed here.
*/

export function Prices() {
  return (
    <section
      id="prices"
      className="relative overflow-hidden bg-ms-espresso py-24 lg:py-36"
    >
      <PatternField
        id="prices"
        tone="espresso"
        fade="right"
        scale={480}
        opacity={0.8}
        drift={44}
      />

      <Wrap className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={18}>
              <p className="eyebrow text-ms-gold">{HOME.prices.eyebrow}</p>
            </Reveal>

            <h2 className="display-caps mt-6 text-[clamp(2.15rem,4vw,3.4rem)] text-ms-ivory">
              <Lines text={HOME.prices.title} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[46ch] font-sans text-[18px] font-light leading-[1.8] text-ms-cream/80 lg:text-[19px]">
                {HOME.prices.lede}
              </p>
            </Reveal>

            <Stagger
              as="dl"
              step={0.11}
              delay={0.3}
              className="mt-11 flex flex-col gap-7 border-t border-ms-sand/20 pt-8"
            >
              {HOME.prices.notes.map((note) => (
                <StaggerItem key={note.heading} y={18}>
                  <dt className="font-display text-[1.3rem] leading-[1.25] text-ms-ivory">
                    {note.heading}
                  </dt>
                  <dd className="mt-2.5 font-sans text-[15.5px] font-light leading-[1.75] text-ms-sand/85">
                    {note.body}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.4} className="mt-11 flex flex-wrap gap-3.5">
              <PillSolid href="/treatment-menu" tone="dark" className="min-h-13 px-8">
                The full menu
              </PillSolid>
              <PillGhost href="/contact" tone="dark" className="min-h-13 px-8">
                Book a consultation
              </PillGhost>
            </Reveal>
          </div>

          <Stagger
            as="ul"
            step={0.09}
            delay={0.15}
            className="lg:col-span-6 lg:col-start-7"
          >
            {HOME.prices.anchors.map((anchor) => (
              <StaggerItem
                as="li"
                key={anchor.item}
                y={22}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-ms-sand/20 py-7 first:border-t first:border-ms-sand/20 sm:py-8"
              >
                <span className="min-w-0">
                  <span className="block font-display text-[1.5rem] leading-[1.2] text-ms-ivory sm:text-[1.7rem]">
                    {anchor.item}
                  </span>
                  <span className="mt-2 block font-sans text-[14px] font-light leading-[1.6] text-ms-sand/75 sm:text-[14.5px]">
                    {anchor.note}
                  </span>
                </span>

                <span className="flex shrink-0 items-baseline gap-2.5">
                  {anchor.prefix ? (
                    <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ms-terracotta">
                      {anchor.prefix}
                    </span>
                  ) : null}
                  <span className="font-display text-[1.65rem] leading-none text-ms-gold sm:text-[1.95rem]">
                    {kes(fromPriceForItem(anchor.item))}
                  </span>
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Wrap>
    </section>
  );
}
