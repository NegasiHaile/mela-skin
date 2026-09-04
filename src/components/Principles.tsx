import { ABOUT } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Stagger, StaggerItem } from "@/motion";
import { Lede, SectionHead, Wrap } from "./ui";

/*
  How the clinic operates, as six numbered commitments.

  Ruled entries rather than cards, for the same reason the medical index is:
  the cosmetic rail already owns the card language on this site, and a second
  thing in a box reads as the same thing twice.

  No icons either. The mark set in components/icons.tsx is a set of conditions
  and treatments, and hanging a skin-tag glyph next to "prices published in
  advance" says nothing true. The numbers carry the rhythm on their own.

  The sixth item is a bracketed question rather than a claim. Rooms, pain
  relief and cleaning protocol are exactly the sort of thing a clinic website
  asserts without checking, and exactly the sort of thing a patient notices is
  untrue on the day.

  Third of the page's shell/paper/cream rotation, `ms-cream` -- see the note
  on that rotation in app/page.tsx. It was the deepest of the four grounds the
  old continuous ramp offered until the skincare partners band came off at the
  1 Sep daily; cream is the deepest of the three the rotation uses now, so this
  is still where the page reads as settling before Assessment opens back up.
*/
export function Principles() {
  return (
    <section
      id="principles"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="max-w-[680px]">
          <SectionHead title={ABOUT.principles.title} />
          <Lede className="mt-7">{ABOUT.principles.lede}</Lede>
        </div>

        <Stagger
          as="ol"
          step={0.1}
          className="mt-14 grid gap-x-14 gap-y-11 lg:mt-16 lg:grid-cols-2"
        >
          {ABOUT.principles.items.map((item, index) => (
            <StaggerItem
              as="li"
              key={item.title}
              y={24}
              className="flex gap-5 border-t border-ms-bronze/25 pt-7 sm:gap-6"
            >
              <span
                aria-hidden="true"
                className="mt-[0.35rem] shrink-0 font-sans text-[11px] font-medium tracking-[0.2em] text-ms-terracotta-deep"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[1.6rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[1.8rem]">
                  {item.title}
                </h3>
                <p className="mt-4 font-sans text-[17.5px] font-light leading-[1.7] text-ms-espresso/80">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
