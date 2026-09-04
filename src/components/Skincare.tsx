import { SKINCARE_PAGE } from "@/constants";
import { TreatmentMedia } from "./TreatmentMedia";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { Callout, Lede, SectionHead, Wrap } from "./ui";

/*
  THE SKINCARE PAGE. The collection, then the routine, then the one warning.

  Asked for on 26 Aug 2026. Dr. Abseret Hailu, 00:17:24, laying out the site's
  structure: "we can have a skin care section as well. So eventually we're going
  to incorporate that, cuz we are planning on selling skincare products in the
  clinic. So that should also be on the website."

  SHAPE, from the reference sites the group walked through. Abseret, 00:44:13:
  "here they do skincare collection on the bottom, if you see. So there's a few
  different ways to incorporate it." Aser, same moment: "the last website had a
  skincare section … you can use that website to build the skin[care one]." And
  the Korean clinic site was the first reference sent at all.

  What those pages do is a collection — a grid of large square tiles on a light
  ground, a category and a name under each, and almost no prose. That is the
  first band here. The routine follows it, because until there is a shelf to
  sell from, the advice is the part of this page with anything in it.

  NOTHING IS INVENTED. Every product name is a bracketed placeholder; every
  category and every line under it is real and stays true whichever range ends
  up on the shelf. The tiles render the brand panel with the mark set large,
  which is the finish this site already uses for a photograph it is waiting on —
  no stock product photography goes in to fill the hole.

  Copy: constants/copy.ts → SKINCARE_PAGE.
*/

/*
  First of the page's shell/paper/cream rotation, `ms-shell` -- see the note on
  that rotation in app/page.tsx.
*/
export function Collection() {
  return (
    <section
      id="collection"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="max-w-[660px]">
          <SectionHead title={SKINCARE_PAGE.collectionTitle} />
          <Lede className="mt-7">{SKINCARE_PAGE.collectionLede}</Lede>
        </div>

        {/*
          Two up on a phone, four up from `lg`. Square tiles, which is what makes
          a collection read as a collection rather than as eight more cards —
          the rest of this site uses 3:2 media and a 24px radius, so the square
          is doing the distinguishing.
        */}
        <Stagger
          as="ul"
          step={0.07}
          className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-4"
        >
          {SKINCARE_PAGE.collection.map((item) => (
            <StaggerItem
              as="li"
              key={item.category}
              y={26}
              className="group overflow-hidden rounded-[20px] border border-ms-bronze/20 bg-ms-shell/85"
            >
              <TreatmentMedia
                icon={item.icon}
                title={item.category}
                sizes="(max-width: 640px) 45vw, 300px"
                className="aspect-square"
              />

              <div className="p-5 sm:p-6">
                <p className="eyebrow text-ms-terracotta-deep">{item.category}</p>
                <h3 className="mt-3.5 font-display text-[1.25rem] leading-[1.2] tracking-[-0.01em] text-ms-cocoa sm:text-[1.35rem]">
                  {item.name}
                </h3>
                <p className="mt-3 font-sans text-[15.5px] font-light leading-[1.65] text-ms-espresso/80">
                  {item.note}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}

/*
  Second of the page's shell/paper/cream rotation, `ms-paper` -- see the note
  on that rotation in app/page.tsx.
*/
export function Routine() {
  return (
    <section
      id="routine"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="max-w-[680px]">
          <SectionHead title={SKINCARE_PAGE.stepsTitle} />
          <Lede className="mt-7">{SKINCARE_PAGE.stepsLede}</Lede>
        </div>

        {/*
          Numbered, and an <ol>, because the order is the content: an active
          before a moisturiser is how a barrier gets wrecked, and sunscreen last
          in the morning is not a stylistic choice.
        */}
        <Stagger
          as="ol"
          step={0.12}
          className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
          {SKINCARE_PAGE.steps.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              y={24}
              className="border-t border-ms-bronze/25 pt-7"
            >
              <span className="font-display text-[2.4rem] font-light leading-none text-ms-terracotta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-caps mt-5 text-[21px] text-ms-cocoa">
                {step.title}
              </h3>
              <p className="mt-4 font-sans text-[17px] font-light leading-[1.7] text-ms-espresso/80">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal y={20} delay={0.15} className="mt-16 lg:mt-20">
          <Callout
            eyebrow={SKINCARE_PAGE.cautionEyebrow}
            className="max-w-[76ch]"
          >
            {SKINCARE_PAGE.caution}
          </Callout>
        </Reveal>
      </Wrap>
    </section>
  );
}
