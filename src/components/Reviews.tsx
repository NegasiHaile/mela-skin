import { Sparkle } from "./brand/Marks";
import { SectionHead, Wrap } from "./ui";

/*
  Deliberately empty quotes. The clinic has not opened, so there are no
  patients to quote — writing plausible-sounding reviews here would be
  fabricating them. Each slot states what belongs in it instead. Kenyan
  practice, like most, requires written consent before publishing a patient's
  words; keep attribution to initials.
*/
const SLOTS = [
  {
    hint: "[Patient review — three or four lines sits best here. Quotes about being correctly diagnosed after a long search tend to carry the most weight on a clinic page.]",
    meta: "[Initials] · [Treatment] · [Year]",
  },
  {
    hint: "[Patient review — a quote naming one specific outcome reads far stronger than a general compliment.]",
    meta: "[Initials] · [Treatment] · [Year]",
  },
  {
    hint: "[Patient review — written consent required before publishing. Keep attribution to initials.]",
    meta: "[Initials] · [Treatment] · [Year]",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="bg-ms-shell py-24 lg:py-36">
      <Wrap>
        <SectionHead index="06" label="Reviews" title="In their words" />

        <ul className="mt-16 grid gap-x-14 gap-y-12 lg:grid-cols-3">
          {SLOTS.map((slot) => (
            <li key={slot.hint} className="border-t border-ms-bronze/25 pt-7">
              <Sparkle width={12} height={24} fill="url(#ms-gold)" />
              <p className="mt-6 font-display text-[20px] font-normal italic leading-[1.6] text-ms-espresso/80">
                {slot.hint}
              </p>
              <p className="eyebrow mt-7 font-normal text-ms-terracotta-deep">
                {slot.meta}
              </p>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
