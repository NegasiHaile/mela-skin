import { CONTACT, PREMISES, brand } from "@/constants";
import { PatternField } from "./brand/PatternField";
import { Reveal, Stagger, StaggerItem, Wipe } from "@/motion";
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
*/
export function ClinicMap() {
  return (
    <section
      id="map"
      className="relative scroll-mt-4 overflow-hidden bg-ms-paper py-24 lg:py-32"
    >
      <PatternField
        id="map"
        tone="paper"
        fade="left"
        scale={520}
        opacity={0.9}
        drift={44}
      />

      <Wrap className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal y={18}>
              <p className="eyebrow text-ms-terracotta-deep">
                {CONTACT.map.eyebrow}
              </p>
            </Reveal>

            <SectionHead
              title={CONTACT.map.title}
              rule={false}
              className="mt-5"
            />

            <Stagger
              as="dl"
              step={0.1}
              delay={0.2}
              className="mt-9 flex flex-col"
            >
              <StaggerItem y={18} className="border-t border-ms-bronze/25 py-5">
                <dt className="eyebrow font-normal text-ms-bronze">Address</dt>
                <dd className="mt-2.5 font-sans text-[16px] font-light leading-[1.7] text-ms-espresso">
                  {brand.address.line1}
                  <br />
                  {brand.address.line2}
                  <br />
                  {brand.address.city}
                </dd>
              </StaggerItem>

              {CONTACT.map.notes.map((note) => (
                <StaggerItem
                  key={note.label}
                  y={18}
                  className="border-t border-ms-bronze/25 py-5"
                >
                  <dt className="eyebrow font-normal text-ms-bronze">
                    {note.label}
                  </dt>
                  <dd className="mt-2.5 font-sans text-[16px] font-light leading-[1.7] text-ms-espresso/85">
                    {note.body}
                  </dd>
                </StaggerItem>
              ))}

              <StaggerItem y={18} className="border-t border-ms-bronze/25 py-5">
                <dt className="eyebrow font-normal text-ms-bronze">Hours</dt>
                <dd className="mt-2.5 font-sans text-[16px] font-light leading-[1.7] text-ms-espresso">
                  {PREMISES.facts
                    .find((fact) => fact.label === "Hours")
                    ?.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                </dd>
              </StaggerItem>
            </Stagger>

            <Reveal delay={0.3} className="mt-8">
              <PillSolid
                href={CONTACT.map.directionsUrl}
                className="min-h-13 px-8"
              >
                {CONTACT.map.directionsLabel}
              </PillSolid>
            </Reveal>
          </div>

          <Wipe className="lg:col-span-8">
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
        </div>
      </Wrap>
    </section>
  );
}
