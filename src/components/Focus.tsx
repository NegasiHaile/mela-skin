import { HOME } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

export function Focus() {
  return (
    <section className="relative overflow-hidden bg-ms-shell py-24 lg:py-36">
      <PatternField tone="shell" />

      <Wrap className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="display-caps text-[clamp(2.15rem,4vw,3.5rem)] text-ms-cocoa">
              <Lines text={HOME.focus.title} />
            </h2>
            <Reveal delay={0.25} className="mt-6">
              <p className="font-display text-[23px] italic leading-snug text-ms-terracotta-deep">
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
