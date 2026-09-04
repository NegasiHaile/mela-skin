import { ABOUT } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Stagger, StaggerItem } from "@/motion";
import { SectionHead, Wrap } from "./ui";

/*
  Why the clinic exists, in three paragraphs with one of them pulled out large.

  ALL THREE ARE STATED FACT NOW, not one of them still bracketed: the middle
  paragraph was a placeholder for a while (the founding story is the owner's
  to tell, and inventing one would be the single worst thing to fake on a page
  like this), until the deal announcement deck's own facility details filled
  it in. What is still genuinely missing -- WHO started the clinic, in the
  founder's own voice -- was never this paragraph; see the note on
  constants/about.ts -> ABOUT.story for where that stands.

  FIRST OF THE PAGE'S THREE-TONE ROTATION, `ms-shell` -- see the note on the
  rotation in app/page.tsx. It is the same flood the home page opens its own
  rotation with, right under the hero.

  Content: constants/about.ts → ABOUT.story.
*/
export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHead title={ABOUT.story.title} />
            <p className="mt-8 max-w-[24ch] font-display text-[1.8rem] italic leading-[1.35] text-ms-terracotta-deep sm:text-[2.1rem]">
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
