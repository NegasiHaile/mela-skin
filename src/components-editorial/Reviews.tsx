import { Sparkle } from "./brand/Marks";
import { Card, Inner, SectionLabel, Shell } from "./ui";

/*
  Deliberately empty quotes. The clinic has not opened, so there are no
  patients to quote — writing plausible-sounding reviews here would be
  fabricating them. Each card states what belongs in it instead. Kenyan
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
    <Shell>
      <Card id="reviews" className="mt-4 bg-ms-sand/35">
        <Inner>
          <div className="flex flex-col items-center text-center">
            <SectionLabel index="06">Reviews</SectionLabel>
            <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] tracking-[-0.014em] text-ms-cocoa">
              In their <em className="italic text-ms-clay">words</em>.
            </h2>
          </div>

          <ul className="mt-14 grid gap-4 lg:grid-cols-3">
            {SLOTS.map((slot) => (
              <li
                key={slot.hint}
                className="flex flex-col gap-6 rounded-[18px] border border-ms-bronze/15 bg-ms-shell px-8 py-9"
              >
                <Sparkle width={13} height={26} fill="url(#ms-gold)" />
                <p className="font-display text-[18px] font-normal italic leading-[1.6] text-ms-espresso/80">
                  {slot.hint}
                </p>
                <p className="eyebrow mt-auto font-normal text-ms-terracotta-deep">
                  {slot.meta}
                </p>
              </li>
            ))}
          </ul>
        </Inner>
      </Card>
    </Shell>
  );
}
