import { todo } from "@/lib/brand";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal, Stagger, StaggerItem } from "@/motion";
import { Wrap } from "./ui";

export function Focus() {
  return (
    <section className="relative overflow-hidden bg-ms-shell py-24 lg:py-36">
      <PatternField
        id="focus"
        tone="shell"
        fade="left"
        scale={520}
        opacity={0.85}
        drift={48}
      />

      <Wrap className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="display-caps text-[clamp(2.15rem,4vw,3.5rem)] text-ms-cocoa">
              <Lines text={"Deeper skin isn’t harder to treat"} />
            </h2>
            <Reveal delay={0.25} className="mt-6">
              <p className="font-display text-[23px] italic leading-snug text-ms-terracotta-deep">
                It has simply been studied less.
              </p>
            </Reveal>
          </div>

          <Stagger
            step={0.14}
            className="flex flex-col gap-6 lg:col-span-6 lg:col-start-7 lg:pt-3"
          >
            <StaggerItem as="p" className="font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
              Dermatology teaching images are overwhelmingly of white skin. On
              deeper complexions, inflammation reads violet or grey rather than
              red. It leaves pigment behind for months after the condition
              itself has cleared. Wounds that would flatten elsewhere raise into
              keloid. None of this is unusual &mdash; it is only under-taught,
              which is why so many patients arrive having already been told
              their condition was something else.
            </StaggerItem>
            <StaggerItem as="p" className="font-sans text-[17px] font-light leading-[1.85] text-ms-espresso/80">
              Mela Skin was built to close that gap. {todo.clinicianName}&rsquo;s
              practice is organised around the conditions that present most
              often, and most stubbornly, in melanin-rich skin &mdash; with the
              medical and cosmetic sides of that care under one roof, so a
              diagnosis and the treatment it calls for do not need two clinics.
            </StaggerItem>
          </Stagger>
        </div>
      </Wrap>
    </section>
  );
}
