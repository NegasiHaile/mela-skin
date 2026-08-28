import { HOME } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  THIS REPLACED THE PRICE BAND.

  Six figures used to sit here in display type, under the heading "Published,
  not on request". The 26 Aug 2026 meeting reversed that decision — see the
  header of constants/menu.ts for who said what — so the section that held the
  numbers now says what happens instead of them.

  It is not an apology for missing prices. Dr. Abseret Hailu asked for a section
  making the case for the consultative model (00:15:01: "we should have a
  section about … tailoring treatments directly to the patient, and for that
  it's best done through consultation"), and that is what this is: why there is
  no list, what you leave with instead, and the one thing a visitor most needs
  to know before ringing — that the cosmetic consultation is free and the
  medical one is not.

  Layout follows the band it replaced, because the page's rhythm depended on it:
  the argument on the left in a five-column measure, the three concrete answers
  ruled off down the right.

  It used to be set a stop darker than the field colour to keep four flooded
  bands from flattening into each other. That stop was Primary 1, which read as
  near-black, and the clinic asked for it to come back up — so this is the field
  colour now, and the rhythm is carried by what sits either side of it instead
  (paper above, shell below).

  Copy: constants/copy.ts → HOME.consult.
*/

export function Consultation() {
  return (
    <section
      id="consultation"
      className="relative overflow-hidden bg-ms-field py-24 lg:py-36"
    >
      <PatternField tone="field" />

      <Wrap className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={18}>
              <p className="eyebrow text-ms-gold">{HOME.consult.eyebrow}</p>
            </Reveal>

            <h2 className="display-caps mt-6 text-[clamp(2.15rem,4vw,3.4rem)] text-ms-ivory">
              <Lines text={HOME.consult.title} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[46ch] font-sans text-[18px] font-light leading-[1.8] text-ms-cream/80 lg:text-[19px]">
                {HOME.consult.lede}
              </p>
            </Reveal>

            <Stagger
              as="dl"
              step={0.11}
              delay={0.3}
              className="mt-11 flex flex-col gap-7 border-t border-ms-sand/20 pt-8"
            >
              {HOME.consult.notes.map((note) => (
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
              <PillSolid href="/contact" tone="dark" className="min-h-13 px-8">
                {HOME.consult.primary}
              </PillSolid>
              <PillGhost href="/treatment-menu" tone="dark" className="min-h-13 px-8">
                {HOME.consult.secondary}
              </PillGhost>
            </Reveal>
          </div>

          {/*
            The three tracks. `kind` is held out to the right in gold, where the
            price used to sit, because it answers the same question the price
            was being asked: what is this going to cost me to find out.
          */}
          <Stagger
            as="ul"
            step={0.09}
            delay={0.15}
            className="lg:col-span-6 lg:col-start-7"
          >
            {HOME.consult.tracks.map((track) => (
              <StaggerItem
                as="li"
                key={track.label}
                y={22}
                className="border-b border-ms-sand/20 py-7 first:border-t first:border-ms-sand/20 sm:py-9"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                  <span className="font-display text-[1.5rem] leading-[1.2] text-ms-ivory sm:text-[1.75rem]">
                    {track.label}
                  </span>
                  <span className="shrink-0 font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ms-gold">
                    {track.kind}
                  </span>
                </div>

                <p className="mt-3.5 max-w-[52ch] font-sans text-[15.5px] font-light leading-[1.75] text-ms-sand/80 sm:text-[16px]">
                  {track.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Wrap>
    </section>
  );
}
