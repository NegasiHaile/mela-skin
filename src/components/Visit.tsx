import { HOME, VISIT_STEPS } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Stagger, StaggerItem } from "@/motion";
import { SectionHead, Wrap } from "./ui";

/*
  The four beats follow the patient journey the clinic set out for itself in
  Operations/.../Mela Skin - Focus Area.docx: appointment, consultation,
  reminders, follow-ups.

  Copy: constants/clinic.ts → VISIT_STEPS. The 01–04 numbering is generated
  from the array index, so reordering the steps renumbers them.
*/
export function Visit() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden bg-ms-shell py-24 lg:py-36"
    >
      <PatternField tone="shell" />

      <Wrap className="relative">
        <SectionHead title={HOME.visit.title} className="max-w-[640px]" />

        {/*
          Read as a sequence, so it animates as one. A wider step than the
          treatment rails (0.12s) because the four steps are numbered and the
          eye is already being asked to count them.
        */}
        <Stagger
          as="ol"
          step={0.12}
          className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VISIT_STEPS.map((step, index) => (
            <StaggerItem
              as="li"
              key={step.title}
              className="border-t border-ms-bronze/25 pt-7"
            >
              <span className="font-display text-[2.6rem] font-light leading-none text-ms-terracotta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display-caps mt-5 text-[19px] text-ms-cocoa">
                {step.title}
              </h3>
              <p className="mt-4 font-sans text-[15px] font-light leading-[1.8] text-ms-espresso/75">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
