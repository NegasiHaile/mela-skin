import { HOME } from "@/constants";
import { Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Card, Inner, SectionLabel, Shell } from "./ui";

export function Focus() {
  return (
    <Shell>
      <Card className="mt-4 bg-ms-shell">
        <PatternField id="ed-focus" tone="shell" fade="left" scale={420} opacity={0.85} drift={36} />
        <Inner>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel index="01">Why Mela Skin</SectionLabel>
              <Reveal delay={0.12}>
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.14] tracking-[-0.012em] text-ms-cocoa">
                Deeper skin isn&rsquo;t harder to treat. It has simply been{" "}
                <em className="italic text-ms-clay">studied less</em>.
              </h2>
              </Reveal>
            </div>

            <Stagger step={0.14} className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:pt-3">
              {HOME.focus.paragraphs.map((paragraph) => (
                <StaggerItem
                  as="p"
                  key={paragraph.slice(0, 24)}
                  className="font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80"
                >
                  {paragraph}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
