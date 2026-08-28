import { ABOUT } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { Callout, Wrap } from "./ui";

/*
  What a consultation actually examines.

  Set on the field colour, which makes it the one dark band between the story
  and the clinician and stops the about page reading as four light sections in
  a row. The three beats run across the top; the seven readings sit under them
  in two columns.

  Content and the reasoning behind it: constants/about.ts → ABOUT.assessment.
*/
export function Assessment() {
  return (
    <section
      id="assessment"
      className="relative overflow-hidden bg-ms-field py-24 lg:py-32"
    >
      <PatternField tone="field" />

      <Wrap className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal y={18}>
              <p className="eyebrow text-ms-gold">{ABOUT.assessment.eyebrow}</p>
            </Reveal>

            <h2 className="display-caps mt-6 text-[clamp(2.15rem,4vw,3.4rem)] text-ms-ivory">
              <Lines text={ABOUT.assessment.title} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-7 max-w-[46ch] font-sans text-[18px] font-light leading-[1.8] text-ms-cream/85 lg:text-[19px]">
                {ABOUT.assessment.lede}
              </p>
            </Reveal>

            <Stagger
              as="ol"
              step={0.11}
              delay={0.3}
              className="mt-11 flex flex-col gap-7 border-t border-ms-sand/25 pt-8"
            >
              {ABOUT.assessment.steps.map((step, index) => (
                <StaggerItem as="li" key={step.title} y={18} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="mt-[0.3rem] shrink-0 font-sans text-[11px] font-medium tracking-[0.2em] text-ms-gold"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.35rem] leading-[1.2] text-ms-ivory">
                      {step.title}
                    </span>
                    <span className="mt-2.5 block font-sans text-[15.5px] font-light leading-[1.75] text-ms-cream/80">
                      {step.body}
                    </span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal y={18} className="flex items-center gap-3">
              <Sparkle width={11} height={22} fill="url(#ms-gold)" />
              <h3 className="eyebrow text-ms-gold">
                {ABOUT.assessment.parametersTitle}
              </h3>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-5 max-w-[52ch] font-sans text-[16px] font-light leading-[1.8] text-ms-cream/80">
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
                  className="border-t border-ms-sand/20 py-6"
                >
                  <dt className="font-display text-[1.2rem] leading-[1.25] text-ms-ivory">
                    {parameter.title}
                  </dt>
                  <dd className="mt-2.5 font-sans text-[15px] font-light leading-[1.7] text-ms-cream/75">
                    {parameter.body}
                  </dd>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.25} className="mt-9">
              <Callout eyebrow="Still to confirm" tone="dark">
                {ABOUT.assessment.note}
              </Callout>
            </Reveal>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
