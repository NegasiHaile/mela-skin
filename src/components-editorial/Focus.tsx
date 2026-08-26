import { todo } from "@/constants";
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
              <StaggerItem as="p" className="font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80">
                Dermatology teaching images are overwhelmingly of white skin. On
                deeper complexions, inflammation reads violet or grey rather
                than red. It leaves pigment behind for months after the
                condition itself has cleared. Wounds that would flatten
                elsewhere raise into keloid. None of this is unusual &mdash; it
                is only under-taught, which is why so many patients arrive
                having already been told their condition was something else.
              </StaggerItem>
              <StaggerItem as="p" className="font-sans text-[16px] font-light leading-[1.88] text-ms-espresso/80">
                Mela Skin was built to close that gap. {todo.clinicianName}
                &rsquo;s practice is organised around the conditions that
                present most often, and most stubbornly, in melanin-rich skin
                &mdash; with the medical and cosmetic sides of that care under
                one roof, so a diagnosis and the treatment it calls for do not
                need two clinics.
              </StaggerItem>
            </Stagger>
          </div>
        </Inner>
      </Card>
    </Shell>
  );
}
