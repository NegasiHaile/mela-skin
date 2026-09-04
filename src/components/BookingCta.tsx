import { CONTACT, brand } from "@/constants";
import { Lines, Reveal } from "@/motion";
import { PatternField } from "./brand/PatternField";
import { PillGhost, PillSolid, Wrap } from "./ui";

/*
  The closing band on every route except /contact.

  The booking form used to sit at the foot of all five pages. One form, printed
  five times, is what made a contact page look redundant — so the form moved to
  /contact and this took its place: the same weight in the layout, one step
  instead of a whole section.

  THE SECOND BUTTON IS THE EMAIL ADDRESS. It was the phone number, which was
  the right idea for the wrong number: a `tel:` link is one tap on a handset and
  it should not cost two, but the number was not a line anybody answers, so it
  came off the whole site on 2 Sep. The email is the same shape of thing -- one
  tap, straight into an app, no page in between -- and it reaches somebody.

  IT IS `ms-cream` AND NOT `ms-field`. It is flooded, and every route ends its
  ordinary sections' shell/paper/cream rotation (see the note on that rotation
  in app/page.tsx) before this band rather than partway through it, because
  this is always the last thing before the footer: arriving at the footer's
  brown from the warmest of the three light grounds is the shortest step the
  page can make. The 31 Aug review asked for nothing darker than the footer,
  which cream still is by a wide margin.

  Copy: constants/contact.ts → CONTACT.cta.
*/
/**
 * `from` is now accepted and ignored rather than removed from every call
 * site: it only ever fed the `SeamBlend` that used to sit here, and that came
 * out along with every other section's flat ground -- see the note in
 * globals.css. Kept in the signature so pages passing `from="shell"` etc.
 * still type-check; drop it once nothing calls this with the prop any more.
 */
export function BookingCta({
  from: _from = "paper",
}: {
  from?: "shell" | "paper" | "cream";
}) {
  return (
    <section id="book" className="relative scroll-mt-4 overflow-hidden">
      <PatternField tone="light" />

      <Wrap className="relative z-10 py-20 lg:py-24">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <h2 className="display-caps max-w-[16ch] text-[clamp(2.1rem,4vw,3.2rem)] text-ms-cocoa">
              <Lines text={CONTACT.cta.title} />
            </h2>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[38ch] font-sans text-[19px] font-light leading-[1.65] text-ms-espresso/80 sm:text-[21px]">
                {CONTACT.cta.body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.28} className="flex shrink-0 flex-wrap gap-3.5">
            <PillSolid href="/contact" className="min-h-14 px-9">
              {CONTACT.cta.primary}
            </PillSolid>
            {/*
              LOWER CASE AND BARELY TRACKED, which makes this the one place on
              the site a pill breaks its own style. `PILL` sets uppercase at
              0.14em because a pill label is two or three words of display
              copy; an email address is not copy, it is a string somebody may
              retype, and "INFO@MELASKIN.KE" spaced out by a seventh of an em
              is a worse thing to read back than the address itself. Shape,
              size and position still pair it with the button beside it.

              ON A CHILD SPAN, NOT ON `className`. `normal-case` and
              `tracking-*` would lose: Tailwind resolves same-property classes
              by stylesheet order rather than by the order they are written,
              and it emits `normal-case` BEFORE `uppercase`, so the pill's own
              class would win and this would silently do nothing. Both
              properties are inherited, so a declaration on the child beats the
              parent's whatever order the sheet is in.
            */}
            <PillGhost href={`mailto:${brand.email}`} className="min-h-14 px-9">
              <span className="text-[13px] normal-case tracking-[0.01em]">
                {brand.email}
              </span>
            </PillGhost>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
