import { HOME, REVIEW_SLOTS } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Sparkle } from "./brand/Marks";
import { Stagger, StaggerItem } from "@/motion";
import { SectionHead, Wrap } from "./ui";

/*
  Copy: constants/clinic.ts → REVIEW_SLOTS, which is deliberately empty. The
  clinic has not opened, so there are no patients to quote and inventing some
  here would be fabricating them. Each slot says what belongs in it instead.
*/
export function Reviews() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-ms-shell py-24 lg:py-36"
    >
      <PatternField
        id="reviews"
        tone="shell"
        fade="radial"
        scale={600}
        opacity={0.9}
        drift={40}
      />

      <Wrap className="relative">
        <SectionHead title={HOME.reviews.title} />

        <Stagger
          as="ul"
          step={0.13}
          className="mt-16 grid gap-x-14 gap-y-12 lg:grid-cols-3"
        >
          {REVIEW_SLOTS.map((slot) => (
            <StaggerItem
              as="li"
              key={slot.quote}
              className="border-t border-ms-bronze/25 pt-7"
            >
              <Sparkle width={12} height={24} fill="url(#ms-gold)" />
              <p className="mt-6 font-display text-[20px] font-normal italic leading-[1.6] text-ms-espresso/80">
                {slot.quote}
              </p>
              <p className="eyebrow mt-7 font-normal text-ms-terracotta-deep">
                {slot.attribution}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Wrap>
    </section>
  );
}
