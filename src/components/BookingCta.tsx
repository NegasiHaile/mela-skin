import { CONTACT, brand } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Lines, Reveal } from "@/motion";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  The closing band on every route except /contact.

  The booking form used to sit at the foot of all five pages. One form, printed
  five times, is what made a contact page look redundant — so the form moved to
  /contact and this took its place: the same field colour, the same weight in
  the layout, one step instead of a whole section.

  The phone number is a real link rather than a second button to the same page.
  On a phone, calling is the shortest route to an appointment and it should not
  cost two taps.

  Copy: constants/contact.ts → CONTACT.cta.
*/
export function BookingCta() {
  return (
    <section id="book" className="relative scroll-mt-4 overflow-hidden bg-ms-field">
      <PatternField tone="field" />
      {/*
        A RADIAL VIGNETTE USED TO SIT HERE and it has been removed. It was the
        field colour at rising opacity, which modelled the band when the field
        was #74370c. The flooded colour is #2C190B now — the same colour the
        vignette was painting — so all it still did was cover the pattern, which
        left this band as a flat hole in a lattice that is meant to run unbroken
        down the page. See brand/PatternField.tsx.
      */}
      <Wrap className="relative py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Reveal y={18}>
              <p className="eyebrow text-ms-gold">{CONTACT.cta.eyebrow}</p>
            </Reveal>

            <h2 className="display-caps mt-5 max-w-[16ch] text-[clamp(2.1rem,4vw,3.2rem)] text-ms-ivory">
              <Lines text={CONTACT.cta.title} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[42ch] font-sans text-[17px] font-light leading-[1.75] text-ms-cream/85">
                {CONTACT.cta.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.28} className="flex shrink-0 flex-wrap gap-3.5">
            <PillSolid href="/contact" tone="dark" className="min-h-14 px-9">
              {CONTACT.cta.primary}
            </PillSolid>
            <PillGhost href={brand.phoneHref} tone="dark" className="min-h-14 px-9">
              {brand.phone}
            </PillGhost>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
