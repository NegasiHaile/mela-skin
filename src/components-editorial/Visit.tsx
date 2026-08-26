import { todo } from "@/constants";
import { Lift, Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Card, Inner, SectionLabel, Shell } from "./ui";

/*
  The four beats here follow the patient journey the clinic set out for itself
  in Operations/.../Mela Skin - Focus Area.docx: appointment, consultation,
  reminders, follow-ups. The words are drafted; the structure is theirs.
*/
const STEPS = [
  {
    n: "01",
    title: "Appointment",
    body: `Book online or by phone. You will be asked what brought you in and how long it has been going on — so the clinician has read your history before you sit down.`,
  },
  {
    n: "02",
    title: "Consultation",
    body: `${todo.consultLength} minutes. Examination under proper lighting, a diagnosis explained in plain language, and clinical photographs kept on your record as a baseline.`,
  },
  {
    n: "03",
    title: "Your plan",
    body: `A written plan you leave with, priced up front — including what it will cost, how long it will take, and what will happen if it does not work.`,
  },
  {
    n: "04",
    title: "Follow-up",
    body: `A review at ${todo.reviewGap} weeks, with a reminder before it. Most pigmentation and scar work fails because it is abandoned early, not because it was the wrong plan.`,
  },
];

export function Visit() {
  return (
    <Shell>
      <Card id="visit" className="mt-4 bg-ms-sand/35">
        <PatternField id="ed-visit" tone="sand" fade="top" scale={400} opacity={0.85} drift={34} />
        <Inner>
          <div className="max-w-[42ch]">
            <SectionLabel index="03">Your visit</SectionLabel>
            <Reveal delay={0.12}>
            <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] tracking-[-0.014em] text-ms-cocoa">
              What actually happens, start to{" "}
              <em className="italic text-ms-clay">finish</em>.
            </h2>
            </Reveal>
          </div>

          <Stagger as="ol" step={0.11} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <StaggerItem as="li" key={step.n} y={28} className="flex">
                <Lift amount={6} className="flex w-full flex-col gap-3.5 rounded-[18px] border border-ms-bronze/15 bg-ms-shell px-7 py-9">
                <span className="font-display text-[2.2rem] font-light leading-none text-ms-clay/55">
                  {step.n}
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
