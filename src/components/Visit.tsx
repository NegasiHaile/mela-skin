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

  FOURTH OF THE PAGE'S SHELL/PAPER/CREAM ROTATION, back to `ms-shell` -- see the
  note on that rotation in app/page.tsx. It used to take `ms-linen`, the
  deepest of the old four-step ramp, with its rules at bronze/35 rather than
  the usual /25 to hold the same weight against that deeper ground -- back on
  shell now, so the rule is /25 again, same as every other shell or paper
  section. The 01-04 numerals stay `terracotta`: 3.93:1 on linen, which was
  under AA for small text but over the 3:1 display sizes need; 5.48:1 on shell,
  comfortably past both.
*/
export function Visit() {
  return (
    <section
      id="visit"
      className="relative overflow-hidden py-24 lg:py-36"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
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
              <h3 className="display-caps mt-5 text-[21px] text-ms-cocoa">
                {step.title}
              </h3>
              <p className="mt-4 font-sans text-[16.5px] font-light leading-[1.7] text-ms-espresso/80">
                {step.body}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
