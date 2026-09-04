import { VISIT_STEPS } from "@/constants";
import { Lift, Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Card, Inner, SectionLabel, Shell } from "./ui";

/* Content: constants/clinic.ts → VISIT_STEPS. */
export function Visit() {
  return (
    <Shell>
      <Card id="visit" className="mt-4 bg-ms-sand/35">
        <PatternField tone="sand" />
        <Inner>
          <div className="max-w-[42ch]">
            <SectionLabel index="03">Your visit</SectionLabel>
            <Reveal delay={0.12}>
            <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] tracking-[-0.014em] text-ms-cocoa">
              What actually happens, start to{" "}
              <em className="italic text-ms-terracotta">finish</em>.
            </h2>
            </Reveal>
          </div>

          <Stagger as="ol" step={0.11} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {VISIT_STEPS.map((step, index) => (
              <StaggerItem as="li" key={step.title} y={28} className="flex">
                <Lift amount={6} className="flex w-full flex-col gap-3.5 rounded-[18px] border border-ms-bronze/15 bg-ms-shell px-7 py-9">
                <span className="font-display text-[2.2rem] font-light leading-none text-ms-terracotta/65">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[22px] font-normal text-ms-cocoa">
                  {step.title}
                </h3>
                <p className="font-sans text-[14px] font-light leading-[1.8] text-ms-espresso/75">
                  {step.body}
                </p>
                </Lift>
              </StaggerItem>
            ))}
          </Stagger>
        </Inner>
      </Card>
    </Shell>
  );
}
