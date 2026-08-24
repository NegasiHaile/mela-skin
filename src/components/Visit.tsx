import { todo } from "@/lib/brand";
import { SectionHead, Wrap } from "./ui";

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
    <section id="visit" className="bg-ms-shell py-24 lg:py-36">
      <Wrap>
        <SectionHead
          index="03"
          label="Your visit"
          title="What actually happens, start to finish"
          className="max-w-[640px]"
        />

        <ol className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.n} className="border-t border-ms-bronze/25 pt-7">
              <span className="font-display text-[2.6rem] font-light leading-none text-ms-clay">
                {step.n}
              </span>
              <h3 className="display-caps mt-5 text-[19px] text-ms-cocoa">
                {step.title}
              </h3>
              <p className="mt-4 font-sans text-[15px] font-light leading-[1.8] text-ms-espresso/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}
