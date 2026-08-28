import { REVIEW_SLOTS } from "@/constants";
import { Lift, Reveal, Stagger, StaggerItem } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Card, Inner, SectionLabel, Shell } from "./ui";

/* Content: constants/clinic.ts → REVIEW_SLOTS, deliberately empty. */
export function Reviews() {
  return (
    <Shell>
      <Card id="reviews" className="mt-4 bg-ms-sand/35">
        <PatternField tone="sand" />
        <Inner>
          <div className="flex flex-col items-center text-center">
            <SectionLabel index="06">Reviews</SectionLabel>
            <Reveal delay={0.12}>
              <h2 className="mt-8 font-display text-[clamp(1.9rem,3.1vw,2.7rem)] font-normal leading-[1.12] tracking-[-0.014em] text-ms-cocoa">
                In their <em className="italic text-ms-terracotta">words</em>.
              </h2>
            </Reveal>
          </div>

          <Stagger as="ul" step={0.12} className="mt-14 grid gap-4 lg:grid-cols-3">
            {REVIEW_SLOTS.map((slot) => (
              <StaggerItem as="li" key={slot.quote} y={28} className="flex">
                <Lift
                  amount={6}
                  className="flex w-full flex-col gap-6 rounded-[18px] border border-ms-bronze/15 bg-ms-shell px-8 py-9"
                >
                <Sparkle width={13} height={26} fill="url(#ms-gold)" />
                <p className="font-display text-[18px] font-normal italic leading-[1.6] text-ms-espresso/80">
                  {slot.quote}
                </p>
                <p className="eyebrow mt-auto font-normal text-ms-terracotta-deep">
                  {slot.attribution}
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
