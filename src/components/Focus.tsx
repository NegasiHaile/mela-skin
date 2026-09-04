import { HOME } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

/*
  First of the home page's shell/paper/cream rotation, `ms-shell` -- see the
  note on that rotation in app/page.tsx. Right under the hero, same as /about's
  opening section.
*/
export function Focus() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36">
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="display-caps text-[clamp(2.15rem,4vw,3.5rem)] text-ms-cocoa">
              <Lines text={HOME.focus.title} />
            </h2>
            <Reveal delay={0.25} className="mt-7">
              <p className="font-display text-[26px] italic leading-snug text-ms-terracotta-deep sm:text-[29px]">
                {HOME.focus.subtitle}
              </p>
            </Reveal>
          </div>

          <Stagger
            step={0.14}
            className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:pt-3"
          >
            {HOME.focus.paragraphs.map((paragraph) => (
              <StaggerItem
                as="p"
                key={paragraph.slice(0, 24)}
                className="font-sans text-[19px] font-light leading-[1.75] text-ms-espresso/80 sm:text-[20px]"
              >
                {paragraph}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Wrap>
    </section>
  );
}
