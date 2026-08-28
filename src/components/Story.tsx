import { ABOUT } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Stagger, StaggerItem } from "@/motion";
import { SectionHead, Wrap } from "./ui";

/*
  Why the clinic exists, in three paragraphs with one of them pulled out large.

  The middle paragraph is a bracketed placeholder: the founding story is the
  owner's to tell and inventing one would be the single worst thing to fake on
  a page like this.

  Content: constants/about.ts → ABOUT.story.
*/
export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-ms-shell py-24 lg:py-32"
    >
      <PatternField tone="shell" />

      <Wrap className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead title={ABOUT.story.title} />
            <p className="mt-8 max-w-[26ch] font-display text-[1.6rem] italic leading-[1.4] text-ms-terracotta-deep sm:text-[1.85rem]">
              {ABOUT.story.pull}
            </p>
          </div>

          <Stagger
            step={0.14}
            className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:pt-3"
          >
            {ABOUT.story.paragraphs.map((paragraph) => (
              <StaggerItem
                as="p"
                key={paragraph.slice(0, 24)}
                className="font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80"
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
