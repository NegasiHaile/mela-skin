import { CONTACT, brand } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Reveal, Wipe } from "@/motion";
import { PillSolid, SectionHead, Wrap } from "./ui";

/*
  The map.

  A keyless Google Maps embed, which is the only kind that works on a site with
  no server and no billing account behind it. `loading="lazy"` keeps the
  third-party request out of the initial load: nobody pays for the map until
  they scroll to it.

  The frame is the same treatment the clinician portrait gets (hairline ring,
  no radius on the inner element) so an iframe full of somebody else's design
  still sits inside this one.

  Why a search rather than a pin, and what to replace it with, is written up in
  constants/contact.ts.

  FULL WIDTH, MAP FIRST, DETAILS BELOW -- on request, and it dropped
  `CONTACT.map.notes` along with the old two-column layout. Those three rows
  -- Parking, Getting here, Access -- were visible placeholders nobody had
  supplied real answers for, and unlike a labelled photo slot a paragraph of
  bracketed guesses ("[Where patients park, whether it is validated...]") on a
  contact page reads as the clinic not knowing its own building. Removed
  rather than shown unconfirmed; `CONTACT.map.notes` is gone from
  constants/contact.ts too; see the note there for how to bring a note back
  once the clinic has answered it.

  HOURS CAME OFF THIS SECTION TOO, on request: the Booking section right
  above this one already carries them (constants/clinic.ts -> CONTACT_DETAILS,
  rendered in components/Booking.tsx), so a second "Hours" row here one
  section down the same page was the exact repetition the rest of this pass
  was for. What is left below the map is the address, with directions the
  one action on offer.

  LAST OF /CONTACT'S ROTATION, `ms-cream` -- see the note on that rotation in
  app/page.tsx. It is the page's own closing section, the way BookingCta is
  everywhere else, so it takes the deepest of the three for the same reason:
  the shortest step into the footer's brown.

  `SEAMBLEND FROM="SHELL"`, NOT "PAPER". This section used to follow the
  clinician band (`ms-paper`), which sat between it and Booking; that band
  came off /contact on request (see the note in app/contact/page.tsx), so this
  now follows Booking's `ms-shell` directly. The blend has to name whatever is
  actually immediately above it, not whatever used to be.
*/
export function ClinicMap() {
  return (
    <section
      id="map"
      className="relative scroll-mt-4 overflow-hidden py-24 lg:py-32"
    >
      <PatternField tone="light" />

      <Wrap className="relative z-10">
        <SectionHead title={CONTACT.map.title} />

        <Wipe className="mt-10 lg:mt-12">
          <div className="relative h-[380px] w-full overflow-hidden rounded-[24px] ring-1 ring-ms-bronze/25 sm:h-[460px] lg:h-[560px]">
            <iframe
              title={CONTACT.map.frameTitle}
              src={CONTACT.map.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </Wipe>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between lg:mt-12">
          <Reveal delay={0.15}>
            <dl>
              <dt className="eyebrow font-normal text-ms-terracotta-deep">Address</dt>
              <dd className="mt-2.5 font-sans text-[17px] font-light leading-[1.65] text-ms-espresso">
                {/*
                  The letterhead's three lines, from one place, rather than
                  three fields picked out by hand -- which is how the suburb
                  came to be missing from here when the address gained one.
                */}
                {brand.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </dl>
          </Reveal>

          <Reveal delay={0.3}>
            <PillSolid
              href={CONTACT.map.directionsUrl}
              className="min-h-13 shrink-0 px-8"
            >
              {CONTACT.map.directionsLabel}
            </PillSolid>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
