import Link from "next/link";
import { HOME } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lift, Stagger, StaggerItem } from "@/motion";
import { Lede, SectionHead, Wrap } from "./ui";

/*
  The three-part shape the clinic set out for itself in more-info.md: medical,
  cosmetic, and the one service that is not open yet.

  THE CARD SAYS WHAT IT IS FIRST. The subject used to be a 12px tracked-caps
  kicker over the top of the card with a phrase about it set as the heading —
  "Medical dermatology" in small print above "Diagnosed first" — which is the
  wrong way round twice over: the reader wants the subject, and a tracked-caps
  kicker over a display heading is the most recognisable tell of a generated
  layout (1 Sep: the small titles "makes it AI generated UI"). The subject is the
  heading now and the phrase is an italic Larken line under it, which is the same
  relationship the focus band's title and subtitle have.

  This section orients rather than informs — forty words a card, then out to
  the page that carries the detail. The treatment section below it is where the
  actual conditions live. Keeping those two jobs apart is what stops the home
  page turning into a directory of everything at once.

  Second of the page's shell/paper/cream rotation, so `ms-paper` -- see the
  note on that rotation in app/page.tsx. The cards went from `bg-ms-shell/90`
  to solid shell and their hairline from bronze/20 to /30: the ground moved a
  step closer to them, and a card has to stay a shade lighter than what it is
  lying on.

  SQUARE, as of 1 Sep. The 24px radius went, and with it the last rounded panel
  on the home page: the treatment tiles below are hard-edged, the cosmetic cards
  are notched, and a third corner treatment in the same scroll was two too many.
  A square sheet with a hairline and a lift on hover reads as stationery, which
  is what the rest of this brand is built out of.

  Copy: constants/copy.ts → HOME.pillars.
*/
export function Pillars() {
  return (
    <section
      id="care"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="max-w-[720px]">
          <SectionHead title={HOME.pillars.title} />
          <Lede className="mt-7">{HOME.pillars.lede}</Lede>
        </div>

        <Stagger
          step={0.13}
          className="mt-16 grid gap-5 sm:gap-6 lg:mt-20 lg:grid-cols-3"
        >
          {HOME.pillars.cards.map((pillar) => {
            /*
              THE LASER HAIR REMOVAL CARD HAS NO `href`. Its destination band
              came off /cosmetic-dermatology on request, so it has nowhere left
              to send anyone — see the note beside it in constants/copy.ts.
              Rather than link it to a dead anchor, it renders as a plain
              `<div>` here: same card, same copy, no hover border and no CTA
              arrow, because neither should promise a click that goes nowhere.
            */
            const card = (
              <>
                <h3 className="font-display text-[1.9rem] leading-[1.12] tracking-[-0.01em] text-ms-cocoa sm:text-[2.15rem]">
                  {pillar.eyebrow}
                </h3>

                <p className="mt-4 font-display text-[1.15rem] italic leading-[1.4] text-ms-terracotta-deep sm:text-[1.3rem]">
                  {pillar.title}
                </p>

                <p className="mt-6 flex-1 font-sans text-[17.5px] font-light leading-[1.7] text-ms-espresso/80">
                  {pillar.body}
                </p>

                <div className="mt-8 flex items-center justify-between gap-4 border-t border-ms-bronze/20 pt-5">
                  <span className="font-sans text-[13px] font-light tracking-[0.02em] text-ms-espresso/70">
                    {pillar.count}
                  </span>
                  {pillar.cta ? (
                    <span className="inline-flex items-center gap-2 font-sans text-[11.5px] font-medium uppercase tracking-[0.16em] text-ms-cocoa">
                      {pillar.cta}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </span>
                  ) : null}
                </div>
              </>
            );

            return (
              <StaggerItem as="article" key={pillar.eyebrow} y={30}>
                <Lift amount={8} className="h-full">
                  {pillar.href ? (
                    <Link
                      href={pillar.href}
                      className="group flex h-full flex-col border border-ms-bronze/30 bg-ms-shell p-7 transition-colors duration-500 hover:border-ms-terracotta/45 sm:p-9"
                    >
                      {card}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col border border-ms-bronze/30 bg-ms-shell p-7 sm:p-9">
                      {card}
                    </div>
                  )}
                </Lift>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Wrap>
    </section>
  );
}
