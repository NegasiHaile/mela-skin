import { ABOUT } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { Callout, Wrap } from "./ui";

/*
  What a consultation actually examines. The three beats run across the top; the
  seven readings sit under them in two columns.

  A LIGHT SECTION SINCE 31 AUG. It was `ms-field` — the one flooded content band
  on /about, with a light section either side of it, which is exactly the
  alternation the dermatology team objected to. Nothing on a page is flooded now
  except the footer.

  FOURTH OF THE PAGE'S SHELL/PAPER/CREAM ROTATION, back to `ms-shell` -- see the
  note on that rotation in app/page.tsx. It used to take `ms-linen`, the deepest
  of the old four-step ramp, specifically because this is where the page changes
  subject -- the bands before it are the clinic describing itself, this one is
  the first that is about your appointment -- and the warmest, most enclosed
  ground was picked to match. The rotation traded that particular signal for a
  simpler rule applied everywhere; if the subject change ever needs marking
  again, this is the section to pull out of strict rotation.

  Content and the reasoning behind it: constants/about.ts → ABOUT.assessment.
*/
export function Assessment() {
  return (
    <section
      id="assessment"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="display-caps text-[clamp(2.15rem,4vw,3.4rem)] text-ms-cocoa">
              <Lines text={ABOUT.assessment.title} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[42ch] font-sans text-[20px] font-light leading-[1.65] text-ms-espresso/80 lg:text-[22px]">
                {ABOUT.assessment.lede}
              </p>
            </Reveal>

            <Stagger
              as="ol"
              step={0.11}
              delay={0.3}
              className="mt-11 flex flex-col gap-7 border-t border-ms-bronze/30 pt-8"
            >
              {ABOUT.assessment.steps.map((step, index) => (
                <StaggerItem as="li" key={step.title} y={18} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.3rem] shrink-0 font-sans text-[11px] font-medium tracking-[0.2em] text-ms-terracotta-deep"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.5rem] leading-[1.15] text-ms-cocoa">
                      {step.title}
                    </span>
                    <span className="mt-3 block font-sans text-[16.5px] font-light leading-[1.7] text-ms-espresso/80">
                      {step.body}
                    </span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal y={18}>
              <h3 className="font-display text-[1.5rem] leading-[1.15] tracking-[-0.01em] text-ms-cocoa sm:text-[1.7rem]">
                {ABOUT.assessment.parametersTitle}
              </h3>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[48ch] font-sans text-[17px] font-light leading-[1.7] text-ms-espresso/80">
                {ABOUT.assessment.parametersLede}
              </p>
            </Reveal>

            <Stagger
              as="dl"
              step={0.07}
              delay={0.2}
              className="mt-9 grid gap-x-12 sm:grid-cols-2"
            >
              {ABOUT.assessment.parameters.map((parameter) => (
                <StaggerItem
                  key={parameter.title}
                  y={20}
                  className="border-t border-ms-bronze/30 py-6"
                >
                  <dt className="font-display text-[1.35rem] leading-[1.2] text-ms-cocoa">
                    {parameter.title}
                  </dt>
                  <dd className="mt-2.5 font-sans text-[16px] font-light leading-[1.65] text-ms-espresso/80">
                    {parameter.body}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.25} className="mt-9">
              <Callout eyebrow="Still to confirm">
                {ABOUT.assessment.note}
              </Callout>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
